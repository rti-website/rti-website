#!/usr/bin/env node
/**
 * Post-build guard. Run immediately after `next build`.
 *
 * Fails the build if:
 *   1. NEXT_PUBLIC_NOINDEX is set in a production build  (the single mistake
 *      that can deindex the whole site within days)
 *   2. any route was NOT prerendered  (content Google might not see)
 *   3. any URL declared in content/ is missing from the prerender manifest
 *      (a KEEP URL that quietly did not get built)
 *
 * Reads .next/prerender-manifest.json rather than parsing build log text, so it
 * does not break when Next changes its output formatting.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const fail = (msg) => { console.error(`\n  BUILD GUARD FAILED\n  ${msg}\n`); process.exit(1) }

// --- 1. noindex must never reach production --------------------------------
const isProd = (process.env.VERCEL_ENV || process.env.DEPLOY_ENV || 'production') === 'production'
if (isProd && process.env.NEXT_PUBLIC_NOINDEX === 'true') {
  fail(
    'NEXT_PUBLIC_NOINDEX=true in a production build.\n' +
      '  This would ship <meta robots="noindex"> and Disallow: / to the live site.',
  )
}

// --- 2 & 3. everything declared must be prerendered -------------------------
const manifestPath = path.join(ROOT, '.next', 'prerender-manifest.json')
if (!fs.existsSync(manifestPath)) {
  fail('.next/prerender-manifest.json not found. Run `next build` first.')
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const prerendered = new Set(Object.keys(manifest.routes || {}))

// Read the declared URLs straight out of content frontmatter — no TS import
// needed, so this script runs with plain node.
function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return walk(full)
    return /\.mdx?$/.test(e.name) ? [full] : []
  })
}
const declared = walk(path.join(ROOT, 'content'))
  .filter((f) => !path.basename(f).startsWith('_'))
  .map((f) => {
    // Matches `export const meta = { url: '/x/' , ... }` — see src/lib/content.ts
    // for why metadata is an ESM export rather than YAML frontmatter.
    const m = fs.readFileSync(f, 'utf8').match(/export\s+const\s+meta\s*=[\s\S]*?url:\s*['"`]([^'"`]+)['"`]/)
    return m ? { file: path.relative(ROOT, f), url: m[1].trim() } : null
  })
  .filter(Boolean)

const missing = declared.filter((d) => {
  const withSlash = d.url.endsWith('/') ? d.url : `${d.url}/`
  const withoutSlash = withSlash.replace(/\/$/, '') || '/'
  return !prerendered.has(withSlash) && !prerendered.has(withoutSlash)
})

if (missing.length) {
  console.error(`\n  BUILD GUARD FAILED\n  ${missing.length} declared URL(s) were not prerendered:\n`)
  for (const m of missing.slice(0, 30)) console.error(`   - ${m.url}   (${m.file})`)
  if (missing.length > 30) console.error(`   ... and ${missing.length - 30} more`)
  console.error('')
  process.exit(1)
}

// --- report ----------------------------------------------------------------
console.log(`\n  Build guard passed`)
console.log(`   - ${prerendered.size} routes prerendered`)
console.log(`   - ${declared.length} declared content URLs, all present`)
console.log(`   - noindex flag: ${process.env.NEXT_PUBLIC_NOINDEX === 'true' ? 'ON (staging)' : 'off'}\n`)
