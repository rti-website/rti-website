import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Lewisburg, Tennessee, /lewisburg-tennessee/
 * Built 8 Oct 2026 on the county template (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333), laid out like Johnson City (Buffalo), TN.
 *
 * 9 Oct 2026: rewritten for the SEO team's "Lewisburg Page Issues 2026-10-10"
 * sheet, issue by issue:
 *   1  drop-off: the address, "call for hours" and the appointment note in the
 *      quick-info bar and the Ways to Recycle list (no hours on record yet;
 *      the drop-off page says the same);
 *   2  no "local ... in Minnesota since 1993" card, and the site footer's
 *      "Midwest-based" line now adds "with locations across the US";
 *   3  Lewisburg specifics: address, pickup contact, drop-off, accepted
 *      items, how to book;
 *   4  "Lewisburg, Tennessee" kept to the H1, the lead area and the first
 *      paragraph; natural wording after that;
 *   5  a plain list of accepted items, naming the bulb types;
 *   6  a new title (service and location) and a one sentence description;
 *   7  each phone number says what it is for;
 *   8  one Business Pick-Up block (the shared Service Options cards are left
 *      out, `noServices`) and the mail-in program in one place;
 *   9  sections in order: ways to recycle and what we accept, then the
 *      services, then why choose us;
 *  10  the external "Buy Recycling Kits" link (EZ on the Earth, in the shared
 *      cards) is gone with them; the mail-in link goes to /mail-in-recycling/.
 */
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=1580+Old+Columbia+Rd%2C+Lewisburg%2C+TN+37091"

export const LEWISBURG_TENNESSEE: CountyPage = {
  url: "/lewisburg-tennessee/",
  state: "Tennessee",
  county: "Lewisburg",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Recycling in Lewisburg, TN: Bulbs, Batteries & E-Waste',
    description: "Recycle fluorescent and LED bulbs, batteries and electronics in Lewisburg, Tennessee, with business pickup, drop-off by appointment or a mail-in kit.",
  },
  hero: {
    h1: 'Recycle Technologies Lewisburg, TN',
    crumb: "Lewisburg, Tennessee",
    lead: "Bulb, battery and electronics recycling in Lewisburg, Tennessee: business pickup, drop-off by appointment, or a mail-in kit.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  quickInfo: [
    { glyph: 'pin',   label: "Address",                  value: "1580 Old Columbia Rd, Lewisburg, TN 37091", href: MAPS },
    { glyph: 'phone', label: "Pickups and drop-off",     value: "931-334-1265", href: "tel:+19313341265" },
    { glyph: 'clock', label: "Drop-off hours",           value: "Call for hours; by appointment" },
    { glyph: 'phone', label: "General questions",        value: "(800) 969-5166", href: "tel:+18009695166" },
  ],
  about: {
    heading: "Recycling in Lewisburg, Tennessee",
    blocks: [
      { p: "Recycle Technologies recycles light bulbs, batteries and electronics for businesses and residents in Lewisburg, Tennessee and the surrounding area, from our site at 1580 Old Columbia Road. Bring materials in by appointment, book a business pickup, or mail them to us in a prepaid kit." },
      { h: "Three ways to recycle" },
      { list: [
        { title: "Business pickup", text: "We collect from offices, stores, warehouses and other facilities. Call Keith Holt, Transfer Manager, on 931-334-1265, or [request a pickup online](pickup)." },
        { title: "Drop-off", text: "Bring your materials to 1580 Old Columbia Road. Call 931-334-1265 first to confirm the hours and book a drop-off time." },
        { title: "Mail-in kit", text: "Order a prepaid kit, fill it and drop it at the nearest FedEx. [See the mail-in program](mailin)." },
      ] },
      { h: "What we accept" },
      { list: [
        { title: "Light bulbs and lamps", text: "Fluorescent tubes, CFLs, LED, HID, U-shaped and circular lamps, halogen and incandescent bulbs, and broken fluorescent lamps." },
        { title: "Ballasts", text: "PCB and non-PCB ballasts." },
        { title: "Batteries", text: "Alkaline, lithium ion, lithium metal, nickel cadmium, nickel metal hydride and lead acid batteries." },
        { title: "Electronics", text: "Computers, laptops, monitors, TVs, phones, printers, servers and other office equipment." },
      ] },
      { p: "Not sure about an item? Call 931-334-1265 before you bring it in, or [get a quote](quote)." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Our Recycling Services", blocks: [
      { h: "Electronics Recycling" },
      { p: "We take old computers, laptops, televisions, phones and large office equipment, and break them down to recover valuable materials such as metals and circuit boards. Businesses and households can clear out old equipment while staying within environmental rules, and nothing goes to a landfill." },
      { h: "Battery Recycling" },
      { p: "From household batteries to large industrial units, every battery is sorted and processed so that hazardous materials stay out of the environment and the metals inside can be reused. Tape the terminals of lithium and rechargeable batteries before transport." },
      { h: "Light Bulb Recycling" },
      { p: "Fluorescent bulbs contain mercury and cannot go in the trash. We recycle fluorescent, CFL, LED and other lamps safely, keeping harmful materials out of landfills, and we take anything from a single box of tubes to a full relamping project." },
    ] },
    { kind: 'text', heading: "Why Choose Recycle Technologies", blocks: [] },
    { kind: 'features', cards: [
      { title: "Recycling Since 1993", text: "More than 30 years of recycling experience, with locations across the US, including this site in Lewisburg serving customers in Tennessee." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Our Environmental Responsibility", blocks: [
      { p: "Alongside our subsidiaries, Lighting Resources and EZ on the Earth, we use the latest recycling technology to recover as much material as possible, cutting landfill waste and environmental damage. E-waste and other materials become reusable resources, supporting a circular economy." },
    ] },
  ],
  noServices: true,
  company: {
    name: "Business Pick-Up Service",
    text: "To book a business pickup or a drop-off time in Lewisburg, contact our Transfer Manager.",
    lines: [
      { kind: 'person', text: "Keith Holt, Transfer Manager" },
      { kind: 'phone', text: "Pickups and drop-off: 931-334-1265", tel: "+19313341265", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
