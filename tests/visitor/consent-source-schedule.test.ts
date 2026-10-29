// node --test: consent gate, first touch and source, session idle, Chicago schedule.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { analyticsConsent, gpcSignal, visitorIdFrom } from '../../src/lib/visitor/consent.ts'
import { cleanAttribution, isIntentPath, sourceOf } from '../../src/lib/visitor/source.ts'
import { chicago, chicagoDayBounds, dailyDue, monthlyDue, previousYmd, weeklyDue } from '../../src/lib/visitor/schedule.ts'

const consent = (a: boolean) => `rti_consent=${encodeURIComponent(JSON.stringify({ v: 1, a, t: '2026-10-29T10:00:00Z' }))}`

test('consent gate: only an explicit Analytics yes counts', () => {
  assert.equal(analyticsConsent(consent(true)), true)
  assert.equal(analyticsConsent(`other=1; ${consent(true)}`), true)
  assert.equal(analyticsConsent(consent(false)), false)
  assert.equal(analyticsConsent(''), false)
  assert.equal(analyticsConsent(null), false)
  assert.equal(analyticsConsent('rti_consent=garbage'), false)
})

test('Global Privacy Control is a no', () => {
  assert.equal(gpcSignal(new Headers({ 'sec-gpc': '1' })), true)
  assert.equal(gpcSignal(new Headers()), false)
})

test('visitor cookie must be a UUID', () => {
  assert.equal(visitorIdFrom('rti_vid=3f2504e0-4f89-41d3-9a0c-0305e82c3301'), '3f2504e0-4f89-41d3-9a0c-0305e82c3301')
  assert.equal(visitorIdFrom('rti_vid=hello'), null)
  assert.equal(visitorIdFrom('rti_vid=3f2504e0-4f89-41d3-9a0c-0305e82c3301x'), null)
})

test('first touch held from page 1 survives consent on page 2 (gclid and utm kept, junk dropped)', () => {
  // What the banner bootstrap holds in sessionStorage on page 1, and the tracker sends on consent.
  const held = { gclid: 'test', utm_source: 'test', landing_page: 'https://www.recycletechnologies.com/?gclid=test&utm_source=test', referrer: 'https://www.google.com/', evil: 'x' }
  const ft = cleanAttribution(held)
  assert.equal(ft.gclid, 'test')
  assert.equal(ft.utm_source, 'test')
  assert.equal((ft as Record<string, unknown>).evil, undefined)
  assert.deepEqual(sourceOf(ft), { kind: 'ad', label: 'Google Ads' })
})

test('source buckets', () => {
  assert.equal(sourceOf({ msclkid: '1' }).label, 'Microsoft Ads')
  assert.equal(sourceOf({ fbclid: '1' }).label, 'Meta')
  assert.equal(sourceOf({ utm_medium: 'cpc', utm_source: 'linkedin' }).kind, 'ad')
  assert.equal(sourceOf({ referrer: 'https://www.google.com/' }).kind, 'organic')
  assert.deepEqual(sourceOf({ referrer: 'https://www.mprnews.org/story' }), { kind: 'referral', label: 'mprnews.org' })
  assert.equal(sourceOf({ referrer: 'https://www.recycletechnologies.com/quote/' }).kind, 'direct')
  assert.equal(sourceOf({}).kind, 'direct')
  assert.equal(sourceOf(null).kind, 'direct')
})

test('intent pages', () => {
  assert.equal(isIntentPath('/quote/'), true)
  assert.equal(isIntentPath('/request-a-pickup'), true)
  assert.equal(isIntentPath('/contact-us/'), true)
  assert.equal(isIntentPath('/battery-recycling/'), false)
})

test('7 am Chicago, across daylight saving', () => {
  // 29 Oct 2026 is CDT (UTC-5): 11:59 UTC is 6:59, 12:00 UTC is 7:00.
  assert.equal(dailyDue(null, new Date('2026-10-29T11:59:00Z')), false)
  assert.equal(dailyDue(null, new Date('2026-10-29T12:00:00Z')), true)
  assert.equal(dailyDue('2026-10-29', new Date('2026-10-29T20:00:00Z')), false)
  // 5 Dec 2026 is CST (UTC-6): 7:00 is 13:00 UTC.
  assert.equal(dailyDue(null, new Date('2026-12-05T12:30:00Z')), false)
  assert.equal(dailyDue(null, new Date('2026-12-05T13:00:00Z')), true)
  // Late at night UTC is still the day before in Chicago.
  assert.equal(chicago(new Date('2026-10-30T03:00:00Z')).ymd, '2026-10-29')
})

test('weekly on Monday, monthly once', () => {
  assert.equal(weeklyDue(null, new Date('2026-11-02T13:00:00Z')), true)   // Monday 7:00 CST
  assert.equal(weeklyDue(null, new Date('2026-11-03T13:00:00Z')), false)  // Tuesday
  assert.equal(weeklyDue('2026-11-02', new Date('2026-11-02T18:00:00Z')), false)
  assert.equal(monthlyDue('2026-10', new Date('2026-10-29T12:00:00Z')), false)
  assert.equal(monthlyDue('2026-10', new Date('2026-11-01T12:00:00Z')), true)
})

test('Chicago day bounds and yesterday', () => {
  const { start, end } = chicagoDayBounds('2026-10-29')
  assert.equal(start.toISOString(), '2026-10-29T05:00:00.000Z')
  assert.equal(end.toISOString(), '2026-10-30T05:00:00.000Z')
  assert.equal(chicagoDayBounds('2026-12-05').start.toISOString(), '2026-12-05T06:00:00.000Z')
  assert.equal(previousYmd('2026-11-01'), '2026-10-31')
})
