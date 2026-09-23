#!/usr/bin/env node
/**
 * Find wrapping flex rows that fit their container to the pixel.
 *
 *   node scripts/check-wrap-slack.mjs [--port 3000] [--width 1660]
 *
 * WHY — 23 Sep 2026: /case-studies/ showed its three cards in one row in
 * Chrome and two-plus-one in Firefox. The row was `flex-wrap` and the cards
 * summed to exactly its width (3 x 410 + 2 x 24 = 1278). Under the canvas
 * zoom each browser rounds lengths its own way — Firefox in 1/60px units,
 * each length scaled separately — so a row with no slack wraps in one and
 * not the other. Nothing in Chromium looks wrong, so this checks the
 * arithmetic instead: for every `flex-wrap` row with two or more items on a
 * line, it reports the line when less than 1px of width is left over.
 *
 * The fix is a grid (explicit columns, nothing to wrap), or a row that does
 * not need to wrap at all. Exit code 1 when anything is found.
 */
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const arg = (n, d) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : d)
const PORT = arg('--port', '3000')
const WIDTH = Number(arg('--width', '1660'))

// Every page.tsx route, as check-clickable does. Admin and API are skipped;
// dynamic segments have no single URL to visit.
const routes = []
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) { if (!/^(admin|api)$/.test(e.name) && !e.name.startsWith('[')) walk(f) }
    else if (e.name === 'page.tsx') routes.push(('/' + path.relative('src/app', d).split(path.sep).join('/') + '/').replace('//', '/'))
  }
})(path.join(process.cwd(), 'src', 'app'))

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: WIDTH, height: 1000 } })
let found = 0
for (const r of routes) {
  await page.goto(`http://127.0.0.1:${PORT}${r}`, { waitUntil: 'networkidle' }).catch(() => {})
  const bad = await page.evaluate(() => {
    const out = []
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el)
      if (cs.display !== 'flex' || cs.flexWrap !== 'wrap' || cs.flexDirection !== 'row') continue
      const kids = [...el.children].filter((k) => getComputedStyle(k).position !== 'absolute' && getComputedStyle(k).display !== 'none')
      if (kids.length < 2) continue
      const gap = parseFloat(cs.columnGap) || 0
      const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      // group by line (same top)
      const lines = {}
      for (const k of kids) { const t = Math.round(k.offsetTop); (lines[t] ||= []).push(k) }
      for (const ks of Object.values(lines)) {
        const used = ks.reduce((a, k) => a + k.getBoundingClientRect().width, 0) / (el.getBoundingClientRect().width / el.offsetWidth || 1) + gap * (ks.length - 1)
        const slack = inner - used
        if (ks.length >= 2 && slack < 1) out.push({ cls: el.className.slice(0, 90), items: ks.length, lines: Object.keys(lines).length, slack: +slack.toFixed(2) })
      }
    }
    return out
  })
  if (bad.length) { found += bad.length; console.log('TIGHT   ' + r, JSON.stringify(bad)) }
}
await browser.close()
console.log(found ? `\n  ${found} wrapping row(s) with under 1px of slack` : `\n  ${routes.length} pages, no wrapping row fits to the pixel`)
process.exit(found ? 1 : 0)
