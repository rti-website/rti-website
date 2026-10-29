/**
 * What an organisation lookup means for us (docs/visitor-identification/BRIEF.md
 * section 6). Pure, see ip.ts.
 *
 *   business   the organisation type is business, education, government or
 *              banking, and it is not on the noise list -> a companies row,
 *              the Visitor lead marked Business IP
 *   anonymous  ISP, mobile, hosting, or any VPN, proxy, Tor or datacenter flag
 *   noise      typed business, but it is a relay, cloud or CDN network
 *              (iCloud Private Relay, Cloudflare WARP, Google, Microsoft, AWS …)
 */

export type OrgType = 'business' | 'education' | 'government' | 'banking' | 'isp' | 'hosting'

/** What lookupIp (lookup-ip.ts) hands back, whatever the provider. */
export type IpLookupResult = {
  ok: boolean
  /** Why it failed, when ok is false. Never contains the IP. */
  error?: string
  orgName: string | null
  orgDomain: string | null
  orgType: OrgType | null
  city: string | null
  region: string | null
  countryCode: string | null
  isVpn: boolean
  isProxy: boolean
  isTor: boolean
  isDatacenter: boolean
  isMobile: boolean
}

export const KEEP_TYPES: OrgType[] = ['business', 'education', 'government', 'banking']

/** Networks that look like a company but carry other people's traffic. Matched on name or domain. */
const NOISE = /\b(apple|icloud|private relay|cloudflare|google|alphabet|microsoft|azure|msn|amazon|aws|akamai|fastly|zscaler|netskope|oracle cloud|digitalocean|linode|ovh|hetzner|vultr|leaseweb|choopa|m247|datacamp|cdn77|limelight|edgecast|verizon digital media|meta platforms|facebook|opera software|nordvpn|expressvpn|surfshark|proton)\b/i

export type Classification = 'business' | 'anonymous' | 'noise'

export function classify(r: IpLookupResult): { classification: Classification; orgType: OrgType | null } {
  if (r.isVpn || r.isProxy || r.isTor || r.isDatacenter) return { classification: 'anonymous', orgType: r.orgType }
  if (!r.orgType || !KEEP_TYPES.includes(r.orgType) || !r.orgName) return { classification: 'anonymous', orgType: r.orgType }
  if (NOISE.test(r.orgName) || (r.orgDomain && NOISE.test(r.orgDomain.replace(/\./g, ' ')))) {
    return { classification: 'noise', orgType: r.orgType }
  }
  return { classification: 'business', orgType: r.orgType }
}

/**
 * Countries never looked up (brief section 6: "EU and UK"). The EEA members
 * outside the EU (Iceland, Liechtenstein, Norway) and Switzerland are
 * included too: the same rules apply there and the cost of leaving them out
 * of enrichment is nil.
 */
export const NO_LOOKUP_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT',
  'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'UK', 'IS', 'LI', 'NO', 'CH', 'GI', 'IM', 'JE', 'GG',
])

/** The key a companies row is found by: the domain, or the name when the lookup gave none. */
export function companyKey(name: string, domain: string | null): string {
  const d = (domain ?? '').trim().toLowerCase().replace(/^www\./, '')
  if (d) return d
  return 'org:' + name.trim().toLowerCase().replace(/\s+/g, ' ')
}
