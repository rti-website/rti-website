import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Ballast Recycling in Minnesota — /minnesota-recycling/ballast-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7121:7989, phone 7121:8423 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_BALLAST_RECYCLING: LocalPage = {
  url: href('/minnesota-recycling/ballast-recycling/'),
  figma: { board: "7121:7989", phone: "7121:8423" },
  seo: {
    title: "Ballast Recycling in Minnesota | Recycle Technologies",
    description: "Lighting ballasts can contain hazardous components, including PCB- and DEHP-containing capacitors, and they don't belong in the trash.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Ballast Recycling in Minnesota",
    h1: "Ballast Recycling in Minnesota",
    body: [
      "Lighting ballasts can contain hazardous components, including PCB- and DEHP-containing capacitors, and they don't belong in the trash. Recycle Technologies handles ballast recycling at its Blaine facility, giving Minnesota businesses and residents a documented way to retire old ballasts.",
      "Individuals can drop ballasts off at the Blaine location or order a ballast recycling kit through the Mail-In Program, and businesses can schedule commercial pickup. Because handling rules can vary, we recommend confirming requirements with your local authorities before disposal.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7121:8054",
      heading: "Ballast Recycling Services in Minnesota",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts all types of ballasts, including PCB, non-PCB, magnetic, and electronic. Ballasts can enter the process through a drop-off at the Blaine facility, the nationwide Mail-In Program, or a scheduled commercial pickup for businesses. If a trip to Blaine isn't convenient, you can order a ballast recycling kit and ship your ballasts in.",
          ],
        },
        {
          kind: "card",
          title: "Blaine Is Our Minnesota Recycling Facility",
          body: [
            "Recycle Technologies handles ballast recycling at its Blaine, Minnesota facility. Individuals can bring ballasts to the facility, while businesses can schedule a commercial pickup. Recycle Technologies has served the Midwest since 1993 and operates licensed facilities in Minnesota and Wisconsin.",
          ],
        },
      ],
    },
    {
      figma: "7121:8066",
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
              value: "Individuals and businesses can bring ballasts to the Blaine location.",
            },
            {
              label: "Commercial Pickup",
              value: "Available for businesses; scheduled pickup is exclusive to commercial customers.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies Mail-In Program using a ballast recycling kit.",
            },
          ],
        },
      ],
    },
    {
      figma: "7121:8085",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a wide range of lighting ballasts at its Blaine facility."],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Non-PCB Ballasts",
                body: [
                  "Ballasts that do not contain PCBs, including those shipped in through the Mail-In Program.",
                ],
              },
              {
                title: "PCB Ballasts",
                body: [
                  "Older ballasts that contain PCB-containing capacitors. Call the Blaine facility before dropping off or shipping.",
                ],
              },
            ],
            [
              {
                title: "Magnetic Ballasts",
                body: ["Traditional magnetic lighting ballasts from older fixtures."],
              },
              {
                title: "Electronic Ballasts",
                body: [
                  "Electronic lighting ballasts from newer fixtures.",
                  "If you're not sure whether a specific ballast qualifies, call the Blaine facility before scheduling a pickup or mail-in shipment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:8106",
      heading: "Ballast Recycling for Minnesota Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Electrical contractors, facility managers, property managers, and businesses upgrading their lighting can schedule a commercial pickup for ballasts. This is a business service, not a residential option. Businesses can also order the ballast recycling kit, which includes a durable collection container and a prepaid shipping label. When processing is complete, we issue a Certificate of Recycling that verifies proper disposal.",
          ],
        },
      ],
    },
    {
      figma: "7121:8111",
      heading: "Ballast Recycling for Minnesota Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring ballasts to the Blaine location. If Blaine isn't convenient, the nationwide Mail-In Program lets you ship non-PCB ballasts from anywhere in the country using the ballast recycling kit. Scheduled pickup is available to commercial customers only. If you have older PCB ballasts, please call our team before transporting or shipping them.",
          ],
        },
      ],
    },
    {
      figma: "7121:8116",
      heading: "How Ballast Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Drop ballasts off at the Blaine facility, use the Mail-In Program with a PCB ballast recycling kit, or, for businesses, schedule a commercial pickup.",
                ],
              },
              {
                title: "Packaging",
                body: [
                  "Each mail-in kit includes a collection container and a prepaid shipping label. Pack your ballasts, seal the container securely, and send it in.",
                ],
              },
              {
                title: "Processing",
                body: [
                  "Ballasts are sorted into categories, typically magnetic or electronic, and dismantled to separate their materials.",
                ],
              },
            ],
            [
              {
                title: "Separation",
                body: [
                  "PCB- and DEHP-containing capacitors are removed from the ballast cover materials. Non-hazardous materials such as copper and steel are separated for reclamation.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Hazardous capacitors are sent to an EPA-approved incineration facility via a certified hazardous waste hauler, which eliminates generator liability. Copper, steel, and other recoverable materials are directed to recycling, and a Certificate of Recycling is issued when processing is complete.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:8138",
      heading: "Why Recycle Technologies for Ballast Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "check",
                title: "All Ballast Types Accepted",
                body: ["We take PCB, non-PCB, electronic, and magnetic ballasts."],
              },
              {
                icon: "lock",
                title: "Safe Handling of Hazardous Components",
                body: [
                  "PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility through a certified waste transporter.",
                ],
              },
              {
                icon: "shield",
                title: "Certificate of Recycling",
                body: ["Documentation for every completed job to support your compliance needs."],
              },
            ],
            [
              {
                icon: "mail",
                title: "Local and Nationwide Recycling Options",
                body: [
                  "Local drop-off, commercial pickup, and the nationwide Mail-In Program are all available.",
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
      figma: "7121:8160",
      heading: "Local Minnesota Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Older ballasts, especially magnetic ones, may contain PCB-containing capacitors, which are regulated under federal rules, and hazardous components must be incinerated at approved facilities. Requirements can differ depending on whether you're a business or an individual, how many ballasts you handle, and whether they contain PCBs. Please confirm current requirements with your local authorities, such as your county solid waste office or the Minnesota Pollution Control Agency, before disposing of ballasts.",
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
        q: "Can I throw old ballasts in the trash in Minnesota?",
        a: "No. Ballasts can contain hazardous components, so they should be recycled. Confirm requirements with your local authorities and contact Recycle Technologies for guidance.",
      },
      {
        q: "What types of ballasts do you accept?",
        a: "Recycle Technologies accepts all types of ballasts, including PCB, non-PCB, magnetic, and electronic. For older PCB ballasts, call the Blaine facility at (763) 559-5130 before dropping off or shipping.",
      },
      {
        q: "Can I mail in ballasts for recycling?",
        a: "Yes. The nationwide Mail-In Program lets you ship non-PCB ballasts from anywhere in the country using a ballast recycling kit, which includes a collection container and a prepaid shipping label. If you have older PCB ballasts, call our team at (763) 559-5130 before shipping them.",
      },
      {
        q: "How many ballasts fit in a mail-in kit?",
        a: "Each mail-in kit includes a durable collection container and a prepaid shipping label. Contact Recycle Technologies at (763) 559-5130 to confirm how many ballasts fit in a kit.",
      },
      {
        q: "Can individuals drop off ballasts at your facility?",
        a: "Yes. Individuals can bring ballasts to the Blaine facility at 1525 99th Ln NE, Blaine, Minnesota 55449. If you have older PCB ballasts, please call our team before transporting them.",
      },
      {
        q: "Can my business schedule a pickup for ballasts?",
        a: "Yes. Electrical contractors, facility managers, property managers, and businesses upgrading their lighting can schedule a commercial pickup for ballasts. Scheduled pickup is exclusive to commercial customers.",
      },
      {
        q: "Do I get documentation after my ballasts are recycled?",
        a: "Yes. When processing is complete, Recycle Technologies issues a Certificate of Recycling that verifies proper disposal.",
      },
      {
        q: "What happens to the hazardous parts of a ballast?",
        a: "PCB- and DEHP-containing capacitors are removed and sent to an EPA-approved incineration facility via a certified hazardous waste hauler. Copper, steel, and other recoverable materials are separated and directed to recycling.",
      },
    ],
  },
  after: [
    {
      figma: "7121:8197",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Light Bulb Recycling", href: href('/minnesota-recycling/light-bulb-recycling/') },
            { label: "Battery Recycling", href: href('/minnesota-recycling/battery-recycling/') },
            { label: "Electronic Recycling", href: href('/minnesota-recycling/electronic-recycling/') },
            { label: "Television Recycling", href: href('/tv-recycling-in-minnesota/') },
            { label: "Airbag Recycling", href: href('/minnesota-recycling/airbag-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Ballast Recycling in Minnesota",
    body: [
      "Drop off ballasts at the Blaine facility during business hours, schedule a commercial pickup if you're a business, or order a kit through the Mail-In Program.",
    ],
    line: "Get a Quote | Schedule Ballast Recycling in Minnesota | Call (763) 559-5130",
    primary: QUOTE,
    secondary: tel("Call: (763) 559-5130", "+17635595130"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 7 of 8. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
