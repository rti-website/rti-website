-- 017: the approved MBE wording in the blog posts (management, 28 Oct 2026).
--
-- "RTI is now a certified Minority Business Enterprise. Please use this
-- approved wording wherever we mention it."
--   Short: Certified Minority Business Enterprise (MBE)
--   Full:  Recycle Technologies, Inc. is a Certified Minority Business
--          Enterprise (MBE) through the National Minority Supplier Development
--          Council (NMSDC), North Central MSDC.
--
-- The pages built in code were changed in src/data (same day). Nine blog
-- posts live in the database and said "minority-owned" (several "the only
-- minority-owned ... in the Midwest"); each sentence below is rewritten to the
-- short wording. Matching is on the exact phrase, in content_html and in
-- content_json (posts saved in the editor keep their text there too), with
-- the apostrophe written any of the ways WordPress stored it.
--
-- Run once on dev and once on live, BEFORE `npm run build`:
--   psql "$DATABASE_URL" -P pager=off -v ON_ERROR_STOP=1 -f db/017_mbe_wording_28_oct_2026.sql
-- Safe to run twice (a phrase already replaced no longer matches). The last
-- two queries list anything that still says "minority" in a post or in an
-- Admin -> Pages edit, for a person to look at; both should come back empty.

BEGIN;

CREATE TEMP TABLE mbe_fix (slug text, pattern text, replacement text) ON COMMIT DROP;
INSERT INTO mbe_fix (slug, pattern, replacement) VALUES
  ('battery-recycling-in-bloomington-minnesota',
   $q$As the Midwest(?:'|’|&#8217;|&#039;|&rsquo;)s only minority-owned recycling and shredding company, we offer$q$,
   $q$As a Certified Minority Business Enterprise (MBE), we offer$q$),
  ('home-depot-bulb-recycling-vs-recycle-technologies',
   $q$Being the only Minority-Owned document destruction and recycling company in the Midwest, Recycle Technologies$q$,
   $q$As a Certified Minority Business Enterprise (MBE), Recycle Technologies$q$),
  ('how-important-is-the-future-of-ev-battery-recycling',
   $q$a minority-owned Midwestern recycling company, is trying$q$,
   $q$a Midwestern recycling company and Certified Minority Business Enterprise (MBE), is trying$q$),
  ('how-much-does-best-buy-charge-for-recycling-a-tv',
   $q$As the only Minority-Owned recycling company in the Midwest, Recycle Technologies$q$,
   $q$As a Certified Minority Business Enterprise (MBE), Recycle Technologies$q$),
  ('massachusetts-based-lt-governor-kim-driscoll-bags-the-recycling-impact-award-2024',
   $q$local, minority-owned recycling businesses in the area, like Recycle Technologies\.$q$,
   $q$local recycling businesses in the area, like Recycle Technologies, a Certified Minority Business Enterprise (MBE).$q$),
  ('options-beyond-best-buy-recycling-electronics-services',
   $q$We are a minority-owned business that offers$q$,
   $q$We are a Certified Minority Business Enterprise (MBE) that offers$q$),
  ('the-right-battery-recycling-company',
   $q$We are the only minority-owned Midwest-based company with facilities in Minnesota and Wisconsin\.$q$,
   $q$We are a Certified Minority Business Enterprise (MBE), based in the Midwest with facilities in Minnesota and Wisconsin.$q$),
  ('why-is-rti-the-best-ballast-recycling-company',
   $q$one of the few minority-owned recycling businesses in the Midwest, we offer$q$,
   $q$a Certified Minority Business Enterprise (MBE) in the Midwest, we offer$q$),
  ('why-reduce-reuse-recycle-is-more-relevant-now-than-before',
   $q$a midwest-based, minority-owned e-waste and fluorescent lamp recycling business$q$,
   $q$a midwest-based e-waste and fluorescent lamp recycling business and Certified Minority Business Enterprise (MBE),$q$);

-- What will change (run before the update, so the output shows the matches).
SELECT f.slug,
       (p.content_html ~ f.pattern)        AS html_match,
       (p.content_json::text ~ f.pattern)  AS json_match
  FROM mbe_fix f LEFT JOIN posts p ON p.slug = f.slug
 ORDER BY f.slug;

UPDATE posts p
   SET content_html = regexp_replace(p.content_html, f.pattern, f.replacement, 'g'),
       content_json = CASE WHEN p.content_json::text ~ f.pattern
                           THEN regexp_replace(p.content_json::text, f.pattern, f.replacement, 'g')::jsonb
                           ELSE p.content_json END,
       updated_at   = now()
  FROM mbe_fix f
 WHERE p.slug = f.slug
   AND (p.content_html ~ f.pattern OR p.content_json::text ~ f.pattern);

COMMIT;

-- Left over: any post or Admin -> Pages edit that still mentions "minority".
SELECT slug, status, substring(content_html from '.{0,60}[Mm]inority.{0,60}') AS still_says
  FROM posts
 WHERE content_html ~* 'minority-owned|minority owned|only minority'
 ORDER BY slug;

SELECT key, substring(published::text from '.{0,60}[Mm]inority.{0,60}') AS still_says
  FROM page_content
 WHERE published::text ~* 'minority-owned|minority owned|only minority'
    OR coalesce(draft::text, '') ~* 'minority-owned|minority owned|only minority'
 ORDER BY key;
