import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Light Bulb Recycling in Williamston, SC — /south-carolina/williamston/light-bulb-recycling/
 * The content team's Google Doc "Light Bulb Recycling in Williamston, SC:
 * Updated Page Copy" (1ROXyuqoBa0PuLQKYxEPIuKWRRYpTzMwnVQwHEJai58Q), 16 Nov
 * 2026. The SEO page that replaces the Google Ads page at this URL (Aaqib:
 * "these are not ad pages, it's my services pages for new location"). The 4
 * Nov 2026 design (`design: 2`), as the Kennesaw and Fort Worth pages.
 */
const FACILITY = href('/south-carolina/williamston/')

export const WILLIAMSTON_LIGHT_BULB_RECYCLING: LocalPage = {
  url: href('/south-carolina/williamston/light-bulb-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Light Bulb Recycling in Williamston, SC | Recycle Technologies",
    description: "Light bulb recycling in Williamston, SC for fluorescent tubes, CFLs, HID, UV and specialty lamps. Business pickup across Upstate SC. Get a quote.",
  },
  schema: { service: "Light Bulb Recycling", areaServed: ["Williamston, SC", "Anderson County, SC", "Upstate South Carolina"] },
  hero: {
    crumb: "Light Bulb Recycling in Williamston, SC",
    h1: "Light Bulb Recycling in Williamston, SC",
    body: ["Commercial lamp recycling for Williamston, Anderson County and the Upstate, with scheduled pickup for relamps and retrofits, recurring collection for facilities, and prepaid kits for a few boxes."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    "Fluorescent and HID lamps contain small amounts of mercury, so spent tubes from a business need proper handling rather than being placed in regular trash without evaluation. Recycle Technologies provides lamp recycling services for Upstate businesses through our Williamston service location at 109 Twenty Nine Ct. We take fluorescent tubes (including plastic-coated and shielded types), CFLs, green-tipped, circular and U-bend lamps, UV lamps, neon, argon and other cold cathode lamps, metal halide and high-pressure sodium HID lamps, and flood, incandescent and halogen bulbs. Pickup covers offices, plants, schools and contractors within approximately 100 miles of Williamston. Lamps are separated into glass, aluminum end caps and mercury-bearing phosphor, with mercury-bearing material sent to Recycle Technologies’ Greenwood, Indiana facility for further processing. Recycling is handled through our Williamston location, backed by our certified Recycle Technologies facilities.",
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Williamston Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Williamston Location](${FACILITY}) (Anderson County)`,
          rows: [
            { label: "Address", value: "[109 Twenty Nine Ct, Williamston, SC 29697](https://www.google.com/maps/dir/?api=1&destination=109+Twenty+Nine+Ct%2C+Williamston%2C+SC+29697)" },
            { label: "Phone", value: "(864) 774-8310" },
            { label: "Email", value: "support@lightingresourcesinc.com" },
            { label: "Hours", value: "9:00 AM to 4:00 PM" },
            { label: "Pickup area", value: "Commercial sites within approximately 100 miles of Williamston, including Greenville, Anderson, Spartanburg, Easley and Clemson. Contact our team to confirm pickup availability for your ZIP code." },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "truck", title: "Relamp and retrofit pickup", body: "One-time collection when a building switches out its lighting." },
            { icon: "repeat", title: "Recurring collection", body: "Scheduled pickups for facilities that replace lamps throughout the year." },
            { icon: "zap", title: "Lamps plus ballasts", body: "Ballasts from the same fixtures can go on the same pickup." },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for a small number of lamps from a branch or satellite office." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Light Bulbs We Recycle in Williamston",
      grey: false,
      mint: true,
      blocks: [
        { kind: "text", body: ["Whether it's one maintenance closet or the lamps from a full building relamp, our Williamston team collects:"] },
        { kind: "h3", text: "Fluorescent lamps" },
        {
          kind: "grid",
          items: [
            { icon: "tube", title: "Fluorescent tubes" },
            { icon: "tube", title: "Plastic-coated and shielded tubes" },
            { icon: "bulb", title: "Compact fluorescent lamps (CFLs)" },
            { icon: "tube", title: "Green-tipped bulbs" },
            { icon: "bulb", title: "Circular lamps" },
            { icon: "tube", title: "U-bend or U-shaped lamps" },
          ],
        },
        { kind: "h3", text: "Other lighting" },
        {
          kind: "grid",
          items: [
            { icon: "bulb", title: "Ultraviolet (UV) lamps" },
            { icon: "bulb", title: "Neon, argon and other cold cathode lamps" },
            { icon: "bulb", title: "High-intensity discharge (HID) lamps, including metal halide and high-pressure sodium" },
            { icon: "bulb", title: "Flood lamps" },
            { icon: "bulb", title: "Incandescent bulbs" },
            { icon: "bulb", title: "Halogen bulbs" },
          ],
        },
        { kind: "note", body: ["Not sure whether a lamp qualifies? Ask our team before you schedule a pickup or ship a kit."] },
      ],
    },
    {
      figma: "doc-3",
      grey: false,
      blocks: [
        {
          kind: "topics",
          items: [
            { title: "Fluorescent Tubes From Offices, Schools and Plants", body: ["Linear tubes are the bulk of what Upstate facilities replace, from classroom troffers to warehouse strip lights. Plastic-coated and shielded tubes, green-tipped tubes and U-bend lamps all go in the same pickup, so there’s no need to sort them by style before collection."] },
            { title: "HID Lamps From Parking Lots and High Bays", body: ["Metal halide and high-pressure sodium lamps light parking lots, gyms, manufacturing floors and distribution centers along I-85. These lamps also contain mercury, and they're accepted alongside your fluorescent tubes."] },
            { title: "UV, Neon and Specialty Lamps", body: ["UV lamps from water treatment, labs and sanitation equipment, plus neon, argon and other cold cathode signage lamps, are recycled through the same program. Flood, incandescent and halogen bulbs can be added to the load."] },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Packing Lamps for Pickup",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Packing Lamps for Pickup",
          panel: [
            "Keep intact lamps in sturdy, compatible cartons or containers that prevent breakage. Keep containers closed and avoid taping tubes together. If any lamps are broken or damaged, keep them separate from intact lamps and contact our team before arranging pickup. We'll confirm the appropriate containment and collection instructions for your load.",
            "For mail-in shipments, follow the packaging instructions supplied with your recycling kit, as shipping requirements may vary by lamp type and condition.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "How Light Bulb Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            { title: "Count your lamps", body: "Note lamp types and rough quantities, and flag any broken lamps." },
            { title: "Get a quote", body: "Send your site address and lamp list." },
            { title: "Box them up", body: "Pack intact lamps in sturdy cartons and stage them near a dock or entrance. Keep damaged lamps separate and contact our team for instructions." },
            { title: "Collection and separation", body: "Our team collects the boxes, and the lamps are separated into glass, aluminum end caps and mercury-bearing phosphor powder and filters." },
            { title: "Recovery and records", body: "Glass goes on to industrial uses, end caps go to an aluminum salvage partner, and mercury-bearing material goes to Recycle Technologies' Greenwood, Indiana facility for further processing. A Certificate of Recycling closes out the job." },
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Light Bulb Recycling Options in Williamston",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Upstate Lamp Pickup From Williamston",
          body: [
            "Our Twenty Nine Court location in Anderson County sits between Anderson and Greenville, close to I-85. Facilities in Williamston, Pelzer, Piedmont, Belton, Powdersville, Easley, Greer, Mauldin, Simpsonville, Spartanburg and Clemson can arrange lamp collection instead of storing boxes of spent tubes for months.",
            `Looking for fluorescent bulb recycling near you in the Upstate? Lighting projects rarely produce lamps alone. Add ballasts from the same fixtures, batteries from exit signs and emergency lights, and electronics from the same cleanout. See all four services on our [Williamston recycling page](${FACILITY}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Lamp Pickup and Recurring Collection",
          dark: true,
          body: [
            "Lamp pickup is built for:",
            "**Electrical contractors and lighting retrofit crews:** Tubes and HID lamps from LED conversions",
            "**Manufacturers and distribution centers:** High-bay HID and fluorescent fixtures along the I-85 corridor",
            "**School districts, colleges and universities:** Summer relamping across classrooms and dorms",
            "**Hospitals and clinics:** Steady lamp replacement across large campuses",
            "**Property managers and retail centers:** Common areas, parking lots and tenant spaces",
            "**Cities, counties and public agencies:** Municipal buildings, gyms and street-facing lighting",
          ],
          listIntro: "For an accurate quote, include:",
          list: [
            "**Where:** Pickup address and ZIP",
            "**Which lamps:** 4 ft or 8 ft tubes, U-bend, CFLs, HID, UV or a mix",
            "**How many:** Lamp counts, boxes or pallets",
            "**Breakage:** Whether any lamps are broken",
            "**Ballasts:** Whether fixtures and ballasts are coming out too",
            "**Schedule:** One-time relamp or recurring pickup",
          ],
          buttons: {
            primary: { label: "Get a Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Lamp Recycling",
          body: [
            `A branch office with a few spent tubes or CFLs can use a prepaid bulb recycling kit. Choose a box that fits your lamp type, fill it and ship it back following the kit's instructions. Review the [mail-in recycling program](${href('/mail-in-recycling/')}) before ordering; pallets and full relamps are better handled by pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Lamp Recycling Rules for South Carolina Businesses",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "South Carolina's Universal Waste Rule (R.61-79.273) provides an alternative set of management standards for qualifying hazardous waste lamps. Not every discarded bulb automatically falls under these rules; applicability depends on the lamp and its waste classification.",
            "For businesses managing qualifying lamps as universal waste, the requirements include:",
          ],
        },
        {
          kind: "callout",
          body: [
            "**Proper containment:** Keep lamps in structurally sound, compatible containers or packages that prevent breakage. Containers must remain closed and in good condition.",
            "**Labeling:** Mark each lamp or its container with an approved label, such as \"Universal Waste Lamp(s),\" \"Waste Lamp(s),\" or \"Used Lamp(s).\"",
            "**Accumulation limits:** Universal waste generally cannot be accumulated for more than one year. A longer period may be allowed when it is solely to collect quantities needed for proper recovery, treatment or disposal, and the handler can demonstrate that purpose.",
            "**Broken lamps and releases:** Broken or damaged lamps must be contained promptly to prevent mercury or other hazardous constituents from escaping. Applicable cleanup and management requirements still apply.",
            "**Employee training and shipments:** Handlers must follow applicable training, release-response and off-site shipment requirements.",
          ],
        },
        {
          kind: "text",
          body: [
            "Review the [South Carolina Universal Waste Rule, R.61-79.273](https://des.sc.gov/sites/des/files/Library/Regulations/R.61-79.273.pdf) for the complete requirements.",
            "Your organization remains responsible for determining which requirements apply to its waste and following them. A Certificate of Recycling documents the completed recycling service, but it does not replace your organization's regulatory responsibilities or required records.",
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Retail Drop Boxes vs. Commercial Lamp Recycling",
      grey: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Retail take-back is generally designed for households. Home Depot, for example, accepts intact and undamaged CFL bulbs, while some county programs restrict business-generated waste. Charleston County, for instance, does not accept CFLs from businesses.",
            "A facility with cases of 4 ft or 8 ft tubes, HID lamps or UV lamps needs a collection option suited to commercial volumes, with appropriate handling and documentation.",
          ],
        },
      ],
    },
    {
      figma: "doc-9",
      heading: "Why Upstate Businesses Use Recycle Technologies for Lamps",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            { icon: "shield", title: "Certified facilities", body: "Lamp recycling is handled through our Williamston location, backed by our certified Recycle Technologies facilities, with mercury-bearing material sent to our Greenwood, Indiana facility for further processing." },
            { icon: "recycle", title: "Material recovery", body: "Glass, aluminum end caps and phosphor materials are separated for appropriate recovery and processing." },
            { icon: "zap", title: "Retrofit-ready", body: "Lamps and ballasts from the same project leave on one pickup." },
            { icon: "file", title: "Documentation", body: "A Certificate of Recycling is provided for every completed load." },
            { icon: "truck", title: "Upstate coverage", body: "Commercial pickup is available within approximately 100 miles of Williamston, subject to location confirmation." },
            { icon: "clock", title: "Since 1993", body: "Recycle Technologies has provided recycling services for more than three decades." },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "How much does lamp recycling cost for a Williamston business?", a: "Pricing depends on lamp type, quantity and pickup location. Call (864) 774-8310 or get a quote." },
      { q: "Can fluorescent tubes go in a business dumpster in South Carolina?", a: "Don't place spent mercury-containing lamps in regular trash without determining the applicable waste requirements. Qualifying lamps may be managed under universal waste rules." },
      { q: "What should we do with broken fluorescent tubes?", a: "Keep them separate from intact lamps and contact our team for appropriate containment and pickup instructions." },
      { q: "Where does the mercury from our lamps end up?", a: "Mercury-bearing material is sent to Recycle Technologies' Greenwood, Indiana facility for further processing." },
      { q: "Can ballasts go on the same pickup as our lamps?", a: "Yes. Ballasts from the same fixtures can be collected with your lamps if packed separately." },
      { q: "Do you collect lamps from sites in Greenville and Spartanburg?", a: "Yes. Commercial pickup is available within approximately 100 miles of Williamston. Contact us to confirm your location." },
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
            { label: "Ballast Recycling in Williamston", href: href('/south-carolina/williamston/ballast-recycling/') },
            { label: "Battery Recycling in Williamston", href: href('/south-carolina/williamston/battery-recycling/') },
            { label: "Electronics Recycling in Williamston", href: href('/south-carolina/williamston/electronic-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Light Bulb Recycling in Williamston",
    body: ["Tired of stacking boxes of spent tubes in a storeroom? Send us your lamp count and pickup address, and our Williamston team will reply with pricing and a collection date."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  todo: [
    "Reviews: the doc has \"[PLACEHOLDER: real customer reviews only.]\"; left out until real reviews are given",
    "A stray \"Regulati+2\" line after the rules section in the doc (a pasted citation chip) is left out",
    "The doc's links carried ?utm_source=chatgpt.com; the site links are clean",
    "17 Nov 2026, the doc's update: Williamston Location heading, \"backed by our certified Recycle Technologies facilities\", the Mercury recovery card removed, three Related links, a shorter closing line",
  ],
}
