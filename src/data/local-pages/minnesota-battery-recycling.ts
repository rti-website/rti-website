import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Battery Recycling in Blaine, Minnesota — /minnesota-recycling/battery-recycling/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7122:7667, phone 7122:8089 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_BATTERY_RECYCLING: LocalPage = {
  url: href('/minnesota-recycling/battery-recycling/'),
  figma: { board: "7122:7667", phone: "7122:8089" },
  seo: {
    title: "Battery Recycling in Blaine, Minnesota | Recycle Technologies",
    description: "Drop off, business pickup or mail in spent batteries at our R2v3 certified Blaine, Minnesota facility. Alkaline, lithium-ion, lead-acid, NiCd and EV batteries sorted and recycled in-house since 1993.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Battery Recycling in Blaine, Minnesota",
    h1: "Battery Recycling in Blaine, Minnesota",
    body: [
      "Used batteries, including alkaline, lithium-ion, lead-acid, and more, contain materials that can be hazardous if crushed, damaged, or left to leak, and shouldn't go in the trash or curbside recycling bin.",
      "Recycle Technologies collects and recycles batteries for households, businesses, and organizations at its Blaine, Minnesota facility, giving the area a documented way to clear out spent batteries instead of letting them accumulate or end up in the trash. Individuals can drop batteries off at the Blaine location or use the nationwide Mail-In Program, while businesses can schedule a pickup.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7122:7732",
      heading: "Battery Recycling Services in Blaine",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of battery types at its Blaine facility. Batteries can enter the process through a business pickup, a drop-off at the Blaine facility, or the nationwide Mail-In Program.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Blaine Is a Local Recycling Facility",
                body: [
                  "Recycle Technologies provides battery recycling at its Blaine, Minnesota facility. Individuals can bring batteries to the facility during business hours, while businesses within roughly 100 miles can schedule a pickup.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:7744",
      heading: "Blaine Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "1525 99th Ln NE, Blaine, MN 55449" },
            { label: "Phone", value: "+1-763-559-5130" },
            { label: "Hours", value: "Monday through Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Drop-Off",
              value: "Individuals can bring batteries to the Blaine location during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.",
            },
            {
              label: "Business Pickup",
              value: "Recycle Technologies covers a 100-mile radius around its Minnesota facility for scheduled business pickups.",
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
      figma: "7122:7766",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies accepts a broad range of battery types at its Blaine facility."],
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
                  "Other battery types, including mercury oxide batteries, are handled on a case-by-case basis. If your batteries aren't listed here, call the Blaine facility or reach out to describe what you need to recycle.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:7787",
      heading: "Battery Recycling for Blaine Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses within roughly 100 miles of the Blaine facility can schedule a pickup for batteries rather than transporting them to the facility themselves.",
            "Recycle Technologies covers a 100-mile radius around its Minnesota facility for scheduled business pickups. Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.",
          ],
        },
      ],
    },
    {
      figma: "7122:7793",
      heading: "Battery Recycling for Blaine Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals can bring batteries to the Blaine location during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.",
            "If a trip to Blaine isn't convenient, the nationwide Mail-In Program lets you ship batteries from anywhere in the country, already sorted by type.",
          ],
        },
      ],
    },
    {
      figma: "7122:7799",
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
                  "Batteries enter the process through a business pickup, a drop-off at the Blaine facility, or the Mail-In Program.",
                ],
              },
              {
                title: "Sorting and Storage",
                body: [
                  "Trained staff sort and separate batteries by type once they arrive, since a container of mixed battery types takes longer to process safely than one that’s already sorted. Battery terminals should be covered before shipping or storage to reduce fire risk, and batteries sent through the Mail-In Program should already be separated by type.",
                ],
              },
            ],
            [
              {
                title: "Recycling and Material Recovery",
                body: [
                  "Recycle Technologies handles battery recycling from its Minnesota facility, sorting batteries by chemistry before processing.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.",
                  "Recycle Technologies has handled battery recycling from its Minnesota facility since 1993.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:7818",
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
                  "Recycle Technologies has handled battery recycling from its Minnesota facility since 1993.",
                ],
              },
              {
                icon: "truck",
                title: "Local Drop-Off and Business Pickup",
                body: [
                  "Local drop-off, business pickup within a 100-mile radius, and nationwide Mail-In Program are all available.",
                ],
              },
              {
                icon: "factory",
                title: "In-House Sorting and Processing",
                body: ["Trained staff sort every battery by chemistry rather than processing mixed loads."],
              },
            ],
            [
              {
                icon: "shield",
                title: "Certified Recycling Process",
                body: ["R2v3, RIOS, and NAID AAA certified, held to independently audited standards."],
              },
              {
                icon: "file",
                title: "Recycling Documentation",
                body: ["A certificate of recycling and safe disposal is issued for every pickup or drop-off."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:7840",
      heading: "Local Blaine Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Battery disposal rules vary by battery chemistry and by whether the generator is a household or a business, and requirements can change, so it's best to confirm with local authorities or contact the Blaine facility directly before disposing of batteries you're unsure about.",
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
        a: "Batteries sent through the Mail-In Program should already be separated by type, and battery terminals should be covered before shipping or storage to reduce fire risk. Trained staff sort batteries by type once they arrive, since a container of mixed battery types takes longer to process safely than one that's already sorted.",
      },
      {
        q: "Can my business schedule a pickup for batteries?",
        a: "Yes. Businesses within roughly 100 miles of the Blaine facility can schedule a pickup for batteries rather than transporting them to the facility themselves. Once a pickup is processed, Recycle Technologies issues a certificate of recycling and safe disposal.",
      },
      {
        q: "What if I don't live near Blaine?",
        a: "The nationwide Mail-In Program lets you ship batteries from anywhere in the country, already sorted by type. Businesses within roughly 100 miles of the Blaine facility can also schedule a pickup.",
      },
      {
        q: "Is it legal to put batteries in my regular trash?",
        a: "Used batteries contain materials that can be hazardous if crushed, damaged, or left to leak, and shouldn't go in the trash or curbside recycling bin. Disposal rules vary by battery chemistry and by whether you're a household or a business, so confirm with local authorities or call the Blaine facility at (763) 559-5130 before disposing of batteries you're unsure about.",
      },
    ],
  },
  after: [
    {
      figma: "7122:7868",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Electronic Recycling", href: href('/minnesota-recycling/electronic-recycling/') },
            { label: "Light Bulbs Recycling", href: href('/minnesota-recycling/light-bulb-recycling/') },
            { label: "Ballasts Recycling", href: href('/minnesota-recycling/ballast-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
            { label: "All Recycle Technologies Locations", href: href('/all-locations/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Battery Recycling in Blaine, Minnesota",
    body: [
      "Drop off batteries at the Blaine facility during business hours, or schedule a business battery pickup if you're within our service radius.",
      "Schedule Battery Recycling in Blaine, Minnesota | Call the Blaine Facility: (763) 559-5130",
    ],
    primary: QUOTE,
    secondary: tel("Call: (763) 559-5130", "+17635595130"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
