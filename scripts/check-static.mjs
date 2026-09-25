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

/**
 * .env.local, then .env, then the real environment — the same precedence Next
 * itself uses, and the same helper db-seed.mjs and make-user.mjs already have.
 *
 * !! WITHOUT THIS THE GUARD BELOW COULD NEVER FIRE, WHICH IS WORSE THAN NOT
 * HAVING IT. This is plain node, not Next, so nothing loads .env.local for it —
 * and .env.local is exactly where NEXT_PUBLIC_NOINDEX lives. `next build` read
 * the file and baked noindex into every page; this script read process.env, saw
 * nothing, printed "noindex flag: off" and passed. So the one check CLAUDE.md
 * rule 9 leans on was reporting all clear without ever having looked, and the
 * only way to trip it was to export the variable in the shell by hand.
 *
 * Found on the dev server, 18 Sep 2026, when a staging build that genuinely had
 * noindex on reported it as off.
 */
function env() {
  const out = {}
  for (const f of ['.env.local', '.env']) {
    const file = path.join(ROOT, f)
    if (!fs.existsSync(file)) continue
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) out[m[1]] ??= m[2].trim().replace(/^["']|["']$/g, '')
    }
  }
  // A variable set in the shell beats the file, as it does everywhere else.
  return { ...out, ...process.env }
}

const ENV = env()

// --- 1. noindex must never reach production --------------------------------
const isProd = (ENV.VERCEL_ENV || ENV.DEPLOY_ENV || 'production') === 'production'
if (isProd && ENV.NEXT_PUBLIC_NOINDEX === 'true') {
  fail(
    'NEXT_PUBLIC_NOINDEX=true in a production build.\n' +
      '  This would ship <meta robots="noindex"> and Disallow: / to the live site.',
  )
}

// --- 1b. an admin cookie without Secure must never reach production either --
// ADMIN_ALLOW_HTTP lets the dev box run its admin over plain HTTP to a LAN
// address (see secureCookie() in src/lib/auth.ts). On the live site it would
// mean the login cookie travels in the clear. Same shape as the noindex check:
// fine on staging, a build failure anywhere that calls itself production.
if (isProd && ENV.ADMIN_ALLOW_HTTP === 'true') {
  fail(
    'ADMIN_ALLOW_HTTP=true in a production build.\n' +
      '  This would send the admin login cookie without the Secure flag on the live site.',
  )
}

// --- 1c. (retired 25 Sep 2026) ------------------------------------------------
// This used to fail a production build whose homepage showed the Figma's four
// testimonial names, while they were a design preview only. Asim confirmed
// they are new RTI clients who approved their words and agreed to be named,
// so they are now the live testimonials (TESTIMONIALS in src/data/home.ts).

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
console.log(`   - noindex flag: ${ENV.NEXT_PUBLIC_NOINDEX === 'true' ? 'ON (staging)' : 'off'}`)
console.log(`   - deploy env:   ${ENV.VERCEL_ENV || ENV.DEPLOY_ENV || 'production'}\n`)
