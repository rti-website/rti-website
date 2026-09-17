# recycletechnologies.com

A rebuild of **recycletechnologies.com** from WordPress (Oxygen) to Next.js 16,
with a publishing admin of its own.

Two things to read before you change anything:

- **[CLAUDE.md](./CLAUDE.md)** — the working rules. Every one of them maps to a
  specific way this migration can lose rankings. Read it first.
- **[SETUP.md](./SETUP.md)** — getting the site running.
  **[SETUP-ADMIN.md](./SETUP-ADMIN.md)** — getting the admin running.

---

## The one thing to understand first

This is a **replatform, not a restructure**. About 600 URLs already rank. The
job is to change the technology and change nothing else: at launch the URLs,
titles, meta descriptions, H1s and body copy match the live WordPress site.
Improvements are second-wave work, after rankings have settled.

If a change would alter what a page *says* or *where it lives*, it does not
belong in this phase.

---

## Getting it running

```bash
npm install
cp .env.example .env.local      # fill in DATABASE_URL and ADMIN_SESSION_SECRET
npm run db:setup                # creates the database and applies db/*.sql
npm run user:add                # creates the first login
npm run dev                     # http://localhost:3000
```

Node 22.22 or newer, PostgreSQL 16 or newer.

The public site builds **without** a database — it just has no blog posts in it.
The admin needs one.

To pull the 307 posts across from the live WordPress site:

```bash
npm run wp:import -- --dry      # says what it would do, writes nothing
npm run wp:import               # ~15 minutes, downloads images
```

---

## How the pages are built

The Figma file is a fixed **1920-wide** canvas with almost everything absolutely
positioned — the locations map is one image with hand-placed pins and connector
lines, which cannot reflow without a redesign. So pages are built at exactly
1920 and scaled proportionally on narrower viewports.

`zoom` on `.design-canvas`, not `transform: scale`, because zoom scales the
layout box too: the document height stays correct and scrolling behaves
normally.

`src/components/design/Frame.tsx` holds the primitives:

| | |
|---|---|
| `Canvas` | A page of known height. Sections are pinned at their Figma `y`. |
| `FlowCanvas` | A page whose height nobody decided — a blog post, an archive, the FAQ. Same canvas and zoom, children in normal flow. |
| `Section` / `Box` / `CenterBox` | Absolutely positioned at exact Figma coordinates. |

Every number passed to them is read off a Figma node, and each section carries
its node id in a `data-figma` attribute, so a visual diff against the design
traces straight back to a layer.

> **Anything new on `FlowCanvas` needs its own hero.** `ServiceHero` positions
> itself absolutely for the pinned canvas, so on a flow page it silently prints
> over the content below it. `ArticleTemplate`, `CategoryArchive` and the FAQ
> page each build their hero inline for this reason.

This is a faithful **desktop** build. Real responsive reflow is a separate pass
and needs mobile frames, which the Figma file does not have.

---

## What is in here

```
content/**/*.mdx        One file per hand-written page. Frontmatter carries the exact URL.
data/url-map.csv        Source of truth for URLs, titles, descriptions, H1s.
data/redirects.json     GENERATED from url-map.csv. Never hand-edit it.
db/*.sql                Numbered migrations. db:setup applies the ones not yet applied.
scripts/                Build and QA tooling. Plain node, no build step.
src/app/                Routes. Explicit folders win over the [...slug] catch-all.
src/components/blocks/  Page templates, one per content type.
src/components/client/  The ONLY place 'use client' may appear.
src/components/design/  Canvas, Section, Box — the Figma coordinate primitives.
src/components/ui/      Presentational server components.
src/data/               Per-page copy and geometry, one file per page.
src/lib/                site, urls, seo, schema, content, db, auth. No business logic elsewhere.
```

### Why routing is manifest-driven

The live site has ~600 URLs at arbitrary root-level paths — flat blog slugs like
`/how-to-get-rid-of-a-microwave/` next to deep location paths. Hand-authoring a
route folder per URL is how one quietly goes missing.

Instead each page declares its exact URL in frontmatter, and
`app/[...slug]/page.tsx` derives `generateStaticParams` from that manifest. So
"every KEEP URL has a page" is a build guarantee rather than something QA has to
catch.

---

## The admin — "RTI Publisher"

At `/admin`. Next.js route handlers, PostgreSQL, no ORM and no auth library:
`src/lib/auth.ts` is scrypt, a random session id and an HMAC, which is what this
actually needs.

| Section | |
|---|---|
| **Overview** | Counts and recent activity |
| **All Posts** | The editor — Tiptap, with a live SERP preview |
| **Categories** | Main and sub categories |
| **Media** | Uploads, with alt text |
| **SEO** | Every SEO field on every post, site-wide defaults, redirects |
| **Subscribers / Enquiries** | Newsletter and contact form |
| **People & access** | Accounts and roles |
| **Settings** | Social links |

### Roles

| Role | Can |
|---|---|
| Administrator | Everything, including accounts and settings |
| Editor | Write, edit and publish anybody's posts |
| Content writer | Write and edit their own. Cannot publish |
| SEO | Every SEO field on every post. Cannot edit the body or publish |

Permissions are enforced **on the endpoint**, not by hiding buttons.

### Imported posts are not the editor's to rewrite

A post imported from WordPress keeps its original markup in `content_html` and
has an empty editor document. Those posts carry inline-styled CTA panels,
hand-built comparison tables and JSON-LD blocks that a rich-text schema has no
node for — converting on import would have deleted them, silently, on 300 live
pages. Conversion happens the first time a human opens one and presses Convert,
where they can see the result.

---

## Commands

| | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `next typegen && tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run verify:static` | **Build guard.** noindex check, every declared URL prerendered |
| `npm run verify:overlaps` | Opens every static page and finds text printing through other text |
| `npm run verify:redirects` | Checks every redirect against a running site |
| `npm run verify:parity` | Diffs a staging crawl against the baseline |
| `npm run redirects:build` | Regenerates `data/redirects.json` from `url-map.csv` |
| `npm run db:setup` | Creates the database, applies migrations, makes the first admin |
| `npm run db:seed` | Sample content for a local database |
| `npm run user:add` | Creates or resets one login |
| `npm run wp:import` | Pulls posts, categories and media from the live WordPress site |
| `npm run check:admin` | Drives the whole admin in a real browser (~99 assertions) |

Before opening a pull request:

```bash
npm run typecheck
npm run build
npm run verify:static
```

`verify:overlaps` needs a built site being served:

```bash
npm run build && npx next start -p 3300
npm run verify:overlaps -- --port 3300
```

---

## Deploying

The site **must run as a Node process.** It cannot be dropped into an Apache or
nginx document root: there are API routes for the admin, a media handler, and
roughly 500 redirects that only exist inside the Next server. `output: 'export'`
is forbidden — see CLAUDE.md rule 1.

The server needs:

- Node 22.22+, PostgreSQL 16+
- ~2 GB free disk
- A process manager (pm2 or systemd) and nginx in front for TLS
- Basic auth in front of staging, plus `NEXT_PUBLIC_NOINDEX=true`

Environment:

```
DATABASE_URL=postgres://user:pass@host:5432/rti
ADMIN_SESSION_SECRET=<32+ random characters>
MEDIA_DIR=/srv/rti/var/uploads        # optional, defaults to ./var/uploads
MEDIA_BASE_URL=/uploads               # optional
DEPLOY_ENV=staging                    # anything but "production" on staging
NEXT_PUBLIC_NOINDEX=true              # STAGING ONLY. A production build fails if this is set.
```

### `DATABASE_URL` is needed at **build** time, not just at runtime

The 307 posts are baked into static HTML during the build. A build that cannot
reach the database produces a site with no blog on it — and it will not warn you
loudly.

### Two directories are not in git

| | |
|---|---|
| `var/uploads/` | **265 MB.** Admin uploads plus the images the import pulled off Google's CDN. Those CDN links rot and several are already dead, so this folder is **not reproducible**. Back it up, and rsync it to the server. |
| `public/wp-content/` | The legacy WordPress uploads at their original paths (rule 8). Re-creatable by re-running `wp:import` while the old site is still up. |

Hundreds of megabytes of binaries make every clone painful and every diff
useless, which is why they are ignored — but neither is optional at deploy time.

### CI

`.github/workflows/ci.yml` runs typecheck, redirect generation, a production
build and the build guard on every push and pull request. CI has no database, so
it builds the site without the imported posts; that is expected.

---

## Things that are easy to get wrong here

**`permanent: true` emits 308, not 301.** The migration plan specifies 301 and
the QA script asserts 301.

**`params` is a Promise in Next 16.** `const { slug } = await params`.

**`middleware.ts` is now `proxy.ts`** and runs on Node, not Edge.

**Turbopack cannot take MDX plugin functions** — remark/rehype plugins must be
named as strings in `next.config.ts`.

**`trailingSlash` does not apply to strings emitted by `sitemap.ts`** — which is
why every entry goes through `sitemapEntry()`.

**`.next/cache` must survive between builds** or the filesystem cache buys
nothing.

**FAQ rich results no longer exist.** Google removed them on 7 May 2026. The
markup is still emitted because it describes the page accurately, but the Rich
Results Test will not report it — that is not a QA failure.

**`100vh` inside the zoomed canvas is not one viewport.** It resolves to the
window height and is then scaled by the zoom, so it renders ~16% too tall on a
1920 display.

---

## Known gaps

- The SEO fields the admin writes are not yet read by the public page
  templates — `lib/seo.ts` still builds metadata from the older fields, so
  twitter tags, the robots extras and the per-post schema do not reach the
  rendered HTML yet.
- `/faqs/` group descriptions and a handful of per-page FAQ answers are written
  placeholders awaiting real copy. Each is listed in a `TODO_FOR_CONTENT` or
  `TODO_FOR_DESIGN` array beside the content it belongs to.
- The pager on `/blog/` is not in the Figma file.
- The ten planned blog categories and the six real WordPress ones both exist.
  Reconciling them needs 301s and is deliberate second-wave work.
- No mobile frames exist, so there is no responsive pass.
