/**
 * Site-wide constants. Single source of truth — nothing here is duplicated
 * anywhere else in the repo.
 */
export const SITE = {
  /** Canonical origin. No trailing slash. Every absolute URL is built from this. */
  origin: 'https://www.recycletechnologies.com',
  name: 'Recycle Technologies',
  legalName: 'Recycle Technologies, Inc.',
  /** Set by CI. Production build fails if this is true (see check in layout). */
  noindex: process.env.NEXT_PUBLIC_NOINDEX === 'true',
} as const

/**
 * Facilities. Used for LocalBusiness schema and the locations pages.
 *
 * Two, as the site shows them. A third, "Blaine (Davenport St), 10040
 * Davenport St NE", was listed here and published as a LocalBusiness on every
 * page while no page on the site mentioned it; Asim had it removed on
 * 23 Sep 2026. Phone numbers are the facility lines the header shows.
 */
export const FACILITIES = [
  {
    id: 'blaine-99th',
    name: 'Recycle Technologies — Blaine (99th Ln)',
    street: '1525 99th Ln NE',
    locality: 'Blaine',
    region: 'MN',
    postalCode: '55449',
    country: 'US',
    telephone: '+1-763-559-5130',
    geo: { lat: 0, lng: 0 }, // 5+ decimal places required
    hours: [] as OpeningHours[],
  },
  {
    id: 'new-berlin',
    name: 'Recycle Technologies — New Berlin',
    street: '2815 South 171st Street',
    locality: 'New Berlin',
    region: 'WI',
    postalCode: '53151',
    country: 'US',
    telephone: '+1-262-798-3040',
    geo: { lat: 0, lng: 0 },
    hours: [] as OpeningHours[],
  },
] as const

export type OpeningHours = {
  days: string[]
  opens: string
  closes: string
}

/**
 * Certifications. These are a real differentiator for an ITAD company, so they
 * appear BOTH in schema and in visible body copy.
 *
 * Phase 1 of the migration plan flags that the current homepage shows a revoked
 * R2v3 entry (4000 Winnetka Ave) and copy about a competitor. Neither is
 * reproduced here. Verify every entry before it ships.
 */
export const CERTIFICATIONS = [
  /* Confirmed by Asim, 23 Sep 2026: Blaine, Minnesota holds R2v3; New Berlin,
     Wisconsin holds NAID AAA; the company holds RIOS. ISO 14001 was listed
     here and is NOT held, so it came out — this array is published as
     `hasCredential` on every page of the site. RIOS is the Recycling Industry
     Operating Standard, run by ReMA (the Recycled Materials Association,
     formerly ISRI) — the same three marks the footer shows. */
  { name: 'R2v3', issuer: 'SERI', verifyUrl: 'https://sustainableelectronics.org/' },
  { name: 'NAID AAA', issuer: 'i-SIGMA', verifyUrl: '' },
  { name: 'RIOS', issuer: 'ReMA', verifyUrl: '' },
] as const
