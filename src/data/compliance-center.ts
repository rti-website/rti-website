import { href } from '@/lib/urls'

/**
 * /compliance-center/ — a 1:1 build of Figma frame 6382:6227.
 *
 * NO CONTENT DOC for this page. Every other page in this build adjudicates a
 * writer's doc against the frame; here the frame is the only source, so the
 * frame's copy is built verbatim except where it states something that cannot
 * be verified. There is exactly one such place — the NAID AAA row, below.
 *
 * NEW URL. /compliance-center/ does not resolve on the live site: it serves the
 * homepage, titled "E-Waste, Electronics & Industrial Recycling Services" with
 * canonical "https://www.recycletechnologies.com/". So there is no live title,
 * description or H1 to preserve and CLAUDE.md rule 6 does not bite.
 */

export const SEO = {
  title: 'Compliance Center | R2v3, EPA, MN & WI Law | Recycle Technologies',
  description:
    'The certifications and regulations that govern how Recycle Technologies operates — R2v3 scope, EPA hazardous materials rules, and the Minnesota and Wisconsin electronics disposal bans.',
}

/**
 * Hero — 6382:6229.
 *
 * Breadcrumb and lead both come straight from the frame, which for once has the
 * right breadcrumb — "Home / Compliance Center", not the "Home / Certifications"
 * leftover that 6374:5213 and 6374:4569 carry.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',              href: href('/') },
    { label: 'Compliance Center', href: null },
  ],
  h1: 'Compliance Center',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

type StatusTone = 'ok' | 'warn'

/**
 * Standards table — 6389:1536.
 *
 * ====================================================================
 * THE NAID AAA ROW IS DELIBERATELY ABSENT — DO NOT "RESTORE" IT BLIND
 * ====================================================================
 * The frame draws five rows; four are built. The missing one is
 * NAID AAA, status "Certified".
 *
 * Nothing supports it. The live site's only NAID sentence is about a different
 * company — "ERI holds the highest level of certifications … the only provider
 * to have all eight US facilities certified by NAID and e-Stewards" — which is
 * almost certainly where this row, the same card on the Certifications frame,
 * and the stray "certified R2v3 and NAID AAA facility" description in
 * url-map.csv all came from. The Certifications page already omits it for the
 * same reason, so publishing it here would make two pages of this site
 * disagree with each other about a certification.
 *
 * Asim chose "leave the row out" on 15 Sep 2026, after being offered the two
 * alternatives (publish as "Certified", or publish as "Not Currently Held").
 *
 * To restore it once someone produces a current certificate number or an
 * i-SIGMA member listing, paste this back as the second entry:
 *
 *   {
 *     name:   'NAID AAA',
 *     detail: 'The data destruction industry’s highest certification for secure, DOD-compliant destruction of sensitive data.',
 *     status: 'Certified',
 *     tone:   'ok' as const,
 *   },
 *
 * If it turns out RTI does NOT hold it, the honest version is the same object
 * with status 'Not Currently Held' and tone 'warn' — the e-Stewards row below
 * shows how that reads.
 */
export const STANDARDS = {
  eyebrow: 'Compliance Center',
  heading: 'Standards We’re Held To',
  lead: 'A single reference for the certifications and regulations that govern how we operate.',
  rows: [
    {
      name:   'R2v3',
      detail: 'Responsible Recycling standard covering downstream vendor management, data sanitization, and materials recovery.',
      status: 'Blaine, MN Certified',
      tone:   'ok' as StatusTone,
    },
    {
      name:   'e-Stewards',
      detail: 'An independent standard focused on preventing e-waste exports and protecting worker health industry-wide.',
      status: 'Not Currently Held',
      tone:   'warn' as StatusTone,
    },
    {
      name:   'EPA Regulations',
      detail: 'Federal rules governing hazardous materials handling, transport, and disposal — ballasts, batteries, airbags.',
      status: 'In Compliance',
      tone:   'ok' as StatusTone,
    },
    {
      name:   'Downstream Vendor Transparency',
      detail: 'Audited visibility into where materials go after they leave our facility, required under our R2v3 scope.',
      status: 'R2v3 Scoped',
      tone:   'ok' as StatusTone,
    },
  ],
}

/**
 * State regulations — 6389:1577. Two 629px cards.
 *
 * These are statements about Minnesota and Wisconsin law, so they were checked
 * rather than transcribed. All six hold up: Minnesota banned CRTs from the
 * trash in 2006 and passed its video-display-device recycling law in 2007 with
 * manufacturer registration and funding obligations; Wisconsin's Act 50 banned
 * covered electronics from landfills and incinerators on 1 September 2010,
 * applies to households and institutions alike, and major appliances are banned
 * separately under the state's older recycling law.
 */
export const STATE_LAW = {
  eyebrow: 'State Regulations',
  heading: 'Minnesota & Wisconsin Law',
  lead: 'The disposal bans and requirements behind why proper electronics recycling isn’t optional.',
  cards: [
    {
      tag: 'Minnesota',
      title: 'Minnesota Electronics Recycling Act',
      points: [
        'CRT devices (older tube-style monitors and TVs) have been banned from regular trash since 2006.',
        'Video display devices — TVs, monitors, and related equipment — are required to be recycled under the state’s 2007 electronics law.',
        'Manufacturers must register and fund collection programs for covered devices sold in Minnesota.',
      ],
    },
    {
      tag: 'Wisconsin',
      title: 'E-Cycle Wisconsin (Act 50)',
      points: [
        'TVs, computers, cell phones, monitors, and related electronics have been banned from Wisconsin landfills and incinerators since September 2010.',
        'The ban applies to everyone — households, schools, businesses, and government offices alike.',
        'Major appliances are also banned from Wisconsin landfills under a separate state recycling law.',
      ],
    },
  ],
}

/**
 * Case studies — 6390:1532. Three 410px cards.
 *
 * !! THE CARDS THEMSELVES ARE NOT HERE. This frame draws the same three stories
 * as /case-studies/ (6391:1547), with byte-identical copy, so all five live in
 * CASE_STUDY_CARDS in src/data/case-studies.ts and both pages read from there.
 * COMPLIANCE_CASE_IDS in that file picks the three this page shows, in this
 * frame's order. Editing a story there updates both pages; pasting a copy back
 * here is how the two pages start telling different versions of it.
 *
 * Only this section's own heading block lives below.
 */
export const CASE_STUDIES = {
  eyebrow: 'Case Studies',
  heading: 'How We Solve Compliance Challenges',
  lead: 'Representative examples of the kind of work we do — client names withheld for confidentiality.',
}

/**
 * Downloads — 6390:1564. Three 410px cards.
 *
 * !! NONE OF THESE THREE PDFs EXIST IN THE REPO. The frame labels the action
 * "Request Download", not "Download", so each card links to /contact-us/ rather
 * than to a file that would 404. That is the honest reading of the design's own
 * wording and it needs no placeholder assets.
 *
 * When the PDFs are produced, drop them in public/downloads/ and change `href`
 * to the file path plus `file: true` — the card renders the same either way.
 */
export const DOWNLOADS = {
  eyebrow: 'Downloads',
  heading: 'Compliance Documentation',
  lead: 'For your legal, procurement, or compliance teams.',
  cards: [
    {
      glyph: 'badge' as const,
      kind: 'PDF',
      title: 'R2v3 Certificate Summary',
      body: 'Certification scope and facility details for our Blaine, Minnesota operations, suitable for vendor audits.',
      href: href('/contact-us/'),
    },
    {
      glyph: 'doc' as const,
      kind: 'PDF',
      title: 'Sample Certificate of Recycling',
      body: 'An example of the documentation issued after every completed pickup or mail-in shipment.',
      href: href('/contact-us/'),
    },
    {
      glyph: 'book' as const,
      kind: 'PDF',
      title: 'MN & WI Regulation Summary',
      body: 'A one-page reference covering the electronics disposal bans in both states, for internal policy use.',
      href: href('/contact-us/'),
    },
  ],
  action: 'Request Download',
}

/** Gaps between Figma 6382:6227 and what can be verified. */
export const TODO_FOR_DESIGN = [
  'CLAIM NOT PUBLISHED: the standards table\'s "NAID AAA — Certified" row is built out, on Asim\'s decision of 15 Sep 2026. Nothing supports RTI holding NAID AAA; the live site\'s only NAID sentence describes ERI, a different company. This is the THIRD place the claim has surfaced — this frame, the Certifications frame (6381:1144) and the url-map description — all traceable to that one sentence. Someone should produce a certificate number or an i-SIGMA member listing, or have the sentence removed from the live homepage. Restoring the row is a one-line paste; the exact object is in the comment above STANDARDS.',
  'The three "Compliance Documentation" PDFs do not exist. The frame\'s own label is "Request Download", so all three cards link to /contact-us/ instead of to a missing file. Produce the PDFs and they become real links with a two-field change each.',
  'This frame has NO CONTENT DOC, unlike every other page in the build. Its copy has not been through Musaveer. Worth a read-through before launch, especially the three case studies — they are written as "representative examples" with names withheld, which is fine, but if any is a real engagement the details should be checked.',
  'The frame has no closing CTA, which every other interior page in this build has. Deliberate or an omission? The page currently ends on the downloads grid and goes straight into the footer.',
  'The glyphs are drawn inline rather than exported (figma.com is unreachable from the build sandbox). Originals: 6390:1568, 6390:1580, 6390:1593 (download kinds) and 6390:1574 (the download arrow); the three case-study marks live in src/components/ui/CaseStudyCard.tsx with the shared card.',
]
