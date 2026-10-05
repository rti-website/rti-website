import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Battery Recycling in New Berlin, Wisconsin — /wisconsin-recycling/battery-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7118:4979, phone 7118:5396 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_BATTERY_RECYCLING: LocalPage = {
  url: href('/wisconsin-recycling/battery-recycling/'),
  figma: { board: "7118:4979", phone: "7118:5396" },
  seo: {
    title: 'Battery Recycling in New Berlin, WI | Recycle Technologies',
    description: "Drop off, business pickup or mail in spent batteries at our New Berlin, Wisconsin facility. Alkaline, lithium-ion, lead-acid, NiCd and EV batteries sorted by chemistry and recycled in-house since 1993.",
  },
  schema: { service: "Battery Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Battery Recycling in New Berlin, Wisconsin",
    h1: 'Battery Recycling in New Berlin, WI',
    body: [
      "Used batteries, alkaline, lithium-ion, lead-acid, and more, contain materials that can be hazardous if crushed, damaged, or left to leak, and shouldn't go in the trash or curbside recycling bin. Recycle Technologies collects and recycles batteries for households, businesses, and organizations at its New Berlin, Wisconsin facility, giving the area a documented way to clear out spent batteries instead of letting them accumulate. Individuals can drop batteries off at the New Berlin location or use the nationwide Mail-In Program, while businesses can schedule a pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7118:5043",
      heading: "Battery Recycling Services in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of battery types at its New Berlin facility. Batteries can enter the process through a business pickup, a drop-off at the New Berlin facility, or the Mail-In Program.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is a Local Recycling Facility",
          body: [
            "Recycle Technologies provides battery recycling at its New Berlin, Wisconsin facility. Individuals can bring batteries to the facility during business hours, while businesses within roughly 100 miles can schedule a pickup.",
          ],
        },
      ],
    },
    {
      figma: "7118:5055",
      heading: "New Berlin Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "2815 South 171st Street, New Berlin, WI 53151" },
            { label: "Phone", value: "+1-262-798-3040" },
            { label: "Hours", value: "Monday through Friday, 8:00 AM to 4:30 PM" },
            {
              label: "Drop-Off",
              value: "Individuals can bring batteries to the New Berlin location during business hours; enter via the main lot on South 171st Street, where staff will direct you to the drop-off bay on arrival.",
            },
            {
              label: "Business Pickup",
              value: "Recycle Technologies covers a 100-mile radius around its Wisconsin facility for scheduled business pickups.",
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
      figma: "7118:5077",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a broad range of battery types at its New Berlin facility."],
        },
        {
          kind: "cards",
          rows: [
            [
              { title: "Alkaline & Zinc Batteries", body: ["Alkaline and zinc batteries."] },
              {
                title: "Lithium-Ion & Lead-Acid Batteries",
                body: ["Lithium-ion and lead-acid batteries, including sealed lead-acid batteries."],
              },
            ],
            [
              {
                title: "Nickel-Cadmium & Button Cell Batteries",
                body: ["Nickel-cadmium (NiCd) and button cell batteries."],
              },
              {
                title: "EV, Power Tool & Backup Batteries",
                body: [
                  "EV, power tool, and backup batteries, including electric vehicle batteries, Tesla batteries, and battery backup units.",
                  "Other battery types, including mercury oxide batteries, are handled on a case-by-case basis. If your batteries aren't listed here, call the New Berlin facility or reach out to describe what you need to recycle.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:5098",
      heading: "Battery Recycling for New Berlin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses within roughly 100 miles of the New Berlin facility can schedule a pickup for batteries rather than transporting them to the facility themselves.",
            "Recycle Technologies covers a 100-mile radius around its Wisconsin facility for scheduled business pickups.",
          ],
        },
      ],
    },
    {
      figma: "7118:5104",
      heading: "Battery Recycling for New Berlin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring batteries to the New Berlin location during business hours. Enter via the main lot on South 171st Street, where staff will direct you to the drop-off bay on arrival.",
            "If a trip to New Berlin isn't convenient, the nationwide Mail-In Program lets you ship batteries from anywhere in the country, already sorted by type.",
          ],
        },
      ],
    },
    {
      figma: "7118:5110",
      heading: "How Battery Recycling Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Batteries enter the process through a business pickup, a drop-off at the New Berlin facility, or the Mail-In Program.",
                ],
              },
              {
                title: "Sorting and Storage",
                body: [
                  "Trained staff sort and separate batteries by type once they arrive, since a container of mixed battery types takes longer to process safely than one that's already sorted. Battery terminals should be covered before shipping or storage to reduce fire risk, and batteries sent through the Mail-In Program should already be separated by type.",
                ],
              },
            ],
            [
              {
                title: "Recycling and Material Recovery",
                body: [
                  "Recycle Technologies handles battery recycling from its Wisconsin facility, sorting batteries by chemistry before processing.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.",
                  "Recycle Technologies has handled battery recycling from its Wisconsin facility since 1993.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:5129",
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
                body: [
                  "Recycle Technologies has handled battery recycling from its Wisconsin facility since 1993.",
                ],
              },
              {
                icon: "truck",
                title: "Local Drop-Off and Business Pickup",
                body: [
                  "Local drop-off, business pickup within a 100-mile radius, and nationwide Mail-In Program are all available.",
                ],
              },
            ],
            [
              {
                icon: "factory",
                title: "In-House Sorting and Processing",
                body: ["Trained staff sort every battery by chemistry rather than processing mixed loads."],
              },
              {
                icon: "file",
                title: "Recycling Documentation",
                body: ["Certificate of recycling and safe disposal is issued for every pickup or drop-off."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7118:5147",
      heading: "Local New Berlin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Battery disposal rules vary by battery chemistry and by whether the generator is a household or a business, and requirements can change, so it's best to confirm with local authorities or contact the New Berlin facility directly before disposing of batteries you're unsure about.",
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
        q: "What battery types does Recycle Technologies accept?",
        a: "Alkaline, zinc, lithium-ion, lead-acid, nickel-cadmium, button cell, and EV, power tool, and backup batteries, plus other types like mercury oxide batteries on a case-by-case basis.",
      },
      {
        q: "Do I need to sort batteries before recycling them?",
        a: "Batteries sent through the Mail-In Program should already be separated by type, and battery terminals should be covered before shipping or storage to reduce fire risk. Trained staff sort all batteries by chemistry once they arrive, and a sorted container is quicker to process safely than a mixed one.",
      },
      {
        q: "Can my business schedule a pickup for batteries?",
        a: "Yes. Businesses within roughly 100 miles of the New Berlin facility can schedule a battery pickup instead of transporting batteries themselves. Call (262) 798-3040 to arrange it.",
      },
      {
        q: "What if I don't live near New Berlin?",
        a: "The nationwide Mail-In Program lets you ship batteries from anywhere in the country, already sorted by type. Businesses within roughly 100 miles of New Berlin can also schedule a pickup.",
      },
      {
        q: "Is it legal to put batteries in my regular trash?",
        a: "Used batteries shouldn't go in the trash or curbside recycling bin, since they contain materials that can be hazardous if crushed, damaged, or left to leak. Disposal rules vary by battery chemistry and by whether you're a household or a business, so confirm with local authorities or call the New Berlin facility at (262) 798-3040.",
      },
    ],
  },
  after: [
    {
      figma: "7118:5175",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronic Recycling", href: href('/wisconsin-recycling/electronic-recycling/') },
            { label: "Television Recycling", href: href('/tv-recycling-in-wisconsin/') },
            { label: "Paper Shredding", href: href('/wisconsin-recycling/paper-shredding/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Battery Recycling in New Berlin, Wisconsin",
    body: [
      "Drop off batteries at the New Berlin facility during business hours, or schedule a business battery pickup if you're within our service radius.",
      "Schedule Battery Recycling in New Berlin, Wisconsin | Call the New Berlin Facility: (262) 798-3040",
    ],
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
