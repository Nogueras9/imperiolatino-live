import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { c as cn, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, e as DialogDescription, L as Label, I as Input, f as DialogFooter, g as Button, B as Badge, H as HuntProgress, S as SiteHeader } from "./hunt-progress-D1t-oomm.js";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ChevronDown, Check, ChevronUp, Trash2, Users, Trophy, Target, Shield, Plus, ArrowUpDown, Pencil, Swords, TrendingUp, Award, Zap, AlertTriangle, X, Radio, Clock, CheckCircle2, ShieldCheck, RotateCcw } from "lucide-react";
import { S as StatCard } from "./stat-card-DqbLNff6.js";
import { toast } from "sonner";
import * as SelectPrimitive from "@radix-ui/react-select";
import { u as useClan, E as ERAS, D as DIFFICULTY_LIST, P as PALETTE, p as progressFor, f as formatPower, m as maxPointsFor, R as Route } from "./router-KM_8dAYk.js";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "./client-C8Qnidpb.js";
import "@supabase/supabase-js";
import "zod";
function WeekBar({ data }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 py-2", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        disabled: true,
        className: "flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground opacity-40",
        "aria-label": "Semana anterior",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 text-center", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold", children: [
        "Semana ",
        data.week,
        " — ",
        data.monthLabel
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground", children: [
        data.startDate,
        " - ",
        data.endDate
      ] }),
      data.live && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 rounded-md bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive", children: [
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" }),
        "EN VIVO"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        disabled: true,
        className: "flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground opacity-40",
        "aria-label": "Semana siguiente",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      }
    )
  ] });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function emptyMember() {
  return {
    name: "",
    era: "",
    power: 0,
    difficulty: "Gran Maestro I",
    huntPoints: 0,
    justified: false,
    reason: "",
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
  };
}
function MemberEditDialog({ open, onOpenChange, member }) {
  const { updateMember, addMember, removeMember, data } = useClan();
  const isNew = member === null;
  const [form, setForm] = useState(member ?? emptyMember());
  useEffect(() => {
    setForm(member ?? emptyMember());
  }, [member, open]);
  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("El nombre es obligatorio.");
      return;
    }
    if (isNew) {
      if (data.members.some((m) => m.name === form.name.trim())) {
        toast.error("Ya existe un miembro con ese nombre.");
        return;
      }
      addMember({ ...form, name: form.name.trim() });
      toast.success(`Miembro "${form.name.trim()}" añadido.`);
    } else {
      updateMember(member.name, form);
      toast.success("Miembro actualizado.");
    }
    onOpenChange(false);
  }
  function handleDelete() {
    if (member) {
      removeMember(member.name);
      toast.success(`Miembro "${member.name}" eliminado.`);
      onOpenChange(false);
    }
  }
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: isNew ? "Añadir miembro" : `Editar — ${member?.name}` }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Gestiona los datos de caza y el perfil del miembro." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "m-name", children: "Nombre" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "m-name",
            value: form.name,
            onChange: (e) => set("name", e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "m-era", children: "Era" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "m-era",
            list: "era-options",
            value: form.era,
            onChange: (e) => set("era", e.target.value),
            placeholder: "Ej: Era Bizantina"
          }
        ),
        /* @__PURE__ */ jsx("datalist", { id: "era-options", children: ERAS.map((e) => /* @__PURE__ */ jsx("option", { value: e }, e)) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: ERAS.map((e) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => set("era", e),
            className: `rounded-full border px-2.5 py-1 text-xs transition-colors ${form.era === e ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`,
            children: e
          },
          e
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Dificultad" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: form.difficulty,
            onValueChange: (v) => set("difficulty", v),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: DIFFICULTY_LIST.map((d) => /* @__PURE__ */ jsx(SelectItem, { value: d, children: d }, d)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "m-power", children: "Poder" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "m-power",
              type: "number",
              value: form.power,
              onChange: (e) => set("power", Number(e.target.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "m-points", children: "Puntos Caza" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "m-points",
              type: "number",
              value: form.huntPoints,
              onChange: (e) => set("huntPoints", Number(e.target.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Color" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: PALETTE.map((c) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => set("color", c),
            className: "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
            style: {
              backgroundColor: c,
              borderColor: form.color === c ? "#fff" : "transparent"
            },
            "aria-label": `Color ${c}`
          },
          c
        )) })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: form.justified,
            onChange: (e) => set("justified", e.target.checked),
            className: "h-4 w-4 accent-[var(--primary)]"
          }
        ),
        "Ausencia justificada"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "m-reason", children: "Motivo / Notas" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "m-reason",
            value: form.reason,
            onChange: (e) => set("reason", e.target.value),
            placeholder: "Ej: vacaciones, sin conexión..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "flex-col gap-2 sm:flex-row sm:justify-between", children: [
        !isNew && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", onClick: handleDelete, children: [
          /* @__PURE__ */ jsx(Trash2, { className: "mr-1 h-4 w-4" }),
          "Eliminar"
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "sm:ml-auto", children: isNew ? "Añadir" : "Guardar" })
      ] })
    ] })
  ] }) });
}
function RankingView() {
  const { data, isAdmin } = useClan();
  const [sortKey, setSortKey] = useState("huntPoints");
  const [asc, setAsc] = useState(false);
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const sorted = useMemo(() => {
    const arr = [...data.members];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name" || sortKey === "era" || sortKey === "difficulty") {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      } else {
        cmp = a[sortKey] - b[sortKey];
      }
      return asc ? cmp : -cmp;
    });
    return arr;
  }, [data.members, sortKey, asc]);
  function toggleSort(key) {
    if (sortKey === key) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(false);
    }
  }
  const totalPoints = data.members.reduce((s, m) => s + m.huntPoints, 0);
  const participants = data.members.filter((m) => m.huntPoints > 0).length;
  function openEdit(m) {
    setCreating(false);
    setEditing(m);
    setDialogOpen(true);
  }
  function openCreate() {
    setCreating(true);
    setEditing(null);
    setDialogOpen(true);
  }
  const cols = [
    { key: "name", label: "Miembro" },
    { key: "era", label: "Era" },
    { key: "power", label: "Poder" },
    { key: "difficulty", label: "Dificultad" },
    { key: "huntPoints", label: "Puntos Caza" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(WeekBar, { data }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: Users, label: "Miembros", value: String(data.members.length) }),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: Trophy,
          label: "Puntos Totales",
          value: totalPoints.toLocaleString("es-ES"),
          highlight: true
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: Target,
          label: "Participantes",
          value: `${participants} / ${data.members.length}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border px-5 py-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-primary" }),
          "Ranking de Miembros"
        ] }),
        isAdmin && /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: openCreate, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
          "Añadir miembro"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-xs uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "#" }),
          cols.map((c) => /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => toggleSort(c.key),
              className: "flex items-center gap-1 hover:text-foreground",
              children: [
                c.label,
                /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3 w-3" })
              ]
            }
          ) }, c.key)),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Progreso" }),
          isAdmin && /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: sorted.map((m, i) => {
          const pct = progressFor(m);
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b border-border/60 last:border-0 hover:bg-secondary/40",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-bold tabular-nums text-primary", children: i + 1 }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/member/$name",
                    params: { name: m.name },
                    className: "flex items-center gap-2 font-medium hover:text-primary hover:underline",
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "h-2.5 w-2.5 shrink-0 rounded-full",
                          style: { backgroundColor: m.color }
                        }
                      ),
                      m.name
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground", children: m.era }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 tabular-nums", children: formatPower(m.power) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-primary/15 text-primary", children: m.difficulty }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-bold tabular-nums", children: m.huntPoints.toLocaleString("es-ES") }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(HuntProgress, { pct, className: "w-28" }),
                  /* @__PURE__ */ jsxs("span", { className: "w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground", children: [
                    pct,
                    "%"
                  ] })
                ] }) }),
                isAdmin && /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => openEdit(m),
                    "aria-label": `Editar ${m.name}`,
                    children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                  }
                ) })
              ]
            },
            m.name
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      MemberEditDialog,
      {
        open: dialogOpen,
        onOpenChange: setDialogOpen,
        member: creating ? null : editing
      }
    )
  ] });
}
function EvolutionView() {
  const { data } = useClan();
  const [hidden, setHidden] = useState(/* @__PURE__ */ new Set());
  const totalPoints = data.members.reduce((s, m) => s + m.huntPoints, 0);
  const mvp = [...data.members].sort((a, b) => b.huntPoints - a.huntPoints)[0];
  const visibleMembers = data.members.filter((m) => !hidden.has(m.name));
  const powerData = useMemo(
    () => [...visibleMembers].sort((a, b) => b.power - a.power).map((m) => ({ name: m.name, power: m.power, color: m.color })),
    [visibleMembers]
  );
  function toggle(name) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 py-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: Swords, label: "Total Cazas", value: "1" }),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: Users,
          label: "Miembros Históricos",
          value: String(data.members.length)
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: TrendingUp,
          label: "Máx Puntos Caza",
          value: totalPoints.toLocaleString("es-ES"),
          highlight: true
        }
      ),
      /* @__PURE__ */ jsx(StatCard, { icon: Award, label: "MVP Más Veces", value: mvp?.name ?? "—" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: "Miembros (clic para mostrar/ocultar)" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: data.members.map((m) => {
        const isHidden = hidden.has(m.name);
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => toggle(m.name),
            className: cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              isHidden ? "border-border text-muted-foreground opacity-50" : "border-border bg-secondary text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "h-2 w-2 rounded-full",
                  style: { backgroundColor: m.color }
                }
              ),
              m.name
            ]
          },
          m.name
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsx(Zap, { className: "h-5 w-5 text-primary" }),
        "Poder por Miembro"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-[420px] w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: powerData, layout: "vertical", margin: { left: 10, right: 20 }, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { horizontal: false, stroke: "var(--border)" }),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            type: "number",
            tickFormatter: (v) => formatPower(Number(v)),
            stroke: "var(--muted-foreground)",
            fontSize: 12
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            type: "category",
            dataKey: "name",
            width: 80,
            stroke: "var(--muted-foreground)",
            fontSize: 12
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            cursor: { fill: "var(--secondary)" },
            contentStyle: {
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)"
            },
            formatter: (v) => [formatPower(v), "Poder"]
          }
        ),
        /* @__PURE__ */ jsx(Bar, { dataKey: "power", radius: [0, 4, 4, 0], children: powerData.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, entry.name)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 font-semibold", children: "Resumen por Caza — Puntos Totales" }),
      /* @__PURE__ */ jsx("div", { className: "h-[280px] w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
        BarChart,
        {
          data: [{ name: `Semana ${data.week}`, puntos: totalPoints }],
          margin: { left: 10, right: 20 },
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false, stroke: "var(--border)" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "name", stroke: "var(--muted-foreground)", fontSize: 12 }),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                tickFormatter: (v) => formatPower(Number(v)),
                stroke: "var(--muted-foreground)",
                fontSize: 12
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                cursor: { fill: "var(--secondary)" },
                contentStyle: {
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--foreground)"
                },
                formatter: (v) => [v.toLocaleString("es-ES"), "Puntos"]
              }
            ),
            /* @__PURE__ */ jsx(
              Bar,
              {
                dataKey: "puntos",
                fill: "var(--primary)",
                radius: [4, 4, 0, 0],
                maxBarSize: 120
              }
            )
          ]
        }
      ) }) })
    ] })
  ] });
}
function CazasView() {
  const { data, isAdmin, updateMember } = useClan();
  const incomplete = data.members.filter((m) => progressFor(m) < 100);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(WeekBar, { data }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-border px-5 py-4", children: /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-[var(--warning)]" }),
        "Cazas Incompletas (",
        incomplete.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-xs uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Miembro" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Dificultad" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Puntos" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Completado" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Justificado" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Motivo" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: incomplete.map((m) => {
          const pct = progressFor(m);
          const max = maxPointsFor(m.difficulty);
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b border-border/60 last:border-0 hover:bg-secondary/40",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-medium", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "h-2.5 w-2.5 rounded-full",
                      style: { backgroundColor: m.color }
                    }
                  ),
                  m.name
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-primary/15 text-primary", children: m.difficulty }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 tabular-nums", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold", children: m.huntPoints.toLocaleString("es-ES") }),
                  /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                    " / ",
                    max.toLocaleString("es-ES"),
                    " "
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[var(--warning)]", children: [
                    "(",
                    pct,
                    "%)"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(HuntProgress, { pct, className: "w-32" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: isAdmin ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => updateMember(m.name, { justified: !m.justified }),
                    className: "flex items-center gap-1.5",
                    children: m.justified ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-md bg-[var(--success)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--success)]", children: [
                      /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
                      " Sí"
                    ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }),
                      " No"
                    ] })
                  }
                ) : m.justified ? /* @__PURE__ */ jsxs("span", { className: "flex w-fit items-center gap-1 rounded-md bg-[var(--success)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--success)]", children: [
                  /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
                  " Sí"
                ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsx("td", { className: "min-w-[180px] px-4 py-3", children: isAdmin ? /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: m.reason,
                    onChange: (e) => updateMember(m.name, { reason: e.target.value }),
                    placeholder: "Motivo...",
                    className: "h-8"
                  }
                ) : m.reason ? /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: m.reason }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "—" }) })
              ]
            },
            m.name
          );
        }) })
      ] }) })
    ] })
  ] });
}
function useCountdown(endDate) {
  const [text, setText] = useState("0d 00:00:00");
  useEffect(() => {
    function tick() {
      const end = (/* @__PURE__ */ new Date(endDate + "T23:59:59")).getTime();
      const diff = end - Date.now();
      if (diff <= 0) {
        setText("0d 00:00:00");
        return;
      }
      const d = Math.floor(diff / 864e5);
      const h = Math.floor(diff % 864e5 / 36e5);
      const m = Math.floor(diff % 36e5 / 6e4);
      const s = Math.floor(diff % 6e4 / 1e3);
      const pad = (n) => String(n).padStart(2, "0");
      setText(`${d}d ${pad(h)}:${pad(m)}:${pad(s)}`);
    }
    tick();
    const id = setInterval(tick, 1e3);
    return () => clearInterval(id);
  }, [endDate]);
  return text;
}
function EnVivoView() {
  const { data } = useClan();
  const countdown = useCountdown(data.endDate);
  const ranked = [...data.members].sort((a, b) => b.huntPoints - a.huntPoints);
  const maxPoints = Math.max(...data.members.map((m) => m.huntPoints), 1);
  const totalPoints = data.members.reduce((s, m) => s + m.huntPoints, 0);
  const completed = data.members.filter((m) => progressFor(m) >= 100).length;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-destructive/30 bg-gradient-to-r from-destructive/10 to-transparent p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-destructive", children: [
          /* @__PURE__ */ jsx(Radio, { className: "h-4 w-4 animate-pulse" }),
          "Caza en Vivo"
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-1 text-2xl font-bold", children: [
          "Semana ",
          data.week,
          " — ",
          data.monthLabel
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          data.startDate,
          " — ",
          data.endDate
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-card px-4 py-3 font-mono text-xl font-bold tabular-nums", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 text-muted-foreground" }),
        countdown
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: Trophy,
          label: "Puntos Acumulados",
          value: totalPoints.toLocaleString("es-ES"),
          highlight: true
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: CheckCircle2,
          label: "Han Completado",
          value: `${completed} / ${data.members.length}`
        }
      ),
      /* @__PURE__ */ jsx(StatCard, { icon: Users, label: "Participantes", value: String(data.members.length) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-border px-5 py-4", children: /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Ranking en tiempo real" }) }),
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border/60", children: ranked.map((m, i) => {
        const pct = progressFor(m);
        const barWidth = m.huntPoints / maxPoints * 100;
        return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 px-4 py-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 shrink-0 text-center font-bold tabular-nums text-primary", children: i + 1 }),
          /* @__PURE__ */ jsx("span", { className: "w-28 shrink-0 truncate font-medium", children: m.name }),
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "hidden shrink-0 bg-primary/15 text-primary sm:inline-flex",
              children: m.difficulty
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "h-3 flex-1 overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full rounded-full bg-primary transition-all",
              style: { width: `${barWidth}%` }
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: "w-14 shrink-0 text-right font-bold tabular-nums", children: m.huntPoints.toLocaleString("es-ES") }),
          /* @__PURE__ */ jsxs("span", { className: "w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground", children: [
            pct,
            "%"
          ] })
        ] }, m.name);
      }) })
    ] })
  ] });
}
function AdminBanner() {
  const { isAdmin, resetData } = useClan();
  if (!isAdmin) return null;
  function handleReset() {
    if (confirm(
      "¿Restaurar los datos originales del clan? Se perderán los cambios guardados."
    )) {
      resetData();
      toast.success("Datos restaurados a los valores originales.");
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3", children: [
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm font-medium text-primary", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
      "Modo administrador activo — puedes editar miembros, puntos, justificaciones y más."
    ] }),
    /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: handleReset, children: [
      /* @__PURE__ */ jsx(RotateCcw, { className: "mr-1 h-4 w-4" }),
      "Restaurar datos"
    ] })
  ] });
}
function EstadisticasView() {
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Estadísticas" }),
    /* @__PURE__ */ jsx("p", { children: "Contenido de estadísticas" })
  ] });
}
function Index() {
  const search = Route.useSearch();
  const [view, setView] = useState(search.view ?? "ranking");
  useEffect(() => {
    if (search.view && search.view !== view) setView(search.view);
  }, [search.view]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(SiteHeader, { active: view, onChange: setView }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6", children: [
      /* @__PURE__ */ jsx(AdminBanner, {}),
      view === "ranking" && /* @__PURE__ */ jsx(RankingView, {}),
      view === "evolucion" && /* @__PURE__ */ jsx(EvolutionView, {}),
      view === "cazas" && /* @__PURE__ */ jsx(CazasView, {}),
      view === "envivo" && /* @__PURE__ */ jsx(EnVivoView, {}),
      view === "estadisticas" && /* @__PURE__ */ jsx(EstadisticasView, {})
    ] })
  ] });
}
export {
  Index as component
};
