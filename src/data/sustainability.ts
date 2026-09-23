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

/*
 * ===========================================================================
 * COPY UPDATED FROM ASIM'S REVISED CONTENT — 23 Sep 2026
 * ===========================================================================
 * Everything from the hero to the goals below is Asim's revised
 * "Sustainability & Environmental Impact" copy, supplied in chat, set word for
 * word. It supersedes the first content doc, and with it most of what used to
 * be noted here: the "One Exception" paste error is fixed at the source (the
 * PCB-capacitor exception is now the doc's own), the steps card is headed
 * "How", the step list now starts at collection, and the stat reads
 * "Licensed Facilities".
 *
 * Only typography is ours: the copy writes " - " between clauses, set as an
 * em dash as everywhere else on the site, and straight apostrophes as curly
 * ones. The words are not touched.
 */

/**
 * Hero — 6374:5213. Breadcrumb "Home / Sustainability" (the frame's said
 * "Home / Certifications", a copy-paste from the Certifications hero).
 *
 * The H1 breaks after "&" — Asim, 23 Sep 2026: "move the environmental to 2nd
 * line of heading". It used to wrap on its own as "Sustainability &
 * Environmental / Impact". ServiceHero turns the \n into a space and a <br />,
 * so the heading's text is unchanged.
 *
 * !! The lead is an absolute environmental claim — "nothing we process ends up
 * in a landfill" — and so is the first zero-landfill card. Built as supplied.
 * Claims like this are the kind regulators ask a company to be able to back
 * up (the FTC's Green Guides in the US), so keep the downstream paperwork that
 * supports it on file.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',           href: href('/') },
    { label: 'Sustainability', href: null },
  ],
  h1: 'Sustainability &\nEnvironmental Impact',
  lead: 'Recycle Technologies has provided certified electronics recycling and data destruction services to the Midwest since 1993, built on one standing guarantee: nothing we process ends up in a landfill.',
}

/** Circular economy — 6383:1161. 700px prose column, 80px gutter, 502px card. */
export const CIRCULAR = {
  eyebrow: 'Circular Economy',
  heading: 'Keeping Materials in Circulation',
  paragraphs: [
    'E-waste recycling recovers valuable resources, metals, plastics, and glass that would otherwise end up in a landfill.',
    'Every device we process is dismantled into base materials, and those materials are directed toward reuse, refurbishment, or recovery instead of disposal. We’ve applied this same process consistently across both our Minnesota and Wisconsin facilities since 1993.',
  ],
  card: {
    title: 'How Materials Re-Enter the Loop',
    steps: [
      'Devices are collected through pickup, drop-off, or our Mail-In Program.',
      'Devices are dismantled into base materials — plastic, wire, circuit boards, metals, and glass.',
      'Materials follow a reuse → refurbishment → recovery hierarchy before disposal is ever considered.',
      'Recovered materials re-enter manufacturing supply chains as raw inputs for new products.',
    ],
  },
}

/** Zero-landfill commitment — 6383:1162. Three cards, equal height. */
export const ZERO_LANDFILL = {
  eyebrow: 'Our Commitment',
  heading: 'Our Zero-Landfill Commitment',
  lead: 'We guarantee that materials we process don’t end up in a landfill; here’s what that means in practice.',
  cards: [
    {
      glyph: 'shield' as const,
      title: 'The Commitment',
      body: 'Every device that comes through our doors is processed for recovery, not sent to a landfill. This is a standing commitment across all of our services, not a special program reserved for select customers.',
    },
    {
      glyph: 'loop' as const,
      title: 'How We Do It',
      body: 'Incoming items are sorted and dismantled into base materials — metals, plastics, glass, and circuit boards — which are routed to vetted downstream processors for reprocessing rather than disposal.',
    },
    {
      glyph: 'alert' as const,
      title: 'The One Exception',
      body: 'A small number of hazardous components, such as PCB-containing ballast capacitors, are legally required to go to an EPA-approved incineration facility via a certified transporter instead of standard recycling.',
    },
  ],
}

/**
 * Environmental impact reporting — 6383:1163, on the navy-to-teal gradient.
 * "Licensed Facilities", not the frame's "R2v3-Scoped Facilities": New Berlin
 * is pursuing R2v3, not certified, and the revised copy says Licensed too.
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
  note: 'Every shipment we process comes with a Certificate of Recycling or Destruction — documented proof your materials were handled the way we say they were, not just a promise.',
}

/** Where we're headed — 6383:1164. Four cards, equal height. */
export const GOALS = {
  eyebrow: 'Looking Ahead',
  heading: 'Where We’re Headed',
  lead: 'The priorities guiding how we grow, in plain terms.',
  cards: [
    {
      glyph: 'globe' as const,
      title: 'Reaching More Communities',
      body: 'Extending in-person service beyond Minnesota and Wisconsin, and strengthening our Mail-In Program so more people can recycle responsibly without driving long distances to a facility.',
    },
    {
      glyph: 'rosette' as const,
      title: 'Wider Certified Capacity',
      body: 'Bringing more of our operations, including our newer Chicago-area location, up to the same certification standards our Minnesota facility already holds.',
    },
    {
      glyph: 'doc' as const,
      title: 'Staying Transparent',
      body: 'Continuing to document where materials go after they leave our facility, so customers never have to take our word for it on faith alone, but have the evidence of our growing trust.',
    },
    {
      glyph: 'loop' as const,
      title: 'Making Recycling Easier',
      body: 'Removing friction from the process, whether that means simplifying pickup scheduling, expanding drop-off hours, or making our Mail-In kits easier to use.',
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

/** Gaps between Figma 6374:5211, the copy and the facts. */
export const TODO_FOR_DESIGN = [
  'CLAIM TO SUBSTANTIATE: the revised copy guarantees "nothing we process ends up in a landfill" (hero) and "processed for recovery, not sent to a landfill" (first commitment card). Built as supplied, 23 Sep 2026. Keep the downstream vendor records that back it up.',
  'FACT CHECK: "We\'ve applied this same process consistently across both our Minnesota and Wisconsin facilities since 1993" reads as though the Wisconsin facility has operated since 1993. Confirm, or reword to "since 1993 in Minnesota, and at our Wisconsin facility since it opened".',
  'The frame names four different goals ("Expand Certified Capacity", "Widen Accessible Recycling", "Maintain Full Transparency", "Strengthen the Circular Loop"); the revised copy\'s four are built.',
  'The seven card glyphs are drawn inline rather than exported from Figma. Originals are under 6383:1199, 6383:1206, 6383:1214, 6383:1244, 6383:1250, 6383:1257 and 6383:1264 if a byte-exact swap is wanted.',
]
