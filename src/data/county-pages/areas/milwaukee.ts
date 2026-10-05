import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Recycling Center in Milwaukee, /wisconsin-recycling/milwaukee/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7060:6298, phone 7060:7393 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const MILWAUKEE: CountyPage = {
  url: "/wisconsin-recycling/milwaukee/",
  state: "Wisconsin",
  county: "Milwaukee",
  figma: { board: "7060:6298", phone: "7060:7393" },
  seo: {
    title: 'Milwaukee, WI Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center Milwaukee coordinating drop-off and collection for electronics, lighting units, assorted batteries, paper stock, and approved items. Call (800) 969-5166",
  },
  hero: {
    h1: 'Electronics Recycling in Milwaukee, WI',
    crumb: "Recycling Center in Milwaukee",
    lead: "Let’s revolutionize the way you dispose of your electronic waste with Recycle Technologies.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Recycling Center in Milwaukee",
    blocks: [
      { p: "Recycle Technologies Inc does cater to Residents of Milwaukee. You can use our drop-off facility to dispose of any unwanted items. Or you can opt into . The program allows you to send your unwanted items to us. The only thing we require from you is to package your unwanted items. So, they are safe for transport. A certificate of recycling will be sent to you once the job is completed. Please review what items we accept in our recycling center below. If you want a free quote, you can call us at or ." },
      { p: "Private businesses, Government agencies, and other businesses can rely on us for recycling. We are certified by both EPA and NAID. This enables us to provide you with Data Destruction services that coincide with DOD guidelines. Recycle Technologies Inc is a Certified Solid and Hazard Waste Recycler. We have been providing recycling services for more than 30 years. We have been fighting the good fight against carbon emissions." },
      { p: "Here is a list of locations we provide recycling services:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
  ],
  company: {
    name: "Recycle Technologies",
    text: "We serve residents and businesses in the Madison area",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
