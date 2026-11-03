import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Ontario, CA — /california/ontario/light-bulb-recycling/
 * Management sheet "all plan rti 1", California tab; copy from the content
 * team's Google Doc "Ontario CA Light Bulb Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const ONTARIO_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/california/ontario/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in Ontario, CA | Recycle Technologies",
    description: "Light bulb recycling in Ontario, CA: drop off fluorescent tubes, CFLs, HID and halogen bulbs on Francis Street, book business pickup, or mail in a kit.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Ontario, CA", "San Bernardino County, CA", "California"] },
  hero: {
    crumb: "Light Bulb Recycling in Ontario, CA",
    h1: "Light Bulb Recycling in Ontario, CA",
    body: ["Light bulb recycling for Ontario and the Inland Empire, with local drop-off on Francis Street, commercial pickup for businesses, and a nationwide mail-in program."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies recycles light bulbs at our [Ontario center](${href('/california/ontario/')}), 805 East Francis Street, just off the 60 Freeway. We take fluorescent tubes, CFLs, HID lamps, LED, halogen and incandescent bulbs and more, all handled under California's rules for mercury-containing lamps. Residents and businesses can drop off on weekdays with no appointment; businesses can arrange a commercial pickup, and anyone can order a mail-in kit and ship it from home.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Ontario Light Bulb Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ontario Recycling Center](${href('/california/ontario/')}) (San Bernardino County)`,
          rows: [
            {
              label: "Address",
              value: "[805 East Francis Street, Ontario, CA 91761](https://www.google.com/maps/dir/?api=1&destination=805+E+Francis+St%2C+Ontario%2C+CA+91761)",
            },
            { label: "Phone", value: "(909) 923-7252" },
            { label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
            {
              label: "Arrival",
              value: "Take the 60 to Francis Street and use the driveway between Campus and Bon View avenues. Someone on site will show you where to set the bulbs down.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Residential and business drop-off", body: "No appointment needed" },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Contact the team to confirm availability for your site",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid bulb kits, ordered online and dropped off at any FedEx location",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Light Bulbs We Take in Ontario",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: ["Relamping a warehouse or clearing out a garage shelf, the Ontario location accepts:"],
        },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "Straight fluorescent tubes, including plastic-coated and shielded types" },
            { icon: "tube", title: "Green-tipped fluorescent tubes" },
            { icon: "tube", title: "Circular, U-bend and U-shaped fluorescent lamps" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            { icon: "bulb", title: "HID lamps, such as metal halide and high-pressure sodium" },
            { icon: "bulb", title: "LED lamps" },
            { icon: "bulb", title: "UV lamps" },
            { icon: "bulb", title: "Cold cathode lamps, including neon and argon" },
            { icon: "bulb", title: "Flood lamps" },
            { icon: "bulb", title: "Halogen and incandescent bulbs" },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Packing Bulbs for the Trip",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Packing Bulbs for the Trip",
          body: [`See our main [light bulb recycling page](${href('/light-bulbs/')}) for more on accepted lamps.`],
          panel: [
            "Federal Department of Transportation rules govern how bulbs travel, so keep them in a sturdy container. The boxes your replacement bulbs came in work well. Businesses with a scheduled pickup can ask us to deliver packing materials ahead of time.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Light Bulb Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Collect the bulbs",
              body: "Gather them at home or work, and keep tubes whole so they don't break on the way.",
            },
            {
              title: "Pack them right",
              body: "Use a sturdy box, such as the original packaging, to meet DOT shipping rules.",
            },
            {
              title: "Choose a service",
              body: "Drive in on a weekday, book a commercial pickup, or ship a mail-in kit.",
            },
            {
              title: "Separation",
              body: "Each lamp is broken down into glass, aluminum end caps, and phosphor powder and filters that carry mercury.",
            },
            {
              title: "Recovery",
              body: "Mercury material is sent to our Greenwood, IN retort facility, the glass is reused in industrial products, and the end caps go to an aluminum salvage partner.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Light Bulb Recycling Options in Ontario",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for light bulb recycling near you in Ontario, Upland, Montclair or Chino? Bring your boxed bulbs to Francis Street any weekday from 6:00 AM; no appointment needed. Call (909) 923-7252 ahead of a large load or any broken tubes so the team can be ready.",
            `Replacing old fixtures? The same visit can include the [ballasts](${href('/ballasts/')}), plus [batteries](${href('/battery-recycling/')}) and [electronics](${href('/electronic-recycle/')}).`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Offices, warehouses, schools, hospitals, retailers and property managers with regular or larger bulb volumes can request a commercial pickup. This service is for businesses only. We work with sites from Rancho Cucamonga, Fontana and Pomona to Riverside, Corona, Anaheim and Los Angeles, depending on the job.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Site address:** street, city and ZIP code",
            "**Lamp types:** tubes, CFLs, HID or other bulbs",
            "**Quantity:** an estimated count or number of boxes",
            "**Broken bulbs:** let us know if any lamps are damaged",
            "**Frequency:** a one-time relamp or regular pickups",
            "**Packing materials:** whether you'd like containers delivered ahead of time",
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
            `Anyone, in Ontario or elsewhere, can order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), fill it, and drop it at any FedEx location. It works alongside the Ontario location rather than replacing it. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Light Bulb Disposal Guidance in California",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Under California's Universal Waste Rule (California Code of Regulations, Title 22, Division 4.5, Chapter 23), fluorescent tubes, CFLs, HID lamps and other bulbs that contain mercury count as universal waste. They can't go in household trash or the curbside recycling bin and must go to an authorized recycler, a rule that has applied to California households since 2006 ([DTSC](https://dtsc.ca.gov/universalwaste/)).",
            "Our Ontario location gives residents and businesses a local place to take them.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Light Bulb Recycling in Ontario",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Inland Empire drop-off",
              body: "A Francis Street center off the 60, open weekdays from 6:00 AM with no appointment",
            },
            {
              icon: "layers",
              title: "Every common lamp type",
              body: "Fluorescent tubes, CFLs, HID, LED, UV, neon, halogen and incandescent bulbs",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For businesses with larger or recurring bulb volumes",
            },
            {
              icon: "pin",
              title: "Mercury recovery",
              body: "Mercury material is sent to our Greenwood, IN retort facility",
            },
            {
              icon: "mail",
              title: "Nationwide mail-in",
              body: "Prepaid kits for small batches, dropped off at FedEx",
            },
            {
              icon: "clock",
              title: "Since 1993",
              body: "A minority-owned recycler with more than three decades of experience",
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
      { q: "Is light bulb recycling free in Ontario?", a: "Cost depends on the bulb types and quantity. Call (909) 923-7252 or request a quote before you come in." },
      { q: "Can I bring in a broken fluorescent tube?", a: "Call the Ontario location first to confirm how broken tubes should be handled." },
      { q: "Can my household schedule a pickup instead of dropping bulbs off?", a: "No. Pickup is for businesses. Households can use the Ontario drop-off or the mail-in program." },
      { q: "Is there a limit on how many bulbs I can drop off at once?", a: "No per-visit limit is listed. If you have a large quantity, confirm drop-off details before you visit." },
      { q: "Can I recycle LED bulbs from a retrofit too?", a: "Yes. The Ontario center takes LED lamps, so old and new bulbs from the same job can come in together." },
      { q: "Can a business set up regular bulb pickups?", a: "Yes. Ask about a recurring schedule when you request a quote." },
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
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Light Bulb Recycling in Ontario",
    body: ["Finishing a relamp or clearing out a storage room? Bring your bulbs to Francis Street any weekday, order a mail-in kit for a small batch, or send us your site and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Ontario", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ontario reviews are supplied"],
}
