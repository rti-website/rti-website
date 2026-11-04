import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in New Berlin, Wisconsin — /wisconsin/new-berlin/electronic-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Electronic Recycling in New Berlin, Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/wisconsin/new-berlin/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in New Berlin, WI | Drop-Off & Business Pickup",
    description: "Recycle computers, TVs, monitors, copiers, and phones at our New Berlin, WI center near I-43, or book business e-waste pickup across southeast Wisconsin.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Electronics Recycling in New Berlin, Wisconsin",
    h1: "Electronics Recycling in New Berlin, Wisconsin",
    body: ["Electronics recycling for New Berlin, Waukesha County and the Milwaukee metro, with weekday drop-off on South 171st Street, business pickup across southeast Wisconsin, and mail-in kits for smaller loads."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Wisconsin keeps TVs, computers, printers and cell phones out of landfills, so households and businesses across Waukesha and Milwaukee counties need somewhere reliable to take them. Recycle Technologies operates an R2v3-certified facility at our [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, just off I-43 near College Avenue. We take computers, laptops, monitors, TVs, copiers, printers, phones, game consoles and much more. Residents and companies can drop off on weekdays without an appointment, offices and facilities can schedule pickup, and every item is logged at intake, with a Certificate of Recycling to follow.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Electronics Recycling Center",
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
            { label: "Email", value: "widispatch@recycletechnologies.com" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Arrival",
              value: "We're close to the I-43 and College Avenue interchange. Pull into our parking lot off South 171st Street, and staff will guide you around back to the drop-off bay. Parking is free.",
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
              body: "Weekdays, no appointment needed during regular hours",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Across southeast Wisconsin, with loads secured by load bars and straps",
            },
            { icon: "mail", title: "Mail-in", body: "Recycling kits for households farther away" },
            { icon: "lock", title: "Data destruction", body: "Hard drive and phone destruction on request" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Accept in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether it's a closet of old gadgets from a Brookfield home or a pallet of retired workstations from a Menomonee Falls office, our New Berlin center takes:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "laptop",
              title: "Computers and IT gear",
              body: "Desktop computers, laptops, peripherals, zip drives and circuit boards",
            },
            { icon: "tv", title: "Screens", body: "TVs and CRT monitors" },
            {
              icon: "printer",
              title: "Office equipment",
              body: "Copiers, printers, scanners and fax machines",
            },
            { icon: "smartphone", title: "Phones and handhelds", body: "Cell phones, PDAs and calculators" },
            {
              icon: "cpu",
              title: "Home and entertainment electronics",
              body: "Game consoles, electronic games, speakers, radios, CD players and cameras",
            },
            { icon: "drive", title: "Media", body: "CDs, floppy disks and VHS tapes" },
            {
              icon: "shield",
              title: "Building and security systems",
              body: "Security systems and HVAC systems",
            },
            { icon: "battery", title: "Components", body: "Capacitors and batteries" },
            { icon: "layers", title: "Anything not listed", body: "Call 262-798-3040 before you load up" },
          ],
        },
        {
          kind: "note",
          body: [
            `See our main [electronics recycling page](${href('/electronic-recycle/')}) for more on how devices are processed.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Devices That Hold Data",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Devices That Hold Data",
          panel: [
            `Computers, laptops, phones and multifunction copiers can store personal files, client records and saved logins. If any of that needs to be gone for good, ask for [hard drive destruction](${href('/hard-drive-destruction-services/')}) or [phone shredding](${href('/phone-shredding-service/')}) when you drop off or book a pickup. New Berlin's data destruction is NAID AAA certified.`,
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Electronics Recycling Works in New Berlin",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "List what's going",
              body: "Count computers, monitors, TVs and office equipment, and set aside anything that stores data.",
            },
            {
              title: "Pick drop-off, pickup or mail-in",
              body: "Drive to South 171st Street, schedule a business pickup, or order a kit.",
            },
            { title: "Intake", body: "Every item is logged when it reaches our dock." },
            {
              title: "Breakdown",
              body: "Devices are separated into base materials. Plastic and wiring head to molders and smelters, monitor glass is decontaminated for lead, and circuit boards are sorted so their metals can be recovered.",
            },
            {
              title: "Paperwork",
              body: "A Certificate of Recycling is issued, or a Certificate of Shredding when data destruction is part of the job.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Recycling Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Searching for electronics recycling near you in New Berlin, West Allis or Greenfield? Bring your equipment to 2815 S 171st St any weekday between 7:30 AM and 4:00 PM. Drop-off is open to households and businesses, and no appointment is needed during regular hours. For a truckload or unusual items, call 262-798-3040 so the dock is ready.",
            `The same trip can include [batteries](${href('/battery-recycling/')}), [light bulbs](${href('/light-bulbs/')}) and [ballasts](${href('/ballasts/')}), plus paper for [shredding](${href('/paper-shredding-services/')}).`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Office refreshes, school equipment swaps, warehouse cleanouts and apartment turnovers can generate more e-waste than a car can carry. Businesses can schedule pickup across southeast Wisconsin, including Waukesha, Brookfield, Elm Grove, Pewaukee, Muskego, Menomonee Falls, Wauwatosa, West Allis, Greenfield, Franklin, Milwaukee, Oak Creek, Oconomowoc, Racine, Kenosha, West Bend, Sheboygan, Fond du Lac and Madison. Every load is secured with load bars and straps on the road.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Pickup address:** street, city and ZIP, plus dock or elevator access",
            "**Equipment types:** computers, monitors, TVs, copiers or servers",
            "**Quantity:** units, pallets or boxes",
            "**Data-bearing devices:** and whether you want hard drive destruction",
            "**Screens:** any CRTs or cracked displays",
            "**Frequency:** a one-time cleanout or recurring service",
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
            `Too far from New Berlin, or only a few devices? Order an [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it and ship it back. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Wisconsin Electronics Recycling Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Wisconsin bans TVs, computers, desktop printers, cell phones and other common electronics from landfills and incinerators, and the ban applies whether the device came from a home or a business. Businesses also aren't eligible for the state's E-Cycle Wisconsin program, which serves households and K-12 schools ([Wisconsin DNR](https://dnr.wisconsin.gov/topic/Ecycle/wisconsin.html)). Our New Berlin pickup gives companies a direct option.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Electronics Recycling for Southeast Wisconsin Businesses",
      grey: false,
      blocks: [
        {
          kind: "list",
          items: [
            {
              icon: "building",
              title: "Property managers",
              body: "TVs, monitors and microwaves left behind in apartments and office suites",
            },
            {
              icon: "tool",
              title: "Contractors",
              body: `Electronics pulled during remodels, plus [lamps and ballasts](${href('/ballasts/')}) from lighting upgrades`,
            },
            {
              icon: "school",
              title: "Schools, colleges and districts",
              body: "Retired classroom laptops, desktops, printers and lab computers",
            },
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Workstations and drives that may hold patient records, with hard drive destruction available",
            },
            {
              icon: "warehouse",
              title: "Warehouses and manufacturers",
              body: "Scanners, printers, cabling and control-room computers",
            },
            {
              icon: "building",
              title: "Offices and commercial buildings",
              body: "PCs, phones and copiers from upgrades or moves",
            },
            {
              icon: "landmark",
              title: "Municipal and public agencies",
              body: "Department cleanouts that need recycling and destruction records",
            },
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
    {
      figma: "doc-9",
      heading: "Why Recycle Technologies for Electronics Recycling in New Berlin",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "shield",
              title: "R2v3 at this facility",
              body: "Our New Berlin site is R2v3 certified, and our operations also follow RIOS standards",
            },
            {
              icon: "shield",
              title: "NAID AAA data destruction",
              body: "Hard drives and phones destroyed with a Certificate of Shredding",
            },
            {
              icon: "layers",
              title: "Every item logged",
              body: "Intake records for each load, followed by a Certificate of Recycling",
            },
            { icon: "shield", title: "Secured transport", body: "Load bars and straps on every pickup" },
            {
              icon: "laptop",
              title: "A wide accepted list",
              body: "From laptops and copiers to game consoles and security systems",
            },
            {
              icon: "cpu",
              title: "More than electronics",
              body: "Batteries, bulbs, ballasts and appliances at the same dock",
            },
            {
              icon: "recycle",
              title: "Zero-landfill commitment",
              body: `Learn about our [sustainability approach](${href('/sustainability/')})`,
            },
            { icon: "clock", title: "Since 1993", body: "Over 30 years recycling in Wisconsin and Minnesota" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "How much does electronics recycling cost in New Berlin?", a: "Fees depend on item type and volume. Call 262-798-3040 or request a quote." },
      { q: "Can I bring a refrigerator or washer with my electronics?", a: "Yes. The New Berlin center also accepts appliances such as refrigerators, washers and dryers." },
      { q: "Do you take tires, scrap metal or treadmills?", a: "Yes, all three are on the New Berlin accepted list. Call ahead for large amounts." },
      { q: "Can I drop off latex paint or propane tanks on the same trip?", a: "The New Berlin center lists both. Call first to confirm quantities." },
      { q: "Is there an email for Wisconsin pickups?", a: "Yes. Write to widispatch@recycletechnologies.com." },
      { q: "Do you have a facility in Minnesota?", a: "Yes. Our Blaine, MN center can be reached at 763-559-5130." },
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
            { label: "TV Recycling in Waukesha", href: href('/wisconsin-recycling/tv-recycling-waukesha/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Wisconsin Recycling & Shredding", href: href('/wisconsin-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in New Berlin, WI",
    body: ["Bring your electronics to 2815 S 171st St on any weekday, order a kit if you're farther away, or send us your site and equipment list for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Related link \"Electronics Recycling in Wisconsin\" (/wisconsin-recycling/electronic-recycling/, the old page this one replaces) left out", "Sustainability link: the doc says \"learn about our sustainability approach\" with no link, linked to /sustainability/"],
}
