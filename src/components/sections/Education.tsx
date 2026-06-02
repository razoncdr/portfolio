import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-4">
        {profile.education.map((edu) => (
          <Card key={edu.school}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {edu.degree}
              </h3>
              <p className="font-mono text-xs text-subtle whitespace-nowrap">
                {edu.period}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-muted">{edu.school}</p>
            <p className="mt-1 font-mono text-sm text-accent">{edu.result}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
