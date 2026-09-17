/**
 * Full-page screenshot of one route. QA only.
 *   node scripts/shot-page.mjs http://127.0.0.1:3321 /itad-recycling-guides/ out.png
 */
import { chromium } from 'playwright'
const [base = 'http://127.0.0.1:3321', route = '/', out = '/tmp/page.png'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH })
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
await page.goto(base + route, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1500)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log('wrote', out)
