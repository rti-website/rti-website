import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Minnetonka Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/minnetonka-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7070:7735, phone 7070:8865 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const MINNETONKA_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/minnetonka-recycling-center/",
  state: "Minnesota",
  county: "Minnetonka",
  figma: { board: "7070:7735", phone: "7070:8865" },
  seo: {
    title: "Recycling Center in Minnetonka | Call (800) 969-5166",
    description: "Recycling center Minnetonka receiving phones, routers, circuit boards, ink cartridges, and small devices, accepted through controlled intake and processing. Call (800) 969-5166.",
  },
  hero: {
    h1: "Minnetonka Recycling Center",
    crumb: "Minnetonka Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Minnetonka Center Recycling",
    blocks: [
      { p: "Minnetonka is home to Lake Minnetonka. It is one of the largest bodies of water in Hennepin County. It falls under our coverage area for recycling services." },
      { p: "Commercial, Industrial, and Government Entities can also rely on services. We provide data destruction and recycling services. You can use [this form](pickup) to request a pickup. We are AAA NAID and EPA certified. We adhere to strict guidelines set by the DOD when disposing of devices with sensitive data." },
      { p: "The amount of electronic waste we have is staggering. It is taking a toll on the soil and communities. Recycling is the only way we can lessen this damage. We can use it to create a greener future and rely less on virgin resources." },
      { p: "Here are all the locations where we provide services:" },
      { p: "For us, recycling is a passion. Since 1993 we have been leading the fight to curb carbon emissions, so the future for our children remains greener. That is why we recycle items, so we can reclaim the spent resources. This helps us to rely less on virgin resources and use the ones we have reclaimed. Recycle Technologies guarantees that no waste will ever enter a state-controlled landfill. For any queries or suggestions, feel free to contact us at +1-763-559-5130" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Bloomington Top Sights", items: [
      "Ridgedale Center",
      "Chasewood Parkway",
      "Ellerdale Road",
      "Fairfield Circle",
      "Saint Albans Mill Road",
      "Oak Ridge Trail",
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
