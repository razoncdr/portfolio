import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-6">
        {profile.skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 sm:grid-cols-[200px_1fr] sm:gap-6"
          >
            <h3 className="pt-1 text-sm font-medium text-foreground">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
