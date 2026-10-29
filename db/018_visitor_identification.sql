-- ===========================================================================
-- 018 — Visitor identification (management brief v2, "RTI Visitor
-- Identification: Build Brief", Oct 2026; docs/visitor-identification/).
--
-- Five new tables and five new columns on `leads`:
--
--   companies    organisations identified from an IP (business, education,
--                government, banking) — what Admin -> Visitors lists
--   ip_lookups   one row per SALTED SHA-256 HASH of an IP, so each address is
--                looked up once per 30 days. The raw IP is never stored.
--   visitors     one row per browser (id = the rti_vid cookie), set only
--                after Analytics consent
--   visits       one row per session (30 minutes idle closes it)
--   page_views   one row per page in a session
--
--   leads.lead_type          'form' (every existing row, and every enquiry
--                            from now on) or 'visitor' (one per consented
--                            visitor, never emailed, never counted)
--   leads.visitor_id         the browser a lead came from
--   leads.is_business_ip     the Visitor lead's organisation was identified
--   leads.converted_lead_id  the form lead a Visitor lead turned into
--   leads.visitor_status     a Visitor lead's own status (new, reviewed,
--                            converted, ignore). A separate column so the form
--                            statuses (new … spam) stay exactly as they are.
--
-- Purely additive: nothing existing is renamed, changed or dropped, and every
-- existing lead becomes lead_type = 'form' through the column default (no
-- table rewrite on PostgreSQL 11+). Code from before this migration keeps
-- working against it.
--
-- REVERSIBLE: db/down/018_visitor_identification.down.sql undoes it
-- (`npm run db:down -- 018_visitor_identification`). The down file is kept in
-- db/down/ so the forward runner (scripts/db-setup.mjs) never picks it up.
--
-- Run once, BEFORE deploying the code that uses it (dev and live share one
-- database, so once is enough):
--   psql "$DATABASE_URL" -P pager=off -v ON_ERROR_STOP=1 -f db/018_visitor_identification.sql
-- Safe to run twice.
-- ===========================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS companies (
  id           bigserial PRIMARY KEY,
  -- The organisation's domain, or "org:<name>" when the lookup gave none.
  -- Unique, so two visitors from one company share one row.
  key          text NOT NULL UNIQUE,
  name         text NOT NULL,
  domain       text,
  type         text NOT NULL CHECK (type IN ('business', 'education', 'government', 'banking')),
  city         text,
  region       text,
  first_seen   timestamptz NOT NULL DEFAULT now(),
  last_seen    timestamptz NOT NULL DEFAULT now(),
  visit_count  int NOT NULL DEFAULT 0,
  status       text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'lead_created', 'ignore')),
  notes        text
);
CREATE INDEX IF NOT EXISTS companies_last_seen_idx ON companies (last_seen DESC);
CREATE INDEX IF NOT EXISTS companies_status_idx ON companies (status);

CREATE TABLE IF NOT EXISTS ip_lookups (
  id              bigserial PRIMARY KEY,
  ip_hash         text NOT NULL UNIQUE,
  -- What the lookup decided (src/lib/visitor/classify.ts):
  --   business   an organisation we keep (company_id set)
  --   anonymous  ISP, mobile, hosting, VPN, proxy, Tor, datacenter
  --   noise      a "business" we ignore (Apple relay, Cloudflare, Google …)
  --   excluded   our own offices (VISITOR_EXCLUDED_IPS)
  --   eu         EU or UK: never looked up
  --   private    a private or local address
  --   failed     the provider did not answer (tried again after a day)
  classification  text NOT NULL,
  org_name        text,
  org_domain      text,
  org_type        text,
  city            text,
  region          text,
  country_code    text,
  is_vpn          boolean NOT NULL DEFAULT false,
  is_hosting      boolean NOT NULL DEFAULT false,
  company_id      bigint REFERENCES companies(id) ON DELETE SET NULL,
  looked_up_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ip_lookups_looked_up_idx ON ip_lookups (looked_up_at);

CREATE TABLE IF NOT EXISTS visitors (
  id           uuid PRIMARY KEY,
  first_seen   timestamptz NOT NULL DEFAULT now(),
  last_seen    timestamptz NOT NULL DEFAULT now(),
  visit_count  int NOT NULL DEFAULT 0,
  company_id   bigint REFERENCES companies(id) ON DELETE SET NULL,
  -- The Visitor lead. Its foreign key is added below, after the leads columns
  -- (leads.visitor_id points back here).
  lead_id      bigint,
  -- landing_page, referrer, gclid, gbraid, wbraid, fbclid, msclkid, utm_*,
  -- captured_at: the attribution the browser held on the first stored event.
  first_touch  jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS visitors_company_idx ON visitors (company_id);
CREATE INDEX IF NOT EXISTS visitors_last_seen_idx ON visitors (last_seen DESC);

CREATE TABLE IF NOT EXISTS visits (
  id             bigserial PRIMARY KEY,
  visitor_id     uuid NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  started_at     timestamptz NOT NULL DEFAULT now(),
  ended_at       timestamptz NOT NULL DEFAULT now(),
  -- Salted hash of the session's IP, until its lookup is linked; the monthly
  -- retention job clears it after 90 days.
  ip_hash        text,
  ip_lookup_id   bigint REFERENCES ip_lookups(id) ON DELETE SET NULL,
  device_type    text CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  entry_path     text,
  exit_path      text,
  page_count     int NOT NULL DEFAULT 0,
  -- ad / organic / referral / direct for THIS session, and what said so.
  source         text,
  attribution    jsonb
);
CREATE INDEX IF NOT EXISTS visits_visitor_idx ON visits (visitor_id);
CREATE INDEX IF NOT EXISTS visits_started_idx ON visits (started_at);
CREATE INDEX IF NOT EXISTS visits_ip_hash_idx ON visits (ip_hash) WHERE ip_hash IS NOT NULL;

CREATE TABLE IF NOT EXISTS page_views (
  id               bigserial PRIMARY KEY,
  visit_id         bigint NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  path             text NOT NULL,
  title            text,
  viewed_at        timestamptz NOT NULL DEFAULT now(),
  seconds_on_page  int
);
CREATE INDEX IF NOT EXISTS page_views_visit_idx ON page_views (visit_id);
CREATE INDEX IF NOT EXISTS page_views_viewed_idx ON page_views (viewed_at);

-- --------------------------------------------------------------- leads --
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type text NOT NULL DEFAULT 'form';
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check;
ALTER TABLE leads ADD CONSTRAINT leads_lead_type_check CHECK (lead_type IN ('form', 'visitor'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS visitor_id uuid;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS is_business_ip boolean NOT NULL DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS converted_lead_id bigint;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS visitor_status text;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_visitor_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_visitor_status_check
  CHECK (visitor_status IS NULL OR visitor_status IN ('new', 'reviewed', 'converted', 'ignore'));

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_visitor_id_fkey;
ALTER TABLE leads ADD CONSTRAINT leads_visitor_id_fkey
  FOREIGN KEY (visitor_id) REFERENCES visitors(id) ON DELETE SET NULL;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_converted_lead_id_fkey;
ALTER TABLE leads ADD CONSTRAINT leads_converted_lead_id_fkey
  FOREIGN KEY (converted_lead_id) REFERENCES leads(id) ON DELETE SET NULL;
ALTER TABLE visitors DROP CONSTRAINT IF EXISTS visitors_lead_id_fkey;
ALTER TABLE visitors ADD CONSTRAINT visitors_lead_id_fkey
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS leads_type_business_idx ON leads (lead_type, is_business_ip);
CREATE INDEX IF NOT EXISTS leads_type_created_idx ON leads (lead_type, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_visitor_idx ON leads (visitor_id) WHERE visitor_id IS NOT NULL;
-- One Visitor lead per browser, whatever races.
CREATE UNIQUE INDEX IF NOT EXISTS leads_one_visitor_lead ON leads (visitor_id) WHERE lead_type = 'visitor';

CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
INSERT INTO schema_migrations (name) VALUES ('018_visitor_identification.sql') ON CONFLICT DO NOTHING;

COMMIT;
