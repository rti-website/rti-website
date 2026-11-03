import type { LocalPage } from './types'
import type { DocKey } from '@/content/registry'
import { WISCONSIN_AIRBAG_RECYCLING } from './wisconsin-airbag-recycling'
import { WISCONSIN_BALLAST_RECYCLING } from './wisconsin-ballast-recycling'
import { WISCONSIN_BATTERY_RECYCLING } from './wisconsin-battery-recycling'
import { WISCONSIN_ELECTRONIC_RECYCLING } from './wisconsin-electronic-recycling'
import { WISCONSIN_LIGHT_BULB_RECYCLING } from './wisconsin-light-bulb-recycling'
import { WISCONSIN_OFF_SITE_SHREDDING } from './wisconsin-off-site-shredding'
import { WISCONSIN_PAPER_SHREDDING } from './wisconsin-paper-shredding'
import { WISCONSIN_PHONE_SHREDDING } from './wisconsin-phone-shredding'
import { CHICAGO_BALLAST_RECYCLING } from './chicago-ballast-recycling'
import { CHICAGO_BATTERY_RECYCLING } from './chicago-battery-recycling'
import { CHICAGO_HARD_DRIVE_DESTRUCTION } from './chicago-hard-drive-destruction'
import { CHICAGO_LIGHT_BULB_RECYCLING } from './chicago-light-bulb-recycling'
import { CHICAGO_OFF_SITE_SHREDDING } from './chicago-off-site-shredding'
import { CHICAGO_PAPER_SHREDDING } from './chicago-paper-shredding'
import { CHICAGO_PHONE_SHREDDING } from './chicago-phone-shredding'
import { CHICAGO_TV_RECYCLING } from './chicago-tv-recycling'
import { CHICAGO_ELECTRONIC_RECYCLING } from './chicago-electronic-recycling'
import { BLAINE_ELECTRONIC_RECYCLING } from './blaine-electronic-recycling'
import { BLAINE_BATTERY_RECYCLING } from './blaine-battery-recycling'
import { BLAINE_LIGHT_BULB_RECYCLING } from './blaine-light-bulb-recycling'
import { BLAINE_BALLAST_RECYCLING } from './blaine-ballast-recycling'
import { BLAINE_PAPER_SHREDDING } from './blaine-paper-shredding'
import { BLAINE_PHONE_SHREDDING } from './blaine-phone-shredding'
import { BLAINE_OFF_SITE_SHREDDING } from './blaine-off-site-shredding'
import { BLAINE_HARD_DRIVE_DESTRUCTION } from './blaine-hard-drive-destruction'
import { BLAINE_TELEVISION_RECYCLING } from './blaine-television-recycling'
import { BLAINE_AIRBAG_RECYCLING } from './blaine-airbag-recycling'
import { PHOENIX_ELECTRONIC_RECYCLING } from './phoenix-electronic-recycling'
import { PHOENIX_BATTERY_RECYCLING } from './phoenix-battery-recycling'
import { PHOENIX_LIGHT_BULB_RECYCLING } from './phoenix-light-bulb-recycling'
import { PHOENIX_BALLAST_RECYCLING } from './phoenix-ballast-recycling'
import { LEWISBURG_ELECTRONIC_RECYCLING } from './lewisburg-electronic-recycling'
import { LEWISBURG_BATTERY_RECYCLING } from './lewisburg-battery-recycling'
import { LEWISBURG_LIGHT_BULB_RECYCLING } from './lewisburg-light-bulb-recycling'
import { LEWISBURG_BALLAST_RECYCLING } from './lewisburg-ballast-recycling'

export type { LocalPage } from './types'

/**
 * The location service pages of 30 Sep 2026 (see types.ts), 27 of them:
 * ten for Chicago, nine for Minnesota (Blaine), eight for Wisconsin (New
 * Berlin). The Minnesota and Wisconsin TV pages were built too and taken out
 * on 1 Oct 2026 (management): /minnesota-recycling/tv-recycling/ and
 * /wisconsin-recycling/tv-recycling/ 301 to /tv-recycling-in-minnesota/ and
 * /tv-recycling-in-wisconsin/, the WordPress pages (data/url-map.csv). The tenth Wisconsin frame, Hard Drive Destruction, is missing
 * from the Figma file: its link opens a second copy of the electronics frame
 * ("duplicate section in source PDF" in the frame's own name).
 *
 * Nine of them replace the city pages of 25 and 27 Sep 2026 at the same URLs
 * (Chicago, Blaine and New Berlin battery, light bulb and electronics); the
 * SEO titles and descriptions of those nine stay as they were.
 */
export const LOCAL_PAGES: LocalPage[] = [
  WISCONSIN_AIRBAG_RECYCLING,
  WISCONSIN_BALLAST_RECYCLING,
  WISCONSIN_BATTERY_RECYCLING,
  WISCONSIN_ELECTRONIC_RECYCLING,
  WISCONSIN_LIGHT_BULB_RECYCLING,
  WISCONSIN_OFF_SITE_SHREDDING,
  WISCONSIN_PAPER_SHREDDING,
  WISCONSIN_PHONE_SHREDDING,
  CHICAGO_BALLAST_RECYCLING,
  CHICAGO_BATTERY_RECYCLING,
  CHICAGO_HARD_DRIVE_DESTRUCTION,
  CHICAGO_LIGHT_BULB_RECYCLING,
  CHICAGO_OFF_SITE_SHREDDING,
  CHICAGO_PAPER_SHREDDING,
  CHICAGO_PHONE_SHREDDING,
  CHICAGO_TV_RECYCLING,
  CHICAGO_ELECTRONIC_RECYCLING,
]

/**
 * THE PAGES FROM THE CONTENT TEAM'S DOCS (3 Nov 2026, management sheet "all
 * plan rti 1": its Minnesota, Arizona and Lewisburg tabs). One service at one
 * facility, at the sheet's new URLs, drawn by LocalServicePage like the pages
 * above:
 *
 *   /minnesota/blaine/<service>/     nine, replacing /minnesota-recycling/<service>/
 *                                    (deleted, no redirect, as the sheet says;
 *                                    television-recycling takes the 301 from
 *                                    /tv-recycling-in-minnesota/)
 *   /arizona/phoenix/<service>/      four (electronics, batteries, bulbs, ballasts)
 *   /tennessee/lewisburg/<service>/  the same four
 *
 * Served by the [...slug] catch-all (docLocalPage below). The airbag page came
 * later the same day: the sheet's Airbags row linked the ballast doc, and
 * management sent the airbag doc separately ("Blaine Airbag Recycling Page").
 */
export const DOC_PAGES: LocalPage[] = [
  BLAINE_ELECTRONIC_RECYCLING, BLAINE_BATTERY_RECYCLING, BLAINE_LIGHT_BULB_RECYCLING, BLAINE_BALLAST_RECYCLING,
  BLAINE_PAPER_SHREDDING, BLAINE_PHONE_SHREDDING, BLAINE_OFF_SITE_SHREDDING, BLAINE_HARD_DRIVE_DESTRUCTION,
  BLAINE_TELEVISION_RECYCLING, BLAINE_AIRBAG_RECYCLING,
  PHOENIX_ELECTRONIC_RECYCLING, PHOENIX_BATTERY_RECYCLING, PHOENIX_LIGHT_BULB_RECYCLING, PHOENIX_BALLAST_RECYCLING,
  LEWISBURG_ELECTRONIC_RECYCLING, LEWISBURG_BATTERY_RECYCLING, LEWISBURG_LIGHT_BULB_RECYCLING, LEWISBURG_BALLAST_RECYCLING,
]

/** The doc page at this URL, for the catch-all ('/arizona/phoenix/battery-recycling' or with the slash). */
export function docLocalPage(url: string): LocalPage | null {
  const u = url.endsWith('/') ? url : url + '/'
  return DOC_PAGES.find((p) => p.url === u) ?? null
}

/**
 * The Blaine pages by service slug: what the /minnesota-recycling/ facility
 * page's service tiles and "All services at this location" links open
 * (facilityServicePage below), now that the old /minnesota-recycling/<service>/
 * pages are gone.
 */
export const BLAINE_PAGES: Record<string, LocalPage> = {
  'electronic-recycling': BLAINE_ELECTRONIC_RECYCLING,
  'battery-recycling': BLAINE_BATTERY_RECYCLING,
  'light-bulb-recycling': BLAINE_LIGHT_BULB_RECYCLING,
  'ballast-recycling': BLAINE_BALLAST_RECYCLING,
  'hard-drive-destruction': BLAINE_HARD_DRIVE_DESTRUCTION,
  'paper-shredding': BLAINE_PAPER_SHREDDING,
  'off-site-shredding': BLAINE_OFF_SITE_SHREDDING,
  'phone-shredding': BLAINE_PHONE_SHREDDING,
  'tv-recycling': BLAINE_TELEVISION_RECYCLING,
  'airbag-recycling': BLAINE_AIRBAG_RECYCLING,
}

/**
 * The /minnesota-recycling/<service>/ URLs deleted on 3 Nov 2026 (the sheet
 * says Delete, no redirect). The [service] route 404s them even if Admin ->
 * Locations still has a published service page for one.
 */
export const DELETED_MINNESOTA_SERVICES = new Set([
  'electronic-recycling', 'battery-recycling', 'light-bulb-recycling', 'ballast-recycling',
  'airbag-recycling', 'paper-shredding', 'phone-shredding', 'off-site-shredding',
  // 3 Nov 2026 (Aaqib): the old hard drive page too; /minnesota/blaine/hard-drive-destruction/ replaces it.
  'hard-drive-destruction',
])

/** The Minnesota and Wisconsin pages by service slug, for the two [service] routes. */
export const LOCAL_FACILITY_PAGES: Record<'minnesota' | 'wisconsin', Record<string, LocalPage>> = {
  minnesota: {
  },
  wisconsin: {
    'airbag-recycling': WISCONSIN_AIRBAG_RECYCLING,
    'ballast-recycling': WISCONSIN_BALLAST_RECYCLING,
    'battery-recycling': WISCONSIN_BATTERY_RECYCLING,
    'electronic-recycling': WISCONSIN_ELECTRONIC_RECYCLING,
    'light-bulb-recycling': WISCONSIN_LIGHT_BULB_RECYCLING,
    'off-site-shredding': WISCONSIN_OFF_SITE_SHREDDING,
    'paper-shredding': WISCONSIN_PAPER_SHREDDING,
    'phone-shredding': WISCONSIN_PHONE_SHREDDING,
  },
}

/**
 * Short names for the facility pages' "All services at this location" links
 * (9 Oct 2026, SEO sheet "Technical Fixes", Orphan Pages: hard drive, paper,
 * phone and off-site shredding had no link from /minnesota-recycling/ or
 * /wisconsin-recycling/).
 */
export const LOCAL_SERVICE_LABEL: Record<string, string> = {
  'electronic-recycling': 'Electronic Recycling',
  'battery-recycling': 'Battery Recycling',
  'light-bulb-recycling': 'Light Bulb Recycling',
  'ballast-recycling': 'Ballast Recycling',
  'airbag-recycling': 'Airbag Recycling',
  'hard-drive-destruction': 'Hard Drive Destruction',
  'paper-shredding': 'Paper Shredding',
  'off-site-shredding': 'Off-Site Shredding',
  'phone-shredding': 'Phone Shredding',
  'tv-recycling': 'TV Recycling',
}

export function localFacilityPage(site: string, service: string): LocalPage | null {
  return (LOCAL_FACILITY_PAGES as Record<string, Record<string, LocalPage>>)[site]?.[service] ?? null
}

/** The page a facility page's service link opens: Minnesota's Blaine pages first, then the facility's own. */
export function facilityServicePage(site: string, service: string): LocalPage | null {
  return (site === 'minnesota' ? BLAINE_PAGES[service] : undefined) ?? localFacilityPage(site, service)
}

/**
 * Each page's document in Admin -> Pages (src/content/registry.ts):
 * `local/` and the URL's path with / as -, e.g. local/wisconsin-recycling-airbag-recycling.
 * A route renders `await content(localDocKey(page))`, the page with the
 * admin's edits over it; metadata and the sitemap read the objects here.
 */
export function localDocKey(page: LocalPage): DocKey {
  return `local/${page.url.replace(/^\/|\/$/g, '').replace(/\//g, '-')}` as DocKey
}

/** The Minnesota and Wisconsin URLs, for the sitemap (its folder walk skips [service] routes). */
export const LOCAL_FACILITY_URLS: string[] = [
  ...Object.values(LOCAL_FACILITY_PAGES).flatMap((m) => Object.values(m)).map((p) => p.url),
  ...DOC_PAGES.map((p) => p.url),
]
