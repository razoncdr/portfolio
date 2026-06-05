/**
 * Per-key fixed-window rate limiter backed by Upstash Redis (REST API, no SDK).
 *
 * Why an external store at all: Vercel functions are STATELESS — each request
 * may run in a fresh instance, so an in-memory counter would keep resetting.
 * Shared state needs storage outside the function; Upstash's free tier is the
 * standard answer for exactly this.
 *
 * Behavior without configuration: fails OPEN (allows the request). The
 * honeypot + validation + Resend's daily cap still protect the form, so the
 * site works out of the box and tightens automatically once the
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN env vars exist.
 */

const WINDOW_SECONDS = 3600; // 1 hour
const MAX_PER_WINDOW = 5;

export async function checkRateLimit(
  key: string
): Promise<{ allowed: boolean; configured: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return { allowed: true, configured: false };
  }

  try {
    // Pipeline: INCR the counter; start the 1h window on first hit (EXPIRE NX).
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, WINDOW_SECONDS, "NX"],
      ]),
    });
    if (!res.ok) return { allowed: true, configured: true };

    const results = (await res.json()) as { result?: unknown }[];
    const count = Number(results?.[0]?.result ?? 0);
    return { allowed: count <= MAX_PER_WINDOW, configured: true };
  } catch {
    // Redis hiccup shouldn't take the contact form down with it.
    return { allowed: true, configured: true };
  }
}
