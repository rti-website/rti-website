/**
 * Every link and button on every page, tested for whether a click actually
 * reaches it. Written 22 Sep 2026 after the closing CTA's decorative gradient
 * was found swallowing the clicks on every page's final two buttons — a bug
 * that is invisible in a screenshot and that no amount of reading the data
 * files would have caught.
 *
 *   node scripts/check-clickable.mjs --port 3291 [--width 1660]
 *
 * A control is BLOCKED when document.elementFromPoint at its centre returns
 * something that is neither the control nor inside it. Hidden controls, and
 * controls scrolled out of reach, are skipped rather than reported.
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d }
const PORT = arg('port', '3000')
const WIDTH = Number(arg('width', '1660'))
const BASE = `http://localhost:${PORT}`

/** Every static route in the app, at any depth — same walk as check-overlaps. */
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
const ROUTES = ['/', ...findRoutes(path.join(process.cwd(), 'src', 'app')).sort().map((r) => `/${r}/`),
  // A sample of the location pages ([site]/[service] folders), 24 Sep 2026.
  '/locations/phoenix-az/', '/locations/phoenix-az/battery-recycling/', '/minnesota-recycling/battery-recycling/']
  .filter((r) => !r.startsWith('/admin') && !r.startsWith('/api'))

const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
})
const p = await b.newPage({ viewport: { width: WIDTH, height: 1000 } })
let blocked = 0, checked = 0

for (const route of ROUTES) {
  await p.goto(BASE + route, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(250)
  const bad = await p.evaluate(() => {
    const out = []
    const controls = document.querySelectorAll('a[href], button')
    for (const el of controls) {
      const r0 = el.getBoundingClientRect()
      if (r0.width < 2 || r0.height < 2) continue          // hidden / collapsed
      if (getComputedStyle(el).visibility === 'hidden') continue
      el.scrollIntoView({ block: 'center' })
      const r = el.getBoundingClientRect()
      if (r.top < 0 || r.bottom > innerHeight) continue     // could not be brought into view
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
      if (!hit || hit === el || el.contains(hit) || hit.contains(el)) continue
      out.push({
        text: (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 34),
        by: hit.tagName.toLowerCase() + (hit.className ? '.' + String(hit.className).replace(/\s+/g, '.').slice(0, 48) : ''),
      })
    }
    return out
  })
  const n = await p.evaluate(() => document.querySelectorAll('a[href], button').length)
  checked += n
  if (bad.length) {
    blocked += bad.length
    console.log(`BLOCKED  ${route}`)
    for (const x of bad) console.log(`           "${x.text}"  ←  ${x.by}`)
  } else {
    console.log(`ok       ${route}`)
  }
}
await b.close()
console.log(`\n  ${ROUTES.length} pages, ${checked} controls, ${blocked} blocked`)
process.exit(blocked ? 1 : 0)
