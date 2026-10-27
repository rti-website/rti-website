import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'

/**
 * Light Bulb Recycling in Chicago, Illinois: /light-bulbs/Chicago/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7377:7461, phone 7377:8041 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 */
export const LANDING_CHICAGO_LIGHT_BULBS: LandingPage = {
  url: href("/light-bulbs/Chicago/"),
  figma: { board: "7377:7461", phone: "7377:8041" },
  seo: {
    title: "Light Bulb Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides commercial light bulb recycling throughout Chicago and surrounding areas.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Light Bulb Recycling in Chicago, Illinois",
    h1: "Certified Light Bulb Recycling Services in Chicago",
    body: "Reliable commercial lighting recycling for Chicago businesses, with scheduled pickup and processing at our R2v3-certified facility in New Berlin, WI. Fluorescent tubes, CFLs, LED, HID lighting, ballasts, and fixtures accepted, with a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-light-bulbs.png',
    photo: '/images/landing/hero-photo-light-bulbs.jpg',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Why Recycle Light Bulbs in Chicago?",
    body: [
      "Recycling spent lighting gives businesses a responsible alternative to tossing bulbs in everyday waste. It matters most for mercury-containing lamps like fluorescent tubes and CFLs, which face disposal restrictions in Illinois.",
      "Recycle Technologies has been recycling fluorescent lamps and other lighting since 1993. Chicago businesses can book a scheduled pickup, and collected lighting is transported to our nearby New Berlin, WI facility, where phosphor powder, glass, and aluminum end caps are separated and sent to the right recovery stream.",
    ],
    image: '/images/landing/photo-chicago.png',
  },
  options: {
    heading: "Light Bulb Recycling Options in Chicago",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of spent bulbs, ballasts, and fixtures directly from your facility in Chicago and Cook County." },
      { title: "Mail-In Program", body: "Small quantities can be shipped through our prepaid mail-in program. Learn more." },
    ],
    buttons: [{ label: "Mail-In Program", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Light Bulb Recycling?",
    cards: [
      { title: "Nearby certified facility", body: "Lighting is processed at our R2v3-certified New Berlin, WI facility." },
      { title: "Hassle-free pickup", body: "We arrange collection and transportation from your Chicago location." },
      { title: "Certificate of recycling", body: "Proof of proper recycling for your compliance records." },
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
    note: "Have lighting that's not on the list? Reach out and we'll confirm before your pickup.",
  },
  steps: {
    heading: "How Do We Recycle Light Bulbs in Chicago?",
    intro: "We manage the entire process, from collecting your lighting to recovering its materials.",
    cards: [
      { title: "Request a Quote", body: "Share your bulb, ballast, and fixture types and estimated volume, and we'll set up the right service for your business." },
      { title: "Pack Your Bulbs", body: "Use our fiber bins or the original boxes your replacement bulbs came in. Packaging follows Department of Transportation requirements." },
      { title: "Scheduled Pickup", body: "Our team collects spent lighting from your Chicago or Cook County location and transports it to our New Berlin, WI facility." },
      { title: "Material Separation", body: "Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated during processing." },
      { title: "Recovery & Certificate", body: "Phosphor powder and filters go to a distillation company, glass is reused in industrial applications, and aluminum end caps go to a salvage partner. You receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: "Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet businesses across Chicago.",
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
  areas: { lead: "Commercial lighting pickup throughout Chicago and Cook County." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "What lighting can businesses recycle in Chicago?", a: "Fluorescent tubes, CFLs, LED, U-bend and circular lamps, HID, metal halide, high-pressure sodium, UV, neon, argon, flood, incandescent, and halogen bulbs, plus ballasts and fixtures." },
      { q: "Can Chicago businesses schedule light bulb pickup?", a: "Yes. We offer scheduled commercial pickup throughout Chicago and Cook County." },
      { q: "Do you recycle ballasts and fixtures?", a: "Yes. We accept PCB and non-PCB ballasts as well as retired light fixtures." },
      { q: "Is there a light bulb drop-off location in Chicago?", a: "No. We don't operate a facility or public drop-off in Chicago. Businesses can use pickup, and small quantities can be sent through our mail-in program." },
      { q: "Will I receive proof of recycling?", a: "Yes. You receive a certificate of recycling for your compliance records." },
    ],
  },
  cta: {
    heading: "Get a Light Bulb Recycling Quote in Chicago",
    body: "Tell us about your lighting and we'll arrange the right pickup option for your business.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 800-969-5166", href: "tel:+18009695166" },
    email: "widispatch@recycletechnologies.com",
  },
  todo: [],
}
