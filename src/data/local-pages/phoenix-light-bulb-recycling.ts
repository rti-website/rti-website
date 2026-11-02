import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Phoenix, AZ — /arizona/phoenix/light-bulb-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Arizona tab).
 * Copy: the content team's Google Doc "Light Bulb Recycling in Phoenix, AZ", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const PHOENIX_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/arizona/phoenix/light-bulb-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Light Bulb Recycling in Phoenix, AZ | Recycle Technologies",
    description: "Recycle fluorescent tubes, CFLs, HID and LED bulbs in Phoenix, AZ. Walk-in drop-off near I-17 for up to 4 pallets, business pickup and mail-in kits.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Phoenix, AZ", "Arizona"] },
  hero: {
    crumb: "Light Bulb Recycling in Phoenix, AZ",
    h1: "Light Bulb Recycling in Phoenix, AZ",
    body: [
      "Light bulb recycling for Phoenix and the Valley, with walk-in drop-off on Victory Street near I-17, commercial pickup for businesses, and prepaid mail-in kits.",
      `Burned-out bulbs often contain mercury, so they don't belong in the trash or the blue bin. Recycle Technologies recycles light bulbs for households and businesses at our [Phoenix site](${href('/phoenix-arizona/')}), 1545 East Victory Street, near I-17. We take fluorescent tubes, CFLs, HID and high-pressure sodium lamps, LED, halogen and incandescent bulbs, and more. Walk in on a weekday with up to 4 pallets, order a mail-in kit for a small batch, or set up commercial pickup for larger or recurring volumes.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Phoenix Light Bulb Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Phoenix Recycling Center](${href('/phoenix-arizona/')}) (Maricopa County)`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1545 East Victory Street, Phoenix, AZ 85040](https://www.google.com/maps/dir/?api=1&destination=1545+E+Victory+St%2C+Phoenix%2C+AZ+85040)" },
            { label: "Phone", value: "(602) 276-1858" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 2:00 PM" },
            { label: "Arrival", value: "The site sits near I-17 at the corner of South 16th Street. The entrance is on Victory Street, on your left near where the cul-de-sac ends." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Residential and business drop-off:** Walk-ins accepted for 1 to 4 pallets.", "**Commercial pickup:** Within roughly 100 miles. Contact the team to confirm your site."],
            ["**Mail-in:** Prepaid bulb kits, ordered online and dropped off at FedEx."],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Light Bulbs We Take in Phoenix",
      grey: true,
      blocks: [
        { kind: "text", body: ["Whether it's a closet of spare CFLs or the tubes from an office relamp in Tempe, the Phoenix site accepts:"] },
        { kind: "bullets", rows: [
            ["Straight fluorescent tubes, coated and shielded types included", "Green-tipped, circular and U-bend fluorescent lamps"],
            ["Compact fluorescent lamps (CFLs)", "HID lamps such as metal halide and HPS (high-pressure sodium)"],
            ["LED lamps", "UV lamps and cold cathode lamps, such as neon and argon"],
            ["Flood, halogen and incandescent bulbs"],
        ] },
        { kind: "h3", text: "Packing Bulbs Safely" },
        { kind: "text", body: ["Shipping rules from the federal Department of Transportation cover bulbs, so pack them in a sturdy container, such as the box the new bulbs came in. Don't tape tubes together or drop them loose in a bag. Businesses with a scheduled pickup can ask for packing materials ahead of time.", `See our main [light bulb recycling page](${href('/light-bulbs/')}) for more on accepted lamps.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Light Bulb Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Choose your route", body: ["Walk in at Victory Street, order a mail-in kit, or book commercial pickup for larger quantities."] },
              { n: 2, title: "Protect the bulbs", body: ["Keep them in original packaging or a sturdy box so nothing cracks on the drive."] },
              { n: 3, title: "Hand them off", body: ["Unload at the Phoenix site, stage boxes for a scheduled pickup, or ship your kit."] },
            ],
            [
              { n: 4, title: "Separation", body: ["Lamps are broken down so glass, metal end caps and phosphor powder are split apart."] },
              { n: 5, title: "Mercury recovery", body: ["Mercury material is sent to our Greenwood, IN retort facility instead of a landfill."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Light Bulb Recycling Options in Phoenix, AZ",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Looking for light bulb recycling near you in Phoenix, Tempe or South Phoenix? Bring boxed bulbs to 1545 East Victory Street on a weekday between 7:30 AM and 2:00 PM. Walk-ins are fine for 1 to 4 pallets, and drop-off is open to households and businesses. Call (602) 276-1858 first for a bigger load or any broken lamps.", `The same visit can include [ballasts](${href('/ballasts/')}), [batteries](${href('/battery-recycling/')}), [electronics](${href('/electronic-recycle/')}) and mercury devices.`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: ["Property managers, schools, hospitals, retailers and electrical contractors that replace lamps regularly can arrange pickup instead of hauling them in. Pickup is a business service, covering sites within roughly 100 miles, including Mesa, Scottsdale, Chandler, Gilbert, Glendale, Peoria and Goodyear.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Site address:** street, city and ZIP code.", "**Lamp types:** tubes, CFLs, HID or other bulbs."],
            ["**Quantity:** an estimated count, box total or pallets.", "**Broken lamps:** any cracked or shattered bulbs."],
            ["**Frequency:** a one-time relamp or recurring pickups.", "**Packing materials:** whether you'd like containers delivered first."],
        ] },
        { kind: "buttons", primary: { label: "Request a Light Bulb Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: [`If you'd rather not drive in, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it, and drop it at FedEx. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Light Bulb Recycling Rules in Phoenix",
      grey: false,
      blocks: [
        { kind: "text", body: ["Arizona's environmental agency, ADEQ, manages mercury-containing lamps from businesses as universal waste, which means labeled containers and delivery to a handler or facility that accepts them ([ADEQ](https://static.azdeq.gov/wpd/hazwaste/universalwastemgmt_pres.pdf)). Fluorescent and HID lamps shouldn't go in household trash or curbside recycling.", "The City of Phoenix offers one at-home household hazardous waste collection a year for eligible residential customers, by appointment. Our Phoenix site gives households and businesses a weekday walk-in option all year, plus pickup for larger volumes."] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Light Bulb Recycling in Phoenix",
      grey: true,
      blocks: [
        { kind: "bullets", rows: [
            ["**Walk-in drop-off:** A Victory Street site near I-17 that takes up to 4 pallets without an appointment.", "**Wide range of lamps:** Fluorescent tubes, CFLs, HID, HPS, LED, UV, halogen and more."],
            ["**Commercial pickup:** For Valley businesses within roughly 100 miles with recurring bulb waste.", "**Mercury recovery:** Mercury material is sent to our Greenwood, IN retort facility."],
            ["**Mail-in option:** Prepaid kits for small batches or anyone farther out.", "**Since 1993:** A recycler with more than three decades of experience."],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Light Bulb Recycling FAQs",
    items: [
      { q: "Is light bulb recycling free in Phoenix?", a: "Cost depends on the bulb types and quantity. Call (602) 276-1858 or request a quote before your visit." },
      { q: "Can I recycle broken fluorescent bulbs?", a: "Call first for handling and packing instructions, since broken mercury lamps need extra care." },
      { q: "Can a small business use mail-in instead of commercial pickup?", a: "Yes, for smaller quantities that fit the kit. Pickup suits larger or recurring volumes." },
      { q: "How is your pickup different from the city's household hazardous waste program?", a: "The city's program serves eligible residents once a year by appointment. Our pickup is a business service for ongoing or bulk bulb waste." },
      { q: "Can I bring LED bulbs from a retrofit along with the old tubes?", a: "Yes. LED lamps are accepted, so old and new bulbs from the same job can come in together." },
      { q: "Can I get proof that my bulbs were recycled?", a: "Ask about a certificate of recycling when you drop off or book a pickup." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Light Bulb Recycling in Phoenix, AZ",
    body: ["Walk in at Victory Street on any weekday, order a mail-in kit for a small batch, or send us your site and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Phoenix", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Phoenix reviews are supplied"],
}
