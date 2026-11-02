import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Blaine, Minnesota — /minnesota/blaine/light-bulb-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Light Bulb Recycling in Blaine, Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/light-bulb-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Light Bulb Recycling in Blaine, Minnesota | Fluorescent, CFL, HID & LED",
    description: "Recycle fluorescent tubes, CFLs, HID, UV and LED bulbs at our Blaine, MN lamp facility on Davenport St NE, or book commercial bulb pickup across the Twin Cities.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Light Bulb Recycling in Blaine, Minnesota",
    h1: "Light Bulb Recycling in Blaine, Minnesota",
    body: [
      "Light bulb recycling for Blaine and the north metro, with weekday drop-off at our Davenport St NE lamp building, commercial pickup within about 100 miles, and mail-in kits for small batches.",
      `Fluorescent tubes and CFLs hold small amounts of mercury, so Minnesota requires them to be recycled rather than thrown out. Recycle Technologies runs a lamp processing building at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}), which means bulbs dropped off here are handled at our own facility instead of being passed to a broker. We take straight and U-bend tubes, CFLs, HID lamps, UV and neon lamps, LED, halogen and incandescent bulbs. Homeowners and businesses can drop off on weekdays; contractors and facility teams can book pickup for a full relamp, and a mail-in kit covers smaller amounts. Every job ends with a certificate, and our work follows R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Light Bulb Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}), Lamp Processing Building ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[10040 Davenport St NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=10040%20Davenport%20St%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            { label: "Arrival", value: "The lamp building is a short drive from our main center at 1525 99th Lane NE, with highway access from I-35W at 99th Ave NE. Bulbs are received at the dock on the west side of the Davenport St building, where a team member logs your load. Call ahead to confirm what you're bringing." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Residential and business drop-off:** weekdays at the west dock", "**Commercial pickup:** within roughly 100 miles of Blaine, with packing materials available beforehand"],
            ["**Mail-in:** prepaid bulb kits for smaller amounts"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Light Bulbs We Take in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["A handful of dead CFLs from the hall closet or a few hundred tubes from a school relamp in Coon Rapids, our Blaine lamp building accepts:"] },
        { kind: "bullets", rows: [
            ["Straight fluorescent tubes, including plastic-coated and shielded tubes", "Green-tip, circular and U-bend fluorescent lamps"],
            ["Compact fluorescent lamps (CFLs)", "High-intensity discharge (HID) lamps, such as metal halide and high-pressure sodium"],
            ["LED lamps", "UV lamps, plus cold cathode lamps such as neon and argon"],
            ["Flood, halogen and incandescent bulbs", "Broken fluorescent lamps, sealed and with a call ahead"],
        ] },
        { kind: "h3", text: "Getting Bulbs Here in One Piece" },
        { kind: "text", body: ["The U.S. Department of Transportation sets the rules for how bulbs travel, so a sturdy box matters. The cartons your replacement bulbs came in work well, and so do our fiber bins. Skip taping tubes into bundles or tossing loose bulbs in a bag. If a lamp breaks, put the pieces in a sealed container and call 763-559-5130 before you head over. Businesses booking a pickup can ask for packing materials to be dropped off first.", `See our main [light bulb recycling page](${href('/light-bulbs/')}) for the full list of lamps we handle.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Light Bulb Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Pick your option", body: ["Drive to the Davenport St dock, schedule a commercial pickup, or order a mail-in kit."] },
              { n: 2, title: "Box them up", body: ["Use original cartons, fiber bins or another rigid container so nothing cracks on the way."] },
              { n: 3, title: "Drop off or hand over", body: ["Our crew logs your bulbs at the west dock or loads them at your site."] },
            ],
            [
              { n: 4, title: "Processing in Blaine", body: ["Lamps are processed at our own facility. Mercury-contaminated phosphor powder and filters go on to a distillation company."] },
              { n: 5, title: "Your certificate", body: ["You receive documentation confirming your bulbs were recycled."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Light Bulb Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Need light bulb recycling near you in Blaine, Ham Lake or Circle Pines? Bring boxed bulbs to 10040 Davenport St NE any weekday between 7:30 AM and 4:00 PM. Drop-off is open to homeowners and businesses alike, with no household cap and no business-only restrictions. Call 763-559-5130 first for a large load or any broken lamps.", `The same trip can include [ballasts](${href('/ballasts/')}) at the west dock, while [batteries](${href('/battery-recycling/')}) and [electronics](${href('/electronic-recycle/')}) go to our 1525 99th Lane NE building nearby.`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: ["Many public bulb programs limit how many lamps a household can bring or don't take business bulbs at all. Property managers, electrical contractors, schools, hospitals, warehouses and retailers can skip that problem with a scheduled pickup. Pickup is a business service covering sites within roughly 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Fridley, Lino Lakes, Mounds View, Roseville, Maple Grove, Brooklyn Park, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Site address:** street, city and ZIP code, plus dock access", "**Lamp types:** tubes, CFLs, HID, UV, LED or a mix"],
            ["**Quantity:** an estimated count, number of boxes or pallets", "**Broken lamps:** any cracked or shattered bulbs in the load"],
            ["**Ballasts:** whether fixture ballasts are coming out at the same time", "**Packing materials:** whether you'd like bins delivered before the pickup"],
        ] },
        { kind: "buttons", primary: { label: "Request a Light Bulb Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: [`Only a few bulbs, or farther out than our pickup area? Order a prepaid [bulb recycling kit](https://ezontheearth.com/collections/bulb-recycle-kits?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it and send it back. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
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
      heading: "Light Bulb Recycling Rules in Minnesota",
      grey: true,
      blocks: [
        { kind: "text", body: ["The Minnesota Pollution Control Agency states that all mercury-containing lamps, green-tip fluorescent lamps included, must be recycled when discarded. They can't be crushed or put in the trash, and businesses manage them as universal waste ([MPCA](https://www.pca.state.mn.us/sites/default/files/w-hw4-21.pdf)). Incandescent, halogen and LED bulbs don't contain mercury, but we take them too so a relamp crew doesn't have to sort by destination."] },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Light Bulb Recycling in Blaine",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**Processed right here:** our Davenport St building is a lamp processing facility, so bulbs stay with us instead of going to a broker", "**Wide lamp range:** fluorescent tubes, CFLs, green-tip, U-bend, HID, UV, neon, LED, halogen and incandescent"],
            ["**No household cap:** homes and businesses can both drop off on weekdays", "**Packing help for pickups:** bins can be delivered before your scheduled collection"],
            ["**Documented results:** each job closes with a certificate", "**Audited standards:** R2v3 and RIOS, both independently audited"],
            ["**Since 1993:** more than 30 years recycling lamps in Minnesota and Wisconsin"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Light Bulb Recycling FAQs",
    items: [
      { q: "What does light bulb recycling cost in Blaine?", a: "Pricing depends on the lamp type and quantity. Call 763-559-5130 or request a quote." },
      { q: "Will my bulbs end up in a landfill?", a: "No. We're committed to zero landfill." },
      { q: "Can I bring projector lamps?", a: "Yes. Projector lamps are on the Blaine accepted list." },
      { q: "Do you take old holiday light strings?", a: "Yes. Holiday lights can be dropped off at our Blaine center." },
      { q: "Is there a Minnesota email for bulb pickups?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you have a bulb recycling facility in Wisconsin too?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
            { label: "Minnesota Recycling & Shredding", href: href('/minnesota-recycling/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Light Bulb Recycling in Blaine, MN",
    body: ["Bring boxed bulbs to our Davenport St NE dock any weekday, order a kit for a small batch, or send us your site and lamp count for a commercial pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Light Bulb Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "FAQ \"Will my bulbs end up in a landfill?\": the doc's [confirm sustainability page URL] note left out"],
}
