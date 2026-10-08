import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Ontario, California, /ontario-california/
 * Built 8 Oct 2026 on the county template (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333) from the replacement content Asim sent ("only
 * take the necessary content like the other pages"). The URL had 301'd to
 * /mail-in-recycling/ since launch.
 *
 * Kept: hero, the location details as the quick-info bar, Three ways to
 * recycle, the four service sections, Why choose (as feature cards), the
 * FAQ, the links to nearby locations and a contact card. The template's own
 * Service Options cards and CTA banner stand in for the doc's closing CTA.
 *
 * TO CONFIRM WITH CHRISTINE (as the content doc says): the public phone
 * (909-923-8241, the CSR line; the old page had 909-816-2502), that the
 * receiving hours are the drop-off hours and that weekends are closed, and the
 * Southern California pickup area. No shredding, hard drive or airbag
 * services, and no EPA, R2v3, RIOS or NAID claims, until confirmed for Ontario.
 * Geo: US Census geocoder for 805 E Francis St.
 */
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=805+E+Francis+St%2C+Ontario%2C+CA+91761"

export const ONTARIO_CALIFORNIA: CountyPage = {
  url: "/ontario-california/",
  state: "California",
  county: "Ontario",
  service: "Light Bulb, Battery and Electronics Recycling",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Ontario, CA Recycling Center: Lamps, Batteries & E-Waste',
    description: "Recycle lamps, ballasts, batteries and electronics at Recycle Technologies in Ontario, California. Drop off at 805 E Francis St or schedule a business pickup.",
  },
  hero: {
    h1: 'Recycling Services in Ontario, California',
    crumb: "Ontario, California",
    lead: "Responsible recycling for lamps, ballasts, batteries and electronics, for businesses and residents across the Inland Empire and Southern California.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  quickInfo: [
    { glyph: 'pin',   label: "Address",  value: "805 E Francis St, Ontario, CA 91761", href: MAPS },
    { glyph: 'phone', label: "Phone",    value: "909-923-8241", href: "tel:+19099238241" },
    { glyph: 'clock', label: "Drop-off", value: "Mon–Thu 8:30 AM–2:30 PM, Fri 8:30 AM–1:30 PM" },
    { glyph: 'badge', label: "Facility", value: "Full loading dock, no appointment needed" },
  ],
  about: {
    heading: "Three Ways to Recycle With Us",
    blocks: [
      { list: [
        { title: "Business pickup", text: "We collect from offices, warehouses, stores and facilities in the Ontario area. [Schedule a pickup](pickup) or [ask for a quote](quote)." },
        { title: "Drop-off", text: "Bring your materials to our Ontario facility at 805 E Francis St during drop-off hours. No appointment needed." },
        { title: "Mail-in kits", text: "Outside our area? [Order a prepaid recycling kit](mailin) and ship your bulbs, batteries or small electronics to us." },
      ] },
    ],
  },
  sections: [
    { kind: 'text', heading: "Light Bulb and Lamp Recycling in Ontario, California", blocks: [
      { p: "Fluorescent tubes, CFLs and other mercury lamps cannot go in the trash in California. We recycle fluorescent, CFL, HID, UV, neon, halogen, incandescent and LED lamps, separating the glass, metal and mercury so each can be handled correctly. We take everything from a single box of tubes to a full relamping project, and give you a certificate of recycling for your records." },
      { h2: "Ballast Recycling" },
      { p: "Older light fixtures often contain ballasts with PCB or DEHP capacitors, which are regulated hazardous waste. We accept PCB and non-PCB ballasts, separate them, and send each type through the correct disposal stream with full documentation, so your retrofit or demolition project stays compliant." },
      { h2: "Battery Recycling in Ontario, California" },
      { p: "We accept alkaline, lithium ion, lithium metal, nickel cadmium, nickel metal hydride and lead acid batteries. Tape the terminals of lithium and rechargeable batteries before transport. Businesses can set up regular collection so spent batteries never build up on site." },
      { h2: "Electronics and TV Recycling" },
      { p: "From computers, laptops and monitors to phones, printers, servers and office equipment, we take apart electronics and recover plastic, metal, wire, circuit boards and glass for reuse. We also recycle TVs, including older CRT sets that contain lead and must be kept out of landfills." },
    ] },
    { kind: 'text', heading: "Why Businesses in Ontario Choose Recycle Technologies", blocks: [] },
    { kind: 'features', cards: [
      { title: "Recycling Since 1993", text: "More than 30 years of handling regulated materials." },
      { title: "A Local Facility", text: "A full loading dock in Ontario, and no appointment needed for drop-offs." },
      { title: "Documentation for Every Load", text: "Certificates of recycling for your compliance records." },
      { title: "Custom Programs", text: "Single cleanouts, scheduled pickups or ongoing collection across multiple sites." },
      { title: "A National Network", text: "Part of a national network of recycling facilities, so multi-location businesses can work with one provider." },
    ] },
    { kind: 'faq', heading: "Frequently Asked Questions", items: [
      { q: "Do I need an appointment to drop off?", a: "No. Bring your materials to 805 E Francis St during drop-off hours." },
      { q: "Can I throw fluorescent tubes in the trash in California?", a: "No. Fluorescent tubes, CFLs and other mercury lamps are universal waste in California and must be recycled." },
      { q: "Do you pick up from businesses?", a: "Yes. We offer scheduled and one time pickups for businesses in the Ontario area. Schedule a pickup or request a quote." },
      { q: "What if I am not near Ontario?", a: "Order a mail-in recycling kit and ship your bulbs, batteries or small electronics to us." },
      { q: "Will I get proof of recycling?", a: "Yes. Business customers receive a certificate of recycling for each load." },
    ] },
    { kind: 'text', heading: "Other Recycle Technologies Locations", blocks: [
      { list: [
        { title: "Phoenix, Arizona", text: "Our nearest location to the east.", href: href('/phoenix-arizona/') },
        { title: "Fort Worth, Texas", text: "Serving businesses across North Texas.", href: href('/fort-worth-texas/') },
        { title: "All Locations", text: "See every Recycle Technologies facility and drop-off location.", href: href('/all-locations/') },
      ] },
    ] },
  ],
  company: {
    name: "Recycle Technologies, Ontario",
    text: "805 E Francis St, Ontario, CA 91761. Full loading dock; no appointment needed for drop-offs.",
    lines: [
      { kind: 'hours', text: "Monday – Thursday: 8:30 am – 2:30 pm" },
      { kind: 'hours', text: "Friday: 8:30 am – 1:30 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "909-923-8241", tel: "+19099238241" },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
  schema: {
    name: "Recycle Technologies, Ontario",
    street: "805 E Francis St",
    locality: "Ontario",
    region: "CA",
    postalCode: "91761",
    telephone: "+1-909-923-8241",
    email: "dispatch@recycletechnologies.com",
    geo: { lat: 34.041215, lng: -117.638732 },
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:30", closes: "14:30" },
      { days: ["Friday"], opens: "08:30", closes: "13:30" },
    ],
  },
}
