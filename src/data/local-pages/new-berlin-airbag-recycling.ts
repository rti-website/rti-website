import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Airbag Recycling in New Berlin, WI — /wisconsin/new-berlin/airbag-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Airbag Recycling in Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_AIRBAG_RECYCLING: LocalPage = {
  url: href('/wisconsin/new-berlin/airbag-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Airbag Recycling in New Berlin, WI | Recycle Technologies",
    description: "Recycle deployed and undeployed airbags, inflators and modules in New Berlin, WI. Drop-off near I-43, pickup for auto shops and fleets, and mail-in kits.",
  },
  schema: { service: "Airbag Recycling", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Airbag Recycling in New Berlin, WI",
    h1: "Airbag Recycling in New Berlin, WI",
    body: ["Airbag recycling for collision centers, dealerships, fleets and DIY repairs across New Berlin, Milwaukee and Waukesha County, with weekday drop-off, business pickup and prepaid airbag kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `An undeployed airbag still holds sodium azide, and the Wisconsin DNR treats discarded modules and inflators as reactive hazardous waste, so they can't go in the trash or ride along in a scrap car. Recycle Technologies takes airbags at our [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, by I-43 and College Avenue. We accept deployed and undeployed driver, passenger, side-impact, curtain, knee and seat airbags, plus standalone inflators and modules. Bring them in on a weekday, ship a few in a kit, or have your shop book a pickup, and keep the certificate of recycling for your records.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Airbag Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}) (Waukesha County)`,
          rows: [
            {
              label: "Address",
              value: "[2815 S 171st St, New Berlin, WI 53151](https://www.google.com/maps/dir/?api=1&destination=2815%20South%20171st%20Street%2C%20New%20Berlin%2C%20WI%2053151)",
            },
            { label: "Phone", value: "262-798-3040" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Arrival",
              value: "We're on South 171st Street near the I-43 and College Avenue interchange. Park in the main lot, and the team will point you to the rear loading area.",
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
              body: "Open to individuals and businesses on weekdays, with no appointment needed. Call ahead before bringing undeployed units.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "For repair shops, dealerships, dismantlers, and fleets within 100 miles",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid airbag kits for a few units at a time" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Airbags We Take in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "One steering-wheel module from a weekend repair in Muskego or a stack of curtain airbags from a salvage yard in Oak Creek can both come here. We accept:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "car", title: "Driver-side airbags" },
            { icon: "car", title: "Passenger airbags" },
            { icon: "car", title: "Side-impact airbags" },
            { icon: "car", title: "Curtain airbags" },
            { icon: "car", title: "Knee and seat airbags" },
            { icon: "car", title: "Standalone inflators and modules" },
            { icon: "layers", title: "Deployed and undeployed units of every type above" },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Handling and Packing Airbags",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Handling and Packing Airbags",
          checks: [
            "**Keep undeployed units out of the trash and the crusher.** They contain sodium azide, and the Wisconsin DNR advises removing them before a vehicle is crushed or shredded.",
            "**Leave removal to trained techs.** The DNR recommends that only trained technicians with proper safety gear pull or deploy airbags.",
            "**Label what's in the box.** Mark deployed and undeployed units so our team knows how to handle them.",
            "**Ship undeployed airbags the right way.** Before they ship, they have to be packed and labeled to DOT hazmat standards, and our team can walk you through it.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Airbag Recycling Works With Us",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick a method",
              body: "Drop off on South 171st Street, set up a business pickup, or order a prepaid kit.",
            },
            {
              title: "Tell us what you have",
              body: "The count, the airbag types, and whether they're deployed or undeployed.",
            },
            {
              title: "Pack for the trip",
              body: "Use DOT hazmat-compliant packaging for undeployed units that will be shipped.",
            },
            {
              title: "Hand them off",
              body: "Unload at our facility, stage boxes for the driver, or send your kit.",
            },
            {
              title: "Certified disposal",
              body: "Each airbag is processed by type and condition at a licensed facility, and you receive a certificate of recycling.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Airbag Recycling Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for airbag disposal near you in New Berlin, Waukesha, Brookfield, or Greenfield? Bring airbags to 2815 S 171st St Monday through Friday, between 7:30 AM and 4:00 PM. Individuals and businesses can both use drop-off, and regular hours need no appointment. Give us a call at 262-798-3040 before bringing undeployed units or a large batch.",
            `Shops can add worn-out [batteries](${href('/battery-recycling/')}) and old [computers and electronics](${href('/electronic-recycle/')}) to the same trip.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            `Collision centers, independent repair shops, dealerships, auto dismantlers and fleet operators can schedule pickup instead of storing airbags on site. Commercial pickup reaches businesses within 100 miles of New Berlin, including Milwaukee, Waukesha, West Allis, Wauwatosa, Menomonee Falls, Oak Creek, Racine, Kenosha, West Bend and Madison. Our [automotive and fleet services page](${href('/industries/automotive-fleet/')}) covers what else we handle for shops.`,
          ],
          listIntro: "When you ask for a quote, include:",
          list: [
            "**Shop address:** street, city and ZIP code",
            "**Airbag types:** steering wheel, passenger, side, curtain, knee, seat or loose inflators",
            "**Quantity:** an approximate count or number of boxes",
            "**Status:** how many are deployed and how many are undeployed",
            "**Other shop waste:** batteries, computers or bulbs to collect too",
            "**Frequency:** one cleanout or a regular schedule",
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
            `For a few airbags, or a shop too far from New Berlin, order a prepaid [airbag recycling kit](https://ezontheearth.com/collections/airbag-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it and send it off. Undeployed units still need DOT hazmat-compliant packaging, so call us if you have questions. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before ordering.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Wisconsin Airbag Waste Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The Wisconsin DNR classifies discarded airbag modules and inflators as reactive hazardous waste. Dealerships, repair shops, collision centers and salvage yards can use a voluntary exemption if they keep no more than 250 units on hand for no more than 180 days, label containers \"Airbag Waste-Do Not Reuse,\" use DOT-compliant packaging, ship directly to an eligible facility and keep shipping records for three years (Wisconsin DNR WA-1530).",
            "County household hazardous waste programs around Milwaukee and Waukesha don't list airbags, so a recycler with a drop-off site and business pickup fills that gap.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Shops and Fleets Choose Recycle Technologies in New Berlin",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "A real drop-off site",
              body: "A Waukesha County facility you can drive to, not just a shipping address",
            },
            {
              icon: "layers",
              title: "Every common airbag type",
              body: "Driver, passenger, side, curtain, knee and seat airbags, plus loose inflators and modules, deployed or undeployed",
            },
            {
              icon: "checkCircle",
              title: "Help with hazmat packing",
              body: "Guidance on DOT packaging and labeling for undeployed units",
            },
            {
              icon: "shield",
              title: "Licensed processing",
              body: "Each airbag's type and condition decide how it's processed at a licensed facility",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            {
              icon: "file",
              title: "Records for your files",
              body: "A certificate of recycling after every disposal",
            },
            {
              icon: "car",
              title: "More than airbags",
              body: "Shop computers, IT equipment and batteries can go out with the same service",
            },
            { icon: "clock", title: "Since 1993", body: "Over 30 years in recycling" },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Wisconsin Counties We Serve",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "grid",
          items: [
            { icon: "landmark", title: "Waukesha County" },
            { icon: "landmark", title: "Milwaukee County" },
            { icon: "landmark", title: "Racine County" },
            { icon: "landmark", title: "Washington County" },
            { icon: "landmark", title: "Sheboygan County" },
            { icon: "landmark", title: "Fond du Lac County" },
            { icon: "landmark", title: "Dane County" },
            { icon: "landmark", title: "Calumet County" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "How much does airbag recycling cost in New Berlin?", a: "Pricing depends on airbag type, condition and quantity. Call 262-798-3040 or request a quote." },
      { q: "Can a salvage yard drop off a large batch?", a: "Yes. Call ahead so the team can plan for the volume and for any undeployed units." },
      { q: "Can one pickup take our shop's old computers and batteries too?", a: "Yes. A scheduled Wisconsin business collection can include electronics and batteries along with airbags." },
      { q: "Our shop is outside southeast Wisconsin. Can we still use you?", a: "Yes. Shops beyond our pickup area can use the prepaid airbag kit through our mail-in program." },
      { q: "Can a technical college auto program drop off airbags from class projects?", a: "Yes. Drop-off is open to schools and other organizations during regular weekday hours." },
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
            { label: "Automotive & Fleet Recycling", href: href('/industries/automotive-fleet/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
            { label: "Wisconsin Recycling & Shredding", href: href('/wisconsin-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Your Airbags Recycled in New Berlin, WI",
    body: ["Drop airbags off on any weekday, send a few in a prepaid kit, or share your shop address and count for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Airbag Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Airbags We Take: the doc's note \"[Confirm whether recalled airbags, such as Takata units, are accepted at New Berlin]\" left out", "Wisconsin Airbag Waste Rules: the doc's note \"[Confirm how RTI's service fits the DNR exemption before publishing]\" left out (the rules text is kept", "confirm before publishing)"],
}
