import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Ocala, FL — /florida/ocala/electronic-recycling/
 * Management sheet "all plan rti 1", Florida tab; copy from the content
 * team's Google Doc "Ocala Electronics Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const OCALA_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/florida/ocala/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Ocala, FL | Recycle Technologies",
    description: "Electronics recycling in Ocala, FL for computers, TVs, and office equipment. Book a weekday drop-off or request business pickup from Recycle Technologies.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Ocala, FL", "Marion County, FL", "Florida"] },
  hero: {
    crumb: "Electronics Recycling in Ocala, FL",
    h1: "Electronics Recycling in Ocala, FL",
    body: ["Electronics recycling for Ocala and Marion County businesses and households, with appointment drop-off at our partner location on SW 16th Lane, business pickup across North Central Florida, and mail-in kits for small loads."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies provides electronics recycling services through a partner location at 1007 SW 16th Lane in [Ocala](${href('/florida/ocala/')}), just off the US-27, US-301 and US-441 corridor. We take desktops, laptops, servers, monitors and TVs (old CRT tube sets included), printers, copiers, scanners, fax machines, cell phones, cables, chargers and other everyday electronics. Businesses and residents can drop off on weekdays by appointment, so call before you come. Companies can book pickup within about 100 miles, from Gainesville to The Villages and Leesburg. Devices are taken apart so their metals, plastics, and circuit boards can be reused, and you get a certificate when the job is finished.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Ocala Electronics Recycling Partner Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ocala Recycling Center](${href('/florida/ocala/')}) (Marion County)`,
          rows: [
            {
              label: "Address",
              value: "[1007 SW 16th Lane, Ocala, FL 34471](https://www.google.com/maps/dir/?api=1&destination=1007+SW+16th+Lane%2C+Ocala%2C+FL+34471)",
            },
            { label: "Phone", value: "813-534-5735" },
            { label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
            { label: "Call ahead", value: "Appointment needed" },
            {
              label: "Finding us",
              value: "Pull into the SW 16th Lane parking lot by the 17th Street bridge, next door to Fakhoury Chiropractic, and staff will show you where to unload.",
            },
          ],
        },
        {
          kind: "options",
          heading: "At the Ocala Partner Location",
          items: [
            { icon: "pin", title: "Drop-off", body: "Open to businesses and residents, by appointment" },
            { icon: "truck", title: "Business pickup", body: "Within about 100 miles of Ocala" },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid e-waste kits for small amounts, returned from any US address",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Take in Ocala",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: ["From one dead laptop to a full office refresh, the Ocala partner location accepts:"],
        },
        {
          kind: "grid",
          items: [
            { icon: "laptop", title: "Desktop computers, laptops and servers" },
            { icon: "tv", title: "Computer monitors and flat-screen TVs" },
            { icon: "tube", title: "CRT tube TVs and monitors" },
            { icon: "printer", title: "Printers, copiers, scanners and fax machines" },
            { icon: "smartphone", title: "Cell phones and other mobile devices" },
            { icon: "plug", title: "Keyboards, mice, remotes, cables, chargers and switches" },
            { icon: "cpu", title: "Microwaves and other small household electronics" },
            { icon: "printer", title: "Large office equipment" },
          ],
        },
        {
          kind: "note",
          body: [
            `Unusual e-scrap is reviewed case by case, so describe it when you call to book. See the full list on our [electronics recycling](${href('/electronic-recycle/')}) page.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Electronics Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Book a time",
              body: "Call 813-534-5735 for a drop-off appointment, or request a business pickup online.",
            },
            {
              title: "Prepare your devices",
              body: "Back up anything you need, sign out of accounts, and keep cords with the equipment they belong to.",
            },
            {
              title: "Bring them in or hand them off",
              body: "Unload at the partner location on SW 16th Lane, load our truck at your site, or ship a mail-in kit.",
            },
            {
              title: "We take them apart",
              body: "Devices are sorted by type and dismantled. Plastics and wiring are shredded, CRT and other monitors are treated to remove lead, and circuit boards are pulled for metal recovery.",
            },
            {
              title: "Materials go back to use",
              body: "Plastic and wire move on to molders and smelters, recovered metals go back into manufacturing, and a certificate is sent for your records.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Electronics Recycling Options in Ocala",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "If you're searching for e-waste recycling near you in Ocala or anywhere in Marion County, book a drop-off at our partner location on SW 16th Lane. The location opens at 6:00 AM on weekdays, early enough to stop by before work. Businesses and residents are both welcome, but every visit needs an appointment, so call ahead first.",
            `The Ocala partner location also takes [batteries](${href('/battery-recycling/')}), [fluorescent lamps](${href('/light-bulbs/')}), [ballasts](${href('/ballasts/')}) and mercury devices, so a garage or office cleanout can come in one load. See all our [drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Offices, medical practices, schools, property managers, retailers and IT departments can book pickup within about 100 miles of Ocala. That reaches Belleview, Dunnellon, Silver Springs, The Villages, Leesburg and Gainesville.",
            `Pickup is for business customers. When you request a quote, list the equipment types, a rough count or pallet total, and your site address, and mention any hard drives that need [secure destruction](${href('/hard-drive-destruction-services/')}).`,
          ],
          buttons: {
            primary: { label: "Request an Electronics Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a few phones, a laptop or a box of cables, order a prepaid [electronic waste recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Pack it, seal it and drop it at FedEx. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before you order. TVs, copiers and other large equipment should come in by appointment or go out on a pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Disposal in Ocala and Marion County",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Florida doesn't have a statewide electronics recycling law, but the state's Department of Environmental Protection (DEP) urges residents and businesses to recycle every unwanted TV, computer and phone. Old electronics hold lead in their circuit board solder and CRT glass, and some flat-panel screens have mercury in their backlights. DEP also notes that CRT glass is hard to market, and some recyclers have dropped tube TVs altogether. Even Goodwill and the Salvation Army have stopped taking CRT sets.",
            "County drop-off is limited, especially for businesses:",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "landmark",
              title: "Marion County recycling centers",
              body: "Household electronics go only to certain centers, not all 18. Centers are for residents who pay the solid waste assessment or hold a permit.",
            },
            {
              icon: "users",
              title: "Businesses",
              body: "The county says businesses that don't pay the solid waste assessment fee aren't permitted to use the recycling centers.",
            },
            {
              icon: "landmark",
              title: "Baseline",
              body: "The old Baseline landfill on SE 66th Street filled up in July 2019 and now runs as a transfer station. County waste is trucked to a landfill in Sumter County.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            `DEP's advice for businesses is to ask any recycler where the scrap ends up and how data on the equipment is destroyed. The steps above show where each material goes; our [hard drive destruction](${href('/hard-drive-destruction-services/')}) service covers the data, and the Ocala partner location takes the office equipment, CRTs, and large loads the county centers can't.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Electronics Recycling in Ocala",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              body: "A local Ocala recycling partner on SW 16th Lane, not just a drop box or third-party store",
            },
            { icon: "pin", body: "CRT tube TVs and monitors accepted, when many local options turn them away" },
            { icon: "tv", body: "Monitors treated to remove lead, and circuit boards sent for metal recovery" },
            { icon: "pin", body: "Weekday drop-off from 6:00 AM for businesses and residents, by appointment" },
            { icon: "truck", body: "Business pickup within about 100 miles, from Gainesville to Leesburg" },
            {
              icon: "thermometer",
              body: "Batteries, lamps, ballasts and mercury devices taken in the same visit",
            },
            {
              icon: "clock",
              body: "A minority-owned recycler with a zero-landfill commitment, working since 1993",
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
      { q: "Is electronics recycling free in Ocala?", a: "Fees depend on the item and quantity. Call 813-534-5735 or request a quote before you bring anything in." },
      { q: "Can I drop off electronics on a Saturday?", a: "No. The Ocala partner location is open Monday to Friday only, and every drop-off needs an appointment." },
      { q: "Do you pick up from businesses in Alachua and Sumter counties?", a: "Yes. Both sit within our roughly 100-mile pickup area. Confirm your address when you book." },
      { q: "Can my company get value back for retired IT equipment?", a: "Ask about our IT asset disposition service, which is built to recover value from retired hardware." },
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
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Ocala",
    body: ["Call to book a drop-off at our SW 16th Lane partner location, order a mail-in kit for a few devices, or request a quote for business pickup across Marion County and beyond.", "Ocala: 813-534-5735"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Ocala", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ocala reviews are supplied", "\"the office equipment, C, and large loads\" in the doc read as \"the office equipment, CRTs, and large loads\"", "Business pickup: the doc has one quote button, a Schedule a Pickup button added beside it as on the other pages"],
}
