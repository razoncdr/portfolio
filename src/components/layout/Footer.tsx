import { profile } from "@/content/profile";

/**
 * Minimal footer. Year is computed at render time (server component) so it never
 * goes stale. Honest little touch: notes the stack the site is built with.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-subtle sm:flex-row">
        <p>
          © {year} {profile.name}
        </p>
        <p className="font-mono text-xs">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
