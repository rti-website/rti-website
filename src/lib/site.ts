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

/** Facilities. Used for LocalBusiness schema and the locations pages. */
export const FACILITIES = [
  {
    id: 'blaine-99th',
    name: 'Recycle Technologies — Blaine (99th Ln)',
    street: '1525 99th Ln NE',
    locality: 'Blaine',
    region: 'MN',
    postalCode: '55449',
    country: 'US',
    telephone: '',          // fill from tracking-inventory.md (Phase 0)
    geo: { lat: 0, lng: 0 }, // 5+ decimal places required
    hours: [] as OpeningHours[],
  },
  {
    id: 'blaine-davenport',
    name: 'Recycle Technologies — Blaine (Davenport St)',
    street: '10040 Davenport St NE',
    locality: 'Blaine',
    region: 'MN',
    postalCode: '55449',
    country: 'US',
    telephone: '',
    geo: { lat: 0, lng: 0 },
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
    telephone: '',
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
  { name: 'R2v3', issuer: 'SERI', verifyUrl: 'https://sustainableelectronics.org/' },
  { name: 'NAID AAA', issuer: 'i-SIGMA', verifyUrl: '' },
  { name: 'ISO 14001', issuer: '', verifyUrl: '' },
] as const
