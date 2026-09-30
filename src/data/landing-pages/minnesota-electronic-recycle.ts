import { href, quoteHref } from '@/lib/urls'
import { type LandingPage, PICKUP } from '@/data/local-pages/types'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * Electronics Recycling in Minnesota — /electronic-recycle/Minnesota/ (Google Ads landing page, noindex)
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7154:18907, phone 7154:19332 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 */
export const LANDING_MINNESOTA_ELECTRONIC_RECYCLE: LandingPage = {
  url: href('/electronic-recycle/Minnesota/'),
  figma: { board: "7154:18907", phone: "7154:19332" },
  seo: STATE_PAGES["electronic-recycle"].Minnesota.seo,
  schema: { service: "Electronics Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Electronics Recycling in Minnesota",
    h1: "Electronics Recycling in Minnesota",
    body: [
      "Recycle Technologies provides electronics recycling in Minnesota through our licensed facility in Blaine. Since 1993, we’ve helped businesses and individuals recycle computers, monitors, phones, and other electronic equipment. Businesses can schedule a pickup, while individuals can drop off equipment or use our mail-in program.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Electronics Recycling", location: "Minnesota" }) },
    secondary: PICKUP,
    image: { src: '/images/locations/landing/electronics-hero.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  stats: [
    { value: "Since 1993", label: "Electronics recycling services" },
    { value: "R2v3", label: "Active certification in Blaine" },
    { value: "Pickup", label: "Scheduled for businesses" },
    { value: "Drop-off & mail-in", label: "Options for individuals" },
  ],
  about: {
    figma: "7154:18991",
    heading: "What’s Electronics Recycling in Minnesota?",
    body: [
      "Electronics recycling is the process of collecting used or unwanted electronic devices and breaking them down so that their materials can be reused rather than thrown away.",
      "Recycle Technologies has provided electronics recycling services since 1993. At our licensed Blaine, Minnesota facility, electronics are dismantled and processed into recoverable materials including plastic, wire, circuit boards, metals, and glass.",
      "Plastic and wiring are shredded and sent to molders and smelters. Monitors undergo a lead-decontamination step before being recycled, while circuit boards are separated so that the metals and minerals inside them can be collected for reuse.",
      "Our Blaine facility holds active R2v3 certification. Businesses can also use our pickup service to move retired office electronics and IT equipment into a documented recycling process.",
    ],
    image: { src: '/images/locations/landing/about-facility.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  bands: [
    {
      figma: "7154:19001",
      heading: "What Electronics Can You Recycle in Minnesota?",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of electronic and computer-related equipment. If you're unsure whether an item qualifies, contact us before scheduling.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "General Electronics",
                body: [
                  "Cables, switches, chargers, keyboards, mice, remotes, microwaves, televisions, and other everyday electronic items.",
                ],
              },
              { title: "Computers & IT Equipment", body: ["Desktop computers, laptops, and servers."] },
              { title: "Monitors & Displays", body: ["Computer monitors and CRT monitors."] },
            ],
            [
              {
                title: "Office & Imaging Equipment",
                body: ["Fax machines, printers, scanners, and copiers."],
              },
              { title: "Phones", body: ["Cell phones and related mobile devices."] },
            ],
          ],
        },
        {
          kind: "text",
          body: [
            "Have something not listed here? Contact Recycle Technologies to confirm whether we can accept it.",
          ],
        },
      ],
    },
    {
      figma: "7154:19026",
      heading: "How Do We Recycle Electronics in Minnesota?",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Electronics can enter the recycling process through a business pickup, a drop-off at a Recycle Technologies location, or the mail-in program. Equipment then goes through a series of steps before leaving the facility as recovered material.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Collection",
                body: [
                  "Businesses can schedule a pickup. Individuals can drop equipment at a nearby location or order a mail-in recycling kit for eligible items shipped from anywhere in the country.",
                ],
              },
              {
                title: "Sorting and Storage",
                body: ["Incoming electronics are grouped by type before processing begins."],
              },
              {
                title: "Dismantling",
                body: ["Devices are broken down so individual components and materials can be separated."],
              },
            ],
            [
              {
                title: "Separation",
                body: [
                  "Plastic and wiring are separated for shredding; monitors go through a lead-decontamination step; and circuit boards are separated from the rest of the equipment.",
                ],
              },
              {
                title: "Recovery",
                body: [
                  "Shredded plastic and wire are sent to molders and smelters, while metals and minerals recovered from circuit boards are collected for reuse.",
                ],
              },
            ],
          ],
        },
        {
          kind: "text",
          body: ["Because equipment types vary, not every device follows exactly the same processing path."],
        },
        {
          kind: "buttons",
          primary: { label: 'Get a Quote', href: quoteHref({ service: "Electronics Recycling", location: "Minnesota" }) },
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
        q: "What electronics can I recycle in Minnesota?",
        a: "We accept computers, laptops, servers, monitors, printers, copiers, phones, and a range of general electronics. Contact us if you’re unsure about a specific item.",
      },
      {
        q: "Does Recycle Technologies offer electronics pickup for businesses?",
        a: "Yes. Businesses can schedule a pickup to move retired office electronics and IT equipment into a documented recycling process through our Blaine, Minnesota facility.",
      },
      {
        q: "Can individuals recycle electronics at Recycle Technologies?",
        a: "Yes. Individuals can drop off equipment at a nearby Recycle Technologies location or order a mail-in recycling kit for eligible items shipped from anywhere in the country.",
      },
      {
        q: "What happens to electronics after they are recycled?",
        a: "Electronics are dismantled and processed into recoverable materials including plastic, wire, circuit boards, metals, and glass. Shredded plastic and wire are sent to molders and smelters, monitors go through a lead decontamination step, and metals and minerals from circuit boards are collected for reuse.",
      },
      {
        q: "Is the Blaine facility R2v3 certified?",
        a: "Yes. Our Blaine, Minnesota facility holds active R2v3 certification.",
      },
    ],
  },
  cta: {
    heading: "Ready to Recycle Electronics in Minnesota?",
    body: [
      "Businesses can request a quote or schedule a pickup, while individuals can use drop-off or our mail-in program to recycle electronics through our Blaine, Minnesota facility.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Electronics Recycling", location: "Minnesota" }) },
    secondary: PICKUP,
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
  ],
}
