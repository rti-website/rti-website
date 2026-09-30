import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Battery Recycling in Chicago, Illinois — /battery-recycling-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7126:11820, phone 7126:12262 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_BATTERY_RECYCLING: LocalPage = {
  url: href('/battery-recycling-chicago/'),
  figma: { board: "7126:11820", phone: "7126:12262" },
  seo: {
    title: "Battery Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Commercial battery recycling for Chicago businesses by scheduled pickup, with a mail-in program for residents. Processed at our R2v3 certified Midwest facilities since 1993.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Battery Recycling in Chicago, Illinois",
    h1: "Battery Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides battery recycling services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup. Residents and small-volume customers can recycle batteries through the mail-in program, which ships to the company's certified facilities.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7126:11885",
      heading: "Battery Recycling Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has handled battery recycling from its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
            "Businesses in Chicago can use Recycle Technologies' services through commercial pickup or drop-off at this location. Businesses can arrange service for spent battery inventory and larger recycling needs.",
          ],
        },
      ],
    },
    {
      figma: "7126:11899",
      heading: "Chicago Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Location", value: "Chicago, Illinois" },
            { label: "Phone", value: "(800) 969-5166 | 800-969-5166" },
            { label: "Service Area", value: "Chicago and surrounding areas" },
            { label: "Commercial customers", value: "Scheduled pickup" },
            { label: "Residents and small quantities", value: "Mail-in program" },
            { label: "Nearest facility", value: "New Berlin, Wisconsin" },
          ],
        },
      ],
    },
    {
      figma: "7126:11921",
      heading: "What We Accept",
      grey: false,
      blocks: [
        { kind: "text", body: ["Recycle Technologies accepts a broad range of battery types, including:"] },
        {
          kind: "cards",
          rows: [
            [
              { title: "Alkaline & Zinc Batteries", body: ["Standard alkaline and zinc batteries."] },
              {
                title: "Lithium-Ion & Lead-Acid Batteries",
                body: ["Rechargeable lithium-ion packs and sealed lead-acid batteries."],
              },
            ],
            [
              {
                title: "Nickel-Cadmium & Button Cell Batteries",
                body: ["NiCd batteries and small button-cell batteries."],
              },
              {
                title: "EV, Power Tool & Backup Batteries",
                body: [
                  "Electric vehicle batteries, Tesla batteries, power tool packs, and battery backup units.",
                  "Recycle Technologies also handles other battery types, including mercury oxide batteries, on a case-by-case basis. If your batteries aren't listed here, reach out and describe what you need to recycle.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7126:11942",
      heading: "Battery Recycling for Chicago Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange battery recycling for retired IT equipment, facilities, and fleet operations. This includes:",
          ],
        },
        {
          kind: "bullets",
          rows: [
            [
              "Spent alkaline, lithium-ion, and lead-acid batteries from office and IT equipment",
              "Power tool, backup, and EV battery packs",
            ],
            ["Larger volumes of accumulated battery inventory"],
          ],
        },
        {
          kind: "text",
          body: [
            "Illinois law restricts businesses from disposing of certain battery types with regular trash, making a documented recycling partner relevant for both compliance and sustainability.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7126:11966",
      heading: "Battery Recycling for Chicago Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents can use the mail-in program by ordering a prepaid battery recycling kit, taping the battery terminals, and shipping the batteries to Recycle Technologies for certified processing.",
          ],
        },
      ],
    },
    {
      figma: "7126:11971",
      heading: "How Battery Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection or Drop-Off",
                body: [
                  "Items are collected either through commercial pickup or dropped off at this Chicago-area location.",
                ],
              },
              {
                title: "Sorting and Processing",
                body: [
                  "Once batteries are received, trained staff sort and separate them by type before processing at Recycle Technologies' Minnesota and Wisconsin facilities. Battery terminals should be covered before shipping or storage to reduce the risk of fire.",
                ],
              },
            ],
            [
              {
                title: "Recycling and Material Recovery",
                body: [
                  "Sorting batteries by type allows each battery chemistry to be processed according to its specific handling requirements, reducing waste sent to landfills and keeping hazardous elements out of the environment.",
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
      figma: "7126:11989",
      heading: "Why Recycle Technologies for Battery Recycling",
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
                title: "Commercial Pickup and Drop-Off",
                body: ["Chicago businesses can use pickup or drop-off at this location."],
              },
            ],
            [
              {
                icon: "factory",
                title: "In-House Processing",
                body: [
                  "Batteries are sorted and processed directly at Recycle Technologies' own Minnesota and Wisconsin facilities rather than through an outside broker.",
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
      figma: "7126:12007",
      heading: "Local Chicago Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Illinois state law generally restricts businesses from disposing of certain battery types in regular trash. Chicago businesses should confirm the current local rules with the City of Chicago before disposing of batteries, as specific requirements can change.",
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
        q: "What battery types does Recycle Technologies recycle?",
        a: "Alkaline, lithium-ion, lead-acid, nickel-cadmium, button cell, EV, power tool, and backup batteries.",
      },
      {
        q: "Can my business schedule a pickup for battery recycling?",
        a: "Yes. Chicago businesses can request a quote or schedule a commercial pickup for spent batteries, including power tool, backup, and EV battery packs and larger volumes of accumulated battery inventory.",
      },
      {
        q: "Do the batteries get sent to a landfill?",
        a: "Batteries are sorted by type and processed at Recycle Technologies' own Minnesota and Wisconsin facilities according to each chemistry's specific handling requirements. This reduces waste sent to landfills and keeps hazardous elements out of the environment.",
      },
      {
        q: "Will I receive documentation that my batteries were recycled?",
        a: "Yes. Recycle Technologies provides recycling documentation as part of its certified process, supporting businesses that need records for compliance or internal reporting.",
      },
      {
        q: "How far in advance do Chicago businesses need to schedule a pickup?",
        a: "Most Chicago pickups are scheduled within a few business days. Request a quote or schedule a pickup to get started, or call (800) 969-5166 to speak with the commercial team.",
      },
    ],
  },
  after: [
    {
      figma: "7126:12035",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronics Recycling", href: href('/electronic-recycling-chicago/') },
            { label: "Television Recycling", href: href('/tv-recycling-chicago/') },
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
    heading: "Schedule Battery Recycling for Your Chicago Business",
    body: [
      "Recycle Technologies picks up spent batteries from offices, warehouses, data centers, and fleet operations across the Chicago area, then processes them at its own R2v3 certified facilities and provides documentation for your records.",
      "Tell us what you have and where it is. Most Chicago pickups are scheduled within a few business days.",
      "Or call 800-969-5166 to speak with the commercial team.",
    ],
    primary: PICKUP,
    secondary: tel("Call: 800-969-5166", "+18009695166"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
