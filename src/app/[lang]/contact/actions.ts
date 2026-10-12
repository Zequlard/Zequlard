"use server";

import { z } from "zod";

// Errors are returned as field names only; the form renders them in the
// page's language, so this action never needs to know the locale.
const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email(),
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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!res.ok) return { status: "error", values };
  } else {
    console.info("[contact] CONTACT_WEBHOOK_URL not set; message:", parsed.data);
  }

  return { status: "sent" };
}
