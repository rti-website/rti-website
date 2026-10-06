import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/*
 * NOT BUILT SINCE 6 OCT 2026. This URL 301s to /wisconsin-recycling/milwaukee/
 * (the SEO team's redirect plan, data/url-map.csv) and the page is out of
 * AREA_PAGES, the directory and Admin -> Pages. The copy stays here only as
 * the source for anything that still has to move into the kept page.
 */
/**
 * Electronics Recycling Milwaukee, WI, /wisconsin-recycling/electronics-recycling-milwaukee/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7063:4317, phone 7063:5083 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const ELECTRONICS_RECYCLING_MILWAUKEE: CountyPage = {
  url: "/wisconsin-recycling/electronics-recycling-milwaukee/",
  state: "Wisconsin",
  county: "Milwaukee",
  figma: { board: "7063:4317", phone: "7063:5083" },
  seo: {
    title: 'Milwaukee, WI Recycling: Electronics, Batteries & Bulbs',
    description: "Electronics recycling Milwaukee WI managing computers, screens, servers, office equipment, and retired devices through structured recovery. Call (800) 969-5166",
  },
  hero: {
    h1: 'Electronics Recycling in Milwaukee, WI',
    crumb: "Electronics Recycling Milwaukee, WI",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Milwaukee Electronics Recycling",
    blocks: [
      { p: "We hoard more electronic trash than we dispose of. In truth, we are harming the environment more than we are led to believe. By throwing it in the bin, we risk getting fined. To avoid this, your only choice is proper disposal. Recycle Technologies can help you do just that." },
      { p: "By properly recycling waste, you can reduce the risk of toxic chemicals. You can make an impact by either dropping off your electronic waste at the recycling center or opting yourself in for our mail-in program. The items we accept at our recycling centers may vary from what we allow in the mail-in program. To learn which items we accept in the mail-in program, Call us at +1 262-798-3040. Our team will gladly inform you which items are safe to transport." },
      { p: "Our recycling services also extend to commercial businesses as well. We provide Pickup Facility For Commercial Clients only. You can fill out [this form](pickup) to request a pickup for your electronic trash. Recycle Technologies Inc. is a certified Solid and Hazardous Waste Transporter. We are certified by both EPA and NAID. Our data destruction solutions align with DOD guidelines." },
      { h: "Recycling Locations" },
      { p: "Below are all the locations where Recycle Technologies provides recycling Services:" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Milwaukee Top Sights", items: [
      "Milwaukee Art Museum",
      "Milwaukee Public Museum",
      "Lakefront Brewery",
      "Basilica of Saint Josaphat",
      "Mitchell Park Domes",
      "Discovery World",
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
