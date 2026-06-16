import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Swords, Users, TrendingUp, Award, Zap } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { useClan } from "@/components/clan-provider";
import { formatPower } from "@/lib/clan-data";
import { cn } from "@/lib/utils";

export function EvolutionView() {
  const { data } = useClan();
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const totalPoints = data.members.reduce((s, m) => s + m.huntPoints, 0);
  const mvp = [...data.members].sort((a, b) => b.huntPoints - a.huntPoints)[0];

  const visibleMembers = data.members.filter((m) => !hidden.has(m.name));

  const powerData = useMemo(
    () =>
      [...visibleMembers]
        .sort((a, b) => b.power - a.power)
        .map((m) => ({ name: m.name, power: m.power, color: m.color })),
    [visibleMembers],
  );

  function toggle(name: string) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Swords} label="Total Cazas" value="1" />
        <StatCard
          icon={Users}
          label="Miembros Históricos"
          value={String(data.members.length)}
        />
        <StatCard
          icon={TrendingUp}
          label="Máx Puntos Caza"
          value={totalPoints.toLocaleString("es-ES")}
          highlight
        />
        <StatCard icon={Award} label="MVP Más Veces" value={mvp?.name ?? "—"} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <p className="mb-3 text-sm text-muted-foreground">
          Miembros (clic para mostrar/ocultar)
        </p>
        <div className="flex flex-wrap gap-2">
          {data.members.map((m) => {
            const isHidden = hidden.has(m.name);
            return (
              <button
                key={m.name}
                onClick={() => toggle(m.name)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  isHidden
                    ? "border-border text-muted-foreground opacity-50"
                    : "border-border bg-secondary text-foreground",
                )}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <Zap className="h-5 w-5 text-primary" />
          Poder por Miembro
        </h2>
        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={powerData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid horizontal={false} stroke="var(--border)" />
              <XAxis
                type="number"
                tickFormatter={(v) => formatPower(Number(v))}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "var(--secondary)" }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--foreground)",
                }}
                formatter={(v: number) => [formatPower(v), "Poder"]}
              />
              <Bar dataKey="power" radius={[0, 4, 4, 0]}>
                {powerData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-semibold">Resumen por Caza — Puntos Totales</h2>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[{ name: `Semana ${data.week}`, puntos: totalPoints }]}
              margin={{ left: 10, right: 20 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis
                tickFormatter={(v) => formatPower(Number(v))}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "var(--secondary)" }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--foreground)",
                }}
                formatter={(v: number) => [v.toLocaleString("es-ES"), "Puntos"]}
              />
              <Bar
                dataKey="puntos"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
                maxBarSize={120}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
