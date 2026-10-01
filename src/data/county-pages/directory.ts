import { href } from '@/lib/urls'
import { DIRECTORY_COLS, DIRECTORY_ROWS } from '@/lib/layout'
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
import { BLAINE } from './areas/blaine'
import { BLOOMINGTON_RECYCLING_CENTER } from './areas/bloomington-recycling-center'
import { EDINA_RECYCLING_SERVICES } from './areas/edina-recycling-services'
import { MAPLE_GROVE_RECYCLING_CENTER } from './areas/maple-grove-recycling-center'
import { MINNETONKA_RECYCLING_CENTER } from './areas/minnetonka-recycling-center'
import { PLYMOUTH_RECYCLING_CENTER } from './areas/plymouth-recycling-center'
import { COON_RAPIDS } from './areas/coon-rapids'
import { EAST_BETHEL } from './areas/east-bethel'
import { BURNSVILLE_RECYCLING_CENTER } from './areas/burnsville-recycling-center'
import { LAKEVILLE_RECYCLING_CENTER } from './areas/lakeville-recycling-center'
import { ST_CLOUD_RECYCLING_CENTER } from './areas/st-cloud-recycling-center'
import { MINNEAPOLIS } from './areas/minneapolis'
import { BATTERY_RECYCLING_IN_MINNEAPOLIS } from './areas/battery-recycling-in-minneapolis'
import { BULB_RECYCLE_MINNEAPOLIS } from './areas/bulb-recycle-minneapolis'
import { BATTERY_RECYCLING_ST_PAUL } from './areas/battery-recycling-st-paul'
import { SHREDDING_ST_PAUL } from './areas/shredding-st-paul'
import { ELECTRONIC_RECYCLING_DULUTH } from './areas/electronic-recycling-duluth'
import { SHREDDING_DULUTH } from './areas/shredding-duluth'
import { SHREDDING_MINNESOTA } from './areas/shredding-minnesota'
import { TV_RECYCLING_IN_MINNESOTA } from './areas/tv-recycling-in-minnesota'
import { MILWAUKEE } from './areas/milwaukee'
import { BATTERY_RECYCLING_MILWAUKEE } from './areas/battery-recycling-milwaukee'
import { ELECTRONICS_RECYCLING_MILWAUKEE } from './areas/electronics-recycling-milwaukee'
import { BULB_RECYCLE_MILWAUKEE } from './areas/bulb-recycle-milwaukee'
import { OAK_CREEK } from './areas/oak-creek'
import { WAUKESHA_RECYCLING_CENTER } from './areas/waukesha-recycling-center'
import { WAUKESHA_ELECTRONIC_RECYCLING } from './areas/waukesha-electronic-recycling'
import { BATTERY_RECYCLING_WAUKESHA } from './areas/battery-recycling-waukesha'
import { TV_RECYCLING_WAUKESHA } from './areas/tv-recycling-waukesha'
import { SHREDDING_WAUKESHA } from './areas/shredding-waukesha'
import { OCONOMOWOC_RECYCLING_CENTER } from './areas/oconomowoc-recycling-center'
import { NEW_BERLIN_RECYCLING_CENTER } from './areas/new-berlin-recycling-center'
import { MADISON } from './areas/madison'
import { BATTERY_RECYCLING_MADISON } from './areas/battery-recycling-madison'
import { FLUORESCENT_BULB_RECYCLE_MADISON } from './areas/fluorescent-bulb-recycle-madison'
import { COMPUTER_RECYCLING_MADISON } from './areas/computer-recycling-madison'
import { GREEN_BAY_RECYCLING } from './areas/green-bay-recycling'
import { BATTERY_RECYCLING_GREEN_BAY } from './areas/battery-recycling-green-bay'
import { SHREDDING_GREEN_BAY } from './areas/shredding-green-bay'
import { APPLETON_ELECTRONIC_RECYCLING_CENTER } from './areas/appleton-electronic-recycling-center'
import { BATTERY_RECYCLING_APPLETON } from './areas/battery-recycling-appleton'
import { TV_RECYCLING_APPLETON } from './areas/tv-recycling-appleton'
import { TV_RECYCLING_IN_WISCONSIN } from './areas/tv-recycling-in-wisconsin'
import { PHOENIX_ARIZONA } from './areas/phoenix-arizona'
import { OCALA_FLORIDA } from './areas/ocala-florida'
import { KENNESAW_GEORGIA } from './areas/kennesaw-georgia'
import { GREENWOOD_INDIANA } from './areas/greenwood-indiana'
import { FRANKLIN_INDIANA } from './areas/franklin-indiana'
import { JOHNSON_CITY_BUFFALO_TENNESSEE } from './areas/johnson-city-buffalo-tennessee'
import { FORT_WORTH_TEXAS } from './areas/fort-worth-texas'
import { LOCATION_PAGES } from './index'

/**
 * WHERE EVERY COUNTY AND AREA PAGE IS LISTED (29 Sep 2026), in two places:
 *
 *  - the location directory at the foot of every page (LocationDirectory, in
 *    the footer), Asim: "add the location below the footer … make it like
 *    main city name heading and their county below it … for all the
 *    counties" — one column per county or main city, its pages under it,
 *    after the columns of the store he gave as the reference;
 *  - "Counties We Serve" on the two facility pages (Figma 7079:6388, phone
 *    7079:6460), the state's county pages first and then its other pages.
 *
 * `label` is what a link says under its heading ("Battery Recycling" under
 * Milwaukee); `card` what its card says on the facility page, where there is
 * no heading to lean on ("Battery Recycling Milwaukee").
 *
 * A county with no page under it still gets its column: the heading is the
 * county page. Every page in LOCATION_PAGES must be in exactly one group; the
 * check at the bottom throws at build otherwise, so a new page cannot ship
 * missing from the directory.
 */
export type DirectoryLink = { page: CountyPage; label: string; card: string }
export type DirectoryGroup = {
  heading: string
  /** The heading's own page (a county, a city's recycling centre); none for Duluth. */
  page?: CountyPage
  /** Its card on the facility page, when it has a page. */
  card?: string
  links: DirectoryLink[]
  /** Which facility page lists it under Counties We Serve. */
  state: 'Minnesota' | 'Wisconsin' | null
}

const l = (page: CountyPage, label: string, card = label): DirectoryLink => ({ page, label, card })

export const DIRECTORY: DirectoryGroup[] = [
  /* ------------------------------------------------------------ Minnesota */
  { heading: 'Hennepin County', page: HENNEPIN, state: 'Minnesota', links: [
    l(BLOOMINGTON_RECYCLING_CENTER, 'Bloomington'), l(EDINA_RECYCLING_SERVICES, 'Edina'),
    l(MAPLE_GROVE_RECYCLING_CENTER, 'Maple Grove'), l(MINNETONKA_RECYCLING_CENTER, 'Minnetonka'),
    l(PLYMOUTH_RECYCLING_CENTER, 'Plymouth'),
  ] },
  { heading: 'Anoka County', page: ANOKA, state: 'Minnesota', links: [
    l(BLAINE, 'Blaine'), l(COON_RAPIDS, 'Coon Rapids'), l(EAST_BETHEL, 'East Bethel'),
  ] },
  { heading: 'Ramsey County', page: RAMSEY, state: 'Minnesota', links: [
    l(BATTERY_RECYCLING_ST_PAUL, 'St. Paul Battery Recycling'), l(SHREDDING_ST_PAUL, 'St. Paul Shredding'),
  ] },
  { heading: 'Dakota County', page: DAKOTA, state: 'Minnesota', links: [
    l(BURNSVILLE_RECYCLING_CENTER, 'Burnsville'), l(LAKEVILLE_RECYCLING_CENTER, 'Lakeville'),
  ] },
  { heading: 'Washington County, MN', card: 'Washington County', page: WASHINGTON_MN, state: 'Minnesota', links: [] },
  { heading: 'Scott County', page: SCOTT, state: 'Minnesota', links: [] },
  { heading: 'Olmsted County', page: OLMSTED, state: 'Minnesota', links: [] },
  { heading: 'Benton County', page: BENTON, state: 'Minnesota', links: [
    l(ST_CLOUD_RECYCLING_CENTER, 'St. Cloud'),
  ] },
  { heading: 'Minneapolis', page: MINNEAPOLIS, state: 'Minnesota', links: [
    l(BATTERY_RECYCLING_IN_MINNEAPOLIS, 'Battery Recycling', 'Battery Recycling Minneapolis'),
    l(BULB_RECYCLE_MINNEAPOLIS, 'Bulb Recycling', 'Bulb Recycling Minneapolis'),
  ] },
  { heading: 'Duluth', state: 'Minnesota', links: [
    l(ELECTRONIC_RECYCLING_DULUTH, 'Electronic Recycling', 'Electronic Recycling Duluth'),
    l(SHREDDING_DULUTH, 'Shredding Service', 'Shredding Duluth'),
  ] },
  { heading: 'Minnesota', state: 'Minnesota', links: [
    l(SHREDDING_MINNESOTA, 'Document Shredding', 'Document Shredding Minnesota'),
    l(TV_RECYCLING_IN_MINNESOTA, 'TV Recycling', 'TV Recycling Minnesota'),
  ] },
  /* ------------------------------------------------------------ Wisconsin */
  { heading: 'Milwaukee', page: MILWAUKEE, state: 'Wisconsin', links: [
    l(BATTERY_RECYCLING_MILWAUKEE, 'Battery Recycling', 'Battery Recycling Milwaukee'),
    l(ELECTRONICS_RECYCLING_MILWAUKEE, 'Electronics Recycling', 'Electronics Recycling Milwaukee'),
    l(BULB_RECYCLE_MILWAUKEE, 'Bulb Recycling', 'Bulb Recycling Milwaukee'),
    l(OAK_CREEK, 'Oak Creek'),
  ] },
  { heading: 'Waukesha', page: WAUKESHA_RECYCLING_CENTER, state: 'Wisconsin', links: [
    l(WAUKESHA_ELECTRONIC_RECYCLING, 'Electronic Recycling', 'Electronic Recycling Waukesha'),
    l(BATTERY_RECYCLING_WAUKESHA, 'Battery Recycling', 'Battery Recycling Waukesha'),
    l(TV_RECYCLING_WAUKESHA, 'TV Recycling', 'TV Recycling Waukesha'),
    l(SHREDDING_WAUKESHA, 'Shredding Service', 'Shredding Waukesha'),
    l(OCONOMOWOC_RECYCLING_CENTER, 'Oconomowoc'),
    l(NEW_BERLIN_RECYCLING_CENTER, 'New Berlin'),
  ] },
  { heading: 'Madison', page: MADISON, state: 'Wisconsin', links: [
    l(BATTERY_RECYCLING_MADISON, 'Battery Recycling', 'Battery Recycling Madison'),
    l(FLUORESCENT_BULB_RECYCLE_MADISON, 'Bulb Recycling', 'Bulb Recycling Madison'),
    l(COMPUTER_RECYCLING_MADISON, 'Computer Recycling', 'Computer Recycling Madison'),
  ] },
  { heading: 'Green Bay', page: GREEN_BAY_RECYCLING, state: 'Wisconsin', links: [
    l(BATTERY_RECYCLING_GREEN_BAY, 'Battery Recycling', 'Battery Recycling Green Bay'),
    l(SHREDDING_GREEN_BAY, 'Shredding Services', 'Shredding Green Bay'),
  ] },
  { heading: 'Appleton', page: APPLETON_ELECTRONIC_RECYCLING_CENTER, state: 'Wisconsin', links: [
    l(BATTERY_RECYCLING_APPLETON, 'Battery Recycling', 'Battery Recycling Appleton'),
    l(TV_RECYCLING_APPLETON, 'TV Recycling', 'TV Recycling Appleton'),
  ] },
  { heading: 'Calumet County', page: CALUMET, state: 'Wisconsin', links: [] },
  { heading: 'Racine County', page: RACINE, state: 'Wisconsin', links: [] },
  { heading: 'Washington County, WI', card: 'Washington County', page: WASHINGTON_WI, state: 'Wisconsin', links: [] },
  { heading: 'Wisconsin', state: 'Wisconsin', links: [
    l(TV_RECYCLING_IN_WISCONSIN, 'TV Recycling', 'TV Recycling Wisconsin'),
  ] },
  /* ------------------------------------------- mail-in cities, nationwide */
  { heading: 'Mail-In Recycling', state: null, links: [
    l(PHOENIX_ARIZONA, 'Phoenix, AZ'), l(OCALA_FLORIDA, 'Ocala, FL'), l(KENNESAW_GEORGIA, 'Kennesaw, GA'),
    l(GREENWOOD_INDIANA, 'Greenwood, IN'), l(FRANKLIN_INDIANA, 'Franklin, IN'),
    l(JOHNSON_CITY_BUFFALO_TENNESSEE, 'Johnson City, TN'), l(FORT_WORTH_TEXAS, 'Fort Worth, TX'),
  ] },
]

/** The most links any column may carry: the footer band is a fixed height at lg (DIRECTORY_H). */
export const DIRECTORY_MAX_LINKS = 7

/**
 * THE DIRECTORY'S WORDS, FOR ADMIN -> PAGES (1 Oct 2026; Asim: "make every
 * part of the page editable"). The headings, link labels and facility-page
 * card labels, with each page's address (`url`, which the editor does not
 * show or change) instead of the page itself. LocationDirectory and the
 * Counties We Serve cards draw from this, as edited: a column or link the
 * editor removes is gone, a reorder is kept. Which pages exist is still
 * the code's (DIRECTORY above).
 */
export type DirectoryCopyLink = { url: string; label: string; card: string }
export type DirectoryCopyGroup = {
  heading: string
  url?: string
  card?: string
  state: 'Minnesota' | 'Wisconsin' | null
  links: DirectoryCopyLink[]
}
export const DIRECTORY_COPY: { title: string; seeAll: string; groups: DirectoryCopyGroup[] } = {
  title: 'Recycling Locations',
  seeAll: 'See all',
  groups: DIRECTORY.map((g) => ({
    heading: g.heading,
    ...(g.page ? { url: g.page.url, card: g.card ?? g.heading } : {}),
    state: g.state,
    links: g.links.map((x) => ({ url: x.page.url, label: x.label, card: x.card })),
  })),
}

/** One card of Counties We Serve. */
export type CountyCard = { label: string; href: string }

/**
 * The cards on a facility page: the state's county pages first, in the
 * frame's order (Hennepin, Ramsey, Dakota, Anoka, Washington, Scott, … —
 * the frame's Carver, St. Louis and Stearns have no page and are not drawn),
 * then its city and service pages in directory order.
 */
export function countyCards(state: 'Minnesota' | 'Wisconsin', all: DirectoryCopyGroup[] = DIRECTORY_COPY.groups): CountyCard[] {
  const groups = all.filter((g) => g.state === state)
  // County or not, and the frame's order, by the code's label for that
  // page, so a renamed card keeps its place.
  const codeLabel = new Map(DIRECTORY.filter((g) => g.page).map((g) => [g.page!.url, g.card ?? g.heading]))
  const heads = groups.filter((g) => g.url).map((g) => {
    const was = codeLabel.get(g.url!) ?? g.heading
    return { label: g.card || g.heading, href: href(g.url!), was, county: /County/.test(was) }
  })
  const FRAME_ORDER = ['Hennepin County', 'Ramsey County', 'Dakota County', 'Anoka County', 'Washington County', 'Scott County', 'Olmsted County']
  const rank = (x: { was: string }) => { const i = FRAME_ORDER.indexOf(x.was); return i < 0 ? FRAME_ORDER.length : i }
  const counties = heads.filter((h) => h.county).sort((a, b) => rank(a) - rank(b))
  const cities = heads.filter((h) => !h.county)
  const pages = groups.flatMap((g) => g.links.map((x) => ({ label: x.card || x.label, href: href(x.url) })))
  return [...counties, ...cities, ...pages].map(({ label, href: h }) => ({ label, href: h }))
}

/* Every page listed once, and no column too long for the band. */
{
  if (DIRECTORY.length > DIRECTORY_ROWS * DIRECTORY_COLS) throw new Error(`Location directory: ${DIRECTORY.length} columns; the footer band holds ${DIRECTORY_ROWS * DIRECTORY_COLS} (DIRECTORY_ROWS in src/lib/layout.ts)`)
  const seen = new Map<CountyPage, number>()
  for (const g of DIRECTORY) {
    if (g.links.length > DIRECTORY_MAX_LINKS) throw new Error(`Location directory: "${g.heading}" has ${g.links.length} links; the footer band holds ${DIRECTORY_MAX_LINKS}`)
    for (const p of [...(g.page ? [g.page] : []), ...g.links.map((x) => x.page)]) seen.set(p, (seen.get(p) ?? 0) + 1)
  }
  const missing = LOCATION_PAGES.filter((p) => !seen.has(p)).map((p) => p.url)
  const twice = [...seen].filter(([, n]) => n > 1).map(([p]) => p.url)
  if (missing.length || twice.length) throw new Error(`Location directory: missing ${missing.join(', ') || 'none'}; listed twice ${twice.join(', ') || 'none'}`)
}
