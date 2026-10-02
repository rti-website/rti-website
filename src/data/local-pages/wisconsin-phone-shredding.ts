import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Phone Shredding Service in New Berlin, Wisconsin — /wisconsin-recycling/phone-shredding/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7120:6584, phone 7120:7038 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_PHONE_SHREDDING: LocalPage = {
  url: href('/wisconsin-recycling/phone-shredding/'),
  figma: { board: "7120:6584", phone: "7120:7038" },
  seo: {
    title: "Phone Shredding Service in New Berlin, Wisconsin | Recycle Technologies",
    description: "Simply turning a phone off, resetting it, or handing it down is not enough if sensitive information is still sitting on the device.",
  },
  schema: { service: "Phone Shredding", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Phone Shredding Service in New Berlin, Wisconsin",
    h1: "Phone Shredding Service in New Berlin, Wisconsin",
    body: [
      "Simply turning a phone off, resetting it, or handing it down is not enough if sensitive information is still sitting on the device. Handheld electronics, SIM cards, and memory chips can all retain data even after a reset, which is why businesses retiring phones need a documented destruction process.",
      "Recycle Technologies provides secure, off-site phone shredding for businesses and offices through its New Berlin, Wisconsin facility. The team collects retired cell phones across the Milwaukee metro, transports them to a dedicated facility, and each device undergoes data wiping or physical destruction, whatever it takes to make the information unrecoverable. A certificate of recycling is issued afterward for your compliance and data-security records.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7120:6649",
      heading: "Phone Shredding Services in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is designed for businesses and offices retiring phones in volume: employee turnover, upgrade cycles, or a fleet of company devices. Instead of destroying phones at your workplace, collection happens at your location and destruction happens off-site at the dedicated facility, keeping the whole process under documented control.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is a Local Recycling Facility",
          body: [
            "Recycle Technologies handles phone shredding through its New Berlin, Wisconsin facility, just off I-43 near College Avenue. Businesses across the Milwaukee metro get local collection for retired devices instead of mailing sensitive phones to a distant processor.",
          ],
        },
        { kind: "h3", text: "New Berlin Location and Service Information" },
        {
          kind: "cards",
          rows: [
            [
              { title: "Address", body: ["2815 South 171st Street, New Berlin, WI 53151"] },
              { title: "Phone", body: ["(262) 798-3040"] },
              { title: "Email", body: ["widispatch@recycletechnologies.com"] },
            ],
            [
              { title: "Hours", body: ["Monday through Friday, 8:00 AM to 4:30 PM"] },
              {
                title: "Business Collection",
                body: [
                  "The team collects retired phones from business locations within roughly a 100-mile radius around the New Berlin facility, scheduled around your operations.",
                ],
              },
              {
                title: "Mail-In",
                body: [
                  "Available nationwide through the Recycle Technologies Mail-In Program for anyone not near a drop-off location.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7120:6684",
      heading: "What We Accept",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Cell Phones",
                body: [
                  "Smartphones and mobile phones no longer in use, whether working or broken, including company-issued devices from turnover and upgrade cycles.",
                ],
              },
              {
                title: "Mobile Devices",
                body: ["Handheld electronics beyond standard phones that may store personal or business data."],
              },
              {
                title: "SIM Cards and Memory Chips",
                body: [
                  "Small storage components that can retain data even after a device is reset, destroyed or wiped along with the phones.",
                ],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "If you are not sure whether a specific device qualifies, call the New Berlin facility or describe it when requesting a quote.",
          ],
        },
      ],
    },
    {
      figma: "7120:6700",
      heading: "What This Service Does Not Cover",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is set up for businesses and offices retiring devices in volume, not as a one-off drop for a single phone. Individuals with one or two old phones can use the nationwide Mail-In Program instead. Whole computers and hard drives are handled through our electronics recycling and hard drive destruction services.",
          ],
        },
      ],
    },
    {
      figma: "7120:6705",
      heading: "Phone Shredding for New Berlin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "For an office retiring a batch of old phones, having a documented process matters more than it does for most other electronics. Every device is a data risk until it is provably destroyed. Businesses within roughly 100 miles of New Berlin schedule a collection, the devices are transported securely to the dedicated facility, and the certificate of recycling that follows gives compliance reviews and internal audits the paper trail they need.",
          ],
        },
      ],
    },
    {
      figma: "7120:6710",
      heading: "Phone Shredding for New Berlin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Individuals with a single old phone or a small drawer of retired devices can use the nationwide Mail-In Program to ship phones from anywhere in the country.",
          ],
        },
      ],
    },
    {
      figma: "7120:6715",
      heading: "How Phone Shredding Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Get a Quote",
                body: [
                  "Describe what you are retiring, roughly how many devices and what types, and get a quote.",
                ],
              },
              {
                title: "Schedule a Collection",
                body: ["Set a convenient time for the team to collect the phones from your office."],
              },
              {
                title: "Secure Transportation",
                body: [
                  "Devices are transported to the dedicated facility, where they undergo data destruction and recycling rather than being processed on-site.",
                ],
              },
            ],
            [
              {
                title: "Data Wiping or Physical Destruction",
                body: [
                  "Each device is wiped or physically destroyed, depending on what is needed to make its information unrecoverable.",
                ],
              },
              {
                title: "Certificate of Recycling",
                body: [
                  "Once processing is complete, a certificate of recycling confirms your devices were securely and responsibly handled.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7120:6737",
      heading: "Why Recycle Technologies for Phone Shredding",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "lock",
                title: "Data-First Process",
                body: [
                  "Destruction is handled differently from routine electronics recycling because phones, SIM cards, and memory chips carry stored data.",
                ],
              },
              {
                icon: "shield",
                title: "Certified Company Standards",
                body: [
                  "Recycle Technologies is R2v3 and RIOS certified, held to independently audited standards for responsible recycling, and the New Berlin facility is pursuing R2v3 certification.",
                ],
              },
              {
                icon: "file",
                title: "Documented Chain of Custody",
                body: [
                  "Devices are tracked from collection through final processing, ending with a certificate of recycling.",
                ],
              },
            ],
            [
              {
                icon: "truck",
                title: "Local Collection in the Milwaukee Metro",
                body: [
                  "Retired phones are collected by a local Wisconsin team, not mailed to an unknown processor.",
                ],
              },
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: ["Providing recycling services to the Midwest since 1993."],
              },
              {
                icon: "leaf",
                title: "Responsible Recycling",
                body: [
                  "Device materials are recycled through proper channels after data destruction, not landfilled.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7120:6761",
      heading: "Local New Berlin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses across the Milwaukee metro, from downtown offices to Waukesha County corporate parks, use the New Berlin facility as their local point for retiring company phones securely, instead of letting old devices pile up in IT closets. Every phone collected in the metro is transported to the dedicated facility for data wiping or physical destruction, so nothing with company data on it ends up resold or recycled intact.",
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
        q: "Should I wipe my devices before drop-off?",
        a: "You can, but it is not required. Every device goes through professional data wiping or physical destruction regardless, so your information is unrecoverable either way.",
      },
      {
        q: "Is my data safe when I recycle electronics?",
        a: "Yes. Every device is transported to the dedicated facility and wiped or physically destroyed, whatever it takes to make the information unrecoverable. Devices are tracked from collection through final processing, ending with a certificate of recycling.",
      },
      {
        q: "What happens to my personal information?",
        a: "Each device undergoes data wiping or physical destruction at the dedicated facility, depending on what is needed to make its information unrecoverable. Nothing with data on it ends up resold or recycled intact.",
      },
      {
        q: "Isn't a factory reset enough to wipe a phone?",
        a: "No. Handheld electronics, SIM cards, and memory chips can all retain data even after a reset, which is why retired phones need a documented destruction process.",
      },
      {
        q: "Do you wipe phones or physically destroy them?",
        a: "Both. Each device is wiped or physically destroyed, depending on what is needed to make its information unrecoverable.",
      },
      {
        q: "Do you take broken phones?",
        a: "Yes. We accept smartphones and mobile phones no longer in use, whether working or broken.",
      },
      {
        q: "What about SIM cards and memory chips?",
        a: "SIM cards and memory chips can retain data even after a device is reset, so they are destroyed or wiped along with the phones.",
      },
      {
        q: "Can I drop off a single old phone?",
        a: "No. This service is set up for businesses retiring devices in volume, not as a one-off drop for a single phone. Individuals with one or two old phones can use the nationwide Mail-In Program instead.",
      },
      {
        q: "Do I get written proof that my phones were destroyed?",
        a: "Yes. Once processing is complete, a certificate of recycling confirms your devices were securely and responsibly handled.",
      },
    ],
  },
  after: [
    {
      figma: "7120:6801",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Hard Drive Destruction Services",
                body: ["certified destruction for hard drives and SSDs."],
              },
              { title: "Paper Shredding Services", body: ["secure document destruction for offices."] },
              {
                title: "On-Site and Off-Site Shredding",
                body: ["a shredding truck at your location or secure transport to our facility."],
              },
            ],
            [
              {
                title: "IT Asset Disposition",
                body: ["full retirement handling for business IT equipment."],
              },
              { title: "Electronics Recycling", body: ["recycling for computers and other electronics."] },
              {
                title: "Mail-In Recycling",
                body: ["ship phones and electronics from anywhere in the country."],
              },
            ],
            [{ title: "All Locations", body: ["every Recycle Technologies facility and drop-off."] }],
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Phone Shredding in New Berlin, Wisconsin",
    body: [
      "Retiring company phones in volume? Schedule a secure collection anywhere in the Milwaukee metro.",
      "Get a Quote | Schedule Phone Shredding in New Berlin, Wisconsin | Call (262) 798-3040",
    ],
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 8 of 9. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
