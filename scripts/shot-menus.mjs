/**
 * Screenshot each header dropdown, open.
 *
 * QA only — not part of the build. Run against a running server:
 *   node scripts/shot-menus.mjs http://127.0.0.1:3317 out-dir
 *
 * It has to live inside the project root: Playwright resolves its browser from
 * PLAYWRIGHT_BROWSERS_PATH relative to the process, and a script outside the
 * root cannot see node_modules.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = process.argv[2] ?? 'http://127.0.0.1:3317'
const out = process.argv[3] ?? '/tmp/menus'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH })
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
await page.goto(base, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1200)

for (const label of ['About', 'Services', 'Industries', 'Blogs']) {
  const item = page.locator(`header a:text-is("${label}"), a:text-is("${label}")`).first()
  await item.hover()
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${out}/${label.toLowerCase()}.png`, clip: { x: 0, y: 0, width: 1600, height: 640 } })

  // ...and again with the first row hovered, so the 6029:15806 hover wash is
  // in the shot. A menu whose panel has no rows (none today) is skipped.
  // Scoped to what is VISIBLE: the panels are hidden with `invisible`, never
  // unmounted, so an unscoped locator would hover a row in a closed panel.
  const row = page.locator('a.group.w-full[class*="background-image"]:visible').first()
  if (await row.count()) {
    await row.hover()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${out}/${label.toLowerCase()}-hover.png`, clip: { x: 0, y: 0, width: 1600, height: 640 } })
  }

  await page.mouse.move(800, 950)
  await page.waitForTimeout(400)
}

await browser.close()
console.log('wrote', out)
