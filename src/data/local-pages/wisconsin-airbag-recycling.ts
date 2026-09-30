import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Airbag Recycling in Wisconsin — /wisconsin-recycling/airbag-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7118:3531, phone 7118:3954 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_AIRBAG_RECYCLING: LocalPage = {
  url: href('/wisconsin-recycling/airbag-recycling/'),
  figma: { board: "7118:3531", phone: "7118:3954" },
  seo: {
    title: "Airbag Recycling in Wisconsin | Recycle Technologies",
    description: "Undeployed airbags hold explosive chemicals like sodium azide, so they can't be tossed in the garbage.",
  },
  schema: { service: "Airbag Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Airbag Recycling in Wisconsin",
    h1: "Airbag Recycling in Wisconsin",
    body: [
      "Undeployed airbags hold explosive chemicals like sodium azide, so they can't be tossed in the garbage. Recycle Technologies offers certified disposal of deployed and undeployed airbags at its New Berlin facility, giving Wisconsin repair shops, dealerships, fleets, and individual drivers a documented, safe way to get rid of them.",
      "Both individuals and businesses can drop airbags off in New Berlin; businesses can book a commercial pickup, and anyone can use the nationwide Mail-In Program. Handling rules can differ, so we suggest checking requirements with your local authorities before you dispose of an airbag.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7118:3596",
      heading: "Airbag Recycling Services in Wisconsin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "We accept airbags whether they have deployed or not. They can reach us three ways: a drop-off at our New Berlin facility (open to individuals and businesses), a scheduled commercial pickup for business customers, or the nationwide Mail-In Program. If driving to New Berlin doesn't work for you, order an airbag recycling kit and send your airbags to us.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is Our Wisconsin Recycling Facility",
          body: [
            "Airbag recycling in Wisconsin takes place at our New Berlin facility, which operates as a licensed airbag waste collection facility. Individuals and businesses can bring airbags in person, and businesses also have the option of a commercial pickup. Recycle Technologies has been serving the Midwest since 1993 and runs licensed facilities in Wisconsin and Minnesota.",
          ],
        },
      ],
    },
    {
      figma: "7118:3608",
      heading: "Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "2815 South 171st Street, New Berlin, WI 53151" },
            { label: "Phone", value: "+1-262-798-3040" },
            {
              label: "Drop-Off",
              value: "Individuals and businesses are welcome to bring airbags to the New Berlin location.",
            },
            {
              label: "Commercial Pickup",
              value: "Offered to businesses only; scheduled pickup is exclusive to commercial customers.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies Mail-In Program with an airbag recycling kit.",
            },
          ],
        },
      ],
    },
    {
      figma: "7118:3627",
      heading: "What We Accept",
      grey: false,
      blocks: [
        { kind: "text", body: ["We take both deployed and undeployed airbags, plus related components."] },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Driver-Side and Passenger Airbags",
                body: ["Standard front airbags taken out of vehicles."],
              },
              {
                title: "Side-Impact and Curtain Airbags",
                body: ["Airbags that deploy from door or seat side panels and roof rails."],
              },
            ],
            [
              {
                title: "Knee and Seat Airbags",
                body: ["Other airbag types found in newer vehicle safety systems."],
              },
              {
                title: "Standalone Inflators and Modules",
                body: [
                  "Inflators and modules that come separate from the airbag itself.",
                  "Undeployed units must be packaged and labeled to DOT Hazmat standards before they ship, and our team can walk you through the steps. If you aren't sure whether a particular airbag or component qualifies, call the New Berlin facility before you schedule a pickup or send a mail-in shipment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:3648",
      heading: "Airbag Recycling for Wisconsin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Auto repair shops, body shops, dealerships, dismantlers, and fleet operators can book a commercial pickup for airbags. It's a business-only service, not one for households. Using a recycler that treats airbags as a specialty service reduces liability for your shop and keeps hazardous parts out of general waste. Each completed disposal includes a certificate of recycling for your files.",
          ],
        },
      ],
    },
    {
      figma: "7118:3653",
      heading: "Airbag Recycling for Wisconsin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "If you're an individual, you can bring airbags to our New Berlin facility. If that's not convenient, the nationwide Mail-In Program lets you ship airbags from anywhere in the country using an airbag recycling kit. Scheduled pickup is limited to commercial customers. Because undeployed airbags are hazardous, check requirements with your local authorities and reach out to our team with any questions before you transport or ship one.",
          ],
        },
      ],
    },
    {
      figma: "7118:3658",
      heading: "How Airbag Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Contact Us",
                body: ["Call us or send a request form telling us what you need recycled."],
              },
              {
                title: "Pick Your Option: Drop-Off, Pickup, or Mail-In",
                body: [
                  "Bring airbags to New Berlin, book a commercial pickup if you're a business, or order an airbag recycling kit and ship your airbags to us.",
                ],
              },
            ],
            [
              {
                title: "Certified Disposal",
                body: [
                  "Airbags are received at our licensed airbag waste collection facility and processed according to their type and condition.",
                ],
              },
              {
                title: "Compliance Documentation",
                body: ["When disposal is finished, we issue a certificate of recycling for your records."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:3676",
      heading: "Why Choose Recycle Technologies for Airbag Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "Certified Disposal",
                body: [
                  "Deployed and undeployed airbags are handled with certified processes at a licensed facility.",
                ],
              },
              {
                icon: "shield",
                title: "Certificate of Recycling",
                body: ["Every completed disposal comes with documentation to support your compliance needs."],
              },
              {
                icon: "truck",
                title: "Drop-Off, Pickup, and Mail-In Options",
                body: [
                  "Individuals and businesses can drop off, businesses can book commercial pickup, and the Mail-In Program covers the rest of the country.",
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
                body: ["We have followed an established recycling process since 1993."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:3698",
      heading: "Local Wisconsin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Airbags contain hazardous components such as sodium azide, and undeployed units must be packaged and shipped to DOT Hazmat standards. The rules that apply can vary with whether you're a business or an individual, how many airbags you have, and whether they've deployed. Please confirm current requirements with your local authorities, such as your county solid waste office or the Wisconsin Department of Natural Resources (DNR), before disposing of airbags.",
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
        q: "Is it okay to put an airbag in the trash in Wisconsin?",
        a: "No. Airbags contain hazardous materials, and undeployed ones need specialized handling. Check requirements with your local authorities and contact Recycle Technologies for guidance.",
      },
      {
        q: "Do you take deployed and undeployed airbags?",
        a: "Yes. We accept both deployed and undeployed airbags, including driver-side, passenger, side-impact, curtain, knee, and seat airbags, plus standalone inflators and modules.",
      },
      {
        q: "Can individuals bring airbags to your facility?",
        a: "Yes. Individuals and businesses are welcome to bring airbags to our New Berlin facility at 2815 South 171st Street, New Berlin, WI 53151.",
      },
      {
        q: "Can I send airbags in by mail?",
        a: "Yes. The nationwide Mail-In Program lets you order an airbag recycling kit and ship your airbags to us from anywhere in the country. Undeployed units must be packaged and labeled to DOT Hazmat standards before they ship, and our team can walk you through the steps.",
      },
      {
        q: "Will I receive paperwork once my airbags are recycled?",
        a: "Yes. When disposal is finished, we issue a certificate of recycling for your records.",
      },
      {
        q: "Can individuals schedule a pickup too, or is it just for businesses?",
        a: "It's just for businesses. Scheduled pickup is exclusive to commercial customers, so individuals can drop airbags off at our New Berlin facility or ship them through the nationwide Mail-In Program.",
      },
      {
        q: "Does packaging matter for undeployed airbags?",
        a: "Yes. Undeployed airbags must be packaged and labeled to DOT Hazmat standards before they ship, and our team can walk you through the steps. Call the New Berlin facility at (262) 798-3040 with any questions before you transport or ship one.",
      },
    ],
  },
  after: [
    {
      figma: "7118:3728",
      heading: "Related Recycling Services",
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronic Recycling", href: href('/wisconsin-recycling/electronic-recycling/') },
            { label: "Battery Recycling", href: href('/wisconsin-recycling/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/wisconsin-recycling/light-bulb-recycling/') },
            { label: "Ballast Recycling", href: href('/wisconsin-recycling/ballast-recycling/') },
            { label: "Television Recycling", href: href('/wisconsin-recycling/tv-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Airbag Recycling in Wisconsin",
    body: [
      "Bring airbags to the New Berlin facility, book a commercial pickup if you're a business, or order a kit through the Mail-In Program.",
    ],
    line: "Schedule Airbag Recycling in Wisconsin | Call (262) 798-3040",
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 6 of 7. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
