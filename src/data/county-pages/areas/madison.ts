import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Madison Recycling Center, /wisconsin-recycling/madison/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7066:4869, phone 7066:5998 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const MADISON: CountyPage = {
  url: "/wisconsin-recycling/madison/",
  state: "Wisconsin",
  county: "Madison",
  figma: { board: "7066:4869", phone: "7066:5998" },
  seo: {
    title: 'Madison, WI Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center Madison managing electronics intake, lighting waste, battery assortments, paper volumes, and approved material streams. Call (800) 969-5166",
  },
  hero: {
    h1: 'Electronics Recycling in Madison, WI',
    crumb: "Madison Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Recycling Center in Madison",
    blocks: [
      { p: "Residents of Madison can breathe a sigh of relief, Recycle Technologies does provide service in Madison. Please check which items we accept at our recycling center by scrolling below. We usually accept all items, but some items such as Styrofoam are not accepted by our recycling centers. Once the disposal process is over, we will provide you with the certificate of recycling. You can contact us at +12627983040 for a free quote or via [this form](quote)." },
      { p: "Private Businesses, Companies, and Government Agencies can rely on RT for recycling needs. We provide Guaranteed Data and Device destruction. Our recycling center also carries AAA NAID certification. You can use [this form](pickup) to request a pickup or contact us at the numbers below. Recycling prevents toxic chemicals from leaking into the soil and water sources." },
      { p: "Recycle Technologies Inc is an EPA-certified recycler. We have two state-of-the-art recycling centers in Blaine, Minnesota, and New Berlin, Wisconsin. Our 100-mile coverage area provides us access to locations with zero recycling options. You can do your part by recycling with us. Help us make our future green, so our children can thrive. Here are all the locations where businesses are using us for their recycling needs:" },
    ],
  },
  servicesHeading: "Recycling Services",
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Sheboygan County Top Sights", items: [
      "Henry Vilas Zoo",
      "Olbrich Botanical Gardens",
      "Madison Children's Museum",
      "Wisconsin State Capitol",
      "Chazen Museum of Art",
      "Dane County Farmers' Market",
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
