// node --test: removing the em dash and en dash from site copy (management, 19 Nov 2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
// @ts-expect-error plain JavaScript module, no type declarations
import { undash, undashHtml, undashJson } from '../scripts/lib/no-dashes.mjs'

test('ranges read "to"', () => {
  assert.equal(undash('Mon–Fri 7:30 AM–4:00 PM'), 'Mon to Fri, 7:30 AM to 4:00 PM')
  assert.equal(undash('Monday – Friday: 7:30 am – 4:00 pm'), 'Monday to Friday: 7:30 am to 4:00 pm')
  assert.equal(undash('Saturday – Sunday: Closed'), 'Saturday to Sunday: Closed')
  assert.equal(undash('Walk-ins for 1–4 pallets.'), 'Walk-ins for 1 to 4 pallets.')
  assert.equal(undash('Founded in 1993 — 30+ years in business'), 'Founded in 1993, 30+ years in business')
})

test('sentence dashes', () => {
  assert.equal(undash('A printable checklist of what we accept — electronics, batteries, bulbs, and more — organized by category.'),
    'A printable checklist of what we accept (electronics, batteries, bulbs, and more) organized by category.')
  assert.equal(undash('Devices are dismantled into base materials — plastic, wire, circuit boards, metals, and glass.'),
    'Devices are dismantled into base materials: plastic, wire, circuit boards, metals, and glass.')
  assert.equal(undash('No more guessing where your e-waste ends up — every shipment comes back with proof.'),
    'No more guessing where your e-waste ends up. Every shipment comes back with proof.')
  assert.equal(undash('Send a quote — or set up a pickup.'), 'Send a quote, or set up a pickup.')
  assert.equal(undash('The Landing—Minnesota River Heritage Park'), 'The Landing: Minnesota River Heritage Park')
  assert.equal(undash('University of Wisconsin–Madison Arboretum'), 'University of Wisconsin Madison Arboretum')
})

test('hyphens, phone numbers and plain text are left alone', () => {
  for (const t of ['drop-off and e-waste', 'Call +1-763-559-5130', 'lithium-ion, K-12, I-35W', 'No dash here.', '—'])
    assert.equal(undash(t), t)
})

test('html and json', () => {
  assert.equal(undashHtml('<p>Fast — <a href="/a-b">easy</a></p><img alt="Old — phone" src="/x-y.png">'),
    '<p>Fast, <a href="/a-b">easy</a></p><img alt="Old, phone" src="/x-y.png">')
  assert.deepEqual(undashJson({ title: 'Drop off — fast', href: '/a—b', list: ['Mon–Fri'] }),
    { title: 'Drop off, fast', href: '/a—b', list: ['Mon to Fri'] })
})
