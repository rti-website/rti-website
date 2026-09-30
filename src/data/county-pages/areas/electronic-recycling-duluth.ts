import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Sustainable Electronic Recycling in Duluth, MN, /minnesota-recycling/electronic-recycling-duluth/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7073:6042, phone 7073:6794 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const ELECTRONIC_RECYCLING_DULUTH: CountyPage = {
  url: "/minnesota-recycling/electronic-recycling-duluth/",
  state: "Minnesota",
  county: "Duluth",
  figma: { board: "7073:6042", phone: "7073:6794" },
  seo: {
    title: "Sustainable E-Recycling in Duluth | Call 800-969-5166",
    description: "Sustainable electronic recycling Duluth Minnesota for POS terminals, barcode scanners, AV gear, and tablets, managed through verified intake steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Sustainable Electronic Recycling in Duluth Minnesota", // WordPress H1, restored 30 Sep 2026 (Asim)
    crumb: "Sustainable Electronic Recycling in Duluth Minnesota",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels..",
    h1Width: 1477,
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Duluth Minnesota Electronic Recycling Solutions",
    blocks: [
      { p: "Is your backyard filled with old, broken, and out-of-order electronics that you are not sure how to dispose of? Well, glad you are here. Recycle Technologies brings you a one-stop solution for recycling electronics in Duluth Minnesota." },
      { p: "We take your electronics and recycle them using our eco-friendly, reliable, and efficient methods so that you don’t have to lift a finger. From household gadgets to industrial levels electronic junk, we offer recycling services that are pocket friendly and have the least impact on the environment." },
      { h: "Our Mission" },
      { p: "Recycle Technologies has set a mission to make your life easier and the planet greener by providing licensed recycling services. For more than two decades, Recycle Technologies has been providing a wide range of electronic recycling services to small businesses as well as global corporations. We take pride in offering electronic recycling in Duluth Minnesota that help you get rid of unnecessary electronic stuff like bulbs, lamps, TVs, etc, and keep the earth safe and green." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Licensed Company", text: "We carry out all the recycling operations following the ALMR guidelines and provide a Certificate of Recycling to our clients for every project." },
      { title: "Innovative Recycling", text: "The research team at Recycling Technologies ensures that the latest and innovative electronic recycling solutions are being used to make things quicker and more sustainable." },
      { title: "Eco-Friendly", text: "We join hands together with nature lovers and come up with methods for recycling your electronic waste that leave nothing in the landfills and help promote a greener planet." },
      { title: "Customized Services", text: "We separate different materials like plastic, metal, and rubber from electronic junk and offer recycling services adaptable to your individual and commercial needs." },
    ] },
    { kind: 'text', heading: "Need Electronic Recycling Services in Duluth Minnesota? Recycle Technologies is here to offer practical and efficient recycling solutions to its clients all across Duluth, Minnesota. We take pride in delivering quick and trustworthy services to our valuable clients.", blocks: [
      { p: "What are you waiting for? Call us now at +1 763-559-5130 to get top-notch electronic recycling and Shredding services in Duluth Minnesota." },
    ] },
  ],
}
