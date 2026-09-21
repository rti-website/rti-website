import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /airbag-recycling/ — copy from the "Airbag Recycling" doc, geometry from
 * 6142:2048.
 *
 * NOTE: airbag recycling is a live, linked service but it is NOT in the Figma
 * services catalogue (frame 6142:784 draws eleven cards and airbag is not one
 * of them). The live /services/ page does link it, so it is added to the header
 * dropdown as a menu-only entry rather than changing the approved /services/
 * layout. See src/data/services.ts.
 */
export const CONTENT: ServicePageContent = {
  url: '/airbag-recycling/',
  liveSeo: {
    title: 'Commercial Airbag Recycling | Deployed & Undeployed',
    description: 'Commercial airbag recycling for auto shops, dealerships & facilities. Recycle deployed and undeployed vehicle airbags with a reliable recycling service.',
  },
  proposedSeo: {
    title: 'Airbag Recycling Services | Deployed & Undeployed | RTI',
    description: 'Certified airbag recycling for auto shops, dealerships & fleets. Deployed and undeployed units, DOT-compliant packaging, and recycling certificates.',
  },
  hero: {
    crumb: 'Airbag Recycling',
    // Live H1 is "Airbag Recycling" — this page's only difference is "Services".
    h1: 'Airbag Recycling Services',
    lead: 'Recycle Technologies provides certified airbag disposal for deployed and undeployed units, serving auto shops, dealerships, and fleet operators with a reliable, compliant recycling process.',
    cta: { label: 'Get a Quote', href: QUOTE_HREF },
  },
  intro: {
    heading: 'What Is Airbag Recycling?',
    body: [
      'Airbag recycling is the process of safely handling retired vehicle airbags so their hazardous components don’t end up as a liability or an environmental risk. This isn’t like recycling a normal piece of scrap metal. Airbags, especially undeployed ones, contain explosive chemicals such as sodium azide, which means they need specialized handling from the moment they leave a shop or facility.',
      'Undeployed airbags in particular have to be packaged and shipped according to DOT Hazmat standards. Getting that wrong isn’t just a compliance issue, it’s a safety issue. A recycler that handles airbags regularly should be able to walk you through compliant packaging and labeling rather than leaving that step to guesswork.',
      'Once collected, airbags are processed at a licensed facility built to handle this kind of material safely. Proper airbag recycling protects the business or shop that generated the waste from liability, and it keeps hazardous components out of general waste streams where they don’t belong.',
      'For auto repair shops, dealerships, and vehicle dismantlers generating airbag waste on a regular basis, working with a recycler that treats this as a specialized service, not an afterthought, matters.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/detail-intro.png',
  },
  accept: {
    heading: 'What We Accept',
    intro: 'Recycle Technologies accepts the following types of airbags and related components:',
    items: [
      { label: 'Driver-Side and Passenger Airbags', text: 'Standard front airbags removed from vehicles.' },
      { label: 'Side-Impact and Curtain Airbags',   text: 'Airbags deployed from side panels or roof rails.' },
      { label: 'Knee and Seat Airbags',             text: 'Additional airbag types used in modern vehicle safety systems.' },
      { label: 'Standalone Inflators and Modules',  text: 'Airbag inflators and modules separate from the airbag unit itself.' },
    ],
    outro: 'Both deployed and undeployed airbags are accepted. Undeployed units require DOT Hazmat-compliant packaging and labeling before shipment, and Recycle Technologies can guide you through that process.',
  },
  process: {
    heading: 'How Do We Recycle Airbags?',
    intro: 'Airbag recycling with Recycle Technologies follows a controlled process designed around the hazardous nature of the material, from initial contact through documented disposal.',
    steps: [
      { label: 'Get in Touch',             text: 'The process starts with a call or a request form describing what you need to recycle.' },
      { label: 'Choose Drop-off or Pickup', text: 'Recycle Technologies offers flexible options for getting airbags to a facility, including scheduled pickup for business customers and drop-off for other arrangements.' },
      { label: 'Certified Disposal',        text: 'Airbags are handled at a licensed airbag waste collection facility, where they’re processed according to their type and condition.' },
      { label: 'Compliance Documentation',  text: 'Once disposal is complete, Recycle Technologies issues a certificate of recycling for your records.' },
    ],
    outro: 'Recycle Technologies has provided recycling services to the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin.',
    image: '/images/services/detail-process.png',
  },
  // The only page whose doc writes its own compliance copy, so the shared
  // certifications paragraph is overridden here and the band grows to fit.
  certifications: {
    body: 'Airbags fall into a category of waste that carries real safety and legal risk if handled incorrectly, so documentation matters. Recycle Technologies addresses this by issuing a certificate of recycling for each completed disposal and by processing airbags through a licensed collection facility built to manage hazardous automotive components. Recycle Technologies holds R2v3 certification, an electronics and materials recycling standard, at select facilities, with certification status and scope varying by location.',
  },
  faqs: [
    { q: 'Does Recycle Technologies accept both deployed and undeployed airbags?', a: 'Yes. Both are accepted, though undeployed airbags require DOT Hazmat-compliant packaging and labeling.' },
    { q: 'Who uses this service?', a: 'Auto repair shops, vehicle dismantlers, collision repair facilities, dealerships, insurance providers, and fleet operators.' },
    { q: 'Can I ship airbags through the mail-in program?', a: 'Recycle Technologies offers direct pickup and mail-back options, so airbags don’t have to be handled locally to be recycled.' },
    { q: 'Do I get documentation after my airbags are recycled?', a: 'Yes. A certificate of recycling is issued once disposal is complete.' },
    { q: 'Is pickup available for individuals as well as businesses?', a: 'Pickup service is offered exclusively to commercial clients; individuals can use drop-off or mail-back options instead.' },
  ],
  cta: {
    heading: 'Get Your Airbags Off Your Hands',
    body: [
      'Recycle Technologies also handles electronics recycling and battery recycling for shops and facilities managing multiple waste streams.',
      'Stop storing liability. Get a quote or schedule a pickup and get your airbags recycled the right way. Pickup service is exclusively available to commercial clients.',
    ],
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
