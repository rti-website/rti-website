import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Television Recycling in Wisconsin — /wisconsin-recycling/tv-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7121:6539, phone 7121:6967 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_TV_RECYCLING: LocalPage = {
  url: href('/wisconsin-recycling/tv-recycling/'),
  figma: { board: "7121:6539", phone: "7121:6967" },
  seo: {
    title: "Television Recycling in Wisconsin | Recycle Technologies",
    description: "A retired TV isn't ordinary trash. Tube-style sets carry lead and cadmium, and many flat panels contain mercury-bearing glass.",
  },
  schema: { service: "TV Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Television Recycling in Wisconsin",
    h1: "Television Recycling in Wisconsin",
    body: [
      "A retired TV isn't ordinary trash. Tube-style sets carry lead and cadmium, and many flat panels contain mercury-bearing glass. Recycle Technologies processes televisions at its New Berlin, Wisconsin facility, so households and companies across the state have a documented, responsible option. Residents can bring sets to our door or ship them through the nationwide Mail-In Program, while businesses can book a commercial pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7121:6603",
      heading: "Television Recycling Services in Wisconsin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Every television we receive is processed at our New Berlin site. Sets reach us in one of three ways: a personal drop-off, a mail-in shipment, or a scheduled pickup for commercial customers.",
          ],
        },
        {
          kind: "card",
          title: "Our Wisconsin Facility in New Berlin",
          body: [
            "Our Wisconsin operation is based in New Berlin, in the Milwaukee metro area. It is one of two licensed Recycle Technologies facilities, alongside our Minnesota site, and it reflects the same recycling standards we have followed since 1993. Individuals can bring TVs in themselves, and companies can arrange pickup.",
          ],
        },
        { kind: "h3", text: "New Berlin Location Details" },
        {
          kind: "cards",
          rows: [
            [
              { title: "Address", body: ["2815 South 171st Street, New Berlin, WI 53151"] },
              { title: "Phone", body: ["+1-262-798-3040"] },
              {
                title: "Drop-Off",
                body: [
                  "Pull into the main lot off South 171st Street during business hours. Staff will point you to the drop-off bay.",
                ],
              },
            ],
            [
              {
                title: "Commercial Pickup",
                body: ["Businesses can schedule a pickup. This option is reserved for commercial accounts."],
              },
              {
                title: "Mail-In",
                body: [
                  "Too far from New Berlin? The nationwide Mail-In Program lets you ship eligible items from anywhere.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:6636",
      heading: "TVs We Accept in Wisconsin",
      grey: true,
      blocks: [
        { kind: "text", body: ["We take most television types at the New Berlin facility."] },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "CRT Televisions",
                body: ["Older tube sets, from small bedroom models to console cabinets."],
              },
              { title: "LCD Televisions", body: ["Flat-panel LCD sets in any screen size."] },
              { title: "LED Televisions", body: ["LED and LED-backlit flat panels."] },
            ],
            [
              { title: "Plasma Televisions", body: ["Plasma sets, including big-screen models."] },
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
      figma: "7121:6661",
      heading: "TV Recycling for Wisconsin Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Offices, property managers, hotels, schools, and other facilities can request a commercial pickup for retired televisions. The service is built for organizations, not households. If you're replacing displays across a building or clearing out a site, we can coordinate pickup for larger volumes.",
          ],
        },
      ],
    },
    {
      figma: "7121:6666",
      heading: "TV Recycling for Wisconsin Residents",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "If you live in or near the Milwaukee, Waukesha, Madison, Green Bay, or Appleton areas, you can bring your TV to New Berlin and staff will guide you to the right bay. For anyone farther away, the Mail-In Program is available nationwide. Televisions are bulky, so call first to check the best way to send yours.",
          ],
        },
      ],
    },
    {
      figma: "7121:6671",
      heading: "How the Recycling Process Works",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Intake",
                body: [
                  "Bring the TV to New Berlin, ship it through the Mail-In Program, or, if you're a business, book a pickup.",
                ],
              },
              {
                title: "Paperwork",
                body: [
                  "Commercial pickups may come with a hazard consignment note recording who collected the items, where from, how many, and where they went.",
                ],
              },
              {
                title: "Sorting",
                body: [
                  "Sets are grouped by technology (CRT, LCD, LED, or plasma) so each gets the correct handling.",
                ],
              },
            ],
            [
              {
                title: "Disassembly",
                body: [
                  "Each TV is taken apart safely, with extra caution for CRT glass because of its lead and cadmium content.",
                ],
              },
              {
                title: "Material Recovery",
                body: [
                  "Glass, plastics, and metals are separated and sent on for recycling instead of landfill, in keeping with our zero-landfill commitment.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:6693",
      heading: "Why Choose Recycle Technologies",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "lock",
                title: "Careful Handling of Hazardous Components",
                body: ["Lead, cadmium, and mercury-containing parts are managed with the care they require."],
              },
              {
                icon: "leaf",
                title: "Nothing Sent to Landfill",
                body: ["Recovered materials go back into the recycling stream."],
              },
              {
                icon: "mail",
                title: "Options for Every Situation",
                body: ["Drop-off, business pickup, and mail-in cover local and out-of-state needs."],
              },
            ],
            [
              {
                icon: "check",
                title: "Every TV Type Welcome",
                body: ["From heavy CRTs to slim flat screens, we handle the full range."],
              },
              {
                icon: "check",
                title: "Three Decades in the Business",
                body: ["We have been recycling in the Midwest since 1993."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7121:6715",
      heading: "Wisconsin TV Disposal Rules",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Wisconsin's electronics recycling law restricts how televisions and other covered electronics can be discarded. Since 2010, these items have been banned from Wisconsin landfills, which means old TVs can't simply go out with the household trash and must go through recycling channels.",
            "Rules and collection programs differ by community, so confirm current television disposal and recycling requirements with the Wisconsin Department of Natural Resources (DNR) and your local city or county solid waste authority before publishing.",
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
        q: "Is it legal to put an old TV in the garbage in Wisconsin?",
        a: "No. Televisions contain lead, cadmium, and mercury, and Wisconsin keeps many electronics out of landfills. Recycling is the correct route.",
      },
      {
        q: "Which kinds of TVs can I bring in?",
        a: "We take most television types, including CRT, LCD, LED, and plasma sets, plus computer monitors and rear-projection sets. Non-working, damaged, or outdated TVs are welcome; if you're not sure your set qualifies, call the New Berlin team at (262) 798-3040.",
      },
      {
        q: "Does it cost anything to drop off a TV in New Berlin?",
        a: "Call the New Berlin facility at (262) 798-3040 or request a quote to confirm any charges before you bring your TV in.",
      },
      {
        q: "Can a business have TVs picked up?",
        a: "Yes. Offices, property managers, hotels, schools, and other facilities can request a commercial pickup for retired televisions, and we can coordinate pickup for larger volumes. This option is reserved for commercial accounts.",
      },
      {
        q: "I'm not close to New Berlin. What are my options?",
        a: "The nationwide Mail-In Program lets you ship eligible items from anywhere. Televisions are bulky, so call (262) 798-3040 first to check the best way to send yours.",
      },
      {
        q: "Can you also destroy hard drives during a larger cleanout?",
        a: "Call Recycle Technologies at (262) 798-3040 to ask about hard drives as part of a larger cleanout.",
      },
    ],
  },
  after: [
    {
      figma: "7121:6743",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronic Recycling", href: href('/wisconsin-recycling/electronic-recycling/') },
            { label: "Battery Recycling", href: href('/wisconsin-recycling/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/wisconsin-recycling/light-bulb-recycling/') },
            { label: "Ballast Recycling", href: href('/wisconsin-recycling/ballast-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Book TV Recycling in Wisconsin",
    body: [
      "Bring your TV to New Berlin during business hours, schedule a commercial pickup for your business, or start a mail-in shipment.",
    ],
    line: "Schedule TV Recycling in Wisconsin | Call (262) 798-3040",
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 5 of 6. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
