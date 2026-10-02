import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * On-Site & Off-Site Shredding in Blaine, Minnesota — /minnesota-recycling/on-site-off-site-shredding/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7124:9526, phone 7124:9966 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_ON_SITE_OFF_SITE_SHREDDING: LocalPage = {
  url: href('/minnesota-recycling/on-site-off-site-shredding/'),
  figma: { board: "7124:9526", phone: "7124:9966" },
  seo: {
    title: "On-Site & Off-Site Shredding in Blaine, Minnesota | Recycle Technologies",
    description: "When a business needs confidential paper destroyed, there are two ways to do it: bring the shredding to you, or take your documents to the shredding.",
  },
  schema: { service: "On-Site & Off-Site Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "On-Site & Off-Site Shredding in Blaine, Minnesota",
    h1: "On-Site & Off-Site Shredding in Blaine, Minnesota",
    body: [
      "When a business needs confidential paper destroyed, there are two ways to do it: bring the shredding to you, or take your documents to the shredding. Recycle Technologies offers both from its Blaine, Minnesota facility: off-site shredding that transports your documents to our facility in secure vehicles, and on-site shredding that destroys them at your location.",
      "Off-site service is typically the more cost-effective option for large volumes; it can save businesses up to 40% compared to on-site service. On-site appeals to businesses that want to watch destruction happen on their own premises. Either way, confidential paper never leaves your control unshredded, and the shredded material is recycled afterward.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7124:9591",
      heading: "Shredding Options in Blaine",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "With off-site shredding, a team collects your documents in secure vehicles and transports them to the Blaine shredding facility, where they're destroyed under documented security. With on-site shredding, a shredding truck arrives at your location and destroys the documents there without transporting them anywhere first.",
            "The right choice depends on how much paper you have and how you want it handled. Many businesses across the Minneapolis-Saint Paul metro use off-site service for regular volume and on-site service for high-sensitivity purges.",
          ],
        },
      ],
    },
    {
      figma: "7124:9597",
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
              value: "Bring paper materials to the Blaine facility during business hours. Enter via the parking lot on 99th Lane NE and follow signage to the rear loading area, where a team member logs your materials.",
            },
            {
              label: "Business Service",
              value: "Off-site collection and on-site shredding cover roughly a 100-mile radius around the Blaine facility, scheduled as recurring service or one-time jobs.",
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
      figma: "7124:9622",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Confidential Documents",
                body: [
                  "Business records, files, and paperwork containing sensitive or private information, personnel files, financial records, client data, and legal documents.",
                ],
              },
              {
                title: "Office Paper",
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
      ],
    },
    {
      figma: "7124:9636",
      heading: "What This Service Doesn't Cover",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is for paper records. If you're disposing of hard drives, phones, or other electronic devices alongside paper, those fall under our hard drive destruction or phone shredding services rather than this one.",
          ],
        },
      ],
    },
    {
      figma: "7124:9641",
      heading: "On-Site & Off-Site Shredding for Blaine Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Offices, healthcare providers, financial firms, law offices, schools, and government agencies within roughly 100 miles of Blaine use this service for both routine shredding and major cleanouts. Off-site collection in secure vehicles keeps costs down on large volumes, while on-site service gives compliance-sensitive organizations witnessed destruction. Both end with a certificate of destruction for your records.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "What If You're an Individual?",
                body: [
                  "This service is built for businesses handling confidential paperwork. Individuals with personal documents to destroy can call the Blaine facility about a drop-off or the mail-in option.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:9653",
      heading: "How On-Site & Off-Site Shredding Work",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Get a Quote",
                body: ["Contact Recycle Technologies to describe your paper volume and which option fits."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:9663",
      heading: "Schedule Your Service",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Schedule Your Service",
                body: ["Choose off-site or on-site shredding and set a collection or service date."],
              },
              {
                title: "Collection or On-Location Shredding",
                body: [
                  "For off-site service, a team collects your documents in secure vehicles. For on-site service, a shredding truck arrives at your location and destroys documents there directly.",
                ],
              },
              {
                title: "Transport and Destruction (Off-Site Only)",
                body: [
                  "Collected documents are transported to the Blaine shredding facility for destruction under documented security.",
                ],
              },
            ],
            [
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
      figma: "7124:9685",
      heading: "Why Recycle Technologies for Shredding",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "Certified Standards",
                body: ["R2v3 and RIOS certified, held to independently audited standards."],
              },
              {
                icon: "shield",
                title: "Two Options, One Standard",
                body: [
                  "Whether documents are destroyed at your location or ours, the same documented security and the same certificate back the job.",
                ],
              },
              {
                icon: "lock",
                title: "Secure Transport",
                body: [
                  "Off-site documents travel in secure vehicles with controlled handling from your door to destruction.",
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
                body: ["Shredded paper goes back into the recycling stream, not a landfill."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:9707",
      heading: "Local Blaine Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "The Blaine facility is the Twin Cities metro's local shredding point, businesses from Minneapolis to Saint Paul and across the northern suburbs schedule off-site collection or on-site truck visits instead of managing sensitive paper disposal themselves.",
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
        q: "What’s the difference between off-site and on-site shredding?",
        a: "With off-site shredding, your documents are collected in secure vehicles and destroyed at our Blaine facility. With on-site shredding, a shredding truck comes to your location and destroys the documents there. Off-site typically costs less; on-site lets you witness destruction.",
      },
      {
        q: "Is off-site shredding secure if my documents leave the office?",
        a: "Yes. Off-site documents travel in secure vehicles with controlled handling from your door to destruction, and they are destroyed at the Blaine facility under documented security. Confidential paper never leaves your control unshredded, and the job ends with a certificate of destruction.",
      },
      {
        q: "How much can off-site shredding save compared to on-site?",
        a: "Off-site service is typically the more cost-effective option for large volumes and can save businesses up to 40% compared to on-site service. Contact Recycle Technologies at +1-763-559-5130 to describe your paper volume and get a quote.",
      },
      {
        q: "Can my business schedule a pickup?",
        a: "Yes. Off-site collection and on-site shredding cover roughly a 100-mile radius around the Blaine facility, scheduled as recurring service or one-time jobs.",
      },
      {
        q: "What if we're not near Blaine?",
        a: "Business service covers roughly a 100-mile radius around the Blaine facility. For anyone not near a drop-off location, the nationwide mail-in program is available, so call +1-763-559-5130 to confirm which option fits your location.",
      },
      {
        q: "Do I get proof that my documents were destroyed?",
        a: "Yes. Once shredding is complete, you receive a certificate of destruction for your records, whether documents were destroyed at your location or ours.",
      },
    ],
  },
  after: [
    {
      figma: "7124:9738",
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
    heading: "Schedule Shredding in Blaine, Minnesota",
    body: [
      "Choose off-site collection or an on-site shredding truck visit anywhere in the Twin Cities metro. Contact Recycle Technologies at +1-763-559-5130 to schedule shredding in Blaine, Minnesota.",
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
