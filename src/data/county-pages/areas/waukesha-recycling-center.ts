import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/*
 * NOT BUILT SINCE 6 OCT 2026. This URL 301s to /wisconsin-recycling/waukesha-electronic-recycling/
 * (the SEO team's redirect plan, data/url-map.csv) and the page is out of
 * AREA_PAGES, the directory and Admin -> Pages. The copy stays here only as
 * the source for anything that still has to move into the kept page.
 */
/**
 * Waukesha Recycling Center, /wisconsin-recycling/waukesha-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7061:4179, phone 7061:5273 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const WAUKESHA_RECYCLING_CENTER: CountyPage = {
  url: "/wisconsin-recycling/waukesha-recycling-center/",
  state: "Wisconsin",
  county: "Waukesha",
  figma: { board: "7061:4179", phone: "7061:5273" },
  seo: {
    title: 'Waukesha, WI Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center Waukesha providing intake for electronics, lamps, batteries, devices, and records, processed under approved handling steps. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Waukesha, WI',
    crumb: "Waukesha Recycling Center",
    lead: "Recycling in Waukesha, we provide our service here as well.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Waukesha Recycling Center",
    blocks: [
      { p: "If you are looking for the best recycling service in Waukesha County, then our Waukesha Recycling Center in New Berlin is a perfect choice. Recycle Technologies Inc provides safe electronic waste recycling and secure data destruction. We offer an array of commercial, industrial, and residential services. As the pioneer of recycling, We pride ourselves on our customer support and our goal to reduce carbon emissions. We believe that the challenge of electronic waste is trivial. But with your help, we can make a difference by making a green future for our children. Use [this form](quote) to get a free quote from us." },
      { p: "Here is a list of cities we provide recycling services:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Recycling in Waukesha, we provide our service here as well.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
