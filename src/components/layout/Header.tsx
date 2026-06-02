import { profile } from "@/content/profile";
import { icons } from "@/components/ui/icons";

/**
 * Sticky top nav. Anchor links scroll to in-page sections (smooth scroll is
 * handled in globals.css). Nav links collapse on small screens to avoid crowding;
 * the social icons stay visible so mobile visitors always have an exit.
 *
 * Social icons are derived from profile.socials + the shared icons map (no
 * hardcoded URLs). Phase-3 note: the dark-mode toggle button slots in here,
 * to the right of the nav.
 */
const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const HEADER_SOCIALS = ["github", "linkedin"] as const;

export function Header() {
  const socials = profile.socials.filter((s) =>
    HEADER_SOCIALS.includes(s.icon as (typeof HEADER_SOCIALS)[number])
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-mono text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          {profile.name.split(" ")[0].toLowerCase()}
          <span className="text-accent">.dev</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = icons[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
