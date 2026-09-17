import { href } from '@/lib/urls'

/**
 * /certifications/ — copy from the "Certifications" doc, geometry from Figma
 * 6374:4886. A new URL: /certifications/ does not resolve on the live site
 * (it soft-404s to the homepage), so there is no live SEO to preserve.
 *
 * ====================================================================
 * READ THIS BEFORE CHANGING THE CARD LIST — IT IS A COMPLIANCE CLAIM
 * ====================================================================
 * The frame and the doc do not list the same standards:
 *
 *   frame (6381:1144)   R2v3 · NAID AAA · e-Stewards · EPA Compliance
 *   doc                 R2v3 · RIOS · EPA Compliance · DOT & EPA Airbag
 *
 * The doc's list is built, for one reason: nothing supports the frame's
 * "NAID AAA — Certified" card. The live homepage's only NAID/e-Stewards
 * sentence is about a different company — "ERI holds the highest level of
 * certifications … the only provider to have all eight US facilities certified
 * by NAID and e-Stewards" — which looks like copy pasted in from elsewhere, and
 * is almost certainly where both the frame's card and the stray "certified R2v3
 * and NAID AAA facility" description in url-map.csv came from. Publishing a
 * certification a company does not hold is not a design decision.
 *
 * What the live site does support, checked 15 Sep 2026: R2v3 active at the two
 * Blaine, Minnesota facilities, Wisconsin pursuing. (It also shows a REVOKED
 * R2v3 listing for a Minneapolis address — not published here, but the team
 * should know it is visible on their own homepage.)
 *
 * ASIM TO CONFIRM with the team before launch: does RTI hold NAID AAA? Is the
 * RIOS certificate current? Both are one-line changes here either way.
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
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

export const INTRO = {
  eyebrow: 'Our Standards',
  heading: 'Certifications & Compliance',
  lead: 'What each standard means, and where our facilities currently stand.',
}

export type CertCard = {
  glyph: 'shield' | 'rosette' | 'doc' | 'truck'
  badge: string
  title: string
  body: string
  /**
   * The doc gives every standard a status sentence that the frame's card has no
   * room for — the badge is only a two-word summary of it. Rather than drop the
   * sentence, each card carries it on its own line and the cards are taller
   * than the frame draws them.
   */
  status: string
}

/** Cards — 6381:1144, the frame's layout with the doc's four standards. */
export const CERTS: CertCard[] = [
  {
    glyph: 'shield',
    badge: 'Blaine, MN Certified',
    title: 'R2v3',
    body: 'The Responsible Recycling standard for electronics, covering downstream vendor management, data sanitization, and material recovery.',
    status: 'Certified at our Blaine, Minnesota facilities. Our New Berlin, Wisconsin facility is currently pursuing R2v3 certification.',
  },
  {
    glyph: 'rosette',
    badge: 'Certified',
    title: 'RIOS',
    body: 'The Recycling Industry Operating Standard, a combined quality, environmental, and health & safety management system built specifically for the recycling industry.',
    status: 'Recycle Technologies is certified by RIOS.',
  },
  {
    glyph: 'doc',
    badge: 'In Compliance',
    title: 'EPA Compliance',
    body: 'Our facilities follow federal regulations set by the EPA, along with Minnesota PCA and Wisconsin DNR guidelines, for the handling of hazardous and universal waste.',
    status: 'Recycle Technologies is referenced as an EPA and State Contracted recycler.',
  },
  {
    glyph: 'truck',
    // The doc gives no two-word status for this one. "Service-Specific" is the
    // badge because the doc's own note says the compliance is scoped to the
    // airbag service rather than to the facilities.
    badge: 'Service-Specific',
    title: 'DOT & EPA Airbag Compliance',
    body: 'We offer certified airbag disposal for both deployed and undeployed units, fully compliant with DOT and EPA standards, a trusted option for auto shops and fleet managers.',
    status: 'This certification applies specifically to our airbag disposal service, not facility-wide operations.',
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
  secondary: { label: 'Get a Quote', href: href('/quote/') },
}

/** Gaps between Figma 6374:4886, the doc and the live site. */
export const TODO_FOR_DESIGN = [
  'THE CARD LIST DIFFERS. The frame draws NAID AAA ("Certified") and e-Stewards ("Not Currently Held"); the doc lists RIOS and DOT & EPA Airbag Compliance instead. The doc is built — see the note at the top of this file. Aqeel and Musaveer need to agree one list, and someone needs to confirm the NAID AAA and RIOS positions with whoever holds the certificates.',
  'The doc heads the hero "Certifications & Standards"; the frame\'s H1 is "Certifications", which is what fits on one line at 70px. The frame is built.',
  'Every card carries a status sentence from the doc that the frame has no room for, so the cards run taller than 239px.',
  'The live homepage shows a REVOKED R2v3 listing for a Minneapolis address alongside the two active Blaine ones. Not published here, but worth someone\'s attention.',
]
