import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Fort Worth, TX — /texas/fort-worth/light-bulb-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Texas tab; copy from the content
 * team's Google Doc "Light Bulb Recycling in Fort Worth, TX", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const FORT_WORTH_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/texas/fort-worth/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in Fort Worth, TX | Recycle Technologies",
    description: "Recycle fluorescent tubes, CFLs, HID, LED, and specialty lamps at our Fort Worth, TX partner location. Dock drop-off off I-35, business pickup and mail-in kits.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Fort Worth, TX", "Tarrant County, TX", "Texas"] },
  hero: {
    crumb: "Light Bulb Recycling in Fort Worth, TX",
    h1: "Light Bulb Recycling in Fort Worth, TX",
    body: ["Lamp recycling for Fort Worth, Arlington and the wider Dallas-Fort Worth area through our partner location on East Bowie Street, with loading-dock drop-off, business pickup within about 100 miles, and prepaid bulb kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Fluorescent tubes, CFLs, and HID lamps hold mercury, and Texas expects businesses to send used lamps to an approved facility instead of a landfill. Recycle Technologies serves Fort Worth through its [partner location](${href('/fort-worth-texas/')}) at 101 E Bowie St, a site shared with EZ on the Earth and served through the Texas Bulb Processing Facility. It is not a Recycle Technologies-owned facility. The location takes straight, U-bend, and circular tubes, CFLs, metal halide and high-pressure sodium lamps, LED, UV, neon, halogen, and incandescent bulbs. Businesses can unload at the dock or book pickup; small batches can ship in a kit, and the mercury recovered from lamps goes to our Greenwood, Indiana facility.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Fort Worth Light Bulb Recycling Partner Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Fort Worth Partner Location](${href('/fort-worth-texas/')}) (Tarrant County)`,
          rows: [
            {
              label: "Address",
              value: "[101 E Bowie St, Fort Worth, TX 76110](https://www.google.com/maps/dir/?api=1&destination=101+E+Bowie+St%2C+Fort+Worth%2C+TX+76110)",
            },
            { label: "Phone", value: "817-921-1440" },
            { label: "Email", value: "lrtlogistics@lightingresourcesinc.com" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 3:30 PM" },
            {
              label: "Location type",
              value: "RTI partner location shared with EZ on the Earth, not a Recycle Technologies-owned facility",
            },
            {
              label: "Getting there",
              value: "The site is just off I-35 near Berry Street and Main Street. Pull into the main lot on East Bowie Street. Loads come off by forklift or at one of two 53-foot docks on the west side of the building.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "Weekdays for businesses and residents, with a call ahead recommended. Most household lamps reach the site through city household hazardous waste programs.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Within roughly 100 miles of the Fort Worth partner location.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid bulb kits for smaller batches." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Lamps Accepted at Our Fort Worth Partner Location",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A box of spent CFLs from a Keller home office and pallets of 8-foot tubes from a warehouse relamp near Alliance both belong here. The partner location accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "Straight fluorescent tubes, plastic-coated and shielded types included" },
            { icon: "tube", title: "Green-tipped fluorescent tubes" },
            { icon: "tube", title: "U-bend and circular fluorescent lamps" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            { icon: "bulb", title: "HID lamps, such as metal halide and high-pressure sodium" },
            { icon: "bulb", title: "LED bulbs" },
            { icon: "bulb", title: "UV lamps, plus neon, argon and other cold cathode lamps" },
            { icon: "bulb", title: "Flood, halogen and incandescent bulbs" },
          ],
        },
        {
          kind: "note",
          body: [
            `Pulling out old fixtures too? [Ballasts](${href('/ballasts/')}) can come along, though PCB ballasts must arrive with a manifest. Call 817-921-1440 if you aren't sure a lamp qualifies.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Getting Lamps Ready to Move",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Getting Lamps Ready to Move",
          panel: [
            "U.S. Department of Transportation rules apply to how bulbs are packed for shipping, so use the cartons your new lamps came in or a fiber bin. Fill gaps so tubes can't roll, keep cracked lamps in their own closed container, and stack boxes so the heaviest sit on the bottom. Businesses on a pickup schedule can ask for packing materials ahead of time.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Lamp Recycling Works in Fort Worth",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Choose your option",
              body: "Unload at the East Bowie Street partner location, book a business pickup, or order a mail-in kit.",
            },
            { title: "Pack carefully", body: "Cartons or fiber bins keep tubes from breaking on the way." },
            { title: "Hand off", body: "Drive up to the dock, stage boxes for the driver, or ship your kit." },
            {
              title: "Separation",
              body: "Glass, aluminum end caps, and mercury-bearing phosphor powder are split apart.",
            },
            {
              title: "Recovery",
              body: "Glass heads to industrial reuse, end caps to an aluminum salvage partner, and the mercury material to our Greenwood, Indiana facility. A certificate of recycling follows.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Light Bulb Recycling Options in Fort Worth, TX",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for light bulb recycling near you in Fort Worth, Haltom City, Burleson or North Richland Hills? Bring boxed lamps to our partner location at 101 E Bowie St, shared with EZ on the Earth, any weekday between 8:00 AM and 3:30 PM. Requirements vary with the material and load size, so call 817-921-1440 before you head out. Pallets unload quickly at the west-side docks when the crew expects you. Residents can also use the site, though most household bulbs in Tarrant County go through city collection programs.",
            `The same trip can include [batteries](${href('/battery-recycling/')}) and [electronics](${href('/electronic-recycle/')}).`,
            `See all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Apartment communities, property managers, school districts, hospitals, warehouses around Alliance and DFW Airport, retail centers and electrical contractors finishing LED retrofits can schedule pickup instead of loading their own trucks. Business pickup runs within roughly 100 miles of the Fort Worth partner location, reaching Dallas, Arlington, Grand Prairie, Irving, Grapevine, Keller, Hurst, Euless, Denton, Weatherford, Cleburne and Waco.",
          ],
          listIntro: "For a quote, send:",
          list: [
            "**Site address:** street, city and ZIP code",
            "**Lamp types:** tubes, CFLs, HID, LED or specialty lamps",
            "**Quantity:** lamp count, boxes or pallets",
            "**Broken lamps:** anything cracked or shattered",
            "**Schedule:** a single relamp or repeat service",
            "**Supplies:** whether you need cartons or fiber bins first",
          ],
          buttons: {
            primary: { label: "Request a Light Bulb Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a few bulbs, or a branch office outside the pickup area, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) from EZ on the Earth, pack it and send it back. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page explains the process.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Texas Rules for Used Lamps",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The Texas Commission on Environmental Quality lets businesses manage used fluorescent and HID lamps as universal waste. That means containers marked \"Universal Waste—Lamps,\" \"Waste Lamps\" or \"Used Lamps\" with a start date, storage that keeps lamps intact, and shipment to an approved facility within one year. Lamps from households and very small quantity generators are exempt from the landfill ban, though TCEQ still recommends recycling CFLs (TCEQ RG-377).",
            "Fort Worth's household collection center serves residents only, and limits bulbs per visit, so businesses across Tarrant County need a commercial route like our partner location.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why DFW Businesses Recycle Lamps Through Recycle Technologies",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Dock-ready partner location",
              body: "Two 53-foot docks and forklift unloading at our East Bowie Street partner site, shared with EZ on the Earth.",
            },
            {
              icon: "layers",
              title: "Every common lamp type",
              body: "Fluorescent tubes, CFLs, HID, LED, UV, neon, halogen, and incandescent bulbs.",
            },
            {
              icon: "trash",
              title: "Fixture cleanouts in one trip",
              body: "Ballasts accepted alongside lamps, with a manifest for PCB units.",
            },
            {
              icon: "pin",
              title: "Mercury recovery",
              body: "Mercury material from lamps goes to our Greenwood, Indiana facility.",
            },
            {
              icon: "truck",
              title: "Pickup across North Texas",
              body: "Business collection within roughly 100 miles of Fort Worth.",
            },
            {
              icon: "truck",
              title: "Packing help",
              body: "Cartons or fiber bins delivered before a scheduled pickup.",
            },
            { icon: "clock", title: "Since 1993", body: "More than three decades of recycling experience." },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Texas Counties We Serve",
      grey: true,
      blocks: [{ kind: "places", links: [{ label: "Tarrant County", href: "" }] }],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Who operates the Fort Worth location?", a: "It's a Recycle Technologies partner location shared with EZ on the Earth, not an RTI-owned facility. Call 817-921-1440 or request a quote to get started." },
      { q: "Can I deliver lamps on pallets?", a: "Yes. The site unloads by forklift or at its west-side docks, so palletized loads are easy to hand off." },
      { q: "Should I recycle the LED bulbs from a retrofit too?", a: "Yes. LED bulbs are accepted, so old tubes and new-style lamps can come in together." },
      { q: "Will a mail-in kit work for a small office?", a: "It's a good fit for a few bulbs. Larger or repeat volumes are better suited to pickup." },
      { q: "Can I get proof that my lamps were recycled?", a: "Yes. A certificate of recycling is issued once processing is done." },
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
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Texas Recycling", href: href('/texas/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Start Recycling Lamps in Fort Worth, TX",
    body: ["Call ahead and bring your lamps to our East Bowie Street partner location, mail a small batch in a kit, or send us your site and lamp count for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Fort Worth", href: PICKUP_HREF },
  },
  todo: ["Related link \"Texas Recycling\" pointed at the old /texas-recycling/", "linked to the state page /texas/ instead", "\"Burleson,n\" in the doc read as \"Burleson\"", "\"light bulb recycling near you\" written as \"near you\" as on the earlier pages", "The doc's Counties band lists only Tarrant County (unlinked in the doc", "linked to /fort-worth-texas/ as on the electronics and battery pages)", "Email row is a Lighting Resources address (lrtlogistics@lightingresourcesinc.com), kept as written", "confirm it should show on an RTI page", "This doc alone says the site is shared with EZ on the Earth and served through the Texas Bulb Processing Facility (kept as written)"],
}
