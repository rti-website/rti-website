import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Secure Phone Shredding in Blaine, Minnesota — /minnesota/blaine/phone-shredding/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Minnesota tab).
 * Copy: the content team's Google Doc "Phone Shredding Service in Blaine, Minnesota", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const BLAINE_PHONE_SHREDDING: LocalPage = {
  url: href('/minnesota/blaine/phone-shredding/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Secure Phone Shredding in Blaine, Minnesota | Cell Phones & SIM Cards",
    description: "Secure cell phone shredding in Blaine, MN for businesses retiring devices. Phones, SIM cards, and memory chips destroyed or wiped, with witnessing and a certificate.",
  },
  schema: { service: "Phone Shredding", areaServed: ["Blaine, MN", "Minnesota"] },
  hero: {
    crumb: "Secure Phone Shredding in Blaine, Minnesota",
    h1: "Secure Phone Shredding in Blaine, Minnesota",
    body: [
      "Secure phone shredding for Twin Cities businesses retiring devices in volume, with pickup within about 100 miles of our Blaine facility, witnessed destruction, and drop-off or mail-in for residential customers.",
      `A drawer of old company phones still holds texts, contacts, email accounts and saved logins, and the same goes for the SIM cards and memory chips inside them. Recycle Technologies takes those devices out of circulation at our [Blaine site](${href('/minnesota-recycling/ramsey/blaine/')}) on 99th Lane NE. Phones are wiped or physically destroyed, whichever makes the data unrecoverable, and you can watch it happen. We built this for offices and organizations clearing out phones in bulk, with commercial pickup across the metro. Every completed job comes with a Certificate of Destruction, giving your organization documentation of the service. Our operations are NAID AAA certified and follow R2v3 and RIOS standards.`,
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Blaine Phone Shredding Facility",
      grey: false,
      blocks: [
        { kind: "text", body: [`[Blaine Recycling Center](${href('/minnesota-recycling/ramsey/blaine/')}) ([Anoka County](${href('/minnesota-recycling/anoka-county-recycling/')}))`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1525 99th Ln NE, Blaine, MN 55449](https://www.google.com/maps/dir/?api=1&destination=1525%2099th%20Ln%20NE%2C%20Blaine%2C%20Minnesota%2055449)" },
            { label: "Phone", value: "763-559-5130" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            { label: "Arrival", value: "Exit I-35W at 99th Ave NE and head to 99th Lane NE. Circle to the rear loading area and the north-end dock, where a team member will log your devices. Parking is free. Call ahead to schedule witnessed destruction." },
        ] },
        { kind: "h3", text: "Available Service Options" },
        { kind: "bullets", rows: [
            ["**Commercial pickup:** for businesses retiring phones in volume, within roughly 100 miles", "**Witnessed destruction:** watch your devices being destroyed at our facility"],
            ["**Residential drop-off:** at our Blaine location", "**Mail-in:** recycling kits for residential customers"],
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Devices We Destroy in Blaine",
      grey: true,
      blocks: [
        { kind: "text", body: ["From a bin of retired staff phones at a Fridley clinic to a box of field devices from a Brooklyn Park contractor, we handle:"] },
        { kind: "bullets", rows: [
            ["Cell phones and smartphones, working or broken", "Other handheld mobile devices that store data"],
            ["SIM cards", "Memory chips"],
        ] },
        { kind: "h3", text: "Why a Factory Reset Isn't the End of It" },
        { kind: "text", body: ["Resetting a phone clears the screen you see, but it doesn't guarantee the data underneath is gone. SIM cards and memory chips can carry contacts and files of their own, and a phone with a cracked screen or dead battery can still hold everything it stored. When the device leaves your hands, you want proof that nothing on it can be read again."] },
        { kind: "h3", text: "Data Wiping or Physical Destruction" },
        { kind: "text", body: ["Each device is either wiped or physically destroyed, depending on what it takes to make the data unrecoverable. Damaged phones that can't be wiped are destroyed. Either way, the remaining material moves on to recycling instead of a landfill."] },
        { kind: "h3", text: "Watch Your Phones Being Destroyed" },
        { kind: "text", body: ["If you'd like to see it for yourself, you can witness the destruction of your devices at our Blaine facility. Ask for witnessed destruction when you book, and we'll set a time."] },
        { kind: "h3", text: "Certificate and Standards" },
        { kind: "text", body: ["You receive a Certificate of Destruction once your devices are processed. Our operations are NAID AAA certified and follow R2v3 and RIOS standards, which are audited by outside reviewers, and the standards shown across our services include NIST SP 800-88, HIPAA, and GLBA. Your organization's own compliance duties remain with you, but the paperwork gives you a clear record.", `See our main [phone shredding page](${href('/phone-shredding-service/')}) for more on how devices are handled.`] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Phone Shredding Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Count your devices", body: ["A rough number of phones, plus any loose SIM cards or memory chips."] },
              { n: 2, title: "Choose your route", body: ["Businesses schedule pickup; residential customers drop off in Blaine or use a mail-in kit."] },
              { n: 3, title: "Secure transport", body: ["Devices are brought to our facility for processing."] },
            ],
            [
              { n: 4, title: "Wipe or destroy", body: ["Each phone is wiped or physically destroyed, with you watching if you've arranged it."] },
              { n: 5, title: "Certificate", body: ["Your Certificate of Destruction arrives once the job is complete."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Phone Shredding Options in Blaine, MN",
      grey: true,
      blocks: [
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: ["This service is built for organizations retiring phones in volume. Hospitals and clinics, schools, property management companies, contractors, warehouses, banks, and law offices can schedule a pickup instead of storing old devices in a locked drawer. Pickup is available to commercial clients within about 100 miles of Blaine, including Coon Rapids, Andover, Anoka, Ham Lake, Lino Lakes, Fridley, Roseville, Brooklyn Park, Maple Grove, Plymouth, Minneapolis, St. Paul, Bloomington, Woodbury, Burnsville, Lakeville, Elk River, Forest Lake, Stillwater, Shakopee and St. Cloud.", "When requesting a quote, include:"] },
        { kind: "bullets", rows: [
            ["**Pickup address:** street, city and ZIP, plus building access", "**Device count:** an estimate of phones and other mobile devices"],
            ["**SIM cards and memory chips:** any loose ones to include", "**Condition:** working, broken, or a mix"],
            ["**Witnessing:** whether you'd like to watch the destruction", "**Other media:** hard drives or paper going out at the same time"],
        ] },
        { kind: "buttons", primary: { label: "Request a Phone Shredding Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Residential Drop-Off" },
        { kind: "text", body: [`Residential customers looking for phone shredding near them in Blaine, Spring Lake Park or Circle Pines can bring devices to 1525 99th Ln NE on weekdays from 7:30 AM to 4:00 PM. The same trip can include [hard drives for destruction](${href('/minnesota/blaine/hard-drive-destruction/')}), [paper for shredding](${href('/paper-shredding-services/')}), and other [electronics](${href('/electronic-recycle/')}).`, `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`] },
        { kind: "h3", text: "Mail-In" },
        { kind: "text", body: [`Residential customers who can't make it to Blaine can order a [mail-in recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) and ship their phones in. Read about our [mail-in recycling program](${href('/mail-in-recycling/')}) before you order.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Who Uses Our Phone Shredding Service",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**Hospitals and clinics:** staff phones that handled patient calls, texts, and scheduling apps", "**Schools and districts:** retired staff devices with student and family contacts"],
            ["**Property managers:** leasing and maintenance phones with tenant information", "**Contractors and field service crews:** company phones used on job sites"],
            ["**Warehouses and distribution centers:** handheld mobile devices from shipping and inventory teams", "**Banks, law firms and accounting offices:** devices with client communications"],
            ["**Government agencies:** department phones at the end of their service life", "**Corporate IT teams:** phone fleet refreshes and employee offboarding"],
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
      heading: "Why Recycle Technologies for Phone Shredding in Blaine",
      grey: false,
      blocks: [
        { kind: "bullets", rows: [
            ["**A dedicated phone service:** not an add-on buried under paper shredding", "**Phones plus their parts:** SIM cards and memory chips are covered too"],
            ["**Working or broken:** damaged devices are accepted", "**Witnessed destruction:** see your devices destroyed at our Blaine facility"],
            ["**Certified operations:** NAID AAA certified, with R2v3 and RIOS standards", "**Documented results:** a Certificate of Destruction for every job"],
            ["**One vendor for every format:** phones, hard drives and paper handled together", "**Since 1993:** over three decades serving Minnesota and Wisconsin"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "Phone Shredding FAQs",
    items: [
      { q: "How much does phone shredding cost in Blaine?", a: "Pricing depends on device count and service. Call 763-559-5130 or request a quote." },
      { q: "Do you shred phones at our office?", a: "No. Devices are processed at our Blaine facility, where you can watch if you'd like." },
      { q: "Can individuals schedule a phone pickup?", a: "No. Pickup is for commercial clients. Individuals can drop off in Blaine or use a mail-in kit." },
      { q: "Can you take laptops from the same device refresh?", a: "Yes. Laptops and their drives go through hard drive destruction and electronics recycling." },
      { q: "Is there a Minnesota email for device pickups?", a: "Yes. Write to dispatch@recycletechnologies.com." },
      { q: "Do you offer phone shredding in Wisconsin?", a: "Yes. Our New Berlin, WI facility can be reached at 262-798-3040." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Hard Drive Destruction", href: href('/minnesota/blaine/hard-drive-destruction/') },
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Document Shredding in Minnesota", href: href('/minnesota/blaine/shredding/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "IT Asset Disposition", href: href('/it-asset-disposition/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Secure Phone Shredding in Blaine, MN",
    body: ["Tell us how many devices your organization is retiring and where they're located, and we'll quote a pickup. You're welcome to watch the destruction at our Blaine facility."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Phone Shredding Pickup in Blaine", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Blaine-area reviews are supplied"],
}
