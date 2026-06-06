/**
 * Minimal structured logger for server-side code.
 *
 * Every entry is a single JSON line written to stdout/stderr, which is exactly
 * what Vercel's Logs/Observability dashboard ingests — searchable and
 * filterable by any field (e.g. show every `contact.rate_limited` event).
 *
 * Conventions:
 *  - `event` is dot-namespaced and stable: "<area>.<what_happened>"
 *    (contact.sent, contact.rate_limited, refresh.denied, leetcode.fetch_failed)
 *  - context is shallow key/value pairs; keep it queryable.
 *  - NEVER log secrets (API keys) or full message bodies — logs are visible to
 *    anyone with dashboard access. IPs are logged deliberately, for
 *    security/abuse attribution (a standard, legitimate use).
 *
 * Levels map to console methods so Vercel colors/filters them natively:
 *   info → stdout, warn/error → stderr.
 */

type Level = "info" | "warn" | "error";

function write(level: Level, event: string, context: Record<string, unknown> = {}) {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    event,
    ...context,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const log = {
  info: (event: string, context?: Record<string, unknown>) =>
    write("info", event, context),
  warn: (event: string, context?: Record<string, unknown>) =>
    write("warn", event, context),
  error: (event: string, context?: Record<string, unknown>) =>
    write("error", event, context),
};
