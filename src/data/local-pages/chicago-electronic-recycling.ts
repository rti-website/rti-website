import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Electronics Recycling in Chicago, Illinois — /electronic-recycling-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7158:6338, phone 7158:6757 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/electronic-recycling-chicago/'),
  figma: { board: "7158:6338", phone: "7158:6757" },
  seo: {
    title: 'Chicago Electronics Recycling & Business Pickup',
    description: "Commercial electronics and e-waste recycling for Chicago businesses, with pickup, drop-off, ITAD and hard drive destruction through our certified process.",
  },
  schema: { service: "Electronic Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Electronics Recycling in Chicago, Illinois",
    h1: 'Electronics Recycling in Chicago and Northern Illinois',
    body: [
      "Recycle Technologies provides electronics recycling services to businesses and residents in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, while residents and small-volume customers can use the mail-in program for eligible electronics.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7158:6351",
      heading: "Electronics Recycling Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has operated licensed, R2v3-certified facilities in Minnesota and Wisconsin for more than 3 decades.",
            "In Chicago, the company serves customers through expanded operations rather than a licensed recycling facility located in the city itself.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
            "Chicago businesses can arrange scheduled commercial pickup for computers, monitors, televisions, networking equipment, cables, adapters, and other electronics.",
            "Residents and small-volume customers can use the mail-in program for eligible electronics that can be safely shipped to Recycle Technologies for processing.",
          ],
        },
      ],
    },
    {
      figma: "7158:6366",
      heading: "Chicago Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Location", value: "Chicago, Illinois" },
            { label: "Phone", value: "(800) 969-5166 | (800) 305-3040" },
            { label: "Service Area", value: "Chicago and surrounding areas" },
            { label: "Businesses", value: "Scheduled commercial pickup" },
            { label: "Residents and small quantities", value: "Mail-in program" },
          ],
        },
      ],
    },
    {
      figma: "7158:6385",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a broad range of electronics and e-waste, including:"],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Computers and Laptops",
                body: ["Desktop computers, laptops, workstations, servers, and related computer equipment."],
              },
              {
                title: "Monitors and Displays",
                body: ["Computer monitors, LCD displays, and other electronic display equipment."],
              },
            ],
            [
              { title: "Televisions", body: ["CRT, LCD, LED, plasma, and other television types."] },
              {
                title: "Networking Equipment",
                body: ["Switches, routers, access points, modems, and other networking hardware."],
              },
            ],
            [
              {
                title: "Cables, Adapters, and Accessories",
                body: [
                  "Power cables, data cables, chargers, adapters, keyboards, mice, and other electronic accessories.",
                ],
              },
              {
                title: "Phones and Telecommunications Equipment",
                body: ["Cell phones, business phones, telecommunications equipment, and related electronics."],
              },
            ],
            [
              {
                title: "Office Electronics",
                body: ["Printers, copiers, scanners, fax machines, and other electronic office equipment."],
              },
              {
                title: "Other Electronics",
                body: ["Small electronic devices, electronic components, and other miscellaneous e-waste."],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "If you are unsure whether a specific item qualifies, describe your equipment when requesting service so Recycle Technologies can confirm whether it can be accepted.",
          ],
        },
      ],
    },
    {
      figma: "7158:6406",
      heading: "Electronics Recycling for Chicago Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange electronics recycling for retired office equipment, IT equipment, facility electronics, and larger volumes of e-waste.",
          ],
        },
        {
          kind: "bullets",
          rows: [
            ["Computers, laptops, servers, and monitors", "Televisions and displays"],
            [
              "Switches, routers, access points, cables, and adapters",
              "Phones and telecommunications equipment",
            ],
            [
              "Printers, copiers, scanners, and other office electronics",
              "Larger volumes of mixed electronic equipment",
            ],
            ["Hard drives and storage devices requiring secure destruction"],
          ],
        },
        {
          kind: "text",
          body: [
            "Illinois law generally requires businesses to recycle covered electronics rather than dispose of them with regular waste, making a documented recycling partner relevant for both compliance and sustainability.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7158:6429",
      heading: "Electronics Recycling for Chicago Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or a local drop-off facility in Chicago. Chicago residents and small-volume customers can use the mail-in program for eligible electronics: order an appropriate recycling kit, pack the materials according to the instructions provided, and ship them to Recycle Technologies for processing.",
          ],
        },
      ],
    },
    {
      figma: "7158:6434",
      heading: "How Electronics Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup or Mail-In",
                body: [
                  "Businesses can schedule commercial pickup for larger quantities of electronics. Residents and small-volume customers can use the mail-in program for eligible materials.",
                ],
              },
              {
                title: "Sorting and Processing",
                body: [
                  "Collected electronics are sorted and broken down into base materials, including plastic, wire, circuit boards, metals, and glass.",
                ],
              },
            ],
            [
              {
                title: "Data Destruction and Material Recovery",
                body: [
                  "Hard drives and other storage devices requiring secure destruction can be processed through the applicable hard drive destruction service. Other electronics are dismantled and separated so recoverable materials can be recycled and reused.",
                ],
              },
              {
                title: "Recycling and Material Recovery",
                body: [
                  "Plastics, metals, glass, circuit boards, wire, and other recoverable materials are separated and processed for recycling rather than sent to a landfill.",
                ],
              },
            ],
            [
              {
                title: "Documentation",
                body: [
                  "Recycle Technologies provides recycling documentation as part of its certified process, supporting customers who need records for compliance or internal reporting.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7158:6453",
      heading: "Why Recycle Technologies for Electronics Recycling",
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
                icon: "shield",
                title: "Certified Standards",
                body: [
                  "The company holds R2v3 and RIOS certifications for applicable recycling and data destruction processes.",
                ],
              },
              {
                icon: "truck",
                title: "Commercial Pickup and Mail-In Recycling",
                body: [
                  "Businesses can schedule commercial pickup, while residents and small-volume customers can use the mail-in program for eligible electronics.",
                ],
              },
            ],
            [
              {
                icon: "lock",
                title: "Hard Drive Destruction",
                body: [
                  "Hard drive destruction is available for electronics containing sensitive data that require secure destruction before recycling.",
                ],
              },
              {
                icon: "factory",
                title: "In-House Processing",
                body: [
                  "Collected electronics are processed through Recycle Technologies' own facilities rather than being sent through an outside broker.",
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
      figma: "7158:6499",
      heading: "Local Chicago Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Illinois state law generally requires businesses to recycle covered electronics rather than place them in regular trash.",
            "Chicago businesses and residents should confirm current local requirements with the City of Chicago before disposing of electronics, as specific requirements can change.",
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
        q: "What electronics can I recycle?",
        a: "Computers, laptops, servers, monitors, TVs, switches, routers, cables, adapters, phones, printers, and other electronics are accepted.",
      },
      {
        q: "Can I recycle electronics that still work?",
        a: "Recycle Technologies accepts a broad range of electronics and e-waste. If you are unsure whether a specific item qualifies, describe your equipment when requesting service or call (800) 969-5166 so Recycle Technologies can confirm whether it can be accepted.",
      },
      {
        q: "Does Recycle Technologies have an electronics drop-off facility in Chicago?",
        a: "No. Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses are served through scheduled commercial pickup, and residents and small-volume customers can use the mail-in program for eligible electronics.",
      },
      {
        q: "Can hard drives be securely destroyed?",
        a: "Yes. Hard drive destruction is available for hard drives and other storage devices containing sensitive data that require secure destruction before recycling.",
      },
      {
        q: "Do I get documentation after my electronics are recycled?",
        a: "Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting customers who need records for compliance or internal reporting.",
      },
    ],
  },
  after: [
    {
      figma: "7158:6542",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Television Recycling", href: href('/tv-recycling-chicago/') },
            { label: "Battery Recycling", href: href('/battery-recycling-chicago/') },
            { label: "Light Bulb Recycling", href: href('/light-bulb-recycling-chicago/') },
            { label: "Ballast Recycling", href: href('/ballast-recycling-chicago/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-chicago/') },
            { label: "All Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Chicago",
    body: [
      "Recycle Technologies serves Chicago businesses through scheduled commercial pickup and offers a mail-in option for residents and small-volume customers with eligible electronics.",
      "Phone: 800-969-5166",
    ],
    primary: QUOTE,
    secondary: tel("Call: 800-969-5166", "+18009695166"),
    footnote: "Contact Recycle Technologies to confirm current service options and eligibility for your electronics.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
