-- 012: the Ads manager role — 28 Sep 2026.
--
-- Asim: an ads manager works Subscribers, Enquiries, Lead workflow and
-- Google & Tracking in full, can look at the content screens (Overview,
-- posts, categories, media, SEO, Pages, Locations) without changing them,
-- and does not see the site screens (People & access, Social Links).
-- What each role may do is enforced in src/lib/admin-route.ts.
--
-- Safe to run more than once. Run on dev and live after 011:
--   psql "$DATABASE_URL" -f db/012_ads_role.sql

ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('administrator', 'editor', 'author', 'seo', 'agent', 'ads'));
