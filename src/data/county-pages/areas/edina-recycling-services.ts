import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Edina Recycling Services, /minnesota-recycling/hennepin-county-recycling-center/edina-recycling-services/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:74545, phone 7084:75114 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const EDINA_RECYCLING_SERVICES: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/edina-recycling-services/",
  state: "Minnesota",
  county: "Edina",
  figma: { board: "7084:74545", phone: "7084:75114" },
  seo: {
    title: "Recycling Services in Edina | Call (800) 969-5166",
    description: "Recycling services Edina for electronics, batteries, lamps, devices, and paper, handled through approved intake and processing steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Edina Recycling Services",
    crumb: "Edina Recycling Services",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Edina Services Recycling",
    blocks: [
      { p: "We are happy to provide recycling solutions to residents of Edina, Minnesota. Edina is a city in Hennepin County. This location is known for its shopping, dining, and excellent quality of life for its residents." },
      { p: "Recycle Technologies Inc does provide to both commercial and governmental sectors for disposing of waste. Our recycling center is more than capable of handling the workload. We are EPA and AAA NAID certified. We also provide a guaranteed device and data destruction. Not only that, but we follow strict guidelines set by DOD when handling devices with sensitive data. That is why many organizations prefer us." },
      { p: "Our core value relies on how we can make a difference in combating carbon emissions. We believe that by recycling electronics and appliances, we can extract precious materials that can be reused. By eradicating toxic chemicals, we can make them safe for the environment. Our reliance on natural resources decreased tenfold.Making a greener future for our children is our vision Here are all the other locations we provide recycling services:" },
      { p: "For us, recycling is a passion. Since 1993 we have been leading the fight to curb carbon emissions, so the future for our children remains greener. That is why we recycle items, so we can reclaim the spent resources. This helps us to rely less on virgin resources and use the ones we have reclaimed. Recycle Technologies guarantees that no waste will ever enter a state-controlled landfill. For any queries or suggestions, feel free to contact us at +1-763-559-5130." },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Edina Top Sights", items: [
      "Centennial Lakes Park",
      "Rosland Park",
      "Minnehaha Creek",
      "Lake Edina",
      "Como-Harriet Streetcar Line",
      "North Cedar Lake Regional Trail",
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
