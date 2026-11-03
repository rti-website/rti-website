# RTI Visitor Identification: Build Brief (v2)

Owner: Aaqib (marketing lead) · Updated Oct 26, 2026 · Sign off target: Tue Nov 17, 2026

Save this file in the repo as `docs/visitor-identification/BRIEF.md`. It is the spec and the source of truth.

---

## 0. Instructions for Claude Code

Read this whole file before doing anything. If the repo contradicts it, stop and tell Aaqib.

### Standing rules

- Never open, print or log `.env` files, keys, salts or credentials. If a value is needed, name the variable and Aaqib places it. Keep `.env.example` updated with names and placeholder values only.
- Work on branch `feat/visitor-identification`. Never commit to `main`, never force push. One PR per milestone (M0, M1, M2, M3).
- Never touch the production database, never deploy, never run migrations anywhere except the local dev database. Anees deploys.
- Migrations only through the repo's existing migration tool, and every migration is reversible.
- No third party tracking or analytics packages. One HTTP client and a GeoLite2 reader are allowed.
- No raw IP in the database or in any log. Mask IPs in debug output (for example `203.0.x.x`).
- TypeScript, the repo's lint and format config.
- Tests required for: consent gate, first touch held until consent, session splitting (30 minutes idle), bot filter, IP classification, Visitor lead creation, Business IP marking, Visitor lead conversion on form submit.
- Existing lead routing emails and lead totals must not change. Every query that lists, counts, routes or reports leads must filter `lead_type = 'form'`.
- At the end of each milestone: run that milestone's acceptance check (section 11), report pass or fail per item, write the PR description, and wait for Aaqib's sign off before starting the next milestone.
- Raise blockers the same day (section 13). Do not work around them silently.

### Step 1: inventory (no code yet)

Report back on:

1. Migration tool and DB access layer
2. Admin auth, roles, layout and shared components
3. Lead table schema, and every file that queries, counts, routes or emails leads
4. Every lead form and its submit handler
5. Cookie consent banner: how analytics consent and Global Privacy Control can be read in JS, and how GA4 is gated today
6. Existing middleware, and how the client IP is read
7. Mail provider module
8. Cron setup, PM2 config (cluster or fork mode), nginx config if it is in the repo

Then give an M0 plan mapped to this brief, plus anything here that will not work with this codebase. Wait for approval.

### Environment variables (names only; Aaqib sets values)

| Variable | Purpose |
| --- | --- |
| `IPAPI_KEY` | ipapi.is API key |
| `IP_HASH_SALT` | Server side salt for SHA-256 IP hashing |
| `MAXMIND_LICENSE_KEY` | GeoLite2 country database download for the EU/UK check |
| `VISITOR_DIGEST_TO` | Comma separated recipients. During build and testing: `aaqib@99technologies.com` only |
| `VISITOR_EXCLUDED_IPS` | Office IP ranges to exclude (CIDR list) |
| `VISITOR_ADMIN_ROLES` | Admin roles allowed to see the Visitors page and Visitor leads tab |
| `CLIENT_IP_HEADER` | Proxy header carrying the real client IP (confirmed by Anees in M0) |

---

## 1. The assignment

Build first party visitor identification into recycletechnologies.com so the RTI team can see which companies visit the site, which pages they read, what brought them, and link that history to leads. Every consented visitor becomes a Visitor lead in the admin, and leads from identified organisations are marked **Business IP**. Deliver it inside the existing Next.js site and admin, with no third party tracking script.

**Why:** RTI sells recycling and ITAD services to businesses. Most visitors never fill a form. Knowing that a school district, a hospital group or an ITAD company read the battery recycling and pickup pages three times this month is a sales signal the team can act on. Management asked for this in October 2026; marketing chose to build rather than buy so the data stays in our database and the same code can move into a central lead platform later.

**What the users get:**

- **Management and the RTI sales contact:** a Visitors page listing identified companies, newest first, with pages viewed, visit count, source and a Create lead button; a Visitor leads tab with Business IP leads marked; a daily 7 am Central email.
- **Sales:** when a form lead comes in, it shows that visitor's earlier sessions, pages and ad clicks.
- **Marketing:** which companies read which pages, to target content and outreach.

Expect roughly one in four B2B desktop sessions to resolve to a named organisation. Home, mobile and VPN traffic stays anonymous by design.

**People:** Aaqib owns the brief and signs off each milestone. Anees (web developer) owns repo access, server and deployment. Shujaat (SEO) validates numbers against GA4. Musaveer drafts the privacy policy paragraph.

## 2. The site and stack

recycletechnologies.com is a custom Next.js site (App Router) with its own admin, launched September 2026 after a move off WordPress. There is no CMS. This is a module inside the existing admin, not a new app.

| Item | Detail |
| --- | --- |
| Framework | Next.js (App Router, TypeScript) |
| Database | PostgreSQL, the same instance the RTI admin uses |
| Hosting | Company server behind nginx. The real client IP arrives in a proxy header (confirm which in M0). If a CDN is in front, it must pass the real IP or every visit shows the CDN's IP |
| Code | GitHub repo for the RTI site; branch plus pull requests; Anees or Aaqib deploys |
| Mail | The site's existing transactional mail provider |
| Cookies | Existing consent banner with an analytics category; GA4 runs behind it. This module follows the same consent |
| Forms | Lead forms capture name, email, phone, gclid, UTM and campaign values; the admin has a lead view with search and filters. Lead routing emails go to sales |
| Scheduled jobs | Node cron on the server. Jobs must run on exactly one process (if PM2 runs in cluster mode, use a single instance worker or a Postgres advisory lock) |

No new services to host, no vendor script on the page.

## 3. How it works end to end

1. **Land.** A visitor opens any RTI page. The client component (about 2 KB, loaded after hydration) reads the landing URL, referrer, gclid, fbclid, msclkid and UTM values and holds them in `sessionStorage`. Nothing is sent and no cookie is set yet.
2. **Consent.** When the banner reports analytics consent (on this page or a later one), the component posts the first event to `/api/e` with the held first touch values. The response sets `rti_vid` (random UUID, first party, 13 months) and `rti_attr` (first touch). Middleware only reads these cookies and the client IP header; it never sets them before consent.
3. **Page view.** On every route change the component posts visitor ID, path, title and seconds on the previous page to `/api/e`.
4. **Store.** `/api/e` validates the origin, rate limits per visitor, drops bots, writes `visits` and `page_views`, creates the Visitor lead on the visitor's first stored event, and queues the IP for enrichment if it has not been looked up in the last 30 days.
5. **Enrich.** A job every 10 minutes calls the enrichment API once per new IP and stores the organisation result in `ip_lookups`.
6. **Classify and mark.** ISP, mobile, hosting and VPN results stay anonymous. Business, education, government and banking results upsert a `companies` row, link the visitor, and mark the Visitor lead Business IP.
7. **Link to form lead.** When any site form is submitted, the handler reads `rti_vid`, stores it on the new form lead (routing unchanged), and sets the Visitor lead to Converted with a link to the form lead.
8. **Surface.** The Visitors page, the Visitor leads tab and the daily digest show the result.

**Bot filtering** happens inside step 4: known crawler user agents (Googlebot, Bingbot, AhrefsBot, SemrushBot and the usual list), data centre IPs flagged by enrichment, and any visitor above 60 page views in 10 minutes are dropped before storage.

**Endpoint name:** use `/api/e`, not `/api/track`, because ad blockers block "track" paths.

## 4. What we capture and never capture

**Capture (only after consent):**

- Visitor ID cookie `rti_vid` (random UUID, no personal data inside).
- First touch in `rti_attr`: landing URL, referrer, gclid, fbclid, msclkid, utm_source, utm_medium, utm_campaign, utm_term, utm_content.
- Page path, title, timestamp, seconds on page, device type (desktop, mobile, tablet).
- Session boundaries: 30 minutes idle closes a visit.
- Organisation level IP result: name, domain, type, city, region, VPN and hosting flags.
- On form submit only: the visitor ID stored on the form lead.

**Never capture:**

- Raw IP addresses at rest. The IP is used in memory for the lookup and stored only as a salted hash, deleted after 90 days.
- Any person level identity from browsing. No data broker matching, no name or email inference, no fingerprinting (canvas, fonts, hardware, screen).
- Keystrokes, form field contents before submit, scroll recordings, session replay.
- Anything before consent, after a decline, or with Global Privacy Control: held first touch values are discarded, no cookie, no events, no lookup, no Visitor lead.
- EU and UK visitors are logged without an IP lookup.

## 5. Data model

Five new tables plus four new columns on the existing lead table, all in the RTI Postgres database. Keep names and fields as below; a central lead platform will import them as they are.

| Table | Key fields | Purpose |
| --- | --- | --- |
| `visitors` | id (uuid, equals rti_vid), first_seen, last_seen, visit_count, company_id (nullable), lead_id (nullable, the Visitor lead), first_touch (jsonb: landing, referrer, gclid, fbclid, msclkid, utm_*) | One row per browser |
| `visits` | id, visitor_id, started_at, ended_at, ip_lookup_id, device_type, entry_path, exit_path | One row per session; 30 minutes idle closes it |
| `page_views` | id, visit_id, path, title, viewed_at, seconds_on_page | One row per page in a session |
| `ip_lookups` | id, ip_hash (unique), org_name, org_domain, org_type, city, region, is_vpn, is_hosting, looked_up_at | Cache so each IP is enriched once per 30 days; raw IP never stored |
| `companies` | id, name, domain (unique), type, city, region, first_seen, last_seen, visit_count, status (new, reviewed, lead_created, ignore) | What the Visitors page lists; status set by sales |
| `leads` (existing, new columns) | lead_type (form, visitor; default form), visitor_id (nullable, references visitors.id), is_business_ip (boolean, default false), converted_lead_id (nullable, the form lead a Visitor lead converted into) | Visitor leads and form leads share one table |

**Indexes:** visits(visitor_id), visits(started_at), page_views(visit_id), ip_lookups(ip_hash), companies(last_seen), companies(status), leads(lead_type, is_business_ip).

**Rules:**

- Migrations through the repo's existing tool, reversible; no manual schema changes on the server.
- `ip_hash` = SHA-256 of the IP plus `IP_HASH_SALT`; the salt never goes in the repo.
- Existing lead rows backfill to `lead_type = 'form'`. Every existing query that counts, lists, routes or reports leads must filter `lead_type = 'form'`.
- Retention job (monthly): delete `ip_lookups` rows older than 90 days; delete `visits` and `page_views` older than 13 months; delete Visitor leads not seen for 13 months that are neither Business IP nor converted. Companies, Business IP Visitor leads and converted leads stay.

## 6. IP enrichment

**Provider:** ipapi.is on the free key (`IPAPI_KEY`). Its response carries a company object (name, domain, type: business, isp, hosting, education, government, banking), an asn object, datacenter, VPN, proxy and Tor flags, and city and region. Free tier: 1,000 lookups a day, commercial use allowed. Paid plan: $20 a month for 20,000 a day. Prices checked 13 October 2026.

**Rules:**

- Wrap the provider in one function `lookupIp(ip): Promise<IpLookupResult>` so switching vendors later is one file.
- Cache by `ip_hash` for 30 days; never call the API for an IP already looked up in that window.
- The job runs every 10 minutes on one process, retries a failed lookup once, and logs the daily count. Past 800 a day, log a warning and email `VISITOR_DIGEST_TO` so the paid plan can be approved before the cap.
- **Classify:** business, education, government, banking → keep, upsert `companies`, mark the Visitor lead Business IP. isp, hosting, or any VPN, proxy, Tor or datacenter flag → anonymous, no company, no mark.
- **Noise to discard** even when typed business: Apple (iCloud Private Relay), Cloudflare, Google, Microsoft, Amazon ranges, and the group's own offices (`VISITOR_EXCLUDED_IPS`, including the Islamabad office and team VPNs).
- **EU and UK check** before any lookup, using a local MaxMind GeoLite2 country database, or the proxy's country header if one exists. No paid API call for geo.
- Expected volume: 15,000 to 25,000 sessions a month; with the cache, under 10,000 lookups a month.

## 7. Visitor leads

Every consented, non bot visitor gets one Visitor lead, created automatically on their first stored event. When enrichment identifies the organisation, that lead is marked **Business IP**. One lead per visitor, not per session.

| Field on the Visitor lead | Value |
| --- | --- |
| Lead type | Visitor (form leads stay Form) |
| Name | Organisation name when identified, otherwise "Anonymous visitor" plus the first 8 characters of the visitor ID |
| Business IP | Yes when org type is business, education, government or banking and not on the noise list; otherwise No |
| Org type badge | Business, Education, Government or Banking |
| Company, domain, location | From the companies row when identified |
| Source | First touch: ad (gclid, fbclid, msclkid), organic, referral with domain, direct |
| Activity | Visit count, pages viewed, last seen, intent flag (viewed Schedule a Pickup, Get a Quote or Contact without submitting) |
| Status | New, Reviewed, Converted, Ignore |

**Rules:**

- Visitor leads never trigger lead routing emails, never count in existing lead totals, and never appear in the default Leads list. They live in a **Visitor leads** tab in the leads area, filterable by Business IP, org type, intent, source, status and date.
- Default view: Business IP = Yes, newest first. Anonymous Visitor leads are one filter away.
- If a lead was created before enrichment finished, the job updates it in place (name, company, Business IP) within 10 minutes.
- When a visitor with a Visitor lead submits a form, the form lead is created and routed as today; the Visitor lead becomes Converted and links to it. No duplicate.
- Two visitors from the same company stay two Visitor leads, both linked to one company row; the Visitors page groups them by company.
- Create lead on the Visitors page opens the existing lead form prefilled with company name, domain and visitor ID, and sets the company status to Lead created.

## 8. Admin Visitors page and emails

Route `/admin/visitors` inside the existing RTI admin, using its layout, auth and components. Access limited to `VISITOR_ADMIN_ROLES`.

**Company list (default view)**

| Column | Content |
| --- | --- |
| Company | Name, domain as a link, type badge |
| Location | City, region |
| Last seen | Relative time, sortable, newest first by default |
| Visits | Count in the selected date range |
| Pages | Distinct pages; expand shows the top five paths |
| Source | First touch: ad, organic, referral with domain, direct |
| Intent | Viewed Schedule a Pickup, Get a Quote or Contact without submitting |
| Status | New, Reviewed, Lead created, Ignore |
| Action | Create lead |

Filters: date range (default last 7 days), type, status, source, intent, search by name or domain. CSV export of the filtered list. No public API.

**Company detail:** name, domain, location, first and last seen, visit count; sessions newest first, each expandable to page views with timestamps and seconds on page, device and attribution; linked Visitor leads and form leads; status control and notes.

**Lead view addition:** on the existing lead detail page, a Visitor history panel: company if identified, Business IP mark, first touch attribution, and sessions and pages before the form was submitted.

**Test recipient rule:** until Aaqib signs off M4, every email this module sends (daily digest, weekly report, lookup warnings, job failure alerts) goes only to **aaqib@99technologies.com**, read from `VISITOR_DIGEST_TO`. Switching to the production list after sign off is an env change, not a code change.

**Daily digest (7 am Central):** subject "RTI visitors: N new companies yesterday". Body: new Business IP Visitor leads with company, type, location, pages and source; intent companies; count of anonymous Visitor leads; links to the Visitors page and Visitor leads tab. Plain HTML, no attachments, existing mail provider. During testing it also links to an admin CSV export (login required) of yesterday's Visitor leads, all types. Skip the email on zero new companies and note it in the weekly report.

**Weekly report (Monday 7 am Central):** new companies last week, top 10 by visits, intent companies, Visitor leads created (Business IP and anonymous counts), Visitor leads converted to form leads.

## 9. Privacy and compliance rules

These are acceptance criteria, not options.

- Nothing is sent and no cookie is set until analytics consent in the existing banner, the same gate GA4 uses. Decline or Global Privacy Control means no cookie, no events, no lookup, no Visitor lead.
- Raw IP is used in memory for the lookup and stored only as a salted hash, deleted after 90 days.
- No person level matching. A person is known only when they submit a form. Anonymous Visitor leads hold no personal data.
- EU and UK visitors are logged without enrichment and are never marked Business IP.
- Privacy policy paragraph (Musaveer drafts, Aaqib approves): we use your IP address to identify the organisation you are visiting from, for sales follow up; you can opt out in cookie settings. **Nothing goes to production, including the dark launch, before this paragraph is live.**
- Visitors page and Visitor leads tab are role restricted; CSV export only; no endpoint exposes visitor, company or Visitor lead data outside the admin.
- Logs never contain raw IPs or cookie values.
- Secrets live in the server environment only; nothing in the repo, chat, tickets or screenshots.

## 10. Performance

- No blocking scripts; the client component loads after hydration.
- `/api/e` responds in under 50 ms at p95 (write fast, enrich later).
- No change to Core Web Vitals; Lighthouse performance within 2 points of the current build.

## 11. Delivery plan and acceptance checks

| Milestone | Dates | Scope | Acceptance check |
| --- | --- | --- | --- |
| M0 Setup | Oct 27 to 28 | Repo inventory, local run, proxy header and CDN confirmed, cron process model confirmed, consent state API confirmed, env names in `.env.example`, migrations scaffolded, `lookupIp` wrapper plus a CLI test script | A test lookup returns the organisation for a known business IP; a fresh dev visit shows the real IP in middleware logs (masked) |
| M1 Capture | Oct 29 to Nov 2 | Client component with sessionStorage first touch; `/api/e` with consent, GPC, origin check, rate limit and cookie setting; `visitors`, `visits`, `page_views`; bot filtering | No cookie before consent, cookies after; a session landing with `?gclid=test&utm_source=test` and consenting on page 2 keeps both in first_touch; five pages give one visit and five page views; crawler UA stores nothing; Lighthouse within 2 points |
| M2 Enrich, leads, link | Nov 3 to 6 | `ip_lookups`, `companies`, lead columns; enrichment job, cache, classification, noise list, GeoLite2 check; Visitor lead creation and Business IP mark; form handlers store visitor_id and convert the Visitor lead; lead view history panel; daily test email to Aaqib | A fixed list of 10 known business IPs and 10 ISP/VPN IPs classifies correctly; one office visit (exclusion off, dev only) creates a Business IP Visitor lead; same IP makes one API call in 30 days; test form converts its Visitor lead; routing emails and lead totals unchanged |
| Dark launch | Fri Nov 6 | Capture, enrichment and Visitor leads live on production (deployed by Anees); Visitors page and Visitor leads tab visible to Aaqib only | Privacy paragraph live first; rows arriving; no raw IP in DB or logs; test email reaches aaqib@99technologies.com |
| M3 Admin and emails | Nov 9 to 10 | Visitors list, filters, CSV, company detail, status, Create lead; Visitor leads tab; daily digest and weekly report; retention job | Aaqib finds last week's companies and Business IP leads; digest arrives 7 am Central to Aaqib only; Create lead opens a prefilled form |
| M4 Verify and ship | Nov 9 to 17 | Live parallel week Nov 9 to 15 against GA4; hand check 20 Business IP leads; switch recipients and roles to production | Sessions within 15 percent of GA4; 18 of 20 sampled companies correct; at least 20 percent of desktop, weekday, non bot sessions resolve; lookup cost $0 |

## 12. Definition of done

- [ ] A manager opens the Visitors page on a Monday and sees last week's identified companies with pages and sources.
- [ ] The Visitor leads tab lists every consented visitor, with Business IP leads marked and shown first.
- [ ] A test form submission shows its earlier visits on the form lead and converts its Visitor lead.
- [ ] Lead routing emails and existing lead totals are unchanged.
- [ ] The daily digest has reached aaqib@99technologies.com for five consecutive days.
- [ ] The privacy paragraph is live.
- [ ] No raw IP exists in the database or logs.
- [ ] Code is merged with `docs/visitor-identification/README.md` covering tables, jobs, env variables, how to switch provider, rotate the salt and keys, and change recipients.

Handover: a 30 minute walkthrough with Aaqib and Anees. After that, Anees maintains it.

## 13. Open decisions and blockers

**Decided:**

- Build inside the RTI repo and database now.
- ipapi.is free key; move to the $20 plan only past 800 lookups a day, with Azhar bhai's approval.
- No vendor script; first party only.
- Every consented visitor becomes a Visitor lead; identified organisations are marked Business IP.
- All module emails go only to aaqib@99technologies.com until M4 sign off.

**Aaqib settles by Oct 28:**

- [ ] Production digest recipients after sign off (proposed: Aaqib, Christine, Usman, Ijaz bhai).
- [ ] Sales owner for Create lead (proposed: Christine for commercial) and roles that see the Visitors page and Visitor leads tab (proposed: Aaqib, Shujaat, Christine, Usman).
- [ ] Office IP ranges to exclude, including the Islamabad office and team VPNs.
- [ ] Proxy header name, CDN in front or not, PM2 cluster or fork mode (from Anees).
- [ ] Privacy paragraph wording (Musaveer drafts by Oct 30, live by Nov 5).

**Raise these the same day if hit:**

- The cookie banner does not expose consent state in JavaScript.
- Lead forms do not share one handler: list every form (Get a Quote, Schedule a Pickup, Contact, kit checkout).
- An existing lead query cannot be filtered to `lead_type = 'form'` without side effects.
- Sessions differ from GA4 by more than 15 percent: bring the breakdown (bots, consent declines, Safari relay) before changing thresholds.
- Anything needing a stored raw IP or a third party script: stop and ask. The answer is no.

**Limits to state plainly to users:** office networks resolve; home, mobile and VPN traffic does not. Shared IPs (coworking, large ISPs) can show the wrong organisation, so Business IP is a signal, not proof. One person on two devices is two Visitor leads until a form ties them.
