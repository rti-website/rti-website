import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_HIGHLIGHTS, WILLIAMSTON_PLACE } from './williamston-shared'

/**
 * Ballast Recycling in Williamston, SC: /south-carolina/williamston/ballast-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * No South Carolina phone or email yet: the closing band has Get a Quote only.
 */
export const LANDING_WILLIAMSTON_BALLAST_RECYCLING: LandingPage = {
  url: href('/south-carolina/williamston/ballast-recycling/'),
  figma: { board: '7376:7167', phone: '7376:7779' },
  seo: {
    title: "Ballast Recycling in Williamston, SC | Recycle Technologies",
    description: "PCB and non-PCB ballast recycling in Williamston, SC from Recycle Technologies. Business pickup across Upstate South Carolina, with a certificate of recycling. Get a quote.",
  },
  schema: { service: "Ballast Recycling", areaServed: ['Williamston, SC', 'Upstate South Carolina'] },
  noCrumbs: true,
  hero: {
    crumb: "Ballast Recycling in Williamston, SC",
    h1: "Certified Ballast Recycling Services in Williamston, SC",
    body: "Commercial ballast recycling for Upstate South Carolina businesses, with scheduled pickup to our facility in Williamston, SC. PCB, non-PCB, electronic, and magnetic ballasts accepted, with hazardous components sent to an EPA-approved incineration facility and a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
    image: "/images/services/hero-ballasts-v2.png",
    photo: "/images/services/ballasts-process-v2.png",
  },
  highlights: WILLIAMSTON_HIGHLIGHTS,
  about: {
    heading: "Why Recycle Ballasts in South Carolina?",
    body: [
      "A ballast regulates the electrical current inside a fluorescent or HID light fixture. When fixtures are replaced or a building upgrades its lighting, the old ballasts can't go in a dumpster. Older magnetic ballasts may contain capacitors filled with PCBs or DEHP, both regulated substances that need special handling.",
      "Recycle Technologies has been recycling ballasts since 1993. Businesses in Greenville, Anderson, Spartanburg and across Upstate South Carolina can book a scheduled pickup, and collected ballasts go to our Williamston, SC facility, where they are sorted by type so hazardous parts are destroyed and copper and steel are recovered.",
    ],
    image: "/images/services/ballasts-intro-v2.png",
  },
  options: {
    heading: "Ballast Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Scheduled collection of spent ballasts directly from your South Carolina facility or retrofit job site." },
      { title: "Mail-In Program", body: "Order a ballast recycling kit for smaller quantities." },
    ],
    buttons: [{ label: 'Mail-In Program', href: href('/mail-in-recycling/') }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Ballast Recycling?",
    cards: [
      { title: "Certified facility", body: "Ballasts are handled through our Williamston, SC facility under our R2v3-certified process." },
      { title: "EPA-approved disposal", body: "PCB and DEHP components go to an EPA-approved incineration facility through a certified hazardous waste hauler." },
      { title: "Certificate of recycling", body: "Proof of proper disposal for your compliance records." },
      { title: "Proven experience", body: "Recycling lighting ballasts since 1993." },
    ],
  },
  items: {
    heading: "Ballasts We Recycle",
    cards: [
      { title: "PCB ballasts", body: "Older magnetic ballasts that may contain PCB-filled capacitors" },
      { title: "Non-PCB ballasts", body: "Magnetic or electronic ballasts made without PCB-containing capacitors" },
      { title: "Electronic ballasts", body: "Ballasts used in most newer fluorescent fixtures" },
      { title: "Magnetic ballasts", body: "Traditional ballasts found in older lighting fixtures" },
    ],
    note: "Not sure which type of ballast you have? Describe your materials when requesting a quote and we'll confirm how they need to be handled.",
  },
  steps: {
    heading: "How Do We Recycle Ballasts in South Carolina?",
    intro: "We manage the entire process, from collecting your ballasts to recovering their materials.",
    cards: [
      { title: "Request a Quote", body: "Share your ballast types and estimated volume, and we'll set up the right service for your business." },
      { title: "Scheduled Pickup", body: "Our team collects spent ballasts from your location and transports them to our Williamston, SC facility." },
      { title: "Sorting & Dismantling", body: "Ballasts are sorted as magnetic or electronic, then taken apart to separate metals, plastics, and capacitors." },
      { title: "Hazardous Component Removal", body: "PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility through a certified hazardous waste hauler, which eliminates generator liability for your business." },
      { title: "Recovery & Certificate", body: "Copper, steel, and other non-hazardous materials are reclaimed for reuse. You receive a certificate of recycling for your records." },
    ],
  },
  areas: {
    lead: "Commercial ballast pickup across Upstate South Carolina, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Mauldin, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA and RIOS.",
  cta: {
    heading: "Get a Ballast Recycling Quote in Williamston, SC",
    body: "Tell us about your ballasts and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
  },
  todo: [...WILLIAMSTON_CONTACT_TODO, "The ballast doc has no Industries We Serve section; built without it, as written.", "Hero and photos: there is no ballast landing photo, so the ballast service page photos are used."],
}
