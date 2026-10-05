import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Burnsville Recycling Center, /minnesota-recycling/dakota-county/burnsville-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7072:8134, phone 7072:9262 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const BURNSVILLE_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/dakota-county/burnsville-recycling-center/",
  state: "Minnesota",
  county: "Burnsville",
  figma: { board: "7072:8134", phone: "7072:9262" },
  seo: {
    title: 'Burnsville, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center in Burnsville accepting electronic equipment, spent power cells, lighting waste, paper materials, and managed material intake. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Burnsville, MN',
    crumb: "Burnsville Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Burnsville Center Recycling",
    blocks: [
      { p: "Burnsville is a city in Dakota County. This city falls directly under our coverage for recycling services. This city is famous for 3300 acres of parks and wildfire refuge lands. Residents of Burnsville can use us for their recycling needs. Our state-of-the-art recycling center can cater to you in every way possible." },
      { p: "Please check below on which items we accept at the recycling center. Minnesota requires proper disposal of waste. Not properly disposing of it may lead to dire consequences for the environment. Electronics and Appliances are known to leak toxic chemicals if not disposed of properly. We can help you recycle responsibly." },
      { p: "Recycle Technologies Inc is an EPA Certified Recycler in the Midwest. We also provide guaranteed destruction of data. Our recycling centers are AAA NAID certified. All Government Agencies, Businesses, and Companies can use us for Recycling and Shredding needs. Here is a list of places we provide services:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Dakota County Top Sights", items: [
      "Lebanon Hills Regional Park",
      "Fort Snelling State Park",
      "Buck Hill",
      "Alimagnet Dog Park",
      "Burnsville Convention & Visitors Bureau",
      "Nicollet Commons Park",
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
