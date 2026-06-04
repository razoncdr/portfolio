import { Fragment } from "react";
import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      {/*
        Fragment (renders no DOM node) keeps <dt>/<dd> as direct children of the
        grid <dl>, preserving the term/definition association in the accessibility
        tree — cleaner than a display:contents wrapper.
      */}
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[160px_1fr]">
        {profile.achievements.map((item) => (
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
            <dd className="text-sm leading-relaxed text-muted">{item.detail}</dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  );
}
