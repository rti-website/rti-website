#!/usr/bin/env node
/**
 * Measure every service detail page's two prose blocks and write the numbers
 * back into its route file's `layout` prop.
 *
 * Why this exists: Figma sized those two blocks (6197:4463 and 6173:4386)
 * around placeholder copy — 495 and 579. Real copy runs longer, by up to 260px,
 * and a section that clips silently swallows a paragraph nobody notices is
 * missing. So the heights are measured, not guessed, and re-measured whenever
 * copy changes.
 *
 * The blocks are `items-center`, so overflow spills equally above and below and
 * `scrollHeight` sees only the bottom half. Measure the TEXT COLUMN instead and
 * add the section's own vertical padding, which is read off the element rather
 * than hardcoded here.
 *
 *   npm run build && npx next start -p 3200
 *   node scripts/measure-service-pages.mjs [--write] [--port 3200]
 *
 * Without --write it only reports. With --write it rewrites the `layout` prop
 * in each route file, after which you rebuild.
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = process.cwd()
const WRITE = process.argv.includes('--write')
const PORT = process.argv.includes('--port')
  ? process.argv[process.argv.indexOf('--port') + 1]
  : '3200'
const HEADROOM = 10
/** The frame's own heights for the two banded sections. */
const ACCEPT_DEFAULT = 446.36
const CERT_DEFAULT = 299.035
const FAQ_DEFAULT = 676.93
/** Slack for sub-pixel rounding when comparing against a design height. */
const TOLERANCE = 2

/** Every route whose page.tsx renders ServiceDetailPage, at any depth. */
function findRoutes(dir, prefix = '') {
  const out = []
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name.startsWith('[') || d.name.startsWith('_')) continue
    const route = prefix ? `${prefix}/${d.name}` : d.name
    const f = path.join(dir, d.name, 'page.tsx')
    if (fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes('ServiceDetailPage')) out.push(route)
    out.push(...findRoutes(path.join(dir, d.name), route))
  }
  return out
}
const ROUTES = findRoutes(path.join(ROOT, 'src', 'app')).sort()

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
})

let changed = 0
for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } })
  await page.goto(`http://localhost:${PORT}/${route}/`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2500)

  const m = await page.evaluate(() => {
    // Prose blocks: measure the text column (the horizontal flex child that
    // holds the h2), because the section itself is items-center.
    // Returns the height the section needs: its own vertical padding plus the
    // text column. Reading the padding off the element rather than hardcoding
    // it means a layout tweak cannot silently invalidate these numbers.
    const col = (id) => {
      const s = document.querySelector(`[data-figma="${id}"]`)
      if (!s) return null
      const c = [...s.children].find((el) => el.querySelector && el.querySelector('h2'))
      if (!c) return null
      const cs = getComputedStyle(s)
      const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
      return Math.ceil(c.getBoundingClientRect().height + pad)
    }
    // Banded sections: vertical flex, gap 30 — sum the children.
    // Absolutely positioned children (the scroll anchor) are not flex items, so
    // they take no space and earn no gap; counting them added a phantom 30px.
    const band = (id, gap) => {
      const s = document.querySelector(`[data-figma="${id}"]`)
      if (!s) return null
      const kids = [...s.children].filter((c) => getComputedStyle(c).position !== 'absolute')
      const sum = kids.reduce((a, c) => a + c.getBoundingClientRect().height, 0)
      return Math.ceil(sum + gap * Math.max(0, kids.length - 1))
    }
    // FAQ band: both children are absolutely positioned (heading at y100,
    // accordion at y296.5), so it is measured from the accordion's own height
    // plus the design's offsets — 296.5 above, 100 below.
    const faq = (() => {
      const s = document.querySelector('[data-figma="6146:2417"]')
      const ul = s && s.querySelector('ul')
      return ul ? Math.ceil(296.5 + ul.getBoundingClientRect().height + 100) : null
    })()
    return {
      intro: col('6197:4463'),
      process: col('6173:4386'),
      accept: band('6142:2067', 30),
      certifications: band('6173:2828', 30),
      faq,
    }
  })
  await page.close()

  if (m.intro == null) {
    console.log(`  ${route.padEnd(42)} SKIPPED (sections not found)`)
    continue
  }

  // The industry pages have no second prose block, so that key is omitted.
  const parts = [`intro: ${m.intro + HEADROOM}`]
  if (m.process != null) parts.push(`process: ${m.process + HEADROOM}`)
  // The bands only need a number when the design's own height is genuinely too
  // small. TOLERANCE absorbs sub-pixel rounding: a band that measures 677.0
  // against a 676.93 design height does not need an override, and writing one
  // would push fourteen pages 10px off the design for nothing.
  if (m.accept > ACCEPT_DEFAULT + TOLERANCE) parts.push(`accept: ${m.accept + HEADROOM}`)
  if (m.certifications > CERT_DEFAULT + TOLERANCE) parts.push(`certifications: ${m.certifications + HEADROOM}`)
  if (m.faq > FAQ_DEFAULT + TOLERANCE) parts.push(`faq: ${m.faq + HEADROOM}`)
  const layout = `layout={{ ${parts.join(', ')} }}`

  const file = path.join(ROOT, 'src', 'app', ...route.split('/'), 'page.tsx')
  const src = fs.readFileSync(file, 'utf8')
  const same = src.includes(layout)
  console.log(`  ${route.padEnd(42)} ${layout.slice(8, -2).padEnd(62)}${same ? '' : '<- changed'}`)

  if (WRITE && !same) {
    fs.writeFileSync(file, src.replace(/layout=\{\{[^}]*\}\}/, layout))
    changed++
  }
}

await browser.close()
console.log(WRITE ? `\n  ${changed} route file(s) updated — rebuild now.` : '\n  report only; pass --write to apply')
