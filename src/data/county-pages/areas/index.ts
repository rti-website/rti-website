import type { CountyPage } from '../types'
import { BLAINE } from './blaine'
import { MILWAUKEE } from './milwaukee'
import { BATTERY_RECYCLING_MILWAUKEE } from './battery-recycling-milwaukee'
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
import { SHEBOYGAN } from './sheboygan'
import { TV_RECYCLING_GREEN_BAY } from './tv-recycling-green-bay'
import { FOND_DU_LAC_RECYCLING } from './fond-du-lac-recycling'
import { APPLETON_RECYCLING } from './appleton-recycling'
import { ROSEVILLE } from './roseville'
import { ELECTRONIC_RECYCLING_IN_WOODBURY } from './electronic-recycling-in-woodbury'
import { BROOKLYN_PARK_RECYCLING_CENTER } from './brooklyn-park-recycling-center'
import { SHREDDING_WISCONSIN } from './shredding-wisconsin'
import { LEWISBURG_TENNESSEE } from './lewisburg-tennessee'
import { RECYCLING_KITS_OHIO } from './recycling-kits'
import { RECYCLING_KITS_FLORIDA } from './recycling-kits'
import { ONTARIO_CALIFORNIA } from './ontario-california'
import { SHREDDING_RACINE } from './shredding-racine'
import { SHREDDING_APPLETON } from './shredding-appleton'
import { ROSEVILLE_ELECTRONIC_RECYCLING } from './roseville-electronic-recycling'
import { COMPUTER_RECYCLE_MINNEAPOLIS } from './computer-recycle-minneapolis'
import { ELECTRONICS_RECYCLING_IN_MINNEAPOLIS } from './electronics-recycling-in-minneapolis'
import { ELECTRONIC_RECYCLING_MINNEAPOLIS } from './electronic-recycling-minneapolis'
import { MADISON_ELECTRONIC_RECYCLING } from './madison-electronic-recycling'
import { ELECTRONIC_RECYCLING_MADISON } from './electronic-recycling-madison'
import { ELECTRONIC_RECYCLING_APPLETON } from './electronic-recycling-appleton'
import { ELECTRONICS_RECYCLING_GREEN_BAY } from './electronics-recycling-green-bay'
import { ELECTRONIC_RECYCLING_GREEN_BAY } from './electronic-recycling-green-bay'
import { TV_RECYCLING_MADISON } from './tv-recycling-madison'
import { COMPUTER_RECYCLE_DULUTH } from './computer-recycle-duluth'
import { BATTERY_RECYCLING_DULUTH } from './battery-recycling-duluth'
import { ELECTRONIC_RECYCLING_ST_PAUL } from './electronic-recycling-st-paul'
import { RICHFIELD_RECYCLING_SERVICES } from './richfield-recycling-services'
import { MINNEAPOLIS_RECYCLING_CENTER } from './minneapolis-recycling-center'
import { OAKDALE_RECYCLING_SERVICES } from './oakdale-recycling-services'
import { ROCHESTER_RECYCLING } from './rochester-recycling'
import { SHREDDING_MINNEAPOLIS } from './shredding-minneapolis'
import { SHREDDING_MILWAUKEE } from './shredding-milwaukee'
import { SHREDDING_MADISON } from './shredding-madison'
import { SHREDDING_DES_MOINES } from './shredding-des-moines'
import { TV_RECYCLING_DES_MOINES } from './tv-recycling-des-moines'
import { COMPUTER_RECYCLE_DES_MOINES } from './computer-recycle-des-moines'
import { ELECTRONIC_RECYCLING_DES_MOINES } from './electronic-recycling-des-moines'
import { ELECTRONIC_RECYCLING_IN_ROCHESTER } from './electronic-recycling-in-rochester'
import { DULUTH } from './duluth'
import { COMPUTER_RECYCLE_MILWAUKEE } from './computer-recycle-milwaukee'
import { TV_RECYCLING_MILWAUKEE } from './tv-recycling-milwaukee'
import { WOOD_BURY_RECYCLING } from './wood-bury-recycling'
import { RAMSEY_ELECTRONIC_RECYCLING } from './ramsey-electronic-recycling'
import { LIGHT_BULB_RECYCLING_MINNEAPOLIS } from './light-bulb-recycling-minneapolis'
import { SHREDDING_ROCHESTER } from './shredding-rochester'

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
  // WAUKESHA_RECYCLING_CENTER and ELECTRONICS_RECYCLING_MILWAUKEE came out on
  // 6 Oct 2026: both 301 now (the SEO redirect plan, url-map.csv), to
  // /wisconsin-recycling/waukesha-electronic-recycling/ and /wisconsin-recycling/milwaukee/.
  BLAINE, MILWAUKEE, BATTERY_RECYCLING_MILWAUKEE,
  OAK_CREEK, OCONOMOWOC_RECYCLING_CENTER, WAUKESHA_ELECTRONIC_RECYCLING,
  BATTERY_RECYCLING_WAUKESHA, TV_RECYCLING_WAUKESHA, APPLETON_ELECTRONIC_RECYCLING_CENTER, MADISON,
  BATTERY_RECYCLING_APPLETON, BATTERY_RECYCLING_MADISON, FLUORESCENT_BULB_RECYCLE_MADISON, BATTERY_RECYCLING_IN_MINNEAPOLIS,
  MAPLE_GROVE_RECYCLING_CENTER, BULB_RECYCLE_MINNEAPOLIS, BLOOMINGTON_RECYCLING_CENTER, ST_CLOUD_RECYCLING_CENTER,
  PLYMOUTH_RECYCLING_CENTER, MINNETONKA_RECYCLING_CENTER, COON_RAPIDS, BURNSVILLE_RECYCLING_CENTER,
  ELECTRONIC_RECYCLING_DULUTH, SHREDDING_MINNESOTA, SHREDDING_ST_PAUL, SHREDDING_GREEN_BAY,
  GREENWOOD_INDIANA, BULB_RECYCLE_MILWAUKEE, OCALA_FLORIDA, KENNESAW_GEORGIA,
  JOHNSON_CITY_BUFFALO_TENNESSEE, TV_RECYCLING_IN_WISCONSIN, TV_RECYCLING_IN_MINNESOTA,
  TV_RECYCLING_APPLETON, EDINA_RECYCLING_SERVICES, SHREDDING_DULUTH, PHOENIX_ARIZONA,
  LAKEVILLE_RECYCLING_CENTER, BATTERY_RECYCLING_ST_PAUL, GREEN_BAY_RECYCLING, FORT_WORTH_TEXAS,
  EAST_BETHEL, COMPUTER_RECYCLING_MADISON, MINNEAPOLIS, BATTERY_RECYCLING_GREEN_BAY,
  SHREDDING_WAUKESHA, NEW_BERLIN_RECYCLING_CENTER,
  // The 8 Oct 2026 batch: thirteen more old URLs back on this template
  // (Figma 7052:28731 / 7052:34333), copy from the old WordPress pages.
  SHEBOYGAN, TV_RECYCLING_GREEN_BAY, FOND_DU_LAC_RECYCLING, APPLETON_RECYCLING, ROSEVILLE, ELECTRONIC_RECYCLING_IN_WOODBURY, BROOKLYN_PARK_RECYCLING_CENTER, SHREDDING_WISCONSIN, LEWISBURG_TENNESSEE, RECYCLING_KITS_OHIO, RECYCLING_KITS_FLORIDA,
  ONTARIO_CALIFORNIA,
  // 28 Oct 2026: four old URLs back from 301s (redirect sheet "RTI Currently
  // redirect pages", action Restore), copy from the Wayback Machine.
  // Light Bulb Recycling Minneapolis and Rochester Shredding left the list the
  // same day: the sheet 301s them to /minnesota-recycling/bulb-recycle-minneapolis/
  // and /shredding-minnesota/ (data/url-map.csv).
  SHREDDING_RACINE, SHREDDING_APPLETON, ROSEVILLE_ELECTRONIC_RECYCLING, COMPUTER_RECYCLE_MINNEAPOLIS,
  // 29 Oct 2026: management, the whole sheet "RTI Currently redirect pages"
  // is pages again, no redirects. 28 more old URLs back on this template
  // (copy from the Wayback Machine), and Light Bulb Recycling Minneapolis
  // and Rochester Shredding back on the list.
  ELECTRONICS_RECYCLING_IN_MINNEAPOLIS, ELECTRONIC_RECYCLING_MINNEAPOLIS, MADISON_ELECTRONIC_RECYCLING, ELECTRONIC_RECYCLING_MADISON,
  ELECTRONIC_RECYCLING_APPLETON, ELECTRONICS_RECYCLING_GREEN_BAY, ELECTRONIC_RECYCLING_GREEN_BAY, TV_RECYCLING_MADISON,
  COMPUTER_RECYCLE_DULUTH, BATTERY_RECYCLING_DULUTH, ELECTRONIC_RECYCLING_ST_PAUL, RICHFIELD_RECYCLING_SERVICES,
  MINNEAPOLIS_RECYCLING_CENTER, OAKDALE_RECYCLING_SERVICES, ROCHESTER_RECYCLING, SHREDDING_MINNEAPOLIS,
  SHREDDING_MILWAUKEE, SHREDDING_MADISON, SHREDDING_DES_MOINES, TV_RECYCLING_DES_MOINES,
  COMPUTER_RECYCLE_DES_MOINES, ELECTRONIC_RECYCLING_DES_MOINES, ELECTRONIC_RECYCLING_IN_ROCHESTER, DULUTH,
  COMPUTER_RECYCLE_MILWAUKEE, TV_RECYCLING_MILWAUKEE, WOOD_BURY_RECYCLING, RAMSEY_ELECTRONIC_RECYCLING,
  LIGHT_BULB_RECYCLING_MINNEAPOLIS, SHREDDING_ROCHESTER,
]

export type AreaDocKey =
  | 'area/blaine'
  | 'area/milwaukee'
  | 'area/battery-recycling-milwaukee'
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
  | 'area/sheboygan'
  | 'area/tv-recycling-green-bay'
  | 'area/fond-du-lac-recycling'
  | 'area/appleton-recycling'
  | 'area/roseville'
  | 'area/electronic-recycling-in-woodbury'
  | 'area/brooklyn-park-recycling-center'
  | 'area/shredding-wisconsin'
  | 'area/lewisburg-tennessee'
  | 'area/recycling-kits-in-ohio'
  | 'area/recycling-kits-in-florida'
  | 'area/ontario-california'
  | 'area/shredding-racine'
  | 'area/shredding-appleton'
  | 'area/roseville-electronic-recycling'
  | 'area/computer-recycle-minneapolis'
  | 'area/electronics-recycling-in-minneapolis'
  | 'area/electronic-recycling-minneapolis'
  | 'area/madison-electronic-recycling'
  | 'area/electronic-recycling-madison'
  | 'area/electronic-recycling-appleton'
  | 'area/electronics-recycling-green-bay'
  | 'area/electronic-recycling-green-bay'
  | 'area/tv-recycling-madison'
  | 'area/computer-recycle-duluth'
  | 'area/battery-recycling-duluth'
  | 'area/electronic-recycling-st-paul'
  | 'area/richfield-recycling-services'
  | 'area/minneapolis-recycling-center'
  | 'area/oakdale-recycling-services'
  | 'area/rochester-recycling'
  | 'area/shredding-minneapolis'
  | 'area/shredding-milwaukee'
  | 'area/shredding-madison'
  | 'area/shredding-des-moines'
  | 'area/tv-recycling-des-moines'
  | 'area/computer-recycle-des-moines'
  | 'area/electronic-recycling-des-moines'
  | 'area/electronic-recycling-in-rochester'
  | 'area/duluth'
  | 'area/computer-recycle-milwaukee'
  | 'area/tv-recycling-milwaukee'
  | 'area/wood-bury-recycling'
  | 'area/ramsey-electronic-recycling'
  | 'area/light-bulb-recycling-minneapolis'
  | 'area/shredding-rochester'

export const AREA_DOC_KEY = new Map<CountyPage, AreaDocKey>([
  [BLAINE, 'area/blaine'], [MILWAUKEE, 'area/milwaukee'],
  [BATTERY_RECYCLING_MILWAUKEE, 'area/battery-recycling-milwaukee'], [OAK_CREEK, 'area/oak-creek'],
  [OCONOMOWOC_RECYCLING_CENTER, 'area/oconomowoc-recycling-center'], [WAUKESHA_ELECTRONIC_RECYCLING, 'area/waukesha-electronic-recycling'], [BATTERY_RECYCLING_WAUKESHA, 'area/battery-recycling-waukesha'],
  [TV_RECYCLING_WAUKESHA, 'area/tv-recycling-waukesha'], [APPLETON_ELECTRONIC_RECYCLING_CENTER, 'area/appleton-electronic-recycling-center'], [MADISON, 'area/madison'],
  [BATTERY_RECYCLING_APPLETON, 'area/battery-recycling-appleton'], [BATTERY_RECYCLING_MADISON, 'area/battery-recycling-madison'], [FLUORESCENT_BULB_RECYCLE_MADISON, 'area/fluorescent-bulb-recycle-madison'],
  [BATTERY_RECYCLING_IN_MINNEAPOLIS, 'area/battery-recycling-in-minneapolis'], [MAPLE_GROVE_RECYCLING_CENTER, 'area/maple-grove-recycling-center'], [BULB_RECYCLE_MINNEAPOLIS, 'area/bulb-recycle-minneapolis'],
  [BLOOMINGTON_RECYCLING_CENTER, 'area/bloomington-recycling-center'], [ST_CLOUD_RECYCLING_CENTER, 'area/st-cloud-recycling-center'], [PLYMOUTH_RECYCLING_CENTER, 'area/plymouth-recycling-center'],
  [MINNETONKA_RECYCLING_CENTER, 'area/minnetonka-recycling-center'], [COON_RAPIDS, 'area/coon-rapids'], [BURNSVILLE_RECYCLING_CENTER, 'area/burnsville-recycling-center'],
  [ELECTRONIC_RECYCLING_DULUTH, 'area/electronic-recycling-duluth'], [SHREDDING_MINNESOTA, 'area/shredding-minnesota'], [SHREDDING_ST_PAUL, 'area/shredding-st-paul'],
  [SHREDDING_GREEN_BAY, 'area/shredding-green-bay'], [GREENWOOD_INDIANA, 'area/greenwood-indiana'], [BULB_RECYCLE_MILWAUKEE, 'area/bulb-recycle-milwaukee'],
  [OCALA_FLORIDA, 'area/ocala-florida'], [KENNESAW_GEORGIA, 'area/kennesaw-georgia'], [JOHNSON_CITY_BUFFALO_TENNESSEE, 'area/johnson-city-buffalo-tennessee'],
  [TV_RECYCLING_IN_WISCONSIN, 'area/tv-recycling-in-wisconsin'], [TV_RECYCLING_IN_MINNESOTA, 'area/tv-recycling-in-minnesota'],
  [TV_RECYCLING_APPLETON, 'area/tv-recycling-appleton'], [EDINA_RECYCLING_SERVICES, 'area/edina-recycling-services'], [SHREDDING_DULUTH, 'area/shredding-duluth'],
  [PHOENIX_ARIZONA, 'area/phoenix-arizona'], [LAKEVILLE_RECYCLING_CENTER, 'area/lakeville-recycling-center'], [BATTERY_RECYCLING_ST_PAUL, 'area/battery-recycling-st-paul'],
  [GREEN_BAY_RECYCLING, 'area/green-bay-recycling'], [FORT_WORTH_TEXAS, 'area/fort-worth-texas'], [EAST_BETHEL, 'area/east-bethel'],
  [COMPUTER_RECYCLING_MADISON, 'area/computer-recycling-madison'], [MINNEAPOLIS, 'area/minneapolis'], [BATTERY_RECYCLING_GREEN_BAY, 'area/battery-recycling-green-bay'],
  [SHREDDING_WAUKESHA, 'area/shredding-waukesha'],
  [NEW_BERLIN_RECYCLING_CENTER, 'area/new-berlin-recycling-center'],
  [SHEBOYGAN, 'area/sheboygan'],
  [TV_RECYCLING_GREEN_BAY, 'area/tv-recycling-green-bay'],
  [FOND_DU_LAC_RECYCLING, 'area/fond-du-lac-recycling'],
  [APPLETON_RECYCLING, 'area/appleton-recycling'],
  [ROSEVILLE, 'area/roseville'],
  [ELECTRONIC_RECYCLING_IN_WOODBURY, 'area/electronic-recycling-in-woodbury'],
  [BROOKLYN_PARK_RECYCLING_CENTER, 'area/brooklyn-park-recycling-center'],
  [SHREDDING_WISCONSIN, 'area/shredding-wisconsin'],
  [LEWISBURG_TENNESSEE, 'area/lewisburg-tennessee'],
  [RECYCLING_KITS_OHIO, 'area/recycling-kits-in-ohio'],
  [RECYCLING_KITS_FLORIDA, 'area/recycling-kits-in-florida'],
  [ONTARIO_CALIFORNIA, 'area/ontario-california'],
  [SHREDDING_RACINE, 'area/shredding-racine'],
  [SHREDDING_APPLETON, 'area/shredding-appleton'],
  [ROSEVILLE_ELECTRONIC_RECYCLING, 'area/roseville-electronic-recycling'],
  [COMPUTER_RECYCLE_MINNEAPOLIS, 'area/computer-recycle-minneapolis'],
  [ELECTRONICS_RECYCLING_IN_MINNEAPOLIS, 'area/electronics-recycling-in-minneapolis'],
  [ELECTRONIC_RECYCLING_MINNEAPOLIS, 'area/electronic-recycling-minneapolis'],
  [MADISON_ELECTRONIC_RECYCLING, 'area/madison-electronic-recycling'],
  [ELECTRONIC_RECYCLING_MADISON, 'area/electronic-recycling-madison'],
  [ELECTRONIC_RECYCLING_APPLETON, 'area/electronic-recycling-appleton'],
  [ELECTRONICS_RECYCLING_GREEN_BAY, 'area/electronics-recycling-green-bay'],
  [ELECTRONIC_RECYCLING_GREEN_BAY, 'area/electronic-recycling-green-bay'],
  [TV_RECYCLING_MADISON, 'area/tv-recycling-madison'],
  [COMPUTER_RECYCLE_DULUTH, 'area/computer-recycle-duluth'],
  [BATTERY_RECYCLING_DULUTH, 'area/battery-recycling-duluth'],
  [ELECTRONIC_RECYCLING_ST_PAUL, 'area/electronic-recycling-st-paul'],
  [RICHFIELD_RECYCLING_SERVICES, 'area/richfield-recycling-services'],
  [MINNEAPOLIS_RECYCLING_CENTER, 'area/minneapolis-recycling-center'],
  [OAKDALE_RECYCLING_SERVICES, 'area/oakdale-recycling-services'],
  [ROCHESTER_RECYCLING, 'area/rochester-recycling'],
  [SHREDDING_MINNEAPOLIS, 'area/shredding-minneapolis'],
  [SHREDDING_MILWAUKEE, 'area/shredding-milwaukee'],
  [SHREDDING_MADISON, 'area/shredding-madison'],
  [SHREDDING_DES_MOINES, 'area/shredding-des-moines'],
  [TV_RECYCLING_DES_MOINES, 'area/tv-recycling-des-moines'],
  [COMPUTER_RECYCLE_DES_MOINES, 'area/computer-recycle-des-moines'],
  [ELECTRONIC_RECYCLING_DES_MOINES, 'area/electronic-recycling-des-moines'],
  [ELECTRONIC_RECYCLING_IN_ROCHESTER, 'area/electronic-recycling-in-rochester'],
  [DULUTH, 'area/duluth'],
  [COMPUTER_RECYCLE_MILWAUKEE, 'area/computer-recycle-milwaukee'],
  [TV_RECYCLING_MILWAUKEE, 'area/tv-recycling-milwaukee'],
  [WOOD_BURY_RECYCLING, 'area/wood-bury-recycling'],
  [RAMSEY_ELECTRONIC_RECYCLING, 'area/ramsey-electronic-recycling'],
  [LIGHT_BULB_RECYCLING_MINNEAPOLIS, 'area/light-bulb-recycling-minneapolis'],
  [SHREDDING_ROCHESTER, 'area/shredding-rochester'],
])
