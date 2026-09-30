import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Ballast Recycling in Chicago, Illinois — /ballast-recycling-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7126:11051, phone 7126:11501 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_BALLAST_RECYCLING: LocalPage = {
  url: href('/ballast-recycling-chicago/'),
  figma: { board: "7126:11051", phone: "7126:11501" },
  seo: {
    title: "Ballast Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides ballast recycling services to businesses in the Chicago area.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Ballast Recycling in Chicago, Illinois",
    h1: "Ballast Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides ballast recycling services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, with materials transported to the company's certified facilities for processing.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7126:11116",
      heading: "Ballast Recycling Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has recycled ballasts from its own R2v3-certified Minnesota and Wisconsin facilities since 1993.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
            "Chicago businesses can arrange scheduled commercial pickup for PCB, non-PCB, electronic, and magnetic ballasts from lighting upgrades, retrofits, and facility operations.",
            "Collected ballasts are transported to Recycle Technologies' processing facilities for sorting, dismantling, material recovery, and regulated handling where required.",
          ],
        },
      ],
    },
    {
      figma: "7126:11131",
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
            {
              label: "Facility",
              value: "Processing takes place at Recycle Technologies facilities outside Chicago",
            },
          ],
        },
      ],
    },
    {
      figma: "7126:11150",
      heading: "What We Accept",
      grey: false,
      blocks: [
        { kind: "text", body: ["Recycle Technologies accepts the following ballast types:"] },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "PCB Ballasts",
                body: [
                  "Older magnetic ballasts that may contain PCB-containing capacitors. These require regulated handling and are routed to incineration.",
                ],
              },
              {
                title: "Non-PCB Ballasts",
                body: ["Magnetic or electronic ballasts manufactured without PCB-containing capacitors."],
              },
            ],
            [
              {
                title: "Electronic Ballasts",
                body: ["Used in many newer fluorescent fixtures and processed for material recovery."],
              },
              {
                title: "Magnetic Ballasts",
                body: [
                  "Traditional ballast types found in older lighting fixtures.",
                  "Not sure which type of ballast you have? Describe your materials when requesting a quote, and Recycle Technologies can help determine how they need to be handled.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7126:11171",
      heading: "Ballast Recycling for Chicago Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange ballast recycling for lighting retrofits and fixture replacements. This includes:",
          ],
        },
        {
          kind: "bullets",
          rows: [
            [
              "PCB and non-PCB ballasts removed during lighting upgrades",
              "Electronic and magnetic ballasts from facility-wide relamping projects",
            ],
            ["Larger volumes of retired ballasts from commercial or industrial buildings"],
          ],
        },
        {
          kind: "text",
          body: [
            "Illinois law restricts businesses from disposing of PCB- and DEHP-containing components with regular trash, making a documented recycling partner relevant for both compliance and sustainability.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7126:11195",
      heading: "Ballast Recycling for Chicago Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or a drop-off facility in Chicago. Chicago residents and small-volume customers can use the Mail-In Recycling Program by ordering a ballast recycling kit, packing eligible non-PCB ballasts in the provided container, and shipping them to Recycle Technologies using the prepaid shipping label. Ballast kits are designed for safe shipment and recycling of eligible materials.",
          ],
        },
      ],
    },
    {
      figma: "7126:11200",
      heading: "How Ballast Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses schedule a commercial pickup for their retired ballasts. Materials are collected and transported to Recycle Technologies' processing facilities.",
                ],
              },
              {
                title: "Sorting and Dismantling",
                body: [
                  "Once received, ballasts are sorted by category, generally magnetic or electronic, then dismantled to separate their components, including metals, plastics, and any capacitors.",
                ],
              },
            ],
            [
              {
                title: "Separation of Hazardous Components and Material Recovery",
                body: [
                  "PCB- and DEHP-containing capacitors are removed from the cover materials and sent to an EPA-approved incineration facility through a certified hazardous waste hauler.",
                  "Non-hazardous materials, including copper and steel, are separated for reclamation, while plastics and other recoverable materials are processed for reuse rather than sent to a landfill.",
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
      figma: "7126:11219",
      heading: "Why Recycle Technologies for Ballast Recycling",
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
                body: ["Chicago businesses can schedule commercial pickup for retired ballast inventory."],
              },
              {
                icon: "lock",
                title: "Regulated Handling",
                body: [
                  "PCB- and DEHP-containing components are routed to an EPA-approved incineration facility through a certified hazardous waste hauler, removing generator liability for the business.",
                ],
              },
            ],
            [
              {
                icon: "shield",
                title: "Certified Processing",
                body: [
                  "Ballasts are handled through Recycle Technologies' established recycling processes at its Minnesota and Wisconsin facilities.",
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
      figma: "7126:11241",
      heading: "Local Chicago Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Illinois state law generally restricts businesses from disposing of PCB- and DEHP-containing ballasts in regular trash.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of ballasts, as specific requirements can change.",
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
        q: "Does Recycle Technologies recycle PCB ballasts?",
        a: "Yes, PCB ballasts are accepted and routed to an EPA-approved incineration facility.",
      },
      {
        q: "Can businesses schedule a ballast pickup?",
        a: "Yes. Chicago businesses can request a quote or schedule a commercial pickup for PCB, non-PCB, electronic, and magnetic ballasts, and collected ballasts are transported to Recycle Technologies' processing facilities.",
      },
      {
        q: "Does Recycle Technologies have a ballast drop-off location in Chicago?",
        a: "No. Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses are served through scheduled commercial pickup, and residents and small-volume customers can use the Mail-In Recycling Program for eligible non-PCB ballasts.",
      },
      {
        q: "Do I get documentation after my ballasts are recycled?",
        a: "Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.",
      },
      {
        q: "How far in advance do Chicago businesses need to schedule a pickup?",
        a: "Chicago businesses can request a quote or schedule a commercial pickup to get started. Call Recycle Technologies at (800) 969-5166 to confirm current scheduling and availability for your location.",
      },
    ],
  },
  after: [
    {
      figma: "7126:11270",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronics Recycling", href: href('/electronic-recycling-chicago/') },
            { label: "Television Recycling", href: href('/tv-recycling-chicago/') },
            { label: "Light Bulb Recycling", href: href('/light-bulb-recycling-chicago/') },
            { label: "Battery Recycling", href: href('/battery-recycling-chicago/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-chicago/') },
            { label: "All Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Ballast Recycling in Chicago",
    body: [
      "Recycle Technologies picks up retired ballasts from businesses across the Chicago area and transports them to its processing facilities for sorting, regulated handling, and material recovery.",
      "Request a quote or schedule a commercial pickup to get started. Contact Recycle Technologies to confirm current s",
    ],
    primary: QUOTE,
    secondary: tel("Call: 800-969-5166", "+18009695166"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
