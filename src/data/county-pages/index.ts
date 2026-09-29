import type { CountyPage } from './types'
import { ANOKA } from './anoka'
import { BENTON } from './benton'
import { DAKOTA } from './dakota'
import { HENNEPIN } from './hennepin'
import { OLMSTED } from './olmsted'
import { RAMSEY } from './ramsey'
import { SCOTT } from './scott'
import { WASHINGTON_MN } from './washington-mn'
import { CALUMET } from './calumet'
import { RACINE } from './racine'
import { WASHINGTON_WI } from './washington-wi'
import { AREA_DOC_KEY, AREA_PAGES, type AreaDocKey } from './areas'

export type { CountyPage } from './types'

/** The eleven county pages (29 Sep 2026), in the sheet's order. See ./types.ts. */
export const COUNTY_PAGES: CountyPage[] = [
  ANOKA, BENTON, DAKOTA, HENNEPIN, OLMSTED, RAMSEY, SCOTT, WASHINGTON_MN,
  CALUMET, RACINE, WASHINGTON_WI,
]

/** The county pages and the area pages (./areas), every page this template draws. */
export const LOCATION_PAGES: CountyPage[] = [...COUNTY_PAGES, ...AREA_PAGES]

/**
 * `/minnesota-recycling/anoka-county-recycling/` -> 'minnesota' + 'anoka-county-recycling'.
 * Null for any other shape: deeper paths (/minnesota-recycling/ramsey/blaine/)
 * and other folders go to the catch-all.
 */
function parts(url: string): [string, string] | null {
  const segs = url.split('/').filter(Boolean)
  if (segs.length !== 2 || !/^(minnesota|wisconsin)-recycling$/.test(segs[0]!)) return null
  return [segs[0]!.replace(/-recycling$/, ''), segs[1]!]
}

/** The page at /<site>-recycling/<slug>/, for the two [service] routes. */
export function countyPage(site: string, slug: string): CountyPage | null {
  return LOCATION_PAGES.find((p) => { const x = parts(p.url); return !!x && x[0] === site && x[1] === slug }) ?? null
}

/** Route params of one state's pages in its [service] folder. */
export function countySlugs(site: string): string[] {
  return LOCATION_PAGES.map((p) => parts(p.url)).filter((x): x is [string, string] => !!x && x[0] === site).map(([, x]) => x)
}

/** The pages the [...slug] catch-all serves: every one outside the two [service] folders. */
export const CATCH_ALL_LOCATION_PAGES = LOCATION_PAGES.filter((p) => !parts(p.url))

/** The page at this URL for the catch-all ('/shredding-minnesota/duluth' or with the slash). */
export function catchAllLocationPage(url: string): CountyPage | null {
  const u = url.endsWith('/') ? url : url + '/'
  return CATCH_ALL_LOCATION_PAGES.find((p) => p.url === u) ?? null
}

export const COUNTY_URLS = LOCATION_PAGES.map((p) => p.url)

/** Admin -> Pages document keys, one per county page. */
export type CountyDocKey =
  | 'county/anoka' | 'county/benton' | 'county/dakota' | 'county/hennepin' | 'county/olmsted' | 'county/ramsey'
  | 'county/scott' | 'county/washington-mn' | 'county/calumet' | 'county/racine' | 'county/washington-wi'

const DOC_KEY = new Map<CountyPage, CountyDocKey>([
  [ANOKA, 'county/anoka'], [BENTON, 'county/benton'], [DAKOTA, 'county/dakota'], [HENNEPIN, 'county/hennepin'],
  [OLMSTED, 'county/olmsted'], [RAMSEY, 'county/ramsey'], [SCOTT, 'county/scott'], [WASHINGTON_MN, 'county/washington-mn'],
  [CALUMET, 'county/calumet'], [RACINE, 'county/racine'], [WASHINGTON_WI, 'county/washington-wi'],
])

/** The Admin -> Pages document of a county or area page. Throws on one with none, so a new page cannot ship unwired. */
export function countyDocKey(page: CountyPage): CountyDocKey | AreaDocKey {
  const k = DOC_KEY.get(page) ?? AREA_DOC_KEY.get(page)
  if (!k) throw new Error(`County page ${page.url} has no Admin -> Pages document`)
  return k
}
