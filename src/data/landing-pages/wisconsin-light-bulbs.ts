import { href, quoteHref } from '@/lib/urls'
import { type LandingPage, PICKUP } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Light Bulb Recycling in Wisconsin — /light-bulbs/Wisconsin/ (Google Ads landing page, noindex)
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7153:18502, phone 7153:18912 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 */
export const LANDING_WISCONSIN_LIGHT_BULBS: LandingPage = {
  url: href('/light-bulbs/Wisconsin/'),
  figma: { board: "7153:18502", phone: "7153:18912" },
  seo: STATE_PAGES["light-bulbs"].Wisconsin.seo,
  schema: { service: "Light Bulb Recycling", areaServed: ["New Berlin, WI", "Wisconsin"] },
  hero: {
    crumb: "Light Bulb Recycling in Wisconsin",
    h1: "Light Bulb Recycling in Wisconsin",
    body: [
      "Recycle Technologies provides commercial light bulb recycling in Wisconsin, processed at our own Wisconsin facility. Since 1993, we've helped businesses recycle fluorescent tubes, CFLs, HID lamps, and more without sending materials through a broker.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Light Bulb Recycling", location: "Wisconsin" }) },
    secondary: PICKUP,
    image: { src: '/images/locations/landing/light-bulb-hero.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  stats: [
    { value: "Since 1993", label: "Recycling fluorescent lamps and bulbs" },
    { value: "Own facility", label: "Processed without a broker" },
    { value: "Nationwide", label: "Universal Waste Mail-In Program" },
    { value: "Documented", label: "Path from pickup to processing" },
  ],
  about: {
    figma: "7153:18586",
    heading: "What's Light Bulb Recycling in Wisconsin?",
    body: [
      "Light bulb recycling is the process of collecting used or spent bulbs and routing them through a facility equipped to separate and recover their components rather than placing them in general trash. Fluorescent-type lamps contain small amounts of mercury, which is why many organizations use recycling services that can document how bulbs are handled from pickup through processing.",
      "Recycle Technologies has recycled fluorescent lamps and other light bulbs since 1993. Collected bulbs are processed at our own Wisconsin facility, where materials are separated and routed through the appropriate recovery process. Mercury-contaminated phosphor powder and filters are shipped to a distillation company, glass is put toward further use in industrial products, and aluminum end caps are sent to an aluminum salvage partner.",
      "Because we manage processing directly rather than sending materials through a broker, Wisconsin businesses have a documented path for their spent lighting from pickup to processing.",
    ],
    image: { src: '/images/locations/landing/about-facility.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  bands: [
    {
      figma: "7153:18595",
      heading: "What Light Bulbs Can You Recycle in Wisconsin?",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of light bulbs and lamps. If you're unsure whether a specific lamp qualifies, contact us before scheduling a pickup or mail-in shipment.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Fluorescent Bulbs",
                body: [
                  "Fluorescent tubes, plastic-coated and shielded tubes, compact fluorescent lamps (CFLs), green-tipped bulbs, circular lamps, and U-bend or U-shaped lamps.",
                ],
              },
              {
                title: "Other Accepted Lighting",
                body: [
                  "Ultraviolet (UV) lamps, neon lamps, argon lamps, other cold cathode lamps, high-intensity discharge (HID) lamps, metal halide lamps, high-pressure sodium lamps, flood lamps, incandescent bulbs, and halogen bulbs.",
                ],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7153:18608",
      heading: "How Do We Recycle Light Bulbs in Wisconsin?",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycling a bulb involves more than placing it in a bin. Once bulbs leave your facility and enter Recycle Technologies' process, they move through collection, packaging, processing, separation, and recovery.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Commercial customers in Wisconsin can schedule a pickup for their spent bulbs. Recycle Technologies also offers a nationwide Universal Waste Mail-In Program for customers who want to ship eligible bulbs from anywhere in the country.",
                ],
              },
              {
                title: "Packaging and Storage",
                body: [
                  "The Department of Transportation regulates how bulbs are packaged for shipping. Recycle Technologies recommends using its fiber bins or the original boxes replacement bulbs arrived in. Packing materials can also be delivered ahead of a scheduled pickup.",
                ],
              },
              {
                title: "Processing",
                body: [
                  "Collected bulbs are processed directly at Recycle Technologies' Minnesota and Wisconsin facilities. For Wisconsin customers, bulbs are processed at our Wisconsin facility rather than being sent through an outside broker.",
                ],
              },
            ],
            [
              {
                title: "Separation",
                body: [
                  "During processing, mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated so each material can be directed to the appropriate next step.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Mercury-contaminated phosphor powder and filters are shipped to a distillation company. Glass is put toward further use in industrial products, while aluminum end caps are sent to an aluminum salvage partner.",
                ],
              },
            ],
          ],
        },
        {
          kind: "buttons",
          primary: { label: 'Get a Quote', href: quoteHref({ service: "Light Bulb Recycling", location: "Wisconsin" }) },
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
        q: "What types of light bulbs can I recycle in Wisconsin?",
        a: "We accept fluorescent tubes, CFLs, HID lamps, incandescent and halogen bulbs, and several other lamp types. Contact us about specific bulbs.",
      },
      {
        q: "Does Recycle Technologies offer commercial light bulb pickup in Wisconsin?",
        a: "Yes. Commercial customers in Wisconsin can schedule a pickup for their spent bulbs, which are processed at our own Wisconsin facility rather than sent through a broker. Packing materials can also be delivered ahead of a scheduled pickup.",
      },
      {
        q: "Can I recycle fluorescent tubes and CFLs?",
        a: "Yes. We accept fluorescent tubes, plastic-coated and shielded tubes, compact fluorescent lamps (CFLs), green-tipped bulbs, circular lamps, and U-bend or U-shaped lamps.",
      },
      {
        q: "What happens to recycled light bulbs?",
        a: "Bulbs are processed at our Wisconsin facility, where mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated. The phosphor powder and filters are shipped to a distillation company, glass is put toward further use in industrial products, and aluminum end caps are sent to an aluminum salvage partner.",
      },
      {
        q: "Can I use the mail-in program if I cannot schedule a pickup?",
        a: "Yes. Recycle Technologies offers a nationwide Universal Waste Mail-In Program for customers who want to ship eligible bulbs from anywhere in the country. If you're unsure whether a specific lamp qualifies, contact us before shipping.",
      },
    ],
  },
  cta: {
    heading: "Ready to Recycle Your Light Bulbs in Wisconsin?",
    body: [
      "Wisconsin businesses can request a quote or schedule a commercial pickup for their spent light bulbs, which are processed at our own Wisconsin facility.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Light Bulb Recycling", location: "Wisconsin" }) },
    secondary: PICKUP,
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
