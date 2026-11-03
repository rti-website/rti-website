import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Phoenix, AZ — /arizona/phoenix/ballast-recycling/
 * Management sheet "all plan rti 1", Arizona tab; copy from the content
 * team's Google Doc "Phoenix Ballast Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const PHOENIX_BALLAST_RECYCLING: LocalPage = {
  url: href('/arizona/phoenix/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in Phoenix, AZ | Recycle Technologies",
    description: "Recycle PCB, non-PCB, magnetic, and electronic ballasts at our Phoenix site off I-17, or book commercial pickup. Non-PCB mail-in kits available.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Phoenix, AZ", "Arizona"] },
  hero: {
    crumb: "Ballast Recycling in Phoenix, AZ",
    h1: "Ballast Recycling in Phoenix, AZ",
    body: ["Commercial ballast recycling in Phoenix for PCB, non-PCB, magnetic, and electronic fluorescent light ballasts. Drop off near I-17, book a business pickup, or ship non-PCB ballasts in a kit."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    "Recycle Technologies recycles fluorescent light ballasts for Phoenix contractors, facility teams, businesses and residents at our site, 1545 East Victory Street, near I-17. We accept PCB and non-PCB ballasts, magnetic and electronic ballasts, and loose PCB and non-PCB capacitors. Drop-off runs Monday to Friday, 7:30 AM to 2:00 PM, with walk-ins for 1 to 4 pallets. Businesses can book pickup within roughly 100 miles of our Phoenix facility, and small batches of non-PCB ballasts can ship in a prepaid kit. Capacitors containing PCBs or DEHP are removed and incinerated at an EPA-approved facility, copper and steel are reclaimed, and each completed job comes with a Certificate of Recycling.",
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Phoenix Ballast Drop-Off Details",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Phoenix Recycling Center](${href('/phoenix-arizona/')}) (Maricopa County)`,
          rows: [
            {
              label: "Address",
              value: "[1545 East Victory Street, Phoenix, AZ 85040](https://www.google.com/maps/dir/?api=1&destination=1545+E+Victory+St%2C+Phoenix%2C+AZ+85040)",
            },
            { label: "Phone", value: "(602) 276-1858" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 2:00 PM" },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "Open to businesses and residents. Walk-ins are accepted for 1 to 4 pallets.",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For contractors and facilities with bulk or recurring ballast loads.",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "A prepaid 5-gallon kit for non-PCB ballasts, holding up to 50 lbs.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts We Accept in Phoenix",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: ["Bring every ballast from a relamp, LED retrofit, or fixture teardown in one load:"],
        },
        {
          kind: "grid",
          items: [
            { icon: "cpu", title: "PCB ballasts from older fluorescent fixtures" },
            { icon: "cpu", title: "Non-PCB ballasts, including those with DEHP capacitors" },
            { icon: "cpu", title: "Magnetic (core-and-coil) ballasts from fluorescent and HID fixtures" },
            { icon: "cpu", title: "Electronic ballasts from newer fluorescent fixtures" },
            { icon: "cpu", title: "Loose PCB and non-PCB capacitors" },
          ],
        },
        {
          kind: "note",
          body: [
            `Not sure what's in the box? Describe your ballasts when you [request a quote](${QUOTE_HREF}), and we'll tell you how to send them.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Ballast Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Check the label",
              body: "A ballast stamped \"No PCBs\" is non-PCB. If it has no such label, or it was made in 1979 or earlier, treat it as a PCB ballast.",
            },
            {
              title: "Keep PCB ballasts separate",
              body: "Pack PCB and unlabeled ballasts apart from non-PCB and electronic units, in sturdy drums, pails or boxes.",
            },
            {
              title: "Choose your route",
              body: "Drop off at Victory Street, request commercial pickup, or order a non-PCB kit for a small batch.",
            },
            {
              title: "We pull the capacitors",
              body: "Each ballast is sorted, taken apart, and its PCB or DEHP capacitors are sent by a certified hazardous waste hauler for incineration at an EPA-approved facility.",
            },
            {
              title: "Get your paperwork",
              body: "Copper and steel go to reclamation, and you receive a Certificate of Recycling for your records.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Ballast Recycling Options in Phoenix, AZ",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            `Bring ballasts to our [Phoenix location](${href('/phoenix-arizona/')}) at 1545 East Victory Street, at the corner of South 16th Street near I-17, Monday through Friday between 7:30 AM and 2:00 PM. Pull around to the loading area, where a team member will log your load. Walk-ins are fine for 1 to 4 pallets. Call (602) 276-1858 first for a larger load or any PCB ballasts.`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Electrical contractors, lighting retrofit crews, property managers, schools, and facility maintenance teams can schedule ballast pickup within roughly 100 miles of our Phoenix facility. Pickup is for commercial clients only. When you request a quote, tell us whether the ballasts are PCB, non-PCB, or unlabeled, give an estimated count or weight, and add your address. We'll confirm scheduling and pricing for your site.",
          ],
          buttons: {
            primary: { label: "Request a Ballast Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a few leftover ballasts at a branch office or job site, order the prepaid [Non-PCB Ballast Recycling Kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). The 5-gallon container holds up to 50 lbs of ballasts and comes with a return label. Fill it, seal it and ship it back. See how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order. The kit is for non-PCB ballasts only, so PCB and unlabeled units need drop-off or pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Disposal Rules in Phoenix",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The EPA says fluorescent light ballasts made through 1979 may contain PCBs in their small capacitors. It recommends removing PCB ballasts from buildings as soon as possible, because ballasts past their design life can rupture, and even intact ones may release small amounts of PCBs.",
            "For businesses, the rules go further:",
          ],
        },
        {
          kind: "checks",
          items: [
            "Under the Toxic Substances Control Act, the PCB material from a ballast must be incinerated.",
            "Spills of one pound or more of PCBs must be reported to the National Response Center within 24 hours of discovery.",
            "The fluorescent lamps removed alongside ballasts are universal waste in Arizona, so they need their own compliant recycling route.",
          ],
        },
        {
          kind: "note",
          body: [
            "Homeowners swapping out an old fixture don't have to wait for the city's once-a-year household hazardous waste pickup. Our Phoenix site takes ballasts from residents during regular drop-off hours.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Ballast Recycling",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            { icon: "layers", body: "PCB, non-PCB, magnetic and electronic ballasts at one Phoenix site" },
            {
              icon: "pin",
              body: `Lamps and ballasts from the same retrofit in one trip, with [light bulb recycling](${href('/light-bulbs/')}) at the same location`,
            },
            { icon: "pin", body: "Walk-in drop-off for up to 4 pallets near I-17" },
            {
              icon: "truck",
              body: "Commercial pickup within roughly 100 miles for contractors and facility teams",
            },
            {
              icon: "cpu",
              body: "A documented route for PCB and DEHP capacitors to EPA-approved incineration",
            },
            { icon: "recycle", body: "Copper and steel reclaimed instead of landfilled" },
            {
              icon: "clock",
              body: "A Certificate of Recycling for every completed job, from a lighting waste recycler operating since 1993",
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
      { q: "Is ballast recycling free in Phoenix?", a: "Pricing depends on the ballast type and quantity. Call (602) 276-1858 or request a quote to confirm the cost before you bring them in." },
      { q: "Can I throw a non-PCB ballast in the trash?", a: "Recycling is the better route. Many non-PCB ballasts still contain DEHP capacitors, and their copper and steel can be recovered." },
      { q: "What should I do with a leaking ballast?", a: "Clear or yellow oil on the casing usually means a leak. Wear chemical-resistant gloves, seal it in a heavy plastic bag with absorbent material, and call us before you transport it." },
      { q: "Are ballasts universal waste in Arizona?", a: "No. ADEQ's universal waste list covers lamps, batteries, mercury-containing equipment, pesticides and aerosol cans, while PCB ballasts fall under federal PCB rules." },
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
            { label: "Arizona Recycling Services", href: href('/arizona/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Ballast Recycling in Phoenix, AZ",
    body: ["Bring ballasts to Victory Street, order a non-PCB kit for a small batch, or request a quote for commercial pickup if you're clearing a retrofit or facility."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in Phoenix", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out (empty placeholder in the doc)"],
}
