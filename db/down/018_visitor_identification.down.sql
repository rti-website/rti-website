-- Undo db/018_visitor_identification.sql. Kept in db/down/ so the forward
-- runner (scripts/db-setup.mjs reads db/*.sql only, not subfolders) never runs it.
--
-- DELETES every Visitor lead and all visitor data. Form leads are untouched
-- (their new columns are dropped; nothing else about them changes).
--   npm run db:down -- 018_visitor_identification
-- or
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/down/018_visitor_identification.down.sql

BEGIN;

ALTER TABLE visitors DROP CONSTRAINT IF EXISTS visitors_lead_id_fkey;
DELETE FROM leads WHERE lead_type = 'visitor';

DROP INDEX IF EXISTS leads_one_visitor_lead;
DROP INDEX IF EXISTS leads_visitor_idx;
DROP INDEX IF EXISTS leads_type_created_idx;
DROP INDEX IF EXISTS leads_type_business_idx;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_converted_lead_id_fkey;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_visitor_id_fkey;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_visitor_status_check;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check;
ALTER TABLE leads DROP COLUMN IF EXISTS visitor_status;
ALTER TABLE leads DROP COLUMN IF EXISTS converted_lead_id;
ALTER TABLE leads DROP COLUMN IF EXISTS is_business_ip;
ALTER TABLE leads DROP COLUMN IF EXISTS visitor_id;
ALTER TABLE leads DROP COLUMN IF EXISTS lead_type;

DROP TABLE IF EXISTS page_views;
DROP TABLE IF EXISTS visits;
DROP TABLE IF EXISTS visitors;
DROP TABLE IF EXISTS ip_lookups;
DROP TABLE IF EXISTS companies;

DELETE FROM settings WHERE key = 'visitor_jobs';
DELETE FROM schema_migrations WHERE name = '018_visitor_identification.sql';

COMMIT;
