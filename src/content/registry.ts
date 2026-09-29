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
import { STATE_PAGES } from '@/data/state-pages'
import * as chicago from '@/data/chicago'
import { CHICAGO_BATTERY } from '@/data/city-pages/chicago-battery'
import { CHICAGO_LIGHT_BULB } from '@/data/city-pages/chicago-light-bulb'
import { BLAINE_BATTERY } from '@/data/city-pages/blaine-battery'
import { BLAINE_LIGHT_BULB } from '@/data/city-pages/blaine-light-bulb'
import { BLAINE_ELECTRONICS } from '@/data/city-pages/blaine-electronics'
import { NEW_BERLIN_BATTERY } from '@/data/city-pages/new-berlin-battery'
import { NEW_BERLIN_LIGHT_BULB } from '@/data/city-pages/new-berlin-light-bulb'
import { NEW_BERLIN_ELECTRONICS } from '@/data/city-pages/new-berlin-electronics'
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
  'off-site-shredding': { title: 'Off-Site Shredding', group: 'Service pages', urls: ['/off-site-shredding/'], data: mod(offSiteShredding) },
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
  'state/light-bulbs/Minnesota': { title: 'Light Bulbs, Minnesota', group: 'State landing pages', urls: ['/light-bulbs/Minnesota/'], data: one(STATE_PAGES['light-bulbs'].Minnesota.content), note: 'Google Ads landing page (noindex).' },
  'state/light-bulbs/Wisconsin': { title: 'Light Bulbs, Wisconsin', group: 'State landing pages', urls: ['/light-bulbs/Wisconsin/'], data: one(STATE_PAGES['light-bulbs'].Wisconsin.content), note: 'Google Ads landing page (noindex).' },
  'state/electronic-recycle/Minnesota': { title: 'Electronics, Minnesota', group: 'State landing pages', urls: ['/electronic-recycle/Minnesota/'], data: one(STATE_PAGES['electronic-recycle'].Minnesota.content), note: 'Google Ads landing page (noindex).' },
  'state/electronic-recycle/Wisconsin': { title: 'Electronics, Wisconsin', group: 'State landing pages', urls: ['/electronic-recycle/Wisconsin/'], data: one(STATE_PAGES['electronic-recycle'].Wisconsin.content), note: 'Google Ads landing page (noindex).' },
  'state/battery-recycling/Minnesota': { title: 'Batteries, Minnesota', group: 'State landing pages', urls: ['/battery-recycling/Minnesota/'], data: one(STATE_PAGES['battery-recycling'].Minnesota.content), note: 'Google Ads landing page (noindex).' },
  'state/battery-recycling/Wisconsin': { title: 'Batteries, Wisconsin', group: 'State landing pages', urls: ['/battery-recycling/Wisconsin/'], data: one(STATE_PAGES['battery-recycling'].Wisconsin.content), note: 'Google Ads landing page (noindex).' },

  /* ------------------------------------------------------ location pages -- */
  /* Chicago, Blaine and New Berlin: reached by URL and from ads, not from
     the menus. ("City pages" until 27 Sep 2026.) */
  chicago: { title: 'Electronics Recycling in Chicago', group: 'Location pages', urls: ['/electronic-recycling-chicago/'], data: mod(chicago) },
  'city/chicago-battery': { title: 'Battery Recycling in Chicago', group: 'Location pages', urls: [CHICAGO_BATTERY.url], data: one(CHICAGO_BATTERY) },
  'city/chicago-light-bulb': { title: 'Light Bulb Recycling in Chicago', group: 'Location pages', urls: [CHICAGO_LIGHT_BULB.url], data: one(CHICAGO_LIGHT_BULB) },
  'city/blaine-battery': { title: 'Battery Recycling in Blaine', group: 'Location pages', urls: [BLAINE_BATTERY.url], data: one(BLAINE_BATTERY) },
  'city/blaine-light-bulb': { title: 'Light Bulb Recycling in Blaine', group: 'Location pages', urls: [BLAINE_LIGHT_BULB.url], data: one(BLAINE_LIGHT_BULB) },
  'city/blaine-electronics': { title: 'Electronic Recycling in Blaine', group: 'Location pages', urls: [BLAINE_ELECTRONICS.url], data: one(BLAINE_ELECTRONICS) },
  'city/new-berlin-battery': { title: 'Battery Recycling in New Berlin', group: 'Location pages', urls: [NEW_BERLIN_BATTERY.url], data: one(NEW_BERLIN_BATTERY) },
  'city/new-berlin-light-bulb': { title: 'Light Bulb Recycling in New Berlin', group: 'Location pages', urls: [NEW_BERLIN_LIGHT_BULB.url], data: one(NEW_BERLIN_LIGHT_BULB) },
  'city/new-berlin-electronics': { title: 'Electronic Recycling in New Berlin', group: 'Location pages', urls: [NEW_BERLIN_ELECTRONICS.url], data: one(NEW_BERLIN_ELECTRONICS) },
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
