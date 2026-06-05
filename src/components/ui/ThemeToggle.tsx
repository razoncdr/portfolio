"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";

/**
 * Dark/light toggle — the site's first (and only) client component.
 *
 * Deliberately stateless: the single source of truth is the `dark` class on
 * <html> (set pre-paint by the inline script in layout.tsx, persisted in
 * localStorage). Both icons are always rendered and CSS (`dark:` variant)
 * decides which is visible — so server and client HTML are identical and
 * there's nothing to get out of sync during hydration.
 */
export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* private mode / blocked storage — toggle still works for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="text-muted transition-colors hover:text-accent"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
