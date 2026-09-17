-- ===========================================================================
-- RTI Publisher — schema
--
-- Plain SQL on purpose. An ORM would be a fourth dependency and a build step
-- for ten tables that a developer can read in one sitting (CLAUDE.md rule 10).
-- Migrations are numbered files in this folder; scripts/db-setup.mjs runs the
-- ones that have not been applied and records them in schema_migrations.
--
-- Every statement is idempotent, so re-running a migration is safe.
-- ===========================================================================

CREATE TABLE IF NOT EXISTS schema_migrations (
  name       text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------ people --
-- Roles: administrator (everything), editor (can publish), author (draft only).
CREATE TABLE IF NOT EXISTS users (
  id             bigserial PRIMARY KEY,
  email          text        NOT NULL UNIQUE,
  name           text        NOT NULL,
  -- scrypt, stored as "scrypt$<N>$<r>$<p>$<salt-hex>$<hash-hex>". See lib/auth.ts.
  password_hash  text        NOT NULL,
  role           text        NOT NULL DEFAULT 'author'
                 CHECK (role IN ('administrator','editor','author')),
  active         boolean     NOT NULL DEFAULT true,
  last_active_at timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  -- The cookie carries this id plus an HMAC of it; the row is the revocation list.
  id         text        PRIMARY KEY,
  user_id    bigint      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);

-- ----------------------------------------------------------------- content --
CREATE TABLE IF NOT EXISTS categories (
  id            bigserial PRIMARY KEY,
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  description   text,
  -- False until a real landing page exists. The ten categories in the Blogs
  -- menu are all false today; the admin shows them as "Not built".
  landing_built boolean NOT NULL DEFAULT false,
  sort_order    int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS media (
  id          bigserial PRIMARY KEY,
  filename    text NOT NULL,
  url         text NOT NULL,
  mime        text NOT NULL DEFAULT 'image/png',
  width       int,
  height      int,
  bytes       bigint,
  -- Publishing is blocked while a post's images have no alt text.
  alt         text,
  uploaded_by bigint REFERENCES users(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id                bigserial PRIMARY KEY,
  slug              text NOT NULL UNIQUE,
  title             text NOT NULL DEFAULT '',

  -- SEO. meta_title and meta_description fall back to title/excerpt when empty;
  -- the fallback happens at render, not here, so an editor can always see which
  -- of the two a page is actually using.
  meta_title        text NOT NULL DEFAULT '',
  meta_description  text NOT NULL DEFAULT '',
  excerpt           text NOT NULL DEFAULT '',
  focus_keyword     text NOT NULL DEFAULT '',
  canonical_url     text,
  robots_index      boolean NOT NULL DEFAULT true,
  robots_follow     boolean NOT NULL DEFAULT true,
  -- robots.txt splits training crawlers from answering crawlers site-wide; this
  -- is the per-post override for the answering ones.
  allow_ai_answers  boolean NOT NULL DEFAULT true,
  in_sitemap        boolean NOT NULL DEFAULT true,
  og_title          text,
  og_description    text,

  -- Body. content_json is the source of truth (it survives changing editor);
  -- content_html is written beside it on every save so the public page can be
  -- prerendered by reading one column, with no sanitiser in the render path.
  content_json      jsonb NOT NULL DEFAULT '{"type":"doc","content":[]}'::jsonb,
  content_html      text  NOT NULL DEFAULT '',
  toc               jsonb NOT NULL DEFAULT '[]'::jsonb,
  word_count        int   NOT NULL DEFAULT 0,
  reading_minutes   int   NOT NULL DEFAULT 1,

  status            text NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','scheduled','published')),
  category_id       bigint REFERENCES categories(id) ON DELETE SET NULL,
  author_id         bigint REFERENCES users(id) ON DELETE SET NULL,
  featured_media_id bigint REFERENCES media(id) ON DELETE SET NULL,

  published_at      timestamptz,
  scheduled_for     timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS posts_status_idx  ON posts(status);
CREATE INDEX IF NOT EXISTS posts_updated_idx ON posts(updated_at DESC);

-- Every save keeps a copy. Cheap (the JSON compresses well) and it is what the
-- editor's revision rail reads.
CREATE TABLE IF NOT EXISTS post_revisions (
  id           bigserial PRIMARY KEY,
  post_id      bigint NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  title        text NOT NULL DEFAULT '',
  content_json jsonb NOT NULL,
  saved_by     bigint REFERENCES users(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS post_revisions_post_idx ON post_revisions(post_id, created_at DESC);

-- ------------------------------------------------------------------ people --
-- !! subscribers AND leads ARE SEPARATE ON PURPOSE. Consent to "send me a
-- quote" is not consent to "send me a newsletter". Merging the two is the most
-- common way a company breaks CAN-SPAM and GDPR at the same time. A lead that
-- ticked the newsletter box gets its OWN subscribers row, with its own consent
-- timestamp — never a flag on the lead.
CREATE TABLE IF NOT EXISTS subscribers (
  id                bigserial PRIMARY KEY,
  email             text NOT NULL UNIQUE,
  name              text,
  status            text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','unsubscribed','bounced','complained')),
  source_page       text,
  source_type       text NOT NULL DEFAULT 'footer'
                    CHECK (source_type IN ('footer','blog_inline','gated_pdf','quote_form_optin','import','admin')),
  -- The consent evidence. Required if anyone ever asks us to prove it.
  consent_at        timestamptz NOT NULL DEFAULT now(),
  consent_ip        inet,
  consent_user_agent text,
  confirmed_at      timestamptz,
  -- A random token, not a hash of the email, so an unsubscribe URL cannot be
  -- guessed for someone else.
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  unsubscribed_at   timestamptz,
  tags              text[] NOT NULL DEFAULT '{}',
  country           text,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS subscribers_status_idx ON subscribers(status);

CREATE TABLE IF NOT EXISTS leads (
  id          bigserial PRIMARY KEY,
  type        text NOT NULL DEFAULT 'contact'
              CHECK (type IN ('contact','quote','download','callback')),
  name        text,
  email       text,
  phone       text,
  company     text,
  message     text,
  -- Quote and download specifics live here rather than as twenty sparse columns:
  -- material_types, estimated_volume, pickup_zip, requested_asset.
  details     jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_page text,
  utm         jsonb NOT NULL DEFAULT '{}'::jsonb,
  ip          inet,
  status      text NOT NULL DEFAULT 'new'
              CHECK (status IN ('new','contacted','qualified','won','lost','spam')),
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status, created_at DESC);

-- -------------------------------------------------------------------- site --
CREATE TABLE IF NOT EXISTS settings (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Empty url = the icon is hidden on the site rather than linking nowhere.
CREATE TABLE IF NOT EXISTS social_links (
  id         bigserial PRIMARY KEY,
  platform   text NOT NULL UNIQUE,
  url        text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

-- Seeded from data/url-map.csv. A slug change on a published post adds a row
-- here automatically; the API flattens chains so A -> B -> C becomes A -> C.
CREATE TABLE IF NOT EXISTS redirects (
  id          bigserial PRIMARY KEY,
  from_path   text NOT NULL UNIQUE,
  to_path     text NOT NULL,
  status_code int  NOT NULL DEFAULT 301,
  source      text NOT NULL DEFAULT 'manual'
              CHECK (source IN ('manual','url-map','slug-change')),
  hits        bigint NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);
