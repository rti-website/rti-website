#!/usr/bin/env node
/**
 * Catch text printing through other text.
 *
 * Every layout bug in this build has been the same shape: Figma pins two text
 * layers to fixed offsets, which silently encodes "the first one is N lines",
 * and real copy makes it N+1. It happened to the industry card titles, the
 * closing CTA heading, the prose-block headings and the contact CTA. Each was
 * found by eye. This finds them.
 *
 *   npm run build && npx next start -p 3300
 *   node scripts/check-overlaps.mjs [--port 3300]
 *
 * It compares PAINTED TEXT, not element boxes: a heading box is routinely wider
 * than its longest line, and comparing boxes reports overlaps that no one can
 * see. Range.getClientRects() gives the actual glyph runs.
 *
 * Exits non-zero when anything overlaps, so it can gate a build.
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const PORT = process.argv.includes('--port')
  ? process.argv[process.argv.indexOf('--port') + 1]
  : '3300'
/** Ignore sub-pixel kissing; flag anything a reader would notice. */
const MIN = 3

/** Every static route in the app, at any depth. */
function findRoutes(dir, prefix = '') {
  const out = []
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name.startsWith('[') || d.name.startsWith('_')) continue
    const route = prefix ? `${prefix}/${d.name}` : d.name
    if (fs.existsSync(path.join(dir, d.name, 'page.tsx'))) out.push(route)
    out.push(...findRoutes(path.join(dir, d.name), route))
  }
  return out
}
// Plus a sample of the location pages, whose folders are [site]/[service]
// and so are not found by the walk (24 Sep 2026).
const ROUTES = ['', ...findRoutes(path.join(process.cwd(), 'src', 'app')).sort(),
  'locations/phoenix-az', 'locations/phoenix-az/battery-recycling', 'minnesota-recycling/battery-recycling']

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
})

let failed = 0
for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } })
  await page.goto(`http://localhost:${PORT}/${route ? route + '/' : ''}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1600)

  const hits = await page.evaluate((MIN) => {
    // The union of an element's actual glyph rects, which is what a reader sees.
    // A Range over node CONTENTS returns block boxes, not line boxes — for a div
    // wrapping an h1 that is the div's full width, which reports overlaps nobody
    // can see. Ranging over each text node gives the real glyph runs.
    const textBox = (el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      const rects = []
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.nodeValue.trim()) continue
        const r = document.createRange()
        r.selectNodeContents(n)
        for (const x of r.getClientRects()) if (x.width > 0 && x.height > 0) rects.push(x)
      }
      if (!rects.length) return null
      return {
        left: Math.min(...rects.map((x) => x.left)),
        right: Math.max(...rects.map((x) => x.right)),
        top: Math.min(...rects.map((x) => x.top)),
        bottom: Math.max(...rects.map((x) => x.bottom)),
      }
    }
    const label = (el) => (el.innerText || '').trim().slice(0, 40).replace(/\s+/g, ' ')
    const out = []
    for (const sec of document.querySelectorAll('[data-figma]')) {
      const kids = [...sec.children].filter((c) => {
        const cs = getComputedStyle(c)
        return cs.position === 'absolute' && (c.innerText || '').trim()
      })
      const boxes = kids.map(textBox)
      for (let i = 0; i < kids.length; i++) {
        for (let j = i + 1; j < kids.length; j++) {
          const a = boxes[i]; const b = boxes[j]
          if (!a || !b) continue
          const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left)
          const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
          if (ox > MIN && oy > MIN) {
            out.push(`${sec.dataset.figma}: "${label(kids[i])}" over "${label(kids[j])}" (${Math.round(ox)}x${Math.round(oy)}px)`)
          }
        }
      }
    }
    return out
  }, MIN)

  if (hits.length) {
    failed++
    console.log(`OVERLAP  /${route}`)
    for (const h of hits) console.log(`         ${h}`)
  } else {
    console.log(`ok       /${route}`)
  }
  await page.close()
}

await browser.close()
if (failed) {
  console.log(`\n  ${failed} page(s) with text printing through text`)
  process.exit(1)
}
console.log(`\n  ${ROUTES.length} pages, no overlapping text`)
