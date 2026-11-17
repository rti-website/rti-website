import { US_STATES, stateCode } from './us-address.ts'

/**
 * AUTOMATIC LEAD ROUTING BY STATE (management, 18 Nov 2026).
 *
 *   MN, WI and IL (Chicago)  ->  Christine
 *   every other state        ->  Jason Simister and Umer Tariq, who
 *                                distribute them to the team
 *
 * "Send each routed lead to them by email, not just as an assignment in the
 * admin." The website notification for a routed enquiry goes TO the people
 * below (instead of the address set in the server settings), and an enquiry
 * routed to Christine is also assigned to her Publisher account when she has
 * one. Jason and Umer share theirs, so it stays unassigned for them to hand
 * out. See src/lib/lead-route-apply.ts and /api/leads.
 *
 * "Leave tests, residential and spam unrouted": those keep the email they
 * always had and are not assigned. Admin -> Enquiries still shows who a test
 * WOULD have gone to, so routing can be checked without emailing anyone.
 *
 * Pure and dependency free (apart from the state list) so tests/ can import
 * it directly. Change the people or the states here and nowhere else.
 */

export type RouteKey = 'christine' | 'jason-umer'

export type Person = { name: string; email: string }

export const ROUTES: Record<RouteKey, { label: string; people: Person[] }> = {
  christine: {
    label: 'Christine',
    people: [{ name: 'Christine', email: 'christine@recycletechnologies.com' }],
  },
  'jason-umer': {
    label: 'Jason & Umer',
    people: [
      { name: 'Jason Simister', email: 'jason.simister@lightingresourcesinc.com' },
      { name: 'Umer Tariq', email: 'umer.tariq@lightingresourcesinc.com' },
    ],
  },
}

/** Christine's states. Illinois is all of it (Aaqib, 18 Nov 2026), not only Chicago. */
export const CHRISTINE_STATES: readonly string[] = ['MN', 'WI', 'IL']

export function routeForState(state: string | null): RouteKey {
  return state && CHRISTINE_STATES.includes(state) ? 'christine' : 'jason-umer'
}

// ------------------------------------------------------------------ state --

const NAMES = US_STATES.map(([code, name]) => [code, name.toLowerCase()] as const)
  // Longest first, so "West Virginia" wins over "Virginia".
  .sort((a, b) => b[1].length - a[1].length)

/**
 * The state written in a one line address ("123 Main St, Plymouth, MN 55441",
 * "Chicago Illinois"), as the ITAD pickup form posts it. A two letter code
 * only counts after a comma or before a ZIP, so "IN" or "OR" inside a street
 * name is never read as Indiana or Oregon. Null when there is none.
 */
export function stateFromAddress(text: string | null | undefined): string | null {
  if (!text) return null
  const s = ` ${text.replace(/\s+/g, ' ').trim()} `
  const beforeZip = s.match(/[\s,]([A-Za-z]{2})\.?,?\s+\d{5}(?:-\d{4})?\b/)
  if (beforeZip) { const c = stateCode(beforeZip[1]!); if (c) return c }
  const afterComma = s.match(/,\s*([A-Za-z]{2})\.?\s*(?:,|$|\s(?:usa|us|united states)\b)/i)
  if (afterComma) { const c = stateCode(afterComma[1]!); if (c) return c }
  // A full name only at the end ("… Chicago Illinois 60601") or between
  // commas, so "123 Washington Ave" or "Indiana St" is not a state.
  const lower = s.toLowerCase().replace(/\.\s*$/, ' ')
  for (const [code, name] of NAMES) {
    if (new RegExp(`[\\s,]${name}\\s*(?:,?\\s*\\d{5}(?:-\\d{4})?)?\\s*(?:,?\\s*(?:usa|us|united states))?\\s*$`).test(lower)) return code
    if (new RegExp(`,\\s*${name}\\s*,`).test(lower)) return code
  }
  return null
}

/** The five digit ZIP in a one line address, the last one if there are several. */
export function zipFromAddress(text: string | null | undefined): string | null {
  const all = (text ?? '').match(/\b\d{5}(?=(?:-\d{4})?\b)/g)
  return all ? all[all.length - 1]! : null
}

// ------------------------------------------------------------------ tests --

const words = (v: string | null | undefined) =>
  (v ?? '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Addresses only the team uses for trying the forms. */
const TEST_DOMAINS = ['99technologies.com', 'example.com', 'example.org', 'example.net', 'test.com', 'mailinator.com']

/**
 * Why an enquiry looks like a test, or null. Deliberately narrow, so a real
 * company is never held back:
 *   - the name has the word test / testing / tester in it, or is "demo" /
 *     "dummy" / "asdf";
 *   - the company has the WORD "test" (not "testing": "ABC Testing Labs" is
 *     a real business) or says ignore, apart from TestAmerica;
 *   - the email's own part is a test one (test@, test123@, aaqib.test@) or
 *     the domain is a test or team one (TEST_DOMAINS);
 *   - the message says it is a test ("test", "this is a test", "please
 *     ignore", "test lead" …).
 */
export function testReason(l: { name?: string | null; email?: string | null; company?: string | null; message?: string | null }): string | null {
  const name = words(l.name)
  if (/\b(test|tests|testing|tester)\b/.test(name) || /^(demo|dummy|asdf|qwerty|abc|xyz)( |$)/.test(name)) return 'the name says test'
  const company = words(l.company)
  if (!/^test ?america\b/.test(company) && /\b(test|ignore|dummy)\b/.test(company)) return 'the company says test'
  const email = (l.email ?? '').toLowerCase().trim()
  const at = email.lastIndexOf('@')
  if (at > 0) {
    const local = email.slice(0, at)
    const domain = email.slice(at + 1)
    if (TEST_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) return `a ${domain} address`
    if (local.split(/[^a-z]+/).some((w) => w === 'test' || w === 'testing' || w === 'tester')) return 'the email is a test address'
  }
  const message = words(l.message)
  if (/^(test|testing|tests|test test|test lead|test only|test message|test submission)$/.test(message)) return 'the message says test'
  if (/\b(please ignore|pls ignore|ignore this|this is a test|just a test|test (lead|submission|entry|form|message|email|enquiry|inquiry|only|please ignore))\b/.test(message)) {
    return 'the message says test'
  }
  return null
}

// ------------------------------------------------------------------- spam --

const PITCH = /\b(seo (services?|agency|expert|package)|backlinks?|guest posts?|link building|first page of google|rank (your|on) (website|site|google)|web ?site (re)?design services|web design services|app development services|crypto|bitcoin|casino|forex|binary options|loan offer|payday|viagra|cialis|escort|onlyfans|telegram me|whatsapp me)\b/i

/**
 * Why an enquiry looks like spam, or null. The bot honeypot already drops
 * most of it before it is saved (/api/leads); this catches the pitches a
 * person types in: two or more links, a name that is a link, a message in
 * Cyrillic or Chinese script, or an SEO / crypto / loan pitch.
 */
export function spamReason(l: { name?: string | null; company?: string | null; message?: string | null }): string | null {
  const msg = l.message ?? ''
  const links = (msg.match(/https?:\/\/|www\./gi) ?? []).length
  if (links >= 2) return `${links} links in the message`
  if (/https?:\/\/|www\.|\.(com|net|ru|xyz)\b/i.test(l.name ?? '')) return 'the name is a link'
  if (/[Ѐ-ӿ一-鿿]/.test(`${l.name ?? ''} ${msg}`)) return 'Cyrillic or Chinese text'
  if (PITCH.test(`${l.company ?? ''} ${msg}`)) return 'a sales pitch'
  return null
}

// --------------------------------------------------------------- decision --

export type StateFrom = 'form' | 'zip' | 'address' | 'ip'

export type RouteDecision = {
  /** Who it goes to, or null when it is left unrouted. */
  route: RouteKey | null
  /** Who it would go to by state, routed or not. */
  byState: RouteKey
  state: string | null
  stateFrom: StateFrom | null
  /** Why it was left unrouted. */
  skip: null | { kind: 'residential' | 'test' | 'spam'; why: string }
}

export function decideRoute(l: {
  name?: string | null; email?: string | null; company?: string | null; message?: string | null
  audience?: string | null
  state: string | null
  stateFrom: StateFrom | null
}): RouteDecision {
  const byState = routeForState(l.state)
  const base = { byState, state: l.state, stateFrom: l.stateFrom }
  if (l.audience === 'Residential') return { ...base, route: null, skip: { kind: 'residential', why: 'residential enquiry' } }
  const test = testReason(l)
  if (test) return { ...base, route: null, skip: { kind: 'test', why: test } }
  const spam = spamReason(l)
  if (spam) return { ...base, route: null, skip: { kind: 'spam', why: spam } }
  return { ...base, route: byState, skip: null }
}

const FROM: Record<StateFrom, string> = {
  form: 'state on the form', zip: 'from the ZIP code', address: 'from the address', ip: 'from where it was sent (IP)',
}

/** One line for the enquiry's Routing field and its Activity. */
export function routeText(d: RouteDecision): string {
  const where = d.state ? `${d.state} lead (${FROM[d.stateFrom ?? 'form']})` : 'State not known'
  const rule = d.byState === 'christine' ? 'MN, WI and IL go to Christine' : 'states outside MN, WI and IL go to Jason & Umer'
  if (d.skip) return `Not routed: ${d.skip.why}. ${where}; would have gone to ${ROUTES[d.byState].label}.`
  return `${where}: ${rule}.`
}
