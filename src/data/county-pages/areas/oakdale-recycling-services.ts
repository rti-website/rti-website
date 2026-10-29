import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Oakdale Recycling Service, /minnesota-recycling/washington-county/oakdale-recycling-services/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 11 May 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "in the Madison area" reads "in the Oakdale area".
 */
export const OAKDALE_RECYCLING_SERVICES: CountyPage = {
  url: "/minnesota-recycling/washington-county/oakdale-recycling-services/",
  state: "Minnesota",
  county: "Oakdale",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Recycling Service in Oakdale MN | Call (800) 969-5166",
    description: "Recycling service in Oakdale MN supporting drop-off and pickup for electronics, batteries, lighting waste, and approved items. Call (800) 969-5166",
  },
  hero: {
    h1: "Oakdale Recycling Service",
    crumb: "Oakdale Recycling Service",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Oakdale Recycling Service",
    blocks: [
      { p: "We hoard trash at a faster pace. It becomes a nuisance for us if we do not dispose of it properly. Landing in landfills will result in dire consequences that we are not ready for. To prevent this, your best action is to recycle them as soon as possible. Companies and businesses need to recycle because they become an issue. The state isn’t lenient when it comes to the environment. They can impose heavy fines if you do not dispose of your trash properly. To avoid this, you can rely on RT Inc for recycling needs. We provide pickup services for your items. You can use this [form](pickup). We can assure you that we are perfect data destructors. Our recycling centers are fully certified by both EPA and NAID. We have been doing this for more than 30 years. We have been doing this since VHS was still in the market. So, we know a thing or two about how to recycle." },
      { h: "Here are all the locations we provide services for:" },
      { p: "Hugo, Afton, Stillwater, Bayport, Cottage Grove, Scandia, Mahtomedi, Newport, Pine Springs, Marine on Saint Croix, Grant, Saint Paul Park, Landfall, Lakeland, Oak Park Heights, Dellwood" },
      { p: "Recycling has become a passion for us. The rise in global warming and the sudden change of climate are several reasons why we should do more. We hoard more electronics, and our electronic waste is off the scale. This may lead to an environmental catastrophe that we won’t be able to reverse. We still have a chance to make a difference. For a free quote, use this [form](pickup). Pickups are exclusive for businesses only" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Oakdale Top Sights", items: [
      "Gateway State Trail",
      "Maplewood Nature Center",
      "Tanners Lake",
      "Snake Discovery: A Reptile Experience",
      "Battle Creek Regional Park",
      "Lake Phalen",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "We serve residents and businesses in the Oakdale area.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
