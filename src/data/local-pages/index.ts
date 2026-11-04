import type { LocalPage } from './types'
import type { DocKey } from '@/content/registry'
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
import { OCALA_ELECTRONIC_RECYCLING } from './ocala-electronic-recycling'
import { OCALA_BATTERY_RECYCLING } from './ocala-battery-recycling'
import { OCALA_LIGHT_BULB_RECYCLING } from './ocala-light-bulb-recycling'
import { OCALA_BALLAST_RECYCLING } from './ocala-ballast-recycling'
import { GREENWOOD_ELECTRONIC_RECYCLING } from './greenwood-electronic-recycling'
import { GREENWOOD_BATTERY_RECYCLING } from './greenwood-battery-recycling'
import { GREENWOOD_LIGHT_BULB_RECYCLING } from './greenwood-light-bulb-recycling'
import { ONTARIO_ELECTRONIC_RECYCLING } from './ontario-electronic-recycling'
import { ONTARIO_BATTERY_RECYCLING } from './ontario-battery-recycling'
import { ONTARIO_LIGHT_BULB_RECYCLING } from './ontario-light-bulb-recycling'
import { ONTARIO_BALLAST_RECYCLING } from './ontario-ballast-recycling'
import { NEW_BERLIN_ELECTRONIC_RECYCLING } from './new-berlin-electronic-recycling'
import { NEW_BERLIN_BATTERY_RECYCLING } from './new-berlin-battery-recycling'
import { NEW_BERLIN_LIGHT_BULB_RECYCLING } from './new-berlin-light-bulb-recycling'
import { NEW_BERLIN_BALLAST_RECYCLING } from './new-berlin-ballast-recycling'
import { NEW_BERLIN_AIRBAG_RECYCLING } from './new-berlin-airbag-recycling'
import { NEW_BERLIN_PAPER_SHREDDING } from './new-berlin-paper-shredding'
import { NEW_BERLIN_PHONE_SHREDDING } from './new-berlin-phone-shredding'
import { NEW_BERLIN_TELEVISION_RECYCLING } from './new-berlin-television-recycling'
import { KENNESAW_ELECTRONIC_RECYCLING } from './kennesaw-electronic-recycling'
import { KENNESAW_BATTERY_RECYCLING } from './kennesaw-battery-recycling'
import { KENNESAW_LIGHT_BULB_RECYCLING } from './kennesaw-light-bulb-recycling'
import { KENNESAW_BALLAST_RECYCLING } from './kennesaw-ballast-recycling'
import { FORT_WORTH_ELECTRONIC_RECYCLING } from './fort-worth-electronic-recycling'
import { FORT_WORTH_BATTERY_RECYCLING } from './fort-worth-battery-recycling'
import { FORT_WORTH_LIGHT_BULB_RECYCLING } from './fort-worth-light-bulb-recycling'
import { FORT_WORTH_BALLAST_RECYCLING } from './fort-worth-ballast-recycling'

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
 *   /florida/ocala/<service>/        the same four (4 Nov 2026, the sheet's Florida tab)
 *   /indiana/greenwood/<service>/    electronics, batteries, bulbs (Indiana tab; the
 *                                    ballast doc in the sheet could not be opened)
 *   /california/ontario/<service>/   the same four (California tab)
 *   /wisconsin/new-berlin/<service>/ eight (5 Nov 2026, the sheet "RTI ALL PLAN", Wisconsin tab),
 *                                    replacing /wisconsin-recycling/<service>/ (deleted, no
 *                                    redirect; off-site shredding has no new page);
 *                                    television-recycling takes the 301 from
 *                                    /tv-recycling-in-wisconsin/
 *   /georgia/kennesaw/<service>/     electronics, batteries, bulbs, ballasts (Georgia tab; the
 *                                    sheet wrote the bulb page under /georgia/atlanta/, Aaqib
 *                                    chose /georgia/kennesaw/ like the other three)
 *   /texas/fort-worth/<service>/     the same four (Texas tab)
 *
 * All of them in the 4 Nov 2026 design (`design: 2`, LocalServicePageV2).
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
  OCALA_ELECTRONIC_RECYCLING, OCALA_BATTERY_RECYCLING, OCALA_LIGHT_BULB_RECYCLING, OCALA_BALLAST_RECYCLING,
  GREENWOOD_ELECTRONIC_RECYCLING, GREENWOOD_BATTERY_RECYCLING, GREENWOOD_LIGHT_BULB_RECYCLING,
  ONTARIO_ELECTRONIC_RECYCLING, ONTARIO_BATTERY_RECYCLING, ONTARIO_LIGHT_BULB_RECYCLING, ONTARIO_BALLAST_RECYCLING,
  NEW_BERLIN_ELECTRONIC_RECYCLING, NEW_BERLIN_BATTERY_RECYCLING, NEW_BERLIN_LIGHT_BULB_RECYCLING, NEW_BERLIN_BALLAST_RECYCLING,
  NEW_BERLIN_AIRBAG_RECYCLING, NEW_BERLIN_PAPER_SHREDDING, NEW_BERLIN_PHONE_SHREDDING, NEW_BERLIN_TELEVISION_RECYCLING,
  KENNESAW_ELECTRONIC_RECYCLING, KENNESAW_BATTERY_RECYCLING, KENNESAW_LIGHT_BULB_RECYCLING, KENNESAW_BALLAST_RECYCLING,
  FORT_WORTH_ELECTRONIC_RECYCLING, FORT_WORTH_BATTERY_RECYCLING, FORT_WORTH_LIGHT_BULB_RECYCLING, FORT_WORTH_BALLAST_RECYCLING,
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
 * The New Berlin pages by service slug, as BLAINE_PAGES for Minnesota: what
 * the /wisconsin-recycling/ facility page's tiles and "All services at this
 * location" links open (5 Nov 2026). No off-site shredding page: the sheet
 * deleted /wisconsin-recycling/off-site-shredding/ with no new URL.
 */
export const NEW_BERLIN_PAGES: Record<string, LocalPage> = {
  'electronic-recycling': NEW_BERLIN_ELECTRONIC_RECYCLING,
  'battery-recycling': NEW_BERLIN_BATTERY_RECYCLING,
  'light-bulb-recycling': NEW_BERLIN_LIGHT_BULB_RECYCLING,
  'ballast-recycling': NEW_BERLIN_BALLAST_RECYCLING,
  'airbag-recycling': NEW_BERLIN_AIRBAG_RECYCLING,
  'paper-shredding': NEW_BERLIN_PAPER_SHREDDING,
  'phone-shredding': NEW_BERLIN_PHONE_SHREDDING,
  'tv-recycling': NEW_BERLIN_TELEVISION_RECYCLING,
}

/** The facility pages' own service pages: Blaine for Minnesota, New Berlin for Wisconsin. */
export const FACILITY_DOC_PAGES: Record<string, Record<string, LocalPage>> = {
  minnesota: BLAINE_PAGES,
  wisconsin: NEW_BERLIN_PAGES,
}

/**
 * The /wisconsin-recycling/<service>/ URLs deleted on 5 Nov 2026 (the sheet's
 * Wisconsin tab: "delete this page", no redirect). 404 even if Admin ->
 * Locations still has a published service page for one.
 */
export const DELETED_WISCONSIN_SERVICES = new Set([
  'electronic-recycling', 'battery-recycling', 'light-bulb-recycling', 'ballast-recycling',
  'airbag-recycling', 'paper-shredding', 'phone-shredding', 'off-site-shredding',
])

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
  // 5 Nov 2026: Wisconsin's /wisconsin-recycling/<service>/ pages were
  // deleted; the New Berlin pages (NEW_BERLIN_PAGES) replace them.
  wisconsin: {
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

/** The page a facility page's service link opens: Blaine (Minnesota) or New Berlin (Wisconsin) first, then the facility's own. */
export function facilityServicePage(site: string, service: string): LocalPage | null {
  return FACILITY_DOC_PAGES[site]?.[service] ?? localFacilityPage(site, service)
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
