/**
 * Mobile clip scan — every route at 390px, flagging any element whose box
 * falls outside the viewport.
 *
 * This exists because scrollWidth > clientWidth does NOT catch it: .design-shell
 * sets overflow-x: clip, so content that runs off the side is silently cut
 * rather than making the page scroll. A per-element bounding-rect sweep is the
 * only reliable check, and it found the unconverted 404 page and a clipped FAQ
 * eyebrow on 22 Sep 2026.
 *
 * Elements inside a fixed layer are skipped: the closed nav drawer parks one
 * viewport-width to the right and is not a defect. So are aria-hidden/inert
 * subtrees and anything inside a deliberate horizontal scroller.
 *
 *   npx next start -p 3200 && node scripts/check-mobile-clip.mjs
 */
import { chromium } from 'playwright'

const PORT = 3200
const ROUTES = [
  '/', '/services/', '/electronic-recycle/', '/industries/', '/industries/healthcare/',
  '/contact-us/', '/about-us/', '/resources/', '/all-locations/', '/why-choose-us/',
  '/sustainability/', '/blog/', '/itad-recycling-guides/', '/compliance-center/',
  '/case-studies/', '/faqs/', '/downloads/', '/certifications/', '/light-bulbs/',
  '/tv-recycling/', '/battery-recycling/', '/ballasts/', '/hard-drive-destruction-services/',
  '/paper-shredding-services/', '/off-site-shredding/', '/phone-shredding-service/',
  '/mail-in-recycling/', '/airbag-recycling/', '/industries/automotive-fleet/',
  '/industries/education/', '/industries/financial-services-banking/',
  '/industries/government-municipal/', '/industries/manufacturing-industrial/',
  '/industries/retail-corporate-offices/', '/nope-404/', '/quote/',
]

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' })
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } })
const page = await ctx.newPage()
let bad = 0

for (const r of ROUTES) {
  const res = await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: '*{animation:none !important;transition:none !important}' })
  await page.waitForTimeout(150)
  const hits = await page.evaluate(() => {
    const out = []
    const W = 390
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue
      if (cs.position === 'fixed') continue
      // ignore anything inside a deliberate horizontal scroller, inside a
      // fixed-position layer (the closed nav drawer parks one viewport to the
      // right), or inside an aria-hidden / inert subtree
      let p = el.parentElement, skip = false
      while (p && p !== document.body) {
        const pcs = getComputedStyle(p)
        if (pcs.position === 'fixed') { skip = true; break }
        if (p.hasAttribute('inert') || p.getAttribute('aria-hidden') === 'true') { skip = true; break }
        if (['auto', 'scroll', 'hidden', 'clip'].includes(pcs.overflowX) && p.scrollWidth > p.clientWidth + 1) { skip = true; break }
        p = p.parentElement
      }
      if (skip) continue
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.right > W + 1 || rect.left < -1) {
        const t = (el.textContent || '').trim().slice(0, 40)
        out.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} L${rect.left.toFixed(0)} R${rect.right.toFixed(0)} "${t}"`)
      }
    }
    return out.slice(0, 5)
  })
  const status = res.status()
  if (hits.length) { bad++; console.log(`CLIP ${r} (${status})`); hits.forEach((h) => console.log('   ', h)) }
  else console.log(`ok   ${r} (${status})`)
}
console.log(bad ? `\n${bad} route(s) with content outside 390px` : '\nno content outside 390px')
await browser.close()
