// node --test: the lead's attribution from the cookie or the form (4 Nov 2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cleanAttribution, hasCampaign, pickAttribution } from '../src/lib/attribution.ts'

test('cleanAttribution keeps known keys only, trimmed and capped', () => {
  assert.deepEqual(cleanAttribution({ gclid: ' abc ', evil: 'x', utm_source: '', landing_page: 'https://a/'.padEnd(900, 'x') })?.gclid, 'abc')
  assert.equal(cleanAttribution({ evil: 'x' }), null)
  assert.equal(cleanAttribution(null), null)
  assert.equal(cleanAttribution({ landing_page: 'x'.repeat(900) })?.landing_page?.length, 500)
})

test('pickAttribution: the form wins when it has a campaign, never a mix', () => {
  const cookie = { utm_source: 'linkedin', landing_page: 'https://www.recycletechnologies.com/' }
  const formAd = { gclid: 'G1', landing_page: 'https://www.recycletechnologies.com/quote/?gclid=G1' }
  const formPlain = { landing_page: 'https://www.recycletechnologies.com/about/' }
  assert.deepEqual(pickAttribution(cookie, formAd), formAd)
  assert.deepEqual(pickAttribution(cookie, formPlain), cookie)
  assert.deepEqual(pickAttribution(null, formPlain), formPlain)
  assert.deepEqual(pickAttribution(null, formAd), formAd)
  assert.equal(pickAttribution(null, null), null)
  assert.equal(hasCampaign(formPlain), false)
  assert.equal(hasCampaign(formAd), true)
})
