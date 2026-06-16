import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./hunt-progress-D1t-oomm.js";
function StatCard({
  icon: Icon,
  label,
  value,
  highlight = false
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "rounded-xl border bg-card p-5",
        highlight ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          label
        ] }),
        /* @__PURE__ */ jsx("p", { className: cn("mt-2 text-3xl font-bold tabular-nums", highlight && "text-primary"), children: value })
      ]
    }
  );
}
export {
  StatCard as S
};
