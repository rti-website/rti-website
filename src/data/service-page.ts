/**
 * The shape every service detail page's content file exports.
 *
 * Ten pages share one Figma frame (6142:2048 "Service Details"), so they share
 * one component too — see ServiceDetailPage. A new service is this object plus
 * a ten-line route file; there is no new layout code to write.
 */

export type Cta = { label: string; href: string; external?: boolean }

export type ServicePageContent = {
  /** Live, canonical path. Every one of these is verified against the live site. */
  url: string
  /**
   * Live title and description, which ship at launch (CLAUDE.md rule 6), and
   * the content doc's proposed replacements, which are second-wave work.
   */
  liveSeo: { title: string; description: string }
  proposedSeo: { title: string; description: string }

  hero: {
    /** Last breadcrumb segment; Home / Our Services are prepended. */
    crumb: string
    /**
     * Full breadcrumb trail, when the default Home / Our Services / <crumb> is
     * wrong — the industry pages sit under Industries, not Services.
     */
    trail?: { label: string; href: string | null }[]
    h1: string
    lead: string
    /**
     * This page's own hero photograph. Aqeel started drawing one frame per
     * service on 16 Sep 2026 (6491:5724 and its siblings) rather than the one
     * shared "Service Details" template, so each page can carry its own
     * picture. Omit it and the page keeps the shared interior hero.
     */
    image?: string
    /** The service frames carry a picker + button; the industry frames do not. */
    cta?: Cta
    /**
     * The button without the location picker beside it. The Electronics
     * Recycling Kit (24 Sep 2026) is a nationwide mail-in product, so a
     * "Select Your Location" field would ask a question the page has no use
     * for; its doc gives the button alone.
     */
    noPicker?: boolean
    /**
     * A second button beside `cta`, in place of the location picker. The state
     * landing pages (/light-bulbs/Minnesota/ and friends, 24 Sep 2026) already
     * know the location, so they show [Get a Quote] [Schedule a Pickup].
     */
    secondaryCta?: Cta
  }

  /** Prose block one — text left, photo right. */
  intro: {
    heading: string
    body: string[]
    more?: { label: string; href: string }
    image: string
  }

  /**
   * The bordered two-column list. `items` may be empty when the doc has none.
   * On an industry page this is the "Recycling Services for X" list, so each
   * item links to the service page it names.
   */
  accept: {
    heading: string
    /** One paragraph, or several (the mail-in doc writes two, 24 Sep 2026). */
    intro?: string | string[]
    /**
     * A small heading over the rows, when the doc titles its list — the
     * mail-in page's "Commonly Processed Recycling Operations:".
     */
    itemsHeading?: string
    /** `text` may be empty for a bare list item (the mail-in page's bullets). */
    items: { label: string; text: string; href?: string; external?: boolean }[]
    outro?: string
  }

  /**
   * Prose block two — photo left, text right. Absent on the industry frames
   * (6246:1390), which go straight from the services list to certifications.
   */
  process?: {
    heading: string
    intro?: string
    steps: { label: string; text: string }[]
    /** One closing paragraph, or several when the doc writes several. */
    outro?: string | string[]
    /**
     * Sub-sections after the steps, each under its own small heading — the
     * battery state pages' "Battery Recycling Pickup in Minnesota" (with a
     * Schedule a Pickup button) and "Mail-In & Drop-Off Battery Recycling".
     */
    extra?: { heading: string; body?: string[]; items?: { label: string; text: string }[]; cta?: Cta }[]
    image: string
  }

  /**
   * A second tick-row band after the process block — the Electronics
   * Recycling Kit doc's "Who Is the Program For?" (24 Sep 2026). Same shape
   * and look as `accept`. Absent everywhere else, and then it takes no space.
   */
  audience?: {
    heading: string
    intro?: string | string[]
    itemsHeading?: string
    items: { label: string; text: string; href?: string; external?: boolean }[]
    outro?: string
  }

  /** Overrides the shared certifications paragraph when a doc supplies its own. */
  certifications?: { body?: string }

  faqs: { q: string; a: string }[]

  cta: {
    heading: string
    /**
     * Width of the heading box. Figma's 417 suits its own short heading; the
     * longer industry headings need the full 686 to stay two lines.
     */
    headingWidth?: number
    body: string[]
    primary: Cta
    secondary: Cta
  }

  /**
   * Content the doc marked as not yet written. Kept here rather than rendered —
   * a bracketed "[Placeholder: ...]" must never reach a live page — so the gap
   * is visible to the team without being visible to visitors.
   */
  todo?: string[]
}

/**
 * The two prose blocks are the only sections whose height varies: Figma sized
 * them around placeholder copy, so each page's real copy is measured in a
 * browser and the numbers recorded here. Everything else keeps the frame's
 * exact height. See scripts/measure-service-pages.mjs.
 */
export type ServicePageLayout = {
  intro: number
  /** Omitted on pages with no second prose block. */
  process?: number
  /**
   * The two banded sections are fixed-height in Figma too, and they also
   * overflow once a page has more content than the frame was drawn around:
   * five accept categories instead of four, or a page that writes its own
   * compliance paragraph. Set only when the default is too small.
   */
  accept?: number
  /** The `audience` band. Required when the page has one; measured like `accept`. */
  audience?: number
  certifications?: number
  /**
   * The FAQ band is fixed-height too, and overflows when questions wrap to two
   * lines — Manufacturing & Industrial's do. Set only when 676.93 is too small.
   */
  faq?: number
}
