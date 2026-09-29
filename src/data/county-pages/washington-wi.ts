import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Washington County Recycling Center, WI, /wisconsin-recycling/washington-county-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7020:15552, phone 7020:16107 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const WASHINGTON_WI: CountyPage = {
  url: '/wisconsin-recycling/washington-county-recycling-center/',
  state: 'Wisconsin',
  county: "Washington County",
  figma: { board: '7020:15552', phone: '7020:16107' },
  seo: {
    title: "Washington County Recycling Center, WI | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Washington County, Wisconsin: business pickup, drop-off at our New Berlin facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Washington County Recycling Center, WI",
    crumb: "Washington County Recycling Center, WI",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/washington-wi.png',
    imageTop: -389,
    overlay: 'rgba(32,32,32,0.4)',
    phoneOverlay: 'rgba(0,0,0,0.4)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Wisconsin' }) },
  },
  about: {
    heading: "About Washington County in Recycling",
    blocks: [
      { p: "We hoard a lot of trash. The amount of electronic waste is too much to count. Before they become an issue for us, it is best to get rid of them. Throwing them in the trash might lead to fines. Your only solution is to recycle them. Recycle Technologies does provide services in your area, and we will gladly take them off your hands." },
      { p: "All items that we accept at our recycling center are listed below." },
      { p: "We also provide these services for business sectors. You can request a pickup for your trash [using this form](quote). The pickup facility is exclusive to you. Our Modern Recycling Centers are fully capable of handling your high load. That is not all, as our recycling centers are EPA and NAID-certified. Recycling is not a job for us, but a passion for us. From VHS to HDD, we have recycled it all." },
      { p: "For a free quote, you can [use this form](quote). Pickups are exclusive to commercial businesses. Here are all the locations where we provide recycling services:" },
    ],
  },
  items: { heading: "ITEMS WE ACCEPT" },
  sights: {
    heading: "Washington County Top Sights",
    items: [
      "Kettle Moraine State Forest",
      "Holy Hill - Basilica and National Shrine of Mary Help of Christians",
      "Erin Hills Golf Course",
      "Little Switzerland Ski Area",
      "Kettle Moraine State Forest - Pike Lake Unit",
      "Museum of Wisconsin Art",
    ],
  },
  company: {
    name: "Recycle Technologies",
    text: "Recycle Technologies provides reliable and certified electronics recycling services for individuals and businesses.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
