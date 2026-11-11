import { QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CALL, WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_EMAIL, WILLIAMSTON_FACILITY, WILLIAMSTON_HIGHLIGHTS, WILLIAMSTON_INDUSTRY_CARDS, WILLIAMSTON_PLACE } from './williamston-shared'

/**
 * Battery Recycling in Williamston, SC: /south-carolina/williamston/battery-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * The closing band: Get a Quote, Call (864) 774-8310 and support@lightingresourcesinc.com (11 Nov 2026).
 */
export const LANDING_WILLIAMSTON_BATTERY_RECYCLING: LandingPage = {
  url: href('/south-carolina/williamston/battery-recycling/'),
  figma: { board: '7376:7167', phone: '7376:7779' },
  seo: {
    title: "Battery Recycling in Williamston, SC | Recycle Technologies",
    description: "Battery recycling in Williamston, SC from Recycle Technologies. Commercial pickup across Upstate South Carolina. R2v3, RIOS and NAID AAA certified. Get a quote.",
  },
  schema: { service: "Battery Recycling", areaServed: ['Williamston, SC', 'Upstate South Carolina'] },
  noCrumbs: true,
  // Get a Quote only: no Schedule a Pickup anywhere on the page (management, 12 Nov 2026).
  quoteOnly: true,
  hero: {
    crumb: "Battery Recycling in Williamston, SC",
    h1: "Certified Battery Recycling Services in Williamston, SC",
    body: "Reliable commercial battery recycling for Upstate South Carolina businesses, with scheduled pickup to our facility in Williamston, SC. Alkaline, lithium-ion, lead-acid, NiCd, button cell, EV, and power tool batteries accepted, with a certificate of recycling and safe disposal for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    image: "/images/landing/hero-battery.png",
    photo: "/images/landing/hero-photo-battery.jpg",
    facility: WILLIAMSTON_FACILITY,
  },
  highlights: WILLIAMSTON_HIGHLIGHTS,
  about: {
    heading: "Why Recycle Batteries in South Carolina?",
    body: [
      "Recycling spent batteries keeps them out of regular trash, where they can start fires or leak chemicals if stored or handled incorrectly. Different battery chemistries need different handling, which is why proper sorting matters.",
      "Recycle Technologies has been recycling batteries since 1993. Businesses in Greenville, Anderson, Spartanburg and across Upstate South Carolina can book a scheduled pickup, and collected batteries go to our Williamston, SC facility, where trained staff sort and separate them by type.",
    ],
    image: "/images/services/batteries-intro-v2.png",
  },
  options: {
    heading: "Battery Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of spent batteries from businesses across Upstate South Carolina." },
      { title: "Mail-In Program", body: "Order a mail-in kit for eligible battery types." },
    ],
    buttons: [{ label: 'Mail-In Program', href: href('/mail-in-recycling/') }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Battery Recycling?",
    cards: [
      { title: "Nearby certified facility", body: "Batteries are sorted and handled through our Williamston, SC facility under our R2v3-certified process." },
      { title: "Hassle-free pickup", body: "We collect directly from businesses across Upstate South Carolina." },
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
    heading: "How Do We Recycle Batteries in South Carolina?",
    intro: "We manage the entire process, from collection to documentation.",
    cards: [
      { title: "Request a Quote", body: "Share your battery types and estimated volume, and we'll set up the right service for your business." },
      { title: "Prepare Your Batteries", body: "Cover battery terminals to reduce fire risk. Mail-in batteries should be separated by type before shipping." },
      { title: "Scheduled Pickup", body: "Our team collects spent batteries from your location and transports them to our Williamston, SC facility." },
      { title: "Sorting & Separation", body: "Trained staff sort and separate batteries by chemistry so each type is handled properly." },
      { title: "Certificate of Recycling", body: "You receive a certificate of recycling and safe disposal for your records." },
    ],
  },
  industries: {
    lead: 'Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet businesses across South Carolina.',
    cards: WILLIAMSTON_INDUSTRY_CARDS,
  },
  areas: {
    lead: "Commercial battery pickup across Upstate South Carolina, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA and RIOS.",
  cta: {
    heading: "Get a Battery Recycling Quote in Williamston, SC",
    body: "Tell us about your batteries and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: WILLIAMSTON_CALL,
    email: WILLIAMSTON_EMAIL,
  },
  todo: [...WILLIAMSTON_CONTACT_TODO],
}
