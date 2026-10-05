import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * St Cloud Recycling Center, /minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7069:8951, phone 7069:10090 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const ST_CLOUD_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/",
  state: "Minnesota",
  county: "St. Cloud",
  figma: { board: "7069:8951", phone: "7069:10090" },
  seo: {
    title: 'St Cloud, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center St Cloud offering electronics intake, device clearing, lamp handling, battery acceptance, and secure shredding services. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in St Cloud, MN',
    crumb: "St Cloud Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "ST. Cloud Center Recycling",
    blocks: [
      { p: "Trash hoarding is something we are masters of. The amount of electronic waste in our homes is more than we can imagine. We assume that they don’t pose a risk to us. We are so wrong. In time, they start to decay. The toxic chemicals become a hazard for us. Throwing electronics in the trash might incur fines. Your best bet is to recycle them for proper disposal." },
      { p: "Residents of St Cloud can count on us to help them properly dispose of their unwanted items. The items that we accept at the recycling center are below. To confirm, you can get in touch at +1 763-559-5130." },
      { p: "The state takes serious action against companies and businesses if they do not follow disposal policies. To avoid getting fined, you can rely on Recycle Technologies Inc for proper disposal of your trash. We even provide pickup services exclusive to you. You can request a pickup using [this form](pickup). Recycle Technologies are certified Data Destructors. We adhere to DOD guidelines when disposing of sensitive data. To schedule us, you can call us @ +1 763-559-5130. Recycling is a future you have to come to terms with. It is the only way to reclaim spent resources and reduce greenhouse gases. They make a monumental difference in the long run." },
      { p: "Here are locations where our services are applicable:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Dakota County Top Sights", items: [
      "Munsinger Gardens",
      "Lake George",
      "St. Mary's Cathedral",
      "Watab Creek Park",
      "Wilson Park",
      "Lake George Park",
      "River Bluffs Regional Park",
      "St. Cloud Escape Rooms",
      "Veranda Lounge",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
