import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Minneapolis Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/minneapolis-recycling-center/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 21 Jun 2025 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const MINNEAPOLIS_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/minneapolis-recycling-center/",
  state: "Minnesota",
  county: "Minneapolis",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Minneapolis Recycling Center - Recycle Technologies",
    description: "EPA Certified Minneapolis Recycling Center, serving residents and businesses with eco-friendly solutions. Contact us for reliable recycling services in Minneapolis.",
  },
  hero: {
    h1: "Minneapolis Recycling Center",
    crumb: "Minneapolis Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Minneapolis Recycling Center",
    blocks: [
      { p: "Recycling is an important step forward. That is why, for residents of Minneapolis, we can help with your [recycling](/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/) needs. The best way to get rid of unwanted items is to use our drop-off facility at our [recycling center](/minnesota-recycling/hennepin-county-recycling-center/maple-grove-recycling-center/)s. Businesses, Government Agencies, and Companies can also avail of our services. To request a pickup, you can use this , or you can contact us at . Rest assured, we are the best data and device destructor all across the Midwest region. We are certified AAA NAID destructors. We help you recycle items before they become a nuisance to the environment. Recycle Technologies Inc. is an EPA Certified Recycling Service. Our State-of-the-art recycling center is more than capable of handling all kinds of waste. Not only that, our 100-mile coverage provides us with the opportunity to provide service in areas hard to get by. Recycling with us is not a blessing but peace of mind." },
      { h: "Here are some of the places we provide recycling services:" },
      { p: "Eagan, Apple Valley, Burnsville, Rosemount, South Saint Paul, Mendota, Mendota Heights, Vermilion, Sunfish Lake, Inner Grove Heights, Lilydale, Hampton, West Saint Paul, Randolph" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Minneapolis Top Sights", items: [
      "Minnehaha Falls",
      "Guthrie Theater",
      "Basilica of Saint Mary",
      "American Swedish Institute",
      "Minneapolis Institute of Art",
      "Minneapolis Sculpture Garden",
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
