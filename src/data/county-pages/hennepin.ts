import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Hennepin County Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7031:25103, phone 7031:25662 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const HENNEPIN: CountyPage = {
  url: '/minnesota-recycling/hennepin-county-recycling-center/',
  state: 'Minnesota',
  county: "Hennepin County",
  figma: { board: '7031:25103', phone: '7031:25662' },
  seo: {
    title: "Hennepin County Recycling Center | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Hennepin County, Minnesota: business pickup, drop-off at our Blaine facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Hennepin County Recycling Center",
    crumb: "Hennepin County Recycling Center",
    lead: "Hennepin County Recycling Center Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/hennepin.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Minnesota' }) },
  },
  about: {
    heading: "About Hennepin County Recycling Center",
    blocks: [
      { p: "Recycle Technologies Inc. proudly serves Hennepin County, offering comprehensive recycling services for residents, businesses, and government organizations." },
      { h: "Our Services" },
      { list: [
        { title: "Residential Recycling", text: "We uphold and advocate for a safe and eco-friendly disposal of household waste across many states in the USA." },
        { title: "Corporate and Commercial Recycling", text: "We provide tailored solutions for commercial and government sectors, including bulk item pickups for specialized locations. Easy Pickup Scheduling You can request a bulk item pickup via our simple online form, and we'll handle the rest." },
        { title: "Certified and Secure", text: "As an EPA-certified AAA NAID provider, we follow strict DOD and EPA guidelines for secure disposal, guaranteeing the destruction of sensitive data." },
      ] },
      { h: "Why Choose Us?" },
      { p: "EPA and AAA NAID Certified: Ensuring top recycling and data destruction standards. Convenient Pickups: Easy scheduling for hassle-free service. Comprehensive Solutions: Serving residential and corporate clients. Trust Recycle Technologies Inc. for all your recycling needs in Hennepin County. Contact us today to schedule a pickup and help make our environment cleaner and safer." },
      { p: "For us, recycling is a passion. Since 1993 we have been leading the fight to curb carbon emissions, so the future for our children remains greener. That is why we recycle items, so we can reclaim the spent resources. This helps us to rely less on virgin resources and use the ones we have reclaimed. Recycle Technologies guarantees that no waste will ever enter a state-controlled landfill. For any queries or suggestions, feel free to contact us at +1-763-559-5130." },
    ],
  },
  items: { heading: "Items We Accept" },
  sights: {
    heading: "Hennepin County Top Sights",
    items: [
      "Mall of America®",
      "SEA LIFE at Mall of America",
      "Spoonbridge and Cherry",
      "Minnesota Valley National Wildlife Refuge—Bloomington Education and Visitor Center",
      "Basilica of Saint Mary",
      "Minnehaha Regional Park",
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
