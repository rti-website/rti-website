import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Fort Worth, TX — /texas/fort-worth/electronic-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Texas tab; copy from the content
 * team's Google Doc "Electronic Recycling in Fort Worth, TX", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const FORT_WORTH_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/texas/fort-worth/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Fort Worth, TX | Recycle Technologies",
    description: "E-waste recycling in Fort Worth, TX for computers, monitors, TVs, phones, and office equipment. Partner location drop-off, hard drive drop-off and business pickup.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Fort Worth, TX", "Tarrant County, TX", "Texas"] },
  hero: {
    crumb: "Electronics Recycling in Fort Worth, TX",
    h1: "Electronics Recycling in Fort Worth, TX",
    body: ["E-waste recycling for offices, schools, property managers and households across Fort Worth and Dallas-Fort Worth, with weekday drop-off at our East Bowie Street partner location, commercial pickup within about 100 miles, and mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Old laptops, copiers, and monitors pile up fast in storage rooms and back offices, and Fort Worth's city programs only take a couple of items per household. Recycle Technologies handles business and residential e-waste through our [Fort Worth partner location](${href('/fort-worth-texas/')}) at 101 E Bowie St. It is a partner location, not a facility owned by Recycle Technologies. Bring in desktops, servers, CRT and flat-panel monitors, TVs, printers, phones and cords, drop off hard drives with a certificate available on request, or book a pickup for a full office cleanout.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Fort Worth Electronics Recycling Partner Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Fort Worth Partner Location](${href('/fort-worth-texas/')}) (Tarrant County)`,
          rows: [
            {
              label: "Address",
              value: "[101 E Bowie St, Fort Worth, TX 76110](https://www.google.com/maps/dir/?api=1&destination=101+E+Bowie+St%2C+Fort+Worth%2C+TX+76110)",
            },
            { label: "Phone", value: "817-921-1440" },
            { label: "Email", value: "lrtlogistics@lightingresourcesinc.com" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 3:30 PM" },
            { label: "Site type", value: "Recycle Technologies partner location" },
            {
              label: "Finding us",
              value: "Near Southside, a short hop from I-35 between Berry Street and Main Street. Enter from East Bowie Street. Forklifts and two 53-foot docks on the building's west side handle palletized loads.",
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
              body: "Weekdays for companies and households. A quick call first is recommended for bigger loads.",
            },
            { icon: "drive", title: "Hard drives", body: "Drop-off accepted, with a certificate on request." },
            { icon: "truck", title: "Business pickup", body: "Up to roughly 100 miles from Fort Worth." },
            { icon: "mail", title: "Mail-in", body: "Prepaid electronics kits for small batches." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Take in Fort Worth",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether it's one dead laptop from a Benbrook home office or a truckload of retired workstations from a downtown Fort Worth tower, it's welcome. Through the partner location, Recycle Technologies accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "laptop", title: "Computers", body: "Desktops, laptops and servers" },
            { icon: "tv", title: "Displays", body: "Flat-panel monitors and CRT monitors" },
            { icon: "tv", title: "Televisions" },
            {
              icon: "building",
              title: "Office and imaging equipment",
              body: "Copiers, printers, scanners and fax machines",
            },
            {
              icon: "smartphone",
              title: "Phones",
              body: "Cell phones, smartphones and similar handheld devices",
            },
            {
              icon: "cpu",
              title: "Accessories and small electronics",
              body: "Keyboards, mice, remotes, chargers, cables and network switches",
            },
            { icon: "cpu", title: "Microwaves" },
            {
              icon: "drive",
              title: "Hard drives",
              body: "Dropped off for destruction, with a certificate on request",
            },
          ],
        },
        {
          kind: "note",
          body: [
            `Have something not on the list? Each item gets looked at individually, so call 817-921-1440 and describe it. Clearing a building at the same time? The same dock also takes [batteries](${href('/battery-recycling/')}), [fluorescent lamps](${href('/light-bulbs/')}) and [ballasts](${href('/ballasts/')}), with PCB ballasts requiring a manifest.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Getting Equipment Ready",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Getting Equipment Ready",
          body: [
            `For more on device types and our process, visit the main [electronics recycling page](${href('/electronic-recycle/')}).`,
          ],
          checks: [
            "Back up and clear devices you aren't sending for hard drive destruction.",
            "Coil cords and cables and bag small accessories so nothing tangles in transit.",
            "Stack and shrink-wrap desktops and monitors on pallets so they ride flat and stay put.",
            "Pull loose batteries where you can do so easily and box them separately.",
            "Bag cracked screens to contain glass.",
            "More than 5 pallets? Call the operations team before you come.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "What Happens After Your Electronics Leave Fort Worth",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Hand-off",
              body: "You unload at the partner location dock, our driver collects from your site, or your kit ships out.",
            },
            { title: "Sorting", body: "Equipment is grouped by type and stored until processing." },
            { title: "Dismantling", body: "Devices are taken apart into their main components." },
            {
              title: "Separating materials",
              body: "Plastics and wiring move on to shredding, monitors are decontaminated to remove lead, and circuit boards are pulled and sorted.",
            },
            {
              title: "Recovery",
              body: "Shredded plastic and wire go to molders and smelters, and metals and minerals from circuit boards are recovered for reuse. Mercury-bearing parts are routed to RTI's Greenwood, Indiana facility.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "Not every device takes exactly the same path, but the goal stays the same: keep usable material in circulation and out of North Texas landfills. A certificate of recycling is available once the work is done.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ways to Recycle E-Waste in Fort Worth, TX",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Weekday Drop-Off",
          body: [
            "If you've been searching for electronics recycling near you around Fort Worth, Arlington, Saginaw, Crowley, or White Settlement, the closest commercial option may be our partner location at 101 E Bowie St. It's open Monday through Friday, 8:00 AM to 3:30 PM, to businesses and residents alike. What's needed on arrival depends on the equipment and how much you're bringing, so call 817-921-1440 ahead of time and the crew can have a forklift or dock ready.",
            `Browse other [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "pin",
          title: "Hard Drive Drop-Off",
          body: [
            `Retired drives from servers, PCs and laptops can be dropped off at the Fort Worth partner location for destruction. Ask when you drop off, and a certificate will be provided. Our [hard drive destruction](${href('/hard-drive-destruction-services/')}) page covers the service in more detail, and phones can go through [phone shredding](${href('/phone-shredding-service/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "IT departments, school districts, medical offices, property management firms, general contractors, and distribution centers near AllianceTexas or DFW Airport can have us collect on-site. Business pickup extends roughly 100 miles from Fort Worth, covering Dallas, Irving, Grand Prairie, Mansfield, Southlake, Colleyville, Bedford, Lewisville, Flower Mound, Granbury and Stephenville.",
          ],
          listIntro: "To price a pickup, tell us:",
          list: [
            "**Where:** the pickup address and ZIP code",
            "**What:** computers, servers, monitors, TVs, copiers, phones or mixed e-waste",
            "**How much:** unit count, boxes or pallets",
            "**Drives:** whether hard drives need destruction",
            "**Access:** loading dock, freight elevator or ground-floor curbside",
            "**Timing:** one cleanout or recurring service",
          ],
          buttons: {
            primary: { label: "Get an E-Waste Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Kits",
          body: [
            `For a handful of devices, or a branch in Houston, Lubbock or El Paso that sits outside the pickup radius, an [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) comes with packaging and prepaid postage. The [mail-in recycling program](${href('/mail-in-recycling/')}) explains which items qualify.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Electronics Recycling for Fort Worth Organizations",
      grey: false,
      blocks: [
        {
          kind: "list",
          items: [
            {
              icon: "building",
              title: "Property managers and apartment communities",
              body: "TVs, microwaves and computers left behind after move-outs can come in by the pallet or go out on a scheduled pickup.",
            },
            {
              icon: "tool",
              title: "Contractors and electricians",
              body: "Office remodels and tenant finish-outs turn up old monitors, phones and network switches. Bring them in along with the lamps and ballasts from the same job.",
            },
            {
              icon: "school",
              title: "Schools and districts",
              body: "Device refresh cycles in Fort Worth ISD, Keller ISD, Birdville ISD and other districts leave rooms full of laptops and desktops ready for recycling.",
            },
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Medical District offices can pair equipment recycling with hard drive drop-off and a certificate on request.",
            },
            {
              icon: "warehouse",
              title: "Warehouses and distribution centers",
              body: "Facilities along the AllianceTexas corridor and near DFW Airport can clear out scanners, printers and retired PCs on one pickup.",
            },
            {
              icon: "server",
              title: "Commercial and corporate offices",
              body: "Downtown and Cultural District tenants can schedule a full IT cleanout instead of hauling equipment themselves.",
            },
            {
              icon: "truck",
              title: "Recycling organizations and haulers",
              body: "Collection programs, haulers and junk removal crews can unload mixed e-waste at the west-side docks.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Household vs. Business E-Waste in Fort Worth",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Fort Worth residents can take a couple of electronics to the city's drop-off stations, which cap households at two items every six months. The Environmental Collection Center handles household chemicals, not electronics, and doesn't serve businesses. Anyone with more than a few devices, and every business, needs another route, which is where our partner location and commercial pickup come in.",
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Texas Electronics Recycling Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Texas requires computer and TV manufacturers to offer recycling to consumers through the Texas Recycles Computers and Texas Recycles TVs programs, which the Texas Commission on Environmental Quality oversees. Those programs are built for household equipment, so offices, schools, and other organizations generally need a commercial recycler. TCEQ also advises deleting personal information from hard drives before any computer is donated, sold or recycled (TCEQ electronics recycling).",
          ],
        },
      ],
    },
    {
      figma: "doc-9",
      heading: "Why Fort Worth Teams Recycle Electronics With Us",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "A Fort Worth dock to unload at",
              body: "Forklift service and two 53-foot docks at the Bowie Street partner location.",
            },
            {
              icon: "layers",
              title: "Wide range of equipment",
              body: "Computers, servers, CRT and flat monitors, TVs, copiers, phones and small electronics.",
            },
            {
              icon: "file",
              title: "Drives handled too",
              body: "Hard drive drop-off, with a certificate when you ask for one.",
            },
            {
              icon: "trash",
              title: "One stop for a building cleanout",
              body: "Electronics, batteries, lamps and ballasts can leave in the same load.",
            },
            {
              icon: "truck",
              title: "Pickup reach",
              body: "Commercial collection up to about 100 miles out from Fort Worth.",
            },
            {
              icon: "pin",
              title: "Clear end-of-life path",
              body: "Monitor glass goes through lead decontamination, circuit boards are recovered, and mercury-bearing parts go to RTI's Greenwood, Indiana facility.",
            },
            {
              icon: "clock",
              title: "Recycling since 1993",
              body: "Over 30 years of keeping electronics out of landfills.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-10",
      heading: "Texas Counties Served for Electronics Recycling",
      grey: true,
      blocks: [{ kind: "places", links: [{ label: "Tarrant County", href: href('/fort-worth-texas/') }] }],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Can I bring just one old TV or laptop?", a: "Yes. Households can drop off single items at the partner location on any weekday during open hours." },
      { q: "Can individuals book a pickup at home?", a: "Pickup is set up for businesses. Residents can use drop-off at the Fort Worth partner location or a mail-in kit instead." },
      { q: "Who should I contact about the Fort Worth location?", a: "Call 817-921-1440 or email lrtlogistics@lightingresourcesinc.com. The site is an RTI partner location, not a facility RTI owns." },
      { q: "Is there a size or weight limit on the electronics kit?", a: "Check with the operations team before ordering. They can confirm any per-kit limits and how to pack batteries or cracked screens." },
      { q: "Our company has offices outside Texas. Can you help?", a: "Yes. The mail-in program works nationwide, and Recycle Technologies has drop-off locations in several other states." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Services",
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
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Clear Out Old Electronics in Fort Worth",
    body: ["Call the East Bowie Street partner location and bring your equipment by on a weekday, send a few devices through an electronics recycling kit, or tell us what's sitting in your storage room and we'll price a pickup."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Fort Worth", href: PICKUP_HREF },
  },
  todo: ["\"Retired drives from servers, PCs, PCs and laptops\" in the doc read as \"servers, PCs and laptops\"", "\"ahead of tim,e\" in the doc read as \"ahead of time\"", "\"Pull loose batteries where you can easily\" in the doc read as \"where you can do so easily\"", "\"electronics recycling near you\" written as \"near you\" as on the earlier pages", "The doc's Counties band lists only Tarrant County (one chip, kept as written)", "Email row is a Lighting Resources address (lrtlogistics@lightingresourcesinc.com), kept as written", "confirm it should show on an RTI page"],
}
