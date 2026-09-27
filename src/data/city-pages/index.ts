import type { ServiceSlug } from '@/data/service-locations'
import type { CityPage } from './types'
import { CHICAGO_BATTERY } from './chicago-battery'
import { CHICAGO_LIGHT_BULB } from './chicago-light-bulb'
import { BLAINE_BATTERY } from './blaine-battery'
import { BLAINE_LIGHT_BULB } from './blaine-light-bulb'
import { BLAINE_ELECTRONICS } from './blaine-electronics'
import { NEW_BERLIN_BATTERY } from './new-berlin-battery'
import { NEW_BERLIN_LIGHT_BULB } from './new-berlin-light-bulb'
import { NEW_BERLIN_ELECTRONICS } from './new-berlin-electronics'

export type { CityPage } from './types'

/**
 * The eight city service pages of 27 Sep 2026 (see types.ts). Chicago
 * electronics, built two days earlier at /electronic-recycling-chicago/, has
 * its own component and is not here.
 *
 * URLs (Asim, 27 Sep 2026: "reuse existing, add Chicago ones"):
 *   Chicago            /battery-recycling-chicago/, /light-bulb-recycling-chicago/
 *                      — explicit routes beside /electronic-recycling-chicago/.
 *   Blaine, New Berlin /minnesota-recycling/<service>/, /wisconsin-recycling/<service>/
 *                      — the [service] routes of 24 Sep; FIXED_FACILITY_PAGES
 *                      below is what makes those six render this copy instead
 *                      of the admin-managed content.
 *
 * NOT LINKED FROM THE MENUS ("only available through URLs"), but indexed and
 * in the sitemap (Asim: "yes, index them"): sitemap.ts lists the six facility
 * URLs by hand, because it skips [service] folders, and the two Chicago
 * routes are picked up by its folder walk.
 */
export const CITY_PAGES: CityPage[] = [
  CHICAGO_BATTERY, CHICAGO_LIGHT_BULB,
  BLAINE_BATTERY, BLAINE_LIGHT_BULB, BLAINE_ELECTRONICS,
  NEW_BERLIN_BATTERY, NEW_BERLIN_LIGHT_BULB, NEW_BERLIN_ELECTRONICS,
]

/** The facility pages by site slug and service, for the two [service] routes. */
export const FIXED_FACILITY_PAGES: Record<'minnesota' | 'wisconsin', Partial<Record<ServiceSlug, CityPage>>> = {
  minnesota: {
    'battery-recycling': BLAINE_BATTERY,
    'light-bulb-recycling': BLAINE_LIGHT_BULB,
    'electronic-recycling': BLAINE_ELECTRONICS,
  },
  wisconsin: {
    'battery-recycling': NEW_BERLIN_BATTERY,
    'light-bulb-recycling': NEW_BERLIN_LIGHT_BULB,
    'electronic-recycling': NEW_BERLIN_ELECTRONICS,
  },
}

export function fixedFacilityPage(site: string, service: string): CityPage | null {
  const bySite = (FIXED_FACILITY_PAGES as Record<string, Partial<Record<string, CityPage>>>)[site]
  return bySite?.[service] ?? null
}

/** The six facility URLs, for the sitemap. */
export const FIXED_FACILITY_URLS: string[] = Object.values(FIXED_FACILITY_PAGES)
  .flatMap((m) => Object.values(m))
  .map((p) => p!.url)
