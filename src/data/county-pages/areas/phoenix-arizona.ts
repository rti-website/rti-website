import { PICKUP_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Phoenix, Arizona, /phoenix-arizona/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:76092, phone 7084:76418 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const PHOENIX_ARIZONA: CountyPage = {
  url: "/phoenix-arizona/",
  state: "Arizona",
  county: "Phoenix",
  service: "Light Bulb Recycling",
  figma: { board: "7084:76092", phone: "7084:76418" },
  seo: {
    title: "Recycling in Phoenix, Arizona | Call (800) 969-5166",
    description: "Recycling services Arizona coordinating collection of electronics, lighting waste, battery types, paper materials, and approved items statewide. Call (800) 969-5166",
  },
  hero: {
    h1: 'Recycle Technologies Phoenix, AZ',
    crumb: "Phoenix",
    /* Home / Locations / Arizona / Phoenix (14 Oct 2026, the state hub brief). */
    parent: { label: "Arizona", href: href('/arizona-recycling/') },
    lead: "Arizona PCB Ballast Processing Facility, 1545 East Victory Street, Phoenix, AZ 85040",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  // 20 Oct 2026, the facility content doc (Aaqib): address, phone, hours, Getting Here, what it accepts, drop-off, FAQ and county.
  quickInfo: [
    { glyph: 'pin',   label: "Address", value: "1545 East Victory Street, Phoenix, AZ 85040", href: "https://www.google.com/maps/dir/?api=1&destination=1545+East+Victory+Street%2C+Phoenix%2C+AZ+85040" },
    { glyph: 'phone', label: "Phone", value: "602-276-4278", href: "tel:+16022764278" },
    { glyph: 'clock', label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
  ],
  directions: {
    heading: "Getting Here",
    intro: "Enter via the main lot on East Victory Street. Staff will direct you to the drop-off area when you arrive.",
    introShort: "Enter via the main lot on East Victory Street. Staff will direct you to the drop-off area when you arrive.",
    rows: [
      { label: "Nearest Highway", value: "Interstate 17 (Maricopa Freeway)" },
      { label: "Parking", value: "I-17; corner of S 16th St and E Victory St; access on Victory St, left side toward the end of the cul-de-sac" },
      { label: "Drop-off Entrance", value: "I-17; corner of S 16th St and E Victory St; access on Victory St, left side toward the end of the cul-de-sac" },
    ],
    primary: "Get Directions",
    secondary: "Call This Location",
    name: "Arizona PCB Ballast Processing Facility",
    address: "1545 East Victory Street, Phoenix, AZ 85040",
    tel: "+16022764278",
    mapsHref: "https://www.google.com/maps/dir/?api=1&destination=1545+East+Victory+Street%2C+Phoenix%2C+AZ+85040",
  },
  about: {
    heading: "Electronics Recycling Services in Phoenix, Arizona",
    blocks: [
      { p: "Recycle Technologies offers top-tier electronics recycling services in Phoenix, Arizona, tailored to ensure the safe and eco-friendly disposal of electronic waste. Whether dealing with outdated computers, laptops, TV, mobile phones, or large office equipment, our team handles each item with care and precision. By dismantling devices into reusable components like component metals and glass, we significantly reduce the environmental footprint of electronic waste. Our Electronic Waste Recycling Services in Arizona are indispensable for businesses and individuals aiming to declutter while staying compliant with environmental regulations and embracing sustainable practices." },
      { h: "Battery Recycling Services in Phoenix, Arizona" },
      { p: "Our Battery Recycling Services in Arizona, Phoenix make us essential for the safe disposal of various battery types in the region. From household batteries to large industrial ones, their thorough program ensures all components are carefully processed and recycled. Whether it is household batteries or office waste, batteries have the most impact on the environment if they are casually dumped in landfills to rot. Our capable team of professionals not only prevents hazardous materials from contaminating the environment but also recovers valuable resources for reuse. Choosing Recycle Technologies means actively reducing landfill waste and supporting sustainable resource management. Partner with them to make a significant environmental impact and champion a greener future for Phoenix and beyond." },
    ],
  },
  sections: [
    // 20 Oct 2026, the facility content doc.
    { kind: 'text', heading: "What This Location Accepts", blocks: [{ p: "Lamps, e-waste, aerosol cans, non-PCB capacitors, ballasts, batteries, mercury devices" }] },
    { kind: 'text', heading: "Dropping Off at This Location", blocks: [{ p: "I-17; corner of S 16th St and E Victory St; access on Victory St, left side toward the end of the cul-de-sac" }] },
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local recycling company and a Certified Minority Business Enterprise (MBE), offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Phoenix, Arizona", blocks: [
      { p: "Looking for an easy and legal way to recycle your old light bulbs in the Phoenix, Arizona area? Let Recycle Technologies be your go-to support! When it comes to Arizona Bulb Recycling Services, we have you covered from top to bottom. Whether you live in Phoenix, Arizona, or anywhere else in the state, our fluorescent bulb recycling services will take care of the proper and environmentally beneficial recycling of your old light bulbs. We are dedicated to more than just making your life easier. You can help make America a greener place by selecting our Bulb Recycling service in Phoenix, Arizona. Reducing waste and keeping hazardous materials out of landfills are two of our top priorities when it comes to recycling. In order to ensure a sustainable future, let us collaborate! Bulb Recycling Services in Phoenix, Arizona are available; for more information, contact us now." },
      { h2: "Our Environmental Responsibility" },
      { p: "Recycle Technologies and its subsidiaries, Lighting Resources and EZ on the Earth, lead in advanced recycling practices. Utilizing state-of-the-art technology, we maximize material recovery, significantly reducing landfill waste and environmental harm. Committed to sustainable practices, we transform e-waste and other materials into reusable resources, promoting a circular economy." },
      { p: "Our processes not only reclaim valuable materials but also minimize ecological damage. As environmental advocates, we continually innovate in waste management, offering comprehensive services that cater to both businesses and consumers. Choosing us means supporting a cleaner, healthier, and sustainable future. You can do so by contacting Jack Ocampo, our Arizona branch manager, at 602-276-4278 for more information." },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx." },
    ] },
    // 8 Oct 2026: links to the nearby locations (the Ontario content doc).
    { kind: 'text', heading: "Nearby Recycle Technologies Locations", blocks: [
      { list: [
        { title: "Ontario, California", text: "805 E Francis St, Ontario, CA 91761", href: href('/ontario-california/') },
        { title: "Fort Worth, Texas", text: "", href: href('/fort-worth-texas/') },
        { title: "All Locations", text: "", href: href('/all-locations/') },
      ] },
    ] },
    // 20 Oct 2026, the facility content doc.
    { kind: 'faq', heading: "Questions About This Location", items: [
      { q: "Is there a fee for dropping off at this location?", a: "Fees depend on the material and the quantity. Call (480) 393-5729 with a description of what you plan to bring, and we will confirm any charges before you make the trip." },
      { q: "Do I need an appointment to drop off at the Phoenix facility?", a: "Drop-off requirements vary by material and quantity. Call (480) 393-5729 before you visit to confirm what you are bringing is accepted and whether a time needs to be arranged. Large or commercial loads, in particular, go faster when the loading area expects you." },
      { q: "Can businesses schedule a bulk pickup from this facility?", a: "Yes. Business pickups are available within roughly a 100-mile radius of the facility. Pickup arrangements depend on the materials, quantity, location, and service required. Request a quote to get started." },
    ] },
    { kind: 'text', heading: "Counties We Serve", blocks: [{ list: [{ title: "Maricopa County", text: "" }] }] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Jack Ocampo" },
      { kind: 'phone', text: "602-620-2285", tel: "+16026202285", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
