import { PICKUP_HREF } from '@/lib/urls'
import { FAQ_HEAD, BLAINE_PHONE, HOME_CRUMB, ICON, LOCATIONS_CRUMB, related, type CityPage } from './types'

/**
 * /minnesota-recycling/battery-recycling/ — "Battery Recycling in Blaine,
 * Minnesota", Figma 6922:18653 (board) / 6922:19075 (phone). A facility page.
 */
const H1 = 'Battery Recycling in Blaine, Minnesota'

export const BLAINE_BATTERY: CityPage = {
  url: '/minnesota-recycling/battery-recycling/',
  figma: { board: '6922:18653', phone: '6922:19075' },
  seo: {
    title: 'Battery Recycling in Blaine, Minnesota | Recycle Technologies',
    description: 'Drop off, business pickup or mail in spent batteries at our R2v3 certified Blaine, Minnesota facility. Alkaline, lithium-ion, lead-acid, NiCd and EV batteries sorted and recycled in-house since 1993.',
  },
  schema: { service: 'Battery Recycling in Blaine, Minnesota', areaServed: ['Blaine, MN'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    /* The batteries photo the designer swapped in on 28 Sep 2026 (Figma
       6922:18658, phone 6922:19096): shared by the battery pages, drawn
       without the grey veil, and placed by its own layer on the phone. */
    image: '/images/locations/city-pages/battery-hero.png',
    veil: false,
    phone: { width: 880, height: 495, left: -223, top: -108, washLeft: -15 },
    button: { label: 'Schedule a Pickup', href: PICKUP_HREF },
  },

  opening: ['Used batteries, alkaline, lithium-ion, lead-acid, and more, contain materials that can be hazardous if crushed, damaged, or left to leak, and shouldn’t go in the trash or curbside recycling bin. Recycle Technologies collects and recycles batteries for households, businesses, and organizations at its Blaine, Minnesota facility, giving the area a documented way to clear out spent batteries instead of letting them accumulate or ending up in the trash. Individuals can drop batteries off at the Blaine location or use the nationwide Mail-In Program, while businesses can schedule a pickup.'],

  serviceInfo: {
    heading: 'Service Information',
    rows: [
      { label: 'Address', value: '1525 99th Ln NE, Blaine, MN 55449' },
      { label: 'Phone', value: [BLAINE_PHONE] },
      { label: 'Hours', value: 'Monday through Friday, 8:30 AM to 4:30 PM' },
      { label: 'Drop-Off', value: 'Individuals can bring batteries to the Blaine location during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.' },
      { label: 'Business Pickup', value: 'Recycle Technologies covers a 100-mile radius around its Minnesota facility for scheduled business pickups.' },
      { label: 'Mail-In', value: 'Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a broad range of battery types at its Blaine facility:',
    layout: 'cards',
    items: [
      { icon: ICON.battery, title: 'Alkaline & zinc batteries', text: 'Standard alkaline and zinc batteries accepted at the Blaine facility.' },
      { icon: ICON.bolt,    title: 'Lithium-ion & lead-acid batteries', text: 'Including sealed lead-acid batteries.' },
      { icon: ICON.nicd,    title: 'Nickel-cadmium (NiCd) & button cell batteries', text: 'NiCd batteries and small button-cell batteries.' },
      { icon: ICON.ev,      title: 'EV, power tool & backup batteries', text: 'Including electric vehicle batteries, Tesla batteries, and battery backup units.' },
    ],
    note: 'Other battery types, including mercury oxide batteries, are handled on a case-by-case basis. If your batteries aren’t listed here, call the Blaine facility or reach out to describe what you need to recycle.',
  },

  steps: {
    heading: 'How Battery Recycling Works',
    arrows: true,
    items: [
      { title: 'Collection', text: 'Batteries are collected at the Blaine facility through drop-off, scheduled business pickup, or the Mail-In Program.' },
      { title: 'Sorting and Storage', text: 'Batteries are sorted by chemistry and stored safely, with terminals covered to reduce the risk of fire, before being processed or shipped for further processing.' },
      { title: 'Documentation', text: 'Recycle Technologies provides recycling documentation for households and businesses that need records of proper disposal.' },
    ],
    footnote: 'Recycle Technologies has handled battery recycling from its Minnesota facility since 1993.',
  },

  options: {
    heading: 'Recycling Options in Blaine, Minnesota',
    layout: 'three',
    items: [
      { icon: ICON.pin,   title: 'Drop-Off', text: 'Bring your batteries directly to the Blaine facility during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.' },
      { icon: ICON.truck, title: 'Business Pickup', text: 'Businesses within a 100-mile radius of the Blaine facility can schedule a pickup for spent batteries, rather than transporting them in themselves.' },
      { icon: ICON.mail,  title: 'Mail-In Recycling', text: 'Anyone outside the Blaine service area can use the nationwide Mail-In Program to ship batteries in for certified processing.' },
    ],
  },

  local: {
    heading: 'Local Recycling Information',
    body: ['Battery disposal rules vary by battery chemistry and by whether the generator is a household or a business, and requirements can change, so it’s best to confirm with local authorities or contact the Blaine facility directly before disposing of batteries you’re unsure about.'],
  },

  whyBox: {
    heading: 'Why Recycle Technologies for Battery Recycling',
    points: [
      'In-house sorting and processing at the Blaine facility since 1993',
      'R2v3, RIOS, and NAID AAA certified, held to independently audited standards',
      'Trained staff sort every battery by chemistry rather than processing mixed loads',
      'Local drop-off, business pickup within a 100-mile radius, and nationwide Mail-In Program all available',
      'Certificate of recycling and safe disposal issued for every pickup or drop-off',
    ],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'What battery types does Recycle Technologies accept?',
      a: 'Alkaline and zinc batteries, lithium-ion and sealed lead-acid batteries, nickel-cadmium and button cell batteries, and EV, power tool and backup batteries. Other types, including mercury oxide batteries, are handled on a case-by-case basis; call the Blaine facility to check.' },
    { q: 'Do I need to sort batteries before recycling them?',
      a: 'Trained staff sort every battery by chemistry when it arrives, so you do not have to. Covering the terminals with tape before storing or shipping batteries reduces the risk of fire.' },
    { q: 'Can my business schedule a pickup for batteries?',
      a: 'Yes. Businesses within a 100-mile radius of the Blaine facility can schedule a pickup for spent batteries rather than transporting them in themselves.' },
    { q: 'What if I don’t live near Blaine?',
      a: 'Use the nationwide Mail-In Program to ship batteries to Recycle Technologies for certified processing from anywhere in the country.' },
    { q: 'Is it legal to put batteries in my regular trash?',
      a: 'Rules vary by battery chemistry and by whether you are a household or a business, and they change. Confirm with local authorities or contact the Blaine facility before disposing of batteries you are unsure about.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Electronic Recycling', 'Light Bulbs Recycling', 'Ballasts Recycling', 'Mail-In Program', 'All Recycle Technologies Locations'),
  },

  cta: {
    heading: 'Get Started With Battery Recycling in Blaine, Minnesota',
    body: ['Drop off batteries at the Blaine facility during business hours, or schedule a business battery pickup if you’re within our service radius.'],
    primary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    phone: { label: 'Call: (763) 559-5130', tel: 'tel:+17635595130', phoneLabel: 'Phone: (763) 559-5130' },
    headingWidth: 598,
  },

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy; confirm or replace.',
    'The Why box on the frame carries a stray intro line ("Businesses in the Chicago area can arrange battery recycling …") copied from the Chicago page; dropped from the build. Confirm.',
    'Hours "Monday through Friday, 8:30 AM to 4:30 PM" and the drop-off entrance come from the frame; the facility has not confirmed them (same open item as the facility page).',
    'SEO title and description written for the build; the frames give none.',
  ],
}
