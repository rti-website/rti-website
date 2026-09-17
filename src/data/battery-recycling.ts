import type { ServicePageContent } from '@/data/service-page'
import { href } from '@/lib/urls'

/**
 * /battery-recycling/ — all page copy.
 *
 * Content: the "Battery Recycling" doc (Google Docs 1LJhFM2j1b...).
 * Geometry: the service detail template, Figma 6142:2048 — Aqeel has not drawn
 * a per-service frame, so this page reuses the Electronics Recycling layout and
 * its two photos. Swap `INTRO.image` / `PROCESS.image` when battery-specific
 * art exists.
 * URL: the LIVE url, /battery-recycling/. Verified 15 Sep 2026.
 */

/* ------------------------------------------------------------------ SEO --
 * Same call as /electronic-recycle/: the live values ship at launch
 * (CLAUDE.md rule 6), the doc's proposals are parked for the second wave.
 */
export const LIVE_SEO = {
  title: 'Commercial Battery Recycling | Lithium, Alkaline | Call Now',
  description:
    'Commercial battery recycling for businesses, offices & facilities. Recycle non-hazardous '
    + 'batteries from electronics and devices with reliable service.',
}

export const PROPOSED_SEO = {
  title: 'Battery Recycling Services | Recycle Technologies',
  description:
    'Recycle Technologies recycles alkaline, lithium-ion, lead-acid, and other batteries '
    + 'for businesses, with pickup, drop-off, and mail-in options.',
}

/* ----------------------------------------------------------------- hero --
 * !! H1 CONFLICT !! Live H1 is "BATTERY RECYCLING". The design template's H1
 * pattern is "<Service> Services", so this reads "Battery Recycling Services",
 * matching its sibling page. Fourth instance of the same conflict — see the
 * gate 2 note in the build docs.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',         href: href('/') },
    { label: 'Our Services', href: href('/services/') },
    { label: 'Battery Recycling', href: null },
  ],
  h1: 'Battery Recycling Services',
  lead:
    'Recycle Technologies collects and recycles batteries for businesses and organizations, '
    + 'so spent batteries are sorted and processed instead of sitting in storage or ending '
    + 'up in the trash.',
  pickerPlaceholder: 'Select Your Location',
  pickerOptions: ['Minnesota', 'Wisconsin', 'Nationwide (Mail-In)'],
  cta: { label: 'Get Started', href: href('/quote/') },
}

/* ------------------------------------------------- what's battery recycling --
 * Template node 6197:4463 — text left, photo right, on #f8faf9.
 */
export const INTRO = {
  heading: 'What’s Battery Recycling?',
  body: [
    'Battery recycling is the process of collecting used or spent batteries and handling them '
    + 'properly instead of throwing them away with regular trash. Batteries contain materials '
    + 'that can be hazardous if they’re crushed, damaged, or left to leak, and different '
    + 'battery types need to be handled differently.',
    'Because batteries can start fires or leak chemicals if they’re stored or handled '
    + 'incorrectly, sorting them by type is a key part of the process. At Recycle Technologies, '
    + 'trained staff sort and separate each battery received by type once it arrives, since a '
    + 'container of mixed battery types takes longer to process safely than one that’s '
    + 'already sorted.',
    'Recycling batteries this way reduces the amount of waste sent to landfills and keeps '
    + 'hazardous elements out of the surrounding environment. It also gives a business a '
    + 'documented way to clear out old battery inventory instead of letting it accumulate.',
  ],
  more: { label: 'Read More', href: '#how-we-recycle' },
  image: '/images/services/detail-intro.png',
}

/* --------------------------------------------------------- what we accept --*/
export const ACCEPT = {
  heading: 'What We Accept',
  intro:
    'Recycle Technologies accepts a broad range of battery types. If you’re not sure '
    + 'whether your batteries qualify, call the location nearest you to confirm before '
    + 'scheduling.',
  items: [
    { label: 'Alkaline & Zinc Batteries',              text: 'Standard alkaline and zinc batteries.' },
    { label: 'Lithium-Ion & Lead-Acid Batteries',      text: 'Rechargeable lithium-ion packs and sealed lead-acid batteries.' },
    { label: 'Nickel-Cadmium & Button Cell Batteries', text: 'NiCd batteries and small button-cell batteries.' },
    { label: 'EV, Power Tool & Backup Batteries',      text: 'Electric vehicle batteries, Tesla batteries, power tool packs, and battery backup units.' },
  ],
  outro:
    'Recycle Technologies also handles other battery types, including mercury oxide batteries, '
    + 'on a case-by-case basis, so if your batteries aren’t listed here, reach out and '
    + 'describe what you need to recycle.',
}

/* ------------------------------------------------------ how we recycle it --*/
export const PROCESS = {
  id: 'how-we-recycle',
  heading: 'How Do We Recycle Batteries?',
  intro:
    'Batteries can enter the recycling process through a business pickup, a drop-off at a '
    + 'Recycle Technologies location, or the mail-in program. Because different battery '
    + 'chemistries carry different handling requirements, sorting is central to how batteries '
    + 'move through the process.',
  steps: [
    { label: 'Collection.',          text: 'Businesses can schedule a pickup, and Recycle Technologies covers a 100-mile radius around its Minnesota and Wisconsin facilities. Individuals can use a nearby drop-off location or order a mail-in kit.' },
    { label: 'Sorting and storage.', text: 'Once batteries arrive, trained staff sort and separate them by type. Battery terminals should be covered before shipping or storage to reduce the risk of fire, and batteries sent through the mail-in program should already be separated by type.' },
    { label: 'Documentation.',       text: 'Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.' },
  ],
  outro:
    'Recycle Technologies has handled battery recycling from its Minnesota and Wisconsin '
    + 'facilities since 1993.',
  image: '/images/services/detail-process.png',
}

/* -------------------------------------------------------------------- FAQ --*/
export const FAQS = [
  {
    q: 'What battery types does Recycle Technologies accept?',
    a: 'Alkaline, lithium-ion, lead-acid, nickel-cadmium, button cell, EV and Tesla batteries, and more.',
  },
  {
    q: 'Can I request a pickup for old batteries?',
    a: 'Yes. Business pickup is available within a 100-mile radius of the Minnesota and Wisconsin facilities.',
  },
  {
    q: 'Do I need to sort batteries before recycling them?',
    a: 'Yes, especially for the mail-in program. Batteries should be separated by type and terminals covered before shipping.',
  },
  {
    q: 'What happens after my batteries are collected?',
    a: 'Trained staff sort and separate each battery by type, and a certificate of recycling and safe disposal is issued once the job is complete.',
  },
  {
    q: 'Can batteries be recycled through the mail-in program?',
    a: 'Yes, the mail-in program accepts certain battery types. Sort batteries by type before mailing them in.',
  },
]

export const FAQ_INTRO = {
  eyebrow: 'FAQs',
  heading: 'Frequently Asked Questions',
  lead: 'Recycling helps conserve resources, reduce pollution and support economic sustainability.',
}

/* ------------------------------------------------------------ closing CTA --*/
export const CTA = {
  heading: 'Ready to Recycle Responsibly?',
  body: [
    'Whether you’re a business clearing out spent battery inventory or an individual with '
    + 'a few old batteries to dispose of, Recycle Technologies can help you recycle them '
    + 'properly. Businesses can schedule a pickup or get a quote; individuals can find a '
    + 'drop-off location or start a mail-in kit.',
  ],
  primary:   { label: 'Find Locations',          href: href('/dropoff/') },
  secondary: { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
}

/**
 * The page object the shared ServiceDetailPage renders. The constants above are
 * kept as the readable source; this just assembles them into the common shape
 * every service page uses.
 */
export const CONTENT: ServicePageContent = {
  url: '/battery-recycling/',
  liveSeo: LIVE_SEO,
  proposedSeo: PROPOSED_SEO,
  hero: { crumb: 'Battery Recycling', h1: HERO.h1, lead: HERO.lead, cta: HERO.cta,
          image: '/images/services/hero-batteries.png' },
  intro: INTRO,
  accept: ACCEPT,
  process: PROCESS,
  faqs: FAQS,
  cta: CTA,
}
