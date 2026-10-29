/**
 * What an organisation lookup means for us (docs/visitor-identification/BRIEF.md
 * section 6). Pure, see ip.ts.
 *
 *   business   the organisation type is business, education, government or
 *              banking, and it is not on the noise list -> a companies row,
 *              the Visitor lead marked Business IP
 *   anonymous  ISP or mobile network, or any VPN, proxy or Tor flag (people)
 *   noise      typed business, but it is a relay or a corporate proxy that
 *              carries other people's traffic (iCloud Private Relay,
 *              Cloudflare WARP, Zscaler, Google, Microsoft, Amazon …)
 *   datacenter a cloud, hosting or data centre network (management, 30 Oct
 *              2026: "exclude bots and cloud or data center networks"):
 *              the datacenter flag without a VPN or proxy flag, hosting type,
 *              or a cloud or AI company by name (an "Anthropic, PBC" visit
 *              from an automated check showed up as a company). People do not
 *              browse from these; scripts do. Everything such a visit stored
 *              is deleted (enrich.ts, purgeDatacenter) and nothing is shown.
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
const NOISE = /\b(apple|icloud|private relay|cloudflare|google|alphabet|microsoft|msn|amazon|akamai|zscaler|netskope|verizon digital media|meta platforms|facebook|opera software|nordvpn|expressvpn|surfshark|proton)\b/i

/** Clouds, hosts and AI companies whose networks are scripts, not people. Matched on name or domain. */
const DATACENTER_ORGS = /\b(anthropic|openai|perplexity|cohere|mistral|hugging ?face|amazon web services|aws|amazon data services|amazon technologies|google cloud|gcp|microsoft azure|azure|oracle cloud|alibaba|aliyun|tencent cloud|digitalocean|linode|akamai connected cloud|ovh|hetzner|vultr|leaseweb|choopa|m247|datacamp|contabo|scaleway|ionos|hostinger|hostgator|bluehost|godaddy|rackspace|psychz|colocrossing|quadranet|cdn77|fastly|edgecast|limelight|servers\.com|packet|equinix metal|render|heroku|vercel|netlify|fly\.io|railway)\b/i

export type Classification = 'business' | 'anonymous' | 'noise' | 'datacenter'

/** True for a cloud, host or AI company by name or domain. */
export function isDatacenterOrg(name: string | null, domain: string | null): boolean {
  return Boolean((name && DATACENTER_ORGS.test(name)) || (domain && DATACENTER_ORGS.test(domain.replace(/\./g, ' '))))
}

export function classify(r: IpLookupResult): { classification: Classification; orgType: OrgType | null } {
  // A VPN, proxy or Tor exit is a person hiding where they are: anonymous, kept.
  const personMasked = r.isVpn || r.isProxy || r.isTor
  if (!personMasked && (r.isDatacenter || r.orgType === 'hosting' || isDatacenterOrg(r.orgName, r.orgDomain))) {
    return { classification: 'datacenter', orgType: r.orgType }
  }
  if (personMasked) return { classification: 'anonymous', orgType: r.orgType }
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
