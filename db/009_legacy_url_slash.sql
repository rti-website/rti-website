-- 009: the missing slash in URLs imported from WordPress — 26 Sep 2026.
--
-- ~210 images and ~36 links per post read
--   https://www.recycletechnologies.comwp-content/uploads/...
-- (domain and path run together). Browsers treat the whole thing as a
-- hostname that does not exist. The rows came in like this from WordPress;
-- see src/lib/legacy-urls.ts, which also repairs them at read time.
--
-- Safe to run more than once: each statement only touches rows that still
-- have the fault, and a row without it matches nothing.
--
-- Run on dev and on live:
--   psql "$DATABASE_URL" -f db/009_legacy_url_slash.sql

UPDATE posts
   SET content_html = regexp_replace(content_html,
         '(https?://(www\.)?recycletechnologies\.com)(?=[A-Za-z0-9_])', '\1/', 'g')
 WHERE content_html ~ 'recycletechnologies\.com[A-Za-z0-9_]';

UPDATE posts
   SET content_json = regexp_replace(content_json::text,
         '(https?://(www\.)?recycletechnologies\.com)(?=[A-Za-z0-9_])', '\1/', 'g')::jsonb
 WHERE content_json IS NOT NULL
   AND content_json::text ~ 'recycletechnologies\.com[A-Za-z0-9_]';

UPDATE posts
   SET og_image_url = regexp_replace(og_image_url,
         '(https?://(www\.)?recycletechnologies\.com)(?=[A-Za-z0-9_])', '\1/', 'g')
 WHERE og_image_url ~ 'recycletechnologies\.com[A-Za-z0-9_]';

UPDATE posts
   SET canonical_url = regexp_replace(canonical_url,
         '(https?://(www\.)?recycletechnologies\.com)(?=[A-Za-z0-9_])', '\1/', 'g')
 WHERE canonical_url ~ 'recycletechnologies\.com[A-Za-z0-9_]';

-- Links on the site's own odd hostnames (ww., www.ww.) go to the real www.
UPDATE posts
   SET content_html = regexp_replace(content_html,
         'https?://(www\.)?(ww\.)+recycletechnologies\.com', 'https://www.recycletechnologies.com', 'gi')
 WHERE content_html ~* 'ww\.recycletechnologies\.com';

-- What is left (should be 0 rows):
SELECT count(*) AS still_broken FROM posts
 WHERE content_html ~ 'recycletechnologies\.com[A-Za-z0-9_]'
    OR og_image_url ~ 'recycletechnologies\.com[A-Za-z0-9_]';
