-- ===========================================================================
-- 011 — Admin -> Pages: editable page copy (Asim, 27 Sep 2026: "make all the
-- pages editable ... add the button preview so admin can see his change").
--
-- The copy of every page still lives in src/data/*.ts; that stays the
-- default. What the admin changes is stored here as a PATCH: a map of field
-- path -> new value ("HERO.h1", "FAQS.2.a", or a whole list at "FAQS" when
-- items were added, removed or reordered). The site merges the published
-- patch over the defaults when a page is built or revalidated, so a field no
-- one has touched keeps following the code. See src/lib/content-patch.ts and
-- src/lib/page-content.ts.
--
--   page_content            one row per editable document (a page, or a
--                           block shared by many pages such as the footer)
--   page_content_revisions  every publish, so an older version can be put back
--
-- Draft -> Preview -> Publish: `draft` is what the editor saves and what the
-- preview shows (Next draft mode); `published` is what visitors see. NULL
-- draft = nothing unpublished.
--
-- Idempotent. Run on dev and live after 010:
--   psql "$DATABASE_URL" -f db/011_page_content.sql
-- ===========================================================================

CREATE TABLE IF NOT EXISTS page_content (
  key               text PRIMARY KEY,
  draft             jsonb,
  published         jsonb NOT NULL DEFAULT '{}'::jsonb,
  draft_updated_at  timestamptz,
  draft_updated_by  bigint REFERENCES users(id) ON DELETE SET NULL,
  published_at      timestamptz,
  published_by      bigint REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS page_content_revisions (
  id            bigserial PRIMARY KEY,
  key           text NOT NULL,
  content       jsonb NOT NULL,
  published_at  timestamptz NOT NULL DEFAULT now(),
  published_by  bigint REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS page_content_revisions_key_idx
  ON page_content_revisions(key, published_at DESC);
