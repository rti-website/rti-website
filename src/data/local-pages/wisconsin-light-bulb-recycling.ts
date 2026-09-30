import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Light Bulb Recycling in New Berlin, Wisconsin — /wisconsin-recycling/light-bulb-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7119:5745, phone 7119:6176 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/wisconsin-recycling/light-bulb-recycling/'),
  figma: { board: "7119:5745", phone: "7119:6176" },
  seo: {
    title: "Light Bulb Recycling in New Berlin, Wisconsin | Recycle Technologies",
    description: "Drop off, schedule a commercial pickup or mail in fluorescent tubes, CFLs, HID and other lamps at our New Berlin, Wisconsin facility. Processed in-house, not through a broker, since 1993.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Light Bulb Recycling in New Berlin, Wisconsin",
    h1: "Light Bulb Recycling in New Berlin, Wisconsin",
    body: [
      "Used light bulbs, especially fluorescent and CFL types, contain small amounts of mercury and can't go in the trash or curbside recycling bin in Wisconsin. Recycle Technologies handles light bulb recycling at its New Berlin facility, giving households, businesses, and property managers in the area a documented way to get spent bulbs processed. Individuals can drop bulbs off at the New Berlin location or use the nationwide Mail-In Program, while businesses can arrange commercial pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7119:5809",
      heading: "Light Bulb Recycling Services in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a wide range of bulb and lamp types at its New Berlin facility. Bulbs can enter the process through a drop-off at the New Berlin facility, the Mail-In Program, or a scheduled commercial pickup for businesses.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is a Local Recycling Facility",
          body: [
            "Recycle Technologies handles light bulb recycling at its New Berlin, Wisconsin facility. Individuals can bring bulbs to the facility during business hours, while businesses can schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7119:5821",
      heading: "New Berlin Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "2815 South 171st Street, New Berlin, WI 53151" },
            { label: "Phone", value: "+1-262-798-3040" },
            { label: "Hours", value: "Monday through Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Drop-Off",
              value: "Individuals can bring light bulbs to the New Berlin location during business hours.",
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
      figma: "7119:5843",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a wide range of bulb and lamp types at its New Berlin facility."],
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
                  "If you're not sure whether a specific lamp qualifies, call the New Berlin facility before scheduling a pickup or mail-in shipment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7119:5870",
      heading: "Light Bulb Recycling for New Berlin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses, property managers, and facilities in the New Berlin area can schedule a commercial pickup for light bulbs. This is a business service, not a residential option.",
            "Recycle Technologies can also deliver packing materials ahead of the pickup date.",
          ],
        },
      ],
    },
    {
      figma: "7119:5876",
      heading: "Light Bulb Recycling for New Berlin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring light bulbs to the New Berlin location during business hours.",
            "If a trip to New Berlin isn't convenient, the nationwide Mail-In Program lets you ship bulbs from anywhere in the country using the same packaging guidelines.",
          ],
        },
      ],
    },
    {
      figma: "7119:5882",
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
                  "Drop bulbs off at the New Berlin facility, use the Mail-In Program, or, for businesses, schedule a commercial pickup.",
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
                  "Bulbs are processed directly at the Wisconsin facility rather than routed through an outside broker.",
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
      figma: "7119:5904",
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
                body: ["Bulbs are processed at the New Berlin facility rather than outsourced to a broker."],
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
      figma: "7119:5926",
      heading: "Local New Berlin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Wisconsin law prohibits sending mercury-containing lamps, including fluorescent, CFL, mercury vapor, metal halide, and high-pressure sodium bulbs, to a landfill. These must be recycled or managed as hazardous waste. Businesses and institutions that recycle these lamps fall under Wisconsin's Universal Waste Rule (NR 673), which requires bulbs to be kept in closed, labeled containers and removed for recycling within one year.",
            "New Berlin's municipal recycling center does not accept light bulbs or other electronics, so residents and businesses need a private recycler like Recycle Technologies or the Mail-In Program.",
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
        q: "Can I put light bulbs in my curbside recycling bin in New Berlin?",
        a: "No. Light bulbs, especially fluorescent and CFL types, aren't accepted in curbside recycling and need to go to a facility like Recycle Technologies.",
      },
      {
        q: "Is it actually illegal to throw fluorescent bulbs in the trash in Wisconsin?",
        a: "Yes. Wisconsin law prohibits sending mercury-containing lamps, including fluorescent, CFL, mercury vapor, metal halide, and high-pressure sodium bulbs, to a landfill. They must be recycled or managed as hazardous waste.",
      },
      {
        q: "What should I do if a CFL or fluorescent bulb breaks before I can drop it off?",
        a: "Fluorescent and CFL bulbs contain small amounts of mercury, so call the New Berlin facility at (262) 798-3040 for guidance before you bring in or ship a broken bulb.",
      },
      {
        q: "Can my business schedule a pickup for light bulbs, or is that only for drop-off?",
        a: "Yes. Businesses, property managers, and facilities in the New Berlin area can schedule a commercial pickup for light bulbs, and Recycle Technologies can deliver packing materials ahead of the pickup date. Scheduled pickup is exclusive to commercial customers.",
      },
      {
        q: "What if I don't live near New Berlin?",
        a: "The nationwide Mail-In Program lets you ship bulbs from anywhere in the country. Because DOT regulations govern how bulbs are shipped, pack them in a sturdy fiber bin or the original box they came in.",
      },
    ],
  },
  after: [
    {
      figma: "7119:5955",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Ballast Recycling", href: href('/wisconsin-recycling/ballast-recycling/') },
            { label: "Battery Recycling", href: href('/wisconsin-recycling/battery-recycling/') },
            { label: "Electronic Recycling", href: href('/wisconsin-recycling/electronic-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Light Bulb Recycling in New Berlin, Wisconsin",
    body: [
      "Drop off bulbs at the New Berlin facility during business hours, schedule a commercial pickup if you're a business, or start a shipment through the Mail-In Program.",
      "Get a Quote | Schedule Light Bulb Recycling in New Berlin, Wisconsin | Call (262) 798-3040",
    ],
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
