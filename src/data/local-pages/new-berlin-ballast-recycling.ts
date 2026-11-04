import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in New Berlin, WI — /wisconsin/new-berlin/ballast-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Ballast Recycling in Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_BALLAST_RECYCLING: LocalPage = {
  url: href('/wisconsin/new-berlin/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in New Berlin, WI | Recycle Technologies",
    description: "Recycle PCB, non-PCB, electronic, and magnetic ballasts in New Berlin, WI. Drop-off near I-43, business pickup in southeast Wisconsin, and mail-in kits.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Ballast Recycling in New Berlin, WI",
    h1: "Ballast Recycling in New Berlin, WI",
    body: ["Lighting ballast recycling for New Berlin, Milwaukee and Waukesha County, with weekday drop-off on South 171st Street, scheduled pickup for businesses and non-PCB mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Older fluorescent ballasts can carry capacitors with PCBs, and Wisconsin has no facility that incinerates PCB waste, so those parts must travel to an approved site out of state. Recycle Technologies takes ballasts at our [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, close to I-43 and College Avenue. We accept PCB, non-PCB, electronic, and magnetic ballasts, take them apart, route the hazardous pieces to EPA-approved incineration, and reclaim the copper and steel. Bring a box in on a weekday, mail non-PCB units in a kit, or book business pickup after a retrofit.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Ballast Recycling Center",
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
              label: "Finding us",
              value: "Exit I-43 toward College Avenue, then turn onto South 171st Street. Cars use the main lot, and trucks or palletized loads back up to the rear loading area.",
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
              body: "Open to residents and businesses on weekdays. Regular drop-offs don't need an appointment, but call before bringing PCB ballasts.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Scheduled collection for commercial sites within 100 miles.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for non-PCB ballasts." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts We Accept in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Two ballasts from a garage shop light in Muskego or a pallet of them from a school retrofit in Wauwatosa can both come here. We take:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "cpu", title: "Non-PCB ballasts" },
            { icon: "cpu", title: "PCB ballasts (phone 262-798-3040 ahead of any drop-off or shipment)" },
            { icon: "cpu", title: "Electronic ballasts" },
            { icon: "cpu", title: "Magnetic ballasts" },
            { icon: "cpu", title: "Ballasts pulled from fluorescent and HID fixtures" },
            { icon: "cpu", title: "Loose capacitors" },
          ],
        },
        {
          kind: "note",
          body: [
            `Clearing out whole fixtures? Our New Berlin center also accepts the [fluorescent tubes and HID lamps](${href('/light-bulbs/')}) that came out of them, plus mercury thermostats and other mercury devices.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Sorting and Packing Your Ballasts",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Sorting and Packing Your Ballasts",
          panel: [
            "PCB and non-PCB ballasts are handled differently, so keep older or unmarked units in their own box, away from newer ones. Pack ballasts snugly in a sturdy box or bin, because they're heavy and can split a thin carton. If a ballast is leaking or stained with oil, keep it separate and call before you bring it in.",
            `Our main [ballast recycling page](${href('/ballasts/')}) has more on each ballast type.`,
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "What Happens to Ballasts After Drop-Off",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick your option",
              body: "Drop off on South 171st Street, set up a business pickup, or order a non-PCB kit.",
            },
            {
              title: "Tell us what you have",
              body: "Share the ballast types and count, and mention anything that might contain PCBs.",
            },
            {
              title: "Hand them over",
              body: "Unload at our lot, stage boxes for the driver, or ship your kit.",
            },
            {
              title: "Teardown",
              body: "Our team sorts the ballasts and opens them up so PCB and DEHP capacitors can be pulled out.",
            },
            {
              title: "Safe handling and recovery",
              body: "A certified hauler carries the hazardous parts to an EPA-approved incineration facility, the copper and steel are reclaimed, and you get a Certificate of Recycling.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for ballast recycling near you in New Berlin, Brookfield, Hales Corners or Waukesha? Our center on South 171st Street takes ballasts Monday through Friday, 7:30 AM to 4:00 PM, from both residents and businesses. Everyday drop-offs need no appointment. For PCB ballasts or a large load, phone 262-798-3040 before you head over.",
            `You can bring [batteries](${href('/battery-recycling/')}) and [electronics](${href('/electronic-recycle/')}) on the same trip.`,
            `See all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Electrical contractors finishing LED conversions, property managers upgrading hallway fixtures, school districts relamping over the summer, hospitals, warehouses and manufacturers can schedule pickup instead of hauling ballasts in. Commercial pickup runs within 100 miles of New Berlin, covering Milwaukee, Waukesha, West Allis, Greenfield, Menomonee Falls, Oak Creek, Racine, Kenosha and Madison. Loads are logged at collection and strapped down for the drive.",
          ],
          listIntro: "For an accurate quote, send:",
          list: [
            "**Pickup site:** street address and ZIP code",
            "**Ballast mix:** PCB, non-PCB, electronic or magnetic",
            "**Volume:** number of ballasts, boxes or pallets",
            "**Condition:** any leaking or oil-stained units",
            "**Fixture leftovers:** tubes, HID lamps or capacitors to collect too",
            "**Timing:** one retrofit or an ongoing schedule",
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
            `For a few non-PCB ballasts, order a prepaid [ballast recycling kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), fill the container, and ship it with the label provided. Individual customers can mail non-PCB ballasts only; PCB units should come to drop-off or go out with a business pickup. Learn more about our [mail-in recycling program](${href('/mail-in-recycling/')}).`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Wisconsin Ballast Disposal Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The Wisconsin DNR tells anyone with PCB waste to use authorized disposal facilities and licensed transporters, and notes that PCB incineration isn't available anywhere in Wisconsin (Wisconsin DNR). That's why a recycler with a certified hauler matters for older ballasts.",
            "Waukesha County says fluorescent ballasts aren't allowed in regular trash and lists Recycle Technologies in New Berlin as a local option for business lamps and ballasts (Waukesha County). County household hazardous waste sites serve residents, so businesses need a commercial route.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Choose Recycle Technologies for Ballasts in New Berlin",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "A Waukesha County site",
              body: "Drop-off and pickup from our own New Berlin facility, not an out-of-state call center",
            },
            {
              icon: "layers",
              title: "All common ballast types",
              body: "PCB, non-PCB, electronic and magnetic, plus loose capacitors",
            },
            {
              icon: "shield",
              title: "Hazardous parts handled properly",
              body: "PCB and DEHP capacitors travel with a certified hauler to EPA-approved incineration",
            },
            {
              icon: "recycle",
              title: "Metals put back to use",
              body: "Copper and steel from each ballast are reclaimed",
            },
            {
              icon: "truck",
              title: "One stop for a fixture teardown",
              body: "Ballasts, tubes, HID lamps and mercury devices in a single visit or pickup",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            {
              icon: "file",
              title: "Documented results",
              body: "A Certificate of Recycling once processing is done",
            },
            { icon: "clock", title: "Since 1993", body: "Over three decades of recycling experience" },
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
      { q: "What does ballast recycling cost in New Berlin?", a: "It depends on whether the ballasts contain PCBs and how many you have. Call 262-798-3040 or request a quote." },
      { q: "What if a ballast has no label or date on it?", a: "Call us and describe it, including the fixture it came from, and we'll tell you how to bring or ship it." },
      { q: "Can I drop off ballasts and the old tubes in one visit?", a: "Yes. New Berlin accepts both, so everything from the same fixtures can come in together." },
      { q: "Our retrofit also turned up old computers. Can one truck take both?", a: "Yes. A scheduled Wisconsin business collection can cover electronics, batteries, lamps, and documents along with ballasts." },
      { q: "Is New Berlin your only Wisconsin location for ballasts?", a: "Yes. New Berlin is our Wisconsin facility, and our Minnesota center is in Blaine. See all drop-off sites." },
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
    heading: "Book Ballast Recycling in New Berlin, WI",
    body: ["Bring ballasts to South 171st Street on a weekday, mail a few non-PCB units in a kit, or send us your site and ballast count for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Leaking ballasts: the doc's [Confirm leaking-ballast handling at New Berlin] note left out (the call-first line is kept)"],
}
