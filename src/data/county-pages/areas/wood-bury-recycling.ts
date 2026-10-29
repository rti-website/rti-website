import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Woodburry Recycling Service, /wisconsin-recycling/washington-county-recycling-center/wood-bury-recycling/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 6 Mar 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const WOOD_BURY_RECYCLING: CountyPage = {
  url: "/wisconsin-recycling/washington-county-recycling-center/wood-bury-recycling/",
  state: "Minnesota",
  county: "Woodbury",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Recycling Service in Woodburry | Call (800) 969-5166",
    description: "Recycling service Woodburry handling keyboards, monitors, power supplies, cables, and mixed devices through documented intake and processing. Call (800) 969-5166.",
  },
  hero: {
    h1: "Woodburry Recycling Service",
    crumb: "Woodburry Recycling Service",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Woodburry Recycling Service",
    blocks: [
      { p: "Recycling your trash is the sensible thing to do. The proper disposal of trash helps us to combat climate change. That is why RTi is on a mission to reduce carbon emissions across the board. Companies and Businesses can avail us if they don’t want to be cited for the above. You can request a pickup using this [form](quote). That is not all, we provide data destruction services as well. We are certified by both EPA and NAID for recycling operations. For sensitive data disposal, we follow strict DOD guidelines. That is why BBB rates us with a trust score of A. You can get in touch with these numbers & via our email. Reducing carbon emissions is not a job, but a passion for us. Recycling not only creates jobs, but also reduces our reliance on natural resources. Instead, we reclaim any spent resources and repurpose them for newer products." },
      { h: "Here are all the places where you can avail of our services:" },
      { p: "Hugo, Afton, Stillwater, Bayport, Cottage Grove, Scandia, Mahtomedi, Newport, Pine Springs, Marine on Saint Croix, Grant, Saint Paul Park, Landfall, Lakeland, Oak Park Heights, Dellwood" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Woodburry Top Sights", items: [
      "Bear Mountain State Park",
      "Black Rock Forest",
      "Storm King Art Center",
      "Anthony's Nose",
      "Seven Lakes Drive",
      "Bear Mountain Bridge",
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
