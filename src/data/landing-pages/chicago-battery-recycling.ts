import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'

/**
 * Battery Recycling in Chicago, Illinois: /battery-recycling/Chicago/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7377:9503, phone 7377:10090 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 */
export const LANDING_CHICAGO_BATTERY_RECYCLING: LandingPage = {
  url: href("/battery-recycling/Chicago/"),
  figma: { board: "7377:9503", phone: "7377:10090" },
  seo: {
    title: "Battery Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides commercial battery recycling throughout Chicago and surrounding areas.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Battery Recycling in Chicago, Illinois",
    h1: "Certified Battery Recycling Services in Chicago",
    body: "Commercial battery recycling for Chicago businesses, with scheduled pickup and in-house processing at our New Berlin, WI facility. Lithium-ion, lead-acid, alkaline, NiCd, EV, and backup batteries accepted, with a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-battery.png',
    photo: '/images/landing/hero-photo-battery.jpg',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Why Recycle Batteries in Chicago?",
    body: [
      "Battery recycling sends spent batteries through specialized processing so their materials can be recovered, rather than ending up in general waste. For businesses, it's a practical way to clear out batteries that build up in offices, IT environments, warehouses, facilities, and fleet operations.",
      "Recycle Technologies has provided recycling services since 1993. Chicago businesses are served through scheduled pickup, and collected batteries are transported to our nearby New Berlin, WI facility for sorting and processing, with no outside broker involved.",
    ],
    image: '/images/landing/photo-chicago.png',
  },
  options: {
    heading: "Battery Recycling Options in Chicago",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of accumulated batteries from your location in Chicago and Cook County." },
      { title: "Mail-In Program", body: "Small quantities can be shipped through our prepaid mail-in program. Learn more." },
    ],
    buttons: [{ label: "Mail-In Program", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Battery Recycling?",
    cards: [
      { title: "Our own facility, no broker", body: "Batteries are processed in-house at our New Berlin, WI facility." },
      { title: "Convenient pickup", body: "We collect accumulated batteries straight from your business." },
      { title: "Certificate of recycling", body: "Proof of proper recycling for your compliance records." },
      { title: "Experience you can trust", body: "Providing recycling services since 1993." },
    ],
  },
  items: {
    heading: "Batteries We Recycle",
    cards: [
      { title: "Alkaline & zinc batteries", body: "Everyday commercial batteries" },
      { title: "Lithium-ion & lead-acid batteries", body: "Rechargeable lithium-ion packs and sealed lead-acid batteries" },
      { title: "NiCd & button cell batteries", body: "Nickel-cadmium rechargeables and small button cells" },
      { title: "EV & power tool batteries", body: "Electric vehicle batteries, including Tesla, and power tool packs" },
      { title: "Backup & other batteries", body: "Battery backup units, plus mercury oxide batteries on a case-by-case basis" },
    ],
  },
  steps: {
    heading: "How Do We Recycle Batteries in Chicago?",
    intro: "We handle every battery based on its type and condition, from pickup to final processing.",
    cards: [
      { title: "Request a Quote", body: "Share your battery types and approximate quantity, and we'll set up the right service for your business." },
      { title: "Scheduled Pickup", body: "Our team collects batteries from your Chicago or Cook County location and transports them to our New Berlin, WI facility." },
      { title: "Sorting by Chemistry", body: "Once received, batteries are separated by chemistry and type so each goes through the right processing stream." },
      { title: "Processing at Our Facility", body: "Batteries are processed in-house at our New Berlin, WI facility." },
      { title: "Recovery & Certificate", body: "Proper sorting and processing helps recover usable materials and keeps battery waste out of landfills. You receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: "Offices, IT operations, warehouses, facilities, and fleet operations, along with manufacturing, healthcare, education, government, and retail organizations across Chicago.",
    cards: [
      { title: "Offices", key: "offices" },
      { title: "IT operations", key: "it-operations" },
      { title: "Warehouses", key: "warehouses" },
      { title: "Facilities", key: "offices" },
      { title: "Fleet operations", key: "automotive" },
      { title: "Manufacturing", key: "manufacturing" },
      { title: "Healthcare", key: "healthcare" },
      { title: "Education", key: "education" },
      { title: "Government", key: "government" },
      { title: "Retail organizations", key: "retail" },
    ],
  },
  areas: { lead: "Commercial battery pickup throughout Chicago and Cook County." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3 and RIOS.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "Do you offer battery recycling in Chicago?", a: "Yes. We provide commercial battery pickup throughout Chicago and Cook County." },
      { q: "Is there a battery recycling facility in Chicago?", a: "No. We don't operate a facility or drop-off in Chicago. Batteries are processed at our New Berlin, WI facility." },
      { q: "What types of batteries can businesses recycle?", a: "Alkaline, zinc, lithium-ion, sealed lead-acid, NiCd, button cell, EV, power tool, and backup batteries." },
      { q: "Will I receive proof of recycling?", a: "Yes. You receive a certificate of recycling for your compliance records." },
      { q: "How do I schedule a battery pickup in Chicago?", a: "Request a quote with your battery types and quantity, and our team will arrange your pickup." },
    ],
  },
  cta: {
    heading: "Get a Battery Recycling Quote in Chicago",
    body: "Tell us about your batteries and we'll set up the right pickup option for your business.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 800-969-5166", href: "tel:+18009695166" },
    email: "widispatch@recycletechnologies.com",
  },
  todo: [],
}
