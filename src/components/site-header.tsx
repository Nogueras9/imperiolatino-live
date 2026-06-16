import { useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Crown,
  BarChart3,
  AlertTriangle,
  Radio,
  Users,
  Lock,
  LogOut,
  Swords,
} from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useClan } from "@/components/clan-provider";
import { cn } from "@/lib/utils";

export type HomeView = "ranking" | "evolucion" | "cazas" | "envivo";

const NAV: { key: HomeView; label: string; icon: typeof Crown }[] = [
  { key: "ranking", label: "Ranking", icon: Crown },
  { key: "evolucion", label: "Evolución", icon: BarChart3 },
  { key: "cazas", label: "Cazas Incompletas", icon: AlertTriangle },
  { key: "envivo", label: "En Vivo", icon: Radio },
];

export function SiteHeader({
  active,
  onChange,
}: {
  active?: HomeView;
  onChange?: (v: HomeView) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const { isAdmin, login, logout } = useClan();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  function handleNav(v: HomeView) {
    if (onHome && onChange) {
      onChange(v);
    } else {
      navigate({ to: "/", search: { view: v } });
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      toast.success("Acceso concedido. Modo administrador activado.");
      setOpen(false);
      setPassword("");
    } else {
      toast.error("Contraseña incorrecta.");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Swords className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Heroes of History
            </span>
            <span className="text-[11px] text-muted-foreground">
              Tracker de Caza — IMPERIO LATINO
            </span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = onHome && active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/comparar"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Users className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Comparar</span>
          </Link>
          {isAdmin ? (
            <Button variant="secondary" size="sm" onClick={logout}>
              <LogOut className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Salir admin</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              <Lock className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Acceso</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-2 py-1 lg:hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = onHome && active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleNav(item.key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Acceso de Administrador
            </DialogTitle>
            <DialogDescription>
              Introduce la contraseña para gestionar la actividad del clan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="admin-pass">Contraseña</Label>
              <Input
                id="admin-pass"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce la contraseña"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
