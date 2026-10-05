import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from './types'

/**
 * Dakota County Recycling Center, /minnesota-recycling/dakota-county/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7031:26237, phone 7031:26790 (29 Sep 2026).
 * The frame's copy word for word, except the corrections listed in
 * ./types.ts. The SEO title and description are the old WordPress page's
 * (15 Sep 2026 backup).
 */
export const DAKOTA: CountyPage = {
  url: '/minnesota-recycling/dakota-county/',
  state: 'Minnesota',
  county: "Dakota County",
  figma: { board: '7031:26237', phone: '7031:26790' },
  seo: {
    title: 'Dakota County, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center in Dakota County providing intake for e-waste, lighting waste, used batteries, paper streams, and controlled material processing. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Dakota County, MN',
    crumb: "Dakota County Recycling Center",
    lead: "Dakota County Recycling Center Recycle technologies is the one-stop solution to your recycling needs.",
    image: '/images/locations/county/dakota.png',
    imageTop: -372,
    phoneOverlay: 'rgba(0,0,0,0.3)',
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Dakota County Center Recycling",
    blocks: [
      { p: "Dakota is part of numerous counties where we provide recycling services. It is considered to be the 3rd most populous county in the state of Minnesota. This county is on the east of the state and is famous for its Vermilion Falls Park and Minnesota Zoo. The residents of Dakota County can use our recycling services with ease." },
      { p: "Our State of art recycling center can cater to all your recycling needs. Please make sure to check what items we accept at our recycling center. Government Agencies, Companies, and Businesses can also rely on our services. You can request a pickup [using this form here](quote). For a free quote, you can contact us at +1-763-559-5130." },
      { p: "Recycle Technologies has been the pinnacle in providing recycling services. We are an EPA-certified Recycler. Our recycling center's 100-mile coverage area allows us to reach places where recycling is non-existent. Recycling helps reduce carbon emissions and reclaim rare earth resources." },
      { p: "Let's work together and make the future for our children greener." },
      { p: "Here are all the places in the county where we provide service to. You can always contact us to schedule services in your area. For a free quote, you can [use this form](quote). Pickups are exclusive to commercial businesses." },
    ],
  },
  items: { heading: "Items We Accept" },
  sights: {
    heading: "Dakota County Top Sights",
    items: [
      "Lebanon Hills Regional Park",
      "Vermillion Falls Park",
      "Buck Hill",
      "Lebanon Hills Visitor Center",
      "Minneapolis Institute of Art",
      "Cascade Bay Water Park",
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
