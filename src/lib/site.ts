/**
 * Canonical site URL, resolved once and reused by metadataBase, sitemap, and robots
 * so the base URL isn't repeated (or allowed to drift) across files.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL  — set this in Vercel (Production + Preview) once you have a domain.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel injects this automatically, so previews/prod
 *     still self-resolve to a real https URL even if you forget step 1.
 *  3. localhost — local development fallback.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
