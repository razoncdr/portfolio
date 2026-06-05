import { codeforcesHandle } from "@/content/profile";

export type CodeforcesInfo = {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
};

/**
 * Fetches live rating data from the Codeforces public API, server-side.
 *
 * Caching: `next: { revalidate: 3600 }` keeps the page fully static but tells
 * Next/Vercel to re-fetch at most once per hour (ISR — incremental static
 * regeneration). Visitors always get a cached page instantly; the data quietly
 * refreshes in the background.
 *
 * Resilience: returns null on ANY failure (network, non-200, API error,
 * unexpected shape) — the caller falls back to the static value in profile.ts,
 * so a Codeforces outage can never break the site or its build.
 */
export async function getCodeforcesInfo(): Promise<CodeforcesInfo | null> {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (
      typeof data !== "object" ||
      data === null ||
      (data as { status?: string }).status !== "OK"
    ) {
      return null;
    }

    const user = (data as { result?: unknown[] }).result?.[0] as
      | Record<string, unknown>
      | undefined;
    if (
      !user ||
      typeof user.rating !== "number" ||
      typeof user.maxRating !== "number" ||
      typeof user.rank !== "string" ||
      typeof user.maxRank !== "string"
    ) {
      return null;
    }

    return {
      rating: user.rating,
      maxRating: user.maxRating,
      rank: user.rank,
      maxRank: user.maxRank,
    };
  } catch {
    return null;
  }
}

/** "international grandmaster" -> "International Grandmaster" */
export function titleCaseRank(rank: string): string {
  return rank.replace(/\b\w/g, (c) => c.toUpperCase());
}
