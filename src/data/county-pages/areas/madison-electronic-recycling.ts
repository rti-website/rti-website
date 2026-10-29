import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Electronic Recycling Madison, WI, /wisconsin-recycling/madison/electronic-recycling/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const MADISON_ELECTRONIC_RECYCLING: CountyPage = {
  url: "/wisconsin-recycling/madison/electronic-recycling/",
  state: "Wisconsin",
  county: "Madison",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronic Recycling in Madison, WI | Call (800) 969-5166",
    description: "Electronic recycling Madison WI handling retired computers, data gear, office electronics, and outdated devices through organized processing. Call (800) 969-5166",
  },
  hero: {
    h1: "Electronic Recycling Madison, WI",
    crumb: "Electronic Recycling Madison, WI",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Electronic Recycling Madison, WI",
    blocks: [
      { p: "Is your space littered with electronics that have become obsolete? Or do you own electronic devices that can’t be repaired? In that case don’t throw them away, instead properly dispose of them using our facility. We provide service of [Electronic Recycling in Madison Wi](/wisconsin-recycling/madison/). Bring your outdated devices to our nearest facility or use our mail-in program. And we will responsibly recycle your electronic devices." },
      { h: "Why Recycle E-waste?" },
      { p: "Most electronic products come with rare resources and materials. When electronic devices are not properly disposed of and are instead thrown in the garbage. They become a hazard to those around them. All electronic devices at the moment of decay start to release toxic chemicals. These chemicals in turn harm the environment, damage the ecosystem, and maybe harm you. Recyclable Technologies aims to fix this issue. To lessen carbon emissions and greenhouse gases, we want to recycle your electronic devices. All you have to do is to bring your outdated, unwanted devices to our facility, and we will recycle them responsibly. The process is much simpler than you can imagine." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Where to Recycle Electronics in Madison Wi", blocks: [
      { p: "We have a state-of-the-art facility where we dispose of all electronic waste. This is located in New Berlin. We make sure this doesn’t affect the surrounding metropolis in any way possible. Furthermore, for residents who are not able to come to our facility, we offer a mail-in program. Our Customer support team can easily guide you regarding this process." },
    ] },
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Madison Top Sights", items: [
      "Olbrich Botanical Gardens",
      "Dane County Farmers' Market",
      "Monona Terrace Community and Convention Center",
      "Madison Museum of Contemporary Art",
      "Overture Center for the Arts",
      "Tenney Park",
      "Lake Monona",
      "Madison Mallard",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "We serve residents and businesses in the Madison area",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
