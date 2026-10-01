import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Ballast Recycling in Wisconsin — /wisconsin-recycling/ballast-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7118:4248, phone (none sent) (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_BALLAST_RECYCLING: LocalPage = {
  url: href('/wisconsin-recycling/ballast-recycling/'),
  figma: { board: "7118:4248", phone: "" },
  seo: {
    title: "Ballast Recycling in Wisconsin | Recycle Technologies",
    description: "Old lighting ballasts can contain hazardous parts, including capacitors with PCBs and DEHP, so they don't belong in the garbage.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Ballast Recycling in Wisconsin",
    h1: "Ballast Recycling in Wisconsin",
    body: [
      "Old lighting ballasts can contain hazardous parts, including capacitors with PCBs and DEHP, so they don't belong in the garbage. Recycle Technologies recycles ballasts at its New Berlin facility, giving Wisconsin businesses and residents a documented way to retire them.",
      "Individuals can bring ballasts to New Berlin or order a ballast recycling kit through the Mail-In Program, and businesses can book a commercial pickup. Handling rules can vary, so we suggest checking requirements with your local authorities before you dispose of a ballast.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7118:4313",
      heading: "Ballast Recycling Services in Wisconsin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "We accept every ballast type, including PCB, non-PCB, magnetic, and electronic. Ballasts can reach us through a drop-off at our New Berlin facility, the nationwide Mail-In Program, or a scheduled commercial pickup for businesses. If the drive to New Berlin isn't practical, order a ballast recycling kit and ship your ballasts to us.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is Our Wisconsin Recycling Facility",
          body: [
            "Ballast recycling in Wisconsin takes place at our New Berlin facility. Individuals can bring ballasts in person, and businesses can arrange a commercial pickup. Recycle Technologies has served the Midwest since 1993 and operates licensed facilities in Wisconsin and Minnesota.",
          ],
        },
      ],
    },
    {
      figma: "7118:4325",
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
              value: "Individuals and businesses are welcome to bring ballasts to the New Berlin location.",
            },
            {
              label: "Commercial Pickup",
              value: "Offered to businesses only; scheduled pickup is exclusive to commercial customers.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies Mail-In Program with a ballast recycling kit.",
            },
          ],
        },
      ],
    },
    {
      figma: "7118:4344",
      heading: "What We Accept",
      grey: false,
      blocks: [
        { kind: "text", body: ["Our New Berlin facility takes a broad range of lighting ballasts."] },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Non-PCB Ballasts",
                body: ["Ballasts without PCBs, including those sent in through the Mail-In Program."],
              },
              {
                title: "PCB Ballasts",
                body: [
                  "Older ballasts with PCB-containing capacitors. Call the New Berlin facility before you drop off or ship them.",
                ],
              },
            ],
            [
              {
                title: "Magnetic Ballasts",
                body: ["Traditional magnetic ballasts taken from older fixtures."],
              },
              {
                title: "Electronic Ballasts",
                body: [
                  "Electronic ballasts from newer lighting fixtures.",
                  "Not sure whether a particular ballast qualifies? Call the New Berlin facility before you schedule a pickup or mail-in shipment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:4365",
      heading: "Ballast Recycling for Wisconsin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Electrical contractors, facility managers, property managers, and any business upgrading its lighting can book a commercial pickup for ballasts. It's a business-only service, not a residential one. Businesses can also order the ballast recycling kit, which comes with a sturdy collection container and a prepaid shipping label. Once processing is done, we issue a Certificate of Recycling confirming proper disposal.",
          ],
        },
      ],
    },
    {
      figma: "7118:4370",
      heading: "Ballast Recycling for Wisconsin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "If you're an individual, you can bring ballasts to our New Berlin location. If that's inconvenient, the nationwide Mail-In Program lets you ship non-PCB ballasts from anywhere in the country with the ballast recycling kit. Scheduled pickup is limited to commercial customers. If you have older PCB ballasts, please call our team before you transport or ship them.",
          ],
        },
      ],
    },
    {
      figma: "7118:4375",
      heading: "How Ballast Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Intake",
                body: [
                  "Bring ballasts to New Berlin, send them through the Mail-In Program with a ballast recycling kit, or, if you're a business, book a commercial pickup.",
                ],
              },
              {
                title: "Packing",
                body: [
                  "Every mail-in kit includes a collection container and a prepaid shipping label. Fill the container, seal it securely, and send it in.",
                ],
              },
              {
                title: "Processing",
                body: [
                  "Ballasts are sorted by category, typically magnetic or electronic, then taken apart so their materials can be separated.",
                ],
              },
            ],
            [
              {
                title: "Separation",
                body: [
                  "Capacitors containing PCBs and DEHP are pulled from the ballast casing. Non-hazardous materials such as copper and steel are set aside for reclamation.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Hazardous capacitors go to an EPA-approved incineration facility by way of a certified hazardous waste hauler, which removes generator liability. Copper, steel, and other recoverable materials are recycled, and a Certificate of Recycling is issued when processing wraps up.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:4397",
      heading: "Why Choose Recycle Technologies for Ballast Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "check",
                title: "Every Ballast Type Welcome",
                body: ["PCB, non-PCB, electronic, and magnetic ballasts are all accepted."],
              },
              {
                icon: "lock",
                title: "Careful Handling of Hazardous Parts",
                body: [
                  "Capacitors with PCBs and DEHP are removed and sent to an EPA-approved incineration facility through a certified waste transporter.",
                ],
              },
              {
                icon: "shield",
                title: "Certificate of Recycling",
                body: ["Each completed job comes with documentation to support your compliance needs."],
              },
            ],
            [
              {
                icon: "mail",
                title: "Options for Every Situation",
                body: [
                  "Local drop-off, commercial pickup, and the nationwide Mail-In Program are all available.",
                ],
              },
              {
                icon: "check",
                title: "Three Decades in the Business",
                body: ["We have followed an established recycling process since 1993."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:4419",
      heading: "Local Wisconsin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Older ballasts, especially magnetic ones, may contain capacitors with PCBs, which are regulated under federal rules, and hazardous components must be incinerated at approved facilities. The requirements that apply can vary with whether you're a business or an individual, how many ballasts you have, and whether they contain PCBs. Please confirm current requirements with your local authorities, such as your county solid waste office or the Wisconsin Department of Natural Resources (DNR), before disposing of ballasts.",
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
        q: "Is it okay to put old ballasts in the trash in Wisconsin?",
        a: "No. Ballasts can contain hazardous components, so they should be recycled. Check requirements with your local authorities and contact Recycle Technologies for guidance.",
      },
      {
        q: "Which ballasts do you accept?",
        a: "We accept every ballast type, including PCB, non-PCB, magnetic, and electronic ballasts. If you have older PCB ballasts, call the New Berlin facility at (262) 798-3040 before you drop off or ship them.",
      },
      {
        q: "Can I send ballasts in by mail?",
        a: "Yes. The nationwide Mail-In Program lets you ship non-PCB ballasts from anywhere in the country with a ballast recycling kit, which includes a collection container and a prepaid shipping label. If you have older PCB ballasts, call our team before you ship them.",
      },
      {
        q: "How many ballasts fit in a mail-in kit?",
        a: "Each ballast recycling kit comes with a sturdy collection container and a prepaid shipping label; fill the container, seal it securely, and send it in. Call Recycle Technologies at (262) 798-3040 to confirm how many ballasts a kit will hold.",
      },
      {
        q: "Can individuals bring ballasts to your facility?",
        a: "Yes. Individuals and businesses are welcome to bring ballasts to our New Berlin facility at 2815 South 171st Street, New Berlin, WI 53151.",
      },
      {
        q: "Can my business book a pickup for ballasts?",
        a: "Yes. Electrical contractors, facility managers, property managers, and any business upgrading its lighting can book a commercial pickup for ballasts. Scheduled pickup is exclusive to commercial customers.",
      },
      {
        q: "Will I receive paperwork once my ballasts are recycled?",
        a: "Yes. Once processing is done, we issue a Certificate of Recycling confirming proper disposal.",
      },
      {
        q: "What happens to the hazardous parts of a ballast?",
        a: "Capacitors containing PCBs and DEHP are removed from the ballast casing and sent to an EPA-approved incineration facility through a certified hazardous waste hauler, which removes generator liability. Copper, steel, and other recoverable materials are recycled.",
      },
    ],
  },
  after: [
    {
      figma: "7118:4452",
      heading: "Related Recycling Services",
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Light Bulb Recycling", href: href('/wisconsin-recycling/light-bulb-recycling/') },
            { label: "Battery Recycling", href: href('/wisconsin-recycling/battery-recycling/') },
            { label: "Electronic Recycling", href: href('/wisconsin-recycling/electronic-recycling/') },
            { label: "Television Recycling", href: href('/tv-recycling-in-wisconsin/') },
            { label: "Airbag Recycling", href: href('/wisconsin-recycling/airbag-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Ballast Recycling in Wisconsin",
    body: [
      "Drop off ballasts at the New Berlin facility during business hours, schedule a commercial pickup if you're a business, or order a kit through the Mail-In Program.",
    ],
    line: "Schedule Ballast Recycling in Wisconsin | Call (262) 798-3040",
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 7 of 8. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
    "No phone frame link was sent for this page (the second link repeated the board); the phone layout follows the other frames.",
  ],
}
