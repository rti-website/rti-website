import { href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Light Bulb Recycling in Minnesota: /light-bulbs/Minnesota/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7375:8163, phone 7375:8836 (27 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 * SEO title and description kept from the ad page this URL has carried since 24 Sep 2026.
 */
export const LANDING_MINNESOTA_LIGHT_BULBS: LandingPage = {
  url: href("/light-bulbs/Minnesota/"),
  figma: { board: "7375:8163", phone: "7375:8836" },
  seo: STATE_PAGES["light-bulbs"].Minnesota.seo,
  schema: { service: "Light Bulb Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Light Bulb Recycling in Minnesota",
    h1: "Commercial Light Bulb Recycling Services in Minnesota",
    body: "Commercial light bulb, ballast, and fixture recycling for Minnesota businesses, processed at our Blaine facility without a broker. Fluorescent tubes, CFLs, LED, HID lamps, and more accepted, with a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: '#landing-quote' },
    image: '/images/landing/hero-light-bulbs.png',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Understanding Light Bulb Recycling in Minnesota",
    body: [
      "Light bulb recycling is the process of collecting used or spent bulbs and routing them through a facility equipped to separate and recover their components, rather than placing them in general trash. Fluorescent-type lamps contain small amounts of mercury, which is why many organizations use recycling services that can document how bulbs are handled from pickup through processing.",
      "Recycle Technologies has recycled fluorescent lamps and other lighting since 1993. Collected bulbs are processed at our Blaine facility, where materials are separated and routed through the appropriate recovery process. Once processed, you receive a certificate of recycling for your records.",
    ],
    image: '/images/landing/photo-blaine.png',
  },
  options: {
    heading: "Light Bulb Recycling Options in Minnesota",
    cards: [
      { title: "Business Pickup", body: "Scheduled pickup within 100 miles of our Blaine facility. Packing materials can be delivered ahead of your pickup." },
      { title: "Drop-Off", body: "Bring spent bulbs, ballasts, and fixtures to our Blaine facility." },
      { title: "Universal Waste Mail-In Program", body: "Outside our pickup area? Ship eligible bulbs through our mail-in program." },
    ],
    buttons: [{ label: "View Drop-Off Location", href: href("/minnesota-recycling/ramsey/blaine/") }, { label: "Universal Waste Mail-In Program", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Light Bulb Recycling?",
    cards: [
      { title: "Own Minnesota facility", body: "Bulbs are processed directly at our Minnesota facility, not sent through an outside broker." },
      { title: "Certificate of recycling", body: "Documentation for your compliance records." },
      { title: "Packing support", body: "Fiber bins and packing materials can be delivered ahead of your pickup." },
      { title: "Certified and experienced", body: "R2v3 and RIOS certified, recycling lighting since 1993." },
    ],
  },
  items: {
    heading: "Lighting We Recycle",
    cards: [
      { title: "Fluorescent bulbs", body: "Fluorescent tubes, plastic-coated and shielded tubes, CFLs, green-tipped bulbs, circular lamps, and U-bend lamps" },
      { title: "LED lighting", body: "LED bulbs and tubes" },
      { title: "HID & specialty lamps", body: "High-intensity discharge (HID), metal-halide, high-pressure sodium, and UV lamps" },
      { title: "Cold-cathode lamps", body: "Neon, argon, and other cold-cathode lamps" },
      { title: "Other bulbs", body: "Flood lamps, incandescent, and halogen bulbs" },
      { title: "Ballasts", body: "PCB and non-PCB lighting ballasts" },
      { title: "Light fixtures", body: "Retired lighting fixtures" },
    ],
    note: "Not sure if your lighting qualifies? Contact us and we'll guide you.",
  },
  steps: {
    heading: "How Do We Recycle Light Bulbs in Minnesota?",
    intro: "From your facility to final material recovery, every step is handled and documented.",
    cards: [
      { title: "Request a Quote", body: "Tell us your bulb, ballast, and fixture types and approximate quantity. Our team will recommend the right option for your business." },
      { title: "Packaging", body: "The Department of Transportation regulates how bulbs are packaged for shipping. We recommend our fiber bins or the original boxes your replacement bulbs arrived in." },
      { title: "Pickup or Drop-Off", body: "Businesses within 100 miles of Blaine can arrange a pickup, or drop off lighting at our Blaine facility." },
      { title: "Processing & Separation", body: "Bulbs are processed at our Minnesota facility, where mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated." },
      { title: "Recovery & Certificate", body: "Phosphor powder and filters go to a distillation company, glass is used in industrial applications, and aluminum end caps go to an aluminum salvage partner. You receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: "Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet organizations across Minnesota.",
    cards: [
      { title: "Manufacturing", key: "manufacturing" },
      { title: "Healthcare", key: "healthcare" },
      { title: "Education", key: "education" },
      { title: "Government", key: "government" },
      { title: "Retail and corporate offices", key: "retail" },
      { title: "Financial services", key: "financial" },
      { title: "Automotive and fleet organizations", key: "automotive" },
    ],
  },
  areas: { lead: "Lighting pickup within 100 miles of our Blaine facility, including Minneapolis, St. Paul, Bloomington, Plymouth, Maple Grove, Brooklyn Park, Coon Rapids, Blaine, Burnsville, Lakeville, Woodbury, and St. Cloud." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "What lighting can I recycle in Minnesota?", a: "Fluorescent tubes, CFLs, LED, U-bend and circular lamps, HID, metal-halide, high-pressure sodium, UV, neon, argon, flood, incandescent, and halogen bulbs, plus ballasts and light fixtures." },
      { q: "Do you offer commercial light bulb pickup in Minnesota?", a: "Yes. We offer pickup within 100 miles of our Blaine facility, and packing materials can be delivered ahead of time." },
      { q: "Do you recycle ballasts and fixtures?", a: "Yes. We accept PCB and non-PCB ballasts as well as retired light fixtures." },
      { q: "Will I receive proof of recycling?", a: "Yes. You receive a certificate of recycling once your lighting is processed." },
      { q: "What happens to recycled light bulbs?", a: "Phosphor powder and filters go to a distillation company, glass is reused in industrial applications, and aluminum end caps go to an aluminum salvage partner." },
      { q: "Can I use the mail-in program if I'm outside your pickup area?", a: "Yes. Our Universal Waste Mail-In Program lets you ship eligible bulbs from anywhere in the country." },
    ],
  },
  cta: {
    heading: "Get a Light Bulb Recycling Quote in Minnesota",
    body: "Tell us about your lighting and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: '#landing-quote' },
    secondary: { label: "Call 763-559-5130", href: "tel:+17635595130" },
    email: "dispatch@recycletechnologies.com",
  },
  todo: [],
}
