import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * TV Recycling in New Berlin, WI — /wisconsin/new-berlin/television-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Television Recycling Services in Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_TELEVISION_RECYCLING: LocalPage = {
  url: href('/wisconsin/new-berlin/television-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "TV Recycling in New Berlin, WI | Recycle Technologies",
    description: "Recycle CRT, LCD, LED, plasma, and flat-screen TVs in New Berlin, WI. Weekday drop-off near I-43 and business pickup across southeast Wisconsin.",
  },
  schema: { service: "TV Recycling", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "TV Recycling in New Berlin, WI",
    h1: "TV Recycling in New Berlin, WI",
    body: ["TV recycling for New Berlin, Milwaukee and Waukesha County, with weekday drop-off on South 171st Street, scheduled pickup for businesses and a Certificate of Recycling at the end of every job."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Wisconsin keeps televisions out of landfills and incinerators, and older tube sets hold lead and cadmium that need careful handling. Recycle Technologies accepts TVs at our [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, a few minutes from I-43 and College Avenue. We take CRT, LCD, LED, plasma, and other flat-screen TVs, plus CRT monitors. Homeowners and businesses can bring sets in on weekdays, and companies swapping out screens in bulk can book pickup.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin TV Recycling Center",
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
              value: "Take I-43 to College Avenue and head to South 171st Street. Signs in the main lot lead you around to the rear loading area for unloading, and parking is on site.",
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
              body: "Weekdays during business hours, with no appointment needed. Call first for oversized or unusual sets.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Scheduled collection for commercial sites within 100 miles",
            },
            { icon: "mail", title: "Mail-in", body: "An electronics recycling kit for a small screen or two" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Televisions We Recycle in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A 1990s tube set from a Greenfield basement and a row of wall displays from a Brookfield office are both welcome here. We accept:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "CRT (tube) televisions" },
            { icon: "tv", title: "LCD TVs" },
            { icon: "bulb", title: "LED TVs" },
            { icon: "tv", title: "Plasma TVs" },
            { icon: "tv", title: "Other flat-screen TVs" },
            { icon: "tv", title: "CRT monitors" },
          ],
        },
        {
          kind: "note",
          body: [
            "For projection sets, very large screens, or anything out of the ordinary, call 262-798-3040 before you load up so the team can confirm.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Getting Your TVs Ready",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Getting Your TVs Ready",
          body: [
            `See our main [TV recycling page](${href('/tv-recycling/')}) for more on how we handle each type.`,
          ],
          checks: [
            "**Handle tube TVs with care.** CRTs are heavy and contain lead and cadmium, so carry them upright and keep the screen from taking a hit.",
            "**Protect flat screens.** Stand panels on edge with a blanket or cardboard between them so they don't scrape or crack on the ride.",
            "**Tell us about damage.** Mention any cracked or shattered screens when you call or request a quote.",
            "**Bring the extras.** Remotes, cables, speakers, and other peripherals can come in with the set.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Your Old TV Gets Recycled",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Choose how to send it",
              body: "Drop off on South 171st Street, set up a business pickup, or use an electronics kit for a small screen.",
            },
            { title: "Share the details", body: "Let us know how many sets, what types, and any damage." },
            {
              title: "Hand off the load",
              body: "Unload at our facility, stage TVs for the driver, or ship your kit.",
            },
            { title: "Teardown", body: "Each television is taken apart into its base components." },
            {
              title: "Separation and recovery",
              body: "CRT tubes and any mercury-containing glass are kept apart for hazard-aware handling, metals and plastics are recovered for reuse, and you receive a Certificate of Recycling.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "TV Recycling Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Searching for TV recycling near you in New Berlin, Hales Corners, West Allis or Franklin? Drive your sets to 2815 S 171st St any weekday from 7:30 AM to 4:00 PM. Residents and businesses can come without booking ahead, though a quick call to 262-798-3040 helps if you're bringing a trailer of TVs or a projection unit.",
            `The same stop can include [computers and other electronics](${href('/electronic-recycle/')}), [batteries](${href('/battery-recycling/')}) and drives for [hard drive destruction](${href('/hard-drive-destruction-services/')}).`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Hotels and senior living communities replacing room TVs, property managers clearing out vacant units, schools, hospitals, offices, restaurants and retailers can have televisions collected on site. Commercial pickup covers businesses within 100 miles of New Berlin, including Milwaukee, Waukesha, Wauwatosa, Brookfield, Menomonee Falls, Oak Creek, Racine, Kenosha, West Bend and Madison. Every set is logged at collection, and loads are secured with load bars and straps.",
          ],
          listIntro: "To price your pickup, send us:",
          list: [
            "**Location:** site address and ZIP code",
            "**TV types:** CRT, flat-screen, plasma or a mix",
            "**Count and sizes:** number of sets and rough screen sizes",
            "**Condition:** any cracked or broken screens",
            "**Other electronics:** computers, monitors or AV gear going out too",
            "**Schedule:** a single cleanout or repeat collections",
          ],
          buttons: {
            primary: { label: "Request a TV Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `If you only have a small screen or two and can't make it to New Berlin, our [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) is an option. The [mail-in recycling program](${href('/mail-in-recycling/')}) page explains how kits are packed and shipped.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Wisconsin TV Disposal Rules",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "State law (s. 287.07(5), Wis. Stats.) bans TVs, monitors, and other common electronics from Wisconsin landfills and incinerators, whether they come from a home or a business. The DNR also asks non-household generators to check whether their electronics count as hazardous waste and to use licensed processing facilities (Wisconsin DNR).",
            "Locally, New Berlin's city recycling center doesn't accept electronics, and Milwaukee's city drop-off centers serve city residents only, with a limit of three TVs per visit. Waukesha County lists Recycle Technologies in New Berlin as a business electronics recycler (Waukesha County).",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why New Berlin Businesses Recycle TVs With Us",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Local facility",
              body: "A Waukesha County site you can drive to, plus pickup across southeast Wisconsin",
            },
            {
              icon: "layers",
              title: "Every TV type",
              body: "Tube sets, LCD, LED, plasma and other flat screens, plus CRT monitors",
            },
            {
              icon: "sort",
              title: "Careful CRT handling",
              body: "Lead- and cadmium-bearing tubes are separated and handled with hazards in mind",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            {
              icon: "file",
              title: "Tracked and documented",
              body: "Sets are logged at pickup, and a Certificate of Recycling follows",
            },
            {
              icon: "battery",
              title: "One trip for the whole room",
              body: "TVs, computers, AV gear, and batteries can all go together",
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
      { q: "What does TV recycling cost in New Berlin?", a: "Fees can apply depending on the type of item. Call 262-798-3040 or request a quote before you come in." },
      { q: "Can a hotel or apartment complex recycle every TV in one go?", a: "Yes. Book a business pickup and share your set count so we can plan the truck and crew." },
      { q: "Can a property manager drop off TVs tenants left behind?", a: "Yes. Drop-off is open to businesses, so managers can bring sets straight from vacant units." },
      { q: "Do I need to call before bringing several TVs?", a: "It's a good idea for a big load. A call lets the team make room at the loading area." },
      { q: "Can I bring speakers, a game console, or a CD player with the TV?", a: "Yes. Our New Berlin center accepts those along with other home electronics." },
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
            { label: "TV Recycling", href: href('/tv-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
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
    heading: "Recycle Your TVs in New Berlin, WI",
    body: ["Bring sets to South 171st Street on any weekday, or send us your site address and TV count for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule TV Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Getting Your TVs Ready: the doc's note \"[Confirm handling for broken screens at New Berlin]\" left out", "Mail-in: the doc's note \"[Confirm which TV sizes fit the kit]\" left out", "Related link \"TV Recycling in Wisconsin\" (the old /tv-recycling-in-wisconsin/, which will 301 to this page) left out", "\"West Alli,s\" in the doc read as \"West Allis\""],
}
