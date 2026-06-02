import type { ReactNode } from "react";

/**
 * Surface container with a subtle border + hover lift.
 * Used for experience entries, projects, and achievements so the page reads
 * as a set of clean, scannable cards (the "structured cards" layout choice).
 */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
