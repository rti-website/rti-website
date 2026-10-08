import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Fond du Lac Recycling Service, /wisconsin-recycling/fond-du-lac-recycling/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333. The old WordPress page's copy word for word
 * (15 Sep 2026 backup), except: its Top Sights heading read "Benton County
 * Top Sights" over Fond du Lac's sights, so it says Fond du Lac.
 */
export const FOND_DU_LAC_RECYCLING: CountyPage = {
  url: "/wisconsin-recycling/fond-du-lac-recycling/",
  state: "Wisconsin",
  county: "Fond du Lac",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Fond du Lac Recycling Service | Call (800) 969-5166',
    description: "Fond du Lac recycling service for electronics, batteries, light bulbs, paper, and more. Call (800) 969-5166 for recycling today.",
  },
  hero: {
    h1: 'Fond du Lac Recycling Service',
    crumb: "Fond du Lac Recycling Service",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Recycling Service in Fond du Lac",
    blocks: [
      { p: "We stockpile unwanted items like they have some value. But that is not the case. Any electronics when they have surpassed their usefulness become a hunk of junk. They start to decay and release toxic chemicals that are hazardous to you and your family. So why wait for this to pass? You know that throwing these items in the trash may result in fines. Your job requires you to dispose of them, and Recycle Technologies is here to provide the solutions." },
      { p: "For commercial businesses, we provide the above services and more. To dispose of their unwanted items, properly, we offer them a pickup service. You can schedule one by filling out this [form](pickup). Recycle Technologies is a certified Solid and Hazardous Waste transporter. Our recycling centers are certified by both EPA and NAID. The latter suggests that we follow DOD guidelines when providing data destruction services." },
      { p: "Our free quote enables you to estimate what will be the cost of this endeavor. Keep in mind, it will be much more workable than anyone else in the market. For more than 30 years, we have been at the forefront of reducing carbon emissions and the reclamation process. We believe that by working together, we can make a difference." },
      { h: "Here is the list of location where Recycle Technologies provide solutions:" },
      { p: "Oakfield, Saint Cloud, Brandon, Eden, Campbell Sport, Rosendale, Eldorado, Fairwater, Van Dyne, Ripon" },
      { p: "You can reach us at +1 262-798-3040." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Schedule", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Fond du Lac Top Sights", items: [
      "Lakeside Park",
      "Children's Museum of Fond du Lac",
      "Thelma Sadoff Center For the Arts",
      "Fond du Lac County Historical Society - Galloway House & Village",
      "Fondy Aqua Park",
      "Lakeside Park Lighthouse",
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
