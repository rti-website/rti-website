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
 * subtrees and anything inside a clipping box that is not the page shell —
 * a carousel slide sitting off to the side of its own overflow-hidden track
 * is contained, and flagging it made this scan cry wolf on the homepage and
 * /services/ service-card carousels (22 Sep 2026). The check that actually
 * proves the page is sound is documentElement.scrollWidth === 390, which the
 * summary line below asserts too.
 *
 *   npx next start -p 3200 && node scripts/check-mobile-clip.mjs
 */
import { chromium } from 'playwright'

const PORT = Number(process.env.PORT || 3200)
const ROUTES = [
  '/', '/services/', '/electronic-recycle/', '/industries/', '/industries/healthcare/',
  '/contact-us/', '/about-us/', '/resources/', '/all-locations/', '/why-choose-us/',
  '/sustainability/', '/blog/', '/itad-recycling-guides/', '/compliance-center/',
  '/case-studies/', '/faqs/', '/downloads/', '/certifications/', '/light-bulbs/',
  '/tv-recycling/', '/battery-recycling/', '/ballasts/', '/hard-drive-destruction-services/',
  '/paper-shredding-services/', '/off-site-shredding/', '/phone-shredding-service/',
  '/mail-in-recycling/', '/electronics-recycling-kit/', '/airbag-recycling/', '/industries/automotive-fleet/',
  '/industries/education/', '/industries/financial-services-banking/',
  '/industries/government-municipal/', '/industries/manufacturing-industrial/',
  '/industries/retail-corporate-offices/', '/nope-404/', '/quote/',
  // The location pages (24 Sep 2026): a partner hub, a partner service page, a MN one.
  '/locations/phoenix-az/', '/locations/phoenix-az/battery-recycling/', '/minnesota-recycling/battery-recycling/',
]

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' })
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } })
const page = await ctx.newPage()
let bad = 0

for (const r of ROUTES) {
  const res = await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: 'networkidle' })
  /* Measured BEFORE the freeze below. Killing animations stops a carousel
     mid-slide, which parks a slide outside its track and makes the page look
     like it scrolls when in normal use it does not. The real-world state is
     the one that decides. */
  const scrolls = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  )

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
        // A clipping ancestor means the overflow is contained, not visible.
        // The page shell is excluded: it clips everything by design, so
        // honouring it would make this scan pass on any page at all — and
        // catching what IT hides is the whole reason this script exists.
        const clips = ['auto', 'scroll', 'hidden', 'clip'].includes(pcs.overflowX)
        const isShell = p.classList.contains('design-shell') || p.classList.contains('design-canvas')
        if (clips && !isShell) { skip = true; break }
        if (clips && isShell && p.scrollWidth > p.clientWidth + 1) { skip = true; break }
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
  if (scrolls) {
    bad++
    console.log(`CLIP ${r} (${status}) — page scrolls horizontally at 390`)
    hits.forEach((h) => console.log('   ', h))
  } else if (hits.length) {
    console.log(`ok   ${r} (${status}) — ${hits.length} element(s) outside the viewport box but contained:`)
    hits.slice(0, 2).forEach((h) => console.log('      ', h))
  } else {
    console.log(`ok   ${r} (${status})`)
  }
}
console.log(bad ? `\n${bad} route(s) scroll horizontally at 390px` : '\nno route scrolls horizontally at 390px')
await browser.close()
