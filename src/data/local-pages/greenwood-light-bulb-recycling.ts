import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Greenwood, IN — /indiana/greenwood/light-bulb-recycling/
 * Management sheet "all plan rti 1", Indiana tab; copy from the content
 * team's Google Doc "Greenwood Light Bulb Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const GREENWOOD_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/indiana/greenwood/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in Greenwood, IN | Recycle Technologies",
    description: "Recycle fluorescent tubes, CFLs, HID and LED bulbs in Greenwood, IN, with mercury recovered on site. Weekday drop-off, business pickup and mail-in kits.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Greenwood, IN", "Johnson County, IN", "Indiana"] },
  hero: {
    crumb: "Light Bulb Recycling in Greenwood, IN",
    h1: "Light Bulb Recycling in Greenwood, IN",
    body: ["Light bulb recycling for Greenwood, Johnson County and south Indianapolis, with weekday drop-off on Park 800 Drive, commercial pickup for businesses, and prepaid mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies recycles light bulbs at our [Greenwood center](${href('/indiana/greenwood/')}), 498 Park 800 Drive, near US-31 and I-65. Greenwood is our Indiana bulb processing and mercury retort facility, so the mercury in fluorescent and HID lamps is recovered right here. We take fluorescent tubes, CFLs, HID, LED, halogen, incandescent, and specialty bulbs. Homeowners and businesses can drop off on weekdays; businesses can arrange pickup, and anyone can ship a small batch in a mail-in kit.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Greenwood Light Bulb Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Greenwood Recycling Center](${href('/indiana/greenwood/')}) (Johnson County)`,
          rows: [
            {
              label: "Address",
              value: "[498 Park 800 Drive, Greenwood, IN 46143](https://www.google.com/maps/dir/?api=1&destination=498+Park+800+Drive%2C+Greenwood%2C+IN+46143)",
            },
            { label: "Phone", value: "(317) 888-3889" },
            { label: "Hours", value: "Monday to Friday, 7:00 AM to 2:00 PM" },
            { label: "Toll-free", value: "(866) 375-7340" },
            {
              label: "Arrival",
              value: "Pull into the Park 800 Drive lot from US-31 or I-65, and staff will show you where bulbs go.",
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
              body: "Open to everyone. A scheduled appointment is preferred.",
            },
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
      heading: "Light Bulbs We Take in Greenwood",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "From a few burned-out CFLs at home to pallets of tubes from a school relamp, the Greenwood center accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "Straight fluorescent tubes, including plastic-coated and shielded types" },
            { icon: "tube", title: "Green-tipped, circular and U-bend fluorescent lamps" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            { icon: "bulb", title: "HID lamps, such as metal halide and high-pressure sodium (HPS)" },
            { icon: "bulb", title: "LED lamps" },
            { icon: "bulb", title: "UV lamps and cold cathode lamps, including neon and argon" },
            { icon: "bulb", title: "Flood, halogen and incandescent bulbs" },
            { icon: "checkCircle", title: "Light fixtures" },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Packing Bulbs for Drop-Off or Pickup",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Packing Bulbs for Drop-Off or Pickup",
          body: [`See our main [light bulb recycling page](${href('/light-bulbs/')}) for more on accepted lamps.`],
          panel: [
            "Bulb shipments fall under federal Department of Transportation rules, so pack bulbs in a sturdy container, such as the boxes your replacement bulbs arrived in. For a scheduled business pickup, we can bring packing materials ahead of time.",
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
              title: "Gather your bulbs",
              body: "Keep tubes whole and set aside any broken lamps so you can mention them when you call.",
            },
            { title: "Pack them safely", body: "Box bulbs in sturdy containers to meet DOT shipping rules." },
            {
              title: "Pick a service",
              body: "Drive to Park 800 Drive, book a commercial pickup, or mail a kit.",
            },
            {
              title: "Separation",
              body: "Lamps are broken down into glass, aluminum end caps, and mercury-bearing phosphor powder and filters.",
            },
            {
              title: "Mercury recovery on site",
              body: "Mercury material is handled at our Greenwood retort, the glass goes on to industrial uses, and end caps go to aluminum salvage.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Light Bulb Recycling Options in Greenwood, IN",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for light bulb recycling near you in Greenwood, Center Grove, Whiteland, or Southport? Bring boxed bulbs to Park 800 Drive on a weekday between 7:00 AM and 2:00 PM. Drop-off is open to homeowners and businesses, and scheduling a time ahead is preferred, especially for a large relamp or any broken tubes.",
            `The same trip can include [ballasts](${href('/ballasts/')}), [batteries](${href('/battery-recycling/')}), [electronics](${href('/electronic-recycle/')}) and mercury devices.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Property managers, schools, hospitals, retailers and electrical contractors that replace lamps on a schedule can set up pickup instead of hauling bulbs in. Pickup is a business service, and we serve sites within about 100 miles of Greenwood, from Indianapolis and Franklin to Columbus, Bloomington and Muncie.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Site address:** street, city and ZIP code",
            "**Lamp types:** tubes, CFLs, HID or other bulbs",
            "**Quantity:** an estimated count, box total or pallets",
            "**Broken lamps:** whether any are cracked or shattered",
            "**Frequency:** a one-time relamp or recurring pickups",
            "**Packing materials:** whether you'd like containers dropped off first",
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
            `If a trip to Greenwood isn't practical, or you only have a small batch, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it, and drop it at FedEx. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order.`,
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
            "Indiana handles fluorescent and other mercury-containing lamps from businesses under its universal waste rules, so they belong with an authorized recycler, not in a dumpster ([IDEM](https://www.in.gov/idem/)).",
            "Greenwood is in Johnson County, where the Johnson County Recycling District in Franklin runs recycling and household hazardous waste programs for county residents. Its Tox Box, however, doesn't accept light bulbs, and county programs don't take business waste. Our Greenwood center gives homeowners and businesses a direct place to bring bulbs on any weekday.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Light Bulb Recycling in Greenwood",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Mercury recovered on site",
              body: "Lamps are processed in Greenwood, and our retort here pulls out the mercury",
            },
            {
              icon: "pin",
              title: "Local drop-off",
              body: "A Park 800 Drive center off US-31 and I-65, open to everyone on weekdays",
            },
            {
              icon: "layers",
              title: "Every common lamp type",
              body: "Fluorescent tubes, CFLs, HID, HPS, LED, UV, halogen and more, plus light fixtures",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For businesses within about 100 miles with steady bulb turnover",
            },
            {
              icon: "mail",
              title: "Mail-in option",
              body: "Prepaid kits for small batches or sites farther away",
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
      { q: "Is light bulb recycling free in Greenwood?", a: "Cost depends on the bulb types and quantity. Call (317) 888-3889 or request a quote before you visit." },
      { q: "Can a small retail store use mail-in recycling instead of pickup?", a: "Yes. Mail-in kits suit lower volumes, while commercial pickup fits locations that replace bulbs regularly." },
      { q: "Is the Johnson County Recycling District the same as Recycle Technologies?", a: "No. The district is a separate county resource. Recycle Technologies runs its own Greenwood center and mail-in program." },
      { q: "Can I bring LED bulbs from a retrofit along with the old tubes?", a: "Yes. LED lamps are accepted, so old and new bulbs from the same job can come in together." },
      { q: "Do you pick up bulbs in Hamilton or Hendricks County?", a: "Yes. Both sit inside our pickup area around Greenwood. Confirm your address when you book." },
      { q: "Can I get proof that my bulbs were recycled?", a: "Ask about a certificate of recycling when you book your drop-off or pickup." },
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
    heading: "Get Started With Light Bulb Recycling in Greenwood, IN",
    body: ["Bring your bulbs to Park 800 Drive on any weekday, order a mail-in kit for a small batch, or send us your site and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Greenwood", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Greenwood reviews are supplied"],
}
