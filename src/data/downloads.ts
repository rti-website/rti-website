import { href } from '@/lib/urls'

/**
 * /downloads/ — Figma 6382:7043 in fFS1bD6V6j1RhhmzfPxpHk.
 *
 * NEW URL. /downloads/ does not exist on the live site — it is not in
 * data/url-map.csv's capture and it does not resolve — so there is no live
 * title, description or H1 to preserve and CLAUDE.md rule 6 does not bite. Same
 * situation as /sustainability/, /compliance-center/ and /case-studies/.
 *
 * ! EVERY CARD HERE IS A REQUEST, NOT A FILE. The design says "Request
 * Download" on all eight, and none of these PDFs exists yet — there is nothing
 * to link to. Each card points at /contact-us/ with the document named in the
 * query so the enquiry arrives with context, rather than at a dead .pdf. Swap
 * the hrefs for real files the moment Aqeel or Rizwan supplies them; nothing
 * else about the page has to change.
 */

export const SEO = {
  title: 'Downloads | Certificates, Checklists & Shipping Guides | Recycle Technologies',
  description:
    'Sample certificates of recycling and destruction, compliance checklists for policy and procurement teams, and Mail-In Program shipping and packaging guides.',
}

/** Hero — 6478:5167. Breadcrumb trail is Home / Downloads. */
export const HERO = {
  crumbs: [
    { label: 'Home',      href: href('/') },
    { label: 'Downloads', href: null },
  ],
  h1: 'Downloads',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/** A card. `glyph` picks one of the marks in DownloadMarks. */
export type DownloadCard = {
  glyph: 'shield' | 'lock' | 'list' | 'seal' | 'globe' | 'tag' | 'box' | 'mail' | 'doc'
  kind: string
  title: string
  body: string
  /** Where "Request Download" goes. See the note at the top of this file. */
  href: string
}

export type DownloadSection = {
  label: string
  eyebrow: string
  heading: string
  lead: string
  cards: DownloadCard[]
}

const request = (doc: string) => `${href('/contact-us/')}?document=${encodeURIComponent(doc)}`

/** 6393:1579 — two cards, 410 wide, centred. */
export const CERTIFICATES: DownloadSection = {
  label: '6393:1579',
  eyebrow: 'SAMPLE DOCUMENTATION',
  heading: 'Sample Certificate of Recycling & Destruction',
  lead: "See exactly what documentation you'll receive after a completed job.",
  cards: [
    {
      glyph: 'shield',
      kind: 'PDF',
      title: 'Sample Certificate of Recycling',
      body: 'An example of the certificate issued after a completed electronics or bulb recycling pickup or mail-in shipment.',
      href: request('Sample Certificate of Recycling'),
    },
    {
      glyph: 'lock',
      kind: 'PDF',
      title: 'Sample Certificate of Destruction',
      body: 'An example of the certificate issued after hard drive destruction or paper shredding, confirming secure data destruction.',
      href: request('Sample Certificate of Destruction'),
    },
  ],
}

/** 6393:1580 — three cards. */
export const CHECKLISTS: DownloadSection = {
  label: '6393:1580',
  eyebrow: 'COMPLIANCE CHECKLISTS',
  heading: 'Compliance Checklists',
  lead: 'Reference documents for your internal policy and procurement teams.',
  cards: [
    {
      glyph: 'list',
      kind: 'PDF',
      title: 'Accepted Materials Checklist',
      body: 'A printable checklist of what we accept — electronics, batteries, bulbs, and more — organized by category.',
      href: request('Accepted Materials Checklist'),
    },
    {
      glyph: 'seal',
      kind: 'PDF',
      title: 'R2v3 Certificate Summary',
      body: 'Certification scope and facility details for our Blaine, Minnesota operations, suitable for vendor audits.',
      href: request('R2v3 Certificate Summary'),
    },
    {
      glyph: 'globe',
      kind: 'PDF',
      title: 'MN & WI Regulation Summary',
      body: 'A one-page reference covering the electronics disposal bans in both states, for internal policy use.',
      href: request('MN & WI Regulation Summary'),
    },
  ],
}

/** 6393:1581 — three cards. */
export const SHIPPING: DownloadSection = {
  label: '6393:1581',
  eyebrow: 'MAIL-IN PROGRAM',
  heading: 'Shipping Labels & Packaging Guides',
  lead: 'Everything you need to send materials through our Mail-In Program.',
  cards: [
    {
      glyph: 'tag',
      kind: 'PDF',
      title: 'Prepaid Shipping Label',
      body: 'A printable prepaid label to attach to your recycling kit before dropping it off at the nearest FedEx.',
      href: request('Prepaid Shipping Label'),
    },
    {
      glyph: 'box',
      kind: 'PDF',
      title: 'Packaging Guide',
      body: 'How to pack your devices safely — cushioning, sealing, and weight limits — so they arrive intact.',
      href: request('Packaging Guide'),
    },
    {
      glyph: 'mail',
      kind: 'PDF',
      title: 'Mail-In Kit Instructions',
      body: 'Step-by-step instructions for using your recycling kit, from unboxing to drop-off.',
      href: request('Mail-In Kit Instructions'),
    },
  ],
}
