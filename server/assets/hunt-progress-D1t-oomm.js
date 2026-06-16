import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "@tanstack/react-router";
import { X, Swords, Crown, BarChart3, AlertTriangle, Radio, Trophy, Users, LogOut, Lock } from "lucide-react";
import { toast } from "sonner";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { u as useClan } from "./router-KM_8dAYk.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const NAV = [
  { key: "ranking", label: "Ranking", icon: Crown },
  { key: "evolucion", label: "Evolución", icon: BarChart3 },
  { key: "cazas", label: "Cazas Incompletas", icon: AlertTriangle },
  { key: "envivo", label: "En Vivo", icon: Radio },
  { key: "estadisticas", label: "Estadísticas", icon: Trophy }
];
function SiteHeader({
  active,
  onChange
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const { isAdmin, login, logout } = useClan();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  function handleNav(v) {
    if (onHome && onChange) {
      onChange(v);
    } else {
      navigate({ to: "/", search: { view: v } });
    }
  }
  function handleLogin(e) {
    e.preventDefault();
    if (login(password)) {
      toast.success("Acceso concedido. Modo administrador activado.");
      setOpen(false);
      setPassword("");
    } else {
      toast.error("Contraseña incorrecta.");
    }
  }
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Swords, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("span", { className: "flex flex-col leading-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold tracking-tight sm:text-base", children: "Heroes of History" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] text-muted-foreground", children: "Tracker de Caza — IMPERIO LATINO" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "ml-4 hidden items-center gap-1 lg:flex", children: NAV.map((item) => {
        const Icon = item.icon;
        const isActive = onHome && active === item.key;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleNav(item.key),
            className: cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
              item.label
            ]
          },
          item.key
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/comparar",
            className: cn(buttonVariants({ variant: "outline", size: "sm" })),
            children: [
              /* @__PURE__ */ jsx(Users, { className: "mr-1 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Comparar" })
            ]
          }
        ),
        isAdmin ? /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "sm", onClick: logout, children: [
          /* @__PURE__ */ jsx(LogOut, { className: "mr-1 h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Salir admin" })
        ] }) : /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => setOpen(true), children: [
          /* @__PURE__ */ jsx(Lock, { className: "mr-1 h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Acceso" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-1 overflow-x-auto border-t border-border px-2 py-1 lg:hidden", children: NAV.map((item) => {
      const Icon = item.icon;
      const isActive = onHome && active === item.key;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleNav(item.key),
          className: cn(
            "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
            item.label
          ]
        },
        item.key
      );
    }) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-sm", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5 text-primary" }),
          "Acceso de Administrador"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Introduce la contraseña para gestionar la actividad del clan." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "admin-pass", children: "Contraseña" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "admin-pass",
              type: "password",
              autoFocus: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Introduce la contraseña"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Entrar" }) })
      ] })
    ] }) })
  ] });
}
function colorFor(pct) {
  if (pct >= 75) return "bg-[var(--success)]";
  if (pct >= 50) return "bg-[var(--warning)]";
  return "bg-destructive";
}
function HuntProgress({ pct, className }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return /* @__PURE__ */ jsx("div", { className: cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className), children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("h-full rounded-full transition-all", colorFor(clamped)),
      style: { width: `${clamped}%` }
    }
  ) });
}
export {
  Badge as B,
  Dialog as D,
  HuntProgress as H,
  Input as I,
  Label as L,
  SiteHeader as S,
  DialogContent as a,
  DialogHeader as b,
  cn as c,
  DialogTitle as d,
  DialogDescription as e,
  DialogFooter as f,
  Button as g
};
