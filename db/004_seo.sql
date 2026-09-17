-- ===========================================================================
-- 004 — the SEO desk, and a role to sit at it.
--
-- Fields are one-for-one with "PRJ/002 - RTI - SEO Fields for CMS, 17 Sept
-- 2026". Where a column for a field already existed it is REUSED rather than
-- duplicated, because two places to set one tag is how a meta description ends
-- up different from the meta description:
--
--   SEO Title            -> posts.meta_title          (already there)
--   Meta Description     -> posts.meta_description    (already there)
--   Focus Keyword        -> posts.focus_keyword       (already there)
--   SEO Slug             -> posts.slug                (already there)
--   Canonical URL        -> posts.canonical_url       (already there)
--   Robots Index/Follow  -> posts.robots_index/_follow(already there)
--   Facebook Title/Desc/Image -> posts.og_title/og_description/og_image_url
--
-- The doc lists "Canonical URL" under both Core and Advanced. It is one field.
--
-- The nineteen "content analysis" items are NOT columns. They are computed from
-- the post on every render by src/lib/seo-analysis.ts — a stored copy would be
-- wrong the moment somebody edited a paragraph. The two numbers worth keeping
-- are the resulting scores, so a list of 300 posts can be sorted by them
-- without re-analysing 300 bodies.
-- ===========================================================================

-- ------------------------------------------------------------------- roles --
-- 'seo' joins the three that were here. It can edit every SEO field on any
-- post and nothing else: not the body, not publishing, not users.
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('administrator', 'editor', 'author', 'seo'));

-- --------------------------------------------------------- core + advanced --
ALTER TABLE posts ADD COLUMN IF NOT EXISTS secondary_keywords text[] NOT NULL DEFAULT '{}';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS breadcrumb_title   text;

-- Robots directives beyond index/follow. NULL means "say nothing", which is not
-- the same as the default — an explicit max-snippet:-1 is a real instruction.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS robots_archive       boolean NOT NULL DEFAULT true;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS robots_max_snippet   int;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS robots_image_preview text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS robots_max_video     int;

ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_image_preview_check;
ALTER TABLE posts ADD CONSTRAINT posts_image_preview_check
  CHECK (robots_image_preview IS NULL OR robots_image_preview IN ('none', 'standard', 'large'));

-- Per-post redirect. Setting this retires the URL: the page still builds, and
-- data/redirects.json picks the rule up on the next redirects:build.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS redirect_to   text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS redirect_type int;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_redirect_type_check;
ALTER TABLE posts ADD CONSTRAINT posts_redirect_type_check
  CHECK (redirect_type IS NULL OR redirect_type IN (301, 302, 307, 308, 410));

-- ---------------------------------------------------------------- twitter/x --
-- Facebook's three are og_title/og_description/og_image_url and already exist.
-- X reads the og:* tags when its own are absent, so these are overrides and
-- every one of them is nullable on purpose.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS twitter_title       text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS twitter_description text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS twitter_image_url   text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS twitter_card        text;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_twitter_card_check;
ALTER TABLE posts ADD CONSTRAINT posts_twitter_card_check
  CHECK (twitter_card IS NULL OR twitter_card IN ('summary', 'summary_large_image', 'app', 'player'));

-- ------------------------------------------------------------------ schema --
-- The thirteen types the doc lists, and nothing else: an arbitrary @type is how
-- a site ends up emitting markup Google silently ignores. Anything outside the
-- list goes in schema_custom, which is emitted verbatim next to the generated
-- block rather than instead of it.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_type         text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_headline     text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_description  text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_image_url    text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_author       text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_publisher    text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_published_at timestamptz;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_modified_at  timestamptz;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_custom       jsonb;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_schema_type_check;
ALTER TABLE posts ADD CONSTRAINT posts_schema_type_check
  CHECK (schema_type IS NULL OR schema_type IN (
    'Article', 'BlogPosting', 'NewsArticle', 'WebPage', 'FAQPage', 'HowTo',
    'Product', 'Review', 'Recipe', 'Event', 'Organization', 'Person', 'LocalBusiness'));

-- ------------------------------------------------------------------ scores --
-- Written by the SEO screen when it analyses a post, so the list can sort and
-- filter on them. Read src/lib/seo-analysis.ts for what they mean; never treat
-- a stored score as current if the body has been edited since.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_score         int;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS readability_score int;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_checked_at    timestamptz;

CREATE INDEX IF NOT EXISTS posts_focus_keyword_idx ON posts (lower(focus_keyword))
  WHERE focus_keyword <> '';

-- ---------------------------------------------------------- site-wide SEO --
-- Defaults the SEO screen edits and every page falls back to. Kept in settings
-- rather than a table of one row: it is a handful of scalars and settings is
-- already the place the admin reads and writes that sort of thing.
INSERT INTO settings (key, value) VALUES
  ('seo_title_separator',    '"|"'::jsonb),
  ('seo_default_og_image',   '""'::jsonb),
  ('seo_twitter_site',       '""'::jsonb),
  ('seo_twitter_card',       '"summary_large_image"'::jsonb),
  ('seo_org_name',           '"Recycle Technologies"'::jsonb),
  ('seo_org_logo',           '"/images/logo.png"'::jsonb),
  ('seo_org_type',           '"LocalBusiness"'::jsonb),
  ('seo_default_schema',     '"BlogPosting"'::jsonb),
  ('seo_noindex_paginated',  'false'::jsonb)
ON CONFLICT (key) DO NOTHING;
