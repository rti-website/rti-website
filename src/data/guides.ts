import { href } from '@/lib/urls'

/**
 * /itad-recycling-guides/ — Figma 6382:5883 in fFS1bD6V6j1RhhmzfPxpHk.
 *
 * NEW URL, like /resources/ and /downloads/ before it. It does not resolve on
 * the live site and is not in data/url-map.csv's capture, so there is no live
 * title, description or H1 to preserve and CLAUDE.md rule 6 does not bite. Asim
 * asked for it on 16 Sep 2026, in the footer under the Resources heading.
 *
 * !! NONE OF THE SIX GUIDES EXISTS AS A POST. They are not in the URL map and
 * nobody has written them. Each row is therefore pointed at the real page that
 * answers its question — /it-asset-disposition/ for the ITAD row, the hard
 * drive service page for the data destruction row, and so on — rather than at
 * an invented /guides/<slug>. That follows the call already taken on
 * /resources/ (see src/data/resources.ts): a card that links nowhere makes the
 * page pointless, and a made-up slug is worse than a real URL.
 *
 * The consequence to know about: a row labelled "Read Guide" can land the
 * reader on a service page rather than on an article. Replace each `href` the
 * moment Rizwan writes the actual guide — nothing else on the page changes.
 *
 * `/it-asset-disposition/` was a KEEP row this app did not serve until
 * 23 Sep 2026; it is built now, so the ITAD row lands on a real page.
 */

export const SEO = {
  title: 'ITAD & Recycling Guides | Recycle Technologies',
  description:
    'Practical guides to IT asset disposition, certified data destruction, R2v3 compliance, bulk electronics pickups and the Mail-In Program, plus reference documents for procurement and IT teams.',
}

/** Hero — 6478:4384. Breadcrumb trail is Home / ITAD & Recycling Guides. */
export const HERO = {
  crumbs: [
    { label: 'Home',                     href: href('/') },
    { label: 'ITAD & Recycling Guides',  href: null },
  ],
  h1: 'ITAD & Recycling Guides',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/** A guide row. `glyph` picks a mark; see GuideSections for the two sets. */
export type GuideRow = {
  glyph: 'laptop' | 'loop' | 'lock' | 'seal' | 'box' | 'mail'
  title: string
  body: string
  href: string
}

/** Section - Guide List, 6386:1349. Six 1282-wide rows on #eaf4f5 plates. */
export const GUIDES: {
  label: string
  eyebrow: string
  heading: string
  lead: string
  rows: GuideRow[]
} = {
  label: '6386:1349',
  eyebrow: 'GUIDES',
  heading: 'ITAD & Recycling Guides',
  lead: 'Practical guidance on IT asset disposition, secure data destruction, and responsible recycling.',
  rows: [
    {
      glyph: 'laptop',
      title: 'What Is IT Asset Disposition (ITAD)?',
      body: 'An overview of ITAD for businesses — what it covers, why it matters for compliance, and how it differs from standard recycling.',
      // KEEP row in url-map.csv, built=FALSE. 404s until that page is migrated.
      href: href('/it-asset-disposition/'),
    },
    {
      glyph: 'lock',
      title: 'Data Destruction & Hard Drive Wiping Guide',
      body: "Why deleting files isn't enough, and what a certified hard drive destruction process actually involves.",
      href: href('/hard-drive-destruction-services/'),
    },
    {
      glyph: 'seal',
      title: 'Understanding R2v3 & Electronics Recycling Compliance',
      body: "A plain-language look at the R2v3 standard and what it means for your organization's compliance obligations.",
      href: href('/compliance-center/'),
    },
    {
      glyph: 'box',
      title: 'Preparing Your Business for a Bulk Electronics Pickup',
      body: 'What to sort, label, and document before a scheduled commercial pickup, so the process goes smoothly.',
      // The weakest of the six mappings: no page covers pickup preparation, and
      // this one describes commercial electronics pickups. Flagged for Rizwan.
      href: href('/electronic-recycle/'),
    },
    {
      glyph: 'mail',
      title: 'How the Mail-In Recycling Program Works',
      body: 'Step-by-step: ordering a kit, packing your devices, and what happens after you drop it off at FedEx.',
      href: href('/mail-in-recycling/'),
    },
    {
      glyph: 'loop',
      title: 'Recycling Symbols Explained',
      body: "A quick-reference guide to the recycling symbols you'll find on electronics, batteries, and packaging.",
      // The one exact match: this guide is built.
      href: href('/recycle-symbol/'),
    },
  ],
}

/**
 * Section - Downloads, 6386:1350. Three 410-wide cards.
 *
 * ! EVERY CARD IS A REQUEST, NOT A FILE, for the same reason as /downloads/:
 * none of these PDFs exists, so each points at /contact-us/ with the document
 * named in the query rather than at a dead .pdf. The first two are the same
 * documents /downloads/ offers, and deliberately use the same request URLs, so
 * an enquiry reads identically whichever page it came from.
 */
const request = (doc: string) => `${href('/contact-us/')}?document=${encodeURIComponent(doc)}`

export const DOCS = {
  label: '6386:1350',
  eyebrow: 'DOWNLOADS',
  heading: 'Reference Documents',
  lead: 'Documentation for your procurement, compliance, or IT teams.',
  cards: [
    {
      glyph: 'shield' as const,
      kind: 'PDF',
      title: 'Sample Certificate of Recycling',
      body: "See what documentation you'll receive after a completed pickup or mail-in shipment, for your own compliance records.",
      href: request('Sample Certificate of Recycling'),
    },
    {
      glyph: 'list' as const,
      kind: 'PDF',
      title: 'Accepted Materials Checklist',
      body: 'A printable checklist of what we accept — electronics, batteries, bulbs, and more — organized by category.',
      href: request('Accepted Materials Checklist'),
    },
    {
      glyph: 'doc' as const,
      kind: 'PDF',
      title: 'ITAD Service Overview',
      body: 'A one-page summary of our IT asset disposition services for procurement or IT teams evaluating vendors.',
      href: request('ITAD Service Overview'),
    },
  ],
}
