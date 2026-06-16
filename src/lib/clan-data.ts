export type Member = {
  name: string;
  era: string;
  power: number;
  difficulty: string;
  huntPoints: number;
  justified: boolean;
  reason: string;
  color: string;
};

export type ClanData = {
  clanName: string;
  week: number;
  monthLabel: string;
  startDate: string;
  endDate: string;
  live: boolean;
  members: Member[];
};

export const DIFFICULTIES: Record<string, number> = {
  "Veterano II": 2800,
  "Maestro II": 3600,
  "Gran Maestro I": 4000,
  "Gran Maestro II": 4400,
};

export const DIFFICULTY_LIST = Object.keys(DIFFICULTIES);

export const ERAS = [
  "Era Ibérica",
  "Alta Edad Media",
  "Reino de Sicilia",
  "Era Gótica Temprana",
  "Edad Feudal",
];

export const PALETTE = [
  "#3b82f6", "#0ea5e9", "#06b6d4", "#22d3ee", "#14b8a6",
  "#10b981", "#22c55e", "#84cc16", "#65a30d", "#eab308",
  "#facc15", "#f59e0b", "#f97316", "#ef4444", "#f43f5e",
  "#fb7185", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6",
];

// Admin password (client-side, same as the original project).
export const ADMIN_PASSWORD = "imperio2026";

export function maxPointsFor(difficulty: string): number {
  return DIFFICULTIES[difficulty] ?? 4000;
}

export function progressFor(member: Member): number {
  const max = maxPointsFor(member.difficulty);
  if (max <= 0) return 0;
  return Math.round((member.huntPoints / max) * 100);
}

export function formatPower(power: number): string {
  if (power >= 1_000_000) return (power / 1_000_000).toFixed(1) + " M";
  if (power >= 1000) return (power / 1000).toFixed(1) + " K";
  return String(power);
}

export const DEFAULT_DATA: ClanData = {
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
    { name: "pepebenz", era: "Alta Edad Media", power: 691000, difficulty: "Gran Maestro I", huntPoints: 2700, justified: false, reason: "", color: "#22c55e" },
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
    { name: "echelon", era: "Reino de Sicilia", power: 592000, difficulty: "Gran Maestro I", huntPoints: 2000, justified: false, reason: "", color: "#10b981" },
    { name: "ARGENTA", era: "Reino de Sicilia", power: 564900, difficulty: "Veterano II", huntPoints: 1960, justified: false, reason: "", color: "#f59e0b" },
    { name: "jony", era: "Alta Edad Media", power: 580100, difficulty: "Gran Maestro II", huntPoints: 1210, justified: false, reason: "", color: "#22d3ee" },
    { name: "cersei", era: "Reino de Sicilia", power: 596500, difficulty: "Gran Maestro II", huntPoints: 770, justified: false, reason: "", color: "#fb7185" },
    { name: "Sir Haplo", era: "Reino de Sicilia", power: 551400, difficulty: "Gran Maestro I", huntPoints: 0, justified: false, reason: "", color: "#fbbf24" },
  ],
};
