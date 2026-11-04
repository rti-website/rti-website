import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Kennesaw, GA — /georgia/kennesaw/light-bulb-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Georgia tab; copy from the content
 * team's Google Doc "Light Bulb Recycling in kenessaw, Georgia", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const KENNESAW_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/georgia/kennesaw/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in Kennesaw, GA | Recycle Technologies",
    description: "Recycle fluorescent tubes, CFLs, HID, LED, and specialty lamps in Kennesaw, GA. Weekday drop-off in Cobb County, business pickup and mail-in kits.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Kennesaw, GA", "Cobb County, GA", "Georgia"] },
  hero: {
    crumb: "Light Bulb Recycling in Kennesaw, GA",
    h1: "Light Bulb Recycling in Kennesaw, GA",
    body: ["Lamp recycling for Kennesaw, Marietta, and metro Atlanta, with weekday drop-off at our Town Point Drive facility, pickup for businesses within about 100 miles, and prepaid bulb kits by mail."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Fluorescent tubes, CFLs, and HID lamps contain mercury, and Georgia expects businesses to send them to a permitted recycler rather than a dumpster. Recycle Technologies takes lamps from households and companies at our [Kennesaw facility](${href('/kennesaw-georgia/')}), 3400 Town Point Dr NW, Suite 130, in Cobb County. We accept straight, U-bend, and circular tubes, CFLs, metal halide and high-pressure sodium lamps, LED, UV, neon, halogen, and incandescent bulbs. Stop by on a weekday, ship a small batch in a kit, or set up a business pickup, and the mercury we recover goes to our own facility in Greenwood, Indiana.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Kennesaw Light Bulb Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Kennesaw Recycling Center](${href('/kennesaw-georgia/')}) (Cobb County)`,
          rows: [
            {
              label: "Address",
              value: "[3400 Town Point Dr NW, Suite 130, Kennesaw, GA 30144](https://www.google.com/maps/dir/?api=1&destination=3400%20Town%20Point%20Dr%20NW%2C%20Suite%20130%2C%20Kennesaw%2C%20GA%2030144)",
            },
            { label: "Phone", value: "770-426-5000" },
            { label: "Email", value: "dispatch@recycletechnologies.com" },
            { label: "Hours", value: "Monday to Friday, 9:00 AM to 4:00 PM" },
            {
              label: "Before you come",
              value: "Walk-ins are welcome, but appointments are preferred. Call ahead, and the team will direct you to the drop-off area.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off for residents and businesses",
              body: "Weekdays, with an appointment preferred for faster unloading.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Within roughly 100 miles of Kennesaw, with packing materials available before your pickup.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid bulb kits for a few lamps at a time." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Bulbs and Lamps We Recycle in Kennesaw",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A bag of burned-out CFLs from an Acworth garage and a pallet of 4-foot tubes from a Marietta office retrofit get the same careful handling. We accept:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "Straight fluorescent tubes, including plastic-coated and shielded types" },
            { icon: "tube", title: "Green-tipped fluorescent tubes" },
            { icon: "tube", title: "U-bend and circular fluorescent lamps" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            { icon: "bulb", title: "HID lamps, such as metal halide and high-pressure sodium" },
            { icon: "bulb", title: "LED bulbs" },
            { icon: "bulb", title: "UV lamps and cold cathode lamps like neon and argon" },
            { icon: "bulb", title: "Flood, halogen, and incandescent bulbs" },
          ],
        },
        {
          kind: "note",
          body: [
            `Removing old fixtures too? Our Kennesaw facility also takes [ballasts](${href('/ballasts/')}) and mercury devices. If you're unsure whether a lamp qualifies, call 770-426-5000 before you come.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Packing Lamps for Transport",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Packing Lamps for Transport",
          panel: [
            "Federal Department of Transportation rules govern how bulbs are packed for shipping, so place lamps in the boxes your replacements arrive in or in a fiber bin. Keep tubes snug so they can't slide around, and set aside any that are already cracked. Businesses on a pickup schedule can have packing materials dropped off ahead of time.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "What Happens to Your Bulbs",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick a method",
              body: "Bring lamps to Town Point Drive, schedule a business pickup, or order a mail-in kit.",
            },
            { title: "Box them up", body: "Use original cartons or a fiber bin to prevent breakage." },
            {
              title: "Hand them off",
              body: "Unload at our facility, stage boxes for the driver, or ship the kit.",
            },
            {
              title: "Separation",
              body: "Glass, aluminum end caps, and mercury-bearing phosphor powder are split apart.",
            },
            {
              title: "Recovery",
              body: "Glass goes to industrial reuse, end caps go to an aluminum salvage partner, and the mercury material is sent to our Greenwood, Indiana facility for recovery. A certificate of recycling follows.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Light Bulb Recycling Options in Kennesaw, GA",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Searching for light bulb recycling near you in Kennesaw, Acworth, Marietta, or Woodstock? Bring boxed lamps to 3400 Town Point Dr NW on a weekday between 9:00 AM and 4:00 PM. Households and businesses are both welcome, and while walk-ins are fine, booking ahead with a call to 770-426-5000 gets you unloaded faster, especially with a big load or broken tubes.",
            `The same stop can include [batteries](${href('/battery-recycling/')}), [electronics](${href('/electronic-recycle/')}), and mercury devices.`,
            `See every [Recycle Technologies drop-off location](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Apartment communities, property managers, school districts, hospitals, warehouses along I-75 and I-575, retail centers and electrical contractors finishing LED retrofits can schedule pickup instead of hauling lamps. Business pickup covers roughly 100 miles around Kennesaw, reaching Atlanta, Smyrna, Roswell, Alpharetta, Sandy Springs, Canton, Cartersville and Rome.",
          ],
          listIntro: "For an accurate quote, send:",
          list: [
            "**Location:** street address, city and ZIP code",
            "**Lamp mix:** tubes, CFLs, HID, LED or specialty lamps",
            "**How many:** a lamp count, box total or pallet estimate",
            "**Breakage:** any cracked or shattered lamps",
            "**Schedule:** one relamp project or repeat pickups",
            "**Supplies:** whether you want boxes or fiber bins delivered first",
          ],
          buttons: {
            primary: { label: "Request a Light Bulb Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a handful of bulbs, or a branch office far from Cobb County, order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), fill it and send it back. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page explains how it works.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Georgia Rules for Used Lamps",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Georgia EPD allows businesses to manage used fluorescent, CFL, metal halide, and high-pressure sodium lamps as universal waste. That means sealed containers labeled \"Used Lamps\" or \"Universal Waste-Lamps,\" careful handling to prevent breakage, and shipment to a permitted recycler within one year. Lamps crushed on purpose must be treated as hazardous waste instead. Households are exempt from these rules (Georgia EPD).",
            "Around metro Atlanta, home improvement stores take only unbroken CFLs, and county household hazardous waste events happen a few times a year. Our Kennesaw facility takes every common lamp type on any weekday, from both households and businesses.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Cobb County Chooses Recycle Technologies for Lamps",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Weekday drop-off in Kennesaw",
              body: "A Town Point Drive facility open to households and businesses, Monday through Friday.",
            },
            {
              icon: "layers",
              title: "Every common lamp type",
              body: "Fluorescent tubes, CFLs, HID, LED, UV, neon, halogen and incandescent bulbs.",
            },
            {
              icon: "trash",
              title: "Fixture cleanouts in one trip",
              body: "Ballasts and mercury devices accepted alongside your lamps.",
            },
            {
              icon: "pin",
              title: "Mercury handled in-house",
              body: "Recovered mercury material goes to our Greenwood, Indiana facility.",
            },
            {
              icon: "truck",
              title: "Pickup across metro Atlanta",
              body: "Business collection within roughly 100 miles, with packing supplies on request.",
            },
            { icon: "clock", title: "Since 1993", body: "More than three decades of recycling experience." },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Georgia Counties We Serve",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "grid",
          items: [
            { icon: "landmark", title: "Cobb County" },
            { icon: "landmark", title: "Cherokee County" },
            { icon: "landmark", title: "Bartow County" },
            { icon: "landmark", title: "Paulding County" },
            { icon: "landmark", title: "Douglas County" },
            { icon: "landmark", title: "Fulton County" },
            { icon: "landmark", title: "DeKalb County" },
            { icon: "landmark", title: "Gwinnett County" },
            { icon: "landmark", title: "Forsyth County" },
            { icon: "landmark", title: "Clayton County" },
            { icon: "landmark", title: "Henry County" },
            { icon: "landmark", title: "Fayette County" },
            { icon: "landmark", title: "Coweta County" },
            { icon: "landmark", title: "Carroll County" },
            { icon: "landmark", title: "Floyd County" },
            { icon: "landmark", title: "Gordon County" },
            { icon: "landmark", title: "Pickens County" },
            { icon: "landmark", title: "Hall County" },
            { icon: "landmark", title: "Clarke County" },
            { icon: "landmark", title: "Bibb County" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "How much does it cost to recycle bulbs in Kennesaw?", a: "Fees depend on the lamp type and quantity. Call 770-426-5000 or request a quote." },
      { q: "What should I do with a broken fluorescent tube?", a: "Keep it in its own sealed container and call before bringing it in so the team can prepare." },
      { q: "Can I recycle the new LED bulbs along with the old tubes from a retrofit?", a: "Yes. LED bulbs are accepted, so both can come in together." },
      { q: "Can I bring aerosols or airbags on the same visit?", a: "Yes. Our Kennesaw facility accepts aerosols and airbags along with lamps." },
      { q: "Does a small office need pickup, or will a kit work?", a: "A kit works well for a few bulbs. Pickup makes more sense for larger or repeat volumes." },
      { q: "Will I get proof that my lamps were recycled?", a: "Yes. A certificate of recycling is issued once processing is complete." },
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
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Georgia Recycling", href: href('/georgia/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Start Recycling Bulbs in Kennesaw, GA",
    body: ["Book a weekday drop-off at Town Point Drive, mail a small batch in a prepaid kit, or send us your address and lamp count for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Kennesaw", href: PICKUP_HREF },
  },
  todo: ["Related link \"Georgia Recycling\" pointed to /georgia-recycling/ (being moved)", "linked to the state page /georgia/ instead", "\"Mariett\" in the blurb read as \"Marietta\"", "\"aluminum end caps,s\" in the doc read as \"aluminum end caps,\"", "The sheet wrote this page as /georgia/atlanta/light-bulb-recycling/", "it sits at the Kennesaw URL as Aaqib chose"],
}
