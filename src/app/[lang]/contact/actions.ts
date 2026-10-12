"use server";

import { z } from "zod";

// Errors are returned as field names only; the form renders them in the
// page's language, so this action never needs to know the locale.
const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(254),
  message: z.string().trim().min(10).max(5000),
});

type Field = keyof z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "error" | "sent";
  invalid?: Field[];
  values?: Partial<Record<Field, string>>;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real people never see this field.
  if (formData.get("company")) return { status: "sent" };

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const invalid = [...new Set(parsed.error.issues.map((issue) => issue.path[0] as Field))];
    return { status: "error", invalid, values };
  }

  const delivered = await sendEmail(parsed.data);
  if (!delivered) return { status: "error", values };

  return { status: "sent" };
}

// Sent through Resend's REST API. The visitor's address goes in reply_to, so
// replying from your inbox answers them directly.
async function sendEmail({ name, email, message }: z.infer<typeof schema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Never tell a visitor "sent" in production when nothing was delivered.
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set; message dropped");
      return false;
    }
    console.info("[contact] email not configured; message:", { name, email, message });
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Zequlard Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New message from ${name.replace(/[\r\n]+/g, " ")}`,
        // Plain text only: visitor input is never rendered as HTML.
        text: `${message}\n\n——\nName: ${name}\nEmail: ${email}`,
      }),
    });
    if (!res.ok) console.error("[contact] Resend failed:", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("[contact] Resend unreachable:", error);
    return false;
  }
}
