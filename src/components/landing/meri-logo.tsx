export function MeriLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface-strong"
        aria-hidden="true"
      >
        <span className="flex h-4 items-end gap-0.5">
          <span className="h-2 w-0.5 rounded-full bg-accent/70" />
          <span className="h-4 w-0.5 rounded-full bg-accent" />
          <span className="h-3 w-0.5 rounded-full bg-accent/80" />
        </span>
      </span>
      {!compact && (
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Meri
        </span>
      )}
    </span>
  );
}
