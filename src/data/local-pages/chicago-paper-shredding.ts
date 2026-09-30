import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Paper Shredding Services in Chicago, Illinois — /paper-shredding-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7127:13691, phone 7127:14123 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_PAPER_SHREDDING: LocalPage = {
  url: href('/paper-shredding-chicago/'),
  figma: { board: "7127:13691", phone: "7127:14123" },
  seo: {
    title: "Paper Shredding Services in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides secure paper shredding services to businesses in the Chicago area.",
  },
  schema: { service: "Paper Shredding", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Paper Shredding Services in Chicago, Illinois",
    h1: "Paper Shredding Services in Chicago, Illinois",
    body: [
      "Recycle Technologies provides secure paper shredding services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup. Residents and small-volume customers can shred documents through the mail-in program, which ships to the company's certified facilities.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7127:13756",
      heading: "Paper Shredding Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has provided secure document destruction from its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself. Collected paper is shredded so information cannot be read or reconstructed, and every job comes with a certificate of destruction for your records.",
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
            "Businesses in Chicago can use Recycle Technologies' paper shredding services through scheduled commercial pickup. Collected materials are transported under a secure chain of custody to the company's certified facilities for shredding.",
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
      figma: "7127:13797",
      heading: "What We Shred",
      grey: true,
      blocks: [
        { kind: "text", body: ["Recycle Technologies shreds a broad range of paper records, including:"] },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Office Paper and Files",
                body: ["Everyday office paper, file folders, reports, memos, and archived records."],
              },
              {
                title: "Financial and Tax Records",
                body: ["Bank statements, tax returns, payroll records, invoices, and accounting files."],
              },
            ],
            [
              {
                title: "Medical Records",
                body: ["Patient files and administrative paperwork containing protected health information."],
              },
              {
                title: "Legal and Personnel Files",
                body: ["Contracts, HR records, personnel files, and confidential correspondence."],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "Paper clips and staples do not need to be removed. If your records are not listed here, reach out and describe what you need shredded.",
          ],
        },
      ],
    },
    {
      figma: "7127:13819",
      heading: "Paper Shredding for Chicago Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange paper shredding for offices, medical practices, law firms, financial institutions, schools, and government agencies. This includes one-time cleanouts of archived files as well as recurring scheduled service for ongoing shredding needs.",
            "Illinois law requires businesses to dispose of materials containing personal information in a manner that renders the information unreadable, unusable, and undecipherable, making a documented shredding partner relevant for both compliance and information security.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup at least 3 days in advance. Most Chicago pickups are scheduled within a few business days.",
          ],
        },
      ],
    },
    {
      figma: "7127:13826",
      heading: "Paper Shredding for Chicago Residents",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents with small quantities of sensitive documents can use the mail-in program by ordering a prepaid kit and shipping documents to Recycle Technologies for certified shredding.",
          ],
        },
      ],
    },
    {
      figma: "7127:13831",
      heading: "How Paper Shredding Works",
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
                  "Paper is collected through scheduled pickup in bags or containers and transported under a secure chain of custody to Recycle Technologies' certified Minnesota and Wisconsin facilities.",
                ],
              },
            ],
            [
              {
                title: "Shredding and Material Recovery",
                body: [
                  "Paper is shredded so information cannot be read or reconstructed, and the shredded fiber is recycled rather than landfilled.",
                ],
              },
              {
                title: "Certificate of Destruction",
                body: [
                  "Recycle Technologies provides a certificate of destruction with every job, supporting audits and compliance reporting.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7127:13849",
      heading: "Why Recycle Technologies for Paper Shredding",
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
                  "Recycle Technologies has provided recycling and document destruction services since 1993.",
                ],
              },
              {
                icon: "shield",
                title: "Certified In-House Processing",
                body: [
                  "Collected paper is shredded at Recycle Technologies' own R2v3-certified Minnesota and Wisconsin facilities rather than through an outside broker, so custody never leaves the company.",
                ],
              },
            ],
            [
              {
                icon: "truck",
                title: "Scheduled Chicago Pickup",
                body: [
                  "Chicago businesses get scheduled commercial pickup with pickup windows arranged in advance, from one-time cleanouts to recurring routes.",
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
      figma: "7127:13867",
      heading: "Local Chicago Shredding Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Under the Illinois Personal Information Protection Act, anyone disposing of materials containing personal information must do so in a manner that renders the information unreadable, unusable, and undecipherable. For paper records, shredding is one of the methods the law recognizes.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of paper records, as specific requirements can change.",
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
        a: "No. Chicago is a service area, not a facility, and Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center there. Paper is shredded at the company's R2v3-certified Minnesota and Wisconsin facilities, and the nearest facility is in New Berlin, Wisconsin.",
      },
      {
        q: "Where can I recycle electronics in Chicago?",
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago, and Chicago customers are served through scheduled commercial pickup and the mail-in program. Call (800) 969-5166 to confirm which options are available for your electronics.",
      },
      {
        q: "Is there free electronics recycling in Chicago?",
        a: "Chicago businesses can request a quote for service, and residents can use the prepaid mail-in kit. Call Recycle Technologies at (800) 969-5166 to confirm pricing for your materials.",
      },
      {
        q: "How much does it cost to have documents shredded?",
        a: "Pricing is provided through a quote, so tell Recycle Technologies what you have and where it is, or call (800) 969-5166 to speak with the commercial team. Chicago residents with small quantities of sensitive documents can order a prepaid mail-in kit.",
      },
      {
        q: "What is the safest way to destroy old tax documents?",
        a: "Shredding is one of the methods Illinois law recognizes for rendering paper records unreadable, unusable, and undecipherable. Recycle Technologies shreds tax returns and other financial records so information cannot be read or reconstructed, and every job comes with a certificate of destruction.",
      },
      {
        q: "How long does a company need to keep records?",
        a: "Chicago businesses should confirm current rules with the City of Chicago before disposing of paper records, as specific requirements can change. When records are ready for disposal, Illinois law requires that materials containing personal information be made unreadable, unusable, and undecipherable, and you can call (800) 969-5166 to arrange shredding.",
      },
      {
        q: "Will I receive documentation that my documents were shredded?",
        a: "Yes. Recycle Technologies provides a certificate of destruction with every job, supporting audits and compliance reporting.",
      },
    ],
  },
  after: [],
  cta: {
    heading: "Schedule Paper Shredding for Your Chicago Business",
    body: [
      "Recycle Technologies collects sensitive paper records from offices across the Chicago area, shreds them at its own R2v3-certified facilities, and provides a certificate of destruction for your records.",
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
