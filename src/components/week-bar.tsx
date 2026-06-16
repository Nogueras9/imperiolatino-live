import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ClanData } from "@/lib/clan-data";

export function WeekBar({ data }: { data: ClanData }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <button
        disabled
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground opacity-40"
        aria-label="Semana anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        <span className="text-lg font-bold">
          Semana {data.week} — {data.monthLabel}
        </span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {data.startDate} - {data.endDate}
        </span>
        {data.live && (
          <span className="flex items-center gap-1.5 rounded-md bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
            EN VIVO
          </span>
        )}
      </div>
      <button
        disabled
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground opacity-40"
        aria-label="Semana siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
