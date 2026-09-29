import { href } from '@/lib/urls'

/**
 * The city service pages — one service in one city, from the Figma file
 * BVtf2AOuUOcYbiMIlcKmbC (27 Sep 2026, Asim: "make all these pages … only
 * available through urls, not directly from website"). Eight pages share one
 * component (src/components/sections/locations/CityServicePage.tsx) and one
 * shape, this file. A page fills in the sections it has; the component draws
 * them in the order the frames do and skips the rest.
 *
 * Two families of frame:
 *
 *   SERVICE AREA (Chicago). No facility: an opening, an intro with the
 *   "Chicago Is a Service Area, Not a Facility" aside, a service table, what
 *   we accept, a Businesses card, a Residents paragraph, four steps, four
 *   Why cards, a local law note, FAQ, related links, CTA.
 *
 *   FACILITY (Blaine, New Berlin). An opening, a service table with the
 *   address and hours, what we accept, three to five steps, three Recycling
 *   Options cards, a local information note, a boxed Why list, FAQ, related
 *   links, CTA.
 *
 * Every string is the frame's word for word except the FAQ answers (drawn
 * closed in Figma; see each file's `todo`) and the SEO title / description
 * (the frames give none).
 */

export type Crumb = { label: string; href: string | null }
export type Link = { label: string; href: string }
export type Phone = { label: string; tel: string }

/**
 * The page's sections by key, for `bands`: which ones sit on the #fcfcfc
 * grey. The revised frames (27 Sep 2026) no longer strictly alternate.
 */
export type SectionKey = 'opening' | 'intro' | 'info' | 'accept' | 'biz' | 'res' | 'steps' | 'whycards' | 'options' | 'local' | 'whybox' | 'faq' | 'related'

export type CityPage = {
  /** The page's own path, with trailing slash. */
  url: string
  /** Figma node ids, board then phone. */
  figma: { board: string; phone: string }
  seo: { title: string; description: string }
  /** For the JSON-LD Service node. */
  schema: { service: string; areaServed: string[] }

  hero: {
    h1: string
    crumbs: Crumb[]
    image: string
    /**
     * The 20% grey veil over the photo. On by default; the photos the
     * designer swapped in on 28 Sep 2026 (the batteries shot) are drawn
     * without it, so those pages set `veil: false`.
     */
    veil?: boolean
    /**
     * Where the photo sits on the phone, in hero pixels (the hero is 390x276).
     * Without it the photo is 730x411 centred, as first drawn. The revised
     * frames place it by its layer: the batteries shot is 878x494 at
     * (-223, -108), under a green wash 505 wide from x-6 and no navy.
     * `washWidth` when the frame's green is not 505 wide (the electronics
     * frames keep the 1127 wide wash from x-62).
     */
    phone?: { width: number; height: number; left: number; top: number; washLeft: number; washWidth?: number }
    /**
     * Under the H1. The revised phone frames (27 Sep 2026) draw it too, as a
     * smaller button, sometimes with a shorter label (`phoneLabel`).
     */
    button?: Link & { phoneLabel?: string }
  }

  /** Section - Opening. The first paragraph is the lead when there are several. */
  opening: string[]

  /** Section - Services Intro (service-area pages): heading, paragraphs, the aside box. */
  intro?: { heading: string; body: string[]; aside: { heading: string; body: string[] } }

  /** Section - Service Info. A row's value is text, or phone numbers drawn as tel: links. */
  serviceInfo: {
    heading: string
    rows: { label: string; value: string | Phone[] }[]
    /** The revised table (27 Sep 2026): a 260 label column and 40px rows, centred, 14 apart. */
    compact?: boolean
  }

  /**
   * Section - What We Accept. `cards`: tinted cards with a tile icon (a
   * final `wide` card spans the row, as the electronics pages draw Phones);
   * `pills`: titled groups of pill chips (Chicago light bulbs); `list`: the
   * centred teal lines of the Blaine / New Berlin light bulb pages.
   */
  accept: {
    heading: string
    lead: string
    layout: 'cards' | 'pills' | 'list'
    items?: { icon: string; title: string; text?: string; wide?: boolean }[]
    groups?: { title: string; items: string[] }[]
    list?: string[]
    note: string
  }

  /** Section - Businesses (service-area pages): the bordered card. */
  businesses?: { heading: string; intro: string; subLead?: string; points: string[]; outro: string[] }

  /** Section - Residents (service-area pages). */
  residents?: { heading: string; body: string[]; link?: Link }

  /** Section - How It Works. A step's text can be two paragraphs. */
  steps: {
    heading: string
    items: { title: string; text: string | string[] }[]
    /** Arrows between the cards, as most frames draw. */
    arrows: boolean
    footnote?: string
  }

  /** Section - Why Recycle Technologies as 2 x 2 cards (service-area pages). */
  whyCards?: { heading: string; items: { icon: string; title: string; text: string }[] }

  /** Section - Recycling Options (facility pages): three cards, or two and one centred. */
  options?: { heading: string; items: { icon: string; title: string; text: string }[]; layout: 'three' | 'two-one' }

  /** Section - Local Law / Local Recycling Information. */
  local: {
    heading: string
    body: string[]
    /** Board text width: 1078 unless the frame sets it (1000, or 900 for the light bulb pages). */
    width?: number
  }

  /** Section - Why Recycle Technologies as a boxed bullet list (facility pages). */
  whyBox?: { heading: string; intro?: string; points: string[] }

  /** The FAQ band's pill and heading, the same on every frame (FAQ_HEAD). */
  faqHead: { eyebrow: string; heading: string }
  faqs: { q: string; a: string }[]
  related: {
    heading: string
    links: Link[]
    /** Chips the phone frame leaves out, by label (the light bulb pages drop Mail-In Program). */
    phoneSkip?: string[]
    /** One chip per row on the phone (the electronics frames). */
    phoneStack?: boolean
  }

  cta: {
    heading: string
    body: string[]
    /** `phoneLabel`: the phone frames' shorter label (27 Sep 2026). */
    primary: Link & { phoneLabel?: string }
    phone: Phone & { phoneLabel?: string }
    footnote?: string
    /** Board width the heading wraps at: 720, or 598 on the battery frames. */
    headingWidth?: number
    /** Board width of the body: 1068, or 720 where the frame wraps it to two lines. */
    bodyWidth?: number
  }

  /** Sections on the #fcfcfc grey; unset = alternate from white. */
  bands?: SectionKey[]

  /** What the build could not settle from the frames. Surfaced in the project doc. */
  todo: string[]
}

/** Where the shared icons live (data/figma-assets.json records their Figma exports). */
export const ICONS = '/images/locations/city-pages/icons'
export const ICON = {
  battery: `${ICONS}/battery.svg`,
  bolt: `${ICONS}/bolt.svg`,
  nicd: `${ICONS}/nicd.svg`,
  ev: `${ICONS}/ev.svg`,
  ewaste: `${ICONS}/ewaste.svg`,
  laptop: `${ICONS}/laptop.svg`,
  monitor: `${ICONS}/monitor.svg`,
  printer: `${ICONS}/printer.svg`,
  phone: `${ICONS}/phone.svg`,
  pin: `${ICONS}/pin.svg`,
  truck: `${ICONS}/truck.svg`,
  mail: `${ICONS}/mail.svg`,
  clock: `${ICONS}/clock.svg`,
  inhouse: `${ICONS}/inhouse.svg`,
  minority: `${ICONS}/minority.svg`,
} as const

/** The two facilities' numbers as the frames print them. */
export const BLAINE_PHONE: Phone = { label: '+1-763-559-5130', tel: 'tel:+17635595130' }
export const NEW_BERLIN_PHONE: Phone = { label: '+1-262-798-3040', tel: 'tel:+12627983040' }
export const CHICAGO_PHONES: Phone[] = [
  { label: '(800) 969-5166', tel: 'tel:+18009695166' },
  { label: '(800) 305-3040', tel: 'tel:+18003053040' },
]

/** The FAQ band's pill and heading, as every city frame draws them. Each
 *  page carries its own copy (`faqHead`), so Admin -> Pages edits it per page. */
export const FAQ_HEAD = { eyebrow: 'FAQs', heading: 'Frequently Asked Questions' }

export const HOME_CRUMB: Crumb = { label: 'Home', href: href('/') }
export const LOCATIONS_CRUMB: Crumb = { label: 'Locations', href: href('/all-locations/') }

/** The Related Recycling Services chips, by the label the frames use. */
export const RELATED_LINK: Record<string, Link> = {
  'Electronics Recycling':             { label: 'Electronics Recycling',             href: href('/electronic-recycle/') },
  'Electronic Recycling':              { label: 'Electronic Recycling',              href: href('/electronic-recycle/') },
  'Television Recycling':              { label: 'Television Recycling',              href: href('/tv-recycling/') },
  'Battery Recycling':                 { label: 'Battery Recycling',                 href: href('/battery-recycling/') },
  'Light Bulb Recycling':              { label: 'Light Bulb Recycling',              href: href('/light-bulbs/') },
  'Light Bulbs Recycling':             { label: 'Light Bulbs Recycling',             href: href('/light-bulbs/') },
  'Ballast Recycling':                 { label: 'Ballast Recycling',                 href: href('/ballasts/') },
  'Ballasts Recycling':                { label: 'Ballasts Recycling',                href: href('/ballasts/') },
  'Ballast Recycling - often replaced along with fluorescent tubes':
    { label: 'Ballast Recycling - often replaced along with fluorescent tubes', href: href('/ballasts/') },
  'Hard Drive Destruction':            { label: 'Hard Drive Destruction',            href: href('/hard-drive-destruction-services/') },
  'Paper Shredding':                   { label: 'Paper Shredding',                   href: href('/paper-shredding-services/') },
  'IT Asset Disposition (ITAD)':       { label: 'IT Asset Disposition (ITAD)',       href: href('/it-asset-disposition/') },
  'Mail-In Program':                   { label: 'Mail-In Program',                   href: href('/mail-in-recycling/') },
  'All Locations':                     { label: 'All Locations',                     href: href('/all-locations/') },
  'All Recycle Technologies Locations': { label: 'All Recycle Technologies Locations', href: href('/all-locations/') },
}
export const related = (...labels: (keyof typeof RELATED_LINK)[]): Link[] => labels.map((l) => RELATED_LINK[l]!)
