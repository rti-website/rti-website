#!/usr/bin/env node
/**
 * Find content that runs off the left or right edge of the page at desktop.
 *
 *   node scripts/check-edges.mjs [--port 3000] [--width 1660]
 *
 * WHY — 23 Sep 2026: the /blog/ newsletter bar sat at x0 of the 1920 board,
 * inside the 130px the canvas crops off each side, so its field was cut off.
 * Asim saw it in Firefox; it was the same in every browser. No existing check
 * caught it — check-overlaps looks for text on text, check-clickable for
 * covered controls, check-mobile-clip only runs at 390. This one asks the
 * plain question at a desktop width: is any form, control, link, heading,
 * paragraph or list item wider than the window on either side?
 *
 * Things that hang off the edge ON PURPOSE are skipped: carousels (the story
 * carousel's side cards), the logo marquee, aria-hidden and [hidden] content,
 * and the header (its mega-menu panels are positioned off-screen when shut).
 * Exit code 1 when anything is found.
 */
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const arg = (n, d) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : d)
const PORT = arg('--port', '3000')
const WIDTH = Number(arg('--width', '1660'))

const routes = []
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) { if (!/^(admin|api)$/.test(e.name) && !e.name.startsWith('[')) walk(f) }
    else if (e.name === 'page.tsx') routes.push(('/' + path.relative('src/app', d).split(path.sep).join('/') + '/').replace('//', '/'))
  }
})(path.join(process.cwd(), 'src', 'app'))

let found = 0
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: WIDTH, height: 1000 } })
for (const r of routes) {
  await page.goto(`http://127.0.0.1:${PORT}${r}`, { waitUntil: 'networkidle' }).catch(() => {})
  const bad = await page.evaluate(() => {
    const W = document.documentElement.clientWidth
    const out = []
    for (const el of document.querySelectorAll('form, input, button, a, h1, h2, h3, p, li')) {
      if (el.closest('[aria-roledescription="carousel"], .logo-marquee, [aria-hidden="true"], [hidden], header')) continue
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const st = getComputedStyle(el); if (st.visibility === 'hidden') continue
      if (r.left < -1 || r.right > W + 1) out.push([el.tagName, (el.textContent || el.getAttribute('placeholder') || '').trim().slice(0, 40), Math.round(r.left), Math.round(r.right)])
    }
    return out.slice(0, 6)
  })
  if (bad.length) { found += bad.length; console.log('EDGE    ' + r, JSON.stringify(bad)) }
}
await browser.close()
console.log(found ? `\n  ${found} element(s) past the page edge` : `\n  ${routes.length} pages, nothing past the page edge at ${WIDTH}px`)
process.exit(found ? 1 : 0)
