/**
 * Headline stat shown in the hero (e.g. "Codeforces — Expert · max 1745").
 * The value uses the mono font so numbers/ratings line up crisply — this is the
 * competitive-programming signal we want recruiters to catch immediately.
 */
export function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-subtle">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}
