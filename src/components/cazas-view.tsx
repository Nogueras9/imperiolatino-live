import { AlertTriangle, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WeekBar } from "@/components/week-bar";
import { HuntProgress } from "@/components/hunt-progress";
import { useClan } from "@/components/clan-provider";
import { maxPointsFor, progressFor } from "@/lib/clan-data";

export function CazasView() {
  const { data, isAdmin, updateMember } = useClan();
  const incomplete = data.members.filter((m) => progressFor(m) < 100);

  return (
    <div className="flex flex-col gap-6">
      <WeekBar data={data} />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />
            Cazas Incompletas ({incomplete.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Miembro</th>
                <th className="px-4 py-3 text-left font-medium">Dificultad</th>
                <th className="px-4 py-3 text-left font-medium">Puntos</th>
                <th className="px-4 py-3 text-left font-medium">Completado</th>
                <th className="px-4 py-3 text-left font-medium">Justificado</th>
                <th className="px-4 py-3 text-left font-medium">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {incomplete.map((m) => {
                const pct = progressFor(m);
                const max = maxPointsFor(m.difficulty);
                return (
                  <tr
                    key={m.name}
                    className="border-b border-border/60 last:border-0 hover:bg-secondary/40"
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2 font-medium">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                        {m.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="bg-primary/15 text-primary">
                        {m.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      <span className="font-bold">{m.huntPoints.toLocaleString("es-ES")}</span>
                      <span className="text-muted-foreground"> / {max.toLocaleString("es-ES")} </span>
                      <span className="text-[var(--warning)]">({pct}%)</span>
                    </td>
                    <td className="px-4 py-3">
                      <HuntProgress pct={pct} className="w-32" />
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin ? (
                        <button
                          onClick={() => updateMember(m.name, { justified: !m.justified })}
                          className="flex items-center gap-1.5"
                        >
                          {m.justified ? (
                            <span className="flex items-center gap-1 rounded-md bg-[var(--success)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--success)]">
                              <Check className="h-3 w-3" /> Sí
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                              <X className="h-3 w-3" /> No
                            </span>
                          )}
                        </button>
                      ) : m.justified ? (
                        <span className="flex w-fit items-center gap-1 rounded-md bg-[var(--success)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--success)]">
                          <Check className="h-3 w-3" /> Sí
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="min-w-[180px] px-4 py-3">
                      {isAdmin ? (
                        <Input
                          value={m.reason}
                          onChange={(e) => updateMember(m.name, { reason: e.target.value })}
                          placeholder="Motivo..."
                          className="h-8"
                        />
                      ) : m.reason ? (
                        <span className="text-muted-foreground">{m.reason}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
