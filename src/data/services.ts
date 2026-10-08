import { href, QUOTE_HREF, PICKUP_HREF } from '@/lib/urls'
import type { ServiceMark } from '@/components/ui/ServiceMarks'

/**
 * The service catalogue — ONE source of truth.
 *
 * Consumed by:
 *   /services/   Figma 6142:784 — all three groups stacked, every card visible,
 *                drawn as the homepage's photo cards since 21 Sep 2026 (Asim:
 *                "add the services cards in service page that we add on home")
 *   /            Figma 6532:2049 — the same groups behind vertical tabs
 *   header       the Services dropdown, which is where `icon` is still used
 *
 * Three inputs were reconciled to build this list:
 *   1. Figma 6142:784   — layout, icons, card blurbs
 *   2. the "Our Services" content doc — the authoritative card list
 *   3. www.recycletechnologies.com/services/ — the live URLs, which must not
 *      change. Verified against the live page on 15 Sep 2026.
 *
 * Where the live URL is not what you would guess, that is deliberate:
 *   Electronic Recycling Kit -> /electronic-recycle/        (not -recycling-)
 *   Paper Shredding          -> /paper-shredding-services/  (not -shredding-)
 *
 * !! DESIGN/CONTENT CONFLICT !! Figma draws "Paper Shredding" twice in the
 * Destruction group (nodes 6173:4413 and 6173:4416) and has no fourth card.
 * The content doc lists the fourth as Phone Shredding — "Off-site destruction
 * of cell phones and mobile devices" — and /phone-shredding-service/ exists on
 * the live site. The doc wins: a duplicate card is a design slip, a missing
 * service page is a lost URL. Flag to Aqeel so Figma gets corrected.
 */

export type ServiceCard = {
  /** Card title, line 1 / line 2 — the design hard-breaks it. */
  l1: string
  l2: string
  /**
   * True for a live service the Figma catalogue leaves out. It appears in the
   * header's Services menu but NOT on /services/, so the internal link the live
   * site has is preserved without changing an approved page's layout.
   * Aqeel should add cards for these; then the flag comes off.
   */
  menuOnly?: boolean
  /**
   * True for a service that has no page built yet. Hidden EVERYWHERE — menu,
   * catalogue and homepage tabs — because a card that links to a 404 is worse
   * than a card that is missing. Delete the flag the day the page ships.
   */
  unbuilt?: boolean
  blurb: string
  /**
   * The line the HOMEPAGE card reveals on hover (Figma 6651:2415) — Asim's
   * copy, 23 Sep 2026, verbatim. Separate from `blurb`, which is the
   * /services/ catalogue's and the menu's copy from Figma 6142:784 and does
   * not change with it. Falls back to `blurb` where unset.
   */
  homeBlurb?: string
  /**
   * The designer's line-art PNG. Exactly one of `icon` and `mark` is set: a
   * service with no Figma artwork names a drawn mark instead — see
   * src/components/ui/ServiceMarks.ts.
   */
  icon?: string
  /** Key into SERVICE_MARKS. Menu rows only; a catalogue card needs `icon`. */
  mark?: ServiceMark
  iw: number
  ih: number
  /**
   * The homepage card photo — Figma 6532:2049 draws each service as a 221x270
   * photograph under its title. Stored at 2x (442x540 WebP), cropped exactly
   * as the frame crops it. A card WITHOUT one is not on the homepage: the
   * design has no photo for Phone Shredding, so that card stays on /services/
   * and in the menu until Aqeel supplies one.
   */
  photo?: string
  /**
   * The product cut-out that REPLACED the photo on 28 Sep 2026 (Figma
   * BVtf2AOuUOcYbiMIlcKmbC, /services/ 6142:1559 and the homepage tabs).
   * When set it is drawn instead of `photo`; `photo` stays as the flag that
   * puts the card on the homepage. See ServiceCut.
   */
  cut?: ServiceCut
  href: string
  external?: boolean
}

/**
 * A transparent product shot on a #ddd plate. Desktop: the plate is the old
 * photo's 221x270 box at (20, 84), r14, and `x y w h` is the image box inside
 * it, read off the frame (component 150..159). `crop` is the frame's
 * percentage crop of the picture inside that box (left, top, width, height),
 * where it has one; without it the picture is object-cover in the box.
 * Phone (6605:2369): the plate is the card's full-width 180 band and the image
 * is `pw` x `ph`, centred.
 */
export type ServiceCut = {
  src: string
  x: number; y: number; w: number; h: number
  crop?: [number, number, number, number]
  pw: number; ph: number
}

const CUT = '/images/home'
/* Node ids are the /services/ frame's (6948:11172 ...); the homepage tabs and
   both phone frames draw the same assets at the same sizes. */
const CUTS = {
  bulbs:       { src: `${CUT}/svc-cut-bulbs.png`,       x: 0,     y: 50.93, w: 221,     h: 168, crop: [-9.65, 0, 114.31, 100],          pw: 203, ph: 154 },
  electronics: { src: `${CUT}/svc-cut-electronics.png`, x: -14,   y: 39.93, w: 250,     h: 189,                                          pw: 219, ph: 165 },
  batteries:   { src: `${CUT}/svc-cut-batteries.png`,   x: 20,    y: 43.93, w: 182,     h: 182,                                          pw: 182, ph: 182 },
  ballasts:    { src: `${CUT}/svc-cut-ballasts.png`,    x: 3,     y: 78.93, w: 208,     h: 112,                                          pw: 208, ph: 112 },
  tv:          { src: `${CUT}/svc-cut-tv.png`,          x: 19,    y: 37.93, w: 182,     h: 182,                                          pw: 182, ph: 182 },
  airbag:      { src: `${CUT}/svc-cut-airbag.png`,      x: 62,    y: 21.93, w: 98,      h: 227, crop: [-181.46, -5.01, 468.29, 109.66], pw: 69,  ph: 160 },
  harddrive:   { src: `${CUT}/svc-cut-harddrive.png`,   x: 17.62, y: 76,    w: 187.765, h: 133,                                          pw: 189, ph: 133 },
  paper:       { src: `${CUT}/svc-cut-paper.png`,       x: 8,     y: 32,    w: 206,     h: 206,                                          pw: 206, ph: 206 },
  offsite:     { src: `${CUT}/svc-cut-offsite.png`,     x: 0,     y: 44,    w: 237,     h: 158,                                          pw: 237, ph: 158 },
  phone:       { src: `${CUT}/svc-cut-phone.png`,       x: 9,     y: 62,    w: 204,     h: 146, crop: [-17.21, -15.55, 135.02, 125.63], pw: 204, ph: 146 },
  kit:         { src: `${CUT}/svc-cut-kit.png`,         x: 20,    y: 60,    w: 182,     h: 164, crop: [-12.97, -19.58, 125.95, 139.16], pw: 182, ph: 164 },
  mailin:      { src: `${CUT}/svc-cut-mailin.png`,      x: -30,   y: -12,   w: 282,     h: 282,                                          pw: 236, ph: 236 },
} satisfies Record<string, ServiceCut>

export type ServiceGroup = {
  id: string
  /** Section heading on /services/ — the rule-flanked green title. */
  heading: string
  /** Height of that heading row in Figma. The first one is shorter. */
  headingH: number
  /** Width of the heading text box; the rules take the space that is left. */
  headingW: number
  /** Tab label on the homepage. */
  tab: string
  /** The one-line summary under the tab label — Figma 6533:1968. */
  tabSub: string
  /**
   * The tab's 22px line glyph, once per state: Figma draws the selected tab
   * white on a navy-to-teal gradient and the others teal on white, and an SVG
   * carries its own stroke colour, so each glyph is exported twice.
   */
  tabIconOn: string
  tabIconOff: string
  cards: ServiceCard[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'recycling',
    heading: 'Recycling Services',
    headingH: 60,
    headingW: 345,
    tab: 'Recycling Services',
    tabSub: 'Bulbs, electronics, batteries, TVs & airbags',
    tabIconOn: '/images/icons/tab-recycling-on.svg',
    tabIconOff: '/images/icons/tab-recycling-off.svg',
    cards: [
      /* Renamed 24 Sep 2026 (Asim: "Light Bulbs Recycling", "Battery
         Recycling"), from the frame's "Lighting Bulbs Recycling" and
         "Batteries Recycling Service". Menu, /services/ and the homepage
         all read these two lines. */
      { l1: 'Light Bulbs',    l2: 'Recycling',         blurb: 'Safe recycling of fluorescent, LED, and other bulb types.',   icon: '/images/home/svc-bulbs.png',      iw: 35, ih: 40, photo: '/images/home/svc-photo-bulbs.webp', cut: CUTS.bulbs, href: href('/light-bulbs/'), homeBlurb: 'Safe recycling of fluorescent, LED, and other bulbs.' },
      /* "Kit" dropped from the label on Asim's instruction, 22 Sep 2026. The
         card points at /electronic-recycle/, whose H1 is "Electronics
         Recycling Services" and whose crumb is "Electronic Recycling" — it is
         the service page, not a kit product page, so the label now agrees with
         where it goes. TODO(content): the blurb still describes the kit
         ("Mail-in kit for recycling smaller quantities"), and the Recycling
         Programs group below still carries a second "Electronic Recycling Kit"
         row pointing at this same URL. Both need Asim's call. */
      { l1: 'Electronic',     l2: 'Recycling',         blurb: 'Mail-in kit for recycling smaller quantities of unwanted electronics.', icon: '/images/home/svc-electronics.png', iw: 36, ih: 36, photo: '/images/home/svc-photo-electronics.webp', cut: CUTS.electronics, href: href('/electronic-recycle/'), homeBlurb: 'Easy collection and recycling of unwanted electronics.' },
      { l1: 'Battery',        l2: 'Recycling',         blurb: 'Responsible collection and recycling of spent batteries.',      icon: '/images/home/svc-batteries.png',  iw: 28, ih: 15, photo: '/images/home/svc-photo-batteries.webp', cut: CUTS.batteries, href: href('/battery-recycling/'), homeBlurb: 'Safe collection and recycling of spent batteries.' },
      { l1: 'Ballasts',       l2: 'Recycling',         blurb: 'Proper recycling of PCB and non-PCB lighting ballasts.',          icon: '/images/home/svc-ballasts.png',   iw: 41, ih: 17, photo: '/images/home/svc-photo-ballasts.webp', cut: CUTS.ballasts, href: href('/ballasts/'), homeBlurb: 'Proper recycling of PCB and non-PCB ballasts.' },
      { l1: 'Television',     l2: 'Recycling',         blurb: 'Responsible recycling of CRT, LCD, LED, and plasma TVs.',  icon: '/images/home/svc-tv.png',         iw: 30, ih: 23, photo: '/images/home/svc-photo-tv.webp', cut: CUTS.tv, href: href('/tv-recycling/'), homeBlurb: 'Responsible recycling of TVs and electronic displays.' },
      // On the cards since 30 Sep 2026: the redrawn /services/ frame
      // (6142:784, card 6948:11261) and the homepage tab draw it (Asim: "add
      // the air bag in recycling service and also in home page"). The menu
      // keeps its drawn mark (src/components/ui/ServiceMarks.ts).
      { l1: 'Airbag',         l2: 'Recycling',         blurb: 'Certified disposal of deployed and undeployed airbags.',  mark: 'airbag',                          iw: 30, ih: 23, cut: CUTS.airbag, href: href('/airbag-recycling/'), homeBlurb: 'Certified disposal of deployed and undeployed airbags.' },
    ],
  },
  {
    id: 'destruction',
    heading: 'Destruction & Shredding',
    headingH: 95,
    headingW: 384,
    tab: 'Destruction & Shredding',
    tabSub: 'Paper, hard drives, and mobile shredding',
    tabIconOn: '/images/icons/tab-destruction-on.svg',
    tabIconOff: '/images/icons/tab-destruction-off.svg',
    cards: [
      { l1: 'Hard Drive',  l2: 'Destruction', blurb: 'Secure destruction and recycling of retired hard drives.', icon: '/images/home/svc-harddrive.png', iw: 36, ih: 27, photo: '/images/home/svc-photo-harddrive.webp', cut: CUTS.harddrive, href: href('/hard-drive-destruction-services/'), homeBlurb: 'Secure destruction and responsible recycling of hard drives.' },
      { l1: 'Paper',       l2: 'Shredding',   blurb: 'Secure shredding and recycling of confidential documents.',        icon: '/images/home/svc-paper.png',     iw: 33, ih: 30, photo: '/images/home/svc-photo-paper.webp', cut: CUTS.paper, href: href('/paper-shredding-services/'), homeBlurb: 'Secure shredding and recycling of confidential paper.' },
      { l1: 'On-Site & Off-Site', l2: 'Shredding', blurb: 'Documents shredded at your location, or collected and shredded at our facility.',   icon: '/images/home/svc-offsite.png',   iw: 30, ih: 29, photo: '/images/home/svc-photo-offsite.webp', cut: CUTS.offsite, href: href('/off-site-shredding/'), homeBlurb: 'On-site or off-site shredding for confidential documents.' },
      // Back on the cards 30 Sep 2026 (menu only from 21 Sep): the redrawn
      // /services/ frame draws four Destruction cards (6948:11304), and Asim
      // asked for it "both in home page and in main service page".
      { l1: 'Phone',       l2: 'Shredding',   blurb: 'Off-site destruction of cell phones and mobile devices.',      icon: '/images/home/svc-phone.svg',     iw: 24, ih: 34, cut: CUTS.phone, href: href('/phone-shredding-service/'), homeBlurb: 'Secure shredding and recycling of unwanted phones.' },
    ],
  },
  {
    id: 'programs',
    heading: 'Recycling Programs',
    headingH: 95,
    headingW: 310,
    tab: 'Recycling Programs',
    tabSub: 'Recycling kits and mail-in recycling',
    tabIconOn: '/images/icons/tab-programs-on.svg',
    tabIconOff: '/images/icons/tab-programs-off.svg',
    cards: [
      // In the Services menu's Recycling Programs column, but no card: the
      // 21 Sep 2026 frames draw this group with Mail In Program alone, on the
      // homepage tab (6563:2130) and on /services/ (6142:1688).
      // Its own page since 24 Sep 2026 (the kit doc); it opened the
      // /electronic-recycle/ service page until then.
      // On the cards since 30 Sep 2026 (card 6948:11315 on /services/; Asim:
      // "add the electronic recycling kit service in both the home page
      // services and also in service home page").
      { l1: 'Electronic', l2: 'Recycling Kit', blurb: 'Order online and mail in your unwanted electronics.', icon: '/images/home/svc-electronics.png', iw: 36, ih: 36, photo: '/images/home/svc-photo-electronics.webp', cut: CUTS.kit, href: href('/electronics-recycling-kit/'), homeBlurb: 'Order a kit online and mail in your electronics.' },
      { l1: 'Mail-In',    l2: 'Program',       blurb: 'Countrywide mail-in option for eligible recycling materials.',     icon: '/images/home/svc-mailin.png',      iw: 34, ih: 34, photo: '/images/home/svc-photo-mailin.webp', cut: CUTS.mailin, href: href('/mail-in-recycling/'), homeBlurb: 'Nationwide mail-in program for eligible materials.' },
      // Mail-In Program opens the Mail-In landing page, /mail-in-recycling/
      // (management, 7 Oct 2026: "Homepage > Services > Mail-In Program >
      // Link to the Landing Page"). It went to ezontheearth.com until then;
      // the landing page's own Order a Recycling Kit button still goes to the
      // kit store. This one card feeds the homepage Services tab, the
      // /services/ catalogue and the header's Services menu.
    ],
  },
]

/** Hero — Figma 6142:786. Breadcrumb, H1 and lead, all verbatim. */
export const SERVICES_HERO = {
  crumbs: [
    { label: 'Home', href: href('/') },
    { label: 'Services', href: null },
  ],
  h1: 'Services', // WordPress H1, restored 29 Sep 2026 (RTI-Backup-vs-Live-Audit, Title and H1 changes)
  lead: 'Recycle Technologies has been providing services to the community since 1993. Explore our full range of recycling, destruction, and mail-in programs below.',
}

/*
 * The certifications band's paragraph on /services/ is the shared compliance
 * line, CERT_COPY.body in src/data/certifications.ts (Asim, 24 Sep 2026: the
 * one compliance line on every band). It was a SERVICES_CERT_BODY constant
 * here, a copy of that line; since 27 Sep 2026 the page reads it from the
 * "Certifications (shared)" document instead, so an edit there reaches this
 * page too. To let the page diverge again, add its own paragraph here and
 * pass it as the band's `body`.
 */

/** "Don't See Your Item?" teal panel — Figma 6166:2746. */
export const SERVICES_ENQUIRY = {
  heading: 'Don’t See Your Item?',
  sub: 'Reach out to Us!',
  /** The homepage card's line under the heading (6873:13938, 25 Sep 2026). */
  body: 'Our teams can help if you couldn’t find what you were looking for.',
  placeholder: 'Enter your email',
  cta: 'Let’s Connect',
}

/** Closing CTA — Figma 6142:1153. */
export const SERVICES_CTA = {
  heading: 'Ready to Recycle Responsibly?',
  body: [
    'Whether you’re a business or an individual looking to recycle old electronics, Recycle Technologies makes it simple and secure.',
    'Find a location near you or ship your items through our Mail-In Program, with a Certificate of Recycling provided for your records.',
  ],
  primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
  secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
}

/**
 * The words every service detail page (ServiceDetailPage) writes around its
 * own copy: the breadcrumb, the hero's location picker, the FAQ heading and
 * the "Near You" band. They were typed into the components until 27 Sep 2026;
 * here they are editable under Admin -> Pages -> Services page.
 */
export const SERVICE_PAGE_TEXT = {
  /** Home / Our Services / <service> — the trail on a page without its own. */
  crumbs: { home: 'Home', services: 'Our Services' },
  /** The hero's location picker, beside a single quote button. */
  picker: {
    placeholder: 'Select Your Location',
    options: ['Minnesota', 'Wisconsin', 'Nationwide (Mail-In)'],
  },
  /** The FAQ band's heading block (6146:2417). */
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    lead: 'Recycling helps conserve resources, reduce pollution and support economic sustainability.',
  },
  /** "<Service> Near You" (ServiceLocationsBand); the title is each page's own. */
  nearYou: {
    eyebrow: 'Near You',
    lead: 'Address, hours, what each site accepts and how to get a quote.',
    allLocations: 'See all locations and the Mail-In Program',
  },
}
