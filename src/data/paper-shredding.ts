import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/** /paper-shredding-services/ — copy from the "Paper Shredding" doc. */
export const CONTENT: ServicePageContent = {
  url: '/paper-shredding-services/',
  liveSeo: {
    title: 'Paper Shredding | Document Destruction | (800) 969-5166',
    description: 'Commercial paper shredding covering files, records, reports, and office paperwork using controlled destruction to reduce exposure risks. Call (800) 969-5166',
  },
  proposedSeo: {
    title: 'Paper Shredding Services | Secure Document Destruction',
    description: 'NAID AAA certified paper shredding for businesses in Minnesota and Wisconsin. Secure document destruction with shredded paper recycled afterward.',
  },
  hero: {
    crumb: 'Paper Shredding',
    // Live H1 is "Paper Shredding".
    h1: 'Paper Shredding Services',
    lead: 'Recycle Technologies provides secure paper shredding for businesses and offices in Minnesota and Wisconsin, destroying confidential documents and recycling the shredded material afterward.',
    cta: { label: 'Get a Quote', href: QUOTE_HREF },
    image: '/images/services/hero-paper-shredding.png',
  },
  intro: {
    heading: 'What Is Paper Shredding?',
    body: [
      'Paper shredding is the physical destruction of documents so the information on them can’t be read, reconstructed, or misused after disposal. For businesses, this usually isn’t optional. Customer records, employee files, financial paperwork, and supplier information all carry a responsibility to protect, and simply tossing old files in a recycling bin doesn’t meet that standard.',
      'Recycle Technologies handles this through a dedicated paper shredding service covering Minnesota and Wisconsin. Documents are collected from your business, destroyed, and the resulting shredded paper is recycled rather than sent to a landfill.',
      'Businesses turn to a shredding service like this for two practical reasons. First, protecting sensitive information is often a legal obligation, not just good practice, since customers, employees, and suppliers trust a business to keep their data secure.',
      'Second, a document leak or mishandled disposal can damage a company’s reputation in ways that are hard to undo. A documented, secure shredding process addresses both concerns at once.',
      'Whether you’re clearing out old files during an office move, closing out a fiscal year, or managing an ongoing accumulation of paperwork, having a reliable way to destroy documents securely is part of running a business responsibly.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/paper-shredding-intro.jpg',
  },
  accept: {
    heading: 'What We Accept',
    intro: 'Recycle Technologies accepts the following paper materials for shredding:',
    items: [
      { label: 'Business Documents', text: 'Files, records, and reports generated through normal business operations.' },
      { label: 'Confidential Paper', text: 'Documents containing sensitive customer, employee, or company information that require secure destruction.' },
      { label: 'Office Paperwork',   text: 'General paper accumulated through day-to-day office use.' },
    ],
    outro: 'This service is intended for businesses across Minnesota and Wisconsin looking to dispose of paper-based records securely and affordably.',
  },
  process: {
    heading: 'How Do We Shred Paper?',
    intro: 'Paper shredding with Recycle Technologies follows a straightforward path, from the initial request through final destruction and recycling.',
    steps: [
      { label: 'Request a Quote',    text: 'Contact Recycle Technologies to describe your paper shredding needs and get a free quote.' },
      { label: 'Schedule Collection', text: 'Set up a pickup for your business location in Minnesota or Wisconsin.' },
      { label: 'Secure Destruction', text: 'Documents are shredded using Recycle Technologies’ equipment, staffed by trained personnel.' },
      { label: 'Recycling',          text: 'Shredded paper is recycled afterward rather than sent to a landfill.' },
    ],
    outro: 'Recycle Technologies has provided recycling services to the Midwest since 1993, using equipment and staff dedicated to paper shredding across its Minnesota and Wisconsin service area.',
    image: '/images/services/paper-shredding-process.jpg',
  },
  faqs: [
    { q: 'Is paper shredding available for businesses only, or residential customers too?', a: 'Business pickup is available exclusively for commercial clients; residential customers can use a drop-off location instead.' },
    { q: 'What happens to paper after it’s shredded?', a: 'Shredded paper is recycled rather than sent to a landfill.' },
    { q: 'Can confidential documents be shredded securely?', a: 'Yes. The service is designed for confidential business paperwork that requires secure destruction.' },
    { q: 'Is Recycle Technologies’ paper shredding service certified?', a: 'Yes. The paper shredding service is NAID AAA certified across its Minnesota and Wisconsin coverage area.' },
    { q: 'Where is paper shredding service available?', a: 'Minnesota and Wisconsin, with a residential drop-off option for those outside a pickup route.' },
  ],
  cta: {
    heading: 'Ready to Shred Your Documents?',
    body: [
      'If your business has confidential paperwork to destroy, get a quote or schedule a pickup to get started. Pickup service is exclusively available to commercial clients; residential customers can find a nearby drop-off location instead.',
    ],
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
