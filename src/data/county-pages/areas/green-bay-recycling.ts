import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Green Bay Recycling Center, /wisconsin-recycling/green-bay-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:78181, phone 7084:78489 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const GREEN_BAY_RECYCLING: CountyPage = {
  url: "/wisconsin-recycling/green-bay-recycling/",
  state: "Wisconsin",
  county: "Green Bay",
  figma: { board: "7084:78181", phone: "7084:78489" },
  seo: {
    title: "Recycling Center in Green Bay | Call (800) 969-5166",
    description: "Recycling center Green Bay accepting electronics, lamps, batteries, computers, and devices, managed through verified intake and processing procedures. Call (800) 969-5166.",
  },
  hero: {
    h1: "Green Bay Recycling Center Recycling Solutions for All!", // WordPress H1, restored 30 Sep 2026 (Asim)
    crumb: "Green Bay Recycling Center Recycling Solutions for All!",
    lead: "Recycling Solutions for All! Let’s revolutionize the way you dispose of your electronic waste with Recycle Technologies.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Diverse Recycling Services in Green Bay Wisconsin",
    blocks: [
      { p: "Since 1993, Recycle Technologies has been making a positive change in the environment by offering customized electronic recycling services in Green Bay Wisconsin. Our committed team strives to come up with secure, greener, and reliable recycling solutions for industrial and smaller-level electronic disposal projects in Green Bay, Wisconsin." },
      { h: "Our Mission" },
      { p: "Our motto is to help you get rid of your outdated and broken electronic assets in the most environmentally-sound, responsible, and harmless way. In our Green Bay recycling center, we have dedicated facilities for each type of recycling service that our professional team uses in accordance with the legal and environmental laws." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Licensed Company", text: "We carry out all the recycling operations following the ALMR guidelines and provide a Certificate of Recycling to our clients for every project." },
      { title: "Innovative Recycling", text: "The research team at Recycling Technologies ensures that the latest and innovative electronic recycling solutions are being used to make things quicker and more sustainable." },
      { title: "Eco-Friendly", text: "We join hands together with nature lovers and come up with methods for recycling your electronic waste that leave nothing in the landfills and help promote a greener planet." },
      { title: "Customized Services", text: "We separate different materials like plastic, metal, and rubber from electronic junk and offer recycling services adaptable to your individual and commercial needs." },
    ] },
    { kind: 'text', heading: "Green Bay Recycling Dropoff Location", blocks: [
      { p: "Drop off your recycling material at our facility for affordable and safe recycling services. Your convenience is important to us which is why we offer pickup services all across Green Bay Wisconsin for all kinds of recycling solutions. You can schedule a pickup by calling us at +1 262-798-3040 or by filling out [a form](pickup) here." },
      { h2: "Your Local Recycling Center in Green Bay Wisconsin" },
      { p: "Recycling in the Green Bay area has never been easier and more practical than it is now with Recycle Technologies. We are determined to help you reduce your carbon footprint by safely recycling all the unwanted electronic resources from your houses, institutes, and businesses. It’s never too late to be responsible! Call us now at +1 262-798-3040 and play your part in making the planet greener and healthier." },
      { h2: "Find the Right Recycling Service for Your Project" },
      { p: "Begin your search for the right Recycling Service by calling us at +1 262-798-3040, filling out [the form](quote) or contact us directly with the live chat. We will immediately connect you with trusted provide in your area and send you free quote on local service. Be sure to check out what our customers saying about Recycle technologies service. we have help over 1 million customers connecting with recycling providers nationwide." },
    ] },
  ],
}
