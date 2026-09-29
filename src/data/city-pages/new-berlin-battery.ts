import { quoteHref } from '@/lib/urls'
import { FAQ_HEAD, HOME_CRUMB, ICON, LOCATIONS_CRUMB, NEW_BERLIN_PHONE, related, type CityPage } from './types'

/**
 * /wisconsin-recycling/battery-recycling/ — "Battery Recycling in New
 * Berlin, Wisconsin", Figma 6924:3664 (board) / 6924:4086 (phone). A
 * facility page. This frame's accept cards carry a title only (no second
 * line) and its three steps are 360 wide with arrows.
 */
const QUOTE = quoteHref({ service: 'Battery Recycling', location: 'Wisconsin' })
const H1 = 'Battery Recycling in New Berlin, Wisconsin'

export const NEW_BERLIN_BATTERY: CityPage = {
  url: '/wisconsin-recycling/battery-recycling/',
  figma: { board: '6924:3664', phone: '6924:4086' },
  seo: {
    title: 'Battery Recycling in New Berlin, Wisconsin | Recycle Technologies',
    description: 'Drop off, business pickup or mail in spent batteries at our New Berlin, Wisconsin facility. Alkaline, lithium-ion, lead-acid, NiCd and EV batteries sorted by chemistry and recycled in-house since 1993.',
  },
  schema: { service: 'Battery Recycling in New Berlin, Wisconsin', areaServed: ['New Berlin, WI'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    /* New photo, 28 Sep 2026: the batteries shot the Chicago and Blaine
       battery pages got the same day (6924:3669), drawn without the grey
       veil and placed by its own layer on the phone (6924:4107). */
    image: '/images/locations/city-pages/battery-hero.png',
    veil: false,
    phone: { width: 880, height: 495, left: -223, top: -109, washLeft: -6 },
    button: { label: 'Schedule a Battery Recycling Pickup', href: QUOTE },
  },

  opening: ['Used batteries, alkaline, lithium-ion, lead-acid, and more, contain materials that can be hazardous if crushed, damaged, or left to leak, and shouldn’t go in the trash or curbside recycling bin. Recycle Technologies collects and recycles batteries for households, businesses, and organizations at its New Berlin, Wisconsin facility, giving the area a documented way to clear out spent batteries instead of letting them accumulate. Individuals can drop batteries off at the New Berlin location or use the nationwide Mail-In Program, while businesses can schedule a pickup.'],

  serviceInfo: {
    compact: true,
    heading: 'Service Information',
    rows: [
      { label: 'Address', value: '2815 South 171st Street, New Berlin, WI 53151' },
      { label: 'Phone', value: [NEW_BERLIN_PHONE] },
      { label: 'Hours', value: 'Monday through Friday, 8:00 AM to 4:30 PM' },
      { label: 'Drop-Off', value: 'Individuals can bring batteries to the New Berlin location during business hours; enter via the main lot on South 171st Street, where staff will direct you to the drop-off bay on arrival.' },
      { label: 'Business Pickup', value: 'Recycle Technologies covers a 100-mile radius around its Wisconsin facility for scheduled business pickups.' },
      { label: 'Mail-In', value: 'Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a broad range of battery types at its New Berlin facility:',
    layout: 'cards',
    items: [
      { icon: ICON.battery, title: 'Alkaline & zinc batteries' },
      { icon: ICON.bolt,    title: 'Lithium-ion & lead-acid batteries, including sealed lead-acid batteries' },
      { icon: ICON.nicd,    title: 'Nickel-cadmium (NiCd) & button cell batteries' },
      { icon: ICON.ev,      title: 'EV, power tool & backup batteries, including electric vehicle batteries, Tesla batteries, and battery backup units' },
    ],
    note: 'Other battery types, including mercury oxide batteries, are handled on a case-by-case basis. If your batteries aren’t listed here, call the New Berlin facility or reach out to describe what you need to recycle.',
  },

  steps: {
    heading: 'How Battery Recycling Works',
    arrows: true,
    items: [
      { title: 'Collection', text: 'Batteries enter the process through a business pickup, a drop-off at the New Berlin facility, or the Mail-In Program.' },
      { title: 'Sorting and Storage', text: 'Trained staff sort and separate batteries by type once they arrive, since a container of mixed battery types takes longer to process safely than one that’s already sorted. Battery terminals should be covered before shipping or storage to reduce fire risk, and batteries sent through the Mail-In Program should already be separated by type.' },
      { title: 'Documentation', text: ['Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.', 'Recycle Technologies has handled battery recycling from its Wisconsin facility since 1993.'] },
    ],
  },

  options: {
    heading: 'Recycling Options in New Berlin, Wisconsin',
    layout: 'three',
    items: [
      { icon: ICON.clock, title: 'Drop-Off', text: 'Bring batteries to 2815 South 171st Street, New Berlin, WI 53151, Monday through Friday from 8:00 AM to 4:30 PM. Enter via the main lot on South 171st Street; staff will direct you to the drop-off bay upon arrival.' },
      { icon: ICON.truck, title: 'Business Pickup', text: 'Businesses within roughly 100 miles of the New Berlin facility can schedule a pickup for batteries rather than transporting them to the facility themselves.' },
      { icon: ICON.inhouse, title: 'Mail-In Recycling', text: 'If a trip to New Berlin isn’t convenient, the nationwide Mail-In Program lets you ship batteries from anywhere in the country, already sorted by type.' },
    ],
  },

  local: {
    heading: 'Local Recycling Information',
    body: ['Battery disposal rules vary by battery chemistry and by whether the generator is a household or a business, and requirements can change, so it’s best to confirm with local authorities or contact the New Berlin facility directly before disposing of batteries you’re unsure about.'],
  },

  whyBox: {
    heading: 'Why Recycle Technologies for Battery Recycling',
    points: [
      'In-house sorting and processing at the New Berlin facility since 1993',
      'Trained staff sort every battery by chemistry rather than processing mixed loads',
      'Local drop-off, business pickup within a 100-mile radius, and nationwide Mail-In Program all available',
      'Certificate of recycling and safe disposal issued for every pickup or drop-off',
      'Part of a Midwest network pursuing R2v3 certification alongside the company’s already-certified Minnesota facility',
    ],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'What battery types does Recycle Technologies accept?',
      a: 'Alkaline and zinc batteries, lithium-ion and sealed lead-acid batteries, nickel-cadmium and button cell batteries, and EV, power tool and backup batteries. Other types, including mercury oxide batteries, are handled on a case-by-case basis; call the New Berlin facility to check.' },
    { q: 'Do I need to sort batteries before recycling them?',
      a: 'Trained staff sort batteries by type when they arrive, but a container that is already sorted is processed faster and more safely. Cover the terminals before storing or shipping, and separate batteries by type if you use the Mail-In Program.' },
    { q: 'Can my business schedule a pickup for batteries?',
      a: 'Yes. Businesses within roughly 100 miles of the New Berlin facility can schedule a pickup for batteries rather than transporting them to the facility themselves.' },
    { q: 'What if I don’t live near New Berlin?',
      a: 'Use the nationwide Mail-In Program to ship batteries to Recycle Technologies from anywhere in the country, already sorted by type.' },
    { q: 'Is it legal to put batteries in my regular trash?',
      a: 'Rules vary by battery chemistry and by whether you are a household or a business, and they change. Confirm with local authorities or contact the New Berlin facility before disposing of batteries you are unsure about.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Electronics Recycling', 'Television Recycling', 'Paper Shredding', 'Mail-In Program', 'All Recycle Technologies Locations'),
  },

  cta: {
    heading: 'Get Started With Battery Recycling in New Berlin, Wisconsin',
    body: ['Drop off batteries at the New Berlin facility during business hours, or schedule a business battery pickup if you’re within our service radius.'],
    primary: { label: 'Schedule a Battery Recycling Pickup in New Berlin, WI', href: QUOTE, phoneLabel: 'Schedule a Battery Recycling Pickup' },
    phone: { label: 'Call: (262) 798-3040', tel: 'tel:+12627983040', phoneLabel: 'Phone: (262) 798-3040' },
    headingWidth: 598,
  },

  /** Grey bands as the revised board draws them (27 Sep 2026). */
  bands: ['info', 'options', 'related'],

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy; confirm or replace.',
    'CTA button: the frame reads "Schedule a Battery Recycling Pickup in Berlin, WI" (missing "New"); built as "New Berlin, WI".',
    'Why box, last point: "pursuing R2v3 certification alongside the company’s already-certified Minnesota facility" says New Berlin is not yet R2v3 certified, while the Blaine electronics page says both facilities are. Confirm which is true before this goes live.',
    'Hours and the drop-off entrance come from the frame; the facility has not confirmed them (same open item as the facility page).',
    'SEO title and description written for the build; the frames give none.',
  ],
}
