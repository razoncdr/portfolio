"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Server Action handling contact-form submissions.
 *
 * Defense layers, in order (cheapest first):
 *  1. Honeypot — bots auto-fill the invisible "website" field; humans can't.
 *     We pretend success so bots don't learn they were caught.
 *  2. Server-side validation — never trust the client; the browser's
 *     `required` attributes are UX, not security.
 *  3. Per-IP rate limit (Upstash Redis) — caps volume from any single source.
 *  4. Hardcoded recipient (CONTACT_EMAIL env var, server-only) — visitors
 *     control the message content, never the destination.
 *  5. Resend's free-tier daily cap is the final circuit breaker.
 */

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1. Honeypot — silently "succeed" for bots.
  if (typeof formData.get("website") === "string" && formData.get("website")) {
    return { status: "success", message: "Thanks! I'll get back to you soon." };
  }

  // 2. Validate on the server.
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > MAX_NAME) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > MAX_EMAIL) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) {
    return {
      status: "error",
      message: `Please write a message between ${MIN_MESSAGE} and ${MAX_MESSAGE} characters.`,
    };
  }

  // 3. Per-IP rate limit (no-ops gracefully if Upstash isn't configured).
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = await checkRateLimit(`contact:${ip}`);
  if (!limit.allowed) {
    return {
      status: "error",
      message:
        "You've sent several messages recently — please try again in an hour, or email me directly.",
    };
  }

  // 4. Send via Resend (REST API — no SDK dependency needed).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    // Fail closed but helpfully: the direct links below the form still work.
    return {
      status: "error",
      message:
        "The contact form isn't configured yet — please use the email link below.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        // reply_to = the visitor — hitting "Reply" in Gmail answers them directly.
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message:
          "Something went wrong sending your message — please use the email link below.",
      };
    }

    return { status: "success", message: "Thanks! I'll get back to you soon." };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong sending your message — please use the email link below.",
    };
  }
}
