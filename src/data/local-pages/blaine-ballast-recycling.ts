import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Blaine, Minnesota — /minnesota/blaine/ballast-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Ballast Recycling in Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_BALLAST_RECYCLING: LocalPage = {
  url: href('/minnesota/blaine/ballast-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Ballast Recycling in Blaine, Minnesota | PCB & Non-PCB Ballasts",
    description: "Recycle PCB and non-PCB lighting ballasts at our Blaine, MN lamp building on Davenport St NE, or book commercial ballast pickup across the Twin Cities.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Ballast Recycling in Blaine, Minnesota",
    h1: "Ballast Recycling in Blaine, Minnesota",
    body: [
      "Ballast recycling for Blaine and the Twin Cities metro, with weekday drop-off at our Davenport St NE lamp and ballast facility, commercial pickup within about 100 miles, and mail-in kits for eligible non-PCB ballasts. We accept PCB and non-PCB magnetic and electronic ballasts from contractors, businesses, and households.",
      "Recycle fluorescent and HID lighting ballasts removed during LED retrofits, building renovations and routine facility maintenance. Our Blaine facility accepts older magnetic ballasts, electronic ballasts, PCB-containing units and non-PCB models. Businesses can arrange collection from commercial properties, warehouses, schools and job sites, while households can bring accepted ballasts to our weekday drop-off location. Smaller quantities of eligible non-PCB ballasts can also be sent through our mail-in program. PCB-containing components follow the designated hazardous waste disposal process, and customers receive a Certificate of Recycling for their records. Our recycling operations follow R2v3 and RIOS standards.",
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Ballast Recycling Center",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}), Lamp & Ballast Building ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[10040 Davenport St NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=10040%20Davenport%20St%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM–4:00 PM" },
            { label: "Main center", value: "[1525 99th Ln NE](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449), for electronics and batteries" },
            { label: "When you arrive", value: "Ballasts and light bulbs both go to the dock on the west side of the Davenport St building. If you're carrying old computers or batteries too, those go to the north-end dock at 1525 99th Lane NE, a short drive away. Call ahead so we can confirm what you're bringing. A team member will log your ballasts at the dock." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["Weekday drop-off for businesses and households", "Commercial pickup within about 100 miles"],
            ["[Mail-in kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) for non-PCB ballasts"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts We Accept in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["We accept different ballast designs and PCB classifications. The construction type describes how the ballast is built, while the PCB classification identifies whether it contains PCB materials."] },
        { kind: "bullets", rows: [
            ["**PCB ballasts:** Older magnetic ballasts with capacitors that may contain PCBs.", "**Non-PCB ballasts:** Magnetic and electronic models manufactured without PCB capacitors."],
            ["**Electronic ballasts:** Lighter units commonly found in T8 and T5 fluorescent fixtures. Their PCB status should be determined from the label or other reliable identification.", "**Magnetic ballasts:** Heavy, core-and-coil units used in older fluorescent fixtures. Some older models may contain PCB capacitors."],
            ["**HID ballasts:** Ballasts from metal halide and high-pressure sodium fixtures used in warehouses, gyms, and parking lots. Call to confirm acceptance for your specific equipment.", "**Leaking ballasts:** Call 763-559-5130 before bringing them in so our team can explain the handling requirements."],
        ] },
        { kind: "h3", text: "How to Tell if a Ballast Contains PCBs" },
        { kind: "text", body: ["The Minnesota Pollution Control Agency's guidance is to treat a ballast as PCB-containing unless the label says \"No PCBs\" or you know it was made after 1979. Treat any leaking ballast as PCB-containing too ([MPCA guidance](https://www.pca.state.mn.us/publications/w-hw4-48f.pdf)). Still unsure? Describe what you have when you request a quote, and we'll help sort it out."] },
        { kind: "h3", text: "Handling Leaking Ballasts" },
        { kind: "text", body: ["If you see an oily residue or a stain on the casing, wear gloves and set that ballast in its own sealed container. Keep it away from the rest of the load, and give us a call before you head over.", `See our main [ballast recycling page](${href('/ballasts/')}) for more on how PCB and non-PCB ballasts are processed.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Ballast Recycling Works at Our Blaine Facility",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Check the labels", body: ["Group ballasts marked \"No PCBs\" separately from unlabeled or older magnetic units, and keep any leakers in their own container."] },
              { n: 2, title: "Count them up", body: ["A rough number or weight helps us plan the drop-off or quote the pickup."] },
              { n: 3, title: "Bring them in or book a truck", body: ["Drive to the Davenport St west dock on a weekday, or schedule commercial pickup from your building or job site."] },
            ],
            [
              { n: 4, title: "We split the streams", body: ["PCB and DEHP capacitors are removed and sent with a certified hazardous waste hauler to an EPA-approved incineration facility. Copper and steel go back into production, and plastics are reprocessed."] },
              { n: 5, title: "File your certificate", body: ["You receive a Certificate of Recycling documenting proper disposal."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Ballast Recycling Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off Ballast Recycling" },
        { kind: "text", body: ["If you're bringing in a few ballasts from a fixture replacement or a larger batch from a lighting project, our Davenport St building accepts weekday drop-offs from businesses and households.", "Electrical contractors can bring ballasts removed during fixture upgrades, while homeowners can drop off individual units from garage or basement lighting. For a truckload or a large retrofit collection, call ahead so our team can prepare for your arrival.", "Light bulbs can also be dropped off at the west-side dock. If you're bringing batteries or electronics, those go to the separate 1525 99th Lane NE building.", `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Commercial Ballast Pickup in the Twin Cities" },
        { kind: "text", body: [`We collect ballasts from businesses within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Mounds View, [Roseville](${href('/minnesota-recycling/ramsey/roseville/')}), Brooklyn Park, Maple Grove, Plymouth, [Minneapolis](${href('/minnesota-recycling/minneapolis/')}), St. Paul, [Bloomington](${href('/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/')}), [Woodbury](${href('/minnesota-recycling/electronic-recycling-in-woodbury/')}), [Burnsville](${href('/minnesota-recycling/dakota-county/burnsville-recycling-center/')}), Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and [St. Cloud](${href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/')}).`, "For a pickup quote, send us:"] },
        { kind: "bullets", rows: [
            ["The building or job-site address, plus loading access", "Your ballast count or weight"],
            ["How many are labeled \"No PCBs\" and how many are unlabeled or older magnetic units", "Any leaking ballasts"],
            ["Whether ballasts are loose or still in fixtures", "Any lamps that need to go out with them"],
        ] },
        { kind: "buttons", primary: { label: "Request a Ballast Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In for Non-PCB Ballasts" },
        { kind: "text", body: [`For a small number of non-PCB ballasts, order a [non-PCB ballast recycling kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) and ship it back. PCB ballasts should come through drop-off or pickup, because some materials carry federal shipping restrictions. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Service Area in Minnesota",
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
      heading: "Who Brings Us Ballasts",
      grey: true,
      blocks: [
        { kind: "bullets", rows: [
            ["**Electrical and lighting contractors:** LED upgrades in offices, stores, and schools leave behind dozens or hundreds of ballasts per job. We'll take mixed PCB and non-PCB loads straight from the site.", "**Property managers:** older apartment and office buildings around the north metro still have original fixtures, and their ballasts may predate 1979."],
            ["**Schools and districts:** classroom and gym lighting swaps, often done over summer break", "**Hospitals and clinics:** steady fixture maintenance that calls for documented disposal"],
            ["**Warehouses and manufacturers:** high-bay HID and magnetic ballasts from large lighting systems", "**Facility managers and public agencies:** building upgrades where the paper trail matters as much as the pickup"],
            ["**Homeowners:** a ballast or two from a garage or basement fixture, dropped off at our dock"],
        ] },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Choose Recycle Technologies for Ballast Recycling",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**Independently audited standards:** our recycling meets R2v3 and RIOS requirements, verified by outside auditors", "**PCB and non-PCB in one place:** no need to find a second vendor for the older magnetic units"],
            ["**Documented hazardous waste handling:** PCB and DEHP capacitors are handled through the designated hazardous waste disposal process, with supporting documentation provided", "**Metals put back to use:** copper and steel are recovered, and plastics are reprocessed"],
            ["**Lamps and ballasts together:** ballasts and light bulbs go to the same Blaine building", "**Since 1993:** over 30 years of recycling from our Minnesota and Wisconsin sites"],
            [`**Zero-landfill commitment:** learn about our [sustainability approach](${href('/sustainability/')})`],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "How much does ballast recycling cost?", a: "Pricing depends on the quantity and on whether the ballasts contain PCBs. Call 763-559-5130 or request a quote." },
      { q: "Do I need to cut the ballasts out of the fixtures first?", a: "Tell us when you request your quote, and we'll explain how to send whole fixtures versus loose ballasts." },
      { q: "Can I bring capacitors that aren't inside a ballast?", a: "Call first. We'll let you know whether they can come in with your ballasts." },
      { q: "Can my business email instead of calling?", a: "Yes. Reach our Minnesota dispatch team at dispatch@recycletechnologies.com." },
      { q: "Is there a ballast recycling location in Wisconsin?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
      { q: "Can I schedule a ballast pickup from my house?", a: "Pickup is for commercial clients. Households can use our weekday drop-off, or mail in non-PCB ballasts with a kit." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Ballast Recycling Services", href: href('/ballasts/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
            { label: "Minnesota Recycling & Shredding", href: href('/minnesota-recycling/') },
            { label: "Blaine Recycling Center", href: href('/minnesota-recycling/ramsey/blaine/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Clear Out Your Old Ballasts in Blaine",
    body: ["Bring them to our Davenport St dock any weekday, or have our team pick them up from your building or job site. Let us know what you've pulled out, and we'll take care of the rest."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "Davenport St address: the doc asked to confirm the Google Maps link, built the same way as the 99th Ln NE one", "FAQ on fixtures: the doc asks to confirm fixture acceptance at Blaine (answer kept, note left out)", "Sustainability link: the doc said confirm URL, linked to /sustainability/"],
}
