import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/** /tv-recycling/ — copy from the "Television Recycling" doc, geometry from 6142:2048. */
export const CONTENT: ServicePageContent = {
  url: '/tv-recycling/',
  liveSeo: {
    title: 'Commercial TV Recycling | LCD, LED | Call (800) 969-5166',
    description: 'Commercial TV recycling for businesses, offices, and facilities. Recycle LCD, LED, plasma & flat-screen TVs. Call (800) 969-5166.',
  },
  proposedSeo: {
    title: 'Television Recycling Services | CRT, LCD & LED | Recycle Tech',
    description: 'Commercial television recycling for CRT, LCD, LED, and plasma TVs. Recycle Technologies handles pickup, hazard documentation, and material recovery.',
  },
  hero: {
    crumb: 'Television Recycling',
    // Live H1 is "TV RECYCLING".
    h1: 'Television Recycling Services',
    lead: 'Recycle Technologies provides commercial television recycling for businesses, offices, and facilities, handling CRT, LCD, LED, plasma, and flat-screen TVs so hazardous components are properly managed rather than sent to a landfill.',
    cta: { label: 'Get a Quote', href: QUOTE_HREF },
    image: '/images/services/hero-television.png',
  },
  intro: {
    heading: 'What Is Television Recycling?',
    body: [
      'Television recycling is the process of breaking down a retired TV so its materials can be handled correctly instead of being thrown away. This matters because not every television is built the same way, and some contain components that need special handling.',
      'Older CRT (cathode-ray tube) televisions contain heavy metals such as lead and cadmium in the tube itself. If a CRT TV ends up in a landfill and its glass breaks down over time, those materials can leach into the surrounding soil and water. Newer television technology isn’t free of concerns either. Many newer TVs contain glass components that may contain mercury and require careful handling during disposal.',
      'When a television is recycled properly, it’s broken down into its base parts, plastic housing, wiring, circuit boards, metals, and glass, so each material can go where it belongs. Metals and plastics can typically be recovered and reused. Glass and other hazardous components are handled separately to keep them out of the waste stream.',
      'For a business retiring old televisions from an office, conference room, or facility, working with a recycler that can properly process multiple TV types, rather than just accepting them and hoping for the best, makes the difference between responsible disposal and a liability sitting in a warehouse.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/detail-intro.png',
  },
  accept: {
    heading: 'What We Accept',
    intro: 'Recycle Technologies accepts the following types of televisions for recycling:',
    items: [
      { label: 'CRT Televisions', text: 'Older tube-style televisions that contain heavy metals such as lead and cadmium and require careful, hazard-aware handling.' },
      { label: 'LCD Televisions', text: 'Flat-panel televisions using liquid crystal display technology.' },
      { label: 'LED Televisions', text: 'Flat-panel televisions using LED backlighting.' },
      { label: 'Plasma Televisions', text: 'Flat-panel televisions using plasma display technology.' },
      { label: 'Flat-Screen Televisions', text: 'Other flat-panel television types not falling into the categories above.' },
    ],
    outro: 'This service is oriented toward commercial customers, businesses, offices, and facilities retiring televisions as part of upgrades or equipment turnover. If you’re unsure whether your specific television model or quantity qualifies, request a quote and describe what you need to recycle.',
  },
  process: {
    heading: 'How Do We Recycle Televisions?',
    intro: 'Television recycling at Recycle Technologies follows a defined path from pickup through processing, so hazardous components are identified and handled correctly while reusable materials are recovered.',
    steps: [
      { label: 'Quote and Scheduling:', text: 'The process starts with a quote request describing what you need to recycle. Once accepted, you can book a pickup slot based on availability.' },
      { label: 'Collection:', text: 'For commercial customers, Recycle Technologies’ team visits the pickup location on the scheduled date to collect the televisions. When items are collected, a hazard consignment note may be issued, documenting who collected the items, where they were collected from, how many were collected, and where they’re being taken.' },
      { label: 'Transport to Facility:', text: 'Collected televisions are brought to Recycle Technologies’ facilities in Minnesota or Wisconsin for processing.' },
      { label: 'Dismantling:', text: 'Televisions are broken down into their base components, separating plastic housing, wiring, circuit boards, metals, and glass.' },
      { label: 'Separation of Hazardous Materials:', text: 'CRT televisions require particular attention due to the lead and cadmium in the tube. Newer televisions with mercury-containing glass components are also handled separately from standard materials.' },
      { label: 'Material Recovery:', text: 'Metals, plastics, and other recoverable materials are processed for reuse rather than sent to a landfill.' },
    ],
    outro: 'Recycle Technologies has provided recycling services in the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin that comply with applicable state recycling laws.',
    image: '/images/services/detail-process.png',
  },
  faqs: [
    { q: 'Does Recycle Technologies recycle CRT televisions?', a: 'Yes. CRT televisions are accepted and handled with attention to the lead and cadmium content in the tube.' },
    { q: 'Does Recycle Technologies recycle flat-screen TVs?', a: 'Yes. LCD, LED, plasma, and other flat-screen televisions are accepted.' },
    { q: 'Is television recycling available for businesses?', a: 'Yes. This service is oriented toward commercial customers, including businesses, offices, and facilities.' },
    { q: 'Can I schedule a television pickup?', a: 'Yes. After receiving a quote, you can book a pickup slot for your location.' },
    { q: 'Where does Recycle Technologies provide television recycling services?', a: 'Pickup and facility-based recycling are available in Minnesota and Wisconsin. Customers outside that service area can use the mail-in recycling program instead.' },
  ],
  cta: {
    heading: 'Ready to Recycle Your Televisions?',
    body: [
      'If your business has retired televisions to dispose of, schedule a pickup or get a quote to get started. Pickup service is available only to commercial clients; residential customers can use a nearby drop-off location or order a mail-in recycling kit instead.',
    ],
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
