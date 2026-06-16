import { useEffect, useState } from "react";
import { Radio, Clock, Trophy, CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { useClan } from "@/components/clan-provider";
import { progressFor } from "@/lib/clan-data";

function useCountdown(endDate: string) {
  const [text, setText] = useState("0d 00:00:00");
  useEffect(() => {
    function tick() {
      const end = new Date(endDate + "T23:59:59").getTime();
      const diff = end - Date.now();
      if (diff <= 0) {
        setText("0d 00:00:00");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setText(`${d}d ${pad(h)}:${pad(m)}:${pad(s)}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDate]);
  return text;
}

export function EnVivoView() {
  const { data } = useClan();
  const countdown = useCountdown(data.endDate);

  const ranked = [...data.members].sort((a, b) => b.huntPoints - a.huntPoints);
  const maxPoints = Math.max(...data.members.map((m) => m.huntPoints), 1);
  const totalPoints = data.members.reduce((s, m) => s + m.huntPoints, 0);
  const completed = data.members.filter((m) => progressFor(m) >= 100).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-xl border border-destructive/30 bg-gradient-to-r from-destructive/10 to-transparent p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-destructive">
              <Radio className="h-4 w-4 animate-pulse" />
              Caza en Vivo
            </div>
            <h2 className="mt-1 text-2xl font-bold">
              Semana {data.week} — {data.monthLabel}
            </h2>
            <p className="text-sm text-muted-foreground">
              {data.startDate} — {data.endDate}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-3 font-mono text-xl font-bold tabular-nums">
            <Clock className="h-5 w-5 text-muted-foreground" />
            {countdown}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Trophy}
          label="Puntos Acumulados"
          value={totalPoints.toLocaleString("es-ES")}
          highlight
        />
        <StatCard
          icon={CheckCircle2}
          label="Han Completado"
          value={`${completed} / ${data.members.length}`}
        />
        <StatCard icon={Users} label="Participantes" value={String(data.members.length)} />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold">Ranking en tiempo real</h2>
        </div>
        <ul className="divide-y divide-border/60">
          {ranked.map((m, i) => {
            const pct = progressFor(m);
            const barWidth = (m.huntPoints / maxPoints) * 100;
            return (
              <li key={m.name} className="flex items-center gap-3 px-4 py-3">
                <span className="w-6 shrink-0 text-center font-bold tabular-nums text-primary">
                  {i + 1}
                </span>
                <span className="w-28 shrink-0 truncate font-medium">{m.name}</span>
                <Badge
                  variant="secondary"
                  className="hidden shrink-0 bg-primary/15 text-primary sm:inline-flex"
                >
                  {m.difficulty}
                </Badge>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right font-bold tabular-nums">
                  {m.huntPoints.toLocaleString("es-ES")}
                </span>
                <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
