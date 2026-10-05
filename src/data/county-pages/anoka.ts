import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Anoka County Recycling Center, /minnesota-recycling/anoka-county-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7071:7957, phone 7071:9111 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 * Redrawn as the "(2)" frame of the area batch, whose copy is the old
 * WordPress page's word for word; the photo is kept from the first frame.
 */
export const ANOKA: CountyPage = {
  url: "/minnesota-recycling/anoka-county-recycling/",
  state: "Minnesota",
  county: "Anoka County",
  figma: { board: "7071:7957", phone: "7071:9111" },
  seo: {
    title: 'Anoka County, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center in Anoka County managing electronics, batteries, lamps, paper, and controlled materials for local organizations. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Anoka County, MN',
    crumb: "Anoka County Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/anoka.png',
    imageTop: -372,
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Anoka County shredding Recycling",
    blocks: [
      { p: "Anoka County is a county located in the state of Minnesota, in the United States. It is in the Twin Cities metropolitan area, which is the most populous urban area in the state. Anoka County is named after the Native American word for “on both sides,” as the county is situated on the banks of the Mississippi River." },
      { p: "The county is home to a variety of communities, including the cities of Blaine, Coon Rapids, Andover, and Ramsey. Anoka County is known for its parks and trails, including the Mississippi River Trail, which runs through the county and provides scenic views of the river." },
      { p: "The population of Anoka County is approximately 360,000 people, making it the fourth-most populous county in Minnesota. The county has a diverse economy, with major industries including healthcare, manufacturing, and retail." },
      { p: "Anoka County has several recycling laws in place to help protect the environment and reduce waste." },
      { list: [
        { title: "Recycling is mandatory", text: "Anoka County requires residents and businesses to recycle designated materials, including paper, cardboard, glass, metal, and plastic containers. It is illegal to throw these materials in the trash." },
        { title: "Organics recycling", text: "Anoka County’s organics recycling program includes yard waste and food scraps. Residents can place these materials in designated bins or compost them at home." },
        { title: "Electronics recycling", text: "Anoka County has a program for recycling electronics, such as computers, TVs, and cell phones. It is illegal to throw these items in the trash. Recycle Technologies can easily be reached at 10040 Davenport Street NE, Blaine MN 55449 if you wish to drop off your electronics. We will happily dispose of them and issue a certificate of proper disposal." },
        { title: "Hazardous waste disposal", text: "Anoka County has a program for disposing of hazardous waste, such as paint, chemicals, and batteries. Residents can bring these items to designated drop-off locations. You can visit Recycle Technologies facility for proper disposal of Hazardous Waste." },
        { title: "Single-use plastic bag ban", text: "Anoka County has a ban on single-use plastic bags in retail stores, with some exemptions for certain types of bags." },
      ] },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Anoka County Top Sights", items: [
      "Serum's Good Time Emporium",
      "Lyric Arts Main Street Stage",
      "Green Haven Golf Course",
      "White Buffalo Spiritual Healing And Gifts",
      "Basilica of Saint Mary",
      "The Hardware Store Speakeasy",
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
