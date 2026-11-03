import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Ontario, CA — /california/ontario/battery-recycling/
 * Management sheet "all plan rti 1", California tab; copy from the content
 * team's Google Doc "Ontario CA Battery Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const ONTARIO_BATTERY_RECYCLING: LocalPage = {
  url: href('/california/ontario/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Ontario, CA | Recycle Technologies",
    description: "Battery recycling in Ontario, CA: drop off alkaline, lithium, lead-acid, EV and e-bike batteries on weekdays with no appointment, or book business pickup.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Ontario, CA", "San Bernardino County, CA", "California"] },
  hero: {
    crumb: "Battery Recycling in Ontario, CA",
    h1: "Battery Recycling in Ontario, CA",
    body: ["Battery recycling for Ontario and the Inland Empire, with weekday drop-off on Francis Street, commercial pickup and recurring collection, and prepaid kits for small batches."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies recycles used batteries at our [Ontario center](${href('/california/ontario/')}), at 805 East Francis Street, off the 60 Freeway. Accepted battery types include alkaline and zinc cells, lithium-ion and lithium metal, lead-acid and sealed lead-acid, NiCd, NiMH and button cells, along with EV, Tesla, e-bike, e-scooter, power tool and UPS backup batteries. Contact the team about swollen, leaking or damaged batteries before bringing them in. Residential and business customers can use the drop-off service, while businesses can ask about pickup and recurring collection. Prepaid mail-in kits are available for eligible small batches.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Ontario Battery Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ontario Recycling Center](${href('/california/ontario/')}) (San Bernardino County)`,
          rows: [
            {
              label: "Address",
              value: "[805 East Francis Street, Ontario, CA 91761](https://www.google.com/maps/dir/?api=1&destination=805+E+Francis+St%2C+Ontario%2C+CA+91761)",
            },
            { label: "Phone", value: "(909) 923-7252" },
            { label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
            {
              label: "Arrival",
              value: "Exit the 60, take Francis Street, and pull in at the driveway between Campus and Bon View avenues. Someone on site will show you where batteries go.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Residential and business drop-off", body: "No appointment needed" },
            {
              icon: "truck",
              title: "Business pickup and recurring collection",
              body: "Contact the team to confirm availability for your location",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid kits for eligible alkaline, lithium, and lead-acid batteries",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Take in Ontario",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "From a kitchen drawer of AAs to backup batteries behind a warehouse server rack, the Ontario center accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries" },
            { icon: "zap", title: "Lithium-ion batteries from phones, laptops, tablets and cordless tools" },
            { icon: "zap", title: "Lithium metal batteries" },
            { icon: "battery", title: "Lead-acid and sealed lead-acid batteries" },
            { icon: "target", title: "NiCd, NiMH and button cell batteries" },
            { icon: "car", title: "EV and Tesla batteries" },
            { icon: "battery", title: "E-bike and e-scooter batteries" },
            { icon: "plug", title: "UPS systems and other battery backup units" },
            {
              icon: "battery",
              title: "Swollen, leaking or damaged batteries, subject to the appropriate handling process",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Mercury oxide batteries are reviewed case by case. Contact the team about less common battery types before bringing them in.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Tape It Before You Bring It",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Tape It Before You Bring It",
          body: [
            "Prepare batteries for transport according to the instructions for their type. Lithium and rechargeable batteries may require terminal protection, such as covering exposed terminals with suitable tape or placing individual batteries in separate bags. Keep different chemistries separated and labels visible.",
            `See our main [battery recycling page](${href('/battery-recycling/')}) for more information about battery types and recycling options.`,
          ],
          panel: [
            "For damaged, swollen, or leaking batteries, contact the facility before handling or transporting them.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Prepare the batteries",
              body: "Follow the appropriate packaging and terminal-protection instructions for each battery type.",
            },
            {
              title: "Choose a service",
              body: "Use the Ontario drop-off center, ask about business pickup, or check whether your batteries qualify for a mail-in kit.",
            },
            {
              title: "Hand over or ship the batteries",
              body: "Follow the instructions for your selected service.",
            },
            {
              title: "Sorting and processing",
              body: "Batteries are sorted by type and directed to the appropriate recycling process.",
            },
            {
              title: "Documentation",
              body: "Ask about a Certificate of Recycling and other records available for your shipment.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Recycling Options in Ontario",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "The Ontario center provides a local option for residents and businesses looking to recycle used batteries. Located on East Francis Street near the 60 Freeway, the facility serves customers in Ontario and surrounding Inland Empire communities.",
            "Before visiting with a large load, backup battery units, or damaged batteries, contact the team to confirm acceptance and handling requirements.",
            `If your cleanout also includes other materials, ask about [electronics recycling](${href('/electronic-recycle/')}), [fluorescent lamps](${href('/light-bulbs/')}), [ballasts](${href('/ballasts/')}), aerosol cans, and mercury devices.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup and Recurring Collection",
          dark: true,
          body: [
            "Businesses generating batteries regularly may be able to arrange one-time pickups or recurring collections. Potential customers include fleet operators, auto repair shops, warehouses, hospitals, schools, retailers and data centers.",
          ],
          listIntro: "Pickup availability depends on the business location, battery types, quantity and collection requirements. When requesting a quote, include:",
          list: [
            "**Site address:** street, city and ZIP code",
            "**Battery types:** alkaline, lithium, lead-acid, NiCd, NiMH, EV or mixed",
            "**Quantity:** estimated weight, container count or number of pallets",
            "**Condition:** whether any batteries are swollen, leaking or damaged",
            "**Frequency:** one-time collection or recurring pickups",
            "**Access:** preferred collection window and any dock or loading restrictions",
          ],
          buttons: {
            primary: { label: "Request a Battery Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
          after: [
            "Our team will confirm service availability and explain the next steps for scheduling and pricing.",
          ],
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            "A prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) may be suitable for small quantities generated by an office or branch location.",
            `Choose a container that matches your battery type and follow the program's packaging and shipping instructions. Some batteries are subject to shipping restrictions, so review the [mail-in recycling program](${href('/mail-in-recycling/')}) before ordering.`,
            "EV packs, large backup batteries and damaged lithium batteries may require a different service arrangement. Contact the team to determine the appropriate option.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Battery Disposal Guidance in California",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "California regulates batteries as universal waste in many circumstances, including common household battery types. The state's Department of Toxic Substances Control provides guidance on managing these materials through appropriate collection and recycling channels. See the [DTSC universal waste fact sheet](https://dtsc.ca.gov/universal-waste-fact-sheet/).",
            "CalRecycle also provides information about battery-related fires at waste facilities and the importance of keeping batteries out of ordinary waste streams. See [CalRecycle's battery information](https://calrecycle.ca.gov/epr/batteries/).",
            "Local household hazardous waste programs may provide additional drop-off options for residents. Businesses should confirm whether a local program accepts commercial waste or whether they need a dedicated recycling provider.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Battery Recycling in Ontario",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Convenient weekday access",
              body: "A local facility for customers bringing in eligible batteries",
            },
            {
              icon: "layers",
              title: "Multiple battery types",
              body: "Options for common household batteries and a range of commercial battery categories",
            },
            {
              icon: "truck",
              title: "Commercial collection",
              body: "Ask about one-time pickups and recurring battery collection programs",
            },
            {
              icon: "layers",
              title: "Related recycling services",
              body: "Businesses may also be able to arrange recycling for electronics, lamps, ballasts and other accepted materials",
            },
            {
              icon: "mail",
              title: "Mail-in options",
              body: "Prepaid kits may be suitable for eligible small batches",
            },
            {
              icon: "clock",
              title: "Experience",
              body: "Recycle Technologies has been handling recycling services since 1993",
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
      { q: "Is battery recycling free in Ontario?", a: "Cost depends on the battery type and quantity. Call (909) 923-7252 or request a quote before visiting." },
      { q: "What should I do with a swollen phone or laptop battery?", a: "Stop using or charging the device and keep it away from heat. Contact the recycling facility before handling or transporting a swollen battery for instructions specific to its condition." },
      { q: "Does California's battery stewardship law make recycling free?", a: "Collection programs and requirements can vary by battery type and program. Check CalRecycle for current information about California's battery stewardship requirements." },
      { q: "Can I bring a device instead of removing its battery?", a: "Contact the facility to confirm whether your device is accepted intact. You can also review the electronics recycling service for information about recycling electronic equipment." },
      { q: "Can a business in Riverside or Los Angeles County arrange recurring pickups?", a: "Pickup availability depends on the address, battery types and quantity. Submit your details through our quote form so the team can confirm coverage." },
      { q: "How long can a business store used batteries?", a: "Storage requirements depend on the battery type and applicable regulations. Review the relevant DTSC universal waste guidance and confirm requirements for your specific waste stream." },
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
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Ontario",
    body: ["Need to recycle batteries from home or work? Visit the Ontario center, explore an eligible mail-in kit, or submit your business details to discuss pickup options."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Ontario", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ontario reviews are supplied"],
}
