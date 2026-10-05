import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Lakeville Recycling Center, /minnesota-recycling/dakota-county/lakeville-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:76654, phone 7084:77188 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const LAKEVILLE_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/dakota-county/lakeville-recycling-center/",
  state: "Minnesota",
  county: "Lakeville",
  figma: { board: "7084:76654", phone: "7084:77188" },
  seo: {
    title: 'Lakeville, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center in Lakeville supporting collection of electronic hardware, spent batteries, lighting materials, paper output, and controlled processing. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Lakeville, MN',
    crumb: "Lakeville Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Lakeville Center Recycling",
    blocks: [
      { p: "Recycling helps protect the environment. That is why we provide recycling services in Lakeville. This location is part of many places that fall under our coverage area. The only thing you need to do is to put your unwanted items in packaging that is safe for transport. And drop it at the nearest FedEx for delivery. Recycle Technologies will provide shipping tags after filling out [this form](mailin). Please check which items we accept at our recycling center by scrolling below." },
      { p: "We also provide recycling services to businesses, government agencies, and companies. Our state-of- the-art recycling center is more than capable of handling your workload. You can use us for safe and secure data destruction. Recycle Technologies Inc. is an AAA NAID destructor in the Midwest. We perform guaranteed destruction on all items you prefer. We issue a certificate of recycling//destruction when the process is completed. Contact us at +1-763-559-5130 or via [this form](quote)." },
      { p: "Recycle Technologies Inc. is an EPA-certified Recycling specialist. For more than 30 years, we have dispensed unwanted items and reduced greenhouse gases. We believe that recycling is the only way forward. It helps us reclaim spent resources instead of mining for new ones. It provides a better sustainable outcome than the one we have Here are places where we offer recycling services:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Lakeville Top Sights", items: [
      "Lebanon Hills Regional Park",
      "Buck Hill",
      "Murphy-Hanrehan Park Reserve",
      "Whitetail Woods Regional Park",
      "Alimagnet Dog Park",
      "Lake Marion",
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
