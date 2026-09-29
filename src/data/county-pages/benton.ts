import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Benton County Recycling, /minnesota-recycling/benton-county-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7037:27359, phone 7037:27902 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const BENTON: CountyPage = {
  url: '/minnesota-recycling/benton-county-recycling/',
  state: 'Minnesota',
  county: "Benton County",
  figma: { board: '7037:27359', phone: '7037:27902' },
  seo: {
    title: "Benton County Recycling | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Benton County, Minnesota: business pickup, drop-off at our Blaine facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Benton County Recycling",
    crumb: "Benton County Recycling",
    lead: "Benton County Recycling provides reliable and certified electronics recycling services at individual and business levels",
    image: '/images/locations/county/benton.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Minnesota' }) },
  },
  about: {
    heading: "About Benton County shredding Recycling",
    blocks: [
      { p: "We amass more trash than you can imagine. We assume that the materials are biodegradable. Likewise, we are so wrong. The only way to dispose of electronic waste is to dispose of it. The state bans us from throwing them in the trash. So, the best way to dispose of them is to recycle them. Recycle Technologies Inc. is here to help." },
      { p: "All items we accept in the recycling center are below. To confirm, you can contact us at +1 763-559-5130. The state leaves no ground untouched when they find that companies and businesses are not following disposal policies. To avoid this, your best bet is to call Recycle Technologies." },
      { p: "Using our pickup service, you can dispose of unwanted waste in no time. To avail of the above opportunity, [use this form](quote). All items are secured using load bars and straps. Our recycling centers are certified by both the EPA and NAID." },
      { p: "We guarantee no waste will ever land in a landfill. Our DOD guidelines help us responsibly dispose of sensitive data. For a free quote, [click here](quote)." },
      { p: "Here is the list of all the locations where Recycling Technologies caters: Business Pick-Up Service" },
    ],
  },
  features: [
    { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades, we have provided safe and secure services." },
    { title: "Schedule", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
    { title: "Recycling Options", text: "You can visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
    { title: "Fully Certified", text: "We are an AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota. We provide recycling service in a coverage area of 100 miles." },
  ],
  sights: {
    heading: "Benton County Top Sights",
    items: [
      "Siuslaw National Forest Supervisor’s Office",
      "Marys Peak",
      "Alsea Falls",
      "Green Peak Falls",
      "McDonald-Dunn Forest",
      "Riverfront Commemorative Park",
    ],
  },
  company: {
    name: "Recycle Technologies",
    text: "Recycle Technologies provides reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
