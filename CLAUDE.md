# RTI website — working rules

recycletechnologies.com, migrating from WordPress (Oxygen) to Next.js 16 App Router.
This file is read by every AI-assisted change. Follow it exactly.

Process, phases and sign-off gates live in the team's migration plan document.
This file governs **code**.

---

## The one thing to understand first

This is a **replatform, not a restructure**. About 600 URLs already rank. The
job is to change the technology and change nothing else. At launch, URLs, titles,
meta descriptions, H1s, body copy and internal link structure are identical to
the live WordPress site. Improvements are second-wave work, after rankings have
stabilised.

If a change would alter what a page *says* or *where it lives*, it does not
belong in this phase. Say so rather than doing it.

---

## Hard rules

1. **Never set `output: 'export'` in next.config.**
   Static export disables `redirects()`, `rewrites()`, `headers()` and proxy.
   The ~500 migration redirects would disappear with no error. Pages are still
   fully prerendered without it.

2. **Never remove `export const dynamic = 'error'` from `app/layout.tsx`,
   and never enable `cacheComponents`.**
   That line makes the build fail if any page reaches for request-time data.
   It is what guarantees Googlebot and the AI crawlers get full HTML.
   `cacheComponents` deletes the option.

3. **Never construct a URL by hand.** `lib/urls.ts` is the only place.
   `path()` for internal, `absolute()` for canonical, sitemap, og:url and JSON-LD.
   Trailing-slash drift between links, canonicals and the sitemap is the most
   common way a migration doubles its footprint in Google's index.

4. **Never write a `metadata` export by hand.** Use `buildMetadata()` from
   `lib/seo.ts`. A template that ships without a canonical is exactly the silent
   regression this project must not produce.

5. **Never hand-edit `data/redirects.json`.** It is generated from
   `data/url-map.csv` by `scripts/build-redirects.mjs`. Change the map, rerun
   the script.

6. **Never change a title, meta description or H1** that came from
   `url-map.csv`. Not to improve it, not to fix a typo. Flag it for second wave.

7. **`'use client'` is allowed only in `src/components/client/`.**
   Everything else is a server component. Each client component needs a reason
   in the PR description.

8. **Legacy images stay at `/wp-content/uploads/...`.** The folder is copied into
   `public/` verbatim. Do not "tidy" these paths — image rankings recover far
   more slowly than HTML, and other sites hotlink them.

9. **Staging is protected by HTTP basic auth AND `NEXT_PUBLIC_NOINDEX=true`.**
   Production builds fail if that variable is set (`scripts/check-static.mjs`).
   Never hardcode a noindex tag.

10. **Do not add a dependency without saying why in the PR.** Every kilobyte of
    client JavaScript on a content page has to justify itself.

---

## Where things go

```
data/url-map.csv        Source of truth for URLs, titles, descriptions, H1s.
                        Produced in Phase 1. Everything downstream derives from it.
data/redirects.json     Generated. Imported by next.config.ts.
content/**/*.mdx        One file per page. Frontmatter carries the exact URL.
src/app/[...slug]/      Catch-all that builds every content/ page at its real URL.
src/app/<name>/         Explicit routes. These take precedence over the catch-all.
src/components/ui/      Presentational server components.
src/components/blocks/  Page templates, one per content type.
src/components/client/  The ONLY place 'use client' may appear.
src/lib/                site, urls, seo, schema, content. No business logic elsewhere.
scripts/                Build and QA tooling. All plain node, no build step.
```

### Why routing is manifest-driven

The live site has ~600 URLs at arbitrary root-level paths: flat blog slugs like
`/how-to-get-rid-of-a-microwave/` next to deep location paths like
`/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/`.
Hand-authoring a route folder per URL is how one quietly goes missing.

Instead each page declares its exact URL in frontmatter, and
`app/[...slug]/page.tsx` derives `generateStaticParams` from that manifest. So
"every KEEP URL has a page" is a build guarantee, not something QA has to catch.
`dynamicParams = false` means an undeclared URL 404s at build time.

---

## Adding a page

1. Add or update its row in `data/url-map.csv`.
2. Create `content/<type>/<slug>.mdx` with complete frontmatter:
   `url`, `type`, `title`, `description`, `h1` (all five are required — the build
   throws if any is missing), plus `date`/`updated` for posts.
3. Run `npm run build`. If the URL does not appear in the prerender manifest,
   `scripts/check-static.mjs` fails the build and names the file.

## Adding a redirect

1. Add the row to `data/url-map.csv` with `action=301` and a `new_url`.
2. `npm run redirects:build`. It refuses to write if it finds a chain, a
   duplicate source, or a redirect to itself.
3. `npm run verify:redirects -- --base <staging url>` before merging.

---

## Things that are easy to get wrong here

**`permanent: true` emits 308, not 301.** The migration plan specifies 301 and
the QA script asserts 301, so `build-redirects.mjs` writes an explicit
`statusCode: 301`. Use one or the other, never both. (Google treats them
equivalently; the assertion just has to match what the server sends.)

**`params` is a Promise in Next 16.** `const { slug } = await params`.
Synchronous access was removed. Same for `generateSitemaps` `id` and the props
of `opengraph-image` / `icon` functions.

**`middleware.ts` is now `proxy.ts`** and runs on Node, not Edge. We do not
currently need either — redirects live in next.config, which is well under
Vercel's 1,024 cap.

**Turbopack cannot take MDX plugin functions.** remark/rehype plugins must be
named as strings in `next.config.ts`, because functions cannot cross into Rust.

**`trailingSlash` does not apply to strings emitted by `sitemap.ts`.** That is
why sitemap entries go through `sitemapEntry()`.

**`.next/cache` must survive between builds** or the filesystem cache buys
nothing. Containerised builds start from a clean layer — mount or restore it,
or set `turbopackFileSystemCacheForBuild: false` and stop pretending.

**FAQ rich results no longer exist.** Google removed them from Search on
7 May 2026 and deleted the docs on 15 June 2026. Keep FAQ content and markup if
you like, but the Rich Results Test will not report it — do not treat that as a
QA failure.

---

## Before opening a pull request

```bash
npm run typecheck        # next typegen && tsc --noEmit
npm run build            # must show zero ƒ (Dynamic) routes
npm run verify:static    # noindex guard + every declared URL prerendered
```

And for anything touching URLs, redirects or metadata, additionally:

```bash
npm run verify:redirects -- --base https://staging.recycletechnologies.com --auth user:pass
npm run verify:parity -- baseline-crawl.csv staging-crawl.csv --staging-origin https://staging...
```

## Commit and branch conventions

- Branch: `phase2/<area>-<short-description>`, e.g. `phase2/location-templates`.
- One concern per PR. A PR that changes both a template and the URL map is two PRs.
- PR description states: which `url-map.csv` rows it affects, whether any client
  JavaScript was added, and the output of `npm run verify:static`.
