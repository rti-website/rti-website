import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Battery Recycling Duluth, /minnesota-recycling/battery-recycling-duluth/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 6 Mar 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "Solutionsx" reads "Solutions".
 *   "the Green Bay battery disposal" reads "the Duluth battery disposal".
 *   "battery recycling in Green Bay" reads "battery recycling in Duluth".
 */
export const BATTERY_RECYCLING_DULUTH: CountyPage = {
  url: "/minnesota-recycling/battery-recycling-duluth/",
  state: "Minnesota",
  county: "Duluth",
  service: "Battery Recycling",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Battery Recycling in Duluth | Call (800) 969-5166",
    description: "Battery recycling Duluth for alkaline AA/AAA cells, lithium primary batteries, nickel metal hydride packs, and coin batteries, accepted for proper processing. Call (800) 969-5166.",
  },
  hero: {
    h1: "Battery Recycling Duluth",
    crumb: "Battery Recycling Duluth",
    lead: "Take the burden off your shoulders by getting reliable battery recycling services in Duluth from your trusted local partner.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Green Solutions for Battery Disposal in Duluth",
    blocks: [
      { p: "If you are wondering what is the right way of discarding a pile of old and damaged batteries? Our [battery recycling](/battery-recycling/) services in Duluth is the answer for you. Recycle Technologies understands how hazardous batteries can be to your health and the environment if not handled carefully. Keeping that in mind, we offer you biodegradable and appropriate battery recycling solutions for all kinds of batteries to our clients in Duluth. The team at Recycle Technologies uses the latest battery recycling practices that guarantee minimum impact on the planet." },
      { h: "Save the Environment with Duluth Battery Disposal Services" },
      { p: "Batteries are made up of toxic materials such as lithium, mercury, lead, and cadmium. These elements when exposed to landfills become a threat to the ecosystem and the living organisms living in it. The motto of Recycle Technologies is to prevent that from happening through our efficient battery recycling in Duluth. We offer battery recycling services where we take used and damaged batteries from your location and discard them safely in our facilities. With Recycle Technologies, you don’t have to fuss about the legal and ecological concerns of the battery disposal process. Play your role in saving the planet by calling us at +1 763-559-5130" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Biodegradable Solutions", text: "Our battery recycling methods comply with strict environmental guidelines to ensure the ecological disposal of your batteries. At Recycle Technologies, we care about your problems as well as the problems our planet is facing due to unrecycled electronic waste." },
      { title: "Pick up Services", text: "We make things easier for our clients by providing them pick-up services for the recycling materials. All you have to do is fill out a form or give us a call at +1 262-7983040 and our team will take the batteries from you to dispose of properly." },
      { title: "Legal Assurance", text: "Our well-trained and professional team stays up to date with the changing rules and regulations regarding the Duluth battery disposal procedures. This helps us comply with the legal protocols of battery recycling." },
      { title: "Trustworthy and Reliable", text: "For batteries of all types and sizes, you can rely on Recycle Technologies for affordable and reliable services. We offer all-in-one solutions for battery recycling in Duluth for our valuable clients." },
    ] },
    { kind: 'text', heading: "Searching for Battery Disposal Services in Duluth?", blocks: [
      { p: "Recycle Technologies is here to make battery disposal easy and profitable for you. With our latest and environmentally-responsible recycling procedures, you can always count on us. Our efficient team is here to assist you anytime any day." },
      { p: "All you got to do is [fill out the form](quote) to get a free quote or directly call us at +1 763-559-5130 and take a step towards a greener tomorrow." },
    ] },
  ],
}
