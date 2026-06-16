import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ADMIN_PASSWORD,
  DEFAULT_DATA,
  type ClanData,
  type Member,
} from "@/lib/clan-data";

type ClanContextType = {
  data: ClanData;
  isAdmin: boolean;
  loaded: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateClan: (patch: Partial<ClanData>) => void;
  updateMember: (name: string, patch: Partial<Member>) => void;
  addMember: (member: Member) => void;
  removeMember: (name: string) => void;
  resetData: () => void;
};

const ClanContext = createContext<ClanContextType | null>(null);

async function fetchClanState(): Promise<ClanData> {
  const { data, error } = await supabase
    .from("clan_state")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("[clan] fetch error", error);
    return DEFAULT_DATA;
  }
  if (!data) {
    // First load — seed the row.
    await supabase.from("clan_state").insert({ id: 1, data: DEFAULT_DATA as never });
    return DEFAULT_DATA;
  }
  return (data.data as unknown as ClanData) ?? DEFAULT_DATA;
}

async function pushClanState(next: ClanData) {
  const { error } = await supabase
    .from("clan_state")
    .update({ data: next as never, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) console.error("[clan] update error", error);
}

export function ClanProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ClanData>(DEFAULT_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lastLocalUpdate = useRef(0);

  // Initial load + admin session restore
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
      // ignore
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // Realtime: subscribe to changes from other clients
  useEffect(() => {
    const channel = supabase
      .channel("clan_state_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clan_state", filter: "id=eq.1" },
        (payload) => {
          // Ignore updates we made ourselves in the last 1.5s to avoid flicker.
          if (Date.now() - lastLocalUpdate.current < 1500) return;
          const newRow = payload.new as { data?: ClanData } | null;
          if (newRow?.data) setData(newRow.data);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const persist = useCallback((next: ClanData) => {
    lastLocalUpdate.current = Date.now();
    setData(next);
    pushClanState(next);
  }, []);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem("imperio-admin", "1");
      } catch {
        // ignore
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
      // ignore
    }
  }, []);

  const updateClan = useCallback(
    (patch: Partial<ClanData>) => {
      setData((prev) => {
        const next = { ...prev, ...patch };
        lastLocalUpdate.current = Date.now();
        pushClanState(next);
        return next;
      });
    },
    [],
  );

  const updateMember = useCallback((name: string, patch: Partial<Member>) => {
    setData((prev) => {
      const next: ClanData = {
        ...prev,
        members: prev.members.map((m) => (m.name === name ? { ...m, ...patch } : m)),
      };
      lastLocalUpdate.current = Date.now();
      pushClanState(next);
      return next;
    });
  }, []);

  const addMember = useCallback((member: Member) => {
    setData((prev) => {
      const next: ClanData = { ...prev, members: [...prev.members, member] };
      lastLocalUpdate.current = Date.now();
      pushClanState(next);
      return next;
    });
  }, []);

  const removeMember = useCallback((name: string) => {
    setData((prev) => {
      const next: ClanData = {
        ...prev,
        members: prev.members.filter((m) => m.name !== name),
      };
      lastLocalUpdate.current = Date.now();
      pushClanState(next);
      return next;
    });
  }, []);

  const resetData = useCallback(() => persist(DEFAULT_DATA), [persist]);

  return (
    <ClanContext.Provider
      value={{
        data,
        isAdmin,
        loaded,
        login,
        logout,
        updateClan,
        updateMember,
        addMember,
        removeMember,
        resetData,
      }}
    >
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>{children}</div>
    </ClanContext.Provider>
  );
}

export function useClan() {
  const ctx = useContext(ClanContext);
  if (!ctx) throw new Error("useClan debe usarse dentro de ClanProvider");
  return ctx;
}
