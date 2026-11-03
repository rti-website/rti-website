import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Secure Paper Shredding in Blaine, Minnesota — /minnesota/blaine/paper-shredding/
 * Management sheet "all plan rti 1", Minnesota tab; copy from the content
 * team's Google Doc "Paper Shredding Services in Blaine, Minnesota", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const BLAINE_PAPER_SHREDDING: LocalPage = {
  url: href('/minnesota/blaine/paper-shredding/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Secure Paper Shredding in Blaine, Minnesota | NAID AAA Certified",
    description: "NAID AAA certified paper shredding in Blaine, MN. Drop off documents at our 99th Lane NE facility or book business pickup and purge shredding across the Twin Cities.",
  },
  schema: { service: "Paper Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Secure Paper Shredding in Blaine, Minnesota",
    h1: "Secure Paper Shredding in Blaine, Minnesota",
    body: ["Secure paper shredding for Blaine and the north metro, with document drop-off at our 99th Lane NE facility, witnessed shredding for sensitive files, and business pickup within about 100 miles."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Old tax returns, patient charts, payroll reports, and signed leases can't go in a recycling cart, and a desk shredder won't keep up with a file room. Recycle Technologies shreds confidential paper at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}), where documents arrive in secure vehicles and are destroyed at our own facility, not on a truck parked outside. Households can drop off boxes on weekdays, and businesses can schedule a one-time purge or ongoing pickup. You can watch sensitive files being shredded, the shredded paper is recycled, and you receive a Certificate of Destruction. Our shredding is NAID AAA certified, and our operations follow R2v3 and RIOS standards.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Paper Shredding Facility",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`,
          rows: [
            {
              label: "Address",
              value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)",
            },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Arrival",
              value: "Take I-35W to 99th Ave NE, then 99th Lane NE. Drive around to the rear loading area and the north-end dock, where our team will take your boxes and log them in. Parking is free. Call ahead to set up witnessed shredding.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Residential drop-off", body: "Weekdays for household documents" },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Secure collection within roughly 100 miles of Blaine",
            },
            {
              icon: "repeat",
              title: "Purge or ongoing service",
              body: "A single cleanout or a regular schedule",
            },
            { icon: "eye", title: "Witnessed shredding", body: "For sensitive documents" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Documents We Shred in Blaine",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A shoebox of old bank statements from a Lino Lakes home or a storage room of closed files from a Coon Rapids clinic, we shred:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "file",
              title: "Confidential business documents with customer, employee or company information",
            },
            { icon: "briefcase", title: "Financial records, invoices and payroll reports" },
            { icon: "heart", title: "Medical, legal and HR files" },
            { icon: "file", title: "Leases, applications and signed contracts" },
            { icon: "file", title: "General office paperwork that's past its retention date" },
            { icon: "briefcase", title: "Personal papers such as tax returns and old statements" },
          ],
        },
        {
          kind: "topics",
          items: [
            {
              title: "Getting Your Documents Ready",
              body: [
                "Please remove staples before bringing documents in or staging them for pickup. Sturdy, closed boxes make the handoff quicker and keep loose pages together. If you have a mix of routine paperwork and highly sensitive files, label those boxes so we know which ones you'd like to see shredded.",
              ],
            },
            {
              title: "Witnessed Shredding for Sensitive Files",
              body: [
                "Some records call for more than a receipt. For sensitive documents, you can watch them being shredded at our Blaine facility. Mention it when you book, and we'll schedule a time for you to be there.",
              ],
            },
            {
              title: "Certificate of Destruction and Standards",
              body: [
                "After your documents are destroyed, you receive a Certificate of Destruction to keep with your records. Our shredding is NAID AAA certified, and our operations follow R2v3 and RIOS standards, which are independently audited. The standards shown across our services include HIPAA, GLBA, FACTA and FCRA, giving offices that handle regulated records a documented trail. Your own compliance obligations stay with your organization.",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: [
            `See our main [paper shredding page](${href('/paper-shredding-services/')}) for more on how documents are handled.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Off-Site Shredding Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Request a quote",
              body: "Tell us roughly how many boxes you have and whether this is a single purge or an ongoing need.",
            },
            {
              title: "Drop off or schedule pickup",
              body: "Bring boxes to Blaine, or our team collects them from your office.",
            },
            { title: "Secure transport", body: "Documents travel to our facility in secure vehicles." },
            {
              title: "Shredding at our facility",
              body: "Paper is destroyed at our plant, with you watching if you've arranged witnessed shredding.",
            },
            {
              title: "Recycling and certificate",
              body: "The shredded paper is recycled, and your Certificate of Destruction is issued.",
            },
          ],
        },
        {
          kind: "text",
          body: [`More on our [off-site shredding](${href('/off-site-shredding/')}) service.`],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "One-Time Purge or Ongoing Service?",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "One-Time Purge or Ongoing Service?",
          panel: [
            "A **purge** suits a one-off cleanout: end-of-year tax files, an office move, a retiring partner's records or a basement full of archived boxes. **Ongoing service** fits offices that generate confidential paper every week, such as clinics, property management firms and accounting practices. Both options use the same secure transport, facility shredding and certificate.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Paper Shredding Options in Blaine, MN",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for paper shredding near you in Blaine, Ham Lake or Spring Lake Park? Bring your boxes to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. City shred programs nearby often cap you at a box or a few per visit, while our drop-off is set up for larger household cleanouts too. Call 763-559-5130 if you'd like to witness the shredding.",
            `Old hard drives can be destroyed on the same visit through our [hard drive destruction](${href('/minnesota/blaine/hard-drive-destruction/')}) service, and phones through [phone shredding](${href('/phone-shredding-service/')}). Retired computers can go to [electronics recycling](${href('/electronic-recycle/')}).`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Pickup is a business service. We collect documents within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Lino Lakes, Fridley, Mounds View, Roseville, Brooklyn Park, Maple Grove, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Pickup address:** street, city, and ZIP, plus building or dock access",
            "**Volume:** an estimated number of boxes, or the size of the file room",
            "**Service type:** a one-time purge or ongoing pickups",
            "**Sensitive files:** whether any boxes need witnessed shredding",
            "**Other media:** hard drives or phones going out at the same time",
            "**Timing:** any deadline, such as an office move or lease end",
          ],
          buttons: {
            primary: { label: "Request a Shredding Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Who Uses Our Shredding Service",
      grey: false,
      blocks: [
        {
          kind: "list",
          items: [
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Patient charts, intake forms and billing records",
            },
            {
              icon: "school",
              title: "Schools and districts",
              body: "Student files, testing records and staff paperwork",
            },
            {
              icon: "building",
              title: "Property managers",
              body: "Rental applications, leases and tenant payment records",
            },
            {
              icon: "briefcase",
              title: "Accounting, tax and law offices",
              body: "Seasonal purges of client files",
            },
            {
              icon: "briefcase",
              title: "Banks, credit unions and financial offices",
              body: "Statements and account documents",
            },
            {
              icon: "landmark",
              title: "Government agencies",
              body: "Public records past their retention schedule",
            },
            { icon: "tool", title: "Contractors", body: "Bids, payroll and subcontractor paperwork" },
            {
              icon: "warehouse",
              title: "Warehouses and distribution centers",
              body: "Shipping logs and HR files",
            },
            { icon: "home", title: "Households", body: "Tax years past, estate paperwork and old statements" },
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Minnesota Counties We Serve",
      grey: true,
      blocks: [
        {
          kind: "places",
          links: [
            { label: "Anoka County", href: href('/minnesota-recycling/anoka-county-recycling/') },
            { label: "Hennepin County", href: href('/minnesota-recycling/hennepin-county-recycling-center/') },
            { label: "Ramsey County", href: href('/minnesota-recycling/ramsey/') },
            { label: "Dakota County", href: href('/minnesota-recycling/dakota-county/') },
            { label: "Washington County", href: href('/minnesota-recycling/washington-county/') },
            { label: "Scott County", href: href('/minnesota-recycling/scott-county/') },
            { label: "Olmsted County", href: href('/minnesota-recycling/olmsted-county/') },
            { label: "Benton County (St. Cloud)", href: href('/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/') },
            { label: "St. Louis County (Duluth)", href: href('/minnesota-recycling/electronic-recycling-duluth/') },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Why Recycle Technologies for Paper Shredding in Blaine",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "A north metro facility",
              body: "Shredding happens in Blaine, close to Anoka County homes and offices",
            },
            {
              icon: "shield",
              title: "NAID AAA certified",
              body: "Backed by R2v3 and RIOS operating standards",
            },
            { icon: "eye", title: "Witnessed shredding", body: "Available for sensitive documents" },
            {
              icon: "shield",
              title: "Secure from pickup to shredder",
              body: "Documents ride in secure vehicles to our facility",
            },
            { icon: "file", title: "Certificate of Destruction", body: "Proof for audits and record-keeping" },
            {
              icon: "recycle",
              title: "Recycled, not landfilled",
              body: "Shredded paper goes back into the recycling stream",
            },
            {
              icon: "layers",
              title: "One vendor for every format",
              body: "Paper, hard drives and phones handled together",
            },
            {
              icon: "clock",
              title: "Since 1993",
              body: "More than three decades serving Minnesota and Wisconsin",
            },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
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
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Off-Site Shredding", href: href('/off-site-shredding/') },
            { label: "Document Shredding in Minnesota", href: href('/minnesota/blaine/shredding/') },
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
          ],
        },
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
