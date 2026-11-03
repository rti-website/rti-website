import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Lewisburg, TN — /tennessee/lewisburg/light-bulb-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Lewisburg tab).
 * Copy: the content team's Google Doc "Light Bulb Recycling in Lewisburg, TN", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const LEWISBURG_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/tennessee/lewisburg/light-bulb-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Light Bulb Recycling in Lewisburg, TN | Recycle Technologies",
    description: "Recycle fluorescent tubes, CFLs, HID and LED bulbs in Lewisburg, TN. Weekday drop-off on Old Columbia Road, business pickup and mail-in kits.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Lewisburg, TN", "Tennessee"] },
  hero: {
    crumb: "Light Bulb Recycling in Lewisburg, TN",
    h1: "Light Bulb Recycling in Lewisburg, TN",
    body: [
      "Light bulb recycling for Lewisburg, Marshall County and Middle Tennessee, with weekday drop-off on Old Columbia Road, commercial pickup for businesses, and prepaid mail-in kits.",
      `Recycle Technologies recycles light bulbs for households and businesses at our [Lewisburg Recycling Center](${href('/tennessee/lewisburg/')}), 1580 Old Columbia Road. We take fluorescent tubes, CFLs, HID, LED, halogen and incandescent bulbs, plus circular, U-shaped and broken fluorescent lamps. Drop off on weekdays, order a mail-in kit if a trip doesn't fit your schedule, or set up commercial pickup if your business replaces bulbs on a regular basis. Lamps are broken down so the glass, metal, and mercury-bearing phosphor each go their own way instead of to a landfill.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Lewisburg Light Bulb Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Lewisburg Recycling Center](${href('/tennessee/lewisburg/')}) (Marshall County)`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1580 Old Columbia Road, Lewisburg, TN 37091](https://www.google.com/maps/dir/?api=1&destination=1580+Old+Columbia+Road%2C+Lewisburg%2C+TN+37091)" },
            { label: "Phone", value: "615-214-4768" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 4:00 PM" },
            { label: "Arrival", value: "From I-65, take exit 32 toward Mooresville Highway, then pull into the Old Columbia Road parking lot. Staff will point you to the drop-off area." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Residential and business drop-off:** Open to everyone on weekdays.", "**Commercial pickup:** Within about 100 miles of Lewisburg. Contact the team to confirm your site."],
            ["**Mail-in:** Prepaid bulb kits, ordered online and dropped off at FedEx."],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Light Bulbs We Take in Lewisburg",
      grey: true,
      blocks: [
        { kind: "text", body: ["From a few CFLs out of a farmhouse kitchen to cases of tubes from a warehouse relamp, the Lewisburg center accepts:"] },
        { kind: "bullets", rows: [
            ["Fluorescent tubes", "U-shaped and circular fluorescent lamps"],
            ["Compact fluorescent lamps (CFLs)", "HID lamps, including high-pressure sodium (HPS)"],
            ["LED lamps", "Halogen and incandescent bulbs"],
            ["Broken fluorescent lamps (tell us when you arrive)"],
        ] },
        { kind: "h3", text: "Packing Bulbs for the Drive" },
        { kind: "text", body: ["Keep bulbs in the boxes they came in, or another sturdy container, so they don't shift or crack on the way. Don't toss loose bulbs together in a bag. Seal any broken lamps in their own container.", `See our main [light bulb recycling page](${href('/light-bulbs/')}) for more on accepted lamps.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Light Bulb Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Choose your route", body: ["Drop-off for a handful of bulbs, a mail-in kit if driving doesn't work, or commercial pickup for a business with steady volume."] },
              { n: 2, title: "Protect the bulbs", body: ["Use original boxes or a sturdy container so nothing breaks in transit."] },
              { n: 3, title: "Bring them in or hand them off", body: ["Unload at Old Columbia Road, have boxes ready for pickup, or ship your kit."] },
            ],
            [
              { n: 4, title: "Separation", body: ["Each lamp is broken down so glass, metal end caps, and phosphor powder are split apart."] },
              { n: 5, title: "Mercury recovery", body: ["Mercury material is sent to our Greenwood, IN retort facility, keeping it out of landfills."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Light Bulb Recycling Options in Lewisburg, TN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Looking for light bulb recycling near you in Lewisburg, Cornersville, or Chapel Hill? Bring boxed bulbs to Old Columbia Road between 8:00 AM and 4:00 PM on any weekday. Drop-off is open to households and businesses. Call 615-214-4768 before bringing a large load so the dock is ready.", `The same trip can include [ballasts](${href('/ballasts/')}) (PCB and non-PCB), [batteries](${href('/battery-recycling/')}), [electronics](${href('/electronic-recycle/')}), mercury devices and airbags.`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: ["Offices, warehouses, farms, schools and retailers that go through bulbs regularly can set up pickup instead of storing and hauling them. Pickup is a business service, covering sites within about 100 miles of Lewisburg, including Nashville, Franklin, Murfreesboro, Pulaski and Tullahoma.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Site address:** street, city and ZIP code.", "**Lamp types:** tubes, CFLs, HID or other bulbs."],
            ["**Quantity:** an estimated count, box total or pallets.", "**Broken lamps:** whether any are cracked or shattered."],
            ["**Frequency:** a one-time relamp or recurring pickups.", "**Access:** your preferred pickup window and loading details."],
        ] },
        { kind: "buttons", primary: { label: "Request a Light Bulb Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: [`If a drive to Lewisburg doesn't fit your week, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), fill it, seal it, and drop it at FedEx. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Local Recycling Information",
      grey: false,
      blocks: [
        { kind: "text", body: ["Fluorescent and other mercury-containing lamps from businesses are managed under federal universal waste rules, so they should go to a recycler rather than the dumpster.", "Public options around Lewisburg are limited. Marshall County's hazardous waste drop-off covers paint, tires, oil, and antifreeze and doesn't take commercial waste ([Marshall County](https://marshallcountytn.gov/solid-waste)). The state's mobile household hazardous waste collections are for households only and run on set dates ([TDEC](https://www.tn.gov/environment/sw-mm-household-hazardous-waste-program.html)). The Lewisburg center gives residents and businesses a weekday option all year."] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Light Bulb Recycling in Lewisburg",
      grey: true,
      blocks: [
        { kind: "bullets", rows: [
            ["**Year-round drop-off:** A Lewisburg center open weekdays, with no waiting for a collection event.", "**Wide range of lamps:** Fluorescent tubes, CFLs, HID, LED, halogen, incandescent, and broken fluorescent lamps."],
            ["**Commercial pickup:** For businesses within about 100 miles that need a steady schedule.", "**Mercury recovery:** Mercury material is sent to our Greenwood, IN retort facility."],
            ["**Mail-in option:** Prepaid kits for small batches or anyone farther away.", "**Since 1993:** A minority-owned recycler with more than three decades of experience."],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "Is light bulb recycling free in Lewisburg?", a: "Cost depends on the bulb types and quantity. Call 615-214-4768 or request a quote before your visit." },
      { q: "Is the Lewisburg center the same as the state's mobile collection events?", a: "No. TDEC's mobile events run on scheduled dates for households, while our Lewisburg center is open every weekday." },
      { q: "Can a small business use mail-in instead of commercial pickup?", a: "Yes. Mail-in suits smaller quantities, while pickup fits a business with ongoing, larger volume." },
      { q: "Can I bring LED bulbs from a retrofit with the old tubes?", a: "Yes. LED lamps are accepted, so old and new bulbs from the same job can come in together." },
      { q: "Is there another Recycle Technologies center in Tennessee?", a: "Yes. Our Johnson City center serves East Tennessee." },
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
            { label: "Tennessee Recycling Services", href: href('/tennessee/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Light Bulb Recycling in Lewisburg, TN",
    body: ["Bring your bulbs to Old Columbia Road any weekday, order a mail-in kit for a small batch, or send us your site and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Lewisburg", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out (empty placeholder in the doc)"],
}
