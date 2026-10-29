// node --test: IP classification (business kept; ISP and VPN anonymous; relays noise; clouds and data centres dropped).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classify, companyKey, NO_LOOKUP_COUNTRIES, type IpLookupResult } from '../../src/lib/visitor/classify.ts'
import { mapIpapi } from '../../src/lib/visitor/lookup-ip.ts'

const base: IpLookupResult = {
  ok: true, orgName: 'Acme Hospital', orgDomain: 'acmehealth.org', orgType: 'business', city: 'Minneapolis', region: 'Minnesota',
  countryCode: 'US', isVpn: false, isProxy: false, isTor: false, isDatacenter: false, isMobile: false,
}

test('the four kept types are business', () => {
  for (const t of ['business', 'education', 'government', 'banking'] as const) {
    assert.equal(classify({ ...base, orgType: t }).classification, 'business', t)
  }
})

test('ISP and any VPN/proxy/Tor flag stay anonymous (people)', () => {
  assert.equal(classify({ ...base, orgType: 'isp', orgName: 'Comcast Cable' }).classification, 'anonymous')
  assert.equal(classify({ ...base, isVpn: true }).classification, 'anonymous')
  assert.equal(classify({ ...base, isProxy: true }).classification, 'anonymous')
  assert.equal(classify({ ...base, isTor: true }).classification, 'anonymous')
  assert.equal(classify({ ...base, isVpn: true, isDatacenter: true, orgName: 'NordVPN' }).classification, 'anonymous')
  assert.equal(classify({ ...base, orgType: null }).classification, 'anonymous')
})

test('clouds, data centres and AI companies are dropped (management, 30 Oct 2026)', () => {
  assert.equal(classify({ ...base, orgType: 'hosting' }).classification, 'datacenter')
  assert.equal(classify({ ...base, isDatacenter: true }).classification, 'datacenter')
  const clouds: [string, string | null][] = [['Anthropic, PBC', 'anthropic.com'], ['OpenAI, L.L.C.', 'openai.com'], ['Amazon Web Services', 'aws.amazon.com'],
    ['Google Cloud', null], ['DigitalOcean, LLC', 'digitalocean.com'], ['Hetzner Online GmbH', 'hetzner.com'], ['OVH SAS', 'ovh.net']]
  for (const [n, d] of clouds) assert.equal(classify({ ...base, orgName: n, orgDomain: d }).classification, 'datacenter', n)
})

test('relays and clouds typed business are noise', () => {
  for (const [n, d] of [['Apple Inc.', 'apple.com'], ['Cloudflare, Inc.', 'cloudflare.com'], ['Google LLC', 'google.com'],
    ['Microsoft Corporation', 'microsoft.com'], ['Amazon.com, Inc.', 'amazon.com'], ['Akamai Technologies', 'akamai.com']]) {
    assert.equal(classify({ ...base, orgName: n!, orgDomain: d! }).classification, 'noise', n)
  }
})

test('ten known organisations and ten ISP/VPN results classify correctly', () => {
  const businesses = ['University of Wisconsin Madison', 'Mayo Clinic', 'Hennepin County', 'US Bank', 'Target Corporation',
    '3M Company', 'Medtronic', 'State of Minnesota', 'Minneapolis Public Schools', 'Wells Fargo']
  businesses.forEach((n, i) => assert.equal(classify({ ...base, orgName: n, orgType: (['education', 'business', 'government', 'banking'] as const)[i % 4]! }).classification, 'business', n))
  const anon: Partial<IpLookupResult>[] = [
    { orgType: 'isp', orgName: 'Comcast' }, { orgType: 'isp', orgName: 'Charter Communications' }, { orgType: 'isp', orgName: 'T-Mobile USA' },
    { orgType: 'isp', orgName: 'Verizon Wireless' }, { orgType: 'hosting', orgName: 'DigitalOcean' }, { isVpn: true, orgName: 'NordVPN' },
    { isProxy: true }, { isTor: true }, { isDatacenter: true, orgName: 'OVH SAS' }, { orgType: 'isp', orgName: 'AT&T' },
  ]
  for (const a of anon) assert.notEqual(classify({ ...base, ...a }).classification, 'business', JSON.stringify(a))
})

test('company key prefers the domain', () => {
  assert.equal(companyKey('Acme', 'WWW.Acme.com'), 'acme.com')
  assert.equal(companyKey('  Acme   Corp ', null), 'org:acme corp')
})

test('EU and UK are never looked up; the US is', () => {
  for (const c of ['DE', 'FR', 'IE', 'GB', 'NL', 'NO', 'CH']) assert.ok(NO_LOOKUP_COUNTRIES.has(c), c)
  for (const c of ['US', 'CA', 'MX', 'PK']) assert.ok(!NO_LOOKUP_COUNTRIES.has(c), c)
})

test('ipapi.is responses map, keyed and free tier', () => {
  const keyed = mapIpapi({
    is_vpn: false, is_datacenter: false, is_proxy: false, is_tor: false, is_mobile: false,
    company: { name: 'University of Wisconsin Madison', domain: 'wisc.edu', type: 'education' },
    asn: { org: 'University of Wisconsin Madison', type: 'education' },
    location: { country_code: 'us', state: 'Wisconsin', city: 'Madison' },
  })
  assert.equal(keyed.orgName, 'University of Wisconsin Madison')
  assert.equal(keyed.orgDomain, 'wisc.edu')
  assert.equal(keyed.orgType, 'education')
  assert.equal(keyed.countryCode, 'US')
  assert.equal(classify(keyed).classification, 'business')
  const free = mapIpapi({ company: 'Some ISP', city: 'Madison', region: 'Wisconsin' })
  assert.equal(free.orgName, 'Some ISP')
  assert.equal(free.orgType, null)
  assert.equal(classify(free).classification, 'anonymous')
})
