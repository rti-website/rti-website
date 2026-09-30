import { href, PICKUP_HREF } from '@/lib/urls'

/**
 * /electronic-recycling-chicago/ — "Electronics Recycling in Chicago, Illinois" (H1 until 27 Sep 2026: "Recycling in Chicago, Illinois"), Figma
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
 * yellow notice and "Chicago Is a Service Area, Not a Facility"), and the build follows it: no
 * LocalBusiness schema, no address, no map. The schema is a Service with
 * Chicago as its area, a BreadcrumbList and the FAQPage.
 *
 * Copy is the frames' word for word, except:
 *   - the FAQ ANSWERS. The frames draw the five questions closed, with no
 *     answers. Each restates this page's own copy. See `todo`.
 *
 * REVISED 27 SEP 2026 to the designer's new frames: residents are now served
 * by the mail-in program (new Residents section), drop-off is gone, eight
 * accepted categories, five steps, six "why" cards with titles, and a new
 * CTA.
 *   - the SEO title and description, which the frames do not give. See `seo`.
 */

export const URL = '/electronic-recycling-chicago/'

export const SEO = {
  title: 'Electronics Recycling in Chicago, Illinois | Recycle Technologies',
  description: 'Commercial electronics and e-waste recycling for Chicago businesses, with pickup, drop-off, ITAD and hard drive destruction through our certified process.',
}

/*
 * HERO, REVISED 27 SEP 2026. The designer updated 6873:14198: the H1 now
 * reads "Electronics Recycling in Chicago, Illinois" (Asim: the page is
 * electronics, not all recycling), the photo is an electronics warehouse with
 * the skyline behind (new file, hero-electronics.png, so the old one is
 * untouched), and a button sits under the H1. The frame's label reads
 * "Schedule a Electronics Recycling Pickup"; built with "an". The breadcrumb
 * still reads "Recycling in Chicago, Illinois" in the frame and is left so.
 * The phone frame (6896:15331) now draws its own button (6955:11443): 36
 * tall, 14px, no arrow, its own label (`phoneLabel`).
 */
export const HERO = {
  h1: 'Electronics Recycling in Chicago, Illinois',
  crumbs: [
    { label: 'Home', href: href('/') },
    { label: 'Locations', href: href('/all-locations/') },
    { label: 'Recycling in Chicago, Illinois', href: null },
  ],
  // 28 Sep 2026: the electronics shot the Blaine and New Berlin electronics
  // pages use too (6873:14201), drawn without the grey veil — see ChicagoPage.
  image: '/images/locations/city-pages/electronics-hero.png',
  button: { label: 'Schedule a Pickup', href: PICKUP_HREF },
}

/** Section - Service Area Notice — 6879:2744 / 6897:2768. Revised 27 Sep
 *  2026: three paragraphs with a blank line between them. */
export const NOTICE = [
  'Recycle Technologies provides electronics recycling services to businesses and residents in the Chicago area.',
  'Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, while residents and small-volume customers can use the mail-in program for eligible electronics.',
  'If you need to recycle computers, TVs, monitors, cables, switches, adapters, or other electronics in Chicago, this page explains what is available, what is accepted, and how to get started.',
]

/** Section - Intro — 6879:2745 / 6897:2769. The eyebrow pill shows on the
 *  board only (the phone frame drops it). */
export const INTRO = {
  eyebrow: 'Chicago, Illinois',
  heading: 'Electronics Recycling Services in Chicago',
  body: [
    'Recycle Technologies is a Midwest-based recycling and shredding company that has operated licensed, R2v3-certified facilities in Minnesota and Wisconsin for more than 3 decades.',
    'In Chicago, the company serves customers through expanded operations rather than a licensed recycling facility located in the city itself.',
  ],
  aside: {
    heading: 'Chicago Is a Service Area, Not a Facility',
    body: [
      'Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.',
      'Chicago businesses can arrange scheduled commercial pickup for computers, monitors, televisions, networking equipment, cables, adapters, and other electronics.',
      'Residents and small-volume customers can use the mail-in program for eligible electronics that can be safely shipped to Recycle Technologies for processing.',
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
  businesses: 'Scheduled commercial pickup',
  residents: 'Mail-in program',
  facility: 'Processing takes place at Recycle Technologies facilities outside Chicago',
  /** The row labels, in the frame's order. The phone frame reads "Business";
   *  the board's "Businesses" is used for both. */
  labels: {
    location: 'Location',
    phone: 'Phone',
    area: 'Service Area',
    businesses: 'Businesses',
    residents: 'Residents and small quantities',
    facility: 'Facility',
  },
}

const I = '/images/locations/chicago'

/** Section - What We Accept — 6879:2747 / 6897:2771. Eight cards (3 + 3 + 2
 *  on the board); the batteries banner is gone. Glyphs are the board's: the
 *  phone frame draws a battery glyph on the last two cards. */
export const ACCEPT = {
  eyebrow: 'What We Accept',
  heading: 'A Broad Range of Electronics & IT Equipment',
  lead: 'Recycle Technologies accepts a broad range of electronics and e-waste, including:',
  items: [
    { icon: `${I}/accept-computers.svg`, title: 'Computers & IT Equipment', text: 'Desktop computers, servers, and related IT hardware.' },
    { icon: `${I}/accept-laptops.svg`,   title: 'Laptops', text: 'Laptops from office use.' },
    { icon: `${I}/accept-monitors.svg`,  title: 'Monitors & Displays', text: 'Computer monitors, LCD displays, and other electronic display equipment.' },
    { icon: `${I}/accept-tv.svg`,        title: 'Televisions', text: 'CRT, LCD, LED, plasma, and other television types.' },
    { icon: `${I}/accept-office.svg`,    title: 'Networking Equipment', text: 'Switches, routers, access points, modems, and other networking hardware.' },
    { icon: `${I}/accept-small.svg`,     title: 'Cables, Adapters, and Accessories', text: 'Power cables, data cables, chargers, adapters, keyboards, mice, and other electronic accessories.' },
    { icon: `${I}/accept-tv.svg`,        title: 'Phones and Telecommunications Equipment', text: 'Cell phones, business phones, telecommunications equipment, and related electronics.' },
    { icon: `${I}/accept-office.svg`,    title: 'Office Electronics', text: 'Small electronic devices, electronic components, and other miscellaneous e-waste.' },
  ],
  note: 'If you are unsure whether a specific item qualifies, describe your equipment when requesting service so Recycle Technologies can confirm whether it can be accepted.',
}

/** Section - For Chicago Businesses — 6879:2748 / 6897:2772. */
export const BUSINESSES = {
  heading: 'For Chicago Businesses',
  eyebrow: 'Businesses',
  title: 'Electronics Recycling for Chicago Businesses',
  intro: 'Businesses in the Chicago area can arrange electronics recycling for retired office equipment, IT equipment, facility electronics, and larger volumes of e-waste.',
  includes: 'This includes:',
  points: [
    'Computers, laptops, servers, and monitors',
    'Televisions and displays',
    'Switches, routers, access points, cables, and adapters',
    'Phones and telecommunications equipment',
    'Printers, copiers, scanners, and other office electronics',
    'Larger volumes of mixed electronic equipment',
    'Hard drives and storage devices requiring secure destruction',
  ],
  outro: [
    'Illinois law generally requires businesses to recycle covered electronics rather than dispose of them with regular waste, making a documented recycling partner relevant for both compliance and sustainability.',
    'To arrange service, businesses can request a quote or schedule a commercial pickup.',
  ],
}

/** Section - Residents — 6925:6405 / 6925:6409 (new 27 Sep 2026). The body
 *  runs before + link + after, so the admin can edit the link's words and
 *  address; the link opens in a new tab. */
export const RESIDENTS = {
  heading: 'Electronics Recycling for Chicago Residents',
  body: {
    before: 'Recycle Technologies does not offer residential pickup or a local drop-off facility in Chicago. Chicago residents and small-volume customers can use the mail-in program for eligible electronics: order an appropriate ',
    linkText: 'recycling kit',
    href: 'https://ezontheearth.com/collections/electronic-waste',
    after: ', pack the materials according to the instructions provided, and ship them to Recycle Technologies for processing.',
  },
}

/** Section - How It Works — 6879:2749 / 6897:2773. Five steps since 27 Sep. */
export const STEPS = {
  heading: 'How Electronics Recycling Works',
  items: [
    { title: 'Commercial Pickup or Mail-In', text: 'Businesses can schedule commercial pickup for larger quantities of electronics. Residents and small-volume customers can use the mail-in program for eligible materials.' },
    { title: 'Sorting and Processing', text: 'Collected electronics are sorted and broken down into base materials, including plastic, wire, circuit boards, metals, and glass.' },
    { title: 'Data Destruction and Material Recovery', text: 'Hard drives and other storage devices requiring secure destruction can be processed through the applicable hard drive destruction service. Other electronics are dismantled and separated so recoverable materials can be recycled and reused.' },
    { title: 'Recycling and Material Recovery', text: 'Plastics, metals, glass, circuit boards, wire, and other recoverable materials are separated and processed for recycling rather than sent to a landfill.' },
    { title: 'Documentation', text: 'Recycle Technologies provides recycling documentation as part of its certified process, supporting customers who need records for compliance or internal reporting.' },
  ],
}

/** Section - Why Recycle Technologies — 6879:2750 / 6897:2774. Six cards,
 *  each a title over a line of text. Two icons differ between the frames
 *  (the phone draws a plain shield and a truck), so those two carry a
 *  `phoneIcon`. In-House Processing uses the Minority-Owned glyph, as drawn. */
export const WHY = {
  heading: 'Why Recycle Technologies for Electronics Recycling',
  items: [
    { icon: `${I}/why-years.svg`,     title: 'Over 30 Years of Experience', text: 'Recycle Technologies has operated since 1993.' },
    { icon: `${I}/why-certified.svg`, phoneIcon: `${I}/why-certified-phone.svg`, title: 'Certified Standards', text: 'The company holds R2v3 and RIOS certifications for applicable recycling and data destruction processes.' },
    { icon: `${I}/why-pickup.svg`,    phoneIcon: `${I}/why-pickup-phone.svg`, title: 'Commercial Pickup and Mail-In Recycling', text: 'Businesses can schedule commercial pickup, while residents and small-volume customers can use the mail-in program for eligible electronics.' },
    { icon: `${I}/why-security.svg`,  title: 'Hard Drive Destruction', text: 'Hard drive destruction is available for electronics containing sensitive data that require secure destruction before recycling.' },
    { icon: `${I}/why-minority.svg`,  title: 'In-House Processing', text: 'Collected electronics are processed through Recycle Technologies’ own facilities rather than being sent through an outside broker.' },
    { icon: `${I}/why-minority.svg`,  title: 'Minority-Owned', text: 'Recycle Technologies is the only minority-owned document destruction and recycling company in the Midwest region.' },
  ] as { icon: string; phoneIcon?: string; title: string; text: string }[],
  /** The white box under the cards: a heading since 27 Sep, then two lines. */
  law: {
    icon: `${I}/why-law.svg`,
    heading: 'Local Chicago Recycling Information',
    text: [
      'Illinois state law generally requires businesses to recycle covered electronics rather than place them in regular trash.',
      'Chicago businesses and residents should confirm current local requirements with the City of Chicago before disposing of electronics, as specific requirements can change.',
    ],
  },
}

/** Section - FAQ — 6879:2751 / 6897:2775: the pill and heading over the questions. */
export const FAQ_HEAD = { eyebrow: 'FAQs', heading: 'Frequently Asked Questions' }

/** Section - FAQ — 6879:2751 / 6897:2775. Questions from the frames (five
 *  since 27 Sep). The frames draw them closed, with no answers: the answers
 *  below restate this page's own copy and add nothing to it. See `todo`. */
export const FAQS = [
  {
    q: 'What electronics can I recycle?',
    a: 'Recycle Technologies accepts a broad range of electronics and e-waste, including computers and IT equipment, laptops, monitors and displays, televisions, networking equipment, cables, adapters and accessories, phones and telecommunications equipment, and office electronics. If you are unsure whether a specific item qualifies, describe your equipment when requesting service so Recycle Technologies can confirm whether it can be accepted.',
  },
  {
    q: 'Can I recycle electronics that still work?',
    a: 'Yes. We accept working, unwanted, and outdated electronics for responsible recycling.',
  },
  {
    q: 'Does Recycle Technologies have an electronics drop-off facility in Chicago?',
    a: 'No. Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, while residents and small-volume customers can use the mail-in program for eligible electronics.',
  },
  {
    q: 'Can hard drives be securely destroyed?',
    a: 'Yes. Hard drive destruction is available for electronics containing sensitive data that require secure destruction before recycling. Hard drives and other storage devices are processed through the applicable hard drive destruction service.',
  },
  {
    q: 'Do I get documentation after my electronics are recycled?',
    a: 'Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting customers who need records for compliance or internal reporting.',
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

/** Section - CTA — 6879:2752 / 6896:15629. Revised 27 Sep 2026: two
 *  paragraphs, a white "Schedule …" button (a shorter label on the phone)
 *  that opens the contact form with Electronics Recycling and "Chicago, IL"
 *  filled in, and a bordered "Call: …" button. */
export const CTA = {
  heading: 'Get Started With Electronics Recycling in Chicago',
  body: [
    'Recycle Technologies serves Chicago businesses through scheduled commercial pickup and offers a mail-in option for residents and small-volume customers with eligible electronics.',
    'Tell us what electronics you have and where they are located. Businesses can request a quote or schedule a pickup, while residents can check the mail-in program for eligible items.',
  ],
  primary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
  phone: { label: 'Call: 800-969-5166', tel: 'tel:+18009695166' },
  note: 'Contact Recycle Technologies to confirm current service options and eligibility for your electronics.',
}

export const todo = [
  'FAQ answers: the frames give the five questions but no answers. Each answer restates this page’s own copy (no new facts or figures); the working-electronics answer is the one published before. Confirm or replace all five.',
  'SEO title and description: written for the build (the frames give none). The description still says "pickup, drop-off, ITAD", but the page now says there is no drop-off in Chicago. SEO team to confirm a new description (CLAUDE.md rule 6: not changed here).',
  'Second phone number (800) 305-3040: from the frame; confirm it is a live line for Chicago.',
  'The Chicago card on the locations pages (src/data/facilities.ts) carries a "Drop-off Location" badge; the page now says there is no drop-off in Chicago.',
  'Phone frame differences, board used: What We Accept draws a battery glyph on "Phones and Telecommunications Equipment" and "Office Electronics", and gives Office Electronics other text ("Printers, copiers, scanners, fax machines, and other electronic office equipment."); Service Info labels the row "Business".',
  'Phone hero button: the frame draws teal text on a teal fill (invisible); built with white text.',
]
