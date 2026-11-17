// node --test: state routing of website enquiries (management, 18 Nov 2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { decideRoute, routeForState, routeText, spamReason, stateFromAddress, testReason, zipFromAddress } from '../src/lib/lead-routing.ts'

const real = { name: 'Dana Miller', email: 'dana@acme-mfg.com', company: 'Acme Manufacturing', message: 'We have 40 old laptops and 200 fluorescent tubes.' }

test('MN, WI and IL go to Christine, everything else to Jason & Umer', () => {
  for (const s of ['MN', 'WI', 'IL']) assert.equal(routeForState(s), 'christine', s)
  for (const s of ['TX', 'SC', 'GA', 'FL', 'CA', 'IA', 'IN', 'MI']) assert.equal(routeForState(s), 'jason-umer', s)
  assert.equal(routeForState(null), 'jason-umer')
})

test('a real business enquiry is routed', () => {
  const d = decideRoute({ ...real, audience: 'Commercial', state: 'WI', stateFrom: 'form' })
  assert.equal(d.route, 'christine')
  assert.equal(d.skip, null)
  assert.match(routeText(d), /^WI lead \(state on the form\): MN, WI and IL go to Christine\.$/)
  const tx = decideRoute({ ...real, audience: 'Commercial', state: 'TX', stateFrom: 'zip' })
  assert.equal(tx.route, 'jason-umer')
})

test('residential, tests and spam are left unrouted but say where they would go', () => {
  const res = decideRoute({ ...real, audience: 'Residential', state: 'MN', stateFrom: 'form' })
  assert.equal(res.route, null)
  assert.equal(res.skip?.kind, 'residential')
  assert.equal(res.byState, 'christine')
  const t = decideRoute({ ...real, company: 'TEST - PLEASE IGNORE', audience: 'Commercial', state: 'TX', stateFrom: 'form' })
  assert.equal(t.route, null)
  assert.equal(t.skip?.kind, 'test')
  assert.match(routeText(t), /would have gone to Jason & Umer/)
  const s = decideRoute({ ...real, message: 'We offer SEO services to get you on the first page of Google', audience: 'Commercial', state: 'MN', stateFrom: 'form' })
  assert.equal(s.skip?.kind, 'spam')
})

test('test entries', () => {
  const yes = [
    { ...real, name: 'Test User' }, { ...real, name: 'testing' }, { ...real, company: 'Test Co please ignore' },
    { ...real, company: 'TEST - PLEASE IGNORE' }, { ...real, email: 'test@gmail.com' }, { ...real, email: 'aaqib.test@gmail.com' },
    { ...real, email: 'test123@yahoo.com' }, { ...real, email: 'rizwan.haider@99technologies.com' },
    { ...real, email: 'someone@example.com' }, { ...real, message: 'test' }, { ...real, message: 'This is a test, please ignore.' },
    { ...real, message: 'Test lead from dev' },
  ]
  for (const l of yes) assert.ok(testReason(l), JSON.stringify(l))
  const no = [
    real, { ...real, company: 'TestAmerica Laboratories' }, { ...real, company: 'Test America' }, { ...real, company: 'ABC Testing Labs' },
    { ...real, email: 'contest@acme.com' }, { ...real, email: 'testimonials@acme.com' }, { ...real, name: 'Celeste Ortiz' },
    { ...real, message: 'Do you test hard drives before shredding?' }, { ...real, message: 'We need drug testing equipment recycled.' },
  ]
  for (const l of no) assert.equal(testReason(l), null, JSON.stringify(l))
})

test('spam', () => {
  assert.ok(spamReason({ ...real, message: 'see https://a.com and https://b.com' }))
  assert.ok(spamReason({ ...real, name: 'www.cheap-seo.com' }))
  assert.ok(spamReason({ ...real, message: 'Привет, как дела' }))
  assert.ok(spamReason({ ...real, message: 'We can build backlinks for your site' }))
  assert.equal(spamReason(real), null)
  assert.equal(spamReason({ ...real, message: 'Details are on https://acme-mfg.com/assets' }), null)
})

test('the state in a one line address', () => {
  assert.equal(stateFromAddress('123 Main St, Plymouth, MN 55441'), 'MN')
  assert.equal(stateFromAddress('4500 W Lake St, Chicago, IL'), 'IL')
  assert.equal(stateFromAddress('500 Oak Ave, Dallas Texas 75201'), 'TX')
  assert.equal(stateFromAddress('22 Pine Rd, Madison, Wisconsin'), 'WI')
  assert.equal(stateFromAddress('10 Elm St, Charleston, West Virginia, USA'), 'WV')
  assert.equal(stateFromAddress('123 Washington Ave, Plymouth'), null)
  assert.equal(stateFromAddress('9 Indiana St'), null)
  assert.equal(stateFromAddress('100 Main St IN the back'), null)
  assert.equal(stateFromAddress(''), null)
  assert.equal(zipFromAddress('123 Main St, Plymouth, MN 55441-1234'), '55441')
  assert.equal(zipFromAddress('123 Main St'), null)
})
