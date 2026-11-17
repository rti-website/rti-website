import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Williamston, SC — /south-carolina/williamston/battery-recycling/
 * The content team's Google Doc "Battery Recycling in Williamston, SC"
 * (1ewX2kY1rYIQk_fc61SOuAKs0_UIpe-c8muerlmQ2EfU), 16 Nov 2026. The SEO page
 * that replaces the Google Ads page at this URL (Aaqib: "these are not ad
 * pages, it's my services pages for new location"). The 4 Nov 2026 design
 * (`design: 2`), as the Kennesaw and Fort Worth pages. The doc's "Where Your
 * Batteries Are Hiding" table is drawn as one card per row.
 */
const FACILITY = href('/south-carolina/williamston/')

export const WILLIAMSTON_BATTERY_RECYCLING: LocalPage = {
  url: href('/south-carolina/williamston/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Williamston, SC | Recycle Technologies",
    description: "Battery recycling in Williamston, SC for lithium-ion, lead-acid, alkaline, NiCd, EV and backup batteries. Business pickup across Upstate SC. Get a quote.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Williamston, SC", "Anderson County, SC", "Upstate South Carolina"] },
  hero: {
    crumb: "Battery Recycling in Williamston, SC",
    h1: "Battery Recycling in Williamston, SC",
    body: ["Commercial battery recycling for Williamston, Anderson County and the Upstate, with one-time and recurring pickup from your site and prepaid kits for eligible small batches."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Used batteries collect in server rooms, tool cribs and supply closets, and they can catch fire or leak if stored or handled incorrectly. Recycle Technologies provides battery recycling for Upstate businesses through our [Williamston location](${FACILITY}) at 109 Twenty Nine Ct. We accept alkaline and zinc batteries, rechargeable lithium-ion packs, sealed lead-acid batteries, NiCd and button cell batteries, electric vehicle and Tesla batteries, power tool packs and battery backup units. Commercial pickup is available for businesses in the Upstate; contact our team to confirm availability for your location. Batteries are sorted and separated by type, and a Certificate of Recycling and Safe Disposal documents each completed job. Recycling is handled through Recycle Technologies-certified recycling facilities.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Williamston Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Williamston Location](${FACILITY}) (Anderson County)`,
          rows: [
            { label: "Address", value: "109 Twenty Nine Ct, Williamston, SC 29697" },
            { label: "Phone", value: "(864) 774-8310" },
            { label: "Email", value: "support@lightingresourcesinc.com" },
            { label: "Hours", value: "9:00 AM to 4:00 PM" },
            { label: "Pickup area", value: "Commercial pickup is available across parts of Upstate South Carolina, including the Anderson, Greenville and Spartanburg areas. Contact us to confirm availability for your site." },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "truck", title: "Battery pickup", body: "One-time collection for a cleanout, equipment replacement or backlog of stored batteries." },
            { icon: "repeat", title: "Recurring collection", body: "Scheduled pickups for businesses that generate used batteries throughout the year." },
            { icon: "layers", title: "Mixed battery types", body: "Different battery types can be included in the same pickup when properly separated and packaged." },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for eligible batteries in smaller quantities." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Recycle in Williamston",
      grey: false,
      mint: true,
      blocks: [
        { kind: "text", body: ["From a box of spent AA batteries to larger backup units, our Williamston team accepts:"] },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries", body: "Standard alkaline and zinc batteries." },
            { icon: "battery", title: "Lithium-ion and lead-acid batteries", body: "Rechargeable lithium-ion packs and sealed lead-acid batteries." },
            { icon: "battery", title: "Nickel-cadmium and button cell batteries", body: "NiCd batteries and small button-cell batteries." },
            { icon: "car", title: "EV, power tool and backup batteries", body: "Electric vehicle batteries, Tesla batteries, power tool packs and battery backup units." },
          ],
        },
        { kind: "note", body: ["Mercury oxide batteries are handled on a case-by-case basis. For any type not listed, contact our team before scheduling."] },
      ],
    },
    {
      figma: "doc-3",
      heading: "Where Your Batteries Are Hiding",
      grey: false,
      blocks: [
        { kind: "text", body: ["Most businesses have more used batteries than they realize. A quick walk through the building can turn up:"] },
        {
          kind: "topics",
          items: [
            { title: "Server room or IT closet", body: ["**What you'll usually find:** UPS and battery backup units", "**Battery type:** Sealed lead-acid and other rechargeable batteries"] },
            { title: "Exit signs and emergency lights", body: ["**What you'll usually find:** Small rechargeable battery packs", "**Battery type:** Sealed lead-acid or NiCd"] },
            { title: "Tool crib or maintenance shop", body: ["**What you'll usually find:** Cordless drill and tool batteries", "**Battery type:** Lithium-ion power tool packs"] },
            { title: "Offices and supply rooms", body: ["**What you'll usually find:** AA, AAA, C, D and 9V cells", "**Battery type:** Alkaline and zinc"] },
            { title: "Laptops, radios and handheld scanners", body: ["**What you'll usually find:** Rechargeable battery packs", "**Battery type:** Lithium-ion"] },
            { title: "Key fobs, calculators and small devices", body: ["**What you'll usually find:** Coin-sized cells", "**Battery type:** Button cell"] },
            { title: "Fleet and vehicle programs", body: ["**What you'll usually find:** Vehicle and traction battery packs", "**Battery type:** Lead-acid and electric vehicle batteries"] },
          ],
        },
        { kind: "text", body: ["List what you find on the quote form, and our team can help plan the collection."] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Prepare Batteries Before Pickup",
      grey: false,
      blocks: [
        {
          kind: "callout",
          body: [
            "**Cover exposed terminals:** This helps reduce the risk of short circuits during storage or shipping. Follow the preparation instructions for your battery type and recycling service.",
            "**Keep battery types separated:** Store lithium-ion, lead-acid, alkaline and NiCd batteries separately where practical. Sort batteries before using the mail-in program.",
            "**Damaged, swollen or leaking batteries:** Do not place them with routine battery collections or in a standard mail-in kit. Contact our team for handling instructions before moving or shipping them. If a battery is hot, smoking or actively venting, stay away and contact emergency services.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            { title: "Identify your batteries", body: "Note the battery types and an approximate count or weight." },
            { title: "Get a quote", body: "Share your site address, battery types and whether any units are damaged." },
            { title: "Prepare the load", body: "Cover exposed terminals where appropriate and keep battery types separated." },
            { title: "Collection and sorting", body: "Batteries are collected from your site and sorted by type by trained staff." },
            { title: "Documentation", body: "Once the job is completed, you receive a Certificate of Recycling and Safe Disposal." },
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Battery Recycling Options in Williamston",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Upstate Battery Pickup From Williamston",
          body: [
            "Our Twenty Nine Ct location is in Anderson County, between Anderson and Greenville and close to I-85. Businesses in Williamston, Pelzer, Piedmont, Belton, Powdersville, Easley, Greer, Mauldin, Simpsonville, Spartanburg and Clemson can contact us to arrange battery collection from their sites.",
            `Looking for battery recycling near you in the Upstate? The same project may also involve electronics, fluorescent lamps and ballasts. Arrange the relevant services together through our [Williamston recycling location](${FACILITY}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Battery Pickup and Recurring Collection",
          dark: true,
          body: [
            "Battery pickup is available for commercial clients such as:",
            "**Manufacturers and warehouses:** Tool packs, scanner batteries and backup units.",
            "**Data centers and IT teams:** UPS and battery backup replacements.",
            "**Hospitals, clinics and schools:** Emergency lighting, devices and everyday batteries.",
            "**Auto dealers, repair shops and fleets:** Electric vehicle and sealed lead-acid batteries.",
            "**Offices and property managers:** Exit sign packs and supply-room batteries across multiple buildings.",
          ],
          listIntro: "For an accurate quote, include:",
          list: [
            "**Pickup site:** Address and ZIP code.",
            "**Battery types:** Lithium-ion, lead-acid, alkaline, NiCd, EV or mixed.",
            "**Amount:** Approximate weight, containers or pallets.",
            "**Condition:** Whether any batteries are damaged, swollen or leaking.",
            "**Large units:** EV packs or heavy backup batteries that may need special loading arrangements.",
            "**Schedule:** One-time cleanout or recurring collection.",
          ],
          buttons: {
            primary: { label: "Get a Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Battery Recycling",
          body: [
            "A business with a small quantity of eligible batteries may be able to use a prepaid battery recycling kit. Sort batteries by type, cover exposed terminals and follow the kit's packaging and shipping instructions.",
            `Not every battery type or size can be mailed through the same service. Check the [Mail-In Recycling Program](${href('/mail-in-recycling/')}) before ordering. EV packs and large backup batteries require separate arrangements; contact our team before shipping them.`,
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Battery Rules for South Carolina Businesses",
      grey: false,
      blocks: [
        {
          kind: "callout",
          body: [
            "**Lead-acid batteries:** South Carolina law restricts the disposal of used lead-acid batteries in mixed municipal solid waste. They must be delivered through the collection, recycling or recovery channels specified under [S.C. Code §44-96-180](https://www.scstatehouse.gov/code/t44c096). The law also prohibits placing small sealed lead-acid batteries in landfills or incinerating them.",
            "**Universal waste:** Certain qualifying hazardous-waste batteries may be managed under South Carolina's Universal Waste Rule, R.61-79.273. The rule does not automatically apply to every discarded battery; applicability depends on the battery and its hazardous-waste status. See the [South Carolina Universal Waste Rule](https://des.sc.gov/sites/des/files/Library/Regulations/R.61-79.273.pdf).",
            "**Lithium-ion fire risk:** South Carolina's [Take Charge: Be Battery Smart campaign](https://des.sc.gov/community/recycling-waste-reduction/be-battery-smart) warns that damaged or improperly discarded lithium-ion batteries can cause fires in waste collection trucks and recycling facilities. In March 2025, the North Charleston Fire Department reported at least 13 lithium-ion battery fires over a six-to-eight-month period, as documented in an [EPA case study](https://www.epa.gov/electronics-batteries-management/battery-collection-action-case-study-south-carolinas-engaged).",
          ],
        },
        { kind: "text", body: ["Your organization remains responsible for determining and meeting its applicable legal requirements. A Certificate of Recycling and Safe Disposal documents the completed service but does not replace your compliance duties or required records."] },
      ],
    },
    {
      figma: "doc-8",
      heading: "Five Battery Storage Mistakes to Avoid",
      grey: true,
      blocks: [
        {
          kind: "timeline",
          steps: [
            { title: "Missing labels", body: "Where universal waste rules apply, batteries or their containers must be marked with an approved description, such as \"Universal Waste - Batteries,\" \"Waste Batteries\" or \"Used Batteries.\"" },
            { title: "No accumulation date", body: "For qualifying universal waste, keep a record or use a labeling system that shows when accumulation began." },
            { title: "Storing too long", body: "Universal waste is generally limited to one year of accumulation, subject to a specific exception for accumulating quantities needed for proper recovery, treatment or disposal. The handler must be able to demonstrate that purpose." },
            { title: "Exposed terminals", body: "Battery terminals can short against other batteries or metal. Cover exposed terminals as appropriate before storage or shipping." },
            { title: "Mixing battery types", body: "Keep different chemistries separated where practical and follow the sorting and packaging requirements for your recycling service." },
          ],
        },
        { kind: "text", body: ["A recurring pickup can help manage stored battery quantities, but it does not replace applicable date tracking, labeling or other compliance requirements."] },
      ],
    },
    {
      figma: "doc-9",
      heading: "Retail Drop Boxes vs. Commercial Battery Pickup",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Retail drop boxes and county recycling centers may be suitable for certain household batteries, but accepted types and quantities vary by location. A business managing mixed battery types, UPS units or EV packs should confirm that a collection point accepts those materials before transporting them.",
            "Commercial pickup gives businesses another option: arrange collection from the site, discuss multiple battery types and receive documentation for the completed service.",
          ],
        },
      ],
    },
    {
      figma: "doc-10",
      heading: "Why Upstate Businesses Use Recycle Technologies for Batteries",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            { icon: "shield", title: "Certified facilities", body: "Battery recycling is handled through Recycle Technologies-certified recycling facilities." },
            { icon: "battery", title: "Multiple battery types", body: "Alkaline, lithium-ion, sealed lead-acid, NiCd and button cell batteries." },
            { icon: "car", title: "Larger batteries", body: "EV, Tesla and battery backup units, subject to collection arrangements." },
            { icon: "sort", title: "Sorted by trained staff", body: "Batteries are separated by type after collection." },
            { icon: "file", title: "Documentation", body: "A Certificate of Recycling and Safe Disposal for each completed job." },
            { icon: "truck", title: "Upstate service", body: "Commercial pickup options for businesses across the region. Contact us to confirm availability for your location." },
            { icon: "clock", title: "Since 1993", body: "More than three decades of recycling experience." },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "How much does battery recycling cost for a Williamston business?", a: "It depends on battery type, quantity and pickup location. Call (864) 774-8310 or get a quote." },
      { q: "Can a business throw batteries in the trash in South Carolina?", a: "Used lead-acid batteries are subject to specific state disposal restrictions. Other battery types may have different requirements. Lithium-ion batteries also pose a fire risk when damaged or improperly discarded." },
      { q: "Do batteries need to be taped before pickup?", a: "Covering exposed terminals helps reduce the risk of short circuits. Follow the preparation instructions for your battery type and collection service." },
      { q: "What should we do with a swollen or leaking battery?", a: "Do not place it with routine battery collections or in a standard mail-in kit. Contact our team for handling instructions. If it is hot, smoking or actively venting, stay away and contact emergency services." },
      { q: "Do we have to sort batteries ourselves?", a: "Sorting batteries by type before collection is helpful, especially for mail-in shipments. Our trained staff also sort and separate batteries after collection." },
      { q: "Do you take UPS and EV batteries?", a: "Yes. We accept battery backup units and electric vehicle batteries, including Tesla batteries. Contact us before scheduling to discuss the size and condition of larger units." },
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
            { label: "Commercial Recycling in Williamston", href: FACILITY },
            { label: "Electronics Recycling in Williamston", href: href('/south-carolina/williamston/electronic-recycling/') },
            { label: "Light Bulb Recycling in Williamston", href: href('/south-carolina/williamston/light-bulb-recycling/') },
            { label: "Ballast Recycling in Williamston", href: href('/south-carolina/williamston/ballast-recycling/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Williamston",
    body: ["Walk through your building, note the battery types and approximate quantities, and send us the list with your pickup address. Our Williamston team will review your requirements and respond with pricing and collection arrangements."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  todo: [
    "\"Where Your Batteries Are Hiding\" is a table in the doc (where to look, what you'll find, battery type); drawn as one card per row",
    "\"Five Battery Storage Mistakes to Avoid\" is a numbered list in the doc; drawn as numbered steps",
    "17 Nov 2026, the doc's update: \"Williamston location\" wording, \"Recycling is handled through Recycle Technologies-certified recycling facilities\", Get a Quote buttons",
  ],
}
