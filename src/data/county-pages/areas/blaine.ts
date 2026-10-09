import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { R2_DIRECTORY } from '@/data/certifications'
import type { CountyPage } from '../types'

/**
 * Blaine Recycling, /minnesota-recycling/ramsey/blaine/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7060:4041, phone 7060:5211 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 *
 * 5 Oct 2026 (Asim, with a wireframe of the new copy, built like the New
 * Berlin center page): "Minnesota" in the breadcrumb, a new lead, two hero
 * buttons (pickup, quote; directions removed the same day), the Minnesota facility photo (the
 * Blaine building), the quick-info bar, the "Two buildings" note and the map
 * row "Drop off here". The H1 stays. The wireframe's hours ("Mon to Fri,
 * confirmed hours") are a placeholder; the bar carries the drop-off page's
 * 7:30 to 4:00.
 */
export const BLAINE: CountyPage = {
  url: "/minnesota-recycling/ramsey/blaine/",
  state: "Minnesota",
  county: "Blaine",
  figma: { board: "7060:4041", phone: "7060:5211" },
  seo: {
    title: 'Blaine Recycling Center: Hours, Drop-Off & Pickup',
    description: "Recycling Services in Blaine offering collection for electronic items, battery units, lighting remnants, paper materials, and managed processing support. Call (800) 969-5166",
  },
  hero: {
    h1: 'Recycle Technologies Blaine, MN',
    crumb: "Blaine Recycling",
    parent: { label: "Minnesota", href: href('/minnesota-recycling/') },
    lead: "Drop off electronics, batteries and lamps, or schedule a business pickup across the Twin Cities",
    image: '/images/pages/hero-minnesota.png',
    imageTop: -372,
    overlay: 'linear-gradient(90deg, rgba(5,29,59,0.35) 0%, rgba(5,29,59,0.24) 60%, rgba(5,29,59,0) 100%), linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))',
    phoneOverlay: 'rgba(11,31,58,0.45)',
    // Two buttons, as on New Berlin (Asim, 5 Oct 2026: "remove the get directions").
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  quickInfo: [
    { glyph: 'pin',   label: "Address",       value: "1525 99th Ln NE, Blaine, MN 55449", href: "https://www.google.com/maps/dir/?api=1&destination=1525+99th+Ln+NE%2C+Blaine%2C+MN+55449" },
    { glyph: 'phone', label: "Phone",         value: "763-559-5130", href: "tel:+17635595130" },
    { glyph: 'clock', label: "Hours",         value: "Mon–Fri 7:30 AM–4:00 PM" },
    { glyph: 'badge', label: "Certification", value: "R2v3 Certified", href: R2_DIRECTORY },
  ],
  notice: {
    title: "Two buildings: use the right one",
    lines: [
      { icon: 'electronics', text: "Electronics, batteries and most items: 1525 99th Lane NE, dock on the north end" },
      { icon: 'bulbs',       text: "Lamps: 10040 Davenport St NE, dock on the west side" },
    ],
  },
  // 9 Oct 2026, SEO sheet "Technical Fixes": the Minnesota page's "Getting Here"
  // section moved here (its heading, intro and rows, src/data/facilities.ts),
  // and taken off /minnesota-recycling/. The accepted items line stays as the note.
  directions: {
    heading: "Getting Here",
    intro: "Enter via the parking lot on 99th Lane NE. Signage directs drop-off traffic to the rear loading area — a team member will meet you to log your materials.",
    introShort: "Enter via the parking lot on 99th Lane NE. Signage directs drop-off traffic to the rear loading area.",
    note: "Accepted here: electronics, batteries, light bulbs, ballasts, paper shredding, hard drives",
    rows: [
      { label: "Nearest Highway",   value: "I-35W & 99th Ave NE" },
      { label: "Parking",           value: "Free on-site parking" },
      { label: "Drop-off Entrance", value: "Rear loading area" },
    ],
    primary: "Get Directions",
    secondary: "Call This Location",
    name: "Blaine Recycling",
    address: "1525 99th Ln NE, Blaine, MN 55449",
    tel: "+17635595130",
    mapsHref: "https://www.google.com/maps/dir/?api=1&destination=1525+99th+Ln+NE%2C+Blaine%2C+MN+55449",
  },
  about: {
    heading: "About Blaine Center Recycling",
    blocks: [
      { p: "Recycle Technologies Inc. helps you recycle your end-of-life waste for a better tomorrow. We have a state-of-the-art recycling center in Blaine, Minnesota. You can trust us for your recycling needs. We focus on safe waste disposal and secure data destruction. You can come to our recycling center for proper disposal or rely on our mail-in program. We have a 100-mile coverage area. This allows us to serve places with no recycling options. For more than 30 years, we have been providing a better alternative for the disposal of items. We guarantee that no waste goes to a landfill. Our goals and vision align with what the circular economy offers. You can do your part by using us for your recycling needs. Together we can help reduce our carbon footprint and reliance on natural resources." },
      { p: "Recycle Technologies is an EPA Certified State Contracted recycler. We are solid and hazardous waste transporters. We are certified by both RIOS and R2. RT has a trust rating of A by BBB. We offer waste pickup for corporate and business clients. We’d love to give you a quote and could make sure you are getting the best value possible. Call us at +1 763-559-5130 or fill out [this form](quote) so we can talk further." },
      { p: "Here are some of the locations we provide commercial services:" },
    ],
  },
  servicesHeading: "Service Options",
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'text', heading: "Recycling Locations in Blaine", blocks: [
      { list: [
        { title: "EAST BETHEL RECYCLING", text: "Recycle technologies is the one-stop solution to your recycling needs.", href: href("/minnesota-recycling/east-bethel/") },
        { title: "RAMSEY RECYCLING", text: "Recycle technologies is the one-stop solution to your recycling needs.", href: href("/minnesota-recycling/ramsey/") },
        { title: "COON RAPIDS RECYCLING", text: "Recycle technologies is the one-stop solution to your recycling needs.", href: href("/minnesota-recycling/coon-rapids/") },
        { title: "ANOKA COUNTY RECYCLING", text: "Recycle technologies is the one-stop solution to your recycling needs.", href: href("/minnesota-recycling/anoka-county-recycling/") },
      ] },
    ] },
    { kind: 'sights', heading: "Blaine Top Sights", items: [
      "Northtown Mall",
      "Golden Lake Park",
      "Rice Creek Chain of Lakes Park Reserve",
      "North Oaks Golf Club",
      "Crooked Lake",
      "Peltier Lake",
    ] },
    // 9 Oct 2026, SEO sheet "Technical Fixes": an FAQ, the same questions the
    // New Berlin facility page (/wisconsin-recycling/) answers, for Blaine.
    { kind: 'faq', heading: "Frequently Asked Questions", items: [
      { q: "Do I need an appointment to drop off at the Blaine facility?", a: "Drop-off requirements vary by material and quantity. Call +1-763-559-5130 before you visit to confirm what you are bringing is accepted and whether a time needs to be arranged — large or commercial loads in particular go faster when the loading area is expecting you." },
      { q: "Is there a fee for dropping off at this location?", a: "Fees depend on the material and the quantity. Call +1-763-559-5130 with a description of what you plan to bring and we will confirm any charges before you make the trip." },
      { q: "Can businesses schedule a bulk pickup from this facility?", a: "Yes. Business pickups are available within roughly a 100-mile radius of the facility. Pickup arrangements depend on the materials, quantity, location and service required — request a quote to get started." },
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing certified recycling services to individuals and businesses.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
