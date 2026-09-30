import type { CountyPage } from '../types'
import { BLAINE } from './blaine'
import { MILWAUKEE } from './milwaukee'
import { WAUKESHA_RECYCLING_CENTER } from './waukesha-recycling-center'
import { BATTERY_RECYCLING_MILWAUKEE } from './battery-recycling-milwaukee'
import { ELECTRONICS_RECYCLING_MILWAUKEE } from './electronics-recycling-milwaukee'
import { OAK_CREEK } from './oak-creek'
import { OCONOMOWOC_RECYCLING_CENTER } from './oconomowoc-recycling-center'
import { WAUKESHA_ELECTRONIC_RECYCLING } from './waukesha-electronic-recycling'
import { BATTERY_RECYCLING_WAUKESHA } from './battery-recycling-waukesha'
import { TV_RECYCLING_WAUKESHA } from './tv-recycling-waukesha'
import { APPLETON_ELECTRONIC_RECYCLING_CENTER } from './appleton-electronic-recycling-center'
import { MADISON } from './madison'
import { BATTERY_RECYCLING_APPLETON } from './battery-recycling-appleton'
import { BATTERY_RECYCLING_MADISON } from './battery-recycling-madison'
import { FLUORESCENT_BULB_RECYCLE_MADISON } from './fluorescent-bulb-recycle-madison'
import { BATTERY_RECYCLING_IN_MINNEAPOLIS } from './battery-recycling-in-minneapolis'
import { MAPLE_GROVE_RECYCLING_CENTER } from './maple-grove-recycling-center'
import { BULB_RECYCLE_MINNEAPOLIS } from './bulb-recycle-minneapolis'
import { BLOOMINGTON_RECYCLING_CENTER } from './bloomington-recycling-center'
import { ST_CLOUD_RECYCLING_CENTER } from './st-cloud-recycling-center'
import { PLYMOUTH_RECYCLING_CENTER } from './plymouth-recycling-center'
import { MINNETONKA_RECYCLING_CENTER } from './minnetonka-recycling-center'
import { COON_RAPIDS } from './coon-rapids'
import { BURNSVILLE_RECYCLING_CENTER } from './burnsville-recycling-center'
import { ELECTRONIC_RECYCLING_DULUTH } from './electronic-recycling-duluth'
import { SHREDDING_MINNESOTA } from './shredding-minnesota'
import { SHREDDING_ST_PAUL } from './shredding-st-paul'
import { SHREDDING_GREEN_BAY } from './shredding-green-bay'
import { GREENWOOD_INDIANA } from './greenwood-indiana'
import { BULB_RECYCLE_MILWAUKEE } from './bulb-recycle-milwaukee'
import { OCALA_FLORIDA } from './ocala-florida'
import { KENNESAW_GEORGIA } from './kennesaw-georgia'
import { JOHNSON_CITY_BUFFALO_TENNESSEE } from './johnson-city-buffalo-tennessee'
import { FRANKLIN_INDIANA } from './franklin-indiana'
import { TV_RECYCLING_IN_WISCONSIN } from './tv-recycling-in-wisconsin'
import { TV_RECYCLING_IN_MINNESOTA } from './tv-recycling-in-minnesota'
import { TV_RECYCLING_APPLETON } from './tv-recycling-appleton'
import { EDINA_RECYCLING_SERVICES } from './edina-recycling-services'
import { SHREDDING_DULUTH } from './shredding-duluth'
import { PHOENIX_ARIZONA } from './phoenix-arizona'
import { LAKEVILLE_RECYCLING_CENTER } from './lakeville-recycling-center'
import { BATTERY_RECYCLING_ST_PAUL } from './battery-recycling-st-paul'
import { GREEN_BAY_RECYCLING } from './green-bay-recycling'
import { FORT_WORTH_TEXAS } from './fort-worth-texas'
import { EAST_BETHEL } from './east-bethel'
import { COMPUTER_RECYCLING_MADISON } from './computer-recycling-madison'
import { MINNEAPOLIS } from './minneapolis'
import { BATTERY_RECYCLING_GREEN_BAY } from './battery-recycling-green-bay'
import { SHREDDING_WAUKESHA } from './shredding-waukesha'
import { NEW_BERLIN_RECYCLING_CENTER } from './new-berlin-recycling-center'

/**
 * THE AREA PAGES (29 Sep 2026): 49 old WordPress location pages that had been
 * 301'd since launch, back at their own URLs on the county template
 * (../types.ts, src/components/sections/locations/CountyPage.tsx). Asim: "see
 * the pdf for urls these are our old urls we have to keep it as it". One Figma
 * frame pair each (ids on each page): city recycling centres under the
 * counties, the service-in-a-city pages, the shredding pages, two state TV
 * pages and the mail-in cities.
 *
 * Routing: a URL of the form /minnesota-recycling/<slug>/ or
 * /wisconsin-recycling/<slug>/ is served by that folder's [service] route,
 * like the county pages; every other one by the [...slug] catch-all.
 */
export const AREA_PAGES: CountyPage[] = [
  BLAINE, MILWAUKEE, WAUKESHA_RECYCLING_CENTER, BATTERY_RECYCLING_MILWAUKEE,
  ELECTRONICS_RECYCLING_MILWAUKEE, OAK_CREEK, OCONOMOWOC_RECYCLING_CENTER, WAUKESHA_ELECTRONIC_RECYCLING,
  BATTERY_RECYCLING_WAUKESHA, TV_RECYCLING_WAUKESHA, APPLETON_ELECTRONIC_RECYCLING_CENTER, MADISON,
  BATTERY_RECYCLING_APPLETON, BATTERY_RECYCLING_MADISON, FLUORESCENT_BULB_RECYCLE_MADISON, BATTERY_RECYCLING_IN_MINNEAPOLIS,
  MAPLE_GROVE_RECYCLING_CENTER, BULB_RECYCLE_MINNEAPOLIS, BLOOMINGTON_RECYCLING_CENTER, ST_CLOUD_RECYCLING_CENTER,
  PLYMOUTH_RECYCLING_CENTER, MINNETONKA_RECYCLING_CENTER, COON_RAPIDS, BURNSVILLE_RECYCLING_CENTER,
  ELECTRONIC_RECYCLING_DULUTH, SHREDDING_MINNESOTA, SHREDDING_ST_PAUL, SHREDDING_GREEN_BAY,
  GREENWOOD_INDIANA, BULB_RECYCLE_MILWAUKEE, OCALA_FLORIDA, KENNESAW_GEORGIA,
  JOHNSON_CITY_BUFFALO_TENNESSEE, FRANKLIN_INDIANA, TV_RECYCLING_IN_WISCONSIN, TV_RECYCLING_IN_MINNESOTA,
  TV_RECYCLING_APPLETON, EDINA_RECYCLING_SERVICES, SHREDDING_DULUTH, PHOENIX_ARIZONA,
  LAKEVILLE_RECYCLING_CENTER, BATTERY_RECYCLING_ST_PAUL, GREEN_BAY_RECYCLING, FORT_WORTH_TEXAS,
  EAST_BETHEL, COMPUTER_RECYCLING_MADISON, MINNEAPOLIS, BATTERY_RECYCLING_GREEN_BAY,
  SHREDDING_WAUKESHA, NEW_BERLIN_RECYCLING_CENTER,
]

export type AreaDocKey =
  | 'area/blaine'
  | 'area/milwaukee'
  | 'area/waukesha-recycling-center'
  | 'area/battery-recycling-milwaukee'
  | 'area/electronics-recycling-milwaukee'
  | 'area/oak-creek'
  | 'area/oconomowoc-recycling-center'
  | 'area/waukesha-electronic-recycling'
  | 'area/battery-recycling-waukesha'
  | 'area/tv-recycling-waukesha'
  | 'area/appleton-electronic-recycling-center'
  | 'area/madison'
  | 'area/battery-recycling-appleton'
  | 'area/battery-recycling-madison'
  | 'area/fluorescent-bulb-recycle-madison'
  | 'area/battery-recycling-in-minneapolis'
  | 'area/maple-grove-recycling-center'
  | 'area/bulb-recycle-minneapolis'
  | 'area/bloomington-recycling-center'
  | 'area/st-cloud-recycling-center'
  | 'area/plymouth-recycling-center'
  | 'area/minnetonka-recycling-center'
  | 'area/coon-rapids'
  | 'area/burnsville-recycling-center'
  | 'area/electronic-recycling-duluth'
  | 'area/shredding-minnesota'
  | 'area/shredding-st-paul'
  | 'area/shredding-green-bay'
  | 'area/greenwood-indiana'
  | 'area/bulb-recycle-milwaukee'
  | 'area/ocala-florida'
  | 'area/kennesaw-georgia'
  | 'area/johnson-city-buffalo-tennessee'
  | 'area/franklin-indiana'
  | 'area/tv-recycling-in-wisconsin'
  | 'area/tv-recycling-in-minnesota'
  | 'area/tv-recycling-appleton'
  | 'area/edina-recycling-services'
  | 'area/shredding-duluth'
  | 'area/phoenix-arizona'
  | 'area/lakeville-recycling-center'
  | 'area/battery-recycling-st-paul'
  | 'area/green-bay-recycling'
  | 'area/fort-worth-texas'
  | 'area/east-bethel'
  | 'area/computer-recycling-madison'
  | 'area/minneapolis'
  | 'area/battery-recycling-green-bay'
  | 'area/shredding-waukesha'
  | 'area/new-berlin-recycling-center'

export const AREA_DOC_KEY = new Map<CountyPage, AreaDocKey>([
  [BLAINE, 'area/blaine'], [MILWAUKEE, 'area/milwaukee'], [WAUKESHA_RECYCLING_CENTER, 'area/waukesha-recycling-center'],
  [BATTERY_RECYCLING_MILWAUKEE, 'area/battery-recycling-milwaukee'], [ELECTRONICS_RECYCLING_MILWAUKEE, 'area/electronics-recycling-milwaukee'], [OAK_CREEK, 'area/oak-creek'],
  [OCONOMOWOC_RECYCLING_CENTER, 'area/oconomowoc-recycling-center'], [WAUKESHA_ELECTRONIC_RECYCLING, 'area/waukesha-electronic-recycling'], [BATTERY_RECYCLING_WAUKESHA, 'area/battery-recycling-waukesha'],
  [TV_RECYCLING_WAUKESHA, 'area/tv-recycling-waukesha'], [APPLETON_ELECTRONIC_RECYCLING_CENTER, 'area/appleton-electronic-recycling-center'], [MADISON, 'area/madison'],
  [BATTERY_RECYCLING_APPLETON, 'area/battery-recycling-appleton'], [BATTERY_RECYCLING_MADISON, 'area/battery-recycling-madison'], [FLUORESCENT_BULB_RECYCLE_MADISON, 'area/fluorescent-bulb-recycle-madison'],
  [BATTERY_RECYCLING_IN_MINNEAPOLIS, 'area/battery-recycling-in-minneapolis'], [MAPLE_GROVE_RECYCLING_CENTER, 'area/maple-grove-recycling-center'], [BULB_RECYCLE_MINNEAPOLIS, 'area/bulb-recycle-minneapolis'],
  [BLOOMINGTON_RECYCLING_CENTER, 'area/bloomington-recycling-center'], [ST_CLOUD_RECYCLING_CENTER, 'area/st-cloud-recycling-center'], [PLYMOUTH_RECYCLING_CENTER, 'area/plymouth-recycling-center'],
  [MINNETONKA_RECYCLING_CENTER, 'area/minnetonka-recycling-center'], [COON_RAPIDS, 'area/coon-rapids'], [BURNSVILLE_RECYCLING_CENTER, 'area/burnsville-recycling-center'],
  [ELECTRONIC_RECYCLING_DULUTH, 'area/electronic-recycling-duluth'], [SHREDDING_MINNESOTA, 'area/shredding-minnesota'], [SHREDDING_ST_PAUL, 'area/shredding-st-paul'],
  [SHREDDING_GREEN_BAY, 'area/shredding-green-bay'], [GREENWOOD_INDIANA, 'area/greenwood-indiana'], [BULB_RECYCLE_MILWAUKEE, 'area/bulb-recycle-milwaukee'],
  [OCALA_FLORIDA, 'area/ocala-florida'], [KENNESAW_GEORGIA, 'area/kennesaw-georgia'], [JOHNSON_CITY_BUFFALO_TENNESSEE, 'area/johnson-city-buffalo-tennessee'],
  [FRANKLIN_INDIANA, 'area/franklin-indiana'], [TV_RECYCLING_IN_WISCONSIN, 'area/tv-recycling-in-wisconsin'], [TV_RECYCLING_IN_MINNESOTA, 'area/tv-recycling-in-minnesota'],
  [TV_RECYCLING_APPLETON, 'area/tv-recycling-appleton'], [EDINA_RECYCLING_SERVICES, 'area/edina-recycling-services'], [SHREDDING_DULUTH, 'area/shredding-duluth'],
  [PHOENIX_ARIZONA, 'area/phoenix-arizona'], [LAKEVILLE_RECYCLING_CENTER, 'area/lakeville-recycling-center'], [BATTERY_RECYCLING_ST_PAUL, 'area/battery-recycling-st-paul'],
  [GREEN_BAY_RECYCLING, 'area/green-bay-recycling'], [FORT_WORTH_TEXAS, 'area/fort-worth-texas'], [EAST_BETHEL, 'area/east-bethel'],
  [COMPUTER_RECYCLING_MADISON, 'area/computer-recycling-madison'], [MINNEAPOLIS, 'area/minneapolis'], [BATTERY_RECYCLING_GREEN_BAY, 'area/battery-recycling-green-bay'],
  [SHREDDING_WAUKESHA, 'area/shredding-waukesha'],
  [NEW_BERLIN_RECYCLING_CENTER, 'area/new-berlin-recycling-center'],
])
