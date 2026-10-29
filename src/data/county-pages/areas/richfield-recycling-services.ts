import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Richfield Recycling Services, /minnesota-recycling/hennepin-county-recycling-center/richfield-recycling-services/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 6 Mar 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "Saint Louis, Park" reads "Saint Louis Park".
 *   "Golden, Valley" reads "Golden Valley".
 *   "Champlain" reads "Champlin".
 */
export const RICHFIELD_RECYCLING_SERVICES: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/richfield-recycling-services/",
  state: "Minnesota",
  county: "Richfield",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Recycling Services in Richfield | Call (800) 969-5166",
    description: "Recycling services Richfield for servers, tablets, routers, phone handsets, and mixed media, accepted through documented intake steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Richfield Recycling Services",
    crumb: "Richfield Recycling Services",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Richfield Recycling Services",
    blocks: [
      { p: "Richfield is a suburban city in Hennepin County. It is famous for its agricultural lands. The HQ of Best Buy is also in Richfield. Recycle Technologies Inc does provide recycling solutions for Richfield residents. You can avail of our services by dropping off your unwanted items at our recycling centers or using our mail-in program. It is your responsibility to dispose of electronics and applications. We will be much obliged to take it off your hands and do the deed. We can guarantee you that no waste will ever enter state landfills. For more than three decades, residents like yourself have relied upon us to properly dispose of waste. We value your commitment to the cause and the support you have given to us. Private companies and government agencies have also relied on us to dispose of their electronic waste. We provide pickup services for these organizations. If you are interested in our services, you can use this form to request a pickup. We are an EPA and AAA NAID-certified recycler. To learn which items we accept at our recycling center, please scroll below. Guaranteed devices and data destruction are facilities we provide. We adhere to the foundation set by the DOD in disposing of sensitive data. We would like to this opportunity to thank you for your trust in us. Your feedback and your desire to recycle with us are some things we truly appreciate. As always, recycling is a process. It helps us by properly reclaiming spent resources from waste. This is a blessing as we mine fewer natural resources. And in the long run, we reduce our carbon footprint" },
      { h: "Here is a list of other locations in the county we provide service for:" },
      { p: "Minneapolis, Maple Grove, Saint Louis Park, Plymouth, Minnetonka, Golden Valley, Eden Prairie, Hopkins, Greenfield, Loretto, Shorewood, Dayton, Medina, Champlin, Rogers, Maple Plain, Excelsior, Mound" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Richfield Top Sights", items: [
      "Mall of America®",
      "SEA LIFE at Mall of America",
      "Minnehaha Creek",
      "Veterans Park",
      "Wood Lake Nature Center",
      "Fort Snelling National Cemetery",
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
