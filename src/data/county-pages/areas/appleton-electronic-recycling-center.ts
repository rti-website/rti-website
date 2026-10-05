import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Appleton Electronic Recycling, /wisconsin-recycling/appleton-electronic-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7065:7442, phone 7065:8210 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const APPLETON_ELECTRONIC_RECYCLING_CENTER: CountyPage = {
  url: "/wisconsin-recycling/appleton-electronic-recycling-center/",
  state: "Wisconsin",
  county: "Appleton",
  figma: { board: "7065:7442", phone: "7065:8210" },
  seo: {
    title: 'Appleton, WI Recycling: Electronics, Batteries & Bulbs',
    description: "Electronic recycling Appleton for desktops, laptops, network switches, circuit cards, and peripherals, received through documented intake and approved processing. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Appleton, WI',
    crumb: "Appleton Electronic Recycling",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Appleton Electronic Recycling",
    blocks: [
      { p: "Our homes have a treasure trove of electronic waste. We consider them of value, but that is not the case. Once they have fulfilled their purpose, they become a hazard to us. We need to dispose of them quickly. Throwing them in the trash is a punishable offense. That can have repercussions to you from both state and federal authorities." },
      { p: "Recycle Technologies Inc will take these electronics off your hands and dispose of them properly. The items we accept are listed below." },
      { p: "Commercial businesses can rely on us to dispose of their inventory of old electronics. We provide pickup services. You can access them using [this form](quote). Recycle Technologies is committed to providing excellence. That is why we are certified by both EPA and NAID. Our data destruction solution is the main reason many businesses prefer us. We follow strict DOD guidelines. To get a free quote, use this ." },
      { h: "Recycling Locations" },
      { p: "Here are all the locations where we provide recycling services:" },
      { p: "For us, recycling is a passion. Since 1993 we have been leading the fight to curb carbon emissions, so the future for our children remains greener. That is why we recycle items, so we can reclaim the spent resources. This helps us to rely less on virgin resources and use the ones we have reclaimed. Recycle Technologies guarantees that no waste will ever enter a state-controlled landfill. For any queries or suggestions, feel free to contact us at +1-763-559-5130." },
    ],
  },
  servicesHeading: "Recycling Services",
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Appleton Top Sights", items: [
      "Burial Chamber Haunted House Complex",
      "Henry Vilas Zoo",
      "Appleton Downtown, Inc.",
      "Gordon Bubolz Nature Preserve",
      "Funset Boulevard",
      "Erb Park",
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
