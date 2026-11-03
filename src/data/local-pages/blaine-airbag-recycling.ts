import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Airbag Recycling in Blaine, Minnesota — /minnesota/blaine/airbag-recycling/
 * Management sheet "all plan rti 1", Minnesota tab; copy from the content
 * team's Google Doc "Airbag Recycling in Minnesota (Blaine Airbag Recycling Page)", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const BLAINE_AIRBAG_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/airbag-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Airbag Recycling in Blaine, Minnesota | Deployed & Undeployed Airbags",
    description: "Recycle deployed and undeployed airbags, inflators, and modules at our licensed Blaine, MN facility. Drop-off for shops and residents, plus pickup for auto businesses.",
  },
  schema: { service: "Airbag Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Airbag Recycling in Blaine, Minnesota",
    h1: "Airbag Recycling in Blaine, Minnesota",
    body: ["Airbag recycling for auto shops, dealerships, dismantlers, fleets and residents across the north metro, with drop-off at our licensed Blaine facility, scheduled pickup for businesses, and mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `An airbag that never went off still holds the charge that inflates it, including chemicals such as sodium azide, so it can't ride along with the regular trash or scrap. Recycle Technologies runs a licensed airbag waste collection facility at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE. We take deployed and undeployed airbags, from steering wheel and dash units to side curtains, knee and seat airbags, plus standalone inflators and modules. Repair shops and dismantlers can drop off or book pickup; residents can bring in a few units, and every completed job comes with a certificate of recycling.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Airbag Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`,
          rows: [
            {
              label: "Address",
              value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)",
            },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Arrival",
              value: "From I-35W, exit at 99th Ave NE and continue to 99th Lane NE. Pull around the 1525 building to the rear loading area and the north-end dock. Call before you come so we know you're bringing airbags, and a team member will meet you to log them. Parking is free.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "For businesses and individuals, weekdays at the Blaine facility",
            },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "Scheduled for auto businesses within roughly 100 miles",
            },
            { icon: "mail", title: "Mail-in", body: "Airbag recycling kits for customers outside our area" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Airbags We Take in Blaine",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether it's one airbag pulled during a collision repair in Coon Rapids or a bin of modules from a dismantling yard, our Blaine facility accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "car", title: "Deployed airbags" },
            { icon: "car", title: "Undeployed (live) airbags" },
            { icon: "car", title: "Driver-side steering wheel airbags and passenger dash airbags" },
            { icon: "car", title: "Side-impact and side curtain airbags" },
            { icon: "car", title: "Knee airbags and seat-mounted airbags" },
            { icon: "car", title: "Standalone inflators and airbag modules" },
          ],
        },
        { kind: "note", body: ["Each unit is processed according to its type and condition."] },
      ],
    },
    {
      figma: "doc-3",
      heading: "Handling and Packing Undeployed Airbags",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Handling and Packing Undeployed Airbags",
          body: [
            `See our main [airbag recycling page](${href('/airbag-recycling/')}) for more on how airbags are handled.`,
          ],
          panel: [
            "Treat a live airbag like the stored energy it is. Keep it away from heat, and don't try to open, cut, or set it off yourself. If you're shipping undeployed units, they must be packaged and labeled under DOT hazmat rules, and we're happy to explain the steps before you ship. Deployed airbags are simpler to move, but they should still come in boxed or bagged so loose parts stay together.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Airbag Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Reach out first",
              body: "Call 763-559-5130 or request a quote, and tell us how many airbags you have and whether they're deployed or live.",
            },
            {
              title: "Choose drop-off, pickup, or mail-in",
              body: "Bring them to Blaine, schedule a business pickup, or order a kit if you're farther away.",
            },
            {
              title: "Pack them correctly",
              body: "Keep live units protected and labeled, and box deployed units so nothing spills.",
            },
            {
              title: "Certified disposal",
              body: "Airbags are processed at our licensed collection facility by type and condition.",
            },
            {
              title: "Certificate of recycling",
              body: "You receive documentation for your shop or fleet records.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Airbag Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for airbag recycling near you in Blaine, Ham Lake or Fridley? Bring airbags to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. Drop-off works for repair shops with a handful of units and for individuals who pulled an airbag during their own repair. Call 763-559-5130 before you come, especially with undeployed units.",
            `While you're here, you can also drop off [batteries](${href('/battery-recycling/')}), shop [electronics](${href('/electronic-recycle/')}) and old computers.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Body shops, collision centers, dealerships, vehicle dismantlers and fleet operators build up airbags faster than they can haul them. Scheduled pickup is a business service covering sites within roughly 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Lino Lakes, Mounds View, Roseville, Brooklyn Park, Maple Grove, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Shop address:** street, city and ZIP, plus loading access",
            "**Airbag count:** an estimate, or the number of boxes or bins",
            "**Condition:** how many are deployed and how many are live",
            "**Types:** steering wheel, dash, curtain, knee, seat or loose inflators",
            "**Packing:** whether live units are already packed and labeled",
            "**Frequency:** a single cleanout or regular collection",
          ],
          buttons: {
            primary: { label: "Request an Airbag Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `Outside our pickup area or only have a few units? Order an [airbag recycling kit](https://ezontheearth.com/collections/airbag-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) and follow the packing and labeling instructions before shipping. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Minnesota Counties We Serve",
      grey: true,
      blocks: [
        {
          kind: "places",
          links: [
            { label: "Anoka County", href: href('/minnesota-recycling/anoka-county-recycling/') },
            { label: "Hennepin County", href: href('/minnesota-recycling/hennepin-county-recycling-center/') },
            { label: "Ramsey County", href: href('/minnesota-recycling/ramsey/') },
            { label: "Dakota County", href: href('/minnesota-recycling/dakota-county/') },
            { label: "Washington County", href: href('/minnesota-recycling/washington-county/') },
            { label: "Scott County", href: href('/minnesota-recycling/scott-county/') },
            { label: "Olmsted County", href: href('/minnesota-recycling/olmsted-county/') },
            { label: "Benton County (St. Cloud)", href: href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/') },
            { label: "St. Louis County (Duluth)", href: href('/minnesota-recycling/electronic-recycling-duluth/') },
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Airbag Recycling in Blaine",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "shield",
              title: "Licensed local facility",
              body: "Our Blaine site is a licensed airbag waste collection facility, a short drive for north metro shops",
            },
            {
              icon: "car",
              title: "Deployed and live units",
              body: "Steering wheel, dash, curtain, knee and seat airbags, plus inflators and modules",
            },
            {
              icon: "car",
              title: "Hazmat packing guidance",
              body: "Help with DOT packaging and labeling for undeployed airbags",
            },
            { icon: "truck", title: "Three ways in", body: "Weekday drop-off, business pickup or mail-in" },
            {
              icon: "file",
              title: "Paperwork for your files",
              body: "A certificate of recycling with every completed job",
            },
            { icon: "shield", title: "Recognized standards", body: "RIOS and R2v3, independently audited" },
            {
              icon: "clock",
              title: "Since 1993",
              body: "More than 30 years of recycling in Minnesota and Wisconsin",
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
      { q: "What does airbag recycling cost in Blaine?", a: "Pricing depends on the number of units and whether they're deployed or live. Call 763-559-5130 or request a quote." },
      { q: "Can an individual schedule an airbag pickup?", a: "No. Pickup is for commercial customers. Individuals can use Blaine drop-off or a mail-in kit." },
      { q: "Can I put an airbag in the garbage in Minnesota?", a: "No. Airbags, especially undeployed ones, contain chemicals that keep them out of the trash." },
      { q: "Is there a Minnesota email for shop pickups?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you have a facility in Wisconsin?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
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
            { label: "Airbag Recycling", href: href('/airbag-recycling/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Airbag Recycling in Blaine, MN",
    body: ["Call ahead and bring airbags to 1525 99th Ln NE on any weekday, order a kit if you're farther out, or send us your shop address and unit count for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Airbag Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "Mail-in kit: the doc asked to confirm the kit URL", "linked to the site's existing airbag kit collection (ezontheearth.com/collections/airbag-recycle-kit)", "FAQ \"Do you have a Minnesota airbag recycling page?\" left out: it links /minnesota-recycling/airbag-recycling/, which the sheet deleted"],
}
