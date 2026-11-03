import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Hard Drive Destruction in Blaine, Minnesota — /minnesota/blaine/hard-drive-destruction/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Hard Drive Destruction in Blaine, Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_HARD_DRIVE_DESTRUCTION: LocalPage = {
  url: href('/minnesota/blaine/hard-drive-destruction/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Hard Drive Destruction in Blaine, Minnesota | Witnessed & Certified",
    description: "Certified hard drive and SSD destruction at our Blaine, MN facility. Watch your drives destroyed, get a certificate, or book secure pickup across the Twin Cities.",
  },
  schema: { service: "Hard Drive Destruction", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Hard Drive Destruction in Blaine, Minnesota",
    h1: "Hard Drive Destruction in Blaine, Minnesota",
    body: [
      "Hard drive destruction for Blaine and the north metro, with drop-off and witnessed destruction at our 99th Lane NE facility, secure pickup for businesses within about 100 miles, and mail-in for remote offices.",
      `Wiping a computer or reformatting a drive leaves data behind that the right software can still pull back out. Recycle Technologies physically destroys hard drives and solid-state drives at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}), so files, patient records, financial data, and client information are gone for good. You can drop drives off, watch them being destroyed, or have our team collect them from your office. Drives stay under security protocols from pickup to destruction, the leftover material is recycled, and every job comes with a certificate. Our operations are NAID AAA certified and follow R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Hard Drive Destruction Facility",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            { label: "Arrival", value: "Reach 99th Ave NE from I-35W, then turn onto 99th Lane NE. Follow the signs to the rear loading area at the north-end dock, where a team member will log your drives. Parking is free. Call ahead if you'd like to watch the destruction." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Drop-off:** for businesses and individuals, weekdays", "**Witnessed destruction:** see your drives destroyed in person"],
            ["**Secure pickup:** for businesses within roughly 100 miles of Blaine", "**Mail-in:** for branch offices and customers outside our pickup area"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Drives and Devices We Destroy in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["Whether it's one old laptop drive from a home office in Ham Lake or a box of server drives from a Minneapolis data closet, we destroy:"] },
        { kind: "bullets", rows: [
            ["Hard disk drives (HDDs) from desktops, laptops, and servers", "Solid-state drives (SSDs)"],
            ["Other data-bearing storage pulled from retired IT equipment"],
        ] },
        { kind: "text", body: [`Cell phones, SIM cards and memory chips go through our separate [phone shredding service](${href('/phone-shredding-service/')}).`] },
        { kind: "h3", text: "Why Deleting Files Isn't Enough" },
        { kind: "text", body: ["Emptying the recycle bin, running a factory reset, or reformatting a drive only hides where files sit. The data itself often stays on the platters or memory chips until something overwrites it. A drive tossed into a general e-waste bin can still hold readable records. Physical destruction removes that risk because there's no working drive left to read."] },
        { kind: "h3", text: "Watch Your Drives Being Destroyed" },
        { kind: "text", body: ["For many offices, seeing is the proof that matters. Customers can witness the destruction of their own drives at our Blaine facility. Let us know when you book, and we'll set a time so you can watch each drive go through from start to finish."] },
        { kind: "h3", text: "Certificates, Certifications and Standards" },
        { kind: "text", body: ["Every job ends with a certificate you can keep with your compliance files. Our shredding operations are NAID AAA certified, our recycling follows R2v3 and RIOS standards, and the standards we work with include NIST SP 800-88, along with the requirements behind HIPAA, GLBA, FACTA and FCRA. Your own compliance obligations still sit with your organization, but our paperwork gives you a clear record of what happened to each batch.", `See our main [hard drive destruction page](${href('/hard-drive-destruction-services/')}) for more on how drives are handled.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Hard Drive Destruction Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Tell us what you have", body: ["A rough drive count, HDD or SSD, and whether the drives are loose or still in devices."] },
              { n: 2, title: "Pick drop-off, pickup, or mail-in", body: ["Bring drives to Blaine, schedule a secure collection, or ship them from a remote office."] },
              { n: 3, title: "Secure handling", body: ["Drives stay under security protocols from the moment they're collected until they're destroyed."] },
            ],
            [
              { n: 4, title: "Physical destruction", body: ["Each drive is destroyed at our facility, with you watching if you've requested it."] },
              { n: 5, title: "Recycling and certificate", body: ["The destroyed material is recycled, and your certificate is issued for the job."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Hard Drive Destruction Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Need hard drive destruction near you in Blaine, Coon Rapids, or Lino Lakes? Bring drives to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. Drop-off works for a single household drive or a box from an office cleanout. Call 763-559-5130 first if you want to witness the destruction.", `The computers, servers and copiers those drives came from can be dropped off on the same trip through our [electronics recycling](${href('/electronic-recycle/')}) service, along with [paper for shredding](${href('/paper-shredding-services/')}).`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Secure Business Pickup" },
        { kind: "text", body: ["Hospitals, clinics, schools, law and accounting offices, property management firms and IT teams often have drives piling up in a locked closet. We collect drives from businesses within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Fridley, Mounds View, Roseville, Brooklyn Park, Maple Grove, Edina, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Site address:** street, city and ZIP, plus building access", "**Drive count:** an estimate, or the number of boxes or bins"],
            ["**Drive types:** HDD, SSD or a mix", "**Loose or installed:** whether drives are still in computers or servers"],
            ["**Witnessing:** whether you'd like to watch the destruction", "**Other equipment:** any computers, servers or phones going out at the same time"],
        ] },
        { kind: "buttons", primary: { label: "Request a Hard Drive Destruction Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In" },
        { kind: "text", body: [`For a branch office or a small batch outside our pickup area, order a [mail-in recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack your drives and ship them in. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Who We Destroy Drives For",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**Hospitals and clinics:** workstations and servers that held patient records", "**Schools and districts:** retired staff laptops and student information systems"],
            ["**Property managers:** leasing office PCs with tenant applications and payment details", "**Law, accounting and financial offices:** client files and account data"],
            ["**Government and public agencies:** department drives that need a documented end", "**Warehouses and logistics:** inventory servers and shipping workstations"],
            ["**IT teams and contractors:** drives pulled during upgrades and office moves", "**Households:** an old family computer or external drive with personal files"],
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
      heading: "Why Recycle Technologies for Hard Drive Destruction in Blaine",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**A north metro facility:** drop off in Blaine instead of driving into Minneapolis or St. Paul", "**Witnessed destruction:** watch your own drives being destroyed"],
            ["**Certified operations:** NAID AAA certified, with R2v3 and RIOS standards", "**A certificate for every job:** documentation ready for audits and records"],
            ["**Secure from start to finish:** drives stay under security protocols from pickup through destruction", "**One vendor for the whole refresh:** destroy the drives and recycle the PCs, servers and phones they came from"],
            ["**Since 1993:** more than three decades of recycling and data destruction in Minnesota and Wisconsin"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "How much does hard drive destruction cost in Blaine?", a: "Pricing depends on the number and type of drives. Call 763-559-5130 or request a quote." },
      { q: "Do you offer on-site shredding at my office?", a: "Destruction happens at our secure facility. We can pick drives up, or you can bring them in and watch." },
      { q: "Can you also shred our paper records?", a: "Yes. See our paper shredding and off-site shredding services." },
      { q: "We're retiring a whole server room. Who should we talk to?", a: "Ask about our IT asset disposition service alongside drive destruction." },
      { q: "Is there a Minnesota email for scheduling?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you have a facility in Wisconsin?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Document Shredding in Minnesota", href: href('/minnesota/blaine/shredding/') },
            { label: "IT Asset Disposition", href: href('/it-asset-disposition/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Hard Drive Destruction in Blaine, MN",
    body: ["Bring drives to 1525 99th Ln NE any weekday, book a time to watch them destroyed, or send us your drive count and address for a secure pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Hard Drive Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied", "\"Drives still inside computers\" left out of the accepted list (the doc marks it [confirm])", "Mail-in kit: the doc asks to confirm the correct kit for hard drives (the electronics kit link is kept)"],
}
