import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * New Berlin Recycling Center, /wisconsin-recycling/new-berlin-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7058:3972, phone 7059:4033 (Asim,
 * 30 Sep 2026: "make this page"). The URL had 301'd to /wisconsin-recycling/
 * since launch; it is a page again (data/url-map.csv).
 *
 * The frame's copy word for word; "our online form" and "this form" link to
 * the quote form. The hero photo is the one the Hennepin board uses (same
 * file, 7058:3977). Title: the WordPress one (management, 1 Oct 2026).
 *
 * 5 Oct 2026, frame 7233:8238 (Asim: "we add some new thing so add it in
 * the page"): a photo of its own (7233:8243, under a 20% black veil and a
 * navy wash from the left), a new lead, a second button, "Wisconsin" in the
 * breadcrumb, the quick-info bar (7233:9339) and the map row "Drop off here"
 * (7233:9372). Not taken from the frame, on purpose:
 *   - Hours: the frame's "Mon–Fri, confirmed hours" is a placeholder; the
 *     page's own contact card says 7:30 am to 4:00 pm, so the bar does too.
 *   - The map row's copy is the Blaine template's (99th Lane NE, I-35W); it
 *     carries the Wisconsin facility's real directions instead.
 *   - About still says "State Contracted", without "EPA Certified" (1 Oct).
 *   - The CTA banner keeps the 2 Oct wording ("Ready to Recycle? …").
 */
export const NEW_BERLIN_RECYCLING_CENTER: CountyPage = {
  url: "/wisconsin-recycling/new-berlin-recycling-center/",
  state: "Wisconsin",
  county: "New Berlin",
  figma: { board: "7058:3972", phone: "7059:4033" },
  // 1 Oct 2026 (management): the WordPress title back, and no "EPA certified".
  // The WordPress description did not survive in any export we have (the URL
  // 301'd at launch), so this one follows the other county pages' WordPress
  // descriptions until the original turns up.
  seo: {
    title: "Recycling Center in New Berlin | Call (800) 969-5166",
    description: "Recycling center in New Berlin receiving electronics, batteries, lamps, paper, and secure material processing for businesses and facilities. Call (800) 969-5166.",
  },
  hero: {
    h1: "New Berlin Recycling Center",
    crumb: "New Berlin Recycling Center",
    parent: { label: "Wisconsin", href: href('/wisconsin-recycling/') },
    lead: "Drop off electronics and batteries, or schedule a business pickup across southeast Wisconsin",
    image: '/images/locations/county/new-berlin.png',
    imageTop: -372,
    overlay: 'linear-gradient(90deg, rgba(5,29,59,0.35) 0%, rgba(5,29,59,0.24) 60%, rgba(5,29,59,0) 100%), linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))',
    // No phone frame: a navy veil so the two-line lead reads on the busy photo.
    phoneOverlay: 'rgba(11,31,58,0.45)',
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  quickInfo: [
    { glyph: 'pin',   label: "Address",      value: "2815 S 171st St, New Berlin, WI 53151", href: "https://www.google.com/maps/dir/?api=1&destination=2815+S+171st+St%2C+New+Berlin%2C+WI+53151" },
    { glyph: 'phone', label: "Phone",        value: "262-798-3040", href: "tel:+12627983040" },
    { glyph: 'clock', label: "Hours",        value: "Mon–Fri 7:30 AM–4:00 PM" },
    { glyph: 'badge', label: "Getting Here", value: "Main lot off S 171st St, near I-43" },
  ],
  directions: {
    heading: "Drop off here",
    intro: "Enter via the main lot on South 171st Street. Staff will direct you to the drop-off bay upon arrival.",
    introShort: "Enter via the main lot on South 171st Street. Staff will direct you to the drop-off bay upon arrival.",
    rows: [
      { label: "Nearest Highway",   value: "I-43 & College Ave" },
      { label: "Parking",           value: "Free on-site parking" },
      { label: "Drop-off Entrance", value: "Rear loading area" },
    ],
    primary: "Get Directions",
    secondary: "Call This Location",
    name: "New Berlin Recycling Center",
    address: "2815 South 171st Street, New Berlin, WI 53151",
    tel: "+12627983040",
    mapsHref: "https://www.google.com/maps/dir/?api=1&destination=2815+South+171st+Street%2C+New+Berlin%2C+WI+53151",
  },
  about: {
    heading: "About New Berlin Recycling Center",
    blocks: [
      { h: "Convenience at the expense of the planet is not convenient at all" },
      { p: "Welcome to the New Berlin Recycling Center, where we redefine convenience by putting the planet first. As a State Contracted facility, we uphold the highest standards of environmental responsibility. With AAA NAID certification for data destruction and certifications from R2 and RiOS, we ensure your recyclables are handled with utmost care and security." },
      { h: "A Legacy of Responsible Recycling" },
      { p: "For over 30 years, Recycle Technologies has been a leader in responsible recycling, setting an example in the industry. We strictly adhere to all EPA policies, fostering a safe and responsible work culture. Our commitment to the Circular Economy not only reduces your carbon footprint but also minimizes the need for virgin resources. Join us in the revolution for sustainable growth and make a tangible impact on the environment." },
      { h: "Convenient Access to Recycling Services" },
      { p: "Our New Berlin Recycling Center is conveniently open five days a week, ready to serve your recycling needs. Contact us at +1 262-798-3040 or fill out [our online form](quote) for a free quote. Recycling is more than just a task; it’s a commitment to preserving our ecosystem and conserving natural resources." },
      { p: "Be a part of the change. Embrace sustainable living with the New Berlin Recycling Center today." },
      { p: "Our New Berlin Recycling center is open five days a week. You can easily reach us at +1 262-798-3040 or fill up [this form](quote) for a free quote. Recycling helps the ecosystem and conserves natural resources." },
      { p: "We can guarantee that no waste will ever reach a landfill or be exported to another country. Responsible recycling is the way forward. Corporate and business clients can use our pickup facility for their recycling needs. We use load bars and straps to secure all waste from county to county." },
    ],
  },
  servicesHeading: "Service Options",
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "New Berlin County Top Sights", items: [
      "Milwaukee County Zoo",
      "Boerner Botanical Gardens",
      "The Big Backyard",
      "Milwaukee Art Museum",
      "Minooka Park",
      "Harley-Davidson Museum",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
