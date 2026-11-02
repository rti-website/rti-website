import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * TV Recycling in Blaine, Minnesota — /minnesota/blaine/television-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Television Recycling in Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_TELEVISION_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/television-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "TV Recycling in Blaine, Minnesota | CRT, LCD, LED & Plasma TVs",
    description: "Recycle CRT, LCD, LED, and plasma TVs at our Blaine, MN center on 99th Lane NE, or book bulk TV pickup for businesses across the Twin Cities metro.",
  },
  schema: { service: "TV Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "TV Recycling in Blaine, Minnesota",
    h1: "TV Recycling in Blaine, Minnesota",
    body: [
      "TV recycling for Blaine and the north metro, with weekday drop-off at our 99th Lane NE center, commercial pickup for bulk sets within about 100 miles, and mail-in kits for a few smaller screens.",
      `Old tube TVs carry lead and cadmium inside the picture tube, and newer flat screens are built from glass, circuit boards, metal and plastic that are worth recovering. Recycle Technologies takes all of them at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE: CRT, LCD, LED, plasma and other flat-screen TVs, whether they still power on or not. Households and businesses can drop off on weekdays, and property managers, schools, offices, and other organizations with a stack of sets can book a pickup instead. Every job comes with a certificate, and our recycling follows R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine TV Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            { label: "Arrival", value: "Take I-35W to 99th Ave NE, then turn in from 99th Lane NE. Drive around the 1525 building to the rear loading area and pull up to the north-end dock, where our crew will help unload and log your TVs. Parking is free." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Residential and business drop-off:** weekdays, no appointment needed for a few sets", "**Commercial pickup:** bulk TV collection within roughly 100 miles of Blaine"],
            ["**Mail-in:** electronics kits for a few smaller screens"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "TVs We Take in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["From the basement tube set nobody wants to lift to a lobby display coming off the wall in a Fridley office, our Blaine center accepts:"] },
        { kind: "bullets", rows: [
            ["CRT (tube) televisions of any age", "LCD televisions"],
            ["LED televisions", "Plasma televisions"],
            ["Other flat-screen TVs", "Sets that no longer turn on, along with outdated models"],
        ] },
        { kind: "text", body: ["Working TVs and broken ones both qualify, so there's no need to test a set before you bring it in."] },
        { kind: "h3", text: "Preparing TVs for the Trip" },
        { kind: "text", body: ["Leave TVs whole. Taking a set apart can crack the screen or break the tube, and our team handles the dismantling. Lay flat screens on a blanket or upright between other items so the glass doesn't flex on the drive, and keep CRT sets on a solid surface. If a screen is already cracked, tell us before you arrive. Cords and remotes can come along with the set.", `See our main [TV recycling page](${href('/tv-recycling/')}) for more on how televisions are handled.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How TV Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Count your sets", body: ["Note how many CRTs and flat screens you have and roughly how big they are."] },
              { n: 2, title: "Pick a route", body: ["Drop off at our Blaine dock, request commercial pickup, or order a mail-in kit for a few small screens."] },
              { n: 3, title: "Hand them over", body: ["Our crew unloads and logs your TVs in Blaine, or collects them from your building."] },
            ],
            [
              { n: 4, title: "Dismantling", body: ["Each set is broken down so the cabinet, wires, boards, metal parts, and glass are separated. CRT tubes, which contain lead and cadmium, get careful handling, and some newer screen glass is kept separate."] },
              { n: 5, title: "Recovery and records", body: ["Metals and plastics go back into use, and you receive a certificate once the job is complete."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "TV Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Searching for TV recycling near you in Blaine, Spring Lake Park, or Lino Lakes? Bring your sets to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. Drop-off is open to households and businesses, and we don't publish a per-household cap. Call 763-559-5130 ahead of time if you're bringing more than a few sets or anything unusually large.", `The same visit can include other [electronics](${href('/electronic-recycle/')}), [batteries](${href('/battery-recycling/')}), and hard drives for [destruction](${href('/minnesota/blaine/hard-drive-destruction/')}).`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: [`Many public programs charge per set, cap how many TVs a household can bring, or won't take sets used by a business or rental property. Property managers turning over units, schools retiring classroom displays, hospitals and clinics replacing room TVs, offices clearing conference rooms, and contractors finishing renovation cleanouts can schedule a pickup instead. Pickup covers businesses within roughly 100 miles of Blaine, including [Coon Rapids](${href('/minnesota-recycling/coon-rapids/')}), Andover, Anoka, Ham Lake, Fridley, Mounds View, [Roseville](${href('/minnesota-recycling/ramsey/roseville/')}), [Brooklyn Park](${href('/minnesota-recycling/hennepin-county-recycling-center/brooklyn-park-recycling-center/')}), Maple Grove, [Plymouth](${href('/minnesota-recycling/hennepin-county-recycling-center/plymouth-recycling-center/')}), [Minneapolis](${href('/minnesota-recycling/minneapolis/')}), St. Paul, Bloomington, [Woodbury](${href('/minnesota-recycling/electronic-recycling-in-woodbury/')}), Burnsville, [Lakeville](${href('/minnesota-recycling/dakota-county/lakeville-recycling-center/')}), Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.`, "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Site address:** street, city and ZIP, plus dock or elevator access", "**TV count by type:** how many CRTs and how many flat screens"],
            ["**Sizes:** rough screen sizes, or note any very large sets", "**Condition:** any cracked screens or damaged cabinets"],
            ["**Mounting:** whether TVs are still on the wall or already staged", "**Frequency:** a one-time cleanout or ongoing collection"],
        ] },
        { kind: "buttons", primary: { label: "Request a TV Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: [`Have only a small screen or two, or live outside our pickup area? Order an [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) and ship them in. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order to check what fits.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Minnesota Counties We Serve",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Anoka County", href: href('/minnesota-recycling/anoka-county-recycling/') },
            { label: "Hennepin County", href: href('/minnesota-recycling/hennepin-county-recycling-center/') },
            { label: "Ramsey County", href: href('/minnesota-recycling/ramsey/') },
            { label: "Dakota County", href: href('/minnesota-recycling/dakota-county/') },
            { label: "Washington County", href: href('/minnesota-recycling/washington-county/') },
            { label: "Scott County", href: href('/minnesota-recycling/scott-county/') },
            { label: "Olmsted County", href: href('/minnesota-recycling/olmsted-county/') },
            { label: "Benton County (St. Cloud)", href: href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/') },
            { label: "St. Louis County (Duluth)", href: href('/minnesota-recycling/electronic-recycling-duluth/') },
        ] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for TV Recycling in Blaine",
      grey: true,
      blocks: [
        { kind: "bullets", rows: [
            ["**An actual recycling facility:** TVs come to our Blaine center for recycling, not to a hauler's truck with an unknown destination", "**Every common TV type:** CRT, LCD, LED, plasma and other flat screens, working or not"],
            ["**Careful CRT handling:** lead and cadmium in picture tubes are kept out of the waste stream", "**Business-friendly:** bulk pickup for property managers, schools, offices and other organizations"],
            ["**Documented recycling:** a certificate with every job", "**Audited standards:** R2v3 and RIOS, independently audited rather than self-declared"],
            ["**Since 1993:** more than three decades recycling electronics in Minnesota and Wisconsin"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "TV Recycling FAQs",
    items: [
      { q: "What does TV recycling cost in Blaine?", a: "Pricing depends on the type and number of sets. Call 763-559-5130 or request a quote." },
      { q: "Do working TVs get reused?", a: "Sets that still work may be donated for reuse. Non-working and outdated ones are recycled." },
      { q: "Can I bring old computer monitors with my TVs?", a: "Yes. CRT and flat-panel monitors are accepted through our electronics recycling service." },
      { q: "Do I get paperwork at a business pickup?", a: "You may receive a hazard consignment note when the TVs are collected, then a certificate once they're recycled." },
      { q: "Is there a Minnesota email for TV pickups?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you have a TV recycling facility in Wisconsin?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "TV Recycling", href: href('/tv-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With TV Recycling in Blaine, MN",
    body: ["Bring your TVs to 1525 99th Ln NE on any weekday, ship a small screen with a mail-in kit, or send us your site address and set count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule TV Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "Related link \"TV Recycling in Minnesota\" (the old /tv-recycling-in-minnesota/, which now 301s to this page) left out"],
}
