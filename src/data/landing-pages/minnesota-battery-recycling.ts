import { href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Battery Recycling in Minnesota: /battery-recycling/Minnesota/ (Google Ads landing page, noindex).
 * Figma BVtf2AOuUOcYbiMIlcKmbC, page New Pages: board 7374:15764, phone 7374:16419 (27 Oct 2026).
 * The frame's copy word for word. Built by LandingServicePage.
 * SEO title and description kept from the ad page this URL has carried since 24 Sep 2026.
 */
export const LANDING_MINNESOTA_BATTERY_RECYCLING: LandingPage = {
  url: href("/battery-recycling/Minnesota/"),
  figma: { board: "7374:15764", phone: "7374:16419" },
  seo: STATE_PAGES["battery-recycling"].Minnesota.seo,
  schema: { service: "Battery Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Battery Recycling in Minnesota",
    h1: "Certified Battery Recycling Services in Minnesota",
    body: "Safe, certified battery recycling with scheduled pickup from our Blaine, MN facility. Lithium-ion, lead-acid, alkaline, NiCd, and EV batteries accepted, with a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: '#landing-quote' },
    image: '/images/landing/hero-battery.png',
  },
  highlights: ["Since 1993", "R2v3 & RIOS Certified", "Certificate of Recycling", "Business Pickup"],
  about: {
    heading: "Understanding Battery Recycling in Minnesota",
    body: [
      "Battery recycling is the process of collecting used or spent batteries and handling them safely instead of throwing them in the trash. Batteries contain materials like lithium, lead, cadmium, and acid that can leak into the environment or cause fires if damaged, crushed, or stored incorrectly. That's why rechargeable batteries are banned from trash in Minnesota, and many cities, including Minneapolis, no longer accept batteries in curbside recycling.",
      "Different battery types require different handling, so sorting is a key part of the process. At Recycle Technologies, collected batteries are brought to our Blaine, Minnesota facility, where trained staff sort them by chemistry for proper recycling. Once processed, you receive a certificate of recycling for your records.",
    ],
    image: '/images/landing/photo-blaine.png',
  },
  options: {
    heading: "Battery Recycling Options in Minnesota",
    cards: [
      { title: "Business Pickup", body: "Scheduled battery pickup within 100 miles of our Blaine facility." },
      { title: "Drop-Off", body: "Bring spent batteries to our Blaine facility." },
      { title: "Mail-In Program", body: "Outside our pickup area? Ship eligible batteries through our mail-in program." },
    ],
    buttons: [{ label: "View Drop-Off Location", href: href("/minnesota-recycling/ramsey/blaine/") }, { label: "Mail-In Program", href: href("/mail-in-recycling/") }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Battery Recycling?",
    cards: [
      { title: "Local Minnesota facility", body: "Batteries are sorted at our own Blaine facility, not sent through a broker." },
      { title: "Scheduled pickup", body: "We collect directly from your site within 100 miles of Blaine." },
      { title: "Compliance documentation", body: "A certificate of recycling for every processed pickup or drop-off." },
      { title: "Certified and experienced", body: "R2v3 and RIOS certified, serving businesses since 1993." },
    ],
  },
  items: {
    heading: "Batteries We Recycle",
    cards: [
      { title: "Lithium-ion batteries", body: "Laptop, phone, tablet, and equipment battery packs" },
      { title: "Lead-acid batteries", body: "Sealed lead-acid, UPS, and battery backup units" },
      { title: "Alkaline & zinc batteries", body: "AA, AAA, C, D, and 9V" },
      { title: "NiCd & button cell batteries", body: "Rechargeables and small device batteries" },
      { title: "EV & power tool batteries", body: "Electric vehicle, and power tool packs" },
    ],
  },
  steps: {
    heading: "How Do We Recycle Batteries in Minnesota?",
    intro: "From your site to final processing, we make battery recycling simple, safe, and fully documented.",
    cards: [
      { title: "Request a Quote", body: "Tell us your battery types and approximate quantity. Our team will recommend the right option for your business." },
      { title: "Prepare Your Batteries", body: "Tape battery terminals or bag each battery individually to prevent short circuits. Keep damaged, swollen, or leaking batteries separate and let us know before pickup." },
      { title: "Pickup or Drop-Off", body: "Businesses within 100 miles of Blaine can arrange a pickup, and our team collects batteries directly from your location. You can also drop off batteries at our Blaine facility." },
      { title: "Sorting at Our Minnesota Facility", body: "Trained staff at our Blaine facility sort batteries by chemistry, including lithium-ion, lead-acid, alkaline, and NiCd, so each type is handled correctly." },
      { title: "Certificate of Recycling", body: "Once your batteries are processed, you receive a certificate of recycling for your compliance records." },
    ],
  },
  industries: {
    lead: "Manufacturing, healthcare, automotive and fleet, retail and corporate offices, education, and government organizations across Minnesota.",
    cards: [
      { title: "Manufacturing", key: "manufacturing" },
      { title: "Healthcare", key: "healthcare" },
      { title: "Automotive and fleet", key: "automotive" },
      { title: "Retail and corporate offices", key: "retail" },
      { title: "Education", key: "education" },
      { title: "Government organizations", key: "government" },
    ],
  },
  areas: { lead: "Battery pickup within 100 miles of our Blaine facility, including Minneapolis, St. Paul, Bloomington, Plymouth, Maple Grove, Brooklyn Park, Coon Rapids, Blaine, Burnsville, Lakeville, Woodbury, and St. Cloud." },
  certBody: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.',
  faq: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    items: [
      { q: "Where can businesses recycle batteries in Minnesota?", a: "Recycle Technologies offers battery pickup within 100 miles of Blaine, drop-off at our Blaine facility, and a mail-in program." },
      { q: "Do you recycle lithium-ion batteries?", a: "Yes. We accept lithium-ion packs from laptops, phones, tools, and equipment, plus EV batteries." },
      { q: "How should I store batteries before pickup?", a: "Tape terminals or bag batteries individually and store them in a cool, dry container. Keep damaged or swollen batteries separate and let us know before pickup." },
      { q: "Do I need to sort batteries before pickup?", a: "No. Our team sorts batteries by type at our Blaine facility." },
      { q: "Will I receive proof of recycling?", a: "Yes. Every processed pickup or drop-off includes a certificate of recycling and safe disposal." },
      { q: "Can I recycle batteries by mail?", a: "Yes. Eligible batteries can be shipped through our mail-in program." },
    ],
  },
  cta: {
    heading: "Get a Battery Recycling Quote in Minnesota",
    body: "Tell us about your batteries and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: '#landing-quote' },
    secondary: { label: "Call 763-559-5130", href: "tel:+17635595130" },
    email: "dispatch@recycletechnologies.com",
  },
  todo: [],
}
