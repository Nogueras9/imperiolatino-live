import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Users, Trophy, Target, Shield, ArrowUpDown, Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { WeekBar } from "@/components/week-bar";
import { HuntProgress } from "@/components/hunt-progress";
import { MemberEditDialog } from "@/components/member-edit-dialog";
import { useClan } from "@/components/clan-provider";
import { formatPower, progressFor, type Member } from "@/lib/clan-data";

type SortKey = "name" | "era" | "power" | "difficulty" | "huntPoints";

export function RankingView() {
  const { data, isAdmin } = useClan();
  const [sortKey, setSortKey] = useState<SortKey>("huntPoints");
  const [asc, setAsc] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const sorted = useMemo(() => {
    const arr = [...data.members];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name" || sortKey === "era" || sortKey === "difficulty") {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      } else {
        cmp = (a[sortKey] as number) - (b[sortKey] as number);
      }
      return asc ? cmp : -cmp;
    });
    return arr;
  }, [data.members, sortKey, asc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(false);
    }
  }

  const totalPoints = data.members.reduce((s, m) => s + m.huntPoints, 0);
  const participants = data.members.filter((m) => m.huntPoints > 0).length;

  function openEdit(m: Member) {
    setCreating(false);
    setEditing(m);
    setDialogOpen(true);
  }
  function openCreate() {
    setCreating(true);
    setEditing(null);
    setDialogOpen(true);
  }

  const cols: { key: SortKey; label: string }[] = [
    { key: "name", label: "Miembro" },
    { key: "era", label: "Era" },
    { key: "power", label: "Poder" },
    { key: "difficulty", label: "Dificultad" },
    { key: "huntPoints", label: "Puntos Caza" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <WeekBar data={data} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Miembros" value={String(data.members.length)} />
        <StatCard
          icon={Trophy}
          label="Puntos Totales"
          value={totalPoints.toLocaleString("es-ES")}
          highlight
        />
        <StatCard
          icon={Target}
          label="Participantes"
          value={`${participants} / ${data.members.length}`}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <Shield className="h-5 w-5 text-primary" />
            Ranking de Miembros
          </h2>
          {isAdmin && (
            <Button size="sm" onClick={openCreate}>
              <Plus className="mr-1 h-4 w-4" />
              Añadir miembro
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">#</th>
                {cols.map((c) => (
                  <th key={c.key} className="px-4 py-3 text-left font-medium">
                    <button
                      onClick={() => toggleSort(c.key)}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      {c.label}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-left font-medium">Progreso</th>
                {isAdmin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => {
                const pct = progressFor(m);
                return (
                  <tr
                    key={m.name}
                    className="border-b border-border/60 last:border-0 hover:bg-secondary/40"
                  >
                    <td className="px-4 py-3 font-bold tabular-nums text-primary">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        to="/member/$name"
                        params={{ name: m.name }}
                        className="flex items-center gap-2 font-medium hover:text-primary hover:underline"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                        {m.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.era}</td>
                    <td className="px-4 py-3 tabular-nums">{formatPower(m.power)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="bg-primary/15 text-primary">
                        {m.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-bold tabular-nums">
                      {m.huntPoints.toLocaleString("es-ES")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <HuntProgress pct={pct} className="w-28" />
                        <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                          {pct}%
                        </span>
                      </div>
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(m)}
                          aria-label={`Editar ${m.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <MemberEditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        member={creating ? null : editing}
      />
    </div>
  );
}
