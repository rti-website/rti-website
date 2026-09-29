import { MINNESOTA, WISCONSIN } from '@/data/facilities'
import { SITE_SEEDS } from '@/data/service-locations'
import { FACILITY_POINTS, type LatLng } from '@/lib/geo'
import { zipPoint } from '@/lib/zips'
import { path } from '@/lib/urls'

/**
 * Every drop-off location, as a point — for the "nearest drop-off facility"
 * pop-up on the forms (ResidentialHelp, 29 Sep 2026).
 *
 * The two Recycle Technologies facilities (Blaine, MN and New Berlin, WI)
 * and the eight partner drop-off sites of the "Additional Facilities
 * Nationwide" list (SITE_SEEDS in src/data/service-locations.ts). The two
 * facilities use their own points (FACILITY_POINTS); a partner's is the
 * centre of its ZIP code, good to a mile or two, which is plenty for "which
 * is nearest and roughly how far".
 *
 * Built on the server (the ZIP table is read from disk) and handed to the
 * form as plain data, so the distance is worked out in the browser and the
 * visitor's location never leaves it.
 */
export type DropoffSite = {
  name: string
  kind: 'facility' | 'partner'
  address: string
  phone: string
  hours: string
  /** The facility's page on this site; partners have none published. */
  page: string | null
  lat: number
  lng: number
}

export function dropoffSites(): DropoffSite[] {
  const out: DropoffSite[] = [
    {
      name: `Recycle Technologies, ${MINNESOTA.town}, MN`, kind: 'facility', address: MINNESOTA.address,
      phone: MINNESOTA.phone, hours: MINNESOTA.hours, page: path(MINNESOTA.url), ...FACILITY_POINTS['minnesota-recycling'],
    },
    {
      name: `Recycle Technologies, ${WISCONSIN.town}, WI`, kind: 'facility', address: WISCONSIN.address,
      phone: WISCONSIN.phone, hours: WISCONSIN.hours, page: path(WISCONSIN.url), ...FACILITY_POINTS['wisconsin-recycling'],
    },
  ]
  for (const s of SITE_SEEDS) {
    if (s.data.operator !== 'partner' || !s.data.dropoff) continue
    const zip = s.data.address.match(/\b(\d{5})(?:-\d{4})?\s*$/)?.[1]
    const pt: LatLng | null = zip ? zipPoint(zip) : null
    if (!pt) continue
    out.push({
      name: s.data.name, kind: 'partner', address: s.data.address, phone: s.data.phone,
      hours: s.data.hours, page: null, lat: pt.lat, lng: pt.lng,
    })
  }
  return out
}
