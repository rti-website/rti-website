import { NextResponse } from 'next/server'
import { stateCode } from '@/lib/us-address'

/**
 * Address suggestions for the forms' Address field, as the visitor types —
 * Asim, 29 Sep 2026: "auto fill the address, give suggestions like the one
 * we gave in Find a Recycling Location Near You".
 *
 * WHERE THEY COME FROM: Photon (photon.komoot.io), an open address search
 * built on OpenStreetMap that is made for search-as-you-type, with no key.
 * Nominatim, which /api/locate uses, forbids autocomplete in its usage
 * policy, so it is not used here. Google Places was the spec's first choice;
 * the Maps key we hold is a website key restricted to recycletechnologies.com
 * pages, which Google refuses for server calls and for localhost. Switching
 * to Places later means a server key and a second branch in this file; the
 * form does not change. PHOTON_URL can point this at our own Photon.
 *
 * Called from the server, never from the browser, so the visitor's IP and
 * page are not sent anywhere: only the typed text goes upstream. US results
 * only, leaning towards Minnesota and Wisconsin (most enquiries), cached in
 * memory, throttled per IP like the other public routes.
 *
 * Dynamic by design, like /api/locate — outside app/layout.tsx, so
 * `dynamic = 'error'` (CLAUDE.md rule 2) does not apply.
 */

const PHOTON_URL = process.env.PHOTON_URL ?? 'https://photon.komoot.io/api/'
const USER_AGENT = 'recycletechnologies.com address search (dispatch@recycletechnologies.com)'
const TIMEOUT_MS = 5000

export type AddressSuggestion = {
  /** "2815 South 171st Street" — what goes in the Address field. */
  line: string
  city: string
  /** Two letters. */
  state: string
  zip: string
  /** The whole thing, for the list. */
  label: string
}

const cache = new Map<string, AddressSuggestion[]>()

const hits = new Map<string, number[]>()
const WINDOW_MS = 60 * 1000
const MAX_IN_WINDOW = 60
function tooMany(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_IN_WINDOW
}

type PhotonProps = {
  countrycode?: string; housenumber?: string; street?: string; name?: string
  city?: string; town?: string; village?: string; district?: string; county?: string
  state?: string; postcode?: string; type?: string
}

export async function GET(req: Request): Promise<Response> {
  const q = (new URL(req.url).searchParams.get('q') ?? '').replace(/\s+/g, ' ').trim().slice(0, 120)
  if (q.length < 3) return NextResponse.json({ suggestions: [] })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (tooMany(ip)) return NextResponse.json({ suggestions: [] }, { status: 429 })

  const key = q.toLowerCase()
  const hit = cache.get(key)
  if (hit) return NextResponse.json({ suggestions: hit })

  const url = new URL(PHOTON_URL)
  url.searchParams.set('q', q)
  url.searchParams.set('limit', '12')
  url.searchParams.set('lang', 'en')
  // Lean towards the two facilities' states; a place elsewhere still comes up.
  url.searchParams.set('lat', '44.0')
  url.searchParams.set('lon', '-90.5')
  url.searchParams.set('location_bias_scale', '0.3')
  url.searchParams.append('layer', 'house')
  url.searchParams.append('layer', 'street')

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  let features: { properties?: PhotonProps }[] = []
  let answered = false
  try {
    const res = await fetch(url, { headers: { 'user-agent': USER_AGENT, accept: 'application/json' }, signal: ctrl.signal })
    if (res.ok) { features = ((await res.json()) as { features?: typeof features }).features ?? []; answered = true }
  } catch {
    // Offline or slow: no suggestions, the field still takes whatever is typed.
  } finally {
    clearTimeout(timer)
  }

  const seen = new Set<string>()
  const suggestions: AddressSuggestion[] = []
  for (const f of features) {
    const p = f.properties ?? {}
    if (p.countrycode !== 'US') continue
    const street = p.street ?? (p.type === 'street' ? p.name : undefined)
    if (!street) continue
    const state = stateCode(p.state ?? '')
    const city = p.city ?? p.town ?? p.village ?? p.district ?? ''
    const zip = (p.postcode ?? '').match(/^\d{5}/)?.[0] ?? ''
    if (!state || !city) continue
    const line = p.housenumber ? `${p.housenumber} ${street}` : street
    const label = `${line}, ${city}, ${state}${zip ? ` ${zip}` : ''}`
    if (seen.has(label)) continue
    seen.add(label)
    suggestions.push({ line, city, state, zip, label })
    if (suggestions.length >= 6) break
  }

  // Only a real answer is kept; a timeout is asked again next time.
  if (answered) {
    if (cache.size > 2000) cache.clear()
    cache.set(key, suggestions)
  }
  return NextResponse.json({ suggestions })
}
