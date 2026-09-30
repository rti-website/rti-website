import { href, quoteHref } from '@/lib/urls'
import { type LandingPage, PICKUP } from '@/data/local-pages/types'

/**
 * Light Bulb Recycling in Chicago, Illinois — /light-bulbs/Chicago/ (Google Ads landing page, noindex)
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7155:20798, phone 7155:21217 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 */
export const LANDING_CHICAGO_LIGHT_BULBS: LandingPage = {
  url: href('/light-bulbs/Chicago/'),
  figma: { board: "7155:20798", phone: "7155:21217" },
  seo: {
    title: "Light Bulb Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides commercial light bulb recycling throughout Chicago and surrounding areas.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Light Bulb Recycling in Chicago, Illinois",
    h1: "Light Bulb Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides commercial light bulb recycling throughout Chicago and surrounding areas. Businesses can schedule pickup for spent fluorescent lamps, CFLs, HID lighting, and other accepted bulbs, with collected materials transported to Recycle Technologies facilities in Minnesota and Wisconsin for processing.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Light Bulb Recycling" }) },
    secondary: PICKUP,
    image: { src: '/images/locations/landing/light-bulb-hero.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  stats: [
    { value: "Since 1993", label: "Recycling fluorescent lamps and bulbs" },
    { value: "Scheduled pickup", label: "For Chicago businesses" },
    { value: "R2v3-certified", label: "Minnesota and Wisconsin facilities" },
    { value: "Documentation", label: "Provided as part of the certified process" },
  ],
  about: {
    figma: "7155:20882",
    heading: "What Is Light Bulb Recycling in Chicago?",
    body: [
      "Light bulb recycling provides businesses with a way to properly manage spent lighting instead of placing bulbs in regular waste. This is particularly relevant for mercury-containing lamps, which are subject to disposal restrictions in Illinois.",
      "Recycle Technologies has recycled fluorescent lamps and other light bulbs since 1993. Chicago businesses can arrange scheduled commercial pickup, with collected lighting transported to the company's Minnesota and Wisconsin facilities for processing.",
      "Recycle Technologies does not operate a recycling facility or public drop-off location in Chicago. Residents can use the mail-in program for eligible bulbs by ordering a prepaid recycling kit.",
    ],
    image: { src: '/images/locations/landing/about-chicago.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  bands: [
    {
      figma: "7155:20891",
      heading: "What Light Bulbs Can You Recycle in Chicago?",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts various lamp and lighting types. If you have a bulb or lamp that isn't listed, contact the company to confirm whether it qualifies before arranging service.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Fluorescent Lighting",
                body: [
                  "Fluorescent tubes, plastic-coated and shielded tubes, CFLs, green-tipped bulbs, circular lamps, and U-bend or U-shaped lamps.",
                ],
              },
              {
                title: "Specialty Lamps",
                body: ["UV lamps, neon lamps, argon lamps, and other cold-cathode lamps."],
              },
            ],
            [
              {
                title: "High-Intensity Lighting",
                body: ["HID lamps, metal halide lamps, and high-pressure sodium lamps."],
              },
              { title: "Other Bulbs", body: ["Flood lamps, incandescent bulbs, and halogen bulbs."] },
            ],
          ],
        },
      ],
    },
    {
      figma: "7155:20911",
      heading: "How Do We Recycle Light Bulbs in Chicago?",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies coordinates collection and transportation before separating the different materials contained in spent lighting.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses can schedule pickup for spent bulbs and other accepted lighting materials.",
                ],
              },
              {
                title: "Packaging and Transportation",
                body: [
                  "Bulbs are packaged using Recycle Technologies' fiber bins or original bulb boxes. Packaging requirements are subject to Department of Transportation regulations before materials are transported to the company's Minnesota and Wisconsin facilities.",
                ],
              },
              {
                title: "Material Separation",
                body: [
                  "During processing, mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated for their respective recovery processes.",
                ],
              },
            ],
            [
              {
                title: "Material Recovery",
                body: [
                  "Phosphor powder and filters are sent to a distillation company, glass is used for further industrial applications, and aluminum end caps are sent to an aluminum salvage partner.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Recycle Technologies provides recycling documentation as part of its certified process for businesses that need records for compliance or internal reporting.",
                ],
              },
            ],
          ],
        },
        {
          kind: "buttons",
          primary: { label: 'Get a Quote', href: quoteHref({ service: "Light Bulb Recycling" }) },
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
        q: "What types of light bulbs can I recycle in Chicago?",
        a: "Recycle Technologies accepts fluorescent, CFL, UV, neon, argon, HID, halogen, incandescent, and other listed lamp types.",
      },
      {
        q: "Can Chicago businesses schedule light bulb pickup?",
        a: "Yes. Chicago businesses can schedule pickup for spent fluorescent lamps, CFLs, HID lighting, and other accepted bulbs, which are transported to our Minnesota and Wisconsin facilities for processing. Call 800-969-5166 to confirm current pickup options for your business.",
      },
      {
        q: "Does Recycle Technologies have a light bulb drop-off facility in Chicago?",
        a: "No. Recycle Technologies does not operate a recycling facility or public drop-off location in Chicago. Residents can use the mail-in program for eligible bulbs by ordering a prepaid recycling kit.",
      },
      {
        q: "Will I receive documentation after recycling my light bulbs?",
        a: "Yes. Recycle Technologies provides recycling documentation as part of its certified process for businesses that need records for compliance or internal reporting.",
      },
      {
        q: "How far in advance should I schedule a Chicago pickup?",
        a: "Contact Recycle Technologies at 800-969-5166 to confirm current pickup options and timing for your Chicago-area business. Bulbs should be packaged in Recycle Technologies' fiber bins or original bulb boxes, following Department of Transportation packaging requirements, before they are picked up.",
      },
    ],
  },
  cta: {
    heading: "Get Started With Light Bulb Recycling in Chicago",
    body: [
      "Chicago businesses can arrange commercial pickup for fluorescent lamps, CFLs, HID lighting, and other accepted bulbs. Collected materials are transported to Recycle Technologies facilities in Minnesota and Wisconsin for processing.",
    ],
    line: "Phone: 800-969-5166",
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Light Bulb Recycling" }) },
    secondary: PICKUP,
    footnote: "Contact Recycle Technologies to confirm current pickup options for your Chicago-area business.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
    "SEO title and description written for the build (the frame gives none); noindex.",
  ],
}
