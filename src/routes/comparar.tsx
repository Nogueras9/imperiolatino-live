import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { HuntProgress } from "@/components/hunt-progress";
import { useClan } from "@/components/clan-provider";
import { formatPower, progressFor } from "@/lib/clan-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/comparar")({
  head: () => ({
    meta: [
      { title: "Comparar miembros — Imperio Latino" },
      {
        name: "description",
        content: "Compara hasta 4 miembros del clan Imperio Latino lado a lado.",
      },
    ],
  }),
  component: CompararPage,
});

function CompararPage() {
  const { data } = useClan();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const sortedNames = [...data.members]
    .map((m) => m.name)
    .sort((a, b) => a.localeCompare(b));

  function toggle(name: string) {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 4) return prev;
      return [...prev, name];
    });
  }

  const chosen = data.members.filter((m) => selected.includes(m.name));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Users className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">Comparador</h1>
            <p className="text-sm text-muted-foreground">Selecciona hasta 4 miembros</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-3 text-sm text-muted-foreground">
            Miembros ({selected.length}/4)
          </p>
          <div className="flex flex-wrap gap-2">
            {sortedNames.map((name) => {
              const m = data.members.find((x) => x.name === name)!;
              const isSel = selected.includes(name);
              const disabled = !isSel && selected.length >= 4;
              return (
                <button
                  key={name}
                  onClick={() => toggle(name)}
                  disabled={disabled}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    isSel
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-secondary text-foreground hover:border-primary/50",
                    disabled && "cursor-not-allowed opacity-40",
                  )}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {chosen.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 py-16 text-center">
            <Users className="h-14 w-14 text-muted-foreground/40" />
            <h2 className="text-lg font-semibold">Selecciona miembros</h2>
            <p className="text-sm text-muted-foreground">
              Elige hasta 4 miembros para comparar sus estadísticas
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {chosen.map((m) => {
              const pct = progressFor(m);
              return (
                <div key={m.name} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                    <h3 className="font-bold">{m.name}</h3>
                  </div>
                  <Badge variant="secondary" className="mt-2 bg-primary/15 text-primary">
                    {m.difficulty}
                  </Badge>
                  <dl className="mt-4 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Era</dt>
                      <dd className="font-medium">{m.era}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Poder</dt>
                      <dd className="font-medium tabular-nums">{formatPower(m.power)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Puntos Caza</dt>
                      <dd className="font-bold tabular-nums text-primary">
                        {m.huntPoints.toLocaleString("es-ES")}
                      </dd>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between">
                        <dt className="text-muted-foreground">Progreso</dt>
                        <dd className="font-medium tabular-nums">{pct}%</dd>
                      </div>
                      <HuntProgress pct={pct} />
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
