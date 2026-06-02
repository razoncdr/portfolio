import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.projects.map((project) => (
          <Card key={project.name} className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-foreground">
                {project.name}
              </h3>
              {project.status && (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent-hover">
                  {project.status}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            {/* Links render only when present — fill in repo/demo URLs in profile.ts */}
            {(project.repo || project.demo) && (
              <div className="mt-4 flex gap-4 text-sm">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-2 hover:text-accent-hover hover:underline"
                  >
                    <GithubIcon width={16} height={16} />
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-2 hover:text-accent-hover hover:underline"
                  >
                    Live demo
                    <ArrowUpRightIcon width={16} height={16} />
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
