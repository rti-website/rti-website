#!/usr/bin/env node
/**
 * Drives the admin end to end in a real browser: the dialogs, deleting a post,
 * the category screen, and uploading a file and getting it back out again.
 *
 * !! IT WRITES TO WHATEVER DATABASE THE SERVER IS POINTED AT. It creates a post
 * and a category and then deletes them, uploads files it then deletes, and it
 * cannot tell a scratch database from a real one. Hence --i-know. Never aim it
 * at anything you would mind losing a row from.
 *
 *   npm run build && npx next start -p 3400
 *   node scripts/check-admin.mjs --port 3400 --email you@example.com --password ... --i-know
 *
 * Needs some sample images to upload; it makes its own in a temp folder.
 */
import { chromium } from 'playwright'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}
if (!process.argv.includes('--i-know')) {
  console.error(`
  This test creates and deletes rows in the database the server is using.
  Point it at a scratch database, then pass --i-know.
`)
  process.exit(2)
}

const PORT = arg('port', '3000')
const EMAIL = arg('email')
const PASSWORD = arg('password')
if (!EMAIL || !PASSWORD) { console.error('  --email and --password are required.'); process.exit(2) }

const BASE = `http://localhost:${PORT}`
const SHOTS = arg('shots', path.join(tmpdir(), 'rti-admin-shots'))
mkdirSync(SHOTS, { recursive: true })

/* Test files, made here so the script has no fixtures to lose. A 1x1 PNG, a
   minimal JPEG, and an SVG that must be refused. */
const FIX = mkdtempSync(path.join(tmpdir(), 'rti-fix-'))
const b64 = (s) => Buffer.from(s, 'base64')
writeFileSync(path.join(FIX, 'one.png'), b64('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='))
writeFileSync(path.join(FIX, 'two.png'), b64('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR4nGP8//8/AzbAhFVUL4UAxJ0DActs0zYAAAAASUVORK5CYII='))
writeFileSync(path.join(FIX, 'three.png'), b64('iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAF0lEQVR4nGP8//8/AzbAhFV0VGKoSAAAyeoDAX4KcRYAAAAASUVORK5CYII='))
writeFileSync(path.join(FIX, 'refused.svg'), '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')

const shot = (p, n) => p.screenshot({ path: path.join(SHOTS, `${n}.png`), fullPage: true })
const log = (...a) => console.log('  ', ...a)
let failures = 0
const check = (label, ok) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`); if (!ok) failures++ }

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } })
const page = await ctx.newPage()
page.on('console', (m) => { if (m.type() === 'error') console.log('   [console error]', m.text()) })
page.on('dialog', async (d) => { console.log('   !! NATIVE DIALOG APPEARED:', d.type(), d.message()); failures++; await d.dismiss() })

await page.goto(`${BASE}/admin/`, { waitUntil: 'networkidle' })

/* ------------------------------------------------------------------ login */
await page.fill('#email', EMAIL)
await page.fill('#password', PASSWORD)
await page.click('button:has-text("Sign in")')
await page.waitForSelector('.a-rail', { timeout: 10000 })
check('signs in', await page.locator('.a-who strong').isVisible())
await shot(page, '01-dash')

/* --------------------------------------------- new post dialog + cancel --- */
const before = Number(await page.locator('.a-nav:has-text("Posts") .a-count').innerText())
await page.click('.a-top button:has-text("New post")')
await page.waitForSelector('.a-dlg')
check('new post opens an in-app dialog', await page.locator('.a-dlg h2:has-text("New post")').isVisible())
check('the title field has focus', await page.evaluate(() => document.activeElement?.tagName === 'INPUT'))
await shot(page, '02-newpost-dialog')
await page.fill('.a-dlgbody input', 'A post nobody wants')
await page.click('.a-dlgfoot button:has-text("Cancel")')
await page.waitForSelector('.a-dlg', { state: 'detached' })
await page.reload({ waitUntil: 'networkidle' })
await page.waitForSelector('.a-rail')
const afterCancel = Number(await page.locator('.a-nav:has-text("Posts") .a-count').innerText())
check(`Cancel creates nothing (${before} -> ${afterCancel})`, before === afterCancel)

/* escape also cancels */
await page.click('.a-top button:has-text("New post")')
await page.waitForSelector('.a-dlg')
await page.keyboard.press('Escape')
await page.waitForSelector('.a-dlg', { state: 'detached' })
check('Escape closes the dialog', true)

/* ------------------------------------------------------- create for real --- */
await page.click('.a-top button:has-text("New post")')
await page.waitForSelector('.a-dlg')
await page.fill('.a-dlgbody input', 'Delete Me Please')
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-ed', { timeout: 10000 })
check('creating opens the editor', await page.locator('.a-ed').isVisible())

/* ------------------------------------------------- link dialog in editor --- */
await page.click('.a-canvas .ProseMirror')
await page.keyboard.type('A paragraph with a link in it.')
await page.click('button[title="Insert link"]')
await page.waitForSelector('.a-dlg')
check('link button opens a dialog, not a prompt', await page.locator('.a-dlg h2:has-text("Add a link")').isVisible())
await page.fill('#link-href', 'recycletechnologies.com/services/')
check('bare domain is normalised', (await page.locator('.a-hint.a-mono').first().innerText()).includes('https://'))
await shot(page, '03-link-dialog')
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached' })
check('link inserted', await page.locator('.ProseMirror a[href*="recycletechnologies.com"]').count() > 0)

/* ----------------------------------------------- picture dialog + upload --- */
await page.click('button[title="Insert picture"]')
await page.waitForSelector('.a-dlg.wide')
check('picture button opens the library', await page.locator('.a-drop').isVisible())
await page.setInputFiles('.a-drop input[type=file]', [`${FIX}/one.png`, `${FIX}/two.png`])
await page.waitForFunction(() => document.querySelectorAll('.a-asset').length >= 2, null, { timeout: 15000 })
check('two files uploaded into the grid', await page.locator('.a-asset').count() >= 2)
check('thumbnails are real images', await page.locator('.a-asset .th img').first().isVisible())
await shot(page, '04-picture-dialog')
await page.locator('.a-asset').first().locator('button:has-text("Insert")').click()
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
check('picture inserted into the document', await page.locator('.ProseMirror img').count() > 0)
const src = await page.locator('.ProseMirror img').first().getAttribute('src')
check(`inserted src points at /uploads (${src})`, Boolean(src && src.startsWith('/uploads/')))
const served = await page.evaluate((u) => fetch(u).then((r) => r.status), src)
check(`the uploaded file is actually served (${served})`, served === 200)
await shot(page, '05-editor-with-image')

/* save, then go back */
await page.click('.a-actionbar button:has-text("Save now")')
await page.waitForTimeout(1200)
await page.click('.a-actionbar button:has-text("Back to posts")')
await page.waitForSelector('.a-sheet table')

/* --------------------------------------------------------- delete a post --- */
const row = page.locator('tr', { hasText: 'Delete Me Please' }).first()
await row.waitFor({ timeout: 8000 })
check('delete button on the row', await row.locator('.a-icobtn.stop').isVisible())
await row.locator('.a-icobtn.stop').click()
await page.waitForSelector('.a-dlg')
check('draft delete asks once', await page.locator('.a-dlg h2:has-text("Delete")').isVisible())
await shot(page, '06-delete-draft')
await page.click('.a-dlgfoot button:has-text("Delete")')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(600)
check('post gone from the list', await page.locator('tr', { hasText: 'Delete Me Please' }).count() === 0)

/* ------------------------------------------ deleting a PUBLISHED post ------ */
await page.click('.a-nav:has-text("Posts")')
await page.waitForSelector('.a-sheet table')
const pub = page.locator('tr', { hasText: 'Recycling Symbols Explained' }).first()
if (await pub.count()) {
  await pub.locator('.a-icobtn.stop').click()
  await page.waitForSelector('.a-dlg')
  const txt = await page.locator('.a-dlgintro').innerText()
  check('published delete warns about the live URL', /live/i.test(txt))
  check('delete is disabled until a destination is given',
    await page.locator('.a-dlgfoot button:has-text("Delete post")').isDisabled())
  await shot(page, '07-delete-published')
  await page.click('.a-dlgfoot button:has-text("Cancel")')
  await page.waitForSelector('.a-dlg', { state: 'detached' })
} else { check('published post present to test against', false) }

/* ------------------------------------------------------------ categories --- */
await page.click('.a-nav:has-text("Categories")')
await page.waitForSelector('.a-sheet table')
check('Add category button (not New post)', await page.locator('button:has-text("Add category")').isVisible())
check('no New post button on this screen', await page.locator('.a-top button:has-text("New post")').count() === 0)
await page.click('button:has-text("Add category")')
await page.waitForSelector('.a-dlg')
const stamp = Date.now().toString(36).slice(-4)
await page.fill('#cat-name', `Battery & Hazardous ${stamp}`)
await page.waitForTimeout(150)
const slugVal = await page.locator('#cat-slug').inputValue()
check(`slug follows the name (${slugVal})`, slugVal === `battery-hazardous-${stamp}`)
await shot(page, '08-add-category')
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(600)
check('category appears in the table', await page.locator('tr', { hasText: `Battery & Hazardous ${stamp}` }).count() > 0)

const crow = page.locator('tr', { hasText: `Battery & Hazardous ${stamp}` }).first()
await crow.locator('.a-icobtn').first().click()
await page.waitForSelector('.a-dlg')
await page.fill('#cat-name', `Battery Renamed ${stamp}`)
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(600)
check('category renamed', await page.locator('tr', { hasText: `Battery Renamed ${stamp}` }).count() > 0)

await page.locator('tr', { hasText: `Battery Renamed ${stamp}` }).first().locator('.a-icobtn.stop').click()
await page.waitForSelector('.a-dlg')
await page.click('.a-dlgfoot button:has-text("Delete")')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(600)
check('category deleted', await page.locator('tr', { hasText: `Battery Renamed ${stamp}` }).count() === 0)
await shot(page, '09-categories')

/* ----------------------------------------------------------- media screen -- */
await page.click('.a-nav:has-text("Media")')
await page.waitForSelector('.a-drop')
check('media screen has the upload box', await page.locator('.a-drop').isVisible())
check('no New post button on media either', await page.locator('.a-top button:has-text("New post")').count() === 0)
await page.setInputFiles('.a-drop input[type=file]', `${FIX}/three.png`)
await page.waitForSelector('.a-dlg h2:has-text("Alt text")', { timeout: 15000 })
check('after one upload it asks for alt text', true)
await page.fill('#alt-text', 'A teal test rectangle')
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await shot(page, '10-media')

const firstAsset = page.locator('.a-asset').first()
await firstAsset.locator('button:has-text("Delete")').click()
await page.waitForSelector('.a-dlg')
await page.click('.a-dlgfoot button:has-text("Delete")')
await page.waitForTimeout(1200)
check('media delete works', !(await page.locator('.a-dlg').isVisible().catch(() => false)))

/* ------------------------------------------------------------ rejection ---- */
await page.setInputFiles('.a-drop input[type=file]', `${FIX}/refused.svg`)
await page.waitForFunction(() => document.querySelector('.a-toast')?.classList.contains('show'), null, { timeout: 6000 }).catch(() => {})
const toast = await page.locator('.a-toast').innerText()
check(`SVG refused (${toast.slice(0, 70)})`, /not allowed/i.test(toast))

/* the link with nothing selected, which used to silently do nothing */
await page.click('.a-nav:has-text("Posts")')
await page.waitForSelector('.a-sheet table tbody tr.a-click')
await page.locator('.a-sheet table tbody tr.a-click').first().click()
await page.waitForSelector('.a-ed')
await page.click('.a-canvas .ProseMirror')
await page.keyboard.press('End')
await page.click('button[title="Insert link"]')
await page.waitForSelector('.a-dlg')
check('with no selection it asks for the words', await page.locator('#link-text').isVisible())
await page.fill('#link-href', '/services/')
await page.fill('#link-text', 'our ITAD services')
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached' })
check('link inserted with no selection',
  await page.locator('.ProseMirror a[href="/services/"]:has-text("our ITAD services")').count() > 0)
await shot(page, '11-link-no-selection')


/* ==========================================================================
 * Round three — the editor rework: H1 title, contained scroll, canonical and
 * featured image, the toolbar menus, the selection bubble, the date filter,
 * sub-categories and adding an author.
 * ====================================================================== */

await page.click('.a-nav:has-text("All Posts")')
await page.waitForSelector('tr.a-click')
check('the nav says All Posts', await page.locator('.a-nav:has-text("All Posts")').count() > 0)

/* ---- the date filter ---- */
await page.selectOption('select[aria-label="Filter by date"]', '7d')
await page.waitForTimeout(500)
const recent = await page.locator('tr.a-click').count()
await page.selectOption('select[aria-label="Filter by date"]', 'custom')
check('a custom range offers two dates', await page.locator('.a-daterange input[type=date]').count() === 2)
await page.fill('.a-daterange input >> nth=0', '2020-01-01')
await page.waitForTimeout(500)
const since2020 = await page.locator('tr.a-click').count()
check(`the date filter actually filters (7d: ${recent}, since 2020: ${since2020})`, since2020 >= recent)
await shot(page, '20-datefilter')
await page.click('button:has-text("Clear filters")')
await page.waitForTimeout(400)

/* ---- into a post ---- */
await page.locator('tr.a-click').first().click()
await page.waitForSelector('.a-ed', { timeout: 15000 })
await page.waitForTimeout(600)

/* ---- the scroll lives inside the panel, not the page ---- */
const scroll = await page.evaluate(() => {
  const over = (s) => { const el = document.querySelector(s); return el ? el.scrollHeight > el.clientHeight + 2 : false }
  return {
    page: document.documentElement.scrollHeight > document.documentElement.clientHeight + 2,
    column: over('.a-edmid'),
    canvas: over('.a-canvas'),
  }
})
check('the page itself does not scroll', scroll.page === false)
check('the writing column itself does not scroll', scroll.column === false)
check('the scroll is inside the writing box', scroll.canvas === true)

/* Nothing above the writing box may move when the article scrolls: not the
   title, not the meta fields, not the toolbar. They are panes, not content. */
const fixedBefore = await page.evaluate(() => ({
  title: document.querySelector('#articleTitle').getBoundingClientRect().top,
  toolbar: document.querySelector('.a-toolbar').getBoundingClientRect().top,
  actions: document.querySelector('.a-actionbar').getBoundingClientRect().top,
}))
await page.locator('.a-canvas').evaluate((el) => el.scrollTo(0, el.scrollHeight))
await page.waitForTimeout(350)
const fixedAfter = await page.evaluate(() => ({
  title: document.querySelector('#articleTitle').getBoundingClientRect().top,
  toolbar: document.querySelector('.a-toolbar').getBoundingClientRect().top,
  actions: document.querySelector('.a-actionbar').getBoundingClientRect().top,
}))
for (const k of ['title', 'toolbar', 'actions']) {
  check(`the ${k} does not move when the article scrolls`,
    Math.abs(fixedBefore[k] - fixedAfter[k]) < 2)
}
await page.locator('.a-canvas').evaluate((el) => el.scrollTo(0, 0))
await page.waitForTimeout(200)

/* ---- the title is an editable H1 ---- */
check('the title is labelled H1', await page.locator('.a-h1tag:has-text("H1")').isVisible())
await page.fill('#articleTitle', 'Edited From Inside The Post')
await page.waitForTimeout(1800)
check('editing the title saves',
  (await page.locator('.a-status').innerText()).toLowerCase().includes('saved'))
check('the outline rail shows it as the H1',
  (await page.locator('.a-outline li.lv1').innerText()).includes('Edited From Inside'))

/* ---- canonical ---- */
await page.fill('#canonical', 'https://example.com/original/')
await page.waitForTimeout(1800)
/* Leave the post and come back rather than reloading the browser: the admin is
   one page with no routing, so a reload lands on the Overview and the post is
   not open any more. Reopening proves the same thing — it came from the
   database — without asserting a route that does not exist. */
await page.click('.a-actionbar button:has-text("Back to posts")')
await page.waitForSelector('tr.a-click')
await page.locator('tr.a-click').first().click()
await page.waitForSelector('.a-ed', { timeout: 15000 })
await page.waitForTimeout(800)
check('canonical URL is stored',
  (await page.locator('#canonical').inputValue()) === 'https://example.com/original/')
await page.fill('#canonical', '')
await page.waitForTimeout(1600)

/* ---- featured image ---- */
/* The post may already have one from an earlier run, in which case the empty
   state is replaced by the picture and a Replace button. */
if (await page.locator('.a-featuredempty').count()) await page.click('.a-featuredempty')
else await page.click('.a-edside button:has-text("Replace")')
await page.waitForSelector('.a-dlg h2:has-text("Featured image")')
await page.setInputFiles('.a-drop input[type=file]', `${FIX}/one.png`)
await page.waitForFunction(() => document.querySelectorAll('.a-asset').length > 0, null, { timeout: 15000 })
await page.waitForTimeout(400)
await page.locator('.a-asset').first().locator('button:has-text("Insert")').click()
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(1800)
check('a featured image can be set', await page.locator('.a-featured img').isVisible())
await shot(page, '21-featured')

/* ---- toolbar menus ---- */
await page.click('.a-canvas .ProseMirror p')
await page.click('button[aria-label="Alignment"]')
await page.waitForSelector('.a-menupanel')
const panelBox = await page.locator('.a-menupanel').boundingBox()
check('a menu panel is not clipped by the scrolling column',
  Boolean(panelBox && panelBox.width > 100 && panelBox.height > 40))
check('the menu panel is painted, not bare text',
  await page.locator('.a-menupanel').evaluate((el) => {
    const bg = getComputedStyle(el).backgroundColor
    return bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent'
  }))
await page.click('.a-menupanel button:has-text("Right")')
await page.waitForTimeout(300)
check('alignment applies', await page.locator('.ProseMirror [style*="text-align: right"]').count() > 0)
await page.click('button[aria-label="Alignment"]')
await page.click('.a-menupanel button:has-text("Left")')
await page.waitForTimeout(250)

await page.click('button[aria-label="Line spacing"]')
await page.waitForSelector('.a-menupanel')
await page.waitForTimeout(250)
await shot(page, '22-spacing')
await page.click('.a-menupanel button:has-text("Double")')
await page.waitForTimeout(300)
check('line spacing applies', await page.locator('.ProseMirror [style*="line-height"]').count() > 0)

/* bullet markers */
await page.click('.a-canvas .ProseMirror p')
await page.click('button[aria-label="Bulleted list"]')
await page.waitForTimeout(250)
await page.click('button[aria-label="Bullet style"]')
await page.waitForSelector('.a-menupanel.grid')
await page.waitForTimeout(250)
await shot(page, '23-bullets')
await page.locator('.a-menupanel .a-menutile').nth(2).click()
await page.waitForTimeout(300)
check('a bullet marker is written onto the list',
  await page.locator('.ProseMirror ul[style*="list-style-type"]').count() > 0)

/* numbered markers */
await page.click('button[aria-label="Numbered list"]')
await page.waitForTimeout(250)
await page.click('button[aria-label="Numbering style"]')
await page.waitForSelector('.a-menupanel.grid')
await page.locator('.a-menupanel .a-menutile').nth(1).click()
await page.waitForTimeout(300)
check('a numbering style is written onto the list',
  await page.locator('.ProseMirror ol[style*="lower-alpha"]').count() > 0)
await page.click('button[aria-label="Numbered list"]')
await page.waitForTimeout(250)

/* table */
await page.click('button[aria-label="Table"]')
await page.waitForSelector('.a-menupanel')
await page.click('.a-menupanel button:has-text("Insert table")')
await page.waitForTimeout(400)
check('a table is inserted', await page.locator('.ProseMirror table').count() > 0)
await page.locator('.ProseMirror table td').first().click()
await page.click('button[aria-label="Table"]')
await page.waitForSelector('.a-menupanel')
check('inside a table the menu offers rows and columns',
  await page.locator('.a-menupanel button:has-text("Insert row below")').isVisible())
await shot(page, '24-table')
const rowsBefore = await page.locator('.ProseMirror table tr').count()
await page.click('.a-menupanel button:has-text("Insert row below")')
await page.waitForTimeout(300)
check('a row can be added', await page.locator('.ProseMirror table tr').count() === rowsBefore + 1)
await page.locator('.ProseMirror table td').first().click()
await page.click('button[aria-label="Table"]')
await page.click('.a-menupanel button:has-text("Delete table")')
await page.waitForTimeout(300)

/* ---- the bubble on a selection ---- */
await page.click('.a-canvas .ProseMirror p')
await page.keyboard.down('Shift')
for (let i = 0; i < 20; i++) await page.keyboard.press('ArrowRight')
await page.keyboard.up('Shift')
await page.waitForTimeout(600)
check('selecting text raises the formatting bar', await page.locator('.a-bubble').isVisible())
check('it names the font and size of the selection',
  /px/.test(await page.locator('.a-bubblefacts').innerText()))
await shot(page, '25-bubble')

/* ---- full screen and preview ---- */
await page.click('button:has-text("Full screen")')
await page.waitForTimeout(400)
check('full screen hides the outline rail', !(await page.locator('.a-edrail').isVisible()))
check('full screen KEEPS the settings rail', await page.locator('.a-edside').isVisible())
await shot(page, '26-fullscreen')
await page.keyboard.press('Escape')
await page.waitForTimeout(350)
check('Escape leaves full screen', await page.locator('.a-edrail').isVisible())

await page.click('button:has-text("Preview")')
await page.waitForSelector('.a-article', { timeout: 8000 })
check('preview renders the post as an article', await page.locator('.a-article h1').isVisible())
check('the preview uses the featured image', await page.locator('.a-article img.hero').count() > 0)
check('lists keep their bullets in the preview',
  await page.locator('.a-article ul').evaluate((el) => getComputedStyle(el).listStyleType !== 'none')
    .catch(() => true))
await shot(page, '27-preview')
await page.keyboard.press('Escape')
await page.waitForSelector('.a-ed', { timeout: 8000 })

/* ---- adding an author from the post ---- */
await page.click('button[title="Add an author"]')
await page.waitForSelector('.a-dlg h2:has-text("Add an author")')
const who = `Test Byline ${Date.now().toString(36)}`
await page.fill('#authorName', who)
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(600)
check('the new author is selected on the post',
  (await page.locator('#author option:checked').innerText()) === who)
await shot(page, '28-author')

/* ---- sub-categories ---- */
await page.click('.a-nav:has-text("Categories")')
await page.waitForSelector('.a-sheet table')
await page.click('button:has-text("Add category")')
await page.waitForSelector('.a-dlg')
check('the dialog asks for a main category', await page.locator('#cat-parent').isVisible())
const parentName = await page.locator('#cat-parent option').nth(1).innerText()
await page.selectOption('#cat-parent', { index: 1 })
await page.fill('#cat-name', `Lithium Battery ${stamp}`)
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(700)
const subRow = page.locator('tr', { hasText: `Lithium Battery ${stamp}` }).first()
check('the sub-category is marked as one', (await subRow.getAttribute('class'))?.includes('a-sub') === true)
check('it names its main category', (await subRow.innerText()).includes(parentName))
await shot(page, '29-subcategory')
await subRow.locator('.a-icobtn.stop').click()
await page.waitForSelector('.a-dlg')
await page.click('.a-dlgfoot button:has-text("Delete")')
await page.waitForTimeout(900)
check('the sub-category can be deleted',
  await page.locator('tr', { hasText: `Lithium Battery ${stamp}` }).count() === 0)


/* ---- the page must not be able to slide sideways ----
   `overflow: hidden; overflow-x: visible` computes overflow-x to `auto`, which
   let one stray gesture push the navigation off the left edge and leave it
   there. This is the check that would have caught it. */
const sideways = await page.evaluate(() => {
  const before = document.querySelector('.a-rail').getBoundingClientRect().left
  window.scrollTo(400, 0)
  return {
    overflowX: getComputedStyle(document.body).overflowX,
    canScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    railMoved: Math.abs(document.querySelector('.a-rail').getBoundingClientRect().left - before) > 1,
  }
})
check(`the body cannot scroll horizontally (overflow-x: ${sideways.overflowX})`,
  sideways.overflowX !== 'auto' && sideways.overflowX !== 'scroll')
check('nothing overflows the window width', sideways.canScroll === false)
check('the navigation stays put when the page is pushed sideways', sideways.railMoved === false)

/* ---- a main category can be created from inside the sub-category dialog ---- */
await page.click('.a-nav:has-text("Categories")')
await page.waitForSelector('.a-sheet table')
await page.click('button:has-text("Add category")')
await page.waitForSelector('.a-dlg')
await page.selectOption('#cat-parent', '__new')
await page.waitForSelector('#cat-newparent')
check('the dialog becomes a sub-category dialog',
  await page.locator('.a-dlg h2:has-text("Add a sub-category")').isVisible())
check('the name field is labelled Sub-category name',
  (await page.locator('label[for="cat-name"]').innerText()).toLowerCase().includes('sub-category'))
await page.fill('#cat-newparent', `Hazardous ${stamp}`)
await page.fill('#cat-name', `Lithium ${stamp}`)
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 10000 })
await page.waitForTimeout(900)
check('the new main category was created',
  await page.locator('tr', { hasText: `Hazardous ${stamp}` }).count() > 0)
const madeSub = page.locator('tr', { hasText: `Lithium ${stamp}` }).first()
check('the sub-category sits under it',
  (await madeSub.innerText()).includes(`Hazardous ${stamp}`))
await shot(page, '30-newmaincategory')
/* tidy up: the child first, because a parent with children cannot be deleted */
await madeSub.locator('.a-icobtn.stop').click()
await page.waitForSelector('.a-dlg')
await page.click('.a-dlgfoot button:has-text("Delete")')
await page.waitForTimeout(900)
await page.locator('tr', { hasText: `Hazardous ${stamp}` }).first().locator('.a-icobtn.stop').click()
await page.waitForSelector('.a-dlg')
await page.click('.a-dlgfoot button:has-text("Delete")')
await page.waitForTimeout(900)
check('both can be removed again',
  await page.locator('tr', { hasText: `Hazardous ${stamp}` }).count() === 0)


/* ---- the media screen has side margins ---- */
await page.click('.a-nav:has-text("Media")')
await page.waitForSelector('.a-drop')
await page.waitForTimeout(400)
const gutters = await page.evaluate(() => {
  const rail = document.querySelector('.a-rail').getBoundingClientRect()
  const drop = document.querySelector('.a-drop').getBoundingClientRect()
  return { left: Math.round(drop.left - rail.right), right: Math.round(window.innerWidth - drop.right) }
})
check(`the media screen is inset from both edges (${gutters.left}px / ${gutters.right}px)`,
  gutters.left >= 24 && gutters.right >= 24)
await shot(page, '31-mediagutters')

/* ---- alt text on a picture in the article ---- */
await page.click('.a-nav:has-text("All Posts")')
await page.waitForSelector('tr.a-click')
await page.locator('tr.a-click').first().click()
await page.waitForSelector('.a-ed', { timeout: 15000 })
await page.waitForTimeout(600)

/* the featured image card offers a description even with no picture chosen */
if (await page.locator('.a-featuredempty').count()) {
  check('the empty featured image card still asks for alt text',
    await page.locator('#featuredAltEmpty').isVisible())
} else {
  check('the featured image card asks for alt text',
    await page.locator('#featuredAlt').isVisible())
}

/* insert a picture, then describe it from inside the article */
await page.click('.a-canvas .ProseMirror p')
await page.keyboard.press('End')
await page.click('button[title="Insert picture"]')
await page.waitForSelector('.a-dlg.wide')
await page.setInputFiles('.a-drop input[type=file]', `${FIX}/three.png`)
await page.waitForFunction(() => document.querySelectorAll('.a-asset').length > 0, null, { timeout: 15000 })
await page.waitForTimeout(400)
await page.locator('.a-asset').first().locator('button:has-text("Insert")').click()
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(500)

await page.locator('.ProseMirror img').first().click()
await page.waitForTimeout(600)
check('selecting a picture offers alt text',
  await page.locator('.a-bubble button:has-text("alt text")').isVisible())
await shot(page, '32-imagealt')
await page.click('.a-bubble button:has-text("alt text")')
await page.waitForSelector('.a-dlg')
await page.fill('.a-dlgbody textarea', 'A hard drive shredder on the Blaine line')
await page.click('.a-dlgfoot .a-btn.p')
await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 8000 })
await page.waitForTimeout(400)
check('the alt text lands on the image',
  await page.locator('.ProseMirror img[alt="A hard drive shredder on the Blaine line"]').count() > 0)
/* The field is called "alt text", not "description" — that wording was asked
   about twice, because every other tool a writer uses calls it alt text. */
check('nothing calls alt text a description',
  (await page.locator('.a-edside').innerText()).toLowerCase().includes('alt text'))
/* and it survives the save, which is the part that matters */
await page.click('.a-actionbar button:has-text("Save now")')
await page.waitForTimeout(1600)
await page.click('.a-actionbar button:has-text("Back to posts")')
await page.waitForSelector('tr.a-click')
await page.locator('tr.a-click').first().click()
await page.waitForSelector('.a-ed', { timeout: 15000 })
await page.waitForTimeout(900)
check('the alt text is still there after a save',
  await page.locator('.ProseMirror img[alt="A hard drive shredder on the Blaine line"]').count() > 0)


/* ---- a failed read shows a line, not a crash ----
   A network failure inside a useEffect used to surface as a full-screen
   "Failed to fetch" runtime error that took the editor with it. */
let blewUp = false
page.once('pageerror', () => { blewUp = true })
await page.route('**/api/admin/media/**', (route) => route.abort())
await page.click('.a-nav:has-text("Media")')
await page.waitForTimeout(1200)
check('a failed load shows a retry instead of crashing',
  !blewUp && await page.locator('.a-err button:has-text("Try again")').isVisible())
await shot(page, '33-failedload')
await page.unroute('**/api/admin/media/**')
await page.click('.a-err button:has-text("Try again")')
await page.waitForSelector('.a-drop')
await page.waitForTimeout(800)
check('Try again recovers', (await page.locator('.a-err').count()) === 0)


/* ==========================================================================
 * Imported WordPress posts — only if the import has been run against this
 * database. Skipped otherwise rather than failed: a fresh install has none.
 * ====================================================================== */
await page.click('.a-nav:has-text("All Posts")')
await page.waitForSelector('tr.a-click')
const importedRow = page.locator('tr.a-click').filter({ hasText: 'Sample Post' }).first()

if (await importedRow.count()) {
  await importedRow.click()
  await page.waitForSelector('.a-ed', { timeout: 15000 })
  await page.waitForTimeout(1200)

  check('an imported post opens read-only', await page.locator('.a-importedbar').isVisible())
  check('the rich-text canvas is hidden for it', !(await page.locator('.a-canvas').isVisible()))
  check('its original markup is on screen',
    (await page.locator('.a-importedbody').innerHTML()).length > 200)

  /* !! THE ONE THAT MATTERS. Editing the TITLE of an unconverted post must not
     touch the article. The first version of this guard tested the incoming
     document for emptiness, and Tiptap's empty document is one blank paragraph
     — so it passed, and typing in the title box overwrote a live article with
     "<p></p>". This is the check that would have caught it. */
  const before = await page.evaluate(async () => {
    const r = await fetch('/api/admin/posts/' + location.hash.slice(1) + '/')
    return null
  }).catch(() => null)
  const bodyLen = () => page.locator('.a-importedbody').innerHTML().then((h) => h.length)
  const lenBefore = await bodyLen()
  await page.fill('#articleTitle', 'Touched By The Test Suite')
  await page.waitForTimeout(2400)
  check('editing the title of an imported post leaves the article alone',
    (await bodyLen()) === lenBefore)
  check('and it says the body was not written',
    /still the WordPress original/i.test(await page.locator('.a-toast').innerText().catch(() => '')))
  await shot(page, '34-imported')

  await page.click('button:has-text("Convert to edit")')
  await page.waitForSelector('.a-dlg')
  check('converting warns what will be dropped',
    (await page.locator('.a-dlgtext').innerText()).toLowerCase().includes('dropped'))
  await page.click('.a-dlgfoot .a-btn.stop')
  await page.waitForSelector('.a-dlg', { state: 'detached', timeout: 12000 })
  await page.waitForTimeout(1800)
  check('after converting the editor takes over', await page.locator('.a-canvas').isVisible())
  check('the article text survived the conversion',
    (await page.locator('.ProseMirror').innerText()).length > 100)
} else {
  log('(no imported posts in this database — skipping the WordPress checks)')
}

console.log(failures === 0 ? `\nALL CHECKS PASSED  ·  screenshots in ${SHOTS}` : `\n${failures} CHECK(S) FAILED`)
await browser.close()
process.exit(failures === 0 ? 0 : 1)
