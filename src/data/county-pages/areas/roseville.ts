import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Roseville Recycling Center, /minnesota-recycling/ramsey/roseville/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333. The old WordPress page's copy word for word
 * (15 Sep 2026 backup), except the Top Sights heading's "Rosevilla". Its
 * "recycling center" link went to an old URL that 301s to /minnesota-recycling/,
 * so it is plain text.
 */
export const ROSEVILLE: CountyPage = {
  url: "/minnesota-recycling/ramsey/roseville/",
  state: "Minnesota",
  county: "Roseville",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Recycling Center in Roseville | (800) 969-5166',
    description: "Recycling center in Roseville receiving electronics, batteries, lighting waste, and paper materials for controlled processing. Call (800) 969-5166",
  },
  hero: {
    h1: 'Roseville Recycling Center',
    crumb: "Roseville Recycling Center",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Roseville Recycling Center",
    blocks: [
      { p: "A normal person cannot fathom how much trash is in his house. We desire things that enrich our lives. But the real danger starts when their usefulness ends. Disposing of trash in the curbside bin is a good idea. Unless you like paying fines. To avoid this, your best bet is to dispose of it responsibly." },
      { p: "Recycle Technologies is here to aid you in doing that. The items we accept at our recycling center are below." },
      { p: "Commercial businesses and government agencies can also use our service to recycle responsibly. Exclusive to them, we provide pickup services as well. To schedule one right now, fill out [this form](pickup). Recycle Technologies is an EPA and NAID-certified recycler. The certification enables us to offer data destruction services with DOD guidelines in place. Get in touch with Recycle Technologies for disposing of items safely and securely." },
      { p: "Companies and Businesses can also rely on our services to avoid any undue punishments from the state. You can use [this form](pickup) to request a pickup. We are solid and hazardous waste transporters. We are certified by both EPA and NAID." },
      { p: "This enables us to provide data destruction and proper disposal services to you. For a free quote on what the cost may be, use [this form](quote). Trust is what makes relationships work. For 30 years, our trust speaks volumes. So why the wait? Get in touch at these numbers or via email. Let’s make an impact together." },
      { h: "Here are the locations where Recycle Technologies Inc. is making an impact:" },
      { p: "Saint Paul, New Brighton, North Oaks, Maplewood, Arden Hills, Gem Lake, Falcon Heights, Vadnais Heights, Shoreview, Mounds View" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Roseville Top Sights", items: [
      "Harriet Alexander Nature Center",
      "SeaQuest Roseville",
      "Lake Josephine County Park",
      "Muriel Sahlin Arboretum at Roseville Central Park",
      "Como Park",
      "Langton Lake Park",
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
