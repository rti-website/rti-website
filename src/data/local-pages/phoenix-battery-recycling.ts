import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Phoenix, AZ — /arizona/phoenix/battery-recycling/
 * Management sheet "all plan rti 1", Arizona tab; copy from the content
 * team's Google Doc "Phoenix Battery Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const PHOENIX_BATTERY_RECYCLING: LocalPage = {
  url: href('/arizona/phoenix/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Phoenix, AZ | Recycle Technologies",
    description: "Recycle lithium-ion, lead-acid, alkaline, EV and e-bike batteries at our Phoenix site off I-17, or book business pickup. Mail-in kits available.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Phoenix, AZ", "Arizona"] },
  hero: {
    crumb: "Battery Recycling in Phoenix, AZ",
    h1: "Battery Recycling in Phoenix, AZ",
    body: ["Commercial battery recycling in Phoenix for every chemistry, from alkaline and lithium-ion to lead-acid, EV and e-bike packs. Drop off near I-17, book a business pickup, or mail in a kit."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    "Recycle Technologies recycles used batteries for Phoenix businesses and residents at our site, 1545 East Victory Street, near I-17. We accept alkaline, zinc, lithium-ion, sealed lead-acid, NiCd and button cells, plus EV, e-bike, e-scooter, power tool and UPS backup batteries. Drop-off runs Monday to Friday, 7:30 AM to 2:00 PM, with walk-ins for 1 to 4 pallets. Businesses can book pickup within roughly 100 miles of our Phoenix facility, and small quantities can ship back in a prepaid mail-in kit. Each completed job comes with a certificate of recycling and safe disposal.",
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Phoenix Battery Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Phoenix Recycling Center](${href('/phoenix-arizona/')}) (Maricopa County)`,
          rows: [
            {
              label: "Address",
              value: "[1545 East Victory Street, Phoenix, AZ 85040](https://www.google.com/maps/dir/?api=1&destination=1545+E+Victory+St%2C+Phoenix%2C+AZ+85040)",
            },
            { label: "Phone", value: "(602) 276-1858" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 2:00 PM" },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "Open to businesses and residents. Walk-ins are accepted for 1 to 4 pallets.",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For businesses with bulk or recurring battery loads.",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid kits for dry cell, laptop, lead-acid, and lithium batteries.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Accept in Phoenix",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "We take the battery types the city and most retail bins turn away, along with everyday household cells:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries" },
            { icon: "zap", title: "Lithium-ion batteries and packs, including laptop and phone batteries" },
            { icon: "car", title: "Lead-acid batteries, including sealed lead-acid and vehicle batteries" },
            { icon: "target", title: "Nickel-cadmium (NiCd) and button cell batteries" },
            { icon: "car", title: "EV and Tesla batteries" },
            { icon: "battery", title: "E-bike and e-scooter batteries" },
            { icon: "tool", title: "Power tool packs and battery backup units" },
          ],
        },
        {
          kind: "note",
          body: [
            "Mercury oxide and other uncommon types are accepted on a case-by-case basis. Call (602) 276-1858 and describe what you have.",
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
              title: "Choose your route",
              body: "Drop off at Victory Street, request commercial pickup, or order a mail-in kit.",
            },
            {
              title: "Cover the terminals",
              body: "Put non-conductive tape over the terminals, or bag each battery separately, to prevent short circuits.",
            },
            {
              title: "Keep types apart",
              body: "Store lithium, lead-acid, and alkaline batteries in separate containers. Sorted loads move through processing faster.",
            },
            {
              title: "We sort on arrival",
              body: "Trained staff separate every battery by chemistry, since each type has its own handling requirements.",
            },
            {
              title: "Get your paperwork",
              body: "Once processing is complete, we send your recycling certificate.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Battery Recycling Options in Phoenix, AZ",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Bring batteries to 1545 East Victory Street, at the corner of South 16th Street near I-17, Monday through Friday between 7:30 AM and 2:00 PM. Pull around to the loading area, where staff will log your batteries. Walk-ins are fine for 1 to 4 pallets. Call (602) 276-1858 first for a larger load or any damaged batteries.",
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Fleet operators, auto shops, warehouses, data centers, property managers and schools can schedule battery pickup within roughly 100 miles of our Phoenix facility. Pickup is a business service. When you request a quote, include the battery types, an estimated weight or pallet count, and your address, and we'll confirm scheduling and pricing for your site.",
          ],
          buttons: {
            primary: { label: "Request a Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a branch office or a small stockpile, order a prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). There are separate containers for dry cell, laptop, lead-acid, and primary lithium batteries, so each chemistry ships on its own. Tape the terminals, fill the container, and send it back. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order. EV and other large packs need drop-off or pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Disposal Rules in Phoenix",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The Phoenix Fire Department says lithium-ion battery fires have risen sharply nationwide, and it warns residents never to put these batteries in the trash or recycling bin. City crews also report lithium-ion batteries as some of the most common fire starters in garbage trucks, transfer stations and the landfill.",
            "For businesses, the rules go further:",
          ],
        },
        {
          kind: "checks",
          items: [
            "ADEQ treats batteries as universal waste, so containers must be labeled and sent to a handler or facility that agrees to accept them.",
            "The EPA says most discarded lithium-ion batteries from businesses are likely hazardous waste, and it recommends managing them under the universal waste rules.",
            "Arizona law also bars lead-acid batteries from landfills and incinerators.",
          ],
        },
        {
          kind: "note",
          body: [
            "Residents have limited city options: one at-home hazardous waste collection a year, plus occasional drive-up battery events that turn away car, e-bike, e-scooter and lead-acid batteries. Our Phoenix site takes all of those.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Battery Recycling",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              body: "Every battery chemistry at one Phoenix site, from coin cells to EV packs",
            },
            { icon: "battery", body: "E-bike, e-scooter and lead-acid batteries that city events won't take" },
            { icon: "pin", body: "Walk-in drop-off for up to 4 pallets near I-17" },
            {
              icon: "truck",
              body: "Commercial pickup within roughly 100 miles for fleets, shops and facilities",
            },
            { icon: "mail", body: "Prepaid mail-in kits matched to each battery type" },
            {
              icon: "file",
              body: "A recycling certificate for every completed job, ready for your compliance file",
            },
            { icon: "clock", body: "Recycling batteries since 1993" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is battery recycling free in Phoenix?", a: "Pricing depends on the battery type and quantity. Call (602) 276-1858 or request a quote to confirm the cost before you bring them in." },
      { q: "What should I do with a swollen or damaged lithium battery?", a: "Stop using and charging it, bag it on its own, and keep it away from heat. Then call us before bringing it in." },
      { q: "How long can a business store used batteries before recycling them?", a: "Under ADEQ's universal waste rules, no longer than one year from when the waste is generated, so plan pickups or drop-offs well within that window." },
      { q: "Can a small business use a mail-in kit instead of pickup?", a: "Yes. Kits suit small or occasional volumes, while commercial pickup is better for large or recurring loads." },
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
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Phoenix, AZ",
    body: ["Bring batteries to Victory Street, order a mail-in kit, or request a quote for commercial pickup if you're recycling for a business."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Phoenix", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out (empty placeholder in the doc)"],
}
