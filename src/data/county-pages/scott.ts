import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Scott County Recycling, /minnesota-recycling/scott-county/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7027:21105, phone 7027:21663 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const SCOTT: CountyPage = {
  url: '/minnesota-recycling/scott-county/',
  state: 'Minnesota',
  county: "Scott County",
  figma: { board: '7027:21105', phone: '7027:21663' },
  seo: {
    title: "Scott County Recycling | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Scott County, Minnesota: business pickup, drop-off at our Blaine facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Scott County Recycling",
    crumb: "Scott County Recycling",
    lead: "Scott County Recycling Providing reliable and certified electronics recycling services at individual and business levels",
    image: '/images/locations/county/scott.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Minnesota' }) },
  },
  about: {
    heading: "About Scott County Recycling",
    blocks: [
      { p: "A normal person cannot fathom how much trash is in his house. We desire things that enrich our lives. But the real danger starts when their usefulness ends. Disposing of trash in the curbside bin is a good idea. Unless you like paying fines. To avoid this, your best bet is to dispose of it responsibly. Recycle Technologies is here to aid you in doing that. The items we accept at our recycling center are below." },
      { p: "Commercial businesses and government agencies can also use our service to recycle responsibly. Exclusive to them, we provide pickup services as well. To schedule one right now, fill out [this form](quote). Recycle Technologies is an EPA and NAID-certified recycler. The certification enables us to offer data destruction services with DOD guidelines in place. Get in touch with Recycle Technologies for disposing of items safely and securely." },
      { p: "Here are all the locations we provide services:" },
    ],
  },
  features: [
    { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
    { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
    { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
    { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
  ],
  sights: {
    heading: "Scott County Top Sights",
    items: [
      "Valleyfair",
      "Mystic Lake Casino Hotel",
      "Little Six Casino",
      "Wild Thing",
      "Excalibur",
      "The Landing—Minnesota River Heritage Park",
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
