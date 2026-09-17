#!/usr/bin/env node
/**
 * Download every Figma asset the site uses into public/.
 *
 * Why this exists: figma.com is blocked from the cloud sandbox this project was
 * scaffolded in, so the assets could not be pulled there. Run this once on a
 * machine that can reach figma.com and the images land in the right places.
 *
 *   node scripts/fetch-figma-assets.mjs            all assets
 *   node scripts/fetch-figma-assets.mjs --missing  only the ones not on disk
 *   node scripts/fetch-figma-assets.mjs --only public/images/home/hero.png
 *
 * Use --missing after a new page is added: it fetches just that page's new
 * assets and leaves everything already downloaded alone, so an expired URL for
 * an old asset cannot blank out a file you already have.
 *
 * Use --only when an asset already on disk was exported from the wrong node and
 * has to be replaced: --missing would skip it. Takes one or more paths, matched
 * against the manifest's `to` field.
 *
 * Figma asset URLs expire roughly 7 days after export (manifest generated
 * 15 Sep 2026). If a download 404s, re-export that node from the file — the
 * manifest records the node id for every asset.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const BASE = 'https://www.figma.com/api/mcp/asset/'
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'figma-assets.json'), 'utf8'))

const onlyMissing = process.argv.includes('--missing')
/** Paths given after --only, matched against each asset's `to`. */
const only = process.argv.includes('--only')
  ? process.argv.slice(process.argv.indexOf('--only') + 1).filter((a) => !a.startsWith('--'))
  : null
if (only && only.length === 0) {
  console.error('  --only needs at least one path, e.g. --only public/images/home/hero.png')
  process.exit(1)
}

const wanted = only
  ? manifest.assets.filter((a) => only.some((o) => a.to === o || a.to.endsWith('/' + o.replace(/^\.?\//, ''))))
  : manifest.assets
if (only && wanted.length !== only.length) {
  console.error(`  --only matched ${wanted.length} of ${only.length} path(s); check them against data/figma-assets.json`)
  process.exit(1)
}

let ok = 0
let skipped = 0
const failed = []

for (const asset of wanted) {
  const dest = path.join(ROOT, asset.to)
  if (onlyMissing && !only && fs.existsSync(dest)) { skipped++; continue }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  try {
    const res = await fetch(BASE + asset.id)
    if (!res.ok) { failed.push(`${asset.to}  (HTTP ${res.status}, node ${asset.node})`); continue }
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length === 0) { failed.push(`${asset.to}  (empty response)`); continue }
    fs.writeFileSync(dest, buf)
    ok++
    console.log(`  ${asset.to.padEnd(42)} ${(buf.length / 1024).toFixed(1)} KB   ${asset.name}`)
  } catch (e) {
    failed.push(`${asset.to}  (${e.message})`)
  }
}

console.log(`\n  ${ok}/${wanted.length} assets downloaded${skipped ? `, ${skipped} already on disk` : ''}`)
if (failed.length) {
  console.error(`\n  ${failed.length} failed — re-export these nodes from Figma:`)
  for (const f of failed) console.error(`   - ${f}`)
  process.exit(1)
}
