import fs from 'node:fs'
import path from 'node:path'
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

type Redirect = { source: string; destination: string; statusCode: 301 }

/**
 * data/redirects.json is GENERATED from data/url-map.csv by
 * scripts/build-redirects.mjs, so it may legitimately not exist yet on a fresh
 * clone. Read it at runtime rather than importing it, so a missing file means
 * "no redirects yet" instead of a config crash.
 */
function loadRedirects(): Redirect[] {
  const file = path.join(process.cwd(), 'data', 'redirects.json')
  if (!fs.existsSync(file)) return []
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as Redirect[]
  } catch (e) {
    console.warn(`[next.config] could not parse data/redirects.json: ${(e as Error).message}`)
    return []
  }
}

type Rewrite = { source: string; destination: string }

/**
 * THE OLD WORDPRESS IMAGE URLS KEEP WORKING (CLAUDE.md rule 8, 23 Sep 2026).
 *
 * ~300 posts, their og:image, Google Images and other sites all point at
 * /wp-content/uploads/<year>/<month>/<file> on this domain. The import copied
 * those files into the media library under new names (/uploads/2026/09/...),
 * and public/wp-content/ was never created, so the day DNS moves every one of
 * those URLs would 404.
 *
 * Rewrites, not redirects: the old URL itself answers 200 with the same image,
 * so nothing Google has indexed changes (the point of rule 8).
 *
 *   data/legacy-media-map.json   old path -> the library copy, one entry per
 *                                file the import already has (295; from the
 *                                launch audit's wp-media-manifest.json)
 *   anything else under          -> /uploads/legacy/<same path>, i.e. MEDIA_DIR/
 *   /wp-content/uploads/            legacy/. data/legacy-media-download.txt lists
 *                                the files only WordPress has; they are fetched
 *                                into that folder before the DNS switch
 *                                (deploy/PRODUCTION-SAME-VM.md). A file in
 *                                neither place 404s, exactly as before.
 *
 * Read at runtime like redirects.json, so a missing file means "no rewrites"
 * rather than a config crash.
 */
function loadLegacyMedia(): Rewrite[] {
  const file = path.join(process.cwd(), 'data', 'legacy-media-map.json')
  let map: Record<string, string> = {}
  if (fs.existsSync(file)) {
    try {
      map = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, string>
    } catch (e) {
      console.warn(`[next.config] could not parse data/legacy-media-map.json: ${(e as Error).message}`)
    }
  }
  return [
    ...Object.entries(map).map(([source, destination]) => ({ source, destination })),
    { source: '/wp-content/uploads/:path*', destination: '/uploads/legacy/:path*' },
  ]
}

/**
 * RTI production config.
 *
 * READ BEFORE CHANGING. Each line below is load-bearing for the migration.
 * Rationale and doc references live in CLAUDE.md.
 */
const nextConfig: NextConfig = {
  // The live WordPress site serves every URL with a trailing slash.
  // This makes Next emit and expect the same, so no URL changes and no extra
  // redirect hop. Changing this silently breaks ~600 URLs.
  trailingSlash: true,

  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  /* `X-Powered-By: Next.js` on every response tells a scanner exactly which
     framework and therefore which CVE list to try. It buys nothing. */
  poweredByHeader: false,

  // NEVER set `output: 'export'`. Static export disables redirects(),
  // rewrites(), headers() and proxy — the ~500 redirects would vanish with
  // no error. Pages are still fully prerendered without it: the build output
  // must show ○/● for every route (enforced by scripts/check-static.mjs).

  async redirects() {
    // Never hand-edit data/redirects.json — change data/url-map.csv and run
    // `npm run redirects:build`.
    return loadRedirects()
  },

  async rewrites() {
    // The old /wp-content/uploads/ image URLs — see loadLegacyMedia() above.
    return loadLegacyMedia()
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          /* ONE year, and NO includeSubDomains / preload — RTI-12, 23 Sep 2026.
             Once a browser has seen includeSubDomains it refuses plain HTTP on
             EVERY *.recycletechnologies.com host for the whole max-age, and
             preload bakes that into the browsers themselves, where removing it
             takes months. Add both back only after every subdomain (dev, mail,
             anything a vendor runs) is confirmed on HTTPS.

             These headers are set HERE, not in nginx. nginx on the dev server
             was adding its own copies, so every response carried two HSTS
             headers with different values. Next already sends these on every
             route, public/ files included, so the server block must NOT add
             Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options
             or Referrer-Policy — see deploy/nginx/recycletechnologies.com.conf. */
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
          /* Nothing on this site asks for a camera, a microphone or a location,
             so nothing embedded in it should be able to either. Named here
             rather than left to default because the default is "allowed". */
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        /* The two faces in public/fonts that are not @fontsource packages (see
           the note at the top of styles/globals.css). Next sets a long
           immutable Cache-Control for everything under /_next/static, but not
           for public/ — and these files are replaced by editing the repo, never
           in place, so a year is safe. Without this they are revalidated on
           every navigation. */
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Legacy WordPress media keeps its original paths. Cache hard.
        source: '/wp-content/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  images: {
    // Legacy images are served from /public/wp-content/uploads at their
    // original paths. next/image optimises them in place.
    formats: ['image/avif', 'image/webp'],
  },

  // Do NOT enable cacheComponents. It removes `dynamic`, `dynamicParams`,
  // `revalidate` and `fetchCache` — and `dynamic = 'error'` is the guard that
  // makes an accidental dynamic route fail the build.

  experimental: {
    /*
     * HOW MANY PROCESSES PRERENDER PAGES. Unset, Next uses one per core, and
     * on a box that cannot feed them that is slower than using fewer.
     *
     * Measured 21 Sep 2026. One worker peaks around 740 MB building this site
     * — 520 MB of that is Next and React before a single post exists, the rest
     * is rendering 379 blog and archive pages. The dev server has 8 cores, so
     * it was starting 8 workers:
     *
     *     8 x ~740 MB  =  ~5.9 GB needed
     *     free -h      =  2.9 GB available, and 4.0 GB of swap ALREADY FULL
     *
     * Two times over capacity with nothing left to page out to. Eight pages
     * blew past the 60-second render timeout and were retried; the build only
     * finished because Next retries three times. Nothing was wrong with the
     * code or the queries — total PostgreSQL time for a whole build is about
     * two milliseconds. See claude/build-performance-investigation-21-sep.md.
     *
     * Left unset everywhere by default, because a build host with real memory
     * SHOULD use its cores. The dev server sets BUILD_CPUS=3 in .env.local.
     * Raise it only after `free -h` on that box says there is room.
     */
    cpus: Number(process.env.BUILD_CPUS) || undefined,
  },
}

const withMDX = createMDX({
  options: {
    // Turbopack is the default builder in Next 16 and cannot receive plugin
    // functions across the Rust boundary — plugins must be named as strings.
    //
    // TODO(phase-2): frontmatter handling. `remark-frontmatter` v5 is ESM-only
    // and @next/mdx resolves plugins with require.resolve, which throws
    // "Cannot find module". Options when the content pipeline is built:
    //   a) strip frontmatter with gray-matter in a small custom loader, or
    //   b) pin remark-frontmatter v4 (CJS), or
    //   c) keep body and metadata in separate files.
    // The homepage does not use MDX, so this is deferred, not ignored.
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
