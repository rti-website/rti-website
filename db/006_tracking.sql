-- ===========================================================================
-- 006 — tracking: GTM / GA4 / Google Ads settings, per-post tracking
-- controls, and lead attribution.
--
-- Asim, 23 Sep 2026, passing on the SEO specialist's brief: GTM installed once
-- in the global layout and configured from the CMS; UTM and click IDs captured
-- into a first-party `rti_attr` cookie (90 days, latest campaign click wins)
-- and attached to every lead; a `generate_lead` dataLayer event and the Google
-- Ads conversion on a successful submission; page-level switches in the post
-- editor. See src/lib/tracking.ts for how the pieces meet.
--
-- Idempotent: safe to run twice, safe to run by hand with psql on a database
-- that `npm run db:setup` will also see later (it records itself below).
-- ===========================================================================

-- ------------------------------------------------------ attribution per lead --
-- Kept apart from `leads` on purpose (the brief's own layout): a lead is who
-- and what; this is how they found us. One row per lead, or none when the
-- visitor arrived with no campaign, no referrer and no cookie at all.
CREATE TABLE IF NOT EXISTS lead_attribution (
  lead_id       bigint PRIMARY KEY REFERENCES leads(id) ON DELETE CASCADE,
  gclid         text,
  gbraid        text,
  wbraid        text,
  fbclid        text,
  msclkid       text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,
  campaign_id   text,
  adgroup_id    text,
  keyword       text,
  matchtype     text,
  device        text,
  landing_page  text,
  referrer      text,
  submit_page   text,
  user_agent    text,
  -- When the attribution cookie was written — the click, not the submission.
  captured_at   timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lead_attribution_source_idx ON lead_attribution (utm_source, utm_campaign);

-- --------------------------------------------------- per-post tracking flags --
-- The "SEO / Tracking" block of the post editor. None of these puts script in
-- the page body: they are read by the global tracking bootstrap.
--   tracking_disabled   GTM does not load when a visit starts on this page
--   analytics_excluded  dataLayer carries analytics_excluded=true (GTM tags
--                       block on it)
--   custom_datalayer    extra key/values pushed with this page's page view
--   custom_tracking_id  a free-form ID pushed with the page view (e.g. an
--                       offline campaign code)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tracking_disabled  boolean NOT NULL DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS analytics_excluded boolean NOT NULL DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS custom_datalayer   jsonb;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS custom_tracking_id text;

-- --------------------------------------------------------- global settings --
-- Admin -> Settings -> Analytics & Tracking. GTM-WXH55D9 is the container the
-- live WordPress site loads today. `loadOnStaging` is off so the dev server
-- never sends test traffic into the real property; turn it on there only while
-- testing in GTM Preview.
INSERT INTO settings (key, value) VALUES ('tracking', '{
  "gtmEnabled": true,
  "gtmId": "GTM-WXH55D9",
  "ga4Id": "",
  "adsConversionId": "",
  "adsConversionLabel": "",
  "loadOnStaging": false
}'::jsonb) ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
INSERT INTO schema_migrations (name) VALUES ('006_tracking.sql') ON CONFLICT DO NOTHING;
