import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Electronics Recycling in Minnesota: /electronic-recycle/Minnesota/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7375:6971, phone 7375:7636 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 * SEO title and description kept from the ad page this URL has carried since 24 Sep 2026.
 */
export const LANDING_MINNESOTA_ELECTRONIC_RECYCLE: LandingPage = {
  url: href("/electronic-recycle/Minnesota/"),
  figma: { board: "7375:6971", phone: "7375:7636" },
  seo: STATE_PAGES["electronic-recycle"].Minnesota.seo,
  schema: { service: "Electronics Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Electronics Recycling in Minnesota",
    h1: "Certified Electronics Recycling Services in Minnesota",
    body: "Secure, certified e-waste and IT equipment recycling for Minnesota businesses, processed at our R2v3-certified facility in Blaine. Computers, laptops, servers, monitors, printers, phones, and more accepted, with a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-electronics.png',
    photo: '/images/landing/hero-photo-electronics.jpg',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Understanding Electronics Recycling in Minnesota",
    body: [
      "Electronics recycling is the process of collecting unwanted or retired devices and breaking them down so their materials can be reused instead of sent to landfill. Electronics contain lead, metals, plastics, and circuit boards that need proper handling, and Minnesota prohibits throwing TVs, monitors, and other video display devices in the trash.",
      "For businesses, retired computers and IT equipment also carry a data security risk. At Recycle Technologies, collected electronics are processed at our licensed Blaine, Minnesota facility, where they are dismantled and separated into recoverable materials like plastic, wire, metals, glass, and circuit boards. Once processed, you receive a certificate of recycling for your records.",
    ],
    image: '/images/landing/photo-blaine.png',
  },
  options: {
    heading: "Electronics Recycling Options in Minnesota",
    cards: [
      { title: "Business Pickup", body: "Retired office electronics and IT equipment collected from your location within 100 miles of our Blaine facility." },
      { title: "Drop-Off", body: "Bring electronics to our Blaine facility." },
      { title: "Mail-In Kit", body: "Outside our pickup area? Order a mail-in kit and ship eligible electronics for certified recycling." },
    ],
    buttons: [{ label: "View Drop-Off Location", href: href("/minnesota-recycling/ramsey/blaine/") }, { label: "Order a Mail-In Kit", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Electronics Recycling?",
    cards: [
      { title: "Local Minnesota facility", body: "Electronics are processed at our own licensed Blaine facility." },
      { title: "R2v3 & RIOS certified", body: "Responsible electronics recycling backed by recognized industry standards." },
      { title: "Certificate of recycling", body: "Documentation for your compliance records." },
      { title: "Data security support", body: "Pair recycling with secure hard drive destruction to protect sensitive business data." },
    ],
  },
  items: {
    heading: "Electronics We Recycle",
    cards: [
      { title: "Computers & IT equipment", body: "Desktops, laptops, and servers" },
      { title: "Monitors & displays", body: "Computer monitors, CRT monitors, and TVs" },
      { title: "Office & imaging equipment", body: "Printers, copiers, scanners, and fax machines" },
      { title: "Phones & mobile devices", body: "Cell phones and related devices" },
      { title: "General electronics", body: "Cables, chargers, switches, keyboards, mice, remotes." },
    ],
    note: "Not sure about your item? Contact us and we'll guide you.",
  },
  steps: {
    heading: "How Do We Recycle Electronics in Minnesota?",
    intro: "From your site to final material recovery, we make electronics recycling simple, secure, and responsible.",
    cards: [
      { title: "Request a Quote", body: "Tell us what equipment you have and the approximate quantity. Our team will recommend the right option for your business." },
      { title: "Pickup or Drop-Off", body: "Businesses within 100 miles of Blaine can arrange a pickup, or drop off equipment at our Blaine facility." },
      { title: "Sorting & Dismantling", body: "At our Blaine facility, equipment is sorted by type and dismantled so individual components and materials can be separated." },
      { title: "Material Separation & Recovery", body: "Plastic and wiring are shredded and sent to molders and smelters, monitors go through a lead-decontamination step, and metals and minerals from circuit boards are collected for reuse." },
      { title: "Certificate of Recycling", body: "Once processed, you receive a certificate of recycling for your compliance records." },
    ],
  },
  industries: {
    lead: "Healthcare, financial services and banking, education, government, manufacturing, retail and corporate offices, and automotive and fleet organizations across Minnesota.",
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
  areas: { lead: "Electronics pickup within 100 miles of our Blaine facility, including Minneapolis, St. Paul, Bloomington, Plymouth, Maple Grove, Brooklyn Park, Coon Rapids, Blaine, Burnsville, Lakeville, Woodbury, and St. Cloud." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "Where can businesses recycle electronics in Minnesota?", a: "Recycle Technologies offers pickup within 100 miles of Blaine, drop-off at our Blaine facility, and a mail-in kit." },
      { q: "What electronics do you accept?", a: "Computers, laptops, servers, monitors, TVs, printers, copiers, scanners, phones, cables, and other electronic equipment." },
      { q: "Is your Blaine facility R2v3 certified?", a: "Yes. Our Blaine facility holds active R2v3 certification." },
      { q: "Will I receive proof of recycling?", a: "Yes. You receive a certificate of recycling once your electronics are processed." },
      { q: "What happens to electronics after they are recycled?", a: "Devices are dismantled, and plastic, wire, metals, glass, and circuit board materials are recovered for reuse." },
      { q: "How do you protect data on old computers and hard drives?", a: "We offer secure hard drive destruction alongside electronics recycling to help protect your business data." },
    ],
  },
  cta: {
    heading: "Get an Electronics Recycling Quote in Minnesota",
    body: "Tell us about your equipment and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 763-559-5130", href: "tel:+17635595130" },
    email: "dispatch@recycletechnologies.com",
  },
  todo: [],
}
