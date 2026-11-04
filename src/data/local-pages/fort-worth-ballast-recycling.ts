import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Fort Worth, Texas — /texas/fort-worth/ballast-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Texas tab; copy from the content
 * team's Google Doc "Ballast Recycling in Fort Worth, TX", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const FORT_WORTH_BALLAST_RECYCLING: LocalPage = {
  url: href('/texas/fort-worth/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in Fort Worth, TX | Recycle Technologies",
    description: "Ballast recycling in Fort Worth, TX for PCB, non-PCB, magnetic and electronic ballasts. Local drop-off, commercial pickup and non-PCB mail-in kits.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Fort Worth, TX", "Tarrant County, TX", "Texas"] },
  hero: {
    crumb: "Ballast Recycling in Fort Worth, Texas",
    h1: "Ballast Recycling in Fort Worth, Texas",
    body: [`Recycle PCB, non-PCB, magnetic and electronic ballasts in Fort Worth, TX. Recycle Technologies accepts ballasts at its [Fort Worth location](${href('/fort-worth-texas/')}) and offers commercial pickup within roughly 100 miles. Drop off your materials, request a business pickup, or use a mail-in kit for eligible non-PCB ballasts.`],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    "Old ballasts often turn up during fluorescent lighting replacements, LED upgrades and commercial renovation projects. Some older magnetic ballasts may contain PCB- or DEHP-containing capacitors, so they need more than a trip to the dumpster. Recycle Technologies accepts PCB, non-PCB, magnetic and electronic ballasts from commercial and industrial facilities. Businesses in Fort Worth can use the local drop-off location or request a commercial pickup. After processing, RTI separates hazardous components for proper handling, recovers materials such as copper and steel, and provides a Certificate of Recycling.",
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Fort Worth Ballast Recycling Partner Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Fort Worth Partner Location](${href('/fort-worth-texas/')}) (Tarrant County)`,
          rows: [
            {
              label: "Address",
              value: "[101 East Bowie Street, Fort Worth, TX 76110](https://www.google.com/maps/dir/?api=1&destination=101+E+Bowie+St%2C+Fort+Worth%2C+TX+76110)",
            },
            { label: "Phone", value: "817-921-1440" },
            { label: "Email", value: "lrtlogistics@lightingresourcesinc.com" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 3:30 PM" },
            {
              label: "Location",
              value: "East Bowie Street, near I-35 and the Berry Street and Main Street corridors.",
            },
            {
              label: "Receiving access",
              value: "Enter through the main lot on East Bowie Street. The location has forklift unloading and two 53-foot loading docks on the west side.",
            },
          ],
          note: [
            "Before visiting: ballasts are listed among the materials accepted at the Fort Worth location, but accepted items and receiving requirements can vary. Call 817-921-1440 before arriving to confirm your ballast type, drop-off arrangements, and any documentation needed for the load.",
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "Bring accepted ballast materials to the Fort Worth location during its weekday hours. Call first to confirm the type and receiving requirements.",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Businesses can request scheduled ballast pickup. RTI's Fort Worth location page gives an approximate service radius of 100 miles.",
            },
            {
              icon: "mail",
              title: "Mail-in kit",
              body: "Smaller loads of eligible non-PCB ballasts can use the [Non-PCB Ballast Recycling Kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). This kit is for non-PCB ballasts, not PCB-containing units.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballast Types Recycle Technologies Accepts",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts several types of lighting ballasts from commercial and industrial facilities. The type matters because older magnetic units may contain hazardous components that require separate handling.",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "cpu",
              title: "PCB ballasts",
              body: "Older ballasts that may contain capacitors with polychlorinated biphenyls (PCBs). These materials require special handling.",
            },
            {
              icon: "cpu",
              title: "Non-PCB ballasts",
              body: "Magnetic or electronic ballasts manufactured without PCB-containing capacitors.",
            },
            {
              icon: "cpu",
              title: "Magnetic ballasts",
              body: "Traditional units commonly found in older fluorescent and HID lighting fixtures. Some older models may contain PCB- or DEHP-containing components.",
            },
            {
              icon: "cpu",
              title: "Electronic ballasts",
              body: "Units used in many newer fluorescent fixtures. They contain metals, plastics and electronic components that can be separated for material recovery.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Not sure what type you have? You do not need to guess. Describe the ballast, share any information from its label and tell us where the material is coming from when requesting a quote. RTI can help determine how the load should be handled.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Preparing Ballasts for Recycling",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Ballasts from lighting replacements can include different types and conditions. A little information before collection helps the receiving team understand what is coming in.",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "cpu", title: "Keep the ballast labels visible where possible." },
            { icon: "cpu", title: "Do not open or dismantle ballasts yourself." },
            {
              icon: "cpu",
              title: "Tell RTI if the load includes older magnetic ballasts or units that may contain PCBs or DEHP.",
            },
            {
              icon: "sort",
              title: "Keep any leaking or damaged units separate and contact RTI for handling instructions before moving them.",
            },
            {
              icon: "cpu",
              title: "For PCB-containing materials, ask the team whether specific paperwork or a manifest is required for your load.",
            },
            {
              icon: "briefcase",
              title: "For palletized or larger commercial loads, call ahead so the receiving team can confirm unloading arrangements.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Have a mixed load from a lighting retrofit? Explain what was removed, where it came from, and whether the ballast types are known. RTI sorts received ballasts by category before further processing.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Ballast Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Ballast recycling involves separating the different materials inside each unit and handling hazardous components through the appropriate route.",
          ],
        },
        {
          kind: "timeline",
          steps: [
            {
              title: "Collection",
              body: "Ballasts are received through an eligible drop-off arrangement, commercial pickup or the appropriate mail-in option.",
            },
            {
              title: "Sorting",
              body: "Received ballasts are sorted by category, including magnetic and electronic types.",
            },
            {
              title: "Dismantling",
              body: "Ballasts are taken apart so their metals, plastics and capacitors can be separated.",
            },
            {
              title: "Hazardous component handling",
              body: "PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility through a hazardous-waste hauler.",
            },
            {
              title: "Material recovery",
              body: "Non-hazardous materials, including copper and steel, are separated for reclamation. Plastics and other recoverable materials are also processed for reuse.",
            },
            {
              title: "Documentation",
              body: "Once processing is complete, Recycle Technologies issues a Certificate of Recycling for the load.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Options Across Fort Worth and DFW",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Local Drop-Off in Fort Worth",
          body: [
            "Searching for ballast recycling near you in Fort Worth? The RTI partner location at 101 East Bowie Street lists ballasts among its accepted materials. Businesses can contact the location to confirm whether their specific ballast type can be received and whether any arrangements are needed before arrival.",
            "The location is accessible from I-35 and the Berry Street and Main Street corridors. Use the main lot entrance on East Bowie Street and follow the facility team's instructions for the receiving area.",
            "Call 817-921-1440 before drop-off.",
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Ballast Pickup",
          dark: true,
          body: [
            "Lighting contractors, property managers, and facility teams often remove ballasts during larger lighting upgrades. Transporting those materials from every job site may not be practical.",
            "Recycle Technologies offers commercial pickup for business customers. Its Fort Worth location page identifies an approximate 100-mile pickup radius, with availability depending on the pickup address, material, quantity and service requirements.",
            "Businesses in Fort Worth and nearby DFW communities, including Arlington, Dallas, Grand Prairie, Irving, Grapevine, North Richland Hills, Haltom City, Keller, Hurst, Euless and Burleson, can request a pickup quote. Contact RTI to confirm service at your specific address.",
          ],
          listIntro: "When requesting a quote, provide:",
          list: [
            "**Location:** pickup address and ZIP code.",
            "**Material:** PCB, non-PCB, magnetic, electronic, or unknown ballasts.",
            "**Quantity:** approximate number of units, boxes or pallets.",
            "**Condition:** whether any ballasts are damaged or leaking.",
            "**Access:** loading dock, forklift availability, or other unloading requirements.",
            "**Timing:** one-time lighting project or recurring facility work.",
          ],
          buttons: {
            primary: { label: "Request a Commercial Ballast Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Ballast Recycling",
          body: [
            "A mail-in kit can be a practical option when a business has a smaller amount of eligible non-PCB ballasts and does not need a local pickup.",
            "The available [Non-PCB Ballast Recycling Kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) includes a collection container and prepaid shipping label. It is specifically intended for non-PCB ballasts.",
            "Do not use this kit for PCB-containing ballasts. Contact Recycle Technologies for the correct handling and collection instructions for PCB materials.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Ballast Recycling for Fort Worth Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Old lighting equipment can build up during renovations, tenant improvements, and routine facility maintenance. Recycle Technologies works with commercial and industrial customers that need a clear route for retired ballasts.",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "tool",
              title: "Electrical contractors",
              body: "Recycle ballasts removed during fluorescent-to-LED conversions, electrical upgrades and lighting replacement projects.",
            },
            {
              icon: "building",
              title: "Property managers",
              body: "Arrange recycling when replacing fixtures across office buildings, retail properties, apartments and commercial portfolios.",
            },
            {
              icon: "school",
              title: "Schools and universities",
              body: "Manage ballasts removed during classroom, campus and facility lighting upgrades.",
            },
            {
              icon: "heart",
              title: "Hospitals and healthcare facilities",
              body: "Arrange proper handling for ballasts removed during maintenance and renovation work.",
            },
            {
              icon: "warehouse",
              title: "Warehouses and distribution centers",
              body: "Coordinate ballast recycling during high-bay lighting replacement and facility upgrades.",
            },
            {
              icon: "factory",
              title: "Commercial and industrial facilities",
              body: "Clear stored lighting components as part of maintenance or equipment replacement.",
            },
            {
              icon: "truck",
              title: "Recycling organizations and haulers",
              body: "Contact RTI to discuss accepted ballast materials and receiving requirements.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            `For projects that also involve lamps or other materials, see the related [light bulb recycling service](${href('/light-bulbs/')}) and [battery recycling service](${href('/battery-recycling/')}).`,
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Fort Worth Businesses Choose Recycle Technologies",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              title: "Multiple ballast types",
              body: "RTI accepts PCB, non-PCB, magnetic and electronic ballasts from commercial and industrial facilities.",
            },
            {
              icon: "pin",
              title: "Hazardous component handling",
              body: "PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility.",
            },
            {
              icon: "sort",
              title: "Material recovery",
              body: "Copper, steel, plastics and other recoverable materials are separated for reclamation or reuse.",
            },
            {
              icon: "pin",
              title: "Local receiving point",
              body: "The Fort Worth partner location lists ballasts among accepted drop-off materials.",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Businesses can request collection within the approximate service radius around Fort Worth.",
            },
            {
              icon: "file",
              title: "Recycling documentation",
              body: "A Certificate of Recycling is issued after processing is complete.",
            },
            {
              icon: "clock",
              title: "Established service history",
              body: "Recycle Technologies has provided recycling services since 1993.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Texas Counties Served for Ballast Recycling",
      grey: true,
      blocks: [{ kind: "places", links: [{ label: "Tarrant County", href: "" }] }],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Can I bring ballasts removed during a commercial lighting upgrade to the Fort Worth location?", a: "The Fort Worth drop-off page lists ballasts among accepted materials. Call 817-921-1440 before visiting to confirm your ballast type and receiving requirements." },
      { q: "Can I bring a mixed load of magnetic and electronic ballasts?", a: "RTI sorts received ballasts by category. Contact the team before delivery for instructions on preparing a mixed load." },
      { q: "What if the label on my ballast is missing or unreadable?", a: "Describe the unit and share any details you have when requesting a quote. RTI can help determine how the material should be handled." },
      { q: "Can I use the non-PCB ballast kit for older magnetic ballasts?", a: "Only when the ballasts are confirmed to be non-PCB. The available kit is designed specifically for non-PCB ballasts." },
      { q: "Can RTI collect ballasts from more than one DFW job site?", a: "Pickup arrangements depend on the locations, materials and collection requirements. Share the addresses and project details when requesting a commercial quote." },
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
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Texas Recycling Services", href: href('/texas/') },
            { label: "Fort Worth Location", href: href('/fort-worth-texas/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Recycle Ballasts in Fort Worth, Texas",
    body: ["Replacing fluorescent fixtures or clearing old lighting equipment from a commercial property? Recycle Technologies accepts PCB, non-PCB, magnetic and electronic ballasts through its recycling program.", "Bring accepted materials to the Fort Worth location after confirming the drop-off requirements, request commercial pickup within the service area, or use the non-PCB ballast recycling kit for eligible smaller loads.", "Call 817-921-1440 or email lrtlogistics@lightingresourcesinc.com to discuss your ballast recycling needs."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Commercial Pickup", href: PICKUP_HREF },
  },
  todo: ["Related links: \"Texas Recycling Services\" pointed at the old /texas-recycling/, linked to the state page /texas/ instead", "the doc's short descriptions after each related link left out (related links are link-only)", "Hero and band 1: the doc gives no link to the Fort Worth page there, linked to /fort-worth-texas/ as on the other Fort Worth pages", "Address: the doc gives no Google Maps link, built the same way as on the other Fort Worth pages", "Commercial pickup: the doc has one quote button (unlinked), a Schedule a Pickup button added beside it as on the other pages", "\"as part of maintenance, on or equipment replacement\" in the doc read as \"as part of maintenance or equipment replacement\"", "\"plastics,s\", \"label,l\", \"pickup,p\", \"plastic,s\" typos fixed", "\"ballast recycling near you\" written as \"near you\" as on the earlier pages", "Counties heading is cut off in the doc (\"Counties Served for\"), completed as \"Texas Counties Served for Ballast Recycling\"", "Tarrant County linked to /fort-worth-texas/ as on the electronics and battery pages", "Email row is a Lighting Resources address (lrtlogistics@lightingresourcesinc.com), kept as written", "confirm it should show on an RTI page", "The doc is hedged about ballasts at Fort Worth (\"listed among the materials accepted ... call to confirm\"), while the other Fort Worth docs say ballasts are taken with a manifest for PCB units", "kept as written"],
}
