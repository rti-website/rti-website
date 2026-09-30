import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Light Bulb Recycling in Blaine, Minnesota — /minnesota-recycling/light-bulb-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7124:8795, phone 7124:9224 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/minnesota-recycling/light-bulb-recycling/'),
  figma: { board: "7124:8795", phone: "7124:9224" },
  seo: {
    title: "Light Bulb Recycling in Blaine, Minnesota | Recycle Technologies",
    description: "Drop off, schedule a commercial pickup or mail in fluorescent tubes, CFLs, HID and other lamps at our Blaine, Minnesota facility. Processed in-house, not through a broker, since 1993.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Light Bulb Recycling in Blaine, Minnesota",
    h1: "Light Bulb Recycling in Blaine, Minnesota",
    body: [
      "Fluorescent bulbs, CFLs, and other lamps contain small amounts of mercury and can't legally go in the trash in Minnesota. Recycle Technologies handles light bulb recycling at its Blaine facility, giving residents and businesses in the area a documented way to get spent bulbs recycled. Individuals can drop bulbs off at the Blaine location or use the nationwide Mail-In Program, and businesses can schedule commercial pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7124:8859",
      heading: "Light Bulb Recycling Services in Blaine",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a wide range of bulb and lamp types at its Blaine facility. Bulbs can enter the process through a drop-off at the Blaine facility, the Mail-In Program, or a scheduled commercial pickup for businesses.",
          ],
        },
        {
          kind: "card",
          title: "Blaine Is a Local Recycling Facility",
          body: [
            "Recycle Technologies handles light bulb recycling at its Blaine, Minnesota facility. Individuals can bring bulbs to the facility, while businesses can schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7124:8871",
      heading: "Blaine Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "1525 99th Ln NE, Blaine, Minnesota 55449" },
            { label: "Phone", value: "+1-763-559-5130" },
            {
              label: "Drop-Off",
              value: "Individuals can bring light bulbs to the Blaine location. A processing fee applies to drop-off materials.",
            },
            {
              label: "Commercial Pickup",
              value: "Available for businesses; scheduled pickup is exclusive to commercial customers.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.",
            },
          ],
        },
      ],
    },
    {
      figma: "7124:8890",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a wide range of bulb and lamp types at its Blaine facility."],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Fluorescent Tubes",
                body: ["Fluorescent tubes, plastic-coated and shielded tubes."],
              },
              { title: "Compact Fluorescent Lamps", body: ["Compact fluorescent lamps (CFLs)."] },
              { title: "Circular and U-Shaped Lamps", body: ["Circular lamps and U-bend/U-shaped lamps."] },
            ],
            [
              {
                title: "UV, Neon & Cold Cathode Lamps",
                body: ["Ultraviolet (UV) lamps, neon, argon, and other cold cathode lamps."],
              },
              {
                title: "High-Intensity Discharge Lamps",
                body: ["High-intensity discharge (HID) lamps, including metal halide and high-pressure sodium."],
              },
              {
                title: "Other Bulbs and Lamps",
                body: [
                  "Green-tipped bulbs, flood lamps, incandescent bulbs, and halogen bulbs.",
                  "If you're not sure whether a specific lamp qualifies, call the Blaine facility before scheduling a pickup or mail-in shipment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:8917",
      heading: "Light Bulb Recycling for Blaine Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses, property managers, and facilities in the Blaine area can schedule a commercial pickup for light bulbs. This is a business service, not a residential option.",
            "Recycle Technologies can also deliver packing materials ahead of the pickup date.",
          ],
        },
      ],
    },
    {
      figma: "7124:8923",
      heading: "Light Bulb Recycling for Blaine Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring light bulbs to the Blaine location. A processing fee applies to drop-off materials.",
            "If a trip to Blaine isn't convenient, the nationwide Mail-In Program lets you ship bulbs from anywhere in the country using the same packaging guidelines.",
          ],
        },
      ],
    },
    {
      figma: "7124:8929",
      heading: "How Light Bulb Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Drop bulbs off at the Blaine facility, use the Mail-In Program, or, for businesses, schedule a commercial pickup.",
                ],
              },
              {
                title: "Packaging",
                body: [
                  "Because DOT regulations govern how bulbs are shipped, pack bulbs in a sturdy fiber bin or the original box they came in. Recycle Technologies can deliver packing materials ahead of a scheduled pickup.",
                ],
              },
              {
                title: "Processing",
                body: [
                  "Bulbs are processed directly at the Minnesota facility rather than routed through an outside broker.",
                ],
              },
            ],
            [
              {
                title: "Separation",
                body: [
                  "Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated from each other during processing.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Phosphor powder and filters go to a distillation company, glass is directed to industrial uses, and aluminum end caps go to an aluminum salvage partner.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:8951",
      heading: "Why Recycle Technologies for Light Bulb Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "factory",
                title: "In-House Processing",
                body: ["Bulbs are processed at the Blaine facility rather than outsourced to a broker."],
              },
              {
                icon: "leaf",
                title: "Material Recovery",
                body: [
                  "Materials are separated and directed to distillation, industrial glass use, and aluminum salvage rather than a landfill.",
                ],
              },
              {
                icon: "mail",
                title: "Local and Nationwide Recycling Options",
                body: ["Local drop-off, commercial pickup, and nationwide Mail-In Program are all available."],
              },
            ],
            [
              {
                icon: "check",
                title: "Wide Range of Accepted Lamp Types",
                body: [
                  "Recycle Technologies accepts a wide range of lamp types, from fluorescent tubes to incandescent and halogen bulbs.",
                ],
              },
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: ["Recycle Technologies has an established recycling process in place since 1993."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:8973",
      heading: "Local Blaine Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Minnesota law (Minn. Stat. § 115A.932) bans disposing of fluorescent and high-intensity discharge lamps in the trash and requires them to be recycled, covering fluorescent lights of every shape and size, including CFLs. Unlike some states, Minnesota does not allow crushing fluorescent bulbs before recycling.",
            "The City of Blaine also runs a monthly community Recycling Saturday event at this same address, on the third Saturday of the month from 8 AM to noon, where residents can drop off lamps for a small per-item fee. This is a separate city-sponsored event from Recycle Technologies’ regular weekday drop-off hours.",
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Am I actually required to recycle fluorescent bulbs instead of throwing them out in Minnesota?",
        a: "Yes. Minnesota law bans disposing of fluorescent and HID lamps, including CFLs, in the trash.",
      },
      {
        q: "Can I crush my own fluorescent bulbs before bringing them in?",
        a: "No. Minnesota does not allow crushing fluorescent bulbs before recycling. Pack bulbs whole in a sturdy fiber bin or the original box they came in.",
      },
      {
        q: "Is there a fee to drop off light bulbs at the Blaine facility?",
        a: "Yes. A processing fee applies to drop-off materials at the Blaine facility. Call (763) 559-5130 to confirm the current fee before you drop off.",
      },
      {
        q: "Can my business schedule a pickup for light bulbs, or is that only for drop-off?",
        a: "Yes. Businesses, property managers, and facilities in the Blaine area can schedule a commercial pickup for light bulbs, and Recycle Technologies can deliver packing materials ahead of the pickup date. Scheduled pickup is exclusive to commercial customers.",
      },
      {
        q: "What if I don't live near Blaine?",
        a: "The nationwide Mail-In Program lets you ship bulbs from anywhere in the country. Because DOT regulations govern how bulbs are shipped, pack them in a sturdy fiber bin or the original box they came in.",
      },
    ],
  },
  after: [
    {
      figma: "7124:9002",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Ballast Recycling", href: href('/minnesota-recycling/ballast-recycling/') },
            { label: "Battery Recycling", href: href('/minnesota-recycling/battery-recycling/') },
            { label: "Electronic Recycling", href: href('/minnesota-recycling/electronic-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Light Bulb Recycling in Blaine, Minnesota",
    body: [
      "Drop off bulbs at the Blaine facility during business hours, schedule a commercial pickup if you’re a business, or start a shipment through the Mail-In Program.",
    ],
    line: "Schedule Light Bulb Recycling in Blaine, Minnesota | Call (763) 559-5130",
    primary: QUOTE,
    secondary: tel("Call: (763) 559-5130", "+17635595130"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
