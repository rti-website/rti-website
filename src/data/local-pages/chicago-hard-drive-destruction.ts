import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Hard Drive Destruction in Chicago, Illinois — /hard-drive-destruction-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7126:12575, phone 7126:13011 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_HARD_DRIVE_DESTRUCTION: LocalPage = {
  url: href('/hard-drive-destruction-chicago/'),
  figma: { board: "7126:12575", phone: "7126:13011" },
  seo: {
    title: "Hard Drive Destruction in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides certified hard drive destruction services to businesses in the Chicago area.",
  },
  schema: { service: "Hard Drive Destruction", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Hard Drive Destruction in Chicago, Illinois",
    h1: "Hard Drive Destruction in Chicago, Illinois",
    body: [
      "Recycle Technologies provides certified hard drive destruction services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup. Residents and small-volume customers can destroy hard drives through the mail-in program, which ships to the company's certified facilities.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7126:12640",
      heading: "Hard Drive Destruction Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and data destruction company that has destroyed hard drives and electronic media at its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself. Every drive is physically destroyed so the data on it cannot be read or reconstructed, and every job comes with a certificate of destruction for your records.",
          ],
        },
        {
          kind: "card",
          icon: "pin",
          title: "Chicago Is a Service Area, Not a Facility",
          body: [
            "Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center in Chicago.",
          ],
        },
        {
          kind: "text",
          body: [
            "Businesses in Chicago can use Recycle Technologies' hard drive destruction services through scheduled commercial pickup. Collected drives are transported under a secure chain of custody to the company's certified facilities for destruction.",
          ],
        },
        { kind: "h3", text: "Chicago Location and Service Information" },
        {
          kind: "cards",
          rows: [
            [
              { icon: "pin", title: "Location", body: ["Chicago, Illinois"] },
              { icon: "phone", title: "Phone", body: ["(800) 969-5166"] },
            ],
            [
              { icon: "pin", title: "Service Area", body: ["Chicago and surrounding areas"] },
              { icon: "truck", title: "Commercial customers", body: ["Scheduled pickup"] },
            ],
          ],
        },
        { kind: "text", body: ["Residents and small quantities: Mail-in program"] },
        {
          kind: "cards",
          rows: [[{ icon: "pin", title: "Nearest facility", body: ["New Berlin, Wisconsin"] }]],
        },
      ],
    },
    {
      figma: "7126:12681",
      heading: "What We Destroy",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: ["Recycle Technologies destroys a broad range of data-bearing media, including:"],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Hard Disk Drives (HDDs)",
                body: ["Desktop, laptop, and external hard disk drives of any capacity."],
              },
              {
                title: "Solid State Drives (SSDs)",
                body: ["SATA, NVMe, and M.2 solid state drives from computers and servers."],
              },
              {
                title: "Server and Data Center Drives",
                body: [
                  "High-volume drive pulls from servers, SANs, NAS devices, and retired data center hardware.",
                ],
              },
            ],
            [
              {
                title: "Backup Tapes and Cartridges",
                body: ["LTO tapes, DLT cartridges, and other magnetic backup media."],
              },
              { title: "Flash Media", body: ["USB flash drives, SD cards, and other portable storage."] },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "Serial numbers are recorded before destruction when a serialized inventory is required. If your media is not listed here, reach out and describe what you need destroyed.",
          ],
        },
      ],
    },
    {
      figma: "7126:12707",
      heading: "Hard Drive Destruction for Chicago Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange hard drive destruction for retired IT equipment from offices, data centers, healthcare facilities, financial institutions, schools, and government agencies. This includes single drive pulls from decommissioned workstations as well as truckload-scale data center cleanouts.",
            "Illinois law requires businesses to dispose of materials containing personal information in a manner that renders the information unreadable, unusable, and undecipherable, making a documented destruction partner relevant for both compliance and data security.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup at least 3 days in advance. Most Chicago pickups are scheduled within a few business days.",
          ],
        },
      ],
    },
    {
      figma: "7126:12714",
      heading: "Hard Drive Destruction for Chicago Residents",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents can destroy old hard drives through the mail-in program by ordering a prepaid kit, packing the drive securely, and shipping it to Recycle Technologies for certified destruction.",
          ],
        },
      ],
    },
    {
      figma: "7126:12719",
      heading: "How Hard Drive Destruction Works",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Schedule a Pickup or Order a Kit",
                body: [
                  "Businesses schedule a commercial pickup at least 3 days in advance. Residents and small-quantity customers order a prepaid mail-in kit.",
                ],
              },
              {
                title: "Secure Collection and Transport",
                body: [
                  "Drives are collected through scheduled pickup and transported under a secure chain of custody to Recycle Technologies' certified Minnesota and Wisconsin facilities.",
                ],
              },
            ],
            [
              {
                title: "Physical Destruction",
                body: [
                  "Drives are crushed and shredded at the company's R2v3-certified facilities so stored data cannot be read or reconstructed. Wiping alone is not relied upon, because residual data can survive software-based erasure.",
                ],
              },
              {
                title: "Certificate of Destruction",
                body: [
                  "Recycle Technologies provides a certificate of destruction with every job, including recorded serial numbers where a serialized inventory was requested, supporting audits and compliance reporting.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7126:12737",
      heading: "Why Recycle Technologies for Hard Drive Destruction",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: [
                  "Recycle Technologies has performed electronics recycling and data destruction since 1993.",
                ],
              },
              {
                icon: "shield",
                title: "Certified In-House Destruction",
                body: [
                  "Drives are destroyed directly at Recycle Technologies' own R2v3-certified Minnesota and Wisconsin facilities rather than through an outside broker, so custody never leaves the company.",
                ],
              },
            ],
            [
              {
                icon: "truck",
                title: "Scheduled Chicago Pickup",
                body: [
                  "Chicago businesses get scheduled commercial pickup with pickup windows arranged in advance, plus documentation for every load.",
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
      figma: "7126:12755",
      heading: "Local Chicago Data Destruction Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Under the Illinois Personal Information Protection Act, anyone disposing of materials containing personal information must do so in a manner that renders the information unreadable, unusable, and undecipherable. For electronic media such as hard drives, that means destruction or erasure so the data cannot practicably be read or reconstructed.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of data-bearing equipment, as specific requirements can change.",
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
        q: "Where is your Chicago location?",
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago. Chicago is a service area: businesses are served through scheduled commercial pickup, and residents and small-quantity customers use the mail-in program. The nearest company facility is in New Berlin, Wisconsin.",
      },
      {
        q: "Is Chicago a full facility?",
        a: "No. Chicago is a service area, not a facility, and Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center there. Drives are destroyed at the company's R2v3-certified Minnesota and Wisconsin facilities, and the nearest facility is in New Berlin, Wisconsin.",
      },
      {
        q: "Where can I recycle electronics in Chicago?",
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago, but businesses can schedule a commercial pickup for hard drives, SSDs, server drives, backup tapes, and flash media, and residents can use the prepaid mail-in kit. For other electronics, call (800) 969-5166 and describe what you need.",
      },
      {
        q: "Is there free electronics recycling in Chicago?",
        a: "Chicago businesses can request a quote for hard drive destruction, and residents can use the prepaid mail-in kit. Call Recycle Technologies at (800) 969-5166 to confirm pricing for your equipment.",
      },
      {
        q: "What is a certificate of destruction?",
        a: "A certificate of destruction is the record Recycle Technologies provides with every hard drive destruction job. It includes recorded serial numbers where a serialized inventory was requested, supporting audits and compliance reporting.",
      },
      {
        q: "What is the difference between data destruction and data erasure?",
        a: "Data destruction physically crushes and shreds the drive so stored data cannot be read or reconstructed, while data erasure uses software to wipe the drive. Recycle Technologies does not rely on wiping alone, because residual data can survive software-based erasure.",
      },
      {
        q: "Can my business schedule a pickup for hard drive destruction?",
        a: "Yes. Chicago businesses can request a quote or schedule a commercial pickup at least 3 days in advance, and most Chicago pickups are scheduled within a few business days. Drives are then transported under a secure chain of custody to Recycle Technologies' certified facilities for destruction.",
      },
      {
        q: "Will I receive documentation that my drives were destroyed?",
        a: "Yes. Every job comes with a certificate of destruction for your records, including recorded serial numbers where a serialized inventory was requested.",
      },
    ],
  },
  after: [],
  cta: {
    heading: "Schedule Hard Drive Destruction for Your Chicago Business",
    body: [
      "Recycle Technologies collects retired hard drives from offices, data centers, and IT departments across the Chicago area, destroys them at its own R2v3-certified facilities, and provides a certificate of destruction for your records.",
      "Tell us what you have and where it is. Most Chicago pickups are scheduled within a few business days.",
      "Or call 800-969-5166 to speak with the commercial team.",
    ],
    primary: PICKUP,
    secondary: tel("Call: 800-969-5166", "+18009695166"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 7 of 8. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
