# Build prompt: an RTI-style admin for the MNC website

Copy everything below the line into a new Claude session that has the MNC website code open.

---

You are building the admin side of the **MNC website**. It must work like the admin we built for Recycle Technologies (RTI). That admin is called "RTI Publisher", is built into the website itself, and sits at `/admin/` behind a login.

Build every module below. Do not skip, merge or simplify any of them without asking me first.

## 0. How to work

1. **Look before you build.**
   - Read the MNC codebase first: framework, database, hosting, how pages and forms work today, and what admin (if any) already exists.
   - Write me a short inventory: what exists, what is missing, and which modules below do not apply to MNC (for example, if MNC has no location pages).
   - Wait for my go ahead before writing code.
2. **Ask me for anything you need.** Examples: the list of services, who gets which enquiry emails, office and VPN IP addresses, Google IDs, the facility addresses, and the privacy policy owner. Never guess business facts.
3. **Change nothing on the public site** except what a module below needs. URLs, titles, meta descriptions, H1s and copy stay exactly as they are.
4. **Database changes:**
   - Numbered migration files, purely additive, safe to run twice.
   - Each one has its own undo file in a separate `down` folder.
   - If dev and live share one database, say so, and give the order to run things in.
5. **Secrets:** API keys, passwords, salts and tokens live only in the server's env file.
   - Never in git, docs, chat or logs.
   - Never print an env file.
   - When I need to add a secret, give me a command that prompts for it.
6. **Feature switches:** every new tracking feature is **off by default** behind an env switch, so it can be tested on dev before live.
7. **Commands:** give every command in full, one line each, and say which window it runs in (laptop PowerShell or server ssh). Never `pkill -f`, never `pm2 restart all` or `stop all`, and never touch other apps on the server. On live, always stop, then build, then start.
8. **Test before you say it works:**
   - unit tests for every rule;
   - an end to end script that runs only against a local database;
   - screenshots of the admin screens;
   - a list of what you checked.
9. **When done, write two documents:**
   - a handover `README.md`: tables, env variables, jobs, how to change things;
   - a short plain-language summary for management.

## 1. Logins, roles and permissions

- **Login** with email and password. The session cookie is HttpOnly and Secure.
  - There is a first-run setup that creates the first administrator.
  - Passwords are hashed with scrypt or bcrypt.
- **Six roles.** Every rule is enforced on the server for every endpoint, not just by hiding buttons.
  - **Administrator:** everything, including accounts and site settings.
  - **Editor:** write, edit and publish anybody's posts; edit pages; assign enquiries.
  - **Content writer:** write and edit their own posts. Cannot publish.
  - **SEO:** every SEO field on every post, plus redirects. Cannot edit body text or publish.
  - **Sales agent:** sees only the enquiries assigned to them, changes their status, adds notes, and logs phone enquiries. Nothing else.
  - **Ads manager:** full use of Enquiries, Lead workflow, Subscribers and Google & Tracking. Can view the content screens but not change them. No People & access, no Social Links.
- **People & access** (administrators only):
  - add a person;
  - set their role;
  - reset their password;
  - deactivate them. Nobody is ever deleted, so their posts keep their author.
  - A byline with no login (an author name in the post editor) and a login are the same `users` row.

## 2. Admin layout

- **Left sidebar,** grouped:
  - **Content:** Overview, All Posts, Categories, Media, SEO, Pages, Locations.
  - **People:** Subscribers, Enquiries ("My enquiries" for agents), Lead workflow, Visitors, Visitor leads.
  - **Site:** People & access, Google & Tracking, Social Links.
  - The user's name and role are at the bottom, with Sign out.
- **Count badges** on the menu items: posts, categories, media, subscribers, new enquiries, new visitor leads.
- **Deep links** open a screen directly: `/admin/?view=visitors`, `/admin/?view=visitor-leads`, `/admin/?lead=<id>`.
- **Overview:** counts, recent posts, recent enquiries, and quick "New post" / "Add enquiry" buttons.
- **Page header** on each screen: its title and today's date.

## 3. Posts, categories and media

- **Post editor:**
  - article title (the only H1);
  - meta title and meta description, each with a live length counter;
  - slug;
  - category;
  - author / byline;
  - featured image with alt text;
  - excerpt;
  - publish date;
  - status: draft, scheduled or published.
- **Formatting bar:**
  - Dropdowns for alignment, spacing and lists. Each closes on Escape, on an outside click, and after a choice, and never opens off screen.
  - Heading 1/2/3 buttons output h2/h3/h4.
  - Bold, italic, links, images from the media library, tables and quotes.
- **Outline rail** on the left (the headings), and **search appearance** (Google preview) plus publishing on the right.
- **All Posts:** search, filter by status, category and author; bulk actions; delete only for administrators and editors.
- **Categories:** add, rename, merge, delete.
- **Media library:**
  - one component used two ways: Manage (upload, alt text, delete) and Pick (inside the editor, with upload too);
  - existing image URLs keep their paths.
- **Publishing:**
  - it refreshes only the pages that changed;
  - a scheduled post goes live by itself.

## 4. SEO desk

- **One screen for SEO work across all posts, not one post at a time.**
  - Filters: no meta description, score under 50, missing alt text, noindex, and similar.
  - Edit inline.
- **Per post:**
  - title tag with a pixel width counter;
  - meta description;
  - focus keyword;
  - robots (index / noindex, follow / nofollow);
  - canonical override;
  - schema type;
  - Open Graph title, description and image.
- **Live analysis while typing:** a score out of 100, about nine checks (title length, description length, keyword in title, H1, first paragraph, alt text, internal links and so on), and the Google preview. The same function scores on screen and when the score is saved.
- **Defaults:** site name, title template, default share image, and on/off switches for AI crawlers (GPTBot, ClaudeBot, PerplexityBot and others) in robots.txt.
- **Redirects table:**
  - add, edit and delete 301s;
  - refuse chains, loops and duplicates;
  - case-only redirects are handled separately.
- **Sitemaps:** `sitemap.xml` updates itself. Drafts and redirected URLs are never listed.

## 5. Pages editor (edit any page's text and images)

- A list of every editable page and shared block (header, footer, location directory and so on).
- **Editor:**
  - On the left, a form built automatically from the page's own data, so a new section added in code appears in the form with no extra work.
  - On the right, the real page in a frame showing the draft.
  - Layout switches, internal ids and design references are hidden from the form.
- **Draft, then Preview, then Publish:**
  - Save draft is visible only to editors.
  - Preview shows the draft on the real page.
  - Publish puts it live and keeps the previous version in History, with restore.
  - Administrators and editors only; the Ads manager can view but not change.
- **Click to edit:** clicking text or an image in the preview opens and focuses that field in the form. Text from a shared block names that block and offers a button to open it. There is an on/off switch.
- **Each page's title and meta description** are the first section of its form. Empty means "use the page's own".
- **After any copy change,** warn when an older admin edit on the same field would override the new code.

## 6. Locations (only if MNC has location or service area pages)

- **One table:** a row per site, a cell per service.
  - Click a site to edit its address, hours, services and phone.
  - Click a service to edit that page.
- **Every page starts as a draft** with a "ready to publish" checklist; the server enforces the same checklist.
- **A draft's real URL** shows a Draft banner and is noindex.
- **The public location directory** in the footer is built from this list. It throws at build time if a page is missing or listed twice.

## 7. Subscribers

- Newsletter sign ups, with the consent text, date and IP kept as proof of consent.
- Search, a status (active or unsubscribed), and CSV export.

## 8. Enquiries (form leads)

**Every lead stores:**
- name, email, phone, company, address, city, state and ZIP;
- service, type (contact, quote, download, callback) and message;
- the page it was sent from;
- the exact date and time.
- "Received" shows the exact date and time, with "3 days ago" under it in grey.

**Forms:**
- Get a Quote, Contact Us, Schedule a Pickup, and any other MNC forms.
- Client and server checks on every form.
- **Company name check:** refuse placeholders such as test, test1, NA, N/A, none, unavailable, not applicable, unknown, -, 1234, asdf, Company, self, home, or the same word repeated. Allow real names that only contain them ("Test America", "NA Manufacturing", "Home Depot"). Message: "Please enter your real company name." Write tests for it.

**Statuses:** new, contacted, qualified, won, lost, spam.

**Add enquiry:** log a phone, email, walk-in or referral enquiry.
- channel: website, phone, email, walk_in, referral or other;
- channel detail (which line they called, who referred them);
- who took it.
- Only a way to reach the person is required.

**Assigning:**
- an administrator or editor assigns an enquiry to an agent from the row;
- the agent sees only their own list;
- every assignment, status change and note is kept as the enquiry's activity log.

**Where the lead is from:**
- **Given:** the ZIP they typed (or the city and state's first ZIP), its county, the nearest facility, the straight-line miles to it, and whether it is inside the pickup radius.
- **Connection:** the city and state from the IP, using the DB-IP file on our own server.
- A map when the enquiry is opened.

**View form:** shows the enquiry exactly as the email showed it.

**SOURCE block** on every website enquiry, on screen and in the email:
- gclid, gbraid, wbraid, fbclid, msclkid;
- utm_source, medium, campaign, term and content;
- landing page, referrer, and click time.
- Show "Direct / unknown" when there is none.

**Attribution cookie:**
- On the first landing, store the click IDs, utm values, landing page, referrer and time for 90 days.
- Read it when a form is sent and save it with the lead.
- Only after consent.

**Notification email:**
- HTML laid out in sections: service, quote type, personal info, more info, source. Empty rows and sections are left out.
- The subject includes the company name.
- **Routing:** each type of enquiry goes to the right people, with CC. Ask me for the rules.

**Auto reply** to the person who wrote: at most once a day per email address.

**Google:**
- `generate_lead` and `form_submit` events with no personal data.
- `lead_form_submit` carries `user_data` (email lower-cased, phone in E.164) for Google Ads enhanced conversions.

**Tap to call:** tapping a phone number saves a "phone" enquiry with no name, holding the number tapped, the page, the time, location, device and attribution. Whoever answers the call matches it by time and fills in the details.

**Enquiries list:**
- search, filters (status, type, channel, agent, date);
- exact times;
- the Visitor history panel (section 13);
- CSV export.

## 9. Lead workflow (management view)

- One card per agent showing how many enquiries they hold, split by status, plus the unassigned pile.
- Below the cards, every open enquiry with an Assigned dropdown on the row, and tick boxes to hand several to one agent at once.
- Won, lost and spam are hidden by default; the status filter brings them back.

## 10. Google & Tracking, and Social Links

- **Google & Tracking** (administrators, SEO and Ads manager): GTM ID, GA4 ID, Google Ads ID with its conversion labels, and the Google Maps key. Saved in the database and used site-wide. All SEO settings stay on the SEO desk.
- **Social Links:** the header and footer icons (LinkedIn, Facebook, Instagram, X, YouTube and so on). Everyone can view; administrators save.

## 11. Cookie consent banner

- **Buttons:** Accept all, Reject non-essential, Customize (Analytics and Marketing on or off), and a link to the cookie policy.
- **Remember the choice** in a consent cookie: version, analytics yes/no, time. Treat Global Privacy Control (Sec-GPC) as a no.
- **Google Consent Mode.** GTM, GA4, Ads, the attribution cookie and visitor tracking do not run before consent. Check that chat widgets also wait.
- **A way to change the choice later,** from a footer link.
- **When visitor identification is on,** the banner says that organisation lookup happens.

## 12. Visitor identification

Build this exactly as specified. It is the most important module.

**What it is:** every visitor who accepts Analytics cookies becomes a **Visitor lead**, kept separate from Enquiries. If they visit from a company, school, government or bank network, we look up the organisation's name and mark the lead **Business IP**. We record:
- which pages they read, in order, with the time on each;
- how they found us;
- where they are;
- how often they come back.

If they later send a form, the enquiry shows everything they did before it.

### 12.1 Capture

**Consent first:** nothing is sent and no cookie is set until Accept. Declining or GPC means nothing at all. Withdrawing consent deletes the visitor cookie.

**Visitor ID:**
- a random UUID cookie (`mnc_vid`): HttpOnly, SameSite Lax, 13 months;
- set by the server only, after consent.

**Endpoint:** `POST /api/e/`, a neutral name because ad blockers block "track". It accepts:
- `{t:'pv', path, title, ref, qs:{click ids, utm}, attr:{first touch}, sec}` for a page view, where `sec` is the seconds on the previous page;
- `{t:'leave', sec}` when the tab is hidden or closed (sendBeacon);
- `{t:'forget'}` when consent is withdrawn.

**Checks, in order** (answer 204 and store nothing when one fails):
1. the switch is on;
2. the Origin header is our own site;
3. consent is given and there is no GPC;
4. it is not a bot (user agent list);
5. it is not too fast (a per-process limit per IP);
6. it is not a flood (more than 60 page views in 10 minutes per visitor).

Never record `/admin` or `/api` paths.

**Store after the response** (do not make the page wait). Each visitor's events are handled one at a time:
- a database advisory lock on the visitor ID;
- a per-visitor promise chain in the process.

This stops two quick pages from creating two visits.

**Sessions:**
- 30 minutes idle starts a new visit;
- each visit keeps its entry page, exit page, page count, device (desktop, mobile or tablet), and its own source and attribution.

**First touch:** the landing page, referrer and campaign values of the very first event are kept on the visitor. If consent is given on page 2, page 1's attribution is still used: hold it in sessionStorage until consent.

### 12.2 The IP address

- Read it from `X-Forwarded-For` (leftmost), with the header name configurable. Add a debug switch that logs the IP headers, **masked**, once per request, to confirm the proxy setup. Turn it off after checking.
- **The raw IP is never stored, in any table or log.**
  - Keep only a salted SHA-256 hash; the salt lives in env.
  - The raw IP is held in memory only until its lookup is done.
- **Location at capture:** read the city, state and country from the free **DB-IP City Lite** file on our own server, and store them on the visit. Nothing is sent anywhere. Add a script to download or update the file.
- **Organisation lookup:**
  - **ipapi.is** (POST with the key). Free for 1,000 lookups a day; $20 a month for 20,000 a day.
  - Keep the provider in one file, so it can be switched by rewriting just that file.
  - Look up each IP once per 30 days, cached by its hash.
- **Never look up:**
  - EU, UK, EEA or Swiss visitors (checked with the DB-IP file);
  - private or local addresses;
  - our own office and VPN ranges (`VISITOR_EXCLUDED_IPS`, CIDR list).
- **Classify each result:**
  - **business** (kept as a company): types business, education, government, banking;
  - **anonymous:** ISP, mobile, hosting, VPN, proxy, Tor, datacenter;
  - **noise:** "businesses" to ignore, such as the Apple relay, Cloudflare, Google, Microsoft, Amazon and other CDNs;
  - **excluded:** our offices;
  - **eu:** EU, UK, EEA or Swiss;
  - **private:** private or local addresses;
  - **failed:** the provider did not answer; retry after a day.
- **Daily cap:** at 800 lookups in a day, send one warning email. At 1,000, stop lookups until the next day.

### 12.3 Tables (one additive migration, plus a down file)

- **`companies`:**
  - key (domain, or `org:<name>`), unique;
  - name, domain, type, city, region;
  - first seen, last seen, visit count;
  - status: new, reviewed, lead created, ignore;
  - notes.
- **`ip_lookups`:**
  - IP hash (unique) and classification;
  - organisation name, domain and type;
  - city, region and country code;
  - VPN and hosting flags;
  - company id;
  - looked up at.
- **`visitors`:** id (the cookie UUID), first seen, last seen, visit count, company id, lead id, first touch (JSON).
- **`visits`:**
  - visitor id, started at, ended at;
  - IP hash (cleared after 90 days) and lookup id;
  - device, entry path, exit path, page count;
  - source kind and attribution (JSON);
  - city, region and country code.
- **`page_views`:** visit id, path, title, viewed at, seconds on page.
- **New columns on the leads table:**
  - `lead_type` ('form' or 'visitor'; default 'form', so every existing lead stays a form lead);
  - `visitor_id`;
  - `is_business_ip`;
  - `converted_lead_id`;
  - `visitor_status`: new, reviewed, converted, ignore. Its own column, so the enquiry statuses are untouched.
- A unique index allows one Visitor lead per visitor.
- **Every existing query** that lists, counts, edits, routes or emails enquiries must filter `lead_type = 'form'`: the list, the badge, edit and delete, View form, location backfill, auto reply count and routing. Visitor leads never reach the enquiry emails or counts.

### 12.4 Visitor leads, conversion and companies

- **One Visitor lead per browser**, created on its first stored event and named "Anonymous visitor xxxx".
- **When the lookup finds an organisation,** the lead is renamed to the company and marked **Business IP**, and the visitor is linked to the company.
- **When the same browser sends a form,** the enquiry remembers the visitor (`visitor_id`), and the Visitor lead turns **Converted** with a link to the enquiry. There is never a duplicate.
- Tap to call and newsletter sign ups do not convert a Visitor lead.

### 12.5 How they found us

Every visit and every visitor gets one of these kinds and labels:
- **Ad:**
  - gclid, gbraid or wbraid: "Google Ads";
  - msclkid: "Microsoft Ads";
  - a paid utm_medium (cpc, ppc, paid, paid_social, display, cpm and so on): "<Source> Ads", for example "LinkedIn Ads".
- **Organic:** a search engine referrer, "Organic: Google", Bing, DuckDuckGo, Yahoo and so on.
- **Social:** LinkedIn (linkedin.com, lnkd.in, or utm_source linkedin), Facebook (including fbclid without a paid medium), Instagram, X, YouTube, Reddit, TikTok.
- **Email:** utm_medium email or newsletter, or a webmail referrer.
- **Referral:** any other website, shown by domain. ChatGPT, Perplexity, Claude, Gemini and Copilot are shown by name.
- **Direct:** nothing says where they came from.

Write unit tests for every case.

### 12.6 Hot lead flag

A Visitor lead or company is **Hot** when the visitor:
- viewed the quote page;
- viewed a pickup or contact page;
- viewed any **service page** (the service hubs and their state and city versions; not location pages);
- or **came back** (2 or more visits; keep the number as one setting).

Show the reasons next to the flag, for example "Viewed the quote page · Came back (3 visits)". Do not flag a lead once they have sent a form. Write unit tests.

### 12.7 Admin screens

Visible to administrators by default. The roles and extra emails that can see them are set in env.

**Visitor leads:**
- **Columns:**
  - Visitor: name, Business IP badge, organisation type badge, domain;
  - Location (city, state; the country if not US);
  - How they found us, with the landing page;
  - Visits and pages;
  - Last seen;
  - Hot lead, with its reasons;
  - Status;
  - a **Journey** button.
- **Filters:**
  - Business IP / Anonymous / **All**. Default to **All**, so nobody thinks it is empty.
  - Organisation type, status, how they found us, Hot leads only, a date range and a search.
- Lead count, paging on the server, and CSV export.
- **Journey** opens every visit, oldest first. Each visit shows:
  - "Visit 2 of 3", the date and time;
  - how that visit started, where from, the device, and its pages and total time;
  - its pages **in order**, each with the time viewed and the **time on page** ("2m 05s"), or "not measured" when they left before it could be measured.
- **Location shown:** the ipapi.is city if there is one, otherwise the DB-IP city saved on the visit, otherwise the company's city.

**Visitors (companies):**
- **Columns:** company, location, last seen, visits, pages (opens the most viewed pages), how they found us, Hot lead (or "Enquired"), status, Details, and **Create lead**.
- **Filters:** type, status, source, Hot only, dates, search. CSV export.
- **Details:**
  - domain, location, first and last seen;
  - visits and browsers;
  - status and notes;
  - the company's leads;
  - every visit (newest first) with its journey.
- **Create lead** opens a new enquiry prefilled with the company and linked to the visitor.

**Visitor history panel** on each enquiry that came from a tracked browser:
- the company, or "Not identified (home, mobile or VPN connection)";
- visits, first and last seen;
- first found us, with the landing page and campaign;
- the journey up to the moment the form was sent.

Agents see it only for their own enquiries.

**Note at the top of each screen:** Business IP is a sales signal, not proof of who visited. Home, mobile and VPN visits stay anonymous, and a shared network can name the wrong company.

### 12.8 Emails and jobs

- **Daily digest at 7 am Central** (handle daylight saving) to the `VISITOR_DIGEST_TO` list.
  - "N new companies yesterday", with a table: company, type, location, pages, how they found us, Hot and why.
  - A list of companies that viewed pickup, quote or contact without sending a form.
  - The anonymous lead count.
  - Links to the screens and to a CSV of yesterday's Visitor leads.
  - Skipped on days with no new companies.
- **Weekly report on Monday:**
  - new companies;
  - Business IP and anonymous lead counts;
  - Visitor leads converted to enquiries;
  - top 10 companies by visits;
  - the intent list;
  - the days with no digest.
- **Sweep every 10 minutes:** link visits to lookups, bring Visitor leads up to date, refresh company counts.
- **Retention, monthly:**
  - delete lookups and clear IP hashes after 90 days;
  - delete visits and page views after 13 months;
  - delete Visitor leads unseen for 13 months, unless they are Business IP or converted.
- **The job timer runs inside the app,** once a minute, where `VISITOR_JOBS=on`, in one app only. A database lock makes sure only one process works. The last run of each job is kept in the database, so a restart neither repeats nor skips one.
- An administrator can run sweep, digest or weekly by hand.

### 12.9 Env switches and settings

- `VISITOR_CAPTURE=on`: the tracker, the endpoint, the privacy paragraph and the banner wording.
- `VISITOR_JOBS=on`: one app only.
- `IPAPI_KEY`.
- `IP_HASH_SALT`: 32+ random characters, the same on dev and live.
- `VISITOR_EXCLUDED_IPS`.
- `VISITOR_DIGEST_TO`.
- `VISITOR_ADMIN_ROLES` and `VISITOR_ADMIN_EMAILS`.
- `CLIENT_IP_HEADER`.
- `VISITOR_DEBUG_IP`.
- `GEOIP_DB`: the path to the DB-IP file.

Also: a `visitor:lookup <ip>` script that tests one lookup with the real key and prints the decision with the IP masked.

### 12.10 Privacy

- **A privacy policy paragraph**, "Identifying the Organization You Visit From". It appears only when capture is on. Its wording needs management approval.
- **Covered by the paragraph:**
  - consent first;
  - organisation level only;
  - the raw IP is never stored;
  - EU/UK visitors are not looked up;
  - retention periods;
  - how to withdraw consent.

## 13. Tests to deliver

- **Unit tests:**
  - the consent gate and GPC;
  - the visitor ID format;
  - first touch held until consent;
  - every source rule;
  - the Hot rules;
  - the service page list;
  - the bot list;
  - IP classification (10 business and 10 ISP/VPN examples);
  - the EU/UK list;
  - masking and hashing;
  - office exclusion;
  - the Chicago-time schedule across daylight saving;
  - the company name check.
- **End to end** (local database only; it refuses anything else), covering:
  - consent, GPC, origin and bots;
  - five pages making one visit;
  - the 30 minute split;
  - seconds on page;
  - Visitor lead creation;
  - Business IP marking;
  - office exclusion;
  - no raw IP anywhere;
  - form conversion with no duplicate;
  - the company name check;
  - Enquiries and the badge unchanged;
  - roles (an agent cannot open Visitors);
  - CSV;
  - withdrawal;
  - the flood limit;
  - the journey (correct page order and seconds, location, source per visit, Hot reasons).
- **Screenshots** of every admin screen with test data.

## 14. Before you start, ask me for

1. **Access and data:** access to the MNC repo and server, the hosting setup, and whether dev and live share a database.
2. **Services:** the MNC service list (for the Hot rule and the forms), and the quote, pickup and contact page URLs.
3. **Emails:** who gets each kind of enquiry email (with CC), the digest recipients, and the sender address and SMTP details. These are set by me on the server.
4. **Network and locations:**
   - office and VPN IP ranges;
   - facility addresses for nearest-facility distance;
   - the pickup radius.
5. **Google and social:** GTM, GA4, Ads IDs and conversion labels; the social links.
6. **Approval:** who approves the privacy wording.
7. **Scope:** which modules do not apply to MNC.

Then send me the inventory from step 0 and wait for my go ahead.
