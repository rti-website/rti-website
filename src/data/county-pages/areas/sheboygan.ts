import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Sheboygan Recycling, /wisconsin-recycling/sheboygan/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333 (Asim: "use that ui", the copy is his). The
 * copy is the old WordPress page's (15 Sep 2026 backup) word for word, with
 * the fixes listed in the project doc "thirteen-area-pages-8-oct" ("Recycle
 * Technlolgies" on the contact card; the city list written out).
 */
export const SHEBOYGAN: CountyPage = {
  url: "/wisconsin-recycling/sheboygan/",
  state: "Wisconsin",
  county: "Sheboygan",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Recycling Services in Sheboygan | Call (800) 969-5166',
    description: "Recycling services Sheboygan facilitating collection of electronics, lighting remnants, battery varieties, paper batches, and approved materials. Call (800) 969-5166",
  },
  hero: {
    h1: 'Sheboygan Recycling',
    crumb: "Sheboygan Recycling",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Sheboygan Recycling Center",
    blocks: [
      { p: "We have accumulated a lot of trash over the years. Items that have surpassed their usefulness. They are either in the garage or the attic. Some might hold some personal meaning. But not everything. We presume they have value, but not that much. They do pose a health risk. An old camera might be a collector’s item, but its toxins have a different picture to tell. The state will impose fines on you if you throw them in the trash." },
      { p: "To avoid that unfortunate consequence, Recycle Technologies is here to aid you. Disposing of items properly is a good way to help the environment and prevent exposure to toxic chemicals. Residents of Sheboygan can easily do that using our services. The items we accept for our recycling center are below." },
      { p: "The state takes no prisoners when it finds out businesses are violating its disposal policies. Businesses can rely on us to responsibly dispose of unwanted items. We even provide pickup services. You can use [this form](pickup) to schedule one. Recycle Technologies is a State contracted EPA and NAID-certified recycler. We provide data destruction on request. Our process conforms to DOD guidelines. For a free quote, use [this form](quote). Recycling is a choice for a better future. Instead of claiming what we do. We should start doing it. That is why for 30 years we have led by example." },
      { h: "Here are all the locations where businesses are using us for their recycling needs:" },
      { p: "Sheboygan Falls, Cedar Grove, Oostburg, Glenbeulah, Kohler, Howard’s Grove, Cascade, Mosel, Hingham, GreenBush, Gibbsville, Waldo, Adell, Plymouth" },
      { p: "You can get in touch with us at +1 262-798-3040." },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Sheboygan County Top Sights", items: [
      "Blue Harbor Resort",
      "Bookworm Gardens",
      "Deland Park",
      "Michigan Avenue",
      "South Pier Drive",
      "North Point Park",
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
