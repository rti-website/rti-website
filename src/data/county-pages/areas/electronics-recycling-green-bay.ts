import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Electronics Recycling in Green Bay, /wisconsin-recycling/electronics-recycling-green-bay/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * The capture shows the About paragraph twice, the second time under
 * "Where to Recycle Electronics in Green Bay?" and with its "recycling" link;
 * it is here once, the linked one.
 */
export const ELECTRONICS_RECYCLING_GREEN_BAY: CountyPage = {
  url: "/wisconsin-recycling/electronics-recycling-green-bay/",
  state: "Wisconsin",
  county: "Green Bay",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronics Recycling in Green Bay | Call (800) 969-5166",
    description: "Electronics recycling Green Bay processing computers, display units, network gear, office hardware, and outdated devices through verified handling. Call (800) 969-5166",
  },
  hero: {
    h1: "Electronics Recycling in Green Bay",
    crumb: "Electronics Recycling in Green Bay",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels..",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Electronics Recycling in Green Bay",
    blocks: [
      { p: "Where can I Recycle my e-waste? How do I dispose of electronics near me? Well, the simplest answer is your city yards, but this is no longer the case. Since 2010, Wisconsin is no longer accepting electronics in its landfills. This means you can no longer throw your obsolete electronics in the trash bin. Your safest option is going to a [recycling](/wisconsin-recycling/green-bay-recycling/) facility or using our mail-in program for recycling. Our Mail-in program is one of the easiest ways to get rid of excess electronics that you have no use for and are in the process of decaying. Keep in mind that if you don’t properly dispose of electronics, they may lead to damaging you and your surroundings. Electronics contain harmful materials such as lead, mercury, cadmium, heavy metal, and other dangerous chemicals. Recycling is the only process through which you can dispose of the harmful elements that may become a burden for you." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Green Bay Top Sights", items: [
      "Bay Beach Amusement Park",
      "Lambeau Field",
      "Bay Beach Wildlife Sanctuary",
      "Green Bay Botanical Garden",
      "Neville Public Museum",
      "National Railroad Museum",
      "Lambeau Field Stadium Tours",
      "Grassy Island Lighthouse, llc",
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
