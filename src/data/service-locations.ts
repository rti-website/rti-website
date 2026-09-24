import { MINNESOTA, WISCONSIN } from '@/data/facilities'

/**
 * Location based service pages — the SEO manager's brief, 24 Sep 2026
 * ("Location-Based Service Pages"): three services across ten sites, to catch
 * searches like "battery recycling in Phoenix, AZ".
 *
 * WHERE THE CONTENT LIVES. In the database (db/008), edited in Admin ->
 * Locations; Asim chose that over code. THIS FILE IS ONLY THE STARTING
 * POINT: the ten sites as the homepage lists them, and a starter for each
 * service that the admin copies into a page the first time it is opened.
 * It is also what a build with no database falls back to, so the site still
 * builds on a fresh clone (every page then counts as a draft).
 *
 * NOTHING HERE IS PUBLISHED. Every page starts as a draft and goes live one
 * at a time, when the admin's readiness checklist is met (Asim: "build
 * hidden, publish per page"). The brief is blunt about why: pages that only
 * swap the city name are doorway pages, and a page must not claim a service,
 * pickup or a certification a site does not have. So the starters below are
 * deliberately general, and the checklist refuses to publish a page whose
 * intro is still the starter text, whose local rules are not verified by a
 * named person, or whose site address and hours are not confirmed.
 *
 * URLs (Asim, 24 Sep 2026):
 *   partner sites   /locations/<site>/ and /locations/<site>/<service>/
 *   Minnesota       /minnesota-recycling/<service>/  (the existing page is the hub)
 *   Wisconsin       /wisconsin-recycling/<service>/
 * Minnesota is 1525 99th Ln NE only; the brief's second address (Davenport
 * St) is not an RTI site (Asim, 24 Sep 2026).
 */

export const SERVICE_SLUGS = ['light-bulb-recycling', 'electronic-recycling', 'battery-recycling'] as const
export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceInfo = {
  slug: ServiceSlug
  /** "Battery Recycling" — the title and H1 pattern. */
  name: string
  /** "batteries" — used in running text ("recycle batteries in …"). */
  noun: string
  /** The service's main page, which links out to every published location. */
  hub: string
  /** How the contact form names it (SERVICE_INTEREST), for the prefilled quote. */
  quoteService: string
}

export const SERVICES: Record<ServiceSlug, ServiceInfo> = {
  'light-bulb-recycling': {
    slug: 'light-bulb-recycling', name: 'Light Bulb Recycling', noun: 'light bulbs and lamps',
    hub: '/light-bulbs/', quoteService: 'Light Bulb Recycling',
  },
  'electronic-recycling': {
    slug: 'electronic-recycling', name: 'Electronic Recycling', noun: 'electronics',
    hub: '/electronic-recycle/', quoteService: 'Electronics Recycling',
  },
  'battery-recycling': {
    slug: 'battery-recycling', name: 'Battery Recycling', noun: 'batteries',
    hub: '/battery-recycling/', quoteService: 'Battery Recycling',
  },
}

export type Pickup = 'yes' | 'no' | 'ask'

export type SiteData = {
  /** How pages name the place: "Phoenix, AZ", or "Minnesota" for the state hubs. */
  name: string
  city: string
  /** Postal code, "AZ". */
  state: string
  address: string
  addressConfirmed: boolean
  phone: string
  hours: string
  hoursConfirmed: boolean
  /** 'rti' — our own facility (schema gets LocalBusiness); 'partner' — a drop-off site in the network. */
  operator: 'rti' | 'partner'
  dropoff: boolean
  /** 'ask' until someone confirms; the page then says "call to ask", never "yes". */
  pickup: Pickup
  mailin: boolean
  /** The hub page's own intro (partner sites; MN/WI hubs are the existing pages). */
  intro: string
  /** Dock, parking, gate or check-in notes. */
  logistics: string
  /** Nearby cities served, one per entry. */
  nearby: string[]
  /** Certifications THIS site holds, verified. Empty for partners unless confirmed. */
  certifications: string[]
  /** A real photo of the site (media library URL). */
  photo: string
  /** Manual overrides for the hub page; blank = generated. */
  seoTitle: string
  seoDescription: string
  /** Internal note, never shown on the site. */
  notes: string
}

export type Pair = { label: string; text: string }
export type Faq = { q: string; a: string }
export type Review = { quote: string; author: string; place: string }

export type PageData = {
  intro: string
  audiences: string[]
  accepted: Pair[]
  acceptedConfirmed: boolean
  notAccepted: string[]
  steps: Pair[]
  packaging: string[]
  certificate: string
  compliance: string
  complianceSource: string
  complianceVerifiedBy: string
  /** yyyy-mm-dd */
  complianceVerifiedAt: string
  reviews: Review[]
  faqs: Faq[]
  /** A per-location tracking number; the site phone when blank. */
  trackingPhone: string
  /** Manual overrides; blank = generated from the pattern. */
  h1: string
  seoTitle: string
  seoDescription: string
  notes: string
}

export type SiteSeed = { slug: string; hubPath: string; sort: number; data: SiteData; offered: Record<ServiceSlug, boolean> }

const ALL: Record<ServiceSlug, boolean> = { 'light-bulb-recycling': true, 'electronic-recycling': true, 'battery-recycling': true }

export const NETWORK_PHONE = '+1-800-969-5166'

function partner(slug: string, name: string, city: string, state: string, address: string, sort: number): SiteSeed {
  return {
    slug, hubPath: `/locations/${slug}/`, sort, offered: { ...ALL },
    data: {
      name, city, state, address, addressConfirmed: false,
      phone: NETWORK_PHONE, hours: 'Call to confirm hours', hoursConfirmed: false,
      operator: 'partner', dropoff: true, pickup: 'ask', mailin: true,
      intro: '', logistics: '', nearby: [], certifications: [], photo: '',
      seoTitle: '', seoDescription: '', notes: '',
    },
  }
}

/**
 * The ten sites, in the brief's order. The eight partner addresses are the
 * homepage drop-off list (the "Additional Facilities Nationwide" cards on
 * /all-locations/); the brief asks for each to be confirmed as current, which
 * is the "Address confirmed" box in the admin.
 */
export const SITE_SEEDS: SiteSeed[] = [
  partner('ontario-ca', 'Ontario, CA', 'Ontario', 'CA', '805 E. Francis Street, Ontario, CA 91761', 10),
  partner('phoenix-az', 'Phoenix, AZ', 'Phoenix', 'AZ', '1545 E. Victory St, Phoenix, AZ 85040', 20),
  partner('greenwood-in', 'Greenwood, IN', 'Greenwood', 'IN', '498 Park 800 Drive, Greenwood, IN 46143', 30),
  partner('ocala-fl', 'Ocala, FL', 'Ocala', 'FL', '1007 SW 16th Lane, Ocala, FL 34471', 40),
  partner('fort-worth-tx', 'Fort Worth, TX', 'Fort Worth', 'TX', '101 E Bowie Street, Fort Worth, TX 76110', 50),
  partner('johnson-city-tn', 'Johnson City, TN', 'Johnson City', 'TN', '2212 Buffalo Road #210, Johnson City, TN 37604', 60),
  partner('lewisburg-tn', 'Lewisburg, TN', 'Lewisburg', 'TN', '1580 Old Columbia Road, Lewisburg, TN 37091', 70),
  // The address is in Kennesaw, a northwest Atlanta suburb. The brief names the
  // page "Atlanta, GA"; whether it should say Kennesaw is the SEO manager's call.
  partner('atlanta-ga', 'Atlanta, GA', 'Kennesaw', 'GA', '2260 Moon Station Court NW Ste 140, Kennesaw, GA 30144', 80),
  {
    slug: 'minnesota', hubPath: MINNESOTA.url, sort: 1, offered: { ...ALL },
    data: {
      name: 'Minnesota', city: MINNESOTA.town, state: 'MN', address: MINNESOTA.address, addressConfirmed: true,
      phone: MINNESOTA.phone, hours: MINNESOTA.hours, hoursConfirmed: false,
      operator: 'rti', dropoff: true, pickup: 'yes', mailin: true,
      intro: '', logistics: '', nearby: [], certifications: ['R2v3'], photo: '',
      seoTitle: '', seoDescription: '', notes: '',
    },
  },
  {
    slug: 'wisconsin', hubPath: WISCONSIN.url, sort: 2,
    // The New Berlin facility page lists electronics, batteries, TVs and paper,
    // not light bulbs; that page starts as "not offered" until someone confirms.
    offered: { 'light-bulb-recycling': false, 'electronic-recycling': true, 'battery-recycling': true },
    data: {
      name: 'Wisconsin', city: WISCONSIN.town, state: 'WI', address: WISCONSIN.address, addressConfirmed: true,
      phone: WISCONSIN.phone, hours: WISCONSIN.hours, hoursConfirmed: false,
      operator: 'rti', dropoff: true, pickup: 'yes', mailin: true,
      intro: '', logistics: '', nearby: [], certifications: [], photo: '',
      seoTitle: '', seoDescription: '', notes: '',
    },
  },
]

/**
 * A starting point for each service, copied into a page when it is created.
 * General on purpose: what the site accepts, its local rules and its FAQs
 * are written per page, and the admin checklist says so.
 */
export const STARTERS: Record<ServiceSlug, PageData> = {
  'light-bulb-recycling': {
    intro: '',
    audiences: ['Businesses', 'Property managers', 'Schools and universities', 'Contractors and electricians', 'Municipalities'],
    accepted: [
      { label: 'Fluorescent tubes', text: 'Straight and U-bend T5, T8 and T12 tubes.' },
      { label: 'Compact fluorescent lamps', text: 'Pin base and screw in CFLs.' },
      { label: 'HID lamps', text: 'Metal halide, high pressure sodium and mercury vapor lamps.' },
      { label: 'LED lamps and tubes', text: 'LED bulbs, tubes and retrofit kits.' },
      { label: 'Incandescent and halogen', text: 'Including specialty and decorative bulbs.' },
    ],
    acceptedConfirmed: false,
    notAccepted: [],
    steps: [
      { label: 'Prepare', text: 'Keep lamps whole and pack tubes in their original boxes or in fiber tube boxes.' },
      { label: 'Drop off or book', text: 'Bring them to the site, or request a quote for a larger load.' },
      { label: 'Processing', text: 'Mercury is captured and the glass, metal and phosphor are separated for recycling.' },
      { label: 'Documentation', text: 'Business loads can receive a certificate of recycling.' },
    ],
    packaging: [
      'Keep lamps whole. Put any broken lamps in a sealed, labelled container.',
      'Pack tubes in their original boxes or in fiber tube boxes; do not tape tubes together.',
    ],
    certificate: 'Businesses can request a certificate of recycling documenting what was received and how it was processed.',
    compliance: '', complianceSource: '', complianceVerifiedBy: '', complianceVerifiedAt: '',
    reviews: [],
    faqs: [],
    trackingPhone: '', h1: '', seoTitle: '', seoDescription: '', notes: '',
  },
  'electronic-recycling': {
    intro: '',
    audiences: ['Businesses', 'Schools and universities', 'Healthcare offices', 'Property managers', 'Municipalities'],
    accepted: [
      { label: 'Computers and laptops', text: 'Desktops, laptops, all in ones and tablets.' },
      { label: 'Monitors', text: 'LCD and LED monitors.' },
      { label: 'Servers and networking', text: 'Servers, switches, routers and racks.' },
      { label: 'Printers and copiers', text: 'Office printers, copiers and scanners.' },
      { label: 'Phones', text: 'Cell phones, desk phones and phone systems.' },
      { label: 'Cables and peripherals', text: 'Keyboards, mice, cables and chargers.' },
    ],
    acceptedConfirmed: false,
    notAccepted: [],
    steps: [
      { label: 'Prepare', text: 'Back up anything you need; data bearing devices can be wiped or destroyed on request.' },
      { label: 'Drop off or book', text: 'Bring equipment to the site, or request a quote for a larger load.' },
      { label: 'Processing', text: 'Equipment is sorted, data is handled securely, and materials go to responsible downstream recyclers.' },
      { label: 'Documentation', text: 'Business loads can receive a certificate of recycling and, where requested, of data destruction.' },
    ],
    packaging: [],
    certificate: 'Businesses can request a certificate of recycling, and a certificate of data destruction for drives.',
    compliance: '', complianceSource: '', complianceVerifiedBy: '', complianceVerifiedAt: '',
    reviews: [],
    faqs: [],
    trackingPhone: '', h1: '', seoTitle: '', seoDescription: '', notes: '',
  },
  'battery-recycling': {
    intro: '',
    audiences: ['Businesses', 'Auto shops and fleets', 'Property managers', 'Schools and universities', 'Contractors', 'Municipalities'],
    accepted: [
      { label: 'Alkaline', text: 'AA, AAA, C, D and 9 volt batteries.' },
      { label: 'Lithium-ion', text: 'Laptop, phone and power tool batteries.' },
      { label: 'Lead-acid', text: 'Sealed lead-acid and automotive batteries.' },
      { label: 'Nickel based', text: 'Nickel-cadmium and nickel-metal hydride batteries.' },
      { label: 'Button and coin cells', text: 'Watch, hearing aid and coin batteries.' },
    ],
    acceptedConfirmed: false,
    notAccepted: [],
    steps: [
      { label: 'Sort', text: 'Keep battery types apart, and set aside any that are damaged, swollen or leaking.' },
      { label: 'Pack safely', text: 'Tape the terminals of lithium and 9 volt batteries, and bag damaged ones one to a bag.' },
      { label: 'Drop off or book', text: 'Bring them to the site, or request a quote for a larger load.' },
      { label: 'Documentation', text: 'Business loads can receive a certificate of recycling.' },
    ],
    packaging: [
      'Tape the terminals of lithium batteries and 9 volt batteries with non-conductive tape, or bag each one.',
      'Put damaged, swollen or leaking batteries in their own bag and tell staff before handing them over.',
      'Keep lead-acid batteries upright and do not stack them loose.',
    ],
    certificate: 'Businesses can request a certificate of recycling documenting what was received and how it was processed.',
    compliance: '', complianceSource: '', complianceVerifiedBy: '', complianceVerifiedAt: '',
    reviews: [],
    faqs: [],
    trackingPhone: '', h1: '', seoTitle: '', seoDescription: '', notes: '',
  },
}
