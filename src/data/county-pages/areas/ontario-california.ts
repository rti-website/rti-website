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
    title: "Recycling in Ontario, California | Call (800) 969-5166",
    description: "Recycle lamps, ballasts, batteries and electronics at Recycle Technologies in Ontario, California. Drop off at 805 E Francis St or schedule a business pickup.",
  },
  hero: {
    h1: 'Recycling Services in Ontario, California',
    crumb: "Ontario",
    /* Home / Locations / California / Ontario (14 Oct 2026, the state hub brief). */
    parent: { label: "California", href: href('/california-recycling/') },
    lead: "California Bulb Processing Facility, 805 East Francis Street, Ontario, CA 91761",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  // 20 Oct 2026, the facility content doc (Aaqib): address, phone, hours, Getting Here, what it accepts, drop-off, FAQ and county.
  quickInfo: [
    { glyph: 'pin',   label: "Address", value: "805 East Francis Street, Ontario, CA 91761", href: "https://www.google.com/maps/dir/?api=1&destination=805+East+Francis+Street%2C+Ontario%2C+CA+91761" },
    { glyph: 'phone', label: "Phone", value: "(909) 923-7252", href: "tel:+19099237252" },
    { glyph: 'clock', label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
  ],
  directions: {
    heading: "Getting Here",
    intro: "Enter via the main lot on East Francis Street. Staff will direct you to the drop-off area upon arrival.",
    introShort: "Enter via the main lot on East Francis Street. Staff will direct you to the drop-off area upon arrival.",
    rows: [
      { label: "Nearest Highway", value: "State Route 60 (Pomona Freeway)" },
      { label: "Parking", value: "60 Fwy; on Francis St between Campus Ave and Bon View Ave, use the driveway" },
      { label: "Drop-off Entrance", value: "60 Fwy; on Francis St between Campus Ave and Bon View Ave, use the driveway" },
    ],
    primary: "Get Directions",
    secondary: "Call This Location",
    name: "California Bulb Processing Facility",
    address: "805 East Francis Street, Ontario, CA 91761",
    tel: "+19099237252",
    mapsHref: "https://www.google.com/maps/dir/?api=1&destination=805+East+Francis+Street%2C+Ontario%2C+CA+91761",
  },
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
    // 20 Oct 2026, the facility content doc.
    { kind: 'text', heading: "What This Location Accepts", blocks: [{ p: "Lamps, e-waste, aerosol cans, non-PCB capacitors, ballasts, batteries, mercury devices" }] },
    { kind: 'text', heading: "Dropping Off at This Location", blocks: [{ p: "60 Fwy; on Francis St between Campus Ave and Bon View Ave, use the driveway" }] },
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
    { kind: 'text', heading: "Other Recycle Technologies Locations", blocks: [
      { list: [
        { title: "Phoenix, Arizona", text: "Our nearest location to the east.", href: href('/phoenix-arizona/') },
        { title: "Fort Worth, Texas", text: "Serving businesses across North Texas.", href: href('/fort-worth-texas/') },
        { title: "All Locations", text: "See every Recycle Technologies facility and drop-off location.", href: href('/all-locations/') },
      ] },
    ] },
    // 20 Oct 2026, the facility content doc.
    { kind: 'faq', heading: "Questions About This Location", items: [
      { q: "Is there a fee for dropping off at this location?", a: "Fees depend on the material and the quantity. Call (909) 923-7252 with a description of what you plan to bring, and we will confirm any charges before you make the trip." },
      { q: "Do I need an appointment to drop off at the Ontario facility?", a: "Drop-off requirements vary by material and quantity. Call (909) 923-7252 before you visit to confirm what you are bringing is accepted and whether a time needs to be arranged. Large or commercial loads in particular go faster when the loading area is expecting you." },
      { q: "Can businesses schedule a bulk pickup from this facility?", a: "Yes. Business pickups are available within roughly a 100-mile radius of the facility. Pickup arrangements depend on the materials, quantity, location, and service required. Request a quote to get started." },
    ] },
    { kind: 'text', heading: "Counties We Serve", blocks: [{ list: [{ title: "San Bernardino County", text: "" }] }] },
  ],
  company: {
    name: "Recycle Technologies, Ontario",
    text: "805 E Francis St, Ontario, CA 91761. Full loading dock; no appointment needed for drop-offs.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 6:00 am – 2:30 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "(909) 923-7252", tel: "+19099237252" },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
  schema: {
    name: "Recycle Technologies, Ontario",
    street: "805 E Francis St",
    locality: "Ontario",
    region: "CA",
    postalCode: "91761",
    telephone: "+1-909-923-7252",
    email: "dispatch@recycletechnologies.com",
    geo: { lat: 34.041215, lng: -117.638732 },
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "14:30" },
    ],
  },
}
