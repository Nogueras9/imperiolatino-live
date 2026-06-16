import { cn } from "@/lib/utils";

function colorFor(pct: number): string {
  if (pct >= 75) return "bg-[var(--success)]";
  if (pct >= 50) return "bg-[var(--warning)]";
  return "bg-destructive";
}

export function HuntProgress({ pct, className }: { pct: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div
        className={cn("h-full rounded-full transition-all", colorFor(clamped))}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
