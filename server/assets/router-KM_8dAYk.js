import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import { s as supabase } from "./client-C8Qnidpb.js";
import { Toaster as Toaster$1 } from "sonner";
import { z } from "zod";
const appCss = "/assets/styles-DPeHVp9Q.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const DIFFICULTIES = {
  "Veterano II": 2800,
  "Maestro II": 3600,
  "Gran Maestro I": 4e3,
  "Gran Maestro II": 4400
};
const DIFFICULTY_LIST = Object.keys(DIFFICULTIES);
const ERAS = [
  "Era Ibérica",
  "Alta Edad Media",
  "Reino de Sicilia",
  "Era Gótica Temprana",
  "Edad Feudal"
];
const PALETTE = [
  "#3b82f6",
  "#0ea5e9",
  "#06b6d4",
  "#22d3ee",
  "#14b8a6",
  "#10b981",
  "#22c55e",
  "#84cc16",
  "#65a30d",
  "#eab308",
  "#facc15",
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#f43f5e",
  "#fb7185",
  "#ec4899",
  "#d946ef",
  "#a855f7",
  "#8b5cf6"
];
const ADMIN_PASSWORD = "imperio2026";
function maxPointsFor(difficulty) {
  return DIFFICULTIES[difficulty] ?? 4e3;
}
function progressFor(member) {
  const max = maxPointsFor(member.difficulty);
  if (max <= 0) return 0;
  return Math.round(member.huntPoints / max * 100);
}
function formatPower(power) {
  if (power >= 1e6) return (power / 1e6).toFixed(1) + " M";
  if (power >= 1e3) return (power / 1e3).toFixed(1) + " K";
  return String(power);
}
const DEFAULT_DATA = {
  clanName: "IMPERIO LATINO",
  week: 15,
  monthLabel: "Abril 2026",
  startDate: "2026-04-10",
  endDate: "2026-04-16",
  live: true,
  members: [
    { name: "Silchu", era: "Era Ibérica", power: 518300, difficulty: "Gran Maestro I", huntPoints: 3150, justified: false, reason: "", color: "#3b82f6" },
    { name: "Xikily", era: "Reino de Sicilia", power: 463100, difficulty: "Gran Maestro I", huntPoints: 2950, justified: false, reason: "", color: "#8b5cf6" },
    { name: "Nogueras9", era: "Era Ibérica", power: 434900, difficulty: "Gran Maestro I", huntPoints: 2850, justified: false, reason: "", color: "#84cc16" },
    { name: "Sergio", era: "Reino de Sicilia", power: 580500, difficulty: "Gran Maestro I", huntPoints: 2750, justified: false, reason: "", color: "#ec4899" },
    { name: "pepebenz", era: "Alta Edad Media", power: 691e3, difficulty: "Gran Maestro I", huntPoints: 2700, justified: false, reason: "", color: "#22c55e" },
    { name: "xTonino", era: "Reino de Sicilia", power: 554600, difficulty: "Maestro II", huntPoints: 2610, justified: false, reason: "", color: "#06b6d4" },
    { name: "Josect87", era: "Era Ibérica", power: 547300, difficulty: "Gran Maestro I", huntPoints: 2500, justified: false, reason: "", color: "#f43f5e" },
    { name: "MarkDux", era: "Reino de Sicilia", power: 461500, difficulty: "Gran Maestro I", huntPoints: 2500, justified: false, reason: "", color: "#0ea5e9" },
    { name: "God Uchiha", era: "Alta Edad Media", power: 898100, difficulty: "Gran Maestro I", huntPoints: 2400, justified: false, reason: "", color: "#14b8a6" },
    { name: "TeMiL", era: "Alta Edad Media", power: 719400, difficulty: "Gran Maestro I", huntPoints: 2350, justified: false, reason: "", color: "#a855f7" },
    { name: "#1172079", era: "Era Ibérica", power: 513800, difficulty: "Gran Maestro I", huntPoints: 2350, justified: false, reason: "", color: "#eab308" },
    { name: "Deivid", era: "Edad Feudal", power: 437200, difficulty: "Maestro II", huntPoints: 2350, justified: false, reason: "", color: "#f97316" },
    { name: "Snide", era: "Edad Feudal", power: 315100, difficulty: "Veterano II", huntPoints: 2340, justified: false, reason: "", color: "#ef4444" },
    { name: "Judasare", era: "Alta Edad Media", power: 606300, difficulty: "Gran Maestro I", huntPoints: 2300, justified: false, reason: "", color: "#3b82f6" },
    { name: "Merak", era: "Alta Edad Media", power: 612400, difficulty: "Gran Maestro I", huntPoints: 2250, justified: false, reason: "", color: "#d946ef" },
    { name: "echelon", era: "Reino de Sicilia", power: 592e3, difficulty: "Gran Maestro I", huntPoints: 2e3, justified: false, reason: "", color: "#10b981" },
    { name: "ARGENTA", era: "Reino de Sicilia", power: 564900, difficulty: "Veterano II", huntPoints: 1960, justified: false, reason: "", color: "#f59e0b" },
    { name: "jony", era: "Alta Edad Media", power: 580100, difficulty: "Gran Maestro II", huntPoints: 1210, justified: false, reason: "", color: "#22d3ee" },
    { name: "cersei", era: "Reino de Sicilia", power: 596500, difficulty: "Gran Maestro II", huntPoints: 770, justified: false, reason: "", color: "#fb7185" },
    { name: "Sir Haplo", era: "Reino de Sicilia", power: 551400, difficulty: "Gran Maestro I", huntPoints: 0, justified: false, reason: "", color: "#fbbf24" }
  ]
};
const ClanContext = createContext(null);
async function fetchClanState() {
  const { data, error } = await supabase.from("clan_state").select("data").eq("id", 1).maybeSingle();
  if (error) {
    console.error("[clan] fetch error", error);
    return DEFAULT_DATA;
  }
  if (!data) {
    await supabase.from("clan_state").insert({ id: 1, data: DEFAULT_DATA });
    return DEFAULT_DATA;
  }
  return data.data ?? DEFAULT_DATA;
}
async function pushClanState(next) {
  const { error } = await supabase.from("clan_state").update({ data: next, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", 1);
  if (error) console.error("[clan] update error", error);
}
function ClanProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lastLocalUpdate = useRef(0);
  useEffect(() => {
    let cancelled = false;
    fetchClanState().then((d) => {
      if (cancelled) return;
      setData(d);
      setLoaded(true);
    });
    try {
      if (sessionStorage.getItem("imperio-admin") === "1") setIsAdmin(true);
    } catch {
    }
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const channel = supabase.channel("clan_state_changes").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "clan_state", filter: "id=eq.1" },
      (payload) => {
        if (Date.now() - lastLocalUpdate.current < 1500) return;
        const newRow = payload.new;
        if (newRow?.data) setData(newRow.data);
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const persist = useCallback((next) => {
    lastLocalUpdate.current = Date.now();
    setData(next);
    pushClanState(next);
  }, []);
  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem("imperio-admin", "1");
      } catch {
      }
      return true;
    }
    return false;
  }, []);
  const logout = useCallback(() => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem("imperio-admin");
    } catch {
    }
  }, []);
  const updateClan = useCallback(
    (patch) => {
      setData((prev) => {
        const next = { ...prev, ...patch };
        lastLocalUpdate.current = Date.now();
        pushClanState(next);
        return next;
      });
    },
    []
  );
  const updateMember = useCallback((name, patch) => {
    setData((prev) => {
      const next = {
        ...prev,
        members: prev.members.map((m) => m.name === name ? { ...m, ...patch } : m)
      };
      lastLocalUpdate.current = Date.now();
      pushClanState(next);
      return next;
    });
  }, []);
  const addMember = useCallback((member) => {
    setData((prev) => {
      const next = { ...prev, members: [...prev.members, member] };
      lastLocalUpdate.current = Date.now();
      pushClanState(next);
      return next;
    });
  }, []);
  const removeMember = useCallback((name) => {
    setData((prev) => {
      const next = {
        ...prev,
        members: prev.members.filter((m) => m.name !== name)
      };
      lastLocalUpdate.current = Date.now();
      pushClanState(next);
      return next;
    });
  }, []);
  const resetData = useCallback(() => persist(DEFAULT_DATA), [persist]);
  return /* @__PURE__ */ jsx(
    ClanContext.Provider,
    {
      value: {
        data,
        isAdmin,
        loaded,
        login,
        logout,
        updateClan,
        updateMember,
        addMember,
        removeMember,
        resetData
      },
      children: /* @__PURE__ */ jsx("div", { style: { visibility: loaded ? "visible" : "hidden" }, children })
    }
  );
}
function useClan() {
  const ctx = useContext(ClanContext);
  if (!ctx) throw new Error("useClan debe usarse dentro de ClanProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Página no encontrada" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "La página que buscas no existe o se ha movido." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Volver al inicio"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Esta página no cargó" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ocurrió un error. Puedes intentar recargar o volver al inicio." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Reintentar"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Inicio"
        }
      )
    ] })
  ] }) });
}
const Route$3 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Imperio Latino — Tracker de Caza | Heroes of History" },
      {
        name: "description",
        content: "Tracker de actividad del clan Imperio Latino para Heroes of History: ranking de caza, evolución, cazas incompletas y seguimiento en vivo."
      },
      { name: "theme-color", content: "#0f1729" },
      { property: "og:title", content: "Imperio Latino — Tracker de Caza | Heroes of History" },
      {
        property: "og:description",
        content: "Ranking de caza, evolución y seguimiento en vivo del clan Imperio Latino."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Imperio Latino — Tracker de Caza | Heroes of History" },
      { name: "description", content: "Real-Time Sync ensures all users see the latest data instantly across the application." },
      { property: "og:description", content: "Real-Time Sync ensures all users see the latest data instantly across the application." },
      { name: "twitter:description", content: "Real-Time Sync ensures all users see the latest data instantly across the application." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9598b489-6f33-4361-bc00-7faa1ff26d0d/id-preview-56585d67--18bcd622-3f4c-4272-82b3-148b06627f88.lovable.app-1781599653280.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9598b489-6f33-4361-bc00-7faa1ff26d0d/id-preview-56585d67--18bcd622-3f4c-4272-82b3-148b06627f88.lovable.app-1781599653280.png" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "es", className: "dark", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$3.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(ClanProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$2 = () => import("./comparar-BG6NLGoU.js");
const Route$2 = createFileRoute("/comparar")({
  head: () => ({
    meta: [{
      title: "Comparar miembros — Imperio Latino"
    }, {
      name: "description",
      content: "Compara hasta 4 miembros del clan Imperio Latino lado a lado."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-D7lQmCoQ.js");
const searchSchema = z.object({
  view: z.enum(["ranking", "evolucion", "cazas", "envivo", "estadisticas"]).optional()
});
const Route$1 = createFileRoute("/")({
  validateSearch: (s) => searchSchema.parse(s),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./member._name-BNKbeWeR.js");
const Route = createFileRoute("/member/$name")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const CompararRoute = Route$2.update({
  id: "/comparar",
  path: "/comparar",
  getParentRoute: () => Route$3
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const MemberNameRoute = Route.update({
  id: "/member/$name",
  path: "/member/$name",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  CompararRoute,
  MemberNameRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  DIFFICULTY_LIST as D,
  ERAS as E,
  PALETTE as P,
  Route$1 as R,
  Route as a,
  formatPower as f,
  maxPointsFor as m,
  progressFor as p,
  router as r,
  useClan as u
};
