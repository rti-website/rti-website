import { href, quoteHref } from '@/lib/urls'
import { FAQ_HEAD, CHICAGO_PHONES, HOME_CRUMB, ICON, LOCATIONS_CRUMB, related, type CityPage } from './types'

/**
 * /light-bulb-recycling-chicago/ — "Light Bulb Recycling in Chicago,
 * Illinois", Figma 6919:17769 (board) / 6919:18191 (phone). A service area
 * page: no facility, no address, no map (see types.ts).
 */
const QUOTE = quoteHref({ service: 'Light Bulb Recycling', location: 'Chicago, IL' })
const H1 = 'Light Bulb Recycling in Chicago, Illinois'

export const CHICAGO_LIGHT_BULB: CityPage = {
  url: '/light-bulb-recycling-chicago/',
  figma: { board: '6919:17769', phone: '6919:18191' },
  seo: {
    title: 'Light Bulb Recycling in Chicago, Illinois | Recycle Technologies',
    description: 'Commercial light bulb and lamp recycling for Chicago businesses by scheduled pickup, with mail-in kits for residents. Fluorescent, CFL, HID and more, processed at our R2v3 certified facilities.',
  },
  schema: { service: 'Light Bulb Recycling in Chicago', areaServed: ['Chicago, IL'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    image: '/images/locations/city-pages/chicago-light-bulb/hero.png',
    button: { label: 'Schedule a Light Bulb Recycling Pickup', href: QUOTE, phoneLabel: 'Schedule a Light Bulbs Recycling Pickup' },
  },

  opening: [
    'Recycle Technologies provides light bulb recycling services to businesses in the Chicago area.',
    'Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, with collected materials transported to the company’s certified facilities for processing.',
    'If your business needs to recycle fluorescent tubes, CFLs, LEDs, or other lighting in Chicago, this page explains what is available, what is accepted, and how to get started.',
  ],

  intro: {
    heading: 'Light Bulb Recycling Services in Chicago',
    body: [
      'Recycle Technologies is a Midwest-based recycling and shredding company that has recycled fluorescent lamps and other light bulbs since 1993. Materials are processed at its own R2v3-certified Minnesota and Wisconsin facilities rather than through a broker.',
      'In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.',
    ],
    aside: {
      heading: 'Chicago Is a Service Area, Not a Facility',
      body: [
        'Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.',
        'Businesses in Chicago can arrange scheduled commercial pickup for fluorescent lamps and other lighting materials. Collected bulbs are transported to Recycle Technologies’ facilities in Minnesota and Wisconsin for processing.',
      ],
    },
  },

  serviceInfo: {
    heading: 'Chicago Location and Service Information',
    rows: [
      { label: 'Location', value: 'Chicago, Illinois' },
      { label: 'Phone', value: CHICAGO_PHONES },
      { label: 'Service Area', value: 'Chicago and surrounding areas' },
      { label: 'Commercial customers', value: 'Scheduled pickup' },
      { label: 'Processing', value: 'Minnesota and Wisconsin facilities' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a broad range of light bulbs and lighting equipment.',
    layout: 'pills',
    groups: [
      { title: 'Fluorescent Bulbs', items: ['Tubes', 'Plastic-coated and shielded tubes', 'Compact fluorescent lamps (CFLs)', 'Green-tipped bulbs', 'Circular lamps', 'U-bend or U-shaped lamps'] },
      { title: 'Other Accepted Lighting', items: ['Ultraviolet (UV) lamps', 'Neon lamps', 'Argon lamps', 'Other cold cathode lamps', 'High-intensity discharge (HID) lamps', 'Metal halide lamps', 'High-pressure sodium lamps', 'Flood lamps', 'Incandescent bulbs', 'Halogen bulbs'] },
    ],
    note: 'Not sure whether a specific lamp type qualifies? Contact Recycle Technologies directly to confirm before scheduling a pickup.',
  },

  businesses: {
    heading: 'Light Bulb Recycling for Chicago Businesses',
    intro: 'Businesses in the Chicago area can arrange light bulb recycling for office, facility, and retrofit lighting needs.',
    subLead: 'This includes:',
    points: [
      'Retired fluorescent tubes, CFLs, and HID lamps from lighting upgrades',
      'Spent lighting from office and facility operations',
      'Larger volumes of spent lighting from facility-wide relamping projects',
    ],
    outro: [
      'Illinois law restricts businesses from disposing of mercury-containing bulbs with regular trash, making a documented recycling partner relevant for both compliance and sustainability.',
      'To arrange service, businesses can request a quote or schedule a commercial pickup.',
    ],
  },

  residents: {
    heading: 'Light Bulb Recycling for Chicago Residents',
    body: ['Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents can use the mail-in program by ordering a prepaid light bulb recycling kit, packing the bulbs according to the kit instructions, and shipping them to Recycle Technologies for certified processing.'],
    link: { label: 'Light Bulb Recycling Kits', href: href('/mail-in-recycling/') },
  },

  steps: {
    heading: 'How Light Bulb Recycling Works',
    arrows: false,
    items: [
      { title: 'Commercial Pickup', text: 'Chicago businesses schedule a commercial pickup for their spent light bulbs and lighting materials. Recycle Technologies coordinates collection and transportation to its processing facilities.' },
      { title: 'Packaging and Processing', text: 'Because the Department of Transportation regulates how bulbs are packaged for shipping, bulbs are packed using Recycle Technologies’ fiber bins or original bulb boxes before being transported to the company’s Minnesota and Wisconsin facilities.' },
      { title: 'Recycling and Material Recovery', text: [
        'Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated so each material can be recycled properly.',
        'Phosphor powder and filters are shipped to a distillation company, glass is put toward further use in industrial products, and aluminum caps are sent to an aluminum salvage partner.',
      ] },
      { title: 'Documentation', text: 'Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.' },
    ],
  },

  whyCards: {
    heading: 'Why Recycle Technologies for Light Bulb Recycling',
    items: [
      { icon: ICON.clock,    title: 'Over 30 Years of Experience', text: 'Recycle Technologies has operated since 1993.' },
      { icon: ICON.truck,    title: 'Commercial Pickup', text: 'Chicago businesses can arrange scheduled commercial pickup for their spent light bulbs and lighting materials.' },
      { icon: ICON.inhouse,  title: 'In-House Processing', text: 'Bulbs are processed directly at Recycle Technologies’ own facilities in Minnesota and Wisconsin rather than through an outside broker.' },
      { icon: ICON.minority, title: 'Minority-Owned', text: 'Recycle Technologies is the only minority-owned document destruction and recycling company in the Midwest region.' },
    ],
  },

  local: {
    heading: 'Local Chicago Recycling Information',
    body: [
      'Illinois state law generally restricts businesses from disposing of mercury-containing bulbs in regular trash.',
      'Chicago businesses should confirm the current local rules with the City of Chicago before disposing of light bulbs, as specific requirements can change.',
    ],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'What types of light bulbs does Recycle Technologies recycle?',
      a: 'Fluorescent tubes, plastic-coated and shielded tubes, CFLs, green-tipped bulbs, circular and U-shaped lamps, UV, neon, argon and other cold cathode lamps, HID lamps including metal halide and high-pressure sodium, flood lamps, incandescent bulbs and halogen bulbs.' },
    { q: 'Can my business schedule a pickup for light bulb recycling?',
      a: 'Yes. Businesses in the Chicago area are served through scheduled commercial pickup. Request a quote or call (800) 969-5166 to arrange one.' },
    { q: 'Do the bulbs get sent to a landfill?',
      a: 'No. Bulbs are processed at Recycle Technologies’ own Minnesota and Wisconsin facilities. Phosphor powder and filters go to a distillation company, glass is put toward industrial use, and aluminum end caps go to an aluminum salvage partner.' },
    { q: 'Will I receive documentation that my bulbs were recycled?',
      a: 'Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.' },
    { q: 'How far in advance do Chicago businesses need to schedule a pickup?',
      a: 'It depends on the size of the load and the current schedule for the Chicago area. Request a quote or call (800) 969-5166 and our team will confirm the earliest available pickup date.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Electronics Recycling', 'Television Recycling', 'Battery Recycling', 'Hard Drive Destruction', 'All Locations'),
  },

  cta: {
    heading: 'Get Started With Light Bulb Recycling in Chicago',
    body: ['Chicago businesses can request a quote or schedule a commercial pickup for spent light bulbs and other accepted lighting materials.'],
    primary: { label: 'Schedule a Light Bulbs Recycling Pickup in Chicago', href: QUOTE, phoneLabel: 'Schedule a Light Bulbs Recycling Pickup' },
    phone: { label: 'Call: 800-969-5166', tel: 'tel:+18009695166', phoneLabel: 'Phone: 800-969-5166' },
    footnote: 'Contact Recycle Technologies to confirm current pickup options for the Chicago area.',
  },

  /** Grey bands as the revised board draws them (27 Sep 2026). */
  bands: ['info', 'biz', 'steps', 'local', 'faq'],

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy; the lead time answer promises no figure. Confirm or replace.',
    '"Light Bulb Recycling Kits" link (Residents): points at /mail-in-recycling/, the closest page this site has; confirm.',
    'CTA button reads "Schedule a Light Bulbs Recycling Pickup in Chicago" (the frame’s plural); the hero button says "Light Bulb". Left as drawn.',
    'SEO title and description written for the build; the frames give none.',
  ],
}
