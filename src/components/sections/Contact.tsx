import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { icons, ArrowUpRightIcon } from "@/components/ui/icons";

/**
 * Contact = links only for the MVP (no form yet, by design).
 * Phase-2 note: a <ContactForm /> client component will slot in directly above
 * this list, posting to an app/api/contact route handler (Resend/Formspree).
 * The links below stay as the always-works fallback.
 */
export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-base leading-relaxed text-muted">
        I&apos;m open to backend and full-stack roles, and always happy to talk
        shop. The fastest way to reach me is email — or find me on the links below.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {profile.socials.map((social) => {
          const Icon = icons[social.icon];
          const isExternal = social.href.startsWith("http");
          return (
            <li key={social.label}>
              <a
                href={social.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-accent/40"
              >
                <span className="text-subtle transition-colors group-hover:text-accent">
                  <Icon width={20} height={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {social.label}
                  </span>
                  <span className="block truncate font-mono text-xs text-subtle">
                    {social.handle}
                  </span>
                </span>
                <ArrowUpRightIcon
                  width={16}
                  height={16}
                  className="text-subtle transition-colors group-hover:text-accent"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
