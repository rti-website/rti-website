import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Electronics Recycling in Minneapolis, MN, /electronics-recycling-in-minneapolis/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "Solutionsx" reads "Solutions".
 */
export const ELECTRONICS_RECYCLING_IN_MINNEAPOLIS: CountyPage = {
  url: "/electronics-recycling-in-minneapolis/",
  state: "Minnesota",
  county: "Minneapolis",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronics Recycling in Minneapolis MN | Call (800) 969-5166",
    description: "Electronics recycling Minneapolis MN for desktops, servers, phones, routers, and peripheral equipment, received through documented intake and regulated processing. Call (800) 969-5166.",
  },
  hero: {
    h1: "Electronics Recycling in Minneapolis, MN",
    crumb: "Electronics Recycling in Minneapolis, MN",
    lead: "At Recycle Technologies, we’re revolutionizing the way you dispose of your electronic waste.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Electronic Recycling in Minneapolis",
    blocks: [
      { p: "At our recycling center, our goal is to increase the reuse potential of electronic waste and lessen its environmental impact. We aim to set the standard for responsible recycling. Like many other cities, Minneapolis is where we do provide recycling services. Secure Data Destruction is a concern for both businesses and individuals. We have a modern recycling center. We cater to individuals and companies alike." },
      { h: "Electronic Recycling" },
      { p: "Additionally, we provide secure data destruction which is important for electronics recycling in Minneapolis. Our recycling lessens our carbon footprint and brings emissions down at a faster pace. You can start by dropping off your unwanted electronics at our recycling center. If commuting to our center feels like a challenge then our [mail-in program](mailin) will be the next best thing. You can fill in this [form](quote) or call us at +1 763-559-5130 to get in touch With us. Our team will guide you through the whole process." },
      { p: "Recycle Technologies Inc. offers a simple way to [reduce carbon footprint electronic waste](/how-to-lessen-our-carbon-footprint-with-electronic-waste-recycling/). At the same time, we provide companies with a tight budget, a beneficial option. We provide a safe and secure service. Our process involves all items going through a proper screening to assess the condition of the electronic device. After that, we move toward the recycling portion." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Biodegradable Solutions", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Minneapolis Top Sights", items: [
      "Minneapolis Institute of Art",
      "Minnehaha Falls",
      "Weisman Art Museum",
      "Minneapolis Sculpture Garden",
      "American Swedish Institute",
      "Mill City Museum",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing certified recycling services to individuals and businesses.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
