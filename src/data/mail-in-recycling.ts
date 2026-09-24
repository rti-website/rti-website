import type { ServicePageContent } from '@/data/service-page'
import { href, QUOTE_HREF } from '@/lib/urls'

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
    // The doc's "Get Quote" (24 Sep 2026), worded like every other quote button.
    cta: { label: 'Get a Quote', href: QUOTE_HREF },
    image: '/images/services/hero-mail-in.png',
  },
  intro: {
    heading: 'What Is the Mail-In Recycling Program?',
    body: [
      'Not everyone lives near a Recycle Technologies drop-off location, and not everyone qualifies for scheduled business pickup. The Mail-In Program exists to reach those customers anyway.',
      'If a local search for “electronics recycling near me” doesn’t turn up a nearby option, the Mail-In Program fills that gap. Instead of a trip to a facility or a scheduled pickup, you order what you need online and ship your items back on your own timeline.',
      'This makes it the right option when you’re outside our Minnesota and Wisconsin service area, or when your situation simply doesn’t fit local drop-off or commercial pickup. Unlike our pickup service, which is limited to commercial clients, the Mail-In Program is open to individuals and businesses alike.',
      'Once received, materials sent through the Mail-In Program enter the same recycling process Recycle Technologies has run out of its licensed Minnesota and Wisconsin facilities since 1993.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/mail-in-intro.jpg',
  },
  accept: {
    heading: 'What Can I Send Through the Mail-In Program?',
    intro: [
      'Recycle Technologies’ recycling operations commonly process electronics, light bulbs and CFLs, batteries, and ballasts, along with a range of other e-waste and hazardous-component items. This gives a general sense of what we handle, but not every item accepted at our facilities is automatically eligible for mail-in shipping, since some materials carry shipping restrictions under federal transportation rules.',
      'Before placing an order, confirm your specific item is eligible for the Mail-In Program, as opposed to local drop-off or pickup, by selecting your materials through our kit ordering tool or contacting our team directly.',
    ],
    itemsHeading: 'Commonly Processed Recycling Operations:',
    items: [
      { label: 'Computers, laptops, and monitors',              text: '' },
      { label: 'Phones, tablets, and small electronics',        text: '' },
      { label: 'Batteries (alkaline, lithium, and lead-acid)',  text: '' },
      { label: 'Fluorescent lamps, bulbs, and CFLs',            text: '' },
      { label: 'Ballasts and other lighting components',        text: '' },
    ],
    outro: 'Looking to send over something else? Reach out to our operations team to seek instant help.',
  },
  process: {
    heading: 'How Does the Mail-In Program Work?',
    intro: 'The Mail-In Program is built around ordering, shipping, and processing, not a facility visit or a scheduled pickup.',
    steps: [
      { label: 'Order Online:',          text: 'Select your location and choose the recycling kit that matches what you need to send. Purchase it directly through Recycle Technologies’ Mail-In Program.' },
      { label: 'Pack and Ship:',         text: 'Once your kit arrives, pack your eligible items and send the kit back using the return method included with your order.' },
      { label: 'Receipt and Recycling:', text: 'Once your shipment arrives, it’s processed through Recycle Technologies’ recycling operations at our licensed Minnesota and Wisconsin facilities, the same standard applied to every material we handle, regardless of how it reaches us.' },
    ],
    image: '/images/services/mail-in-process.jpg',
  },
  faqs: [
    { q: 'Can I use the Mail-In Program if I live outside Minnesota or Wisconsin?', a: 'Yes, that’s exactly who it’s for. The Mail-In Program was built for customers outside our Minnesota and Wisconsin drop-off and pickup areas, so you can ship eligible materials to us from anywhere in the country.' },
    { q: 'Is the Mail-In Program available to individuals or only businesses?', a: 'It’s open to anyone. Unlike our pickup service, which is limited to commercial clients, the Mail-In Program is available to both individuals and businesses.' },
    { q: 'What happens to my materials after they’re received?', a: 'Your shipment enters the same recycling process as materials received at our facilities directly. Items are sorted, dismantled into base materials, and directed toward reuse, refurbishment, or recovery, never sent straight to a landfill.' },
  ],
  cta: {
    heading: 'Ready to Recycle by Mail?',
    body: [
      'If a local drop-off or pickup option isn’t available to you, get started with the Mail-In Program to send in your eligible materials. Business pickup service is available exclusively to commercial clients; the Mail-In Program is open to anyone.',
    ],
    primary:   { label: 'Get a Quote',    href: QUOTE_HREF },
    secondary: { label: 'Find Locations', href: href('/all-locations/') },
  },
  todo: [
    'Doc of 24 Sep 2026 replaced the placeholder sections: the eligibility list, the three process steps and the three FAQs are now its copy. Still unpublished: who pays for shipping, and whether mail-in orders get recycling documentation.',
    'URL /mail-in-recycling/ is new. Every existing "Mail In Program" link still points to ezontheearth.com. Confirm with Asim before repointing them.',
  ],
}
