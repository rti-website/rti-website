import { quoteHref } from '@/lib/urls'
import { FAQ_HEAD, CHICAGO_PHONES, HOME_CRUMB, ICON, LOCATIONS_CRUMB, related, type CityPage } from './types'

/**
 * /battery-recycling-chicago/ — "Battery Recycling in Chicago, Illinois",
 * Figma 6908:15983 (board) / 6911:16530 (phone). A service area page: no
 * facility, no address, no map (see types.ts).
 */
const QUOTE = quoteHref({ service: 'Battery Recycling', location: 'Chicago, IL' })
const H1 = 'Battery Recycling in Chicago, Illinois'

export const CHICAGO_BATTERY: CityPage = {
  url: '/battery-recycling-chicago/',
  figma: { board: '6908:15983', phone: '6911:16530' },
  seo: {
    title: 'Battery Recycling in Chicago, Illinois | Recycle Technologies',
    description: 'Commercial battery recycling for Chicago businesses by scheduled pickup, with a mail-in program for residents. Processed at our R2v3 certified Midwest facilities since 1993.',
  },
  schema: { service: 'Battery Recycling in Chicago', areaServed: ['Chicago, IL'] },

  hero: {
    h1: H1,
    crumbs: [HOME_CRUMB, LOCATIONS_CRUMB, { label: H1, href: null }],
    image: '/images/locations/city-pages/chicago-battery/hero.png',
    button: { label: 'Schedule a Battery Recycling Pickup', href: QUOTE },
  },

  opening: [
    'Recycle Technologies provides battery recycling services to businesses in the Chicago area.',
    'Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup. Residents and small-volume customers can recycle batteries through the mail-in program, which ships to the company’s certified facilities.',
  ],

  intro: {
    heading: 'Battery Recycling Services in Chicago',
    body: [
      'Recycle Technologies is a Midwest-based recycling and shredding company that has handled battery recycling from its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.',
      'In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.',
    ],
    aside: {
      heading: 'Chicago Is a Service Area, Not a Facility',
      body: [
        'Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.',
        'Businesses in Chicago can use Recycle Technologies’ services through commercial pickup or drop-off at this location. Businesses can arrange service for spent battery inventory and larger recycling needs.',
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
      { label: 'Residents and small quantities', value: 'Mail-in program' },
      { label: 'Nearest facility', value: 'New Berlin, Wisconsin' },
    ],
  },

  accept: {
    heading: 'What We Accept',
    lead: 'Recycle Technologies accepts a broad range of battery types, including:',
    layout: 'cards',
    items: [
      { icon: ICON.battery, title: 'Alkaline & Zinc Batteries', text: 'Standard alkaline and zinc batteries.' },
      { icon: ICON.bolt,    title: 'Lithium-Ion & Lead-Acid Batteries', text: 'Rechargeable lithium-ion packs and sealed lead-acid batteries.' },
      { icon: ICON.nicd,    title: 'Nickel-Cadmium & Button Cell Batteries', text: 'NiCd batteries and small button-cell batteries.' },
      { icon: ICON.ev,      title: 'EV, Power Tool & Backup Batteries', text: 'Electric vehicle batteries, Tesla batteries, power tool packs, and battery backup units.' },
    ],
    note: 'Recycle Technologies also handles other battery types, including mercury oxide batteries, on a case-by-case basis. If your batteries aren’t listed here, reach out and describe what you need to recycle.',
  },

  businesses: {
    heading: 'Battery Recycling for Chicago Businesses',
    intro: 'Businesses in the Chicago area can arrange battery recycling for retired IT equipment, facilities, and fleet operations. This includes:',
    points: [
      'Spent alkaline, lithium-ion, and lead-acid batteries from office and IT equipment',
      'Power tool, backup, and EV battery packs',
      'Larger volumes of accumulated battery inventory',
    ],
    outro: [
      'Illinois law restricts businesses from disposing of certain battery types with regular trash, making a documented recycling partner relevant for both compliance and sustainability.',
      'To arrange service, businesses can request a quote or schedule a commercial pickup.',
    ],
  },

  residents: {
    heading: 'Battery Recycling for Chicago Residents',
    body: ['Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents can use the mail-in program by ordering a prepaid battery recycling kit, taping the battery terminals, and shipping the batteries to Recycle Technologies for certified processing.'],
  },

  steps: {
    heading: 'How Battery Recycling Works',
    arrows: true,
    items: [
      { title: 'Collection or Drop-Off', text: 'Items are collected either through commercial pickup or dropped off at this Chicago-area location.' },
      { title: 'Sorting and Processing', text: 'Once batteries are received, trained staff sort and separate them by type before processing at Recycle Technologies’ Minnesota and Wisconsin facilities. Battery terminals should be covered before shipping or storage to reduce the risk of fire.' },
      { title: 'Recycling and Material Recovery', text: 'Sorting batteries by type allows each battery chemistry to be processed according to its specific handling requirements, reducing waste sent to landfills and keeping hazardous elements out of the environment.' },
      { title: 'Documentation', text: 'Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.' },
    ],
  },

  whyCards: {
    heading: 'Why Recycle Technologies for Battery Recycling',
    items: [
      { icon: ICON.clock,    title: 'Over 30 Years of Experience', text: 'Recycle Technologies has operated since 1993.' },
      { icon: ICON.truck,    title: 'Commercial Pickup and Drop-Off', text: 'Chicago businesses can use pickup or drop-off at this location.' },
      { icon: ICON.inhouse,  title: 'In-House Processing', text: 'Batteries are sorted and processed directly at Recycle Technologies’ own Minnesota and Wisconsin facilities rather than through an outside broker.' },
      { icon: ICON.minority, title: 'Minority-Owned', text: 'Recycle Technologies is the only minority-owned document destruction and recycling company in the Midwest region.' },
    ],
  },

  local: {
    heading: 'Local Chicago Recycling Information',
    body: ['Illinois state law generally restricts businesses from disposing of certain battery types in regular trash. Chicago businesses should confirm the current local rules with the City of Chicago before disposing of batteries, as specific requirements can change.'],
  },

  faqHead: { ...FAQ_HEAD },
  faqs: [
    { q: 'What battery types does Recycle Technologies recycle?',
      a: 'Alkaline and zinc batteries, lithium-ion and sealed lead-acid batteries, nickel-cadmium and button cell batteries, and EV, power tool and backup batteries. Other types, including mercury oxide batteries, are handled on a case-by-case basis.' },
    { q: 'Can my business schedule a pickup for battery recycling?',
      a: 'Yes. Businesses in the Chicago area are served through scheduled commercial pickup. Request a quote or call (800) 969-5166 to arrange one.' },
    { q: 'Do the batteries get sent to a landfill?',
      a: 'No. Batteries are sorted by chemistry and processed at Recycle Technologies’ own R2v3-certified Minnesota and Wisconsin facilities, so each type is handled to its specific requirements and hazardous elements stay out of the environment.' },
    { q: 'Will I receive documentation that my batteries were recycled?',
      a: 'Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.' },
    { q: 'How far in advance do Chicago businesses need to schedule a pickup?',
      a: 'Most Chicago pickups are scheduled within a few business days. Tell us what you have and where it is, and our team will confirm the earliest available date.' },
  ],

  related: {
    heading: 'Related Recycling Services',
    links: related('Electronics Recycling', 'Television Recycling', 'Light Bulb Recycling', 'Ballast Recycling', 'Hard Drive Destruction', 'All Locations'),
  },

  cta: {
    heading: 'Schedule Battery Recycling for Your Chicago Business',
    body: [
      'Recycle Technologies picks up spent batteries from offices, warehouses, data centers, and fleet operations across the Chicago area, then processes them at its own R2v3 certified facilities and provides documentation for your records.',
      'Tell us what you have and where it is. Most Chicago pickups are scheduled within a few business days.',
    ],
    primary: { label: 'Schedule a Battery Recycling Pickup in Chicago, Illinois', href: QUOTE, phoneLabel: 'Schedule a Battery Recycling Pickup' },
    phone: { label: 'Call: 800-969-5166', tel: 'tel:+18009695166', phoneLabel: 'Phone: 800-969-5166' },
    headingWidth: 598,
    footnote: 'Recycle Technologies has served businesses across the Midwest since 1993.',
  },

  /** Grey bands as the revised board draws them (27 Sep 2026). */
  bands: ['info', 'res', 'whycards', 'related'],

  todo: [
    'FAQ answers: the frame draws the five questions closed. Answers are built from this page’s own copy; confirm or replace.',
    'Phone row: the frame prints "(800) 969-5166 | 800-969-5166" (the same number twice). Built with the two numbers the other Chicago pages use; confirm.',
    '"Drop-off at this location" (aside, step 1, Why card): the page also says there is no facility or drop-off point in Chicago. Confirm the wording.',
    'SEO title and description written for the build; the frames give none.',
  ],
}
