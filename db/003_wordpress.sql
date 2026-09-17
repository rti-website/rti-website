-- 003 — everything the WordPress import needs.
--
-- Idempotent, like the others: safe to run twice, and safe to run on a database
-- that already has posts written in the editor.

BEGIN;

-- ------------------------------------------------------------------ posts --
-- !! source IS WHAT THE PUBLIC PAGE TRUSTS.
--
--   'wordpress' — content_html is the ORIGINAL WordPress markup, byte for byte,
--                 and content_json is empty. The page renders the HTML. This is
--                 what keeps 300 ranking URLs identical to the day before the
--                 switch, which is the entire premise of the migration
--                 (CLAUDE.md rule 6).
--   'editor'    — content_json is the truth and content_html was derived from it
--                 on save, as it has been all along.
--
-- A post flips from 'wordpress' to 'editor' the first time somebody saves it in
-- the admin, and not before. Converting 300 posts up front would mean 300 posts
-- reformatted by a machine with nobody reading the result.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'editor'
  CHECK (source IN ('editor', 'wordpress'));

-- The WordPress post ID. Not decoration: it is what makes the import re-runnable
-- without creating duplicates, and what lets somebody check a post against the
-- old site a year from now.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS wp_id bigint;
CREATE UNIQUE INDEX IF NOT EXISTS posts_wp_id_idx ON posts(wp_id) WHERE wp_id IS NOT NULL;

-- Rank Math's title and description live in post meta, which this site's REST
-- API does not expose — so the importer reads them from the rendered page, which
-- is better anyway: it captures exactly what Google sees today rather than what
-- a plugin says it should be.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_image_url text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS imported_at timestamptz;

-- Tags were never in the admin's model. They are in WordPress, they appear in
-- some internal links, and throwing them away at import would mean they could
-- never be recovered.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';

-- ------------------------------------------------------------- categories --
ALTER TABLE categories ADD COLUMN IF NOT EXISTS wp_id bigint;
CREATE UNIQUE INDEX IF NOT EXISTS categories_wp_id_idx ON categories(wp_id) WHERE wp_id IS NOT NULL;

-- !! THE ARCHIVE URL IS PART OF THE CATEGORY, because the two structures do not
-- agree and both have to exist for a while.
--
--   WordPress:  /category/recycling/   — indexed, ranking, must not move
--   The plan:   /blog/e-waste/         — the ten categories in the new Blogs
--                                        menu, none of which has a page yet
--
-- archive_path is the URL this category actually answers at. The importer sets
-- /category/<slug>/ for the six real ones; the ten planned ones keep their
-- /blog/<slug>/. Reconciling them is second-wave work and needs redirects, so
-- the column exists to make that a data change rather than a code change.
ALTER TABLE categories ADD COLUMN IF NOT EXISTS archive_path text;
UPDATE categories SET archive_path = '/blog/' || slug || '/' WHERE archive_path IS NULL;

-- Where a category came from, so nobody has to guess which of the two sets a
-- row belongs to.
ALTER TABLE categories ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'planned'
  CHECK (source IN ('planned', 'wordpress'));

-- ------------------------------------------------------------------ media --
-- The importer downloads every image it rehosts; this is where it came from, so
-- a second run recognises it instead of fetching it again.
ALTER TABLE media ADD COLUMN IF NOT EXISTS source_url text;
CREATE INDEX IF NOT EXISTS media_source_url_idx ON media(source_url);

COMMIT;

-- ---------------------------------------------------------------------------
-- 003b — every category a post is in, not just its primary one.
--
-- !! WITHOUT THIS, /category/blog/ 404s AND TAKES 252 INDEXED POSTS WITH IT.
--
-- WordPress puts a post in as many categories as it likes: nearly every post on
-- this site is in BOTH "Blog" and "Recycling". The Publisher's model has one
-- category per post, because one is what an editor should choose when writing.
-- Importing only that one would empty the archives that are not the primary —
-- and /category/blog/ is an indexed page with 252 posts behind it.
--
-- So: posts.category_id stays the single editorial choice, and this table keeps
-- the full WordPress membership. Archives read from here; the admin reads the
-- column. Neither has to know about the other.
BEGIN;

CREATE TABLE IF NOT EXISTS post_categories (
  post_id     bigint NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  category_id bigint NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);
CREATE INDEX IF NOT EXISTS post_categories_category_idx ON post_categories(category_id);

COMMIT;
