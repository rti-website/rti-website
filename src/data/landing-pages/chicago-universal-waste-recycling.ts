import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'

/**
 * Universal Waste Recycling in Chicago: /universal-waste-recycling/Chicago/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7514:8884, phone 7514:9501 (29 Oct 2026, from management).
 * The frame's copy word for word. Built by LandingServicePage.
 * Chicago is pickup only (no drop-off): one Pickup Options card, no buttons under it,
 * and no email line in the closing band, as drawn.
 */
export const LANDING_CHICAGO_UNIVERSAL_WASTE: LandingPage = {
  url: href("/universal-waste-recycling/Chicago/"),
  figma: { board: "7514:8884", phone: "7514:9501" },
  seo: {
    title: "Universal Waste Recycling in Chicago | Recycle Technologies",
    description: "One scheduled pickup for lamps, batteries, ballasts, and mercury devices in Chicago and Cook County, processed at our R2v3-certified New Berlin, WI facility with a certificate of recycling.",
  },
  schema: { service: "Universal Waste Recycling", areaServed: ["Chicago, IL", "Cook County, IL"] },
  hero: {
    crumb: "Universal Waste Recycling in Chicago",
    h1: "Universal Waste Recycling for Chicago Businesses",
    body: "One pickup for your lamps, batteries, ballasts, and mercury devices. Processed at our R2v3-certified New Berlin, WI facility, with a certificate of recycling for your compliance records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: '/images/landing/hero-universal-waste.png',
    photo: '/images/landing/hero-photo-universal-waste.jpg',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "What Is Universal Waste?",
    body: [
      "Universal waste is a group of common hazardous materials that businesses generate every day, like fluorescent lamps, batteries, and mercury devices. Federal and Illinois rules let you manage them under simpler universal waste rules, but they still can't go in the trash. Recycle Technologies collects them in one scheduled pickup and gives you a certificate of recycling for your records.",
    ],
    image: '/images/landing/photo-chicago.png',
  },
  options: {
    heading: "Pickup Options",
    cards: [
      { title: "Commercial Business Pickup", body: "One scheduled pickup for your universal waste from your business location in Chicago and Cook County." },
    ],
    buttons: [],
  },
  why: {
    heading: "Why Choose Recycle Technologies?",
    cards: [
      { title: "One Pickup, Every Stream", body: "Lamps, batteries, ballasts, and mercury devices in a single visit." },
      { title: "Certificate of Recycling", body: "Proof for audits and compliance records." },
      { title: "Certified", body: "R2v3 and RIOS certified, serving businesses since 1993." },
      { title: "Packing Support", body: "Fiber bins and containers delivered ahead of pickup." },
    ],
  },
  items: {
    heading: "Universal Waste We Recycle",
    cards: [
      { title: "Lamps", body: "Fluorescent tubes, CFLs, U-bend and circular lamps, HID, metal halide, high-pressure sodium, UV and neon." },
      { title: "Batteries", body: "Lithium-ion, sealed lead-acid, alkaline, NiCd, button cell and UPS batteries." },
      { title: "Mercury Devices", body: "Thermostats, switches, barometers, pressure controls and gas flow regulators." },
      { title: "Ballasts", body: "PCB and non-PCB ballasts and capacitors." },
    ],
    note: "Not sure if your item qualifies? Contact us, and we'll guide you.",
  },
  steps: {
    heading: "How It Works",
    cards: [
      { title: "Request a Quote", body: "Tell us what you have and roughly how much." },
      { title: "Pack", body: "We send bins and packing guidance. Tape battery terminals and keep broken lamps sealed." },
      { title: "Pickup", body: "Our team collects everything from your business location." },
      { title: "Processing", body: "Materials are sorted and processed at our New Berlin, WI facility." },
      { title: "Certificate of Recycling", body: "You receive it once processing is complete." },
    ],
  },
  industries: {
    lead: "Facilities and property management, manufacturing, healthcare, education, government, retail and corporate offices, and automotive and fleet.",
    cards: [
      { title: "Facilities and property management", key: "offices" },
      { title: "Manufacturing", key: "manufacturing" },
      { title: "Healthcare", key: "healthcare" },
      { title: "Education", key: "education" },
      { title: "Government", key: "government" },
      { title: "Retail and corporate offices", key: "retail" },
      { title: "Automotive and fleet", key: "automotive" },
    ],
  },
  areas: { lead: "Chicago and Cook County." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3 and RIOS.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "What counts as universal waste?", a: "Lamps, batteries, mercury devices, and similar items covered by federal and Illinois universal waste rules." },
      { q: "Can you pick up everything in one visit?", a: "Yes. Lamps, batteries, ballasts, and mercury devices can go in one scheduled pickup." },
      { q: "Do you accept PCB ballasts?", a: "Yes. We accept both PCB and non-PCB ballasts." },
      { q: "How should I store universal waste before pickup?", a: "Keep lamps in closed boxes, tape battery terminals, and label containers with the start date." },
      { q: "Will I get proof of recycling?", a: "Yes. You receive a certificate of recycling for your compliance records." },
      { q: "Is there a drop-off location in Chicago?", a: "No. We serve Chicago and Cook County through scheduled commercial pickups." },
    ],
  },
  cta: {
    heading: "Get a Universal Waste Recycling Quote in Chicago",
    body: "Tell us what you have, and we'll set up the right pickup for your business.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call (800) 969-5166", href: "tel:+18009695166" },
  },
  todo: [],
}
