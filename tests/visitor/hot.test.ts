// node --test: the hot lead flag (management, 30 Oct 2026; src/lib/visitor/hot.ts).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HOT_MIN_VISITS, hotReasons, hotText, isServicePath } from '../../src/lib/visitor/hot.ts'

test('service pages: the hubs, their state and Chicago pages; not location pages', () => {
  for (const p of ['/electronic-recycle/', '/battery-recycling/', '/battery-recycling/Chicago/', '/light-bulbs/Minnesota/',
    '/paper-shredding-services/', '/hard-drive-destruction-services/', '/it-asset-disposition/', '/universal-waste-recycling/Wisconsin/',
    '/minnesota-recycling/battery-recycling/', '/wisconsin-recycling/paper-shredding/', '/battery-recycling-chicago/', '/paper-shredding-chicago',
    '/services/', '/mail-in-recycling/']) {
    assert.equal(isServicePath(p), true, p)
  }
  for (const p of ['/', '/quote/', '/about-us-commercial-recycling-solutions/', '/minnesota-recycling/', '/minnesota-recycling/duluth/',
    '/wisconsin-recycling/battery-recycling-milwaukee/', '/battery-recycling-des-moines/', '/shredding-wisconsin/milwaukee/', '/blog/']) {
    assert.equal(isServicePath(p), false, p)
  }
})

test('hot: quote page, pickup or contact, a service page, or came back', () => {
  assert.deepEqual(hotReasons({ paths: ['/', '/quote/'], visits: 1 }), ['quote'])
  assert.deepEqual(hotReasons({ paths: ['/quote-by-location'], visits: 1 }), ['quote'])
  assert.deepEqual(hotReasons({ paths: ['/request-a-pickup/'], visits: 1 }), ['pickup'])
  assert.deepEqual(hotReasons({ paths: ['/battery-recycling/'], visits: 1 }), ['service'])
  assert.deepEqual(hotReasons({ paths: ['/'], visits: HOT_MIN_VISITS }), ['returning'])
  assert.deepEqual(hotReasons({ paths: ['/quote/', '/electronic-recycle/'], visits: 3 }), ['quote', 'service', 'returning'])
  assert.deepEqual(hotReasons({ paths: ['/', '/blog/'], visits: 1 }), [])
  assert.deepEqual(hotReasons({ paths: null, visits: 1 }), [])
})

test('not hot once they sent a form (it is an enquiry then)', () => {
  assert.deepEqual(hotReasons({ paths: ['/quote/'], visits: 4, converted: true }), [])
})

test('hot reasons in words', () => {
  assert.equal(hotText(['quote', 'returning'], 3), 'Viewed the quote page · Came back (3 visits)')
  assert.equal(hotText([], 1), '')
})
