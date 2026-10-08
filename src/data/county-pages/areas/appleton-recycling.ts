import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Appleton Recycling, /wisconsin-recycling/calumet-county/appleton-recycling/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333. The old WordPress page's copy word for word
 * (15 Sep 2026 backup); its H1 "Appleton Recycling, Wi" reads ", WI".
 */
export const APPLETON_RECYCLING: CountyPage = {
  url: "/wisconsin-recycling/calumet-county/appleton-recycling/",
  state: "Wisconsin",
  county: "Appleton",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Resource Recycling Appleton WI | Call (800) 969-5166',
    description: "Resource recycling Appleton WI accepting electronics, spent lighting, varied battery types, paper loads, and approved discards through scheduled drop-off. Call (800) 969-5166",
  },
  hero: {
    h1: 'Appleton Recycling, WI',
    crumb: "Appleton Recycling",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Appleton Recycling Center",
    blocks: [
      { p: "The amount of trash we own, gives a new meaning to the term hoarders. We perceive that these unwanted items might have some value. But the truth is, not anymore. The moment we realize this, the unwanted items have done the damage. Their toxins have started to do their thing to our health and our surroundings. We throw them in the trash to get rid of them. The next thing we know is, the state is imposing fines on us for our actions." },
      { p: "Why go to all this trouble when you can contact Recycle Technologies? The items we accept at our recycling center are below. We are more than happy to take your unwanted items off your hands." },
      { p: "Commercial Businesses can benefit from employing us. We provide pickup services which you can access by filling out [this form](pickup). We are EPA and NAID certified, which ensures that your trash will be handled by professionals and not by garbage men. Our recycling centers provide guaranteed data destruction solutions with DOD guidelines in place. So, if you want to get your unwanted items disposed of safely and securely. Call Recycle Technologies. You can reach us at +1 262-798-3040. For a free quote, use this [form](quote). Save money and save time." },
      { h: "Here are all the locations where businesses are using us for their recycling needs:" },
      { p: "Chilton, Hilbert, Potter, New Holstein, Sherwood, Forest Junction, Winnebago County, Harrison, Calumet County, Stockbridge, Wells" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Appleton Top Sights", items: [
      "Burial Chamber Haunted House Complex",
      "Henry Vilas Zoo",
      "Appleton Downtown, Inc.",
      "Gordon Bubolz Nature Preserve",
      "Funset Boulevard",
      "Erb Park",
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
