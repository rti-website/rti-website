import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Ramsey County Electronic Recycling, /minnesota-recycling/ramsey/electronic-recycling/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const RAMSEY_ELECTRONIC_RECYCLING: CountyPage = {
  url: "/minnesota-recycling/ramsey/electronic-recycling/",
  state: "Minnesota",
  county: "Ramsey County",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronic Recycling in Ramsey County | (800) 969-5166",
    description: "Electronic recycling in Ramsey County managing retired electronics, network equipment, office devices, and controlled material intake. Call (800) 969-5166",
  },
  hero: {
    h1: "Ramsey County Electronic Recycling",
    crumb: "Ramsey County Electronic Recycling",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Ramsey Electronics Recycling",
    blocks: [
      { p: "Recycle Technologies Inc does provide services in Ramsey County and its cities. It is the state capital and twin city of Minneapolis. The Residents of Ramsey Country can rely on us for their electronic recycling needs. Our top-notch recycling center is fully capable. You can drop your electronics at our drop facility for recycling or opt-in to our mail-in program." },
      { p: "It is recommended to check which items we accept at our recycling center. You can use the form here or contact us for a free quote. We offer a Request a pickup option for government agencies, businesses, and companies. You can use this form here. We believe that recycling is the future. It not only helps us to conserve resources. But at the same time reduces carbon emissions." },
      { p: "Recycle Technologies Inc. is a top-tier recycler. Its state-of-the-art recycling center is certified by EPA. We are Hazard and Solid Waste transporters. We provide services in a 100-mile coverage area. Furthermore, we provide services to locations with non-existent recycling services. As per regulation, all electronics are not allowed in landfills. This becomes your responsibility to properly dispose of them. That is why We are willing to take these off your hands and recycle them responsibly. Here is a list of electronics we recycle at our facility." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Ramsey County Top Sights", items: [
      "Como Park Zoo & Conservatory",
      "Cathedral of Saint Paul",
      "Minnesota History Center",
      "Science Museum of Minnesota",
      "James J. Hill House",
      "Landmark Center",
      "Como Park",
      "Bell Museum",
      "Minnesota State Capitol",
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
