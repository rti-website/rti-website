/**
 * Distance on the ground between two points, and where the two facilities are.
 *
 * Shared by the locator route (/api/locate) and nothing else yet. No `server-only`
 * on purpose: the numbers here are public — they are the facilities' own
 * addresses — and a client that wanted to draw a distance could use it too.
 */

export type LatLng = { lat: number; lng: number }

/**
 * The two facilities, as points.
 *
 * !! APPROXIMATE — taken from the ZIP-code area, not the parcel, and marked
 * so a reader does not mistake them for surveyed coordinates. Good to about
 * two miles, which is nothing against the ~330 miles between the two sites:
 * the locator's job is to say WHICH facility is nearer and roughly how far,
 * and a two-mile error changes neither. To tighten them, right-click the
 * building in Google Maps, "What's here?", and paste the pair in.
 *
 * Keyed by the facility slug in src/data/facilities.ts so the route can join
 * the two without a second lookup table.
 */
export const FACILITY_POINTS: Record<'minnesota-recycling' | 'wisconsin-recycling', LatLng> = {
  'minnesota-recycling': { lat: 45.172, lng: -93.223 }, // 1525 99th Ln NE, Blaine MN 55449 — approx.
  'wisconsin-recycling': { lat: 42.94,  lng: -88.13 },  // 2815 S 171st St, New Berlin WI 53151 — approx.
}

const EARTH_MILES = 3958.7613

/** Great-circle distance in statute miles. Haversine; fine at any range on Earth. */
export function milesBetween(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_MILES * Math.asin(Math.min(1, Math.sqrt(s)))
}
