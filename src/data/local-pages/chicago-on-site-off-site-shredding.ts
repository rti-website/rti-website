import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * On-Site and Off-Site Shredding in Chicago, Illinois — /on-site-off-site-shredding-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7127:12949, phone 7127:13385 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_ON_SITE_OFF_SITE_SHREDDING: LocalPage = {
  url: href('/on-site-off-site-shredding-chicago/'),
  figma: { board: "7127:12949", phone: "7127:13385" },
  seo: {
    title: "On-Site and Off-Site Shredding in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides on-site and off-site shredding services to businesses in the Chicago area.",
  },
  schema: { service: "On-Site & Off-Site Shredding", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "On-Site and Off-Site Shredding in Chicago, Illinois",
    h1: "On-Site and Off-Site Shredding in Chicago, Illinois",
    body: [
      "Recycle Technologies provides on-site and off-site shredding services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled service: on-site shredding performed at the customer's own location, or off-site shredding through scheduled commercial pickup. Residents and small-volume customers can use the mail-in program, which ships to the company's certified facilities.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7127:13014",
      heading: "On-Site and Off-Site Shredding Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has provided secure destruction services from its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself. Choose on-site shredding to watch materials destroyed at your location, or off-site shredding for scheduled pickup with destruction at the company's certified facilities. Both options include a certificate of destruction.",
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
            "For on-site service, the shredding operation comes to the customer's Chicago-area location. For off-site service, materials are collected through scheduled commercial pickup and transported under a secure chain of custody to the company's certified facilities.",
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
              {
                icon: "truck",
                title: "Commercial customers",
                body: ["Scheduled on-site service or scheduled pickup"],
              },
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
      figma: "7127:13055",
      heading: "What We Shred On-Site and Off-Site",
      grey: true,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Paper Records",
                body: [
                  "Office paper, files, folders, financial records, tax documents, medical records, legal files, and archived boxes.",
                ],
              },
              {
                title: "Hard Drives and Electronic Media",
                body: [
                  "Hard disk drives, solid state drives, server drives, backup tapes, and USB flash drives.",
                ],
              },
              {
                icon: "phone",
                title: "Phones and Small Devices",
                body: [
                  "Cell phones, smartphones, and tablets collected during IT refreshes or office cleanouts.",
                ],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: ["If your materials are not listed here, reach out and describe what you need destroyed."],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "On-Site Shredding in Chicago",
                body: [
                  "With on-site shredding, the destruction equipment comes to your Chicago-area location and materials are shredded while you watch. This option suits businesses that want to witness destruction firsthand, such as financial institutions, healthcare organizations, and government agencies handling highly sensitive records.",
                  "A certificate of destruction is issued at the time of service.",
                ],
              },
              {
                title: "Off-Site Shredding in Chicago",
                body: [
                  "With off-site shredding, materials are collected through scheduled commercial pickup in locked containers and transported under a secure chain of custody to Recycle Technologies' R2v3-certified Minnesota and Wisconsin facilities, where they are shredded and a certificate of destruction is issued.",
                  "This option suits recurring shredding routes and larger volumes, including office cleanouts and data center decommissioning projects.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7127:13081",
      heading: "Shredding for Chicago Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange on-site or off-site shredding for offices, medical practices, law firms, financial institutions, schools, data centers, and government agencies.",
            "Illinois law requires businesses to dispose of materials containing personal information in a manner that renders the information unreadable, unusable, and undecipherable, making a documented destruction partner relevant for both compliance and information security.",
            "To arrange service, businesses can request a quote or schedule service at least 3 days in advance. Most Chicago service appointments are scheduled within a few business days.",
          ],
        },
      ],
    },
    {
      figma: "7127:13088",
      heading: "Shredding for Chicago Residents",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents with small quantities of sensitive paper or media can use the mail-in program by ordering a prepaid kit and shipping materials to Recycle Technologies for certified destruction.",
          ],
        },
      ],
    },
    {
      figma: "7127:13093",
      heading: "How On-Site and Off-Site Shredding Works",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Schedule Your Service",
                body: [
                  "Businesses schedule on-site service or a commercial pickup at least 3 days in advance. Residents and small-quantity customers order a prepaid mail-in kit.",
                ],
              },
              {
                icon: "pin",
                title: "On-Site: Witnessed Destruction at Your Location",
                body: [
                  "The shredding operation is performed at your Chicago-area location while your staff watches, and a certificate of destruction is issued on the spot.",
                ],
              },
            ],
            [
              {
                title: "Off-Site: Secure Transport and Facility Destruction",
                body: [
                  "Materials are collected in locked containers, transported under a secure chain of custody, and shredded at the company's R2v3-certified Minnesota and Wisconsin facilities. Shredded paper fiber is recycled rather than landfilled.",
                ],
              },
              {
                title: "Certificate of Destruction",
                body: [
                  "Every job includes a certificate of destruction with the method, date, and location of destruction, supporting audits and compliance reporting.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7127:13111",
      heading: "Why Recycle Technologies for Shredding",
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
                icon: "mail",
                title: "Both Options, One Accountable Company",
                body: [
                  "On-site witnessing or off-site facility destruction, both handled directly by Recycle Technologies' own staff and facilities rather than an outside broker.",
                ],
              },
            ],
            [
              {
                icon: "truck",
                title: "Scheduled Chicago Service",
                body: [
                  "Chicago businesses get scheduled on-site appointments or commercial pickup with windows arranged in advance, from one-time projects to recurring routes.",
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
      figma: "7127:13129",
      heading: "Local Chicago Shredding Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Under the Illinois Personal Information Protection Act, anyone disposing of materials containing personal information must do so in a manner that renders the information unreadable, unusable, and undecipherable. Shredding paper records and physically destroying electronic media are methods the law recognizes.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of sensitive records or media, as specific requirements can change.",
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
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago. Chicago is a service area: on-site shredding is performed at the customer's own location, off-site materials are collected through scheduled commercial pickup, and residents and small-quantity customers use the mail-in program. The nearest company facility is in New Berlin, Wisconsin.",
      },
      {
        q: "Is Chicago a full facility?",
        a: "No. Chicago is a service area, not a facility, and Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center there. Off-site materials are shredded at the company's R2v3-certified Minnesota and Wisconsin facilities, and the nearest facility is in New Berlin, Wisconsin.",
      },
      {
        q: "What is the difference between on-site and off-site shredding?",
        a: "With on-site shredding, the destruction equipment comes to your Chicago-area location and materials are shredded while you watch, with a certificate of destruction issued at the time of service. With off-site shredding, materials are collected in locked containers through scheduled commercial pickup and shredded at Recycle Technologies' R2v3-certified Minnesota and Wisconsin facilities.",
      },
      {
        q: "Can we watch the shredding happen?",
        a: "Yes. With on-site shredding, the shredding operation is performed at your Chicago-area location while your staff watches, and a certificate of destruction is issued on the spot.",
      },
      {
        q: "Where can I recycle electronics in Chicago?",
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago, but businesses can have hard drives, electronic media, phones, and tablets destroyed through on-site shredding or scheduled commercial pickup. Residents and small-quantity customers can use the mail-in program, and for other electronics you can call (800) 969-5166 and describe what you need destroyed.",
      },
      {
        q: "Is there free electronics recycling in Chicago?",
        a: "Chicago businesses can request a quote for on-site or off-site shredding, and residents can use the prepaid mail-in kit. Call Recycle Technologies at (800) 969-5166 to confirm pricing for your materials.",
      },
      {
        q: "Can my business schedule recurring shredding service?",
        a: "Yes. Chicago businesses get scheduled on-site appointments or commercial pickup with windows arranged in advance, from one-time projects to recurring routes. Off-site shredding suits recurring shredding routes and larger volumes.",
      },
      {
        q: "Will I receive documentation?",
        a: "Yes. Every job includes a certificate of destruction with the method, date, and location of destruction, supporting audits and compliance reporting. For on-site service, the certificate is issued at the time of service.",
      },
    ],
  },
  after: [],
  cta: {
    heading: "Schedule On-Site or Off-Site Shredding for Your Chicago Business",
    body: [
      "Recycle Technologies brings witnessed on-site shredding to your Chicago-area location or collects materials through scheduled pickup for destruction at its own R2v3-certified facilities, with a certificate of destruction for every job.",
      "Tell us what you have and where it is. Most Chicago service appointments are scheduled within a few business days.",
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
