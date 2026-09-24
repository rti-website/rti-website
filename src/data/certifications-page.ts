import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /certifications/ — geometry from Figma 6374:4886 (mobile 6703:2373), both in
 * BVtf2AOuUOcYbiMIlcKmbC.
 *
 * NEW URL. /certifications/ does not resolve on the live site (it soft-404s
 * to the homepage), so there is no live SEO to preserve.
 *
 * ===========================================================================
 * THE GRID WAS REDRAWN — Asim, 23 Sep 2026
 * ===========================================================================
 * The designer replaced the four glyph cards (R2v3 · RIOS · EPA Compliance ·
 * DOT & EPA Airbag) with ten LOGO cards, 6774:2592: R2v3 · NAID AAA · RIOS /
 * RCRA · IEEE 2883 · FCRA / HIPAA · FACTA · NIST / GLBA. That is the list
 * built below, in the frame's order, with the frame's badges.
 *
 * TITLES ARE THE FULL NAMES — Asim: "below icon we add name but we have to
 * add the full name". The frame's titles are the bare acronyms ("R2v3",
 * "NAID AAA", …); each is now "Full Name (ACRONYM)". The acronym alone stays
 * as `name`, for the logo's alt text.
 *
 * !! THREE BODIES ARE CORRECTED, NOT COPIED. The frame's text for these is
 * wrong on the facts, and this is a compliance page:
 *   HIPAA  The frame says HIPAA protects "consumers' financial information
 *          handled by covered institutions" — that is the GLBA card's
 *          sentence pasted in. HIPAA is about protected HEALTH information.
 *   NIST   The frame's "NIST Disposal Rule … consumer report information" is
 *          the FACTA card's sentence with the name swapped. NIST's relevant
 *          publication is SP 800-88, Guidelines for Media Sanitization.
 *   RIOS   "ISRI's" — ISRI renamed itself ReMA (Recycled Materials
 *          Association) in 2024; RIOS is ReMA's now.
 * The frame also spells HIPAA "HIPPA" in the title and on the badge artwork.
 * The title is spelt correctly here; the artwork cannot be fixed in code.
 *
 * !! STILL TO CONFIRM BEFORE LAUNCH (flagged since 15 Sep 2026): the NAID AAA
 * card says "Certified". Nothing in the build or on the live site backs that
 * claim. Built as the frame draws it, on Asim's instruction; confirm the
 * certificate is current. And the FACTA artwork is another company's logo
 * (see src/data/certifications.ts, slot 3) — FACTA is a statute and has none.
 */

export const SEO = {
  title: 'Certifications & Compliance | R2v3, RIOS, EPA | Recycle Technologies',
  description: 'Recycle Technologies holds R2v3 certification at its Blaine, Minnesota facilities and follows EPA, Minnesota PCA and Wisconsin DNR rules for hazardous and universal waste.',
}

/**
 * Hero — 6374:4888.
 *
 * The doc heads this page "Certifications & Standards"; the frame's H1 is the
 * single word "Certifications", which is what fits the 70px hero on one line.
 * The frame wins on the hero because there is no live H1 to preserve.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',           href: href('/') },
    { label: 'Certifications', href: null },
  ],
  h1: 'Certifications',
  // Asim, 23 Sep 2026.
  lead: 'Our certifications are the proof behind our promises, verified standards our facilities meet for responsible recycling and secure data destruction.',
}

export const INTRO = {
  eyebrow: 'Our Standards',
  heading: 'Certifications & Compliance',
  lead: 'What each standard means, and where our facilities currently stand.',
}

/**
 * How one logo sits in its 120x48 slot, as the frame draws it. Every number is
 * the frame's (6774:2592). Most are a box with the picture contained or
 * filled; two are image fills the designer CROPPED inside their box (R2v3,
 * FACTA), and `crop` repeats that crop as percentages of the box, exactly as
 * Figma exports it.
 */
export type CertLogo = {
  src: string
  w: number
  h: number
  fit?: 'contain' | 'cover' | 'fill'
  crop?: { left: number; top: number; w: number; h: number }
}

export type CertCard = {
  logo: CertLogo
  badge: string
  /** The acronym — the frame's title, and the logo's alt text. */
  name: string
  /** The full name, shown under the logo. */
  title: string
  body: string
}

const L = '/images/certifications'

/** Cards — 6774:2592 desktop, 6766:2854 phone. In the frame's order. */
export const CERTS: CertCard[] = [
  {
    logo: { src: `${L}/r2v3.png`, w: 44, h: 48, crop: { left: -1.23, top: 0, w: 104.73, h: 100 } },
    badge: 'Blaine, MN Certified',
    name: 'R2v3',
    title: 'Responsible Recycling Standard (R2v3)',
    body: 'Responsible Recycling standard covering downstream vendor management, data sanitization, and materials recovery.',
  },
  {
    logo: { src: `${L}/naid-aaa.png`, w: 48, h: 48, fit: 'contain' },
    badge: 'Certified',
    name: 'NAID AAA',
    title: 'National Association for Information Destruction (NAID AAA)',
    body: 'The data destruction industry’s highest certification for secure, DOD-compliant destruction of sensitive data.',
  },
  {
    logo: { src: `${L}/rios.png`, w: 90, h: 40, fit: 'contain' },
    badge: 'Certified',
    name: 'RIOS',
    title: 'Recycling Industry Operating Standard (RIOS)',
    body: 'ReMA’s (formerly ISRI) Recycling Industry Operating Standard, combining quality, environmental, and health & safety management systems in one certification.',
  },
  {
    logo: { src: `${L}/rcra.svg`, w: 120, h: 48, fit: 'fill' },
    badge: 'In Compliance',
    name: 'RCRA',
    title: 'Resource Conservation and Recovery Act (RCRA)',
    body: 'The Resource Conservation and Recovery Act governs how hazardous waste — including certain electronics and batteries — must be handled and disposed of.',
  },
  {
    logo: { src: `${L}/ieee.png`, w: 90, h: 40, fit: 'contain' },
    badge: 'Practices Aligned',
    name: 'IEEE 2883',
    title: 'IEEE Standard for Sanitizing Storage (IEEE 2883)',
    body: 'The IEEE standard for sanitizing storage devices, defining verified methods for clearing, purging, and destroying data-bearing media.',
  },
  {
    logo: { src: `${L}/fcra.svg`, w: 120, h: 48, fit: 'fill' },
    badge: 'In Compliance',
    name: 'FCRA',
    title: 'Fair Credit Reporting Act (FCRA)',
    body: 'The Fair Credit Reporting Act requires proper disposal of consumer report information — directly relevant to our shredding and hard drive destruction services.',
  },
  {
    // The badge artwork reads "HIPPA" — see the note at the top of this file.
    logo: { src: `${L}/hipaa.svg`, w: 80.97, h: 33.42, fit: 'fill' },
    badge: 'In Compliance',
    name: 'HIPAA',
    title: 'Health Insurance Portability and Accountability Act (HIPAA)',
    // Corrected — the frame's sentence was the GLBA card's.
    body: 'The Health Insurance Portability and Accountability Act requires healthcare organizations to safeguard patients’ health information, including when the records and devices holding it are disposed of.',
  },
  {
    logo: { src: `${L}/facta.png`, w: 72, h: 26, crop: { left: -5.76, top: -107.89, w: 111.52, h: 315.79 } },
    badge: 'In Compliance',
    name: 'FACTA',
    title: 'Fair and Accurate Credit Transactions Act (FACTA)',
    body: 'The FACTA Disposal Rule requires businesses to take reasonable measures when disposing of consumer report information.',
  },
  {
    // Same artwork as the certifications strip's NIST mark (same Figma image).
    logo: { src: '/images/certs/9.png', w: 77, h: 20, fit: 'cover' },
    badge: 'In Compliance',
    name: 'NIST',
    title: 'National Institute of Standards and Technology (NIST)',
    // Corrected — the frame's sentence was the FACTA card's with the name swapped.
    body: 'NIST Special Publication 800-88, Guidelines for Media Sanitization, is the federal reference for clearing, purging, and destroying data on storage media.',
  },
  {
    logo: { src: `${L}/glba.png`, w: 78, h: 20, fit: 'fill' },
    badge: 'In Compliance',
    name: 'GLBA',
    title: 'Gramm-Leach-Bliley Act (GLBA)',
    body: 'The Gramm-Leach-Bliley Act requires safeguarding and secure disposal of consumers’ financial information handled by covered institutions.',
  },
]

/** Accountability — 6380:1098. Two cards, bullets from the doc. */
export const ACCOUNTABILITY = {
  eyebrow: 'Accountability',
  heading: 'How We Keep Materials Accountable',
  lead: 'Certifications set the standard. These are the practices that back them up, from intake to final disposition.',
  cards: [
    {
      glyph: 'link' as const,
      title: 'Chain of Custody',
      points: [
        'Items are logged at intake, so it’s clear at what stage in the process each item is.',
        'A Certificate of Recycling or Shredding is issued once processing is complete, giving you documented proof for your compliance records.',
        'We guarantee that no waste is sent to a landfill.',
      ],
    },
    {
      glyph: 'network' as const,
      title: 'Downstream Vendor Transparency',
      points: [
        'R2v3 requires documented tracking of where materials go after they leave our facility; we follow that standard at our certified locations.',
        'We work with vetted downstream partners for materials recovery.',
        'Records are available as part of your recycling documentation, upon request.',
      ],
    },
  ],
}

/** Closing CTA — 6380:1099, the shared GradientCta frame at 161.565°. */
export const CTA = {
  heading: 'Questions About Our Standards?',
  body: 'Whether you need documentation for an audit or just want to understand our process, our team is happy to walk you through it.',
  primary:   { label: 'Contact Us',  href: href('/contact-us/') },
  secondary: { label: 'Get a Quote', href: QUOTE_HREF },
}

/** Gaps between Figma 6374:4886, the facts and the live site. */
export const TODO_FOR_DESIGN = [
  'CONFIRM: the NAID AAA card says "Certified". Nothing in the build or on the live site backs it; confirm the certificate is current before launch.',
  'ARTWORK: the HIPAA badge reads "HIPPA" (6766:2698), and the FACTA logo (6766:2693) is another company\'s mark. FACTA is a statute with no logo. Aqeel to re-export / replace.',
  'COPY FIXED IN BUILD: the frame\'s HIPAA body is the GLBA sentence and its NIST body is the FACTA sentence; RIOS is credited to ISRI, now ReMA. Corrected here; Musaveer to carry the fixes back to the doc.',
  'The live homepage shows a REVOKED R2v3 listing for a Minneapolis address alongside the two active Blaine ones. Not published here, but worth someone\'s attention.',
]
