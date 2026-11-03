import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Secure Paper Shredding in Blaine, Minnesota — /minnesota/blaine/paper-shredding/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Paper Shredding Services in Blaine, Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_PAPER_SHREDDING: LocalPage = {
  url: href('/minnesota/blaine/paper-shredding/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Secure Paper Shredding in Blaine, Minnesota | NAID AAA Certified",
    description: "NAID AAA certified paper shredding in Blaine, MN. Drop off documents at our 99th Lane NE facility or book business pickup and purge shredding across the Twin Cities.",
  },
  schema: { service: "Paper Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Secure Paper Shredding in Blaine, Minnesota",
    h1: "Secure Paper Shredding in Blaine, Minnesota",
    body: [
      "Secure paper shredding for Blaine and the north metro, with document drop-off at our 99th Lane NE facility, witnessed shredding for sensitive files, and business pickup within about 100 miles.",
      `Old tax returns, patient charts, payroll reports, and signed leases can't go in a recycling cart, and a desk shredder won't keep up with a file room. Recycle Technologies shreds confidential paper at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}), where documents arrive in secure vehicles and are destroyed at our own facility, not on a truck parked outside. Households can drop off boxes on weekdays, and businesses can schedule a one-time purge or ongoing pickup. You can watch sensitive files being shredded, the shredded paper is recycled, and you receive a Certificate of Destruction. Our shredding is NAID AAA certified, and our operations follow R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Paper Shredding Facility",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            { label: "Arrival", value: "Take I-35W to 99th Ave NE, then 99th Lane NE. Drive around to the rear loading area and the north-end dock, where our team will take your boxes and log them in. Parking is free. Call ahead to set up witnessed shredding." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Residential drop-off:** weekdays for household documents", "**Business pickup:** secure collection within roughly 100 miles of Blaine"],
            ["**Purge or ongoing service:** a single cleanout or a regular schedule", "**Witnessed shredding:** for sensitive documents"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Documents We Shred in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["A shoebox of old bank statements from a Lino Lakes home or a storage room of closed files from a Coon Rapids clinic, we shred:"] },
        { kind: "bullets", rows: [
            ["Confidential business documents with customer, employee or company information", "Financial records, invoices and payroll reports"],
            ["Medical, legal and HR files", "Leases, applications and signed contracts"],
            ["General office paperwork that's past its retention date", "Personal papers such as tax returns and old statements"],
        ] },
        { kind: "h3", text: "Getting Your Documents Ready" },
        { kind: "text", body: ["Please remove staples before bringing documents in or staging them for pickup. Sturdy, closed boxes make the handoff quicker and keep loose pages together. If you have a mix of routine paperwork and highly sensitive files, label those boxes so we know which ones you'd like to see shredded."] },
        { kind: "h3", text: "Witnessed Shredding for Sensitive Files" },
        { kind: "text", body: ["Some records call for more than a receipt. For sensitive documents, you can watch them being shredded at our Blaine facility. Mention it when you book, and we'll schedule a time for you to be there."] },
        { kind: "h3", text: "Certificate of Destruction and Standards" },
        { kind: "text", body: ["After your documents are destroyed, you receive a Certificate of Destruction to keep with your records. Our shredding is NAID AAA certified, and our operations follow R2v3 and RIOS standards, which are independently audited. The standards shown across our services include HIPAA, GLBA, FACTA and FCRA, giving offices that handle regulated records a documented trail. Your own compliance obligations stay with your organization.", `See our main [paper shredding page](${href('/paper-shredding-services/')}) for more on how documents are handled.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Off-Site Shredding Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Request a quote", body: ["Tell us roughly how many boxes you have and whether this is a single purge or an ongoing need."] },
              { n: 2, title: "Drop off or schedule pickup", body: ["Bring boxes to Blaine, or our team collects them from your office."] },
              { n: 3, title: "Secure transport", body: ["Documents travel to our facility in secure vehicles."] },
            ],
            [
              { n: 4, title: "Shredding at our facility", body: ["Paper is destroyed at our plant, with you watching if you've arranged witnessed shredding."] },
              { n: 5, title: "Recycling and certificate", body: ["The shredded paper is recycled, and your Certificate of Destruction is issued."] },
            ],
        ] },
        { kind: "text", body: [`More on our [off-site shredding](${href('/off-site-shredding/')}) service.`] },
        { kind: "h3", text: "One-Time Purge or Ongoing Service?" },
        { kind: "text", body: ["A **purge** suits a one-off cleanout: end-of-year tax files, an office move, a retiring partner's records or a basement full of archived boxes. **Ongoing service** fits offices that generate confidential paper every week, such as clinics, property management firms and accounting practices. Both options use the same secure transport, facility shredding and certificate."] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Paper Shredding Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Looking for paper shredding near you in Blaine, Ham Lake or Spring Lake Park? Bring your boxes to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. City shred programs nearby often cap you at a box or a few per visit, while our drop-off is set up for larger household cleanouts too. Call 763-559-5130 if you'd like to witness the shredding.", `Old hard drives can be destroyed on the same visit through our [hard drive destruction](${href('/minnesota/blaine/hard-drive-destruction/')}) service, and phones through [phone shredding](${href('/phone-shredding-service/')}). Retired computers can go to [electronics recycling](${href('/electronic-recycle/')}).`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Business Pickup" },
        { kind: "text", body: ["Pickup is a business service. We collect documents within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Lino Lakes, Fridley, Mounds View, Roseville, Brooklyn Park, Maple Grove, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Pickup address:** street, city, and ZIP, plus building or dock access", "**Volume:** an estimated number of boxes, or the size of the file room"],
            ["**Service type:** a one-time purge or ongoing pickups", "**Sensitive files:** whether any boxes need witnessed shredding"],
            ["**Other media:** hard drives or phones going out at the same time", "**Timing:** any deadline, such as an office move or lease end"],
        ] },
        { kind: "buttons", primary: { label: "Request a Shredding Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
      ],
    },
    {
      figma: "doc-5",
      heading: "Who Uses Our Shredding Service",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**Hospitals and clinics:** patient charts, intake forms and billing records", "**Schools and districts:** student files, testing records and staff paperwork"],
            ["**Property managers:** rental applications, leases and tenant payment records", "**Accounting, tax and law offices:** seasonal purges of client files"],
            ["**Banks, credit unions and financial offices:** statements and account documents", "**Government agencies:** public records past their retention schedule"],
            ["**Contractors:** bids, payroll and subcontractor paperwork", "**Warehouses and distribution centers:** shipping logs and HR files"],
            ["**Households:** tax years past, estate paperwork and old statements"],
        ] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Minnesota Counties We Serve",
      grey: true,
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
      figma: "doc-7",
      heading: "Why Recycle Technologies for Paper Shredding in Blaine",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**A north metro facility:** shredding happens in Blaine, close to Anoka County homes and offices", "**NAID AAA certified:** backed by R2v3 and RIOS operating standards"],
            ["**Witnessed shredding:** available for sensitive documents", "**Secure from pickup to shredder:** documents ride in secure vehicles to our facility"],
            ["**Certificate of Destruction:** proof for audits and record-keeping", "**Recycled, not landfilled:** shredded paper goes back into the recycling stream"],
            ["**One vendor for every format:** paper, hard drives and phones handled together", "**Since 1993:** more than three decades serving Minnesota and Wisconsin"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "How much does paper shredding cost in Blaine?", a: "Pricing depends on volume and service type. Call 763-559-5130 or request a quote." },
      { q: "Do you bring a shredding truck to our office?", a: "No. We collect your documents and shred them at our Blaine facility." },
      { q: "Can I put shredded paper in my recycling cart at home?", a: "Many local programs don't accept loose shreds. Bringing whole documents to us avoids the problem." },
      { q: "Can I mail in documents for shredding?", a: "No. Paper shredding is handled by drop-off or business pickup." },
      { q: "Is there a Minnesota email for shredding pickups?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you shred documents in Wisconsin too?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Off-Site Shredding", href: href('/off-site-shredding/') },
            { label: "Document Shredding in Minnesota", href: href('/minnesota/blaine/shredding/') },
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Secure Paper Shredding in Blaine, MN",
    body: ["Bring your boxes to 1525 99th Ln NE any weekday, set up a time to watch sensitive files shredded, or send us your address and box count for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Shredding Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied"],
}
