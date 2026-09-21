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
  glyph: 'laptop' | 'cross' | 'civic' | 'school' | 'factory'
  title: string
  challenge: string
  approach: string
}

/**
 * The five stories. Copy is the frame's, verbatim.
 *
 * The frame's own subhead calls these "representative examples … client names
 * withheld", so they read as illustrative rather than as named references, and
 * each describes a service this site already sells. The Manufacturing card's
 * PCB-ballast handling matches what /ballasts/ and /compliance-center/ say, so
 * the three pages agree.
 */
export const CASE_STUDY_CARDS: CaseStudyCard[] = [
  {
    id: 'corporate-it',
    industry: 'Corporate IT',
    glyph: 'laptop',
    title: 'Office IT Refresh & Data Destruction',
    challenge: 'A regional employer needed to retire several hundred laptops and desktops during an office consolidation, with strict data security requirements.',
    approach: 'Scheduled a commercial pickup, performed certified hard drive destruction on-site, and issued a Certificate of Recycling covering every asset serialized at intake.',
  },
  {
    id: 'healthcare',
    industry: 'Healthcare',
    glyph: 'cross',
    title: 'Patient Records & Device Retirement',
    challenge: 'A healthcare provider needed HIPAA-conscious destruction of old workstations and printers that had processed patient data.',
    approach: 'Provided secure hard drive destruction and paper shredding on the same visit, with documentation the client could file for its own compliance records.',
  },
  {
    id: 'government',
    industry: 'Government',
    glyph: 'civic',
    title: 'Municipal E-Waste Collection Event',
    challenge: 'A Minnesota municipality wanted a one-day resident e-waste drop-off event to help meet state electronics-recycling obligations.',
    approach: 'Supplied on-site staff and collection logistics for the event, sorting materials into our regular processing stream with the same certified handling as commercial pickups.',
  },
  {
    id: 'education',
    industry: 'Education',
    glyph: 'school',
    title: 'District-Wide Computer Lab Upgrade',
    challenge: 'A school district needed to retire outdated computer lab hardware across multiple buildings ahead of a technology upgrade.',
    approach: 'Coordinated pickups across each building on a rolling schedule, consolidating everything into a single certified recycling stream with one combined certificate.',
  },
  {
    id: 'manufacturing',
    industry: 'Manufacturing',
    glyph: 'factory',
    title: 'Facility Ballast & Lighting Retrofit',
    challenge: 'A manufacturer replacing older fluorescent lighting needed compliant disposal of PCB-containing ballasts alongside the fixtures.',
    approach: 'Separated ballasts for EPA-approved incineration via a certified transporter, while remaining fixtures and bulbs were processed through standard recycling.',
  },
]

/** The three the Compliance Center frame draws, in its order. */
export const COMPLIANCE_CASE_IDS = ['corporate-it', 'healthcare', 'government']

/** Grid section — 6391:1527. */
export const GRID = {
  eyebrow: 'Case Studies',
  heading: 'How We Solve Real Recycling Challenges',
  lead: 'Representative examples across the industries we serve — client names withheld for confidentiality.',
  /** 6391:1534. The first pill is the "no filter" state. */
  allLabel: 'All Industries',
  filters: ['Corporate IT', 'Healthcare', 'Government', 'Education', 'Manufacturing'],
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
  'This frame has NO CONTENT DOC, like the Compliance Center frame. Its copy has not been through Musaveer. Worth a read-through before launch — these are written as "representative examples" with names withheld, which is fine, but if any is a real engagement the details should be checked, and if none of them are, someone should be comfortable publishing five illustrative stories as case studies.',
  'The Education and Manufacturing cards are new here; the other three already appear on /compliance-center/. All five now live in CASE_STUDY_CARDS in this file and both pages read from it, so editing a story in one place updates both. Do not paste a copy back into src/data/compliance-center.ts.',
  'The industry filter is real, not decorative — it is the build\'s sixth client component (src/components/client/CaseStudyFilter.tsx). The section keeps its full height when a filter is applied, so the page below it never moves; that leaves whitespace under a one-card result. On a fixed canvas that is the safe trade, but if the team would rather the section shrink, the canvas has to become flow-positioned first.',
  'The five card glyphs are drawn inline rather than exported (figma.com is unreachable from the build sandbox). Originals: 6391:1551, 6391:1560, 6391:1568, 6391:1578, 6391:1587.',
]
