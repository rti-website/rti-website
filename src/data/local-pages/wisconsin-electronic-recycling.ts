import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Electronic Recycling in New Berlin, Wisconsin — /wisconsin-recycling/electronic-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7119:4283, phone 7119:4713 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/wisconsin-recycling/electronic-recycling/'),
  figma: { board: "7119:4283", phone: "7119:4713" },
  seo: {
    title: "Electronic Recycling in New Berlin, Wisconsin | Recycle Technologies",
    description: "Drop off, business pickup or mail in computers, monitors, printers, phones and other e-waste at our New Berlin, Wisconsin facility. Dismantled and recycled in-house since 1993.",
  },
  schema: { service: "Electronic Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Electronic Recycling in New Berlin, Wisconsin",
    h1: "Electronic Recycling in New Berlin, Wisconsin",
    body: [
      "Used electronics, computers, monitors, printers, and the cables, switches, and chargers that go with them contain metals, plastics, glass, and circuit boards that shouldn't go in the trash or curbside recycling bin.",
      "Recycle Technologies collects and processes electronics for households, businesses, and organizations at its New Berlin, Wisconsin facility, breaking devices down into their base materials instead of sending them to a landfill. Individuals can drop electronics off at the New Berlin location or use the nationwide Mail-In Program, while businesses can schedule a pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7119:4348",
      heading: "Electronic Recycling Services in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of electronic and computer-related equipment at its New Berlin facility. Electronics can enter the process through a business pickup, a drop-off at the New Berlin facility, or the Mail-In Program.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is a Local Recycling Facility",
          body: [
            "Recycle Technologies provides electronic recycling at its New Berlin, Wisconsin facility. Individuals can bring electronics to the facility during business hours, while businesses can schedule a commercial pickup for retired IT equipment and other electronics.",
          ],
        },
      ],
    },
    {
      figma: "7119:4360",
      heading: "New Berlin Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "2815 South 171st Street, New Berlin, WI 53151" },
            { label: "Phone", value: "+1-262-798-3040" },
            { label: "Hours", value: "Monday through Friday, 8:00 AM to 4:30 PM" },
            {
              label: "Drop-Off",
              value: "Individuals can bring electronics to the New Berlin location during business hours; enter via the main lot on South 171st Street, where staff will direct you to the drop-off bay on arrival.",
            },
            {
              label: "Business Pickup",
              value: "Available for businesses; contact Recycle Technologies to arrange a scheduled pickup.",
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
      figma: "7119:4382",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of electronic and computer-related equipment at its New Berlin facility.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "General E-Waste",
                body: [
                  "Cables, switches, chargers, keyboards, mice, remotes, microwaves, televisions, and other everyday electronic items.",
                ],
              },
              { title: "Computers & Laptops", body: ["Desktops, laptops, and servers."] },
              { title: "Monitors & Displays", body: ["Monitors and displays, including CRT units."] },
            ],
            [
              {
                title: "Office & Imaging Equipment",
                body: ["Fax machines, printers, scanners, and copiers."],
              },
              {
                title: "Phones",
                body: [
                  "Cell phones and related mobile devices.",
                  "Related electronic scrap is handled on a case-by-case basis. If your equipment isn't listed here, call the New Berlin facility to confirm before scheduling.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7119:4407",
      heading: "Electronic Recycling for New Berlin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the New Berlin area can schedule a commercial pickup for retired IT equipment and other electronics.",
            "Business pickup is arranged through Recycle Technologies, allowing businesses to have electronics collected rather than transporting them to the facility themselves.",
          ],
        },
      ],
    },
    {
      figma: "7119:4413",
      heading: "Electronic Recycling for New Berlin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring electronics to the New Berlin location during business hours. Enter via the main lot on South 171st Street, where staff will direct you to the drop-off bay on arrival.",
            "If a trip to New Berlin isn't convenient, the nationwide Mail-In Program lets you ship electronics from anywhere in the country.",
          ],
        },
      ],
    },
    {
      figma: "7119:4419",
      heading: "How Electronic Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Electronics enter the process through a business pickup, a drop-off at the New Berlin facility, or the Mail-In Program.",
                ],
              },
              {
                title: "Sorting and Storage",
                body: ["Incoming electronics are grouped by type ahead of processing."],
              },
              {
                title: "Dismantling",
                body: [
                  "Devices are broken down so individual components and materials can be separated from one another.",
                ],
              },
            ],
            [
              {
                title: "Separation",
                body: [
                  "Plastic and wiring are separated out for shredding, monitors go through a decontamination step that removes lead, and circuit boards are sorted from the rest of the unit.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Shredded plastic and wire are sent to molders and smelters, and the metals and minerals sorted out of circuit boards are collected for reuse.",
                  "Recycle Technologies has provided these services since 1993 and operates licensed facilities in Wisconsin and Minnesota.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7119:4442",
      heading: "Why Recycle Technologies for Electronic Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: ["Recycle Technologies has provided electronic recycling services since 1993."],
              },
              {
                icon: "truck",
                title: "Local Drop-Off and Business Pickup",
                body: ["Local drop-off, business pickup, and nationwide Mail-In Program are all available."],
              },
              {
                icon: "factory",
                title: "In-House Dismantling and Processing",
                body: ["Recycle Technologies handles dismantling and processing at the New Berlin facility."],
              },
            ],
            [
              {
                icon: "leaf",
                title: "Material Recovery",
                body: [
                  "Monitors are decontaminated to remove lead before recycling, while circuit boards are sorted for metal and mineral recovery.",
                ],
              },
              {
                icon: "check",
                title: "Wide Range of Accepted Electronics",
                body: [
                  "Recycle Technologies accepts a wide range of items, from full computer systems down to cables, switches, and chargers.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7119:4464",
      heading: "Local New Berlin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Rules on disposing of electronics, particularly items with a circuit board or CRT, vary by device type and by whether the generator is a household or a business, and requirements can change, so it's best to confirm with local authorities or contact the New Berlin facility directly before disposing of any item you're unsure about.",
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
        q: "What electronics does Recycle Technologies accept?",
        a: "General e-waste like cables, switches, chargers, keyboards, and mice, plus computers, laptops, servers, monitors, including CRT, fax machines, printers, scanners, copiers, and cell phones.",
      },
      {
        q: "Can individuals schedule a pickup?",
        a: "Scheduled pickup is available for businesses. Individuals can bring electronics to the New Berlin location during business hours, Monday through Friday, 8:00 AM to 4:30 PM, or ship them through the nationwide Mail-In Program.",
      },
      {
        q: "What happens to my electronics after they're collected?",
        a: "Electronics are grouped by type and dismantled so their components and materials can be separated. Plastic and wiring are shredded and sent to molders and smelters, monitors go through a decontamination step that removes lead, and metals and minerals sorted out of circuit boards are collected for reuse.",
      },
      {
        q: "What if there isn't a Recycle Technologies location near me?",
        a: "The nationwide Mail-In Program lets you ship electronics to Recycle Technologies from anywhere in the country.",
      },
      {
        q: "Is it legal to put electronics in my regular trash?",
        a: "Used electronics shouldn't go in the trash or curbside recycling bin, since they contain metals, plastics, glass, and circuit boards. Rules vary by device type, particularly for items with a circuit board or CRT, and by whether you're a household or a business, so confirm with local authorities or call the New Berlin facility at (262) 798-3040.",
      },
    ],
  },
  after: [
    {
      figma: "7119:4492",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Battery Recycling", href: href('/wisconsin-recycling/battery-recycling/') },
            { label: "Television Recycling", href: href('/tv-recycling-in-wisconsin/') },
            { label: "Paper Shredding", href: href('/wisconsin-recycling/paper-shredding/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Electronic Recycling in New Berlin, Wisconsin",
    body: [
      "Drop off electronics at the New Berlin facility during business hours, or schedule a business pickup for retired equipment.",
      "Schedule Electronic Recycling in New Berlin, Wisconsin | Call the New Berlin Facility: (262) 798-3040",
    ],
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
