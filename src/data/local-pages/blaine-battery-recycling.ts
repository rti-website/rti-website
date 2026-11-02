import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Blaine, Minnesota — /minnesota/blaine/battery-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Battery Recycling in Blaine, Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_BATTERY_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/battery-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Battery Recycling in Blaine, Minnesota | Lithium, Lead-Acid & EV Batteries",
    description: "Recycle alkaline, lithium-ion, lead-acid, button cell, power tool, and EV batteries at our Blaine, MN center, or book business battery pickup in the Twin Cities.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Battery Recycling in Blaine, Minnesota",
    h1: "Battery Recycling in Blaine, Minnesota",
    body: [
      "Battery recycling for Blaine and the north metro, with weekday drop-off at our 99th Lane NE center, commercial pickup within about 100 miles, and mail-in kits for smaller quantities.",
      `Different batteries need different handling, from household alkalines and rechargeable tool packs to commercial backup batteries and EV packs. Recycle Technologies accepts a wide range of battery types at our [Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE. Residents and businesses can bring batteries in on weekdays, while companies with larger quantities can arrange collection. Batteries are sorted for recycling, and customers receive documentation confirming the job. Our work follows R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Battery Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday through Friday, 7:30 AM–4:00 PM" },
            { label: "Arrival", value: "Take I-35W to 99th Ave NE, then head to 99th Lane NE. Battery drop-off is at the north-end dock behind the 1525 building. Follow the signs around to the rear loading area, where a team member will meet you. Parking is free." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Residential and business drop-off:** bring accepted batteries to the Blaine center during weekday hours", "**Commercial pickup:** arrange collection within about 100 miles of Blaine"],
            ["**Mail-in:** use a [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) for smaller quantities"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Accept in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["Different devices use different battery chemistries. Our Blaine center accepts a range of common household, rechargeable, and commercial batteries:"] },
        { kind: "bullets", rows: [
            ["**Single-use household batteries:** alkaline and zinc batteries, including AA, AAA, C, D and 9-volt", "**Lithium-ion batteries:** rechargeable packs from laptops, phones, tablets, cameras and handheld scanners"],
            ["**Sealed lead-acid batteries:** commonly found in alarm panels, emergency lights and small backup systems", "**Nickel-cadmium (NiCd) batteries:** older rechargeable batteries from tools and equipment"],
            ["**Button cells:** batteries from watches, hearing aids, key fobs and medical devices", "**Power tool batteries:** cordless drill, saw and outdoor equipment packs"],
            ["**Battery backup units:** UPS units used in offices, server closets and point-of-sale stations", "**Electric vehicle batteries:** including Tesla packs. Call ahead so we can plan for their size and weight."],
            ["**Mercury oxide and other uncommon types:** reviewed case by case"],
        ] },
        { kind: "text", body: ["Not sure which type you have? Call 763-559-5130 and describe the battery label or the device it came from."] },
        { kind: "h3", text: "Preparing Batteries for Drop-Off" },
        { kind: "text", body: ["A little preparation keeps battery terminals from touching during transport."] },
        { kind: "bullets", rows: [
            ["Cover the terminals with tape, especially on lithium and 9-volt batteries.", "Keep different battery chemistries in separate boxes or bags."],
            ["Use a sturdy container, and keep it away from heat and direct sunlight in the car.", "Set aside swollen, cracked, or leaking batteries. Keep them separate and call us before bringing them in."],
        ] },
        { kind: "text", body: [`See our main [battery recycling page](${href('/battery-recycling/')}) for more on how batteries are sorted and processed.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Identify your batteries", body: ["Check the labels or the devices they came from, and separate different types where possible."] },
              { n: 2, title: "Estimate the quantity", body: ["A household collection is different from a pallet of commercial batteries or an EV pack, so note the approximate count, weight or number of containers."] },
              { n: 3, title: "Choose a delivery method", body: ["Bring batteries to the Blaine center, arrange a business pickup, or use a mail-in kit where available."] },
            ],
            [
              { n: 4, title: "Arrange special handling", body: ["Call ahead about EV batteries, large backup units, unusual chemistries or damaged batteries."] },
              { n: 5, title: "Receive your documentation", body: ["Once processing is complete, you'll receive a recycling and safe-disposal certificate for your records."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Battery Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Looking for battery recycling near you in Blaine, Ham Lake, or Lino Lakes? Bring your batteries to our north-end dock during weekday hours. This works for household collections, a few rechargeable tool packs, and business drop-offs that don't need a scheduled collection.", `The same trip can include [electronics](${href('/electronic-recycle/')}), hard drives for [destruction](${href('/hard-drive-destruction-services/')}), and paper for shredding. [Fluorescent lamps](${href('/light-bulbs/')}) are handled at our separate lamp building at 10040 Davenport St NE.`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: [`Businesses with larger battery collections can arrange pickup within about 100 miles of Blaine. We serve companies in [Coon Rapids](${href('/minnesota-recycling/coon-rapids/')}), Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Mounds View, [Roseville](${href('/minnesota-recycling/ramsey/roseville/')}), Brooklyn Park, Maple Grove, Plymouth, [Minneapolis](${href('/minnesota-recycling/minneapolis/')}), [St. Paul](${href('/minnesota-recycling/battery-recycling-st-paul/')}), [Bloomington](${href('/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/')}), Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and [St. Cloud](${href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/')}).`, "To help us prepare a quote, provide:"] },
        { kind: "bullets", rows: [
            ["**Pickup address:** the site address and where the batteries are stored, such as a loading dock, basement, or maintenance room", "**Battery types:** the types of batteries and how they're currently packed"],
            ["**Quantity:** an approximate count or weight, or the number of boxes, drums, or pallets", "**Large batteries:** details about EV packs, backup units or other large batteries"],
            ["**Damaged batteries:** any damaged or leaking batteries", "**Collection frequency:** a one-time collection or ongoing service"],
        ] },
        { kind: "buttons", primary: { label: "Get a Battery Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: [`Outside the pickup area, or only have a few batteries? Order a [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), sort and pack your batteries according to the kit instructions, and send it back. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Recycling Across Minnesota Counties",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Anoka County", href: href('/minnesota-recycling/anoka-county-recycling/') },
            { label: "Hennepin County", href: href('/minnesota-recycling/hennepin-county-recycling-center/') },
            { label: "Ramsey County", href: href('/minnesota-recycling/ramsey/') },
            { label: "Dakota County", href: href('/minnesota-recycling/dakota-county/') },
            { label: "Washington County", href: href('/minnesota-recycling/washington-county/') },
            { label: "Scott County", href: href('/minnesota-recycling/scott-county/') },
            { label: "Olmsted County", href: href('/minnesota-recycling/olmsted-county/') },
            { label: "Benton County (St. Cloud)", href: href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/') },
            { label: "St. Louis County (Duluth)", href: href('/minnesota-recycling/electronic-recycling-duluth/') },
        ] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Battery Recycling for Businesses and Organizations",
      grey: true,
      blocks: [
        { kind: "text", body: ["Businesses collect batteries through equipment replacement, maintenance work, and day-to-day operations, and each industry has its own collection needs:"] },
        { kind: "bullets", rows: [
            ["**Property managers:** smoke alarm batteries from unit turnovers and emergency light packs from shared areas", "**Contractors and electricians:** used cordless tool batteries collected from job sites"],
            ["**Schools and districts:** laptop and Chromebook batteries, classroom button cells and backup batteries from server rooms", "**Hospitals and clinics:** button cells and device batteries, with documentation for compliance records"],
            ["**Warehouses and distribution centers:** sealed lead-acid batteries and rechargeable scanner packs", "**Offices and commercial buildings:** UPS batteries, laptop packs and bins of household-style batteries"],
            ["**Fleets and dealerships:** electric vehicle and Tesla battery packs that may need a planned pickup"],
        ] },
        { kind: "h3", text: "Minnesota's Rule on Rechargeable Batteries" },
        { kind: "text", body: ["Under Minnesota law, rechargeable batteries and products powered by them can't go in household or business trash unless the batteries are removed first ([Minn. Stat. 115A.9157](https://www.revisor.mn.gov/statutes/2024/cite/115A.9157)). Bringing them to a recycler is the simple alternative, and our recycling documentation gives businesses a record of the job."] },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Battery Recycling in Blaine",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**A local drop-off point:** bring accepted batteries to our Blaine facility on 99th Lane NE during weekday hours", "**Multiple battery types:** alkaline, lithium-ion, lead-acid, NiCd, button cell and EV batteries"],
            ["**Battery-specific sorting:** trained staff separate batteries by type before processing", "**Documentation for your records:** a recycling and safe-disposal certificate after processing"],
            ["**Experience since 1993:** more than three decades recycling batteries at our facilities in Minnesota and Wisconsin", "**Options for any quantity:** weekday drop-off, business collection or mail-in kits"],
            ["**Audited standards:** our operations follow R2v3 and RIOS standards, which are independently audited", `**Committed to zero landfill:** learn about our [sustainability approach](${href('/sustainability/')})`],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Battery Recycling FAQs",
    items: [
      { q: "What does battery recycling cost in Blaine?", a: "Pricing depends on the battery chemistry and quantity. Call 763-559-5130 or request a quote." },
      { q: "Do I need an appointment to drop off a small bag of batteries?", a: "No. Come in during regular weekday hours." },
      { q: "Can I leave batteries inside the device?", a: "For laptops, phones, and tools that still have a battery inside, see our electronics recycling page." },
      { q: "Do you have a battery recycling location in Wisconsin too?", a: "Yes. Our second facility is in New Berlin, WI, at 262-798-3040." },
      { q: "Is there a Minnesota email for battery pickups?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you handle battery recycling in St. Paul?", a: "Yes. See our battery recycling in St. Paul page for Ramsey County customers." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Commercial Battery Recycling", href: href('/battery-recycling/') },
            { label: "Battery Recycling in St. Paul", href: href('/minnesota-recycling/battery-recycling-st-paul/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
            { label: "Minnesota Recycling & Shredding", href: href('/minnesota-recycling/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Blaine, MN",
    body: ["Bring accepted batteries to 1525 99th Ln NE on a weekday. If you're a business with a larger collection, tell us what types and quantities you have, and we'll help arrange the next step."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Battery Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "Service option \"Recurring collection\" left out (doc placeholder: confirm recurring battery collection for Minnesota businesses)", "Damaged batteries: doc asks to confirm damaged-battery handling at Blaine (the call-first line is kept)", "Sustainability link: the doc said confirm URL, linked to /sustainability/"],
}
