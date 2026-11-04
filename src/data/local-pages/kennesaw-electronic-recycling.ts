import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Kennesaw, GA — /georgia/kennesaw/electronic-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Georgia tab; copy from the content
 * team's Google Doc "Electronic Recycling in Kennesaw, Georgia", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const KENNESAW_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/georgia/kennesaw/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Kennesaw, GA | Recycle Technologies",
    description: "Recycle computers, TVs, CRT monitors, phones and office equipment in Kennesaw, GA. Weekday drop-off for metro Atlanta, business pickup and mail-in kits.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Kennesaw, GA", "Cobb County, GA", "Georgia"] },
  hero: {
    crumb: "Electronics Recycling in Kennesaw, GA",
    h1: "Electronics Recycling in Kennesaw, GA",
    body: ["E-waste recycling for Kennesaw, Marietta and the Atlanta area, with weekday drop-off on Town Point Drive, pickup for businesses within about 100 miles, and electronics kits by mail."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Old laptops, tube TVs and office printers carry lead, circuit boards and stored data, so they deserve better than a curb pile or a once-a-year collection day. Recycle Technologies takes electronics from residents and businesses at our [Kennesaw facility](${href('/kennesaw-georgia/')}), 3400 Town Point Dr NW, Suite 130, in Cobb County. We accept computers, servers, TVs and CRT monitors, phones, printers, copiers and everyday e-waste, and hard drives can be dropped off for destruction. Bring equipment in on a weekday, mail a few items in a kit, or schedule a business pickup, all backed by our zero-landfill commitment.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Kennesaw Electronics Recycling Center",
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
              label: "Plan your visit",
              value: "We accept walk-ins, though an appointment is preferred. A quick call also gets you directions to the unloading area.",
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
              body: "Open to residents and businesses on weekdays, with appointments preferred.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Scheduled collection within roughly 100 miles of Kennesaw.",
            },
            { icon: "mail", title: "Mail-in", body: "Electronics recycling kits for a few items at a time." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Accept in Kennesaw",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A dead desktop from a Woodstock home office or a closet of retired switches and servers from a Midtown Atlanta firm can both come to Town Point Drive. We take:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "laptop", title: "Desktops, laptops and servers" },
            { icon: "tv", title: "TVs, including older CRT sets" },
            { icon: "tv", title: "Monitors, CRT units included" },
            { icon: "printer", title: "Printers, scanners, copiers and fax machines" },
            { icon: "smartphone", title: "Cell phones and other mobile devices" },
            { icon: "plug", title: "Cables, chargers, switches, keyboards, mice and remotes" },
            { icon: "cpu", title: "Microwaves and other everyday electronics" },
            { icon: "drive", title: "Hard drives, accepted at drop-off for destruction" },
          ],
        },
        {
          kind: "note",
          body: [
            `Other electronic scrap is reviewed case by case, so call 770-426-5000 if something isn't on the list. The same visit can include lamps, [batteries](${href('/battery-recycling/')}), ballasts, aerosols, airbags, and mercury devices. Mercury material from lamps and devices goes to our Greenwood, Indiana facility.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Before You Load the Car",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Before You Load the Car",
          checks: [
            `**Deal with the data.** Bring hard drives for [hard drive destruction](${href('/hard-drive-destruction-services/')}) rather than relying on a quick wipe.`,
            "**Keep what you want.** Pull out discs, flash drives, and anything personal before drop-off.",
            "**Call ahead for bulk.** Office cleanouts and stacks of TVs unload faster when the team knows you're coming.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Your Electronics Get Recycled",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick your option",
              body: "Drop off in Kennesaw, schedule a business pickup, or order a mail-in kit.",
            },
            {
              title: "Prepare the load",
              body: "Separate out drives for destruction and remove personal items.",
            },
            {
              title: "Hand it off",
              body: "Unload at our facility, stage equipment for the driver, or ship your kit.",
            },
            {
              title: "Sorting and teardown",
              body: "Items are grouped by type, then broken down so plastic, wiring, and circuit boards can be separated and monitors decontaminated for lead.",
            },
            {
              title: "Recovery",
              body: "Shredded plastic and wire move on to molders and smelters under our zero-landfill commitment, and you receive a certificate of recycling.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Recycling Options in Kennesaw, GA",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for electronics recycling near you in Kennesaw, Acworth, Marietta, or Powder Springs? Bring computers, TVs, and other e-waste to 3400 Town Point Dr NW Monday through Friday, 9:00 AM to 4:00 PM. Residents and businesses can both drop off. Walk in if you need to, or call 770-426-5000 to book a time for a quicker visit.",
            `Check all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Offices and IT departments, school districts, hospitals and clinics, property managers clearing move-outs, warehouses along I-75 and I-575, retailers and managed IT providers can schedule collection instead of loading their own trucks. Pickup covers businesses within roughly 100 miles of Kennesaw, including Atlanta, Smyrna, Roswell, Alpharetta, Sandy Springs, Canton, Cartersville, Rome and Gainesville.",
          ],
          listIntro: "Help us quote your job by sharing:",
          list: [
            "**Address:** where the equipment is, with ZIP code",
            "**Equipment list:** computers, servers, TVs, printers, phones or mixed",
            "**Quantity:** item count, pallets or a rough room estimate",
            "**Data devices:** how many hard drives or phones need destruction",
            "**Other materials:** lamps, batteries, or ballasts to collect too",
            "**Timing:** a single cleanout or recurring pickups",
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
            `For a few small devices, or an office far from Cobb County, order an [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it and ship it back. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page covers the details.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "E-Waste Recycling in Georgia",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Many metro Atlanta residents wait for city or utility collection days that come a few times a year and often charge per TV. Our Kennesaw facility takes electronics every weekday.",
            "For businesses, two issues matter most: CRT monitors and older TVs contain lead, and retired computers and phones can hold data covered by privacy rules such as HIPAA and GLBA. Monitors are decontaminated for lead in our process, and hard drives can be physically destroyed instead of left intact.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Metro Atlanta Recycles Electronics With Us",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Weekday drop-off in Cobb County",
              body: "Open Monday through Friday to residents and businesses, with no waiting for an event.",
            },
            {
              icon: "tv",
              title: "TVs and CRTs welcome",
              body: "Old tube sets and monitors are accepted along with flat screens.",
            },
            {
              icon: "tv",
              title: "Lead handled responsibly",
              body: "Monitors are decontaminated for lead during processing.",
            },
            {
              icon: "recycle",
              title: "Zero-landfill commitment",
              body: "Materials are sorted, separated and sent on for reuse.",
            },
            {
              icon: "pin",
              title: "Hard drive drop-off",
              body: "Data-bearing drives can be destroyed during the same visit.",
            },
            {
              icon: "car",
              title: "One trip, many materials",
              body: "Electronics, lamps, batteries, ballasts, aerosols, airbags and mercury devices.",
            },
            { icon: "clock", title: "Since 1993", body: "More than 30 years of recycling experience." },
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
      { q: "What does electronics recycling cost in Kennesaw?", a: "Fees depend on the items and how many you bring. Call 770-426-5000 or request a quote." },
      { q: "Should I wipe my computer before dropping it off?", a: "You can, but bringing the hard drive in for destruction is the more certain route." },
      { q: "Do you take large appliances like refrigerators?", a: "Microwaves are on our list. Call before bringing larger appliances so the team can confirm." },
      { q: "Can an apartment community recycle move-out TVs in bulk?", a: "Yes. Schedule a business pickup and share the count so we can plan the truck." },
      { q: "Can I recycle the batteries from old laptops on the same trip?", a: "Yes. Our Kennesaw facility accepts batteries along with electronics." },
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
            { label: "TV Recycling", href: href('/tv-recycling/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Georgia Recycling", href: href('/georgia/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Recycle Your Electronics in Kennesaw, GA",
    body: ["Drop off on any weekday at Town Point Drive, ship a few devices in a kit, or send us your equipment list for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Kennesaw", href: PICKUP_HREF },
  },
  todo: ["Hard drives: the doc asks to confirm witness and certificate details for Kennesaw (the bullet is kept, the note is not)", "E-waste in Georgia: the clause \"Georgia doesn't run a statewide electronics take-back program [verify]\" left out until verified (the rest of the paragraph is kept)", "Related link \"Georgia Recycling\" pointed to /georgia-recycling/ (being moved)", "linked to the state page /georgia/ instead", "\"flash drives,s\" and \"plastic,wiring\" in the doc read as \"flash drives,\" and \"plastic, wiring\""],
}
