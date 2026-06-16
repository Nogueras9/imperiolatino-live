
CREATE TABLE public.clan_state (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT clan_state_singleton CHECK (id = 1)
);

GRANT SELECT, INSERT, UPDATE ON public.clan_state TO anon;
GRANT SELECT, INSERT, UPDATE ON public.clan_state TO authenticated;
GRANT ALL ON public.clan_state TO service_role;

ALTER TABLE public.clan_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read clan state"
  ON public.clan_state FOR SELECT
  USING (true);

CREATE POLICY "Public update clan state"
  ON public.clan_state FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Public insert clan state"
  ON public.clan_state FOR INSERT
  WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.clan_state;
ALTER TABLE public.clan_state REPLICA IDENTITY FULL;
