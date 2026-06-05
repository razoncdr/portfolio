import { profile } from "@/content/profile";
import { StatChip } from "@/components/ui/StatChip";
import { MailIcon, icons } from "@/components/ui/icons";
import { getCodeforcesInfo, titleCaseRank } from "@/lib/codeforces";

/**
 * Above-the-fold intro. Leads with name + role, a one-line pitch, the headline
 * stats (CF rating, problems solved, ICPC rank), then the primary contact actions.
 *
 * Async server component: the Codeforces stat is fetched live (revalidated
 * hourly) and overrides the static entry tagged `source: "codeforces"` in
 * profile.ts. If the fetch fails, the static value renders instead — the live
 * data is an enhancement, never a dependency.
 *
 * The GitHub/LinkedIn buttons are derived from profile.socials (single source of
 * truth) and resolve their glyphs via the shared icons map — no hardcoded URLs.
 */
const HERO_LINKS = ["github", "linkedin"] as const;

export async function Hero() {
  const links = profile.socials.filter((s) =>
    HERO_LINKS.includes(s.icon as (typeof HERO_LINKS)[number])
  );

  const cf = await getCodeforcesInfo();
  const stats = profile.stats.map((stat) =>
    stat.source === "codeforces" && cf
      ? { ...stat, value: `${titleCaseRank(cf.maxRank)} · max ${cf.maxRating}` }
      : stat
  );

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 sm:pt-24"
    >
      <p className="font-mono text-sm text-accent">Hi, my name is</p>
      <h1
        id="hero-heading"
        className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
      >
        {profile.name}
      </h1>
      <p className="mt-2 text-lg font-medium text-muted sm:text-xl">
        {profile.title}
      </p>
      <p className="mt-1 text-sm text-subtle">{profile.location}</p>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
        {profile.tagline}
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <StatChip key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          <MailIcon />
          Get in touch
        </a>
        {links.map((social) => {
          const Icon = icons[social.icon];
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Icon />
              {social.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
