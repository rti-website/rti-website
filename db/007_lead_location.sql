-- ===========================================================================
-- 007 — where each enquiry is from (Asim, 24 Sep 2026: "we have to fetch the
-- location of [the] lead … from where the lead is come").
--
-- One jsonb column on leads, filled by src/lib/lead-location.ts right after a
-- form is sent, and for older enquiries the first time Admin -> Enquiries is
-- opened. Nothing leaves the server to work it out:
--
--   zip       the ZIP they typed -> its centre point and county, from
--             data/us-zips.tsv (GeoNames, already credited on the form)
--   nearest   the closest RTI facility and the straight-line miles to it, and
--             whether that is inside the 100 mile pickup area
--   ip        where the connection came from, from the free DB-IP City Lite
--             file when it is installed (npm run geoip:update); approximate,
--             city level at best, and a VPN or phone network can move it
--
-- The street address is not sent anywhere to be geocoded. The admin's map
-- shows the exact spot by asking Google's embed for the address the visitor
-- typed, in the admin's own browser, with the Maps key from
-- Admin -> Google & Tracking.
--
-- Idempotent, like 006: safe to run twice, and it records itself.
-- ===========================================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS geo jsonb;

-- Admin -> Google & Tracking -> Google Maps. Empty until someone pastes the
-- key; the admin map falls back to Google's keyless embed until then.
INSERT INTO settings (key, value) VALUES ('maps', '{ "browserKey": "" }'::jsonb)
  ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
INSERT INTO schema_migrations (name) VALUES ('007_lead_location.sql') ON CONFLICT DO NOTHING;
