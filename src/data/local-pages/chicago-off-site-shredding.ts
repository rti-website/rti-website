import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Off-Site Shredding in Chicago, Illinois — /off-site-shredding-chicago/
 * Moved from /on-site-off-site-shredding-chicago/ on 9 Oct 2026; the old URL 301s here.
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7127:12949, phone 7127:13385 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_OFF_SITE_SHREDDING: LocalPage = {
  url: href('/off-site-shredding-chicago/'),
  figma: { board: "7127:12949", phone: "7127:13385" },
  seo: {
    title: "Off-Site Shredding in Chicago, Illinois | Recycle Technologies",
    description: "Secure off-site document shredding for Chicago, Illinois businesses through scheduled pickup, destroyed at Recycle Technologies' certified facilities.",
  },
  schema: { service: "Off-Site Shredding", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Off-Site Shredding in Chicago, Illinois",
    h1: "Off-Site Shredding in Chicago, Illinois",
    body: [
      "Recycle Technologies provides off-site shredding services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through off-site shredding with scheduled commercial pickup. Residents and small-volume customers can use the mail-in program, which ships to the company's certified facilities.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7127:13014",
      heading: "Off-Site Shredding Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and shredding company that has provided secure destruction services from its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself. Off-site shredding provides scheduled pickup with destruction at the company's certified facilities, and every job includes a certificate of destruction.",
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
            "Materials are collected through scheduled commercial pickup and transported under a secure chain of custody to the company's certified facilities.",
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
                body: ["Scheduled pickup"],
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
      heading: "What We Shred Off-Site",
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
                title: "Off-Site Shredding in Chicago",
                body: [
                  "With off-site shredding, materials are collected through scheduled commercial pickup in locked containers and transported under a secure chain of custody to Recycle Technologies' R2v3-certified Minnesota and Wisconsin facilities, where they are shredded and a certificate of destruction is issued.",
                ],
              },
              {
                title: "Recurring Routes and Larger Volumes",
                body: [
                  "Off-site shredding suits recurring shredding routes and larger volumes, including office cleanouts and data center decommissioning projects.",
                  "A certificate of destruction is issued for every job.",
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
            "Businesses in the Chicago area can arrange off-site shredding for offices, medical practices, law firms, financial institutions, schools, data centers, and government agencies.",
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
      heading: "How Off-Site Shredding Works",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Schedule Your Service",
                body: [
                  "Businesses schedule a commercial pickup at least 3 days in advance. Residents and small-quantity customers order a prepaid mail-in kit.",
                ],
              },
              {
                icon: "pin",
                title: "Scheduled Pickup in Locked Containers",
                body: [
                  "Materials are collected from your Chicago-area location in locked containers through scheduled commercial pickup.",
                ],
              },
            ],
            [
              {
                title: "Secure Transport and Facility Destruction",
                body: [
                  "Materials are transported under a secure chain of custody and shredded at the company's R2v3-certified Minnesota and Wisconsin facilities. Shredded paper fiber is recycled rather than landfilled.",
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
                title: "One Accountable Company",
                body: [
                  "Collection, transport, and facility destruction, all handled directly by Recycle Technologies' own staff and facilities rather than an outside broker.",
                ],
              },
            ],
            [
              {
                icon: "truck",
                title: "Scheduled Chicago Service",
                body: [
                  "Chicago businesses get scheduled commercial pickup with windows arranged in advance, from one-time projects to recurring routes.",
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
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago. Chicago is a service area: materials are collected through scheduled commercial pickup, and residents and small-quantity customers use the mail-in program. The nearest company facility is in New Berlin, Wisconsin.",
      },
      {
        q: "Is Chicago a full facility?",
        a: "No. Chicago is a service area, not a facility, and Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center there. Off-site materials are shredded at the company's R2v3-certified Minnesota and Wisconsin facilities, and the nearest facility is in New Berlin, Wisconsin.",
      },
      {
        q: "How does off-site shredding work in Chicago?",
        a: "Materials are collected in locked containers through scheduled commercial pickup, transported under a secure chain of custody, and shredded at Recycle Technologies' R2v3-certified Minnesota and Wisconsin facilities. Every job includes a certificate of destruction.",
      },
      {
        q: "How far in advance should we schedule a pickup?",
        a: "Businesses schedule a commercial pickup at least 3 days in advance, and most Chicago service appointments are scheduled within a few business days.",
      },
      {
        q: "Where can I recycle electronics in Chicago?",
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago, but businesses can have hard drives, electronic media, phones, and tablets destroyed through scheduled commercial pickup and off-site shredding. Residents and small-quantity customers can use the mail-in program, and for other electronics you can call (800) 969-5166 and describe what you need destroyed.",
      },
      {
        q: "Is there free electronics recycling in Chicago?",
        a: "Chicago businesses can request a quote for off-site shredding, and residents can use the prepaid mail-in kit. Call Recycle Technologies at (800) 969-5166 to confirm pricing for your materials.",
      },
      {
        q: "Can my business schedule recurring shredding service?",
        a: "Yes. Chicago businesses get scheduled commercial pickup with windows arranged in advance, from one-time projects to recurring routes. Off-site shredding suits recurring shredding routes and larger volumes.",
      },
      {
        q: "Will I receive documentation?",
        a: "Yes. Every job includes a certificate of destruction with the method, date, and location of destruction, supporting audits and compliance reporting.",
      },
    ],
  },
  after: [],
  cta: {
    heading: "Schedule Off-Site Shredding for Your Chicago Business",
    body: [
      "Recycle Technologies collects materials from your Chicago-area location through scheduled pickup for destruction at its own R2v3-certified facilities, with a certificate of destruction for every job.",
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
    "Moved from the on-site/off-site URL on 9 Oct 2026 (SEO sheet \"Technical Fixes 09/10/26\"); on-site wording removed.",
  ],
}
