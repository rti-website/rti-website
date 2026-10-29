import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Green Bay electronic recycling center, /wisconsin-recycling/electronic-recycling-green-bay/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 12 Oct 2025 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const ELECTRONIC_RECYCLING_GREEN_BAY: CountyPage = {
  url: "/wisconsin-recycling/electronic-recycling-green-bay/",
  state: "Wisconsin",
  county: "Green Bay",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Electronic Recycling Green Bay - Recycle Technologies",
    description: "Discover eco-friendly electronic recycling solutions in Green Bay with Recycle Technologies. We specialize in handling household & industrial electronics in Green Bay.",
  },
  hero: {
    h1: "Green Bay electronic recycling center",
    crumb: "Green Bay electronic recycling center",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Green Bay Wisconsin Electronic Recycling Solutions",
    blocks: [
      { p: "Is your backyard filled with old, broken, and out-of-order electronics that you are not sure how to dispose of? Well, glad you are here. Recycle Technologies brings you a one-stop solution for recycling electronics in Green Bay Wisconsin. We take your electronics and recycle them using our eco-friendly, reliable, and efficient methods so that you don’t have to lift a finger. From household gadgets to industrial levels electronic junk, we offer recycling services that are pocket friendly and have the least impact on the environment." },
      { h: "Our Mission" },
      { p: "Recycle Technologies has set a mission to make your life easier and the planet greener by providing licensed recycling services. For more than two decades, Recycle Technologies has been providing a wide range of electronic recycling services to small businesses as well as global corporations. We take pride in offering electronic recycling in Green Bay Wisconsin that help you get rid of unnecessary electronic stuff like bulbs, lamps, TVs, etc, and keep the earth safe and green." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Licensed Company", text: "We carry out all the recycling operations following the ALMR guidelines and provide a Certificate of Recycling to our clients for every project." },
      { title: "Innovative Recycling", text: "The research team at Recycling Technologies ensures that the latest and innovative electronic recycling solutions are being used to make things quicker and more sustainable." },
      { title: "Eco-Friendly", text: "We join hands together with nature lovers and come up with methods for recycling your electronic waste that leave nothing in the landfills and help promote a greener planet." },
      { title: "Customized Services", text: "We separate different materials like plastic, metal, and rubber from electronic junk and offer recycling services adaptable to your individual and commercial needs." },
    ] },
    { kind: 'text', heading: "Need Electronic Recycling Services in Green Bay Wisconsin?", blocks: [
      { p: "Recycle Technologies is here to offer practical and efficient recycling solutions to its clients all across Green Bay. We take pride in delivering quick and trustworthy services to our valuable clients." },
      { p: "What are you waiting for? Call us now at +1 262-798-3040 to get top-notch electronic recycling services in Green Bay Wisconsin." },
    ] },
  ],
}
