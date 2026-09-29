import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Racine County Recycling Center, /wisconsin-recycling/racine/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7063:7899, phone 7063:9029 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 * Redrawn as the "(2)" frame of the area batch, whose copy is the old
 * WordPress page's word for word; the photo is kept from the first frame.
 */
export const RACINE: CountyPage = {
  url: "/wisconsin-recycling/racine/",
  state: "Wisconsin",
  county: "Racine County",
  figma: { board: "7063:7899", phone: "7063:9029" },
  seo: {
    title: "Recycling Center in Racine County | Call (800) 969-5166",
    description: "Recycling center Racine County coordinating acceptance of electronics, lamp waste, varied battery categories, paper materials, and approved discard streams. Call (800) 969-5166",
  },
  hero: {
    h1: "Racine County Recycling Center",
    crumb: "Racine County Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/racine.png',
    imageTop: -372,
    phoneOverlay: 'rgba(22,22,22,0.3)',
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Racine County Recycling Center",
    blocks: [
      { p: "Racine County is present in the SE direction of Wisconsin. The county is famous for its bakery items. Kringle and Danish Pastries are why Racine County is famous. Racine is a French word for root." },
      { p: "We do provide recycling services in this county. All items that we accept at our recycling center are listed below." },
      { p: "Commercial and Government agencies can get in contact with us for recycling needs. We provide data destruction and device disposal services. We adhere to DOD guidelines when disposing of sensitive data. RTi is an EPA and AAA Certified Recycling company." },
      { p: "Wisconsin state mandate that residents dispose of electronics and appliance themselves. State landfills do not allow these items. We like to take this opportunity to recycle your items responsibly. Recycling helps us to reduce waste and reclaim spent resources. This helps us rely less on natural resources and more on reclamation." },
    ],
  },
  servicesHeading: "Recycling Services",
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Racine County Top Sights", items: [
      "Racine Zoo",
      "Racine North Beach",
      "Downtown Racine Corporation",
      "Windpoint Lighthouse",
      "Racine Art Museum",
      "Petrifying Springs Park",
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
