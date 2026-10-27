import { MAIL_IN } from '@/lib/nav'
import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'

/**
 * THE LOCATION SERVICE PAGES — one service in one place (Asim, 30 Sep 2026:
 * "we have to make all these location pages … these are going to be in url
 * only"). Thirty Figma frame pairs in BVtf2AOuUOcYbiMIlcKmbC, ten services
 * each for Chicago, Minnesota (Blaine) and Wisconsin (New Berlin), drawn from
 * one set of parts: a navy hero, then centred bands of text, bordered cards,
 * a service table and bullet cards, the FAQ, related chips and a gradient CTA.
 *
 * So a page is data: its hero, then its bands in the frame's order, each band
 * a heading over a list of blocks. The one component that draws them is
 * src/components/sections/locations/LocalServicePage.tsx. The copy in each
 * page file is the frame's word for word, except the FAQ answers the frames
 * draw closed (see each file's `todo`).
 *
 * URLs (Asim's choice, "follow existing pattern"): Chicago at
 * /<service>-chicago/, Minnesota at /minnesota-recycling/<service>/,
 * Wisconsin at /wisconsin-recycling/<service>/. Indexed and in the sitemap;
 * nothing in the menus links to them.
 */

export type Link = { label: string; href: string; external?: boolean }

/**
 * A card: bordered, centred; an icon disc, a title and paragraphs, all
 * optional but the text. `n`: the step number the landing pages draw in the
 * teal disc instead of an icon.
 */
export type LocalCard = { icon?: IconName; n?: number; title?: string; body: string[] }

export type LocalBlock =
  /** Centred paragraphs (16/1.65 #474747); `align: 'left'` where the frame sets them left. */
  | { kind: 'text'; body: string[]; align?: 'left' }
  /** A sub-heading inside a band (24px, the Chicago shredding frames). */
  | { kind: 'h3'; text: string }
  /** One full-width card: the "… Is Our Recycling Facility" aside and its kin. */
  | ({ kind: 'card' } & LocalCard)
  /** Rows of cards as the frame groups them. A shorter row keeps the full row's card width, centred. */
  | { kind: 'cards'; rows: LocalCard[][] }
  /** The service table: a teal label column and the value. */
  | { kind: 'info'; rows: { label: string; value: string }[] }
  /** Bordered bullet cards, two to a row (green dot). */
  | { kind: 'bullets'; rows: string[][] }
  /** Pill links (Related Recycling Services). */
  | { kind: 'chips'; links: Link[] }
  /** A single outlined button (the Chicago TV kit link). */
  | { kind: 'button'; link: Link }
  /** Get a Quote (filled) beside Schedule a Pickup (teal outline), under a landing page's steps. */
  | { kind: 'buttons'; primary: Link; secondary: Link }
  /** The landing pages' pickup banner: a mint box, heading and text beside a button. */
  | { kind: 'banner'; heading: string; body: string[]; link: Link }

export type LocalBand = {
  /** Figma node id of the band on the board. */
  figma: string
  /** Absent on the landing pages' pickup banner band. */
  heading?: string
  /** #fcfcfc or white, as the frame draws it; the landing pages' tint is #f4f9f6 (`mint`). */
  grey: boolean
  mint?: boolean
  blocks: LocalBlock[]
}

export type LocalPage = {
  /** The page's own path, with trailing slash. */
  url: string
  /** Board and phone frame ids. */
  figma: { board: string; phone: string }
  seo: { title: string; description: string }
  /** For the JSON-LD Service node. */
  schema: { service: string; areaServed: string[] }
  hero: {
    /** The last crumb; "Home ›" comes first. */
    crumb: string
    h1: string
    body: string[]
    primary: Link
    secondary: Link
  }
  /** The bands before the FAQ, in frame order. */
  bands: LocalBand[]
  faq: { eyebrow: string; heading: string; items: { q: string; a: string }[] }
  /** Bands after the FAQ (Related Recycling Services, when the frame has it). */
  after: LocalBand[]
  cta: {
    heading: string
    body: string[]
    /** The 18px line under the body ("Schedule … | Call …"), when the frame has one. */
    line?: string
    primary: Link
    secondary: Link
    footnote?: string
  }
  /** What the build could not settle from the frames. */
  todo: string[]
}

/**
 * THE LANDING PAGES — the Google Ads pages, redesigned 27 Oct 2026 (Figma
 * BVtf2AOuUOcYbiMIlcKmbC, "New Pages": battery, electronics and light bulbs
 * for Minnesota, Wisconsin and Chicago, plus universal waste for Minnesota
 * and Wisconsin). Every frame is the same run of parts, so a page is data:
 *
 *   hero        photo, breadcrumb, H1, one paragraph, Get a Quote, and the
 *               Request a Quote form beside it
 *   highlights  the four ticked items under the hero
 *   about       heading and paragraphs beside a facility photo
 *   options     cards (two a row, an odd last one centred) and up to two buttons
 *   why         four check cards
 *   items       what we take: cards two a row, an optional line under them
 *   steps       numbered cards, three then two
 *   industries  the photo cards of the shared Industries We Serve band
 *   areas       the line under Areas We Serve (the map is shared)
 *   faq         optional (the Wisconsin frames have none)
 *   cta         gradient band: heading, optional line, Get a Quote, an
 *               optional second button and an optional email line
 *
 * At the ad URLs (/battery-recycling/Wisconsin/ etc.) and, new on 27 Oct,
 * /universal-waste-recycling/Minnesota/ and /Wisconsin/. noindex, not in the
 * sitemap or the menus. Built by
 * src/components/sections/locations/LandingServicePage.tsx.
 */
export type LandingCard = { title: string; body: string }
export type LandingPage = {
  url: string
  figma: { board: string; phone: string }
  seo: { title: string; description: string }
  schema: { service: string; areaServed: string[] }
  /** `image` is the full-bleed background; `photo` the 560 x 420 picture on
   *  the right (28 Oct 2026, where the quote form was). */
  hero: { crumb: string; h1: string; body: string; button: Link; secondary: Link; image: string; photo: string }
  highlights: string[]
  about: { heading: string; body: string[]; image: string }
  options: { heading: string; cards: LandingCard[]; buttons: Link[] }
  why: { heading: string; cards: LandingCard[] }
  items: { heading: string; cards: LandingCard[]; note?: string }
  steps: { heading: string; intro?: string; cards: LandingCard[] }
  industries: { lead: string; cards: { title: string; key: IndustryKey }[] }
  areas: { lead: string }
  certBody?: string
  faq?: { eyebrow: string; heading: string; items: { q: string; a: string }[] }
  cta: { heading: string; body?: string; primary: Link; secondary?: Link; email?: string }
  todo: string[]
}

/** The industry photos the landing frames use (public/images/landing/ind-*.png). */
export type IndustryKey =
  | 'manufacturing' | 'healthcare' | 'automotive' | 'retail' | 'education' | 'government'
  | 'financial' | 'offices' | 'it-operations' | 'warehouses'

export type IconName =
  | 'shield' | 'truck' | 'clock' | 'check' | 'lock' | 'mail'
  | 'factory' | 'file' | 'leaf' | 'phone' | 'pin' | 'users'

/** The card icons, exported from the frames (data/figma-assets.json). */
export const ICON_SRC = (name: IconName) => `/images/locations/local-pages/icons/${name}.svg`

export const QUOTE: Link = { label: 'Get a Quote', href: QUOTE_HREF }
export const PICKUP: Link = { label: 'Schedule a Pickup', href: PICKUP_HREF }
export const tel = (label: string, number: string): Link => ({ label, href: `tel:${number}` })

/** The site pages the Related chips name, by the frames' labels. */
export const SITE_LINK: Record<string, string> = {
  'Mail-In Program': href('/mail-in-recycling/'),
  'All Recycle Technologies Locations': href('/all-locations/'),
  'All Locations': href('/all-locations/'),
  'IT Asset Disposition (ITAD)': href('/it-asset-disposition/'),
}
export const KIT_LINK: Link = { label: MAIL_IN.label, href: MAIL_IN.href, external: true }
