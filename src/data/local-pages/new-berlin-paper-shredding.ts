import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Paper Shredding in New Berlin, WI — /wisconsin/new-berlin/paper-shredding/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Paper Shredding Services in New Berlin, Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_PAPER_SHREDDING: LocalPage = {
  url: href('/wisconsin/new-berlin/paper-shredding/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Paper Shredding in New Berlin, WI | Recycle Technologies",
    description: "NAID AAA paper shredding in New Berlin, WI. Weekday document drop-off near I-43, witnessed shredding and business pickup across southeast Wisconsin.",
  },
  schema: { service: "Paper Shredding", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Paper Shredding in New Berlin, WI",
    h1: "Paper Shredding in New Berlin, WI",
    body: ["Secure document shredding for New Berlin, Milwaukee, and Waukesha County, with weekday drop-off on South 171st Street, witnessed shredding for sensitive files, and recurring or one-time pickup for businesses."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Old tax returns, patient charts, payroll records, and signed leases shouldn't sit in a recycling cart where anyone can read them. Recycle Technologies shreds paper at our own NAID AAA-certified plant, the [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, close to I-43 and College Avenue. Residents and businesses can bring documents in any weekday; sensitive files can be shredded while you watch, and companies can set up routine pickup or a one-time cleanout. Each job closes with a certificate of destruction, and the shredded paper moves on to recycling.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Paper Shredding Facility",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}) (Waukesha County)`,
          rows: [
            {
              label: "Address",
              value: "[2815 S 171st St, New Berlin, WI 53151](https://www.google.com/maps/dir/?api=1&destination=2815%20South%20171st%20Street%2C%20New%20Berlin%2C%20WI%2053151)",
            },
            { label: "Phone", value: "262-798-3040" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 4:00 PM" },
            {
              label: "Arrival",
              value: "From I-43, College Avenue leads you to South 171st Street. Turn into the main lot, and a team member will guide you to the unloading area, where your boxes are logged.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off for residents and businesses",
              body: "Weekdays during business hours, no appointment needed",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Routine routes or one-time purges within about 100 miles, with boxes and bins supplied on scheduled routes",
            },
            {
              icon: "eye",
              title: "Witnessed shredding",
              body: "Available for sensitive material when you'd like to see it destroyed",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Documents We Shred in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A shoebox of old bank statements from a Muskego home or a wall of file cabinets from a Greenfield clinic can both come to our plant. We shred:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "file", title: "Business files, records and reports" },
            { icon: "file", title: "Confidential paper with customer, employee, or company details" },
            { icon: "file", title: "Everyday office paper" },
            { icon: "file", title: "Archived records from large cleanouts" },
          ],
        },
        {
          kind: "note",
          body: [
            `Paper is all this service covers. Retired drives go through [hard drive destruction](${href('/hard-drive-destruction-services/')}), and cell phones through [phone shredding](${href('/wisconsin/new-berlin/phone-shredding/')}).`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Before You Bring Documents In",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Before You Bring Documents In",
          checks: [
            "**Pull the staples.** Take staples out of your documents before drop-off or pickup.",
            "**Remove what isn't paper.** Binders, plastic sleeves, and other non-paper items should be set aside.",
            "**Use boxes you can carry.** Any sturdy box works for drop-off.",
            "**Not sure about something?** Describe it when you call 262-798-3040 or request a quote, and we'll let you know.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "From Your Office to the Shredder",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "From Your Office to the Shredder",
          body: [
            `See our main [paper shredding page](${href('/paper-shredding-services/')}) for more on the service.`,
          ],
          checks: [
            "**Logged on arrival:** Boxes are recorded when they reach our New Berlin plant.",
            "**Tracked throughout:** Paper stays under documented custody from collection until it's shredded.",
            "**See it yourself:** Witnessed shredding is available for sensitive records.",
            "**Proof on paper:** You get a certificate of destruction when shredding is complete.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "How Shredding Works at Our New Berlin Plant",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            { title: "Choose a service", body: "Bring boxes in on a weekday, or set up a business pickup." },
            { title: "Prep the paper", body: "Remove staples and anything that isn't paper." },
            { title: "Hand it off", body: "Unload at our facility, or have files ready for the driver." },
            {
              title: "Shredding",
              body: "Trained staff destroy the documents on Recycle Technologies equipment at our New Berlin plant.",
            },
            {
              title: "Recycling and records",
              body: "The shredded paper is sent for recycling instead of a landfill, and you receive your certificate of destruction.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Paper Shredding Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Need paper shredding near you in New Berlin, Brookfield, Muskego or Hales Corners? Bring your boxes to 2815 S 171st St Monday through Friday, 7:30 AM to 4:00 PM. No appointment is required, and both residents and businesses are welcome. Let staff know if you'd like to watch your files being shredded, and call 262-798-3040 before bringing a truckload.",
            `Old drives can come along for [hard drive destruction](${href('/hard-drive-destruction-services/')}), along with retired [computers and electronics](${href('/electronic-recycle/')}).`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            `Medical and dental offices, law and accounting firms, banks and credit unions, property managers, HR departments, schools and manufacturers can have documents collected on a routine route or in a single cleanout. Pickup is for commercial customers within about 100 miles of New Berlin, including [Milwaukee](${href('/wisconsin-recycling/milwaukee/')}), [Waukesha](${href('/shredding-wisconsin/waukesha/')}), Wauwatosa, West Allis, Menomonee Falls, Oak Creek, [Racine](${href('/shredding-wisconsin/racine/')}), Kenosha and [Madison](${href('/wisconsin-recycling/madison/')}). On scheduled routes, we supply the boxes and bins.`,
          ],
          listIntro: "To price your service, share:",
          list: [
            "**Address:** where the documents are, including ZIP code",
            "**Volume:** number of boxes, bins or file cabinets",
            "**Record types:** patient, financial, HR or general office paper",
            "**Service style:** routine pickup or a one-time purge",
            "**Witnessing:** whether someone on your team wants to see the shredding",
            "**Other media:** hard drives or phones to destroy at the same time",
          ],
          buttons: {
            primary: { label: "Request a Shredding Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Document Disposal Rules in Wisconsin",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Wisconsin law requires financial institutions, medical businesses, and tax preparers to shred or otherwise destroy records holding personal information before discarding them (s. 134.97, Wis. Stats.). HIPAA, GLBA and the FACTA disposal rule set similar expectations for patient, financial and consumer report records.",
            "Community shred days around New Berlin come only a few times a year and usually cap each car at five boxes. Our plant takes documents every weekday, and the certificate of destruction gives your office a record to keep.",
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Why New Berlin Offices Shred With Recycle Technologies",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "shield",
              title: "NAID AAA certified plant",
              body: "Documents are destroyed at our own New Berlin facility, not handed off to a third party",
            },
            {
              icon: "layers",
              title: "Open every weekday",
              body: "Drop off Monday through Friday instead of waiting for a shred event",
            },
            { icon: "eye", title: "Witness option", body: "Watch sensitive records go through the shredder" },
            {
              icon: "file",
              title: "Documented custody",
              body: "Logged at intake and tracked to destruction, with a certificate at the end",
            },
            {
              icon: "recycle",
              title: "Paper gets a second life",
              body: "Shredded paper is recycled rather than landfilled",
            },
            {
              icon: "layers",
              title: "One vendor for every format",
              body: "Paper, hard drives and phones handled by the same team",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            {
              icon: "clock",
              title: "Since 1993",
              body: "More than three decades of recycling and shredding experience",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-9",
      heading: "Wisconsin Counties We Serve",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "grid",
          items: [
            { icon: "landmark", title: "Waukesha County" },
            { icon: "landmark", title: "Milwaukee County" },
            { icon: "landmark", title: "Racine County" },
            { icon: "landmark", title: "Washington County" },
            { icon: "landmark", title: "Sheboygan County" },
            { icon: "landmark", title: "Fond du Lac County" },
            { icon: "landmark", title: "Dane County" },
            { icon: "landmark", title: "Calumet County" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "What does paper shredding cost in New Berlin?", a: "It depends on volume and the service you choose. Call 262-798-3040 or request a quote." },
      { q: "Do you shred on-site at my office?", a: "Shredding takes place at our New Berlin plant. If you want to see it happen, come in and witness it." },
      { q: "Do I have to live in New Berlin to drop off?", a: "No. Residents from any nearby community can bring documents during weekday hours." },
      { q: "Is there a limit on how much I can bring?", a: "Call ahead for large loads so the team can plan space and time." },
      { q: "Can we book a single purge at tax season or year-end?", a: "Yes. Businesses can schedule a one-time cleanout whenever archived records pile up." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Shredding Services",
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Paper Shredding", href: href('/paper-shredding-services/') },
            { label: "Off-Site Shredding", href: href('/off-site-shredding/') },
            { label: "Document Shredding in Wisconsin", href: href('/wisconsin/new-berlin/shredding/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Phone Shredding in Wisconsin", href: href('/wisconsin/new-berlin/phone-shredding/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Wisconsin Recycling & Shredding", href: href('/wisconsin-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Shred Your Documents in New Berlin, WI",
    body: ["Bring boxes to South 171st Street on any weekday, or tell us your volume and schedule for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Shredding Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Document Disposal Rules: the doc's \"[verify citation]\" note after \"(s. 134.97, Wis. Stats.)\" left out (the citation is kept", "verify before publishing)", "Related link \"Off-Site Shredding in Wisconsin\" (/wisconsin-recycling/off-site-shredding/, being deleted) now goes to the national /off-site-shredding/ as \"Off-Site Shredding\"", "Related link \"Document Shredding in Wisconsin\" now goes to /wisconsin/new-berlin/shredding/ instead of /shredding-wisconsin/", "Phone shredding links now go to /wisconsin/new-berlin/phone-shredding/ instead of /wisconsin-recycling/phone-shredding/"],
}
