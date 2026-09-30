import { href, quoteHref } from '@/lib/urls'
import { type LandingPage, PICKUP } from '@/data/local-pages/types'

/**
 * Electronics Recycling in Chicago, Illinois — /electronic-recycle/Chicago/ (Google Ads landing page, noindex)
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7155:20043, phone 7155:20482 (30 Sep 2026).
 * The frame's copy word for word; see `todo` for what the build had to settle.
 */
export const LANDING_CHICAGO_ELECTRONIC_RECYCLE: LandingPage = {
  url: href('/electronic-recycle/Chicago/'),
  figma: { board: "7155:20043", phone: "7155:20482" },
  seo: {
    title: "Electronics Recycling in Chicago, Illinois | Recycle Technologies",
    description: "Recycle Technologies provides electronics recycling for Chicago businesses, residents, and small-volume customers.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Chicago, IL"] },
  hero: {
    crumb: "Electronics Recycling in Chicago, Illinois",
    h1: "Electronics Recycling in Chicago, Illinois",
    body: [
      "Recycle Technologies provides electronics recycling for Chicago businesses, residents, and small-volume customers. Businesses can arrange scheduled commercial pickup, while eligible electronics can be shipped through the mail-in program. Processing takes place at Recycle Technologies facilities outside Chicago.",
    ],
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Electronics Recycling" }) },
    secondary: PICKUP,
    image: { src: '/images/locations/landing/electronics-hero.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  stats: [
    { value: "Since 1993", label: "Serving Chicago through scheduled pickup" },
    { value: "Scheduled pickup", label: "For larger quantities" },
    { value: "Mail-in program", label: "For residents and small-volume customers" },
    { value: "R2v3 & RIOS", label: "Certifications for applicable processes" },
  ],
  about: {
    figma: "7155:20127",
    heading: "What Is Electronics Recycling in Chicago?",
    body: [
      "Electronics recycling gives businesses and residents a way to move unwanted computers, displays, networking equipment, televisions, and other electronic devices into a dedicated recycling process instead of regular waste.",
      "Recycle Technologies has operated since 1993 and serves Chicago through scheduled commercial pickup rather than a local recycling facility. Businesses with larger quantities can arrange pickup, while residents and small-volume customers can use the mail-in program for eligible electronics.",
      "Collected equipment is sorted and separated into materials such as metals, plastics, glass, wire, and circuit boards. Electronics containing storage devices can also be directed to hard drive destruction when secure data destruction is required.",
    ],
    image: { src: '/images/locations/landing/about-chicago.png', w: 560.0, h: 420.0, left: 0.0, top: 0.0 },
  },
  bands: [
    {
      figma: "7155:20136",
      heading: "What Electronics Can You Recycle in Chicago?",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Recycle Technologies accepts a broad range of electronics and e-waste. If you're unsure about a specific item, provide the equipment details when requesting service so its eligibility can be confirmed.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Computers & IT Equipment",
                body: ["Desktop computers, laptops, workstations, servers, and related equipment."],
              },
              {
                title: "Monitors & Displays",
                body: ["Computer monitors, LCD displays, and other electronic display equipment."],
              },
              { title: "Televisions", body: ["CRT, LCD, LED, plasma, and other television types."] },
              {
                title: "Networking Equipment",
                body: ["Switches, routers, access points, modems, and other networking hardware."],
              },
            ],
            [
              {
                title: "Cables & Accessories",
                body: [
                  "Power cables, data cables, chargers, adapters, keyboards, mice, and similar accessories.",
                ],
              },
              {
                title: "Phones & Telecommunications Equipment",
                body: ["Cell phones, business phones, telecommunications equipment, and related electronics."],
              },
              {
                title: "Office Electronics",
                body: ["Printers, copiers, scanners, fax machines, and other office equipment."],
              },
              {
                title: "Other Electronics",
                body: ["Small electronic devices, electronic components, and miscellaneous e-waste."],
              },
            ],
          ],
        },
      ],
    },
    {
      figma: "7155:20168",
      heading: "How Do We Recycle Electronics in Chicago?",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "The recycling process starts with getting your equipment to Recycle Technologies through the service option that fits the quantity and type of electronics you have.",
          ],
        },
        {
          kind: "cards",
          rows: [
            [
              {
                title: "Commercial Pickup",
                body: [
                  "Chicago businesses can schedule pickup for larger quantities of computers, electronics, and other e-waste.",
                ],
              },
              {
                title: "Mail-In Recycling",
                body: [
                  "Residents and small-volume customers can use the mail-in program for eligible electronics that can be safely shipped for processing.",
                ],
              },
              {
                title: "Sorting and Processing",
                body: [
                  "Collected electronics are sorted and broken down into materials including plastic, wire, circuit boards, metals, and glass.",
                ],
              },
            ],
            [
              {
                title: "Data Destruction",
                body: [
                  "Hard drives and other storage devices that require secure destruction can be handled through the applicable hard drive destruction service before the remaining equipment enters the recycling process.",
                ],
              },
              {
                title: "Material Recovery",
                body: [
                  "Recovered plastics, metals, glass, circuit boards, wire, and other materials are separated and processed for recycling and reuse instead of being sent to a landfill.",
                ],
              },
              {
                title: "Documentation",
                body: [
                  "Recycle Technologies provides recycling documentation as part of its certified process for customers who need records for compliance or internal reporting.",
                ],
              },
            ],
          ],
        },
        {
          kind: "buttons",
          primary: { label: 'Get a Quote', href: quoteHref({ service: "Electronics Recycling" }) },
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
        q: "What electronics can I recycle in Chicago?",
        a: "Computers, laptops, servers, monitors, TVs, networking equipment, cables, phones, printers, and other electronics are accepted.",
      },
      {
        q: "Can I recycle electronics that still work?",
        a: "Recycle Technologies accepts unwanted computers, displays, networking equipment, televisions, and other electronic devices for recycling. Provide the equipment details when requesting service, or call 800-969-5166, so eligibility can be confirmed.",
      },
      {
        q: "Does Recycle Technologies have an electronics drop-off facility in Chicago?",
        a: "No. Recycle Technologies serves Chicago through scheduled commercial pickup rather than a local recycling facility, and processing takes place at facilities outside Chicago. Residents and small-volume customers can use the mail-in program for eligible electronics.",
      },
      {
        q: "Can Recycle Technologies destroy hard drives securely?",
        a: "Yes. Electronics containing storage devices can be directed to hard drive destruction when secure data destruction is required, before the remaining equipment enters the recycling process.",
      },
      {
        q: "Will I receive documentation after recycling my electronics?",
        a: "Yes. Recycle Technologies provides recycling documentation as part of its certified process for customers who need records for compliance or internal reporting.",
      },
    ],
  },
  cta: {
    heading: "Get Started With Electronics Recycling in Chicago",
    body: [
      "Chicago businesses can arrange scheduled commercial pickup for computers, IT equipment, televisions, networking hardware, and other electronics. Residents and small-volume customers can check the mail-in program for eligible items.",
      "Tell us what equipment you have and where it is located.",
    ],
    line: "Phone: 800-969-5166",
    primary: { label: 'Get a Quote', href: quoteHref({ service: "Electronics Recycling" }) },
    secondary: PICKUP,
    footnote: "Contact Recycle Technologies to confirm current service options and eligibility for your electronics.",
  },
  todo: [
    "FAQ answers written for the build from the page's own copy (the frames draw these closed): 4 of 5. Confirm or replace.",
    "SEO title and description written for the build (the frame gives none); noindex.",
  ],
}
