import type { IpLookupResult, OrgType } from './classify.ts'

/**
 * lookupIp(ip): the organisation behind an IP address (brief section 6).
 *
 * Provider: ipapi.is (https://ipapi.is/developers.html), key in IPAPI_KEY.
 * Switching provider later means rewriting this one file: everything else
 * works on IpLookupResult (classify.ts).
 *
 * The key goes in a POST body, not the query string, so it never appears in
 * a URL or a proxy log. The IP is sent to the provider and nowhere else; it
 * is not logged here or by the caller (enrich.ts logs masked IPs only).
 *
 * Pure apart from fetch (Node 22's global; no HTTP client dependency), and
 * `fetchImpl` can be swapped in tests, so node:test runs it without a network.
 */

const ENDPOINT = 'https://api.ipapi.is'
const TYPES: OrgType[] = ['business', 'education', 'government', 'banking', 'isp', 'hosting']

type Raw = {
  error?: string
  is_bogon?: boolean
  is_mobile?: boolean
  is_datacenter?: boolean
  is_tor?: boolean
  is_proxy?: boolean
  is_vpn?: boolean
  // Keyed responses carry objects; the anonymous free tier carries strings.
  company?: { name?: string; domain?: string; type?: string } | string
  asn?: { org?: string; domain?: string; type?: string } | string
  location?: { country_code?: string; state?: string; city?: string }
  city?: string
  region?: string
  country?: string
}

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null)

export function mapIpapi(raw: Raw): IpLookupResult {
  const company = typeof raw.company === 'object' && raw.company ? raw.company : null
  const asn = typeof raw.asn === 'object' && raw.asn ? raw.asn : null
  const typeRaw = str(company?.type) ?? str(asn?.type)
  const orgType = typeRaw && (TYPES as string[]).includes(typeRaw.toLowerCase()) ? (typeRaw.toLowerCase() as OrgType) : null
  return {
    ok: true,
    orgName: str(company?.name) ?? (typeof raw.company === 'string' ? str(raw.company) : null) ?? str(asn?.org),
    orgDomain: (str(company?.domain) ?? str(asn?.domain))?.toLowerCase() ?? null,
    orgType,
    city: str(raw.location?.city) ?? str(raw.city),
    region: str(raw.location?.state) ?? str(raw.region),
    countryCode: str(raw.location?.country_code)?.toUpperCase() ?? null,
    isVpn: raw.is_vpn === true,
    isProxy: raw.is_proxy === true,
    isTor: raw.is_tor === true,
    isDatacenter: raw.is_datacenter === true || orgType === 'hosting',
    isMobile: raw.is_mobile === true,
  }
}

function failed(error: string): IpLookupResult {
  return {
    ok: false, error, orgName: null, orgDomain: null, orgType: null, city: null, region: null, countryCode: null,
    isVpn: false, isProxy: false, isTor: false, isDatacenter: false, isMobile: false,
  }
}

export async function lookupIp(
  ip: string,
  opts: { key?: string; fetchImpl?: typeof fetch; timeoutMs?: number } = {},
): Promise<IpLookupResult> {
  const key = opts.key ?? process.env.IPAPI_KEY ?? ''
  if (!key) return failed('IPAPI_KEY is not set')
  const f = opts.fetchImpl ?? fetch
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 8000)
  try {
    const res = await f(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ q: ip, key }),
      signal: ctrl.signal,
    })
    if (!res.ok) return failed(`HTTP ${res.status}`)
    const raw = (await res.json()) as Raw
    if (raw.error) return failed(String(raw.error).replace(/\d{1,3}(\.\d{1,3}){3}/g, '[ip]').slice(0, 200))
    if (raw.is_bogon) return failed('bogon address')
    return mapIpapi(raw)
  } catch (err) {
    return failed((err as Error).name === 'AbortError' ? 'timeout' : 'network error')
  } finally {
    clearTimeout(timer)
  }
}
