import { QUOTE_HREF, href } from '@/lib/urls'
import { KIT_STORE } from '@/lib/nav'
import type { FacilityAdPage } from '@/data/local-pages/types'

/**
 * Recycle Technologies in Williamston, SC: /south-carolina/williamston/ (Google Ads page, noindex).
 *
 * The content team's doc "/south-carolina/williamston/" (Aaqib, 11 Nov 2026).
 * Since 12 Nov 2026 in its own design, FacilityAdPage (management: "make the
 * design more good and a little different from the other pages"), and the
 * main page of the four Williamston service pages: the accepts cards and the
 * service sections link to them.
 *
 * Aaqib, 11 Nov 2026: Google Ads pages, so noindex, out of the sitemap, no
 * breadcrumb. Not in AREA_PAGES (that list feeds the sitemap and the
 * locations directory); the route is src/app/south-carolina/williamston/.
 *
 * Management's changes, 12 Nov 2026:
 *  - Get a Quote only, no Schedule a Pickup (these are ads pages).
 *  - "we can recycle everything" was an overclaim: the card says "one item or hundreds".
 *  - The hero names the facility "South Carolina Bulb Processing and
 *    Williamston Facility" (was "... and Mercury Retort Facility").
 *
 * Contact (Aaqib and Shiza, 11 Nov 2026): address, phone (864) 774-8310,
 * support@lightingresourcesinc.com, hours 9:00 AM to 4:00 PM (no days given).
 *
 * The doc's copy is kept; the design adds only short labels (the pills over
 * the headings, "Learn more", "Get directions") and reuses the subpages' own
 * lists of what each service takes for the accepts cards.
 */
const PHONE = { label: '(864) 774-8310', href: 'tel:+18647748310' }
const EMAIL = 'support@lightingresourcesinc.com'
const HOURS = '9:00 AM to 4:00 PM'
const QUOTE = { label: 'Get a Quote', href: QUOTE_HREF }
const sub = (slug: string) => href(`/south-carolina/williamston/${slug}/`)

export const WILLIAMSTON_SOUTH_CAROLINA: FacilityAdPage = {
  url: href('/south-carolina/williamston/'),
  // The doc gives no SEO title or description; written from its H1 and copy.
  seo: {
    title: 'Recycling in Williamston, SC | Recycle Technologies',
    description: 'Electronics, battery, light bulb and ballast recycling for businesses across Upstate South Carolina from our Williamston, SC facility. Get a quote today.',
  },
  schema: { service: 'Recycling', areaServed: ['Williamston, SC', 'Upstate South Carolina'] },
  hero: {
    eyebrow: 'Williamston, South Carolina',
    h1: 'Recycle Technologies In Williamston, SC',
    lead: 'South Carolina Bulb Processing and Williamston Facility, 109 Twenty Nine Ct, Williamston SC 29697.',
    image: '/images/landing/hero-universal-waste.png',
    button: QUOTE,
    facility: {
      name: 'Williamston Facility',
      address: '109 Twenty Nine Ct, Williamston SC 29697',
      mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=109+Twenty+Nine+Ct%2C+Williamston%2C+SC+29697',
      phone: PHONE,
      email: EMAIL,
      hours: HOURS,
      accepts: ['Electronics', 'Light bulbs', 'Batteries', 'Ballasts'],
    },
  },
  // From the doc's "Trusted and Local" card and the service pages' strip.
  highlights: [
    { icon: 'calendar', text: 'Since 1993' },
    { icon: 'shield', text: 'R2v3, NAID AAA & RIOS Certified' },
    { icon: 'map', text: 'Serving Upstate South Carolina' },
    { icon: 'truck', text: 'Business Pickup' },
  ],
  accepts: {
    eyebrow: 'Accepted here',
    heading: 'What This Location Accepts',
    lead: 'Electronics (e-waste), light bulbs, batteries, ballasts (PCB and non-PCB)',
    cards: [
      { icon: 'monitor', title: 'Electronics (e-waste)', text: 'Computers, laptops, servers, monitors, phones, printers, and other electronics.', link: { label: 'Electronics recycling', href: sub('electronic-recycling') } },
      { icon: 'bulb', title: 'Light bulbs', text: 'Fluorescent tubes, CFLs, LED, HID lighting, ballasts, and fixtures.', link: { label: 'Light bulb recycling', href: sub('light-bulb-recycling') } },
      { icon: 'battery', title: 'Batteries', text: 'Alkaline, lithium-ion, lead-acid, NiCd, button cell, EV, and power tool batteries.', link: { label: 'Battery recycling', href: sub('battery-recycling') } },
      { icon: 'zap', title: 'Ballasts (PCB and non-PCB)', text: 'PCB, non-PCB, electronic, and magnetic ballasts.', link: { label: 'Ballast recycling', href: sub('ballast-recycling') } },
    ],
  },
  stories: [
    {
      eyebrow: 'Electronics',
      heading: 'Electronics Recycling Services in Williamston, South Carolina',
      body: [
        'Are old electronics taking up space at your business? Recycle Technologies brings eco-friendly electronics recycling services to Williamston, South Carolina. We take care of everything from outdated computers and laptops to TVs, mobile phones, and large office equipment, ensuring each item is handled with precision and care.',
        'Our process dismantles these devices to recover valuable materials, significantly reducing the environmental impact of discarded electronics. Understanding the long-term dangers of improper e-waste disposal, we are committed to driving responsible change across Upstate South Carolina. Our services help businesses in Greenville, Anderson, and Spartanburg clear their spaces responsibly while meeting environmental regulations. Partner with us to make a positive difference in our community.',
      ],
      image: '/images/services/electronics-intro-v2.png',
      link: { label: 'Learn more about electronics recycling', href: sub('electronic-recycling') },
    },
    {
      eyebrow: 'Batteries',
      heading: 'Battery Recycling Services in Williamston, South Carolina',
      body: [
        'Have you ever wondered what happens to the batteries your business throws away? In Williamston, South Carolina, our Battery Recycling Services ensure safe disposal of all types of batteries, from everyday batteries to substantial industrial units. Our program ensures every component is properly processed and recycled.',
        'Discarding batteries in landfills is a major environmental hazard. Our team keeps hazardous materials out of the environment while recovering valuable resources for reuse. By choosing Recycle Technologies, you reduce landfill waste and support sustainable resource management across Upstate South Carolina.',
      ],
      image: '/images/services/batteries-intro-v2.png',
      link: { label: 'Learn more about battery recycling', href: sub('battery-recycling') },
    },
    {
      eyebrow: 'Light bulbs',
      heading: 'Bulb Recycling Services in Williamston, South Carolina',
      body: [
        'Are spent light bulbs piling up at your facility? In Williamston, South Carolina, Recycle Technologies offers a hassle-free solution for bulb disposal. We understand the confusion around disposing of them properly, and we are here to help.',
        'Our service provides safe and eco-friendly fluorescent bulb recycling for businesses across Upstate South Carolina, including Greenville, Anderson, and Spartanburg. Choosing our Bulb Recycling service means convenience for your business and keeps harmful materials out of landfills.',
      ],
      image: '/images/services/light-bulbs-intro-v2.png',
      link: { label: 'Learn more about light bulb recycling', href: sub('light-bulb-recycling') },
    },
  ],
  ways: {
    eyebrow: 'Ways to recycle',
    cards: [
      // Get a Quote, not Schedule a Pickup (management, 12 Nov 2026).
      { icon: 'truck', title: 'Business Pick-Up Service', text: 'Exclusive pick-up recycling services for businesses', links: [QUOTE] },
      { icon: 'mail', title: 'Mail-In Recycling Program', text: 'Purchase our recycling kits online and mail in your electronics.', links: [
        { label: 'Mail In Your Electronics', href: href('/mail-in-recycling/') },
        { label: 'Buy Recycling Kits', href: KIT_STORE, external: true },
      ] },
    ],
  },
  why: {
    eyebrow: 'Why us',
    heading: 'Why Choose Recycle Technologies',
    cards: [
      { icon: 'award', title: 'Trusted and Local', text: 'Recycle Technologies has been providing recycling solutions since 1993 and is R2v3, NAID AAA, and RIOS certified, now serving Upstate South Carolina from Williamston.' },
      { icon: 'users', title: 'Dependable Customer Service', text: 'We value our clients and their devotion for a better planet and ensure quality recycling services within time.' },
      // Management, 12 Nov 2026: "we can recycle everything" was an overclaim.
      { icon: 'layers', title: 'Custom Recycling Services', text: 'One item or hundreds, we recycle based on your personalized requirements.' },
      { icon: 'calendar', title: 'Quick Booking and Pickup', text: 'Get a quote by filling out the form, and our team will schedule your business pickup.' },
    ],
  },
  responsibility: {
    heading: 'Our Environmental Responsibility',
    body: [
      'What makes Recycle Technologies stand out? Alongside our subsidiaries, Lighting Resources and EZ on the Earth, we lead in advanced recycling practices. Using state-of-the-art technology, we maximize material recovery, drastically reducing landfill waste and environmental harm. Our unwavering commitment to sustainability turns e-waste and other materials into reusable resources, fostering a circular economy.',
      'Our cutting-edge processes not only reclaim valuable materials but also minimize ecological damage. As dedicated environmental advocates, we continuously innovate in waste management, providing comprehensive services for businesses. By partnering with us, you support a cleaner, healthier, and more sustainable future. For more information, reach out to our Williamston team at (864) 774-8310.',
    ],
    image: '/images/landing/hero-photo-universal-waste.jpg',
    mailIn: {
      heading: 'Mail in Program',
      text: 'Access our recycling services through our complete recycling kits, which you can order online and ship to us.',
      links: [
        { label: 'Mail In Your Electronics', href: href('/mail-in-recycling/') },
        { label: 'Buy Recycling Kits', href: KIT_STORE, external: true },
      ],
    },
  },
  faq: {
    eyebrow: 'FAQs',
    heading: 'Questions About This Location',
    items: [
      { q: 'Is there a fee for recycling with this location?', a: 'Fees depend on the material and the quantity. Call (864) 774-8310 with a description of what you need recycled, and we will confirm any charges before your pickup is scheduled.' },
      { q: 'Do I need to schedule service with the Williamston facility?', a: 'Yes. Requirements vary by material and quantity. Call (864) 774-8310 or request a quote to confirm your materials are accepted and arrange a time. Large or commercial loads go faster when our team knows what to expect.' },
      { q: 'Can businesses schedule a bulk pickup from this facility?', a: 'Yes. Business pickups are available across Upstate South Carolina, including Greenville, Anderson, and Spartanburg. Pickup arrangements depend on the materials, quantity, location, and service required. Request a quote to get started.' },
    ],
  },
  serve: {
    heading: 'Counties We Serve',
    counties: ['Anderson County', 'Greenville County', 'Spartanburg County'],
    contact: {
      heading: 'Business Pick-Up Service',
      // The doc: "contact the person below"; no person is named yet, so "us".
      text: 'For business pickup services contact us below.',
      phone: PHONE,
      email: EMAIL,
      hours: HOURS,
      button: QUOTE,
    },
  },
  cta: {
    heading: 'Ready to Recycle? Get a Quote Today',
    body: 'Tell us what you have and we’ll take it from there.',
    primary: QUOTE,
    secondary: { label: 'Call (864) 774-8310', href: PHONE.href },
  },
  todo: [
    'Phone (864) 774-8310 (Aaqib), email and hours 9:00 AM to 4:00 PM (Shiza), 11 Nov 2026, for the doc’s [PHONE], [EMAIL] and empty Hours. No days were given with the hours.',
    'Business Pick-Up Service card: no [CONTACT NAME] yet, so it says "contact us below" instead of "contact the person below".',
    'The doc gives no SEO title or meta description; written from its H1 and copy (page is noindex).',
    'The EZ on the Earth link in the doc carried a tracking parameter; the name is kept as text.',
    'Management, 12 Nov 2026: Get a Quote only; "we can recycle everything" changed to "one item or hundreds"; hero facility name "... and Williamston Facility".',
    'The pills over the headings, "Why Choose Recycle Technologies" and the accepts card lines (taken from the four service docs) are the design’s, not the main doc’s.',
  ],
}
