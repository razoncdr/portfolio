"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle";

/**
 * Contact form wired to the sendContactMessage Server Action.
 * useActionState gives us the returned state (success/error message) and a
 * pending flag for free; because it's a real <form action={...}>, it even
 * works before hydration / without JavaScript (progressive enhancement).
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      {/*
        Honeypot — invisible to humans (sr-only-style hiding, removed from tab
        order, ignored by autofill). Bots that fill every field reveal
        themselves; the server silently discards those submissions.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="What would you like to talk about?"
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>

        {/* aria-live announces the result to screen readers when it changes. */}
        <p
          aria-live="polite"
          className={`text-sm ${
            state.status === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : state.status === "error"
                ? "text-red-600 dark:text-red-400"
                : "text-subtle"
          }`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
