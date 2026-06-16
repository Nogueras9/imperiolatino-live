import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Trophy, Target, TrendingUp, Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { S as SiteHeader, B as Badge, H as HuntProgress } from "./hunt-progress-D1t-oomm.js";
import { S as StatCard } from "./stat-card-DqbLNff6.js";
import { a as Route, u as useClan, p as progressFor, m as maxPointsFor, f as formatPower } from "./router-KM_8dAYk.js";
import "class-variance-authority";
import "react";
import "sonner";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "./client-C8Qnidpb.js";
import "@supabase/supabase-js";
import "zod";
function MemberPage() {
  const {
    name
  } = Route.useParams();
  const {
    data
  } = useClan();
  const navigate = useNavigate();
  const member = data.members.find((m) => m.name === decodeURIComponent(name));
  if (!member) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-3xl px-4 py-16 text-center sm:px-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Miembro no encontrado" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-4 inline-block text-primary hover:underline", children: "Volver al ranking" })
      ] })
    ] });
  }
  const pct = progressFor(member);
  const max = maxPointsFor(member.difficulty);
  const completed = pct >= 100 ? 1 : 0;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => navigate({
          to: "/"
        }), className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary", "aria-label": "Volver", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground", style: {
          backgroundColor: member.color
        }, children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: member.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            member.era,
            " — Poder actual:",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: formatPower(member.power) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-auto bg-primary/15 text-primary", children: member.difficulty })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsx(StatCard, { icon: Trophy, label: "Puntos Totales", value: member.huntPoints.toLocaleString("es-ES"), highlight: true }),
        /* @__PURE__ */ jsx(StatCard, { icon: Target, label: "Cazas Completadas", value: `${completed}/1` }),
        /* @__PURE__ */ jsx(StatCard, { icon: TrendingUp, label: "Poder Máximo", value: formatPower(member.power) }),
        /* @__PURE__ */ jsx(StatCard, { icon: Activity, label: "Promedio Pts", value: member.huntPoints.toLocaleString("es-ES") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-1 font-semibold", children: "Progreso de la caza actual" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-sm text-muted-foreground", children: [
          member.huntPoints.toLocaleString("es-ES"),
          " / ",
          max.toLocaleString("es-ES"),
          " puntos (",
          pct,
          "%)"
        ] }),
        /* @__PURE__ */ jsx(HuntProgress, { pct, className: "h-3" }),
        member.justified && member.reason && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-[var(--success)]", children: [
          "Ausencia justificada: ",
          member.reason
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 font-semibold", children: "Puntos de Caza" }),
        /* @__PURE__ */ jsx("div", { className: "h-[280px] w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: [{
          name: `Semana ${data.week}`,
          puntos: member.huntPoints
        }], margin: {
          left: 10,
          right: 20
        }, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { vertical: false, stroke: "var(--border)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", stroke: "var(--muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsx(Tooltip, { cursor: {
            fill: "var(--secondary)"
          }, contentStyle: {
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--foreground)"
          }, formatter: (v) => [v.toLocaleString("es-ES"), "Puntos"] }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "puntos", fill: member.color, radius: [4, 4, 0, 0], maxBarSize: 120 })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  MemberPage as component
};
