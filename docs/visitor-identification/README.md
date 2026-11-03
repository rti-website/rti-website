# Visitor identification: how it works and how to run it

Built 29 Oct 2026 to the brief in `BRIEF.md` (v2). This file is the handover document the brief asks for in section 12: the tables, the jobs, the environment variables, how to switch provider, rotate the salt and keys, and change recipients.

## What it does

1. **Consent first.** A visitor accepts Analytics in the cookie banner. Before that, nothing is sent and no cookie is set. Declining or Global Privacy Control means nothing at all.
2. **Capture.** The page sends one small POST to `/api/e/` per page. The server sets `rti_vid` (a random ID, HttpOnly, 13 months) and stores the visit and page view.
3. **Visitor lead.** Every consented, non-bot visitor gets one Visitor lead in Admin → Visitor leads.
4. **Enrich.** Right after the response, the IP is looked up at ipapi.is, once per 30 days per IP. The raw IP is never stored, only a salted hash.
5. **Business IP.** If the IP belongs to a business, school, government body or bank (and is not a relay or cloud network), a company is created and the Visitor lead is marked **Business IP** with the company's name.
6. **Form link.** When the same browser sends the quote, contact or pickup form, the enquiry remembers the visitor (Visitor history panel on the enquiry) and the Visitor lead turns **Converted**. Routing emails and the Enquiries list are unchanged.
7. **Admin.** Admin → **Visitors** lists companies; Admin → **Visitor leads** lists every Visitor lead, Business IP first.
8. **Email.** A daily digest at 7 am Central and a weekly report on Monday go to `VISITOR_DIGEST_TO` only.

Limits to tell users: office networks resolve; home, mobile and VPN traffic does not. Shared networks can show the wrong organisation, so Business IP is a signal, not proof. One person on two devices is two Visitor leads until a form ties them.

## Where the code is

| Part | File |
| --- | --- |
| Migration (and undo) | `db/018_visitor_identification.sql`, `db/down/018_visitor_identification.down.sql`, `npm run db:down` |
| Browser tracker | `src/components/client/VisitorTracker.tsx` (mounted in `src/app/layout.tsx` only when `VISITOR_CAPTURE=on`) |
| Endpoint | `src/app/api/e/route.ts` |
| Storing visits | `src/lib/visitor/store.ts` |
| Lookups and companies | `src/lib/visitor/enrich.ts`, `lookup-ip.ts` (provider), `classify.ts` |
| Visitor leads | `src/lib/visitor/leads.ts`; the form hook is in `src/app/api/leads/route.ts` |
| Jobs and emails | `src/lib/visitor/jobs.ts`, `timer.ts`, started by `src/instrumentation.ts` |
| Admin | `src/components/client/admin/Visitors.tsx`, `VisitorLeads.tsx`, `VisitorHistory.tsx`; endpoints in `src/app/api/admin/visitors/`, `visitor-leads/`, `visitor-history/` |
| Settings | `src/lib/visitor/config.ts` (every variable is explained there) |
| Pure helpers (tested) | `src/lib/visitor/ip.ts`, `bot.ts`, `source.ts`, `consent.ts`, `schedule.ts` |
| Privacy paragraph | `VisitorIdentificationNotice` in `mdx-components.tsx`, placed in `content/pages/privacy-policy.mdx`. It only appears when `VISITOR_CAPTURE=on`. |

## Tables (db/018)

| Table | What it holds |
| --- | --- |
| `visitors` | One row per browser (`id` = `rti_vid`); first touch; company; its Visitor lead |
| `visits` | One row per session (30 minutes idle closes it); device; entry and exit; source; IP hash until linked |
| `page_views` | Path, title, time, seconds on page |
| `ip_lookups` | One row per IP hash: the organisation and what it was classified as. Deleted after 90 days |
| `companies` | Identified organisations; status New, Reviewed, Lead created or Ignore; notes |
| `leads` (new columns) | `lead_type` (`form` or `visitor`), `visitor_id`, `is_business_ip`, `converted_lead_id`, `visitor_status` |

Every existing lead is `lead_type = 'form'`. Every query that lists, counts, routes or emails enquiries now filters `lead_type = 'form'`:

- the Enquiries list, edit and delete;
- the "View form" endpoint;
- the Enquiries badge;
- the location backfill;
- the auto reply limit.

## Environment variables

Set on the server in `.env.local` (dev and live each have their own). Never in git, chat or tickets.

| Variable | Value |
| --- | --- |
| `VISITOR_CAPTURE` | `on` to collect. Off by default. It also publishes the privacy paragraph and the banner wording. |
| `VISITOR_JOBS` | `on` in **one** app only (dev and live share the database). It starts the digest, weekly report and retention. |
| `IPAPI_KEY` | The ipapi.is key. Without it, visits are stored but stay anonymous. |
| `IP_HASH_SALT` | 32+ random characters (`openssl rand -hex 32`). Without it, no IP is used at all. Use the same value in dev and live. |
| `VISITOR_EXCLUDED_IPS` | Office and VPN ranges, CIDR, comma separated. These are never looked up. |
| `VISITOR_DIGEST_TO` | `aaqib@99technologies.com` until sign off. |
| `VISITOR_ADMIN_ROLES` | Roles that see the two screens. Default `administrator`; empty means nobody by role. |
| `VISITOR_ADMIN_EMAILS` | Extra people by email. For the dark launch, set `VISITOR_ADMIN_ROLES=` (empty) and this to Aaqib's login. |
| `CLIENT_IP_HEADER` | Default `x-forwarded-for` (our nginx sets it). |
| `VISITOR_DEBUG_IP` | `on` to log the IP headers, masked, once per request. Turn it off after checking. |
| `MAXMIND_LICENSE_KEY` | Not used. The EU/UK check uses the DB-IP file the site already has (`npm run geoip:update`). |

## Jobs

The timer runs once a minute where `VISITOR_JOBS=on`. A Postgres lock means only one process works, even if both apps are on. When each job last ran is kept in `settings.visitor_jobs`, so a restart neither repeats nor skips a job.

- **Every 10 minutes:** sweep. It links visits to lookups, brings Visitor leads up to date and refreshes company counts.
- **Daily after 7 am Chicago:** the digest for yesterday, skipped when there were no new companies (the weekly report says so).
- **Mondays after 7 am Chicago:** the weekly report.
- **Monthly:** retention.
  - Lookups older than 90 days are deleted, and IP hashes on visits are cleared after 90 days.
  - Visits and page views older than 13 months are deleted.
  - Visitor leads unseen for 13 months are deleted, unless they are Business IP or converted.
- **Lookup cap:** past 800 lookups in a day, one warning email goes out; at 1,000 (the free plan's cap) lookups stop until the next day.

To run a job now (administrators), sign in to the admin and run this in the browser console:
`fetch('/api/admin/visitors/jobs/', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({job:'digest'})}).then(r=>r.json()).then(console.log)`
The job can be `sweep`, `digest` (yesterday, or add `day:'YYYY-MM-DD'`) or `weekly`.

## Common changes

- **Switch provider:** rewrite `src/lib/visitor/lookup-ip.ts` so it returns `IpLookupResult` (`classify.ts`). Nothing else changes.
- **Rotate the IP salt:** change `IP_HASH_SALT` on both servers and restart. Old hashes no longer match, so each IP is looked up once more (it counts against the daily lookups). Companies, visitors and leads are kept.
- **Rotate the ipapi key:** change `IPAPI_KEY`, then restart (`pm2 restart … --update-env`).
- **Change recipients after sign off:** change `VISITOR_DIGEST_TO` (for example Aaqib, Christine, Usman, Ijaz). It is not a code change.
- **Who sees the screens:** use `VISITOR_ADMIN_ROLES` and `VISITOR_ADMIN_EMAILS`.
- **Turn it all off:** set `VISITOR_CAPTURE=off` and rebuild. The tracker, the endpoint and the privacy paragraph go away; the data stays. To delete everything, run `npm run db:down -- 018_visitor_identification`.

## Testing

- `npm test`: 28 unit tests. They cover the consent gate, first touch, session idle, the bot filter, IP classification (10 business and 10 ISP/VPN results), the EU/UK list, masking and hashing, office exclusion, the Chicago schedule, and the placeholder company names.
- `node scripts/visitor-e2e.mjs`: 35 end to end checks against a running local build and **local** database (it refuses anything else). The header of the file shows how to run it. It covers:
  - consent, GPC, origin and bots;
  - first touch held until consent;
  - five pages making one visit, and the 30 minute split;
  - Visitor lead creation and Business IP marking;
  - office exclusion, and no raw IP at rest;
  - form conversion with no duplicate;
  - Enquiries and the badge staying unchanged;
  - the admin screens, roles and CSV;
  - withdrawal and the flood limit.
- `npm run visitor:lookup -- <ip>`: the M0 check. It looks up one IP with the real key and prints the decision, with the IP masked.

## Decisions taken (Aaqib, 29 Oct 2026, "use your defaults")

1. **EU/UK check:** the existing DB-IP country file, so no MaxMind account. EEA countries and Switzerland are included.
2. **Jobs:** a scheduler inside the app (option A in `M0-INVENTORY.md`) with a Postgres lock.
3. **Cookies:** `rti_attr` stays exactly as it was. `/api/e/` sets only `rti_vid`, and it is HttpOnly.
4. **Visitor lead status:** it lives in its own column (`visitor_status`), so the enquiry statuses are untouched.
5. **"No raw IP":** this covers the new tables and all logs. Existing `leads.ip` (enquiries) and `subscribers.consent_ip` are unchanged.
6. **Tap to call:** stays as it was and does not convert a Visitor lead. Newsletter sign ups do not convert either.
7. **Raw IP and lookups:** the IP is held in memory only until its lookup is done (right after the response). After a restart, anything still queued stays anonymous until that IP comes back.
8. **Tests:** `node --test` with Node's built-in TypeScript support, so no new dependency.

## 30 Oct 2026: management's additions

"Pages viewed in order, with time on each page; how they found us (Google Ads, organic, LinkedIn, direct); city or state, visit count, last seen; a hot lead flag if they viewed the quote page, a service page, or came back more than once."

- **Journey.** Admin, Visitor leads: each row has a **Journey** button. It lists every visit, oldest first. Each visit shows how it started, where from and the device, then its pages in order with the time on each. A page left before it was measured shows "not measured". The enquiry's Visitor history panel and the company Details use the same view (`Journey` in `VisitorHistory.tsx`; data from `sessionsOf()` in `admin-data.ts`, and `GET /api/admin/visitor-history/?visitor=<id>`).
- **How they found us.** `sourceOf()` in `source.ts` now has six kinds:
  - ad: Google Ads, Microsoft Ads, "LinkedIn Ads" from a paid utm_medium;
  - organic: "Organic: Google";
  - social: LinkedIn, Facebook and others;
  - email;
  - referral: other sites, with AI assistants by name;
  - direct.

  The filter on both screens offers the six.
- **Location.** A new visit stores its city, state and country from the DB-IP file at capture (`db/019_visit_location.sql`, `store.ts`). The lists show the ipapi.is city first, then that, then the company's. No raw IP is stored and nothing is sent anywhere. Visits from before 019 have no stored place; the ipapi.is city still shows when a lookup was made.
- **Hot lead.** `hot.ts` marks a lead hot when the visitor viewed the quote page, a pickup or contact page, or a service page (hubs, their state and Chicago pages; not location pages), or came back (`HOT_MIN_VISITS = 2`). It shows the reasons. It is not shown once they send a form.
  - The **Hot leads only** filter replaces Intent only; `intent=1` still works.
  - The CSVs and the daily and weekly emails show Hot and why.
- **Tests:** `tests/visitor/hot.test.ts` and the new source cases (32 unit tests). The e2e script still passes 35 of 35. A journey test was run against a local build and database: LinkedIn, then a Google Ads visit, with 42s and 2m 15s on the right pages and Minneapolis, Minnesota as the place.

## 30 Oct 2026 (later): one visitor per IP, no cloud traffic, Snitcher

Management: "Group visits from the same organization and IP into one visitor, not one row per session." And: "An 'Anthropic, PBC' visit appeared from an automated check that never accepted cookies. Please confirm nothing is recorded before consent, and exclude bots and cloud or data center networks."

- **The Anthropic visit:** it was our own server-side test of `/api/e/` from the build environment. That request sent a consent cookie on purpose, so it is not a hole in the consent gate. Real browsers send nothing before Accept; this was rechecked in a browser (no request before consent, none after Reject).
- **One visitor per IP** (`store.ts` `resolveVisitor`, `mergeByIp`):
  - A request uses its cookie's visitor when that visitor still exists.
  - Otherwise it uses the visitor last seen from the same IP hash in the last 30 days, on a computer or tablet. So a new private window, a cleared cookie or a second browser in the same office joins the same visitor.
  - The 10 minute sweep joins visitors that each already had a cookie. The one first seen keeps its id, first touch and Visitor lead, and takes the others' visits, enquiries and conversion.
  - Phones never join by IP, because mobile networks share addresses with strangers.
- **Cloud and data centre networks** (`classify.ts` `datacenter`, `enrich.ts` `purgeDatacenter`):
  - **What counts:** the datacenter flag without a VPN or proxy flag, hosting type, or a cloud or AI company by name (Anthropic, OpenAI, AWS, Google Cloud, Azure, DigitalOcean, Hetzner, OVH and others).
  - **What happens:** everything such a visit stored is deleted, together with its Visitor lead and a company made only from it. Later requests from that IP are not stored and get no cookie.
  - **Older lookups:** the sweep also reclassifies lookups made before the rule.
  - **People are kept:** VPN, proxy and Tor exits stay anonymous.
- **Snitcher** (`SnitcherTag.tsx`): Snitcher's own snippet, loaded only after Analytics consent, never in the admin or a preview. It is set by `SNITCHER_PROFILE_ID` in `.env.local` (empty means off; rebuild after changing it).
- **Tests:** 33 unit tests; the e2e checks pass 35 of 35; a grouping and data centre test passes 13 of 13; and a browser test confirms Snitcher is absent before consent and after Reject, and loads once after Accept.

## Open items

- **Privacy paragraph:** the wording is a draft for Aaqib and Musaveer to approve. It goes live by itself when `VISITOR_CAPTURE=on` on live.
- **Proxy header:** confirm that the AWS proxy in front of nginx passes the real client IP in X-Forwarded-For. With `VISITOR_DEBUG_IP=on` on dev, one visit logs it (masked).
- **Office ranges:** the office and VPN ranges are needed for `VISITOR_EXCLUDED_IPS`.
- **Tawk chat:** it still sets cookies before consent. This belongs to the banner work, not this module.
