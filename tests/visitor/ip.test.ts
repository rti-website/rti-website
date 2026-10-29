// node --test: IP helpers (no raw IP at rest, masking, office exclusion, proxy header).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { clientIpFrom, hashIp, inCidrs, isPrivateIp, maskIp, normaliseIp, parseCidrs } from '../../src/lib/visitor/ip.ts'

test('normalises and rejects junk', () => {
  assert.equal(normaliseIp('::ffff:203.0.113.7'), '203.0.113.7')
  assert.equal(normaliseIp(' 203.0.113.7:443 '), '203.0.113.7')
  assert.equal(normaliseIp('2001:DB8::1'), '2001:db8::1')
  assert.equal(normaliseIp('not an ip'), null)
  assert.equal(normaliseIp('999.1.1.1'), null)
})

test('masks for logs', () => {
  assert.equal(maskIp('203.0.113.7'), '203.0.x.x')
  assert.equal(maskIp('2001:db8:85a3::8a2e:370:7334'), '2001:db8:x:x')
  assert.equal(maskIp(null), '(none)')
})

test('hash is salted, stable and never the IP', () => {
  const a = hashIp('203.0.113.7', 'salt-one')
  assert.equal(a, hashIp('203.0.113.7', 'salt-one'))
  assert.notEqual(a, hashIp('203.0.113.7', 'salt-two'))
  assert.match(a, /^[0-9a-f]{64}$/)
  assert.ok(!a.includes('203'))
  assert.throws(() => hashIp('203.0.113.7', ''))
})

test('private ranges', () => {
  for (const ip of ['10.1.2.3', '192.168.0.9', '172.20.1.1', '127.0.0.1', '100.64.0.1', '::1', 'fd00::1', 'fe80::1']) assert.equal(isPrivateIp(ip), true, ip)
  for (const ip of ['8.8.8.8', '203.0.113.7', '2001:db8::1']) assert.equal(isPrivateIp(ip), false, ip)
})

test('office exclusion list (CIDR, v4 and v6)', () => {
  const list = parseCidrs('203.0.113.0/24, 198.51.100.7 2001:db8:abcd::/48, garbage, 10.0.0.0/99')
  assert.equal(list.length, 3)
  assert.equal(inCidrs('203.0.113.200', list), true)
  assert.equal(inCidrs('203.0.114.1', list), false)
  assert.equal(inCidrs('198.51.100.7', list), true)
  assert.equal(inCidrs('198.51.100.8', list), false)
  assert.equal(inCidrs('2001:db8:abcd:12::5', list), true)
  assert.equal(inCidrs('2001:db8:abce::5', list), false)
})

test('client IP from the proxy header', () => {
  const h = new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.2', 'x-real-ip': '198.51.100.1', forwarded: 'for="[2001:db8::5]";proto=https' })
  assert.equal(clientIpFrom(h), '203.0.113.7')
  assert.equal(clientIpFrom(h, 'x-real-ip'), '198.51.100.1')
  assert.equal(clientIpFrom(h, 'forwarded'), '2001:db8::5')
  assert.equal(clientIpFrom(new Headers()), null)
})
