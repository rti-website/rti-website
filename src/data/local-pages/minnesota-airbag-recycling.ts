import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Airbag Recycling in Minnesota — /minnesota-recycling/airbag-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7121:7268, phone 7121:7693 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_AIRBAG_RECYCLING: LocalPage = {
  url: href('/minnesota-recycling/airbag-recycling/'),
  figma: { board: "7121:7268", phone: "7121:7693" },
  seo: {
    title: "Airbag Recycling in Minnesota | Recycle Technologies",
    description: "Airbags, especially undeployed ones, contain explosive chemicals such as sodium azide and can’t simply go in the trash.",
  },
  schema: { service: "Airbag Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Airbag Recycling in Minnesota",
    h1: "Airbag Recycling in Minnesota",
    body: [
      "Airbags, especially undeployed ones, contain explosive chemicals such as sodium azide and can’t simply go in the trash. Recycle Technologies provides certified airbag disposal for deployed and undeployed units at its Blaine facility, giving Minnesota auto shops, dealerships, fleets, and individuals a documented way to get airbags recycled safely.",
      "Individuals and businesses can drop off airbags at the Blaine location, schedule commercial pickup, and anyone can use the nationwide Mail-In Program. Because handling rules can vary, we recommend confirming requirements with your local authorities before disposal.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7121:7333",
      heading: "Airbag Recycling Services in Minnesota",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Blaine Is Our Minnesota Recycling Facility",
                body: [
                  "Recycle Technologies handles airbag recycling at its Blaine, Minnesota facility, a licensed airbag waste collection facility. Individuals and businesses can bring airbags to the facility, while businesses can also schedule a commercial pickup. Recycle Technologies has served the Midwest since 1993 and operates licensed facilities in Minnesota and Wisconsin.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:7343",
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
              value: "Individuals and businesses can bring airbags to the Blaine location.",
            },
            {
              label: "Commercial Pickup",
              value: "Available for businesses; scheduled pickup is exclusive to commercial customers.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies Mail-In Program using an airbag recycling kit.",
            },
          ],
        },
      ],
    },
    {
      figma: "7121:7362",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts both deployed and undeployed airbags, along with related components.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Driver-Side and Passenger Airbags",
                body: ["Standard front airbags removed from vehicles."],
              },
              {
                title: "Side-Impact and Curtain Airbags",
                body: ["Airbags deployed from side panels or roof rails."],
              },
            ],
            [
              {
                title: "Knee and Seat Airbags",
                body: ["Additional airbag types used in modern vehicle safety systems."],
              },
              {
                title: "Standalone Inflators and Modules",
                body: [
                  "Airbag inflators and modules that are separate from the airbag unit itself.",
                  "Undeployed units require packaging and labeling that meet DOT Hazmat standards before shipment, and our team can walk you through that process. If you're not sure whether a specific airbag or component qualifies, call the Blaine facility before scheduling a pickup or mail-in shipment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:7383",
      heading: "Airbag Recycling for Minnesota Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Auto repair shops, body shops, dealerships, vehicle dismantlers, and fleet operators can schedule a commercial pickup for airbags. This is a business service, not a residential option. Working with a recycler that treats airbags as a specialized service helps protect your shop from liability and keeps hazardous components out of general waste streams. Every completed disposal comes with a certificate of recycling for your records.",
          ],
        },
      ],
    },
    {
      figma: "7121:7388",
      heading: "Airbag Recycling for Minnesota Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring airbags to the Blaine facility. If Blaine isn't convenient, the nationwide Mail-In Program lets you ship airbags from anywhere in the country using an airbag recycling kit. Scheduled pickup is available to commercial customers only. Undeployed airbags are hazardous, so please confirm requirements with your local authorities and contact our team with any questions before transporting or shipping.",
          ],
        },
      ],
    },
    {
      figma: "7121:7393",
      heading: "How Airbag Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Get in Touch",
                body: ["Call or submit a request form describing what you need to recycle."],
              },
              {
                title: "Choose Drop-Off, Pickup, or Mail-In",
                body: [
                  "Bring airbags to the Blaine facility, schedule a commercial pickup if you're a business, or order an airbag recycling kit and ship them in.",
                ],
              },
            ],
            [
              {
                title: "Certified Disposal",
                body: [
                  "Airbags are handled at our licensed airbag waste collection facility and processed according to their type and condition.",
                ],
              },
              {
                title: "Compliance Documentation",
                body: ["Once disposal is complete, we issue a certificate of recycling for your records."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:7411",
      heading: "Why Recycle Technologies for Airbag Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "Certified Disposal",
                body: ["Certified handling of deployed and undeployed airbags at a licensed facility."],
              },
              {
                icon: "shield",
                title: "Certificate of Recycling",
                body: ["Documentation for every completed disposal to support your compliance needs."],
              },
              {
                icon: "truck",
                title: "Drop-Off, Pickup, and Mail-In Options",
                body: [
                  "Drop-off for individuals and businesses, commercial pickup, and a nationwide Mail-In Program.",
                ],
              },
            ],
            [
              {
                icon: "shield",
                title: "Certified Standards",
                body: [
                  "Recycle Technologies holds R2v3 certification at select facilities, along with RIOS and NAID AAA certifications.",
                ],
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
      figma: "7121:7433",
      heading: "Local Minnesota Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Airbags contain hazardous components such as sodium azide, and undeployed units must be packaged and shipped according to DOT Hazmat standards. Requirements can differ depending on whether you're a business or an individual, how many airbags you handle, and whether they are deployed. Please confirm current requirements with your local authorities, such as your county solid waste office or the Minnesota Pollution Control Agency, before disposing of airbags.",
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
        q: "Can I throw an airbag in the trash in Minnesota?",
        a: "No. Airbags contain hazardous materials, and undeployed ones in particular require specialized handling. Confirm requirements with your local authorities and contact Recycle Technologies for guidance.",
      },
      {
        q: "Do you accept both deployed and undeployed airbags?",
        a: "Yes. Recycle Technologies accepts both deployed and undeployed airbags, along with related components such as side-impact, curtain, knee, and seat airbags and standalone inflators and modules. If you're not sure whether a specific airbag or component qualifies, call the Blaine facility at (763) 559-5130.",
      },
      {
        q: "Can individuals drop off airbags at your facility?",
        a: "Yes. Individuals and businesses can bring airbags to the Blaine facility at 1525 99th Ln NE, Blaine, Minnesota 55449. Because undeployed airbags are hazardous, confirm requirements with your local authorities and contact our team before transporting them.",
      },
      {
        q: "Can I mail in airbags for recycling?",
        a: "Yes. The nationwide Mail-In Program lets you ship airbags from anywhere in the country using an airbag recycling kit. Undeployed units require packaging and labeling that meet DOT Hazmat standards before shipment, and our team can walk you through that process.",
      },
      {
        q: "Do I get documentation after my airbags are recycled?",
        a: "Yes. Once disposal is complete, Recycle Technologies issues a certificate of recycling for your records.",
      },
      {
        q: "Is pickup available for individuals as well as businesses?",
        a: "No. Scheduled pickup is exclusive to commercial customers. Individuals can drop off airbags at the Blaine facility or use the nationwide Mail-In Program.",
      },
      {
        q: "Do I need special packaging for undeployed airbags?",
        a: "Yes. Undeployed units require packaging and labeling that meet DOT Hazmat standards before shipment, and our team can walk you through that process. Call (763) 559-5130 with any questions before you ship.",
      },
    ],
  },
  after: [
    {
      figma: "7121:7467",
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
            { label: "Television Recycling", href: href('/tv-recycling-in-minnesota/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Airbag Recycling in Minnesota",
    body: [
      "Drop off airbags at the Blaine facility, schedule a commercial pickup if you're a business, or order a kit through the Mail-In Program.",
    ],
    line: "Get a Quote | Schedule Airbag Recycling in Minnesota | Call (763) 559-5130",
    primary: QUOTE,
    secondary: tel("Call: (763) 559-5130", "+17635595130"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 6 of 7. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
