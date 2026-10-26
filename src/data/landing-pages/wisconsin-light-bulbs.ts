import { href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Light Bulb Recycling in Wisconsin: /light-bulbs/Wisconsin/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7376:7167, phone 7376:7779 (27 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 * SEO title and description kept from the ad page this URL has carried since 24 Sep 2026.
 */
export const LANDING_WISCONSIN_LIGHT_BULBS: LandingPage = {
  url: href("/light-bulbs/Wisconsin/"),
  figma: { board: "7376:7167", phone: "7376:7779" },
  seo: STATE_PAGES["light-bulbs"].Wisconsin.seo,
  schema: { service: "Light Bulb Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Light Bulb Recycling in Wisconsin",
    h1: "Certified Light Bulb Recycling Services in Wisconsin",
    body: "Commercial light bulb recycling for Wisconsin businesses, processed at our R2v3-certified facility in New Berlin, WI, with no broker in between. Fluorescent tubes, CFLs, LED, HID lighting, ballasts, and fixtures accepted, with a documented path from pickup to processing.",
    button: { label: 'Get a Quote', href: '#landing-quote' },
    image: '/images/landing/hero-light-bulbs.png',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Why Recycle Light Bulbs in Wisconsin?",
    body: [
      "Recycling spent lighting keeps bulbs out of general trash and routes them to a facility built to separate and recover their components. It matters most for fluorescent-type lamps like tubes and CFLs, which contain small amounts of mercury.",
      "Recycle Technologies has been recycling fluorescent lamps and other lighting since 1993. Wisconsin businesses can book a scheduled pickup, and collected lighting is processed at our New Berlin, WI facility, so your materials never pass through an outside broker.",
    ],
    image: '/images/landing/photo-new-berlin.png',
  },
  options: {
    heading: "Light Bulb Recycling Options in Wisconsin",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of spent bulbs, ballasts, and fixtures directly from your Wisconsin facility. Packing materials can be delivered ahead of pickup." },
      { title: "Mail-In Program", body: "Ship eligible bulbs through nationwide Mail-In Program." },
    ],
    buttons: [],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Light Bulb Recycling?",
    cards: [
      { title: "Certified facility", body: "Lighting is processed in-house at our R2v3-certified New Berlin facility." },
      { title: "No broker", body: "We handle processing directly, so you get a documented path from pickup to processing." },
      { title: "Hassle-free pickup", body: "We arrange collection and transportation from your location." },
      { title: "Proven experience", body: "Recycling fluorescent lamps and lighting since 1993." },
    ],
  },
  items: {
    heading: "Lighting We Recycle",
    cards: [
      { title: "Fluorescent lighting", body: "Fluorescent tubes, plastic-coated and shielded tubes, CFLs, green-tipped bulbs, circular lamps, and U-bend lamps" },
      { title: "LED lighting", body: "LED bulbs and tubes" },
      { title: "High-intensity lighting", body: "HID, metal halide, and high-pressure sodium lamps" },
      { title: "Specialty lamps", body: "UV, neon, argon, and other cold-cathode lamps" },
      { title: "Other bulbs", body: "Flood lamps, incandescent, and halogen bulbs" },
      { title: "Ballasts", body: "PCB and non-PCB lighting ballasts" },
      { title: "Light fixtures", body: "Retired lighting fixtures" },
    ],
    note: "Have lighting that's not on the list? Reach out and we'll confirm before your pickup or mail-in shipment.",
  },
  steps: {
    heading: "How Do We Recycle Light Bulbs in Wisconsin?",
    intro: "We manage the entire process, from collecting your lighting to recovering its materials.",
    cards: [
      { title: "Request a Quote", body: "Share your bulb, ballast, and fixture types and estimated volume, and we'll set up the right service." },
      { title: "Pack Your Bulbs", body: "Use our fiber bins or the original boxes your replacement bulbs came in. Packaging follows Department of Transportation requirements." },
      { title: "Scheduled Pickup", body: "Our team collects spent lighting from your location and brings it to our New Berlin facility." },
      { title: "Material Separation", body: "Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated during processing." },
      { title: "Recovery & Certificate", body: "Phosphor powder and filters go to a distillation company, glass is reused in industrial products, and aluminum end caps go to a salvage partner. You receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: "Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet businesses across Wisconsin.",
    cards: [
      { title: "Manufacturing", key: "manufacturing" },
      { title: "Healthcare", key: "healthcare" },
      { title: "Education", key: "education" },
      { title: "Government", key: "government" },
      { title: "Retail and corporate offices", key: "retail" },
      { title: "Financial services", key: "financial" },
      { title: "Automotive and fleet businesses", key: "automotive" },
    ],
  },
  areas: { lead: "Commercial lighting pickup across Wisconsin, including Milwaukee, Waukesha, New Berlin, Madison, Green Bay, Appleton, Racine, Sheboygan, Oconomowoc, and Fond du Lac." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  cta: {
    heading: "Get a Quote",
    primary: { label: 'Get a Quote', href: '#landing-quote' },
  },
  todo: ["The Wisconsin frames have no FAQ section and a short Get a Quote band; built as drawn."],
}
