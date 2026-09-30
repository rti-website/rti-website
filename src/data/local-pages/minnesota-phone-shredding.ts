import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Phone Shredding Service in Blaine, Minnesota — /minnesota-recycling/phone-shredding/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7125:9923, phone 7125:10363 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_PHONE_SHREDDING: LocalPage = {
  url: href('/minnesota-recycling/phone-shredding/'),
  figma: { board: "7125:9923", phone: "7125:10363" },
  seo: {
    title: "Phone Shredding Service in Blaine, Minnesota | Recycle Technologies",
    description: "Simply turning a phone off, resetting it, or handing it down isn't enough if sensitive information is still sitting on the device.",
  },
  schema: { service: "Phone Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Phone Shredding Service in Blaine, Minnesota",
    h1: "Phone Shredding Service in Blaine, Minnesota",
    body: [
      "Simply turning a phone off, resetting it, or handing it down isn't enough if sensitive information is still sitting on the device. Handheld electronics, SIM cards, and memory chips can all retain data even after a reset, which is why businesses retiring phones need a documented destruction process.",
      "Recycle Technologies provides secure, off-site phone shredding for businesses and offices from its Blaine, Minnesota facility. The team collects retired cell phones across the Minneapolis-Saint Paul metro, transports them to a dedicated facility, and each device undergoes data wiping or physical destruction, whatever it takes to make the information unrecoverable. A certificate of recycling is issued afterward for your compliance and data-security records.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7125:9988",
      heading: "Phone Shredding Services in Blaine",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is designed for businesses and offices retiring phones in volume: employee turnover, upgrade cycles, or a fleet of company devices. Instead of destroying phones at your workplace, collection happens at your location and destruction happens off-site at the dedicated facility, keeping the whole process under documented control.",
          ],
        },
      ],
    },
    {
      figma: "7125:9993",
      heading: "Blaine Location and Service Information",
      grey: true,
      blocks: [
        {
          kind: "info",
          rows: [
            { label: "Address", value: "1525 99th Ln NE, Blaine, MN 55449" },
            { label: "Phone", value: "+1-763-559-5130" },
            { label: "Email", value: "dispatch@recycletechnologies.com" },
            { label: "Hours", value: "Monday through Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Business Collection",
              value: "The team collects retired phones from business locations within roughly a 100-mile radius around the Blaine facility, scheduled around your operations.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies mail-in program for anyone not near a drop-off location.",
            },
          ],
        },
      ],
    },
    {
      figma: "7125:10015",
      heading: "What We Accept",
      grey: false,
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
      ],
    },
    {
      figma: "7125:10029",
      heading: "What This Service Doesn't Cover",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is set up for businesses and offices retiring devices in volume, not as a one-off drop for a single phone. Individuals with one or two old phones can use the nationwide mail-in program instead. Whole computers and hard drives are handled through our electronics recycling and hard drive destruction services.",
          ],
        },
      ],
    },
    {
      figma: "7125:10034",
      heading: "Phone Shredding for Blaine Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "For an office retiring a batch of old phones, having a documented process matters more than it does for most other electronics, every device is a data risk until it's provably destroyed. Businesses within roughly 100 miles of Blaine schedule a collection, the devices are transported securely to the dedicated facility, and the certificate of recycling that follows gives compliance reviews and internal audits the paper trail they need.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "What If You're an Individual?",
                body: [
                  "Individuals with a single old phone or a small drawer of retired devices can use the nationwide mail-in program to ship phones from anywhere in the country.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:10046",
      heading: "How Phone Shredding Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Request a Quote",
                body: [
                  "Describe what you're retiring, roughly how many devices and what types, and get a quote.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7125:10056",
      heading: "Schedule a Collection",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
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
                  "Each device is wiped or physically destroyed, depending on what's needed to make its information unrecoverable.",
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
      figma: "7125:10074",
      heading: "Why Recycle Technologies for Phone Shredding",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "Certified Standards",
                body: [
                  "R2v3 and RIOS certified, held to independently audited standards for responsible recycling.",
                ],
              },
              {
                icon: "lock",
                title: "Data-First Process",
                body: [
                  "Destruction is handled differently from routine electronics recycling because phones, SIM cards, and memory chips carry stored data.",
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
                icon: "clock",
                title: "30+ Years in Business",
                body: [
                  "Providing recycling services to the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin.",
                ],
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
      figma: "7125:10096",
      heading: "Local Blaine Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses across the Twin Cities metro, from downtown Minneapolis offices to northern suburbs, use the Blaine facility as their local point for retiring company phones securely, instead of letting old devices pile up in IT closets.",
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
        q: "Isn't a factory reset enough to wipe a phone?",
        a: "No. A reset can leave recoverable data behind on the phone's storage, and SIM cards and memory chips can retain information independently. Physical destruction or professional data wiping is the only way to be certain the information is unrecoverable.",
      },
      {
        q: "Do you wipe phones or physically destroy them?",
        a: "Both. Each device is wiped or physically destroyed, depending on what's needed to make its information unrecoverable.",
      },
      {
        q: "Do you take broken phones?",
        a: "Yes. Recycle Technologies accepts smartphones and mobile phones no longer in use, whether working or broken.",
      },
      {
        q: "What about SIM cards and memory chips?",
        a: "SIM cards and memory chips can retain data even after a device is reset, so they are destroyed or wiped along with the phones.",
      },
      {
        q: "Can I drop off a single old phone?",
        a: "No. This service is set up for businesses and offices retiring devices in volume, not as a one-off drop for a single phone. Individuals with one or two old phones can use the nationwide mail-in program to ship them from anywhere in the country.",
      },
      {
        q: "Do I get proof that my phones were destroyed?",
        a: "Yes. Once processing is complete, a certificate of recycling confirms your devices were securely and responsibly handled, giving you a record for compliance and data-security reviews.",
      },
    ],
  },
  after: [
    {
      figma: "7125:10127",
      heading: "Related Recycling Services",
      grey: true,
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
              { title: "Off-Site Shredding", body: ["off-site or on-site paper shredding options."] },
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
            [
              {
                icon: "pin",
                title: "All Locations",
                body: ["every Recycle Technologies facility and drop-off."],
              },
            ],
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Schedule Phone Shredding in Blaine, Minnesota",
    body: [
      "Retiring company phones in volume? Contact Recycle Technologies at +1-763-559-5130 to schedule secure phone shredding in Blaine, Minnesota.",
    ],
    primary: QUOTE,
    secondary: tel("Call: +1-763-559-5130", "+17635595130"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 5 of 6. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
