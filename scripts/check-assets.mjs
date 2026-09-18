#!/usr/bin/env node
/**
 * Every asset registered in data/figma-assets.json that is not on disk.
 *
 * WHY IT EXISTS: figma.com is unreachable from the build sandbox, so exported
 * artwork is pulled on a machine that can see it —
 *   node scripts/fetch-figma-assets.mjs --missing
 * — and until somebody runs that, a component pointing at one of those paths
 * renders a broken image with no error anywhere. The end-to-end QA on
 * 17 Sep 2026 found /images/icons/mail-24.svg missing and shipping a 404 from
 * /services/; it had been registered, and simply never fetched.
 *
 * Exit code 1 when something is missing, so it can gate a deploy. It is
 * deliberately NOT part of `npm run build`: a designer adding a row to the
 * manifest should not break everybody's build until the file lands.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const c = {
  b: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`, bad: (s) => `\x1b[31m${s}\x1b[0m`,
}

const manifest = JSON.parse(readFileSync(path.join(ROOT, 'data', 'figma-assets.json'), 'utf8'))
const assets = manifest.assets ?? []

const missing = assets.filter((a) => a.to && !existsSync(path.join(ROOT, a.to)))

console.log(`\n  ${c.b('Figma asset check')}  ${c.dim(`${assets.length} registered`)}\n`)

if (missing.length === 0) {
  console.log(`  ${c.ok('✓')} every registered asset is on disk\n`)
  process.exit(0)
}

for (const a of missing) {
  console.log(`  ${c.bad('missing')}  ${a.to}`)
  if (a.name) console.log(`           ${c.dim(a.name)}`)
}
console.log(`
  ${c.b(`${missing.length} missing.`)} Pull them on a machine that can reach figma.com:
    ${c.dim('node scripts/fetch-figma-assets.mjs --missing')}
`)
process.exit(1)
