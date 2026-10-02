import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Paper Shredding Services in New Berlin, Wisconsin — /wisconsin-recycling/paper-shredding/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7120:5787, phone 7120:6247 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const WISCONSIN_PAPER_SHREDDING: LocalPage = {
  url: href('/wisconsin-recycling/paper-shredding/'),
  figma: { board: "7120:5787", phone: "7120:6247" },
  seo: {
    title: "Paper Shredding Services in New Berlin, Wisconsin | Recycle Technologies",
    description: "Tossing old files in a recycling bin does not meet the standard businesses are held to.",
  },
  schema: { service: "Paper Shredding", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Paper Shredding Services in New Berlin, Wisconsin",
    h1: "Paper Shredding Services in New Berlin, Wisconsin",
    body: [
      "Tossing old files in a recycling bin does not meet the standard businesses are held to. Customer records, employee files, financial paperwork, and supplier information all carry a responsibility to protect, and a document leak can damage a company's reputation in ways that are hard to undo.",
      "Recycle Technologies provides secure paper shredding for businesses and offices at its New Berlin, Wisconsin facility. Documents are collected from your location across the Milwaukee metro, destroyed under documented security, and the shredded paper is recycled afterward.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7120:5852",
      heading: "Paper Shredding Services in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether you are clearing out files during an office move, closing out a fiscal year, or managing an ongoing accumulation of paperwork, this service gives your business a reliable, documented way to destroy paper records. Scheduled recurring service works for offices generating paper every week; one-time service handles purges, cleanouts, and archived records.",
          ],
        },
        {
          kind: "card",
          title: "New Berlin Is a Local Recycling Facility",
          body: [
            "Recycle Technologies handles paper shredding at its New Berlin, Wisconsin facility. Local pickup across the Milwaukee metro means your documents are handled by a nearby team and destroyed at a Wisconsin facility, not shipped across the country.",
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
                  "Bring paper materials to the New Berlin facility during business hours. Enter via the main lot on South 171st Street, and staff will direct you to the drop-off bay, where a team member logs your materials.",
                ],
              },
              {
                title: "Commercial Pickup",
                body: [
                  "Scheduled pickups for businesses cover roughly a 100-mile radius around the New Berlin facility, set up as recurring service or one-time collection. Scheduled pickup is exclusive to commercial customers.",
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
      figma: "7120:5893",
      heading: "What We Accept",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Business Documents",
                body: [
                  "Files, records, and reports generated through normal business operations: contracts, invoices, purchase orders, and internal paperwork.",
                ],
              },
              {
                title: "Confidential Documents",
                body: [
                  "Paper containing sensitive customer, employee, or company information that requires secure destruction: personnel files, payroll records, client lists, and financial statements.",
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
        {
          kind: "text",
          body: [
            "If you are not sure whether a specific material qualifies, call the New Berlin facility or describe it when requesting a quote or pickup.",
          ],
        },
      ],
    },
    {
      figma: "7120:5913",
      heading: "What This Service Does Not Cover",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is for paper-based records. Hard drives, cell phones, and other electronic devices fall under our hard drive destruction and phone shredding services instead. Non-paper materials mixed in with documents should be separated before collection. Describe what you have when requesting a quote, and we will confirm.",
          ],
        },
      ],
    },
    {
      figma: "7120:5918",
      heading: "Paper Shredding for New Berlin Businesses",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Offices, medical practices, law firms, banks, schools, and government agencies within roughly 100 miles of New Berlin can set up scheduled shredding or book a one-time purge. Protecting sensitive information is often a legal obligation, not just good practice, and a documented shredding process with a certificate of destruction is what compliance reviews ask to see.",
          ],
        },
      ],
    },
    {
      figma: "7120:5923",
      heading: "Paper Shredding for New Berlin Residents",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "This service is set up primarily for businesses and offices. Individuals with boxes of old personal documents, like tax records, bank statements, or medical paperwork, can call the New Berlin facility to arrange a drop-off or ask about the Mail-In Program.",
          ],
        },
      ],
    },
    {
      figma: "7120:5928",
      heading: "How Paper Shredding Works",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Get a Quote",
                body: [
                  "Contact Recycle Technologies to describe your paper volume and shredding needs and get a free quote.",
                ],
              },
              {
                title: "Schedule Collection",
                body: [
                  "Set up recurring service or a one-time pickup for your business location. We provide boxes and bins for pickup on scheduled routes.",
                ],
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
      figma: "7120:5950",
      heading: "Why Recycle Technologies for Paper Shredding",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "shield",
                title: "AAA NAID Certified",
                body: [
                  "Among the few AAA NAID certified paper shredding firms serving Milwaukee, Wisconsin, meeting the industry's audited destruction standard.",
                ],
              },
              {
                icon: "shield",
                title: "Certified Company Standards",
                body: [
                  "Recycle Technologies is R2v3 and RIOS certified, held to independently audited standards, and the New Berlin facility is pursuing R2v3 certification.",
                ],
              },
              {
                icon: "lock",
                title: "Trained Personnel",
                body: ["Shredding is handled by dedicated, trained staff, not temporary labor."],
              },
            ],
            [
              {
                icon: "file",
                title: "Documented Every Step",
                body: [
                  "From collection through destruction, the process is tracked and ends with a certificate of destruction.",
                ],
              },
              {
                icon: "factory",
                title: "Local Facility, Local Team",
                body: [
                  "Pickup and destruction happen in the Milwaukee metro through our own New Berlin facility, not through a distant subcontractor.",
                ],
              },
              {
                icon: "clock",
                title: "Over 30 Years of Experience",
                body: ["Providing recycling services to the Midwest since 1993."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7120:5974",
      heading: "Local New Berlin Recycling Information",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "The New Berlin facility serves as the Milwaukee metro’s local point for commercial paper shredding. Businesses across Milwaukee, Waukesha, Brookfield, Wauwatosa, West Allis, and the surrounding suburbs use scheduled pickup instead of running office shredders or trusting curbside bins with sensitive records.",
            "Healthcare providers answer to HIPAA, financial firms to federal privacy rules, and every one of them needs the same thing: proof that confidential paper was destroyed properly.",
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
        a: "Yes, when they are run as a documented process. Documents stay under controlled handling from collection through destruction, trained personnel do the shredding, and you receive a certificate of destruction confirming the job was completed.",
      },
      {
        q: "How do I need to prepare my materials for shredding?",
        a: "Separate any non-paper materials, such as hard drives, cell phones, or other electronic devices, from your documents before collection. Describe what you have when requesting a quote, and we will confirm.",
      },
      {
        q: "Do I need to remove staples or paper clips before shredding?",
        a: "Describe your materials when requesting a quote, or call the New Berlin facility at (262) 798-3040, and we will confirm how they should be prepared before collection.",
      },
      {
        q: "How long does a one-time shredding service take?",
        a: "Timing for a one-time purge is confirmed when you request a quote. Contact Recycle Technologies at (262) 798-3040 to describe your paper volume and shredding needs and get a free quote.",
      },
      {
        q: "How soon can you come to clear out my documents?",
        a: "Contact Recycle Technologies at (262) 798-3040 to set up a one-time pickup for your business location. Scheduled pickups cover roughly a 100-mile radius around the New Berlin facility.",
      },
      {
        q: "Do you provide boxes and bins for pickup?",
        a: "Yes. We provide boxes and bins for pickup on scheduled routes.",
      },
      {
        q: "Why should I securely shred my documents?",
        a: "Customer records, employee files, financial paperwork, and supplier information all carry a responsibility to protect, and a document leak can damage a company's reputation in ways that are hard to undo. Protecting sensitive information is often a legal obligation, and a documented shredding process with a certificate of destruction is what compliance reviews ask to see.",
      },
      {
        q: "Is the shredded paper recycled?",
        a: "Yes. Shredded paper is recycled afterward rather than sent to a landfill.",
      },
      {
        q: "How often can you pick up?",
        a: "We offer scheduled recurring service for offices generating paper every week and one-time service for purges, cleanouts, and archived records. Call (262) 798-3040 to set up a schedule for your business.",
      },
      {
        q: "Do I get a certificate of destruction?",
        a: "Yes. A certificate of destruction is issued for your records once the job is complete.",
      },
    ],
  },
  after: [
    {
      figma: "7120:6018",
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
              {
                title: "On-Site and Off-Site Shredding",
                body: ["a shredding truck at your location or secure transport to our facility."],
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
    heading: "Schedule Paper Shredding in New Berlin, Wisconsin",
    body: [
      "Set up recurring shredding or book a one-time purge for your office anywhere in the Milwaukee metro.",
      "Get a Quote | Schedule Paper Shredding in New Berlin, Wisconsin | Call (262) 798-3040",
    ],
    primary: QUOTE,
    secondary: tel("Call: (262) 798-3040", "+12627983040"),
    footnote: "Recycle Technologies has served businesses across the Midwest since 1993.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 9 of 10. Confirm or replace.",
    "SEO title and description written for the build (the frames give none).",
  ],
}
