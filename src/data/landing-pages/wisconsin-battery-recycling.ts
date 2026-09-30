import { href, quoteHref } from '@/lib/urls'
import { type LandingPage, PICKUP } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Battery Recycling in Wisconsin — /battery-recycling/Wisconsin/ (Google Ads landing page, noindex)
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7153:17067, phone 7153:17487 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 */
export const LANDING_WISCONSIN_BATTERY_RECYCLING: LandingPage = {
  url: href('/battery-recycling/Wisconsin/'),
  figma: { board: "7153:17067", phone: "7153:17487" },
  seo: STATE_PAGES["battery-recycling"].Wisconsin.seo,
  schema: { service: "Battery Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Battery Recycling in Wisconsin",
    h1: "Battery Recycling in Wisconsin",
    body: [
      "Recycle Technologies provides battery recycling in Wisconsin, with commercial pickup available within a 100-mile radius of our Wisconsin facility. Since 1993, we've helped businesses recycle alkaline, lithium-ion, lead-acid, and other battery types.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Battery Recycling", location: "Wisconsin" }) },
    secondary: PICKUP,
    image: { src: '/images/locations/landing/battery-hero.png', w: 966.906, h: 543.885, left: 0.0, top: 0.0 },
  },
  stats: [
    { value: "Since 1993", label: "Recycling batteries for businesses" },
    { value: "100 miles", label: "Commercial pickup radius" },
    { value: "Drop-off & mail-in", label: "Options for individuals" },
    { value: "Certificate", label: "Of recycling and safe disposal" },
  ],
  about: {
    figma: "7153:17151",
    heading: "What’s Battery Recycling in Wisconsin?",
    body: [
      "Battery recycling in Wisconsin is the process of collecting used or spent batteries and handling them properly instead of throwing them away with regular trash. Different battery chemistries require different handling, and batteries can start fires or leak chemicals if they are stored or handled incorrectly.",
      "Recycle Technologies has handled battery recycling from its Minnesota and Wisconsin facilities since 1993. Once batteries arrive at our Wisconsin facility, trained staff sort and separate them by type. After a pickup or drop-off is processed, customers receive a certificate of recycling and safe disposal documenting that their batteries were handled properly.",
    ],
    image: { src: '/images/locations/landing/about-facility.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  bands: [
    {
      figma: "7153:17159",
      heading: "What Batteries Can You Recycle in Wisconsin?",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of battery types. If you're unsure whether your batteries qualify, contact us before scheduling.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Alkaline & Zinc Batteries",
                body: ["Standard alkaline batteries and zinc batteries."],
              },
              {
                title: "Lithium-Ion & Lead-Acid Batteries",
                body: ["Rechargeable lithium-ion battery packs and sealed lead-acid batteries."],
              },
            ],
            [
              {
                title: "Nickel-Cadmium & Button Cell Batteries",
                body: ["NiCd batteries and button-cell batteries."],
              },
              {
                title: "EV, Power Tool & Backup Batteries",
                body: [
                  "Electric vehicle batteries, Tesla batteries, power tool battery packs, and battery backup units.",
                ],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "Other battery types, including mercury oxide batteries, may be handled on a case-by-case basis. Contact Recycle Technologies if your battery type isn't listed.",
          ],
        },
      ],
    },
    {
      figma: "7153:17181",
      heading: "How Do We Recycle Batteries in Wisconsin?",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Batteries can enter the recycling process through a business pickup, a drop-off at a Recycle Technologies location, or the mail-in program. Because different battery chemistries have different handling requirements, sorting is central to the process.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Businesses can schedule a commercial pickup within a 100-mile radius of our Wisconsin facility. Individuals can use a nearby drop-off location or order a mail-in kit.",
                ],
              },
              {
                title: "Sorting and Storage",
                body: [
                  "Once batteries arrive, trained staff sort and separate them by type. Battery terminals should be covered before shipping or storage to reduce the risk of fire. Batteries sent through the mail-in program should already be separated by type.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7153:17203",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "banner",
          heading: "Battery Recycling Pickup in Wisconsin",
          body: [
            "Recycle Technologies offers commercial battery recycling pickup within a 100-mile radius of its Wisconsin facility. Businesses within that range can request a pickup to have spent batteries collected directly.",
          ],
          link: PICKUP,
        },
      ],
    },
    {
      figma: "7153:17210",
      heading: "Mail-In & Drop-Off Battery Recycling",
      grey: false,
      blocks: [
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Drop-Off",
                body: ["Individuals can bring their batteries to a nearby Recycle Technologies location."],
              },
              {
                title: "Mail-In",
                body: [
                  "Individuals can order a mail-in recycling kit for eligible battery types. Batteries sent through the mail-in program should be separated by type before shipping, since not every battery type can be mailed the same way.",
                ],
              },
            ],
          ],
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
        q: "What types of batteries can I recycle in Wisconsin?",
        a: "We accept alkaline, lithium-ion, lead-acid, nickel-cadmium, button-cell, EV, power tool, and backup batteries. Contact us about other battery types.",
      },
      {
        q: "Does Recycle Technologies offer battery pickup in Wisconsin?",
        a: "Yes. Recycle Technologies offers commercial battery recycling pickup within a 100-mile radius of our Wisconsin facility. Businesses within that range can request a pickup to have spent batteries collected directly.",
      },
      {
        q: "How far does the Wisconsin battery recycling pickup service extend?",
        a: "Commercial pickup is available to businesses within a 100-mile radius of our Wisconsin facility. Individuals can use a nearby drop-off location or order a mail-in kit instead.",
      },
      {
        q: "Do batteries need to be sorted before recycling?",
        a: "Once batteries arrive, trained staff sort and separate them by type. Batteries sent through the mail-in program should already be separated by type, and battery terminals should be covered before shipping or storage to reduce the risk of fire.",
      },
      {
        q: "Can batteries be recycled through the mail-in program?",
        a: "Yes. Individuals can order a mail-in recycling kit for eligible battery types. Batteries should be separated by type before shipping, since not every battery type can be mailed the same way.",
      },
    ],
  },
  cta: {
    heading: "Ready to Recycle Your Batteries in Wisconsin?",
    body: [
      "Businesses within 100 miles of our Wisconsin facility can request a quote or schedule a pickup to start recycling their spent batteries.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Battery Recycling", location: "Wisconsin" }) },
    secondary: PICKUP,
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
