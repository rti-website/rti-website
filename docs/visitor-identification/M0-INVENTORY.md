# Visitor Identification: Step 1 inventory and M0 plan

Status: Step 1 of the brief (inventory, no code). Written 27 Oct 2026 for Aaqib. **No visitor identification code has been written. M0 starts only after Aaqib approves this plan and answers Part 4.**

Scope: the review covered `src/`, `db/`, `scripts/` and the root files. No `.env` file was opened. Brief: `docs/visitor-identification/BRIEF.md` (v2, from management).

Not reviewed yet (they are in the repo and need a look before M0): `.env.example` (names only), `.github/workflows/`, `SETUP.md`, `SETUP-ADMIN.md`, `deploy/` (nginx config and `PRODUCTION-SAME-VM.md`), `var/` (uploads, geoip). So the nginx, PM2 and CI details below are from code comments, not from those files.

---

## Part 1. The eight inventory items

### 1. Migration tool and DB access layer

**Migration tool.** A home made runner, not a library.
- Migrations are numbered plain SQL files in `db/` (`001_init.sql` to `016_content_action_plan_14_oct_2026.sql`). Next number is **017**.
- `scripts/db-setup.mjs` (`npm run db:setup`) shells out to the `psql` binary (`execFileSync`), creates the database if missing, creates `schema_migrations(name text primary key, applied_at)`, runs every `db/*.sql` file matching `/^\d+.*\.sql$/` not yet recorded, in filename order, then also seeds categories, social links, settings, redirects and the first admin user. All of that is re-runnable.
- Evidence: `readdirSync(DB_DIR).filter((f) => /^\d+.*\.sql$/.test(f)).sort()` and `psqlFile(url, ...)` then `INSERT INTO schema_migrations`.
- Some migrations (006, 007, 008) also insert their own row into `schema_migrations`. 010 and 012 say "run by hand: `psql "$DATABASE_URL" -f db/010_lead_workflow.sql`". So in practice live may have been migrated by hand with psql, not always through `db:setup`.
- The README claim "each migration runs in one transaction" is only true for files that contain their own `BEGIN; ... COMMIT;` (002, 003, 013 to 016). Files 001, 006, 007, 010, 012 do not, and `psqlFile` has no `-1` flag. New migration must carry its own `BEGIN/COMMIT`.
- Style: idempotent (`IF NOT EXISTS`, `DROP CONSTRAINT IF EXISTS` then `ADD CONSTRAINT`).

**Reversible?** **No.** There are no down migrations, no "down" convention, and no rollback command anywhere. The brief's "every migration is reversible" needs new tooling (see M0 plan).

**DANGER to design around:** if a down file is named `017_x.down.sql` and placed in `db/`, the existing regex `/^\d+.*\.sql$/` will treat it as a forward migration and run it on the next `db:setup`, dropping the tables. Down files must live in a subfolder (`db/down/`, which the non recursive `readdirSync` ignores) or the runner must be changed.

**DB access layer.** `src/lib/db.ts`: `pg` Pool, no ORM. Exports `q(text, params)` (rows), `one()` (first row or null) and `tx(fn)` (BEGIN/COMMIT/ROLLBACK). `import 'server-only'`.
- One pool per process, parked on `globalThis.__rtiPool`; `max` defaults to **4** (`DB_POOL_MAX` to override), connect timeout 30 s. The comment explains the 18 Sep 2026 connection exhaustion: build workers x pool size vs PostgreSQL `max_connections`, on a box shared with "five other apps".
- `INT8` is parsed to JS Number, so bigint ids arrive as numbers.
- Only used from route handlers and server libs. Public prerendered pages must never import it (`dynamic = 'error'` in `src/app/layout.tsx`, CLAUDE.md rule 2).
- Postgres 16+ per README. `gen_random_uuid()` is available (pgcrypto created in `db-setup`).
- Existing advisory lock precedent: `src/lib/service-locations.ts:139` uses `pg_advisory_xact_lock(hashtext(...))`.

### 2. Admin auth, roles, layout, shared components

**Auth** (`src/lib/auth.ts`): scrypt passwords, random session id stored in table `sessions`, cookie `rti_admin_session` = `id.HMAC`, 14 days, httpOnly, sameSite lax. `currentUser()` returns `{id, email, name, role}`. Needs `ADMIN_SESSION_SECRET` (32+ chars). `Secure` flag is controlled by `NODE_ENV` and `ADMIN_ALLOW_HTTP` (explicitly not inferred from `x-forwarded-proto`; useful precedent for the visitor cookies).

**Roles** (`users.role` CHECK, last set in `db/012_ads_role.sql`): `administrator`, `editor`, `author` (shown as "Content writer"), `seo`, `agent` (Sales agent, db/010), `ads` (Ads manager, db/012). Type `Role` and list `ROLES` in `src/lib/auth.ts`; duplicated in `AdminApp.tsx` (`ROLE_LABEL`).

**Endpoint guard** (`src/lib/admin-route.ts`): `guard(handler, { role?: Role[] })` wraps every `/api/admin/*` route handler: 401 if no session, 403 if role not in the static `role` array. Also a `WRITES` table that blocks non GET requests for `ads` and `agent` outside a path regex:
- `ads: /^\/api\/admin\/(leads|tracking|maps|subscribers|session)(\/|$)/`
- `agent: /^\/api\/admin\/(leads|session)(\/|$)/`

So a new `/api/admin/visitors` endpoint is read only for `ads` unless the regex is edited.

**Layout.** The admin is **one static page**, `src/app/admin/page.tsx`, rendering the client component `src/components/client/admin/AdminApp.tsx` (996 lines). Navigation is React state (`type View = 'dash' | 'posts' | ... | 'leads' | 'workflow' | 'users' | 'tracking' | 'social'`), not URL routes. It loads `/api/admin/bootstrap/` for user, counts and settings, and everything else comes from `/api/admin/*` route handlers. Only deep link: `/admin/?lead=123` (assignment email). The page is static because of `dynamic = 'error'`.

**Shared components** in `src/components/client/admin/`: `Dialog.tsx` (Dialog, AskDialog, ConfirmDialog), `Bits.tsx` (Icon, Retry, PasswordInput), `Menu.tsx`, `Split.tsx`, `api.ts` (`api()`, `getJSON`, `sendJSON`, always adds the trailing slash), CSS `src/styles/admin.css` (`a-*` classes). Screens: `Leads.tsx` (750 lines; includes `LeadDialog` "Add an enquiry", client side filter by text/status/assignee/form/date, a client side CSV `download()`), `LeadWorkflow.tsx`, `LeadLocation.tsx`, `Users.tsx`, `SiteSettings.tsx` and others.

**Consequences for the brief:**
- "Route `/admin/visitors`" does not exist as a pattern. Either add a `view = 'visitors'` inside AdminApp (no URL) plus a `?view=visitors` deep link so the digest email can link to it, or add `src/app/admin/visitors/page.tsx` that renders AdminApp with an initial view. Same for the "Visitor leads tab".
- `VISITOR_ADMIN_ROLES` is a list of role ids, but `guard` takes a static array. Need a helper that reads the env var, and the bootstrap response must tell the client `canSeeVisitors` (the client cannot read env).
- The brief names people (Aaqib, Shujaat, Christine, Usman); the system has roles. Which role each of them has is not in the code (needs `SELECT email, role FROM users` by Aaqib). Several of them probably share a role with people who should not see Visitors. "Visible to Aaqib only" during the dark launch cannot be expressed with roles. Needs a user level allowlist (for example `VISITOR_ADMIN_EMAILS`) or a decision.

### 3. Lead table schema and every lead touching file

**Schema, assembled from the migrations:**

`leads` (db/001): `id bigserial pk`, `type text NOT NULL DEFAULT 'contact' CHECK (type IN ('contact','quote','download','callback'))`, `name`, `email`, `phone`, `company`, `message`, `details jsonb NOT NULL DEFAULT '{}'`, `source_page`, `utm jsonb`, **`ip inet`**, `status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','won','lost','spam'))`, `notes`, `created_at`. Index `leads_status_idx (status, created_at DESC)`.
- db/007: `geo jsonb`.
- db/010: `channel text NOT NULL DEFAULT 'website' CHECK (channel IN ('website','phone','email','walk_in','referral','other'))`, `channel_detail`, `created_by`, `assigned_to`, `assigned_at`, `assigned_by` (all FK to users), index `leads_assigned_idx`.

`lead_attribution` (db/006): one row per lead, `lead_id bigint PK REFERENCES leads ON DELETE CASCADE`; gclid, gbraid, wbraid, fbclid, msclkid, 5 utm_*, campaign_id, adgroup_id, keyword, matchtype, device, landing_page, referrer, submit_page, user_agent, captured_at.

`lead_activity` (db/010): `id, lead_id (cascade), user_id, kind CHECK (kind IN ('created','assigned','status','note')), body, at`.

Related: `subscribers` (separate on purpose, has `consent_ip inet`), `settings(key, value jsonb)` (holds `tracking` and `maps` rows).

**Schema mismatches with the brief's section 5 and 7:**
1. `leads.status` CHECK does not allow the Visitor statuses (New, Reviewed, Converted, Ignore). `leads.type` CHECK has no 'visitor' (default is 'contact', which would label a Visitor lead as a contact). Options: extend both CHECKs (pollutes the form lead status list in `Leads.tsx`, `LeadWorkflow.tsx` and `STATUSES` in `/api/admin/leads`), or add a separate `visitor_status` column (a fifth new column, a deviation from "four new columns"). **Decision needed.**
2. Circular foreign keys: `visitors.lead_id -> leads.id` and `leads.visitor_id -> visitors.id`. The migration must create `visitors` first without the FK, add the `leads` columns, then add the `visitors.lead_id` FK afterwards.
3. `leads.ip inet` already stores a **raw IP** for every form lead and tap to call row (see item 6). `subscribers.consent_ip` also stores raw IPs. Brief section 4 ("never raw IP at rest") and the definition of done ("No raw IP exists in the database") cannot be true as written unless scoped to the new tables, or the existing columns are changed. **Decision needed.**
4. Volume: 15,000 to 25,000 sessions a month means thousands of new Visitor leads a month in the same table as a few form leads a day. `/api/admin/leads` loads the newest 2,000 rows and the admin filters in the browser. Without the `lead_type='form'` filter, Visitor leads would push every real enquiry out of that list. The Visitor leads tab needs server side paging and filtering, not the existing load 2000 pattern.
5. Existing indexes lead with `status`; add `(lead_type, created_at DESC)` style indexes so form queries stay cheap. The brief's `leads(lead_type, is_business_ip)` alone is not enough for the form list.
6. The existing channel CHECK has no value for a lead created from the Visitors page "Create lead". Use `other` plus `channel_detail`, or extend the CHECK.

**EVERY file that queries, counts, routes, emails or lists leads** (each must filter `lead_type = 'form'` or be proven unaffected):

| # | File | What it does with leads | Needs filter? |
|---|---|---|---|
| 1 | `src/app/api/leads/route.ts` | The public form handler. `INSERT INTO leads` (l.266), `INSERT INTO lead_attribution` (l.291), residential auto reply dedupe `SELECT count(*) FROM leads WHERE lower(email)=... AND details ? 'autoReply'` (l.362), `UPDATE leads SET details` (l.379), `notifyRecipients`/`leadNotification`/`sendMail` (the routing email). This is also where Visitor lead conversion hooks in. | The count at l.362 (add filter). Insert uses default 'form'. |
| 2 | `src/app/api/call-click/route.ts` | Tap to call: `INSERT INTO leads` type 'callback' channel 'phone' (l.59), `lead_attribution` (l.76), `lead_activity` (l.85), then `locateLead`. | Insert only; stays 'form' by default (decision: see Part 2). |
| 3 | `src/app/api/admin/leads/route.ts` | GET list (`FROM leads l LEFT JOIN lead_attribution`, `LIMIT 2000`, plus fallback query l.101), PATCH (`SELECT ... FROM leads WHERE id`, `UPDATE leads SET status/notes/assigned/name...`), POST (`INSERT INTO leads`, manual enquiries), DELETE (`DELETE FROM leads WHERE id = ANY`). | GET (both queries) must filter. PATCH/DELETE by id should refuse or branch on lead_type. |
| 4 | `src/app/api/admin/leads/form/route.ts` | "View form" for one lead: `SELECT ... FROM leads l`, `lead_attribution`. | By id; guard against Visitor lead ids. |
| 5 | `src/app/api/admin/bootstrap/route.ts` | Nav badge: `(SELECT count(*) FROM leads WHERE status = 'new' ...)` (l.18). | **Yes.** This is the "lead total" users see. |
| 6 | `src/lib/lead-location.ts` | `locateLead(id)` (SELECT/UPDATE by id), and `fillMissingLocations()` which runs `SELECT ... FROM leads WHERE geo IS NULL ... LIMIT 500` **every time the admin opens Enquiries**. | **Yes.** Without the filter it would grind through Visitor leads (geo is NULL on all of them). |
| 7 | `src/lib/lead-assign-mail.ts` | `SELECT ... FROM leads WHERE id`, `lead_activity`; emails the assigned agent. | By id; only form leads are assignable. |
| 8 | `src/lib/mail.ts` | `notifyRecipients()` and `notifyAddress()` choose the routing recipients (env `LEAD_NOTIFY_TO*`, `LEAD_NOTIFY_CC*`). Not a query, but it is the "routing". Visitor leads must never call it. | No code change. Add a test that Visitor lead creation sends nothing. |
| 9 | `src/lib/lead-email.ts` | Builds notification, assignment and "view form" HTML. No queries. | No. |
| 10 | `src/lib/lead-forms.ts` | Names which form a lead came from (`details.form`). No queries. | No. |
| 11 | `src/lib/tracking.ts` | `readAttribution()` reads `rti_attr` for #1 and #2. | No. |
| 12 | `src/components/client/admin/Leads.tsx`, `LeadWorkflow.tsx`, `LeadLocation.tsx` | Admin screens; consume `/api/admin/leads`. Client side filters, counts and CSV. | Fed by #3, so the server fix covers them. Add the new Visitor history panel here. |
| 13 | `src/components/client/admin/AdminApp.tsx` | Shows `counts.leads` badge (from #5). | Fed by #5. |
| 14 | `scripts/db-seed.mjs` | `INSERT INTO leads` and `DELETE FROM leads WHERE notes = TAG` (dev sample data). | No. |
| 15 | `scripts/sample-call-click.sql` | Local only sample tap to call row. | No. |

Not lead queries but adjacent and raw IP bearing: `src/app/api/subscribe/route.ts` writes `subscribers.consent_ip`.

There is no export, report, sitemap or dashboard tile that counts leads other than the nav badge in #5 and the admin list. There is no scheduled lead report today.

### 4. Every lead form and its submit handler

All lead producing forms post to **one handler**, `POST /api/leads/` (`src/app/api/leads/route.ts`). It accepts JSON (script) and urlencoded/multipart (no script fallback, via `src/lib/form-post.ts`), with honeypot (`website` field), an in memory per IP throttle (5 per 10 min), and sets `details.form` to `contact | quote | pickup`.

| Form | Component | Where it appears | Handler |
|---|---|---|---|
| Contact Us | `src/components/client/ContactForm.tsx` (`variant='contact'`) via `sections/ContactSection.tsx` | `/contact-us/` (`src/app/contact-us/page.tsx`) | `/api/leads/` |
| Get a Quote | `ContactForm` `variant='quote'` | `/quote/` | `/api/leads/` |
| Schedule a Pickup | `ContactForm` `variant='pickup'` | `/request-a-pickup/` | `/api/leads/` |
| ITAD pickup form | `src/components/client/PickupForm.tsx` (sends `type: 'quote'`, `form: 'pickup'`) | `/it-asset-disposition/` via `sections/itad/ItadSections.tsx` | `/api/leads/` |

After success, both components call `trackLead()` (`src/components/client/track.ts`) which pushes `generate_lead`, `lead_form_submit` (with hashed user_data) and `form_submit` to the dataLayer.

**Not lead forms, and different handlers:**
- Tap to call: delegated click listener in the inline tracking bootstrap (`trackingBootstrap` in `src/lib/tracking.ts`) -> `POST /api/call-click/` -> creates a `leads` row (type 'callback', channel 'phone', no name). Counts as a lead today.
- Newsletter: `NewsletterForm.tsx` (footer) and `BlogNewsletterForm.tsx` (blog) -> `POST /api/subscribe/` -> `subscribers` table, not `leads`. Separate on purpose (consent).
- `ConnectForm.tsx` (`/services/` enquiry band, homepage "Don't See Your Item?") only navigates to the contact form with the address prefilled; nothing is posted.
- `LocationFinder`, `DropoffFinder`, `ResidentialHelp`, `LocationSearch`, `SearchBox` call `/api/locate/`, `/api/zip/`, `/api/address/`: lookups, no leads.
- Admin "Add enquiry" (`LeadDialog` in `Leads.tsx`) -> `POST /api/admin/leads/` (phone, email or walk in enquiries typed by staff).
- **There is no kit checkout.** `/electronics-recycling-kit/` is a content page with no form or cart (grep for checkout/cart/stripe finds nothing). The brief's "kit checkout" form does not exist in this codebase.

So the "forms do not share one handler" blocker from brief section 13 does **not** trigger for the four real forms. Visitor lead conversion belongs in `/api/leads` only, with an explicit decision on call-click (Part 2).

### 5. Cookie consent and GA4 gating today, and what the new banner provides

**Before the new banner** (as the code stood before 27 Oct):
- No consent banner, no consent state, no Global Privacy Control handling, no Consent Mode anywhere (grep finds none).
- `src/app/layout.tsx` emits one inline `<script>` in `<head>` from `trackingBootstrap(rt)` (`src/lib/tracking.ts`), on every public page. On a production build of the live site (`NODE_ENV=production`, `DEPLOY_ENV=production`, not noindex) it loads **GTM-WXH55D9** unconditionally after DOM parse, and gtag.js with the direct GA4 id `G-13FJ6FH9J8` and the Google Ads tag `AW-11155126235`, plus Google Ads call number swapping. Pages can opt out through `<meta name="rti:tracking" content="off">` (per post `tracking_disabled`). A previewing editor gets no GTM (`isPreview()`).
- The same bootstrap writes the first party cookie **`rti_attr`** on every page load with no consent check: JSON of the 15 `ATTRIBUTION_KEYS` (utm_*, gclid, gbraid, wbraid, fbclid, msclkid, campaign_id, adgroup_id, keyword, matchtype, device) plus `landing_page`, `referrer`, `captured_at`; 90 days, `path=/`, `SameSite=Lax`, `Secure` on https, **not HttpOnly**. Rule: any campaign parameter on the URL **replaces** the cookie (latest click wins); with none, only the first visit writes (landing page and outside referrer). It also exposes `window.__rtiAttr`, `window.__rtiTracking`, `window.__rtiPageView`.
- `/api/leads` and `/api/call-click` read `rti_attr` from the request `Cookie` header (`readAttribution`), write `lead_attribution`, and the 22 Oct email "SOURCE" block (live on dev and production) is built from it.
- `PageViewTracker.tsx` (client) repeats the dataLayer `page_view_custom` on route changes via `window.__rtiPageView`.
- `TawkChat.tsx` loads Tawk.to (third party chat, sets its own cookies) after load, unconditionally, on all non admin pages.
- Tap to call and CTA click listeners push to the dataLayer and beacon to `/api/call-click/` regardless of any consent.

**Added on 27 Oct in the cookie consent change (same commit as this file):** first party banner with Necessary (always on) and Analytics (off until accepted). `window.rtiConsent = { necessary: true, analytics: boolean, decided: boolean, gpc: boolean }`, `rti:consent` CustomEvent on `window` on change, `navigator.globalPrivacyControl === true` counts as declined, choice stored in cookie `rti_consent`, GTM/gtag/GA4 only load after Analytics is accepted, and `rti_attr` is written only after Analytics consent (held in `sessionStorage` before that).

So consent state **is** readable in JS (`window.rtiConsent` and the event). Brief section 13 blocker "banner does not expose consent state in JS" is satisfied once the banner lands. The M0 check "consent state API confirmed" should be done against the banner PR.

**Things the banner work leaves open (flag to whoever builds it):**
- **Tawk chat** is third party and sets cookies; it is not covered by the description above. Either gate it behind Analytics or list it as Necessary (needs a decision).
- **`/api/call-click`** stores a lead row, the raw IP and the attribution cookie with no consent check. Decide whether it is gated (loses the tap to call lead records Asim asked for on 27 Sep) or classed as a service function.
- **Withdrawal:** when a visitor later declines, the banner deletes `rti_attr` and the Google, Microsoft Ads and Clarity cookies (`_ga`, `_gid`, `_gcl_*`, `_uet*`, `_fbp`, `_clck`, `_clsk`, `MUID`) and reloads the page if tags were already running. `rti_vid` does not exist yet: the M1 tracker must add it to that delete list and stop on the `rti:consent` event.
- **Lead attribution loss:** with `rti_attr` only written after consent, form leads from visitors who never accept Analytics will have no `lead_attribution` row and the 22 Oct email SOURCE block will say "Direct / unknown". That is a visible change to what Usman asked for. It is a consequence of the new banner, not of this module, but Aaqib should know.
- **Two first touch holders:** the banner holds first touch values in `sessionStorage` for `rti_attr`; the brief's new tracker also wants to hold them in `sessionStorage`. They should share one held record and one parser so `rti_attr` and `visitors.first_touch` cannot disagree.

### 6. Middleware (proxy) and how the client IP is read today

**Middleware.** `src/proxy.ts` (Next 16 name for middleware, runs on Node). It only handles case only redirects (`/benefits-of-recycling-E-waste/`), and the `config.matcher` is a **single literal path**. `scripts/build-redirects.mjs` (l.132 to 135) fails the build if a source from `data/case-redirects.json` is missing from the matcher text, but extra matcher entries are allowed. It sets no cookies and reads no headers. CLAUDE.md says "we do not currently need either".

The brief's "Middleware only reads these cookies and the client IP header" does not fit: widening the matcher to all pages would route every prerendered page request through a Node function. Recommendation: put no logic in `proxy.ts`. `/api/e` reads the cookie and IP header itself.

**How the client IP is read today.** The same line is copy pasted in four route handlers:
`req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null`
- `src/app/api/leads/route.ts:213` (throttle and stored in `leads.ip`)
- `src/app/api/call-click/route.ts:45` (dedupe and stored in `leads.ip`)
- `src/app/api/subscribe/route.ts:81` (throttle and `subscribers.consent_ip`)
- `src/app/api/locate/route.ts:119` and `src/app/api/address/route.ts:66` (throttle only)

The leftmost value of `X-Forwarded-For` is whatever the client sent unless the first proxy overwrites it, so with two proxies (admin team nginx, then possibly an nginx on the app VM; `formDone()` and `pages/preview/route.ts` comments say "behind nginx `req.url` is 127.0.0.1") the leftmost value can be spoofed, or be the AWS box. `src/lib/geoip.ts` has `normaliseIp()` (strips `::ffff:` and CIDR) and `isPrivateIp()` that can be reused.

`lead-location.ts` reads the stored `leads.ip` (not a header) and looks it up in the DB-IP file. Raw IP is not logged by any route (no `console.*` prints it).

### 7. Mail provider module

`src/lib/mail.ts`: **nodemailer over plain SMTP** (not Mailtrap, not an HTTP API). Comment says it uses mailboxes on 99technologies.com with an app password. Env: `SMTP_HOST`, `SMTP_PORT` (587 default, 465 implicit TLS), `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` (falls back to `SMTP_USER`), `CUSTOMER_MAIL_FROM`.
- `sendMail({to, cc?, subject, text, html?, from?, replyTo?})` returns `{sent, reason?}` and **never throws**; no attachments support (fine, the brief forbids them). `mailConfigured()` checks host+user+pass.
- Routing env: `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_CC`, plus `_COMMERCIAL`, `_RESIDENTIAL`, `_QUOTE`, `_PICKUP`, `_CONTACT` variants, all read by `notifyRecipients()` and `notifyAddress()`.
- It is a single mailbox on a shared SMTP account, so provider rate limits apply to the daily and weekly mails (low volume, no issue).
- The new module must send only through `sendMail` with `to: VISITOR_DIGEST_TO` and must never import `notifyRecipients`.

### 8. Cron, PM2, nginx

- **Cron / scheduled jobs: none exist.** No `node-cron` or similar dependency, no `src/instrumentation.ts`, no `setInterval`, no timer based job anywhere. The README has no scheduler. The only background style code is `after()` callbacks in route handlers and a 2 minute idle timer in `geoip.ts`. The brief's "Node cron on the server" does not exist and must be built (options in Part 2).
- **PM2:** the repo contains no `ecosystem.config.*`; README only says "A process manager (pm2 or systemd)". From the user's server notes: `rti-website` runs in **fork mode** on port **8201**, `rti-website-dev` on **8106**; user `dev1` has no sudo. From the 22 Oct project note: deploy is `npm run build && pm2 restart rti-website --update-env` (build happens in the live `.next` folder; a collision `ENOTEMPTY` was seen once), and `rti-website` shows **263 restarts** (cause not yet found). So any in process timer must tolerate frequent restarts and must not assume it ran at an exact moment.
- **nginx:** not reviewed yet (in `deploy/`). `next.config.ts` comments refer to `deploy/nginx/recycletechnologies.com.conf` and `deploy/PRODUCTION-SAME-VM.md`, so an app VM nginx exists in front of Next (and says it must not add HSTS/X-Frame headers), and an admin team nginx on a separate AWS box `44.223.230.68` fronts the domains. The real client IP header cannot be derived from the repo.
- No CI or build config inspected (`.github/` not reviewed yet). README says CI runs typecheck, redirect generation, production build and `check-static`.

---

## Part 2. M0 plan, mapped to the brief

M0 scope in brief section 11: repo inventory (this report), local run, proxy header and CDN confirmed, cron process model confirmed, consent state API confirmed, env names in `.env.example`, migrations scaffolded, `lookupIp` wrapper plus CLI test script. Acceptance: a test lookup returns the organisation for a known business IP; a fresh dev visit shows the real IP in "middleware logs" (masked).

**Rules from the repo to follow:** CLAUDE.md rule 7 (`'use client'` only in `src/components/client/`), rule 10 (no new dependency without justification), rule 3 (build URLs with `path()` from `src/lib/urls.ts`, so the endpoint is `/api/e/` with a trailing slash; see the trailing slash note in Part 3), PR description must state client JS added and its reason.

### M0 deliverables and the files to add or change

1. **Brief in repo.** `docs/visitor-identification/BRIEF.md` (copy of the brief). README placeholder later at `docs/visitor-identification/README.md` (needed at the end).
2. **Env names.** Create or append `.env.example` (it exists in the repo; add the new names to it) with placeholders only:
   `IPAPI_KEY=`, `IP_HASH_SALT=`, `MAXMIND_LICENSE_KEY=` (see decision 5), `VISITOR_DIGEST_TO=aaqib@99technologies.com`, `VISITOR_EXCLUDED_IPS=`, `VISITOR_ADMIN_ROLES=administrator`, `CLIENT_IP_HEADER=x-forwarded-for`.
   Proposed extra names (need Aaqib's yes): `VISITOR_JOBS=off` (turn the scheduler on per pm2 app), `VISITOR_ADMIN_EMAILS=` (dark launch allowlist), `VISITOR_DEBUG_IP=off` (M0 header probe). Existing names stay as they are (`GEOIP_DB`, `SMTP_*`, `DATABASE_URL`).
3. **Migrations scaffolded (reversible).**
   - `db/017_visitor_identification.sql` (forward, wrapped in `BEGIN; ... COMMIT;`): tables `visitors`, `visits`, `page_views`, `ip_lookups`, `companies`; `leads` columns `lead_type text NOT NULL DEFAULT 'form' CHECK (lead_type IN ('form','visitor'))`, `visitor_id uuid`, `is_business_ip boolean NOT NULL DEFAULT false`, `converted_lead_id bigint`; the indexes from section 5; the circular FK added last. Existing rows are backfilled to `'form'` by the column default (metadata only on PG 11+, no rewrite).
   - `db/down/017_visitor_identification.down.sql` (reverse order, drop FKs, columns, tables). **Kept in `db/down/` so the existing runner's `/^\d+.*\.sql$/` ignores it.**
   - `scripts/db-down.mjs` and `"db:down": "node scripts/db-down.mjs"` in `package.json`: applies a named down file via psql and deletes the `schema_migrations` row. Reuses the psql helpers (the helpers in `db-setup.mjs` are top level code, not exported, so the cleanest option is to copy the small `psql` finder and runner, or add a `--down <name>` branch to `db-setup.mjs`). Only ever pointed at the local dev database.
   - Not applied anywhere in M0 except local dev, as the brief says. Aaqib applies it to dev and live with the same one line commands he uses today.
4. **`lookupIp` wrapper plus CLI test.**
   - `src/lib/visitor/lookup-ip.ts` exporting `lookupIp(ip): Promise<IpLookupResult>`, `fetch` only (Node 22 global, so no new HTTP client dependency), reads `IPAPI_KEY`, maps ipapi.is response fields to the brief's result (org_name, org_domain, org_type, city, region, is_vpn, is_hosting, plus proxy/tor/datacenter flags). **Must not `import 'server-only'` and must not use the `@/` alias**, so the CLI and tests can import it (verified: `server-only` throws when required from plain node).
   - `src/lib/visitor/types.ts` for `IpLookupResult`.
   - `src/lib/visitor/ip.ts`: pure helpers `maskIp()` (`203.0.x.x`), `hashIp(ip, salt)` (SHA-256), `isExcluded(ip, cidrs)`, `normaliseIp` reuse. Also pure, no server-only.
   - Name clash to handle: `src/lib/geoip.ts` already exports a synchronous `lookupIp(raw): IpPlace | null` (DB-IP file). Two functions with the same name in the same area will confuse. Keep the brief's name in `src/lib/visitor/lookup-ip.ts` and import the geoip one as `geoipPlace` where needed, or rename the new file's export and note it.
   - `scripts/ip-lookup-test.mjs` and `"visitor:lookup": "node scripts/ip-lookup-test.mjs"`: takes an IP argument, loads `.env.local` the way `check-static.mjs` does (read only parsing, never printed), calls `lookupIp` (via Node's TypeScript stripping, which works in Node 22.22; verified with a probe), prints masked IP and the organisation. Acceptance check: run against a known business IP.
5. **Proxy header confirmation (the "middleware logs" check).**
   - Do not widen `src/proxy.ts`. Add `src/app/api/e/route.ts` as an M0 stub (204 for POST, nothing stored) and a debug branch enabled only when `VISITOR_DEBUG_IP=on` (never in a production env): logs which of `x-forwarded-for`, `x-real-ip`, `forwarded`, `cf-connecting-ip`, `x-forwarded-proto`, and any country header are present, each masked, and what `CLIENT_IP_HEADER` resolves to. Aaqib opens the dev site once; the log line answers the question. Remove the debug branch (or leave off by default) in M1 when the real handler arrives.
   - `src/lib/visitor/client-ip.ts`: `clientIp(req)` reading `process.env.CLIENT_IP_HEADER` (default `x-forwarded-for`; for XFF take the entry the confirmed proxy appends, not blindly the leftmost).
   - Questions for the admin team are listed in Part 3, item 3.
6. **Cron process model.** Decision needed (Part 3, item 6). M0 only confirms the model and adds `VISITOR_JOBS`; the job runner itself lands in M2. Likely file: `src/instrumentation.ts` plus `src/lib/visitor/jobs/*.ts`.
7. **Consent state confirmed.** Verify against the banner PR that `window.rtiConsent` and the `rti:consent` event behave as described, including GPC and withdrawal clearing `rti_vid`/`rti_attr`. No code of ours in M0.
8. **Test runner decision.** No test framework exists (no vitest/jest, no `test` script; lint is `oxlint` only, README still says ESLint; no prettier or format config). The brief requires tests. Zero dependency option: `node --test` with Node's built in TypeScript stripping (verified working on Node 22.22) on pure modules under `src/lib/visitor/` using relative `./x.ts` imports. Needs `"allowImportingTsExtensions": true` in `tsconfig.json` (already `noEmit`) and a `"test": "node --test src/lib/visitor/"` script. Alternative: add `vitest` as a devDependency with a PR justification. Needs a decision before M1.
9. **Local run.** Needs local Postgres 16 + `.env.local` (`DATABASE_URL`, `ADMIN_SESSION_SECRET`), `npm run db:setup`, `npm run dev`. Aaqib's laptop is Windows (`C:\Users\99TECH\Desktop\rti-website`); `db-setup.mjs` supports Windows psql discovery.

### Later milestones: where things land (so M0 scaffolding matches)

| Brief item | Where in this codebase |
|---|---|
| Client component, sessionStorage first touch (M1) | `src/components/client/VisitorTracker.tsx`, mounted in `src/app/layout.tsx` beside `PageViewTracker`; must skip `/admin`, preview mode and pages with `rti:tracking=off`; must use `path('/api/e/')` |
| `/api/e` (M1) | `src/app/api/e/route.ts` (public route handler; not wrapped by the static layout) |
| Visitor logic (M1/M2) | pure modules `src/lib/visitor/{session,bot,classify,first-touch}.ts`; DB parts in `src/lib/visitor/store.ts` (server-only) |
| Enrichment, classify, noise list, EU/UK (M2) | `src/lib/visitor/jobs/enrich.ts`; EU/UK check via existing `src/lib/geoip.ts` country codes |
| Lead conversion on submit (M2) | one hook in `src/app/api/leads/route.ts` after the INSERT, reading `rti_vid` from the `Cookie` header the way `readAttribution` reads `rti_attr`; try/catch, never costs the lead |
| `lead_type='form'` filters (M2) | the 6 places in Part 1, item 3 (rows 1, 3, 5, 6 and PATCH/DELETE/form in 3 and 4) |
| Admin Visitors page and Visitor leads tab (M3) | new `src/components/client/admin/Visitors.tsx`, `VisitorLeads.tsx`; new `view` entries in `AdminApp.tsx`; endpoints `src/app/api/admin/visitors/*` using `guard` and a roles helper; add the path to the `ads` regex in `admin-route.ts` if Ads managers may change status; Visitor history panel in `Leads.tsx`/`LeadFormDialog` |
| Create lead (M3) | `LeadDialog` in `Leads.tsx` has no prefill prop (state starts from fixed defaults) and `POST /api/admin/leads` has no company/domain/visitor_id fields, so both need small changes |
| Digest, weekly report, retention (M2/M3) | `src/lib/visitor/jobs/{digest,weekly,retention}.ts`, sent only with `sendMail` to `VISITOR_DIGEST_TO` |

---

## Part 3. Things in the brief that will not work as written, or need a decision

Ordered by impact.

1. **"Existing consent banner with an analytics category; GA4 runs behind it."** There was none. GA4/GTM/Ads and Tawk load unconditionally today and `rti_attr` is written before any consent. The banner is being added now, so M1 depends on it. Section 9's "same gate GA4 uses" is only true after that PR is merged. Reference `window.rtiConsent` and `rti:consent` from that PR, not from this repo.

2. **`rti_attr` already exists and the brief redefines it.** Today: written client side in the `<head>` script, 90 days, **last click wins** (any campaign parameter overwrites), not HttpOnly, 18 keys, read by `/api/leads`, `/api/call-click`, `window.__rtiAttr` and `trackLead`. Brief section 3.2 says `/api/e` "sets `rti_attr` (first touch)" and section 4 says first touch; that would change the meaning for existing lead attribution and the Google Ads reporting built on 22 Oct, and a server set HttpOnly cookie would break `window.__rtiAttr` and the client side read. Recommendation: keep `rti_attr` exactly as is (written by the bootstrap, after consent, from the banner work), have `/api/e` set **only `rti_vid`**, and keep first touch in `visitors.first_touch` copied from the tracker's held values. Also note section 5 first touch fields (landing, referrer, gclid, fbclid, msclkid, utm_*) are a subset of what `rti_attr` holds (gbraid, wbraid and the Ads ids are missing); decide whether `first_touch` should hold all of them.

3. **Client IP header behind the AWS proxy.** Repo reads leftmost `X-Forwarded-For` in five places. There are probably two nginx hops (admin team box `44.223.230.68`, then the app VM nginx). Ask the admin team:
   - Which header carries the true client IP: `X-Forwarded-For`, `X-Real-IP`, or other? Does their nginx **overwrite** the client supplied value or **append** to it? (Overwrite = leftmost is safe; append = leftmost is spoofable and the value to trust is the rightmost one added by their box.)
   - Does the app VM nginx exist, and does it use `real_ip_header`/`set_real_ip_from`, or pass the header through untouched?
   - Is a CDN or Cloudflare in front of the AWS box? (Brief section 2 asks.)
   - Does the proxy send a country header (for example from the nginx geoip module)? That would remove the need for a country database lookup.
   - Does it cache or buffer `/api/*`, pass POST bodies and `Cookie`/`Set-Cookie` unchanged, and impose request rate limits that would affect a beacon every page?
   - Which IPs are the proxy's own, so they can be excluded from `VISITOR_EXCLUDED_IPS` if the header is ever missing.
   Until answered, `CLIENT_IP_HEADER` stays unconfirmed. M0 acceptance depends on this answer.

4. **Existing raw IP storage vs "no raw IP in the database or logs".** `leads.ip` (inet) is filled from every form and tap to call, and `subscribers.consent_ip` from every newsletter sign up. The brief's definition of done cannot be met unless scoped ("new tables") or those columns are changed (drop, hash, or truncate to /24). The nginx and AWS proxy access logs also contain raw IPs and are outside the repo, so "logs never contain raw IPs" can only cover the application logs. Aaqib and Musaveer should decide the scope before the privacy paragraph is written, because the paragraph must be true.

5. **EU/UK check does not need MaxMind.** The repo already has `mmdb-lib` (the "GeoLite2 reader") and `src/lib/geoip.ts` reading the free DB-IP City Lite file, which has country codes, with `npm run geoip:update` to download it (no key, no account). `MAXMIND_LICENSE_KEY` and a GeoLite2 download step would add an account sign up, a licence agreement, a second file of about the same size and a second updater. Recommendation: use the existing DB-IP file (country code in `lookup`), keep the env name out or unused. Caveats: (a) confirm the file is installed on the production server (`geoipAvailable()`; live path is outside the repo); (b) `geoip.ts` reads the whole ~120 MB file into memory per use and drops it after 2 idle minutes, so calling it per `/api/e` request would keep 120 MB resident in each process on a VM described as short of RAM and risks the 50 ms p95. Do the EU/UK check in the 10 minute enrichment job (before the API call, as the brief requires) rather than in the request. Side effect: EU/UK visitors get a Visitor lead created at their first event and are only labelled afterwards, so the lead must not be marked Business IP until the check passes, and the digest/Visitors page must show them only as anonymous.

6. **"Node cron on the server" does not exist; the PM2 model is unconfirmed in the repo.** Options (for Aaqib and Anees to choose):
   - **A (recommended): in process scheduler** started from `src/instrumentation.ts` (nodejs runtime only; skipped during `next build`; only when `VISITOR_JOBS=on` so `rti-website-dev` does not run jobs against the wrong data), guarded by `pg_try_advisory_lock` so it is safe even if PM2 is ever switched to cluster, and driven by stored "last run" state rather than exact clock ticks, because the process restarts (263 so far) and timers reset. State can live in the existing `settings` table (key `visitor_jobs`) so no sixth table is needed. "7 am Central" must be computed with `America/Chicago` in code (DST), for example "send once per day when Chicago time is past 7:00 and today is not yet recorded".
   - B: a user crontab entry (does not need sudo, if `crontab` is allowed for `dev1`) calling an internal route with a shared secret. Needs a new secret env name and the cron daemon; clock based but needs the same last run guard.
   - C: a second PM2 process for a worker script. The repo's `scripts/` are plain `.mjs` and cannot import `server-only` modules like `mail.ts` or `@/` aliases, so this means duplicating mail and DB code.
   Also unknown: do `rti-website` and `rti-website-dev` use the **same Postgres database**? If yes, both would run the job and dev traffic would pollute production data. Confirm.

7. **Branch and PR workflow vs the team's habit.** Brief: branch `feat/visitor-identification`, never commit to main, one PR per milestone. Repo CLAUDE.md: branches are named `phase2/<area>-<short-description>`, one concern per PR, PR text must state client JS added, deps added and `npm run verify:static` output. The project notes say Aaqib currently edits on his laptop, pushes and deploys (live commit `1624cbe` on 22 Oct). Decide: use the brief's branch name (and note the mismatch with CLAUDE.md) or `phase2/visitor-identification`. Commits and pushes happen on Aaqib's laptop.

8. **"Never deploy, never migrate anywhere except local dev; Anees deploys" vs current practice.** Today Aaqib ships: push, deploy to dev, then live, with one line commands. The brief also wants the M0 acceptance ("a fresh dev visit shows the real IP") and the Nov 6 dark launch on production. Both need the dev server and production to be migrated and deployed by a human. Confirm who that is (Anees or Aaqib) and what Claude Code should hand over (one line commands, as Aaqib prefers). Migrations on dev and live are today applied with `npm run db:setup` or hand run psql.

9. **"Migrations only through the repo's existing tool, and every migration is reversible."** The tool has no down support (Part 1, item 1), and a down file in `db/` would be executed as a forward migration. Needs the `db/down/` convention and `db:down` script, or a decision to waive reversibility. Also because several old migrations are not wrapped in transactions, the new one must be.

10. **Visitor lead shape vs existing lead constraints.** `leads.status` and `leads.type` CHECKs reject the brief's Visitor statuses and a 'visitor' type (Part 1, item 3). Pick: extend the CHECKs, or add `visitor_status`. Also the admin PATCH and DELETE accept any lead id, so a Visitor lead could be edited or deleted through the form lead UI unless guarded.

11. **Volume and the existing admin list.** Thousands of Visitor leads a month versus `LIMIT 2000` newest first, client side filtering, and the same table. Visitor leads tab needs server side pagination, filters and counts. `fillMissingLocations()` would also scan them (geo IS NULL) on every admin open unless filtered.

12. **Route `/admin/visitors`.** Admin is one page with in memory view state (Part 1, item 2). Either deep link `?view=visitors` (needed for digest email links) or an extra static page. Roles: `VISITOR_ADMIN_ROLES` is role based, the dark launch ("Aaqib only") and the named people are user based. Need a user allowlist or a temporary role.

13. **`/api/e` and the trailing slash.** `next.config.ts` sets `trailingSlash: true`; a POST to `/api/e` is answered with a 308 to `/api/e/` before the handler runs, which doubles latency and may break `sendBeacon`. Every existing caller uses the slash form (`/api/leads/`, `/api/call-click/`). The endpoint is still "/api/e" in name; the tracker must call `path('/api/e/')`. Also keep the name free of "track" as the brief says. Ad blocker behaviour on "/e" should be tested.

14. **Rate limiting is in memory today.** The existing throttle is a per process Map that resets on every restart (263 so far) and says so in comments. The brief's "rate limits per visitor" and "60 page views in 10 minutes" should be counted in the database (indexed on `page_views`/`visits`), or accept the reset. Brief says responses must be under 50 ms p95; keep to a small fixed number of queries and move enrichment queueing and lead creation checks into `after()` where possible. DB pool is 4 per process.

15. **Cookies set behind a proxy.** The app sees plain HTTP from nginx. `rti_vid` should follow the explicit-flag pattern in `auth.ts` (`secureCookie()`), not infer `Secure` from `x-forwarded-proto`. Recommend `rti_vid` be **HttpOnly** and read server side from the `Cookie` header (the form handler already reads cookies from the request header), instead of exposing the id to JavaScript as the brief's step 3 implies ("posts visitor ID"). Dev and www use separate cookie jars (host only cookies; the site redirects every other host to `www`).

16. **Call to action: tap to call.** `/api/call-click` creates `leads` rows (type callback). They will backfill to `lead_type='form'`, stay in totals and appear in Enquiries, which matches "existing lead totals must not change". Decide whether a tap to call also converts the Visitor lead (brief says "any site form submitted"; a phone tap is not a form but is a stronger signal than a form for sales). Newsletter sign ups are also forms but create subscribers, not leads: decide whether they convert (recommended: no).

17. **There is no "kit checkout" form.** Brief section 13 lists "kit checkout". Besides the four forms in Part 1, item 4, the 27 Oct Google Ads landing pages add a short "Request a Quote" form (`src/components/client/LandingQuoteForm.tsx`) which also posts to `/api/leads/` (form `quote`, audience Commercial). Safe to say all lead forms share `/api/leads/`.

18. **Tests and format.** No test runner and no formatter in the repo. The brief requires tests for eight areas and "the repo's lint and format config". Lint is `oxlint` (`.oxlintrc.json`); there is no prettier. State this to Aaqib so "format config" is read as "none".

19. **Client weight and the CLAUDE.md rules.** A new client component on every page counts against CLAUDE.md rule 10 ("every kilobyte of client JavaScript on a content page has to justify itself") and the Lighthouse limit. The tracker should render nothing, load after hydration, and avoid `useSearchParams` outside a Suspense boundary (the layout is `dynamic = 'error'`, so a build failure appears if a page reads request time data). Mount it next to `PageViewTracker` inside the existing `<Suspense>`.

20. **Staff and previews must not become visitors.** The admin is excluded from GTM (`tracking: { disabled: true }`) and Tawk. The tracker needs the same exclusions (admin routes, draft preview, `rti:tracking=off` pages) and the office IP exclusion cannot be the only protection (team members on VPNs and at home are exactly what the brief says stays anonymous, so they would become Visitor leads).

21. **Privacy policy gate.** Brief: nothing goes to production, including the dark launch, before the paragraph is live. The privacy page content lives in `content/` MDX or the DB-backed page content, not seen in this review; whoever updates it must do so by the normal content process (CLAUDE.md says copy changes are a separate concern). Dates: paragraph live Nov 5, dark launch Nov 6.

22. **Dates.** Brief says "Updated Oct 26" and M0 is Oct 27 to 28; the deploy collisions (`ENOTEMPTY` during a live build) and 263 restarts are a risk for a Nov 6 production deploy. Worth resolving the restart cause before then.

---

## Part 4. Questions to settle before M1 (for Aaqib)

1. Admin team: the six header questions in Part 3, item 3 (only they can answer).
2. Cron model: A, B or C (Part 3, item 6), and whether dev and live share one Postgres database.
3. `MAXMIND_LICENSE_KEY`: use the existing DB-IP file instead (recommended)?
4. Visitor lead status: extend CHECKs or add `visitor_status`?
5. Scope of "no raw IP": new tables only, or change `leads.ip` and `subscribers.consent_ip` too? Does tap to call stay ungated?
6. Keep `rti_attr` as is (recommended) and give `/api/e` only `rti_vid`?
7. Which role each named person has, and the dark launch allowlist (roles cannot express "Aaqib only").
8. Test runner: `node --test` (no dependency) or `vitest`.
9. Branch name: `feat/visitor-identification` or CLAUDE.md's `phase2/...`; who deploys and applies migrations on dev and live.
10. Tawk chat: gate behind Analytics or classify as Necessary (belongs to the banner work).
