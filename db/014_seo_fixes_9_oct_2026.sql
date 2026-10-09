-- 014: SEO team's "Technical Fixes - 09/10/26" sheet, the parts that live in
-- the database (9 Oct 2026). Everything else in that sheet is in the code.
--
--   1. Blog posts (tabs "Title Fixes" and "Templated Titles"): the SEO title
--      (meta_title), the H1 (title) and, for one post, the meta description.
--      NULL in the list below means "leave that field as it is".
--   2. Admin -> Pages edits that keep the sheet's titles and H1s from showing
--      ("Title Fixes": /off-site-shredding/ "Campaign title / H1 never
--      applied", New Berlin "Live title differs from sheet"). The code
--      already carries the sheet's words; a title or H1 typed into Admin ->
--      Pages wins over the code, so those edits are taken out and the page
--      falls back to the code. Only these fields, on these pages.
--
-- Run once on dev and once on live, BEFORE `npm run build`:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/014_seo_fixes_9_oct_2026.sql
-- Safe to run twice. og_title / twitter_title follow the new title only where
-- they still equal the old one. The last queries list what was found.

BEGIN;

-- ------------------------------------------------------------- 1. posts --
CREATE TEMP TABLE new_seo (slug text PRIMARY KEY, meta_title text, h1 text, meta_description text) ON COMMIT DROP;
INSERT INTO new_seo (slug, meta_title, h1, meta_description) VALUES
  -- Title Fixes
  ($q$all-you-need-to-know-about-batteries-recycling-in-2024$q$, $q$Battery Recycling in 2026: What You Need to Know$q$, $q$Battery Recycling in 2026: What You Need to Know$q$, NULL),
  ($q$everything-you-need-to-know-about-e-waste-recycling-in-2024$q$, $q$E-Waste Recycling in 2026: Everything You Need to Know$q$, $q$E-Waste Recycling in 2026: Everything You Need to Know$q$, NULL),
  ($q$how-to-dispose-of-plasma-tv$q$, $q$How to Dispose of a Plasma TV Safely$q$, NULL, NULL),
  ($q$tesla-battery-recycling-secrets$q$, $q$Tesla Battery Recycling & Disposal: How It Works$q$, $q$Tesla Battery Recycling and Disposal Explained$q$, $q$How Tesla and EV batteries are recycled, what happens to old packs, and how businesses can recycle lithium ion batteries safely with Recycle Technologies.$q$),
  -- Templated Titles
  ($q$recycling-technologies-in-bloomington-all-what-you-need-to-know$q$, $q$Recycling in Bloomington, MN: What You Need to Know$q$, $q$Recycle Technologies in Bloomington: All You Need to Know$q$, NULL),
  ($q$reliable-recycling-centers-in-woodbury-an-easy-solution-for-citizens$q$, $q$Easy, Reliable Recycling for Woodbury Residents$q$, $q$Reliable Recycling Centers in Woodbury: An Easy Solution for Citizens$q$, NULL),
  ($q$recycle-responsibly-your-guide-to-recycle-technologiess-facilities-for-wisconsin-residents$q$, $q$A Guide to Responsible Recycling in Wisconsin$q$, $q$Recycle Responsibly: Your Guide to Recycle Technologies' Facilities for Wisconsin Residents$q$, NULL),
  ($q$how-recycle-technologies-is-boosting-e-waste-recycling-in-st-cloud$q$, $q$Boosting E-Waste Recycling in St. Cloud, MN$q$, $q$How Recycle Technologies Is Boosting E-Waste Recycling in St. Cloud$q$, NULL);

UPDATE posts p SET
  og_title         = CASE WHEN n.meta_title IS NOT NULL AND p.og_title = p.meta_title THEN n.meta_title ELSE p.og_title END,
  twitter_title    = CASE WHEN n.meta_title IS NOT NULL AND p.twitter_title = p.meta_title THEN n.meta_title ELSE p.twitter_title END,
  og_description   = CASE WHEN n.meta_description IS NOT NULL AND p.og_description = p.meta_description THEN n.meta_description ELSE p.og_description END,
  meta_title       = COALESCE(n.meta_title, p.meta_title),
  title            = COALESCE(n.h1, p.title),
  meta_description = COALESCE(n.meta_description, p.meta_description),
  updated_at       = now()
FROM new_seo n
WHERE p.slug = n.slug
  AND (p.meta_title IS DISTINCT FROM COALESCE(n.meta_title, p.meta_title)
    OR p.title IS DISTINCT FROM COALESCE(n.h1, p.title)
    OR p.meta_description IS DISTINCT FROM COALESCE(n.meta_description, p.meta_description));

-- ------------------------------------------- 2. Admin -> Pages overrides --
-- A patch is a map of field path -> value; a list edited as a whole is kept
-- at its own path ("META"). Both shapes are cleared for the fields below.
CREATE TEMP TABLE clear_fields (key text, path text) ON COMMIT DROP;
INSERT INTO clear_fields (key, path) VALUES
  ('off-site-shredding',                 'META.0.title'),
  ('off-site-shredding',                 'CONTENT.hero.h1'),
  ('area/new-berlin-recycling-center',   'META.0.title'),
  ('faqs',                               'META.0.title'),
  ('area/lewisburg-tennessee',           'META.0.title'),
  ('area/lewisburg-tennessee',           'META.0.description');

CREATE TEMP TABLE cleared_report ON COMMIT DROP AS
SELECT c.key, c.path, pc.published ->> c.path AS published_value, pc.draft ->> c.path AS draft_value
  FROM clear_fields c JOIN page_content pc ON pc.key = c.key
 WHERE pc.published ? c.path OR COALESCE(pc.draft ? c.path, false);

UPDATE page_content pc SET
  published = pc.published - ARRAY(SELECT path FROM clear_fields c WHERE c.key = pc.key),
  draft     = CASE WHEN pc.draft IS NULL THEN NULL ELSE pc.draft - ARRAY(SELECT path FROM clear_fields c WHERE c.key = pc.key) END
 WHERE pc.key IN (SELECT key FROM clear_fields);

-- The whole-list shape: META stored as one array.
UPDATE page_content pc SET published = jsonb_set(pc.published, '{META,0,title}', '""'::jsonb)
 WHERE pc.key IN ('off-site-shredding', 'area/new-berlin-recycling-center', 'faqs', 'area/lewisburg-tennessee')
   AND jsonb_typeof(pc.published -> 'META') = 'array' AND (pc.published #>> '{META,0,title}') <> '';
UPDATE page_content pc SET draft = jsonb_set(pc.draft, '{META,0,title}', '""'::jsonb)
 WHERE pc.key IN ('off-site-shredding', 'area/new-berlin-recycling-center', 'faqs', 'area/lewisburg-tennessee')
   AND pc.draft IS NOT NULL AND jsonb_typeof(pc.draft -> 'META') = 'array' AND (pc.draft #>> '{META,0,title}') <> '';
UPDATE page_content pc SET published = jsonb_set(pc.published, '{META,0,description}', '""'::jsonb)
 WHERE pc.key = 'area/lewisburg-tennessee'
   AND jsonb_typeof(pc.published -> 'META') = 'array' AND (pc.published #>> '{META,0,description}') <> '';

-- -------------------------------------------------------------- report --
SELECT n.slug, p.meta_title, p.title AS h1
  FROM new_seo n JOIN posts p ON p.slug = n.slug ORDER BY n.slug;

SELECT n.slug AS not_in_this_database
  FROM new_seo n LEFT JOIN posts p ON p.slug = n.slug
 WHERE p.id IS NULL;

SELECT key, path, published_value AS admin_edit_removed, draft_value AS draft_edit_removed FROM cleared_report;

COMMIT;
