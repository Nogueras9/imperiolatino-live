import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trophy, Target, TrendingUp, Activity, Shield } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { StatCard } from "@/components/stat-card";
import { HuntProgress } from "@/components/hunt-progress";
import { useClan } from "@/components/clan-provider";
import { formatPower, maxPointsFor, progressFor } from "@/lib/clan-data";

export const Route = createFileRoute("/member/$name")({
  component: MemberPage,
});

function MemberPage() {
  const { name } = Route.useParams();
  const { data } = useClan();
  const navigate = useNavigate();
  const member = data.members.find((m) => m.name === decodeURIComponent(name));

  if (!member) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-2xl font-bold">Miembro no encontrado</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            Volver al ranking
          </Link>
        </main>
      </div>
    );
  }

  const pct = progressFor(member);
  const max = maxPointsFor(member.difficulty);
  const completed = pct >= 100 ? 1 : 0;

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
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
            style={{ backgroundColor: member.color }}
          >
            <Shield className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <p className="text-sm text-muted-foreground">
              {member.era} — Poder actual:{" "}
              <span className="font-semibold">{formatPower(member.power)}</span>
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto bg-primary/15 text-primary">
            {member.difficulty}
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Trophy}
            label="Puntos Totales"
            value={member.huntPoints.toLocaleString("es-ES")}
            highlight
          />
          <StatCard icon={Target} label="Cazas Completadas" value={`${completed}/1`} />
          <StatCard icon={TrendingUp} label="Poder Máximo" value={formatPower(member.power)} />
          <StatCard
            icon={Activity}
            label="Promedio Pts"
            value={member.huntPoints.toLocaleString("es-ES")}
          />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <h2 className="mb-1 font-semibold">Progreso de la caza actual</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {member.huntPoints.toLocaleString("es-ES")} / {max.toLocaleString("es-ES")} puntos (
            {pct}%)
          </p>
          <HuntProgress pct={pct} className="h-3" />
          {member.justified && member.reason && (
            <p className="mt-3 text-sm text-[var(--success)]">
              Ausencia justificada: {member.reason}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-semibold">Puntos de Caza</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[{ name: `Semana ${data.week}`, puntos: member.huntPoints }]}
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
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
                  fill={member.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={120}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
