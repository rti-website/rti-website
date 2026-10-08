import { KIT_STORE } from '@/lib/nav'
import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'

/**
 * Drop-off Locations — /dropoff/ (2 Oct 2026).
 *
 * Figma BVtf2AOuUOcYbiMIlcKmbC: "Drop Off Locations — Desktop" 7206:3200 and
 * the phone frame 7210:6498. Copy: Asim's "Drop-off Locations Page Copy",
 * word for word except where noted. /dropoff/ is the old WordPress URL (a
 * KEEP row in data/url-map.csv); it 301'd to /all-locations/ from launch
 * until this page existed.
 *
 * Every string here is editable in Admin -> Pages -> Drop-off Locations
 * (registry key `dropoff`).
 */

export const SEO = {
  title: 'Dropoff - Recycle Technologies',
  description: 'Drop off your electronic devices and recyclable materials at our convenient DROP-OFF LOCATIONS. Join us in promoting a greener future across the USA!',
  focusKeyword: 'Drop-off locations for your electronic devices',
}

/** Hero — 7206:3202. The phone frame adds two full-width buttons under the lead. */
export const HERO = {
  crumbs: [{ label: 'Home', href: href('/') }, { label: 'Drop-off Locations', href: null }],
  h1: 'Drop-off Locations',
  lead: 'Residents and businesses can drop off electronics, batteries, light bulbs, and more at Recycle Technologies (RTI) locations across the country. Accepted items vary by location, so check the location details below or call before you visit. There is no drop-off site in Chicago, but we offer scheduled commercial pickup there.',
  findButton: 'Find a Location',
  pickupButton: { label: 'Schedule a Pickup', href: PICKUP_HREF },
}

/** Find a Drop-off Location — 7206:3216. */
export const FINDER = {
  eyebrow: 'Find a Location',
  heading: 'Find a Drop-off Location',
  lead: 'Enter your city or ZIP to find your nearest drop-off location.',
  placeholder: 'Enter your city or ZIP',
  find: 'Find a location',
  useMine: 'Use my location',
  mapNote: 'Illustrative map — search above for exact directions',
  labels: {
    distance: 'Distance',
    address: 'Address',
    hours: 'Hours',
    phone: 'Phone',
    accepts: 'Accepted items',
    directions: 'Get directions',
    view: 'View location',
  },
  /** "Nearest drop-off locations to {place}". */
  resultsHeading: 'Nearest drop-off locations to {place}',
  /** Further than this and the search says there is nothing near. */
  nearMiles: 150,
  noneNear: 'No drop-off location near you yet. Use our mail-in kit to recycle from anywhere in the US.',
  noneNearLink: { label: 'Order a recycling kit', href: 'https://ezontheearth.com/' },
  chicago: 'Business in the Chicago area?',
  chicagoLink: { label: 'Schedule a pickup', href: PICKUP_HREF },
  notFound: 'We could not find that place. Try a 5 digit ZIP code.',
  error: 'Something went wrong. Please try again.',
  locating: 'Finding your location…',
  denied: 'We could not get your location. Type your city or ZIP instead.',
}

export type DropoffLocation = {
  /** Card title, "Blaine, Minnesota". */
  name: string
  /** The pill under the header — the two RTI facilities only. */
  badge?: string
  /** 'r2' — the R2v3 mark in the header (RTI facilities); 'rti' — the logo plate (the others). */
  kind: 'r2' | 'rti'
  address: string
  /** 5 digit ZIP, for the distance (src/lib/zips.ts). */
  zip: string
  phone: string
  hours: string
  /** "Accepts" on the two facilities, "Accepted items" on the rest, as the copy has it. */
  acceptsLabel: string
  accepts: string
  /** The tinted note some cards carry ("Have Extra Quantity?", "Call for Appointment:"). */
  note?: { strong: string; text: string }
  body: string
  /** This site's page for the location; null shows Google Maps instead. */
  url: string | null
}

const ALL_ITEMS = 'All types of electronics, batteries, light bulbs, ballasts, paper shredding, hard drives, etc.'
const CONFIRM = 'You may also contact our operations or support teams to confirm the list of accepted items and the operational hours.'
const APPOINTMENT = { strong: 'Call for Appointment:', text: 'You may call our team before drop-off for an appointment.' }

/** Our Drop-off Locations — 7206:3245, the ten cards in the copy's order. */
export const LOCATIONS_SECTION = {
  eyebrow: 'Our Locations',
  heading: 'Our Drop-off Locations',
  lead: 'Our two primary facilities in Blaine, Minnesota, and New Berlin, Wisconsin, are R2v3-certified. We also operate eight more Recycle Technologies drop-off locations across the country. Hours and accepted items might differ by location, which you may confirm by contacting our operations team.',
  view: 'View Location',
  directions: 'Get Directions',
}

export const LOCATIONS: DropoffLocation[] = [
  {
    name: 'Blaine, Minnesota', badge: 'R2v3-certified facility', kind: 'r2',
    address: '1525 99th Ln NE, Blaine, MN 55449', zip: '55449', phone: '763-559-5130',
    hours: 'Monday to Friday, 7:30 AM to 4:00 PM',
    acceptsLabel: 'Accepts', accepts: 'Electronics, batteries, light bulbs, ballasts, paper shredding, and hard drives.',
    body: 'You can drop off accepted items during our regular working hours, Monday to Friday, 7:30 AM to 4:00 PM. The drop-off area is the rear loading area, reached from 99th Lane NE.',
    url: href('/minnesota-recycling/'),
  },
  {
    name: 'New Berlin, Wisconsin', badge: 'R2v3-certified facility', kind: 'r2',
    address: '2815 South 171st Street, New Berlin, WI 53151', zip: '53151', phone: '262-798-3040',
    hours: 'Monday to Friday, 7:30 AM to 4:00 PM',
    acceptsLabel: 'Accepts', accepts: 'Electronics, batteries, TVs, and paper shredding.',
    body: 'You can drop off accepted items during our regular working hours, Monday to Friday, 7:30 AM to 4:00 PM. The drop-off area is reached through the main lot on South 171st Street.',
    url: href('/wisconsin-recycling/'),
  },
  {
    name: 'Ontario, California', kind: 'rti',
    address: '805 East Francis Street, Ontario, CA 91761', zip: '91761', phone: '909-923-8241',
    hours: 'Monday to Thursday, 8:30 AM to 2:30 PM; Friday, 8:30 AM to 1:30 PM',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    body: `You can drop off accepted items during our regular working hours, Monday to Thursday, 8:30 AM to 2:30 PM; Friday, 8:30 AM to 1:30 PM. ${CONFIRM}`,
    // Its own page since 8 Oct 2026.
    url: href('/ontario-california/'),
  },
  {
    name: 'Phoenix, Arizona', kind: 'rti',
    address: '1545 East Victory Street, Phoenix, AZ 85040', zip: '85040', phone: '(480) 393-5729',
    hours: 'Monday to Friday, 7:30 AM to 2:00 PM',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    body: `You can drop off accepted items during our regular working hours, Monday to Friday, 7:30 AM to 2:00 PM. ${CONFIRM}`,
    url: href('/phoenix-arizona/'),
  },
  {
    name: 'Fort Worth, Texas', kind: 'rti',
    address: '101 East Bowie Street, Fort Worth, TX 76110', zip: '76110', phone: '817-921-1440',
    hours: 'Monday to Friday, 8:00 AM to 3:30 PM',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    note: { strong: 'Have Extra Quantity?', text: 'Call our operations team for more than 5 pallets.' },
    // !! The copy's hours line says 3:30 PM and this sentence 3:00 PM. Both
    // as written; flagged to Asim 2 Oct 2026 to confirm which is right.
    body: `You can drop off accepted items during our regular working hours, Monday to Friday, 8:00 AM to 3:00 PM. ${CONFIRM}`,
    url: href('/fort-worth-texas/'),
  },
  {
    name: 'Greenwood, Indiana', kind: 'rti',
    address: '498 Park 800 Drive, Greenwood, IN 46143', zip: '46143', phone: '(317) 888-3889',
    hours: 'Monday to Friday, 7:00 AM to 2:00 PM',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    body: `You can drop off accepted items during our regular working hours, Monday to Friday, 7:00 AM to 2:00 PM. ${CONFIRM}`,
    url: href('/greenwood-indiana/'),
  },
  {
    name: 'Ocala, Florida', kind: 'rti',
    address: '1007 SW 16th Lane, Ocala, FL 34471', zip: '34471', phone: '(813) 534-5735',
    hours: 'Monday to Friday, 6:00 AM to 2:30 PM',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    note: APPOINTMENT,
    body: `You can drop off accepted items during our regular working hours, Monday to Friday, 6:00 AM to 2:30 PM. ${CONFIRM}`,
    url: href('/ocala-florida/'),
  },
  {
    name: 'Kennesaw, Georgia', kind: 'rti',
    address: '3400 Town Point Dr NW, Suite 130, Kennesaw, GA 30144', zip: '30144', phone: '(770) 426-5000',
    hours: '9:00 AM to 4:00 PM',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    body: `You can drop off accepted items during our regular working hours, Monday to Friday, 9:00 AM to 4:00 PM. ${CONFIRM}`,
    url: href('/kennesaw-georgia/'),
  },
  {
    name: 'Johnson City, Tennessee', kind: 'rti',
    address: '2212 Buffalo Road, Suite 210, Johnson City, TN 37604', zip: '37604', phone: '(423) 328-7012',
    hours: 'Monday to Friday, 7:30 AM to 3:00 PM (closed 11:30 AM to 12:00 PM)',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    body: `You can drop off accepted items during our regular working hours, Monday to Friday, 7:30 AM to 3:00 PM (closed 11:30 AM to 12:00 PM). ${CONFIRM}`,
    url: href('/johnson-city-buffalo-tennessee/'),
  },
  {
    name: 'Lewisburg, Tennessee', kind: 'rti',
    address: '1580 Old Columbia Road, Lewisburg, TN 37091', zip: '37091', phone: '931-334-1265',
    // !! THE COPY HAS NO HOURS for Lewisburg ("[HOURS]"). Rather than print a
    // placeholder, the card says to call. Put the real hours here (and in the
    // sentence below) when the content writer has them.
    hours: 'Call for hours',
    acceptsLabel: 'Accepted items', accepts: ALL_ITEMS,
    note: APPOINTMENT,
    body: `Please call before you visit to confirm our working hours. ${CONFIRM}`,
    // /lewisburg-tennessee/ 301s to Mail-In; no page of its own yet.
    url: null,
  },
]

/** Chicago Commercial Pickup — 7206:3302. */
export const CHICAGO = {
  eyebrow: 'Service Area',
  heading: 'Chicago Commercial Pickup',
  body: 'Recycle Technologies serves businesses in the Chicago area through scheduled commercial pickup. Chicago does not have a Recycle Technologies drop-off facility.',
  button: { label: 'Schedule a Pickup', href: PICKUP_HREF },
}

/** What You Can Drop Off — 7206:3522. */
export const ITEMS = {
  eyebrow: 'Drop-off Items',
  heading: 'What You Can Drop Off',
  intro: 'Depending on the location, you can bring:',
  outro: 'Not every location accepts every item. Check the location details above or call to get help from our operations team.',
  listHeading: 'Accepted Items',
  list: ['Electronics', 'Batteries', 'Light bulbs', 'Ballasts', 'TVs', 'Paper for shredding', 'Hard drives'],
}

/** Fees — 7209:3316. The frame's "View price list" button waits for a price
 *  list page ("[Link to price list, once that page exists]"): set `button`
 *  to { label, href } and it appears. */
export const FEES = {
  heading: 'Fees',
  body: 'Fees depend on the item and the quantity. Call the location before you visit to ask about pricing.',
  button: null as { label: string; href: string } | null,
}

/** What Happens When You Arrive — 7206:3804. */
export const ARRIVE = {
  heading: 'What Happens When You Arrive',
  steps: [
    { title: 'Step 1', body: 'Pull around to the loading area.' },
    { title: 'Step 2', body: 'A team member will log your items.' },
    { title: 'Step 3', body: 'You will then receive a Certificate of Recycling or Shredding.' },
  ],
}

/** Recycling for Businesses — 7209:3323. */
export const BUSINESS = {
  heading: 'Recycling for Businesses',
  body: 'If you have larger volumes, schedule a pickup instead. We offer business pickup within about 100 miles of each of our facilities and across the Chicago area. Chicago has no drop-off facility, so Chicago-area businesses should use commercial pickup.',
  button: { label: 'Schedule a Pickup', href: PICKUP_HREF },
}

/** No Location Near You? — 7206:3544. The kit store, with the UTM tags the
 *  site's other "buy a kit" links carry (KIT_STORE in src/lib/nav.ts). */
export const NO_LOCATION = {
  heading: 'No Location Near You?',
  body: 'Our mail-in kit lets you recycle from anywhere in the US. Mail-in service reaches all 50 states. It is a good option if you do not live near one of our locations.',
  button: { label: 'Order a Recycling Kit', href: KIT_STORE },
}

/** Frequently Asked Questions — 7206:3753. The first one starts open. */
export const FAQ = {
  eyebrow: 'FAQs',
  heading: 'Frequently Asked Questions',
  items: [
    { q: 'Do I need an appointment?', a: 'No appointment is needed to drop off items at our Blaine and New Berlin facilities during regular working hours. Both locations accept all items listed on our website. For other RTI locations, please call ahead to confirm accepted items, drop-off availability, and any appointment requirements.' },
    { q: 'Is there a fee?', a: 'Fees depend on the item and the quantity. Call the location before you visit for pricing.' },
    { q: 'What payment do you accept?', a: 'We typically accept payments through Paypal, Wire Transfer, Bank Transfer, and Credit Cards. You may contact our support teams to confirm your desired payment method.' },
    { q: 'What happens to the data on my devices?', a: 'Recycle Technologies erases all the data through ADISA Level-5 certified data destruction methods, ensuring that your sensitive information and data no longer remain recoverable, so you have complete peace of mind.' },
    { q: 'Can I drop off for my business?', a: 'Yes, businesses can drop off at our locations. For larger volumes, use Schedule a Pickup. We pick up from businesses within about 100 miles of each facility and across the Chicago area.' },
    { q: 'What if there’s no location near me?', a: 'Use our mail-in kit to recycle from anywhere in the US. Chicago-area businesses can schedule a commercial pickup.' },
  ],
}

/** Schedule a Pickup CTA — 7206:3790. */
export const CTA = {
  heading: 'Schedule a Pickup, Get a Quote, or Contact Us',
  buttons: [
    { label: 'Schedule a Pickup', href: PICKUP_HREF },
    { label: 'Get a Quote', href: QUOTE_HREF },
    { label: 'Contact Us', href: href('/contact-us/') },
  ],
}
