import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Electronics Recycling in Wisconsin: /electronic-recycle/Wisconsin/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7376:9308, phone 7376:9919 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 * SEO title and description kept from the ad page this URL has carried since 24 Sep 2026.
 */
export const LANDING_WISCONSIN_ELECTRONIC_RECYCLE: LandingPage = {
  url: href("/electronic-recycle/Wisconsin/"),
  figma: { board: "7376:9308", phone: "7376:9919" },
  seo: STATE_PAGES["electronic-recycle"].Wisconsin.seo,
  schema: { service: "Electronics Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Electronics Recycling in Wisconsin",
    h1: "Certified Electronics Recycling Services in Wisconsin",
    body: "Reliable electronics recycling for Wisconsin businesses, with scheduled pickup and processing at our licensed, R2v3-certified facility in New Berlin, WI. Computers, laptops, servers, monitors, phones, printers, and other electronics accepted, with a documented recycling process for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-electronics.png',
    photo: '/images/landing/hero-photo-electronics.jpg',
  },
  highlights: ["Since 1993", "R2v3, RIOS & NAID AAA Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Why Recycle Electronics in Wisconsin?",
    body: [
      "Recycling retired electronics breaks devices down so their materials can be reused instead of thrown away. For businesses, it also moves old office electronics and IT equipment into a documented process instead of a storage closet or dumpster.",
      "Recycle Technologies has been recycling electronics since 1993. Wisconsin businesses can book a scheduled pickup, and collected equipment is dismantled at our New Berlin, WI facility, where plastic, wire, circuit boards, metals, and glass are separated and sent for recovery.",
    ],
    image: '/images/landing/photo-new-berlin.png',
  },
  options: {
    heading: "Electronics Recycling Options in Wisconsin",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of retired electronics and IT equipment directly from your Wisconsin facility." },
      { title: "Drop-Off", body: "Bring equipment to our New Berlin location or a nearby Recycle Technologies drop-off." },
      { title: "Mail-In Program", body: "Order a mail-in recycling kit for eligible items." },
    ],
    buttons: [{ label: "Mail-In Program", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Electronics Recycling?",
    cards: [
      { title: "Local certified facility", body: "Electronics are processed at our licensed, R2v3-certified New Berlin, WI facility." },
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
    heading: "How Do We Recycle Electronics in Wisconsin?",
    intro: "We manage the entire process, from collecting your equipment to recovering its materials.",
    cards: [
      { title: "Request a Quote", body: "Share your equipment types and estimated volume, and we'll set up the right service for your business." },
      { title: "Scheduled Pickup", body: "Our team collects retired electronics from your location and transports them to our New Berlin facility." },
      { title: "Sorting & Dismantling", body: "Equipment is grouped by type, then broken down so components and materials can be separated." },
      { title: "Material Separation", body: "Plastic and wiring are separated for shredding, monitors go through lead decontamination, and circuit boards are pulled for metal recovery." },
      { title: "Recovery & Certificate", body: "Shredded plastic and wire go to molders and smelters, and metals and minerals from circuit boards are recovered for reuse. You receive a certificate of recycling for your records." },
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
  areas: { lead: "Electronics pickup across Wisconsin, including Milwaukee, Waukesha, New Berlin, Madison, Green Bay, Appleton, Racine, Sheboygan, Oconomowoc, and Fond du Lac." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  cta: {
    heading: "Get an Electronics Recycling Quote in Wisconsin",
    body: "Tell us about your equipment and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 262 798 3040", href: "tel:+12627983040" },
    email: "widispatch@recycletechnologies.com",
  },
  todo: ["The Wisconsin frames have no FAQ section; built as drawn."],
}
