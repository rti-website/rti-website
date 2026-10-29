/**
 * THE HOT LEAD FLAG (management, 30 Oct 2026): "a hot lead flag if they
 * viewed the quote page, a service page, or came back more than once".
 *
 * A Visitor lead (or a company on Admin -> Visitors) is hot when any of these
 * is true, and the admin shows which:
 *
 *   quote      viewed Get a Quote (/quote/, /quote-by-location/)
 *   pickup     viewed Schedule a Pickup or Contact Us (the brief's other two
 *              "intent" pages, src/lib/visitor/source.ts INTENT_PATHS)
 *   service    viewed a service page: the service hubs and their state and
 *              Chicago pages (isServicePath below); location pages are not
 *              service pages
 *   returning  came back: HOT_MIN_VISITS visits or more (a visit ends after
 *              30 minutes idle, src/lib/visitor/store.ts)
 *
 * One that has already sent a form is not flagged: it is an enquiry now
 * (its status says Converted).
 *
 * Pure, so tests/visitor/hot.test.ts covers it.
 */

export type HotReason = 'quote' | 'pickup' | 'service' | 'returning'

/** Visits that make a returning visitor. 2 = came back at least once. */
export const HOT_MIN_VISITS = 2

export const QUOTE_PATHS = ['/quote/', '/quote-by-location/']
export const PICKUP_CONTACT_PATHS = ['/request-a-pickup/', '/contact-us/']

/** The service hubs; a page under one (/battery-recycling/Chicago/) counts too. */
export const SERVICE_ROOTS = [
  '/services/', '/electronic-recycle/', '/battery-recycling/', '/light-bulbs/', '/ballasts/', '/tv-recycling/',
  '/airbag-recycling/', '/universal-waste-recycling/', '/hard-drive-destruction-services/', '/paper-shredding-services/',
  '/off-site-shredding/', '/phone-shredding-service/', '/it-asset-disposition/', '/electronics-recycling-kit/',
  '/mail-in-recycling/',
]

/** The services each facility offers at /minnesota-recycling/<slug>/ and /wisconsin-recycling/<slug>/. */
const STATE_SERVICE = /^\/(minnesota|wisconsin)-recycling\/(airbag-recycling|ballast-recycling|battery-recycling|electronic-recycling|hard-drive-destruction|light-bulb-recycling|off-site-shredding|paper-shredding|phone-shredding|tv-recycling|universal-waste-recycling)\/$/

/** The Chicago service pages (/battery-recycling-chicago/, /paper-shredding-chicago/ …). */
const CHICAGO_SERVICE = /^\/(airbag-recycling|ballast-recycling|battery-recycling|electronic-recycling|light-bulb-recycling|tv-recycling|hard-drive-destruction|off-site-shredding|paper-shredding|phone-shredding)-chicago\/$/

function norm(p: string): string {
  const path = p.split('?')[0]!.split('#')[0]!
  return path.endsWith('/') ? path : `${path}/`
}

export function isServicePath(p: string): boolean {
  const path = norm(p)
  const lower = path.toLowerCase()
  return SERVICE_ROOTS.some((r) => lower === r || lower.startsWith(r)) || STATE_SERVICE.test(path) || CHICAGO_SERVICE.test(path)
}

/** Why a visitor is hot, in this order; empty when they are not. */
export function hotReasons(input: { paths: readonly string[] | null | undefined; visits: number; converted?: boolean }): HotReason[] {
  if (input.converted) return []
  const paths = (input.paths ?? []).map(norm)
  const out: HotReason[] = []
  if (paths.some((p) => QUOTE_PATHS.includes(p))) out.push('quote')
  if (paths.some((p) => PICKUP_CONTACT_PATHS.includes(p))) out.push('pickup')
  if (paths.some(isServicePath)) out.push('service')
  if (input.visits >= HOT_MIN_VISITS) out.push('returning')
  return out
}

export const HOT_LABEL: Record<HotReason, string> = {
  quote: 'Viewed the quote page',
  pickup: 'Viewed pickup or contact',
  service: 'Viewed a service page',
  returning: 'Came back',
}

/** "Viewed the quote page · Came back (3 visits)". */
export function hotText(reasons: readonly HotReason[], visits: number): string {
  return reasons.map((r) => (r === 'returning' ? `${HOT_LABEL[r]} (${visits} visits)` : HOT_LABEL[r])).join(' · ')
}
