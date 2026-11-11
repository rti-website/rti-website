import type { IndustryKey, LandingPage } from '@/data/local-pages/types'

/**
 * What the four Williamston, SC Google Ads pages share (11 Nov 2026): the
 * highlights strip, the industry cards ("Same 7 industry cards as the
 * Wisconsin page") and the map's facility card ("Location card: South
 * Carolina · Recycling facility · Williamston, SC"). See
 * ./williamston-light-bulb-recycling.ts.
 */
export const WILLIAMSTON_HIGHLIGHTS = ['Since 1993', 'R2v3, RIOS & NAID AAA Certified', 'Certificate of Recycling', 'Business Pickup']

export const WILLIAMSTON_INDUSTRY_CARDS: { title: string; key: IndustryKey }[] = [
  { title: 'Manufacturing', key: 'manufacturing' },
  { title: 'Healthcare', key: 'healthcare' },
  { title: 'Education', key: 'education' },
  { title: 'Government', key: 'government' },
  { title: 'Retail and corporate offices', key: 'retail' },
  { title: 'Financial services', key: 'financial' },
  { title: 'Automotive and fleet businesses', key: 'automotive' },
]

/** The map card, its pin on the board where the map draws Upstate South Carolina. */
export const WILLIAMSTON_PLACE: NonNullable<LandingPage['areas']['place']> = {
  title: 'South Carolina', line1: 'Recycling facility', line2: 'Williamston, SC', x: 1014, y: 678,
}

/** Every Williamston page leaves these out until management sends them. */
export const WILLIAMSTON_CONTACT_TODO = [
  'Closing band: the doc’s "Call [SC PHONE]" button and [SC EMAIL] line are left out (no South Carolina phone or email yet, Aaqib 11 Nov 2026).',
]
