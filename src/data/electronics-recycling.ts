import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /electronic-recycle/ — all page copy.
 *
 * Content: the "Electronics Recycling" doc (Google Docs 116mvpXBZ...), which is
 * the authoritative source. Where Figma 6142:2048 still carries placeholder
 * text from the old site, the doc wins.
 * Geometry: Figma 6142:2048.
 * URL: the LIVE url, /electronic-recycle/ — note the live site uses
 * "-recycle", not "-recycling". Verified 15 Sep 2026.
 */

/* ------------------------------------------------------------------ SEO --
 * !! CONFLICT !! The content doc proposes new metadata (below, as
 * PROPOSED_SEO). The migration plan and CLAUDE.md rule 6 say titles and
 * descriptions ship VERBATIM from the live site at launch and are rewritten in
 * the second wave, after rankings settle. So the live values are what build,
 * and the doc's are parked here so the swap is a one-line change once Rizwan
 * signs off.
 */
export const LIVE_SEO = {
  title: 'Commercial Electronic Recycling | Call (800) 969-5166 Today',
  description:
    'Commercial electronics recycling for businesses, offices & facilities. Recycle computers, servers, monitors & more with reliable e-waste pickup.',
}

export const PROPOSED_SEO = {
  title: 'Electronics Recycling Services | Recycle Technologies',
  description:
    'Recycle Technologies recycles computers, laptops, monitors, and office electronics '
    + 'for businesses in Minnesota and Wisconsin, plus nationwide mail-in recycling.',
}

/* ----------------------------------------------------------------- hero --
 * !! H1 CONFLICT !! Live H1 is "Electronic Recycling"; Figma and the doc both
 * say "Electronics Recycling Services". Built as designed — same call as the
 * homepage and /services/, so all three H1 changes surface as one decision at
 * gate 2 rather than three.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',         href: href('/') },
    { label: 'Our Services', href: href('/services/') },
    { label: 'Electronic Recycling', href: null },
  ],
  h1: 'Electronics Recycling Services',
  lead:
    'Recycle Technologies collects and processes electronics for businesses and '
    + 'organizations, breaking devices down into their base materials instead of '
    + 'sending them to a landfill.',
  pickerPlaceholder: 'Select Your Location',
  pickerOptions: ['Minnesota', 'Wisconsin', 'Nationwide (Mail-In)'],
  cta: { label: 'Get Started', href: QUOTE_HREF },
}

/* ---------------------------------------------------- what's electronics --
 * Figma 6197:4463 — text left, photo right, on #f8faf9.
 */
export const INTRO = {
  heading: 'What’s Electronics Recycling?',
  body: [
    'Electronics recycling is the process of collecting used or unwanted electronic devices '
    + 'and breaking them down so their materials can be reused instead of thrown away. '
    + 'Computers, monitors, printers, and similar equipment contain metals, plastics, glass, '
    + 'and circuit boards that can be recovered and put back into use rather than buried in a '
    + 'landfill, where components can release contaminants into the surrounding soil and water '
    + 'over time.',
    'At Recycle Technologies, electronics are reduced to their base materials: plastic, wire, '
    + 'circuit boards, metals, and glass. Plastic and wiring are shredded and sent to molders '
    + 'and smelters. Monitors go through a decontamination step that removes lead before the '
    + 'unit is recycled.',
    'Circuit boards are sorted so the metals and minerals inside them can be collected. '
    + 'Recycle Technologies has provided these services since 1993 and operates licensed '
    + 'facilities in Minnesota and Wisconsin.',
    'Handling electronics this way keeps devices out of the waste stream and gives businesses '
    + 'a documented way to retire old equipment.',
  ],
  more: { label: 'Read More', href: '#how-we-recycle' },
  image: '/images/services/detail-intro.png',
}

/* --------------------------------------------------------- what we accept --
 * Figma 6142:2067. The design fills the grid with six numbered steps
 * (01 · ORDER … 06 · RETRIEVE) borrowed from an ITAD deployment component —
 * placeholder, not content. The doc gives four equipment categories, which is
 * what the "What We Accept" heading above the grid actually calls for, so the
 * grid runs two rows instead of three. The band is justify-center in Figma, so
 * the shorter content simply centres and the band keeps its height.
 */
export const ACCEPT = {
  heading: 'What We Accept',
  intro:
    'Recycle Technologies accepts a broad range of electronic and computer-related equipment. '
    + 'If you’re not sure whether an item qualifies, call the location nearest you to '
    + 'confirm before scheduling.',
  items: [
    /* Added 22 Sep 2026 from the redrawn frame (6695:5812). Asim: this row is
       for THIS page only — every other service and industry page keeps the
       list its own doc gives it, and only the row DESIGN is shared. */
    { label: 'General E-Waste',           text: 'Cables, switches, chargers, keyboards, mice, remotes, microwaves, televisions, and other everyday electronic items.' },
    { label: 'Computers & Laptops',       text: 'Desktops, laptops, and servers.' },
    { label: 'Monitors & Displays',       text: 'Monitors, including CRT units.' },
    { label: 'Office & Imaging Equipment',text: 'Fax machines, printers, scanners, and copiers.' },
    { label: 'Phones & Small Electronics',text: 'Cell phones, keyboards, cables, mice, microwaves, and televisions (no restrictions).' },
  ],
  outro:
    'Recycle Technologies also handles related electronic scrap on a case-by-case basis, so if '
    + 'your equipment isn’t listed here, reach out and describe what you need to recycle.',
}

/* ------------------------------------------------------ how we recycle it --
 * Figma 6173:4386 — photo left (full-bleed to the canvas edge), text right.
 */
export const PROCESS = {
  id: 'how-we-recycle',
  heading: 'How Do We Recycle Electronics?',
  intro:
    'Electronics can enter the recycling process through a business pickup, a drop-off at a '
    + 'Recycle Technologies location, or the mail-in program, depending on what fits your '
    + 'situation. From there, equipment goes through a consistent set of steps before it '
    + 'leaves the facility as recovered material.',
  steps: [
    { label: 'Collection.',         text: 'Businesses can schedule a pickup, and residential customers can drop equipment at a nearby location or order a mail-in recycling kit for items shipped from anywhere in the country.' },
    { label: 'Sorting and storage.',text: 'Incoming electronics are grouped by type ahead of processing.' },
    { label: 'Dismantling.',        text: 'Devices are broken down so individual components and materials can be separated from one another.' },
    { label: 'Separation.',         text: 'Plastic and wiring are separated out for shredding, monitors go through lead decontamination, and circuit boards are sorted from the rest of the unit.' },
    { label: 'Recovery.',           text: 'Shredded plastic and wire are sent to molders and smelters, and the metals and minerals sorted out of circuit boards are collected for reuse.' },
  ],
  outro:
    'Not every device follows an identical path through the facility, since equipment types '
    + 'vary, but this is the general process electronics go through once they arrive.',
  image: '/images/services/detail-process.png',
}

/* -------------------------------------------------------------------- FAQ --
 * Figma 6146:2417 carries the homepage's generic questions. The doc supplies
 * five electronics-specific ones WITH answers — the first real FAQ answers in
 * the build, so the accordion now renders them instead of a TODO.
 */
export const FAQS = [
  {
    q: 'What electronics does Recycle Technologies accept?',
    a: 'Computers, laptops, servers, monitors, printers, copiers, phones, and related equipment. Call ahead if you’re unsure about a specific item.',
  },
  {
    q: 'Can individuals schedule a pickup?',
    a: 'Pickup service is available exclusively to business customers. Individuals can use a drop-off location or the mail-in program instead.',
  },
  {
    q: 'What happens to my electronics after they’re collected?',
    a: 'Devices are dismantled and separated into materials such as plastic, wire, metals, glass, and circuit boards, which are then sent on for recycling or recovery.',
  },
  {
    q: 'What if there isn’t a Recycle Technologies location near me?',
    a: 'The mail-in program lets you order a recycling kit and ship your electronics in from anywhere in the country.',
  },
  {
    q: 'Is Recycle Technologies certified?',
    a: 'Its Blaine, Minnesota facilities hold active R2v3 certification. The New Berlin, Wisconsin facility has R2v3 certification pending.',
  },
]

export const FAQ_INTRO = {
  eyebrow: 'FAQs',
  heading: 'Frequently Asked Questions',
  lead: 'Recycling helps conserve resources, reduce pollution and support economic sustainability.',
}

/* ------------------------------------------------------------ closing CTA --
 * Figma 6146:2431 repeats the /services/ paragraph; the doc has a version
 * written for this page, which is what ships.
 */
export const CTA = {
  heading: 'Ready to Recycle Responsibly?',
  body: [
    'Whether you’re a business retiring old IT equipment or an individual clearing out a '
    + 'closet, Recycle Technologies can help you recycle it properly. Businesses can schedule '
    + 'a pickup or get a quote; individuals can find a drop-off location or start a mail-in kit.',
  ],
  primary:   { label: 'Find Locations',          href: href('/dropoff/') },
  secondary: { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
}

/**
 * The page object the shared ServiceDetailPage renders. The constants above are
 * kept as the readable source; this just assembles them into the common shape
 * every service page uses.
 */
export const CONTENT: ServicePageContent = {
  url: '/electronic-recycle/',
  liveSeo: LIVE_SEO,
  proposedSeo: PROPOSED_SEO,
  hero: { crumb: 'Electronic Recycling', h1: HERO.h1, lead: HERO.lead, cta: HERO.cta,
          image: '/images/services/hero-electronics.png' },
  intro: INTRO,
  accept: ACCEPT,
  process: PROCESS,
  faqs: FAQS,
  cta: CTA,
}
