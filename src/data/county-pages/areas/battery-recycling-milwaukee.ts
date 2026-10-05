import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Non-Hazardous Battery Recycling Milwaukee, /wisconsin-recycling/battery-recycling-milwaukee/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7061:6297, phone 7061:7050 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const BATTERY_RECYCLING_MILWAUKEE: CountyPage = {
  url: "/wisconsin-recycling/battery-recycling-milwaukee/",
  state: "Wisconsin",
  county: "Milwaukee",
  service: "Battery Recycling",
  figma: { board: "7061:6297", phone: "7061:7050" },
  seo: {
    title: 'Battery Recycling in Milwaukee, WI | Recycle Technologies',
    description: "Non-hazardous battery recycling Milwaukee for dry cells, sealed units, backup packs, and consumer batteries accepted through organized recovery. Call (800) 969-5166",
  },
  hero: {
    h1: 'Battery Recycling in Milwaukee, WI',
    crumb: "Non-Hazardous Battery Recycling Milwaukee",
    lead: "Take the burden off your shoulders by getting reliable battery recycling services in Milwaukee from your trusted local partner.",
    h1Width: 1306,
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Green Solutions for Battery Disposal in shredding Milwaukee",
    blocks: [
      { p: "If you are wondering what is the right way of discarding a pile of old and damaged batteries? Our battery recycling services in Milwaukee is the answer for you. Recycle Technologies understands how hazardous batteries can be to your health and the environment if not handled carefully. Keeping that in mind, we offer you biodegradable and appropriate battery recycling solutions for all kinds of batteries to our clients in Milwaukee. The team at Recycle Technologies uses the latest battery recycling practices that guarantee minimum impact on the planet." },
      { h: "Save the Environment with Milwaukee Battery Disposal Services" },
      { p: "Batteries are made up of toxic materials such as lithium, mercury, lead, and cadmium. These elements when exposed to landfills become a threat to the ecosystem and the living organisms living in it. The motto of Recycle Technologies is to prevent that from happening through our efficient battery recycling in Milwaukee. We offer battery recycling services where we take used and damaged batteries from your location and discard them safely in our facilities. With Recycle Technologies, you don’t have to fuss about the legal and ecological concerns of the battery disposal process. Play your role in saving the planet by calling us at +1 262-798-3040" },
    ],
  },
  servicesHeading: "Recycling Options",
  sections: [
    { kind: 'features', cards: [
      { title: "Biodegradable Solutionsx", text: "Our battery recycling methods comply with strict environmental guidelines to ensure the ecological disposal of your batteries. At Recycle Technologies, we care about your problems as well as the problems our planet is facing due to unrecycled electronic waste." },
      { title: "Pick up Services", text: "We make things easier for our clients by providing them pick-up services for the recycling materials. All you have to do is fill out a form or give us a call at +1 262-7983040 and our team will take the batteries from you to dispose of properly." },
      { title: "Legal Assurance", text: "Our well-trained and professional team stays up to date with the changing rules and regulations regarding the Green Bay battery disposal procedures. This helps us comply with the legal protocols of battery recycling." },
      { title: "Trustworthy and Reliable", text: "For batteries of all types and sizes, you can rely on Recycle Technologies for affordable and reliable services. We offer all-in-one solutions for battery recycling in Green Bay for our valuable clients." },
    ] },
    { kind: 'text', heading: "Battery Disposal Services in Milwaukee", blocks: [
      { p: "Searching for Battery Disposal Services in Milwaukee? Recycle Technologies is here to make battery disposal easy and profitable for you. With our latest and environmentally-responsible recycling procedures, you can always count on us. Our efficient team is here to assist you anytime any day." },
      { p: "All you got to do is fill out [the form](quote) to get a free quote or directly call us at +1 262-798-3040 and take a step towards a greener tomorrow." },
    ] },
  ],
}
