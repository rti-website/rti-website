import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Brooklyn Park Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/brooklyn-park-recycling-center/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333. The old WordPress page's copy word for word
 * (15 Sep 2026 backup); the city list's "Champlain" is Champlin.
 */
export const BROOKLYN_PARK_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/brooklyn-park-recycling-center/",
  state: "Minnesota",
  county: "Brooklyn Park",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Recycling Center in Brooklyn Park | Call (800) 969-5166',
    description: "Recycling center Brooklyn Park accepts electronics, lamps, batteries, TVs and paper shredding; certified processing with data destruction. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Brooklyn Park Recycling Center',
    crumb: "Brooklyn Park Recycling Center",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Brooklyn Park Recycling Center",
    blocks: [
      { p: "Brooklyn Park is home to 47 miles of trails and 67 parks. The West Coon Rapids Dam is also present here as well. Recycle Technologies Inc. provides recycling services for the residents of Brooklyn Park. We also provide services to the commercial and government sectors. They can rely on properly disposing of devices with sensitive data on them." },
      { p: "Recycle Technologies are AAA NAID data Destructors. Our modern recycling center is more than capable of handling the workload. We also provide pickup services for the commercial sector. You can access that using [this form](pickup). Recycling is the only process through which we can lessen our desire to mine more raw materials. By reclaiming those resources through recycling, we can reduce our carbon emissions at a faster pace." },
      { p: "Recycle Technologies is a name you can trust when it comes to disposing of your items. We are a certified EPA recycler that has been providing impeccable services to you since 1993. The 100-mile coverage area enables us to cater to locations that are hard to reach. Recycling helps create opportunities and reclaims spent resources. The reclamation process helps you to mine fewer natural resources." },
      { h: "Here are some of the places we provide services:" },
      { p: "Minneapolis, Richfield, Saint Louis Park, Plymouth, Minnetonka, Golden Valley, Mound, Eden Prairie, Hopkins, New Hope, Maple Grove, Greenfield, Loretto, Shorewood, Dayton, Medina, Rogers, Maple Plain, Champlin, Edina" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Brooklyn Park Top Sights", items: [
      "Silverwood Park",
      "Kordiak Park",
      "Lilli Putt",
      "Grand Rounds Scenic Byway",
      "Mississippi National River & Recreation Area",
      "Elm Creek Park Reserve",
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
