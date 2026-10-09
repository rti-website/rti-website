import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Off-Site Shredding in New Berlin, Wisconsin — /wisconsin-recycling/off-site-shredding/
 * Moved from /wisconsin-recycling/on-site-off-site-shredding/ on 9 Oct 2026; the old URL 301s here.
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7119:6480, phone 7119:6923 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_OFF_SITE_SHREDDING: LocalPage = {
  url: href('/wisconsin-recycling/off-site-shredding/'),
  figma: { board: "7119:6480", phone: "7119:6923" },
  seo: {
    title: "Off-Site Shredding in New Berlin, Wisconsin | Recycle Technologies",
    description: "Secure off-site document shredding at Recycle Technologies in New Berlin, Wisconsin, destroyed under documented security with a certificate of destruction.",
  },
  schema: { service: "Off-Site Shredding", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Off-Site Shredding in New Berlin, Wisconsin",
    h1: "Off-Site Shredding in New Berlin, Wisconsin",
    body: [
      "When a business needs confidential paper destroyed, Recycle Technologies offers off-site shredding from its New Berlin, Wisconsin facility: a team collects your documents in secure vehicles and transports them to our facility, where they are destroyed under documented security.",
      "Off-site service is a cost-effective option for large volumes. Confidential paper never leaves your control unshredded, and the shredded material is recycled afterward.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7119:6545",
      heading: "Off-Site Shredding Services in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "With off-site shredding, a team collects your documents in secure vehicles and transports them to the New Berlin shredding facility, where they are destroyed under documented security. The shredded material is then recycled, and you receive a certificate of destruction for your records.",
            "Many businesses across the Milwaukee metro use off-site service for regular volume as well as one-time purges.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is a Local Recycling Facility",
          body: [
            "Recycle Technologies handles off-site shredding at its New Berlin, Wisconsin facility, just off I-43 near College Avenue. From collection to destruction, everything stays with a local Wisconsin team.",
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
                title: "Drop-Off",
                body: [
                  "Bring paper materials to the New Berlin facility during business hours. Enter via the main lot on South 171st Street and staff will direct you to the drop-off bay, where a team member logs your materials.",
                ],
              },
              {
                title: "Commercial Pickup",
                body: [
                  "Off-site collection for businesses covers roughly a 100-mile radius around the New Berlin facility, scheduled as recurring service or one-time jobs. Scheduled service is exclusive to commercial customers.",
                ],
              },
            ],
            [
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
      figma: "7119:6587",
      heading: "What We Accept",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Confidential Documents",
                body: [
                  "Business records, files, and paperwork containing sensitive or private information: personnel files, financial records, client data, and legal documents.",
                ],
              },
              {
                title: "Office Paperwork",
                body: [
                  "General paperwork accumulated through day-to-day operations, including outdated reports, memos, and correspondence.",
                ],
              },
              {
                title: "Large-Volume Paper Cleanouts",
                body: [
                  "One-time purges for clearing out storage rooms, file cabinets, or archived records, in addition to ongoing shredding for businesses generating paper regularly.",
                ],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "If you are not sure whether a specific material qualifies, call the New Berlin facility or describe it when requesting a quote.",
          ],
        },
      ],
    },
    {
      figma: "7119:6603",
      heading: "What This Service Does Not Cover",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is for paper records. If you are disposing of hard drives, phones, or other electronic devices alongside paper, those fall under our hard drive destruction or phone shredding services rather than this one.",
          ],
        },
      ],
    },
    {
      figma: "7119:6608",
      heading: "Off-Site Shredding for New Berlin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Offices, healthcare providers, financial firms, law offices, schools, and government agencies within roughly 100 miles of New Berlin use this service for both routine shredding and major cleanouts. Off-site collection in secure vehicles keeps costs down on large volumes, and every job ends with a certificate of destruction for your records.",
          ],
        },
      ],
    },
    {
      figma: "7119:6613",
      heading: "Off-Site Shredding for New Berlin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is built for businesses handling confidential paperwork. Individuals with personal documents to destroy can call the New Berlin facility about a drop-off or the Mail-In Program.",
          ],
        },
        { kind: "h3", text: "How Off-Site Shredding Works" },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Get a Quote",
                body: ["Contact Recycle Technologies to describe your paper volume and whether you need recurring service or a one-time job."],
              },
              {
                title: "Schedule Your Service",
                body: ["Set a collection date for recurring service or a one-time job."],
              },
              {
                title: "Secure Collection",
                body: [
                  "A team collects your documents from your door in secure vehicles with controlled handling.",
                ],
              },
            ],
            [
              {
                title: "Transport and Destruction",
                body: [
                  "Collected documents are transported to the New Berlin shredding facility for destruction under documented security.",
                ],
              },
              {
                title: "Recycling",
                body: ["All shredded material is recycled rather than sent to a landfill."],
              },
              {
                title: "Certificate of Destruction",
                body: ["Once shredding is complete, you receive a certificate of destruction for your records."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7119:6641",
      heading: "Why Recycle Technologies for Shredding",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "One Documented Standard",
                body: [
                  "Every job gets the same documented security and the same certificate of destruction.",
                ],
              },
              {
                icon: "shield",
                title: "AAA NAID Certified",
                body: [
                  "Among the few AAA NAID certified paper shredding firms serving Milwaukee, Wisconsin, meeting the industry's audited destruction standard.",
                ],
              },
              {
                icon: "lock",
                title: "Secure Transport",
                body: [
                  "Documents travel in secure vehicles with controlled handling from your door to destruction.",
                ],
              },
            ],
            [
              {
                icon: "factory",
                title: "Local Wisconsin Facility",
                body: ["Documents are destroyed at the New Berlin facility, just off I-43 near College Avenue, by a local Wisconsin team."],
              },
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: [
                  "Providing recycling services to the Midwest since 1993, operating licensed facilities in Minnesota and Wisconsin.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7119:6663",
      heading: "Local New Berlin Recycling Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "The New Berlin facility is the Milwaukee metro's local shredding point. Businesses from downtown Milwaukee to Waukesha, Brookfield, and the surrounding suburbs schedule off-site collection instead of managing sensitive paper disposal themselves. National providers serve the area too, but Recycle Technologies pairs off-site shredding with its own licensed Wisconsin facility and audited certifications.",
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
        q: "How does off-site shredding work?",
        a: "A team collects your documents in secure vehicles and transports them to the New Berlin shredding facility, where they are destroyed under documented security. The shredded material is recycled, and you receive a certificate of destruction for your records.",
      },
      {
        q: "Is off-site shredding secure if my documents leave the office?",
        a: "Yes. Off-site documents travel in secure vehicles with controlled handling from your door to destruction at the New Berlin facility, where they are destroyed under documented security. You receive a certificate of destruction once shredding is complete.",
      },
      {
        q: "Is off-site shredding cost-effective for large volumes?",
        a: "Yes. Off-site shredding is a cost-effective option for large volumes, whether you need recurring service or a one-time cleanout. Call (262) 798-3040 to describe your paper volume and get a quote.",
      },
      {
        q: "Can my business schedule a pickup?",
        a: "Yes. Off-site collection covers roughly a 100-mile radius around the New Berlin facility, scheduled as recurring service or one-time jobs. Scheduled service is exclusive to commercial customers.",
      },
      {
        q: "What if we are not near New Berlin?",
        a: "Scheduled off-site collection covers roughly a 100-mile radius around New Berlin. Outside that area, the nationwide Mail-In Program is available; call (262) 798-3040 to confirm the best option for your documents.",
      },
      {
        q: "Do I get proof that my documents were destroyed?",
        a: "Yes. Once shredding is complete, you receive a certificate of destruction for your records.",
      },
    ],
  },
  after: [
    {
      figma: "7119:6694",
      heading: "Related Recycling Services",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Paper Shredding Services",
                body: ["dedicated paper shredding for businesses and offices."],
              },
              {
                title: "Hard Drive Destruction Services",
                body: ["certified destruction for hard drives and SSDs."],
              },
              {
                icon: "phone",
                title: "Phone Shredding Service",
                body: ["secure destruction for retired cell phones."],
              },
            ],
            [
              { title: "Mail-In Recycling", body: ["ship materials from anywhere in the country."] },
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
    heading: "Schedule Off-Site Shredding in New Berlin, Wisconsin",
    body: [
      "Schedule off-site collection anywhere in the Milwaukee metro.",
      "Get a Quote | Schedule Off-Site Shredding in New Berlin, Wisconsin | Call (262) 798-3040",
    ],
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 5 of 6. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
    "Moved from the on-site/off-site URL on 9 Oct 2026 (SEO sheet \"Technical Fixes 09/10/26\"); on-site wording removed.",
  ],
}
