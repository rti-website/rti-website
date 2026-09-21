import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /sustainability/ — copy from the "Sustainability & Environmental Impact" doc,
 * geometry from Figma 6374:5211.
 *
 * NEW URL. /sustainability/ does not resolve on the live site: it returns the
 * homepage, titled "E-Waste, Electronics & Industrial Recycling Services", with
 * canonical "https://www.recycletechnologies.com/". So there is no live title,
 * description or H1 to preserve and CLAUDE.md rule 6 does not bite — the SEO
 * below is ours.
 *
 * Adjudication follows the rule the rest of this build uses: the doc wins on
 * words, the verifiable version wins on facts. This page needed that rule more
 * than any other so far, because the two sources disagree about an
 * environmental claim rather than about phrasing. Every override is noted at
 * the point it happens and collected in TODO_FOR_DESIGN.
 */

export const SEO = {
  title: 'Sustainability & Environmental Impact | Recycle Technologies',
  description:
    'How Recycle Technologies keeps electronics out of landfills — dismantling devices to base materials, routing them to vetted downstream vendors, and documenting every shipment.',
}

/**
 * Hero — 6374:5213.
 *
 * The frame's breadcrumb reads "Home / Certifications", copied from the
 * Certifications frame next to it (6374:4888 is byte-identical apart from the
 * headline). Built as "Home / Sustainability".
 *
 * The lead is the shared interior-hero line, which is what both the frame and
 * the doc carry here.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',           href: href('/') },
    { label: 'Sustainability', href: null },
  ],
  h1: 'Sustainability & Environmental Impact',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/**
 * Circular economy — 6383:1161. 700px prose column, 80px gutter, 502px card.
 *
 * The doc writes the prose as one paragraph; the frame lays out two. The doc's
 * paragraph splits at its own sentence boundary into exactly those two slots,
 * so the writer's words fill the designer's layout with nothing invented.
 */
export const CIRCULAR = {
  eyebrow: 'Circular Economy',
  heading: 'Keeping Materials in Circulation',
  paragraphs: [
    'E-waste recycling recovers valuable resources, metals, plastics, and glass, that would otherwise end up in a landfill.',
    'Every device we process is dismantled into base materials, and those materials are directed toward reuse, refurbishment, or recovery instead of disposal.',
  ],
  /**
   * The doc heads this list "New Materials Re-Enter the Loop", which does not
   * parse as a heading for a sequence of steps — the list under it answers
   * *how*, not *what's new*. The frame reads "How". Built as the frame's;
   * flagged as a doc typo.
   */
  card: {
    title: 'How Materials Re-Enter the Loop',
    /**
     * The card is numbered 1–4 in the design, so it has to read as a sequence.
     * Steps 2–4 are the doc's first three bullets verbatim. Step 1 is the
     * frame's, because the doc's list starts at dismantling and a numbered
     * sequence with no collection step starts in the middle.
     *
     * The doc's fourth bullet — "No processed material is sent to a landfill" —
     * is dropped: it is a claim rather than a step, and it is the same absolute
     * claim the ZERO_LANDFILL note below overrules.
     */
    steps: [
      'Devices are collected via pickup, drop-off, or our Mail-In Program.',
      'Devices are dismantled into base materials — plastic, wire, circuit boards, metals, and glass.',
      'Materials follow a reuse → refurbishment → recovery hierarchy before disposal is ever considered.',
      'Recovered materials re-enter manufacturing supply chains.',
    ],
  },
}

/**
 * Zero-landfill commitment — 6383:1162.
 *
 * !! THE DOC IS OVERSTATED HERE AND THE FRAME IS RIGHT. The doc says "We
 * guarantee that no waste we process is sent to a landfill" and "We guarantee
 * that no waste goes to a landfill, a policy we've maintained since 1993".
 * That is an absolute environmental claim, and the doc contradicts it two
 * paragraphs later by conceding an exception. The frame — the same team's later
 * pass over the same copy — already softens it to "processed for recovery, not
 * sent straight to a dump". The frame's wording is built.
 *
 * !! THE DOC'S "One Exception" IS A PASTE ERROR. It reads "Every shipment we
 * process comes with a Certificate of Recycling or Shredding…", which is not an
 * exception to anything — it is the impact-reporting note, pasted into the
 * wrong slot. The frame's exception (PCB-containing ballast capacitors going to
 * EPA-approved incineration) is the real one, and it matches what
 * src/data/ballasts.ts already says. The frame's is built, and the doc's
 * sentence is used where it belongs, in REPORTING.note below.
 */
export const ZERO_LANDFILL = {
  eyebrow: 'Our Commitment',
  heading: 'Our Zero-Landfill Commitment',
  lead: 'We guarantee that materials we process don’t end up in a landfill — here’s what that means in practice.',
  cards: [
    {
      glyph: 'shield' as const,
      title: 'The Commitment',
      body: 'Materials that come through our doors are processed for recovery — not sent straight to a dump. This is a standing commitment across everything we handle, not a special program for select customers.',
    },
    {
      glyph: 'loop' as const,
      title: 'How We Do It',
      body: 'Items are sorted and dismantled into their base materials, which are routed to vetted downstream vendors for reprocessing rather than disposal.',
    },
    {
      glyph: 'alert' as const,
      title: 'The One Exception',
      body: 'A small number of hazardous components — like PCB-containing ballast capacitors — legally must go to an EPA-approved incineration facility via a certified transporter, rather than standard recycling.',
    },
  ],
}

/**
 * Environmental impact reporting — 6383:1163, on the navy-to-teal gradient.
 *
 * The stats are where the two sources each get one wrong, in opposite
 * directions:
 *
 *  - Stat 1. Doc "Materials Diverted from Landfill", frame "Shipments
 *    Documented". The doc's is the absolute claim again; the frame's is
 *    something the Certificate of Recycling actually evidences. Frame wins.
 *
 *  - Stat 2. Doc "Licensed Facilities", frame "R2v3-Scoped Facilities". !! THE
 *    FRAME IS WRONG. Blaine is R2v3 certified; New Berlin is *pursuing* it, per
 *    the About Us doc, the Certifications doc, the Why Choose Us frame's own
 *    footnote, this page's own GOALS card, and the live site. "2 R2v3-Scoped
 *    Facilities" would claim certification for Wisconsin. DOC WINS.
 *
 * Stats 3 and 4 are the doc's wording; the frame only abbreviates them.
 */
export const REPORTING = {
  heading: 'Environmental Impact Reporting',
  lead: 'Real numbers behind our commitment to keeping materials out of landfills.',
  stats: [
    { value: '100%', label: 'Shipments Documented' },
    { value: '2',    label: 'Licensed Facilities' },
    { value: '32+',  label: 'Years of Operating Record' },
    { value: '50',   label: 'States Reached via Mail-In Program' },
  ],
  /** The doc's sentence, in the slot the frame draws for it. See ZERO_LANDFILL. */
  note: 'Every shipment we process comes with a Certificate of Recycling or Shredding — documented proof that your materials were handled the way we say they were, not just a promise.',
}

/**
 * Sustainability goals — 6383:1164. Four 302px cards.
 *
 * The doc and the frame name four different goals. The doc's are built, per the
 * doc-wins-on-words rule, and they survive the fact check: the "Wider Certified
 * Capacity" card says our *Minnesota* facility already holds the certification,
 * which is correct, and its Chicago reference matches the qualified "expanded
 * operations in the Chicago area (not yet a certified facility)" already built
 * on /all-locations/ and /about-us-commercial-recycling-solutions/.
 */
export const GOALS = {
  eyebrow: 'Looking Ahead',
  heading: 'Where We’re Headed',
  lead: 'The priorities guiding how we grow, in plain terms.',
  cards: [
    {
      glyph: 'globe' as const,
      title: 'Reaching More Communities',
      body: 'Extending in-person service beyond Minnesota and Wisconsin, and strengthening the Mail-In Program so more people never have to drive far to recycle responsibly.',
    },
    {
      glyph: 'rosette' as const,
      title: 'Wider Certified Capacity',
      body: 'Bringing more of our operations, including our newer Chicago-area presence, up to the same certification standards our Minnesota facility already holds.',
    },
    {
      glyph: 'doc' as const,
      title: 'Staying Transparent',
      body: 'Continuing to document where materials go after they leave our facility, so customers never have to take our word for it on faith alone.',
    },
    {
      glyph: 'loop' as const,
      title: 'Making Recycling Easier',
      body: 'Removing friction from the process, whether that’s simplifying pickup scheduling or making our Mail-In kits easier to use.',
    },
  ],
}

/**
 * Closing CTA — 6383:1165, the shared GradientCta frame at 161.565°.
 *
 * "Start Mail-In Recycling" points off-site to ezontheearth.com, matching every
 * other instance of that button in the build (see src/data/services.ts and the
 * note in src/data/mail-in-recycling.ts).
 */
export const CTA = {
  heading: 'Put Your Materials to Better Use',
  body: 'Get a free quote and see how our recycling supports the circular economy instead of the landfill.',
  primary:   { label: 'Get a Quote', href: QUOTE_HREF },
  secondary: { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
}

/** Gaps between Figma 6374:5211, the doc and the facts. */
export const TODO_FOR_DESIGN = [
  'CLAIM FIX NEEDED (doc): the zero-landfill section guarantees "no waste we process is sent to a landfill" and "no waste goes to a landfill", then concedes an exception in the next card. An unqualified zero-landfill guarantee is an environmental marketing claim, not a phrasing choice. The frame\'s softer wording ("processed for recovery — not sent straight to a dump") is built. Same for the doc\'s "100% Materials Diverted from Landfill" stat and its bullet "No processed material is sent to a landfill".',
  'CLAIM FIX NEEDED (frame): the stat "2 R2v3-Scoped Facilities" claims certification for New Berlin, Wisconsin, which is pursuing it. The doc\'s "2 Licensed Facilities" is built. This is the FOURTH source to overstate the Wisconsin certification — after the Ballasts doc, the Certifications frame and the Why Choose Us doc. Worth fixing at the source rather than page by page.',
  'DOC FIX NEEDED: "The One Exception" in the doc is the Certificate of Recycling sentence, which is not an exception to anything — it looks pasted from the impact-reporting section. The frame\'s real exception (PCB-containing ballast capacitors to EPA-approved incineration) is built, and the doc\'s sentence is used in the impact-reporting note where it fits.',
  'DOC TYPO: the steps card is headed "New Materials Re-Enter the Loop"; the list under it answers "how". Built as the frame\'s "How Materials Re-Enter the Loop".',
  'The frame\'s hero breadcrumb reads "Home / Certifications" — 6374:5213 is a copy of the Certifications hero 6374:4888 with a new headline. Built as "Home / Sustainability".',
  'The doc and the frame name four different sustainability goals. The doc\'s four are built. If the frame\'s set ("Expand Certified Capacity", "Widen Accessible Recycling", "Maintain Full Transparency", "Strengthen the Circular Loop") is the newer thinking, say so and they can be swapped in — the geometry is identical either way.',
  'The doc\'s numbered-steps list has no collection step, so step 1 is the frame\'s. Worth confirming that pickup / drop-off / Mail-In is the intended opening step.',
  'The seven card glyphs are drawn inline rather than exported from Figma, for the same reason as every other glyph in this build: figma.com is unreachable from the build sandbox. Originals are under 6383:1199, 6383:1206, 6383:1214, 6383:1244, 6383:1250, 6383:1257 and 6383:1264 if a byte-exact swap is wanted.',
]
