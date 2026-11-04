import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in New Berlin, WI — /wisconsin/new-berlin/battery-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Battery Recycling in New Berlin, Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_BATTERY_RECYCLING: LocalPage = {
  url: href('/wisconsin/new-berlin/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in New Berlin, WI | Recycle Technologies",
    description: "Recycle lithium-ion, lead-acid, NiCd, button cell, UPS and EV batteries in New Berlin, WI. Weekday drop-off near I-43, business pickup and mail-in kits.",
  },
  schema: { service: "Battery Recycling", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Battery Recycling in New Berlin, WI",
    h1: "Battery Recycling in New Berlin, WI",
    body: ["Battery recycling for New Berlin and the Milwaukee-Waukesha area, with weekday drop-off on South 171st Street, scheduled pickup for businesses, and mail-in kits for smaller batches."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Most used batteries can't go in the trash or a curbside cart, and Wisconsin treats many batteries from businesses as universal waste. Recycle Technologies recycles batteries at our [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, close to I-43 and College Avenue. We take alkaline and zinc, lithium-ion, sealed lead-acid, nickel-cadmium, and button cell batteries, plus power tool packs, backup units, and EV batteries. Drop them off on a weekday, ship a small batch with a mail-in kit, or book a business pickup, and every job closes with a Certificate of Recycling.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Battery Recycling Center",
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
              label: "Getting here",
              value: "We're a short drive from I-43 and College Avenue. Pull into the main lot on South 171st Street; bigger loads unload at the rear loading area. Parking is on site.",
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
              body: "Open to households and businesses on weekdays. No appointment is needed during regular hours.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Scheduled collection for companies within 100 miles of New Berlin.",
            },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid battery kits you pack and ship from home or the office.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Accept in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "From a kitchen drawer of dead AAs to the backup units from a Brookfield server room, our New Berlin facility takes:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries" },
            { icon: "zap", title: "Lithium-ion batteries" },
            { icon: "battery", title: "Sealed lead-acid batteries" },
            { icon: "repeat", title: "Nickel-cadmium (NiCd) batteries" },
            { icon: "target", title: "Button cell batteries" },
            { icon: "tool", title: "Power tool battery packs" },
            { icon: "plug", title: "Battery backup and UPS units" },
            {
              icon: "car",
              title: "Electric vehicle and Tesla batteries (call ahead so we can plan for their size and weight)",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Mercury oxide batteries and other types not listed here are reviewed case by case. If you aren't sure a battery qualifies, call 262-798-3040 before you schedule.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Getting Batteries Ready",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Getting Batteries Ready",
          body: [
            "Batteries can spark a fire or leak if they're crushed or stored loosely, so a few minutes of prep makes the trip safer:",
            `Our main [battery recycling page](${href('/battery-recycling/')}) has more on each battery type.`,
          ],
          checks: [
            "**Cover the terminals:** a strip of tape over each end before storage or transport lowers fire risk.",
            "**Keep damaged batteries apart:** put swollen, cracked, or leaking batteries in their own container and call us before bringing them in.",
            "**Sort when you can:** our staff sort every battery by chemistry, but a box that's already separated moves through faster. Mail-in kits need batteries separated by type.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Our Battery Recycling Process Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick your option",
              body: "Drop off at South 171st Street, book a business pickup, or order a mail-in kit.",
            },
            { title: "Prep the batteries", body: "Tape the terminals and set damaged ones aside." },
            {
              title: "Hand them over",
              body: "Unload at our lot, stage boxes for the driver, or ship your kit.",
            },
            { title: "Sorting", body: "Trained staff separate each battery by chemistry once it arrives." },
            {
              title: "Recycling and records",
              body: "Batteries are recycled with no waste sent to landfill or exported, and you receive a Certificate of Recycling.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Recycling Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for battery recycling near you in New Berlin, West Allis, Greenfield or Muskego? Our South 171st Street facility takes batteries Monday through Friday, 7:30 AM to 4:00 PM. Homeowners and companies can both use it, and you can simply show up during those hours. For EV batteries or a large load, call 262-798-3040 beforehand.",
            `While you're here, you can also unload [old electronics](${href('/electronic-recycle/')}), [TVs](${href('/wisconsin-recycling/tv-recycling-waukesha/')}) and drives for [hard drive destruction](${href('/hard-drive-destruction-services/')}).`,
            `See every [Recycle Technologies drop-off location](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Property managers swapping out smoke detector and exit sign batteries, contractors with worn tool packs, schools and hospitals retiring backup units, and warehouses with sealed lead-acid batteries can book pickup instead of hauling. Pickup covers businesses within 100 miles, including Waukesha, Brookfield, Pewaukee, Menomonee Falls, Wauwatosa, Franklin, Milwaukee, Oak Creek, Racine, Kenosha and Madison. Our trucks secure each load with load bars and straps, and items are logged at collection.",
          ],
          listIntro: "To get an accurate quote, tell us:",
          list: [
            "**Pickup location:** street address, city and ZIP code",
            "**Battery types:** lithium-ion, lead-acid, NiCd, alkaline, EV or mixed",
            "**Amount:** a rough count, weight, box total or pallets",
            "**Condition:** any swollen, cracked or leaking batteries",
            "**Schedule:** a one-time cleanout or repeat pickups",
            "**Other materials:** electronics, lamps or documents to collect on the same trip",
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
            `For a satellite office, a home workshop or a small batch, order a prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), separate the batteries by type, tape the terminals and send it off. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page explains how kits work.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Wisconsin Battery Disposal Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "The Wisconsin DNR says batteries and electronics should never go in curbside recycling carts, and many batteries from businesses are regulated as universal waste rather than trash ([Wisconsin DNR](https://dnr.wisconsin.gov/topic/Recycling/Batteries.html)). Waukesha County's household hazardous waste sites serve residents only, so businesses need a recycler such as our New Berlin facility for drop-off or scheduled pickup.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Businesses Choose Recycle Technologies in New Berlin",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              title: "Every common chemistry in one place",
              body: "Alkaline to lithium-ion, lead-acid, NiCd, UPS units, and EV batteries, so you don't need a separate vendor for each type",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            {
              icon: "sort",
              title: "Sorted by trained staff",
              body: "Each battery is separated by type before recycling",
            },
            {
              icon: "file",
              title: "Paperwork for your files",
              body: "Items are logged at pickup, and you receive a Certificate of Recycling",
            },
            {
              icon: "recycle",
              title: "No landfill, no export",
              body: "No waste from our process is sent to landfill or shipped overseas",
            },
            {
              icon: "truck",
              title: "Local pickup",
              body: "Scheduled collection across southeast Wisconsin, with loads secured on every trip",
            },
            { icon: "clock", title: "Since 1993", body: "More than 30 years of recycling experience" },
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
      { q: "What does battery recycling cost in New Berlin?", a: "Pricing depends on battery type, weight, and service. Call 262-798-3040 or request a quote." },
      { q: "Do I have to live in New Berlin to drop off?", a: "No. Drop-off is open to households and businesses from any town during regular hours." },
      { q: "Can my company drop off batteries instead of booking pickup?", a: "Yes. Businesses can bring batteries to South 171st Street on weekdays, which works well for smaller or one-time loads." },
      { q: "Can one pickup include more than batteries?", a: "Yes. A scheduled business collection can also cover electronics, lamps, and confidential documents." },
      { q: "We have locations in Wisconsin and Minnesota. Can you serve both?", a: "Yes. Business pickup runs within 100 miles of our Wisconsin and Minnesota facilities, including St. Paul." },
      { q: "How soon can a battery pickup be scheduled?", a: "Call 262-798-3040 to check the next open date for your area." },
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
            { label: "Battery Recycling in Milwaukee", href: href('/wisconsin-recycling/battery-recycling-milwaukee/') },
            { label: "Battery Recycling in Waukesha", href: href('/wisconsin-recycling/battery-recycling-waukesha/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Wisconsin Recycling & Shredding", href: href('/wisconsin-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Start Battery Recycling in New Berlin, WI",
    body: ["Drop off on any weekday, send a small batch with a mail-in kit, or share your site and battery types for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Damaged batteries: the doc's [Confirm damaged-battery handling at New Berlin] note left out (the call-first line is kept)", "FAQ \"How soon can a battery pickup be scheduled?\": the doc's [Confirm typical lead time] left out (the call line is kept)", "Drop-off: the doc's TVs link sat on a stray \",s\"", "put on \"TVs\" with the doc's target /wisconsin-recycling/tv-recycling-waukesha/"],
}
