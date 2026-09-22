import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/** /off-site-shredding/ — copy from the "Off-Site and On-Site Shredding" doc. */
export const CONTENT: ServicePageContent = {
  url: '/off-site-shredding/',
  liveSeo: {
    title: 'Off-Site Shredding Services | Call (800) 969-5166',
    description: 'Off-site shredding services for confidential paperwork collected from offices and facilities, securely destroyed at certified locations. Call (800) 969-5166',
  },
  proposedSeo: {
    title: 'Off-Site & On-Site Shredding Services | Recycle Tech',
    description: 'Secure off-site and on-site document shredding for businesses in Minnesota and Wisconsin, with a Certificate of Destruction issued after service.',
  },
  hero: {
    crumb: 'Off-Site Shredding',
    // Live H1 is "Off-Site Shredding Services". The doc covers BOTH off-site and
    // on-site, which is a scope change as well as a wording one — worth raising
    // with Rizwan separately from the other H1 diffs.
    h1: 'Off-Site and On-Site Shredding',
    lead: 'Recycle Technologies provides secure shredding for businesses handling confidential paperwork, with an off-site option that transports documents to a shredding facility and an on-site option that shreds documents at your location.',
    cta: { label: 'Get a Quote', href: QUOTE_HREF },
    image: '/images/services/hero-off-site-shredding.png',
  },
  intro: {
    heading: 'What Is Off-Site and On-Site Shredding?',
    body: [
      'Shredding is the process by which a business destroys confidential paper records so they can’t be reconstructed or read after disposal. Recycle Technologies offers two options, and the right one depends on how much paper you have and how you want it handled.',
      'With off-site shredding, a team collects your documents in secure vehicles and transports them to a shredding facility in Minnesota or Wisconsin, where they’re destroyed. This is typically the more cost-effective option for large volumes of paper, since Recycle Technologies notes that off-site shredding can save businesses up to 40% compared to on-site service.',
      'On-site shredding, by contrast, brings the destruction to you. A shredding truck arrives at your location and destroys the documents there without transporting them anywhere first. This appeals to businesses that want to witness destruction happen on their own premises rather than sending paperwork offsite.',
      'Both options are built around the same goal: making sure confidential paper doesn’t leave your control unshredded. Once destroyed, the shredded material is recycled rather than sent to a landfill.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/off-site-shredding-intro.jpg',
  },
  accept: {
    heading: 'What We Accept',
    intro: 'Recycle Technologies accepts the following materials for shredding:',
    items: [
      { label: 'Confidential Documents',    text: 'Business records, files, and paperwork containing sensitive or private information.' },
      { label: 'Office Paper',              text: 'General office paperwork accumulated through day-to-day operations.' },
      { label: 'Large-Volume Paper Cleanouts', text: 'One-time purges for clearing out storage rooms, file cabinets, or archived records, in addition to ongoing shredding service for businesses generating paper regularly.' },
    ],
    outro: 'If you’re disposing of hard drives, phones, or other electronic devices alongside paper records, those fall under hard drive destruction or phone shredding rather than this service.',
  },
  process: {
    heading: 'How Does Shredding Work?',
    intro: 'Both off-site and on-site shredding start the same way, with a quote and a scheduled service, before splitting into two different destruction paths depending on which option you choose.',
    steps: [
      { label: 'Request a Quote:',        text: 'Contact Recycle Technologies to describe your paper volume and shredding needs.' },
      { label: 'Schedule Your Service:',  text: 'Choose off-site or on-site shredding and set a pickup or service date.' },
      { label: 'Collection or On-Location Shredding:', text: 'For off-site service, a team collects your documents in secure vehicles. For on-site service, a shredding truck arrives at your location to destroy the documents there directly.' },
      { label: 'Transport and Destruction (Off-Site Only):', text: 'Collected documents are transported to Recycle Technologies’ shredding facility in Minnesota or Wisconsin for destruction.' },
      { label: 'Recycling:',              text: 'Shredded material is recycled rather than sent to a landfill.' },
      { label: 'Certificate of Destruction:', text: 'Once your documents are shredded, Recycle Technologies provides a Certificate of Destruction for your records.' },
    ],
    outro: 'Recycle Technologies has provided recycling services to the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin.',
    image: '/images/services/off-site-shredding-process.jpg',
  },
  faqs: [
    { q: 'What’s the difference between on-site and off-site shredding?', a: 'On-site shredding destroys documents at your location; off-site shredding transports them to a facility for destruction and typically costs less.' },
    { q: 'Can I schedule a one-time cleanout instead of ongoing service?', a: 'Yes. Recycle Technologies offers one-time purges for large cleanouts as well as ongoing shredding service.' },
    { q: 'Do I get proof that my documents were destroyed?', a: 'Yes. A Certificate of Destruction is provided once shredding is complete.' },
    { q: 'What happens to the paper after it’s shredded?', a: 'Shredded material is recycled rather than sent to a landfill.' },
    { q: 'Where is shredding service available?', a: 'Off-site and on-site shredding are available in Minnesota and Wisconsin.' },
  ],
  cta: {
    heading: 'Ready to Shred Securely?',
    body: [
      'If your business has confidential documents to destroy, get a quote or schedule a pickup to choose the shredding option that fits your needs. Pickup service is exclusively available to commercial clients.',
    ],
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
