import { PICKUP_HREF } from '@/lib/urls'
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
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/hennepin.png',
    imageTop: -372,
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
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
