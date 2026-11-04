import { href, PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { Facility, StateHub, StatePageLike } from '@/data/facilities'

/**
 * THE SEVEN STATE HUBS — 14 Oct 2026, the SEO team's brief to Anees ("create
 * 7 new state hub pages using the same template as /minnesota-recycling/ and
 * /wisconsin-recycling/") and their seven content docs, word for word:
 *
 *   /arizona/ (was /arizona-recycling/)  Phoenix   /indiana/ (was /indiana-recycling/)  Greenwood
 *   /california/ (was /california-recycling/)  Ontario    /tennessee/ (was /tennessee-recycling/)  Johnson City, Lewisburg
 *   /florida/ (was /florida-recycling/)  Ocala     /texas/ (was /texas-recycling/)  Fort Worth
 *   /georgia/ (was /georgia-recycling/)  Kennesaw
 *
 * Linked like Minnesota and Wisconsin (Aaqib, 14 Oct 2026): a center card
 * after the hero per facility, "View Center" to its page (Tennessee has two,
 * Lewisburg then Johnson City); the city chip under Counties We Serve to the
 * same page; the facility page's breadcrumb Home / Locations / <state> /
 * <city>, the state linking back here. No facility URL changes.
 *
 * Drawn by StateHubPage with the Minnesota and Wisconsin bands (StateSections):
 * hero, "Our <state> Recycling Center" bar and quick-info bar per facility,
 * the service tiles, Counties We Serve, the pickup CTA, the mail-in band and
 * the FAQ (with FAQPage JSON-LD).
 *
 * The facility pages keep their URLs (/phoenix-arizona/ and so on; nothing is
 * nested under a hub). Each hub links its facility page (the center bar and
 * the county card), /mail-in-recycling/ (mail-in band) and
 * /request-a-pickup/ (the CTA). The service tiles link the national service
 * pages, as no state has service pages of its own.
 *
 * Not taken from the docs, on purpose:
 *   - Indiana's "Franklin" chip: /franklin-indiana/ 301s to /indiana/greenwood/
 *     (the same brief: there is no Franklin branch).
 *   - Hours: the docs give none. Ontario's are its page's; the others say
 *     "Call for hours", as Lewisburg's page does.
 * Phone numbers are the docs'. They differ from the numbers on the facility
 * pages (flagged to Aaqib, 14 Oct 2026).
 *
 * Copy is edited in Admin -> Pages ("<State> (state page)").
 */

export type HubSite = {
  /** "Our Arizona Recycling Center" */
  eyebrow: string
  /** "Phoenix Recycling Center", as Minnesota's "Blaine Recycling Center" */
  name: string
  /** The facility page. */
  href: string
  /** "View Center", as on Minnesota and Wisconsin */
  view: string
  address: string
  phone: string
  hours: string
  /** Google Maps directions. External, so CLAUDE.md rule 3 does not apply. */
  mapsHref: string
}

export type StateHubPage = StatePageLike & {
  url: string
  seo: { title: string; description: string }
  sites: HubSite[]
  photo: { src: string; flip: boolean }
}

const maps = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

const site = (state: string, city: string, url: string, address: string, phone: string, hours = 'Call for hours'): HubSite => ({
  eyebrow: `Our ${state} Recycling Center`,
  name: `${city} Recycling Center`,
  href: href(url),
  view: 'View Center',
  address, phone, hours,
  mapsHref: maps(address),
})

const I = '/images/locations'
/** Nine tiles: the Minnesota and Wisconsin eight plus Television recycling, each to the national service page. */
const TILES: StateHub['materials']['tiles'] = [
  { label: 'Electronics',          icon: `${I}/state-electronics.svg`, service: 'electronic-recycling', href: href('/electronic-recycle/') },
  { label: 'Batteries',            icon: `${I}/state-batteries.svg`,   service: 'battery-recycling',    href: href('/battery-recycling/') },
  { label: 'Light bulbs',          icon: `${I}/state-bulbs.svg`,       service: 'light-bulb-recycling', href: href('/light-bulbs/') },
  { label: 'Ballasts',             icon: `${I}/state-ballasts.svg`,    service: 'ballast-recycling',    href: href('/ballasts/') },
  { label: 'Airbags',              icon: `${I}/state-ballasts.svg`,    service: 'airbag-recycling',     href: href('/airbag-recycling/') },
  { label: 'Television recycling', icon: `${I}/mat-tv.svg`,            service: 'tv-recycling',         href: href('/tv-recycling/') },
  { label: 'Paper shredding',      icon: `${I}/state-paper.svg`,       service: 'paper-shredding',      href: href('/paper-shredding-services/') },
  { label: 'Phone shredding',      icon: `${I}/state-lock.svg`,        service: 'phone-shredding',      href: href('/phone-shredding-service/') },
  { label: 'Off-site shredding',   icon: `${I}/state-lock.svg`,        service: 'off-site-shredding',   href: href('/off-site-shredding/') },
]

/**
 * The four services the Phoenix and Lewisburg facilities offer, each tile to
 * that facility's own page (3 Nov 2026, management sheet "all plan rti 1":
 * "update the page as we are giving services, not show all").
 */
const fourTiles = (base: string, ballasts = `${base}ballast-recycling/`): StateHub['materials']['tiles'] => [
  { label: 'Electronics', icon: `${I}/state-electronics.svg`, service: 'electronic-recycling', href: href(`${base}electronic-recycling/`) },
  { label: 'Batteries',   icon: `${I}/state-batteries.svg`,   service: 'battery-recycling',    href: href(`${base}battery-recycling/`) },
  { label: 'Light bulbs', icon: `${I}/state-bulbs.svg`,       service: 'light-bulb-recycling', href: href(`${base}light-bulb-recycling/`) },
  { label: 'Ballasts',    icon: `${I}/state-ballasts.svg`,    service: 'ballast-recycling',    href: href(ballasts) },
]

const BUTTONS = {
  primary:   { label: 'Schedule a Pickup', href: PICKUP_HREF },
  secondary: { label: 'Get a Quote',       href: QUOTE_HREF },
}
const COUNTIES_LEAD = 'Explore the county and city pages below to find the locations and recycling services relevant to your home or business. Contact us to confirm pickup availability for your address.'
const CTA_BODY = 'Clear out retired electronics, batteries, lamps, and confidential documents from your home or business with a scheduled collection. Tell us what needs recycling, where it is located, and the approximate quantity to receive a quote and confirm the next steps.'
const MAIL_IN = {
  heading: 'Need Recycling Outside Your Local Area?',
  body: 'Use a prepaid mail-in kit to send eligible materials to Recycle Technologies without arranging an on-site collection. Choose the appropriate kit and check its accepted materials before shipping.',
  button: { label: 'View Mail-In Kits', href: href('/mail-in-recycling/') },
}
const cta = (state: string) => ({
  heading: `Schedule Your ${state} Recycling Pickup`,
  body: CTA_BODY,
  primary:   { label: 'Schedule a Business Pickup', href: PICKUP_HREF },
  secondary: { label: 'Request a Quote',            href: QUOTE_HREF },
})
const chip = (label: string, url: string) => ({ label, href: href(url) })
const PHOTO_A = { src: '/images/pages/hero-minnesota-v3.jpg', flip: false }
const PHOTO_B = { src: '/images/pages/hero-wisconsin-v3.jpg', flip: true }

/** The parts every hub builds the same way from its doc. */
function hub(o: {
  slug: string; state: string; title: string; description: string; h1: string; lead: string
  sites: HubSite[]; servicesLead: string; counties: StateHub['counties']['groups']
  faqs: Facility['faqs']; photo: { src: string; flip: boolean }
  /** Only the services this state's facility offers (3 Nov 2026); all nine when absent. */
  tiles?: StateHub['materials']['tiles']
}): StateHubPage {
  return {
    slug: o.slug,
    url: `/${o.slug}/`,
    state: o.state,
    seo: { title: o.title, description: o.description },
    hero: { h1: o.h1, lead: o.lead, leadShort: o.lead, buttons: BUTTONS },
    sites: o.sites,
    hub: {
      materials: { heading: `Recycling and Shredding Services in ${o.state}`, lead: o.servicesLead, tiles: o.tiles ?? TILES },
      counties: { lead: COUNTIES_LEAD, groups: o.counties },
      cta: cta(o.state),
      mailIn: MAIL_IN,
      faqHeading: 'Frequently Asked Questions',
    },
    faqs: o.faqs,
    photo: o.photo,
  }
}

const LEAD_HOME = (state: string) => `One provider for what leaves your building or your home, from old lamps to retired hard drives. Recycle Technologies offers the full range of recycling and secure destruction services for ${state} businesses and residents.`

// 3 Nov 2026 (management sheet): moved from /arizona-recycling/ to /arizona/
// (the old URL is deleted, no redirect); the tiles show the four Phoenix services.
export const ARIZONA_HUB = hub({
  slug: 'arizona', state: 'Arizona',
  tiles: fourTiles('/arizona/phoenix/'),
  title: 'Arizona E-Waste Recycling & Shredding | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across Arizona. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronics Recycling and Shredding in Arizona',
  lead: 'Full-service electronics recycling, data destruction, and shredding for Arizona businesses and residents, supported by our Phoenix facility.',
  // Phone and hours: the Phoenix content docs (Aaqib, 3 Nov 2026: "use the information in the Google Docs").
  sites: [site('Arizona', 'Phoenix', '/phoenix-arizona/', '1545 East Victory Street, Phoenix, AZ 85040', '(602) 276-1858', 'Mon to Fri, 7:30 AM to 2:00 PM')],
  servicesLead: LEAD_HOME('Arizona'),
  counties: [{ heading: 'Maricopa County', chips: [chip('Phoenix', '/phoenix-arizona/')] }],
  faqs: [
    { q: 'What types of electronic equipment can I recycle in Arizona?', a: 'Accepted materials depend on the item and recycling requirements. Contact Recycle Technologies with a list of your equipment to confirm whether it can be accepted for recycling or secure destruction.' },
    { q: 'How should businesses handle batteries and light bulbs before recycling?', a: 'Keep batteries and light bulbs separate from general waste and follow the handling instructions for each material. Some batteries, particularly lithium-ion batteries, can pose fire risks if damaged or handled improperly. Contact Recycle Technologies for guidance on preparing eligible materials for collection.' },
    { q: 'How is sensitive business data protected during electronics recycling?', a: 'Hard drives and other data-bearing devices may contain confidential business or personal information. Ask about available data destruction services and documentation before sending equipment for processing. Recycle Technologies offers secure destruction services for eligible materials.' },
    { q: 'Can Recycle Technologies handle electronics from an office move or facility cleanout?', a: 'Businesses preparing for an office relocation, equipment upgrade, or facility cleanout can request a quote for their retired electronics and other eligible materials. Provide an inventory, approximate quantities, and pickup address so the team can assess the collection requirements.' },
    { q: 'Why should businesses keep recycling and destruction records?', a: 'Recycling and destruction records help businesses document how retired equipment and confidential materials were handled. Recycle Technologies issues Certificates of Recycling or Destruction after processing is complete, helping businesses maintain disposal records.' },
  ],
  photo: PHOTO_A,
})

// 4 Nov 2026 (management sheet, California tab): moved from
// /california-recycling/ to /california/ (the old URL is deleted, no
// redirect); the tiles show the four Ontario services; Ontario itself moved
// to /california/ontario/ (the old URL 301s).
export const CALIFORNIA_HUB = hub({
  slug: 'california', state: 'California',
  tiles: fourTiles('/california/ontario/'),
  title: 'California E-Waste Recycling | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across California. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronics Recycling and Shredding in California',
  lead: 'Full-service electronics recycling, data destruction, and shredding for California businesses and residents, supported by our Ontario facility.',
  // Phone and hours: the Ontario content docs (4 Nov 2026; until then (888) 923-7252, Mon–Thu 8:30–2:30, Fri 8:30–1:30).
  sites: [site('California', 'Ontario', '/california/ontario/', '805 East Francis Street, Ontario, CA 91761', '(909) 923-7252', 'Mon to Fri, 6:00 AM to 2:30 PM')],
  servicesLead: LEAD_HOME('California'),
  counties: [{ heading: 'San Bernardino County', chips: [chip('Ontario', '/california/ontario/')] }],
  faqs: [
    { q: 'Can electronics be thrown in the trash in California?', a: 'No. California prohibits disposing of covered electronic devices, such as TVs, monitors, and computers, in regular household trash.' },
    { q: 'How should I dispose of old batteries and fluorescent bulbs?', a: 'California prohibits placing batteries and fluorescent lamps in regular trash; use an appropriate recycling or hazardous-waste collection program.' },
    { q: 'How can businesses protect sensitive data on retired devices?', a: 'Ask about secure hard drive destruction and available documentation before recycling computers, servers, or other data-bearing equipment.' },
    { q: 'Can businesses recycle equipment during an office move or technology upgrade?', a: 'Yes. Request a quote with your equipment inventory, estimated quantities, and pickup address to assess collection requirements.' },
    { q: 'Does California have special rules for electronics with built-in batteries?', a: "Yes. Since January 1, 2026, California's e-waste program includes qualifying products with non-removable batteries; acceptance depends on the specific item." },
  ],
  photo: PHOTO_B,
})

// 4 Nov 2026 (management sheet, Florida tab): moved from /florida-recycling/
// to /florida/ (the old URL is deleted, no redirect); the tiles show the four
// Ocala services; Ocala itself moved to /florida/ocala/ (the old URL 301s).
export const FLORIDA_HUB = hub({
  slug: 'florida', state: 'Florida',
  tiles: fourTiles('/florida/ocala/'),
  title: 'Florida E-Waste Recycling & Shredding | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across Florida. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronics Recycling and Shredding in Florida',
  lead: 'Full-service electronics recycling, data destruction, and shredding for Florida businesses and residents, supported by our Ocala facility.',
  // Hours: the Ocala content docs (4 Nov 2026), drop-off by appointment.
  sites: [site('Florida', 'Ocala', '/florida/ocala/', '1007 SW 16th Lane, Ocala, FL 34471', '(813) 534-5735', 'Mon to Fri, 6:00 AM to 2:30 PM')],
  servicesLead: LEAD_HOME('Florida'),
  counties: [
    { heading: 'Marion County', chips: [chip('Ocala', '/florida/ocala/')] },
    // "Florida Recycling Resources" (kits and bulb regulations chips) taken
    // out 4 Nov 2026 (Aaqib): they are not counties.
  ],
  faqs: [
    { q: 'Why should I recycle old electronics instead of throwing them away?', a: 'Electronics can contain recoverable materials such as copper, steel, and glass, as well as substances that require careful handling. Recycling helps recover materials and reduce environmental risks.' },
    { q: 'How should I prepare electronics before recycling?', a: 'Keep equipment intact and confirm handling requirements before drop-off or collection. For devices containing sensitive data, ask about secure destruction options.' },
    { q: 'Are rechargeable batteries accepted for regular trash disposal in Florida?', a: 'No. Florida law prohibits disposing of nickel-cadmium and small sealed lead-acid rechargeable batteries in regular trash; these must be recycled or sent to an appropriately permitted facility.' },
    { q: 'Can businesses recycle equipment during an office cleanout?', a: 'Yes. Businesses can request a quote for eligible electronics and other materials by providing an equipment inventory, estimated quantities, and collection address.' },
    { q: 'How can businesses verify that an electronics recycler handles equipment responsibly?', a: 'Ask about third-party certification, facility identification, insurance, downstream processing, and data destruction procedures before choosing a recycling provider.' },
  ],
  photo: PHOTO_A,
})

// 5 Nov 2026 (management sheet "RTI ALL PLAN", Georgia tab): moved from
// /georgia-recycling/ to /georgia/ (the old URL is deleted, no redirect);
// "update the content with the services we are providing": the tiles show
// the four Kennesaw services (/georgia/kennesaw/<service>/) and the FAQs name
// them. Kennesaw's own page stays at /kennesaw-georgia/ (no new URL in the
// sheet). Phone and hours: the Kennesaw content docs.
export const GEORGIA_HUB = hub({
  slug: 'georgia', state: 'Georgia',
  tiles: fourTiles('/georgia/kennesaw/'),
  title: 'Georgia E-Waste Recycling & Shredding | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across Georgia. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronic Waste Recycling and Shredding in Georgia',
  lead: 'Full-service electronics recycling, data destruction, and shredding for Georgia businesses and residents, supported by our Kennesaw facility in the Atlanta area.',
  sites: [site('Georgia', 'Kennesaw', '/kennesaw-georgia/', '3400 Town Point Dr. NW, Suite 130, Kennesaw, GA 30144', '(770) 426-5000', 'Mon to Fri, 9:00 AM to 4:00 PM')],
  servicesLead: LEAD_HOME('Georgia'),
  counties: [{ heading: 'Cobb County', chips: [chip('Kennesaw', '/kennesaw-georgia/')] }],
  faqs: [
    { q: 'What services does Recycle Technologies offer in Georgia?', a: 'Electronics recycling, battery recycling, light bulb recycling, and ballast recycling at our Kennesaw facility, with drop-off, business pickup, and mail-in options. Contact the team to confirm availability for your specific materials.' },
    { q: 'Where is Recycle Technologies located in Georgia?', a: 'Our Georgia facility is in Kennesaw, in the Atlanta area: 3400 Town Point Dr. NW, Suite 130, Kennesaw, GA 30144. It is open Monday to Friday, 9:00 AM to 4:00 PM. Call (770) 426-5000 for accepted materials.' },
    { q: 'Does Recycle Technologies offer business pickup in Georgia?', a: 'Scheduled business pickup is available subject to location and collection requirements. Request a quote, and the team will confirm what is possible for your address.' },
    { q: 'Can I receive a certificate after electronics recycling or shredding?', a: 'Yes. Recycle Technologies issues Certificates of Recycling or Destruction after processing is complete, which helps your business document proper disposal.' },
    { q: 'What if my business is nowhere near Kennesaw?', a: 'A prepaid mail-in kit is the simplest option for eligible materials anywhere in Georgia. Pick the right kit, check its accepted materials, and ship it back with the prepaid label.' },
  ],
  photo: PHOTO_B,
})

// 4 Nov 2026 (management sheet, Indiana tab): moved from /indiana-recycling/
// to /indiana/ (the old URL is deleted, no redirect); the tiles show the
// Greenwood services; Greenwood itself moved to /indiana/greenwood/ (the old
// URL 301s). The Ballasts tile opens /ballasts/ until the Greenwood ballast
// page is built (its doc in the sheet could not be opened, 4 Nov 2026).
export const INDIANA_HUB = hub({
  slug: 'indiana', state: 'Indiana',
  tiles: fourTiles('/indiana/greenwood/', '/ballasts/'),
  title: 'Indiana E-Waste Recycling & Shredding | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across Indiana. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronics Recycling and Shredding in Indiana',
  lead: 'Full-service electronics recycling, data destruction, and shredding for Indiana businesses and residents, supported by our Greenwood facility.',
  // Phone and hours: the Greenwood content docs (4 Nov 2026; toll-free (866) 375-7340 until then).
  sites: [site('Indiana', 'Greenwood', '/indiana/greenwood/', '498 Park 800 Drive, Greenwood, IN 46143', '(317) 888-3889', 'Mon to Fri, 7:00 AM to 2:00 PM')],
  servicesLead: LEAD_HOME('Indiana'),
  // The doc lists "Greenwood · Franklin"; /franklin-indiana/ 301s to Greenwood (no Franklin branch).
  counties: [{ heading: 'Johnson County', chips: [chip('Greenwood', '/indiana/greenwood/')] }],
  faqs: [
    { q: 'Which electronics cannot be thrown away with regular trash in Indiana?', a: 'Indiana prohibits households, small businesses, and schools from discarding items such as computers, monitors, TVs, tablets, and printers in regular trash.' },
    { q: 'Can I recycle broken or nonworking electronics?', a: 'Contact Recycle Technologies with your equipment list to confirm acceptance and any handling requirements for damaged or nonworking devices.' },
    { q: 'How should I protect personal data before recycling electronics?', a: 'Back up important files and arrange secure data destruction for devices containing confidential information; deleting files alone may not fully erase data.' },
    { q: 'Can businesses recycle electronics during an office relocation or upgrade?', a: 'Yes. Request a quote with your equipment inventory, estimated quantities, and pickup address so the team can assess your collection requirements.' },
    { q: 'Why is responsible electronics recycling important in Indiana?', a: 'Electronics can contain hazardous substances and recoverable materials; responsible recycling helps prevent pollution and recover resources for reuse.' },
  ],
  photo: PHOTO_A,
})

// 3 Nov 2026 (management sheet): moved from /tennessee-recycling/ to
// /tennessee/ (the old URL is deleted, no redirect); the tiles show the four
// Lewisburg services; Lewisburg itself moved to /tennessee/lewisburg/.
export const TENNESSEE_HUB = hub({
  slug: 'tennessee', state: 'Tennessee',
  tiles: fourTiles('/tennessee/lewisburg/'),
  title: 'Tennessee E-Waste Recycling | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across Tennessee. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronics Recycling and Shredding in Tennessee',
  lead: 'Full-service electronics recycling, data destruction, and shredding for Tennessee businesses and residents, supported by our Johnson City and Lewisburg facilities.',
  // 3 Nov 2026 (Aaqib): addresses, phones and hours from the Tennessee content
  // docs (Lewisburg 615-214-4768; Johnson City 2212 Buffalo Road #210,
  // 423-328-7012). Until then: the hub doc's (300 Boggs Lane). Its page is
  // /johnson-city-buffalo-tennessee/, the only Johnson City page on the site
  // (/johnson-city-boggs-tennessee/ 301s to /mail-in-recycling/, flagged).
  sites: [
    site('Tennessee', 'Lewisburg', '/tennessee/lewisburg/', '1580 Old Columbia Road, Lewisburg, TN 37091', '615-214-4768', 'Mon to Fri, 8:00 AM to 4:00 PM'),
    site('Tennessee', 'Johnson City', '/johnson-city-buffalo-tennessee/', '2212 Buffalo Road #210, Johnson City, TN 37604', '423-328-7012', 'Mon to Fri, 7:30 AM to 3:00 PM'),
  ],
  servicesLead: LEAD_HOME('Tennessee'),
  counties: [
    { heading: 'Marshall County', chips: [chip('Lewisburg', '/tennessee/lewisburg/')] },
    { heading: 'Washington County', chips: [chip('Johnson City', '/johnson-city-buffalo-tennessee/')] },
  ],
  faqs: [
    { q: 'What types of electronic equipment can I recycle in Tennessee?', a: 'Accepted materials depend on the equipment and the recycling requirements. Contact Recycle Technologies with a list of your items to confirm whether they can be accepted for recycling or secure destruction.' },
    { q: 'How should I prepare batteries and light bulbs for recycling?', a: 'Keep batteries and light bulbs separate from general waste and follow the handling instructions for each material. Damaged lithium-ion batteries can present fire risks, so avoid placing them in ordinary recycling containers. Contact Recycle Technologies for guidance on handling and preparing eligible materials.' },
    { q: 'How can businesses protect confidential information on retired computers and hard drives?', a: 'Computers, servers, and storage devices may contain sensitive business, customer, or employee information. Arrange appropriate data destruction before processing and ask about the available destruction methods and documentation. Recycle Technologies offers secure destruction services for eligible materials.' },
    { q: 'Can Recycle Technologies collect large quantities of electronics from businesses?', a: 'Businesses retiring equipment during office moves, technology upgrades, or facility cleanouts can request a quote for their eligible materials. Provide an equipment inventory, estimated quantities, and collection address so the team can assess your requirements and confirm pickup availability.' },
    { q: 'What happens to electronics after they are collected for recycling?', a: 'Electronics may contain reusable components and materials that can be recovered, while some components require specialized handling. Appropriate processing helps divert recoverable materials from disposal. Contact Recycle Technologies to learn how your specific equipment will be handled and what documentation is available after processing.' },
  ],
  photo: PHOTO_B,
})

// 5 Nov 2026 (management sheet "RTI ALL PLAN", Texas tab): moved from
// /texas-recycling/ to /texas/ (the old URL is deleted, no redirect); the
// tiles show the four Fort Worth services (/texas/fort-worth/<service>/) and
// the FAQs name them. Fort Worth's own page stays at /fort-worth-texas/ (no
// new URL in the sheet). Phone and hours: the Fort Worth content docs.
export const TEXAS_HUB = hub({
  slug: 'texas', state: 'Texas',
  tiles: fourTiles('/texas/fort-worth/'),
  title: 'Texas E-Waste Recycling & Shredding | Recycle Technologies',
  description: 'Certified electronics recycling, data destruction, and shredding across Texas. Business pickup, county coverage, and mail-in kits. Get a quote.',
  h1: 'Electronics Recycling and Shredding in Texas',
  lead: 'Full-service electronics recycling, data destruction, and shredding for Texas businesses and residents, supported by our Fort Worth facility in the Dallas-Fort Worth metroplex.',
  sites: [site('Texas', 'Fort Worth', '/fort-worth-texas/', '101 East Bowie Street, Fort Worth, TX 76110', '817-921-1440', 'Mon to Fri, 8:00 AM to 3:30 PM')],
  servicesLead: LEAD_HOME('Texas'),
  counties: [{ heading: 'Tarrant County', chips: [chip('Fort Worth', '/fort-worth-texas/')] }],
  faqs: [
    { q: 'What services does Recycle Technologies offer in Texas?', a: 'Electronics recycling, battery recycling, light bulb recycling, and ballast recycling through our Fort Worth location, with drop-off, business pickup, and mail-in options. Contact us to confirm availability for your materials.' },
    { q: 'Where is Recycle Technologies located in Texas?', a: 'Our Texas location is at 101 East Bowie Street, Fort Worth, TX 76110, serving the Dallas-Fort Worth metroplex. It is open Monday to Friday, 8:00 AM to 3:30 PM. Call 817-921-1440 for details.' },
    { q: 'Does Recycle Technologies offer business pickup in Texas?', a: 'Scheduled business pickup is available subject to location and collection requirements. Request a quote to confirm availability for your address.' },
    { q: 'Can I get a certificate after recycling or shredding?', a: 'Yes. Certificates of Recycling or Destruction are issued after processing is complete.' },
    { q: 'What if my business is far from Fort Worth?', a: 'Use a prepaid mail-in kit for eligible materials anywhere in Texas. Pick the right kit and ship it back with the prepaid label.' },
  ],
  photo: PHOTO_A,
})

/** In menu order. The Minnesota and Wisconsin hubs are the facility pages (src/data/facilities.ts). */
export const STATE_HUBS: StateHubPage[] = [ARIZONA_HUB, CALIFORNIA_HUB, FLORIDA_HUB, GEORGIA_HUB, INDIANA_HUB, TENNESSEE_HUB, TEXAS_HUB]

/** All nine state hubs, for /all-locations/ and the sitemaps. */
export const ALL_STATE_HUBS: { state: string; url: string }[] = [
  { state: 'Minnesota', url: '/minnesota-recycling/' },
  { state: 'Wisconsin', url: '/wisconsin-recycling/' },
  ...STATE_HUBS.map((h) => ({ state: h.state, url: h.url })),
].sort((a, b) => a.state.localeCompare(b.state))
