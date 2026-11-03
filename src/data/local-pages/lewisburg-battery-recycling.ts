import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Tennessee — /tennessee/lewisburg/battery-recycling/
 * Management sheet "all plan rti 1", Lewisburg tab; copy from the content
 * team's Google Doc "Tennessee Battery Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const LEWISBURG_BATTERY_RECYCLING: LocalPage = {
  url: href('/tennessee/lewisburg/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Tennessee | Recycle Technologies",
    description: "Battery recycling in Tennessee: drop off lithium-ion, lead-acid, EV and e-bike batteries in Lewisburg or Johnson City, or book business pickup.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Lewisburg, TN", "Johnson City, TN", "Tennessee"] },
  hero: {
    crumb: "Battery Recycling in Tennessee",
    h1: "Battery Recycling in Tennessee",
    body: ["Battery recycling for Tennessee businesses and households, with drop-off centers in Lewisburg and Johnson City, business pickup across both regions, and mail-in kits for small amounts."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    "Recycle Technologies takes used batteries of every common chemistry at two Tennessee recycling centers: 1580 Old Columbia Road in Lewisburg for Middle Tennessee, and 2212 Buffalo Road in Johnson City for East Tennessee. That includes alkaline, zinc, lithium-ion, lead-acid, NiCd and button cells, plus EV, Tesla, e-bike, e-scooter, power tool and UPS backup batteries, and damaged or swollen units. Anyone can drop off on weekdays. Businesses can book pickup within about 100 miles of either center, which reaches Nashville and the Tri-Cities. Small batches can ship back in a prepaid kit, and each finished job comes with a certificate of recycling and safe disposal.",
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Tennessee Battery Recycling Centers",
      grey: false,
      blocks: [
        {
          kind: "center",
          eyebrow: "Lewisburg Recycling Center (Middle Tennessee)",
          title: `[Lewisburg Recycling Center](${href('/tennessee/lewisburg/')})`,
          rows: [
            {
              label: "Address",
              value: "[1580 Old Columbia Road, Lewisburg, TN 37091](https://www.google.com/maps/dir/?api=1&destination=1580+Old+Columbia+Road%2C+Lewisburg%2C+TN+37091)",
            },
            { label: "Phone", value: "615-214-4768" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 4:00 PM" },
          ],
        },
        {
          kind: "center",
          eyebrow: "Johnson City Recycling Center (East Tennessee)",
          title: `[Johnson City Recycling Center](${href('/johnson-city-buffalo-tennessee/')})`,
          rows: [
            { label: "Address", value: "2212 Buffalo Road #210, Johnson City, TN 37604" },
            { label: "Phone", value: "423-328-7012" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 3:00 PM" },
          ],
        },
        {
          kind: "options",
          heading: "At Both Centers",
          items: [
            { icon: "pin", title: "Drop-off", body: "Open to businesses and residents." },
            { icon: "truck", title: "Business pickup", body: "About 100 miles around each center." },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid containers for dry cell, laptop, lead-acid and lithium batteries.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Take in Tennessee",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: ["From a drawer of AAs to a pallet of industrial and backup units, both centers handle:"],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc household batteries" },
            { icon: "zap", title: "Lithium-ion packs from laptops, phones and tools" },
            { icon: "plug", title: "Lead-acid batteries, from car and truck batteries to sealed backup units" },
            { icon: "target", title: "NiCd and button cell batteries" },
            { icon: "car", title: "EV and Tesla batteries" },
            { icon: "battery", title: "E-bike and e-scooter batteries" },
            { icon: "plug", title: "UPS and other battery backup units" },
            { icon: "battery", title: "Swollen, leaking, or damaged batteries (call ahead)" },
          ],
        },
        {
          kind: "note",
          body: [
            "Mercury oxide and other less common types are taken on a case-by-case basis. Describe them when you call.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Cap the terminals",
              body: "Cover each terminal with electrical tape, or bag each battery on its own, so loose cells can't short.",
            },
            {
              title: "Sort before you load",
              body: "Keep lithium, lead-acid, and alkaline batteries in separate boxes or buckets.",
            },
            {
              title: "Bring them in or book a truck",
              body: "Drive to Lewisburg or Johnson City, request a business pickup, or order a mail-in kit.",
            },
            {
              title: "We separate by chemistry",
              body: "Trained staff sort every battery by type on arrival, since each one follows its own recycling path.",
            },
            {
              title: "Keep the record",
              body: "Once processing wraps up, we send a recycling certificate for your files.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Battery Recycling Options in Tennessee",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            `Searching for battery recycling near you in Middle or East Tennessee? Drive to Lewisburg or Johnson City during weekday hours, and a team member will log your batteries at the loading area. Both centers take drop-offs from businesses and residents. Call first for a large load or any swollen or leaking batteries, so staff can tell you how to pack them. The Johnson City center also accepts [electronics](${href('/electronic-recycle/')}) and [fluorescent lamps](${href('/light-bulbs/')}), so an equipment cleanout can go in one trip.`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Auto shops, fleet yards, warehouses, hospitals, schools and data centers can book pickup within about 100 miles of either center. From Lewisburg, that covers Nashville and much of Middle Tennessee. From Johnson City, it covers the Tri-Cities and surrounding East Tennessee counties. When you request a quote, list the battery chemistries, a rough weight or pallet count, and your address. We'll confirm the schedule and price.",
          ],
          buttons: {
            primary: { label: "Request a Battery Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a branch office or a handful of spent cells, order a prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Pick the container that matches your chemistry: dry cell, laptop, lead-acid or primary lithium. Then tape the terminals, fill it, and ship it back. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order. EV packs and large industrial batteries need drop-off or pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Disposal Rules in Tennessee",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Tennessee's State Fire Marshal warns never to throw away a lithium-ion battery. Lithium-ion batteries and the devices that hold them don't belong in household garbage or recycling bins. That warning played out in June 2026, when Williamson County Fire Rescue traced a convenience center dumpster fire to lithium-ion batteries.",
            "Local drop-off programs fill part of the gap, but mostly for households:",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "landmark",
              title: "Nashville",
              body: "Metro's convenience centers and household hazardous waste site serve Davidson County residents only.",
            },
            {
              icon: "landmark",
              title: "Johnson City",
              body: "The city takes household batteries at its New Street complex or in curbside bins, provided both terminals are taped and each battery is bagged.",
            },
            {
              icon: "landmark",
              title: "Marshall County",
              body: "The county's hazardous waste drop-off takes paint, tires, oil and antifreeze, but it doesn't list batteries and won't take commercial waste.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Businesses carry extra obligations. The EPA says most discarded lithium-ion batteries from commercial sources are likely hazardous waste, and it recommends managing them under the federal universal waste rules ([EPA](https://www.epa.gov/recycle/used-lithium-ion-batteries)). Our centers give those businesses, and any household with more than a bag of batteries, a single place to take them.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Battery Recycling in Tennessee",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            { icon: "pin", body: "Two recycling centers, one in Middle Tennessee and one in East Tennessee" },
            { icon: "layers", body: "Every chemistry accepted, from coin cells to EV and e-bike packs" },
            { icon: "battery", body: "Damaged and swollen batteries taken with advance notice" },
            { icon: "pin", body: "Drop-off open to anyone on weekdays" },
            { icon: "truck", body: "Business pickup within about 100 miles of each center" },
            { icon: "mail", body: "Prepaid mail-in containers matched to each battery type" },
            { icon: "clock", body: "A minority-owned recycler handling batteries since 1993" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is battery recycling free in Tennessee?", a: "Cost depends on the battery type and quantity. Call the Lewisburg or Johnson City center, or request a quote, before you bring them in." },
      { q: "Do you pick up batteries in Franklin and Murfreesboro?", a: "Yes. Both are within about 100 miles of our Lewisburg center. Confirm your address when you request a quote." },
      { q: "How long can a business store used batteries before recycling?", a: "Under federal universal waste rules, no more than one year from when they're generated, so plan pickups well ahead." },
      { q: "Can I recycle batteries from outside Tennessee?", a: "Yes. Our prepaid mail-in kits ship nationwide, so offices in other states can send batteries back the same way." },
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
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Tennessee Recycling Services", href: href('/tennessee/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Tennessee",
    body: ["Drop batteries at our Lewisburg or Johnson City center, order a mail-in kit for a small batch, or request a quote for business pickup.", "Lewisburg: 615-214-4768 | Johnson City: 423-328-7012"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Tennessee", href: PICKUP_HREF },
  },
  todo: ["The doc quotes the State Fire Marshal as \"Never throw away an ion battery.\" (looks garbled)", "written as a plain statement instead of a quote", "The doc is Tennessee-wide (both sites)", "it sits at the Lewisburg URL as the sheet asks"],
}
