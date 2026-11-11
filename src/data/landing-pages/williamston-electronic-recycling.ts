import { QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CALL, WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_EMAIL, WILLIAMSTON_FACILITY, WILLIAMSTON_ADDRESS, WILLIAMSTON_HOURS, WILLIAMSTON_PLACE_ADDRESS, williamstonHighlights } from './williamston-shared'

/**
 * Electronics Recycling in Williamston, SC: /south-carolina/williamston/electronic-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * The closing band: Get a Quote, Call (864) 774-8310 and support@lightingresourcesinc.com (11 Nov 2026).
 * Updated to the doc's 12 Nov 2026 version (TL): S.C. landfill ban, per-industry
 * lines, the address on the map card, and the address and hours in the closing band.
 */
export const LANDING_WILLIAMSTON_ELECTRONIC_RECYCLING: LandingPage = {
  url: href('/south-carolina/williamston/electronic-recycling/'),
  figma: { board: '7376:7167', phone: '7376:7779' },
  seo: {
    title: "Electronics Recycling in Williamston, SC | Recycle Technologies",
    description: "Electronics recycling in Williamston, SC from Recycle Technologies. Business pickup across Upstate South Carolina. R2v3, RIOS and NAID AAA certified. Get a quote today.",
  },
  schema: { service: "Electronics Recycling", areaServed: ['Williamston, SC', 'Upstate South Carolina'] },
  noCrumbs: true,
  // Get a Quote only: no Schedule a Pickup anywhere on the page (management, 12 Nov 2026).
  quoteOnly: true,
  hero: {
    crumb: "Electronics Recycling in Williamston, SC",
    h1: "Certified Electronics Recycling Services in Williamston, SC",
    body: "Reliable electronics recycling for Upstate South Carolina businesses, with scheduled pickup and processing through our Williamston, SC facility. Computers, laptops, servers, monitors, phones, printers, and other electronics accepted, with a documented recycling process for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    image: "/images/landing/hero-electronics.png",
    photo: "/images/landing/hero-photo-electronics.jpg",
    facility: WILLIAMSTON_FACILITY,
  },
  highlights: williamstonHighlights('Electronics'),
  about: {
    heading: "Why Recycle Electronics in South Carolina?",
    body: [
      "Recycling retired electronics breaks devices down so their materials can be reused instead of thrown away. In South Carolina, it's also the law: since July 1, 2011, computers, monitors, printers, and televisions have been banned from the state's solid waste landfills (S.C. Code § 48-60-90). For businesses, recycling moves old office electronics and IT equipment into a documented process instead of a storage closet or dumpster, with a certificate of recycling for your compliance records.",
      "Businesses in Greenville, Anderson, Spartanburg and across the Upstate I-85 corridor can book a scheduled pickup, and collected equipment goes to our Williamston, SC facility, where plastic, wire, circuit boards, metals, and glass are separated and sent for recovery. Recycle Technologies has been recycling electronics since 1993.",
    ],
    image: "/images/services/electronics-intro-v2.png",
  },
  options: {
    heading: "Electronics Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of retired electronics and IT equipment directly from your South Carolina facility, whether you have one item or hundreds." },
      { title: "Mail-In Program", body: "Order a mail-in recycling kit for eligible items." },
    ],
    buttons: [{ label: 'Mail-In Program', href: href('/mail-in-recycling/') }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Electronics Recycling?",
    cards: [
      { title: "Local certified facility", body: "Electronics are processed at our licensed, R2v3-certified Williamston, SC facility." },
      { title: "Hassle-free pickup", body: "We arrange collection and transportation from your location." },
      { title: "Documented process", body: "Proof of proper recycling for your compliance records." },
      { title: "Proven experience", body: "Recycle Technologies has been recycling electronics since 1993." },
    ],
  },
  items: {
    heading: "Electronics We Recycle",
    cards: [
      { title: "Computers & IT Equipment", body: "Desktop computers, laptops, servers" },
      { title: "Monitors & Displays", body: "Computer monitors, CRT monitors" },
      { title: "Office & Imaging Equipment", body: "Printers, scanners, copiers, fax machines" },
      { title: "Phones", body: "Cell phones, mobile devices" },
      { title: "General Electronics", body: "Cables, switches, chargers, keyboards, mice, remotes, microwaves, televisions" },
    ],
    note: "Have something that isn't listed? Contact us and we'll confirm before your pickup.",
  },
  steps: {
    heading: "How Do We Recycle Electronics in South Carolina?",
    intro: "We manage the entire process, from collecting your equipment to recovering its materials.",
    cards: [
      { title: "Request a Quote", body: "Share your equipment types and estimated volume, and we'll set up the right service for your business." },
      { title: "Scheduled Pickup", body: "Our team collects retired electronics from your location and transports them to our Williamston facility." },
      { title: "Sorting & Dismantling", body: "Equipment is grouped by type, then broken down so components and materials can be separated." },
      { title: "Material Separation", body: "Plastic and wiring are separated for shredding, monitors go through lead decontamination, and circuit boards are pulled for metal recovery." },
      { title: "Recovery & Certificate", body: "Shredded plastic and wire go to molders and smelters, and metals and minerals from circuit boards are recovered for reuse. You receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: 'Manufacturing, healthcare, education, government, retail and corporate offices, financial services, and automotive and fleet businesses across South Carolina.',
    cards: [
      { title: 'Manufacturing', key: 'manufacturing', body: 'Automotive suppliers and advanced manufacturers along the Upstate I-85 corridor, recycling retired computers, controls, and office equipment.' },
      { title: 'Healthcare', key: 'healthcare', body: 'Hospitals, clinics, and medical offices across the Upstate needing documented recycling of computers, monitors, and devices.' },
      { title: 'Education', key: 'education', body: 'Colleges, universities, and school districts recycle outdated lab computers, classroom displays, and staff devices.' },
      { title: 'Government', key: 'government', body: 'City and county offices across the Upstate with a documented process for retired public equipment.' },
      { title: 'Retail & Corporate Offices', key: 'retail', body: 'Regional headquarters in Greenville and branch offices across the Upstate clearing out old IT and office equipment.' },
      { title: 'Financial Services', key: 'financial', body: 'Banks, credit unions, and insurance offices recycling computers and phones with full documentation.' },
      { title: 'Automotive & Fleet', key: 'automotive', body: 'Dealerships, service centers, and fleet operators recycling diagnostic computers, office electronics, and phones.' },
    ],
  },
  areas: {
    lead: "Electronics pickup across Upstate South Carolina, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Mauldin, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE_ADDRESS,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA, and RIOS.",
  cta: {
    heading: "Get an Electronics Recycling Quote in Williamston, SC",
    body: "Whether you have one item or hundreds, tell us about your equipment and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: WILLIAMSTON_CALL,
    email: WILLIAMSTON_EMAIL,
    address: WILLIAMSTON_ADDRESS,
    hours: WILLIAMSTON_HOURS,
  },
  todo: [...WILLIAMSTON_CONTACT_TODO, "\"Local certified facility\" (licensed, R2v3-certified Williamston, SC facility) is highlighted in the doc; kept as written, please confirm."],
}
