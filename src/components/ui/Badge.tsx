/**
 * Small pill for tech tags / skills. Mono font ties into the engineer aesthetic
 * and keeps tag widths even.
 */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
