import { href, quoteHref } from '@/lib/urls'

/**
 * /electronic-recycling-chicago/ — "Recycling in Chicago, Illinois", Figma
 * 6873:14196 (board) and 6896:15317 (phone) in BVtf2AOuUOcYbiMIlcKmbC. Built
 * 25 Sep 2026 (Asim: "make this chicago page exact content and design, when
 * someone clicks on the chicago card it lands on this").
 *
 * THE URL IS THE OLD WORDPRESS CHICAGO PAGE. /electronic-recycling-chicago/
 * used to 301 to /electronic-recycle/; Asim chose (25 Sep 2026) to put the new
 * page back at that address so it inherits whatever ranking the old one had.
 * data/url-map.csv now KEEPs it.
 *
 * CHICAGO IS A SERVICE AREA, NOT A FACILITY. The page says so itself (the
 * yellow notice and "That Distinction Matters"), and the build follows it: no
 * LocalBusiness schema, no address, no map. The schema is a Service with
 * Chicago as its area, a BreadcrumbList and the FAQPage.
 *
 * Copy is the frames' word for word, except:
 *   - the FAQ ANSWERS. The frames draw the four questions closed, with no
 *     answers. Three answers are taken from copy this site already publishes
 *     (the homepage FAQ, and the page's own step 4); the fourth (pickup lead
 *     time) promises no figure. See `todo`.
 *   - the SEO title and description, which the frames do not give. See `seo`.
 */

export const URL = '/electronic-recycling-chicago/'

export const SEO = {
  title: 'Electronics Recycling in Chicago, Illinois | Recycle Technologies',
  description: 'Commercial electronics and e-waste recycling for Chicago businesses, with pickup, drop-off, ITAD and hard drive destruction through our certified process.',
}

export const HERO = {
  h1: 'Recycling in Chicago, Illinois',
  crumbs: [
    { label: 'Home', href: href('/') },
    { label: 'Locations', href: href('/all-locations/') },
    { label: 'Recycling in Chicago, Illinois', href: null },
  ],
  image: '/images/locations/chicago/hero.png',
}

/** Section - Service Area Notice — 6879:2744 / 6897:2768. */
export const NOTICE = [
  'Recycle Technologies provides commercial electronics and e-waste recycling services to businesses in the Chicago area. Recycle Technologies does not operate a licensed recycling facility in Chicago. Chicago is served as part of the company’s expanded service area, with materials handled through the company’s certified processes.',
  'If your business needs to recycle computers, TVs, or a batch of retired office equipment in Chicago, this page explains what is available, what is accepted, and how to get started.',
]

/** Section - Intro — 6879:2745 / 6897:2769. */
export const INTRO = {
  eyebrow: 'Chicago, Illinois',
  heading: 'Electronics Recycling Services in Chicago',
  body: [
    'Recycle Technologies is a Midwest-based recycling and shredding company that has operated licensed, R2v3-certified facilities in Minnesota and Wisconsin for 3 decades.',
    'In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.',
  ],
  aside: {
    heading: 'That Distinction Matters',
    body: [
      'Chicago is a service area, not a facility. Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.',
      'Businesses in Chicago can use Recycle Technologies’ services through commercial pickup or drop-off at this location.',
      'Businesses can arrange service for office electronics, IT equipment, and larger recycling needs.',
    ],
  },
}

/** Section - Service Info — 6879:2746 / 6897:2770. */
export const PHONES = [
  { label: '(800) 969-5166', tel: 'tel:+18009695166' },
  { label: '(800) 305-3040', tel: 'tel:+18003053040' },
]
export const SERVICE_INFO = {
  heading: 'Chicago Location and Service Information',
  location: 'Chicago, Illinois',
  area: 'Chicago and surrounding areas',
}

const I = '/images/locations/chicago'

/** Section - What We Accept — 6879:2747 / 6897:2771. */
export const ACCEPT = {
  eyebrow: 'What We Accept',
  heading: 'A Broad Range of Electronics & IT Equipment',
  lead: 'Recycle Technologies accepts a broad range of electronics and IT equipment, including:',
  items: [
    { icon: `${I}/accept-computers.svg`, title: 'Computers & IT Equipment', text: 'Desktop computers, servers, and related IT hardware.' },
    { icon: `${I}/accept-laptops.svg`,   title: 'Laptops', text: 'Laptops from office use.' },
    { icon: `${I}/accept-monitors.svg`,  title: 'Monitors & Displays', text: 'Computer monitors of all types.' },
    { icon: `${I}/accept-tv.svg`,        title: 'Televisions', text: 'Televisions, with no restrictions on type or condition.' },
    { icon: `${I}/accept-office.svg`,    title: 'Office & Networking Equipment', text: 'Printers, copiers, scanners, and fax machines.' },
    { icon: `${I}/accept-small.svg`,     title: 'Small Electronics', text: 'Keyboards, mice, cables, switches, and cell phones.' },
  ],
  /** Drawn as a full width banner under the grid on the board, a seventh card on the phone. */
  batteries: { icon: `${I}/accept-batteries.svg`, title: 'Batteries', text: 'Collected and processed through our battery recycling program.' },
  note: 'Do we accept all the above categories at this location? Acceptance can vary by drop-off point — contact us to confirm before bringing in a specific item.',
}

/** Section - Residents and Businesses — 6879:2748 / 6897:2772 ("For Chicago Businesses"). */
export const BUSINESSES = {
  heading: 'For Chicago Businesses',
  eyebrow: 'Businesses',
  title: 'Electronics Recycling for Chicago Businesses',
  intro: 'Businesses in the Chicago area can arrange electronics recycling for office equipment, IT assets, and larger volumes of e-waste. This includes:',
  points: [
    'Retired computers, servers, and monitors',
    'Networking and office equipment such as printers and copiers',
    'IT asset disposition (ITAD) for equipment refreshes and decommissioning',
    'Data security needs, including hard drive destruction',
  ],
  outro: [
    'Illinois law requires businesses to recycle electronics rather than dispose of them with regular waste, making a documented recycling partner relevant for both compliance and sustainability.',
    'To arrange service, businesses can request a quote or schedule a commercial pickup.',
  ],
}

/** Section - How It Works — 6879:2749 / 6897:2773. The phone frame spells
 *  step 3 "Recycling and Material Recovery"; the board's "&" is used for both. */
export const STEPS = {
  heading: 'How Electronics Recycling Works',
  items: [
    { title: 'Collection or Drop-Off', text: 'Items are collected either through commercial pickup or dropped off at this Chicago-area location.' },
    { title: 'Sorting and Processing', text: 'Collected electronics are broken down into base materials, including plastic, wire, circuit boards, metals, and glass, so each component can be recycled properly.' },
    { title: 'Recycling & Material Recovery', text: 'Plastic and wire are shredded and sent to molders and smelters. Monitors are decontaminated and recycled. Circuit boards are sorted so their materials can be recovered.' },
    { title: 'Documentation', text: 'Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.' },
  ],
}

/** Section - Why Recycle Technologies — 6879:2750 / 6897:2774. Two icons
 *  differ between the frames (the phone draws a plain shield and a truck),
 *  so those two carry a `phoneIcon`. */
export const WHY = {
  heading: 'Why Recycle Technologies for Electronics Recycling',
  items: [
    { icon: `${I}/why-years.svg`,     text: 'Over 30 years of experience. Recycle Technologies has operated since 1993.' },
    { icon: `${I}/why-certified.svg`, phoneIcon: `${I}/why-certified-phone.svg`, text: 'Certified standards. The company holds R2v3 and RIOS certification for data destruction and recycling.' },
    { icon: `${I}/why-pickup.svg`,    phoneIcon: `${I}/why-pickup-phone.svg`, text: 'Commercial pickup and drop-off. Chicago businesses can use pickup or drop-off at this location.' },
    { icon: `${I}/why-security.svg`,  text: 'Data security. Hard drive destruction is available for businesses that need to protect sensitive information before disposing of equipment.' },
    { icon: `${I}/why-minority.svg`,  text: 'Minority-owned. Recycle Technologies is the only minority-owned document destruction and recycling company in the Midwest region.' },
  ] as { icon: string; phoneIcon?: string; text: string }[],
  law: { icon: `${I}/why-law.svg`, text: 'Illinois state law generally requires that businesses recycle electronics rather than place them in regular trash. Chicago businesses should confirm the current local rules with the City of Chicago before disposing of electronics, as specific requirements can change.' },
}

/** Section - FAQ — 6879:2751 / 6897:2775. Questions from the frames; see
 *  the head note for where the answers come from. */
export const FAQS = [
  {
    q: 'Can I recycle electronics that still work?',
    a: 'Yes. We accept working, unwanted, and outdated electronics for responsible recycling.',
  },
  {
    q: 'Will my data be securely destroyed if I recycle a computer or hard drive?',
    a: 'Data can remain on devices unless it is securely erased or destroyed. We offer secure hard drive destruction to help protect sensitive information.',
  },
  {
    q: 'Do I get documentation showing my Chicago recycling was handled responsibly?',
    a: 'Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.',
  },
  {
    q: 'How far in advance do Chicago businesses need to schedule a pickup?',
    a: 'It depends on the size of the load and the current schedule for the Chicago area. Call (800) 969-5166 or request a quote, and our team will confirm the earliest available pickup date.',
  },
]

/** Section - Related Recycling Services — 6883:5521 / 6897:2776. */
export const RELATED = {
  heading: 'Related Recycling Services',
  links: [
    { label: 'Electronics Recycling',  href: href('/electronic-recycle/') },
    { label: 'Television Recycling',   href: href('/tv-recycling/') },
    { label: 'Battery Recycling',      href: href('/battery-recycling/') },
    { label: 'Light Bulb Recycling',   href: href('/light-bulbs/') },
    { label: 'Hard Drive Destruction', href: href('/hard-drive-destruction-services/') },
    { label: 'All Locations',          href: href('/all-locations/') },
  ],
}

/** Section - CTA — 6879:2752 / 6896:15629. Both buttons open the contact form
 *  with Electronics Recycling and "Chicago, IL" already filled in, as the
 *  state landing pages do. */
const QUOTE = quoteHref({ service: 'Electronics Recycling', location: 'Chicago, IL' })
export const CTA = {
  heading: 'Get Started With Electronics Recycling in Chicago',
  body: 'For businesses: request a quote or schedule a commercial pickup, or drop off items at this location.',
  primary: { label: 'Get a Quote', href: QUOTE },
  secondary: { label: 'Schedule a Pickup', href: QUOTE },
  phone: { label: 'Phone: 800-969-5166', tel: 'tel:+18009695166' },
  note: 'Contact Recycle Technologies to confirm current options for the Chicago area.',
}

export const todo = [
  'FAQ answers: the frames have none. Three reuse published copy; the pickup lead time answer gives no figure. Confirm or replace all four.',
  'SEO title and description: written for the build (the frames give none). SEO team to confirm.',
  'Second phone number (800) 305-3040: from the frame; confirm it is a live line for Chicago.',
  '"Drop-off at this location": the page offers drop-off in Chicago while also saying there is no facility there. Confirm where Chicago drop-off happens, or reword.',
]
