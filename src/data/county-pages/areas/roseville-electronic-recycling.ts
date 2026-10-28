import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Roseville Electronic Recycling,
 * /minnesota-recycling/ramsey/electronic-recycling/roseville-electronic-recycling/
 * Brought back 28 Oct 2026 (redirect sheet "RTI Currently redirect pages",
 * action Restore: rebuild at the same URL, electronics only, so it must
 * differ from the Roseville general page; it had 301'd to /minnesota-recycling/).
 * Built on the county template like the 8 Oct batch (Figma
 * BVtf2AOuUOcYbiMIlcKmbC board 7052:28731, phone 7052:34333).
 * The old WordPress page's copy word for word, from the Wayback Machine
 * capture of 16 Apr 2026 (the page is not in the 15 Sep 2026 backup), except:
 * its Top Sights heading read "Dakota County Top Sights" (Roseville is in
 * Ramsey County; the sights are Roseville's), "Vadnais Height" reads
 * "Heights", and the sights' category tags are left out as on Roseville.
 */
export const ROSEVILLE_ELECTRONIC_RECYCLING: CountyPage = {
  url: "/minnesota-recycling/ramsey/electronic-recycling/roseville-electronic-recycling/",
  state: "Minnesota",
  county: "Roseville",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Electronic Recycling in Roseville | (800) 969-5166',
    description: "Electronic recycling in Roseville supporting retirement of office electronics, network hardware, peripherals, and controlled intake workflows. Call (800) 969-5166",
  },
  hero: {
    h1: 'Roseville Electronic Recycling',
    crumb: "Roseville Electronic Recycling",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Roseville Electronic Recycling Center",
    blocks: [
      { p: "We hoard electronic waste. We do this thinking they might value us in the long run. During the course, we find out that they are a bigger hazard for us. Throwing them in the trash might seem an easy process. But getting fined is something we don’t desire. Your best bet for proper disposal is recycling. That is why Recycle Technologies Inc is here to assist." },
      { p: "For companies and agencies, it is a different story altogether. The state will pose heavy fines for violation of their policies. To avoid them, use [this form](pickup) for pickup services. We are certified by both EPA and NAID. We provide data destruction services and follow strict DOD guidelines in disposing of sensitive data. Our recycling and destruction certificate provides you protection from improper disposal. Getting rid of electronic waste properly is good for both you and the environment." },
      { h: "Here are all the locations where Recycle Technologies makes a difference:" },
      { p: "Saint Paul, New Brighton, North Oaks, Maplewood, Arden Hills, Vadnais Heights, Gem Lake, Lauderdale, Falcon Heights, Little Canada, Shoreview, Mounds View" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Roseville Top Sights", items: [
      "Harriet Alexander Nature Center",
      "SeaQuest Roseville",
      "Lake Josephine County Park",
      "Muriel Sahlin Arboretum at Roseville Central Park",
      "Como Park",
      "Langton Lake Park",
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
