-- 015: "RTI State & Country Pages Content Corrections" (12 Oct 2026).
-- The new H1s, subtitles, FAQs and the Minnesota title are in the code
-- (src/data/facilities.ts, page-seo.ts, url-map.csv; the New Berlin FAQs in
-- src/data/county-pages/areas/new-berlin-recycling-center.ts). A word typed
-- into Admin -> Pages for one of THESE fields would win over the code, so
-- those edits are taken out and the pages show the sheet's copy. Nothing
-- else is touched.
--
-- Run once on dev and once on live, BEFORE `npm run build`:
--   psql "$DATABASE_URL" -P pager=off -v ON_ERROR_STOP=1 -f db/015_state_pages_content_12_oct_2026.sql
-- Safe to run twice. The last query lists what was removed (usually nothing),
-- and the one before warns if the New Berlin page's section list was edited
-- as a whole in the admin (then the new FAQs would not show: tell Claude).

BEGIN;

CREATE TEMP TABLE removed ON COMMIT DROP AS
SELECT pc.key, k AS path, 'published' AS copy
  FROM page_content pc, jsonb_object_keys(pc.published) k
 WHERE pc.key = 'facilities'
   AND (k = 'META.0.title' OR k ~ '^(MINNESOTA|WISCONSIN)\.(liveH1|hero\.(h1|lead|leadShort)|faqs(\..*)?)$')
UNION ALL
SELECT pc.key, k, 'draft'
  FROM page_content pc, jsonb_object_keys(COALESCE(pc.draft, '{}'::jsonb)) k
 WHERE pc.key = 'facilities'
   AND (k = 'META.0.title' OR k ~ '^(MINNESOTA|WISCONSIN)\.(liveH1|hero\.(h1|lead|leadShort)|faqs(\..*)?)$');

UPDATE page_content pc SET
  published = pc.published - ARRAY(SELECT path FROM removed r WHERE r.copy = 'published'),
  draft     = CASE WHEN pc.draft IS NULL THEN NULL
                   ELSE pc.draft - ARRAY(SELECT path FROM removed r WHERE r.copy = 'draft') END
 WHERE pc.key = 'facilities';

-- META stored as one list: blank the Minnesota title so the code's shows.
UPDATE page_content pc SET published = jsonb_set(pc.published, '{META,0,title}', '""'::jsonb)
 WHERE pc.key = 'facilities' AND jsonb_typeof(pc.published -> 'META') = 'array'
   AND (pc.published #>> '{META,0,url}') = '/minnesota-recycling/' AND (pc.published #>> '{META,0,title}') <> '';

SELECT key, 'sections list was edited as a whole in the admin: the new FAQs will not show' AS warning
  FROM page_content
 WHERE key = 'area/new-berlin-recycling-center' AND (published ? 'sections' OR COALESCE(draft ? 'sections', false));

SELECT key, path, copy AS admin_edit_removed FROM removed ORDER BY path;

COMMIT;
