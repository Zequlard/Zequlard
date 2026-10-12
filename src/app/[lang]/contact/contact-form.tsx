"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { type ContactState, sendMessage } from "./actions";

type Copy = Dictionary["contact"];

const initialState: ContactState = { status: "idle" };

export function ContactForm({ copy }: { copy: Copy }) {
  const [state, action, pending] = useActionState(sendMessage, initialState);

  if (state.status === "sent") {
    return (
      <p role="status" className="text-step-1 font-light">
        {copy.sent}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="max-w-[38rem] space-y-8">
      <Field copy={copy} name="name" autoComplete="name" state={state} />
      <Field copy={copy} name="email" type="email" autoComplete="email" state={state} />
      <Field copy={copy} name="message" multiline state={state} />

      <div aria-hidden="true" className="hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && !state.invalid && (
        <p role="alert" className="text-sage">
          {copy.failed}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="label hairline border px-5 py-3 text-paper! hover:border-sage disabled:opacity-50"
      >
        {pending ? copy.sending : copy.send}
      </button>
    </form>
  );
}

function Field({
  copy,
  name,
  state,
  multiline,
  ...props
}: {
  copy: Copy;
  name: "name" | "email" | "message";
  state: ContactState;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const error = state.invalid?.includes(name) ? copy.errors[name] : undefined;
  const shared = {
    id: name,
    name,
    required: true,
    defaultValue: state.values?.[name],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
    className:
      "hairline mt-2 block w-full border-b bg-transparent py-2 text-step-1 font-light outline-none focus:border-sage",
  };

  return (
    <div>
      <label htmlFor={name} className="label">
        {copy[name]}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input {...props} {...shared} />}
      {error && (
        <p id={`${name}-error`} className="text-sage mt-2 text-step--1">
          {error}
        </p>
      )}
    </div>
  );
}
