import { quoteHref } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Ramsey Recycling, /minnesota-recycling/ramsey/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7031:22236, phone 7031:22581 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are ours: the frames give none
 * and the old WordPress page left none on record.
 */
export const RAMSEY: CountyPage = {
  url: '/minnesota-recycling/ramsey/',
  state: 'Minnesota',
  county: "Ramsey County",
  figma: { board: '7031:22236', phone: '7031:22581' },
  seo: {
    title: "Ramsey Recycling Center, MN | Recycle Technologies",
    description: "Electronics, light bulb and battery recycling in Ramsey County, Minnesota: business pickup, drop-off at our Blaine facility and mail-in recycling since 1993.",
  },
  hero: {
    h1: "Ramsey Recycling",
    crumb: "Ramsey Recycling",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/ramsey.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: quoteHref({ location: 'Minnesota' }) },
  },
  about: {
    heading: "About Ramsey Recycling Center MN",
    blocks: [
      { p: "Ramsey County falls under our 100-mile service area. You can avail our services by dropping off the items that you want to recycle. We have a drop-off facility that allows you to do that. On top of that, we also have a mail-in program that allows you to send your item for recycling via courier. We only require you to put your items in packaging, so they are safe for transport." },
      { p: "We will send you the shipping tags. When the recycling is completed will send you the certificate for recycling. This protects you from improper disposal. You can call us at +1 763-559-5130 or [Fill out this Form](quote) to get a free quote. Government Agencies, Businesses, and Companies can rely on our services. We are AAA NAID Certified. You can [use this form](quote) to request a pickup. Pickup available for commercial clients only" },
      { p: "Recycle Technologies is an EPA Certified Recycler in the Midwest. We provide above-and-beyond services for you. Our belief is proper disposal is the only way to fight climate change. Recycling helps reduce the build-up of our carbon footprint. We mine fewer natural resources and instead reclaim them through recycling. Here is a list of locations we provide services to:" },
    ],
  },
  items: { heading: "Items We Accept" },
  company: {
    name: "Recycle Technologies",
    text: "Recycle Technologies Providing certified recycling services to individuals and businesses.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
