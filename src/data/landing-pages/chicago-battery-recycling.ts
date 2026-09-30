import { href, quoteHref } from '@/lib/urls'
import { type LandingPage, PICKUP } from '@/data/local-pages/types'

/**
 * Battery Recycling in Chicago, Illinois — /battery-recycling/Chicago/ (Google Ads landing page, noindex)
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7155:19323, phone 7155:19746 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 */
export const LANDING_CHICAGO_BATTERY_RECYCLING: LandingPage = {
  url: href('/battery-recycling/Chicago/'),
  figma: { board: "7155:19323", phone: "7155:19746" },
  seo: {
    title: "Battery Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides commercial battery recycling throughout Chicago and surrounding areas.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Battery Recycling in Chicago, Illinois",
    h1: "Battery Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides commercial battery recycling throughout Chicago and surrounding areas. Businesses can schedule a pickup for spent batteries, while residents and small-volume customers can use our mail-in recycling program. Batteries are processed at our Minnesota and Wisconsin facilities.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Battery Recycling" }) },
    secondary: PICKUP,
    image: { src: '/images/locations/landing/battery-hero.png', w: 966.906, h: 543.885, left: 0.0, top: 0.0 },
  },
  stats: [
    { value: "Since 1993", label: "Recycling services" },
    { value: "Scheduled pickup", label: "For Chicago businesses" },
    { value: "Mail-in program", label: "For residents and small-volume customers" },
    { value: "MN & WI facilities", label: "Where batteries are processed" },
  ],
  about: {
    figma: "7155:19407",
    heading: "What Is Battery Recycling in Chicago?",
    body: [
      "Battery recycling involves collecting used batteries and sending them through specialized processing so their materials can be recovered instead of being discarded with general waste.",
      "Recycle Technologies has provided recycling services since 1993. Chicago businesses can arrange commercial pickup for accumulated batteries from offices, IT environments, facilities, warehouses, and fleet operations.",
      "Recycle Technologies does not operate a recycling facility or public drop-off location in Chicago. Commercial customers in the area are served through scheduled pickup, while residents and customers with smaller quantities can use the mail-in program.",
      "Collected batteries are transported to Recycle Technologies facilities in Minnesota and Wisconsin for sorting and processing rather than being routed through an outside broker.",
    ],
    image: { src: '/images/locations/landing/about-chicago.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  bands: [
    {
      figma: "7155:19417",
      heading: "What Batteries Can You Recycle in Chicago?",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a wide range of battery chemistries and battery-powered equipment. If you have a battery type that isn't listed below, contact us to confirm whether it can be accepted.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Alkaline & Zinc Batteries",
                body: ["Common household and commercial alkaline and zinc batteries."],
              },
              {
                title: "Lithium-Ion & Lead-Acid Batteries",
                body: ["Rechargeable lithium-ion battery packs and sealed lead-acid batteries."],
              },
              {
                title: "Nickel-Cadmium & Button Cells",
                body: ["NiCd batteries and small button-cell batteries."],
              },
            ],
            [
              {
                title: "EV & Power Tool Batteries",
                body: [
                  "Electric vehicle batteries, including Tesla batteries, along with power tool battery packs.",
                ],
              },
              {
                title: "Backup & Other Batteries",
                body: [
                  "Battery backup units and other battery types, including mercury oxide batteries on a case-by-case basis.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7155:19440",
      heading: "How Do We Recycle Batteries in Chicago?",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "From collection through processing, batteries are handled according to their type and condition. Recycle Technologies provides businesses with a practical way to move accumulated batteries out of storage and into the recycling process.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses can schedule a pickup for spent batteries and larger quantities accumulated through regular operations.",
                ],
              },
              {
                title: "Mail-In Recycling",
                body: [
                  "Residents and small-volume customers can order a prepaid battery recycling kit and ship eligible batteries to Recycle Technologies for processing.",
                ],
              },
              {
                title: "Sorting",
                body: [
                  "Once received, batteries are separated according to their chemistry and type so they can be directed through the appropriate processing stream.",
                ],
              },
            ],
            [
              {
                title: "Processing",
                body: [
                  "Batteries collected through the Chicago service area are processed at Recycle Technologies facilities in Minnesota and Wisconsin.",
                ],
              },
              {
                title: "Material Recovery",
                body: [
                  "Properly sorting and processing batteries helps recover usable materials and reduces the amount of battery waste sent to landfills.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Businesses receive recycling documentation as part of the recycling process, giving them records for internal reporting and applicable compliance needs.",
                ],
              },
            ],
          ],
        },
        {
          kind: "buttons",
          primary: { label: 'Get a Quote', href: quoteHref({ service: "Battery Recycling" }) },
          secondary: PICKUP,
        },
      ],
    },
  ],
  certBody: "Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.",
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "Does Recycle Technologies offer battery recycling in Chicago?",
        a: "Yes. Chicago businesses can arrange commercial battery recycling through scheduled pickup.",
      },
      {
        q: "Does Recycle Technologies have a battery recycling facility in Chicago?",
        a: "No. Recycle Technologies does not operate a recycling facility or public drop-off location in Chicago. Collected batteries are transported to our Minnesota and Wisconsin facilities for sorting and processing.",
      },
      {
        q: "What types of batteries can businesses recycle?",
        a: "Businesses can recycle alkaline and zinc, lithium-ion, sealed lead-acid, nickel-cadmium, and button-cell batteries, along with EV batteries (including Tesla batteries), power tool battery packs, and battery backup units. Mercury oxide and other battery types are handled on a case-by-case basis, so contact us to confirm anything not listed.",
      },
      {
        q: "Can Chicago residents recycle batteries with Recycle Technologies?",
        a: "Yes. Residents and small-volume customers can order a prepaid battery recycling kit and ship eligible batteries to Recycle Technologies for processing. There is no public drop-off location in Chicago.",
      },
      {
        q: "How do I schedule a battery recycling pickup in Chicago?",
        a: "Use the Schedule a Pickup or Get a Quote button on this page to request commercial pickup for spent batteries accumulated through your operations. If you have a battery type that isn't listed, contact us to confirm whether it can be accepted.",
      },
    ],
  },
  cta: {
    heading: "Ready to Recycle Batteries in Chicago?",
    body: [
      "Chicago businesses can schedule commercial battery pickup for batteries accumulated through offices, warehouses, IT operations, facilities, and fleet operations. Recycle Technologies processes collected batteries at its own Minnesota and Wisconsin facilities and provides documentation for your records.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Battery Recycling" }) },
    secondary: PICKUP,
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
    "SEO title and description written for the build (the frame gives none); noindex.",
  ],
}
