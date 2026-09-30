import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Hard Drive Destruction in Blaine, Minnesota — /minnesota-recycling/hard-drive-destruction/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7122:9111, phone 7122:9546 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_HARD_DRIVE_DESTRUCTION: LocalPage = {
  url: href('/minnesota-recycling/hard-drive-destruction/'),
  figma: { board: "7122:9111", phone: "7122:9546" },
  seo: {
    title: "Hard Drive Destruction in Blaine, Minnesota | Recycle Technologies",
    description: "Deleting files or reformatting a drive does not remove the data stored on it.",
  },
  schema: { service: "Hard Drive Destruction", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Hard Drive Destruction in Blaine, Minnesota",
    h1: "Hard Drive Destruction in Blaine, Minnesota",
    body: [
      "Deleting files or reformatting a drive does not remove the data stored on it. Recovery software can pull \"deleted\" files off a drive months later, which is why businesses retiring computers need more than a quick wipe before old equipment leaves the building.",
      "Recycle Technologies provides certified hard drive destruction at its Blaine, Minnesota facility, physically destroying hard disk drives, solid-state drives, and other data-bearing media so the information on them can never be recovered. Businesses and organizations across the Minneapolis–Saint Paul metro get a documented, audited destruction process instead of a stack of retired drives sitting in a storage closet.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7122:9176",
      heading: "Hard Drive Destruction Services in Blaine",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "When computers, laptops, or servers are retired, the drives inside them still hold everything the business ever stored: customer records, employee files, financial data, and internal documents. Physical destruction is the only way to make sure none of it can be read, reassembled, or returned to service later.",
            "Drives reach the Blaine facility three ways: a scheduled business pickup, a drop-off at the facility, or the nationwide mail-in program. From the moment of collection through destruction, every drive is handled under strict security protocols, and the shredded material left over is recycled rather than sent to a landfill.",
          ],
        },
      ],
    },
    {
      figma: "7122:9182",
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
              label: "Drop-Off",
              value: "Bring drives to the Blaine facility during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.",
            },
            {
              label: "Business Pickup",
              value: "Scheduled pickups cover roughly a 100-mile radius around the Blaine facility, arranged around your operations with specialized trucks and equipment for secure collection.",
            },
            {
              label: "Mail-In",
              value: "Available nationwide through Recycle Technologies' mail-in program for anyone without a nearby drop-off location.",
            },
          ],
        },
      ],
    },
    {
      figma: "7122:9207",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Hard Disk Drives (HDDs)",
                body: [
                  "Traditional spinning hard drives removed from desktop computers, laptops, and servers — the most common drive type in retired office equipment.",
                ],
              },
              {
                title: "Solid State Drives (SSDs)",
                body: [
                  "Flash-based drives with no moving parts, found in modern laptops, desktops, and tablets. SSDs need physical destruction because software wiping is unreliable on flash memory.",
                ],
              },
              {
                title: "Other Data-Bearing Storage Media",
                body: [
                  "Additional disk drives and storage devices removed from retired computers and IT equipment.",
                ],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "If you're not sure whether a specific device qualifies, call the Blaine facility or describe it when requesting a quote or pickup.",
          ],
        },
      ],
    },
    {
      figma: "7122:9223",
      heading: "What This Service Doesn't Cover",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is for data-bearing media. Whole computers, monitors, printers, and other electronics without a destruction requirement are handled through our electronics recycling service, and full IT equipment retirements can be arranged through our IT asset disposition (ITAD) service alongside hard drive destruction.",
          ],
        },
      ],
    },
    {
      figma: "7122:9228",
      heading: "Hard Drive Destruction for Blaine Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Offices, healthcare practices, financial firms, schools, and government agencies within roughly 100 miles of Blaine can schedule a pickup rather than transporting drives themselves. Collection is arranged around your schedule, and drives stay under documented security protocols from pickup through destruction.",
            "Every destruction job comes with a certificate of destruction for your records — the paper trail auditors, compliance reviews, and internal policies ask for.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "What If You're an Individual?",
                body: [
                  "Individuals with a few old drives can drop them off at the Blaine facility during business hours, or use the nationwide mail-in program to ship drives from anywhere in the country.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:9241",
      heading: "How Hard Drive Destruction Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Drives arrive through a scheduled business pickup, a drop-off at the Blaine facility, or the mail-in program.",
                ],
              },
              {
                title: "Secure Handling",
                body: [
                  "Drives are handled under strict security protocols from collection through destruction, so no drive goes missing or gets accessed before it is destroyed.",
                ],
              },
              {
                title: "Physical Destruction",
                body: [
                  "Each drive is physically destroyed so the data on it cannot be recovered and the drive cannot be reused.",
                ],
              },
            ],
            [
              {
                title: "Recycling",
                body: [
                  "The shredded material from destruction is processed through our own recycling operations, keeping metal, plastic, and other components in the recycling stream rather than in a landfill.",
                ],
              },
              {
                title: "Documentation",
                body: ["A certificate of destruction is issued once processing is complete."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:9263",
      heading: "Why Recycle Technologies for Hard Drive Destruction",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "Certified Process",
                body: [
                  "R2v3 and RIOS certified, held to independently audited standards for responsible recycling, not self-declared claims.",
                ],
              },
              {
                icon: "factory",
                title: "In-House Destruction",
                body: [
                  "Drives are destroyed within our own operations, not handed off to an unknown third party.",
                ],
              },
              {
                icon: "file",
                title: "Documented Chain of Custody",
                body: [
                  "Every drive is tracked from collection to destruction, and every job ends with a certificate of destruction.",
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
                title: "Nothing Wasted",
                body: ["Shredded drive material is recycled rather than landfilled."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7122:9285",
      heading: "Local Blaine Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "The Blaine facility sits in the north metro of the Twin Cities, serving businesses and residents across Minneapolis, Saint Paul, and the surrounding suburbs. Companies across the metro use it as their local point for secure destruction of drives instead of shipping sensitive media out of state.",
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
        q: "Is deleting files or reformatting a drive enough to protect my data?",
        a: "No. Deleting files, reformatting, or even wiping a drive with software can leave data recoverable with the right tools. Physical destruction is the only method that makes recovery impossible, which is why organizations with sensitive information choose destruction when drives are retired.",
      },
      {
        q: "What is certified hard drive destruction?",
        a: "It's the physical destruction of hard disk drives, solid-state drives, and other data-bearing media so the information on them can never be recovered. At Recycle Technologies, drives are handled under strict security protocols from collection through destruction, the process is R2v3 and RIOS certified, and every job ends with a certificate of destruction.",
      },
      {
        q: "Do you destroy SSDs, or only traditional hard drives?",
        a: "Yes. Recycle Technologies destroys solid-state drives as well as traditional hard disk drives and other data-bearing storage media. SSDs need physical destruction because software wiping is unreliable on flash memory.",
      },
      {
        q: "Can my business schedule a pickup for hard drives?",
        a: "Yes. Businesses within roughly 100 miles of Blaine can schedule a pickup rather than transporting drives themselves. Collection is arranged around your schedule, and drives stay under documented security protocols from pickup through destruction.",
      },
      {
        q: "What happens to the drives after they're destroyed?",
        a: "The shredded material is processed through Recycle Technologies' own recycling operations, keeping metal, plastic, and other components in the recycling stream rather than in a landfill.",
      },
      {
        q: "Do I get proof that my drives were destroyed?",
        a: "Yes. Every destruction job comes with a certificate of destruction for your records, issued once processing is complete. Every drive is also tracked from collection to destruction.",
      },
    ],
  },
  after: [
    {
      figma: "7122:9316",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              { title: "Paper Shredding Services", body: ["secure document destruction for offices."] },
              { title: "Off-Site Shredding", body: ["off-site or on-site paper shredding options."] },
              {
                icon: "phone",
                title: "Phone Shredding Service",
                body: ["secure destruction for retired cell phones."],
              },
            ],
            [
              {
                title: "IT Asset Disposition",
                body: ["full retirement handling for business IT equipment."],
              },
              {
                title: "Mail-In Recycling",
                body: ["ship drives and electronics from anywhere in the country."],
              },
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
    heading: "Schedule Hard Drive Destruction in Blaine, Minnesota",
    body: [
      "Drop off drives at the Blaine facility during business hours, or schedule a business pickup anywhere within our Twin Cities service radius. Contact Recycle Technologies at +1-763-559-5130 to schedule hard drive destruction in Blaine, Minnesota.",
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
