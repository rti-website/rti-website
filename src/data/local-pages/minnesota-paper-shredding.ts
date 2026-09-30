import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Paper Shredding Services in Blaine, Minnesota — /minnesota-recycling/paper-shredding/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7124:10277, phone 7124:10719 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const MINNESOTA_PAPER_SHREDDING: LocalPage = {
  url: href('/minnesota-recycling/paper-shredding/'),
  figma: { board: "7124:10277", phone: "7124:10719" },
  seo: {
    title: "Paper Shredding Services in Blaine, Minnesota | Recycle Technologies",
    description: "Tossing old files in a recycling bin doesn't meet the standard businesses are held to.",
  },
  schema: { service: "Paper Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Paper Shredding Services in Blaine, Minnesota",
    h1: "Paper Shredding Services in Blaine, Minnesota",
    body: [
      "Tossing old files in a recycling bin doesn't meet the standard businesses are held to. Customer records, employee files, financial paperwork, and supplier information all carry a responsibility to protect, and a document leak can damage a company's reputation in ways that are hard to undo.",
      "Recycle Technologies provides secure paper shredding for businesses and offices at its Blaine, Minnesota facility. Documents are collected from your location across the Minneapolis–Saint Paul metro, destroyed under documented security, and the shredded paper is recycled afterward. Every job ends with a certificate of destruction for your records.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7124:10342",
      heading: "Paper Shredding Services in Blaine",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether you're clearing out files during an office move, closing out a fiscal year, or managing an ongoing accumulation of paperwork, this service gives your business a reliable, documented way to destroy paper records. Scheduled recurring service works for offices generating paper every week; one-time service handles purges, cleanouts, and archived records.",
          ],
        },
      ],
    },
    {
      figma: "7124:10347",
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
              label: "Business Pickup",
              value: "Scheduled pickups cover roughly a 100-mile radius around the",
            },
          ],
        },
        { kind: "text", body: ["Blaine facility, set up as recurring service or one-time collection."] },
        {
          kind: "info",
          rows: [
            {
              label: "Mail-In",
              value: "Available nationwide through the Recycle Technologies mail-in program for anyone not near a drop-off location.",
            },
          ],
        },
      ],
    },
    {
      figma: "7124:10375",
      heading: "What We Accept",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Business Documents",
                body: [
                  "Files, records, and reports generated through normal business operations, contracts, invoices, purchase orders, and internal paperwork.",
                ],
              },
              {
                title: "Confidential Documents",
                body: [
                  "Paper containing sensitive customer, employee, or company information that requires secure destruction, personnel files, payroll records, client lists, and financial statements.",
                ],
              },
            ],
            [
              {
                title: "Office Paperwork",
                body: [
                  "General paper accumulated through day-to-day office use, including outdated manuals, memos, and printed correspondence.",
                ],
              },
              {
                title: "Large-Volume Cleanouts",
                body: [
                  "One-time purges for clearing out storage rooms, file cabinets, or archived records, as well as ongoing shredding for businesses generating paper regularly.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:10393",
      heading: "What This Service Doesn’t Cover",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is for paper-based records. Hard drives, cell phones, and other electronic devices fall under our hard drive destruction and phone shredding services instead. Non-paper materials mixed in with documents should be separated before collection. Describe what you have when requesting a quote, and we’ll confirm.",
          ],
        },
      ],
    },
    {
      figma: "7124:10398",
      heading: "Paper Shredding for Blaine Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Offices, medical practices, law firms, banks, schools, and government agencies within roughly 100 miles of Blaine can set up scheduled shredding or book a one-time purge. Protecting sensitive information is often a legal obligation, not just good practice, and a documented shredding process with a certificate of destruction is what compliance reviews ask to see.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "What If You're an Individual?",
                body: [
                  "This service is set up primarily for businesses and offices. Individuals with boxes of old personal documents, tax records, bank statements, medical paperwork, can call the Blaine facility to arrange a drop-off or ask about the mail-in option.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:10410",
      heading: "How Paper Shredding Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Request a Quote",
                body: [
                  "Contact Recycle Technologies to describe your paper volume and shredding needs and get a free quote.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:10420",
      heading: "Schedule Collection",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Schedule Collection",
                body: ["Set up recurring service or a one-time pickup for your business location."],
              },
              {
                title: "Secure Destruction",
                body: [
                  "Documents are shredded using dedicated equipment, handled by trained personnel under documented security.",
                ],
              },
            ],
            [
              {
                title: "Recycling",
                body: ["Shredded paper is recycled afterward rather than sent to a landfill."],
              },
              {
                title: "Documentation",
                body: ["A certificate of destruction is issued for your records once the job is complete."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7124:10438",
      heading: "Why Recycle Technologies for Paper Shredding",
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
                  "R2v3 and RIOS certified, held to independently audited standards, not self-declared claims.",
                ],
              },
              {
                icon: "lock",
                title: "Trained Personnel",
                body: ["Shredding is handled by dedicated, trained staff, not temporary labor."],
              },
              {
                icon: "file",
                title: "Documented Every Step",
                body: [
                  "From collection through destruction, the process is tracked and ends with a certificate of destruction.",
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
      figma: "7124:10460",
      heading: "Local Blaine Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "The Blaine facility serves as the Twin Cities metro's local point for commercial shredding, businesses across Minneapolis, Saint Paul, and the northern suburbs use scheduled pickup instead of running office shredders or trusting curbside bins with sensitive records.",
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
        q: "Are shredding services safe?",
        a: "Yes, when they're run as a documented process. Documents stay under controlled handling from collection through destruction, trained personnel do the shredding, and you receive a certificate of destruction confirming the job was completed.",
      },
      {
        q: "Do I need to remove staples or paper clips before shredding?",
        a: "Non-paper materials mixed in with documents should be separated before collection. Describe what you have when requesting a quote or call +1-763-559-5130, and we'll confirm how to prepare your documents.",
      },
      {
        q: "How much does paper shredding cost?",
        a: "Contact Recycle Technologies at +1-763-559-5130 to describe your paper volume and shredding needs and get a free quote.",
      },
      {
        q: "Do you offer scheduled, recurring shredding service?",
        a: "Yes. Scheduled recurring service works for offices generating paper every week, and one-time service handles purges, cleanouts, and archived records. Businesses within roughly 100 miles of Blaine can set up either option.",
      },
      {
        q: "What if my business isn't near Blaine?",
        a: "Scheduled pickups cover roughly a 100-mile radius around the Blaine facility. For anyone not near a drop-off location, the nationwide mail-in program is available, so call +1-763-559-5130 to confirm the best option for your business.",
      },
      {
        q: "Do I get proof that my documents were destroyed?",
        a: "Yes. A certificate of destruction is issued for your records once the job is complete.",
      },
    ],
  },
  after: [
    {
      figma: "7124:10491",
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
              {
                title: "Off-Site Shredding",
                body: ["off-site or on-site shredding options for larger volumes."],
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
    heading: "Schedule Paper Shredding in Blaine, Minnesota",
    body: [
      "Set up recurring shredding or book a one-time purge for your office anywhere in the Twin Cities metro. Contact Recycle Technologies at +1-763-559-5130 to schedule paper shredding in Blaine, Minnesota.",
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
