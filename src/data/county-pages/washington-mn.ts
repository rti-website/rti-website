import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Washington County Recycling Center, MN, /minnesota-recycling/washington-county/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7023:19962, phone 7023:20515 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const WASHINGTON_MN: CountyPage = {
  url: '/minnesota-recycling/washington-county/',
  state: 'Minnesota',
  county: "Washington County",
  figma: { board: '7023:19962', phone: '7023:20515' },
  seo: {
    title: "Washington County Recycling Center, MN | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Washington County, Minnesota: business pickup, drop-off at our Blaine facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Washington County Recycling Center, MN",
    crumb: "Washington County Recycling Center, MN",
    lead: "Washington County Recycling Center, MN Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/washington-mn.png',
    imageTop: -372,
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Minnesota' }) },
  },
  about: {
    heading: "About Washington County Recycling",
    blocks: [
      { p: "Washington County is a county located in east-central Minnesota, in the United States. It is part of the Twin Cities metropolitan area, which is the most populous urban area in the state. The county seat of Washington County is Stillwater." },
      { p: "Washington County has a population of approximately 262,000 people and covers an area of 423 square miles (1,096 square kilometers). The county is known for its natural beauty, with several parks and trails for hiking, biking, and other outdoor activities. It is also home to countless historic sites, including the St. Croix Boom Site and the Historic Courthouse in Stillwater." },
      { p: "The economy of Washington County is diverse, with major industries including healthcare, education, technology, and manufacturing. The county is home to various colleges and universities, including Century College and Metropolitan State University." },
      { p: "Washington County has recycling programs and laws in place to help reduce waste and protect the environment. Examples include:" },
      { list: [
        { title: "Recycling is mandatory", text: "Washington County requires residents and businesses to recycle designated materials, including paper, cardboard, glass, metal, and plastic containers. It is illegal to throw these materials in the trash." },
        { title: "Organics recycling", text: "Washington County's organics recycling program includes yard waste and food scraps. Residents can place these materials in designated bins or compost them at home." },
        { title: "Electronics recycling", text: "Washington County has a program for recycling electronics, such as computers, TVs, and cell phones. It is illegal to throw these items in the trash." },
        { title: "Hazardous waste disposal", text: "Washington County has a program for disposing of hazardous waste, such as paint, chemicals, and batteries. Residents can bring these items to designated drop-off locations." },
        { title: "Single-use plastic bag ban", text: "Washington County has a ban on single-use plastic bags in retail stores, with some exemptions for certain types of bags." },
      ] },
      { p: "It's important to note that these laws may be subject to change, so it's best to check with Washington County or your local government for the most up-to-date information." },
      { p: "Recycle Technologies Inc provides all Washington residents with a drop facility for their Electronics and Hazardous waste. Government Agencies and Companies that require bulk recycling of their e-waste can contact us. We provide ITAD solutions to many companies." },
    ],
  },
  items: { heading: "ITEMS WE ACCEPT" },
  sights: {
    heading: "Washington County Top Sights",
    items: [
      "Stillwater Lift Bridge, Historic Site",
      "Afton State Park",
      "William O'Brien State Park",
      "Lake Elmo Park Reserve",
      "Teddy Bear Park",
      "Gammelgården Museum of Scandia",
    ],
  },
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
