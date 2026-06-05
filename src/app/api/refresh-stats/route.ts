import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Owner-only, on-demand revalidation: regenerates the home page immediately
 * (re-running the live LeetCode fetch) instead of waiting for the hourly ISR
 * window. Bookmark:
 *
 *   https://<site>/api/refresh-stats?secret=<REVALIDATE_SECRET>
 *
 * - Protected by the REVALIDATE_SECRET env var (set in .env.local and in
 *   Vercel → Settings → Environment Variables). If the var is unset, the
 *   endpoint refuses everything — it fails closed, not open.
 * - GET (rather than the more conventional POST for mutations) is a deliberate
 *   pragmatic choice so the URL is bookmarkable from a browser.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
