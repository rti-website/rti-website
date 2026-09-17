import { href } from '@/lib/urls'
import type { ServiceMark } from '@/components/ui/ServiceMarks'

/**
 * The service catalogue — ONE source of truth.
 *
 * Consumed by:
 *   /services/   Figma 6142:784 — all three groups stacked, every card visible
 *   /            Figma 6107:1552 — the same groups behind a three-tab switcher
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
   * The designer's line-art PNG. Exactly one of `icon` and `mark` is set: a
   * service with no Figma artwork names a drawn mark instead — see
   * src/components/ui/ServiceMarks.ts.
   */
  icon?: string
  /** Key into SERVICE_MARKS. Menu rows only; a catalogue card needs `icon`. */
  mark?: ServiceMark
  iw: number
  ih: number
  href: string
  external?: boolean
}

/**
 * How one row of cards is laid out. Taken straight off the Figma frames, where
 * the rows genuinely differ: the first row of Recycling stretches to fill,
 * everything else is a fixed width centred in the 1282 column.
 */
export type CardRow = {
  /** Slice of `cards` this row draws. */
  from: number
  to: number
  /** Fixed card width, or null for flex-1. */
  w: number | null
  gap: number
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
  tabIcon: string
  tabW: number
  tabH: number
  cards: ServiceCard[]
  rows: CardRow[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'recycling',
    heading: 'Recycling Services',
    headingH: 60,
    headingW: 345,
    tab: 'Recycling Services',
    tabIcon: '/images/icons/tab-recycling.png',
    tabW: 25,
    tabH: 25,
    cards: [
      { l1: 'Lighting Bulbs', l2: 'Recycling',         blurb: 'Safe recycling of fluorescent, LED, and other bulbs.',   icon: '/images/home/svc-bulbs.png',      iw: 35, ih: 40, href: href('/light-bulbs/') },
      { l1: 'Electronic',     l2: 'Recycling Kit',     blurb: 'Easy collection and recycling of unwanted electronics.', icon: '/images/home/svc-electronics.png', iw: 36, ih: 36, href: href('/electronic-recycle/') },
      { l1: 'Batteries',      l2: 'Recycling Service', blurb: 'Safe collection and recycling of spent batteries.',      icon: '/images/home/svc-batteries.png',  iw: 28, ih: 15, href: href('/battery-recycling/') },
      { l1: 'Ballasts',       l2: 'Recycling',         blurb: 'Proper recycling of PCB and non-PCB ballasts.',          icon: '/images/home/svc-ballasts.png',   iw: 41, ih: 17, href: href('/ballasts/') },
      { l1: 'Television',     l2: 'Recycling',         blurb: 'Responsible recycling of TVs and electronic displays.',  icon: '/images/home/svc-tv.png',         iw: 30, ih: 23, href: href('/tv-recycling/') },
      // Live and linked from the live /services/ page, but absent from Figma
      // 6142:784 — menu only until a card is designed.
      // No Figma card and no Figma icon, so this row borrowed the TELEVISION
      // icon until 16 Sep 2026, when Asim caught it. `mark` names a drawn
      // stroked mark in src/components/ui/ServiceMarks.ts instead; swap it for
      // a real asset the moment Aqeel draws one.
      { l1: 'Airbag',         l2: 'Recycling',         blurb: 'Certified disposal of deployed and undeployed airbags.',  mark: 'airbag',                          iw: 30, ih: 23, href: href('/airbag-recycling/'), menuOnly: true },
    ],
    // Figma draws five cards here, 3 on the first row and 2 on the second.
    // Airbag is menu-only (no card in 6142:784), so it is not in either row.
    rows: [
      { from: 0, to: 3, w: null,     gap: 16 },
      { from: 3, to: 5, w: 416.667,  gap: 16 },
    ],
  },
  {
    id: 'destruction',
    heading: 'Destruction & Shredding',
    headingH: 95,
    headingW: 384,
    tab: 'Destruction & Shredding',
    tabIcon: '/images/icons/tab-destruction.png',
    tabW: 21,
    tabH: 22,
    cards: [
      { l1: 'Hard Drives', l2: 'Destruction', blurb: 'Secure destruction and responsible recycling of hard drives.', icon: '/images/home/svc-harddrive.png', iw: 36, ih: 27, href: href('/hard-drive-destruction-services/') },
      { l1: 'Paper',       l2: 'Shredding',   blurb: 'Secure shredding and recycling of confidential paper.',        icon: '/images/home/svc-paper.png',     iw: 33, ih: 30, href: href('/paper-shredding-services/') },
      { l1: 'Off Site',    l2: 'Shredding',   blurb: 'Convenient off-site shredding for documents and materials.',   icon: '/images/home/svc-offsite.png',   iw: 30, ih: 29, href: href('/off-site-shredding/') },
      // See the conflict note at the top of this file.
      { l1: 'Phone',       l2: 'Shredding',   blurb: 'Off-site destruction of cell phones and mobile devices.',      icon: '/images/home/svc-phone.svg',     iw: 24, ih: 34, href: href('/phone-shredding-service/') },
    ],
    rows: [
      { from: 0, to: 3, w: 416.67, gap: 16 },
      { from: 3, to: 4, w: 416.67, gap: 16 },
    ],
  },
  {
    id: 'programs',
    heading: 'Recycling Programs',
    headingH: 95,
    headingW: 310,
    tab: 'Recycling Programs',
    tabIcon: '/images/icons/tab-programs.png',
    tabW: 29,
    tabH: 20,
    cards: [
      { l1: 'Electronic', l2: 'Recycling Kit', blurb: 'Easy collection and recycling of unwanted electronics.', icon: '/images/home/svc-electronics.png', iw: 36, ih: 36, href: href('/electronic-recycle/') },
      { l1: 'Mail In',    l2: 'Program',       blurb: 'Nationwide mail-in program for eligible materials.',     icon: '/images/home/svc-mailin.png',      iw: 34, ih: 34, href: 'https://ezontheearth.com/', external: true },
      // The new /mail-in-recycling/ page. Every existing "Mail In Program" link
      // still goes to ezontheearth.com — repointing them is Asim's call, so for
      // now the page is reachable from the menu only.
      { l1: 'About the',  l2: 'Mail-In Program', blurb: 'How the nationwide mail-in recycling program works.',   icon: '/images/home/svc-mailin.png',      iw: 34, ih: 34, href: href('/mail-in-recycling/'), menuOnly: true },
    ],
    rows: [
      { from: 0, to: 2, w: 416, gap: 14 },
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
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/** "Don't See Your Item?" teal panel — Figma 6166:2746. */
export const SERVICES_ENQUIRY = {
  heading: 'Don’t See Your Item?',
  sub: 'Reach out to Us!',
  placeholder: 'Enter your email',
  cta: 'Let’s Connect',
}

/** Closing CTA — Figma 6142:1153. */
export const SERVICES_CTA = {
  heading: 'Ready to Recycle Responsibly?',
  body: [
    'Whether you’re a business managing IT asset disposition or an individual looking to recycle old electronics, Recycle Technologies makes it simple, secure, and sustainable.',
    'Find a location near you or ship your items through our Mail-In Program - certified data destruction and environmental impact reporting included.',
  ],
  primary:   { label: 'Find Locations',          href: href('/all-locations/') },
  secondary: { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
}
