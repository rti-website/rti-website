import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Olmsted County Recycling Center, /minnesota-recycling/olmsted-county/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7031:22907, phone 7031:23429 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const OLMSTED: CountyPage = {
  url: '/minnesota-recycling/olmsted-county/',
  state: 'Minnesota',
  county: "Olmsted County",
  figma: { board: '7031:22907', phone: '7031:23429' },
  seo: {
    title: "Olmsted County Recycling Center | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Olmsted County, Minnesota: business pickup, drop-off at our Blaine facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Olmsted County Recycling Center",
    crumb: "Olmsted County Recycling Center",
    lead: "Olmsted County Recycling Center Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/olmsted.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Minnesota' }) },
  },
  about: {
    heading: "About Olmsted County Recycling Center",
    blocks: [
      { p: "Olmsted County is a county located in southeastern Minnesota, in the United States. It is situated in the Driftless Area, a region characterized by rolling hills, rugged bluffs, and deep valleys that were left untouched by the last glacial period." },
      { p: "The county seat of Olmsted County is Rochester, which is the third-largest city in Minnesota and home to the renowned Mayo Clinic, one of the world's leading medical centers." },
      { p: "Olmsted County has a population of approximately 159,000 people and covers an area of 655 square miles (1,697 square kilometers). The county is known for its natural beauty, with several parks and trails for hiking, biking, and other outdoor activities. It is also home to many historic sites, including the Mayo Wood Mansion, the historic Château Theatre, and the Assisi Heights Spirituality Center." },
      { p: "The economy of Olmsted County is diverse, with major industries including healthcare, education, technology, and manufacturing. The county has countless colleges and universities, including the Mayo Clinic College of Medicine and Science, the University of Minnesota Rochester, and the Rochester Community and Technical College." },
      { p: "Olmsted County has numerous recycling laws and programs in place to help reduce waste and protect the environment." },
      { list: [
        { title: "Recycling is mandatory", text: "Olmsted County requires residents and businesses to recycle designated materials, including paper, cardboard, glass, metal, and plastic containers. It is illegal to throw these materials in the trash." },
        { title: "Organics recycling", text: "Olmsted County has an organics recycling program, which includes yard waste and food scraps. Residents can place these materials in designated bins or compost them at home." },
        { title: "Electronics recycling", text: "Olmsted County has a program for recycling electronics, such as computers, TVs, and cell phones. It is illegal to throw these items in the trash. For that reason alone, Residents of Olmsted County can easily recycle their electronics by dropping them at our nearest facility. Please check the map below and the working hours if you plan to visit us. We will be more than obliged to have you." },
        { title: "Hazardous waste disposal", text: "Olmsted County has a program for disposing of hazardous waste, such as paint, chemicals, and batteries. Residents can bring these items to designated drop-off locations. Or Residents can use Recycle Technologies for this hazardous waste disposal." },
        { title: "Single-use plastic bag ban", text: "Olmsted County has a ban on single-use plastic bags in retail stores, with some exemptions for certain types." },
      ] },
    ],
  },
  items: { heading: "Items We Accept" },
  sights: {
    heading: "Olmsted County Top Sights",
    items: [
      "Quarry Hill Nature Center",
      "Rochester Art Center",
      "Oxbow Park & Zollman Zoo",
      "Chester Woods Park",
      "Plummer",
      "Foster-Arend Park",
    ],
  },
  company: {
    name: "Recycle Technologies",
    text: "Recycle Technologies Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
