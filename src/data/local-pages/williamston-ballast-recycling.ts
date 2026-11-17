import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Williamston, SC — /south-carolina/williamston/ballast-recycling/
 * The content team's Google Doc "Ballast Recycling in Williamston, SC: Page
 * Copy" (1RT3t9-CStK62Tt5ubD0bSz2-9Fi55g7pXOMN4qW-hS8), completed 17 Nov 2026
 * (on 16 Nov it ended mid-link, so Aaqib held it back). The SEO page that
 * replaces the Google Ads page at this URL, like the other three Williamston
 * services. The 4 Nov 2026 design (`design: 2`), as the Kennesaw and Fort
 * Worth pages.
 */
const FACILITY = href('/south-carolina/williamston/')

export const WILLIAMSTON_BALLAST_RECYCLING: LocalPage = {
  url: href('/south-carolina/williamston/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in Williamston, SC | Recycle Technologies",
    description: "Ballast recycling in Williamston, SC for PCB, non-PCB, magnetic and electronic ballasts. Commercial pickup across Upstate SC. Get a quote.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Williamston, SC", "Anderson County, SC", "Upstate South Carolina"] },
  hero: {
    crumb: "Ballast Recycling in Williamston, SC",
    h1: "Ballast Recycling in Williamston, SC",
    body: ["Commercial ballast recycling for Williamston, Anderson County and the Upstate, with pickup for lighting retrofits and building cleanouts, recurring collection for maintenance teams, and prepaid kits for small non-PCB batches."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Every fluorescent fixture you take down leaves a ballast behind, and older units may contain PCBs. Recycle Technologies provides ballast recycling for Upstate businesses through our [Williamston location](${FACILITY}) at 109 Twenty Nine Ct. We accept PCB ballasts, non-PCB ballasts, electronic ballasts and magnetic ballasts. Commercial pickup is available across the Upstate, including Greenville, Anderson and Spartanburg. Ballasts are sorted and dismantled to recover materials such as copper and steel. PCB-containing components are managed under applicable disposal requirements, including incineration where required. A Certificate of Recycling documents each completed job.`,
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
            { label: "Address", value: "[109 Twenty Nine Ct, Williamston, SC 29697](https://www.google.com/maps/dir/?api=1&destination=109+Twenty+Nine+Ct%2C+Williamston%2C+SC+29697)" },
            { label: "Phone", value: "(864) 774-8310" },
            { label: "Email", value: "support@lightingresourcesinc.com" },
            { label: "Hours", value: "9:00 AM to 4:00 PM" },
            { label: "Pickup area", value: "Commercial job sites across Upstate South Carolina, including Anderson, Greenville and Spartanburg. Contact our team to confirm pickup availability for your location." },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "truck", title: "Retrofit and cleanout pickup", body: "One-time collection when fixtures come down." },
            { icon: "repeat", title: "Recurring collection", body: "Scheduled pickups for maintenance teams that replace ballasts throughout the year." },
            { icon: "tube", title: "Ballasts plus lamps", body: "Tubes from the same lighting project can be collected with your ballasts." },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for small quantities of non-PCB ballasts." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts We Recycle in Williamston",
      grey: false,
      mint: true,
      blocks: [
        { kind: "text", body: ["From a single box in a maintenance shop to drums from a plant-wide lighting upgrade, our Williamston team accepts:"] },
        {
          kind: "grid",
          items: [
            { icon: "alert", title: "PCB ballasts", body: "Older magnetic ballasts that may contain PCB-containing capacitors or PCB-contaminated potting material. These require appropriate handling and disposal." },
            { icon: "checkCircle", title: "Non-PCB ballasts", body: "Magnetic or electronic units that do not contain PCBs." },
            { icon: "cpu", title: "Electronic ballasts", body: "Common in newer fluorescent fixtures and processed for material recovery." },
            { icon: "zap", title: "Magnetic ballasts", body: "Traditional ballasts found in older lighting fixtures. Some older units may contain PCBs." },
          ],
        },
        { kind: "note", body: ["Not sure which type you have? Tell us what you know on the quote form, and our team can help you with the next steps."] },
      ],
    },
    {
      figma: "doc-3",
      heading: "Is It a PCB Ballast? Check the Label",
      grey: false,
      blocks: [
        {
          kind: "callout",
          body: [
            "**Labeled \"No PCBs\":** This marking identifies a non-PCB ballast.",
            "**Manufactured before July 2, 1979:** These ballasts may contain PCBs.",
            "**No label or unknown manufacturing date:** Do not assume the unit is PCB-free. EPA guidance recommends treating an unlabeled ballast as potentially PCB-containing unless it is known to have been manufactured after 1979.",
            "**Never open a ballast to check:** Keep suspected PCB units separate from clearly labeled non-PCB units.",
          ],
        },
        { kind: "text", body: ["See the [EPA's guidance on identifying PCB-containing fluorescent light ballasts](https://www.epa.gov/pcbs/polychlorinated-biphenyl-pcb-containing-fluorescent-light-ballasts-flbs-school-buildings)."] },
        {
          kind: "topics",
          items: [
            {
              title: "PCB and DEHP Capacitors",
              body: [
                "PCBs may be found inside a ballast's small capacitor or in the surrounding potting material, a black, tar-like substance that protects internal components. Some ballasts may also contain DEHP-containing components.",
                "Do not open a ballast or try to inspect its internal materials. Our recycling process separates the relevant components for appropriate downstream handling.",
              ],
            },
            {
              title: "Getting Ballasts Ready for Pickup",
              body: [
                "Keep suspected PCB or unlabeled ballasts separate from units marked \"No PCBs.\" Avoid breaking, cutting or opening any ballast.",
                "**If a ballast is leaking, do not touch, move or clean it up yourself.** Keep people away from the affected area and seek guidance from qualified environmental cleanup professionals. Contact our team about recycling arrangements once the affected material has been addressed.",
              ],
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Ballast Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            { title: "Collection", body: "Ballasts are picked up from your business, building or job site." },
            { title: "Sorting", body: "Units are sorted by category, generally magnetic or electronic, because each type is processed differently." },
            { title: "Dismantling", body: "Ballasts are taken apart to separate metals, plastics and capacitors." },
            { title: "Hazardous components", body: "PCB-containing components are managed under applicable TSCA disposal requirements, including incineration where required. DEHP-containing components are handled through appropriate downstream channels." },
            { title: "Material recovery and records", body: "Copper and steel are reclaimed, and you receive a Certificate of Recycling for the completed job." },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Options in Williamston",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Upstate Ballast Pickup From Williamston",
          body: [
            `Our [Williamston location](${FACILITY}) is in Anderson County, between Anderson and Greenville, near I-85. Contractors and facilities in Williamston, Pelzer, Piedmont, Belton, Powdersville, Easley, Greer, Mauldin, Simpsonville, Spartanburg and Clemson can contact us to arrange commercial ballast collection.`,
            `Searching for ballast recycling near you in the Upstate? Ballasts rarely come out alone. Add the [fluorescent tubes and lamps](${href('/south-carolina/williamston/light-bulb-recycling/')}) from the same fixtures, [batteries](${href('/south-carolina/williamston/battery-recycling/')}) from emergency lighting, and [electronics](${href('/south-carolina/williamston/electronic-recycling/')}) from the same renovation. See all four services on our [Williamston recycling page](${FACILITY}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Ballast Pickup and Recurring Collection",
          dark: true,
          body: [
            "Pickup is available for commercial clients, including:",
            "**Electrical contractors and energy service companies:** LED conversions and lighting retrofits.",
            "**Demolition and renovation crews:** Older buildings with pre-1979 fixtures.",
            "**Manufacturers and warehouses:** Fixture replacements across large floor areas.",
            "**School districts, colleges and hospitals:** Phased lighting upgrades across campuses.",
            "**Property managers and public agencies:** Tenant improvements and municipal buildings.",
          ],
          listIntro: "For an accurate quote, tell us:",
          list: [
            "**Job location:** Site address and ZIP code.",
            "**Ballast types:** PCB, non-PCB, unlabeled or a mix.",
            "**Amount:** Ballast count, boxes, drums or estimated weight.",
            "**Condition:** Whether any ballasts are leaking.",
            "**Lamps:** Whether tubes from the same fixtures need collecting.",
            "**Timing:** One-time project or recurring pickup.",
          ],
          buttons: {
            primary: { label: "Get a Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Ballast Recycling",
          body: [
            `For a handful of non-PCB ballasts, a prepaid ballast recycling kit can be simpler than a pickup. Fill the container, follow the kit's shipping instructions and send it back. Check the [mail-in recycling program](${href('/mail-in-recycling/')}) before ordering. PCB ballasts and larger loads should go by pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Ballast Disposal Rules for South Carolina Businesses",
      grey: false,
      blocks: [
        {
          kind: "callout",
          body: [
            "**PCBs are federally regulated.** Disposal of PCB-containing ballasts falls under the federal Toxic Substances Control Act.",
            "**Handle them carefully.** The EPA advises against breaking ballasts and recommends keeping them separate from other waste and taking them to an appropriate facility.",
            "**Check with the state.** The EPA also recommends confirming local disposal requirements with your state environmental agency, which here is the South Carolina Department of Environmental Services.",
          ],
        },
        { kind: "text", body: ["Your organization remains responsible for its own compliance. A Certificate of Recycling gives you a record of how your ballasts were handled."] },
      ],
    },
    {
      figma: "doc-7",
      heading: "Scrap Yard or Recycler?",
      grey: true,
      blocks: [
        { kind: "text", body: ["Non-PCB ballasts contain copper and steel, so some scrap yards will take them as metal. PCB ballasts are different: their capacitors need regulated handling and incineration, which a scrap sale doesn't provide. If your load includes older or unlabeled units, a recycler that separates and documents the hazardous components is the safer route."] },
      ],
    },
    {
      figma: "doc-8",
      heading: "Why Upstate Businesses Use Recycle Technologies for Ballasts",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            { icon: "shield", title: "Certified facilities", body: "Ballast recycling is handled through Recycle Technologies-certified recycling facilities." },
            { icon: "layers", title: "PCB and non-PCB accepted", body: "One vendor for old magnetic units and newer electronic ones." },
            { icon: "alert", title: "Hazardous parts handled properly", body: "PCB and DEHP capacitors go to an EPA-approved incineration facility through a certified hazardous waste hauler." },
            { icon: "recycle", title: "Metals reclaimed", body: "Copper and steel are recovered instead of landfilled." },
            { icon: "zap", title: "Retrofit-ready", body: "Ballasts and lamps from the same project on one pickup." },
            { icon: "file", title: "Documentation", body: "A Certificate of Recycling after processing." },
            { icon: "clock", title: "Since 1993", body: "More than three decades of commercial recycling experience." },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "How much does ballast recycling cost in Williamston?", a: "It depends on ballast type, quantity and pickup location. Call (864) 774-8310 or get a quote." },
      { q: "Do you recycle PCB ballasts?", a: "Yes. PCB ballasts are accepted, and their capacitors are routed to an EPA-approved incineration facility." },
      { q: "How do I know if a ballast contains PCBs?", a: "Look for a \"No PCBs\" label. If there isn't one, treat the ballast as PCB-containing." },
      { q: "What should we do with a leaking ballast?", a: "Set it apart from the others and contact our team to confirm handling before arranging pickup." },
      { q: "What happens to the non-hazardous parts?", a: "Copper and steel are reclaimed, and plastics and other recoverable materials are processed for reuse." },
      { q: "Can ballasts and fluorescent tubes go on one pickup?", a: "Yes. Lamps from the same fixtures can be collected with your ballasts if packed separately." },
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
            { label: "Light Bulb Recycling in Williamston", href: href('/south-carolina/williamston/light-bulb-recycling/') },
            { label: "Battery Recycling in Williamston", href: href('/south-carolina/williamston/battery-recycling/') },
            { label: "Electronics Recycling in Williamston", href: href('/south-carolina/williamston/electronic-recycling/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Ballast Recycling in Williamston",
    body: ["Pulling fixtures for an LED upgrade or clearing a storeroom of old ballasts? Send us your ballast count, types and job location, and our Williamston team will reply with pricing and a pickup date."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  todo: [
    "Reviews: the doc has \"[PLACEHOLDER: real customer reviews only.]\"; left out until real reviews are given",
    "\"Is It a PCB Ballast?\", \"PCB and DEHP Capacitors\" and \"Getting Ballasts Ready for Pickup\" are sub-sections in the doc; drawn as one band (the label checks, then two cards)",
    "The EPA guidance line and the in-text service links keep the links the 16 Nov version of the doc had",
  ],
}
