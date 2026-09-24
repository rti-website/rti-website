-- ===========================================================================
-- 008 — location based service pages (the SEO manager's brief, 24 Sep 2026):
-- three services (light bulbs, electronics, batteries) at ten sites.
--
-- Two tables. The content of each is jsonb, shaped and checked by
-- src/lib/service-locations.ts, so a field can be added without a migration.
--
--   service_sites   one row per site: address, phone, hours, what it offers
--                   (drop-off, pickup, mail-in), nearby cities, hub page copy
--   site_services   one row per site and service: the page itself
--
-- NOTHING IS PUBLISHED BY THIS FILE. The rows are created, from
-- src/data/service-locations.ts, the first time the site is built or
-- Admin -> Locations is opened, all as drafts (Minnesota and Wisconsin's site
-- rows start live because their hubs are the existing facility pages). A
-- draft page answers at its URL with noindex, is in no sitemap and has no
-- link to it; a page for a service a site does not offer answers 404. Publishing is per page, in the admin, once its checklist is met.
--
-- Idempotent, like 006 and 007.
-- ===========================================================================

CREATE TABLE IF NOT EXISTS service_sites (
  slug        text PRIMARY KEY,
  -- /locations/phoenix-az/, or the existing /minnesota-recycling/ and
  -- /wisconsin-recycling/ pages, which stay where they are.
  hub_path    text NOT NULL UNIQUE,
  published   boolean NOT NULL DEFAULT false,
  sort_order  int NOT NULL DEFAULT 0,
  data        jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  updated_by  bigint REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS site_services (
  site_slug     text NOT NULL REFERENCES service_sites(slug) ON DELETE CASCADE,
  service       text NOT NULL CHECK (service IN ('light-bulb-recycling', 'electronic-recycling', 'battery-recycling')),
  -- A service the site does not offer never gets a page (the brief's pitfall).
  offered       boolean NOT NULL DEFAULT true,
  published     boolean NOT NULL DEFAULT false,
  published_at  timestamptz,
  data          jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  updated_by    bigint REFERENCES users(id) ON DELETE SET NULL,
  PRIMARY KEY (site_slug, service)
);

CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
INSERT INTO schema_migrations (name) VALUES ('008_service_locations.sql') ON CONFLICT DO NOTHING;
