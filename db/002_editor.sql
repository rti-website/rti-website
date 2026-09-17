-- 002 — sub-categories, and the columns the editor's right rail now writes.
--
-- Idempotent like 001: every statement is IF NOT EXISTS or guarded, so running
-- it twice is a no-op and scripts/db-setup.mjs can apply it on an existing
-- database without anyone thinking about order.

BEGIN;

-- ------------------------------------------------------------- categories --
-- A category can now sit under another one: "Battery & Hazardous Disposal" as a
-- main category with "Lithium Batteries" beneath it.
--
-- ! ONE LEVEL, DELIBERATELY. The API refuses to make a child of a child. Deeper
-- nesting looks free here and is not: it is a breadcrumb, a URL shape and a
-- menu layout decision each, and nobody has asked for it. The column allows it;
-- the rule that stops it lives in the categories endpoint.
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id bigint REFERENCES categories(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS categories_parent_idx ON categories(parent_id);

-- A category cannot be its own parent. Cheap, and it makes a whole class of
-- accident impossible rather than merely unlikely.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'categories_not_own_parent') THEN
    ALTER TABLE categories ADD CONSTRAINT categories_not_own_parent CHECK (parent_id IS NULL OR parent_id <> id);
  END IF;
END $$;

-- ------------------------------------------------------------------ posts --
-- The featured image's own alt text. media.alt describes the file wherever it
-- is used; this is what the post wants said about it in ITS context, and on the
-- card and the social preview. Usually the same, sometimes not.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS featured_alt text;

-- (featured_media_id and canonical_url were already in 001 — the editor just
--  had no field for them until now.)

COMMIT;
