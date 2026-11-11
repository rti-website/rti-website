import { href } from '@/lib/urls'
import { KIT_STORE } from '@/lib/nav'
import type { FacilityAdPage } from '@/data/local-pages/types'

/**
 * Commercial Recycling in Williamston, SC: /south-carolina/williamston/ (Google Ads page, noindex).
 *
 * Copy: management's doc "Williamston, SC | Recycle Technologies"
 * (12Ty4xJVZtUA-b-xf7irlimdaNha-E-ppRQpRQKbbxlc), its first page, 12 Nov
 * 2026. It replaced the content team's doc of 11 Nov. Built by
 * FacilityAdPage, the page's own design, with the site's quote form in it.
 *
 * Aaqib, 11 Nov 2026: Google Ads pages, so noindex, out of the sitemap, no
 * breadcrumb. Get a Quote only (management, 12 Nov 2026), and every Get a
 * Quote on the page, the header's included, scrolls to the form on it
 * ("scrolls to the form").
 *
 * The doc's placeholders:
 *   [PHONE]          (864) 774-8310 (Aaqib, 11 Nov 2026)
 *   [HOURS]          9:00 AM to 4:00 PM (Shiza, 11 Nov 2026; no days given)
 *   [QUOTE FORM]     the site's quote form (ContactForm, business only)
 *   [RESPONSE TIME]  not given: "We reply within …" is left out
 *   [LINK TO SAMPLE CERTIFICATES]  not given: the View Sample Certificates link is left out
 * The mail-in kits link goes to the kit store with the site's tags (KIT_STORE),
 * as every Buy Recycling Kits link does, not the EZ on the Earth home page.
 */
const PHONE = { label: 'Call (864) 774-8310', href: 'tel:+18647748310' }
const QUOTE = { label: 'Get a Quote', href: '#quote-form' }
const ADDRESS = '109 Twenty Nine Ct, Williamston, SC 29697'
const HOURS = '9:00 AM to 4:00 PM'
const sub = (slug: string) => href(`/south-carolina/williamston/${slug}/`)

/** Where every Get a Quote on the page goes: the form below the hero. */
export const WILLIAMSTON_QUOTE_ANCHOR = 'quote-form'

export const WILLIAMSTON_SOUTH_CAROLINA: FacilityAdPage = {
  url: href('/south-carolina/williamston/'),
  seo: {
    title: 'Commercial Recycling in Williamston, SC | Recycle Technologies',
    description: 'Business recycling pickup for electronics, light bulbs, batteries, and ballasts across Upstate SC. Request a quote from our Williamston team.',
  },
  schema: { service: 'Commercial Recycling', areaServed: ['Williamston, SC', 'Upstate South Carolina'] },
  hero: {
    eyebrow: 'Recycle Technologies · Williamston, SC',
    // TL, 12 Nov 2026: "Commercial" → "Electronic" in the heading (SEO title unchanged).
    h1: 'Electronic Recycling in Williamston, SC',
    subhead: 'Scheduled pickup of electronics, light bulbs, batteries, and ballasts for businesses across Upstate South Carolina, with recycling certificates for your compliance records.',
    image: '/images/landing/hero-universal-waste.png',
    primary: QUOTE,
    phone: PHONE,
    address: ADDRESS,
    hours: HOURS,
  },
  trust: [
    { icon: 'shield', text: 'R2v3 Certified' },
    { icon: 'lock', text: 'NAID AAA Certified' },
    { icon: 'award', text: 'RIOS Certified' },
    { icon: 'calendar', text: 'Recycling Since 1993' },
    { icon: 'file', text: 'Certificates of Recycling' },
  ],
  quote: {
    heading: 'Get a Recycling Quote',
    intro: 'Tell us what you have and where it is. Our Williamston team will reply with pricing and pickup options.',
    button: 'Request My Quote',
    note: 'Your details are used only for your quote.',
    contact: { phone: PHONE, address: ADDRESS, hours: HOURS },
  },
  recycle: {
    heading: 'What We Recycle for Upstate Businesses',
    intro: 'One call covers every stream your facility generates, from an office IT refresh to a warehouse relamp.',
    cards: [
      { icon: 'monitor', title: 'Electronics Recycling', text: 'Computers, laptops, servers, monitors, TVs (including CRTs), printers, copiers, phones and networking equipment. Ask about hard drive destruction with a Certificate of Destruction.', link: { label: 'Electronics Recycling in Williamston', href: sub('electronic-recycling') } },
      { icon: 'bulb', title: 'Light Bulb Recycling', text: 'Fluorescent tubes, CFLs, HID, UV, LED, halogen and incandescent lamps. Mercury-bearing lamps are handled as universal waste, keeping them out of regular waste streams.', link: { label: 'Light Bulb Recycling in Williamston', href: sub('light-bulb-recycling') } },
      { icon: 'battery', title: 'Battery Recycling', text: 'Lithium-ion, lead-acid, alkaline, NiCd, button cell and UPS batteries, sorted by chemistry for appropriate handling and recycling. Tell us ahead of time about damaged or swollen units.', link: { label: 'Battery Recycling in Williamston', href: sub('battery-recycling') } },
      { icon: 'zap', title: 'Ballast Recycling', text: 'PCB and non-PCB fluorescent ballasts, plus magnetic, electronic and HID ballasts from retrofits and demolition projects. PCB-containing units are kept separate and documented.', link: { label: 'Ballast Recycling in Williamston', href: sub('ballast-recycling') } },
    ],
    button: { label: 'Get a Quote for Mixed Loads', href: '#quote-form' },
  },
  why: {
    heading: 'Why Businesses Choose Recycle Technologies',
    cards: [
      { icon: 'shield', title: 'Certified handling', text: 'R2v3, NAID AAA and RIOS certifications cover how your equipment, data and materials are managed.' },
      { icon: 'file', title: 'Paperwork for audits', text: 'A Certificate of Recycling or applicable Certificate of Destruction documents completed jobs.' },
      { icon: 'layers', title: 'One vendor for every stream', text: 'Electronics, lamps, batteries and ballasts can be included in the same pickup, instead of requiring separate recycling arrangements.' },
      { icon: 'award', title: 'Experience since 1993', text: 'More than three decades of commercial recycling experience.' },
      { icon: 'map', title: 'A local Upstate team', text: 'Pickups are coordinated for businesses across the Williamston service area.' },
    ],
  },
  docs: {
    heading: 'Documentation You Can Keep',
    body: [
      'Commercial recycling doesn’t end when your materials leave the facility. Businesses also need documentation showing how their equipment and materials were handled.',
      'Recycle Technologies provides documentation for completed recycling and applicable data destruction services.',
    ],
    certs: [
      { title: 'Certificate of Recycling', text: 'Documents completed recycling jobs and provides a record for your business.' },
      { title: 'Certificate of Destruction', text: 'Available for applicable hard drive destruction services to document the destruction process.' },
    ],
    outro: 'Keep these certificates with your environmental, operational, and compliance records.',
  },
  steps: {
    heading: 'How Pickup Works',
    items: [
      { title: 'Request a quote', text: 'List your materials, approximate quantities, and pickup address in the form.' },
      { title: 'Get pricing and a date', text: 'Our team confirms costs and packing requirements, then books a pickup time that suits your site.' },
      { title: 'Pack and stage', text: 'Box bulbs and batteries as instructed and keep PCB-containing ballasts separate. We can advise on appropriate containers.' },
      { title: 'We collect', text: 'Materials are picked up from your dock or facility and taken for processing.' },
      { title: 'Keep your records', text: 'You receive the applicable certificate once processing is complete.' },
    ],
  },
  who: {
    heading: 'Who We Work With',
    items: [
      { icon: 'factory', text: 'Manufacturers and distribution centers along I-85' },
      { icon: 'monitor', text: 'Offices and IT departments' },
      { icon: 'school', text: 'Schools, colleges and universities' },
      { icon: 'heart', text: 'Hospitals and clinics' },
      { icon: 'building', text: 'Property and facility managers' },
      { icon: 'zap', text: 'Electrical contractors and lighting retrofit crews' },
      { icon: 'landmark', text: 'Municipalities and public agencies' },
    ],
  },
  area: {
    heading: 'Upstate Service Area',
    intro: 'Our Williamston team schedules business pickups across Upstate South Carolina, including:',
    counties: [
      { name: 'Anderson County', towns: 'Anderson, Williamston, Belton, Pendleton' },
      { name: 'Greenville County', towns: 'Greenville, Greer, Simpsonville, Mauldin, Fountain Inn' },
      { name: 'Spartanburg County', towns: 'Spartanburg, Duncan, Boiling Springs' },
      { name: 'Pickens and Oconee Counties', towns: 'Easley, Clemson, Seneca' },
    ],
    outro: { before: 'Outside this area? Ask about ', link: { label: 'mail-in recycling kits', href: KIT_STORE, external: true }, after: ' for smaller batches.' },
  },
  mid: { heading: 'Need a recycling vendor in Upstate SC?', primary: QUOTE, secondary: PHONE },
  faq: {
    // The doc's section is "FAQs": the pill, with the site's usual heading under it.
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: 'How much does commercial recycling cost?', a: 'Pricing depends on the materials, quantity, and pickup location. Submit the quote form, and we’ll confirm costs before scheduling anything.' },
      { q: 'Is there a minimum load for pickup?', a: 'Requirements vary by material and distance. Include approximate quantities in your quote request, and we’ll let you know what works for your site.' },
      { q: 'Can you take several material types in one pickup?', a: 'Yes. Electronics, bulbs, batteries, and ballasts can be collected together when properly separated and packed according to their handling requirements.' },
      { q: 'Do I get documentation?', a: 'Yes. A Certificate of Recycling is issued for completed recycling jobs, and applicable hard drive destruction services can include a Certificate of Destruction.' },
      { q: 'Do you offer recurring pickups?', a: 'Yes. Facilities that generate recycling materials regularly can arrange recurring pickups. Mention your preferred schedule in the quote request.' },
      { q: 'Is it legal to throw these items in the trash in South Carolina?', a: 'South Carolina restricts landfill disposal of certain covered electronics, including specific computers, monitors, printers and televisions. Certain batteries and lamps may also be subject to universal waste requirements under applicable state and federal regulations. Businesses should follow the relevant handling, storage, and disposal rules for each material type. Using an appropriate recycling provider can help businesses manage these materials responsibly and maintain records of completed recycling services.' },
    ],
  },
  cta: {
    heading: 'Ready to Book a Pickup in Upstate SC?',
    body: 'Tell us what you have, and our Williamston team will send pricing and pickup options.',
    primary: QUOTE,
    secondary: PHONE,
    name: 'Recycle Technologies',
    address: ADDRESS,
  },
  todo: [
    '[RESPONSE TIME] not given: "We reply within [RESPONSE TIME]." left out under the form.',
    '[LINK TO SAMPLE CERTIFICATES PAGE OR PDF] not given: the "View Sample Certificates" link is left out.',
    'Hours "9am - 4pm" from Shiza, 11 Nov 2026, with no days; shown as 9:00 AM to 4:00 PM.',
    'The quote form is the site’s business quote form (first/last name, email, phone, company, address, city/state/ZIP, what to recycle, how you heard, message); its button reads "Request My Quote".',
    'Mail-in kits link: the kit store with the site’s tags (KIT_STORE), as every Buy Recycling Kits link, not the EZ on the Earth home page the doc linked.',
  ],
}
