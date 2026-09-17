import type { ServicePageContent } from '@/data/service-page'
import { href } from '@/lib/urls'

/** /phone-shredding-service/ — copy from the "Phone Shredding" doc. */
export const CONTENT: ServicePageContent = {
  url: '/phone-shredding-service/',
  liveSeo: {
    title: 'Phone Shredding Services | Call (800) 969-5166',
    description: 'Phone shredding services providing physical destruction of mobile devices, SIM cards, memory chips, and handheld electronics to prevent data exposure. Call (800) 969-5166',
  },
  proposedSeo: {
    title: 'Phone Shredding Services | Secure Cell Phone Destruction',
    description: 'Secure off-site phone shredding for businesses. Cell phones, SIM cards, and memory chips destroyed with a Certificate of Recycling issued.',
  },
  hero: {
    crumb: 'Phone Shredding',
    // Matches the live H1 exactly — no gate 2 conflict on this page.
    h1: 'Phone Shredding Services',
    lead: 'Recycle Technologies provides secure, off-site phone shredding and recycling for businesses and offices, collecting old or broken cell phones and processing them at a dedicated facility with a Certificate of Recycling issued afterward.',
    cta: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
  intro: {
    heading: 'What Is Phone Shredding?',
    body: [
      'Phone shredding is the process of physically destroying or securely wiping a retired cell phone so that its data can’t be recovered. Simply turning a phone off, resetting it, or handing it down isn’t enough if there’s any chance sensitive information is still sitting on the device.',
      'Recycle Technologies handles this off-site rather than on location. Instead of destroying phones at your workplace, the team collects them and transports them to a dedicated facility, where each device undergoes data wiping or physical destruction, depending on what’s needed to make the information unrecoverable.',
      'Handheld electronics, mobile devices, SIM cards, and memory chips can all carry stored data, which is part of why this kind of destruction is handled differently from routine electronics recycling. Once a phone has been processed, Recycle Technologies issues a Certificate of Recycling confirming that the device was securely handled, which businesses often need for their own compliance or data-security records.',
      'For an office or business retiring a batch of old phones, whether from employee turnover, an upgrade cycle, or a fleet of company devices, having a documented process for getting rid of them safely matters more than it does for most other electronics.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/detail-intro.png',
  },
  accept: {
    heading: 'What We Accept',
    intro: 'Recycle Technologies accepts the following for phone shredding and destruction:',
    items: [
      { label: 'Cell Phones',              text: 'Smartphones and mobile phones no longer in use, whether working or broken.' },
      { label: 'Mobile Devices',           text: 'Handheld electronics beyond standard phones that may store personal or business data.' },
      { label: 'SIM Cards and Memory Chips', text: 'Small storage components that can retain data even after a device is reset.' },
    ],
    outro: 'This service is set up for businesses and offices retiring devices in volume, not as a one-off drop for a single phone.',
  },
  process: {
    heading: 'How Do We Shred Phones?',
    intro: 'Phone destruction with Recycle Technologies runs through a straightforward sequence, from the initial quote through final documentation, so devices are securely handled the entire way.',
    steps: [
      { label: 'Request a Quote.',       text: 'The process starts with a quote request describing what you need to recycle.' },
      { label: 'Schedule a Pickup.',     text: 'Once your quote is confirmed, you can set a convenient time for the team to collect your old phones from your home or office.' },
      { label: 'Secure Transportation.', text: 'Devices are transported to Recycle Technologies’ facility, where they undergo data destruction and recycling rather than being processed on-site.' },
      { label: 'Certificate of Recycling.', text: 'Once processing is complete, Recycle Technologies issues a Certificate of Recycling confirming your devices were responsibly handled.' },
    ],
    outro: 'Recycle Technologies has provided recycling services to the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin.',
    image: '/images/services/detail-process.png',
  },
  faqs: [
    { q: 'Does Recycle Technologies shred phones on-site?', a: 'No. Devices are collected and transported to a dedicated facility for off-site processing.' },
    { q: 'Is phone shredding available for businesses?', a: 'Yes. This service is designed for businesses and offices retiring phones in volume.' },
    { q: 'Do I get proof that my phones were destroyed?', a: 'Yes. A Certificate of Recycling is issued after every phone shredding service.' },
    { q: 'Can I recycle phones through the mail-in program?', a: 'Recycle Technologies offers pickup and drop-off options; for the mail-in program, recycling kits can be purchased for shipping devices in.' },
    { q: 'Where is phone shredding available?', a: 'Pickup and facility processing are available in Minnesota and Wisconsin.' },
  ],
  cta: {
    heading: 'Ready to Retire Your Old Phones?',
    body: [
      'If your business has old phones to dispose of securely, schedule a pickup or get a quote to get started. Pickup service is exclusively available to commercial clients; residential customers can find a nearby drop-off location or order a mail-in recycling kit instead.',
    ],
    primary:   { label: 'Get a Quote',       href: href('/quote/') },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
