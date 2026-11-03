import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Off-Site Shredding in Blaine, Minnesota — /minnesota/blaine/off-site-shredding/
 * Management sheet "all plan rti 1", Minnesota tab; copy from the content
 * team's Google Doc "Off-Site Shredding in Blaine, Minnesota", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const BLAINE_OFF_SITE_SHREDDING: LocalPage = {
  url: href('/minnesota/blaine/off-site-shredding/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Off-Site Shredding in Blaine, MN | Recycle Technologies",
    description: "Securely shred business documents, hard drives, and phones with Recycle Technologies in Blaine, MN. Arrange commercial pickup or request witnessed destruction.",
  },
  schema: { service: "Off-Site Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Off-Site Shredding in Blaine, Minnesota",
    h1: "Off-Site Shredding in Blaine, Minnesota",
    body: ["Off-site shredding for Twin Cities businesses and north metro households, with collection from your office, secure transport to our Blaine facility, and destruction of paper, hard drives and phones under one roof."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Off-site shredding means your confidential material leaves your building with our team and is destroyed at our own plant. Recycle Technologies runs that process at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE for every format that holds private information: paper records, hard drives and SSDs, and cell phones along with their SIM cards and memory chips. Businesses can book a one-time purge or recurring pickups, households can drop off on weekdays, and sensitive items can be destroyed while you watch. Each job closes with a certificate, and our operations are NAID AAA certified and follow R2v3 and RIOS standards.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Off-Site Shredding Facility",
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
              value: "From I-35W, take 99th Ave NE to 99th Lane NE and pull around to the rear loading area. The north-end dock is where we receive boxes, drives and devices, and a team member logs each load. Parking is free. Call ahead if you plan to witness destruction.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "truck",
              title: "Business pickup",
              body: "Secure collection within roughly 100 miles of Blaine",
            },
            { icon: "repeat", title: "Purge or recurring", body: "A single cleanout or a regular schedule" },
            { icon: "pin", title: "Residential drop-off", body: "Weekdays at the north-end dock" },
            {
              icon: "eye",
              title: "Witnessed destruction",
              body: "For drives, phones, and sensitive documents",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "What We Shred Off-Site in Blaine",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "One facility, one pickup, every format. Whether it's a file room in Anoka or a bin of retired laptops and phones from a Maple Grove office, we destroy:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "file",
              title: "Paper records",
              body: `Confidential business documents, financial and HR files, contracts and personal papers. Please remove staples first. More on [paper shredding](${href('/paper-shredding-services/')}).`,
            },
            {
              icon: "drive",
              title: "Hard drives and SSDs",
              body: `From desktops, laptops, servers and other retired IT equipment, physically destroyed. More on [hard drive destruction](${href('/minnesota/blaine/hard-drive-destruction/')}).`,
            },
            {
              icon: "smartphone",
              title: "Phones and mobile devices",
              body: `Cell phones and smartphones, working or broken, plus SIM cards and memory chips, wiped or physically destroyed. More on [phone shredding](${href('/phone-shredding-service/')}).`,
            },
          ],
        },
        {
          kind: "topics",
          items: [
            {
              title: "Off-Site or Mobile Shredding?",
              body: [
                "Mobile shredding brings a truck to your parking lot. Off-site shredding moves the work to a dedicated plant, which suits organizations that would rather hand over boxes, drives and phones in one visit and let a single facility handle all three. If seeing it happen matters, you can still watch.",
              ],
            },
            {
              title: "Witnessed Destruction",
              body: [
                "For hard drives, phones, and sensitive documents, you can witness the destruction at our Blaine facility. Ask when you book, and we'll schedule a time for you.",
              ],
            },
            {
              title: "Certificate and Standards",
              body: [
                "Every job ends with documentation you can file. Our shredding is NAID AAA certified, our operations follow R2v3 and RIOS standards, and the standards shown across our services include NIST SP 800-88, HIPAA, GLBA, FACTA and FCRA. Your compliance obligations stay with your organization, but you'll have a clear record of what was destroyed and when.",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: [
            `See our main [off-site shredding page](${href('/off-site-shredding/')}) for more on the service.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "From Your Building to Our Shredder",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Collection",
              body: "Our team picks up boxes, drives and devices at your office, or you bring them to our dock.",
            },
            {
              title: "Secure transport",
              body: "Everything travels in secure vehicles straight to our Blaine facility.",
            },
            { title: "Logged on arrival", body: "Loads are checked in at the north-end dock." },
            {
              title: "Destruction",
              body: "Paper is shredded, drives are physically destroyed, and phones are wiped or destroyed.",
            },
            {
              title: "Recycling",
              body: "Shredded paper and the remaining material go to recycling, not a landfill.",
            },
            { title: "Certificate", body: "A Certificate of Destruction is issued so you have proof on file." },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "One-Time Purge or Recurring Pickup",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "**Choose a purge** when the volume is a one-off: closing out old tax years, moving offices, retiring a server room, clearing a former employee's files, or emptying an archive after a retention date passes.",
            "**Choose recurring pickup** when confidential material keeps piling up: clinics with daily patient paperwork, property managers handling leases, accounting practices in tax season, or IT teams cycling out laptops and phones on a schedule.",
            "Whichever you pick, the chain stays the same: our vehicles, our Blaine plant, your certificate.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Off-Site Shredding Options in Blaine, MN",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Pickup is reserved for commercial clients and covers sites within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Mounds View, Roseville, Brooklyn Park, Maple Grove, Minnetonka, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Pickup address:** street, city and ZIP, plus building or dock access",
            "**What's going:** paper, hard drives, phones or a mix",
            "**Volume:** boxes of paper, number of drives and devices",
            "**Service type:** a one-time purge or recurring pickup",
            "**Witnessing:** whether you'd like to watch any of it destroyed",
            "**Deadline:** an office move, lease end or audit date",
          ],
          buttons: {
            primary: { label: "Request an Off-Site Shredding Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "pin",
          title: "Residential Drop-Off",
          body: [
            `Looking for shredding near you in Blaine, Circle Pines or Spring Lake Park? Households can bring paper, old drives and phones to 1525 99th Ln NE any weekday between 7:30 AM and 4:00 PM. Retired computers and other [electronics](${href('/electronic-recycle/')}) can come along on the same trip.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In for Drives and Phones",
          body: [
            `Paper isn't eligible for mail-in, but residential customers outside our area can ship hard drives and phones with a [mail-in recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Who Uses Off-Site Shredding",
      grey: false,
      blocks: [
        {
          kind: "list",
          items: [
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Patient charts, workstation drives and staff phones in a single pickup",
            },
            {
              icon: "school",
              title: "Schools and districts",
              body: "Summer archive cleanouts plus retired staff laptops",
            },
            {
              icon: "building",
              title: "Property managers",
              body: "Lease files, leasing office PCs and maintenance phones",
            },
            {
              icon: "briefcase",
              title: "Law, tax and accounting firms",
              body: "Seasonal purges of client files",
            },
            {
              icon: "briefcase",
              title: "Banks and credit unions",
              body: "Statements, teller workstation drives and branch phones",
            },
            {
              icon: "landmark",
              title: "Government agencies",
              body: "Records past retention, along with department devices",
            },
            {
              icon: "tool",
              title: "Contractors and warehouses",
              body: "Payroll, shipping logs and handheld devices",
            },
            {
              icon: "building",
              title: "Offices relocating or closing",
              body: "Everything that shouldn't make the move",
            },
            { icon: "home", title: "Households", body: "Tax papers, an old family computer, and past phones" },
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
      heading: "Why Choose Recycle Technologies for Off-Site Shredding in Blaine?",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              title: "One Provider for Paper, Hard Drives and Phones",
              body: "Manage confidential documents and electronic media destruction through one provider. Recycle Technologies offers off-site shredding for paper records, physical destruction of hard drives and SSDs, and wiping or destruction of phones and their storage components, depending on the service provided. Instead of coordinating separate vendors for paper records and retired devices, businesses can arrange collection through one service and receive a Certificate of Destruction for their records. Whether you're clearing an archive, retiring office equipment, or scheduling recurring collections, contact our Blaine team to discuss your materials and pickup requirements.",
            },
            {
              icon: "pin",
              title: "Our own Blaine facility",
              body: "Destruction happens at our plant in the north metro",
            },
            {
              icon: "shield",
              title: "Secure vehicles",
              body: "Material goes straight from your door to our dock",
            },
            { icon: "eye", title: "Witnessing available", body: "For drives, phones, and sensitive files" },
            { icon: "shield", title: "NAID AAA certified", body: "With R2v3 and RIOS operating standards" },
            { icon: "file", title: "Certificate of Destruction", body: "Documentation for every job" },
            {
              icon: "recycle",
              title: "Recycled afterward",
              body: "Shredded paper and destroyed material are recycled",
            },
            { icon: "clock", title: "Since 1993", body: "Over 30 years serving Minnesota and Wisconsin" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
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
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Off-Site Shredding", href: href('/off-site-shredding/') },
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Document Shredding in Minnesota", href: href('/minnesota/blaine/shredding/') },
            { label: "IT Asset Disposition", href: href('/it-asset-disposition/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
          ],
        },
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
