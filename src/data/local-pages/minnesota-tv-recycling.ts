import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Television Recycling in Minnesota — /minnesota-recycling/tv-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7125:10674, phone 7125:11104 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_TV_RECYCLING: LocalPage = {
  url: href('/minnesota-recycling/tv-recycling/'),
  figma: { board: "7125:10674", phone: "7125:11104" },
  seo: {
    title: "Television Recycling in Minnesota | Recycle Technologies",
    description: "Old televisions contain materials that don't belong in a landfill. CRT sets contain lead and cadmium, and newer TVs can contain mercury-containing glass.",
  },
  schema: { service: "TV Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Television Recycling in Minnesota",
    h1: "Television Recycling in Minnesota",
    body: [
      "Old televisions contain materials that don't belong in a landfill. CRT sets contain lead and cadmium, and newer TVs can contain mercury-containing glass. Recycle Technologies handles television recycling at its Blaine facility, giving Minnesota residents and businesses a documented way to retire old TVs safely. Individuals can drop TVs off at the Blaine location or use the nationwide Mail-In Program, and businesses can schedule commercial pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7125:10738",
      heading: "Television Recycling Services in Minnesota",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a wide range of television types at its Blaine facility. TVs can enter the process through a drop-off at the Blaine facility, the Mail-In Program, or a scheduled commercial pickup for businesses.",
          ],
        },
        {
          kind: "card",
          title: "Blaine Is Our Minnesota Recycling Facility",
          body: [
            "Recycle Technologies handles television recycling at its Blaine, Minnesota facility. Individuals can bring TVs to the facility, while businesses can schedule a commercial pickup. Recycle Technologies has served the community since 1993 and operates licensed facilities in Minnesota and Wisconsin.",
          ],
        },
      ],
    },
    {
      figma: "7125:10750",
      heading: "Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "1525 99th Ln NE, Blaine, Minnesota 55449" },
            { label: "Phone", value: "+1-763-559-5130" },
            {
              label: "Drop-Off",
              value: "Individuals can bring Televisions to the Blaine location during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.",
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
      figma: "7125:10769",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a wide range of television types at its Blaine facility."],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "CRT Televisions",
                body: ["Traditional cathode ray tube (CRT) TVs, including tube sets and console-style units."],
              },
              {
                title: "LCD Televisions",
                body: ["Liquid crystal display (LCD) flat-screen TVs of all sizes."],
              },
              { title: "LED Televisions", body: ["LED and LED-backlit flat-screen TVs."] },
            ],
            [
              { title: "Plasma Televisions", body: ["Plasma TVs, including large-format units."] },
              {
                title: "Other Video Displays",
                body: [
                  "Non-working, damaged, or outdated TVs are welcome. Computer monitors and rear-projection sets are also accepted.",
                  "Not sure whether your set qualifies? Give the New Berlin team a call before you book a pickup or ship anything.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:10794",
      heading: "Television Recycling for Minnesota Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses, property managers, hotels, schools, and facilities can schedule a commercial pickup for televisions. This is a business service, not a residential option. Recycle Technologies can also coordinate pickup for larger quantities when a company is upgrading displays or clearing out a building.",
          ],
        },
      ],
    },
    {
      figma: "7125:10799",
      heading: "Television Recycling for Minnesota Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring televisions to the Blaine location. A team member will meet you at the rear loading area to log your materials. If a trip to Blaine isn't convenient, the nationwide Mail-In Program lets you ship electronics from anywhere in the country. Because TVs are large and heavy, call ahead to confirm mail-in options for your set.",
          ],
        },
      ],
    },
    {
      figma: "7125:10804",
      heading: "How Television Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Drop TVs off at the Blaine facility, use the Mail-In Program, or, for businesses, schedule a commercial pickup.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "For commercial pickups, a hazard consignment note detailing the collector, location, quantity, and destination of items may be issued during collection.",
                ],
              },
              {
                title: "Sorting",
                body: [
                  "Televisions are sorted into categories by type, such as CRT, LCD, LED, and plasma, so each receives the right handling.",
                ],
              },
            ],
            [
              {
                title: "Dismantling",
                body: [
                  "TVs are safely dismantled. CRT sets receive special care because of the lead and cadmium in the glass.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Recoverable materials such as glass, plastics, and metals are separated and directed to recycling rather than a landfill, in line with our zero-landfill commitment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:10826",
      heading: "Why Recycle Technologies for Television Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "leaf",
                title: "Safe Handling of Hazardous Materials",
                body: [
                  "CRT and other TVs are dismantled with proper care for lead, cadmium, and mercury-containing components.",
                ],
              },
              {
                icon: "leaf",
                title: "Zero-Landfill Commitment",
                body: ["Materials are recycled and recovered rather than sent to a landfill."],
              },
              {
                icon: "mail",
                title: "Local and Nationwide Recycling Options",
                body: [
                  "Local drop-off, commercial pickup, and the nationwide Mail-In Program are all available.",
                ],
              },
            ],
            [
              {
                icon: "check",
                title: "All TV Types Accepted",
                body: ["From heavy CRT sets to modern flat screens, we recycle CRT, LCD, LED, and plasma TVs."],
              },
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: ["Recycle Technologies has had an established recycling process in place since 1993."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:10848",
      heading: "Local Minnesota Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Minnesota regulates the recycling and disposal of televisions and other video display devices under the Minnesota Electronics Recycling Act. CRT televisions and monitors cannot be placed in mixed municipal solid waste, and Minnesota requires covered electronics to be managed through appropriate recycling channels.",
            "Requirements and collection options can vary by location, so confirm current television disposal and recycling requirements with the Minnesota Pollution Control Agency (MPCA) and your local city or county solid waste authority before publishing.",
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
        q: "Can I throw my old TV in the trash in Minnesota?",
        a: "No. TVs contain materials like lead, cadmium, and mercury that shouldn't go to a landfill. Recycling is the safe and responsible option.",
      },
      {
        q: "What types of TVs do you accept?",
        a: "Recycle Technologies accepts CRT, LCD, LED, and plasma televisions, including tube sets, console-style units, and large-format plasma TVs. Non-working, damaged, or outdated TVs are welcome, and computer monitors and rear-projection sets are also accepted.",
      },
      {
        q: "Is there a fee to drop off a TV at the Blaine facility?",
        a: "Individuals can bring televisions to the Blaine location during business hours, where a team member logs your materials at the rear loading area. Call (763) 559-5130 to confirm any drop-off fees before you bring in a TV.",
      },
      {
        q: "Can my business schedule a pickup for TVs, or is that only for drop-off?",
        a: "Yes. Businesses, property managers, hotels, schools, and facilities can schedule a commercial pickup for televisions, and Recycle Technologies can coordinate pickup for larger quantities. Scheduled pickup is exclusive to commercial customers, while individuals can drop TVs off at the Blaine facility.",
      },
      {
        q: "What if I don't live near Blaine?",
        a: "The nationwide Mail-In Program lets you ship electronics from anywhere in the country. Because TVs are large and heavy, call (763) 559-5130 ahead to confirm mail-in options for your set.",
      },
      {
        q: "Do you offer data destruction if my TV is part of a larger electronics cleanout?",
        a: "Recycle Technologies handles television recycling through drop-off, commercial pickup, and the Mail-In Program, with TVs sorted, dismantled, and recovered for recycling. Call (763) 559-5130 to ask about data destruction as part of a larger electronics cleanout.",
      },
    ],
  },
  after: [
    {
      figma: "7125:10880",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronic Recycling", href: href('/minnesota-recycling/electronic-recycling/') },
            { label: "Battery Recycling", href: href('/minnesota-recycling/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/minnesota-recycling/light-bulb-recycling/') },
            { label: "Ballast Recycling", href: href('/minnesota-recycling/ballast-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Television Recycling in Minnesota",
    body: [
      "Drop off TVs at the Blaine facility during business hours, schedule a commercial pickup if you're a business, or start a shipment through the Mail-In Program.",
    ],
    line: "Get a Quote | Schedule Television Recycling in Minnesota | Call (763) 559-5130",
    primary: QUOTE,
    secondary: tel("Call: (763) 559-5130", "+17635595130"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 5 of 6. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
