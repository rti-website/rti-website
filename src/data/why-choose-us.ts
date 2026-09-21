import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /why-choose-us/ — copy from the "Why Choose Us" doc, geometry from Figma
 * 6374:4567. A new URL: it does not resolve on the live site (soft-404 to the
 * homepage), so there is no live SEO to preserve.
 *
 * Doc wins on words, the verifiable version wins on facts — the same rule the
 * rest of the build follows. The one fact that had to be overruled is the R2v3
 * card; see the note on it below.
 */

export const SEO = {
  title: 'Why Choose Recycle Technologies | Minority-Owned, R2v3 Certified',
  description: 'A Minority-Owned Midwest recycler since 1993, R2v3 certified in Blaine, Minnesota, issuing a Certificate of Recycling or Shredding on every shipment.',
}

/**
 * Hero — 6374:4569.
 *
 * The frame's breadcrumb reads "Home / Resources", the same leftover the
 * Locations frame carries. Built as "Home / Why Choose Us".
 *
 * The lead is the doc's, which is not the shared line every other interior hero
 * uses — the doc wrote this page its own.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',           href: href('/') },
    { label: 'Why Choose Us',  href: null },
  ],
  h1: 'Why Choose Us',
  lead: 'Recycle Technologies has proudly served the community since 1993.',
}

/** Differentiators — 6379:1033. */
export const DIFFERENTIATORS = {
  eyebrow: 'What Sets Us Apart',
  heading: 'Why Choose Recycle Technologies',
  lead: 'Three things set us apart from a typical recycling vendor.',
  cards: [
    {
      glyph: 'rosette' as const,
      title: 'Minority-Owned',
      body: 'We’re proud to be the only Minority-Owned document destruction and recycling company in the Midwest, serving our communities with integrity and accountability.',
    },
    {
      glyph: 'clock' as const,
      title: 'Since 1993',
      body: 'With more than three decades of experience in responsible recycling and shredding, we’ve built lasting relationships with customers across the Midwest.',
    },
    {
      glyph: 'shield' as const,
      title: 'R2v3 Certified',
      /**
       * THE DOC IS WRONG HERE and the frame is right. The doc's card reads
       * "Our Blaine, Minnesota, and Wisconsin facilities are R2v3-certified",
       * which would claim certification for New Berlin. The About Us doc, the
       * Certifications doc, this same frame's own footnote and the live site all
       * say Wisconsin is *pursuing* it. The frame's wording is built. Musaveer
       * should fix the doc — this is the second doc that has made this mistake.
       */
      body: 'Our Blaine, Minnesota facilities are R2v3 certified for responsible electronics recycling, with our New Berlin, Wisconsin facility pursuing the same certification.',
    },
  ],
}

/** Certified & Accountable callout — 6379:1034, on the teal tint. */
export const CALLOUT = {
  heading: 'Certified & Accountable',
  items: [
    { glyph: 'shield' as const,  title: 'R2v3 Certified', sub: 'Blaine, MN facilities' },
    { glyph: 'rosette' as const, title: 'Minority-Owned', sub: 'Verified business status' },
    { glyph: 'clock' as const,   title: '30+ Years',      sub: 'In continuous operation' },
  ],
  footnote: 'Our New Berlin, Wisconsin facility is currently pursuing R2v3 certification.',
}

/** Why businesses trust us — 6379:1035. */
export const TRUST = {
  eyebrow: 'Why Businesses Trust Us',
  heading: 'Built on Consistency, Not Promises',
  lead: 'Here’s why businesses and residents continue to choose us.',
  cards: [
    {
      glyph: 'doc' as const,
      title: 'Proof, Every Time',
      body: 'Every shipment we process comes with a Certificate of Recycling or Shredding, giving you documented proof for your compliance records.',
    },
    {
      glyph: 'chat' as const,
      title: 'A Direct Relationship',
      body: 'As a Midwest-based, Minority-Owned company, you work directly with the team handling your materials, not a distant call center.',
    },
    {
      glyph: 'truck' as const,
      title: 'Flexible Ways to Recycle',
      body: 'Choose the option that works best for you: commercial pickup, residential drop-off, or our nationwide Mail-In Program.',
    },
  ],
}

/** Closing CTA — 6379:1036, the shared GradientCta frame. */
export const CTA = {
  heading: 'See the Difference for Yourself',
  body: 'Get a free, no-obligation quote and see why businesses across the Midwest trust RT for recycling and data destruction.',
  primary:   { label: 'Get a Quote', href: QUOTE_HREF },
  secondary: { label: 'Contact Us',  href: href('/contact-us/') },
}

/** Gaps between Figma 6374:4567, the doc and the facts. */
export const TODO_FOR_DESIGN = [
  'DOC FIX NEEDED: the R2v3 card claims "Our Blaine, Minnesota, and Wisconsin facilities are R2v3-certified". Wisconsin is pursuing certification, per the About Us doc, the Certifications doc, this frame\'s own footnote and the live site. The frame\'s wording is built.',
  'The frame\'s hero breadcrumb reads "Home / Resources" — the same leftover the Locations frame has. Built as "Home / Why Choose Us".',
  'Several paragraphs are worded differently in the frame and the doc (both section leads, the Since 1993 card, all three trust cards, the CTA body). The doc\'s wording is built throughout except the R2v3 card above.',
  'The CTA body abbreviates the company to "RT", which appears nowhere else on the site. Kept as the writer wrote it; worth a decision.',
]
