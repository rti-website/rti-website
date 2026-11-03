import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Blaine, Minnesota — /minnesota/blaine/electronic-recycling/
 * Management sheet "all plan rti 1", Minnesota tab; copy from the content
 * team's Google Doc "Electronic Recycling in Blaine, Minnesota", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const BLAINE_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Blaine, MN | Business Pickup & Drop-Off",
    description: "Recycle computers, TVs, monitors, printers, and office electronics in Blaine, MN. Visit our local drop-off center or arrange commercial e-waste pickup.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Electronics Recycling in Blaine, Minnesota",
    h1: "Electronics Recycling in Blaine, Minnesota",
    body: ["Electronics recycling for Blaine residents and businesses, with weekday drop-off at our 99th Lane NE center, commercial e-waste pickup within about 100 miles, and mail-in kits for smaller quantities."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Whether you're clearing out a few old household devices, replacing office computers, or managing a large equipment cleanout, Recycle Technologies offers electronics recycling in Blaine and across the Twin Cities metro. Our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE accepts computers, laptops, servers, CRT and flat-screen monitors, televisions, copiers, printers, phones, small electronics, and other equipment containing circuit boards. Residents and businesses can drop off on weekdays; companies with larger volumes can schedule pickup within about 100 miles, and mail-in kits cover smaller quantities outside the pickup area. Every load is logged on arrival, customers receive a Certificate of Recycling, and businesses handling sensitive information can request hard drive destruction. Our recycling operations follow R2v3 and RIOS standards.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Electronics Recycling Center",
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
            { label: "Hours", value: "Monday–Friday, 7:30 AM–4:00 PM. Closed Saturday and Sunday." },
            {
              label: "Arrival",
              value: "The center is reached from I-35W via 99th Ave NE. Enter from 99th Lane NE, follow the signs around the back of the building, and bring electronics to the north-end dock. Parking is free, and a team member will check in your load.",
            },
          ],
          note: [
            `Bringing fluorescent tubes or other lamps along with your electronics? Those go to our separate lamp building at 10040 Davenport St NE, using the west-side dock. More on [light bulb recycling](${href('/light-bulbs/')}).`,
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Drop-off", body: "For residents and businesses, Monday through Friday" },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Scheduled e-waste pickup within approximately 100 miles",
            },
            { icon: "mail", title: "Mail-in", body: "Electronics recycling kits for smaller quantities" },
            {
              icon: "lock",
              title: "Data destruction",
              body: "Hard drive destruction for data-bearing devices",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Accept in Blaine",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: ["From a single household TV to a room full of office equipment, our Blaine facility accepts:"],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "laptop",
              title: "Computers and IT equipment",
              body: "Desktop computers, laptops, servers, keyboards, mice and cords",
            },
            {
              icon: "tv",
              title: "Monitors and displays",
              body: "CRT monitors, LCD monitors, LED displays and plasma screens",
            },
            {
              icon: "tv",
              title: "Televisions",
              body: "CRT and tube TVs, along with LCD, LED and plasma televisions",
            },
            {
              icon: "printer",
              title: "Office equipment",
              body: "Copiers, printers, scanners and fax machines",
            },
            {
              icon: "smartphone",
              title: "Phones and mobile devices",
              body: "Cell phones and other mobile electronics",
            },
            {
              icon: "cpu",
              title: "Small electronics",
              body: "Chargers, remote controls, switches and microwaves",
            },
            {
              icon: "cpu",
              title: "Other electronic equipment",
              body: "Items with circuit boards are reviewed case by case. Call 763-559-5130 before bringing in equipment that isn't listed.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            `See our main [electronics recycling page](${href('/electronic-recycle/')}) for more on how devices are processed.`,
          ],
        },
        {
          kind: "topics",
          items: [
            {
              title: "Computer, Server and Device Recycling",
              body: [
                `Businesses replacing workstations, upgrading IT infrastructure or clearing storage areas can bring computers, laptops and servers to our Blaine center or arrange a commercial pickup. For larger technology refreshes, our [IT asset disposition](${href('/it-asset-disposition/')}) service may also be a fit.`,
              ],
            },
            {
              title: "TV and Monitor Recycling",
              body: [
                "CRT monitors, tube televisions, LCD screens, LED displays and plasma screens are all accepted at our Blaine facility. Clearing them out of an office, school, apartment building or rental property? Drop them off or ask about a commercial pickup, and call ahead for large quantities or unusually heavy units.",
              ],
            },
            {
              title: "Printer, Copier and Office Equipment Recycling",
              body: [
                "Old printers, scanners, fax machines and copiers pile up after an office upgrade or move. Bring them to our Blaine center or add them to a scheduled business pickup. Some multifunction copiers and printers keep scanned documents on internal drives, so ask about drive destruction before recycling them.",
              ],
            },
            {
              title: "Electronics That Store Sensitive Data",
              body: [
                `Computers, laptops, servers and phones may hold personal files, customer information, emails and business records. If the storage media needs to be physically destroyed, request [hard drive destruction](${href('/minnesota/blaine/hard-drive-destruction/')}) when you arrange your drop-off or pickup. A destruction certificate is provided for the service.`,
              ],
            },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Electronics Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Identify the equipment",
              body: "List what you need to recycle, set aside devices that store data, and note any CRTs or damaged screens.",
            },
            {
              title: "Choose your route",
              body: "Drop off at our Blaine facility, arrange a commercial pickup, or order a mail-in kit for a small batch.",
            },
            {
              title: "Plan larger collections",
              body: "For pallets, full truckloads, or major office cleanouts, call 763-559-5130 or request a quote first.",
            },
            {
              title: "Hand it off",
              body: "Our team checks in and logs your items at the Blaine dock, or our crew loads them at your location.",
            },
            {
              title: "Get your paperwork",
              body: "You receive a Certificate of Recycling, plus a destruction certificate if hard drive destruction is included.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Electronics Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            `Looking for electronics recycling near you in Blaine, [Coon Rapids](${href('/minnesota-recycling/coon-rapids/')}) or Spring Lake Park? Bring accepted electronics to 1525 99th Ln NE Monday through Friday, 7:30 AM to 4:00 PM. A few laptops, an old monitor, or a box of cables can come in during regular hours. Call ahead for large loads so our team can prepare.`,
            `The same visit can include [batteries](${href('/battery-recycling/')}), hard drives for destruction, and paper for shredding, while [ballasts](${href('/ballasts/')}) and lamps go to our Davenport St building.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Office upgrades, warehouse cleanouts, school equipment replacements and property turnovers all create more e-waste than a car can hold. Businesses can schedule pickup within approximately 100 miles of Blaine, including Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Mounds View, Roseville, Brooklyn Park, Maple Grove, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Site address:** plus dock or elevator access",
            "**Equipment types:** computers, monitors, copiers, servers and so on",
            "**Quantity:** an estimate in units, pallets or boxes",
            "**Data-bearing devices:** and whether you need hard drive destruction",
            "**CRTs or broken screens:** if any are in the load",
            "**Frequency:** a one-time cleanout or recurring service",
          ],
          buttons: {
            primary: { label: "Request an Electronics Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `Only a few devices, or outside our pickup area? Order an [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack your eligible items, and ship them back. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Recycling for North Metro Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses often need more than a place to drop off old equipment. They deal with multiple departments, large quantities, data-bearing devices and documentation requirements. We work with:",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "building",
              title: "Property managers",
              body: "TVs, monitors and microwaves left behind in apartments, condos and office buildings",
            },
            {
              icon: "tool",
              title: "Contractors and remodelers",
              body: `Electronics removed during renovations, plus [lamps and ballasts](${href('/ballasts/')}) from lighting upgrades`,
            },
            {
              icon: "school",
              title: "Schools and districts",
              body: "Retired laptops, desktops, monitors and printers from classrooms and district offices",
            },
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Computers and storage drives that may contain patient records, with hard drive destruction available",
            },
            {
              icon: "warehouse",
              title: "Warehouses and distribution centers",
              body: "Handheld scanners, label printers, cabling and server equipment",
            },
            {
              icon: "building",
              title: "Offices and commercial facilities",
              body: "PCs, phones and copiers removed during upgrades or moves",
            },
            {
              icon: "landmark",
              title: "Government, finance, retail, manufacturing and automotive",
              body: "Cleanouts that call for recycling and destruction records",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Minnesota Counties We Serve",
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
      heading: "Why Recycle Technologies for Electronics Recycling in Blaine",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Local drop-off",
              body: "Our Blaine center on 99th Lane NE is open weekdays from 7:30 AM to 4:00 PM",
            },
            {
              icon: "cpu",
              title: "More than electronics",
              body: "Our Blaine operations also handle batteries, light bulbs, PCB and non-PCB ballasts, and paper shredding",
            },
            {
              icon: "file",
              title: "Data destruction",
              body: "Hard drive destruction for sensitive storage devices, with a destruction certificate",
            },
            {
              icon: "sort",
              title: "Material recovery",
              body: "Plastics and wires go to molders and smelters, lead is removed from monitor glass, and circuit boards are separated for metal recovery",
            },
            { icon: "clock", title: "Since 1993", body: "More than three decades of recycling experience" },
            {
              icon: "recycle",
              title: "Zero-landfill commitment",
              body: `Learn about our [sustainability approach](${href('/sustainability/')})`,
            },
            {
              icon: "shield",
              title: "Recognized standards",
              body: "Our electronics recycling follows R2v3 and RIOS standards, and our shredding carries NAID AAA certification",
            },
            {
              icon: "layers",
              title: "Coverage beyond Blaine",
              body: "Commercial pickup across our Minnesota service area, plus mail-in kits for everywhere else",
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
      { q: "How much does electronics recycling cost in Blaine?", a: "Pricing depends on the equipment type and quantity. Call 763-559-5130 or request a quote." },
      { q: "Can I bring an old refrigerator or washer along with my electronics?", a: "Yes. The Blaine center also accepts appliances like refrigerators, washers and dryers. Call ahead for large ones." },
      { q: "Does the Blaine center take holiday lights, tires or scrap metal?", a: "Yes, all three are on the accepted list. Call before bringing a large amount." },
      { q: "Can I drop off latex paint or a propane tank on the same trip?", a: "The Blaine center lists both. Call first to confirm quantities." },
      { q: "Is there an email for Minnesota pickups?", a: "Yes. Reach our Minnesota dispatch team at dispatch@recycletechnologies.com." },
      { q: "Do you have an electronics recycling facility in Wisconsin too?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
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
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "IT Asset Disposition", href: href('/it-asset-disposition/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
            { label: "Minnesota Recycling and Shredding", href: href('/minnesota-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Blaine, MN",
    body: ["Bring accepted electronics to 1525 99th Ln NE on any weekday, order a mail-in kit for a few devices, or tell us what your business needs collected and where it's located."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "Sustainability link: the doc said confirm URL, linked to /sustainability/"],
}
