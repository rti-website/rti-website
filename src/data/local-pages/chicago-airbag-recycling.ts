import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Airbag Recycling in Chicago, Illinois — /airbag-recycling-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7125:11405, phone 7125:11835 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_AIRBAG_RECYCLING: LocalPage = {
  url: href('/airbag-recycling-chicago/'),
  figma: { board: "7125:11405", phone: "7125:11835" },
  seo: {
    title: "Airbag Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides airbag recycling services to customers in the Chicago area.",
  },
  schema: { service: "Airbag Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Airbag Recycling in Chicago, Illinois",
    h1: "Airbag Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides airbag recycling services to customers in the Chicago area.",
      "Recycle Technologies does not operate a recycling facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup, while customers outside the company's local facility service area can use the mail-in program.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7125:11470",
      heading: "Airbag Recycling Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has provided recycling services since 1993 and operates licensed facilities in Minnesota and Wisconsin.",
            "In Chicago, the company serves customers through expanded operations rather than a licensed facility located in the city itself.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
            "Chicago businesses can arrange scheduled commercial pickup for deployed and undeployed airbags, inflators, and modules. Materials are then transported to the appropriate licensed facility for processing.",
            "Customers who need a mail-in option can use Recycle Technologies' dedicated Airbag Recycling Kit for eligible shipments.",
          ],
        },
      ],
    },
    {
      figma: "7125:11485",
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
            { label: "Mail-in option", value: "Dedicated Airbag Recycling Kit" },
          ],
        },
      ],
    },
    {
      figma: "7125:11504",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts the following types of airbags and related components:"],
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
                  "Airbag inflators and modules separate from the airbag unit itself.",
                  "Both deployed and undeployed airbags are accepted. Undeployed units require DOT Hazmat-compliant packaging and labeling before shipment, and Recycle Technologies can guide you through the compliant process.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:11525",
      heading: "Airbag Recycling for Chicago Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Auto repair shops, dealerships, vehicle recyclers, dismantlers, and fleet operators in the Chicago area can arrange airbag recycling as part of regular vehicle service and dismantling work.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "This includes:",
                body: [
                  "•  Deployed and undeployed airbags removed during repairs or vehicle end-of-life processing",
                  "•  Standalone inflators and modules",
                  "•  Larger volumes of airbag waste generated on a recurring basis",
                  "Illinois law and DOT Hazmat regulations govern the handling and disposal of undeployed airbags, making a documented recycling partner relevant for both compliance and safety.",
                  "To arrange service, businesses can request a quote or schedule a commercial pickup.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:11541",
      heading: "Airbag Recycling for Chicago Customers Through the Mail-In Program",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Customers who cannot use local commercial pickup can use Recycle Technologies' dedicated Airbag Recycling Kit. The mail-in program allows eligible airbag materials to be packaged using the provided kit and shipped to Recycle Technologies for processing with a prepaid return label.",
          ],
        },
      ],
    },
    {
      figma: "7125:11546",
      heading: "How Airbag Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Get in Touch",
                body: ["The process starts with a call or a request form describing what you need to recycle."],
              },
              {
                title: "Commercial Pickup or Mail-In",
                body: [
                  "Chicago businesses can schedule commercial pickup. Customers using the mail-in program can order a dedicated Airbag Recycling Kit and follow the provided packaging and shipping instructions.",
                ],
              },
            ],
            [
              {
                title: "Certified Processing",
                body: [
                  "Airbags are transported to a licensed airbag waste collection facility, where they are processed according to their type and condition.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Recycle Technologies provides recycling documentation, including a Certificate of Recycling, to support customers that need records for compliance or internal reporting.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:11564",
      heading: "Why Recycle Technologies for Airbag Recycling",
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
                icon: "lock",
                title: "Specialized Handling",
                body: [
                  "Undeployed airbags containing explosive chemicals such as sodium azide require DOT Hazmat-compliant packaging and labeling. Recycle Technologies can guide customers through the required process.",
                ],
              },
              {
                icon: "truck",
                title: "Commercial Pickup",
                body: ["Chicago businesses can schedule commercial pickup for airbag recycling."],
              },
            ],
            [
              {
                icon: "mail",
                title: "Airbag Recycling Kit",
                body: [
                  "Customers outside the company's local facility service area can use the dedicated Airbag Recycling Kit and mail their eligible materials to Recycle Technologies for processing.",
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
      figma: "7125:11586",
      heading: "Local Chicago Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Illinois law and federal DOT Hazmat regulations govern the disposal of undeployed airbags and related components.",
            "Chicago businesses should confirm current local rules with the City of Chicago and applicable federal requirements before disposing of airbags, as specific requirements can change.",
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
        q: "Does Recycle Technologies accept both deployed and undeployed airbags?",
        a: "Yes, both deployed and undeployed airbags are accepted.",
      },
      {
        q: "Who uses this service?",
        a: "Auto repair shops, dealerships, vehicle recyclers, dismantlers, and fleet operators in the Chicago area use scheduled commercial pickup for airbag recycling. Customers who cannot use local commercial pickup can use the dedicated Airbag Recycling Kit.",
      },
      {
        q: "Can I recycle airbags through the mail-in program?",
        a: "Yes. Customers who cannot use local commercial pickup can order the dedicated Airbag Recycling Kit, package eligible airbag materials using the provided kit, and ship them to Recycle Technologies with a prepaid return label. Undeployed units require DOT Hazmat-compliant packaging and labeling, so call (800) 969-5166 to confirm packaging requirements for your materials.",
      },
      {
        q: "Do I get documentation after my airbags are recycled?",
        a: "Yes. Recycle Technologies provides recycling documentation, including a Certificate of Recycling, to support customers that need records for compliance or internal reporting.",
      },
      {
        q: "Is pickup available for individuals as well as businesses?",
        a: "In Chicago, pickup is offered as scheduled commercial pickup for businesses. Customers who cannot use commercial pickup can use the dedicated Airbag Recycling Kit, and you can call (800) 969-5166 to confirm the right option for you.",
      },
    ],
  },
  after: [
    {
      figma: "7125:11615",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Electronics Recycling Television Recycling Light Bulb Recycling Battery Recycling Ballast Recycling Hard Drive Destruction All Locations",
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Airbag Recycling in Chicago",
    body: [
      "Recycle Technologies serves Chicago businesses through scheduled commercial pickup and also offers a dedicated Airbag Recycling Kit for eligible mail-in recycling.",
      "Request a quote, schedule a commercial pickup, or order an Airbag Recycling Kit. Contact Recycle Technologies to confirm current options and packaging requirements for your airbag materials.",
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
