import { FACILITIES as CONTACT } from '@/data/contact'
import type { CtaContent } from '@/components/sections/ClosingCta'
import { href, PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import { R2_DIRECTORY } from '@/data/certifications'

/**
 * The two licensed facilities — ONE record each, read by three surfaces:
 *
 *   /all-locations/            the two location cards (Figma 6743:2450)
 *   /minnesota-recycling/      the Minnesota detail page (6744:8392)
 *   /wisconsin-recycling/      the Wisconsin detail page (6746:8471)
 *
 * Built 22 Sep 2026 on Asim's instruction: "update the location page and add
 * other 2 location pages for 2 different locations".
 *
 * Address, phone and email come from src/data/contact.ts, which the contact
 * page and the footer already render, so a facility cannot have two addresses
 * on one site. Everything else here is the designer's.
 *
 * ===========================================================================
 * !! THE FACTS BELOW CAME OFF THE FRAME, NOT FROM RTI. CONFIRM BEFORE LAUNCH.
 * ===========================================================================
 * The live site publishes no opening hours for either facility (checked
 * 22 Sep 2026: HOURS absent on both /minnesota-recycling/ and
 * /wisconsin-recycling/). The Figma frames DO draw hours, a Saturday schedule,
 * a nearest highway, a parking note and a drop-off entrance for each site.
 * Nobody at Recycle Technologies has confirmed any of it; a designer had to
 * put something in the box. Every one of these is a fact a customer will act
 * on — drive to a closed gate, look for a rear entrance that is not there.
 * Each is marked `// FRAME` and needs a yes from the facility before the page
 * goes live. Rizwan owns the ask.
 *
 * The FAQ answers are mine, not the frame's: the accordion is drawn closed, so
 * only the questions exist in Figma. Each answer is built from wording the
 * site already publishes (src/data/faqs.ts and the battery page's 100-mile
 * pickup radius) and stays deliberately non-committal on fees, which nothing
 * on the site or the live pages states. Musaveer to review.
 *
 * URLs: both pages are LIVE, INDEXED URLs — see LIVE_SEO on each. The hub
 * pages of the county-and-city location tree that the migration plan says
 * not to flatten. What ships here is the redesign; the ~20 city links each
 * live hub carries are not in the frame and are not built. That is the open
 * ranking question already logged in claude/content-and-design-sources.md,
 * and building these two pages does not close it.
 */

/** `id` is the material's fixed name, the key materialLinks() uses
 *  (src/lib/service-locations.ts), so a label edited in Admin -> Pages does
 *  not lose the tile's link. */
export type Material = { id: string; label: string; icon: string }

export type Facility = {
  /** Route folder and the key the hub cards use. */
  slug: 'minnesota-recycling' | 'wisconsin-recycling'
  url: string
  /** "Minnesota" — the breadcrumb tail and the state name in copy. */
  state: string
  /** "Blaine" — the town the CTA and the intro name. */
  town: string
  name: string
  liveSeo: { title: string; description: string }
  /** The live H1, kept for the url-map row; the hero draws the design's. */
  liveH1: string
  hero: {
    h1: string; lead: string; leadShort: string
    /** The hero's two buttons (Wisconsin, 5 Oct 2026, 6744:8394): white "Schedule a Pickup", outlined "Get a Quote". */
    buttons?: { primary: { label: string; href: string }; secondary: { label: string; href: string } }
  }
  /**
   * "Our <state> Recycling Center" — the bar under the hero linking the
   * center's own page (Wisconsin, 6744:8794, 5 Oct 2026). Absent: no bar.
   */
  center?: {
    eyebrow: string
    name: string
    href: string
    addressLabel: string
    address: string
    phoneLabel: string
    phone: string
    primary: string
    secondary: string
  }
  address: string
  /** No zip, for the quick-info bar and the phone frame. */
  addressShort: string
  phone: string
  email: string
  /** Full line, as the hub card draws it. */
  /** The address as the /all-locations/ card prints it, when that differs
   *  from `address` (Minnesota: the frame abbreviates the state). */
  cardAddress?: string
  hours: string
  /** Weekday line only, as the quick-info bar draws it. */
  hoursShort: string
  /** `certified` drives the directory link on the quick-info bar, so an
   *  edited status wording cannot switch it off. */
  cert: { status: string; badge: string; certified: boolean }
  /**
   * The mark in the /all-locations/ card header, where the status pill used to
   * be — Asim, 23 Sep 2026: the R2v3 logo "without bg and make it clickable"
   * for Minnesota, and the NAID AAA logo for Wisconsin. `disc` sets a mark
   * that has its own white ground on a white circle, so the ground reads as
   * part of the badge instead of a white square on the dark header.
   */
  badgeLogo: { src: string; alt: string; w: number; h: number; href?: string; disc?: boolean }
  mapLabel: string
  /** Google Maps directions to the street address. External, so rule 3 does not apply. */
  mapsHref: string
  materialsLead: string
  materials: Material[]
  directions: { intro: string; introShort: string; rows: { label: string; value: string }[] }
  steps: { title: string; body: string; bodyShort: string }[]
  faqs: { q: string; a: string }[]
  cta: CtaContent
  /** The state page redesign of 13 Oct 2026 (see StateHub). */
  hub: StateHub
}

/**
 * THE STATE PAGES' NEW SECTIONS — Figma "Location Details - Minnesota New"
 * 7329:6088 (phone 7329:6801) and "- Wisconsin New" 7329:5698 (phone
 * 7329:6503), 13 Oct 2026. Asim: "keep this section [the center bar] same as
 * the old one in both the pages ... and update the other".
 *
 *   materials  "Recycling and shredding services in <state>": eight tiles,
 *              each linking the state's own service page (`service` is the
 *              key in LOCAL_FACILITY_PAGES, so an edited label keeps its link)
 *   counties   one card per county (or group of counties) with a chip per
 *              city or service page; replaces the old card grid + Load More
 *   cta        the navy to green "Schedule ... Pickup" band
 *   mailIn     the light band with the mail-in kit button
 *   faqHeading the FAQ title, which the two frames word differently
 *
 * Every chip is a page that exists (checked 13 Oct 2026 against
 * src/data/county-pages); the labels are the frame's, word for word.
 */
export type StateHub = {
  materials: { heading: string; lead: string; tiles: { label: string; icon: string; service: string }[] }
  counties: { lead: string; groups: { heading: string; chips: { label: string; href: string }[] }[] }
  cta: { heading: string; body: string; primary: { label: string; href: string }; secondary: { label: string; href: string } }
  mailIn: { heading: string; body: string; button: { label: string; href: string } }
  faqHeading: string
}

/** The eight service tiles, the same on both frames (7329:6150 / 7329:5761). */
const I = '/images/locations'
const STATE_TILES: StateHub['materials']['tiles'] = [
  { label: 'Electronics',        icon: `${I}/state-electronics.svg`, service: 'electronic-recycling' },
  { label: 'Batteries',          icon: `${I}/state-batteries.svg`,   service: 'battery-recycling' },
  { label: 'Light bulbs',        icon: `${I}/state-bulbs.svg`,       service: 'light-bulb-recycling' },
  { label: 'Ballasts',           icon: `${I}/state-ballasts.svg`,    service: 'ballast-recycling' },
  { label: 'Airbags',            icon: `${I}/state-ballasts.svg`,    service: 'airbag-recycling' },
  { label: 'Paper shredding',    icon: `${I}/state-paper.svg`,       service: 'paper-shredding' },
  { label: 'Phone shredding',    icon: `${I}/state-lock.svg`,        service: 'phone-shredding' },
  { label: 'Off-site shredding', icon: `${I}/state-lock.svg`,        service: 'off-site-shredding' },
]
const chip = (label: string, url: string) => ({ label, href: href(url) })
const STATE_CTA_BUTTONS = {
  primary:   { label: 'Schedule a Pickup', href: PICKUP_HREF },
  secondary: { label: 'Get a Quote',       href: QUOTE_HREF },
}

/*
 * Looked up by name rather than by position, and thrown on a miss: if
 * someone reorders or renames the contact page's cards, this fails the build
 * with a message instead of quietly putting Wisconsin's phone number on the
 * Minnesota page.
 */
function contact(name: string) {
  const c = CONTACT.cards.find((x) => x.name === name)
  if (!c) throw new Error(`src/data/contact.ts has no facility card named "${name}"`)
  return c
}
const MN_CONTACT = contact('Minnesota Facility')
const WI_CONTACT = contact('Wisconsin Facility')

function maps(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
}

/**
 * A real map of the facility — Asim, 23 Sep 2026, pointing at the
 * illustrative panels: "we have to add [a real] map here". Google's keyless
 * embed: a live, pannable street map with Google's own pin on the address.
 * No API key, no script of ours, no dependency — the page just frames
 * Google's URL. External, so CLAUDE.md rule 3 does not apply.
 *
 * If Google ever retires the keyless `output=embed` form, the supported
 * replacement is the Maps Embed API (free, needs a key):
 *   https://www.google.com/maps/embed/v1/place?key=KEY&q=ADDRESS
 * — this one function is the only place to change.
 */
export function mapEmbed(address: string, zoom = 15): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=${zoom}&hl=en&output=embed`
}

/** Material tiles — icons are Figma exports, see data/figma-assets.json. */
const M = {
  electronics: { id: 'Electronics', label: 'Electronics',            icon: '/images/locations/mat-electronics.svg' },
  batteries:   { id: 'Batteries', label: 'Batteries',              icon: '/images/locations/mat-batteries.svg' },
  bulbs:       { id: 'Light Bulbs', label: 'Light Bulbs',            icon: '/images/locations/mat-bulbs.svg' },
  ballasts:    { id: 'Ballasts', label: 'Ballasts',               icon: '/images/locations/mat-ballasts.svg' },
  tv:          { id: 'TV Recycling', label: 'TV Recycling',           icon: '/images/locations/mat-tv.svg' },
  paper:       { id: 'Paper Shredding', label: 'Paper Shredding',        icon: '/images/locations/mat-paper.svg' },
  hardDrive:   { id: 'Hard Drive Destruction', label: 'Hard Drive Destruction', icon: '/images/locations/mat-harddrive.svg' },
} satisfies Record<string, Material>

/** The three steps are word-for-word the same on both frames. */
const STEPS = [
  {
    title: 'Pull Around Back',
    body: 'Enter via the parking lot and follow signage to the rear loading area — no need to check in at a front desk.',
    bodyShort: 'Enter via the parking lot and follow signage to the rear loading area.',
  },
  {
    title: 'We Log Your Materials',
    body: 'A team member logs each item at intake, so its path through our facility is documented from the start.',
    bodyShort: 'A team member logs each item at intake for full documentation.',
  },
  {
    title: 'Get Your Certificate',
    body: 'Once processing is complete, we issue a Certificate of Recycling or Shredding for your records.',
    bodyShort: 'We issue a Certificate of Recycling or Shredding for your records.',
  },
]


export const MINNESOTA: Facility = {
  slug: 'minnesota-recycling',
  url: '/minnesota-recycling/',
  state: 'Minnesota',
  town: 'Blaine',
  name: MN_CONTACT.name,
  /* Verbatim from the live page, captured 22 Sep 2026. */
  liveSeo: {
    title: 'MN Electronics Recycling & Shredding | Recycle Technologies', // M-02, 12 Oct 2026
    description: 'Recycling center in Minnesota handling electronics, batteries, lamps, paper, and secure material processing for businesses and facilities. Call (800) 969-5166.',
  },
  liveH1: 'Certified Electronics Recycling & Shredding in Minnesota',
  hero: {
    // 12 Oct 2026, "RTI State & Country Pages Content Corrections" sheet: new H1 and subtitle.
    h1: 'Certified Electronics Recycling & Shredding in Minnesota', // M-01 (was the WordPress "Recycling and Shredding Across Minnesota")
    // New lead and the two buttons, as on Wisconsin (Asim, 5 Oct 2026: "do this thing in
    // Recycling Center in Minnesota in the same design"). H1 and photo unchanged.
    lead: 'R2v3, RIOS, and NAID AAA certified electronics, battery, light bulb, and hard drive recycling plus secure shredding, with a certificate for every job.', // M-03
    leadShort: 'R2v3, RIOS, and NAID AAA certified electronics, battery, light bulb, and hard drive recycling plus secure shredding, with a certificate for every job.',
    buttons: {
      primary:   { label: 'Schedule a Pickup', href: PICKUP_HREF },
      secondary: { label: 'Get a Quote',       href: QUOTE_HREF },
    },
  },
  // The center bar, as Wisconsin's (6744:8794). Blaine's page is /minnesota-recycling/ramsey/blaine/.
  center: {
    eyebrow: 'Our Minnesota Recycling Center',
    name: 'Blaine Recycling Center',
    href: href('/minnesota-recycling/ramsey/blaine/'),
    addressLabel: 'Address:',
    address: '1525 99th Ln NE, Blaine, MN 55449',
    phoneLabel: 'Phone:',
    phone: '763-559-5130',
    primary: 'View Center',
    secondary: 'Get Directions',
  },
  address: MN_CONTACT.address,
  addressShort: '1525 99th Ln NE, Blaine, MN 55449', // 7329:6128, 13 Oct 2026
  cardAddress: '1525 99th Ln NE, Blaine, MN 55449', // 6744:2472, 25 Sep 2026
  phone: MN_CONTACT.phone,
  email: MN_CONTACT.email,
  // 13 Oct 2026, Figma 7329:6143: 7:30 to 4:00, as the Blaine page says (was
  // the old frame's unconfirmed 8:30 to 4:30 plus two Saturdays).
  hours: 'Mon–Fri 7:30 AM–4:00 PM',
  hoursShort: 'Mon–Fri 7:30 AM–4:00 PM',
  cert: { status: 'R2v3 Certified', badge: 'R2v3 Certified', certified: true },
  /* stat-r2.png is the R2v3 mark on a transparent ground (the hero stats
     strip's own file); the certifications page's r2v3.png has a white one. */
  badgeLogo: { src: '/images/home/stat-r2.png', alt: 'R2v3 certified', w: 38, h: 40, href: R2_DIRECTORY },
  mapLabel: 'Blaine, MN',
  mapsHref: maps(MN_CONTACT.address),
  materialsLead: 'The Blaine, Minnesota facility handles the full range of our electronics and document destruction services.',
  materials: [M.electronics, M.batteries, M.bulbs, M.ballasts, M.paper, M.hardDrive],
  directions: {
    intro: 'Enter via the parking lot on 99th Lane NE. Signage directs drop-off traffic to the rear loading area — a team member will meet you to log your materials.', // FRAME
    introShort: 'Enter via the parking lot on 99th Lane NE. Signage directs drop-off traffic to the rear loading area.',
    rows: [
      { label: 'Nearest Highway',   value: 'I-35W & 99th Ave NE' },  // FRAME — unconfirmed
      { label: 'Parking',           value: 'Free on-site parking' }, // FRAME — unconfirmed
      { label: 'Drop-off Entrance', value: 'Rear loading area' },    // FRAME — unconfirmed
    ],
  },
  steps: STEPS,
  // M-10, 12 Oct 2026: the sheet's five Minnesota FAQs, word for word.
  faqs: [
    { q: 'Can residential customers get pick-up service in Minnesota?', a: 'No! Recycle Technologies offers pick-up services only for commercial clients (businesses). Residential customers can either drop off their e-waste at their nearby facility or subscribe to our nationwide mail-in program.' },
    { q: 'What does the Blaine facility accept?', a: 'Our Blaine center takes electronics, batteries, light bulbs, ballasts, paper shredding and hard drive destruction, and also offers airbag recycling, off-site shredding and phone shredding. Drop-off is Monday to Friday, 7:30 AM to 4:00 PM at 1525 99th Ln NE, Blaine, MN 55449. Businesses can also schedule a pickup.' },
    { q: 'How should Minnesota businesses manage used lamps and batteries?', a: 'Minnesota classes used lamps and hazardous-waste batteries as universal waste, a reduced-requirement category regulated by the MPCA. Keep them in closed, labeled containers, out of the trash, and avoid crushing lamps on site, which the state restricts. County programs oversee hazardous waste generators in the Twin Cities area, and the MPCA oversees Greater Minnesota, so confirm your local reporting rules.' },
    { q: 'Can you securely destroy hard drives and confidential documents in Minnesota?', a: 'Yes. Our Blaine facility offers hard drive destruction, paper shredding, off-site shredding, and phone shredding, backed by NAID AAA certification for data destruction. Each job is logged at intake and ends with a Certificate of Recycling or Shredding that you can keep as proof for audits and compliance records.' },
    { q: 'Which areas of Minnesota do you serve?', a: 'We serve the Twin Cities metro and beyond, including Hennepin, Ramsey, Dakota, Anoka, Washington and Scott counties, plus Minneapolis, Bloomington, Rochester, St. Cloud and Duluth. Residents can drop off in Blaine, businesses can schedule a pickup, and mail-in kits are available for everyone else. Find your county under Counties We Serve.' },
  ],
  cta: {
    heading: 'Ready to Bring Materials to Blaine?',
    body: 'Schedule a commercial pickup, plan your drop-off, or explore our nationwide Mail-In Program if Blaine isn’t convenient.',
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
  },
  hub: {
    materials: {
      heading: 'Recycling and shredding services in Minnesota',
      lead: 'One certified provider for what leaves your building, from old lamps to retired hard drives.',
      tiles: STATE_TILES,
    },
    counties: {
      lead: 'Pick your county to see the cities and services available there.',
      groups: [
        { heading: 'Hennepin County', chips: [
          chip('Minneapolis', '/minnesota-recycling/minneapolis/'),
          chip('Bloomington', '/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/'),
          chip('Edina', '/minnesota-recycling/hennepin-county-recycling-center/edina-recycling-services/'),
          chip('Maple Grove', '/minnesota-recycling/hennepin-county-recycling-center/maple-grove-recycling-center/'),
          chip('Minnetonka', '/minnesota-recycling/hennepin-county-recycling-center/minnetonka-recycling-center/'),
          chip('Plymouth', '/minnesota-recycling/hennepin-county-recycling-center/plymouth-recycling-center/'),
          chip('Brooklyn Park', '/minnesota-recycling/hennepin-county-recycling-center/brooklyn-park-recycling-center/'),
          chip('Hennepin County', '/minnesota-recycling/hennepin-county-recycling-center/'),
        ] },
        { heading: 'Anoka County', chips: [
          chip('Blaine', '/minnesota-recycling/ramsey/blaine/'),
          chip('Coon Rapids', '/minnesota-recycling/coon-rapids/'),
          chip('East Bethel', '/minnesota-recycling/east-bethel/'),
          chip('Anoka County', '/minnesota-recycling/anoka-county-recycling/'),
        ] },
        { heading: 'Ramsey County', chips: [
          chip('St. Paul batteries', '/minnesota-recycling/battery-recycling-st-paul/'),
          chip('St. Paul shredding', '/shredding-minnesota/st-paul/'),
          chip('Roseville', '/minnesota-recycling/ramsey/roseville/'),
          chip('Ramsey County', '/minnesota-recycling/ramsey/'),
        ] },
        { heading: 'Dakota County', chips: [
          chip('Burnsville', '/minnesota-recycling/dakota-county/burnsville-recycling-center/'),
          chip('Lakeville', '/minnesota-recycling/dakota-county/lakeville-recycling-center/'),
          chip('Dakota County', '/minnesota-recycling/dakota-county/'),
        ] },
        { heading: 'Washington County, MN', chips: [
          chip('Woodbury', '/minnesota-recycling/electronic-recycling-in-woodbury/'),
          chip('Washington County, MN', '/minnesota-recycling/washington-county/'),
        ] },
        { heading: 'Scott · Olmsted · Benton Counties', chips: [
          chip('Scott County', '/minnesota-recycling/scott-county/'),
          chip('Rochester shredding', '/shredding-minnesota/rochester/'),
          chip('St. Cloud', '/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/'),
        ] },
        { heading: 'St. Louis County', chips: [
          chip('Duluth', '/minnesota-recycling/electronic-recycling-duluth/'),
        ] },
      ],
    },
    cta: {
      heading: 'Schedule Business Recycling Pickup in Minnesota',
      body: 'Clear out retired electronics, batteries, lamps, and confidential documents with scheduled business collection. Get a quote for your materials, confirm service availability, and arrange pickup with the required documentation.',
      ...STATE_CTA_BUTTONS,
    },
    mailIn: {
      heading: 'Need Recycling Outside Our Minnesota Pickup Area?',
      body: 'Use a prepaid mail-in kit to ship eligible electronics and other accepted materials to Recycle Technologies. Review available kits, accepted items, and shipping instructions before sending your materials.',
      button: { label: 'Explore Mail-In Recycling Kits', href: href('/mail-in-recycling/') },
    },
    faqHeading: 'FAQs',
  },
}

export const WISCONSIN: Facility = {
  slug: 'wisconsin-recycling',
  url: '/wisconsin-recycling/',
  state: 'Wisconsin',
  town: 'New Berlin',
  name: WI_CONTACT.name,
  /* Verbatim from the live page, captured 22 Sep 2026. */
  liveSeo: {
    title: 'Electronics Recycling in Wisconsin | Recycle Technologies',
    description: 'Recycling Wisconsin for electronics, computers, lamps, batteries, televisions, and devices, accepted through documented intake and processing procedures. Call (800) 969-5166.',
  },
  liveH1: 'Certified Electronics Recycling & Shredding in Wisconsin',
  hero: {
    // 12 Oct 2026, "RTI State & Country Pages Content Corrections" sheet: new H1 and subtitle.
    h1: 'Certified Electronics Recycling & Shredding in Wisconsin', // W-02 (was the WordPress "Recycling and Shredding Across Wisconsin")
    // New lead and two buttons, Figma 6744:8394 (Asim, 5 Oct 2026). No phone frame; the phone uses the same lead.
    lead: 'R2v3, RIOS and NAID AAA certified recycling, data destruction and shredding for Wisconsin businesses and households, with every item logged at intake and a certificate issued on completion.', // W-03
    leadShort: 'R2v3, RIOS and NAID AAA certified recycling, data destruction and shredding for Wisconsin businesses and households, with every item logged at intake and a certificate issued on completion.',
    buttons: {
      primary:   { label: 'Schedule a Pickup', href: PICKUP_HREF },
      secondary: { label: 'Get a Quote',       href: QUOTE_HREF },
    },
  },
  // 6744:8794 (5 Oct 2026). The frame's "2815S" is a typo for "2815 S".
  center: {
    eyebrow: 'Our Wisconsin Recycling Center',
    name: 'New Berlin Recycling Center',
    href: href('/wisconsin-recycling/new-berlin-recycling-center/'),
    addressLabel: 'Address:',
    address: '2815 S 171st St, New Berlin, WI 53151',
    phoneLabel: 'Phone:',
    phone: '262-798-3040',
    primary: 'View Center',
    secondary: 'Get Directions',
  },
  address: WI_CONTACT.address,
  addressShort: '2815 S 171st St, New Berlin, WI 53151', // 7329:5739, 13 Oct 2026
  phone: WI_CONTACT.phone,
  email: WI_CONTACT.email,
  // 5 Oct 2026, Figma 6744:8392: 7:30 to 4:00 (as the New Berlin page and the
  // drop-off page already say) and R2v3 Certified (was "Pursuing R2v3").
  hours: 'Mon–Fri 7:30 AM–4:00 PM',
  hoursShort: 'Mon–Fri 7:30 AM–4:00 PM',
  cert: { status: 'R2v3 Certified', badge: 'R2v3 Certified', certified: true },
  /* !! The card no longer says "Pursuing R2v3" — Asim, 23 Sep 2026, swapped
     the pill for the NAID AAA badge. The status still shows on the facility
     page itself (quick-info bar and hero lead). The NAID AAA claim carries
     the compliance note in src/data/certifications.ts. */
  // R2v3 on the Wisconsin card too, NAID AAA logo removed (Asim, 24 Sep 2026).
  badgeLogo: { src: '/images/home/stat-r2.png', alt: 'R2v3 certified', w: 38, h: 40, href: R2_DIRECTORY },
  mapLabel: 'New Berlin, WI',
  mapsHref: maps(WI_CONTACT.address),
  // The "as R2v3 certification is finalized" ending dropped 5 Oct 2026: the facility is now shown as certified.
  materialsLead: 'The New Berlin, Wisconsin facility currently accepts electronics, batteries, TVs, and paper shredding.',
  materials: [M.electronics, M.batteries, M.tv, M.paper],
  directions: {
    intro: 'Enter via the main lot on South 171st Street. Staff will direct you to the drop-off bay upon arrival.', // FRAME
    introShort: 'Enter via the main lot on South 171st Street. Staff will direct you to the drop-off bay upon arrival.',
    rows: [
      { label: 'Nearest Highway',   value: 'I-43 & College Ave' },   // FRAME — unconfirmed
      { label: 'Parking',           value: 'Free on-site parking' }, // FRAME — unconfirmed
      { label: 'Drop-off Entrance', value: 'Rear loading area' },    // FRAME — unconfirmed
    ],
  },
  steps: STEPS,
  // W-10, 12 Oct 2026: the sheet's five Wisconsin FAQs, word for word.
  faqs: [
    { q: 'Does Recycle Technologies serve both businesses and residential customers in Wisconsin?', a: 'Yes! Both businesses and residential customers can use our services. We offer a commercial pick-up facility for businesses recycling their electronics, while our residential customers can benefit from our drop-off facility or our nationwide mail-in program.' },
    { q: 'What does Recycle Technologies accept in Wisconsin?', a: 'Our facility in New Berlin takes electronics, batteries, TVs, and paper shredding. Residents can drop off Monday to Friday, 7:30 AM to 4:00 PM, and businesses can schedule a pickup.' },
    { q: 'How should Wisconsin businesses handle used batteries and fluorescent lamps?', a: 'Wisconsin treats most used lamps and batteries as universal waste. Keep them in closed, labeled containers ("Used Lamps" or "Used Batteries"), date them, train the staff who handle them, and send them for recycling within one year. We collect and recycle both, so you do not have to manage disposal on your own.' },
    { q: 'How do I know my materials were recycled responsibly?', a: 'Every item is logged at intake, so its path through our facility is documented from the start. When processing is complete, we issue a Certificate of Recycling or Shredding for your records. Our New Berlin facility is R2v3-certified; we hold RIOS and NAID AAA certifications, and we operate under a zero-landfill commitment.' },
    { q: 'Which parts of Wisconsin do you serve?', a: 'From New Berlin, we serve Milwaukee, Waukesha, Racine, Washington County, Madison, Green Bay, and Calumet County (Appleton), along with other communities across the state. Businesses can request a pickup, residents can drop off in New Berlin, and mail-in recycling kits cover everyone else. Choose your area under Counties We Serve for local details.' },
  ],
  cta: {
    heading: 'Ready to Bring Materials to New Berlin?',
    body: 'Schedule a commercial pickup, plan your drop-off, or explore our nationwide Mail-In Program if New Berlin isn’t convenient.',
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
  },
  hub: {
    materials: {
      heading: 'Recycling and shredding services in Wisconsin',
      lead: 'One provider for what leaves your building, from old lamps to retired hard drives. Recycle Technologies offers electronics recycling, battery recycling, and secure shredding services for Wisconsin businesses.',
      tiles: STATE_TILES,
    },
    counties: {
      lead: 'Explore the county and city pages below to find the locations and recycling services relevant to your business. Contact us to confirm pickup availability for your address.',
      groups: [
        { heading: 'Waukesha County', chips: [
          chip('New Berlin', '/wisconsin-recycling/new-berlin-recycling-center/'),
          chip('Waukesha', '/wisconsin-recycling/waukesha-electronic-recycling/'),
          chip('Oconomowoc', '/wisconsin-recycling/oconomowoc-recycling-center/'),
        ] },
        { heading: 'Milwaukee County', chips: [
          chip('Milwaukee', '/wisconsin-recycling/milwaukee/'),
          chip('Oak Creek', '/wisconsin-recycling/milwaukee/oak-creek/'),
        ] },
        { heading: 'Dane County', chips: [
          chip('Madison', '/wisconsin-recycling/madison/'),
        ] },
        { heading: 'Brown County', chips: [
          chip('Green Bay', '/wisconsin-recycling/green-bay-recycling/'),
          chip('Green Bay TV Recycling', '/wisconsin-recycling/tv-recycling-green-bay/'),
        ] },
        { heading: 'Outagamie and Calumet Counties', chips: [
          chip('Appleton', '/wisconsin-recycling/appleton-electronic-recycling-center/'),
          chip('Calumet County', '/wisconsin-recycling/calumet-county/'),
        ] },
        { heading: 'Sheboygan, Fond du Lac, Racine and Washington Counties', chips: [
          chip('Sheboygan', '/wisconsin-recycling/sheboygan/'),
          chip('Fond du Lac', '/wisconsin-recycling/fond-du-lac-recycling/'),
          chip('Racine', '/wisconsin-recycling/racine/'),
          chip('Washington County, WI', '/wisconsin-recycling/washington-county-recycling-center/'),
        ] },
      ],
    },
    cta: {
      heading: 'Schedule Your Wisconsin Recycling Pickup',
      body: 'Clear out retired electronics, batteries, lamps, and confidential documents with a scheduled business collection. Tell us what needs recycling, where it is located, and the approximate quantity to receive a quote and confirm the next steps.',
      ...STATE_CTA_BUTTONS,
    },
    mailIn: {
      heading: 'Need Recycling Outside Your Local Area?',
      body: 'Use a prepaid mail-in kit to send eligible materials to Recycle Technologies without arranging an on-site collection. Choose the appropriate kit and check its accepted materials before shipping.',
      button: { label: 'View Mail-In Kits', href: href('/mail-in-recycling/') },
    },
    faqHeading: 'Frequently Asked Questions',
  },
}

/**
 * The facilities in page order. Takes the two records so a component can
 * build the list from `await content('facilities')` (Admin -> Pages edits
 * included); FACILITIES is the same list from the defaults, for code that
 * needs no copy (the lead locator, src/lib/lead-location.ts).
 */
export function facilitiesOf(d: { MINNESOTA: Facility; WISCONSIN: Facility }): Facility[] {
  return [d.MINNESOTA, d.WISCONSIN]
}

export const FACILITIES: Facility[] = facilitiesOf({ MINNESOTA, WISCONSIN })

/** Shared section copy — identical on both frames. */
export const DETAIL_COPY = {
  /** The hero breadcrumb before the state name. */
  crumbs: { home: 'Home', locations: 'Locations' },
  quickInfo: { address: 'Address', phone: 'Phone', hours: 'Hours', cert: 'Certification' },
  directions: {
    heading: 'Getting Here',
    primary: 'Get Directions',
    secondary: 'Call This Location',
  },
  materials: { eyebrow: 'Materials Accepted', heading: 'What This Location Accepts', services: 'All services at this location' },
  steps: { eyebrow: 'What to Expect', heading: 'Dropping Off at This Location' },
  faq: { eyebrow: 'Location FAQ', heading: 'Questions About This Location' },
  /** Section - Counties We Serve (7079:6388, 29 Sep 2026). {state} is the facility's state. */
  counties: {
    eyebrow: 'Counties',
    heading: 'Counties We Serve',
    lead: 'Explore our services across counties throughout {state}. Select a county to learn more about the services available in your area.',
    more: 'Load More',
  },
}

/** The hub's cards section — Figma 6743:2450. */
export const HUB_CARDS = {
  eyebrow: 'Our Locations',
  heading: 'Licensed Facilities Ready to Serve You',
  lead: 'Every location is licensed, staffed, and ready for scheduled drop-offs. Select a facility to see hours, accepted materials, and directions.',
  primary: 'View Location Details',
  secondary: 'Get Directions',
}

/**
 * "Additional Facilities Nationwide" — Figma 6831:2663 on /all-locations/
 * (mobile 6833:3043), added by the designer and built on 24 Sep 2026.
 *
 * Nine partner drop-off sites outside Minnesota and Wisconsin, and since
 * 25 Sep 2026 Chicago, RTI's own service area, which links to its page. They have no
 * pages of their own yet, so the cards link nowhere (Asim, 24 Sep 2026: "only
 * make the cards for it and make it unclickable for now"), and they carry no
 * LocalBusiness schema: RTI does not run these sites itself, and a schema
 * block claiming an address Google cannot tie to RTI does more harm than good.
 * Copy is the frame's, word for word. The mobile frame shortens the lead.
 */
export type NationwideFacility = {
  name: string; address: string; phone: string
  /** Its site in Admin -> Locations (src/data/service-locations.ts); the card links there once published. */
  slug?: string
  /** A page of its own outside Admin -> Locations; the whole card links there. Chicago only. */
  href?: string
  /** The small label at the right of the card header ("Drop-off Location").
   *  Was `tag`, a key Admin -> Pages hides; renamed 27 Sep 2026 so it edits. */
  badge?: string
  /** Its place in the PHONE frame's order, which differs from the board's. */
  phoneOrder: number
}

/* 25 Sep 2026, the redrawn frame (6831:2663 / 6833:3043): every partner card
   is now the partner's own name, street address and phone, and the hours row
   and "Materials Accepted" chips are gone. The card list is in the BOARD's
   order; `phoneOrder` is the phone frame's. */
const nationwide = (
  name: string, address: string, phone: string, phoneOrder: number, slug?: string,
): NationwideFacility => ({ name, address, phone, phoneOrder, slug })

/**
 * The Recycle Technologies logo at the right of every card header in the two
 * sections below — Figma 7174:8085 (the white 96 x 36 box, r5) and 7174:8086
 * (the logo, 84 x 20, centred), added to the frames 1 Oct 2026 (Asim: "add
 * the rti logo in these cards"). The green-wordmark version, not the header's
 * (public/images/logo.png). No phone frame draws it; NationwideFacilities
 * scales the box to the phone header.
 */
const CARD_LOGO = { src: '/images/locations/rti-card-logo.png', alt: 'Recycle Technologies' }

/**
 * "Extended Operations" — its own section above Additional Facilities
 * Nationwide on /all-locations/ (management, via Asim, 30 Sep 2026:
 * "Extended Operations, Chicago card beneath it"). Chicago moved out of the
 * nationwide list into it: it is RTI's own service area, not a partner site.
 * No Figma frame; the section reuses the nationwide heading block and card.
 */
export const EXTENDED = {
  eyebrow: 'Service Area',
  heading: 'Extended Operations',
  lead: 'Beyond our Minnesota and Wisconsin facilities, Recycle Technologies also serves businesses in and around Chicago, Illinois.',
  leadMobile: 'Recycle Technologies also serves businesses in and around Chicago.',
  logo: CARD_LOGO,
  facilities: [
    /* Chicago, Illinois — 6896:15675. The card opens its page,
       /electronic-recycling-chicago/ (src/data/local-pages/). */
    { ...nationwide('Chicago, Illinois', 'Chicago, Illinois', '(800)969-5166 | (800)305-3040', 0),
      href: href('/electronic-recycling-chicago/') }, // no "Drop-off Location" label since 30 Sep 2026 (Asim)
  ] as NationwideFacility[],
}

export const NATIONWIDE = {
  eyebrow: 'Expanding Network',
  heading: 'Additional Facilities Nationwide',
  lead: 'Our network is growing beyond Minnesota and Wisconsin — drop off electronics, batteries, and bulbs at any of these locations.',
  leadMobile: 'Our network is growing beyond Minnesota and Wisconsin.',
  logo: CARD_LOGO,
  /* The board's order (6833:2668), two to a row: Lewisburg · Greenwood /
     Ocala · Johnson City / Atlanta · Ontario / Phoenix · Fort Worth. Chicago
     led the list until 30 Sep 2026, when it moved up to EXTENDED above.

     !! ONTARIO: the board frame's Ontario card repeats Ocala's address and
     phone (a copy and paste slip). The phone frame (6834:2668) has Ontario's
     own, and that is what is used here. */
  facilities: [
    nationwide('Lewisburg, TN',    '1580 Old Columbia Road, Lewisburg, TN 37091',         '(629) 240-1860', 8, 'lewisburg-tn'),
    nationwide('Greenwood, IN',    '498 Park 800 Drive, Greenwood, IN 46143',             '(866) 375-7340', 3, 'greenwood-in'),
    nationwide('Ocala, FL',        '1007 SW 16th Lane, Ocala, FL 34471',                  '(813) 534-5735', 4, 'ocala-fl'),
    nationwide('Johnson City, TN', '300 Boggs Lane, Johnson City, TN 37604',              '(423) 328-9596', 6, 'johnson-city-tn'),
    nationwide('Atlanta, GA',      '3400 Town Point Dr. NW, Suite 130, Kennesaw, GA 30144', '(770) 426-5000', 7, 'atlanta-ga'),
    // Ontario's card opens its own page, like Chicago's (8 Oct 2026).
    { ...nationwide('Ontario, CA', '805 East Francis Street, Ontario, CA 91761', '(888) 923-7252', 1, 'ontario-ca'), href: href('/ontario-california/') },
    nationwide('Phoenix, AZ',      '1545 East Victory Street, Phoenix, AZ 85040',         '(480) 393-5729', 2, 'phoenix-az'),
    nationwide('Fort Worth, TX',   '101 East Bowie Street, Fort Worth, TX 76110',         '(877) 344-8468', 5, 'fort-worth-tx'),
  ],
}
