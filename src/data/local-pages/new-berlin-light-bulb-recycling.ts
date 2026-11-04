import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in New Berlin, WI — /wisconsin/new-berlin/light-bulb-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Light Bulb Recycling in New Berlin, Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/wisconsin/new-berlin/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in New Berlin, WI | Recycle Technologies",
    description: "Recycle fluorescent tubes, CFLs, HID, LED, and broken lamps in New Berlin, WI. Weekday drop-off near I-43, commercial pickup and prepaid mail-in kits.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Light Bulb Recycling in New Berlin, WI",
    h1: "Light Bulb Recycling in New Berlin, WI",
    body: ["Lamp and bulb recycling for New Berlin, Milwaukee and Waukesha County, with weekday drop-off on South 171st Street, commercial pickup for businesses and prepaid mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Fluorescent tubes, CFLs and HID lamps hold mercury, and Wisconsin regulates spent lamps from businesses as universal waste. Recycle Technologies handles them at our [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, near I-43 and College Avenue, where collected bulbs are processed in-house. We take straight, U-shaped, and circular tubes, CFLs, metal halide and high-pressure sodium lamps, LED, UV, neon, halogen and incandescent bulbs, plus ballasts. Homeowners and companies can drop off on weekdays; small batches can go by mail, and businesses with ongoing relamps can book pickup.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Light Bulb Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}) (Waukesha County)`,
          rows: [
            {
              label: "Address",
              value: "[2815 S 171st St, New Berlin, WI 53151](https://www.google.com/maps/dir/?api=1&destination=2815%20South%20171st%20Street%2C%20New%20Berlin%2C%20WI%2053151)",
            },
            { label: "Phone", value: "262-798-3040" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Arriving",
              value: "Coming from I-43, follow College Avenue toward South 171st Street. Park in the main lot; pallets and bigger loads go to the rear loading area.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off for homes and businesses",
              body: "Weekdays during business hours, with no appointment required.",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For companies within 100 miles, with packing materials delivered ahead if you need them.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid bulb kits that you fill and send back by FedEx." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Lamps We Recycle in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A few spare CFLs from a West Allis basement or a few hundred 8-foot tubes from a Menomonee Falls warehouse retrofit can both come to our New Berlin center. We accept:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "tube",
              title: "Fluorescent tubes 4 feet and under and 5 feet and over, including plastic-coated, shielded, and green-tipped tubes",
            },
            { icon: "bulb", title: "U-shaped and circular fluorescent lamps" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            {
              icon: "bulb",
              title: "High-intensity discharge (HID) lamps, such as metal halide and high-pressure sodium, plus super high-pressure lamps",
            },
            { icon: "bulb", title: "LED bulbs" },
            { icon: "bulb", title: "UV lamps and cold cathode lamps like neon and argon" },
            { icon: "bulb", title: "Halogen, quartz, flood, incandescent and projector bulbs" },
            { icon: "checkCircle", title: "Christmas lights" },
            { icon: "bulb", title: "Broken fluorescent lamps (call before you bring them)" },
          ],
        },
        {
          kind: "note",
          body: [
            `Taking fixtures down too? PCB and non-PCB [ballasts](${href('/wisconsin/new-berlin/ballast-recycling/')}) are accepted here, along with mercury thermostats and other mercury devices. If you can't tell whether a lamp qualifies, call 262-798-3040 to confirm.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Packing Lamps for the Drive",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Packing Lamps for the Drive",
          panel: [
            "Federal Department of Transportation rules cover bulb packaging in transit, so pack lamps in the cartons your replacements came in or in a fiber bin from us. Tubes rolling loose in a truck bed or a trash bag tend to arrive in pieces. Seal broken lamps in their own closed container and keep them apart from whole ones. Businesses booking pickup can have packing materials delivered first.",
            `Our main [light bulb recycling page](${href('/light-bulbs/')}) covers every lamp type in more detail.`,
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "From Your Dock to Recovered Materials",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick a method",
              body: "Drop off at South 171st Street, schedule commercial pickup, or order a mail-in kit.",
            },
            {
              title: "Box the lamps",
              body: "Use original cartons or a fiber bin so nothing cracks on the way.",
            },
            {
              title: "Hand them off",
              body: "Unload at our lot, stage boxes for the driver, or ship your kit.",
            },
            {
              title: "In-house processing",
              body: "Lamps are processed at our Wisconsin facility, where glass, aluminum end caps and phosphor powder are separated.",
            },
            {
              title: "Material recovery",
              body: "A distillation company receives the mercury-bearing powder and filters; glass goes to industrial reuse, and end caps go to a salvage partner. You receive a certificate of recycling.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ways to Recycle Light Bulbs in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Need fluorescent bulb disposal near you in Brookfield, Elm Grove, Muskego or New Berlin? Bring boxed lamps to 2815 S 171st St on a weekday between 7:30 AM and 4:00 PM. You don't need an appointment during those hours, and households and companies are both welcome. Call 262-798-3040 ahead of pallets, a trailer of tubes, or any broken lamps so the team can prepare.",
            `Make it one trip by adding [batteries](${href('/battery-recycling/')}) and [old electronics](${href('/electronic-recycle/')}) to the load.`,
            `Find other [Recycle Technologies drop-off sites](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Apartment complexes, school districts, hospitals, retail stores, warehouses and electrical contractors finishing LED retrofits often have more lamps than a pickup truck can carry. Commercial pickup is a business service within 100 miles of New Berlin, reaching Milwaukee, Waukesha, Wauwatosa, Pewaukee, Franklin, Oak Creek, Racine, Kenosha, West Bend and Madison.",
          ],
          listIntro: "Share these details for a quote:",
          list: [
            "**Where:** the building address and ZIP code",
            "**What:** tube lengths, CFLs, HID, LED or specialty lamps",
            "**How many:** lamp count, number of boxes or pallets",
            "**Breakage:** whether any lamps are cracked or shattered",
            "**How often:** a single relamp or a repeating schedule",
            "**Supplies:** whether you want fiber bins or boxes dropped off first",
          ],
          buttons: {
            primary: { label: "Request a Lamp Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a handful of CFLs or a branch office far from New Berlin, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), fill it and hand it to FedEx. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page walks through the steps.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Wisconsin Lamp Recycling Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The Wisconsin DNR regulates fluorescent and other mercury lamps from businesses as universal waste. That means closed, non-metal containers labeled \"Universal Waste – Lamps,\" \"Waste Lamps\" or \"Used Lamps,\" a start date on each container, and shipment to a recycler within one year (DNR guide WA-1810). Households aren't held to those rules, but the DNR still urges recycling mercury bulbs.",
            "County household hazardous waste programs in Milwaukee and Waukesha counties serve residents only, so businesses need another route. Waukesha County lists Recycle Technologies in New Berlin as a local recycler for business lamps and ballasts (Waukesha County).",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Southeast Wisconsin Businesses Use Recycle Technologies for Lamps",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Processed in Wisconsin",
              body: "Lamps collected here are handled at our own New Berlin facility instead of being passed along",
            },
            {
              icon: "layers",
              title: "Broad lamp list",
              body: "Tubes of every length, CFLs, HID, LED, UV, neon, projector bulbs and broken fluorescent lamps",
            },
            {
              icon: "layers",
              title: "Bulbs, ballasts and mercury devices together",
              body: "One stop for everything that comes out of a fixture",
            },
            {
              icon: "truck",
              title: "Packing help",
              body: "Fiber bins or boxes delivered before your scheduled pickup",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            { icon: "file", title: "Proof for your files", body: "A certificate of recycling after every job" },
            {
              icon: "pin",
              title: "Recognized locally",
              body: "Listed by Waukesha County as a business lighting recycler",
            },
            { icon: "clock", title: "Since 1993", body: "More than 30 years in the recycling business" },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Wisconsin Counties We Serve",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "grid",
          items: [
            { icon: "landmark", title: "Waukesha County" },
            { icon: "landmark", title: "Milwaukee County" },
            { icon: "landmark", title: "Racine County" },
            { icon: "landmark", title: "Washington County" },
            { icon: "landmark", title: "Sheboygan County" },
            { icon: "landmark", title: "Fond du Lac County" },
            { icon: "landmark", title: "Dane County" },
            { icon: "landmark", title: "Calumet County" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "What does it cost to recycle lamps in New Berlin?", a: "Pricing depends on lamp type, length, and quantity. Call 262-798-3040 or request a quote." },
      { q: "Can an electrical contractor drop off lamps from a client's building?", a: "Yes. Drop-off is open to businesses, so contractors can bring lamps straight from the job." },
      { q: "Are LED bulbs worth recycling if they don't contain mercury?", a: "Yes. LEDs are on our accepted list, and they still contain small amounts of metals such as lead and nickel (Focus on Energy)." },
      { q: "Can the same pickup collect electronics or documents?", a: "Yes. A scheduled Wisconsin business collection can include electronics, batteries, and confidential documents along with lamps." },
      { q: "Is the New Berlin center open on weekends?", a: "No. It's open Monday through Friday, so a mail-in kit is the easier option if weekdays don't work." },
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
            { label: "Ballast Recycling in Wisconsin", href: href('/wisconsin/new-berlin/ballast-recycling/') },
            { label: "Bulb Recycling in Milwaukee", href: href('/wisconsin-recycling/bulb-recycle-milwaukee/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Wisconsin Recycling & Shredding", href: href('/wisconsin-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Recycle Your Lamps in New Berlin, WI",
    body: ["Drop off boxed lamps on any weekday, mail a small batch, or send us your building address and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Packing broken lamps: the doc's [Confirm broken-lamp packing steps at New Berlin] note left out (the sealing line is kept)", "FAQ \"Is there a minimum for commercial pickup?\" left out (the answer is a [Confirm pickup minimum] placeholder)", "Ballast links: the doc pointed to /wisconsin-recycling/ballast-recycling/ (being moved), linked to /wisconsin/new-berlin/ballast-recycling/ instead"],
}
