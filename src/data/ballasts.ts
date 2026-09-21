import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /ballasts/ — copy from the "Ballast Recycling" doc, geometry from 6142:2048.
 *
 * NOTE ON SEO: unlike the other nine service pages, this URL does not resolve on
 * the live site — https://www.recycletechnologies.com/ballasts/ returns the
 * homepage with a canonical pointing at "/", which is how that WordPress install
 * soft-404s. So there is no live title, description or H1 to preserve here and
 * CLAUDE.md rule 6 does not bite: the doc's own metadata ships as the live
 * metadata. `liveSeo` and `proposedSeo` are deliberately identical.
 */
export const CONTENT: ServicePageContent = {
  url: '/ballasts/',
  liveSeo: {
    title: 'Ballast Recycling Services | PCB & Non-PCB | Recycle Technologies',
    description: 'Recycle Technologies recycles PCB, non-PCB, electronic, and magnetic ballasts for businesses, with EPA-approved processing and a Certificate of Recycling.',
  },
  proposedSeo: {
    title: 'Ballast Recycling Services | PCB & Non-PCB | Recycle Technologies',
    description: 'Recycle Technologies recycles PCB, non-PCB, electronic, and magnetic ballasts for businesses, with EPA-approved processing and a Certificate of Recycling.',
  },
  hero: {
    crumb: 'Ballasts Recycling',
    h1: 'Ballasts Recycling',
    lead: 'Recycle Technologies accepts PCB, non-PCB, electronic, and magnetic ballasts from commercial and industrial facilities, processing hazardous components through an EPA-approved incineration facility and reclaiming non-hazardous metals like copper and steel.',
    cta: { label: 'Get a Quote', href: QUOTE_HREF },
    image: '/images/services/hero-ballasts.png',
  },
  intro: {
    heading: 'What’s Ballast Recycling?',
    body: [
      'A ballast is the component inside a fluorescent or HID light fixture that regulates the electrical current to the lamp. When a fixture is replaced or a building upgrades its lighting, the old ballasts still need to go somewhere, and they aren’t something you can simply throw in a dumpster.',
      'Older magnetic ballasts can contain capacitors filled with PCBs (polychlorinated biphenyls) or DEHP, both regulated substances that require special handling. Newer electronic ballasts typically don’t rely on PCB-containing capacitors, but they still contain a mix of metals, plastics, and electronic components that shouldn’t go to a landfill.',
      'Ballast recycling is the process of separating these components so hazardous materials are properly destroyed and reusable materials, like copper and steel, are recovered instead of wasted. Because not every ballast is built the same way, the type of ballast you have determines how it needs to be processed.',
      'That’s why a recycler needs to be able to identify and handle multiple ballast types rather than treating every unit the same way.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/detail-intro.png',
  },
  accept: {
    heading: 'What We Accept',
    intro: 'Recycle Technologies accepts the following ballast types:',
    items: [
      { label: 'PCB Ballasts',        text: 'Older magnetic ballasts that may contain PCB-containing capacitors. These require regulated handling and are routed to incineration.' },
      { label: 'Non-PCB Ballasts',    text: 'Magnetic or electronic ballasts manufactured without PCB-containing capacitors.' },
      { label: 'Electronic Ballasts', text: 'Used in many newer fluorescent fixtures, processed for material recovery.' },
      { label: 'Magnetic Ballasts',   text: 'Traditional ballast type found in older lighting fixtures.' },
    ],
    outro: 'If you’re not sure which type of ballast you have, describe your materials when requesting a quote and Recycle Technologies can help you determine how they need to be handled.',
  },
  process: {
    heading: 'How Do We Recycle Ballasts?',
    intro: 'Ballast recycling at Recycle Technologies moves through a defined sequence, from collection through material recovery, so that hazardous components are separated out and handled correctly while recoverable metals are reclaimed rather than landfilled.',
    steps: [
      { label: 'Collection',  text: 'Used ballasts are gathered from businesses, buildings, and industrial sites. Business customers can request a pickup, which is available exclusively for commercial clients. Ballasts can also be sent through the mail-in program or dropped off at a facility location.' },
      { label: 'Sorting',     text: 'Once received, ballasts are sorted by category, generally magnetic or electronic, since each type is processed differently downstream.' },
      { label: 'Dismantling', text: 'Ballasts are taken apart to separate their components, including metals, plastics, and any capacitors.' },
      { label: 'Separation of Hazardous Components', text: 'PCB- and DEHP-containing capacitors are removed from the cover materials. These hazardous components are sent to an EPA-approved incineration facility through a certified hazardous waste hauler, which eliminates generator liability for the business that disposed of them.' },
      { label: 'Material Recovery', text: 'Non-hazardous materials, including copper and steel, are separated for reclamation. Plastics and other recoverable materials are also processed for reuse rather than sent to a landfill.' },
    ],
    // The doc closes this section with two paragraphs, not one.
    outro: [
      'When processing is complete, Recycle Technologies issues a Certificate of Recycling that documents proper disposal, which many businesses need for their own compliance records.',
      'Recycle Technologies has provided recycling services to the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin.',
    ],
    image: '/images/services/detail-process.png',
  },
  // The doc's compliance line ("...recognized industry certification standards
  // for responsible recycling, including R2v3") is the same generic statement
  // the shared band already makes, so this page keeps the shared paragraph like
  // the other eight. Airbag is the only page whose doc writes page-specific
  // compliance copy worth overriding it for.
  faqs: [
    { q: 'Does Recycle Technologies recycle PCB ballasts?', a: 'Yes. PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility via a certified hazardous waste hauler.' },
    { q: 'What happens to non-hazardous ballast materials?', a: 'Copper, steel, and other non-hazardous materials are separated out and sent for reclamation instead of disposal.' },
    { q: 'Can businesses schedule a ballast pickup?', a: 'Yes. Pickup service is available, but it’s offered exclusively to commercial clients rather than residential customers.' },
    { q: 'Do I get documentation after my ballasts are recycled?', a: 'Yes. Recycle Technologies issues a Certificate of Recycling once processing is complete.' },
    { q: 'Can I recycle ballasts if I’m not near a Minnesota or Wisconsin facility?', a: 'Yes. Ballasts can also be sent through Recycle Technologies’ mail-in recycling program.' },
  ],
  cta: {
    heading: 'Ready to Recycle Your Ballasts?',
    body: [
      'If your business has used or retired ballasts to dispose of, request a pickup or get a quote to get started.',
      'Pickup service is available exclusively for commercial customers; if you’re a residential customer, you can find a nearby drop-off location or order a mail-in recycling kit instead.',
    ],
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
  todo: [
    'Case studies and customer testimonials are marked "to be added" in the doc.',
  ],
}
