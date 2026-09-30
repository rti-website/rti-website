import type { LandingPage } from '@/data/local-pages/types'
import type { DocKey } from '@/content/registry'
import { LANDING_WISCONSIN_BATTERY_RECYCLING } from './wisconsin-battery-recycling'
import { LANDING_WISCONSIN_ELECTRONIC_RECYCLE } from './wisconsin-electronic-recycle'
import { LANDING_WISCONSIN_LIGHT_BULBS } from './wisconsin-light-bulbs'
import { LANDING_MINNESOTA_BATTERY_RECYCLING } from './minnesota-battery-recycling'
import { LANDING_MINNESOTA_ELECTRONIC_RECYCLE } from './minnesota-electronic-recycle'
import { LANDING_MINNESOTA_LIGHT_BULBS } from './minnesota-light-bulbs'
import { LANDING_CHICAGO_BATTERY_RECYCLING } from './chicago-battery-recycling'
import { LANDING_CHICAGO_ELECTRONIC_RECYCLE } from './chicago-electronic-recycle'
import { LANDING_CHICAGO_LIGHT_BULBS } from './chicago-light-bulbs'

/**
 * The nine Google Ads landing pages of 30 Sep 2026 (see LandingPage in
 * src/data/local-pages/types.ts). The six Minnesota and Wisconsin ones took
 * over the ad URLs of 24 Sep 2026 and keep their SEO title and description
 * (src/data/state-pages.ts); the three Chicago ones are new. All noindex,
 * none in the sitemap or the menus.
 */
export const LANDING_PAGES: LandingPage[] = [
  LANDING_WISCONSIN_BATTERY_RECYCLING,
  LANDING_WISCONSIN_ELECTRONIC_RECYCLE,
  LANDING_WISCONSIN_LIGHT_BULBS,
  LANDING_MINNESOTA_BATTERY_RECYCLING,
  LANDING_MINNESOTA_ELECTRONIC_RECYCLE,
  LANDING_MINNESOTA_LIGHT_BULBS,
  LANDING_CHICAGO_BATTERY_RECYCLING,
  LANDING_CHICAGO_ELECTRONIC_RECYCLE,
  LANDING_CHICAGO_LIGHT_BULBS,
]

/** Admin -> Pages document: `landing/` and the URL's path, e.g. landing/battery-recycling-Wisconsin. */
export function landingDocKey(page: LandingPage): DocKey {
  return `landing/${page.url.replace(/^\/|\/$/g, '').replace(/\//g, '-')}` as DocKey
}
