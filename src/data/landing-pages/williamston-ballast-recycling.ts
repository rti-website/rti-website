import { QUOTE_HREF, href } from '@/lib/urls'
import type { LandingPage } from '@/data/local-pages/types'
import { WILLIAMSTON_CALL, WILLIAMSTON_CONTACT_TODO, WILLIAMSTON_EMAIL, WILLIAMSTON_FACILITY, WILLIAMSTON_ADDRESS, WILLIAMSTON_HOURS, WILLIAMSTON_PLACE_ADDRESS, williamstonHighlights } from './williamston-shared'

/**
 * Ballast Recycling in Williamston, SC: /south-carolina/williamston/ballast-recycling/ (Google Ads page, noindex, 11 Nov 2026).
 * The content team's doc for this URL, word for word (typos and spacing
 * fixed), in the Google Ads landing design (LandingServicePage, as
 * /light-bulbs/Wisconsin/). No breadcrumb (Aaqib: "these are for google ads").
 * The closing band: Get a Quote, Call (864) 774-8310 and support@lightingresourcesinc.com (11 Nov 2026).
 * Updated to the doc's 12 Nov 2026 version (TL): collection wording, the address on
 * the map card, and the address and hours in the closing band.
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
  // Get a Quote only: no Schedule a Pickup anywhere on the page (management, 12 Nov 2026).
  quoteOnly: true,
  hero: {
    crumb: "Ballast Recycling in Williamston, SC",
    h1: "Certified Ballast Recycling Services in Williamston, SC",
    body: "Commercial ballast recycling for Upstate South Carolina businesses, with collection to our facility in Williamston, SC. PCB, non-PCB, electronic, and magnetic ballasts accepted, with hazardous components sent to an EPA-approved incineration facility and a certificate of recycling for your records.",
    button: { label: 'Get a Quote', href: QUOTE_HREF },
    image: "/images/services/hero-ballasts-v2.png",
    photo: "/images/services/ballasts-process-v2.png",
    facility: WILLIAMSTON_FACILITY,
  },
  highlights: williamstonHighlights('Ballasts'),
  about: {
    heading: "Why Recycle Ballasts in South Carolina?",
    body: [
      "A ballast regulates the electrical current inside a fluorescent or HID light fixture. When fixtures are replaced or a building upgrades its lighting, the old ballasts can't go in a dumpster. Older magnetic ballasts may contain capacitors filled with PCBs or DEHP, both regulated substances that need special handling.",
      "Ballasts collected from businesses in Greenville, Anderson, Spartanburg and across Upstate South Carolina go to our Williamston, SC facility, where they are sorted by type so hazardous parts are destroyed and copper and steel are recovered. Recycle Technologies has been recycling ballasts since 1993.",
    ],
    image: "/images/services/ballasts-intro-v2.png",
  },
  options: {
    heading: "Ballast Recycling Options in South Carolina",
    cards: [
      { title: "Business Pickup", body: "Collection of spent ballasts directly from your South Carolina facility or retrofit job site, whether you have one ballast or hundreds." },
      { title: "Mail-In Program", body: "Order a ballast recycling kit for smaller quantities." },
    ],
    buttons: [{ label: 'Mail-In Program', href: href('/mail-in-recycling/') }],
  },
  why: {
    heading: "Why Choose Recycle Technologies for Ballast Recycling?",
    cards: [
      { title: "Certified recycling", body: "Ballasts are handled through our Williamston, SC facility, backed by Recycle Technologies’ R2v3, RIOS and NAID AAA certifications." },
      { title: "EPA-approved disposal", body: "PCB and DEHP components go to an EPA-approved incineration facility through a certified hazardous waste hauler." },
      { title: "Certificate of recycling", body: "Proof of proper disposal for your compliance records." },
      { title: "Proven experience", body: "Recycle Technologies has been recycling lighting ballasts since 1993." },
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
      { title: "Collection & Transport", body: "Our team collects spent ballasts from your location and transports them to our Williamston, SC facility." },
      { title: "Sorting & Dismantling", body: "Ballasts are sorted as magnetic or electronic, then taken apart to separate metals, plastics, and capacitors." },
      { title: "Hazardous Component Removal", body: "PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility through a certified hazardous waste hauler." },
      { title: "Recovery & Certificate", body: "Copper, steel, and other non-hazardous materials are reclaimed for reuse. You receive a certificate of recycling for your records." },
    ],
  },
  areas: {
    lead: "Commercial ballast pickup across Upstate South Carolina, including Greenville, Anderson, Spartanburg, Williamston, Easley, Greer, Simpsonville, Mauldin, Clemson, and Seneca.",
    place: WILLIAMSTON_PLACE_ADDRESS,
  },
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3, NAID AAA, and RIOS.",
  cta: {
    heading: "Get a Ballast Recycling Quote in Williamston, SC",
    body: "Whether you have one ballast or hundreds, tell us about your ballasts and our team will get back to you with the right recycling option.",
    primary: { label: 'Get a Quote', href: QUOTE_HREF },
    secondary: WILLIAMSTON_CALL,
    email: WILLIAMSTON_EMAIL,
    address: WILLIAMSTON_ADDRESS,
    hours: WILLIAMSTON_HOURS,
  },
  todo: [...WILLIAMSTON_CONTACT_TODO, "Step 4: the doc's closing words 'which eliminates generator liability for your business' are removed (management, 12 Nov 2026: federal rules do not allow a recycler to remove a generator's liability; LR's own service agreement says so).", "The ballast doc has no Industries We Serve section; built without it, as written.", "Hero and photos: there is no ballast landing photo, so the ballast service page photos are used."],
}
