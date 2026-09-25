import { FACILITIES as CONTACT } from '@/data/contact'
import type { CtaContent } from '@/components/sections/ClosingCta'
import { href } from '@/lib/urls'
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

export type Material = { label: string; icon: string }

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
  hero: { h1: string; lead: string; leadShort: string }
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
  cert: { status: string; badge: string }
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
  electronics: { label: 'Electronics',            icon: '/images/locations/mat-electronics.svg' },
  batteries:   { label: 'Batteries',              icon: '/images/locations/mat-batteries.svg' },
  bulbs:       { label: 'Light Bulbs',            icon: '/images/locations/mat-bulbs.svg' },
  ballasts:    { label: 'Ballasts',               icon: '/images/locations/mat-ballasts.svg' },
  tv:          { label: 'TV Recycling',           icon: '/images/locations/mat-tv.svg' },
  paper:       { label: 'Paper Shredding',        icon: '/images/locations/mat-paper.svg' },
  hardDrive:   { label: 'Hard Drive Destruction', icon: '/images/locations/mat-harddrive.svg' },
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

function faqs(town: string, phone: string): Facility['faqs'] {
  return [
    {
      q: `Do I need an appointment to drop off at the ${town} facility?`,
      a: `Drop-off requirements vary by material and quantity. Call ${phone} before you visit to confirm what you are bringing is accepted and whether a time needs to be arranged — large or commercial loads in particular go faster when the loading area is expecting you.`,
    },
    {
      q: 'Is there a fee for dropping off at this location?',
      a: `Fees depend on the material and the quantity. Call ${phone} with a description of what you plan to bring and we will confirm any charges before you make the trip.`,
    },
    {
      q: 'Can businesses schedule a bulk pickup from this facility?',
      a: `Yes. Business pickups are available within roughly a 100-mile radius of the facility. Pickup arrangements depend on the materials, quantity, location and service required — request a quote to get started.`,
    },
  ]
}

export const MINNESOTA: Facility = {
  slug: 'minnesota-recycling',
  url: '/minnesota-recycling/',
  state: 'Minnesota',
  town: 'Blaine',
  name: MN_CONTACT.name,
  /* Verbatim from the live page, captured 22 Sep 2026. */
  liveSeo: {
    title: 'Recycling Center in Minnesota | Call (800) 969-5166',
    description: 'Recycling center in Minnesota handling electronics, batteries, lamps, paper, and secure material processing for businesses and facilities. Call (800) 969-5166.',
  },
  liveH1: 'Recycling Center in Minnesota',
  hero: {
    h1: 'Minnesota Facility',
    lead: '1525 99th Ln NE, Blaine, Minnesota 55449, R2v3 Certified',
    leadShort: '1525 99th Ln NE, Blaine, MN, R2v3 Certified',
  },
  address: MN_CONTACT.address,
  addressShort: '1525 99th Ln NE, Blaine, MN',
  cardAddress: '1525 99th Ln NE, Blaine, MN 55449', // 6744:2472, 25 Sep 2026
  phone: MN_CONTACT.phone,
  email: MN_CONTACT.email,
  hours: 'Mon–Fri 8:30 AM–4:30 PM · 2nd & 4th Sat 9 AM–1 PM', // FRAME — unconfirmed
  hoursShort: 'Mon–Fri 8:30 AM–4:30 PM',                        // FRAME — unconfirmed
  cert: { status: 'R2v3 Certified', badge: 'R2v3 Certified' },
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
  faqs: faqs('Blaine', MN_CONTACT.phone),
  cta: {
    heading: 'Ready to Bring Materials to Blaine?',
    body: 'Schedule a commercial pickup, plan your drop-off, or explore our nationwide Mail-In Program if Blaine isn’t convenient.',
    primary:   { label: 'Schedule a Pickup',  href: href('/request-a-pickup/') },
    secondary: { label: 'See All Locations',  href: href('/all-locations/') },
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
    title: 'Recycling in Wisconsin | Call (800) 969-5166',
    description: 'Recycling Wisconsin for electronics, computers, lamps, batteries, televisions, and devices, accepted through documented intake and processing procedures. Call (800) 969-5166.',
  },
  liveH1: 'Recycling in Wisconsin',
  hero: {
    h1: 'Wisconsin Facility',
    lead: '2815 South 171st Street, New Berlin, WI 53151, Pursuing R2v3',
    leadShort: '2815 South 171st Street, New Berlin, WI, Pursuing R2v3',
  },
  address: WI_CONTACT.address,
  addressShort: '2815 South 171st Street, New Berlin, WI',
  phone: WI_CONTACT.phone,
  email: WI_CONTACT.email,
  hours: 'Mon–Fri 8:00 AM–4:30 PM',      // FRAME — unconfirmed
  hoursShort: 'Mon–Fri 8:00 AM–4:30 PM', // FRAME — unconfirmed
  /* "Pursuing", not "Certified" — the one fact on these pages the site is
     sure of. See the note in claude/why-choose-us-page.md. */
  cert: { status: 'Pursuing R2v3', badge: 'Pursuing R2v3' },
  /* !! The card no longer says "Pursuing R2v3" — Asim, 23 Sep 2026, swapped
     the pill for the NAID AAA badge. The status still shows on the facility
     page itself (quick-info bar and hero lead). The NAID AAA claim carries
     the compliance note in src/data/certifications.ts. */
  // R2v3 on the Wisconsin card too, NAID AAA logo removed (Asim, 24 Sep 2026).
  badgeLogo: { src: '/images/home/stat-r2.png', alt: 'R2v3 certified', w: 38, h: 40, href: R2_DIRECTORY },
  mapLabel: 'New Berlin, WI',
  mapsHref: maps(WI_CONTACT.address),
  materialsLead: 'The New Berlin, Wisconsin facility currently accepts electronics, batteries, TVs, and paper shredding, with more services expanding as R2v3 certification is finalized.',
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
  faqs: faqs('New Berlin', WI_CONTACT.phone),
  cta: {
    heading: 'Ready to Bring Materials to New Berlin?',
    body: 'Schedule a commercial pickup, plan your drop-off, or explore our nationwide Mail-In Program if New Berlin isn’t convenient.',
    primary:   { label: 'Schedule a Pickup',  href: href('/request-a-pickup/') },
    secondary: { label: 'See All Locations',  href: href('/all-locations/') },
  },
}

export const FACILITIES: Facility[] = [MINNESOTA, WISCONSIN]

/** Shared section copy — identical on both frames. */
export const DETAIL_COPY = {
  quickInfo: { address: 'Address', phone: 'Phone', hours: 'Hours', cert: 'Certification' },
  directions: {
    heading: 'Getting Here',
    primary: 'Get Directions',
    secondary: 'Call This Location',
  },
  materials: { eyebrow: 'Materials Accepted', heading: 'What This Location Accepts' },
  steps: { eyebrow: 'What to Expect', heading: 'Dropping Off at This Location' },
  faq: { eyebrow: 'Location FAQ', heading: 'Questions About This Location' },
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
  /** The small label at the right of the card header ("Drop-off Location"). */
  tag?: string
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

export const NATIONWIDE = {
  eyebrow: 'Expanding Network',
  heading: 'Additional Facilities Nationwide',
  lead: 'Our network is growing beyond Minnesota and Wisconsin — drop off electronics, batteries, and bulbs at any of these locations.',
  leadMobile: 'Our network is growing beyond Minnesota and Wisconsin.',
  /* The board's order (6833:2668), two to a row: Chicago · Lewisburg /
     Greenwood · Ocala / Johnson City · Atlanta / Ontario · Phoenix / Fort
     Worth. Fort Worth (RTI) left the frame on 25 Sep 2026.

     !! ONTARIO: the board frame's Ontario card repeats Ocala's address and
     phone (a copy and paste slip). The phone frame (6834:2668) has Ontario's
     own, and that is what is used here. */
  facilities: [
    /* Chicago, Illinois — 6896:15675. RTI's own service area, not a partner
       site and not a facility, so its address is the city; the card opens its
       page, /electronic-recycling-chicago/ (src/data/chicago.ts). */
    { ...nationwide('Chicago, Illinois', 'Chicago, Illinois', '(800)969-5166 | (800)305-3040', 0),
      href: href('/electronic-recycling-chicago/'), tag: 'Drop-off Location' },
    nationwide('Lewisburg, TN',    'Lighting Resources, 1580 Old Columbia Road, Lewisburg, TN 37091',         '(629) 240-1860', 8, 'lewisburg-tn'),
    nationwide('Greenwood, IN',    'Lighting Resources, 498 Park 800 Drive, Greenwood, IN 46143',             '(866) 375-7340', 3, 'greenwood-in'),
    nationwide('Ocala, FL',        'Lighting Resources, 1007 SW 16th Lane, Ocala, FL 34471',                  '(813) 534-5735', 4, 'ocala-fl'),
    nationwide('Johnson City, TN', 'Lighting Resources, 300 Boggs Lane, Johnson City, TN 37604',              '(423) 328-9596', 6, 'johnson-city-tn'),
    nationwide('Atlanta, GA',      'Lighting Resources, 3400 Town Point Dr. NW, Suite 130, Kennesaw, GA 30144', '(770) 426-5000', 7, 'atlanta-ga'),
    nationwide('Ontario, CA',      'Lighting Resources, 805 East Francis Street, Ontario, CA 91761',          '(888) 923-7252', 1, 'ontario-ca'),
    nationwide('Phoenix, AZ',      'Lighting Resources, 1545 East Victory Street, Phoenix, AZ 85040',         '(480) 393-5729', 2, 'phoenix-az'),
    nationwide('Fort Worth, TX',   'Lighting Resources, 101 East Bowie Street, Fort Worth, TX 76110',         '(877) 344-8468', 5, 'fort-worth-tx'),
  ],
}
