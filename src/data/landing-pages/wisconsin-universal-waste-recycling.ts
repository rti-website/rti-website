import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'

/**
 * Universal Waste Recycling in Wisconsin: /universal-waste-recycling/Wisconsin/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7377:20008, phone 7377:20642 (27 Oct 2026; updated to the frames of 28 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 */
export const LANDING_WISCONSIN_UNIVERSAL_WASTE: LandingPage = {
  url: href("/universal-waste-recycling/Wisconsin/"),
  figma: { board: "7377:20008", phone: "7377:20642" },
  seo: {
    title: "Universal Waste Recycling in Wisconsin | Recycle Technologies",
    description: "One scheduled pickup for lamps, batteries, ballasts, and mercury devices, processed at our R2v3-certified New Berlin, WI facility with a certificate of recycling.",
  },
  schema: { service: "Universal Waste Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Universal Waste Recycling in Wisconsin",
    h1: "Universal Waste Recycling for Wisconsin Businesses",
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
      "Universal waste is a group of common hazardous materials that businesses generate every day, like fluorescent lamps, batteries, and mercury devices. Federal and Wisconsin rules let you manage them under simpler universal waste rules, but they still can't go in the trash. Recycle Technologies collects them in one scheduled pickup and gives you a certificate of recycling for your records.",
    ],
    image: '/images/landing/photo-new-berlin.png',
  },
  options: {
    heading: "Pickup Options",
    cards: [
      { title: "Business Pickup", body: "One scheduled pickup for all your universal waste from your site within our Wisconsin pickup area." },
      { title: "Drop-Off", body: "2815 S 171st St, New Berlin." },
      { title: "Mail-In Kit", body: "Small quantities? Order a mail-in kit" },
    ],
    buttons: [{ label: "Order a Mail-In Kit", href: href("/mail-in-recycling/") }],
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
      { title: "Pickup", body: "Our team collects everything from your site." },
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
  areas: { lead: "Milwaukee, Waukesha, New Berlin, Brookfield, Racine, Kenosha, Oconomowoc, Madison, Green Bay, and Appleton." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "What counts as universal waste?", a: "Lamps, batteries, mercury devices, and similar items covered by federal and Wisconsin universal waste rules." },
      { q: "Can you pick up everything in one visit?", a: "Yes. Lamps, batteries, ballasts, and mercury devices can go in one scheduled pickup." },
      { q: "Do you accept PCB ballasts?", a: "Yes. We accept both PCB and non-PCB ballasts." },
      { q: "How should I store universal waste before pickup?", a: "Keep lamps in closed boxes, tape battery terminals, and label containers with the start date." },
      { q: "Will I get proof of recycling?", a: "Yes. You receive a certificate of recycling for your compliance records." },
    ],
  },
  cta: {
    heading: "Get a Universal Waste Recycling Quote in Wisconsin",
    body: "Tell us what you have, and we'll set up the right pickup for your business.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: "Call 262-798-3040", href: "tel:+12627983040" },
    email: "widispatch@recycletechnologies.com",
  },
  todo: [],
}
