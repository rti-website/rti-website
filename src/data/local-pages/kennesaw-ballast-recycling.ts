import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Kennesaw, GA — /georgia/kennesaw/ballast-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Georgia tab; copy from the content
 * team's Google Doc "Ballast Recycling in Kennesaw, Georgia", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const KENNESAW_BALLAST_RECYCLING: LocalPage = {
  url: href('/georgia/kennesaw/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in Kennesaw, GA | Recycle Technologies",
    description: "Recycle PCB, non-PCB, electronic, and magnetic ballasts in Kennesaw, GA. Weekday drop-off in Cobb County, business pickup across metro Atlanta, and kits.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Kennesaw, GA", "Cobb County, GA", "Georgia"] },
  hero: {
    crumb: "Ballast Recycling in Kennesaw, GA",
    h1: "Ballast Recycling in Kennesaw, GA",
    body: ["Lighting ballast recycling for Kennesaw, Marietta and metro Atlanta, with weekday drop-off on Town Point Drive, pickup for businesses within about 100 miles, and non-PCB ballast kits by mail."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Fluorescent ballasts built through 1979 may hide PCB-filled capacitors, and newer units still carry copper and steel worth recovering. Recycle Technologies takes ballasts from contractors, property managers, and homeowners at our [Kennesaw facility](${href('/kennesaw-georgia/')}), 3400 Town Point Dr NW, Suite 130, in Cobb County. We accept PCB, non-PCB, electronic, and magnetic ballasts, send the hazardous parts to an EPA-approved incineration facility, and reclaim the metal. Drop them off on a weekday, mail non-PCB units in a kit, or book a business pickup after your next retrofit.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Kennesaw Ballast Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Kennesaw Recycling Center](${href('/kennesaw-georgia/')}) (Cobb County)`,
          rows: [
            {
              label: "Address",
              value: "[3400 Town Point Dr NW, Suite 130, Kennesaw, GA 30144](https://www.google.com/maps/dir/?api=1&destination=3400%20Town%20Point%20Dr%20NW%2C%20Suite%20130%2C%20Kennesaw%2C%20GA%2030144)",
            },
            { label: "Phone", value: "770-426-5000" },
            { label: "Email", value: "dispatch@recycletechnologies.com" },
            { label: "Hours", value: "Monday to Friday, 9:00 AM to 4:00 PM" },
            {
              label: "Arriving",
              value: "Walk-ins are accepted, and scheduling ahead is preferred. Phone before you leave, and staff will point you to where ballasts are unloaded.",
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
              body: "Residents and businesses, weekdays. Call ahead before bringing PCB ballasts.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Collection for commercial sites within roughly 100 miles.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for non-PCB ballasts." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballast Types We Take in Kennesaw",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "From one ballast out of a shop light in a Powder Springs garage to crates of them from a hospital retrofit in Marietta, we accept:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "cpu", title: "Non-PCB ballasts" },
            { icon: "cpu", title: "PCB ballasts (call 770-426-5000 before bringing or shipping them)" },
            { icon: "cpu", title: "Electronic ballasts" },
            { icon: "cpu", title: "Magnetic ballasts" },
            { icon: "cpu", title: "Ballasts pulled from fluorescent and HID fixtures" },
          ],
        },
        {
          kind: "note",
          body: [
            `Taking down whole fixtures? Our Kennesaw facility also takes the [fluorescent tubes and lamps](${href('/light-bulbs/')}) and mercury devices from the same job. Mercury material from those items goes to our Greenwood, Indiana facility.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Sorting and Packing Ballasts",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Sorting and Packing Ballasts",
          panel: [
            "If you're not sure which type you have, describe the ballasts when you ask for a quote, and our team will tell you how to handle them. Keep older or unlabeled units separate from newer ones, and pack everything in a sturdy box or bin, since ballasts are heavy. For a ballast that's leaking or oily, set it apart and call first.",
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
          kind: "timeline",
          steps: [
            {
              title: "Choose a method",
              body: "Drop off at Town Point Drive, request a business pickup, or order a non-PCB kit.",
            },
            { title: "Describe the load", body: "Share counts, types, and anything that may contain PCBs." },
            {
              title: "Hand it over",
              body: "Unload at our facility, stage boxes for the driver, or ship your kit.",
            },
            {
              title: "Hazardous parts out",
              body: "Components that need special handling are routed to an EPA-approved incineration facility.",
            },
            {
              title: "Metal recovered",
              body: "Copper and steel are reclaimed, and a Certificate of Recycling documents the disposal.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Options in Kennesaw, GA",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Need ballast recycling near you in Kennesaw, Acworth, Marietta, or Smyrna? Bring ballasts to 3400 Town Point Dr NW any weekday from 9:00 AM to 4:00 PM. Homeowners and companies can both drop off, and calling 770-426-5000 to schedule ahead keeps things moving, especially for PCB units or a big batch.",
            `Add [batteries](${href('/battery-recycling/')}) or old [electronics](${href('/electronic-recycle/')}) to the same trip.`,
            `See all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Electrical contractors wrapping up LED retrofits, property managers updating common areas, school districts, hospitals, warehouses along I-75 and I-575, and demolition crews can book pickup instead of hauling ballasts in. Commercial pickup reaches sites within roughly 100 miles of Kennesaw, including Atlanta, Roswell, Alpharetta, Sandy Springs, Woodstock, Canton, Cartersville and Rome.",
          ],
          listIntro: "To price your pickup, send:",
          list: [
            "**Site:** address and ZIP code",
            "**Ballast types:** PCB, non-PCB, electronic or magnetic",
            "**Count:** number of ballasts, boxes or pallets",
            "**Condition:** any leaking or oil-stained units",
            "**Fixture parts:** tubes, lamps or capacitors going out too",
            "**Timing:** one project or ongoing service",
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
            `For a few non-PCB ballasts, order a prepaid [ballast recycling kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it, and ship it back. Kits aren't meant for PCB units, so bring those to Town Point Drive or include them in a commercial pickup. Learn more on our [mail-in recycling program](${href('/mail-in-recycling/')}) page.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Ballast Disposal Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Under the federal Toxic Substances Control Act, fluorescent ballasts made through 1979 may contain PCBs. Intact, non-leaking units can be removed and recycled, while leaking PCB ballasts must be incinerated. The EPA also urges building owners to remove PCB ballasts as soon as possible (EPA).",
            "Community collection days in Cobb County typically leave out lighting waste, so contractors and facilities across metro Atlanta need a recycler that accepts every ballast type.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Contractors and Facilities Choose Recycle Technologies",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Walk-in site in Cobb County",
              body: "Weekday drop-off for residents and businesses on Town Point Drive.",
            },
            { icon: "layers", title: "Every ballast type", body: "PCB, non-PCB, electronic and magnetic." },
            {
              icon: "pin",
              title: "Proper handling of hazardous parts",
              body: "Routed to an EPA-approved incineration facility.",
            },
            { icon: "recycle", title: "Metal recovery", body: "Copper and steel reclaimed from each load." },
            {
              icon: "pin",
              title: "Fixture teardowns in one trip",
              body: "Ballasts, lamps, and mercury devices together, with mercury going to our Greenwood, Indiana facility.",
            },
            {
              icon: "file",
              title: "Records for your files",
              body: "A Certificate of Recycling after disposal.",
            },
            { icon: "clock", title: "Since 1993", body: "Over three decades of recycling experience." },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Georgia Counties We Serve",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "grid",
          items: [
            { icon: "landmark", title: "Cobb County" },
            { icon: "landmark", title: "Cherokee County" },
            { icon: "landmark", title: "Bartow County" },
            { icon: "landmark", title: "Paulding County" },
            { icon: "landmark", title: "Douglas County" },
            { icon: "landmark", title: "Fulton County" },
            { icon: "landmark", title: "DeKalb County" },
            { icon: "landmark", title: "Gwinnett County" },
            { icon: "landmark", title: "Forsyth County" },
            { icon: "landmark", title: "Clayton County" },
            { icon: "landmark", title: "Henry County" },
            { icon: "landmark", title: "Fayette County" },
            { icon: "landmark", title: "Coweta County" },
            { icon: "landmark", title: "Carroll County" },
            { icon: "landmark", title: "Floyd County" },
            { icon: "landmark", title: "Gordon County" },
            { icon: "landmark", title: "Pickens County" },
            { icon: "landmark", title: "Hall County" },
            { icon: "landmark", title: "Clarke County" },
            { icon: "landmark", title: "Bibb County" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "What does ballast recycling cost in Kennesaw?", a: "Fees depend on ballast type and quantity. Call 770-426-5000 or request a quote." },
      { q: "What if a ballast has no label at all?", a: "Keep it apart from labeled units and call 770-426-5000 to describe it before you bring it in." },
      { q: "Can I bring ballasts and the old tubes from the same fixtures?", a: "Yes. Kennesaw accepts both, so a whole retrofit can come in together." },
      { q: "Can one pickup also collect electronics and batteries?", a: "Share the full list when you request a quote, and we'll confirm what can go on the same truck." },
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
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Georgia Recycling", href: href('/georgia/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Recycle Ballasts in Kennesaw, GA",
    body: ["Bring ballasts to Town Point Drive on a weekday, mail a few non-PCB units in a kit, or send us your site and count for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in Kennesaw", href: PICKUP_HREF },
  },
  todo: ["PCB ballasts: the doc asks to confirm PCB ballast drop-off at Kennesaw (the bullet and the rest of the page's PCB drop-off wording are kept, the note is not)", "Leaking ballasts: the doc asks to confirm leaking-ballast handling at Kennesaw (the call-first line is kept, the note is not)", "FAQ \"Can a scrap yard send us the ballasts it won't take?\" left out (answer is [Confirm whether RTI accepts ballast loads from other recyclers] in the doc)", "Related link \"Georgia Recycling\" pointed to /georgia-recycling/ (being moved)", "linked to the state page /georgia/ instead", "\"Mariett\", \"property managers,s\" and \"electronic,c\" in the doc read as \"Marietta\", \"property managers,\" and \"electronic,\""],
}
