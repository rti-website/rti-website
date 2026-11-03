import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Ocala, FL — /florida/ocala/light-bulb-recycling/
 * Management sheet "all plan rti 1", Florida tab; copy from the content
 * team's Google Doc "Ocala Light Bulb Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const OCALA_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/florida/ocala/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in Ocala, FL | Recycle Technologies",
    description: "Light bulb recycling in Ocala, FL: drop off fluorescent tubes, CFLs, HID and LED bulbs at our partner center by appointment, book business pickup, or mail a kit.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Ocala, FL", "Marion County, FL", "Florida"] },
  hero: {
    crumb: "Light Bulb Recycling in Ocala, FL",
    h1: "Light Bulb Recycling in Ocala, FL",
    body: ["Light bulb recycling for Ocala and Marion County, with appointment drop-off at our partner center on SW 16th Lane, commercial pickup for businesses, and prepaid mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    "Many old bulbs contain mercury, so they don't belong in the trash. Recycle Technologies handles light bulb recycling in Ocala through a partner recycling center at 1007 SW 16th Lane, near the US-27, US-301 and US-441 corridor. It accepts all lamps, from fluorescent tubes and CFLs to HID, LED, halogen, and incandescent bulbs. Homeowners and businesses can drop off on weekdays by appointment; businesses can arrange pickup, and anyone can ship a small batch in a mail-in kit.",
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Ocala Partner Location Details",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ocala Recycling Center](${href('/florida/ocala/')}) (partner location, Marion County)`,
          rows: [
            {
              label: "Address",
              value: "[1007 SW 16th Lane, Ocala, FL 34471](https://www.google.com/maps/dir/?api=1&destination=1007+SW+16th+Lane%2C+Ocala%2C+FL+34471)",
            },
            { label: "Phone", value: "(352) 509-3019" },
            { label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
            { label: "Call ahead", value: "An appointment is needed." },
            { label: "Landmark", value: "By the 17th Street bridge, next door to Fakhoury Chiropractic" },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Residential and business drop-off", body: "By appointment" },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Contact the team to confirm availability for your site",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid bulb kits, ordered online and dropped off at FedEx",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Light Bulbs We Take in Ocala",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether it's one burned-out CFL or a truck full of tubes from a store relamp, the Ocala partner center accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "Straight fluorescent tubes, plastic-coated and shielded types included" },
            { icon: "tube", title: "Green-tipped, circular and U-bend fluorescent lamps" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            { icon: "bulb", title: "HID lamps such as metal halide and HPS (high-pressure sodium)" },
            { icon: "bulb", title: "LED lamps" },
            { icon: "bulb", title: "UV lamps and cold cathode lamps, such as neon and argon" },
            { icon: "bulb", title: "Flood, halogen and incandescent bulbs" },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Keeping Bulbs in One Piece",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Keeping Bulbs in One Piece",
          body: [`See our main [light bulb recycling page](${href('/light-bulbs/')}) for more on accepted lamps.`],
          panel: [
            "Shipping rules from the federal Department of Transportation apply to bulbs, so pack them in a sturdy container. The original boxes from replacement bulbs are a good fit. Don't bag loose tubes or bundle them together. Businesses with a scheduled pickup can ask for packing materials in advance.",
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
              title: "Book your visit",
              body: "Call (352) 509-3019 for a drop-off appointment, request commercial pickup, or order a mail-in kit.",
            },
            {
              title: "Pack carefully",
              body: "Use sturdy boxes and keep broken lamps separate, then mention them when you call.",
            },
            {
              title: "Hand them off",
              body: "Bring bulbs to SW 16th Lane at your scheduled time, have them ready for pickup, or ship your kit.",
            },
            {
              title: "Separation",
              body: "Lamps are broken down into glass, aluminum end caps, and phosphor powder and filters that hold mercury.",
            },
            {
              title: "Recovery",
              body: "Mercury material is sent to our Greenwood, IN retort facility, the glass is reused in industrial products, and end caps go to aluminum salvage.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Light Bulb Recycling Options in Ocala, FL",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for light bulb recycling near you in Ocala, Belleview, Silver Springs or Dunnellon? Call (352) 509-3019 to book a time, then bring your boxed bulbs to 1007 SW 16th Lane. The partner center opens at 6:00 AM on weekdays, and drop-off is open to homeowners and businesses.",
            `The same appointment can cover [batteries](${href('/battery-recycling/')}), [ballasts](${href('/ballasts/')}) (PCB ballasts included), [electronics](${href('/electronic-recycle/')}) and mercury devices.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Offices, property managers, warehouses, schools and retailers that go through bulbs regularly can arrange pickup instead of hauling them in. Pickup is a business service, available within about 100 miles of Ocala, including Gainesville, The Villages, Leesburg, Inverness and Lady Lake.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Site address:** street, city and ZIP code",
            "**Lamp types:** tubes, CFLs, HID or other bulbs",
            "**Quantity:** an estimated count, box total or pallets",
            "**Broken lamps:** any cracked or shattered bulbs",
            "**Frequency:** a one-time relamp or recurring pickups",
            "**Packing materials:** whether you'd like containers delivered first",
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
            `If a trip to SW 16th Lane isn't practical, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it and drop it at FedEx. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Local Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Florida follows the federal universal waste rule for mercury-containing lamps, along with its own stricter rules in Chapter 62-737 of the Florida Administrative Code, so fluorescent and HID lamps need to go to a recycler rather than the trash.",
            "Marion County's recycling and household hazardous waste programs are set up for county residents, and businesses that don't pay the county's solid waste assessment can't use the recycling centers (Marion County). The Ocala partner center gives businesses and residents another local option, with commercial pickup for larger volumes.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Light Bulb Recycling in Ocala",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Local partner center",
              body: "An Ocala drop-off on SW 16th Lane, open to residents and businesses by appointment",
            },
            {
              icon: "layers",
              title: "All lamp types",
              body: "Fluorescent tubes, CFLs, HID, HPS, LED, UV, halogen and more",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For businesses within about 100 miles with recurring bulb waste",
            },
            {
              icon: "pin",
              title: "Mercury recovery",
              body: "Mercury material is sent to our Greenwood, IN retort facility",
            },
            {
              icon: "mail",
              title: "Mail-in option",
              body: "Prepaid kits for small batches or anyone farther away",
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
      { q: "Is light bulb recycling free in Ocala?", a: "Cost depends on the bulb types and quantity. Call (352) 509-3019 or request a quote before your visit." },
      { q: "Can I use the mail-in program instead of the county's programs?", a: "Yes. Mail-in kits are separate from Marion County's resident programs and work for households and small business quantities." },
      { q: "Can I bring LED bulbs from a retrofit along with the old tubes?", a: "Yes. LED lamps are accepted, so old and new bulbs from the same project can come in together." },
      { q: "Do you pick up bulbs from businesses in Citra or Ocklawaha?", a: "Yes. Both are inside the pickup area around Ocala. Confirm your address when you book." },
      { q: "Can I get proof that my bulbs were recycled?", a: "Ask about a certificate of recycling when you schedule." },
      { q: "What should I do with a broken fluorescent tube?", a: "Seal the pieces in a sturdy container and call the partner center first to confirm how to bring them in." },
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
    heading: "Get Started With Light Bulb Recycling in Ocala, FL",
    body: ["Book a drop-off at the Ocala partner center, order a mail-in kit for a small batch, or send us your site and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Ocala", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ocala reviews are supplied", "Phone: this doc gives (352) 509-3019 throughout, the other Ocala docs 813-534-5735 (kept as written", "confirm which is right)"],
}
