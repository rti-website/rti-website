import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'

/**
 * Electronics Recycling in Chicago, Illinois: /electronic-recycle/Chicago/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7377:8480, phone 7377:9061 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 */
export const LANDING_CHICAGO_ELECTRONIC_RECYCLE: LandingPage = {
  url: href("/electronic-recycle/Chicago/"),
  figma: { board: "7377:8480", phone: "7377:9061" },
  seo: {
    title: "Electronics Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides electronics recycling for Chicago businesses, residents, and small-volume customers.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Electronics Recycling in Chicago, Illinois",
    h1: "Certified Electronics Recycling Services in Chicago",
    body: "Secure e-waste and IT equipment recycling for Chicago businesses, processed at our R2v3-certified New Berlin, WI facility. Book a scheduled pickup and get NAID AAA-certified hard drive destruction, with a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-electronics.png',
    photo: '/images/landing/hero-photo-electronics.jpg',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Why Recycle Electronics in Chicago?",
    body: [
      "Electronics recycling keeps old computers, displays, networking gear, TVs, and other devices out of regular waste and moves them into a dedicated recycling stream. For businesses, retired equipment also carries stored data that needs to be destroyed securely.",
      "Recycle Technologies has been in operation since 1993 and serves Chicago through scheduled commercial pickup. Collected equipment is processed at our nearby New Berlin, WI facility, where hard drives can be securely destroyed and the remaining equipment is broken down into metals, plastics, glass, wire, and circuit boards for recovery and reuse.",
    ],
    image: '/images/landing/photo-chicago.png',
  },
  options: {
    heading: "Electronics Recycling Options in Chicago",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of computers, IT equipment, and e-waste from your location in Chicago and Cook County." },
      { title: "Mail-In Kit", body: "Small quantities can be shipped through our mail-in kit. Learn more." },
    ],
    buttons: [{ label: "Mail-In Kit", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Electronics Recycling?",
    cards: [
      { title: "NAID AAA certified data destruction", body: "Hard drives are securely destroyed at our NAID AAA certified New Berlin facility, with a certificate of destruction." },
      { title: "Certified processes", body: "R2v3 and RIOS certified recycling." },
      { title: "Certificate of recycling", body: "Proof of proper recycling for your compliance records." },
      { title: "Trusted since 1993", body: "Decades of experience recycling electronics for businesses." },
    ],
  },
  items: {
    heading: "Electronics We Recycle",
    cards: [
      { title: "Computers & IT equipment", body: "Desktops, laptops, workstations, and servers" },
      { title: "Hard drives & storage devices", body: "Drives requiring certified destruction" },
      { title: "Monitors & TVs", body: "Computer monitors, LCD displays, and CRT, LCD, LED, and plasma TVs" },
      { title: "Networking equipment", body: "Switches, routers, access points, and modems" },
      { title: "Phones & telecom", body: "Cell phones, business phones, and telecommunications equipment" },
      { title: "Office electronics", body: "Printers, copiers, scanners, and fax machines" },
      { title: "Cables & accessories", body: "Power and data cables, chargers, adapters, keyboards, and mice" },
      { title: "Other e-waste", body: "Small devices, electronic components, and miscellaneous electronics" },
    ],
  },
  steps: {
    heading: "How Do We Recycle Electronics in Chicago?",
    intro: "From collection to material recovery, every step is managed and documented.",
    cards: [
      { title: "Request a Quote", body: "Tell us what equipment you have and where it's located, and we'll set up the right service." },
      { title: "Scheduled Pickup", body: "Our team collects your electronics from your Chicago or Cook County location and transports them to our New Berlin, WI facility." },
      { title: "Certified Hard Drive Destruction", body: "Hard drives and storage devices are securely destroyed at our NAID AAA-certified facility, and you receive a certificate of destruction." },
      { title: "Sorting & Processing", body: "Remaining equipment is sorted and broken down into plastic, wire, circuit boards, metals, and glass." },
      { title: "Recovery & Certificate", body: "Recovered materials are processed for recycling and reuse instead of landfill, and you receive a certificate of recycling for your records." },
    ],
  },
  industries: {
    lead: "Healthcare, financial services and banking, education, government, manufacturing, retail and corporate offices, and automotive and fleet organizations across Chicago.",
    cards: [
      { title: "Healthcare", key: "healthcare" },
      { title: "Financial services and banking", key: "financial" },
      { title: "Education", key: "education" },
      { title: "Government", key: "government" },
      { title: "Manufacturing", key: "manufacturing" },
      { title: "Retail and corporate offices", key: "retail" },
      { title: "Automotive and fleet organizations", key: "automotive" },
    ],
  },
  areas: { lead: "Scheduled electronics recycling pickup throughout Chicago and Cook County." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "What electronics can I recycle in Chicago?", a: "Computers, laptops, servers, hard drives, monitors, TVs, networking equipment, phones, printers, copiers, cables, accessories, and other e-waste." },
      { q: "Can I recycle electronics that still work?", a: "Yes, working electronics can be recycled. Contact us with your equipment details to confirm the best option." },
      { q: "Is there an electronics drop-off location in Chicago?", a: "No. We serve Chicago and Cook County through scheduled business pickup, with a mail-in kit for small quantities." },
      { q: "Is your hard drive destruction certified?", a: "Yes. Hard drives are destroyed at our NAID AAA certified New Berlin, WI facility, and you receive a certificate of destruction." },
      { q: "Will I receive proof of recycling?", a: "Yes. You receive a certificate of recycling for your compliance records." },
    ],
  },
  cta: {
    heading: "Get an Electronics Recycling Quote in Chicago",
    body: "Tell us what equipment you have and where it's located, and we'll set up the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 800-969-5166", href: "tel:+18009695166" },
  },
  todo: [],
}
