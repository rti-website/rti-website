-- Real social accounts, supplied by Asim 22 Sep 2026.
--
-- WHY: social_links was seeded in db/001_init.sql with GUESSED handles
-- (facebook.com/RecycleTechnologies, linkedin.com/company/recycle-technologies-inc,
-- youtube.com/@recycletechnologies). None of those are the accounts RTI
-- actually has. The footer reads this table now — see src/lib/social.ts — so a
-- wrong row here is a wrong link on every page of the site.
--
-- Idempotent: safe to run on a database that has already had it applied.

UPDATE social_links SET url = 'https://www.facebook.com/people/Recycle-Technologies-Inc/100092032864881/'
  WHERE lower(platform) = 'facebook';

UPDATE social_links SET url = 'https://www.linkedin.com/company/recycle-technologies/'
  WHERE lower(platform) = 'linkedin';

UPDATE social_links SET url = 'https://www.youtube.com/channel/UCjhjl8fXa1Ju8XycO2hbjvw'
  WHERE lower(platform) = 'youtube';

-- TikTok, Instagram and X were seeded the same way and have never been
-- confirmed. Blanked rather than left pointing at accounts that may not exist:
-- an empty url hides the icon, which is this table's own documented behaviour
-- (see the comment above the CREATE TABLE in 001_init.sql). Put a real URL in
-- from the admin and the icon comes back — as long as the platform also has a
-- glyph in src/lib/social.ts, which currently means Facebook, LinkedIn and
-- YouTube only.
UPDATE social_links SET url = '' WHERE lower(platform) IN ('tiktok', 'instagram', 'x', 'twitter');
