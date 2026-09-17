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

  // NEVER set `output: 'export'`. Static export disables redirects(),
  // rewrites(), headers() and proxy — the ~500 redirects would vanish with
  // no error. Pages are still fully prerendered without it: the build output
  // must show ○/● for every route (enforced by scripts/check-static.mjs).

  async redirects() {
    // Never hand-edit data/redirects.json — change data/url-map.csv and run
    // `npm run redirects:build`.
    return loadRedirects()
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
