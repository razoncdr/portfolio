import { leetcodeHandle } from "@/content/profile";

export type LeetcodeStats = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

/**
 * Fetches solved-problem counts from LeetCode's public GraphQL endpoint
 * (the same one the github-readme badges use — unofficial but stable).
 *
 * Caching: GraphQL requires POST, and Next's fetch-level data cache only
 * applies to GET — so freshness is governed by the ROUTE instead:
 * `export const revalidate = 3600` in app/page.tsx makes the page ISR, and
 * this fetch runs exactly once per background regeneration (at most hourly,
 * and only when someone actually visits — stale-while-revalidate, not a cron).
 * The owner can also force a refresh via /api/refresh-stats.
 *
 * Resilience: returns null on ANY failure (network, non-200, missing user,
 * unexpected shape) — the caller falls back to the static detail in
 * profile.ts, so a LeetCode outage can never break the site or its build.
 */
export async function getLeetcodeStats(): Promise<LeetcodeStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query userProblemsSolved($username: String!) {
          matchedUser(username: $username) {
            submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
          }
        }`,
        variables: { username: leetcodeHandle },
      }),
    });
    if (!res.ok) return null;

    const data: unknown = await res.json();
    const counts = (
      data as {
        data?: {
          matchedUser?: {
            submitStatsGlobal?: {
              acSubmissionNum?: { difficulty?: unknown; count?: unknown }[];
            };
          };
        };
      }
    ).data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    if (!Array.isArray(counts)) return null;

    const byDifficulty = new Map<string, number>();
    for (const entry of counts) {
      if (typeof entry?.difficulty === "string" && typeof entry?.count === "number") {
        byDifficulty.set(entry.difficulty, entry.count);
      }
    }

    const total = byDifficulty.get("All");
    const easy = byDifficulty.get("Easy");
    const medium = byDifficulty.get("Medium");
    const hard = byDifficulty.get("Hard");
    if (
      total === undefined ||
      easy === undefined ||
      medium === undefined ||
      hard === undefined
    ) {
      return null;
    }

    return { total, easy, medium, hard };
  } catch {
    return null;
  }
}
