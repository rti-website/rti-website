import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Recycling Services in Duluth, /minnesota-recycling/duluth/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 11 May 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const DULUTH: CountyPage = {
  url: "/minnesota-recycling/duluth/",
  state: "Minnesota",
  county: "Duluth",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Recycling Services in Duluth | Call (800) 969-5166",
    description: "Recycling services in Duluth offering material intake for electronics, battery units, lighting waste, paper output, and secure processing support. Call (800) 969-5166.",
  },
  hero: {
    h1: "Recycling Services in Duluth",
    crumb: "Recycling Services in Duluth",
    lead: "Let’s revolutionize the way you dispose of your electronic waste with Recycle Technologies.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Recycling Services in Duluth, Minnesota",
    blocks: [
      { p: "Is your backyard filled with old, broken, and out-of-order electronics that you are not sure how to dispose of? Well, glad you are here. Recycle Technologies brings you a one-stop solution for [recycling electronics](/electronic-recycle/) in Duluth Minnesota. We take your electronics and recycle them using our eco-friendly, reliable, and efficient methods so that you don’t have to lift a finger. From household gadgets to industrial levels electronic junk, we offer recycling services that are pocket friendly and have the least impact on the environment." },
      { h: "Our Mission" },
      { p: "Our motto is to help you get rid of your outdated and broken electronic assets in the most environmentally-sound, responsible, and harmless way. In our Madison recycling center, we have dedicated facilities for each type of recycling service that our professional team uses in accordance with the legal and environmental laws. Please [fill out the form](quote) or call us at +1 763-559-5130." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Sustainable", text: "Protecting the future by choosing to recycle all of our waste – nothing goes to landfill." },
      { title: "Forward Thinking", text: "Coming up with new ideas and innovations to make the recyclable process easier." },
      { title: "Reliable & Flexible", text: "A flexible and adaptable collection for your waste, that can be customized to meet your very individual requirements." },
      { title: "Certified", text: "We will provide you with Certificate of Destruction and ensures that your recycled material stay out of landfills." },
    ] },
    { kind: 'text', heading: "Need Electronic Recycling Services in Duluth Minnesota?", blocks: [
      { p: "Recycle Technologies is here to offer practical and efficient recycling solutions to its clients all across Duluth, Minnesota. We take pride in delivering quick and trustworthy services to our valuable clients." },
      { p: "What are you waiting for? Call us now at +1 763-559-5130 to get top-notch electronic recycling services in Duluth Minnesota." },
    ] },
  ],
}
