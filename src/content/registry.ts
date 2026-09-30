import 'server-only'
import * as home from '@/data/home'
import * as about from '@/data/about'
import * as services from '@/data/services'
import * as whyChooseUs from '@/data/why-choose-us'
import * as sustainability from '@/data/sustainability'
import * as certificationsPage from '@/data/certifications-page'
import * as caseStudies from '@/data/case-studies'
import * as complianceCenter from '@/data/compliance-center'
import * as contact from '@/data/contact'
import * as downloads from '@/data/downloads'
import * as faqs from '@/data/faqs'
import * as guides from '@/data/guides'
import * as resources from '@/data/resources'
import * as itad from '@/data/itad'
import * as locations from '@/data/locations'
import * as industries from '@/data/industries'
import * as blog from '@/data/blog'
import * as batteryRecycling from '@/data/battery-recycling'
import * as electronicsRecycling from '@/data/electronics-recycling'
import * as lightBulbs from '@/data/light-bulbs'
import * as ballasts from '@/data/ballasts'
import * as airbagRecycling from '@/data/airbag-recycling'
import * as tvRecycling from '@/data/tv-recycling'
import * as hardDriveDestruction from '@/data/hard-drive-destruction'
import * as paperShredding from '@/data/paper-shredding'
import * as offSiteShredding from '@/data/off-site-shredding'
import * as phoneShredding from '@/data/phone-shredding'
import * as mailInRecycling from '@/data/mail-in-recycling'
import * as electronicsRecyclingKit from '@/data/electronics-recycling-kit'
import * as indAutomotive from '@/data/industries/automotive-fleet'
import * as indEducation from '@/data/industries/education'
import * as indFinancial from '@/data/industries/financial-services-banking'
import * as indGovernment from '@/data/industries/government-municipal'
import * as indHealthcare from '@/data/industries/healthcare'
import * as indManufacturing from '@/data/industries/manufacturing-industrial'
import * as indRetail from '@/data/industries/retail-corporate-offices'
import { ANOKA } from '@/data/county-pages/anoka'
import { BENTON } from '@/data/county-pages/benton'
import { DAKOTA } from '@/data/county-pages/dakota'
import { HENNEPIN } from '@/data/county-pages/hennepin'
import { OLMSTED } from '@/data/county-pages/olmsted'
import { RAMSEY } from '@/data/county-pages/ramsey'
import { SCOTT } from '@/data/county-pages/scott'
import { WASHINGTON_MN } from '@/data/county-pages/washington-mn'
import { CALUMET } from '@/data/county-pages/calumet'
import { RACINE } from '@/data/county-pages/racine'
import { WASHINGTON_WI } from '@/data/county-pages/washington-wi'
import { BLAINE } from '@/data/county-pages/areas/blaine'
import { MILWAUKEE } from '@/data/county-pages/areas/milwaukee'
import { WAUKESHA_RECYCLING_CENTER } from '@/data/county-pages/areas/waukesha-recycling-center'
import { BATTERY_RECYCLING_MILWAUKEE } from '@/data/county-pages/areas/battery-recycling-milwaukee'
import { ELECTRONICS_RECYCLING_MILWAUKEE } from '@/data/county-pages/areas/electronics-recycling-milwaukee'
import { OAK_CREEK } from '@/data/county-pages/areas/oak-creek'
import { OCONOMOWOC_RECYCLING_CENTER } from '@/data/county-pages/areas/oconomowoc-recycling-center'
import { WAUKESHA_ELECTRONIC_RECYCLING } from '@/data/county-pages/areas/waukesha-electronic-recycling'
import { BATTERY_RECYCLING_WAUKESHA } from '@/data/county-pages/areas/battery-recycling-waukesha'
import { TV_RECYCLING_WAUKESHA } from '@/data/county-pages/areas/tv-recycling-waukesha'
import { APPLETON_ELECTRONIC_RECYCLING_CENTER } from '@/data/county-pages/areas/appleton-electronic-recycling-center'
import { MADISON } from '@/data/county-pages/areas/madison'
import { BATTERY_RECYCLING_APPLETON } from '@/data/county-pages/areas/battery-recycling-appleton'
import { BATTERY_RECYCLING_MADISON } from '@/data/county-pages/areas/battery-recycling-madison'
import { FLUORESCENT_BULB_RECYCLE_MADISON } from '@/data/county-pages/areas/fluorescent-bulb-recycle-madison'
import { BATTERY_RECYCLING_IN_MINNEAPOLIS } from '@/data/county-pages/areas/battery-recycling-in-minneapolis'
import { MAPLE_GROVE_RECYCLING_CENTER } from '@/data/county-pages/areas/maple-grove-recycling-center'
import { BULB_RECYCLE_MINNEAPOLIS } from '@/data/county-pages/areas/bulb-recycle-minneapolis'
import { BLOOMINGTON_RECYCLING_CENTER } from '@/data/county-pages/areas/bloomington-recycling-center'
import { ST_CLOUD_RECYCLING_CENTER } from '@/data/county-pages/areas/st-cloud-recycling-center'
import { PLYMOUTH_RECYCLING_CENTER } from '@/data/county-pages/areas/plymouth-recycling-center'
import { MINNETONKA_RECYCLING_CENTER } from '@/data/county-pages/areas/minnetonka-recycling-center'
import { COON_RAPIDS } from '@/data/county-pages/areas/coon-rapids'
import { BURNSVILLE_RECYCLING_CENTER } from '@/data/county-pages/areas/burnsville-recycling-center'
import { ELECTRONIC_RECYCLING_DULUTH } from '@/data/county-pages/areas/electronic-recycling-duluth'
import { SHREDDING_MINNESOTA } from '@/data/county-pages/areas/shredding-minnesota'
import { SHREDDING_ST_PAUL } from '@/data/county-pages/areas/shredding-st-paul'
import { SHREDDING_GREEN_BAY } from '@/data/county-pages/areas/shredding-green-bay'
import { GREENWOOD_INDIANA } from '@/data/county-pages/areas/greenwood-indiana'
import { BULB_RECYCLE_MILWAUKEE } from '@/data/county-pages/areas/bulb-recycle-milwaukee'
import { OCALA_FLORIDA } from '@/data/county-pages/areas/ocala-florida'
import { KENNESAW_GEORGIA } from '@/data/county-pages/areas/kennesaw-georgia'
import { JOHNSON_CITY_BUFFALO_TENNESSEE } from '@/data/county-pages/areas/johnson-city-buffalo-tennessee'
import { FRANKLIN_INDIANA } from '@/data/county-pages/areas/franklin-indiana'
import { TV_RECYCLING_IN_WISCONSIN } from '@/data/county-pages/areas/tv-recycling-in-wisconsin'
import { TV_RECYCLING_IN_MINNESOTA } from '@/data/county-pages/areas/tv-recycling-in-minnesota'
import { TV_RECYCLING_APPLETON } from '@/data/county-pages/areas/tv-recycling-appleton'
import { EDINA_RECYCLING_SERVICES } from '@/data/county-pages/areas/edina-recycling-services'
import { SHREDDING_DULUTH } from '@/data/county-pages/areas/shredding-duluth'
import { PHOENIX_ARIZONA } from '@/data/county-pages/areas/phoenix-arizona'
import { LAKEVILLE_RECYCLING_CENTER } from '@/data/county-pages/areas/lakeville-recycling-center'
import { BATTERY_RECYCLING_ST_PAUL } from '@/data/county-pages/areas/battery-recycling-st-paul'
import { GREEN_BAY_RECYCLING } from '@/data/county-pages/areas/green-bay-recycling'
import { FORT_WORTH_TEXAS } from '@/data/county-pages/areas/fort-worth-texas'
import { EAST_BETHEL } from '@/data/county-pages/areas/east-bethel'
import { COMPUTER_RECYCLING_MADISON } from '@/data/county-pages/areas/computer-recycling-madison'
import { MINNEAPOLIS } from '@/data/county-pages/areas/minneapolis'
import { BATTERY_RECYCLING_GREEN_BAY } from '@/data/county-pages/areas/battery-recycling-green-bay'
import { SHREDDING_WAUKESHA } from '@/data/county-pages/areas/shredding-waukesha'
import { NEW_BERLIN_RECYCLING_CENTER } from '@/data/county-pages/areas/new-berlin-recycling-center'
import { LANDING_WISCONSIN_BATTERY_RECYCLING } from '@/data/landing-pages/wisconsin-battery-recycling'
import { LANDING_WISCONSIN_ELECTRONIC_RECYCLE } from '@/data/landing-pages/wisconsin-electronic-recycle'
import { LANDING_WISCONSIN_LIGHT_BULBS } from '@/data/landing-pages/wisconsin-light-bulbs'
import { LANDING_MINNESOTA_BATTERY_RECYCLING } from '@/data/landing-pages/minnesota-battery-recycling'
import { LANDING_MINNESOTA_ELECTRONIC_RECYCLE } from '@/data/landing-pages/minnesota-electronic-recycle'
import { LANDING_MINNESOTA_LIGHT_BULBS } from '@/data/landing-pages/minnesota-light-bulbs'
import { LANDING_CHICAGO_BATTERY_RECYCLING } from '@/data/landing-pages/chicago-battery-recycling'
import { LANDING_CHICAGO_ELECTRONIC_RECYCLE } from '@/data/landing-pages/chicago-electronic-recycle'
import { LANDING_CHICAGO_LIGHT_BULBS } from '@/data/landing-pages/chicago-light-bulbs'
import { WISCONSIN_AIRBAG_RECYCLING } from '@/data/local-pages/wisconsin-airbag-recycling'
import { WISCONSIN_BALLAST_RECYCLING } from '@/data/local-pages/wisconsin-ballast-recycling'
import { WISCONSIN_BATTERY_RECYCLING } from '@/data/local-pages/wisconsin-battery-recycling'
import { WISCONSIN_ELECTRONIC_RECYCLING } from '@/data/local-pages/wisconsin-electronic-recycling'
import { WISCONSIN_LIGHT_BULB_RECYCLING } from '@/data/local-pages/wisconsin-light-bulb-recycling'
import { WISCONSIN_ON_SITE_OFF_SITE_SHREDDING } from '@/data/local-pages/wisconsin-on-site-off-site-shredding'
import { WISCONSIN_PAPER_SHREDDING } from '@/data/local-pages/wisconsin-paper-shredding'
import { WISCONSIN_PHONE_SHREDDING } from '@/data/local-pages/wisconsin-phone-shredding'
import { WISCONSIN_TV_RECYCLING } from '@/data/local-pages/wisconsin-tv-recycling'
import { MINNESOTA_AIRBAG_RECYCLING } from '@/data/local-pages/minnesota-airbag-recycling'
import { MINNESOTA_BALLAST_RECYCLING } from '@/data/local-pages/minnesota-ballast-recycling'
import { MINNESOTA_BATTERY_RECYCLING } from '@/data/local-pages/minnesota-battery-recycling'
import { MINNESOTA_ELECTRONIC_RECYCLING } from '@/data/local-pages/minnesota-electronic-recycling'
import { MINNESOTA_HARD_DRIVE_DESTRUCTION } from '@/data/local-pages/minnesota-hard-drive-destruction'
import { MINNESOTA_LIGHT_BULB_RECYCLING } from '@/data/local-pages/minnesota-light-bulb-recycling'
import { MINNESOTA_ON_SITE_OFF_SITE_SHREDDING } from '@/data/local-pages/minnesota-on-site-off-site-shredding'
import { MINNESOTA_PAPER_SHREDDING } from '@/data/local-pages/minnesota-paper-shredding'
import { MINNESOTA_PHONE_SHREDDING } from '@/data/local-pages/minnesota-phone-shredding'
import { MINNESOTA_TV_RECYCLING } from '@/data/local-pages/minnesota-tv-recycling'
import { CHICAGO_AIRBAG_RECYCLING } from '@/data/local-pages/chicago-airbag-recycling'
import { CHICAGO_BALLAST_RECYCLING } from '@/data/local-pages/chicago-ballast-recycling'
import { CHICAGO_BATTERY_RECYCLING } from '@/data/local-pages/chicago-battery-recycling'
import { CHICAGO_HARD_DRIVE_DESTRUCTION } from '@/data/local-pages/chicago-hard-drive-destruction'
import { CHICAGO_LIGHT_BULB_RECYCLING } from '@/data/local-pages/chicago-light-bulb-recycling'
import { CHICAGO_ON_SITE_OFF_SITE_SHREDDING } from '@/data/local-pages/chicago-on-site-off-site-shredding'
import { CHICAGO_PAPER_SHREDDING } from '@/data/local-pages/chicago-paper-shredding'
import { CHICAGO_PHONE_SHREDDING } from '@/data/local-pages/chicago-phone-shredding'
import { CHICAGO_TV_RECYCLING } from '@/data/local-pages/chicago-tv-recycling'
import { CHICAGO_ELECTRONIC_RECYCLING } from '@/data/local-pages/chicago-electronic-recycling'
import * as facilities from '@/data/facilities'
import * as certifications from '@/data/certifications'
import * as nav from '@/lib/nav'
import * as siteFooter from '@/data/site-footer'
import * as emails from '@/data/emails'
import * as notFound from '@/data/not-found'
import { mdxDoc } from './mdx-docs'

/**
 * EVERY DOCUMENT ADMIN -> PAGES CAN EDIT (27 Sep 2026).
 *
 * A document is a set of copy the admin edits in one go: usually a page
 * (one src/data module), sometimes part of a module (one state landing
 * page), sometimes a block many pages share (facilities, the footer).
 * `data()` returns its DEFAULTS, the objects in src/data as the developers
 * wrote them; src/lib/page-content.ts lays the published (or, in preview,
 * the draft) patch over them.
 *
 * TO MAKE A NEW PAGE EDITABLE: add its entry here, and in each component that
 * renders its copy read it with `await content('<key>')` instead of importing
 * the constant. `npm run check:pages` then shows which fields render.
 *
 * `mod()` takes a whole module, minus what is not copy: functions, types,
 * SEO (edited in the SEO desk), TODO notes, URLs, and exports derived from
 * another document (list them in `omit`; the component derives them from
 * the source document instead, so an edit there reaches it).
 *
 * `urls` are where the copy shows: the first is where Preview opens.
 */

export type Group = 'Main pages' | 'Service pages' | 'Industry pages' | 'State landing pages' | 'Location pages' | 'Legal and other pages' | 'Shared blocks'

type Doc = {
  title: string
  group: Group
  urls: string[]
  data: () => unknown
  /** One line under the title in the list. */
  note?: string
}

const SKIP = /(SEO|TODO|^URL$|_START$)/i

/** A module's data exports, minus `omit` and anything that is not copy. */
function mod<M extends object>(m: M, omit: string[] = []): () => M {
  return () => {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(m)) {
      if (typeof v === 'function' || v === undefined || SKIP.test(k) || omit.includes(k)) continue
      out[k] = v
    }
    return out as M
  }
}
const one = <T,>(v: T) => () => v
const MD_NOTE = 'Text is Markdown: ## starts a heading, **bold**, - starts a list item, [words](/link/) is a link.'

export const DOCS = {
  /* ---------------------------------------------------------- main pages -- */
  home: { title: 'Homepage', group: 'Main pages', urls: ['/', '/light-bulbs/'], data: mod(home),
    note: 'Service tabs come from "Services page", case study text from "Case Studies", certifications from "Certifications (shared)". The Client\'s Stories band and the closing call to action also show on the service pages and Resources.' },
  about: { title: 'About Us', group: 'Main pages', urls: ['/about-us-commercial-recycling-solutions/'], data: mod(about) },
  services: { title: 'Services page', group: 'Main pages', urls: ['/services/', '/', '/light-bulbs/'], data: mod(services),
    note: 'The service cards here also fill the homepage service tabs and the Services menu. "Service page text" is the shared labels on every service page (breadcrumb, location picker, FAQ heading).' },
  'why-choose-us': { title: 'Why Choose Us', group: 'Main pages', urls: ['/why-choose-us/'], data: mod(whyChooseUs) },
  sustainability: { title: 'Sustainability', group: 'Main pages', urls: ['/sustainability/'], data: mod(sustainability) },
  'certifications-page': { title: 'Certifications page', group: 'Main pages', urls: ['/certifications/'], data: mod(certificationsPage) },
  'case-studies': { title: 'Case Studies', group: 'Main pages', urls: ['/case-studies/', '/'], data: mod(caseStudies, ['COMPLIANCE_CASE_IDS']),
    note: 'The case study cards also show on the homepage and the Compliance Center.' },
  'compliance-center': { title: 'Compliance Center', group: 'Main pages', urls: ['/compliance-center/'], data: mod(complianceCenter) },
  contact: { title: 'Contact Us', group: 'Main pages', urls: ['/contact-us/', '/', '/quote/', '/request-a-pickup/'], data: mod(contact),
    note: 'The form (labels, options, messages) and facility cards. The service and location options also feed the homepage quote picker; the facility cards also show in the footer.' },
  downloads: { title: 'Downloads', group: 'Main pages', urls: ['/downloads/'], data: mod(downloads) },
  faqs: { title: 'FAQs', group: 'Main pages', urls: ['/faqs/'], data: mod(faqs, ['ALL_FAQS']) },
  guides: { title: 'ITAD Recycling Guides', group: 'Main pages', urls: ['/itad-recycling-guides/'], data: mod(guides) },
  resources: { title: 'Resources', group: 'Main pages', urls: ['/resources/'], data: mod(resources),
    note: 'Its guide and article cards also fill the Related Articles band under every blog post.' },
  itad: { title: 'IT Asset Disposition', group: 'Main pages', urls: ['/it-asset-disposition/'], data: mod(itad) },
  locations: { title: 'All Locations', group: 'Main pages', urls: ['/all-locations/'], data: mod(locations) },
  industries: { title: 'Industries', group: 'Main pages', urls: ['/industries/'], data: mod(industries) },
  blog: { title: 'Blog page', group: 'Main pages', urls: ['/blog/'], data: mod(blog, ['ARTICLES']),
    note: 'The heading, intro and newsletter box, and the Related Articles heading under every post. Posts themselves are edited under All Posts.' },

  /* ------------------------------------------------------- service pages -- */
  'battery-recycling': { title: 'Battery Recycling', group: 'Service pages', urls: ['/battery-recycling/'], data: one({ CONTENT: batteryRecycling.CONTENT }) },
  'electronics-recycling': { title: 'Electronic Recycling', group: 'Service pages', urls: ['/electronic-recycle/'], data: one({ CONTENT: electronicsRecycling.CONTENT }) },
  'light-bulbs': { title: 'Light Bulb Recycling', group: 'Service pages', urls: ['/light-bulbs/'], data: mod(lightBulbs) },
  ballasts: { title: 'Ballast Recycling', group: 'Service pages', urls: ['/ballasts/'], data: mod(ballasts) },
  'airbag-recycling': { title: 'Airbag Recycling', group: 'Service pages', urls: ['/airbag-recycling/'], data: mod(airbagRecycling) },
  'tv-recycling': { title: 'TV Recycling', group: 'Service pages', urls: ['/tv-recycling/'], data: mod(tvRecycling) },
  'hard-drive-destruction': { title: 'Hard Drive Destruction', group: 'Service pages', urls: ['/hard-drive-destruction-services/'], data: mod(hardDriveDestruction) },
  'paper-shredding': { title: 'Paper Shredding', group: 'Service pages', urls: ['/paper-shredding-services/'], data: mod(paperShredding) },
  'off-site-shredding': { title: 'On-Site & Off-Site Shredding', group: 'Service pages', urls: ['/on-site-off-site-shredding/'], data: mod(offSiteShredding) },
  'phone-shredding': { title: 'Phone Shredding', group: 'Service pages', urls: ['/phone-shredding-service/'], data: mod(phoneShredding) },
  'mail-in-recycling': { title: 'Mail-In Recycling', group: 'Service pages', urls: ['/mail-in-recycling/'], data: mod(mailInRecycling) },
  'electronics-recycling-kit': { title: 'Electronics Recycling Kit', group: 'Service pages', urls: ['/electronics-recycling-kit/'], data: mod(electronicsRecyclingKit) },

  /* ------------------------------------------------------ industry pages -- */
  'industries/automotive-fleet': { title: 'Automotive & Fleet', group: 'Industry pages', urls: ['/industries/automotive-fleet/'], data: mod(indAutomotive) },
  'industries/education': { title: 'Education', group: 'Industry pages', urls: ['/industries/education/'], data: mod(indEducation) },
  'industries/financial-services-banking': { title: 'Financial Services & Banking', group: 'Industry pages', urls: ['/industries/financial-services-banking/'], data: mod(indFinancial) },
  'industries/government-municipal': { title: 'Government & Municipal', group: 'Industry pages', urls: ['/industries/government-municipal/'], data: mod(indGovernment) },
  'industries/healthcare': { title: 'Healthcare', group: 'Industry pages', urls: ['/industries/healthcare/'], data: mod(indHealthcare) },
  'industries/manufacturing-industrial': { title: 'Manufacturing & Industrial', group: 'Industry pages', urls: ['/industries/manufacturing-industrial/'], data: mod(indManufacturing) },
  'industries/retail-corporate-offices': { title: 'Retail & Corporate Offices', group: 'Industry pages', urls: ['/industries/retail-corporate-offices/'], data: mod(indRetail) },

  /* ------------------------------------------------- state landing pages -- */

  /* ------------------------------------------------------ location pages -- */
  /* Chicago, Blaine and New Berlin: reached by URL and from ads, not from
     the menus. ("City pages" until 27 Sep 2026.) */
  /* The county pages (29 Sep 2026): the Items We Accept pills, service cards
     and CTA banner are shared (src/data/county-pages/shared.ts) and not here. */
  'county/anoka': { title: 'Anoka County Recycling Center', group: 'Location pages', urls: [ANOKA.url], data: one(ANOKA) },
  'county/benton': { title: 'Benton County Recycling', group: 'Location pages', urls: [BENTON.url], data: one(BENTON) },
  'county/dakota': { title: 'Dakota County Recycling Center', group: 'Location pages', urls: [DAKOTA.url], data: one(DAKOTA) },
  'county/hennepin': { title: 'Hennepin County Recycling Center', group: 'Location pages', urls: [HENNEPIN.url], data: one(HENNEPIN) },
  'county/olmsted': { title: 'Olmsted County Recycling Center', group: 'Location pages', urls: [OLMSTED.url], data: one(OLMSTED) },
  'county/ramsey': { title: 'Ramsey Recycling (Ramsey County)', group: 'Location pages', urls: [RAMSEY.url], data: one(RAMSEY) },
  'county/scott': { title: 'Scott County Recycling', group: 'Location pages', urls: [SCOTT.url], data: one(SCOTT) },
  'county/washington-mn': { title: 'Washington County Recycling Center, MN', group: 'Location pages', urls: [WASHINGTON_MN.url], data: one(WASHINGTON_MN) },
  'county/calumet': { title: 'Calumet County Recycling Center', group: 'Location pages', urls: [CALUMET.url], data: one(CALUMET) },
  'county/racine': { title: 'Racine County Recycling Center', group: 'Location pages', urls: [RACINE.url], data: one(RACINE) },
  'county/washington-wi': { title: 'Washington County Recycling Center, WI', group: 'Location pages', urls: [WASHINGTON_WI.url], data: one(WASHINGTON_WI) },
  /* The area pages (29 Sep 2026): the old location pages back at their own
     URLs on the county template (src/data/county-pages/areas/). */
  'area/blaine': { title: "Blaine Recycling", group: 'Location pages', urls: [BLAINE.url], data: one(BLAINE) },
  'area/milwaukee': { title: "Recycling Center in Milwaukee", group: 'Location pages', urls: [MILWAUKEE.url], data: one(MILWAUKEE) },
  'area/waukesha-recycling-center': { title: "Waukesha Recycling Center", group: 'Location pages', urls: [WAUKESHA_RECYCLING_CENTER.url], data: one(WAUKESHA_RECYCLING_CENTER) },
  'area/battery-recycling-milwaukee': { title: "Non-Hazardous Battery Recycling Milwaukee", group: 'Location pages', urls: [BATTERY_RECYCLING_MILWAUKEE.url], data: one(BATTERY_RECYCLING_MILWAUKEE) },
  'area/electronics-recycling-milwaukee': { title: "Electronics Recycling Milwaukee, WI", group: 'Location pages', urls: [ELECTRONICS_RECYCLING_MILWAUKEE.url], data: one(ELECTRONICS_RECYCLING_MILWAUKEE) },
  'area/oak-creek': { title: "Oak Creek Recycling Center", group: 'Location pages', urls: [OAK_CREEK.url], data: one(OAK_CREEK) },
  'local/wisconsin-recycling-airbag-recycling': { title: "Airbag Recycling in Wisconsin", group: 'Location pages', urls: [WISCONSIN_AIRBAG_RECYCLING.url], data: one(WISCONSIN_AIRBAG_RECYCLING) },
  'local/wisconsin-recycling-ballast-recycling': { title: "Ballast Recycling in Wisconsin", group: 'Location pages', urls: [WISCONSIN_BALLAST_RECYCLING.url], data: one(WISCONSIN_BALLAST_RECYCLING) },
  'local/wisconsin-recycling-battery-recycling': { title: "Battery Recycling in New Berlin, Wisconsin", group: 'Location pages', urls: [WISCONSIN_BATTERY_RECYCLING.url], data: one(WISCONSIN_BATTERY_RECYCLING) },
  'local/wisconsin-recycling-electronic-recycling': { title: "Electronic Recycling in New Berlin, Wisconsin", group: 'Location pages', urls: [WISCONSIN_ELECTRONIC_RECYCLING.url], data: one(WISCONSIN_ELECTRONIC_RECYCLING) },
  'local/wisconsin-recycling-light-bulb-recycling': { title: "Light Bulb Recycling in New Berlin, Wisconsin", group: 'Location pages', urls: [WISCONSIN_LIGHT_BULB_RECYCLING.url], data: one(WISCONSIN_LIGHT_BULB_RECYCLING) },
  'local/wisconsin-recycling-on-site-off-site-shredding': { title: "On-Site & Off-Site Shredding in New Berlin, Wisconsin", group: 'Location pages', urls: [WISCONSIN_ON_SITE_OFF_SITE_SHREDDING.url], data: one(WISCONSIN_ON_SITE_OFF_SITE_SHREDDING) },
  'local/wisconsin-recycling-paper-shredding': { title: "Paper Shredding Services in New Berlin, Wisconsin", group: 'Location pages', urls: [WISCONSIN_PAPER_SHREDDING.url], data: one(WISCONSIN_PAPER_SHREDDING) },
  'local/wisconsin-recycling-phone-shredding': { title: "Phone Shredding Service in New Berlin, Wisconsin", group: 'Location pages', urls: [WISCONSIN_PHONE_SHREDDING.url], data: one(WISCONSIN_PHONE_SHREDDING) },
  'local/wisconsin-recycling-tv-recycling': { title: "Television Recycling in Wisconsin", group: 'Location pages', urls: [WISCONSIN_TV_RECYCLING.url], data: one(WISCONSIN_TV_RECYCLING) },
  'local/minnesota-recycling-airbag-recycling': { title: "Airbag Recycling in Minnesota", group: 'Location pages', urls: [MINNESOTA_AIRBAG_RECYCLING.url], data: one(MINNESOTA_AIRBAG_RECYCLING) },
  'local/minnesota-recycling-ballast-recycling': { title: "Ballast Recycling in Minnesota", group: 'Location pages', urls: [MINNESOTA_BALLAST_RECYCLING.url], data: one(MINNESOTA_BALLAST_RECYCLING) },
  'local/minnesota-recycling-battery-recycling': { title: "Battery Recycling in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_BATTERY_RECYCLING.url], data: one(MINNESOTA_BATTERY_RECYCLING) },
  'local/minnesota-recycling-electronic-recycling': { title: "Electronic Recycling in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_ELECTRONIC_RECYCLING.url], data: one(MINNESOTA_ELECTRONIC_RECYCLING) },
  'local/minnesota-recycling-hard-drive-destruction': { title: "Hard Drive Destruction in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_HARD_DRIVE_DESTRUCTION.url], data: one(MINNESOTA_HARD_DRIVE_DESTRUCTION) },
  'local/minnesota-recycling-light-bulb-recycling': { title: "Light Bulb Recycling in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_LIGHT_BULB_RECYCLING.url], data: one(MINNESOTA_LIGHT_BULB_RECYCLING) },
  'local/minnesota-recycling-on-site-off-site-shredding': { title: "On-Site & Off-Site Shredding in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_ON_SITE_OFF_SITE_SHREDDING.url], data: one(MINNESOTA_ON_SITE_OFF_SITE_SHREDDING) },
  'local/minnesota-recycling-paper-shredding': { title: "Paper Shredding Services in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_PAPER_SHREDDING.url], data: one(MINNESOTA_PAPER_SHREDDING) },
  'local/minnesota-recycling-phone-shredding': { title: "Phone Shredding Service in Blaine, Minnesota", group: 'Location pages', urls: [MINNESOTA_PHONE_SHREDDING.url], data: one(MINNESOTA_PHONE_SHREDDING) },
  'local/minnesota-recycling-tv-recycling': { title: "Television Recycling in Minnesota", group: 'Location pages', urls: [MINNESOTA_TV_RECYCLING.url], data: one(MINNESOTA_TV_RECYCLING) },
  'local/airbag-recycling-chicago': { title: "Airbag Recycling in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_AIRBAG_RECYCLING.url], data: one(CHICAGO_AIRBAG_RECYCLING) },
  'local/ballast-recycling-chicago': { title: "Ballast Recycling in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_BALLAST_RECYCLING.url], data: one(CHICAGO_BALLAST_RECYCLING) },
  'local/battery-recycling-chicago': { title: "Battery Recycling in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_BATTERY_RECYCLING.url], data: one(CHICAGO_BATTERY_RECYCLING) },
  'local/hard-drive-destruction-chicago': { title: "Hard Drive Destruction in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_HARD_DRIVE_DESTRUCTION.url], data: one(CHICAGO_HARD_DRIVE_DESTRUCTION) },
  'local/light-bulb-recycling-chicago': { title: "Light Bulb Recycling in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_LIGHT_BULB_RECYCLING.url], data: one(CHICAGO_LIGHT_BULB_RECYCLING) },
  'local/on-site-off-site-shredding-chicago': { title: "On-Site and Off-Site Shredding in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_ON_SITE_OFF_SITE_SHREDDING.url], data: one(CHICAGO_ON_SITE_OFF_SITE_SHREDDING) },
  'local/paper-shredding-chicago': { title: "Paper Shredding Services in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_PAPER_SHREDDING.url], data: one(CHICAGO_PAPER_SHREDDING) },
  'local/phone-shredding-chicago': { title: "Phone Shredding Service in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_PHONE_SHREDDING.url], data: one(CHICAGO_PHONE_SHREDDING) },
  'local/tv-recycling-chicago': { title: "Television Recycling in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_TV_RECYCLING.url], data: one(CHICAGO_TV_RECYCLING) },
  'local/electronic-recycling-chicago': { title: "Electronics Recycling in Chicago, Illinois", group: 'Location pages', urls: [CHICAGO_ELECTRONIC_RECYCLING.url], data: one(CHICAGO_ELECTRONIC_RECYCLING) },
  'landing/battery-recycling-Wisconsin': { title: "Battery Recycling in Wisconsin (Google Ads)", group: 'State landing pages', urls: [LANDING_WISCONSIN_BATTERY_RECYCLING.url], data: one(LANDING_WISCONSIN_BATTERY_RECYCLING) },
  'landing/electronic-recycle-Wisconsin': { title: "Electronics Recycling in Wisconsin (Google Ads)", group: 'State landing pages', urls: [LANDING_WISCONSIN_ELECTRONIC_RECYCLE.url], data: one(LANDING_WISCONSIN_ELECTRONIC_RECYCLE) },
  'landing/light-bulbs-Wisconsin': { title: "Light Bulb Recycling in Wisconsin (Google Ads)", group: 'State landing pages', urls: [LANDING_WISCONSIN_LIGHT_BULBS.url], data: one(LANDING_WISCONSIN_LIGHT_BULBS) },
  'landing/battery-recycling-Minnesota': { title: "Battery Recycling in Minnesota (Google Ads)", group: 'State landing pages', urls: [LANDING_MINNESOTA_BATTERY_RECYCLING.url], data: one(LANDING_MINNESOTA_BATTERY_RECYCLING) },
  'landing/electronic-recycle-Minnesota': { title: "Electronics Recycling in Minnesota (Google Ads)", group: 'State landing pages', urls: [LANDING_MINNESOTA_ELECTRONIC_RECYCLE.url], data: one(LANDING_MINNESOTA_ELECTRONIC_RECYCLE) },
  'landing/light-bulbs-Minnesota': { title: "Light Bulb Recycling in Minnesota (Google Ads)", group: 'State landing pages', urls: [LANDING_MINNESOTA_LIGHT_BULBS.url], data: one(LANDING_MINNESOTA_LIGHT_BULBS) },
  'landing/battery-recycling-Chicago': { title: "Battery Recycling in Chicago, Illinois (Google Ads)", group: 'State landing pages', urls: [LANDING_CHICAGO_BATTERY_RECYCLING.url], data: one(LANDING_CHICAGO_BATTERY_RECYCLING) },
  'landing/electronic-recycle-Chicago': { title: "Electronics Recycling in Chicago, Illinois (Google Ads)", group: 'State landing pages', urls: [LANDING_CHICAGO_ELECTRONIC_RECYCLE.url], data: one(LANDING_CHICAGO_ELECTRONIC_RECYCLE) },
  'landing/light-bulbs-Chicago': { title: "Light Bulb Recycling in Chicago, Illinois (Google Ads)", group: 'State landing pages', urls: [LANDING_CHICAGO_LIGHT_BULBS.url], data: one(LANDING_CHICAGO_LIGHT_BULBS) },
  'area/new-berlin-recycling-center': { title: "New Berlin Recycling Center", group: 'Location pages', urls: [NEW_BERLIN_RECYCLING_CENTER.url], data: one(NEW_BERLIN_RECYCLING_CENTER) },
  'area/oconomowoc-recycling-center': { title: "Oconomowoc Recycling Center", group: 'Location pages', urls: [OCONOMOWOC_RECYCLING_CENTER.url], data: one(OCONOMOWOC_RECYCLING_CENTER) },
  'area/waukesha-electronic-recycling': { title: "Sustainable Electronic Recycling in Waukesha WI", group: 'Location pages', urls: [WAUKESHA_ELECTRONIC_RECYCLING.url], data: one(WAUKESHA_ELECTRONIC_RECYCLING) },
  'area/battery-recycling-waukesha': { title: "Battery Recycling Waukesha", group: 'Location pages', urls: [BATTERY_RECYCLING_WAUKESHA.url], data: one(BATTERY_RECYCLING_WAUKESHA) },
  'area/tv-recycling-waukesha': { title: "TV Recycling in Waukesha", group: 'Location pages', urls: [TV_RECYCLING_WAUKESHA.url], data: one(TV_RECYCLING_WAUKESHA) },
  'area/appleton-electronic-recycling-center': { title: "Appleton Electronic Recycling", group: 'Location pages', urls: [APPLETON_ELECTRONIC_RECYCLING_CENTER.url], data: one(APPLETON_ELECTRONIC_RECYCLING_CENTER) },
  'area/madison': { title: "Madison Recycling Center", group: 'Location pages', urls: [MADISON.url], data: one(MADISON) },
  'area/battery-recycling-appleton': { title: "Battery Recycling Appleton", group: 'Location pages', urls: [BATTERY_RECYCLING_APPLETON.url], data: one(BATTERY_RECYCLING_APPLETON) },
  'area/battery-recycling-madison': { title: "Battery Recycling Madison", group: 'Location pages', urls: [BATTERY_RECYCLING_MADISON.url], data: one(BATTERY_RECYCLING_MADISON) },
  'area/fluorescent-bulb-recycle-madison': { title: "Bulb Recycling in Madison WI", group: 'Location pages', urls: [FLUORESCENT_BULB_RECYCLE_MADISON.url], data: one(FLUORESCENT_BULB_RECYCLE_MADISON) },
  'area/battery-recycling-in-minneapolis': { title: "Battery Recycling Minneapolis", group: 'Location pages', urls: [BATTERY_RECYCLING_IN_MINNEAPOLIS.url], data: one(BATTERY_RECYCLING_IN_MINNEAPOLIS) },
  'area/maple-grove-recycling-center': { title: "Maple Grove Recycling Center", group: 'Location pages', urls: [MAPLE_GROVE_RECYCLING_CENTER.url], data: one(MAPLE_GROVE_RECYCLING_CENTER) },
  'area/bulb-recycle-minneapolis': { title: "Bulb Recycling In Minneapolis, Minnesota", group: 'Location pages', urls: [BULB_RECYCLE_MINNEAPOLIS.url], data: one(BULB_RECYCLE_MINNEAPOLIS) },
  'area/bloomington-recycling-center': { title: "Bloomington Recycling Center", group: 'Location pages', urls: [BLOOMINGTON_RECYCLING_CENTER.url], data: one(BLOOMINGTON_RECYCLING_CENTER) },
  'area/st-cloud-recycling-center': { title: "St Cloud Recycling Center", group: 'Location pages', urls: [ST_CLOUD_RECYCLING_CENTER.url], data: one(ST_CLOUD_RECYCLING_CENTER) },
  'area/plymouth-recycling-center': { title: "Plymouth Recycling Center", group: 'Location pages', urls: [PLYMOUTH_RECYCLING_CENTER.url], data: one(PLYMOUTH_RECYCLING_CENTER) },
  'area/minnetonka-recycling-center': { title: "Minnetonka Recycling Center", group: 'Location pages', urls: [MINNETONKA_RECYCLING_CENTER.url], data: one(MINNETONKA_RECYCLING_CENTER) },
  'area/coon-rapids': { title: "Coon Rapids Recycling", group: 'Location pages', urls: [COON_RAPIDS.url], data: one(COON_RAPIDS) },
  'area/burnsville-recycling-center': { title: "Burnsville Recycling Center", group: 'Location pages', urls: [BURNSVILLE_RECYCLING_CENTER.url], data: one(BURNSVILLE_RECYCLING_CENTER) },
  'area/electronic-recycling-duluth': { title: "Sustainable Electronic Recycling in Duluth, MN", group: 'Location pages', urls: [ELECTRONIC_RECYCLING_DULUTH.url], data: one(ELECTRONIC_RECYCLING_DULUTH) },
  'area/shredding-minnesota': { title: "Document Shredding Minnesota", group: 'Location pages', urls: [SHREDDING_MINNESOTA.url], data: one(SHREDDING_MINNESOTA) },
  'area/shredding-st-paul': { title: "St. Paul Shredding Service", group: 'Location pages', urls: [SHREDDING_ST_PAUL.url], data: one(SHREDDING_ST_PAUL) },
  'area/shredding-green-bay': { title: "Shredding Services in Green Bay", group: 'Location pages', urls: [SHREDDING_GREEN_BAY.url], data: one(SHREDDING_GREEN_BAY) },
  'area/greenwood-indiana': { title: "Greenwood, Indiana", group: 'Location pages', urls: [GREENWOOD_INDIANA.url], data: one(GREENWOOD_INDIANA) },
  'area/bulb-recycle-milwaukee': { title: "Bulb Recycling In Milwaukee", group: 'Location pages', urls: [BULB_RECYCLE_MILWAUKEE.url], data: one(BULB_RECYCLE_MILWAUKEE) },
  'area/ocala-florida': { title: "Ocala, Florida", group: 'Location pages', urls: [OCALA_FLORIDA.url], data: one(OCALA_FLORIDA) },
  'area/kennesaw-georgia': { title: "Kennesaw, Georgia", group: 'Location pages', urls: [KENNESAW_GEORGIA.url], data: one(KENNESAW_GEORGIA) },
  'area/johnson-city-buffalo-tennessee': { title: "Johnson City (Buffalo), Tennessee", group: 'Location pages', urls: [JOHNSON_CITY_BUFFALO_TENNESSEE.url], data: one(JOHNSON_CITY_BUFFALO_TENNESSEE) },
  'area/franklin-indiana': { title: "Franklin, Indiana", group: 'Location pages', urls: [FRANKLIN_INDIANA.url], data: one(FRANKLIN_INDIANA) },
  'area/tv-recycling-in-wisconsin': { title: "TV Recycling In Wisconsin", group: 'Location pages', urls: [TV_RECYCLING_IN_WISCONSIN.url], data: one(TV_RECYCLING_IN_WISCONSIN) },
  'area/tv-recycling-in-minnesota': { title: "TV Recycling in Minnesota", group: 'Location pages', urls: [TV_RECYCLING_IN_MINNESOTA.url], data: one(TV_RECYCLING_IN_MINNESOTA) },
  'area/tv-recycling-appleton': { title: "TV Recycling in Appleton WI", group: 'Location pages', urls: [TV_RECYCLING_APPLETON.url], data: one(TV_RECYCLING_APPLETON) },
  'area/edina-recycling-services': { title: "Edina Recycling Services", group: 'Location pages', urls: [EDINA_RECYCLING_SERVICES.url], data: one(EDINA_RECYCLING_SERVICES) },
  'area/shredding-duluth': { title: "Duluth Shredding Service", group: 'Location pages', urls: [SHREDDING_DULUTH.url], data: one(SHREDDING_DULUTH) },
  'area/phoenix-arizona': { title: "Phoenix, Arizona", group: 'Location pages', urls: [PHOENIX_ARIZONA.url], data: one(PHOENIX_ARIZONA) },
  'area/lakeville-recycling-center': { title: "Lakeville Recycling Center", group: 'Location pages', urls: [LAKEVILLE_RECYCLING_CENTER.url], data: one(LAKEVILLE_RECYCLING_CENTER) },
  'area/battery-recycling-st-paul': { title: "Battery Recycling St. Paul", group: 'Location pages', urls: [BATTERY_RECYCLING_ST_PAUL.url], data: one(BATTERY_RECYCLING_ST_PAUL) },
  'area/green-bay-recycling': { title: "Green Bay Recycling Center", group: 'Location pages', urls: [GREEN_BAY_RECYCLING.url], data: one(GREEN_BAY_RECYCLING) },
  'area/fort-worth-texas': { title: "Fort Worth, Texas", group: 'Location pages', urls: [FORT_WORTH_TEXAS.url], data: one(FORT_WORTH_TEXAS) },
  'area/east-bethel': { title: "East Bethel Recycling", group: 'Location pages', urls: [EAST_BETHEL.url], data: one(EAST_BETHEL) },
  'area/computer-recycling-madison': { title: "Environmental-Friendly Computer Recycling in Madison Wisconsin", group: 'Location pages', urls: [COMPUTER_RECYCLING_MADISON.url], data: one(COMPUTER_RECYCLING_MADISON) },
  'area/minneapolis': { title: "Recycling Solutions for All! in Minneapolis", group: 'Location pages', urls: [MINNEAPOLIS.url], data: one(MINNEAPOLIS) },
  'area/battery-recycling-green-bay': { title: "Battery Recycling Green Bay", group: 'Location pages', urls: [BATTERY_RECYCLING_GREEN_BAY.url], data: one(BATTERY_RECYCLING_GREEN_BAY) },
  'area/shredding-waukesha': { title: "Waukesha Shredding Service", group: 'Location pages', urls: [SHREDDING_WAUKESHA.url], data: one(SHREDDING_WAUKESHA) },

  /* ----------------------------------------------- legal and other pages -- */
  /* The MDX pages (27 Sep 2026): one box per paragraph, heading or list, in
     Markdown. See src/content/mdx-docs.ts. */
  'legal/privacy-policy': { title: 'Privacy Policy', group: 'Legal and other pages', urls: ['/privacy-policy/'], data: mdxDoc('pages/privacy-policy.mdx'), note: MD_NOTE },
  'legal/terms-of-services': { title: 'Terms of Services', group: 'Legal and other pages', urls: ['/terms-of-services/'], data: mdxDoc('pages/terms-of-services.mdx'), note: MD_NOTE },
  'legal/cookies-and-personal-information': { title: 'Cookies and Personal Information', group: 'Legal and other pages', urls: ['/cookies-and-personal-information/'], data: mdxDoc('pages/cookies-and-personal-information.mdx'), note: MD_NOTE },
  'page/thank-you': { title: 'Thank You page', group: 'Legal and other pages', urls: ['/thank-you/'], data: mdxDoc('pages/thank-you.mdx'), note: `Where a form lands after it is sent. ${MD_NOTE}` },
  'not-found': { title: 'Page not found (404)', group: 'Legal and other pages', urls: ['/this-page-does-not-exist/'], data: mod(notFound),
    note: 'What anyone sees at an address that does not exist.' },

  /* ------------------------------------------------------- shared blocks -- */
  facilities: { title: 'Facilities (Minnesota and Wisconsin)', group: 'Shared blocks', urls: ['/minnesota-recycling/', '/wisconsin-recycling/', '/all-locations/', '/contact-us/'], data: mod(facilities, ['FACILITIES']),
    note: 'The two facility pages, plus facility details wherever else they show.' },
  certifications: { title: 'Certifications (shared)', group: 'Shared blocks', urls: ['/', '/light-bulbs/', '/services/', '/industries/'], data: mod(certifications, ['R2_DIRECTORY']),
    note: 'Certification logos and copy used on the homepage, the services and industries pages, every service, industry and state page, and the footer.' },
  'site-header': { title: 'Navbar and header (every page)', group: 'Shared blocks', urls: ['/'], data: mod(nav, ['MAIL_IN']),
    note: 'The navbar: menu labels and links, the top bar, the buttons, and the About, Industries and Blogs menu text. The Services menu items come from "Services page".' },
  'site-footer': { title: 'Footer (every page)', group: 'Shared blocks', urls: ['/'], data: mod(siteFooter) },
  emails: { title: 'Residential auto-reply email', group: 'Shared blocks', urls: [], data: mod(emails),
    note: 'Sent to residential enquiries. No page preview: send a test enquiry after publishing.' },
} satisfies Record<string, Doc>

/** The MDX pages that have a document, by URL (the catch-all route reads it). */
export const MDX_DOC_BY_URL: Record<string, DocKey> = {
  '/privacy-policy/': 'legal/privacy-policy',
  '/terms-of-services/': 'legal/terms-of-services',
  '/cookies-and-personal-information/': 'legal/cookies-and-personal-information',
  '/thank-you/': 'page/thank-you',
}

export type DocKey = keyof typeof DOCS
export type DocData<K extends DocKey> = ReturnType<(typeof DOCS)[K]['data']>

export const DOC_KEYS = Object.keys(DOCS) as DocKey[]
export const isDocKey = (k: unknown): k is DocKey => typeof k === 'string' && Object.hasOwn(DOCS, k)

/** Plain JSON copy of a document's defaults (what the editor starts from). */
export function defaultsOf(key: DocKey): unknown {
  return JSON.parse(JSON.stringify(DOCS[key].data()))
}
