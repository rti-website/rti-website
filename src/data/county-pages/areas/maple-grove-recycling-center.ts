import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Maple Grove Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/maple-grove-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7068:6601, phone 7068:7731 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const MAPLE_GROVE_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/maple-grove-recycling-center/",
  state: "Minnesota",
  county: "Maple Grove",
  figma: { board: "7068:6601", phone: "7068:7731" },
  seo: {
    title: "Recycling Center In Maple Grove | Call (800) 969-5166",
    description: "Recycling center in Maple Grove receiving electronic equipment, spent batteries, lighting waste, paper materials, and organized material intake. Call (800) 969-5166.",
  },
  hero: {
    h1: "Maple Grove Recycling Center",
    crumb: "Maple Grove Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Maple Grove Services Recycling",
    blocks: [
      { p: "Maple Grove is a city in Hennepin County. It is famous for maple trees and maple syrup. Residents of Maple Grove can rely on us for recycling services. As maple falls under our recycle center’s coverage area. Our team will happily guide you on how you can make the best of the mail-in program. You can contact them at +1-763-559-5130." },
      { p: "We also provide recycling services to commercial businesses and government agencies. To request a pickup with no minimum, use [this form](pickup). Our team will get in touch with you as soon as we receive your inquiry. Recycle Technologies provides data destruction services as well. Our recycling centers are AAA NAID certified. We adhere to strict DOD guidelines when disposing of sensitive data." },
      { p: "Recycle Technologies Inc is a modern EPA-certified Recycler. Our state-of-the-art recycling center can handle the workload. We feel that recycling is the main focus if we want to reclaim spent resources. These can help create new products and lessen greenhouse gases’ impact." },
      { p: "Here are all the locations we cater to:" },
      { p: "For us, recycling is a passion. Since 1993 we have been leading the fight to curb carbon emissions, so the future for our children remains greener. That is why we recycle items, so we can reclaim the spent resources. This helps us to rely less on virgin resources and use the ones we have reclaimed. Recycle Technologies guarantees that no waste will ever enter a state-controlled landfill. For any queries or suggestions, feel free to contact us at +1-763-559-5130." },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Bloomington Top Sights", items: [
      "Elm Creek Park Reserve",
      "Fish Lake Regional Park",
      "Central Park of Maple Grove",
      "Medicine Lake Regional Trail",
      "Bassett Creek Regional Trail",
      "Medicine Lake",
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
