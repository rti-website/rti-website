import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Bulb Recycling in Madison WI, /wisconsin-recycling/fluorescent-bulb-recycle-madison/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7067:6396, phone 7067:7155 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const FLUORESCENT_BULB_RECYCLE_MADISON: CountyPage = {
  url: "/wisconsin-recycling/fluorescent-bulb-recycle-madison/",
  state: "Wisconsin",
  county: "Madison",
  service: "Light Bulb Recycling",
  figma: { board: "7067:6396", phone: "7067:7155" },
  seo: {
    title: "Bulb Recycling in Madison WI | Call (800) 969-5166",
    description: "Bulb recycling Madison WI collecting spent CFLs, linear lamps, specialty lighting, and commercial bulb waste from offices and facilities. Call (800) 969-5166",
  },
  hero: {
    h1: "Bulb Recycling in Madison WI",
    crumb: "Bulb Recycling in Madison WI",
    lead: "Get the fluorescent bulb recycling services in Madison Wisconsin customized to your individual and company needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Make A Smart Choice with Fluorescent Bulb Recycling in Madison Wisconsin",
    blocks: [
      { p: "If you have a pile of old light bulbs, LED lights, or fluorescent tubes in some corner of your warehouse, we can help you get rid of them in an eco-friendly way. Recycle Technologies understands the hazards of unrecycled light bulbs and offers you reliable, and affordable fluorescent bulb recycling services in Madison." },
      { p: "We accept both broken and fully intact light bulbs of all types and sizes and take them to our recycling facility for proper legal and waste-free disposal. The experts at Recycle Technologies are committed to offering fluorescent bulb recycling services of the highest quality to our valuable clients. Call us now at +1 262-798-3040 and schedule a pickup." },
      { h: "Recycle All Kinds of Light Bulbs with Recycle Technologies" },
      { p: "The professional team at Recycle Technologies helps you save the environment by providing you with advanced recycling solutions for all kinds of light bulbs. Our recycling services offer you a chance you play your part in saving the planet while properly disposing of LED and fluorescent waste. Instead of throwing away the waste from big lighting projects, gather it in one place and let us discard it properly." },
      { p: "You can drop off the recycling material at our facility or call us at +1 262-798-3040 to have our team come and pick up the old bulbs from your location for recycling." },
      { h: "Mail in Program" },
      { p: "We offer a nationwide Universal Waste Mail-In Program, making it easy to recycle your light bulbs with us from anywhere in the country." },
      { p: "1. Purchase your Mail-In Boxes by calling +1 763-559-5130 or going to Mail-in Program." },
      { p: "2. Fill boxes with spent bulbs" },
      { p: "3. Ship back to us with FedEx and the prepaid shipping label we included in your Mail-In box!" },
    ],
  },
  servicesHeading: "Recycling Services",
  sections: [
    { kind: 'features', cards: [
      { title: "Step-by-Step Process", text: "We follow a certified and step-by-step process for the recycling of all sorts of light bulbs from fluorescent lamps to LED light bulbs." },
      { title: "Reliable Services", text: "Recycle Technologies takes pride in delivering reliable and flexible fluorescent bulb recycling services in different areas of Minneapolis, Minnesota." },
      { title: "Waste Management", text: "Our team takes care of your electronic lighting waste in an environmentally responsible way and ensures nothing goes to landfills." },
      { title: "Easy Pickups", text: "The professionals at Recycle Technologies are always ready to pick up your recycling items from anywhere in Minneapolis, Minnesota for recycling." },
    ] },
    { kind: 'text', heading: "Fluorescent Bulb Recycling Services", blocks: [
      { p: "Looking For the ideal Fluorescent Bulb Recycling Services in Town? Recycle Technologies should be your go-to recycling company if you have a pile of old and broken light bulbs and you care about the environment. We carry out all of our fluorescent bulb recycling operations in a responsible manner as we care about our clients as well as the planet. Fill out [the form](pickup) and our efficient team will get back to you about the pickup and recycling schedule or you can call us at +1 262-798-3040 and we will handle everything" },
    ] },
  ],
}
