import { quoteHref } from '@/lib/urls'
import { FAQ_HEAD, HOME_CRUMB, ICON, LOCATIONS_CRUMB, NEW_BERLIN_PHONE, related, type CityPage } from './types'

/**
 * /wisconsin-recycling/electronic-recycling/ — "Electronic Recycling in New
 * Berlin, Wisconsin", Figma 6925:8553 (board) / 6925:9059 (phone). A
 * facility page, the twin of the Blaine electronics frame.
 */
const QUOTE = quoteHref({ service: 'Electronics Recycling', location: 'Wisconsin' })
const H1 = 'Electronic Recycling in New Berlin, Wisconsin'

export const NEW_BERLIN_ELECTRONICS: CityPage = {
  url: '/wisconsin-recycling/electronic-recycling/',
  figma: { board: '6925:8553', phone: '6925:9059' },
  seo: {
    title: 'Electronic Recycling in New Berlin, Wisconsin | Recycle Technologies',
    description: 'Drop off, business pickup or mail in computers, monitors, printers, phones and other e-waste at our New Berlin, Wisconsin facility. Dismantled and recycled in-house since 1993.',
  },
  schema: { service: 'Electronic Recycling in New Berlin, Wisconsin', areaServed: ['New Berlin, WI'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    /* New photo, 28 Sep 2026 (Figma BVtf2AOuUOcYbiMIlcKmbC, the same
       electronics shot on both electronics pages): drawn without the grey
       veil; on the phone the layer sits at -194,-67 (6927:10028) over the
       navy, with the 1127 wide green from x-62 on top. */
    image: '/images/locations/city-pages/electronics-hero.png',
    veil: false,
    phone: { width: 730, height: 411, left: -194, top: -67, washLeft: -62, washWidth: 1127 },
    button: { label: 'Schedule an Electronics Pickup in New Berlin, WI', href: QUOTE, phoneLabel: 'Schedule an Electronics Recycling Pickup' },
  },

  opening: ['Used electronics, computers, monitors, printers, and the cables, switches, and chargers that go with them, contain metals, plastics, glass, and circuit boards that shouldn’t go in the trash or curbside recycling bin. Recycle Technologies collects and processes electronics for households, businesses, and organizations at its New Berlin, Wisconsin facility, breaking devices down into their base materials instead of sending them to a landfill. Individuals can drop electronics off at the New Berlin location or use the nationwide Mail-In Program, while businesses can schedule a pickup.'],

  serviceInfo: {
    heading: 'Service Information',
    rows: [
      { label: 'Address', value: '2815 South 171st Street, New Berlin, WI 53151' },
      { label: 'Phone', value: [NEW_BERLIN_PHONE] },
      { label: 'Hours', value: 'Monday through Friday, 8:00 AM to 4:30 PM' },
      { label: 'Drop-Off', value: 'Individuals can bring electronics to the New Berlin location during business hours; enter via the main lot on South 171st Street, where staff will direct you to the drop-off bay on arrival.' },
      { label: 'Business Pickup', value: 'Available for businesses; contact Recycle Technologies to arrange a scheduled pickup.' },
      { label: 'Mail-In', value: 'Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a broad range of electronic and computer-related equipment at its New Berlin facility:',
    layout: 'cards',
    items: [
      { icon: ICON.ewaste,  title: 'General e-waste', text: 'Cables, switches, chargers, keyboards, mice, remotes, microwaves, televisions, and other everyday electronic items.' },
      { icon: ICON.laptop,  title: 'Computers & laptops', text: 'Desktops, laptops, and servers.' },
      { icon: ICON.monitor, title: 'Monitors & displays', text: 'Including CRT units.' },
      { icon: ICON.printer, title: 'Office & imaging equipment', text: 'Fax machines, printers, scanners, and copiers.' },
      { icon: ICON.phone,   title: 'Phones', text: 'Cell phones and related mobile devices.', wide: true },
    ],
    note: 'Related electronic scrap is handled on a case-by-case basis. If your equipment isn’t listed here, call the New Berlin facility to confirm before scheduling.',
  },

  steps: {
    heading: 'How Electronic Recycling Works',
    arrows: true,
    items: [
      { title: 'Collection', text: 'Electronics enter the process through a business pickup, a drop-off at the New Berlin facility, or the Mail-In Program.' },
      { title: 'Sorting and Storage', text: 'Incoming electronics are grouped by type ahead of processing.' },
      { title: 'Dismantling', text: 'Devices are broken down so individual components and materials can be separated from one another.' },
      { title: 'Separation', text: 'Plastic and wiring are separated out for shredding, monitors go through a decontamination step that removes lead, and circuit boards are sorted from the rest of the unit.' },
      { title: 'Recovery', text: 'Shredded plastic and wire are sent to molders and smelters, and the metals and minerals sorted out of circuit boards are collected for reuse.' },
    ],
    footnote: 'Recycle Technologies has provided these services since 1993 and operates licensed facilities in Wisconsin and Minnesota.',
  },

  options: {
    heading: 'Recycling Options in New Berlin, Wisconsin',
    layout: 'three',
    items: [
      { icon: ICON.pin,   title: 'Drop-Off', text: 'Bring electronics to 2815 South 171st Street, New Berlin, WI 53151, Monday through Friday from 8:00 AM to 4:30 PM. Enter via the main lot on South 171st Street; staff will direct you to the drop-off bay upon arrival.' },
      { icon: ICON.truck, title: 'Business Pickup', text: 'Businesses in the New Berlin area can schedule a commercial pickup for retired IT equipment and other electronics.' },
      { icon: ICON.mail,  title: 'Mail-In Recycling', text: 'If a trip to New Berlin isn’t convenient, the nationwide Mail-In Program lets you ship electronics from anywhere in the country.' },
    ],
  },

  local: {
    width: 1000,
    heading: 'Local Recycling Information',
    body: ['Rules on disposing of electronics, particularly items with a circuit board or CRT, vary by device type and by whether the generator is a household or a business, and requirements can change, so it’s best to confirm with local authorities or contact the New Berlin facility directly before disposing of any item you’re unsure about.'],
  },

  whyBox: {
    heading: 'Why Recycle Technologies for Electronic Recycling',
    points: [
      'In-house dismantling and processing at the New Berlin facility since 1993',
      'Monitors decontaminated to remove lead before recycling; circuit boards sorted for metal and mineral recovery',
      'Local drop-off, business pickup, and nationwide Mail-In Program all available',
      'Wide range of accepted items, from full computer systems down to cables, switches, and chargers',
      'Part of a Midwest network pursuing R2v3 certification alongside the company’s already-certified Minnesota facility',
    ],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'What electronics does Recycle Technologies accept?',
      a: 'General e-waste such as cables, switches, chargers, keyboards, mice, remotes, microwaves and televisions; desktops, laptops and servers; monitors and displays including CRT units; fax machines, printers, scanners and copiers; and cell phones and related mobile devices. Other electronic scrap is handled case by case.' },
    { q: 'Can individuals schedule a pickup?',
      a: 'Scheduled pickup is for businesses. Individuals can drop electronics off at the New Berlin facility during business hours or use the nationwide Mail-In Program.' },
    { q: 'What happens to my electronics after they’re collected?',
      a: 'They are grouped by type, dismantled, and separated: plastic and wiring go for shredding, monitors are decontaminated to remove lead, and circuit boards are sorted. Shredded plastic and wire go to molders and smelters, and the metals and minerals from circuit boards are collected for reuse.' },
    { q: 'What if there isn’t a Recycle Technologies location near me?',
      a: 'The nationwide Mail-In Program lets you ship electronics to Recycle Technologies from anywhere in the country.' },
    { q: 'Is it legal to put electronics in my regular trash?',
      a: 'Rules vary by device type and by whether you are a household or a business, and they change. Confirm with local authorities or contact the New Berlin facility before disposing of any item you are unsure about.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Battery Recycling', 'Television Recycling', 'Paper Shredding', 'Mail-In Program', 'All Recycle Technologies Locations'),
    phoneStack: true,
  },

  cta: {
    heading: 'Get Started With Electronic Recycling in New Berlin, Wisconsin',
    body: ['Drop off electronics at the New Berlin facility during business hours, or schedule a business pickup for retired equipment.'],
    primary: { label: 'Schedule an Electronics Recycling Pickup in New Berlin, WI', href: QUOTE, phoneLabel: 'Schedule an Electronics Recycling Pickup' },
    phone: { label: 'Call: (262) 798-3040', tel: 'tel:+12627983040' },
    bodyWidth: 720,
  },

  /** Grey bands as the revised board draws them (27 Sep 2026). */
  bands: ['info', 'steps', 'local', 'related'],

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy; confirm or replace.',
    'Why box, last point, says New Berlin is still pursuing R2v3 certification; the Blaine electronics page says both facilities are certified. Confirm which is true before this goes live.',
    'Hours and the drop-off entrance come from the frame; the facility has not confirmed them (same open item as the facility page).',
    'SEO title and description written for the build; the frames give none.',
  ],
}
