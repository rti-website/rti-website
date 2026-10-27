import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Battery Recycling in Wisconsin: /battery-recycling/Wisconsin/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7376:8249, phone 7376:8849 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 * SEO title and description kept from the ad page this URL has carried since 24 Sep 2026.
 */
export const LANDING_WISCONSIN_BATTERY_RECYCLING: LandingPage = {
  url: href("/battery-recycling/Wisconsin/"),
  figma: { board: "7376:8249", phone: "7376:8849" },
  seo: STATE_PAGES["battery-recycling"].Wisconsin.seo,
  schema: { service: "Battery Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Battery Recycling in Wisconsin",
    h1: "Certified Battery Recycling Services in Wisconsin",
    body: "Reliable commercial battery recycling for Wisconsin businesses, with scheduled pickup within 100 miles of our R2v3-certified facility in New Berlin, WI. Alkaline, lithium-ion, lead-acid, NiCd, button cell, EV, and power tool batteries accepted, with a certificate of recycling and safe disposal for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-battery.png',
    photo: '/images/landing/hero-photo-battery.jpg',
  },
  highlights: ["Since 1993", "R2v3, RIOS & NAID AAA Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Why Recycle Batteries in Wisconsin?",
    body: [
      "Recycling spent batteries keeps them out of regular trash, where they can start fires or leak chemicals if stored or handled incorrectly. Different battery chemistries need different handling, which is why proper sorting matters.",
      "Recycle Technologies has been recycling batteries since 1993. Wisconsin businesses can book a scheduled pickup, and collected batteries go to our New Berlin, WI facility, where trained staff sort and separate them by type.",
    ],
    image: '/images/landing/photo-new-berlin.png',
  },
  options: {
    heading: "Battery Recycling Options in Wisconsin",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of spent batteries from businesses within 100 miles of our New Berlin facility." },
      { title: "Drop-Off", body: "Bring batteries to a nearby Recycle Technologies location." },
      { title: "Mail-In Program", body: "Order a mail-in kit for eligible battery types." },
    ],
    buttons: [{ label: "Mail-In Program", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Battery Recycling?",
    cards: [
      { title: "Nearby certified facility", body: "Batteries are sorted and processed at our R2v3-certified New Berlin, WI facility." },
      { title: "Hassle-free pickup", body: "We collect directly from businesses within a 100-mile radius." },
      { title: "Certificate of recycling", body: "Proof of recycling and safe disposal for your compliance records." },
      { title: "Proven experience", body: "Recycling batteries since 1993." },
    ],
  },
  items: {
    heading: "Batteries We Recycle",
    cards: [
      { title: "Alkaline & zinc", body: "Standard alkaline and zinc batteries" },
      { title: "Lithium-ion", body: "Rechargeable lithium-ion battery packs" },
      { title: "Lead-acid", body: "Sealed lead-acid batteries" },
      { title: "Nickel-cadmium & button cell", body: "NiCd and button-cell batteries" },
      { title: "EV batteries", body: "Electric vehicle and Tesla batteries" },
      { title: "Power tool & backup", body: "Power tool battery packs and battery backup units" },
      { title: "Other types", body: "Mercury oxide and other batteries, case by case" },
    ],
  },
  steps: {
    heading: "How Do We Recycle Batteries in Wisconsin?",
    intro: "We manage the entire process, from collection to documentation.",
    cards: [
      { title: "Request a Quote", body: "Share your battery types and estimated volume, and we'll set up the right service for your business." },
      { title: "Prepare Your Batteries", body: "Cover battery terminals to reduce fire risk. Mail-in batteries should be separated by type before shipping." },
      { title: "Scheduled Pickup", body: "Our team collects spent batteries from your location within 100 miles and transports them to our New Berlin, WI facility." },
      { title: "Sorting & Separation", body: "Trained staff sort and separate batteries by chemistry so each type is handled properly." },
      { title: "Certificate of Recycling", body: "You receive a certificate of recycling and safe disposal for your records." },
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
  areas: { lead: "Commercial battery pickup within 100 miles of New Berlin, including Milwaukee, Waukesha, Madison, Racine, Sheboygan, Oconomowoc, Fond du Lac, and Appleton." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3 and RIOS.',
  cta: {
    heading: "Get a Battery Recycling Quote in Wisconsin",
    body: "Tell us about your batteries and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 262 798 3040", href: "tel:+12627983040" },
    email: "widispatch@recycletechnologies.com",
  },
  todo: ["The Wisconsin frames have no FAQ section; built as drawn."],
}
