import { NextResponse } from 'next/server'
import { lookupZip, zipPoint, zipsForCity } from '@/lib/zips'
import { stateCode } from '@/lib/us-address'

/**
 * ZIP lookup for the contact form (src/lib/zips.ts).
 *
 *   GET /api/zip/?zip=55449              -> { found, zip, state, city, cities }
 *   GET /api/zip/?city=Blaine&state=MN   -> { state, city, zips, count }
 *
 * Public and read only: it answers what any ZIP directory answers. Responses
 * are cacheable for a day, so a visitor retyping a ZIP costs nothing.
 */
const CACHE = { 'cache-control': 'public, max-age=86400' }

export function GET(req: Request) {
  const q = new URL(req.url).searchParams
  const zip = (q.get('zip') ?? '').trim()
  if (zip) {
    const info = lookupZip(zip)
    // lat / lng (29 Sep 2026): the drop-off pop-up's ZIP search, when the
    // visitor will not share their location (ResidentialHelp).
    const pt = info ? zipPoint(zip) : null
    return NextResponse.json(info ? { found: true, ...info, ...(pt ? { lat: pt.lat, lng: pt.lng } : {}) } : { found: false, zip }, { headers: CACHE })
  }

  const city = (q.get('city') ?? '').trim().slice(0, 80)
  const state = stateCode(q.get('state') ?? '')
  if (!city || !state) return NextResponse.json({ error: 'Send zip, or city and state.' }, { status: 400 })
  const zips = zipsForCity(city, state)
  return NextResponse.json({ state, city, zips: zips.slice(0, 50), count: zips.length }, { headers: CACHE })
}
