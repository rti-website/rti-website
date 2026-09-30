import { href } from '@/lib/urls'
import { type LocalPage, KIT_LINK, PICKUP, QUOTE, tel } from './types'

/**
 * Television Recycling in Chicago, Illinois — /tv-recycling-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7128:14040, phone 7128:14498 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_TV_RECYCLING: LocalPage = {
  url: href('/tv-recycling-chicago/'),
  figma: { board: "7128:14040", phone: "7128:14498" },
  seo: {
    title: "Television Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides commercial television recycling services to businesses in the Chicago area.",
  },
  schema: { service: "TV Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Television Recycling in Chicago, Illinois",
    h1: "Television Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides commercial television recycling services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, with materials transported to the company's certified facilities for processing.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7128:14105",
      heading: "Television Recycling Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has operated licensed, R2v3-certified facilities in Minnesota and Wisconsin for 3 decades.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
            "Chicago businesses can arrange scheduled commercial pickup for CRT, LCD, LED, plasma, and flat-screen TVs from office, conference room, or facility turnover.",
            "Collected televisions are transported to Recycle Technologies' processing facilities outside Chicago for dismantling, material recovery, and appropriate handling.",
          ],
        },
      ],
    },
    {
      figma: "7128:14120",
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
      figma: "7128:14139",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts the following types of televisions for recycling:"],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "CRT Televisions",
                body: [
                  "Older tube-style televisions that contain heavy metals such as lead and cadmium and require careful, hazard-aware handling.",
                ],
              },
              {
                title: "LCD Televisions",
                body: ["Flat-panel televisions using liquid crystal display technology."],
              },
              { title: "LED Televisions", body: ["Flat-panel televisions using LED backlighting."] },
            ],
            [
              {
                title: "Plasma Televisions",
                body: ["Flat-panel televisions using plasma display technology."],
              },
              {
                title: "Flat-Screen Televisions",
                body: [
                  "Other flat-panel television types not falling into the categories above.",
                  "This service is oriented toward commercial customers, including businesses, offices, and facilities retiring televisions as part of upgrades or equipment turnover. If you're unsure whether your specific television model or quantity qualifies, request a quote and describe what you need to recycle.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7128:14164",
      heading: "Television Recycling for Chicago Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange television recycling for office, conference room, and facility equipment turnover.",
            "This includes:",
          ],
        },
        {
          kind: "bullets",
          rows: [
            [
              "Retired CRT televisions containing lead and cadmium",
              "LCD, LED, plasma, and other flat-screen televisions",
            ],
            ["Larger volumes of televisions from office or facility upgrades"],
          ],
        },
        {
          kind: "text",
          body: [
            "Illinois law requires businesses to recycle electronics, including televisions, rather than dispose of them with regular waste, making a documented recycling partner relevant for both compliance and sustainability.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup.",
          ],
        },
      ],
    },
    {
      figma: "7128:14189",
      heading: "Television Recycling for Chicago Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or a drop-off facility in Chicago. Chicago residents and small-volume customers can use the Mail-In Recycling Program for eligible televisions by ordering a recycling kit, packing the television according to the program's requirements, and shipping it to Recycle Technologies for processing.",
          ],
        },
        {
          kind: "button",
          link: { label: "Link to the Television Recycling Kit", href: KIT_LINK.href, external: true },
        },
      ],
    },
    {
      figma: "7128:14196",
      heading: "How Television Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses schedule a commercial pickup for retired televisions. Collected items are transported to Recycle Technologies' processing facilities outside Chicago.",
                  "When items are collected, a hazard consignment note may be issued, documenting who collected the items, where they were collected from, how many were collected, and where they are being taken.",
                ],
              },
              {
                title: "Transport and Dismantling",
                body: [
                  "Collected televisions are brought to Recycle Technologies' facilities in Minnesota or Wisconsin, where they are broken down into their base components, including plastic housing, wiring, circuit boards, metals, and glass.",
                ],
              },
            ],
            [
              {
                title: "Separation of Hazardous Materials and Recovery",
                body: [
                  "CRT televisions require particular attention due to the lead and cadmium in the tube, and newer televisions with mercury-containing glass components are handled separately from standard materials.",
                  "Metals, plastics, and other recoverable materials are processed for reuse rather than sent to a landfill.",
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
      figma: "7128:14216",
      heading: "Why Recycle Technologies for Television Recycling",
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
                body: ["Chicago businesses can schedule commercial pickup for retired televisions."],
              },
              {
                icon: "lock",
                title: "Hazard-Aware Handling",
                body: [
                  "CRT lead and cadmium, and mercury-containing components in newer TVs, are separated and handled correctly rather than sent to a landfill.",
                ],
              },
            ],
            [
              {
                icon: "shield",
                title: "Certified Processing",
                body: [
                  "Televisions are transported to Recycle Technologies' established processing facilities for dismantling and material recovery.",
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
      figma: "7128:14238",
      heading: "Local Chicago Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Illinois state law generally requires that businesses recycle electronics, including televisions, rather than place them in regular trash.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of televisions, as specific requirements can change.",
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
        q: "Does Recycle Technologies recycle CRT televisions?",
        a: "Yes, CRT televisions are accepted and handled with hazard-aware processing.",
      },
      {
        q: "Does Recycle Technologies recycle flat-screen TVs?",
        a: "Yes. Recycle Technologies accepts LCD, LED, plasma, and other flat-screen televisions for recycling.",
      },
      {
        q: "Is television recycling available for businesses?",
        a: "Yes. The service is oriented toward businesses, offices, and facilities retiring televisions as part of upgrades or equipment turnover, and Chicago businesses can request a quote or schedule a commercial pickup.",
      },
      {
        q: "Can I schedule a television pickup?",
        a: "Chicago businesses can schedule a commercial pickup for retired televisions, which are transported to Recycle Technologies' processing facilities outside Chicago. Recycle Technologies does not offer residential pickup in Chicago, so residents and small-volume customers can use the Mail-In Recycling Program for eligible televisions.",
      },
      {
        q: "Does Recycle Technologies offer a television recycling kit?",
        a: "Yes. Chicago residents and small-volume customers can order a recycling kit through the Mail-In Recycling Program, pack eligible televisions according to the program's requirements, and ship them to Recycle Technologies for processing.",
      },
    ],
  },
  after: [
    {
      figma: "7128:14267",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronics Recycling", href: href('/electronic-recycling-chicago/') },
            { label: "Light Bulb Recycling", href: href('/light-bulb-recycling-chicago/') },
            { label: "Battery Recycling", href: href('/battery-recycling-chicago/') },
            { label: "Ballast Recycling", href: href('/ballast-recycling-chicago/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-chicago/') },
            { label: "All Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Television Recycling in Chicago",
    body: [
      "Recycle Technologies picks up retired televisions from businesses across the Chicago area and transports them to its processing facilities for dismantling, material recovery, and appropriate handling.",
      "Request a quote or schedule a commercial pickup to get started. Contact Recycle Technologies to confirm current service options for the Chicago area.",
    ],
    primary: QUOTE,
    secondary: tel("Call: 800-969-5166", "+18009695166"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
    "\"Link to the Television Recycling Kit\" links to the Mail-In Program shop (EZ on the Earth); the frame gives no destination.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
