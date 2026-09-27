import { quoteHref } from '@/lib/urls'
import { FAQ_HEAD, HOME_CRUMB, ICON, LOCATIONS_CRUMB, NEW_BERLIN_PHONE, related, type CityPage } from './types'

/**
 * /wisconsin-recycling/light-bulb-recycling/ — "Light Bulb Recycling in New
 * Berlin, Wisconsin", Figma 6925:5561 (board) / 6925:5928 (phone). A facility
 * page, the twin of the Blaine light bulb frame.
 */
const QUOTE = quoteHref({ service: 'Light Bulb Recycling', location: 'Wisconsin' })
const H1 = 'Light Bulb Recycling in New Berlin, Wisconsin'

export const NEW_BERLIN_LIGHT_BULB: CityPage = {
  url: '/wisconsin-recycling/light-bulb-recycling/',
  figma: { board: '6925:5561', phone: '6925:5928' },
  seo: {
    title: 'Light Bulb Recycling in New Berlin, Wisconsin | Recycle Technologies',
    description: 'Drop off, schedule a commercial pickup or mail in fluorescent tubes, CFLs, HID and other lamps at our New Berlin, Wisconsin facility. Processed in-house, not through a broker, since 1993.',
  },
  schema: { service: 'Light Bulb Recycling in New Berlin, Wisconsin', areaServed: ['New Berlin, WI'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    image: '/images/locations/city-pages/new-berlin-light-bulb/hero.png',
    button: { label: 'Schedule a Light Bulb Recycling Pickup', href: QUOTE, phoneLabel: 'Schedule a Light Bulbs Recycling Pickup' },
  },

  opening: ['Used light bulbs, especially fluorescent and CFL types, contain small amounts of mercury and can’t go in the trash or curbside recycling bin in Wisconsin. Recycle Technologies handles light bulb recycling at its New Berlin facility, giving households, businesses, and property managers in the area a documented way to get spent bulbs processed. Individuals can drop bulbs off at the New Berlin location or use the nationwide Mail-In Program, while businesses can arrange commercial pickup.'],

  serviceInfo: {
    compact: true,
    heading: 'Service Information',
    rows: [
      { label: 'Address', value: '2815 South 171st Street, New Berlin, WI 53151' },
      { label: 'Phone', value: [NEW_BERLIN_PHONE] },
      { label: 'Drop-Off', value: 'Individuals can bring light bulbs to the New Berlin location during business hours.' },
      { label: 'Commercial Pickup', value: 'Available for businesses; scheduled pickup is exclusive to commercial customers.' },
      { label: 'Mail-In', value: 'Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a wide range of bulb and lamp types at its New Berlin facility:',
    layout: 'list',
    list: [
      'Fluorescent tubes, plastic-coated and shielded tubes',
      'Compact fluorescent lamps (CFLs)',
      'Green-tipped bulbs',
      'Circular lamps and U-bend/U-shaped lamps',
      'Ultraviolet (UV) lamps, neon, argon, and other cold cathode lamps',
      'High-intensity discharge (HID) lamps, including metal halide and high-pressure sodium',
      'Flood lamps',
      'Incandescent bulbs',
      'Halogen bulbs',
    ],
    note: 'If you’re not sure whether a specific lamp qualifies, call the New Berlin facility before scheduling a pickup or mail-in shipment.',
  },

  steps: {
    heading: 'How Light Bulb Recycling Works',
    arrows: false,
    items: [
      { title: 'Collection', text: 'Drop bulbs off at the New Berlin facility, use the Mail-In Program, or, for businesses, schedule a commercial pickup.' },
      { title: 'Packaging', text: 'Because DOT regulations govern how bulbs are shipped, pack bulbs in a sturdy fiber bin or the original box they came in. Recycle Technologies can deliver packing materials ahead of a scheduled pickup.' },
      { title: 'Processing', text: 'Bulbs are processed directly at the Wisconsin facility rather than routed through an outside broker.' },
      { title: 'Separation', text: 'Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated from each other during processing.' },
      { title: 'Recovery', text: 'Phosphor powder and filters go to a distillation company, glass is directed to industrial uses, and aluminum end caps go to an aluminum salvage partner.' },
    ],
  },

  options: {
    heading: 'Recycling Options in New Berlin, Wisconsin',
    layout: 'two-one',
    items: [
      { icon: ICON.clock,   title: 'Drop-Off', text: 'Bring bulbs to 2815 South 171st Street, New Berlin, WI 53151, Monday through Friday from 8:00 AM to 4:30 PM.' },
      { icon: ICON.truck,   title: 'Commercial Pickup', text: 'Businesses, property managers, and facilities in the New Berlin area can schedule a commercial pickup for light bulbs. This is a business service, not a residential option. Recycle Technologies can also deliver packing materials ahead of the pickup date.' },
      { icon: ICON.inhouse, title: 'Mail-In Recycling', text: 'If a trip to New Berlin isn’t convenient, the nationwide Mail-In Program lets you ship bulbs from anywhere in the country using the same packaging guidelines.' },
    ],
  },

  local: {
    width: 900,
    heading: 'Local Recycling Information',
    body: ['Wisconsin law prohibits sending mercury-containing lamps, including fluorescent, CFL, mercury vapor, metal halide, and high-pressure sodium bulbs, to a landfill. These must be recycled or managed as hazardous waste. Businesses and institutions that recycle these lamps fall under Wisconsin’s Universal Waste Rule (NR 673), which requires bulbs to be kept in closed, labeled containers and removed for recycling within one year.', 'New Berlin’s municipal recycling center does not accept light bulbs or other electronics, so residents and businesses need a private recycler like Recycle Technologies or the Mail-In Program.'],
  },

  whyBox: {
    heading: 'Why Recycle Technologies for Light Bulb Recycling',
    points: [
      'In-house processing at the New Berlin facility, not outsourced to a broker',
      'Materials separated and directed to distillation, industrial glass use, and aluminum salvage rather than a landfill',
      'Local drop-off, commercial pickup, and nationwide Mail-In Program all available',
      'Wide range of accepted lamp types, from fluorescent tubes to incandescent and halogen bulbs',
      'Established recycling process in place since 1993',
    ],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'Can I put light bulbs in my curbside recycling bin in New Berlin?',
      a: 'No. New Berlin’s municipal recycling center does not accept light bulbs or other electronics, so residents and businesses need a private recycler like Recycle Technologies or the Mail-In Program.' },
    { q: 'Is it actually illegal to throw fluorescent bulbs in the trash in Wisconsin?',
      a: 'Yes. Wisconsin law prohibits sending mercury-containing lamps, including fluorescent, CFL, mercury vapor, metal halide, and high-pressure sodium bulbs, to a landfill. They must be recycled or managed as hazardous waste.' },
    { q: 'What should I do if a CFL or fluorescent bulb breaks before I can drop it off?',
      a: 'Keep the pieces together in a sealed container rather than the trash, and bring them in with your other bulbs. Call the New Berlin facility if you are unsure how to pack them.' },
    { q: 'Can my business schedule a pickup for light bulbs, or is that only for drop-off?',
      a: 'Businesses, property managers, and facilities in the New Berlin area can schedule a commercial pickup. Scheduled pickup is a business service, not a residential option, and Recycle Technologies can deliver packing materials ahead of the pickup date.' },
    { q: 'What if I don’t live near New Berlin?',
      a: 'Use the nationwide Mail-In Program to ship bulbs from anywhere in the country, following the same packaging guidelines.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Ballast Recycling - often replaced along with fluorescent tubes', 'Battery Recycling', 'Electronic Recycling', 'Mail-In Program', 'All Recycle Technologies Locations'),
    phoneSkip: ['Mail-In Program'],
  },

  cta: {
    heading: 'Get Started With Light Bulb Recycling in New Berlin, Wisconsin',
    body: ['Drop off bulbs at the New Berlin facility during business hours, schedule a commercial pickup if you’re a business, or start a shipment through the Mail-In Program.'],
    primary: { label: 'Schedule a Light Bulbs Recycling Pickup in New Berlin, WI', href: QUOTE, phoneLabel: 'Schedule a Light Bulbs Recycling Pickup' },
    phone: { label: 'Call: (262) 798-3040', tel: 'tel:+12627983040', phoneLabel: 'Call (262) 798-3040' },
    bodyWidth: 720,
  },

  /** Grey bands as the revised board draws them (27 Sep 2026). */
  bands: ['info', 'steps', 'whybox', 'faq'],

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy, except the broken bulb answer, which the page does not cover; confirm or replace all five.',
    'Breadcrumb on the frame reads "Light Bulb Recycling in Blaine, Minnesota" (copied from the Blaine frame); built with this page’s own title.',
    'The Drop-Off card draws a clock icon and the Mail-In card the building icon, as on the Blaine bulb page. Left as drawn.',
    'SEO title and description written for the build; the frames give none.',
  ],
}
