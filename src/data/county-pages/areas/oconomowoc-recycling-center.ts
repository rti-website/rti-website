import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Oconomowoc Recycling Center, /wisconsin-recycling/oconomowoc-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7064:4524, phone 7064:5657 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const OCONOMOWOC_RECYCLING_CENTER: CountyPage = {
  url: "/wisconsin-recycling/oconomowoc-recycling-center/",
  state: "Wisconsin",
  county: "Oconomowoc",
  figma: { board: "7064:4524", phone: "7064:5657" },
  seo: {
    title: 'Oconomowoc, WI Recycling: Electronics, Batteries & Bulbs',
    description: "Get Peace of mind by recycling with us. Please review all items we accept and do not accept in our recycling center. For Free Quote, Contact Us.",
  },
  hero: {
    h1: 'Electronics Recycling in Oconomowoc, WI',
    crumb: "Oconomowoc Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Oconomowoc Recycling in Madison, WI",
    blocks: [
      { p: "Oconomowoc falls under our coverage for recycling services. Our State-of-the-art recycling center in New Berlin is fully capable. Please be sure to check which items we accept at our recycling center. Call us at +1 262-798-3040 to get a free quote. For businesses and companies in Oconomowoc, we offer pickup services. You can use [this form](quote)." },
      { p: "Recycle Technologies Inc. is a name you can trust when it comes to recycling. We are an EPA-certified State Contracted Recyclers. We believe that recycling is an important step forward as it reduces carbon emissions and helps reclaim precious materials." },
      { p: "You can get in touch with us at +1 262-798-3040." },
      { h: "Mail in Program" },
      { p: "We offer a nationwide Universal Waste Mail-In Program, making it easy to recycle your light bulbs with us from anywhere in the country." },
      { p: "1. Purchase your Mail-In Boxes by calling +1 763-559-5130 or going to Mail-in Program" },
      { p: "2. Fill boxes with spent bulbs" },
      { p: "3. Ship back to us with FedEx and the prepaid shipping label we included in your Mail-In box!" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Oconcmowoc County Top Sights", items: [
      "Fowler Lake Park",
      "Veterans Memorial Park",
      "Nature Hill Nature Center",
      "Oconomowoc Historical Museum",
      "Imagination Station",
      "Bender Beach",
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
