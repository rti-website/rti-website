import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, href } from '@/lib/urls'

/** /hard-drive-destruction-services/ — copy from the "Hard Drive Destruction" doc. */
export const CONTENT: ServicePageContent = {
  url: '/hard-drive-destruction-services/',
  liveSeo: {
    title: 'Commercial Hard Drive Destruction Services | Call (800) 969-5166',
    description: 'Commercial hard drive destruction for businesses, offices & organizations. Securely destroy HDDs, SSDs and data storage devices with verified service.',
  },
  proposedSeo: {
    title: 'Hard Drive Destruction Services | Recycle Technologies',
    description: 'Secure hard drive destruction for businesses in MN & WI. Physically destroy HDDs, SSDs & data storage devices. Get a free quote today.',
  },
  hero: {
    crumb: 'Hard Drive Destruction',
    // Matches the live H1 exactly — no gate 2 conflict on this page.
    h1: 'Hard Drive Destruction Services',
    lead: 'Deleting files or reformatting a drive does not remove the data stored on it. Recycle Technologies provides secure hard drive destruction for businesses in Minnesota and Wisconsin, physically destroying hard disk drives, solid-state drives, and other data-bearing storage media so the information on them cannot be recovered.',
    cta: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
    image: '/images/services/hero-hard-drives.png',
  },
  intro: {
    heading: 'What Is Hard Drive Destruction?',
    body: [
      'Hard drive destruction is the physical destruction of a drive so that the data stored on it can no longer be accessed. Deleting files, reformatting, or even wiping a drive with software can leave data recoverable, which is why many organizations choose to have the physical drive destroyed instead once it is retired.',
      'Recycle Technologies destroys hard drives collected from businesses, offices, and organizations that are replacing or decommissioning computers, laptops, and other IT equipment. Once a drive is destroyed, it can no longer be read, reassembled, or returned to service, which removes the risk of sensitive information being exposed later.',
      'Destruction is different from simply throwing a drive away or handing it off with the rest of the retired electronics. A drive placed in general e-waste may still hold intact data. Physical destruction addresses that risk directly, and the materials left over from the process are handled through Recycle Technologies’ recycling operations rather than sent to a landfill.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/hard-drive-intro.jpg',
  },
  accept: {
    heading: 'What We Accept',
    items: [
      { label: 'Hard Disk Drives (HDDs)',          text: 'Traditional hard drives removed from desktop computers and laptops.' },
      { label: 'Solid State Drives (SSDs)',        text: 'Flash-based storage drives from computers and other IT equipment.' },
      { label: 'Other Data-Bearing Storage Media', text: 'Additional disk drives and data storage devices removed from retired computers and IT equipment.' },
    ],
    outro: 'If you’re not sure whether a specific device qualifies, contact Recycle Technologies directly or include a description when requesting a quote or pickup.',
  },
  process: {
    heading: 'How Do We Destroy Hard Drives?',
    intro: 'Hard drive destruction at Recycle Technologies starts with getting the drives to us securely and ends with the destroyed material being processed through our recycling operations. Here’s how the service works.',
    steps: [
      { label: '1. Collection',  text: 'Businesses can schedule a pickup, drop off at one of our facilities, or use our mail-in program. Pickup service is arranged around your schedule, and our team arrives with specialized trucks and equipment to handle the collection.' },
      { label: '2. Handling',    text: 'Drives are handled under strict security protocols from the point of collection through destruction, reducing the chance of a drive going missing or being accessed before it is destroyed.' },
      { label: '3. Destruction', text: 'Hard drives are physically destroyed, so the data on them cannot be recovered, and the drives cannot be reused.' },
      { label: '4. Recycling',   text: 'The shredded material left over from the destruction process is recycled rather than sent to a landfill, which keeps the metal, plastic, and other components in the recycling stream.' },
    ],
    outro: 'For businesses that are also clearing out other retired IT equipment, electronics recycling and IT asset disposition (ITAD) services can be arranged alongside hard drive destruction.',
    image: '/images/services/hard-drive-process.jpg',
  },
  faqs: [
    { q: 'What types of hard drives can Recycle Technologies destroy?', a: 'We destroy hard disk drives (HDDs), solid-state drives (SSDs), and other data-bearing storage devices from computers and IT equipment.' },
    { q: 'Is hard drive destruction available for businesses?', a: 'Yes. Pickup service for hard drive destruction is available exclusively for commercial clients.' },
    { q: 'What happens to hard drives after they’re destroyed?', a: 'The shredded material is recycled through our facilities rather than sent to a landfill.' },
    { q: 'Can I request a pickup for hard drive destruction?', a: 'Yes, businesses can schedule a pickup, or drop drives off at one of our Minnesota or Wisconsin locations.' },
    { q: 'Does Recycle Technologies provide documentation of destruction?', a: 'Yes, customers receive a certificate of authorized recycling and shredding.' },
  ],
  cta: {
    heading: 'Ready to Retire Your Old Equipment Responsibly?',
    body: [
      'Recycle Technologies handles hard drive destruction, as well as electronics, battery, light bulb, ballast, TV, and airbag recycling for businesses in Minnesota and Wisconsin. Request a pickup or get a quote today to get started.',
    ],
    primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
