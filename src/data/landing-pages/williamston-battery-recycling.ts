import { QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CALL, WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_EMAIL, WILLIAMSTON_FACILITY, WILLIAMSTON_ADDRESS, WILLIAMSTON_HOURS, WILLIAMSTON_PLACE_ADDRESS, williamstonHighlights } from './williamston-shared'

/**
 * Battery Recycling in Williamston, SC: /south-carolina/williamston/battery-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * The closing band: Get a Quote, Call (864) 774-8310 and support@lightingresourcesinc.com (11 Nov 2026).
 * Updated to the doc's 12 Nov 2026 version (TL): no EV or "other" batteries, per-industry
 * lines, the address on the map card, and the address and hours in the closing band.
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
    body: "Reliable commercial battery recycling for Upstate South Carolina businesses, with pickup to our facility in Williamston, SC. Alkaline, lithium-ion, lead-acid, NiCd, button cell, and power tool batteries accepted, with a certificate of recycling and safe disposal for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    image: "/images/landing/hero-battery.png",
    photo: "/images/landing/hero-photo-battery.jpg",
    facility: WILLIAMSTON_FACILITY,
  },
  highlights: williamstonHighlights('Batteries'),
  about: {
    heading: "Why Recycle Batteries in South Carolina?",
    body: [
      "Recycling spent batteries keeps them out of regular trash, where they can start fires or leak chemicals if stored or handled incorrectly. Different battery chemistries need different handling, which is why proper sorting matters.",
      "Businesses in Greenville, Anderson, Spartanburg and across Upstate South Carolina can book a pickup, and collected batteries go to our Williamston, SC facility, where trained staff sort and separate them by type. Recycle Technologies has been recycling batteries since 1993.",
    ],
    image: "/images/services/batteries-intro-v2.png",
  },
  options: {
    heading: "Battery Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Collection of spent batteries from businesses across Upstate South Carolina, whether you have one battery or hundreds." },
      { title: "Mail-In Program", body: "Order a mail-in kit for eligible battery types." },
    ],
    buttons: [{ label: 'Mail-In Program', href: href('/mail-in-recycling/') }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Battery Recycling?",
    cards: [
      { title: "Certified recycling", body: "Batteries are sorted and handled through our Williamston, SC facility, backed by Recycle Technologies’ R2v3, RIOS and NAID AAA certifications." },
      { title: "Hassle-free pickup", body: "We collect directly from businesses across Upstate South Carolina." },
      { title: "Certificate of recycling", body: "Proof of recycling and safe disposal for your compliance records." },
      { title: "Proven experience", body: "Recycle Technologies has been recycling batteries since 1993." },
    ],
  },
  items: {
    heading: "Batteries We Recycle",
    cards: [
      { title: "Alkaline & Zinc", body: "Standard alkaline and zinc batteries" },
      { title: "Lithium-Ion", body: "Rechargeable lithium-ion battery packs" },
      { title: "Lead-Acid", body: "Sealed lead-acid batteries" },
      { title: "Nickel-Cadmium & Button Cell", body: "NiCd and button-cell batteries" },
      { title: "Power Tool & Backup", body: "Power tool battery packs and battery backup units" },
    ],
    note: "Have a battery type that isn't listed? Contact us and we'll confirm before your pickup.",
  },
  steps: {
    heading: "How Do We Recycle Batteries in South Carolina?",
    intro: "We manage the entire process, from collection to documentation.",
    cards: [
      { title: "Request a Quote", body: "Share your battery types and estimated volume, and we'll set up the right service for your business." },
      { title: "Prepare Your Batteries", body: "Cover battery terminals to reduce fire risk. Mail-in batteries should be separated by type before shipping." },
      { title: "Pickup & Transport", body: "Our team collects spent batteries from your location and transports them to our Williamston, SC facility." },
      { title: "Sorting & Separation", body: "Trained staff sort and separate batteries by chemistry so each type is handled properly." },
      { title: "Certificate of Recycling", body: "You receive a certificate of recycling and safe disposal for your records." },
    ],
  },
  industries: {
    lead: 'Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet businesses across South Carolina.',
    cards: [
      { title: 'Manufacturing', key: 'manufacturing', body: 'Automotive suppliers and advanced manufacturers along the Upstate I-85 corridor, recycling batteries from power tools, equipment, and backup systems.' },
      { title: 'Healthcare', key: 'healthcare', body: 'Hospitals, clinics, and medical offices across the Upstate recycling batteries from medical devices, backup units, and portable equipment.' },
      { title: 'Education', key: 'education', body: 'Colleges, universities, and school districts recycle batteries from classroom devices, labs, and facilities equipment.' },
      { title: 'Government', key: 'government', body: 'City and county offices across the Upstate with a documented process for spent batteries from radios, devices, and backup systems.' },
      { title: 'Retail & Corporate Offices', key: 'retail', body: 'Stores and offices across the Upstate recycling batteries from handheld scanners, laptops, and UPS backup units.' },
      { title: 'Financial Services', key: 'financial', body: 'Banks, credit unions, and insurance offices recycle batteries from backup power units and office devices, with full documentation.' },
      { title: 'Automotive & Fleet', key: 'automotive', body: 'Dealerships, service centers, and fleet operators recycling lead-acid and other batteries from vehicles and shop equipment.' },
    ],
  },
  areas: {
    lead: "Commercial battery pickup across Upstate South Carolina and the I-85 corridor, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Mauldin, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE_ADDRESS,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA, and RIOS.",
  cta: {
    heading: "Get a Battery Recycling Quote in Williamston, SC",
    body: "Whether you have one battery or hundreds, tell us about your batteries and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: WILLIAMSTON_CALL,
    email: WILLIAMSTON_EMAIL,
    address: WILLIAMSTON_ADDRESS,
    hours: WILLIAMSTON_HOURS,
  },
  todo: [...WILLIAMSTON_CONTACT_TODO],
}
