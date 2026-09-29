import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Calumet County Recycling Center, /wisconsin-recycling/calumet-county/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7023:18867, phone 7023:19407 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are the old WordPress page's
 * (15 Sep 2026 backup).
 */
export const CALUMET: CountyPage = {
  url: '/wisconsin-recycling/calumet-county/',
  state: 'Wisconsin',
  county: "Calumet County",
  figma: { board: '7023:18867', phone: '7023:19407' },
  seo: {
    title: "Material Recycling in Calumet | Call (800) 969-5166",
    description: "Material recycling in Calumet handling accepted electronics, spent lamps, mixed battery formats, document paper, and approved items. Call (800) 969-5166",
  },
  hero: {
    h1: "Calumet County Recycling Center",
    crumb: "Calumet County Recycling Center",
    lead: "Calumet Recycling Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/calumet.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Calumet County Recycling Center",
    blocks: [
      { p: "Calumet County is a county located in east-central Wisconsin, in the United States. The county is named after the Chippewa word \"ka lumet,\" which means \"peace pipe\" or \"pipe of peace.\" The county seat of Calumet County is Chilton, and the largest city in the county is Appleton. Calumet County has a population of approximately 50,000 people and covers an area of 397 square miles (1,028 square kilometers). Calumet County is known for its rural character and agricultural heritage. The county is home to several dairy farms, cheese factories, orchards, and vineyards. The area is also popular for outdoor recreation, with numerous parks and trails for hiking, biking, and other activities." },
      { p: "Regarding recycling programs and laws, Calumet County has various initiatives to help reduce waste and protect the environment. These include:" },
      { list: [
        { title: "Recycling is mandatory", text: "Calumet County requires residents and businesses to recycle designated materials, including paper, cardboard, glass, metal, and plastic containers. It is illegal to throw these materials in the trash." },
        { title: "Electronics recycling", text: "Calumet County has a program for recycling electronics, such as computers, TVs, and cell phones. It is illegal to throw these items in the trash." },
        { title: "Hazardous waste disposal", text: "Calumet County has a program for disposing of hazardous waste, such as paint, chemicals, and batteries. Residents can bring these items to designated drop-off locations." },
        { title: "Composting", text: "Calumet County has a program for composting yard waste and food scraps, which can be used to enrich the soil for gardening and other purposes." },
      ] },
      { p: "It's important to note that these laws may be subject to change, so it's best to check with Calumet County or your local government for the most up-to-date information. Recycle Technologies is a state-of-the-art recycling center that provides recycling services for residents of both Minnesota and Wisconsin. You can visit our recycling centers for your recycling needs. Customers who have excess bulbs and batteries to dispose of can rely on our mail-in program to do so. To learn about how you can do that [Click here](mailin)." },
      { p: "We also cater to Government Agencies and companies who are looking for an EPA-certified recycler that takes bulk orders. You can reach us at the number listed below. We are more than obliged to have your business." },
    ],
  },
  items: { heading: "ITEMS WE ACCEPT" },
  sights: {
    heading: "Calumet County Top Sights",
    items: [
      "High Cliff State Park",
      "Ledge View Nature Center",
      "Calumet County Park",
      "Wanick Choute Park",
      "Darboy Community Park",
      "Becker Lake",
    ],
  },
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
