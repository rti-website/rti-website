import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Bulb Recycling In Minneapolis, Minnesota, /minnesota-recycling/bulb-recycle-minneapolis/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7069:5352, phone 7069:6110 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const BULB_RECYCLE_MINNEAPOLIS: CountyPage = {
  url: "/minnesota-recycling/bulb-recycle-minneapolis/",
  state: "Minnesota",
  county: "Minneapolis",
  service: "Light Bulb Recycling",
  figma: { board: "7069:5352", phone: "7069:6110" },
  seo: {
    title: "Bulb Recycling Minneapolis Minnesota | Call (800) 969-5166",
    description: "Bulb recycling Minneapolis Minnesota for fluorescent tubes, CFLs, LEDs, and HID lamps, received, packed, and routed through approved handling steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Bulb Recycling In Minneapolis, Minnesota",
    crumb: "Bulb Recycling In Minneapolis, Minnesota",
    lead: "Bulb recycling services in Minneapolis, Minnesota, customized to your individual and company needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Make A Smart Choice with Fluorescent Blub Recycling in Minneapolis Minnesota",
    blocks: [
      { p: "If you have a pile of old light bulbs, LED lights, or fluorescent tubes in some corner of your warehouse, we can help you get rid of them in an eco-friendly way. Recycle Technologies understands the hazards of unrecycled light bulbs and offers you reliable, and affordable fluorescent bulb recycling services in Minneapolis." },
      { p: "We accept both broken and fully intact light bulbs of all types and sizes and take them to our recycling facility for proper legal and waste-free disposal. The experts at Recycle Technologies are committed to offering fluorescent bulb recycling services of the highest quality to our valuable clients." },
      { p: "Call us now at +1 763-559-5130 and schedule a pickup." },
      { h: "Recycle All Kinds of Light Bulbs with Technologies Recycle" },
      { p: "The professional team at Recycle Technologies helps you save the environment by providing you with advanced recycling solutions for all kinds of light bulbs. Our recycling services offer you a chance you play your part in saving the planet while properly disposing of LED and fluorescent waste. Instead of throwing away the waste from big lighting projects, gather it in one place and let us discard it properly. You can drop off the recycling material at our facility or call us at +1 763-559-5130 to have our team come and pick up the old bulbs from your location for recycling." },
      { h: "Mail in Program" },
      { p: "We offer a nationwide Universal Waste Mail-In Program, making it easy to recycle your light bulbs with us from anywhere in the country." },
      { p: "1. Purchase your Mail-In Boxes by calling +1 763-559-5130 or going to Mail-in program." },
      { p: "2. Fill boxes with spent bulbs." },
      { p: "3. Ship back to us with FedEx and the prepaid shipping label we included in your Mail-In box!" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Step-by-Step Process", text: "We follow a certified and step-by-step process for the recycling of all sorts of light bulbs from fluorescent lamps to LED light bulbs." },
      { title: "Reliable Services", text: "Recycle Technologies takes pride in delivering reliable and flexible fluorescent bulb recycling services in different areas of Minneapolis, Minnesota." },
      { title: "Waste Management", text: "Our team takes care of your electronic lighting waste in an environmentally responsible way and ensures nothing goes to landfills." },
      { title: "Easy Pickups", text: "The professionals at Recycle Technologies are always ready to pick up your recycling items from anywhere in Minneapolis, Minnesota for recycling." },
    ] },
    { kind: 'text', heading: "Fluorescent Bulb Recycling Services", blocks: [
      { p: "Looking For the ideal Fluorescent Bulb Recycling Services in Town? Town? Recycle Technologies should be your go-to recycling company if you have a pile of old and broken light bulbs and you care about the environment. We carry out all of our fluorescent bulb recycling operations in a responsible manner as we care about our clients as well as the planet. Fill out [the form](pickup) and our efficient team will get back to you about the pickup and recycling schedule or you can call us at +1 763-559-5130 and we will handle everything." },
    ] },
  ],
}
