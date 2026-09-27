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

/**
 * Each page's document in Admin -> Pages (src/content/registry.ts), by URL.
 * A route renders `await content(cityDocKey(page))`, the page with the
 * admin's edits over it; metadata and the sitemap keep reading the static
 * objects here.
 */
export type CityDocKey =
  | 'city/chicago-battery' | 'city/chicago-light-bulb'
  | 'city/blaine-battery' | 'city/blaine-light-bulb' | 'city/blaine-electronics'
  | 'city/new-berlin-battery' | 'city/new-berlin-light-bulb' | 'city/new-berlin-electronics'

export const CITY_DOC_KEY: Record<string, CityDocKey> = {
  [CHICAGO_BATTERY.url]:        'city/chicago-battery',
  [CHICAGO_LIGHT_BULB.url]:     'city/chicago-light-bulb',
  [BLAINE_BATTERY.url]:         'city/blaine-battery',
  [BLAINE_LIGHT_BULB.url]:      'city/blaine-light-bulb',
  [BLAINE_ELECTRONICS.url]:     'city/blaine-electronics',
  [NEW_BERLIN_BATTERY.url]:     'city/new-berlin-battery',
  [NEW_BERLIN_LIGHT_BULB.url]:  'city/new-berlin-light-bulb',
  [NEW_BERLIN_ELECTRONICS.url]: 'city/new-berlin-electronics',
}

/** The Admin -> Pages document of a city page. Throws on a page with none, so a new page cannot ship unwired. */
export function cityDocKey(page: CityPage): CityDocKey {
  const key = CITY_DOC_KEY[page.url]
  if (!key) throw new Error(`src/data/city-pages/index.ts: no CITY_DOC_KEY for ${page.url}`)
  return key
}

/** The six facility URLs, for the sitemap. */
export const FIXED_FACILITY_URLS: string[] = Object.values(FIXED_FACILITY_PAGES)
  .flatMap((m) => Object.values(m))
  .map((p) => p!.url)
