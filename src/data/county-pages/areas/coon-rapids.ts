import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Coon Rapids Recycling, /minnesota-recycling/coon-rapids/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7071:10183, phone 7071:11278 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const COON_RAPIDS: CountyPage = {
  url: "/minnesota-recycling/coon-rapids/",
  state: "Minnesota",
  county: "Coon Rapids",
  figma: { board: "7071:10183", phone: "7071:11278" },
  seo: {
    title: 'Coon Rapids, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling in Coon Rapids covering electronic equipment, spent batteries, lighting waste, paper materials, and secure drop-off options. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Coon Rapids, MN',
    crumb: "Coon Rapids Recycling",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Coon Rapids Center Recycling",
    blocks: [
      { p: "Coon Rapids falls under our coverage for recycling services. Coon Rapids is a northern suburb of Minneapolis and is by far the largest city in Anoka County, Minnesota. Our State-of-the-art Recycling Center in Blaine is the best place to recycle. Please check the below items that we accept in our recycling center. Residents of Coon Rapids can recycle with us using our drop-off facility, or they can opt for our mail-in program. Disposing of items is good for both the environment and you. For a Free quote, you can contact us. Companies and Businesses who would like to recycle responsibly can request pick-up using [this form](pickup) here." },
      { p: "Recycle Technologies Inc. has been serving the residents of both Wisconsin and Minnesota for more than 30 years. We provide an alternate way of disposing of items. We are EPA Certified Recyclers. The best way to reduce the after-effects of global warming is to recycle. This will help reduce our greenhouse gases and reclaim virgin resources." },
      { p: "Here is a list of places we provide services:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
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
