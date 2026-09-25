import { href } from '@/lib/urls'
import { CERT_COPY } from '@/data/certifications'
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
  href: string
  external?: boolean
}

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
    tabSub: 'Bulbs, electronics, batteries, TVs & ballasts',
    tabIconOn: '/images/icons/tab-recycling-on.svg',
    tabIconOff: '/images/icons/tab-recycling-off.svg',
    cards: [
      /* Renamed 24 Sep 2026 (Asim: "Light Bulbs Recycling", "Battery
         Recycling"), from the frame's "Lighting Bulbs Recycling" and
         "Batteries Recycling Service". Menu, /services/ and the homepage
         all read these two lines. */
      { l1: 'Light Bulbs',    l2: 'Recycling',         blurb: 'Safe recycling of fluorescent, LED, and other bulb types.',   icon: '/images/home/svc-bulbs.png',      iw: 35, ih: 40, photo: '/images/home/svc-photo-bulbs.webp', href: href('/light-bulbs/'), homeBlurb: 'Safe recycling of fluorescent, LED, and other bulbs.' },
      /* "Kit" dropped from the label on Asim's instruction, 22 Sep 2026. The
         card points at /electronic-recycle/, whose H1 is "Electronics
         Recycling Services" and whose crumb is "Electronic Recycling" — it is
         the service page, not a kit product page, so the label now agrees with
         where it goes. TODO(content): the blurb still describes the kit
         ("Mail-in kit for recycling smaller quantities"), and the Recycling
         Programs group below still carries a second "Electronic Recycling Kit"
         row pointing at this same URL. Both need Asim's call. */
      { l1: 'Electronic',     l2: 'Recycling',         blurb: 'Mail-in kit for recycling smaller quantities of unwanted electronics.', icon: '/images/home/svc-electronics.png', iw: 36, ih: 36, photo: '/images/home/svc-photo-electronics.webp', href: href('/electronic-recycle/'), homeBlurb: 'Easy collection and recycling of unwanted electronics.' },
      { l1: 'Battery',        l2: 'Recycling',         blurb: 'Responsible collection and recycling of spent batteries.',      icon: '/images/home/svc-batteries.png',  iw: 28, ih: 15, photo: '/images/home/svc-photo-batteries.webp', href: href('/battery-recycling/'), homeBlurb: 'Safe collection and recycling of spent batteries.' },
      { l1: 'Ballasts',       l2: 'Recycling',         blurb: 'Proper recycling of PCB and non-PCB lighting ballasts.',          icon: '/images/home/svc-ballasts.png',   iw: 41, ih: 17, photo: '/images/home/svc-photo-ballasts.webp', href: href('/ballasts/'), homeBlurb: 'Proper recycling of PCB and non-PCB ballasts.' },
      { l1: 'Television',     l2: 'Recycling',         blurb: 'Responsible recycling of CRT, LCD, LED, and plasma TVs.',  icon: '/images/home/svc-tv.png',         iw: 30, ih: 23, photo: '/images/home/svc-photo-tv.webp', href: href('/tv-recycling/'), homeBlurb: 'Responsible recycling of TVs and electronic displays.' },
      // Live and linked from the live /services/ page, but absent from Figma
      // 6142:784 — menu only until a card is designed.
      // No Figma card and no Figma icon, so this row borrowed the TELEVISION
      // icon until 16 Sep 2026, when Asim caught it. `mark` names a drawn
      // stroked mark in src/components/ui/ServiceMarks.ts instead; swap it for
      // a real asset the moment Aqeel draws one.
      { l1: 'Airbag',         l2: 'Recycling',         blurb: 'Certified disposal of deployed and undeployed airbags.',  mark: 'airbag',                          iw: 30, ih: 23, href: href('/airbag-recycling/'), menuOnly: true },
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
      { l1: 'Hard Drive',  l2: 'Destruction', blurb: 'Secure destruction and recycling of retired hard drives.', icon: '/images/home/svc-harddrive.png', iw: 36, ih: 27, photo: '/images/home/svc-photo-harddrive.webp', href: href('/hard-drive-destruction-services/'), homeBlurb: 'Secure destruction and responsible recycling of hard drives.' },
      { l1: 'Paper',       l2: 'Shredding',   blurb: 'Secure shredding and recycling of confidential documents.',        icon: '/images/home/svc-paper.png',     iw: 33, ih: 30, photo: '/images/home/svc-photo-paper.webp', href: href('/paper-shredding-services/'), homeBlurb: 'Secure shredding and recycling of confidential paper.' },
      { l1: 'Off-Site',    l2: 'Shredding',   blurb: 'Documents are collected and securely shredded at our facility.',   icon: '/images/home/svc-offsite.png',   iw: 30, ih: 29, photo: '/images/home/svc-photo-offsite.webp', href: href('/off-site-shredding/'), homeBlurb: 'Convenient off-site shredding for documents and materials.' },
      // See the conflict note at the top of this file. Menu only since
      // 21 Sep 2026: the redrawn /services/ frame (6142:1559 in file
      // drzg9BI08Dy8eWZNBfXBzD) draws three Destruction cards, and Asim asked
      // for this one taken off the page ("remove this one"). The page itself
      // stays live and the header menu still links it.
      { l1: 'Phone',       l2: 'Shredding',   blurb: 'Off-site destruction of cell phones and mobile devices.',      icon: '/images/home/svc-phone.svg',     iw: 24, ih: 34, href: href('/phone-shredding-service/'), menuOnly: true, homeBlurb: 'Secure shredding and recycling of unwanted phones.' },
    ],
  },
  {
    id: 'programs',
    heading: 'Recycling Programs',
    headingH: 95,
    headingW: 310,
    tab: 'Recycling Programs',
    tabSub: 'Mail-in kits, drop-off, and airbag disposal',
    tabIconOn: '/images/icons/tab-programs-on.svg',
    tabIconOff: '/images/icons/tab-programs-off.svg',
    cards: [
      // In the Services menu's Recycling Programs column, but no card: the
      // 21 Sep 2026 frames draw this group with Mail In Program alone, on the
      // homepage tab (6563:2130) and on /services/ (6142:1688).
      // Its own page since 24 Sep 2026 (the kit doc); it opened the
      // /electronic-recycle/ service page until then.
      { l1: 'Electronic', l2: 'Recycling Kit', blurb: 'Order online and mail in your unwanted electronics.', icon: '/images/home/svc-electronics.png', iw: 36, ih: 36, photo: '/images/home/svc-photo-electronics.webp', href: href('/electronics-recycling-kit/'), menuOnly: true },
      { l1: 'Mail-In',    l2: 'Program',       blurb: 'Countrywide mail-in option for eligible recycling materials.',     icon: '/images/home/svc-mailin.png',      iw: 34, ih: 34, photo: '/images/home/svc-photo-mailin.webp', href: 'https://ezontheearth.com/', external: true, homeBlurb: 'Nationwide mail-in program for eligible materials.' },
      // "About the Mail-In Program" (/mail-in-recycling/) came out of the
      // menu on 25 Sep 2026 — Asim: "remove the about mail in program from
      // here, just keep the page". The page stays, and the industry pages'
      // Mail-In Program rows still link it.
    ],
  },
]

/** Hero — Figma 6142:786. Breadcrumb, H1 and lead, all verbatim. */
export const SERVICES_HERO = {
  crumbs: [
    { label: 'Home', href: href('/') },
    { label: 'Services', href: null },
  ],
  h1: 'Our Services',
  lead: 'Recycle Technologies has been providing services to the community since 1993. Explore our full range of recycling, destruction, and mail-in programs below.',
}

/**
 * The certifications band's paragraph on /services/. It had its own wording
 * from the "Our Services" doc (21 Sep 2026); since 24 Sep 2026 Asim wants the
 * one compliance line on every band, so this now matches CERT_COPY.body. Kept
 * as a separate constant so the page can diverge again without touching the
 * shared copy.
 */
export const SERVICES_CERT_BODY = CERT_COPY.body

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
  primary:   { label: 'Find Locations',          href: href('/all-locations/') },
  secondary: { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
}
