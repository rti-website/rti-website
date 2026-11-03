import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Off-Site Shredding in Blaine, Minnesota — /minnesota/blaine/off-site-shredding/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Off-Site Shredding in Blaine, Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_OFF_SITE_SHREDDING: LocalPage = {
  url: href('/minnesota/blaine/off-site-shredding/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Off-Site Shredding in Blaine, MN | Recycle Technologies",
    description: "Securely shred business documents, hard drives, and phones with Recycle Technologies in Blaine, MN. Arrange commercial pickup or request witnessed destruction.",
  },
  schema: { service: "Off-Site Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Off-Site Shredding in Blaine, Minnesota",
    h1: "Off-Site Shredding in Blaine, Minnesota",
    body: [
      "Off-site shredding for Twin Cities businesses and north metro households, with collection from your office, secure transport to our Blaine facility, and destruction of paper, hard drives and phones under one roof.",
      `Off-site shredding means your confidential material leaves your building with our team and is destroyed at our own plant. Recycle Technologies runs that process at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE for every format that holds private information: paper records, hard drives and SSDs, and cell phones along with their SIM cards and memory chips. Businesses can book a one-time purge or recurring pickups, households can drop off on weekdays, and sensitive items can be destroyed while you watch. Each job closes with a certificate, and our operations are NAID AAA certified and follow R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Off-Site Shredding Facility",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            { label: "Arrival", value: "From I-35W, take 99th Ave NE to 99th Lane NE and pull around to the rear loading area. The north-end dock is where we receive boxes, drives and devices, and a team member logs each load. Parking is free. Call ahead if you plan to witness destruction." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Business pickup:** secure collection within roughly 100 miles of Blaine", "**Purge or recurring:** a single cleanout or a regular schedule"],
            ["**Residential drop-off:** weekdays at the north-end dock", "**Witnessed destruction:** for drives, phones, and sensitive documents"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "What We Shred Off-Site in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["One facility, one pickup, every format. Whether it's a file room in Anoka or a bin of retired laptops and phones from a Maple Grove office, we destroy:"] },
        { kind: "bullets", rows: [
            [`**Paper records:** confidential business documents, financial and HR files, contracts and personal papers. Please remove staples first. More on [paper shredding](${href('/paper-shredding-services/')}).`, `**Hard drives and SSDs:** from desktops, laptops, servers and other retired IT equipment, physically destroyed. More on [hard drive destruction](${href('/minnesota/blaine/hard-drive-destruction/')}).`],
            [`**Phones and mobile devices:** cell phones and smartphones, working or broken, plus SIM cards and memory chips, wiped or physically destroyed. More on [phone shredding](${href('/phone-shredding-service/')}).`],
        ] },
        { kind: "h3", text: "From Your Building to Our Shredder" },
        { kind: "cards", rows: [
            [
              { n: 1, title: "Collection", body: ["Our team picks up boxes, drives and devices at your office, or you bring them to our dock."] },
              { n: 2, title: "Secure transport", body: ["Everything travels in secure vehicles straight to our Blaine facility."] },
              { n: 3, title: "Logged on arrival", body: ["Loads are checked in at the north-end dock."] },
            ],
            [
              { n: 4, title: "Destruction", body: ["Paper is shredded, drives are physically destroyed, and phones are wiped or destroyed."] },
              { n: 5, title: "Recycling", body: ["Shredded paper and the remaining material go to recycling, not a landfill."] },
              { n: 6, title: "Certificate", body: ["A Certificate of Destruction is issued so you have proof on file."] },
            ],
        ] },
        { kind: "h3", text: "Off-Site or Mobile Shredding?" },
        { kind: "text", body: ["Mobile shredding brings a truck to your parking lot. Off-site shredding moves the work to a dedicated plant, which suits organizations that would rather hand over boxes, drives and phones in one visit and let a single facility handle all three. If seeing it happen matters, you can still watch."] },
        { kind: "h3", text: "Witnessed Destruction" },
        { kind: "text", body: ["For hard drives, phones, and sensitive documents, you can witness the destruction at our Blaine facility. Ask when you book, and we'll schedule a time for you."] },
        { kind: "h3", text: "Certificate and Standards" },
        { kind: "text", body: ["Every job ends with documentation you can file. Our shredding is NAID AAA certified, our operations follow R2v3 and RIOS standards, and the standards shown across our services include NIST SP 800-88, HIPAA, GLBA, FACTA and FCRA. Your compliance obligations stay with your organization, but you'll have a clear record of what was destroyed and when.", `See our main [off-site shredding page](${href('/off-site-shredding/')}) for more on the service.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "One-Time Purge or Recurring Pickup",
      grey: false,
      blocks: [
        { kind: "text", body: ["**Choose a purge** when the volume is a one-off: closing out old tax years, moving offices, retiring a server room, clearing a former employee's files, or emptying an archive after a retention date passes.", "**Choose recurring pickup** when confidential material keeps piling up: clinics with daily patient paperwork, property managers handling leases, accounting practices in tax season, or IT teams cycling out laptops and phones on a schedule.", "Whichever you pick, the chain stays the same: our vehicles, our Blaine plant, your certificate."] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Off-Site Shredding Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Business Pickup" },
        { kind: "text", body: ["Pickup is reserved for commercial clients and covers sites within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Mounds View, Roseville, Brooklyn Park, Maple Grove, Minnetonka, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Pickup address:** street, city and ZIP, plus building or dock access", "**What's going:** paper, hard drives, phones or a mix"],
            ["**Volume:** boxes of paper, number of drives and devices", "**Service type:** a one-time purge or recurring pickup"],
            ["**Witnessing:** whether you'd like to watch any of it destroyed", "**Deadline:** an office move, lease end or audit date"],
        ] },
        { kind: "buttons", primary: { label: "Request an Off-Site Shredding Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Residential Drop-Off" },
        { kind: "text", body: [`Looking for shredding near you in Blaine, Circle Pines or Spring Lake Park? Households can bring paper, old drives and phones to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. Retired computers and other [electronics](${href('/electronic-recycle/')}) can come along on the same trip.`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Mail-In for Drives and Phones" },
        { kind: "text", body: [`Paper isn't eligible for mail-in, but residential customers outside our area can ship hard drives and phones with a [mail-in recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Who Uses Off-Site Shredding",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**Hospitals and clinics:** patient charts, workstation drives and staff phones in a single pickup", "**Schools and districts:** summer archive cleanouts plus retired staff laptops"],
            ["**Property managers:** lease files, leasing office PCs and maintenance phones", "**Law, tax and accounting firms:** seasonal purges of client files"],
            ["**Banks and credit unions:** statements, teller workstation drives and branch phones", "**Government agencies:** records past retention, along with department devices"],
            ["**Contractors and warehouses:** payroll, shipping logs and handheld devices", "**Offices relocating or closing:** everything that shouldn't make the move"],
            ["**Households:** tax papers, an old family computer, and past phones"],
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
      heading: "Why Choose Recycle Technologies for Off-Site Shredding in Blaine?",
      grey: false,
      blocks: [
        { kind: "h3", text: "One Provider for Paper, Hard Drives and Phones" },
        { kind: "text", body: ["Manage confidential documents and electronic media destruction through one provider. Recycle Technologies offers off-site shredding for paper records, physical destruction of hard drives and SSDs, and wiping or destruction of phones and their storage components, depending on the service provided.", "Instead of coordinating separate vendors for paper records and retired devices, businesses can arrange collection through one service and receive a Certificate of Destruction for their records.", "Whether you're clearing an archive, retiring office equipment, or scheduling recurring collections, contact our Blaine team to discuss your materials and pickup requirements."] },
        { kind: "bullets", rows: [
            ["**Our own Blaine facility:** destruction happens at our plant in the north metro", "**Secure vehicles:** material goes straight from your door to our dock"],
            ["**Witnessing available:** for drives, phones, and sensitive files", "**NAID AAA certified:** with R2v3 and RIOS operating standards"],
            ["**Certificate of Destruction:** documentation for every job", "**Recycled afterward:** shredded paper and destroyed material are recycled"],
            ["**Since 1993:** over 30 years serving Minnesota and Wisconsin"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "What does off-site shredding cost in Blaine?", a: "Pricing depends on volume, media type and schedule. Call 763-559-5130 or request a quote." },
      { q: "Can individuals schedule a pickup?", a: "No. Pickup is for commercial clients. Individuals can use our Blaine drop-off." },
      { q: "Will you send a shredding truck to our office instead?", a: "No. All destruction happens at our Blaine facility, and you're welcome to come watch." },
      { q: "What if we're also retiring an entire server room?", a: "Pair shredding with our IT asset disposition service." },
      { q: "Is there a Minnesota email for scheduling?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you provide off-site shredding in Wisconsin?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Off-Site Shredding", href: href('/off-site-shredding/') },
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Document Shredding in Minnesota", href: href('/minnesota/blaine/shredding/') },
            { label: "IT Asset Disposition", href: href('/it-asset-disposition/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Off-Site Shredding in Blaine, MN",
    body: ["Tell us what you need destroyed (paper, drives, phones, or all three) and where it is, and we'll quote a pickup. Households can drop off at 1525 99th Ln NE any weekday."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Off-Site Shredding in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out (the doc has an empty placeholder)"],
}
