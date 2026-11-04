import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Phone Shredding in New Berlin, WI — /wisconsin/new-berlin/phone-shredding/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Wisconsin tab; copy from the content
 * team's Google Doc "Phone Shredding Service in New Berlin, Wisconsin", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const NEW_BERLIN_PHONE_SHREDDING: LocalPage = {
  url: href('/wisconsin/new-berlin/phone-shredding/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Phone Shredding in New Berlin, WI | Recycle Technologies",
    description: "Cell phone shredding in New Berlin, WI. Drop off phones, SIM cards, and memory chips near I-43, watch them destroyed, or book business pickup.",
  },
  schema: { service: "Phone Shredding", areaServed: ["New Berlin, WI", "Waukesha County, WI", "Wisconsin"] },
  hero: {
    crumb: "Phone Shredding in New Berlin, WI",
    h1: "Phone Shredding in New Berlin, WI",
    body: ["Secure cell phone destruction for New Berlin, Milwaukee and Waukesha County, with weekday drop-off on South 171st Street, witnessed shredding, and pickup for company device refreshes."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `A retired smartphone can still hold texts, contacts, email logins, and client details, and a factory reset doesn't always clear the SIM card or memory chip inside. Recycle Technologies handles phone destruction at our NAID AAA certified [New Berlin Recycling Center](${href('/wisconsin-recycling/new-berlin-recycling-center/')}), 2815 S 171st St, near I-43 and College Avenue. We take smartphones and older cell phones, working or not, plus other handheld devices that store data, SIM cards and memory chips. Bring phones in on a weekday and watch them destroyed, or have your company's retired devices collected, and keep the certificate for your files.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our New Berlin Phone Shredding Facility",
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
              value: "We're on South 171st Street, a few minutes from the I-43 exit at College Avenue. Park in the main lot and check in with staff, who log your devices.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "Weekdays during business hours, no appointment needed, with the choice to watch",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Collection for companies within about 100 miles of New Berlin",
            },
            { icon: "mail", title: "Mail-in", body: "An electronics recycling kit for one or two devices" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Devices We Destroy in New Berlin",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A drawer of old phones from a Wauwatosa home office or a cart of retired company smartphones from a West Allis service fleet can both come here. We destroy:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "smartphone", title: "Smartphones" },
            { icon: "smartphone", title: "Older cell phones" },
            { icon: "smartphone", title: "Phones that are cracked, water-damaged, or won't turn on" },
            { icon: "smartphone", title: "Other handheld electronics that store personal or business data" },
            { icon: "smartphone", title: "SIM cards" },
            { icon: "cpu", title: "Memory chips" },
          ],
        },
        {
          kind: "note",
          body: [
            `Drives from laptops and desktops go through our [hard drive destruction](${href('/hard-drive-destruction-services/')}) service. Not sure about a device? Call 262-798-3040 before you bring it.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "When a Reset Isn't Enough",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "When a Reset Isn't Enough",
          panel: [
            "A reset leaves the SIM card and memory chip untouched in many cases, so data can survive it, and a phone with a shattered screen or a dead battery can't be wiped by its owner at all. Depending on what it takes to make the data unrecoverable, we either physically destroy each device or securely wipe it.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Custody and Proof",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Custody and Proof",
          checks: [
            "**Logged on arrival:** Devices are recorded when they reach our New Berlin facility.",
            "**Secure transport:** Phones collected from your site travel straight to our facility.",
            "**Witness option:** Watch your phones destroyed in person.",
            "**Certificate:** You receive a certificate once processing is complete.",
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "How Phone Destruction Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Choose your option",
              body: "Drop off on South 171st Street, set up a business pickup, or order a mail-in kit.",
            },
            {
              title: "Gather everything",
              body: "Collect the phones along with any loose SIM cards and memory chips, and note the count.",
            },
            {
              title: "Hand them over",
              body: "Bring them to our facility, give them to our driver, or ship your kit.",
            },
            {
              title: "Destruction",
              body: "Each device is destroyed or securely wiped so its data can't be recovered, with you watching if you choose.",
            },
            { title: "Paperwork", body: "A certificate confirms your devices were handled securely." },
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Phone Shredding Options in New Berlin, WI",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for cell phone shredding near you in New Berlin, Brookfield, Greenfield or Muskego? Bring your phones to 2815 S 171st St any weekday between 7:30 AM and 4:00 PM, no appointment needed. Let staff know if you'd like to watch, and give us a call at 262-798-3040 before bringing a large batch.",
            `Old laptops and desktops can come along for [hard drive destruction](${href('/hard-drive-destruction-services/')}), and file boxes for [paper shredding](${href('/wisconsin/new-berlin/paper-shredding/')}).`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            `Companies retiring field service, sales or delivery phones, along with hospitals, banks, insurance agencies, law firms, schools, property managers, managed IT providers and government offices, can schedule collection instead of driving devices in. Pickup is a commercial service within about 100 miles of New Berlin, covering [Milwaukee](${href('/wisconsin-recycling/milwaukee/')}), [Waukesha](${href('/shredding-wisconsin/waukesha/')}), Wauwatosa, Menomonee Falls, Oak Creek, [Racine](${href('/shredding-wisconsin/racine/')}), Kenosha and [Madison](${href('/wisconsin-recycling/madison/')}).`,
          ],
          listIntro: "For a quote, tell us:",
          list: [
            "**Location:** site address and ZIP code",
            "**Device count:** how many phones, roughly",
            "**Device mix:** smartphones, older phones, loose SIM cards or memory chips",
            "**Witnessing:** whether your team wants to see destruction",
            "**Other media:** hard drives, laptops or paper going out at the same time",
            "**Timing:** a one-time refresh or repeat collections",
          ],
          buttons: {
            primary: { label: "Request a Phone Shredding Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In",
          body: [
            `If you only have one or two phones and live too far to drive in, order an [electronics recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack your devices, and send it back. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page explains the steps.`,
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Phone Disposal Rules in Wisconsin",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Cell phones are among the electronics Wisconsin bans from landfills and incinerators, and the ban covers homes and businesses alike ([Wisconsin DNR](https://dnr.wisconsin.gov/topic/Ecycle/Business.html)). Phones holding patient, financial, or consumer information also fall under privacy rules such as HIPAA, GLB and FACTA, and Wisconsin requires financial, medical and tax businesses to make personal records unreadable before disposal (s. 134.97).",
            "Milwaukee's city drop-off centers don't accept cell phones, so residents and businesses in the area need another route for secure disposal.",
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Why Choose Recycle Technologies for Phone Destruction",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "shield",
              title: "NAID AAA certified",
              body: "Data destruction held to an independently audited standard",
            },
            {
              icon: "shield",
              title: "NIST SP 800-88 aligned",
              body: "Destruction follows recognized federal media sanitization guidance",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 certified at New Berlin and RIOS certified, run to recognized industry standards",
            },
            {
              icon: "eye",
              title: "See it done",
              body: "Witnessed destruction available at our New Berlin facility",
            },
            {
              icon: "smartphone",
              title: "SIM cards and chips included",
              body: "The small parts that hold data are destroyed too",
            },
            { icon: "file", title: "Certificate for your records", body: "Documentation after every job" },
            {
              icon: "layers",
              title: "One stop for every device",
              body: "Phones, hard drives, paper, and electronics handled by the same team",
            },
            { icon: "clock", title: "Since 1993", body: "Over 30 years in recycling and data destruction" },
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
      { q: "What does phone shredding cost in New Berlin?", a: "It depends on how many devices you have and the service you choose. Call 262-798-3040 or request a quote." },
      { q: "Should I take the SIM card out first?", a: "You can leave it in. SIM cards are destroyed along with the phone." },
      { q: "Is phone shredding the same as mobile shredding?", a: "Not quite. \"Mobile shredding\" usually means a truck that shreds paper at your site, while our phone shredding destroys devices at our New Berlin facility." },
      { q: "Can I bring chargers and cases with the phones?", a: "Yes. Chargers, cables, and other accessories can go in with our electronics recycling." },
      { q: "Can I drop off phones and old laptops together?", a: "Yes. New Berlin takes both, so a full desk cleanout can come in on one trip." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Data Destruction Services",
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Phone Shredding", href: href('/phone-shredding-service/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Paper Shredding in Wisconsin", href: href('/wisconsin/new-berlin/paper-shredding/') },
            { label: "Off-Site Shredding", href: href('/off-site-shredding/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Wisconsin Recycling & Shredding", href: href('/wisconsin-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Destroy Your Old Phones in New Berlin, WI",
    body: ["Drop phones off on any weekday and watch them destroyed, or send us a device count for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Phone Pickup in New Berlin", href: PICKUP_HREF },
  },
  todo: ["Custody and Proof: the doc's note \"[Confirm whether IMEI or serial numbers are listed]\" on the certificate left out", "Phone Disposal Rules: the doc's \"[verify citation]\" note after \"(s. 134.97)\" left out (the citation is kept", "verify before publishing)", "Typos read as: \"SIM cards,s\" as \"SIM cards\", \"water-damaged, ed or won't turn on\" as \"water-damaged, or won't turn on\", \"financial, medical, al and tax businesses\" as \"financial, medical and tax businesses\"", "Related link \"Off-Site Shredding in Wisconsin\" (/wisconsin-recycling/off-site-shredding/, being deleted) now goes to the national /off-site-shredding/ as \"Off-Site Shredding\"", "Paper shredding links now go to /wisconsin/new-berlin/paper-shredding/ instead of /wisconsin-recycling/paper-shredding/"],
}
