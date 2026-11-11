import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CALL, WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_EMAIL, WILLIAMSTON_HIGHLIGHTS, WILLIAMSTON_INDUSTRY_CARDS, WILLIAMSTON_PLACE } from './williamston-shared'

/**
 * Light Bulb Recycling in Williamston, SC: /south-carolina/williamston/light-bulb-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * The closing band: Get a Quote, Call (864) 774-8310 and support@lightingresourcesinc.com (11 Nov 2026).
 */
export const LANDING_WILLIAMSTON_LIGHT_BULB_RECYCLING: LandingPage = {
  url: href('/south-carolina/williamston/light-bulb-recycling/'),
  figma: { board: '7376:7167', phone: '7376:7779' },
  seo: {
    title: "Light Bulb Recycling in Williamston, SC | Recycle Technologies",
    description: "Commercial light bulb recycling in Williamston, SC from Recycle Technologies. Fluorescent, CFL, and HID bulbs from businesses across Upstate South Carolina. Get a quote today.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ['Williamston, SC', 'Upstate South Carolina'] },
  noCrumbs: true,
  hero: {
    crumb: "Light Bulb Recycling in Williamston, SC",
    h1: "Certified Light Bulb Recycling Services in Williamston, SC",
    body: "Commercial light bulb recycling for Upstate South Carolina businesses, handled through our facility in Williamston, SC, with no broker in between. Fluorescent tubes, CFLs, LED, HID lighting, ballasts, and fixtures accepted, with a documented path from pickup to processing.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: "/images/landing/hero-light-bulbs.png",
    photo: "/images/landing/hero-photo-light-bulbs.jpg",
  },
  highlights: WILLIAMSTON_HIGHLIGHTS,
  about: {
    heading: "Why Recycle Light Bulbs in South Carolina?",
    body: [
      "Recycling spent lighting keeps bulbs out of general trash and routes them to a facility built to separate and recover their components. It matters most for fluorescent-type lamps like tubes and CFLs, which contain small amounts of mercury.",
      "Recycle Technologies has been recycling fluorescent lamps and other lighting since 1993. Businesses in Greenville, Anderson, Spartanburg and across Upstate South Carolina can book a scheduled pickup, and collected lighting goes to our Williamston, SC facility, so your materials never pass through an outside broker.",
    ],
    image: "/images/services/light-bulbs-intro-v2.png",
  },
  options: {
    heading: "Light Bulb Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of spent bulbs, ballasts, and fixtures directly from your South Carolina facility. Packing materials can be delivered ahead of pickup." },
      { title: "Mail-In Program", body: "Ship eligible bulbs through our nationwide Mail-In Program." },
    ],
    buttons: [{ label: 'Mail-In Program', href: href('/mail-in-recycling/') }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Light Bulb Recycling?",
    cards: [
      { title: "Certified facility", body: "Lighting is handled through our Williamston, SC facility under our R2v3-certified process." },
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
    heading: "How Do We Recycle Light Bulbs in South Carolina?",
    intro: "We manage the entire process, from collecting your lighting to recovering its materials.",
    cards: [
      { title: "Request a Quote", body: "Share your bulb, ballast, and fixture types and estimated volume, and we'll set up the right service." },
      { title: "Pack Your Bulbs", body: "Use our fiber bins or the original boxes your replacement bulbs came in. Packaging follows Department of Transportation requirements." },
      { title: "Scheduled Pickup", body: "Our team collects spent lighting from your location and brings it to our Williamston, SC facility." },
      { title: "Material Separation", body: "Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated during processing." },
      { title: "Recovery & Certificate", body: "Phosphor powder and filters go to a distillation company, glass is reused in industrial products, and aluminum end caps go to a salvage partner. You receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: 'Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet businesses across South Carolina.',
    cards: WILLIAMSTON_INDUSTRY_CARDS,
  },
  areas: {
    lead: "Commercial lighting pickup across Upstate South Carolina, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Mauldin, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA and RIOS.",
  cta: {
    heading: "Get a Light Bulb Recycling Quote in Williamston, SC",
    body: "Tell us about your lighting and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: WILLIAMSTON_CALL,
    email: WILLIAMSTON_EMAIL,
  },
  todo: [...WILLIAMSTON_CONTACT_TODO],
}
