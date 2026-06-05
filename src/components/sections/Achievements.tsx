import { Fragment } from "react";
import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { getLeetcodeStats } from "@/lib/leetcode";

/**
 * Async server component: the LeetCode row (source: "leetcode") gets its detail
 * overridden with live solved counts fetched at render/regeneration time, and a
 * subtle pulsing "live" indicator so the freshness is visible. If the API call
 * fails, the static detail from profile.ts renders with no indicator — live
 * data is an enhancement, never a dependency.
 */
export async function Achievements() {
  const lc = await getLeetcodeStats();
  const rows = profile.achievements.map((item) =>
    item.source === "leetcode" && lc
      ? {
          ...item,
          detail: `${lc.total} solved · ${lc.easy} Easy · ${lc.medium} Medium · ${lc.hard} Hard`,
          live: true,
        }
      : { ...item, live: false }
  );

  return (
    <Section id="achievements" title="Achievements">
      {/*
        Fragment (renders no DOM node) keeps <dt>/<dd> as direct children of the
        grid <dl>, preserving the term/definition association in the accessibility
        tree — cleaner than a display:contents wrapper.
      */}
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[160px_1fr]">
        {rows.map((item) => (
          <Fragment key={item.category}>
            <dt className="font-mono text-sm font-medium text-accent">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  {item.category} ↗
                </a>
              ) : (
                item.category
              )}
            </dt>
            <dd className="text-sm leading-relaxed text-muted">
              {item.detail}
              {item.live && (
                <span className="ml-2 inline-flex items-baseline gap-1 font-mono text-[11px] text-subtle">
                  <span
                    className="h-1.5 w-1.5 self-center rounded-full bg-emerald-500 motion-safe:animate-pulse"
                    aria-hidden
                  />
                  live
                </span>
              )}
            </dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  );
}
