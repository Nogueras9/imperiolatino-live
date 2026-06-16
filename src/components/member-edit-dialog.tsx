import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClan } from "@/components/clan-provider";
import { DIFFICULTY_LIST, ERAS, PALETTE, type Member } from "@/lib/clan-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null; // null = create new
};

function emptyMember(): Member {
  return {
    name: "",
    era: "",
    power: 0,
    difficulty: "Gran Maestro I",
    huntPoints: 0,
    justified: false,
    reason: "",
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
  };
}

export function MemberEditDialog({ open, onOpenChange, member }: Props) {
  const { updateMember, addMember, removeMember, data } = useClan();
  const isNew = member === null;
  const [form, setForm] = useState<Member>(member ?? emptyMember());

  useEffect(() => {
    setForm(member ?? emptyMember());
  }, [member, open]);

  function set<K extends keyof Member>(key: K, value: Member[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
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
      updateMember(member!.name, form);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isNew ? "Añadir miembro" : `Editar — ${member?.name}`}
          </DialogTitle>
          <DialogDescription>
            Gestiona los datos de caza y el perfil del miembro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="m-name">Nombre</Label>
            <Input
              id="m-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="m-era">Era</Label>
            <Input
              id="m-era"
              list="era-options"
              value={form.era}
              onChange={(e) => set("era", e.target.value)}
              placeholder="Ej: Era Bizantina"
            />
            <datalist id="era-options">
              {ERAS.map((e) => (
                <option key={e} value={e} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ERAS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => set("era", e)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    form.era === e
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Dificultad</Label>
            <Select
              value={form.difficulty}
              onValueChange={(v) => set("difficulty", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LIST.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-power">Poder</Label>
              <Input
                id="m-power"
                type="number"
                value={form.power}
                onChange={(e) => set("power", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-points">Puntos Caza</Label>
              <Input
                id="m-points"
                type="number"
                value={form.huntPoints}
                onChange={(e) => set("huntPoints", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("color", c)}
                  className="h-7 w-7 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    borderColor: form.color === c ? "#fff" : "transparent",
                  }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.justified}
              onChange={(e) => set("justified", e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            Ausencia justificada
          </label>

          <div className="flex flex-col gap-2">
            <Label htmlFor="m-reason">Motivo / Notas</Label>
            <Input
              id="m-reason"
              value={form.reason}
              onChange={(e) => set("reason", e.target.value)}
              placeholder="Ej: vacaciones, sin conexión..."
            />
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            {!isNew && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-1 h-4 w-4" />
                Eliminar
              </Button>
            )}
            <Button type="submit" className="sm:ml-auto">
              {isNew ? "Añadir" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
