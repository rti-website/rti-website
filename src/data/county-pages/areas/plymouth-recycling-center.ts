import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Plymouth Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/plymouth-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7070:5559, phone 7070:6688 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const PLYMOUTH_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/plymouth-recycling-center/",
  state: "Minnesota",
  county: "Plymouth",
  figma: { board: "7070:5559", phone: "7070:6688" },
  seo: {
    title: "Recycling Center in Plymouth | (800) 969-5166",
    description: "Recycling center in Plymouth providing intake for electronic hardware, battery packs, lighting components, paper streams, and regulated material flow. Call (800) 969-5166",
  },
  hero: {
    h1: "Plymouth Recycling Center",
    crumb: "Plymouth Recycling Center",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Plymouth Center Recycling",
    blocks: [
      { p: "Plymouth is a thriving city with rolling terrain and lakes. The city provides an impressive quality of life. Recycling Technologies Inc does provide a recycling service in your city. Scroll Below to view all items we accept at our recycling center. You will receive a certificate of recycling after the service." },
      { p: "Recycle Technologies provide to private businesses and government agencies. Bulk recycling is a specialty for us. For pickups, you can use [this form](pickup). We also provide guaranteed Data destruction. We are AAA NAID certified, meaning we follow strict DOD guidelines when dealing with sensitive data. You can get in touch with us at +1-763-559-5130." },
      { p: "Recycle Technologies is a name you can trust when it comes to disposing of your items. We are a certified EPA recycler that has been providing impeccable services to you since 1993. The 100-mile coverage area enables us to cater to locations that are hard to reach. Recycling helps create opportunities and reclaims spent resources. The reclamation process helps you to mine fewer natural resources." },
      { p: "Here are some of the places we provide services:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Richfield Top Sights", items: [
      "Three Rivers Park District - Administrative Center",
      "Clifton E. French Regional Park",
      "Theodore Wirth Regional Park",
      "Minnehaha Creek",
      "North Cedar Lake Regional Trail",
      "Noerenberg Memorial Gardens",
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
