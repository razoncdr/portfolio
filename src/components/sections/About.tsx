import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted">
        {profile.about.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-subtle">
        <span>
          <span className="text-muted">Languages:</span>{" "}
          {profile.languages.join(" · ")}
        </span>
      </div>
    </Section>
  );
}
