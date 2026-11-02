import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Phoenix, AZ — /arizona/phoenix/electronic-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Arizona tab).
 * Copy: the content team's Google Doc "Electronics Recycling in Phoenix, AZ", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const PHOENIX_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/arizona/phoenix/electronic-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Electronics Recycling in Phoenix, AZ | Recycle Technologies",
    description: "Drop off business electronics, lamps, ballasts, and batteries at our Phoenix site off I-17, or book commercial pickup. Walk-ins for 1–4 pallets.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Phoenix, AZ", "Arizona"] },
  hero: {
    crumb: "Electronics Recycling in Phoenix, AZ",
    h1: "Electronics Recycling in Phoenix, AZ",
    body: [
      "Recycle Technologies offers electronics recycling and universal waste drop-off for businesses and residents at our Phoenix location near I-17. Bring computers, laptops, TVs, office equipment, lamps, ballasts, batteries, and other accepted materials to our site at 1545 East Victory Street.",
      "Walk-ins are accepted for 1–4 pallets, although appointments are preferred. Businesses with larger or recurring loads can request commercial pickup, while smaller quantities can be sent through our mail-in recycling program.",
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Phoenix Electronics Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Phoenix Recycling Center](${href('/phoenix-arizona/')}) (Maricopa County)`] },
        { kind: "info", rows: [
            { label: "Drop-off location", value: "[1545 East Victory Street, Phoenix, AZ 85040](https://www.google.com/maps/dir/?api=1&destination=1545+E+Victory+St%2C+Phoenix%2C+AZ+85040)" },
            { label: "Phone", value: "(602) 276-1858" },
            { label: "Drop-off hours", value: "Monday to Friday, 7:30 AM to 2:00 PM" },
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics and Universal Waste We Accept in Phoenix",
      grey: true,
      blocks: [
        { kind: "text", body: ["Our Phoenix location accepts electronics alongside the lamps, batteries, and other regulated materials that businesses often need to recycle during equipment replacements and facility cleanouts.", "Accepted materials include:"] },
        { kind: "bullets", rows: [
            ["Computers, laptops, televisions, mobile phones, and office equipment", "Fluorescent and other lamps, crushed lamp glass, and phosphor powder"],
            ["PCB and non-PCB ballasts and capacitors", "Batteries"],
            ["Mercury-containing devices", "Aerosol cans"],
        ] },
        { kind: "text", body: ["Contact us before bringing unusual materials or a large load to confirm acceptance and any applicable fees."] },
      ],
    },
    {
      figma: "doc-3",
      heading: "Electronics Recycling Options in Phoenix, AZ",
      grey: false,
      blocks: [
        { kind: "text", body: ["Choose the service that fits your quantity, location, and recycling needs."] },
        { kind: "h3", text: "Electronics Recycling Drop-Off" },
        { kind: "text", body: ["Bring eligible electronics and universal waste to our Phoenix collection site at 1545 East Victory Street, Phoenix, AZ 85040. The location is near I-17, at the corner of South 16th Street.", "Enter from Victory Street and continue toward the end of the cul-de-sac. The receiving area is on the left.", "Walk-ins are accepted for 1–4 pallets, although appointments are preferred. Pricing depends on the materials and quantity.", "Hours: Monday to Friday, 7:30 AM to 2:00 PM. Call (602) 276-1858 before visiting to confirm the current hours, accepted materials, and arrangements for larger loads."] },
        { kind: "h3", text: "Commercial Electronics Recycling Pickup" },
        { kind: "text", body: ["Businesses with bulk or recurring electronics recycling needs can request commercial pickup across the Phoenix service area.", "This option is intended for businesses, including offices, schools, property managers, contractors, and facilities teams. When requesting a quote, provide your address, the types of materials you need to recycle, and the approximate pallet count.", "We'll confirm service availability, scheduling, and pricing based on your requirements.", "Electronics recycling does not automatically include data destruction. If your computers or servers contain hard drives that require secure destruction, mention this when requesting a quote so we can confirm the available options."] },
        { kind: "buttons", primary: { label: "Request a Commercial Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule Commercial Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Electronics Recycling" },
        { kind: "text", body: ["For smaller loads, satellite offices, or locations far from our Phoenix site, our mail-in recycling program offers another way to recycle eligible materials.", `Order a prepaid [recycling kit](https://ezontheearth.com/collections/all?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Depending on the material, options include an [electronic scrap kit](${href('/electronics-recycling-kit/')}) and containers for laptop batteries, lamps, ballasts, and mercury-containing devices.`, `Review our [mail-in recycling program](${href('/mail-in-recycling/')}) for accepted materials and shipping requirements before ordering.`] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Why Choose Recycle Technologies for Electronics Recycling in Phoenix?",
      grey: true,
      blocks: [
        { kind: "h3", text: "A Convenient Phoenix Drop-Off Location" },
        { kind: "text", body: ["Our site at 1545 East Victory Street is near I-17 and accepts eligible materials from businesses and residents. Walk-ins are available for 1–4 pallets, making drop-off an option for smaller loads that don't require commercial pickup."] },
        { kind: "h3", text: "Electronics and Universal Waste at One Location" },
        { kind: "text", body: ["Businesses often need to manage more than computers and office equipment during a cleanout. Our Phoenix site accepts electronics alongside lamps, ballasts, batteries, mercury-containing devices, and aerosol cans."] },
        { kind: "h3", text: "Commercial Pickup for Larger Loads" },
        { kind: "text", body: ["For businesses managing larger quantities or recurring recycling needs, commercial pickup provides an alternative to transporting materials yourself. Contact us to confirm coverage and arrange a quote."] },
        { kind: "h3", text: "Part of an Established Recycling Network" },
        { kind: "text", body: ["Recycle Technologies has operated since 1993. Our Phoenix location is part of the Lighting Resources and Recycle Technologies network of 12 locations.", "The Phoenix site is registered as a Large Quantity Handler under EPA ID AZD983469594."] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Recycling Requirements in Arizona",
      grey: false,
      blocks: [
        { kind: "text", body: ["Arizona's universal waste rules cover materials such as batteries, lamps, mercury-containing equipment, and aerosol cans. Businesses handling these materials must follow applicable requirements for labeling, storage, and shipment to an appropriate handler or facility.", "The [Arizona Department of Environmental Quality](https://static.azdeq.gov/wpd/hazwaste/universalwastemgmt_pres.pdf) provides guidance on universal waste management.", "Electronics are not classified as universal waste under Arizona's universal waste list. Businesses should still arrange appropriate recycling rather than assume the same handling requirements apply to every material.", "Phoenix residents can also review the city's [household hazardous waste program](https://www.phoenix.gov/administration/departments/publicworks/residential-trash-recycling/household-hazardous-waste-collection.html). For electronics recycling and other accepted materials, our Phoenix drop-off location provides an additional option. Confirm acceptance and any fees before visiting."] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions About Phoenix Electronics Recycling",
    items: [
      { q: "Can I drop off electronics without an appointment in Phoenix?", a: "Yes. Walk-ins are accepted for 1–4 pallets, although an appointment is preferred. Confirm the current hours before visiting." },
      { q: "Do you accept PCB ballasts and capacitors?", a: "Yes. The Phoenix location accepts PCB and non-PCB ballasts and capacitors." },
      { q: "Are electronics considered universal waste in Arizona?", a: "No. Arizona's universal waste list covers materials such as batteries, lamps, mercury-containing equipment, and aerosol cans, but not electronics." },
      { q: "Are electronics processed at the Phoenix location?", a: "No. The Phoenix site operates as a collection and transfer location. Materials are consolidated and shipped to a processing facility." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "TV Recycling", href: href('/tv-recycling/') },
            { label: "Arizona Recycling Services", href: href('/arizona/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Phoenix, AZ",
    body: ["Whether you're recycling office electronics, managing universal waste, or arranging pickup for a larger business load, Recycle Technologies offers options to help you move forward.", "Bring 1–4 pallets to our Phoenix location, request a quote for commercial pickup, or explore our mail-in recycling kits for smaller quantities."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Commercial Pickup", href: PICKUP_HREF },
  },
  todo: ["\"Materials not accepted:\" heading left out (the doc has no list under it)", "\"Pickup coverage:\" line left out (empty in the doc)", "The doc repeats the commercial pickup paragraph", "it is shown once", "FAQ \"Do you offer hard drive destruction in Phoenix?\" left out (answer is [CONFIRM] in the doc)"],
}
