import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Electronic Recycling in Rochester, /electronics-recycling-in-minneapolis/electronic-recycling-in-rochester/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 13 Jul 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const ELECTRONIC_RECYCLING_IN_ROCHESTER: CountyPage = {
  url: "/electronics-recycling-in-minneapolis/electronic-recycling-in-rochester/",
  state: "Minnesota",
  county: "Rochester",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronic Recycling in Rochester | Call (800) 969-5166",
    description: "Electronic recycling Rochester for laptops, servers, networking gear, circuit boards, and peripherals, received through controlled intake and approved processing steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Electronic Recycling in Rochester",
    crumb: "Electronic Recycling in Rochester",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "About Rochester Electronic Recycling",
    blocks: [
      { p: "Electronic waste or E-waste is the most common waste present in our homes and offices today. A recent Consumer Electronics Association report stipulates that we have at least 28 electronic products. These electronic goods can be a challenge to get rid of because how local waste disposal has banned electronic goods. These goods are extremely toxic. That is where Recycle Technologies come into play. We provide sustainable Electronic [Recycling in Rochester](/shredding-minnesota/rochester/). Our State-of-the-Art recycling center in Blaine, Minnesota can easily cater to your recycling needs. Residents and businesses can avail of our services to recycle their electronic goods responsibly. You can visit our facility to recycle or Opt-in to our mail-in program. Companies and Businesses can request a pickup for their recycling." },
      { h: "Why Recycle Technologies is the best Recycler in the Midwest?" },
      { p: "At Recycle Technologies, we understand that throwing your e-waste into a landfill is not a good option. That is why we recycle all electronic goods at our state-of-the-art facility. We reclaim the raw materials and discard the toxic materials responsibly. Having an in-depth recycling process ensures that your electronic waste doesn’t end up polluting the environment or being a health hazard to the community. If you have any electronic goods that you feel have no longer useful, get in contact with us today for reliable Electronic Recycling in Rochester." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Our Process", blocks: [
      { p: "The importance of recycling has become crucial. We thrive on electronic goods to make our lives easier. Technology has become an integral part of our life. At a high rate gadgets of Yesteryear are becoming obsolete. Moreover, it is much easier to buy a new device than to repair one as the lifespan of these electronic goods is shorter. Electronics have become a necessity instead of a luxury. Recycle Technologies helps reclaim raw materials that house these electronic goods. Our process helps separate toxic elements and useful components. With proper disposal, these toxic elements are gone forever whereas the useful elements are reclaimed." },
      { h2: "Why Choose Recycle Technologies for Electronic Recycling in Rochester?" },
      { p: "Hiring a responsible and reliable recycler is one of the most important things to do. You need to make sure that all your junk is properly recycled and disposed of. You want someone that makes sure that has precedence for keeping the environment clean. That is where Recycle Technologies excels at. For more than 30 years we have done our part of protecting the environment and the community. By recycling responsibly we are on the path to greatness. Our recycling specialists are on hand to provide you with all the necessary advice on how to recycle properly. Our team is available 24/7 for feedback and suggestion you might have." },
    ] },
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Rochester Top Sights", items: [
      "Quarry Hill Nature Center",
      "Rochester Art Center",
      "Apache Mall",
      "Plummer House",
      "Mayo Field",
      "LTS Brewing Company",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing certified recycling services to individuals and businesses.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
