import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { SiteHeader, type HomeView } from "@/components/site-header";
import { RankingView } from "@/components/ranking-view";
import { EvolutionView } from "@/components/evolution-view";
import { CazasView } from "@/components/cazas-view";
import { EnVivoView } from "@/components/envivo-view";
import { AdminBanner } from "@/components/admin-banner";
import { EstadisticasView } from "@/components/estadisticas-view";

const searchSchema = z.object({
view: z.enum([
  "ranking",
  "evolucion",
  "cazas",
  "envivo",
  "estadisticas"
]).optional(),

export const Route = createFileRoute("/")({
  validateSearch: (s) => searchSchema.parse(s),
  component: Index,
});

function Index() {
  const search = Route.useSearch();
  const [view, setView] = useState<HomeView>(search.view ?? "ranking");

  useEffect(() => {
    if (search.view && search.view !== view) setView(search.view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.view]);

  return (
    <div className="min-h-screen">
      <SiteHeader active={view} onChange={setView} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <AdminBanner />
        {view === "ranking" && <RankingView />}
        {view === "evolucion" && <EvolutionView />}
        {view === "cazas" && <CazasView />}
        {view === "envivo" && <EnVivoView />}
        {view === "estadisticas" && <EstadisticasView />}
      </main>
    </div>
  );
}
