import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5",
        highlight ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className={cn("mt-2 text-3xl font-bold tabular-nums", highlight && "text-primary")}>
        {value}
      </p>
    </div>
  );
}
