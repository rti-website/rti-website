import 'server-only'
import { q } from '@/lib/db'
import { FACILITIES } from '@/data/facilities'
import { FACILITY_POINTS, milesBetween } from '@/lib/geo'
import { stateCode } from '@/lib/us-address'
import { lookupZip, zipPoint, zipsForCity } from '@/lib/zips'
import { geoipAvailable, isPrivateIp, lookupIp, type IpPlace } from '@/lib/geoip'

/**
 * Where an enquiry is from — Asim, 24 Sep 2026: "we have to fetch the
 * location of [the] lead … from where the lead is come". Stored on the lead
 * as `geo` (db/007) and shown in Admin -> Enquiries.
 *
 * Two answers, because they are two different questions:
 *
 *   given    Where they SAY they are: the ZIP they typed (or, on a form with
 *            no ZIP, the first ZIP of the city and state they typed), its
 *            centre point and county. From data/us-zips.tsv, on this server.
 *            With it, the nearest RTI facility and the straight-line miles to
 *            it, and whether that is inside the 100 mile pickup area the site
 *            promises (the battery, light bulb and electronics pages).
 *
 *   ip       Where the connection CAME FROM, from the DB-IP file when it is
 *            installed (src/lib/geoip.ts). Approximate. Most useful as a
 *            check: a "Minnesota" enquiry sent from another country is worth
 *            a second look before anyone drives out to it.
 *
 * Nothing here calls Google. The Maps key Asim was given is a website key
 * (it only answers pages on recycletechnologies.com), and Google refuses a
 * website key for server lookups; tested 24 Sep 2026: "API keys with referer
 * restrictions cannot be used with this API". The admin uses that key the way
 * it is meant to be used: its map, drawn in the admin's browser, puts the pin
 * on the exact street address.
 *
 * Straight-line miles, not driving miles. For "is this inside 100 miles" that
 * is the honest measure, it is what the site's own wording means, and it costs
 * nothing per enquiry. Measured with the store locator's own facility points
 * and formula (src/lib/geo.ts), so the admin and /all-locations/ never
 * disagree about which facility is nearer.
 */

export const PICKUP_RADIUS_MILES = 100

export type LeadGeo = {
  v: 1
  /** When this was worked out. */
  at: string
  given: null | {
    from: 'zip' | 'city'
    zip: string
    city: string
    state: string
    county: string
    lat: number
    lng: number
  }
  nearest: null | { facility: string; miles: number; inPickupArea: boolean }
  ip: IpPlace | null
  /** Why `ip` is what it is. `no-database` is filled in later once the file exists. */
  ipLookup: 'found' | 'not-found' | 'private' | 'no-ip' | 'no-database'
  /** How the IP place compares with the address they typed. */
  ipCheck: null | 'same-state' | 'other-state' | 'outside-us'
}

/** "Blaine, MN" and "New Berlin, WI", with the locator's point for each. */
const SITES = FACILITIES.map((f) => ({ name: `${f.town}, ${stateCode(f.state) ?? f.state}`, point: FACILITY_POINTS[f.slug] }))

export function locate(input: {
  zip?: string | null
  city?: string | null
  state?: string | null
  ip?: string | null
}): LeadGeo {
  // ---------------------------------------------------------- what they typed
  let given: LeadGeo['given'] = null
  const zip = (input.zip ?? '').trim().slice(0, 5)
  const typedState = stateCode(input.state ?? '')
  const byZip = /^\d{5}$/.test(zip) ? { zip, from: 'zip' as const } : null
  const byCity = !byZip && input.city && typedState
    ? ((z) => (z ? { zip: z, from: 'city' as const } : null))(zipsForCity(input.city, typedState)[0])
    : null
  const pick = byZip ?? byCity
  if (pick) {
    const info = lookupZip(pick.zip)
    const point = zipPoint(pick.zip)
    if (info && point) {
      given = {
        from: pick.from,
        zip: pick.zip,
        city: info.city,
        state: info.state,
        county: point.county,
        lat: point.lat,
        lng: point.lng,
      }
    }
  }

  let nearest: LeadGeo['nearest'] = null
  if (given) {
    for (const f of SITES) {
      const m = milesBetween(given, f.point)
      if (!nearest || m < nearest.miles) nearest = { facility: f.name, miles: m, inPickupArea: false }
    }
    if (nearest) {
      nearest.miles = Math.round(nearest.miles)
      nearest.inPickupArea = nearest.miles <= PICKUP_RADIUS_MILES
    }
  }

  // --------------------------------------------------------- where it came from
  let ip: IpPlace | null = null
  let ipLookup: LeadGeo['ipLookup']
  const rawIp = (input.ip ?? '').trim()
  if (!rawIp) ipLookup = 'no-ip'
  else if (isPrivateIp(rawIp)) ipLookup = 'private'
  else if (!geoipAvailable()) ipLookup = 'no-database'
  else {
    ip = lookupIp(rawIp)
    ipLookup = ip ? 'found' : 'not-found'
  }

  let ipCheck: LeadGeo['ipCheck'] = null
  if (ip) {
    if (ip.countryCode && ip.countryCode !== 'US') ipCheck = 'outside-us'
    else if (given && ip.region) ipCheck = stateCode(ip.region) === given.state ? 'same-state' : 'other-state'
  }

  return { v: 1, at: new Date().toISOString(), given, nearest, ip, ipLookup, ipCheck }
}

type Row = { id: number; ip: string | null; zip: string | null; city: string | null; state: string | null }

function forRow(r: Row): LeadGeo {
  return locate({ zip: r.zip, city: r.city, state: r.state, ip: r.ip })
}

/** Work out and store one lead's location. Never throws: a lead is never lost over this. */
export async function locateLead(id: number): Promise<void> {
  try {
    const rows = await q<Row>(
      `SELECT id, host(ip) AS ip, details->>'zip' AS zip, details->>'city' AS city, details->>'state' AS state
         FROM leads WHERE id = $1`, [id])
    if (!rows[0]) return
    await q(`UPDATE leads SET geo = $2::jsonb WHERE id = $1`, [id, JSON.stringify(forRow(rows[0]))])
  } catch (err) {
    console.error('[leads] location not saved:', (err as Error).message)
  }
}

/**
 * Fill in enquiries that have no location yet — the ones from before db/007,
 * and any whose after-submit step did not run. Also redoes the IP part of
 * rows saved while the IP database was missing, once it is there. Called by
 * Admin -> Enquiries before it lists; cheap (a few ms for hundreds of rows).
 * A database without db/007 simply returns without doing anything.
 */
export async function fillMissingLocations(limit = 500): Promise<number> {
  try {
    const withDb = geoipAvailable()
    const rows = await q<Row>(
      `SELECT id, host(ip) AS ip, details->>'zip' AS zip, details->>'city' AS city, details->>'state' AS state
         FROM leads
        WHERE geo IS NULL
           OR ($2 AND geo->>'ipLookup' = 'no-database' AND ip IS NOT NULL)
        ORDER BY id DESC LIMIT $1`, [limit, withDb])
    for (const r of rows) {
      await q(`UPDATE leads SET geo = $2::jsonb WHERE id = $1`, [r.id, JSON.stringify(forRow(r))])
    }
    return rows.length
  } catch (err) {
    // Most likely db/007 has not been run on this database yet.
    console.warn('[leads] locations not filled in:', (err as Error).message)
    return 0
  }
}
