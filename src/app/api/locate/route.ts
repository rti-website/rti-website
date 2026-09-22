import { NextResponse } from 'next/server'
import { FACILITY_POINTS, milesBetween, type LatLng } from '@/lib/geo'

/**
 * The store locator: a city or ZIP in, the nearest facility out.
 *
 * ===========================================================================
 * WHY THIS EXISTS — Asim, 22 Sep 2026: "when user search a code show the
 * nearest location to him"
 * ===========================================================================
 * The search bar on /all-locations/ shipped inert (the doc marked the map
 * "needs directions"). This turns it into a real locator with no map SDK, no
 * API key and no third-party script on the page: the browser posts the text
 * here, this route turns it into a point, and the nearest of the two
 * facilities is a distance calculation.
 *
 * HOW A QUERY BECOMES A POINT
 *   A five-digit ZIP goes to Zippopotam (api.zippopotam.us) — a free, keyless
 *   ZIP database that answers in milliseconds. Anything else goes to
 *   Nominatim, OpenStreetMap's geocoder, restricted to the US. Both are
 *   called from HERE, never from the browser: Zippopotam has no CORS, and
 *   Nominatim's usage policy wants an identifying User-Agent and no more than
 *   one request a second, which only a server can promise. The two providers
 *   are env-overridable (see GEOCODE_ZIP_URL / GEOCODE_SEARCH_URL) so they
 *   can be swapped, or pointed at a mock, without a code change.
 *
 * WHY NOT THE CENSUS GEOCODER — it was the first choice (US government, no
 * key, no policy), but it refuses anything without a street: "At a minimum,
 * the geocoder expects the street and zip parameters OR the street, city, and
 * state parameters." A locator's whole input is a ZIP or a city.
 *
 * CACHED IN MEMORY. A ZIP's coordinates do not change, and a city's do not
 * either; every successful lookup is kept for the life of the process, so
 * the same query never goes upstream twice and Nominatim's one-a-second
 * ceiling is a non-issue in practice. Resets on deploy; that is fine.
 *
 * WHAT GOES UPSTREAM: the text the visitor typed, and nothing else — no IP,
 * no cookie, no page. The visitor's IP is not forwarded.
 *
 * Dynamic by design, like /api/leads — a route handler is outside
 * app/layout.tsx, so `dynamic = 'error'` (CLAUDE.md rule 2) does not apply
 * and the prerendered pages are untouched.
 */

const ZIP_URL = process.env.GEOCODE_ZIP_URL ?? 'https://api.zippopotam.us/us/{zip}'
const SEARCH_URL = process.env.GEOCODE_SEARCH_URL
  ?? 'https://nominatim.openstreetmap.org/search?q={q}&format=jsonv2&limit=1&countrycodes=us'
/** Nominatim's policy asks for a User-Agent that identifies the application. */
const USER_AGENT = 'recycletechnologies.com locator (dispatch@recycletechnologies.com)'
const TIMEOUT_MS = 6000

type Located = LatLng & { label: string }

const cache = new Map<string, Located>()

/* Same in-memory speed bump as the other public routes. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60 * 1000
const MAX_IN_WINDOW = 20
function tooMany(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_IN_WINDOW
}

async function fetchJson(url: string): Promise<unknown> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { headers: { 'user-agent': USER_AGENT, accept: 'application/json' }, signal: ctrl.signal })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function locateZip(zip: string): Promise<Located | null> {
  const data = (await fetchJson(ZIP_URL.replace('{zip}', zip))) as
    | { places?: { 'place name'?: string; 'state abbreviation'?: string; latitude?: string; longitude?: string }[] }
    | null
  const p = data?.places?.[0]
  const lat = Number(p?.latitude); const lng = Number(p?.longitude)
  if (!p || !Number.isFinite(lat) || !Number.isFinite(lng)) return null
  const town = [p['place name'], p['state abbreviation']].filter(Boolean).join(', ')
  return { lat, lng, label: town ? `${town} ${zip}` : zip }
}

async function locateText(q: string): Promise<Located | null> {
  const data = (await fetchJson(SEARCH_URL.replace('{q}', encodeURIComponent(q)))) as
    | { lat?: string; lon?: string; name?: string; display_name?: string }[]
    | null
  const r = Array.isArray(data) ? data[0] : null
  const lat = Number(r?.lat); const lng = Number(r?.lon)
  if (!r || !Number.isFinite(lat) || !Number.isFinite(lng)) return null
  // "Minneapolis, Hennepin County, Minnesota, United States" → "Minneapolis, Minnesota"
  const parts = (r.display_name ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const label = parts.length >= 3 ? `${parts[0]}, ${parts[parts.length - 2]}` : (r.name || q)
  return { lat, lng, label }
}

export async function POST(req: Request): Promise<Response> {
  let q = ''
  try {
    const body = (await req.json()) as { q?: unknown }
    q = typeof body.q === 'string' ? body.q.trim().slice(0, 80) : ''
  } catch {
    return NextResponse.json({ error: 'Could not read that.' }, { status: 400 })
  }
  if (q.length < 2) {
    return NextResponse.json({ error: 'Type a city or a ZIP code.' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  if (ip && tooMany(ip)) {
    return NextResponse.json({ error: 'That is a lot of searches. Give it a minute.' }, { status: 429 })
  }

  const key = q.toLowerCase().replace(/\s+/g, ' ')
  let where = cache.get(key) ?? null
  if (!where) {
    // A 5-digit ZIP, with or without the +4 — the +4 is dropped, Zippopotam
    // does not know it and the centroid is the same.
    const zip = /^(\d{5})(?:-\d{4})?$/.exec(q)?.[1]
    where = zip ? await locateZip(zip) : await locateText(q)
    if (where) cache.set(key, where)
  }

  if (!where) {
    // 200, not 404: the request worked, the place just was not found. The
    // client shows a "try a ZIP" hint on `found: false` and an error on !ok.
    return NextResponse.json({ ok: true, found: false, q })
  }

  const results = (Object.keys(FACILITY_POINTS) as (keyof typeof FACILITY_POINTS)[])
    .map((slug) => ({ slug, miles: Math.round(milesBetween(where!, FACILITY_POINTS[slug])) }))
    .sort((a, b) => a.miles - b.miles)

  return NextResponse.json({ ok: true, found: true, q, label: where.label, results })
}
