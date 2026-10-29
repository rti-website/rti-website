#!/usr/bin/env node
/**
 * End to end check of visitor identification against a RUNNING build and its
 * LOCAL database (docs/visitor-identification/README.md, "Testing").
 *
 *   VISITOR_CAPTURE=on IP_HASH_SALT=… DATABASE_URL=postgres://…localhost… npm run build && npm start
 *   BASE=http://localhost:3000 ADMIN_USER=… ADMIN_PASS=… AGENT_USER=… AGENT_PASS=… \
 *     DATABASE_URL=… IP_HASH_SALT=… VISITOR_EXCLUDED_IPS=198.51.100.0/24 node scripts/visitor-e2e.mjs
 *
 * !! LOCAL ONLY. It writes test rows (visitors, a company, Visitor leads and a
 * test enquiry) and refuses to run unless DATABASE_URL points at localhost or
 * 127.0.0.1 and BASE is local. It removes what it made at the end.
 *
 * Covers the brief's required tests: consent gate, first touch held until
 * consent, session splitting (30 minutes idle), bot filter, Business IP
 * marking, Visitor lead creation, Visitor lead conversion on form submit, and
 * that Enquiries (list, badge) and routing never see Visitor leads.
 */
import { createHash, randomUUID } from 'node:crypto'
import { Client, types } from 'pg'

const BASE = (process.env.BASE ?? 'http://localhost:3000').replace(/\/$/, '')
const DB = process.env.DATABASE_URL ?? ''
const SALT = process.env.IP_HASH_SALT ?? ''
if (!/@(localhost|127\.0\.0\.1)[:/]/.test(DB) || !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(BASE)) {
  console.error('Local only: DATABASE_URL and BASE must point at localhost.'); process.exit(1)
}
if (!SALT) { console.error('Set IP_HASH_SALT to the same value the server has.'); process.exit(1) }

types.setTypeParser(20, (v) => Number(v)) // bigint ids as numbers, like src/lib/db.ts
const db = new Client({ connectionString: DB })
await db.connect()
const one = async (sql, args = []) => (await db.query(sql, args)).rows[0]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const CONSENT = `rti_consent=${encodeURIComponent(JSON.stringify({ v: 1, a: true, t: new Date().toISOString() }))}`
const ORIGIN = BASE
const BIZ_IP = '144.92.1.1'          // a public address; the test seeds its lookup
const OFFICE_IP = '198.51.100.5'     // inside VISITOR_EXCLUDED_IPS
const PLAIN_IP = '203.0.113.50'      // documentation range: nothing to find
const hash = (ip) => createHash('sha256').update(`${SALT}|${ip}`).digest('hex')

let pass = 0, fail = 0
const made = { visitors: new Set(), companies: [], leads: [] }
function check(name, ok, extra = '') {
  if (ok) { pass++; console.log(`  PASS  ${name}`) } else { fail++; console.log(`  FAIL  ${name} ${extra}`) }
}

async function e(body, { cookie = CONSENT, ua = CHROME, ip = PLAIN_IP, origin = ORIGIN, headers = {} } = {}) {
  const res = await fetch(`${BASE}/api/e/`, {
    method: 'POST', redirect: 'manual',
    headers: { 'content-type': 'application/json', origin, 'user-agent': ua, 'x-forwarded-for': ip, cookie, ...headers },
    body: JSON.stringify(body),
  })
  const set = res.headers.get('set-cookie') ?? ''
  const vid = set.match(/rti_vid=([0-9a-f-]{36})/)?.[1] ?? null
  if (vid) made.visitors.add(vid)
  return { status: res.status, set, vid }
}
const pv = (path, extra = {}) => ({ t: 'pv', path, title: `Test ${path}`, ...extra })
const withVid = (vid) => `${CONSENT}; rti_vid=${vid}`

async function login(user, pass) {
  const res = await fetch(`${BASE}/api/admin/session/`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: user, password: pass }) })
  const c = res.headers.get('set-cookie')?.match(/rti_admin_session=[^;]+/)?.[0]
  if (!c) throw new Error(`login failed for ${user}: ${res.status}`)
  return c
}
const admin = async (cookie, path, init = {}) => {
  const res = await fetch(`${BASE}/api/admin${path}`, { ...init, headers: { cookie, 'content-type': 'application/json', ...(init.headers ?? {}) } })
  return { status: res.status, body: await res.json().catch(() => null) }
}

console.log(`Visitor identification e2e against ${BASE}\n`)
const before = await one('SELECT count(*)::int AS n FROM visitors')

// 1. Consent gate
let r = await e(pv('/'), { cookie: '' })
check('no consent: 204, no cookie', r.status === 204 && !r.vid)
r = await e(pv('/'), { cookie: `rti_consent=${encodeURIComponent(JSON.stringify({ v: 1, a: false, t: 'x' }))}` })
check('declined: no cookie', r.status === 204 && !r.vid)
r = await e(pv('/'), { headers: { 'sec-gpc': '1' } })
check('Global Privacy Control: no cookie', r.status === 204 && !r.vid)
r = await e(pv('/'), { origin: 'https://evil.example' })
check('other origin: 403', r.status === 403)
await sleep(400)
check('nothing stored before consent', (await one('SELECT count(*)::int AS n FROM visitors')).n === before.n)

// 2. Bot filter
r = await e(pv('/'), { ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' })
check('crawler: no cookie', !r.vid)
r = await e(pv('/'), { ua: 'Mozilla/5.0 (compatible; AhrefsBot/7.0)' })
check('AhrefsBot: no cookie', !r.vid)

// 3. First touch held until consent on page 2, then five pages = one visit
const held = { gclid: 'test', utm_source: 'test', landing_page: `${BASE}/?gclid=test&utm_source=test`, captured_at: new Date().toISOString() }
r = await e(pv('/battery-recycling/', { attr: held, ref: `${BASE}/` }))
const vid = r.vid
check('consent: rti_vid set (HttpOnly, 13 months)', Boolean(vid) && /HttpOnly/i.test(r.set) && /Max-Age=34128000/i.test(r.set), r.set)
for (const p of ['/electronic-recycle/', '/quote/', '/about-us-commercial-recycling-solutions/', '/contact-us/']) {
  await e(pv(p, { sec: 12 }), { cookie: withVid(vid) }); await sleep(150)
}
await sleep(800)
const v = await one('SELECT first_touch, visit_count, lead_id FROM visitors WHERE id = $1', [vid])
check('first touch keeps gclid and utm_source from page 1', v?.first_touch?.gclid === 'test' && v?.first_touch?.utm_source === 'test', JSON.stringify(v?.first_touch))
const vc = await one('SELECT count(*)::int AS visits, (SELECT count(*)::int FROM page_views p JOIN visits s ON s.id = p.visit_id WHERE s.visitor_id = $1) AS pages FROM visits WHERE visitor_id = $1', [vid])
check('five pages: one visit, five page views', vc.visits === 1 && vc.pages === 5, JSON.stringify(vc))
const secs = await one('SELECT count(*)::int AS n FROM page_views p JOIN visits s ON s.id = p.visit_id WHERE s.visitor_id = $1 AND p.seconds_on_page = 12', [vid])
check('seconds on the previous page recorded', secs.n === 4, JSON.stringify(secs))

// 4. Visitor lead created, not in Enquiries
const vl = await one("SELECT id, name, lead_type, visitor_status, is_business_ip FROM leads WHERE visitor_id = $1 AND lead_type = 'visitor'", [vid])
if (vl) made.leads.push(vl.id)
check('one Visitor lead, anonymous name, status new', vl && vl.name === `Anonymous visitor ${vid.replace(/-/g, '').slice(0, 8)}` && vl.visitor_status === 'new' && !vl.is_business_ip, JSON.stringify(vl))

// 5. Session splitting after 30 minutes idle
await db.query("UPDATE visits SET started_at = started_at - interval '40 minutes', ended_at = now() - interval '31 minutes' WHERE visitor_id = $1", [vid])
await e(pv('/services/'), { cookie: withVid(vid) }); await sleep(600)
check('31 minutes idle starts a second visit', (await one('SELECT count(*)::int AS n FROM visits WHERE visitor_id = $1', [vid])).n === 2)
await e(pv('/faqs/'), { cookie: withVid(vid) }); await sleep(600)
check('29 minutes later is the same visit', (await one('SELECT count(*)::int AS n FROM visits WHERE visitor_id = $1', [vid])).n === 2)

// 6. Business IP marking (the lookup is seeded; no paid call in a test)
const co = await one(`INSERT INTO companies (key, name, domain, type, city, region) VALUES ('e2e-test.example', 'E2E Test University', 'e2e-test.example', 'education', 'Madison', 'Wisconsin')
  ON CONFLICT (key) DO UPDATE SET name = excluded.name RETURNING id`)
made.companies.push(co.id)
await db.query(`INSERT INTO ip_lookups (ip_hash, classification, org_name, org_domain, org_type, city, region, country_code, company_id)
  VALUES ($1, 'business', 'E2E Test University', 'e2e-test.example', 'education', 'Madison', 'Wisconsin', 'US', $2)
  ON CONFLICT (ip_hash) DO UPDATE SET company_id = excluded.company_id, classification = 'business', looked_up_at = now()`, [hash(BIZ_IP), co.id])
r = await e(pv('/it-asset-disposition/'), { ip: BIZ_IP }); await sleep(900)
const bl = await one("SELECT id, name, company, is_business_ip FROM leads WHERE visitor_id = $1 AND lead_type = 'visitor'", [r.vid])
if (bl) made.leads.push(bl.id)
check('business network: Visitor lead marked Business IP with the company name', bl?.is_business_ip === true && bl?.name === 'E2E Test University', JSON.stringify(bl))
const bv = await one('SELECT company_id FROM visitors WHERE id = $1', [r.vid])
check('visitor linked to the company', bv?.company_id === co.id)
const bizVid = r.vid

// 7. Office IP never looked up
r = await e(pv('/'), { ip: OFFICE_IP }); await sleep(900)
const ol = await one('SELECT classification FROM ip_lookups WHERE ip_hash = $1', [hash(OFFICE_IP)])
check('office IP recorded as excluded, no lookup', ol?.classification === 'excluded', JSON.stringify(ol))
const officeVid = r.vid

// 8. No raw IP at rest in the new tables
const raw = await one(`SELECT
  (SELECT count(*) FROM ip_lookups WHERE ip_hash LIKE '%144.92%' OR ip_hash LIKE '%198.51%')
  + (SELECT count(*) FROM visits WHERE coalesce(ip_hash, '') ~ '\\d+\\.\\d+\\.\\d+\\.\\d+' OR attribution::text LIKE '%144.92.1.1%')
  + (SELECT count(*) FROM visitors WHERE first_touch::text LIKE '%144.92.1.1%')
  + (SELECT count(*) FROM leads WHERE lead_type = 'visitor' AND ip IS NOT NULL) AS n`)
check('no raw IP in visitors, visits, ip_lookups or Visitor leads', Number(raw.n) === 0, JSON.stringify(raw))

// 9. Form submit converts the Visitor lead; Enquiries unchanged
const formBefore = await one("SELECT count(*)::int AS n FROM leads WHERE lead_type = 'form'")
const form = await fetch(`${BASE}/api/leads/`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: ORIGIN, cookie: withVid(bizVid), 'x-forwarded-for': BIZ_IP, 'user-agent': CHROME },
  body: JSON.stringify({ type: 'quote', form: 'quote', firstName: 'Ee', lastName: 'Tee', email: `e2e-${randomUUID().slice(0, 6)}@example.com`,
    phone: '(763) 559-5130', company: 'E2E Test University', address: '1 Test St', city: 'Madison', state: 'WI', zip: '53706',
    service: 'Electronics Recycling', referral: 'Test', audience: 'Commercial', consent: true, message: 'E2E TEST - PLEASE IGNORE', sourcePage: '/quote/' }),
})
const fj = await form.json().catch(() => ({}))
check('form accepted', form.ok, JSON.stringify(fj))
await sleep(900)
const fl = await one("SELECT id, visitor_id FROM leads WHERE lead_type = 'form' AND message = 'E2E TEST - PLEASE IGNORE' ORDER BY id DESC LIMIT 1")
if (fl) made.leads.push(fl.id)
check('form lead remembers the visitor', fl?.visitor_id === bizVid, JSON.stringify(fl))
const conv = await one("SELECT visitor_status, converted_lead_id FROM leads WHERE visitor_id = $1 AND lead_type = 'visitor'", [bizVid])
check('Visitor lead converted and linked, no duplicate', conv?.visitor_status === 'converted' && conv?.converted_lead_id === fl?.id, JSON.stringify(conv))
check('exactly one new form lead', (await one("SELECT count(*)::int AS n FROM leads WHERE lead_type = 'form'")).n === formBefore.n + 1)
const junk = await fetch(`${BASE}/api/leads/`, { method: 'POST', headers: { 'content-type': 'application/json', origin: ORIGIN },
  body: JSON.stringify({ type: 'quote', name: 'X Y', email: 'x@example.com', phone: '7635595130', company: 'N/A', website: '' }) })
check('company name "N/A" refused', junk.status === 400)

// 10. Admin: Enquiries never shows Visitor leads; Visitors screens; roles
if (process.env.ADMIN_USER && process.env.ADMIN_PASS) {
  const a = await login(process.env.ADMIN_USER, process.env.ADMIN_PASS)
  const list = await admin(a, '/leads/')
  const ids = new Set((list.body?.leads ?? []).map((l) => l.id))
  check('Enquiries list has no Visitor leads', !made.leads.filter((id) => id !== fl?.id).some((id) => ids.has(id)) && ids.has(fl?.id), `status ${list.status} ${JSON.stringify(list.body).slice(0, 200)} made=${made.leads} form=${fl?.id}`)
  const boot = await admin(a, '/bootstrap/')
  const newForms = (await one("SELECT count(*)::int AS n FROM leads WHERE lead_type = 'form' AND status = 'new'")).n
  check('Enquiries badge counts form leads only', boot.body?.counts?.leads === newForms, `${boot.body?.counts?.leads} vs ${newForms}`)
  check('administrator may see Visitors', boot.body?.visitors === true)
  const vis = await admin(a, '/visitors/')
  check('Visitors lists the company', (vis.body?.companies ?? []).some((c) => c.id === co.id), `status ${vis.status} ${JSON.stringify(vis.body).slice(0, 300)}`)
  const leads = await admin(a, '/visitor-leads/?business=all')
  check('Visitor leads tab lists them', (leads.body?.leads ?? []).some((l) => l.visitor_id === vid))
  const hist = await admin(a, `/visitor-history/?lead=${fl?.id}`)
  check('enquiry shows the visitor history', hist.body?.company?.name === 'E2E Test University' && (hist.body?.sessions ?? []).length >= 1)
  const csv = await fetch(`${BASE}/api/admin/visitors/?format=csv`, { headers: { cookie: a } })
  check('CSV export', csv.ok && (await csv.text()).startsWith('"Company"'))
  const patchVisitor = await admin(a, '/leads/', { method: 'PATCH', body: JSON.stringify({ id: made.leads[0], status: 'won' }) })
  check('Enquiries cannot edit a Visitor lead', patchVisitor.status === 404)
  if (process.env.AGENT_USER && process.env.AGENT_PASS) {
    const g = await login(process.env.AGENT_USER, process.env.AGENT_PASS)
    check('agent cannot open Visitors', (await admin(g, '/visitors/')).status === 403)
  }
  const anon = await fetch(`${BASE}/api/admin/visitors/`)
  check('Visitors needs a login', anon.status === 401)
}

// 11. Withdrawal and flood
r = await e({ t: 'forget' }, { cookie: withVid(vid) })
check('withdrawal deletes rti_vid', /rti_vid=;/.test(r.set) && /Max-Age=0/i.test(r.set), r.set)
const fv = (await e(pv('/'), { ip: '203.0.113.77' })).vid
for (let i = 0; i < 64; i++) await e(pv(`/flood-${i}/`), { cookie: withVid(fv), ip: '203.0.113.77' })
await sleep(2500)
const fl2 = await one('SELECT count(*)::int AS n FROM page_views p JOIN visits s ON s.id = p.visit_id WHERE s.visitor_id = $1', [fv])
check('over 60 page views in 10 minutes are not stored', fl2.n <= 61, JSON.stringify(fl2))

// Clean up everything this run made.
await db.query('DELETE FROM leads WHERE id = ANY($1::bigint[])', [made.leads])
await db.query("DELETE FROM leads WHERE lead_type = 'visitor' AND visitor_id = ANY($1::uuid[])", [[...made.visitors, officeVid, fv].filter(Boolean)])
await db.query('DELETE FROM visitors WHERE id = ANY($1::uuid[])', [[...made.visitors, officeVid, fv].filter(Boolean)])
await db.query('DELETE FROM ip_lookups WHERE ip_hash = ANY($1::text[])', [[hash(BIZ_IP), hash(OFFICE_IP)]])
await db.query('DELETE FROM companies WHERE id = ANY($1::bigint[])', [made.companies])
await db.end()
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
