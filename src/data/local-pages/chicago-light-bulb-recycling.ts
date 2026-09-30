import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Light Bulb Recycling in Chicago, Illinois — /light-bulb-recycling-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7127:12179, phone 7127:12630 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/light-bulb-recycling-chicago/'),
  figma: { board: "7127:12179", phone: "7127:12630" },
  seo: {
    title: "Light Bulb Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Commercial light bulb and lamp recycling for Chicago businesses by scheduled pickup, with mail-in kits for residents. Fluorescent, CFL, HID and more, processed at our R2v3 certified facilities.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Light Bulb Recycling in Chicago, Illinois",
    h1: "Light Bulb Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides light bulb recycling services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, with collected materials transported to the company's certified facilities for processing.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7127:12244",
      heading: "Light Bulb Recycling Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has recycled fluorescent lamps and other light bulbs since 1993. Materials are processed at its own R2v3-certified Minnesota and Wisconsin facilities rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
            "Businesses in Chicago can arrange scheduled commercial pickup for fluorescent lamps and other lighting materials. Collected bulbs are transported to Recycle Technologies' facilities in Minnesota and Wisconsin for processing.",
          ],
        },
      ],
    },
    {
      figma: "7127:12258",
      heading: "Chicago Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Location", value: "Chicago, Illinois" },
            { label: "Phone", value: "(800) 969-5166 | (800) 305-3040" },
            { label: "Service Area", value: "Chicago and surrounding areas" },
            { label: "Commercial customers", value: "Scheduled pickup" },
            { label: "Processing", value: "Minnesota and Wisconsin facilities" },
          ],
        },
      ],
    },
    {
      figma: "7127:12277",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a broad range of light bulbs and lighting equipment."],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Fluorescent Bulbs",
                body: [
                  "•  Tubes",
                  "•  Plastic-coated and shielded tubes",
                  "•  Compact fluorescent lamps (CFLs)",
                  "•  Green-tipped bulbs",
                  "•  Circular lamps",
                  "•  U-bend or U-shaped lamps",
                ],
              },
              {
                title: "Other Accepted Lighting",
                body: [
                  "•  Ultraviolet (UV) lamps",
                  "•  Neon lamps",
                  "•  Argon lamps",
                  "•  Other cold cathode lamps",
                  "•  High-intensity discharge (HID) lamps",
                  "•  Metal halide lamps",
                  "•  High-pressure sodium lamps",
                  "•  Flood lamps",
                  "•  Incandescent bulbs",
                  "•  Halogen bulbs",
                  "Not sure whether a specific lamp type qualifies? Contact Recycle Technologies directly to confirm before scheduling a pickup.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7127:12305",
      heading: "Light Bulb Recycling for Chicago Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange light bulb recycling for office, facility, and retrofit lighting needs.",
            "This includes:",
          ],
        },
        {
          kind: "bullets",
          rows: [
            [
              "Retired fluorescent tubes, CFLs, and HID lamps from lighting upgrades",
              "Spent lighting from office and facility operations",
            ],
            ["Larger volumes of spent lighting from facility-wide relamping projects"],
          ],
        },
        {
          kind: "text",
          body: [
            "Illinois law restricts businesses from disposing of mercury-containing bulbs with regular trash, making a documented recycling partner relevant for both compliance and sustainability.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7127:12330",
      heading: "Light Bulb Recycling for Chicago Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents can use the mail-in program by ordering a prepaid light bulb recycling kit, packing the bulbs according to the kit instructions, and shipping them to Recycle Technologies for certified processing. Light Bulb Recycling Kits.",
          ],
        },
      ],
    },
    {
      figma: "7127:12335",
      heading: "How Light Bulb Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses schedule a commercial pickup for their spent light bulbs and lighting materials. Recycle Technologies coordinates collection and transportation to its processing facilities.",
                ],
              },
              {
                title: "Packaging and Processing",
                body: [
                  "Because the Department of Transportation regulates how bulbs are packaged for shipping, bulbs are packed using Recycle Technologies' fiber bins or original bulb boxes before being transported to the company's Minnesota and Wisconsin facilities.",
                ],
              },
            ],
            [
              {
                title: "Recycling and Material Recovery",
                body: [
                  "Mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated so each material can be recycled properly.",
                  "Phosphor powder and filters are shipped to a distillation company, glass is put toward further use in industrial products, and aluminum caps are sent to an aluminum salvage partner.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7127:12354",
      heading: "Why Recycle Technologies for Light Bulb Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: ["Recycle Technologies has operated since 1993."],
              },
              {
                icon: "truck",
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses can arrange scheduled commercial pickup for their spent light bulbs and lighting materials.",
                ],
              },
            ],
            [
              {
                icon: "factory",
                title: "In-House Processing",
                body: [
                  "Bulbs are processed directly at Recycle Technologies' own facilities in Minnesota and Wisconsin rather than through an outside broker.",
                ],
              },
              {
                icon: "users",
                title: "Minority-Owned",
                body: [
                  "Recycle Technologies is the only minority-owned document destruction and recycling company in the Midwest region.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7127:12372",
      heading: "Local Chicago Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Illinois state law generally restricts businesses from disposing of mercury-containing bulbs in regular trash.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of light bulbs, as specific requirements can change.",
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
        q: "What types of light bulbs does Recycle Technologies recycle?",
        a: "Fluorescent tubes, CFLs, UV, neon, argon, HID, halogen, and incandescent bulbs.",
      },
      {
        q: "Can my business schedule a pickup for light bulb recycling?",
        a: "Yes. Chicago businesses can request a quote or schedule a commercial pickup for spent light bulbs and other accepted lighting materials, and Recycle Technologies coordinates collection and transportation to its processing facilities.",
      },
      {
        q: "Do the bulbs get sent to a landfill?",
        a: "Collected bulbs are processed at Recycle Technologies' Minnesota and Wisconsin facilities, where mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated so each material can be recycled properly. Phosphor powder and filters go to a distillation company, glass is put toward further use in industrial products, and aluminum caps go to an aluminum salvage partner.",
      },
      {
        q: "Will I receive documentation that my bulbs were recycled?",
        a: "Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.",
      },
      {
        q: "How far in advance do Chicago businesses need to schedule a pickup?",
        a: "Chicago businesses can request a quote or schedule a commercial pickup to get started. Call Recycle Technologies at (800) 969-5166 to confirm current pickup options and scheduling for the Chicago area.",
      },
    ],
  },
  after: [
    {
      figma: "7127:12401",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronics Recycling", href: href('/electronic-recycling-chicago/') },
            { label: "Television Recycling", href: href('/tv-recycling-chicago/') },
            { label: "Battery Recycling", href: href('/battery-recycling-chicago/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-chicago/') },
            { label: "All Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Light Bulb Recycling in Chicago",
    body: [
      "Chicago businesses can request a quote or schedule a commercial pickup for spent light bulbs and other accepted lighting materials.",
      "Contact Recycle Technologies to confirm current pickup options for the Chicago area.",
    ],
    primary: QUOTE,
    secondary: tel("Call: 800-969-5166", "+18009695166"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
