import { quoteHref } from '@/lib/urls'
import { FAQ_HEAD, BLAINE_PHONE, HOME_CRUMB, ICON, LOCATIONS_CRUMB, related, type CityPage } from './types'

/**
 * /minnesota-recycling/light-bulb-recycling/ — "Light Bulb Recycling in
 * Blaine, Minnesota", Figma 6925:4591 (board) / 6925:5012 (phone). A facility
 * page. This frame lists what is accepted as centred teal lines rather than
 * cards, and draws two Recycling Options cards with a third centred below.
 */
const QUOTE = quoteHref({ service: 'Light Bulb Recycling', location: 'Minnesota' })
const H1 = 'Light Bulb Recycling in Blaine, Minnesota'

export const BLAINE_LIGHT_BULB: CityPage = {
  url: '/minnesota-recycling/light-bulb-recycling/',
  figma: { board: '6925:4591', phone: '6925:5012' },
  seo: {
    title: 'Light Bulb Recycling in Blaine, Minnesota | Recycle Technologies',
    description: 'Drop off, schedule a commercial pickup or mail in fluorescent tubes, CFLs, HID and other lamps at our Blaine, Minnesota facility. Processed in-house, not through a broker, since 1993.',
  },
  schema: { service: 'Light Bulb Recycling in Blaine, Minnesota', areaServed: ['Blaine, MN'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    /* New photo, 28 Sep 2026 (Figma BVtf2AOuUOcYbiMIlcKmbC, the same bulbs
       shot on all three light bulb pages): drawn without the grey veil, and
       placed by its own layer on the phone (6919:18212: 880x495 at -223,-109,
       green wash 505 wide from x-6). */
    image: '/images/locations/city-pages/light-bulb-hero.png',
    veil: false,
    phone: { width: 880, height: 495, left: -223, top: -109, washLeft: -6 },
    button: { label: 'Schedule a Light Bulb Recycling Pickup in Blaine, MN', href: QUOTE, phoneLabel: 'Schedule a Light Bulbs Recycling Pickup' },
  },

  opening: ['Fluorescent bulbs, CFLs, and other lamps contain small amounts of mercury and can’t legally go in the trash in Minnesota. Recycle Technologies handles light bulb recycling at its Blaine facility, giving residents and businesses in the area a documented way to get spent bulbs recycled. Individuals can drop bulbs off at the Blaine location or use the nationwide Mail-In Program, and businesses can schedule commercial pickup.'],

  serviceInfo: {
    compact: true,
    heading: 'Service Information',
    rows: [
      { label: 'Address', value: '1525 99th Ln NE, Blaine, Minnesota 55449' },
      { label: 'Phone', value: [BLAINE_PHONE] },
      { label: 'Drop-Off', value: 'Individuals can bring light bulbs to the Blaine location. A processing fee applies to drop-off materials.' },
      { label: 'Commercial Pickup', value: 'Available for businesses; scheduled pickup is exclusive to commercial customers.' },
      { label: 'Mail-In', value: 'Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a wide range of bulb and lamp types at its Blaine facility:',
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
    note: 'If you’re not sure whether a specific lamp qualifies, call the Blaine facility before scheduling a pickup or mail-in shipment.',
  },

  steps: {
    heading: 'How Light Bulb Recycling Works',
    arrows: false,
    items: [
      { title: 'Collection', text: 'Drop bulbs off at the Blaine facility, use the Mail-In Program, or, for businesses, schedule a commercial pickup.' },
      { title: 'Packaging', text: 'Because DOT regulations govern how bulbs are shipped, pack bulbs in a sturdy fiber bin or the original box they came in. Recycle Technologies can deliver packing materials ahead of a scheduled pickup.' },
      { title: 'Processing', text: 'Bulbs are processed directly at the Minnesota facility rather than routed through an outside broker.' },
      { title: 'Separation', text: 'Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated from each other during processing.' },
      { title: 'Recovery', text: 'Phosphor powder and filters go to a distillation company, glass is directed to industrial uses, and aluminum end caps go to an aluminum salvage partner.' },
    ],
  },

  options: {
    heading: 'Recycling Options in Blaine, Minnesota',
    layout: 'two-one',
    items: [
      { icon: ICON.clock,   title: 'Drop-Off', text: 'Bring bulbs to 1525 99th Ln NE, Blaine, MN 55449, Monday through Friday from 9:00 AM to 3:00 PM. A processing fee applies.' },
      { icon: ICON.truck,   title: 'Commercial Pickup', text: 'Businesses, property managers, and facilities in the Blaine area can schedule a commercial pickup for light bulbs. This is a business service, not a residential option. Recycle Technologies can also deliver packing materials ahead of the pickup date.' },
      { icon: ICON.inhouse, title: 'Mail-In Recycling', text: 'If a trip to Blaine isn’t convenient, the nationwide Mail-In Program lets you ship bulbs from anywhere in the country using the same packaging guidelines.' },
    ],
  },

  local: {
    width: 900,
    heading: 'Local Recycling Information',
    body: ['Minnesota law (Minn. Stat. § 115A.932) bans disposing of fluorescent and high-intensity discharge lamps in the trash and requires them to be recycled, covering fluorescent lights of every shape and size, including CFLs. Unlike some states, Minnesota does not allow crushing fluorescent bulbs before recycling.', 'The City of Blaine also runs a monthly community Recycling Saturday event at this same address, on the third Saturday of the month from 8 AM to noon, where residents can drop off lamps for a small per-item fee. This is a separate city-sponsored event from Recycle Technologies’ regular weekday drop-off hours.'],
  },

  whyBox: {
    heading: 'Why Recycle Technologies for Light Bulb Recycling',
    points: [
      'In-house processing at the Blaine facility, not outsourced to a broker',
      'Materials separated and directed to distillation, industrial glass use, and aluminum salvage rather than a landfill',
      'Local drop-off, commercial pickup, and nationwide Mail-In Program all available',
      'Wide range of accepted lamp types, from fluorescent tubes to incandescent and halogen bulbs',
      'Established recycling process in place since 1993',
    ],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'Am I actually required to recycle fluorescent bulbs instead of throwing them out in Minnesota?',
      a: 'Yes. Minnesota law (Minn. Stat. § 115A.932) bans disposing of fluorescent and high-intensity discharge lamps in the trash and requires them to be recycled, covering fluorescent lights of every shape and size, including CFLs.' },
    { q: 'Can I crush my own fluorescent bulbs before bringing them in?',
      a: 'No. Unlike some states, Minnesota does not allow crushing fluorescent bulbs before recycling. Pack them whole in a sturdy fiber bin or the original box.' },
    { q: 'Is there a fee to drop off light bulbs at the Blaine facility?',
      a: 'Yes, a processing fee applies to drop-off materials. Call the Blaine facility for current rates.' },
    { q: 'Can my business schedule a pickup for light bulbs, or is that only for drop-off?',
      a: 'Businesses, property managers, and facilities in the Blaine area can schedule a commercial pickup. Scheduled pickup is a business service, not a residential option, and Recycle Technologies can deliver packing materials ahead of the pickup date.' },
    { q: 'What if I don’t live near Blaine?',
      a: 'Use the nationwide Mail-In Program to ship bulbs from anywhere in the country, following the same packaging guidelines.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Ballast Recycling - often replaced along with fluorescent tubes', 'Battery Recycling', 'Electronic Recycling', 'Mail-In Program', 'All Recycle Technologies Locations'),
    phoneSkip: ['Mail-In Program'],
  },

  cta: {
    heading: 'Get Started With Light Bulb Recycling in Blaine, Minnesota',
    body: ['Drop off bulbs at the Blaine facility during business hours, schedule a commercial pickup if you’re a business, or start a shipment through the Mail-In Program.'],
    primary: { label: 'Schedule a Light Bulbs Recycling Pickup in Blaine, MN', href: QUOTE, phoneLabel: 'Schedule a Light Bulbs Recycling Pickup' },
    phone: { label: 'Call: (763) 559-5130', tel: 'tel:+17635595130', phoneLabel: 'Call (763) 559-5130' },
    bodyWidth: 720,
  },

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy; the fee answer names no amount. Confirm or replace.',
    'Drop-off hours: this frame says "Monday through Friday from 9:00 AM to 3:00 PM" while the Blaine battery and electronics frames say 8:30 AM to 4:30 PM. Confirm which is right for bulbs.',
    'The Drop-Off card draws a clock icon and the Mail-In card the building icon (the other pages use a pin and an envelope). Left as drawn.',
    'Related chip "Ballast Recycling - often replaced along with fluorescent tubes" is the frame’s full label.',
    'SEO title and description written for the build; the frames give none.',
  ],
}
