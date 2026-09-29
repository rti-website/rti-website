import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Oak Creek Recycling Center, /wisconsin-recycling/milwaukee/oak-creek/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7063:5721, phone 7063:6851 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const OAK_CREEK: CountyPage = {
  url: "/wisconsin-recycling/milwaukee/oak-creek/",
  state: "Wisconsin",
  county: "Oak Creek",
  figma: { board: "7063:5721", phone: "7063:6851" },
  seo: {
    title: "Recycling Center in Oak Creek | Call (800) 969-5166",
    description: "Recycling center Oak Creek handling printers, switches, power adapters, lamps, and mixed electronics, accepted through documented intake and processing steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Oak Creek Recycling Center",
    crumb: "Oak Creek Recycling Center",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Recycling Center shredding Oak Creek",
    blocks: [
      { p: "The amount of trash in our homes is staggering. Our backyards and attics are littered with things we don’t want. Getting rid of them is as a nuisance as owning them. We know the state will call once we throw them in the trash. Our situation might seem bleak, but we can bring the light with Recycle Technologies. Below are the items we allow at our recycling center," },
      { p: "Commercial businesses of all sizes are always looking for ways to cut costs. Let Recycle Technologies reduce your unwanted items overhead." },
      { p: "Waiting around will only make things much worse. For you, we also provide pickup services. You can schedule one using this . Recycle Technologies is a Certified Recycler in the Midwest. All our recycling centers are certified by both state and federal agencies such as EPA. For more than 30 years, we have been giving businesses solutions to remain green." },
      { p: "Our Data Destruction solutions are on demand, and we follow DOD guidelines. Use [this form](quote) to get a free quote on how we reduce your costs. The recycling and reclamation process helps you reduce your reliance on natural resources. We should stop talking about it and start doing it. Actions speak louder than words. And global warming is only getting worse. Here is a list of locations we provide recycling services:" },
      { p: "To schedule us for services, you can get hold of us at +1 262-798-3040." },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Dakota County Top Sights", items: [
      "Whitnall Park",
      "Grant Park Beach",
      "Lake Vista Park",
      "Cupertino Park",
      "Root River Parkway",
      "Bender Park",
    ] },
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
