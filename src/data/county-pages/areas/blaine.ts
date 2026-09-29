import { PICKUP_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Blaine Recycling, /minnesota-recycling/ramsey/blaine/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7060:4041, phone 7060:5211 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const BLAINE: CountyPage = {
  url: "/minnesota-recycling/ramsey/blaine/",
  state: "Minnesota",
  county: "Blaine",
  figma: { board: "7060:4041", phone: "7060:5211" },
  seo: {
    title: "Recycling Services in Blaine | (800) 969-5166",
    description: "Recycling Services in Blaine offering collection for electronic items, battery units, lighting remnants, paper materials, and managed processing support. Call (800) 969-5166",
  },
  hero: {
    h1: "Blaine Recycling",
    crumb: "Blaine Recycling",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
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
