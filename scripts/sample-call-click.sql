-- A pretend "tapped to call" enquiry for a LOCAL database, so the screen can
-- be seen without tapping a number on the site. Never run on dev or live.
-- Asim, 27 Sep 2026. Needs db/010.
--   psql "$DATABASE_URL" -f scripts/sample-call-click.sql
WITH l AS (
  INSERT INTO leads (type, details, source_page, ip, status, channel, channel_detail, created_at)
  VALUES ('callback',
          '{"callClick": "+1 763-559-5130", "clickedFrom": "/battery-recycling/", "clickLabel": "+1-763-559-5130"}'::jsonb,
          '/battery-recycling/', '73.94.12.8', 'new', 'phone', 'Tapped +1 763-559-5130 on /battery-recycling/',
          now() - interval '35 minutes')
  RETURNING id
), a AS (
  INSERT INTO lead_attribution (lead_id, utm_source, utm_medium, utm_campaign, gclid, keyword, device, landing_page, referrer, submit_page, user_agent, captured_at)
  SELECT id, 'google', 'cpc', 'battery-recycling-mn', 'Cj0KCQjw-sample', 'battery recycling near me', 'm',
         'https://www.recycletechnologies.com/battery-recycling/?utm_source=google&utm_medium=cpc&utm_campaign=battery-recycling-mn',
         NULL, 'https://www.recycletechnologies.com/battery-recycling/',
         'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
         now() - interval '36 minutes'
    FROM l
)
INSERT INTO lead_activity (lead_id, kind, body, at)
SELECT id, 'created', 'Tapped +1 763-559-5130 on /battery-recycling/', now() - interval '35 minutes' FROM l;
