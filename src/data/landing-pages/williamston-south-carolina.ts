import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { CountyPage } from '@/data/county-pages/types'

/**
 * Recycle Technologies in Williamston, SC: /south-carolina/williamston/ (Google Ads page, noindex, 11 Nov 2026).
 *
 * The content team's doc "/south-carolina/williamston/" (Aaqib, 11 Nov 2026),
 * in the facility page design (CountyPage, like /florida/ocala/), which its
 * sections follow one to one. Its four service pages are in the Google Ads
 * landing design (./williamston-*-recycling.ts).
 *
 * Aaqib, 11 Nov 2026: Google Ads pages, so noindex, out of the sitemap, and no
 * breadcrumb. Not in AREA_PAGES (that list feeds the sitemap and the
 * locations directory); the route is src/app/south-carolina/williamston/.
 *
 * The doc has no phone number, email, hours or pickup contact (it says
 * [PHONE], "Toll Free" and [CONTACT NAME]); Aaqib: leave them all out. The
 * FAQ sentences that said "Call [PHONE]" say "Request a quote" instead, and
 * the pickup contact card is left out. See `todo`.
 */
export const WILLIAMSTON_SOUTH_CAROLINA: CountyPage & { todo: string[] } = {
  url: href('/south-carolina/williamston/'),
  state: 'South Carolina',
  county: 'Williamston',
  areaServed: 'Williamston, SC',
  service: 'Recycling',
  figma: { board: 'williamston-hero', phone: 'williamston-hero-phone' },
  // The doc gives no SEO title or description; written from its H1 and copy.
  seo: {
    title: 'Recycling in Williamston, SC | Recycle Technologies',
    description: 'Electronics, battery, light bulb and ballast recycling for businesses across Upstate South Carolina from our Williamston, SC facility. Get a quote today.',
  },
  hero: {
    h1: 'Recycle Technologies In Williamston, SC',
    crumb: 'Williamston, SC',
    lead: 'South Carolina Bulb Processing and Mercury Retort Facility, 109 Twenty Nine Ct, Williamston SC 29697.',
    button: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    secondary: { label: 'Get a Quote', href: QUOTE_HREF },
    noCrumbs: true,
  },
  quickInfo: [
    { glyph: 'pin', label: 'Address', value: '109 Twenty Nine Ct, Williamston SC 29697', href: 'https://www.google.com/maps/dir/?api=1&destination=109+Twenty+Nine+Ct%2C+Williamston%2C+SC+29697' },
  ],
  about: {
    heading: 'Electronics Recycling Services in Williamston, South Carolina',
    blocks: [
      { p: 'Are old electronics taking up space at your business? Recycle Technologies brings eco-friendly electronics recycling services to Williamston, South Carolina. We take care of everything from outdated computers and laptops to TVs, mobile phones, and large office equipment, ensuring each item is handled with precision and care.' },
      { p: 'Our process dismantles these devices to recover valuable materials, significantly reducing the environmental impact of discarded electronics. Understanding the long-term dangers of improper e-waste disposal, we are committed to driving responsible change across Upstate South Carolina. Our services help businesses in Greenville, Anderson, and Spartanburg clear their spaces responsibly while meeting environmental regulations. Partner with us to make a positive difference in our community.' },
      { h: 'Battery Recycling Services in Williamston, South Carolina' },
      { p: 'Have you ever wondered what happens to the batteries your business throws away? In Williamston, South Carolina, our Battery Recycling Services ensure safe disposal of all types of batteries, from everyday batteries to substantial industrial units. Our program ensures every component is properly processed and recycled. Discarding batteries in landfills is a major environmental hazard. Our team keeps hazardous materials out of the environment while recovering valuable resources for reuse. By choosing Recycle Technologies, you reduce landfill waste and support sustainable resource management across Upstate South Carolina.' },
    ],
  },
  // The doc's two service cards: Business Pick-Up Service and Mail-In Recycling Program.
  noDropOff: true,
  sections: [
    { kind: 'text', heading: 'What This Location Accepts', blocks: [{ p: 'Electronics (e-waste), light bulbs, batteries, ballasts (PCB and non-PCB)' }] },
    { kind: 'features', cards: [
      { title: 'Trusted and Local', text: 'Recycle Technologies has been providing recycling solutions since 1993 and is R2v3, NAID AAA, and RIOS certified, now serving Upstate South Carolina from Williamston.' },
      { title: 'Dependable Customer Service', text: 'We value our clients and their devotion for a better planet and ensure quality recycling services within time.' },
      { title: 'Custom Recycling Services', text: 'Get one item or hundreds of them, we can recycle everything based on your personalized requirements.' },
      { title: 'Quick Booking and Pickup', text: 'Get a quote by filling out the form, and our team will schedule your business pickup.' },
    ] },
    { kind: 'text', heading: 'Bulb Recycling Services in Williamston, South Carolina', blocks: [
      { p: 'Are spent light bulbs piling up at your facility? In Williamston, South Carolina, Recycle Technologies offers a hassle-free solution for bulb disposal. We understand the confusion around disposing of them properly, and we are here to help. Our service provides safe and eco-friendly fluorescent bulb recycling for businesses across Upstate South Carolina, including Greenville, Anderson, and Spartanburg. Choosing our Bulb Recycling service means convenience for your business and keeps harmful materials out of landfills.' },
      { h2: 'Our Environmental Responsibility' },
      { p: 'What makes Recycle Technologies stand out? Alongside our subsidiaries, Lighting Resources and EZ on the Earth, we lead in advanced recycling practices. Using state-of-the-art technology, we maximize material recovery, drastically reducing landfill waste and environmental harm. Our unwavering commitment to sustainability turns e-waste and other materials into reusable resources, fostering a circular economy.' },
      { p: 'Our cutting-edge processes not only reclaim valuable materials but also minimize ecological damage. As dedicated environmental advocates, we continuously innovate in waste management, providing comprehensive services for businesses. By partnering with us, you support a cleaner, healthier, and more sustainable future.' },
      { h: 'Mail in Program' },
      { p: 'Access our recycling services through our complete recycling kits, which you can order online and ship to us.' },
    ] },
    { kind: 'faq', heading: 'Questions About This Location', items: [
      { q: 'Is there a fee for recycling with this location?', a: 'Fees depend on the material and the quantity. Request a quote with a description of what you need recycled, and we will confirm any charges before your pickup is scheduled.' },
      { q: 'Do I need to schedule service with the Williamston facility?', a: 'Yes. Requirements vary by material and quantity. Request a quote to confirm your materials are accepted and arrange a time. Large or commercial loads go faster when our team knows what to expect.' },
      { q: 'Can businesses schedule a bulk pickup from this facility?', a: 'Yes. Business pickups are available across Upstate South Carolina, including Greenville, Anderson, and Spartanburg. Pickup arrangements depend on the materials, quantity, location, and service required. Request a quote to get started.' },
    ] },
    { kind: 'text', heading: 'Counties We Serve', blocks: [{ list: [
      { title: 'Anderson County', text: '' },
      { title: 'Greenville County', text: '' },
      { title: 'Spartanburg County', text: '' },
    ] }] },
  ],
  todo: [
    'No phone number in the doc (Phone row says "Toll Free" with no number): the Phone row is left out.',
    'No hours in the doc: the Hours row is left out.',
    'FAQ answers 1 and 2 said "Call [PHONE]"; they now say "Request a quote".',
    '"For more information, reach out to our Williamston team at [PHONE]." (Our Environmental Responsibility) left out.',
    'Business Pick-Up Service contact card left out: [CONTACT NAME], [PHONE], [EMAIL].',
    'The doc gives no SEO title or meta description; written from its H1 and copy (page is noindex).',
    'The EZ on the Earth link in the doc carried a tracking parameter; the name is kept as text, as on the other facility pages.',
    'The facility name in the hero lead is highlighted in the doc; kept as written.',
  ],
}
