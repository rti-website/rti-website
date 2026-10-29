import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Electronic Recycling, Madison, Wi, /wisconsin-recycling/electronic-recycling-madison/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const ELECTRONIC_RECYCLING_MADISON: CountyPage = {
  url: "/wisconsin-recycling/electronic-recycling-madison/",
  state: "Wisconsin",
  county: "Madison",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronic Recycling in Madison WI | Call (800) 969-5166",
    description: "Electronic recycling Madison WI for laptops, desktops, networking hardware, cables, and components, received, sorted, and processed under approved methods. Call (800) 969-5166.",
  },
  hero: {
    h1: "Electronic Recycling, Madison, Wi",
    crumb: "Electronic Recycling, Madison, Wi",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Electronic Recycling in Madison, Wi",
    blocks: [
      { p: "A normal person cannot fathom how much trash is in his house. We desire things that enrich our lives. But the real danger starts when their usefulness ends. Disposing of trash in the curbside bin is a good idea. Unless you like paying fines. To avoid this, your best bet is to dispose of it responsibly. Recycle Technologies is here to aid you in doing that. The items we accept at our recycling center are below. Commercial businesses and government agencies can also use our service to recycle responsibly. Exclusive to them, we provide pickup services as well. To schedule one right now, fill out this form. Recycle Technologies is an EPA and NAID-certified recycler. The certification enables us to offer data destruction services with DOD guidelines in place. Get in touch with Recycle Technologies for disposing of items safely and securely." },
      { h: "Here are all the locations where Recycle Technologies provides immaculate solutions:" },
      { p: "Dane, Monona, Sun Prairie, Waunakee, Oregon, Middleton, Fitchburg, Deforest, Verona, Stoughton, McFarland, Mount Horeb, Cottage Grove, Shorewood Hills, Primrose, Roxbury, Vermont, Dunkirk, Deerfield, Black Earth, Cross Plains, Maple Bluff, Marshall, Blue Mounds" },
      { p: "For a free quote, use this form. Let’s make a difference together." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Madison Top Sights", items: [
      "Madison Museum of Contemporary Art",
      "Henry Vilas Zoo",
      "Olbrich Botanical Gardens",
      "Wisconsin State Capitol",
      "Madison Children's Museum",
      "University of Wisconsin–Madison Arboretum",
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
