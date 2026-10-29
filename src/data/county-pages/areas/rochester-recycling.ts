import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Rochester Recycling Center, /minnesota-recycling/olmsted-county/rochester-recycling/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 16 Apr 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "Madison Top Sights" reads "Rochester Top Sights".
 */
export const ROCHESTER_RECYCLING: CountyPage = {
  url: "/minnesota-recycling/olmsted-county/rochester-recycling/",
  state: "Minnesota",
  county: "Rochester",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Shredding Service in Rochester | Call (800) 969-5166",
    description: "Shredding service Rochester for files, folders, binders, and archived paperwork, destroyed through scheduled processing with documented completion. Call (800) 969-5166.",
  },
  hero: {
    h1: "Rochester Recycling Center",
    crumb: "Rochester Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Rochester Recycling",
    blocks: [
      { p: "Rochester is one of the many cities where we provide recycling services. Rochesterians can use the service by dropping their unwanted items at our recycling center. Please check which items we accept at our recycling center by scrolling below. Use +1-763-559-5130 for a free quote. Government Agencies, Businesses, and Companies can also rely on our services. We provide guaranteed Data Destruction at our recycling centers. You can rest assured that your sensitive data is purged properly. We are AAA NAID-certified recycler for Data Destruction. Recycle Technologies Inc is a State Contracted EPA Certified Recycler. Our 100-mile coverage allows us to cater to locations where recycling is non-existent. Our goal is to reduce our carbon footprint and mine fewer virgin resources. With your cooperation, we can turn the tide. You can use the numbers listed below to learn how you can make a difference." },
      { h: "Here is a List of locations we are available for recycling:" },
      { p: "Anoka, Andover, Lino Lakes, Coon Rapids, Fridley, East Bethel, Blaine, Ham Lake, Columbus, Bethel, Lexington, Ramsey, Centerville, Oak Grove, Circle Pines, Saint Francis" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Rochester Top Sights", items: [
      "Quarry Hill Nature Center",
      "Rochester Art Center",
      "Plummer",
      "Douglas State Trail",
      "Oxbow Park & Zollman Zoo",
      "Chester Woods Park",
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
