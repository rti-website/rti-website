#!/usr/bin/env node
/**
 * Measure a page's sections and report the height each one actually needs.
 *
 * The auto-layout frames (About Us 6371:3478, Locations 6374:4194) size every
 * section as content plus its own padding, and the content docs are not the
 * copy those frames were drawn around. So the heights in each route file are
 * measured rather than copied off the frame.
 *
 *   npm run build && npx next start -p 3200
 *   node scripts/measure-sections.mjs --route all-locations [--port 3200]
 *
 * Reports only. Copy the numbers into the `H` map in the route file and
 * rebuild: a section that is too short clips, one that is too tall leaves a
 * band of background.
 *
 * Sections whose height is fixed by a shared component are skipped — the hero
 * is always ServiceHero at 470 and its first child is the 974-tall photo plate,
 * which the frame clips on purpose.
 */
import { chromium } from 'playwright-core'

const arg = (name, fallback) => process.argv.includes(name)
  ? process.argv[process.argv.indexOf(name) + 1]
  : fallback

const PORT = arg('--port', '3200')
const ROUTE = arg('--route', null)
if (!ROUTE) {
  console.error('  usage: node scripts/measure-sections.mjs --route <route> [--port 3200]')
  process.exit(1)
}
const URL = `http://localhost:${PORT}/${ROUTE.replace(/^\/|\/$/g, '')}/`
/** Anything inside this of the built height is the same number, not a drift. */
const TOLERANCE = 1
/** Heroes: fixed height, deliberate overflow. */
const SKIP = new Set(['6371:3480', '6374:4196', '6382:5543', '6374:4888', '6374:4569', '6374:5213', '6382:6229', '6382:6597'])

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
})
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto(URL, { waitUntil: 'domcontentloaded' })
// Measure in DESIGN pixels, not screen pixels. globals.css trims
// --canvas-inset off each side and zooms the canvas up to compensate, so at a
// 1920 viewport getBoundingClientRect() comes back multiplied by that zoom
// while offsetTop/offsetHeight stay in layout units — the two would disagree
// and every section would read ~16% too tall. Neutralising the trim puts the
// zoom back at exactly 1 so both agree and the numbers match Figma.
await page.addStyleTag({ content: '.design-canvas{--canvas-inset:0px}' })
await page.waitForTimeout(2500)

const rows = await page.evaluate((skip) => {
  const out = []
  for (const sec of document.querySelectorAll('main [data-figma]')) {
    if (skip.includes(sec.dataset.figma)) continue
    const cs = getComputedStyle(sec)
    // Content bottom = the lowest point any child reaches, measured from the
    // section's own top; offsetTop is section-relative because the section is
    // positioned. Works for flex columns and for absolutely placed rows alike.
    let bottom = 0
    for (const c of sec.children) bottom = Math.max(bottom, c.offsetTop + c.offsetHeight)
    out.push({
      node: sec.dataset.figma,
      built: Math.round(sec.getBoundingClientRect().height * 100) / 100,
      needs: Math.ceil(bottom + parseFloat(cs.paddingBottom)),
    })
  }
  return out
}, [...SKIP])

const canvas = await page.evaluate(() => {
  const el = document.querySelector('.design-canvas')
  return el ? Math.round(el.getBoundingClientRect().height) : null
})

await browser.close()

let bad = 0
console.log(`\n  ${URL}\n`)
for (const r of rows) {
  const off = r.needs - r.built
  const flag = Math.abs(off) <= TOLERANCE
    ? ''
    : (off > 0 ? `<- ${off} TOO SHORT (clipping)` : `<- ${-off} too tall (background band)`)
  if (flag) bad++
  console.log(`  ${String(r.node).padEnd(12)} built ${String(r.built).padStart(8)}   needs ${String(r.needs).padStart(8)}   ${flag}`)
}
console.log(`\n  canvas ${canvas}`)
console.log(bad ? `\n  ${bad} section(s) to adjust in the route file.\n` : '\n  All sections fit.\n')
