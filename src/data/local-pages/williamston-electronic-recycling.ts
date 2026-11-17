import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Williamston, SC — /south-carolina/williamston/electronic-recycling/
 * The content team's Google Doc "Electronic Recycling in Williamston, SC |
 * Recycle Technologies" (13aTGEFRnIzhZZ4FZKgKHNCwD8vAmTiqkzSrH40jZd60), 16 Nov
 * 2026. Aaqib: "these are not ad pages, it's my services pages for new
 * location as we previous done for other SEO pages location" — so this SEO
 * page replaces the Google Ads page that sat at this URL since 11 Nov
 * (indexed, in the locations sitemap). Laid out in the 4 Nov 2026 design
 * (`design: 2`) like the Kennesaw and Fort Worth pages; inline [label](link)
 * text is drawn as links, phone numbers and emails as tel: and mailto: links.
 */
const FACILITY = href('/south-carolina/williamston/')
const MAPS = 'https://www.google.com/maps/dir/?api=1&destination=109+Twenty+Nine+Ct%2C+Williamston%2C+SC+29697'

export const WILLIAMSTON_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/south-carolina/williamston/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Williamston, SC | Recycle Technologies",
    description: "Electronics recycling in Williamston, SC for computers, servers, monitors, TVs, copiers and phones. Business pickup across Upstate SC. Get a quote.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Williamston, SC", "Anderson County, SC", "Upstate South Carolina"] },
  hero: {
    crumb: "Electronics Recycling in Williamston, SC",
    h1: "Electronics Recycling in Williamston, SC",
    body: ["Business e-waste recycling for Williamston, Anderson County and the Upstate, with scheduled pickup from your site and recurring service for businesses that regularly retire equipment."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `South Carolina restricts the landfill disposal of certain covered electronics, including specified computers, monitors, printers and televisions. Recycle Technologies helps businesses manage retired electronics through our [Williamston location](${FACILITY}) at 109 Twenty Nine Ct. We accept desktops, laptops, servers, networking gear, CRT and flat-panel monitors, TVs, printers, copiers, scanners, fax machines, phones, cables, chargers and other accepted electronics. Our team coordinates pickups from offices, plants, schools and clinics in the surrounding area, including Greenville, Anderson and Spartanburg. Equipment is dismantled so plastics, wire, metals, glass and circuit boards can be recovered, and every completed recycling job is documented with a Certificate of Recycling. Recycling is handled through Recycle Technologies-certified recycling facilities.`,
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
            { label: "Address", value: `[109 Twenty Nine Ct, Williamston, SC 29697](${MAPS})` },
            { label: "Phone", value: "(864) 774-8310" },
            { label: "Email", value: "support@lightingresourcesinc.com" },
            { label: "Hours", value: "9:00 AM to 4:00 PM" },
            { label: "Pickup area", value: "Offices, plants and campuses around Williamston, from Anderson and Greenville to Spartanburg and the Lake Hartwell area." },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "truck", title: "E-waste pickup", body: "One-time collection for an office move, IT refresh or equipment cleanout." },
            { icon: "repeat", title: "Recurring service", body: "Scheduled pickups for sites that regularly retire computers, monitors and other electronics." },
            { icon: "layers", title: "Mixed loads", body: "Batteries, lamps and ballasts can be included alongside electronics in one pickup when properly separated." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Recycle in Williamston",
      grey: false,
      mint: true,
      blocks: [
        { kind: "text", body: ["Whether it's one department’s retired workstations or a full building cleanout, we collect:"] },
        {
          kind: "grid",
          items: [
            { icon: "laptop", title: "Computers", body: "Desktop towers, laptops and all-in-ones." },
            { icon: "server", title: "Servers and networking", body: "Rack servers, switches, routers and related cabling." },
            { icon: "monitor", title: "Displays", body: "CRT monitors, LCD and LED monitors, and flat-panel or tube TVs." },
            { icon: "printer", title: "Office machines", body: "Copiers, printers, scanners and fax machines." },
            { icon: "smartphone", title: "Mobile devices", body: "Cell phones and tablets." },
            { icon: "cable", title: "Accessories", body: "Keyboards, mice, cords, chargers, remotes and power supplies." },
            { icon: "plug", title: "Small electronics", body: "Microwaves and other accepted electronic equipment." },
            { icon: "drive", title: "Storage devices", body: "Hard drives and SSDs included with accepted electronics loads." },
          ],
        },
        { kind: "note", body: ["Anything with a circuit board that isn't listed is reviewed on a case-by-case basis. Describe it on the quote form and our team will confirm acceptance."] },
      ],
    },
    {
      figma: "doc-3",
      grey: false,
      blocks: [
        {
          kind: "topics",
          items: [
            {
              title: "Computers and Servers From IT Refreshes",
              body: [
                "Upstate IT teams regularly replace laptops, desktops and servers. Instead of letting old units pile up in a storage room, schedule one pickup for the entire batch.",
                "Before collection, back up any information you need and sanitize or remove storage devices according to your organization’s data protection and retention policies.",
              ],
            },
            {
              title: "Monitors, CRTs and TVs",
              body: [
                "Older CRT monitors and tube TVs contain leaded glass, so they require appropriate recycling rather than ordinary disposal. Certain CRT materials destined for recycling are subject to specific federal storage, labeling and processing requirements.",
                "Through Recycle Technologies’ recycling process, monitor glass goes through a lead-decontamination step before recycling. Flat panels, conference room displays and lobby TVs can join the same pickup.",
              ],
            },
            {
              title: "Copiers, Printers and Office Machines",
              body: ["Many multifunction copiers and printers save scanned documents and other information to internal drives. Before collection, check the manufacturer's instructions or consult your IT department about clearing stored information."],
            },
            {
              title: "Phones and Tablets",
              body: ["Retired company phones and tablets are accepted for recycling. Because they often contain business email, contacts and saved logins, back up important information, remove accounts and reset devices according to your company's data handling policy before pickup."],
            },
          ],
        },
        { kind: "text", body: [`See everything our Upstate team collects on the [Williamston recycling page](${FACILITY}).`] },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Electronics Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            { title: "Take inventory", body: "Note device types and approximate quantities, and identify any CRTs or cracked screens." },
            { title: "Get a quote", body: "Share your site address, equipment list and whether you need a one-time or recurring collection." },
            { title: "Confirm the pickup", body: "Our team sends pricing and books a collection window that fits your schedule." },
            { title: "Collection and recycling", body: "Equipment is collected at your site and dismantled. Plastics, wires, metals, glass and circuit boards are separated for appropriate recycling." },
            { title: "Receive your records", body: "Get a Certificate of Recycling documenting the completed load." },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Recycling Options in Williamston",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Upstate E-Waste Pickup From Williamston",
          body: [
            "Our Twenty Nine Court location in Anderson County serves businesses across Anderson, Greenville, Spartanburg, Pickens and Oconee counties.",
            "Companies in Williamston, Pelzer, Piedmont, Powdersville, Easley, Greer, Mauldin, Simpsonville, Spartanburg, Seneca and Clemson can request electronics recycling without transporting their equipment across the region.",
            "Looking for **commercial electronics recycling in Williamston**, **business e-waste pickup in Anderson County**, or **electronics recycling near Greenville and Spartanburg**? Our team can coordinate collection based on your location, equipment and quantity.",
            `The same pickup can include [batteries](${href('/south-carolina/williamston/battery-recycling/')}), [fluorescent lamps](${href('/south-carolina/williamston/light-bulb-recycling/')}) and [ballasts](${href('/south-carolina/williamston/ballast-recycling/')}).`,
            `See all four services on our [Williamston recycling page](${FACILITY}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business E-Waste Pickup and Recurring Service",
          dark: true,
          body: [
            "Businesses we commonly collect from include:",
            "**Manufacturers and auto suppliers along I-85:** Plant-floor PCs, handheld scanners, label printers and control room monitors.",
            "**Hospitals and clinics:** Workstations, monitors and printers from clinics and departments.",
            "**School districts, colleges and universities:** Laptop, Chromebook and computer lab refreshes.",
            "**Banks, law firms and accounting offices:** Desktops, copiers and phones from branch upgrades.",
            "**Warehouses, property managers and corporate offices:** Equipment from moves, closures and tenant turnovers.",
          ],
          listIntro: "To get an accurate quote, tell us:",
          list: [
            "**Where:** Pickup address and ZIP.",
            "**What:** Computers, servers, monitors, TVs, copiers, phones or a mix.",
            "**How much:** Unit counts, boxes or pallets.",
            "**Access:** Dock, elevator or stairs at the pickup site.",
            "**Screens:** Any CRTs or cracked displays in the load.",
            "**How often:** A single cleanout or a recurring schedule.",
          ],
          buttons: {
            primary: { label: "Get a Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "E-Waste Rules for South Carolina Businesses",
      grey: false,
      blocks: [
        { kind: "h3", text: "South Carolina Rules" },
        {
          kind: "callout",
          body: [
            "**Landfill restrictions:** South Carolina restricts the disposal of specified covered electronics in solid waste landfills. Covered computer devices include desktop, laptop and tablet computers, computer monitors and consumer-use printers. Certain consumer television devices are also covered. This restriction does not mean every type of office electronic equipment falls under the same law. See [SCDES electronics recycling guidance](https://www.des.sc.gov/community/recycling-waste-reduction/electronics-recycling/electronics-recycling-haulers-and-landfills).",
            "**Business and data protection:** South Carolina Code §39-1-90 concerns security breach notifications. It is not a general requirement to wipe or physically destroy every retired business device. Organizations should follow the applicable privacy, security and data-disposal requirements for the information stored on their equipment.",
            "**County programs:** County recycling centers are generally designed for households. Greenville County, for example, restricts its e-waste service to residential generation ([Greenville County](https://greenvillecounty.org/SolidWaste/WhatCanIRecycle.aspx)), so businesses should confirm commercial acceptance or use a commercial recycling provider.",
          ],
        },
        { kind: "h3", text: "Federal Rules That May Apply" },
        {
          kind: "callout",
          body: [
            "**CRT glass:** Certain used CRTs and processed CRT glass destined for recycling may qualify for conditional exclusions under 40 CFR 261.39. These exclusions have specific storage, labeling, transportation and processing requirements. See the [EPA's CRT recycling guidance](https://www.epa.gov/hw/frequent-questions-about-regulation-used-cathode-ray-tubes-crts-and-crt-glass).",
            "**HIPAA:** Covered healthcare organizations must implement appropriate safeguards and procedures for the final disposition of electronic protected health information (ePHI) and the devices or media storing it. See [HHS guidance on HIPAA and electronic media disposal](https://www.hhs.gov/hipaa/for-professionals/faq/what-does-hipaa-require-of-covered-entities-when-they-dispose-information/index.html).",
            "**FACTA Disposal Rule:** Businesses that maintain consumer information derived from consumer reports must take reasonable measures to prevent unauthorized access when disposing of that information. See the [FTC Disposal Rule](https://www.ftc.gov/legal-library/browse/rules/disposal-consumer-report-information-records).",
            "**GLBA:** Financial institutions should follow applicable safeguards to protect customer information throughout its lifecycle, including when retiring equipment that stores sensitive data.",
          ],
        },
        {
          kind: "text",
          body: [
            "Businesses remain responsible for following the requirements that apply to their information and equipment. Before collection, review your organization's data retention and media sanitization policies, and consult your compliance team when necessary.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Upstate Businesses Use Recycle Technologies for Electronics",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            { icon: "shield", title: "Certified facilities", body: "Electronics recycling is handled through Recycle Technologies-certified recycling facilities." },
            { icon: "monitor", title: "Every common device", body: "Servers, copiers, phones, CRTs and flat panels can be included in an accepted electronics load." },
            { icon: "recycle", title: "Materials recovered, not dumped", body: "Devices are broken down into plastics, wires, glass, metals and circuit boards for appropriate material recovery." },
            { icon: "file", title: "Documentation", body: "A Certificate of Recycling documents every completed load." },
            { icon: "layers", title: "One pickup for four recycling services", body: "Add accepted batteries, lamps and ballasts to your electronics collection." },
            { icon: "truck", title: "Upstate coverage", body: "Pickup is coordinated for eligible business sites around Williamston." },
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
      { q: "What does electronics recycling cost for a Williamston business?", a: "Pricing depends on the equipment mix, volume and location. Call (864) 774-8310 or get a quote." },
      { q: "Should we clear data before pickup?", a: "Yes. Back up important information and sanitize or remove storage devices according to your organization's data protection policies." },
      { q: "Do you take old CRT monitors and tube TVs?", a: "Yes. CRTs are accepted along with flat panels. Mention them on the quote form so we can plan the load." },
      { q: "Can you handle a full office or school cleanout?", a: "Yes. Share the equipment list, project size and timeline, and we'll plan collection around your schedule." },
      { q: "Can we add batteries or lamps to the same pickup?", a: "Yes. Accepted batteries, lamps and ballasts can be included with electronics when properly separated and prepared." },
      { q: "Do you serve businesses in Greenville and Spartanburg?", a: "Yes. Pickup covers eligible sites around Williamston, including both cities. Contact us to confirm your address." },
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
            { label: "Ballast Recycling in Williamston", href: href('/south-carolina/williamston/ballast-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Williamston",
    body: [
      "Retiring computers, clearing out a server room or replacing a copier fleet?",
      "Send us your equipment list and pickup address, and our Williamston team will respond with pricing and an available collection date.",
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  todo: [
    "Reviews: the doc has a [Placeholder]; left out until real reviews are given",
    "The doc's sub-sections under \"Electronics We Recycle\" (IT refreshes, CRTs, copiers, phones) are drawn as four cards under that band",
    "17 Nov 2026, the doc's update: \"Williamston location\" wording, \"Recycling is handled through Recycle Technologies-certified recycling facilities\", Get a Quote buttons, the NIST line removed",
  ],
}
