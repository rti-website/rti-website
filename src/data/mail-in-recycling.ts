import type { ServicePageContent } from '@/data/service-page'
import { href } from '@/lib/urls'

/**
 * /mail-in-recycling/ — copy from the "Mail-In Recycling Program" doc.
 *
 * !! THIS IS A NEW URL, NOT A MIGRATED ONE !!
 * The live site has no mail-in page: every "Mail In Program" link in the header,
 * footer and services catalogue points off-site to ezontheearth.com. So there is
 * no live title, description or H1 to port, and the doc's proposed SEO is what
 * ships — rule 6 only governs URLs that already rank.
 *
 * Nothing links here yet, deliberately. Pointing the existing links at this page
 * would move traffic off ezontheearth.com, which is a commercial decision for
 * Asim, not a build decision. Ask before wiring it in.
 *
 * !! THE DOC IS PART PLACEHOLDER !!
 * Five of its sections are marked "[Placeholder: ... not published on the main
 * Recycle Technologies website]". Those are omitted rather than rendered — a
 * bracketed placeholder must never reach a live page — and listed in `todo`
 * below so the gap stays visible to the team. This page is thinner than its
 * siblings until Musaveer fills them in.
 */
export const CONTENT: ServicePageContent = {
  url: '/mail-in-recycling/',
  liveSeo: {
    title: 'Mail-In Recycling Program | Recycle Technologies',
    description: 'Recycle Technologies’ Mail-In Program lets you ship eligible materials for recycling from anywhere, without a local drop-off or pickup.',
  },
  proposedSeo: {
    title: 'Mail-In Recycling Program | Recycle Technologies',
    description: 'Recycle Technologies’ Mail-In Program lets you ship eligible materials for recycling from anywhere, without a local drop-off or pickup.',
  },
  hero: {
    crumb: 'Mail-In Recycling Program',
    h1: 'Mail-In Recycling Program',
    lead: 'Recycle Technologies’ Mail-In Program gives customers outside its local drop-off and pickup areas a way to send eligible materials for recycling, including items purchased online and shipped in when a nearby option isn’t available.',
    cta: { label: 'Get Started', href: 'https://ezontheearth.com/', external: true },
    image: '/images/services/hero-mail-in.png',
  },
  intro: {
    heading: 'What Is the Mail-In Recycling Program?',
    body: [
      'The Mail-In Program exists for a straightforward reason: not everyone lives near a Recycle Technologies drop-off location, and not everyone qualifies for scheduled business pickup. This program is built to reach those customers by mail instead.',
      'Recycle Technologies describes the program as a nationwide option for anyone whose local search for recycling services doesn’t return a nearby result. Rather than requiring a trip to a facility or a scheduled pickup, customers order recycling materials online and ship their items in once ready.',
      'This makes the Mail-In Program the option to use when you’re outside Recycle Technologies’ Minnesota and Wisconsin service area, or when your situation doesn’t fit neatly into local drop-off or commercial pickup. It’s described as open to anyone, distinguishing it from the pickup service, which is limited to commercial clients.',
      'Once received, materials sent through the Mail-In Program enter the same recycling operation that Recycle Technologies has run out of its licensed Minnesota and Wisconsin facilities since 1993.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/detail-intro.png',
  },
  accept: {
    heading: 'What Can I Send Through the Mail-In Program?',
    // No grid: the doc has no itemised eligibility list to show.
    intro: 'Recycle Technologies’ broader recycling operations cover a range of materials, including electronics, light bulbs, batteries, ballasts, and other items, which gives a general sense of what the company processes. Whether a given item is specifically eligible for the Mail-In Program, as opposed to local drop-off or pickup, should be confirmed before shipping.',
    items: [],
  },
  process: {
    heading: 'How Does the Mail-In Program Work?',
    intro: 'The Mail-In Program is designed around ordering, shipping, and processing, rather than a facility visit or scheduled pickup.',
    steps: [
      { label: 'Order online:',           text: 'Purchase what you need through Recycle Technologies’ Mail-In Program to get started.' },
      { label: 'Receipt and Recycling:',  text: 'Once your shipment arrives, it’s processed through Recycle Technologies’ recycling operations at its licensed facilities in Minnesota and Wisconsin.' },
    ],
    image: '/images/services/detail-process.png',
  },
  faqs: [
    { q: 'Can I use the Mail-In Program if I live outside Minnesota or Wisconsin?', a: 'Yes. The program is described as countrywide, built for customers without a nearby drop-off or pickup option.' },
    { q: 'Is the Mail-In Program available to individuals or only businesses?', a: 'Individuals can use it. This is different from Recycle Technologies’ pickup service, which is limited to commercial clients.' },
    { q: 'What happens to my materials after they’re received?', a: 'They’re processed through Recycle Technologies’ recycling operations, the same system used across its other services.' },
  ],
  cta: {
    heading: 'Ready to Recycle by Mail?',
    body: [
      'If a local drop-off or pickup option isn’t available to you, get started with the Mail-In Program to send in your eligible materials. Business pickup service is available exclusively to commercial clients; the Mail-In Program is described as open to anyone.',
    ],
    primary:   { label: 'Get Started',    href: 'https://ezontheearth.com/', external: true },
    secondary: { label: 'Find Locations', href: href('/dropoff/') },
  },
  todo: [
    'What Can I Send: no itemised eligibility list published. Section renders the general paragraph only, with no grid.',
    'Process step "Determine Eligibility": eligibility requirements not published. Omitted.',
    'Process step "Prepare Your Materials": packaging and labelling instructions not published. Omitted.',
    'Process step "Ship to Recycle Technologies": shipping instructions, carrier and cost not published. Omitted.',
    'FAQ "Who pays for shipping through the Mail-In Program?": answer not published. Question omitted.',
    'FAQ "Does the Mail-In Program provide recycling documentation?": answer not published. Question omitted.',
    'URL /mail-in-recycling/ is new. Every existing "Mail In Program" link still points to ezontheearth.com — confirm with Asim before repointing them.',
  ],
}
