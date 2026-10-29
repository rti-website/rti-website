-- Undoes db/019_visit_location.sql (npm run db:down -- 019_visit_location).
BEGIN;
ALTER TABLE visits DROP COLUMN IF EXISTS city;
ALTER TABLE visits DROP COLUMN IF EXISTS region;
ALTER TABLE visits DROP COLUMN IF EXISTS country_code;
DELETE FROM schema_migrations WHERE name = '019_visit_location.sql';
COMMIT;
