import { ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useClan } from "@/components/clan-provider";

export function AdminBanner() {
  const { isAdmin, resetData } = useClan();
  if (!isAdmin) return null;

  function handleReset() {
    if (
      confirm(
        "¿Restaurar los datos originales del clan? Se perderán los cambios guardados.",
      )
    ) {
      resetData();
      toast.success("Datos restaurados a los valores originales.");
    }
  }

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3">
      <p className="flex items-center gap-2 text-sm font-medium text-primary">
        <ShieldCheck className="h-4 w-4" />
        Modo administrador activo — puedes editar miembros, puntos, justificaciones y más.
      </p>
      <Button variant="outline" size="sm" onClick={handleReset}>
        <RotateCcw className="mr-1 h-4 w-4" />
        Restaurar datos
      </Button>
    </div>
  );
}
