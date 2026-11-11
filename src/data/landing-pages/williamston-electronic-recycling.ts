import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CALL, WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_HIGHLIGHTS, WILLIAMSTON_INDUSTRY_CARDS, WILLIAMSTON_PLACE } from './williamston-shared'

/**
 * Electronics Recycling in Williamston, SC: /south-carolina/williamston/electronic-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * The closing band: Get a Quote and Call (864) 774-8310 (Aaqib, 11 Nov 2026); no email yet.
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
  hero: {
    crumb: "Electronics Recycling in Williamston, SC",
    h1: "Certified Electronics Recycling Services in Williamston, SC",
    body: "Reliable electronics recycling for Upstate South Carolina businesses, with scheduled pickup and processing through our Williamston, SC facility. Computers, laptops, servers, monitors, phones, printers, and other electronics accepted, with a documented recycling process for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: "/images/landing/hero-electronics.png",
    photo: "/images/landing/hero-photo-electronics.jpg",
  },
  highlights: WILLIAMSTON_HIGHLIGHTS,
  about: {
    heading: "Why Recycle Electronics in South Carolina?",
    body: [
      "Recycling retired electronics breaks devices down so their materials can be reused instead of thrown away. For businesses, it also moves old office electronics and IT equipment into a documented process instead of a storage closet or dumpster.",
      "Recycle Technologies has been recycling electronics since 1993. Businesses in Greenville, Anderson, Spartanburg and across Upstate South Carolina can book a scheduled pickup, and collected equipment goes to our Williamston, SC facility, where plastic, wire, circuit boards, metals, and glass are separated and sent for recovery.",
    ],
    image: "/images/services/electronics-intro-v2.png",
  },
  options: {
    heading: "Electronics Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of retired electronics and IT equipment directly from your South Carolina facility." },
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
      { title: "Proven experience", body: "Recycling electronics since 1993." },
    ],
  },
  items: {
    heading: "Electronics We Recycle",
    cards: [
      { title: "Computers & IT equipment", body: "Desktop computers, laptops, and servers" },
      { title: "Monitors & displays", body: "Computer monitors and CRT monitors" },
      { title: "Office & imaging equipment", body: "Printers, scanners, copiers, and fax machines" },
      { title: "Phones", body: "Cell phones and mobile devices" },
      { title: "General electronics", body: "Cables, switches, chargers, keyboards, mice, remotes, microwaves, and televisions" },
    ],
    note: "Have electronics that aren't on the list? Reach out and we'll confirm before your pickup.",
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
    cards: WILLIAMSTON_INDUSTRY_CARDS,
  },
  areas: {
    lead: "Electronics pickup across Upstate South Carolina, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Mauldin, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA, and RIOS.",
  cta: {
    heading: "Get an Electronics Recycling Quote in Williamston, SC",
    body: "Tell us about your equipment and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: WILLIAMSTON_CALL,
  },
  todo: [...WILLIAMSTON_CONTACT_TODO, "\"Local certified facility\" (licensed, R2v3-certified Williamston, SC facility) is highlighted in the doc; kept as written, please confirm."],
}
