-- ===========================================================================
-- 019 — Where each visit came from (management, 30 Oct 2026: "city or state,
-- visit count, last seen" for every Visitor lead, anonymous ones too).
--
-- The city, state and country of a visit, read at capture from the DB-IP
-- city file the site already has (src/lib/geoip.ts, var/geoip). Nothing is
-- sent anywhere and the IP itself is still never stored. The ipapi.is lookup
-- (ip_lookups) still names the organisation; its city is preferred when it
-- has one, and this is what shows when it has none or after its 90 days.
--
-- Purely additive and safe to run twice. Dev and live share one database:
-- run it once, BEFORE deploying the code that writes these columns.
--   psql "$DATABASE_URL" -P pager=off -v ON_ERROR_STOP=1 -f db/019_visit_location.sql
-- Undo: npm run db:down -- 019_visit_location
-- ===========================================================================

BEGIN;

ALTER TABLE visits ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS region text;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS country_code text;

CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
INSERT INTO schema_migrations (name) VALUES ('019_visit_location.sql') ON CONFLICT DO NOTHING;

COMMIT;
