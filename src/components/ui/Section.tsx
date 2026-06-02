import type { ReactNode } from "react";

/**
 * Reusable section wrapper used by every page section.
 * - `id` powers the in-page anchor navigation.
 * - `aria-labelledby` (pointing at the heading) turns each <section> into a named
 *   landmark region, so screen-reader users can jump between them.
 * - `scroll-mt-24` offsets the anchor so headings aren't hidden under the sticky header.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <h2
          id={headingId}
          className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-subtle"
        >
          <span className="h-px w-6 bg-accent" aria-hidden />
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
