import { href } from '@/lib/urls'
import { type LocalPage, PICKUP, QUOTE, tel } from './types'

/**
 * Phone Shredding Service in Chicago, Illinois — /phone-shredding-chicago/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7128:13307, phone 7128:13739 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 * Generated from the frame, then checked by eye against it.
 */
export const CHICAGO_PHONE_SHREDDING: LocalPage = {
  url: href('/phone-shredding-chicago/'),
  figma: { board: "7128:13307", phone: "7128:13739" },
  seo: {
    title: "Phone Shredding Service in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides secure phone shredding services to businesses in the Chicago area.",
  },
  schema: { service: "Phone Shredding", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Phone Shredding Service in Chicago, Illinois",
    h1: "Phone Shredding Service in Chicago, Illinois",
    body: [
      "Recycle Technologies provides secure phone shredding services to businesses in the Chicago area.",
      "Recycle Technologies does not operate a facility or drop-off point in Chicago. Businesses in the Chicago area are served through scheduled commercial pickup. Residents and small-volume customers can shred phones through the mail-in program, which ships to the company's certified facilities.",
    ],
    primary: QUOTE,
    secondary: PICKUP,
  },
  bands: [
    {
      figma: "7128:13372",
      heading: "Phone Shredding Services in Chicago",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies is a Midwest-based recycling and data destruction company that has destroyed phones and electronic devices at its own R2v3-certified Minnesota and Wisconsin facilities since 1993, rather than through a broker.",
            "In Chicago, the company serves business customers through expanded operations rather than a licensed facility located in the city itself. Every phone is physically shredded so data cannot be read or reconstructed, batteries are removed and recycled separately, and every job comes with a certificate of destruction.",
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
            "Businesses in Chicago can use Recycle Technologies' phone shredding services through scheduled commercial pickup. Collected devices are transported under a secure chain of custody to the company's certified facilities for destruction.",
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
      figma: "7128:13413",
      heading: "What We Shred",
      grey: true,
      blocks: [
        { kind: "text", body: ["Recycle Technologies shreds a broad range of mobile devices, including:"] },
        {
          kind: "cards",
          rows: [
            [
              {
                icon: "phone",
                title: "Cell Phones and Smartphones",
                body: ["iPhones, Android phones, and other mobile phones from any carrier or manufacturer."],
              },
              {
                title: "Tablets and Small Devices",
                body: ["Tablets, e-readers, and other small portable electronics collected alongside phones."],
              },
            ],
            [
              {
                title: "Business Device Refreshes",
                body: [
                  "Bulk phone fleets from corporate upgrades, including devices enrolled in mobile device management programs.",
                ],
              },
              {
                title: "Damaged and Dead Devices",
                body: ["Cracked, water-damaged, and non-working phones that cannot be wiped or reused."],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "Batteries are removed and recycled through proper battery recycling channels before devices are shredded. If your devices are not listed here, reach out and describe what you need destroyed.",
          ],
        },
      ],
    },
    {
      figma: "7128:13435",
      heading: "Phone Shredding for Chicago Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Businesses in the Chicago area can arrange phone shredding for corporate device refreshes, office cleanouts, and decommissioned mobile fleets from any industry, including healthcare, finance, education, and government.",
            "Illinois law requires businesses to dispose of materials containing personal information in a manner that renders the information unreadable, unusable, and undecipherable. Phones often hold email, contacts, photos, and login credentials long after a factory reset, making physical shredding the strongest safeguard.",
            "To arrange service, businesses can request a quote or schedule a commercial pickup at least 3 days in advance. Most Chicago pickups are scheduled within a few business days.",
          ],
        },
      ],
    },
    {
      figma: "7128:13442",
      heading: "Phone Shredding for Chicago Residents",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies does not offer residential pickup or drop-off in Chicago. Chicago residents can shred old phones through the mail-in program by ordering a prepaid kit, packing the phones securely, and shipping them to Recycle Technologies for certified destruction.",
          ],
        },
      ],
    },
    {
      figma: "7128:13447",
      heading: "How Phone Shredding Works",
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
                  "Phones are collected through scheduled pickup and transported under a secure chain of custody to Recycle Technologies' certified Minnesota and Wisconsin facilities.",
                ],
              },
            ],
            [
              {
                title: "Battery Removal and Shredding",
                body: [
                  "Batteries are removed and sent through proper battery recycling channels. Phone bodies are shredded at the company's R2v3-certified facilities so stored data cannot be read or reconstructed.",
                ],
              },
              {
                title: "Certificate of Destruction",
                body: [
                  "Recycle Technologies provides a certificate of destruction with every job, including recorded serial or IMEI numbers where a serialized inventory was requested.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7128:13465",
      heading: "Why Recycle Technologies for Phone Shredding",
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
                  "Phones are shredded directly at Recycle Technologies' own R2v3-certified Minnesota and Wisconsin facilities rather than through an outside broker, so custody never leaves the company.",
                ],
              },
            ],
            [
              {
                icon: "check",
                title: "Batteries Handled Properly",
                body: [
                  "Phone batteries are removed before shredding and recycled through proper channels, keeping hazardous battery materials out of landfills.",
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
      figma: "7128:13483",
      heading: "Local Chicago Phone Shredding Information",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Under the Illinois Personal Information Protection Act, anyone disposing of materials containing personal information must do so in a manner that renders the information unreadable, unusable, and undecipherable. For phones and other electronic media, that means destruction or erasure so the data cannot practicably be read or reconstructed.",
            "Chicago businesses should confirm the current local rules with the City of Chicago before disposing of mobile devices, as specific requirements can change.",
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
        a: "No. Chicago is a service area, not a facility, and Recycle Technologies does not have a licensed recycling plant, warehouse, or processing center there. Phones are shredded at the company's R2v3-certified Minnesota and Wisconsin facilities, and the nearest facility is in New Berlin, Wisconsin.",
      },
      {
        q: "Where can I recycle electronics in Chicago?",
        a: "Recycle Technologies does not operate a facility or drop-off point in Chicago, but businesses can schedule a commercial pickup for phones, tablets, e-readers, and other small portable electronics, and residents can use the prepaid mail-in kit. For other devices, call (800) 969-5166 and describe what you need destroyed.",
      },
      {
        q: "Is there free electronics recycling in Chicago?",
        a: "Chicago businesses can request a quote for phone shredding, and residents can use the prepaid mail-in kit. Call Recycle Technologies at (800) 969-5166 to confirm pricing for your devices.",
      },
      {
        q: "Should I wipe my phone before shredding?",
        a: "Phones often hold email, contacts, photos, and login credentials long after a factory reset, which is why physical shredding is the strongest safeguard. Recycle Technologies shreds every phone so data cannot be read or reconstructed, including cracked, water-damaged, and non-working phones that cannot be wiped. Call (800) 969-5166 if you have questions about preparing your devices.",
      },
      {
        q: "What happens to the batteries inside the phones?",
        a: "Batteries are removed before shredding and recycled separately through proper battery recycling channels, keeping hazardous battery materials out of landfills.",
      },
      {
        q: "Can my business schedule a pickup for a bulk phone refresh?",
        a: "Yes. Chicago businesses can request a quote or schedule a commercial pickup at least 3 days in advance for bulk phone fleets from corporate upgrades, including devices enrolled in mobile device management programs. Most Chicago pickups are scheduled within a few business days.",
      },
      {
        q: "Will I receive documentation that my phones were destroyed?",
        a: "Yes. Recycle Technologies provides a certificate of destruction with every job, including recorded serial or IMEI numbers where a serialized inventory was requested.",
      },
    ],
  },
  after: [],
  cta: {
    heading: "Schedule Phone Shredding for Your Chicago Business",
    body: [
      "Recycle Technologies collects retired phones from offices across the Chicago area, shreds them at its own R2v3-certified facilities with batteries recycled separately, and provides a certificate of destruction for your records.",
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
