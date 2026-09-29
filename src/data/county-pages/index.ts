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

export type { CountyPage } from './types'

/** The eleven county pages (29 Sep 2026), in the sheet's order. See ./types.ts. */
export const COUNTY_PAGES: CountyPage[] = [
  ANOKA, BENTON, DAKOTA, HENNEPIN, OLMSTED, RAMSEY, SCOTT, WASHINGTON_MN,
  CALUMET, RACINE, WASHINGTON_WI,
]

/** `/minnesota-recycling/anoka-county-recycling/` -> 'minnesota' + 'anoka-county-recycling'. */
function parts(url: string): [string, string] {
  const [state = '', slug = ''] = url.split('/').filter(Boolean)
  return [state.replace(/-recycling$/, ''), slug]
}

/** The county page at /<site>-recycling/<slug>/, for the two [service] routes. */
export function countyPage(site: string, slug: string): CountyPage | null {
  return COUNTY_PAGES.find((p) => { const [s, x] = parts(p.url); return s === site && x === slug }) ?? null
}

/** Route params of one state's county pages. */
export function countySlugs(site: string): string[] {
  return COUNTY_PAGES.map((p) => parts(p.url)).filter(([s]) => s === site).map(([, x]) => x)
}

export const COUNTY_URLS = COUNTY_PAGES.map((p) => p.url)

/** Admin -> Pages document keys, one per county page. */
export type CountyDocKey =
  | 'county/anoka' | 'county/benton' | 'county/dakota' | 'county/hennepin' | 'county/olmsted' | 'county/ramsey'
  | 'county/scott' | 'county/washington-mn' | 'county/calumet' | 'county/racine' | 'county/washington-wi'

const DOC_KEY = new Map<CountyPage, CountyDocKey>([
  [ANOKA, 'county/anoka'], [BENTON, 'county/benton'], [DAKOTA, 'county/dakota'], [HENNEPIN, 'county/hennepin'],
  [OLMSTED, 'county/olmsted'], [RAMSEY, 'county/ramsey'], [SCOTT, 'county/scott'], [WASHINGTON_MN, 'county/washington-mn'],
  [CALUMET, 'county/calumet'], [RACINE, 'county/racine'], [WASHINGTON_WI, 'county/washington-wi'],
])

/** The Admin -> Pages document of a county page. Throws on one with none, so a new page cannot ship unwired. */
export function countyDocKey(page: CountyPage): CountyDocKey {
  const k = DOC_KEY.get(page)
  if (!k) throw new Error(`County page ${page.url} has no Admin -> Pages document`)
  return k
}
