import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { S as SiteHeader, c as cn, B as Badge, H as HuntProgress } from "./hunt-progress-D1t-oomm.js";
import { u as useClan, p as progressFor, f as formatPower } from "./router-KM_8dAYk.js";
import "class-variance-authority";
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
function CompararPage() {
  const {
    data
  } = useClan();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const sortedNames = [...data.members].map((m) => m.name).sort((a, b) => a.localeCompare(b));
  function toggle(name) {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 4) return prev;
      return [...prev, name];
    });
  }
  const chosen = data.members.filter((m) => selected.includes(m.name));
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => navigate({
          to: "/"
        }), className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary", "aria-label": "Volver", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Comparador" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Selecciona hasta 4 miembros" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("p", { className: "mb-3 text-sm text-muted-foreground", children: [
          "Miembros (",
          selected.length,
          "/4)"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: sortedNames.map((name) => {
          const m = data.members.find((x) => x.name === name);
          const isSel = selected.includes(name);
          const disabled = !isSel && selected.length >= 4;
          return /* @__PURE__ */ jsxs("button", { onClick: () => toggle(name), disabled, className: cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors", isSel ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary text-foreground hover:border-primary/50", disabled && "cursor-not-allowed opacity-40"), children: [
            /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full", style: {
              backgroundColor: m.color
            } }),
            name
          ] }, name);
        }) })
      ] }),
      chosen.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center gap-3 py-16 text-center", children: [
        /* @__PURE__ */ jsx(Users, { className: "h-14 w-14 text-muted-foreground/40" }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Selecciona miembros" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Elige hasta 4 miembros para comparar sus estadísticas" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: chosen.map((m) => {
        const pct = progressFor(m);
        return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full", style: {
              backgroundColor: m.color
            } }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold", children: m.name })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mt-2 bg-primary/15 text-primary", children: m.difficulty }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-4 flex flex-col gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Era" }),
              /* @__PURE__ */ jsx("dd", { className: "font-medium", children: m.era })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Poder" }),
              /* @__PURE__ */ jsx("dd", { className: "font-medium tabular-nums", children: formatPower(m.power) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Puntos Caza" }),
              /* @__PURE__ */ jsx("dd", { className: "font-bold tabular-nums text-primary", children: m.huntPoints.toLocaleString("es-ES") })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-1 flex justify-between", children: [
                /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Progreso" }),
                /* @__PURE__ */ jsxs("dd", { className: "font-medium tabular-nums", children: [
                  pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx(HuntProgress, { pct })
            ] })
          ] })
        ] }, m.name);
      }) })
    ] })
  ] });
}
export {
  CompararPage as component
};
