import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Blaine, Minnesota — /minnesota/blaine/battery-recycling/
 * Management sheet "all plan rti 1", Minnesota tab; copy from the content
 * team's Google Doc "Battery Recycling in Blaine, Minnesota", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const BLAINE_BATTERY_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Blaine, Minnesota | Lithium, Lead-Acid & EV Batteries",
    description: "Recycle alkaline, lithium-ion, lead-acid, button cell, power tool, and EV batteries at our Blaine, MN center, or book business battery pickup in the Twin Cities.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Battery Recycling in Blaine, Minnesota",
    h1: "Battery Recycling in Blaine, Minnesota",
    body: ["Battery recycling for Blaine and the north metro, with weekday drop-off at our 99th Lane NE center, commercial pickup within about 100 miles, and mail-in kits for smaller quantities."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Different batteries need different handling, from household alkalines and rechargeable tool packs to commercial backup batteries and EV packs. Recycle Technologies accepts a wide range of battery types at our [Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE. Residents and businesses can bring batteries in on weekdays, while companies with larger quantities can arrange collection. Batteries are sorted for recycling, and customers receive documentation confirming the job. Our work follows R2v3 and RIOS standards.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Battery Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`,
          rows: [
            {
              label: "Address",
              value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)",
            },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday through Friday, 7:30 AM–4:00 PM" },
            {
              label: "Arrival",
              value: "Take I-35W to 99th Ave NE, then head to 99th Lane NE. Battery drop-off is at the north-end dock behind the 1525 building. Follow the signs around to the rear loading area, where a team member will meet you. Parking is free.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Residential and business drop-off",
              body: "Bring accepted batteries to the Blaine center during weekday hours",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Arrange collection within about 100 miles of Blaine",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Use a [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) for smaller quantities",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Accept in Blaine",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Different devices use different battery chemistries. Our Blaine center accepts a range of common household, rechargeable, and commercial batteries:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "battery",
              title: "Single-use household batteries",
              body: "Alkaline and zinc batteries, including AA, AAA, C, D and 9-volt",
            },
            {
              icon: "zap",
              title: "Lithium-ion batteries",
              body: "Rechargeable packs from laptops, phones, tablets, cameras and handheld scanners",
            },
            {
              icon: "battery",
              title: "Sealed lead-acid batteries",
              body: "Commonly found in alarm panels, emergency lights and small backup systems",
            },
            {
              icon: "repeat",
              title: "Nickel-cadmium (NiCd) batteries",
              body: "Older rechargeable batteries from tools and equipment",
            },
            {
              icon: "target",
              title: "Button cells",
              body: "Batteries from watches, hearing aids, key fobs and medical devices",
            },
            {
              icon: "tool",
              title: "Power tool batteries",
              body: "Cordless drill, saw and outdoor equipment packs",
            },
            {
              icon: "plug",
              title: "Battery backup units",
              body: "UPS units used in offices, server closets and point-of-sale stations",
            },
            {
              icon: "car",
              title: "Electric vehicle batteries",
              body: "Including Tesla packs. Call ahead so we can plan for their size and weight.",
            },
            { icon: "search", title: "Mercury oxide and other uncommon types", body: "Reviewed case by case" },
          ],
        },
        {
          kind: "note",
          body: [
            "Not sure which type you have? Call 763-559-5130 and describe the battery label or the device it came from.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Preparing Batteries for Drop-Off",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Preparing Batteries for Drop-Off",
          body: [
            "A little preparation keeps battery terminals from touching during transport.",
            `See our main [battery recycling page](${href('/battery-recycling/')}) for more on how batteries are sorted and processed.`,
          ],
          checks: [
            "Cover the terminals with tape, especially on lithium and 9-volt batteries.",
            "Keep different battery chemistries in separate boxes or bags.",
            "Use a sturdy container, and keep it away from heat and direct sunlight in the car.",
            "Set aside swollen, cracked, or leaking batteries. Keep them separate and call us before bringing them in.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Identify your batteries",
              body: "Check the labels or the devices they came from, and separate different types where possible.",
            },
            {
              title: "Estimate the quantity",
              body: "A household collection is different from a pallet of commercial batteries or an EV pack, so note the approximate count, weight or number of containers.",
            },
            {
              title: "Choose a delivery method",
              body: "Bring batteries to the Blaine center, arrange a business pickup, or use a mail-in kit where available.",
            },
            {
              title: "Arrange special handling",
              body: "Call ahead about EV batteries, large backup units, unusual chemistries or damaged batteries.",
            },
            {
              title: "Receive your documentation",
              body: "Once processing is complete, you'll receive a recycling and safe-disposal certificate for your records.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for battery recycling near you in Blaine, Ham Lake, or Lino Lakes? Bring your batteries to our north-end dock during weekday hours. This works for household collections, a few rechargeable tool packs, and business drop-offs that don't need a scheduled collection.",
            `The same trip can include [electronics](${href('/electronic-recycle/')}), hard drives for [destruction](${href('/minnesota/blaine/hard-drive-destruction/')}), and paper for shredding. [Fluorescent lamps](${href('/light-bulbs/')}) are handled at our separate lamp building at 10040 Davenport St NE.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            `Businesses with larger battery collections can arrange pickup within about 100 miles of Blaine. We serve companies in [Coon Rapids](${href('/minnesota-recycling/coon-rapids/')}), Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Mounds View, [Roseville](${href('/minnesota-recycling/ramsey/roseville/')}), Brooklyn Park, Maple Grove, Plymouth, [Minneapolis](${href('/minnesota-recycling/minneapolis/')}), [St. Paul](${href('/minnesota-recycling/battery-recycling-st-paul/')}), [Bloomington](${href('/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/')}), Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and [St. Cloud](${href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/')}).`,
          ],
          listIntro: "To help us prepare a quote, provide:",
          list: [
            "**Pickup address:** the site address and where the batteries are stored, such as a loading dock, basement, or maintenance room",
            "**Battery types:** the types of batteries and how they're currently packed",
            "**Quantity:** an approximate count or weight, or the number of boxes, drums, or pallets",
            "**Large batteries:** details about EV packs, backup units or other large batteries",
            "**Damaged batteries:** any damaged or leaking batteries",
            "**Collection frequency:** a one-time collection or ongoing service",
          ],
          buttons: {
            primary: { label: "Get a Battery Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `Outside the pickup area, or only have a few batteries? Order a [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), sort and pack your batteries according to the kit instructions, and send it back. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Battery Recycling Across Minnesota Counties",
      grey: true,
      blocks: [
        {
          kind: "places",
          links: [
            { label: "Anoka County", href: href('/minnesota-recycling/anoka-county-recycling/') },
            { label: "Hennepin County", href: href('/minnesota-recycling/hennepin-county-recycling-center/') },
            { label: "Ramsey County", href: href('/minnesota-recycling/ramsey/') },
            { label: "Dakota County", href: href('/minnesota-recycling/dakota-county/') },
            { label: "Washington County", href: href('/minnesota-recycling/washington-county/') },
            { label: "Scott County", href: href('/minnesota-recycling/scott-county/') },
            { label: "Olmsted County", href: href('/minnesota-recycling/olmsted-county/') },
            { label: "Benton County (St. Cloud)", href: href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/') },
            { label: "St. Louis County (Duluth)", href: href('/minnesota-recycling/electronic-recycling-duluth/') },
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Battery Recycling for Businesses and Organizations",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses collect batteries through equipment replacement, maintenance work, and day-to-day operations, and each industry has its own collection needs:",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "building",
              title: "Property managers",
              body: "Smoke alarm batteries from unit turnovers and emergency light packs from shared areas",
            },
            {
              icon: "tool",
              title: "Contractors and electricians",
              body: "Used cordless tool batteries collected from job sites",
            },
            {
              icon: "school",
              title: "Schools and districts",
              body: "Laptop and Chromebook batteries, classroom button cells and backup batteries from server rooms",
            },
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Button cells and device batteries, with documentation for compliance records",
            },
            {
              icon: "warehouse",
              title: "Warehouses and distribution centers",
              body: "Sealed lead-acid batteries and rechargeable scanner packs",
            },
            {
              icon: "building",
              title: "Offices and commercial buildings",
              body: "UPS batteries, laptop packs and bins of household-style batteries",
            },
            {
              icon: "car",
              title: "Fleets and dealerships",
              body: "Electric vehicle and Tesla battery packs that may need a planned pickup",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Minnesota's Rule on Rechargeable Batteries",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Under Minnesota law, rechargeable batteries and products powered by them can't go in household or business trash unless the batteries are removed first ([Minn. Stat. 115A.9157](https://www.revisor.mn.gov/statutes/2024/cite/115A.9157)). Bringing them to a recycler is the simple alternative, and our recycling documentation gives businesses a record of the job.",
          ],
        },
      ],
    },
    {
      figma: "doc-9",
      heading: "Why Recycle Technologies for Battery Recycling in Blaine",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "A local drop-off point",
              body: "Bring accepted batteries to our Blaine facility on 99th Lane NE during weekday hours",
            },
            {
              icon: "layers",
              title: "Multiple battery types",
              body: "Alkaline, lithium-ion, lead-acid, NiCd, button cell and EV batteries",
            },
            {
              icon: "sort",
              title: "Battery-specific sorting",
              body: "Trained staff separate batteries by type before processing",
            },
            {
              icon: "file",
              title: "Documentation for your records",
              body: "A recycling and safe-disposal certificate after processing",
            },
            {
              icon: "clock",
              title: "Experience since 1993",
              body: "More than three decades recycling batteries at our facilities in Minnesota and Wisconsin",
            },
            {
              icon: "truck",
              title: "Options for any quantity",
              body: "Weekday drop-off, business collection or mail-in kits",
            },
            {
              icon: "shield",
              title: "Audited standards",
              body: "Our operations follow R2v3 and RIOS standards, which are independently audited",
            },
            {
              icon: "recycle",
              title: "Committed to zero landfill",
              body: `Learn about our [sustainability approach](${href('/sustainability/')})`,
            },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
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
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Commercial Battery Recycling", href: href('/battery-recycling/') },
            { label: "Battery Recycling in St. Paul", href: href('/minnesota-recycling/battery-recycling-st-paul/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
            { label: "Minnesota Recycling & Shredding", href: href('/minnesota-recycling/') },
          ],
        },
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
