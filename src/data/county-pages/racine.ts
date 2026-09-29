import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Racine County Recycling Center, /wisconsin-recycling/racine/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7023:16677, phone 7023:17216 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const RACINE: CountyPage = {
  url: '/wisconsin-recycling/racine/',
  state: 'Wisconsin',
  county: "Racine County",
  figma: { board: '7023:16677', phone: '7023:17216' },
  seo: {
    title: "Racine County Recycling Center | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Racine County, Wisconsin: business pickup, drop-off at our New Berlin facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Racine County Recycling Center",
    crumb: "Racine County Recycling Center",
    lead: "Racine County Recycling Center. Recycle Technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/racine.png',
    imageTop: -372,
    phoneOverlay: 'rgba(22,22,22,0.3)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Wisconsin' }) },
  },
  about: {
    heading: "About Racine County Recycling Center",
    blocks: [
      { p: "Racine County is located in southeastern Wisconsin. The county is famous for its bakery items. Kringle and Danish Pastries are why Racine County is famous. Racine is a French word for root." },
      { p: "We do provide recycling services in this county. All items that we accept at our recycling center are listed below." },
      { p: "Commercial and Government agencies can get in contact with us for recycling needs. We provide data destruction and device disposal services. We adhere to DOD guidelines when disposing of sensitive data. RTi is an EPA and AAA Certified Recycling company." },
      { p: "Wisconsin state mandates that residents dispose of electronics and appliances themselves. State landfills do not allow these items. We like to take this opportunity to recycle your items responsibly. Recycling helps us to reduce waste and reclaim spent resources. This helps us rely less on natural resources and more on reclamation." },
      { p: "Here is a list of locations we provide recycling services:" },
    ],
  },
  items: { heading: "ITEMS WE ACCEPT" },
  sights: {
    heading: "Racine County Top Sights",
    items: [
      "Racine Zoo",
      "Racine North Beach",
      "Downtown Racine Corporation",
      "Windpoint Lighthouse",
      "Racine Art Museum",
      "Petrifying Springs Park",
    ],
  },
  company: {
    name: "Recycle Technologies",
    text: "Recycle Technologies Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
