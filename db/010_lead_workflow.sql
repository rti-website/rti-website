-- 010: lead workflow — 26 Sep 2026.
--
-- Asim: management wants to see the exact time an enquiry arrived, to record
-- enquiries that come in by phone (and how they came in), and to assign
-- enquiries to agents who sign in and work their own list.
--
-- Run on dev and live after 009:
--   psql "$DATABASE_URL" -f db/010_lead_workflow.sql

-- ------------------------------------------------------------------- roles --
-- 'agent' joins the four: works the enquiries assigned to them, nothing else.
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('administrator', 'editor', 'author', 'seo', 'agent'));

-- ---------------------------------------------------------------- channel --
-- How the enquiry reached us. Everything before today is 'website' (the forms
-- are the only way a row got here). channel_detail is free text: which line
-- they called, who referred them, which inbox the email came to.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS channel text NOT NULL DEFAULT 'website';
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_channel_check;
ALTER TABLE leads ADD CONSTRAINT leads_channel_check
  CHECK (channel IN ('website', 'phone', 'email', 'walk_in', 'referral', 'other'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS channel_detail text;
-- Who typed it in (a phone enquiry) — NULL for the website forms.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS created_by bigint REFERENCES users(id) ON DELETE SET NULL;

-- ------------------------------------------------------------- assignment --
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to bigint REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_by bigint REFERENCES users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS leads_assigned_idx ON leads(assigned_to, status, created_at DESC);

-- --------------------------------------------------------------- activity --
-- Everything that happens to an enquiry after it arrives: who assigned it to
-- whom, status changes, notes. Append only; the enquiry's own row keeps the
-- current state, this keeps the story.
CREATE TABLE IF NOT EXISTS lead_activity (
  id       bigserial PRIMARY KEY,
  lead_id  bigint NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id  bigint REFERENCES users(id) ON DELETE SET NULL,
  kind     text NOT NULL CHECK (kind IN ('created', 'assigned', 'status', 'note')),
  body     text,
  at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lead_activity_lead_idx ON lead_activity(lead_id, at DESC);
