import type { LocalPage } from './types'
import type { DocKey } from '@/content/registry'
import { WISCONSIN_AIRBAG_RECYCLING } from './wisconsin-airbag-recycling'
import { WISCONSIN_BALLAST_RECYCLING } from './wisconsin-ballast-recycling'
import { WISCONSIN_BATTERY_RECYCLING } from './wisconsin-battery-recycling'
import { WISCONSIN_ELECTRONIC_RECYCLING } from './wisconsin-electronic-recycling'
import { WISCONSIN_LIGHT_BULB_RECYCLING } from './wisconsin-light-bulb-recycling'
import { WISCONSIN_ON_SITE_OFF_SITE_SHREDDING } from './wisconsin-on-site-off-site-shredding'
import { WISCONSIN_PAPER_SHREDDING } from './wisconsin-paper-shredding'
import { WISCONSIN_PHONE_SHREDDING } from './wisconsin-phone-shredding'
import { WISCONSIN_TV_RECYCLING } from './wisconsin-tv-recycling'
import { MINNESOTA_AIRBAG_RECYCLING } from './minnesota-airbag-recycling'
import { MINNESOTA_BALLAST_RECYCLING } from './minnesota-ballast-recycling'
import { MINNESOTA_BATTERY_RECYCLING } from './minnesota-battery-recycling'
import { MINNESOTA_ELECTRONIC_RECYCLING } from './minnesota-electronic-recycling'
import { MINNESOTA_HARD_DRIVE_DESTRUCTION } from './minnesota-hard-drive-destruction'
import { MINNESOTA_LIGHT_BULB_RECYCLING } from './minnesota-light-bulb-recycling'
import { MINNESOTA_ON_SITE_OFF_SITE_SHREDDING } from './minnesota-on-site-off-site-shredding'
import { MINNESOTA_PAPER_SHREDDING } from './minnesota-paper-shredding'
import { MINNESOTA_PHONE_SHREDDING } from './minnesota-phone-shredding'
import { MINNESOTA_TV_RECYCLING } from './minnesota-tv-recycling'
import { CHICAGO_AIRBAG_RECYCLING } from './chicago-airbag-recycling'
import { CHICAGO_BALLAST_RECYCLING } from './chicago-ballast-recycling'
import { CHICAGO_BATTERY_RECYCLING } from './chicago-battery-recycling'
import { CHICAGO_HARD_DRIVE_DESTRUCTION } from './chicago-hard-drive-destruction'
import { CHICAGO_LIGHT_BULB_RECYCLING } from './chicago-light-bulb-recycling'
import { CHICAGO_ON_SITE_OFF_SITE_SHREDDING } from './chicago-on-site-off-site-shredding'
import { CHICAGO_PAPER_SHREDDING } from './chicago-paper-shredding'
import { CHICAGO_PHONE_SHREDDING } from './chicago-phone-shredding'
import { CHICAGO_TV_RECYCLING } from './chicago-tv-recycling'
import { CHICAGO_ELECTRONIC_RECYCLING } from './chicago-electronic-recycling'

export type { LocalPage } from './types'

/**
 * The location service pages of 30 Sep 2026 (see types.ts), 29 of them:
 * ten each for Chicago and Minnesota (Blaine), nine for Wisconsin (New
 * Berlin). The tenth Wisconsin frame, Hard Drive Destruction, is missing
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
  WISCONSIN_ON_SITE_OFF_SITE_SHREDDING,
  WISCONSIN_PAPER_SHREDDING,
  WISCONSIN_PHONE_SHREDDING,
  WISCONSIN_TV_RECYCLING,
  MINNESOTA_AIRBAG_RECYCLING,
  MINNESOTA_BALLAST_RECYCLING,
  MINNESOTA_BATTERY_RECYCLING,
  MINNESOTA_ELECTRONIC_RECYCLING,
  MINNESOTA_HARD_DRIVE_DESTRUCTION,
  MINNESOTA_LIGHT_BULB_RECYCLING,
  MINNESOTA_ON_SITE_OFF_SITE_SHREDDING,
  MINNESOTA_PAPER_SHREDDING,
  MINNESOTA_PHONE_SHREDDING,
  MINNESOTA_TV_RECYCLING,
  CHICAGO_AIRBAG_RECYCLING,
  CHICAGO_BALLAST_RECYCLING,
  CHICAGO_BATTERY_RECYCLING,
  CHICAGO_HARD_DRIVE_DESTRUCTION,
  CHICAGO_LIGHT_BULB_RECYCLING,
  CHICAGO_ON_SITE_OFF_SITE_SHREDDING,
  CHICAGO_PAPER_SHREDDING,
  CHICAGO_PHONE_SHREDDING,
  CHICAGO_TV_RECYCLING,
  CHICAGO_ELECTRONIC_RECYCLING,
]

/** The Minnesota and Wisconsin pages by service slug, for the two [service] routes. */
export const LOCAL_FACILITY_PAGES: Record<'minnesota' | 'wisconsin', Record<string, LocalPage>> = {
  minnesota: {
    'airbag-recycling': MINNESOTA_AIRBAG_RECYCLING,
    'ballast-recycling': MINNESOTA_BALLAST_RECYCLING,
    'battery-recycling': MINNESOTA_BATTERY_RECYCLING,
    'electronic-recycling': MINNESOTA_ELECTRONIC_RECYCLING,
    'hard-drive-destruction': MINNESOTA_HARD_DRIVE_DESTRUCTION,
    'light-bulb-recycling': MINNESOTA_LIGHT_BULB_RECYCLING,
    'on-site-off-site-shredding': MINNESOTA_ON_SITE_OFF_SITE_SHREDDING,
    'paper-shredding': MINNESOTA_PAPER_SHREDDING,
    'phone-shredding': MINNESOTA_PHONE_SHREDDING,
    'tv-recycling': MINNESOTA_TV_RECYCLING,
  },
  wisconsin: {
    'airbag-recycling': WISCONSIN_AIRBAG_RECYCLING,
    'ballast-recycling': WISCONSIN_BALLAST_RECYCLING,
    'battery-recycling': WISCONSIN_BATTERY_RECYCLING,
    'electronic-recycling': WISCONSIN_ELECTRONIC_RECYCLING,
    'light-bulb-recycling': WISCONSIN_LIGHT_BULB_RECYCLING,
    'on-site-off-site-shredding': WISCONSIN_ON_SITE_OFF_SITE_SHREDDING,
    'paper-shredding': WISCONSIN_PAPER_SHREDDING,
    'phone-shredding': WISCONSIN_PHONE_SHREDDING,
    'tv-recycling': WISCONSIN_TV_RECYCLING,
  },
}

export function localFacilityPage(site: string, service: string): LocalPage | null {
  return (LOCAL_FACILITY_PAGES as Record<string, Record<string, LocalPage>>)[site]?.[service] ?? null
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
export const LOCAL_FACILITY_URLS: string[] = Object.values(LOCAL_FACILITY_PAGES).flatMap((m) => Object.values(m)).map((p) => p.url)
