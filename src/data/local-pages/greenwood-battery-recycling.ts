import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Greenwood, IN — /indiana/greenwood/battery-recycling/
 * Management sheet "all plan rti 1", Indiana tab; copy from the content
 * team's Google Doc "Greenwood Battery Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const GREENWOOD_BATTERY_RECYCLING: LocalPage = {
  url: href('/indiana/greenwood/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Greenwood, IN | Recycle Technologies",
    description: "Battery recycling in Greenwood, IN: drop off lithium-ion, lead-acid, alkaline, EV and e-bike batteries near US-31 and I-65, or book pickup.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Greenwood, IN", "Johnson County, IN", "Indiana"] },
  hero: {
    crumb: "Battery Recycling in Greenwood, IN",
    h1: "Battery Recycling in Greenwood, IN",
    body: ["Battery recycling for Greenwood, Johnson County, and south Indianapolis, with weekday drop-off, commercial pickup options, and prepaid mail-in kits for eligible batteries."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies offers battery recycling at our [Greenwood center](${href('/indiana/greenwood/')}), at 498 Park 800 Drive. We handle common household and commercial battery types, including alkaline, lithium-ion, lead-acid, NiCd, button cells, EV, e-bike, power tool, and UPS batteries. Contact our team to confirm acceptance requirements, arrange a business pickup, or choose a mail-in kit for eligible batteries.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Greenwood Battery Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Greenwood Recycling Center](${href('/indiana/greenwood/')}) (Johnson County)`,
          rows: [
            {
              label: "Address",
              value: "[498 Park 800 Drive, Greenwood, IN 46143](https://www.google.com/maps/dir/?api=1&destination=498+Park+800+Drive%2C+Greenwood%2C+IN+46143)",
            },
            { label: "Phone", value: "(317) 888-3889" },
            { label: "Hours", value: "Monday to Friday, 7:00 AM to 2:00 PM" },
            { label: "Toll-free", value: "(866) 375-7340" },
            {
              label: "Arrival",
              value: "Turn into the Park 800 Drive lot off US-31 or I-65, and staff will direct you to the battery unloading area.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Residential and business drop-off",
              body: "Scheduled appointments preferred",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Contact the team to confirm service coverage for your address",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for eligible battery types" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Take in Greenwood",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "The Greenwood center handles a range of household and commercial batteries, from small cells to larger backup systems.",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries" },
            { icon: "zap", title: "Lithium-ion batteries from phones, laptops, tablets, and cordless tools" },
            { icon: "battery", title: "Lead-acid batteries, including sealed lead-acid units" },
            { icon: "target", title: "NiCd and button cell batteries" },
            { icon: "car", title: "EV and Tesla batteries" },
            { icon: "battery", title: "E-bike and e-scooter batteries" },
            { icon: "plug", title: "UPS systems and other battery backup units" },
            { icon: "battery", title: "Swollen, leaking, or damaged batteries, with advance notice" },
          ],
        },
        {
          kind: "note",
          body: [
            "Mercury oxide batteries may be accepted case by case. Contact the team about unusual battery types or special handling requirements.",
            `See our main [battery recycling page](${href('/battery-recycling/')}) for more information.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Prepare your batteries",
              body: "Follow the handling and packaging instructions provided for your battery type.",
            },
            {
              title: "Separate the chemistries",
              body: "Keep different battery types separate where required.",
            },
            {
              title: "Choose a service",
              body: "Arrange drop-off, request commercial pickup, or order an eligible mail-in kit.",
            },
            {
              title: "Processing",
              body: "Staff assess the batteries and direct them to the appropriate recycling process.",
            },
            {
              title: "Documentation",
              body: "Ask about a recycling certificate and the records available for your shipment.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Battery Recycling Options in Greenwood",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for battery recycling near Greenwood, Bargersville, Beech Grove, or Center Grove? Our Park 800 Drive center serves the surrounding area.",
            "Households and businesses can contact the team to arrange a drop-off. Call ahead, particularly for large loads or swollen, leaking or damaged batteries, so staff can explain the applicable handling requirements.",
            `You may also be able to manage other materials during the same visit. Ask about [electronics recycling](${href('/electronic-recycle/')}), [light bulb recycling](${href('/light-bulbs/')}), [ballast recycling](${href('/ballasts/')}), light fixtures and mercury devices.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Fleet operators, auto repair shops, warehouses, hospitals, schools, utilities, and data centers can contact Recycle Technologies to arrange battery pickup.",
            "When requesting a quote, provide your location, battery types, estimated weight or pallet count, and any known handling requirements. Our team can confirm whether pickup is available and discuss scheduling and pricing.",
          ],
          buttons: {
            primary: { label: "Request a Battery Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            "For smaller quantities, a prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) may be a convenient option. Choose a kit that matches your battery type and follow the provider's packing and shipping instructions.",
            `Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before ordering. EV packs, large industrial batteries, and damaged lithium batteries may require a different service. Confirm eligibility with the team before shipping.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Disposal Rules in Indiana",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Indiana residents and businesses may have different battery disposal options depending on battery chemistry and location. Lithium-ion batteries can create fire risks when placed in household trash or curbside recycling, and lead-acid batteries are subject to specific disposal requirements.",
            "Local programs around Greenwood may have restrictions on accepted battery types, residency, and commercial waste. Check the relevant county or municipal program before visiting. Businesses should also review applicable EPA requirements for managing discarded batteries, including the [EPA's guidance on used lithium-ion batteries](https://www.epa.gov/recycle/used-lithium-ion-batteries).",
            "For battery recycling options at our facility, contact Recycle Technologies to confirm acceptance and handling requirements.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Battery Recycling in Greenwood",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Convenient local facility",
              body: "A Greenwood location serving Johnson County and the surrounding area",
            },
            {
              icon: "layers",
              title: "Multiple battery types",
              body: "Options for common household and commercial batteries",
            },
            {
              icon: "truck",
              title: "Flexible service options",
              body: "Drop-off, business pickup and eligible mail-in programs",
            },
            {
              icon: "recycle",
              title: "Related recycling services",
              body: "Ask about electronics, light bulbs, ballasts and mercury devices",
            },
            {
              icon: "battery",
              title: "Commercial support",
              body: "Request a quote for larger quantities and ongoing battery recycling needs",
            },
            {
              icon: "file",
              title: "Documentation",
              body: "Ask about recycling certificates and records for your shipment",
            },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is battery recycling free in Greenwood?", a: "Cost depends on battery type and quantity. Call (317) 888-3889 or request a quote before your visit." },
      { q: "Can I throw alkaline batteries in the trash in Indiana?", a: "Disposal guidance can vary by battery type and local program. Check local requirements or contact Recycle Technologies to ask about recycling options." },
      { q: "Do you pick up batteries from businesses in Columbus and Shelbyville?", a: "Contact our team with your address, battery types, and estimated quantity to confirm pickup availability." },
      { q: "How long can a business store used batteries before recycling them?", a: "Storage requirements depend on the battery classification and applicable regulations. Businesses should confirm the rules for their specific waste stream and arrange recycling accordingly." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Greenwood",
    body: ["Need to recycle batteries from your home, business, or facility? Contact Recycle Technologies to confirm accepted battery types, arrange a drop-off, explore a mail-in kit, or request a commercial pickup quote.", "Greenwood: (317) 888-3889 | Toll-free: (866) 375-7340"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Greenwood", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Greenwood reviews are supplied", "Business pickup: the doc has one quote button, a Schedule a Pickup button added beside it as on the other pages"],
}
