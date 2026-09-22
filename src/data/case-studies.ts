import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /case-studies/ — a 1:1 build of Figma frame 6382:6595.
 *
 * NO CONTENT DOC, like the Compliance Center frame next to it, so the frame is
 * the only source and its copy is built verbatim.
 *
 * NEW URL. /case-studies/ does not resolve on the live site: it serves the
 * homepage, titled "E-Waste, Electronics & Industrial Recycling Services" with
 * canonical "https://www.recycletechnologies.com/". So there is no live title,
 * description or H1 to preserve and CLAUDE.md rule 6 does not bite.
 *
 * ====================================================================
 * CASE_STUDY_CARDS IS THE ONE SOURCE FOR THESE FIVE STORIES
 * ====================================================================
 * The Compliance Center frame (6390:1532) draws the first three of these cards
 * with byte-identical copy, and this frame (6391:1547) draws all five. They are
 * defined once here and both pages read from this array, because five
 * paragraphs of copy duplicated across two files is exactly how two pages end
 * up telling a customer slightly different versions of the same story.
 *
 * /compliance-center/ shows COMPLIANCE_CASE_IDS below; this page shows all five
 * with the industry filter.
 */

export const SEO = {
  title: 'Case Studies | Recycling & Data Destruction | Recycle Technologies',
  description:
    'Representative examples of how Recycle Technologies handles IT refreshes, healthcare device retirement, municipal collection events, school district upgrades and lighting retrofits.',
}

/**
 * Hero — 6382:6597. The frame's breadcrumb is correct here ("Home / Case
 * Studies"), unlike the Sustainability and Why Choose Us heroes, which both
 * carry a "Certifications" leftover.
 *
 * The lead is this page's own, not the "providing services to the community
 * since 1993" line every other interior hero repeats: Asim supplied one written
 * for this page on 21 Sep 2026 and it is the only interior hero in that set
 * that gets its own. It sets to two lines in the 686 box, as the frame draws.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',         href: href('/') },
    { label: 'Case Studies', href: null },
  ],
  h1: 'Case Studies',
  lead: 'Real recycling challenges, solved. See how we’ve helped businesses across '
    + 'industries stay compliant and keep materials out of landfills.',
}

export type CaseStudyCard = {
  id: string
  /** Matches a FILTERS entry; drives the industry filter on this page. */
  industry: string
  glyph: 'laptop' | 'cross' | 'auto'
  title: string
  /** One line under the title on the card — the ERI-style "See how…" summary. */
  blurb: string
  /** First page of the PDF, rendered to a JPEG. See the note above. */
  preview: string
  challenge: string
  approach: string
  /** The PDF's "Key benefits" rail, verbatim. */
  benefits: string[]
  /** The customer quote. `who` is a role, never a name — see the note above. */
  quote: { text: string; who: string }
  /**
   * The one-page PDF this card summarises.
   *
   * It lives in public/files/case-studies/, NOT public/case-studies/. A file
   * under public/ whose path collides with an app route is SHADOWED by that
   * route: public/case-studies/x.pdf served the 404 page, because
   * src/app/case-studies/ owns that path. /files/ has no route above it.
   */
  pdf: string
  /** Download link label; the file size is appended by the card. */
  pdfSize: string
}

/**
 * ============================================================================
 * REAL CASE STUDIES, 22 Sep 2026 — these replaced five invented ones
 * ============================================================================
 * Until today this array held five stories that came from the Figma frame and
 * nowhere else: no content doc, no client, no engagement behind them. They had
 * been flagged since the page was built as "if none of these are real, someone
 * should be comfortable publishing five illustrative stories as case studies".
 * Asim supplied three genuine one-page PDFs and asked for the invented ones
 * removed, so the answer turned out to be no. **Do not re-add a story here
 * that does not have a PDF in public/files/case-studies/ behind it.**
 *
 * Copy is taken from those PDFs. Client names are withheld in the source
 * documents themselves — each quote is attributed to a role ("the client's
 * operations manager") rather than a person — so the page keeps that framing
 * and the grid's subhead still says names are withheld for confidentiality.
 *
 * The three industries map onto industry pages this site already has, so the
 * filter pills are not a separate taxonomy: Corporate Offices, Automotive,
 * Healthcare.
 */
export const CASE_STUDY_CARDS: CaseStudyCard[] = [
  {
    id: 'midwest-business',
    industry: 'Corporate Offices',
    glyph: 'laptop',
    title: 'A Midwest business goes paperless and waste-free',
    blurb: 'See how Recycle Technologies cleared years of old electronics, batteries, bulbs and confidential paper for one growing business — in a single pickup.',
    preview: '/images/case-studies/midwest-business-paperless-waste-free.jpg',
    challenge:
      'A growing business had old computers, batteries and light bulbs piling up in storage, '
      + 'along with boxes of documents that needed to be destroyed. The team had no easy way to '
      + 'dispose of it safely, and no paperwork to show it had been handled properly if anyone asked.',
    approach:
      'Recycle Technologies picked up the electronics and batteries directly from the client’s site, '
      + 'shredded the paper on-site, and destroyed the hard drives to prevent data recovery. The client '
      + 'received a recycling certificate for their records once the pickup was complete.',
    benefits: [
      'One partner for e-waste, batteries, bulbs and paper shredding',
      'R2v3-certified handling, so nothing ends up in a landfill',
      'Certificate of recycling for every pickup, for easy compliance records',
      'Pickup, drop-off or mail-in kits, whichever fits the business',
      'Safe destruction of hard drives and confidential documents',
    ],
    quote: {
      text: 'It’s a relief to hand this off to people who know exactly how to deal with it safely. '
        + 'We used to worry about where all this stuff ended up. Now we just call and it’s taken care of.',
      who: 'the client’s operations manager',
    },
    pdf: '/files/case-studies/midwest-business-paperless-waste-free.pdf',
    pdfSize: '2.3 MB',
  },
  {
    id: 'auto-repair-shop',
    industry: 'Automotive',
    glyph: 'auto',
    title: 'An auto repair shop cuts its hazardous waste risk',
    blurb: 'See how a shop cleared undeployed airbags, shop batteries and fluorescent lighting through one certified partner instead of three vendors.',
    preview: '/images/case-studies/auto-repair-shop-hazardous-waste.jpg',
    challenge:
      'A shop was collecting undeployed airbags pulled from wrecked vehicles, along with worn-out '
      + 'batteries and old fluorescent shop lights. None could go out with the regular trash, but the '
      + 'shop had no set process for getting rid of them safely, and the pile kept growing in a back room.',
    approach:
      'Recycle Technologies scheduled one pickup, collected all three waste streams in a single visit, '
      + 'and processed each at its proper facility. Because everything went through one certified partner, '
      + 'the shop’s manager did not have to track separate compliance paperwork for each material.',
    benefits: [
      'Compliant disposal of deployed and undeployed airbags',
      'Safe removal of old shop batteries and fluorescent lighting',
      'DOT and EPA-compliant handling, start to finish',
      'Flexible pickup scheduling that fits around shop hours',
      'Paperwork on file in case of an inspection or audit',
    ],
    quote: {
      text: 'We didn’t want a room full of old airbags to become a liability. Having someone we can '
        + 'just call, who already knows the rules around this stuff, takes that worry off our plate.',
      who: 'the shop’s manager',
    },
    pdf: '/files/case-studies/auto-repair-shop-hazardous-waste.pdf',
    pdfSize: '2.4 MB',
  },
  {
    id: 'hospital-system',
    industry: 'Healthcare',
    glyph: 'cross',
    title: 'A Midwest hospital system clears years of old electronics',
    blurb: 'See how over 14,000 pounds of decommissioned equipment left a multi-campus hospital system in under six weeks, with zero sent to landfill.',
    preview: '/images/case-studies/hospital-system-electronics-cleanout.jpg',
    challenge:
      'The facilities team had warehouses full of decommissioned monitors, workstations and imaging '
      + 'equipment built up over several years across multiple campuses. With a renovation coming, they '
      + 'needed the space cleared and a recycler who could process everything responsibly and prove it.',
    approach:
      'Recycle Technologies coordinated pickups across every campus at once, consolidating what would '
      + 'normally be building-by-building jobs into a single project. Every device was logged on arrival, '
      + 'with over 14,000 pounds of electronics diverted from landfill in under six weeks.',
    benefits: [
      'Full facility cleanout completed on a tight deadline',
      'Zero material sent to landfill, backed by R2v3 certification',
      'Certificate of recycling issued for every load',
      'One coordinated project instead of separate pickups per building',
      'No cost to the hospital system for the service',
    ],
    quote: {
      text: 'We had no idea how much space we’d been losing to old equipment until it was gone. Recycle '
        + 'Technologies handled the whole thing without us managing separate trucks or paperwork for each building.',
      who: 'the hospital system’s facilities director',
    },
    pdf: '/files/case-studies/hospital-system-electronics-cleanout.pdf',
    pdfSize: '2.7 MB',
  },
]

/**
 * PREVIEWS ARE GENERATED, NOT DESIGNED. Each one is page one of its PDF at
 * 110dpi, resized to 820px wide and saved as a progressive JPEG (~130KB):
 *
 *   pdftoppm -jpeg -r 110 -f 1 -l 1 -singlefile <pdf> <out>
 *
 * Regenerate them whenever a PDF is replaced, or the card will advertise a
 * document that no longer matches. They live in public/images/case-studies/,
 * which is a different folder from the PDFs themselves (public/files/…) —
 * see the note on the `pdf` field for why that split exists.
 */

/**
 * The ones /compliance-center/ shows, in its order.
 *
 * That frame draws three cards and there are now exactly three stories, so it
 * shows all of them. Kept as an explicit list rather than swapped for the whole
 * array: the moment a fourth case study arrives, the Compliance Center frame
 * still only has room for three, and this is where that choice gets made.
 */
export const COMPLIANCE_CASE_IDS = ['midwest-business', 'auto-repair-shop', 'hospital-system']

/** Grid section — 6391:1527. */
export const GRID = {
  eyebrow: 'Case Studies',
  heading: 'How We Solve Real Recycling Challenges',
  lead: 'Real engagements across the industries we serve — client names withheld for confidentiality.',
  /** 6391:1534. The first pill is the "no filter" state. */
  allLabel: 'All Industries',
  filters: ['Corporate Offices', 'Automotive', 'Healthcare'],
  /** Download affordance on each card — Asim, 22 Sep 2026. */
  downloadLabel: 'Download the case study',
}

/** Closing CTA — 6391:1528, the shared GradientCta frame at 161.565°. */
export const CTA = {
  heading: 'Have a Similar Challenge?',
  body: 'Tell us what you’re working with, and we’ll put together a plan that fits your industry and compliance needs.',
  primary:   { label: 'Get a Quote', href: QUOTE_HREF },
  secondary: { label: 'Contact Us',  href: href('/contact-us/') },
}

/** Gaps between Figma 6382:6595 and what can be verified. */
export const TODO_FOR_DESIGN = [
  'The five invented stories are GONE (22 Sep 2026) and the three real ones from Asim\'s PDFs are in their place. The frame still draws five cards in a 3 + 2 layout; three fill one row and the grid height was re-measured to match. If Aqeel updates the frame, the card count is data-driven and nothing needs redrawing.',
  'The PDFs in public/case-studies/ are ~2.5 MB each because they embed full-bleed photography. Worth running them through a PDF optimiser before launch — a visitor on a phone downloading 2.7 MB for a one-page document is a slow experience, and these are linked directly rather than behind a request form.',
  'Each PDF\'s own footer carries "HIPPA" for HIPAA and lists NIST, GLBA, FCRA, RCRA, IEEE and NAID AAA as compliance marks — the same list flagged on the homepage certification strip, where only R2v3 and RIOS are certifications RTI actually holds. The typo and the claims are in the source documents, not in this site\'s copy, so fixing them means new PDFs from whoever produced these.',
  'The industry filter is real, not decorative — it is the build\'s sixth client component (src/components/client/CaseStudyFilter.tsx). The section keeps its full height when a filter is applied, so the page below it never moves; that leaves whitespace under a one-card result. On a fixed canvas that is the safe trade, but if the team would rather the section shrink, the canvas has to become flow-positioned first.',
  'The card glyphs are drawn inline rather than exported. The laptop and cross originals sit under 6391:1551 and 6391:1560; the automotive mark has no Figma original because the frame had no automotive story.',
]
