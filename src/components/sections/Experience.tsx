import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-5">
        {profile.experience.map((job) => (
          <Card key={job.company}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {job.role}{" "}
                <span className="font-normal text-accent">· {job.company}</span>
              </h3>
              <p className="font-mono text-xs text-subtle whitespace-nowrap">
                {job.period}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-subtle">{job.location}</p>

            <ul className="mt-4 space-y-2.5">
              {job.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
