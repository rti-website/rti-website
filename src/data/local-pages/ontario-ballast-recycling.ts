import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Ontario, CA — /california/ontario/ballast-recycling/
 * Management sheet "all plan rti 1", California tab; copy from the content
 * team's Google Doc "Ontario CA Ballast Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const ONTARIO_BALLAST_RECYCLING: LocalPage = {
  url: href('/california/ontario/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in Ontario, CA | Recycle Technologies",
    description: "Ballast recycling in Ontario, CA: drop off PCB, non-PCB, HID, and leaking ballasts on weekdays with no appointment, or book relamp pickup.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Ontario, CA", "San Bernardino County, CA", "California"] },
  hero: {
    crumb: "Ballast Recycling in Ontario, CA",
    h1: "Ballast Recycling in Ontario, CA",
    body: ["Lighting ballast recycling for Ontario and the Inland Empire, with no-appointment weekday drop-off on Francis Street, commercial pickup for relamps and retrofits, and prepaid kits for eligible non-PCB ballasts."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies takes used lighting ballasts at our [Ontario center](${href('/california/ontario/')}), 805 East Francis Street, just off the 60 Freeway. We accept PCB and non-PCB ballasts, magnetic, electronic, and HID ballasts, leaking units, and non-PCB capacitors. Contractors and facility teams can bring the lamps from the same job too, since the center handles full relamping projects. Drop off any weekday from 6:00 AM without an appointment, or contact us about pickup or a mail-in kit for eligible non-PCB ballasts.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Ontario Ballast Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ontario Recycling Center](${href('/california/ontario/')}) (San Bernardino County)`,
          rows: [
            {
              label: "Address",
              value: "[805 East Francis Street, Ontario, CA 91761](https://www.google.com/maps/dir/?api=1&destination=805+E+Francis+St%2C+Ontario%2C+CA+91761)",
            },
            { label: "Phone", value: "(909) 923-7252" },
            { label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
            {
              label: "Arrival",
              value: "Leave the 60 at Francis Street and turn into the driveway between Campus and Bon View avenues. The crew on site will show you where ballasts and lamps go.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Residential and business drop-off", body: "No appointment needed" },
            {
              icon: "truck",
              title: "Commercial pickup and relamping projects",
              body: "Contact the team to confirm availability for your job site",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid kits for eligible non-PCB ballasts" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts We Take in Ontario",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Office retrofits, warehouse relamps, and school lighting upgrades all leave behind old ballasts. The Ontario center accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "cpu", title: "PCB ballasts from older fluorescent fixtures" },
            { icon: "cpu", title: "Non-PCB ballasts" },
            { icon: "cpu", title: "Magnetic ballasts" },
            { icon: "cpu", title: "Electronic ballasts" },
            { icon: "cpu", title: "HID ballasts from metal halide and high-pressure sodium lighting" },
            { icon: "cpu", title: "Leaking or tar-stained ballasts, with a heads-up" },
            { icon: "cpu", title: "Non-PCB capacitors" },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How to Spot a PCB Ballast",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "How to Spot a PCB Ballast",
          body: [`See our main [ballast recycling page](${href('/ballasts/')}) for more on each ballast type.`],
          panel: [
            "Read the label before you pack. The EPA says ballasts made through 1979 may contain PCBs, and newer non-PCB units were marked \"No PCBs.\" A ballast with no label, or one you can't read, should go with your PCB pile, and the case should stay closed ([EPA](https://www.epa.gov/sites/default/files/2020-07/documents/pcb-flb-factsheet-final-july-2020.pdf)). Newer \"No PCBs\" ballasts can still contain DEHP, and those capacitors are removed during recycling too.",
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
            {
              title: "Separate by label",
              body: "Put PCB and unlabeled ballasts in one container and confirmed non-PCB units in another.",
            },
            {
              title: "Contain the leakers",
              body: "Seal any leaking or tar-stained ballast in heavy plastic before it travels.",
            },
            {
              title: "Choose how to send them",
              body: "Drive in on a weekday, book commercial pickup for a relamp, or mail eligible non-PCB ballasts in a kit.",
            },
            {
              title: "Teardown",
              body: "Each ballast is taken apart, PCB and DEHP capacitors head to an EPA-approved incineration facility, and the copper and steel are reclaimed.",
            },
            { title: "Paperwork", body: "Ask about a Certificate of Recycling once the job is done." },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Options in Ontario",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for ballast recycling near you in Ontario, Upland, Montclair or Chino? Bring your ballasts to Francis Street any weekday from 6:00 AM, with no appointment needed. Keep PCB and non-PCB units in separate boxes, and give the team a call before arriving with a large load or anything that's leaking.",
            `If the ballasts came out of a relamp, bring the lamps too. Ontario takes [fluorescent, CFL, HID, UV, neon, halogen, incandescent and LED lamps](${href('/light-bulbs/')}), and any mercury material is sent to our Greenwood, IN retort facility. You can also ask about [electronics](${href('/electronic-recycle/')}) and [batteries](${href('/battery-recycling/')}) from the same job.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup and Relamping Projects",
          dark: true,
          body: [
            "Electrical contractors, facility managers, school districts, property managers, hospitals and retailers can contact us about ballast pickup or full relamping project handling. We work with job sites from Rancho Cucamonga, Fontana and Pomona to Riverside, Corona, Anaheim, Los Angeles and Temecula, depending on the project.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Job site address:** street, city and ZIP code",
            "**Ballast count:** an estimated number, weight, or container total",
            "**Ballast type:** PCB, non-PCB, HID, or unlabeled, if known",
            "**Condition:** any leaking or damaged units",
            "**Lamps:** the types and rough quantity coming out of the same project",
            "**Schedule and access:** your preferred pickup window and loading details",
          ],
          buttons: {
            primary: { label: "Request a Ballast Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
          after: ["Our team will confirm availability and talk through scheduling and pricing."],
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a few non-PCB ballasts, a prepaid [non-PCB ballast kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) may save you the drive. Read our [mail-in recycling program](${href('/mail-in-recycling/')}) page and follow the packing instructions. PCB, unlabeled, and leaking ballasts can't be mailed, so bring those to Francis Street or arrange a pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Ballast Disposal Guidance in California",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Older fluorescent ballasts may hold PCBs, and federal rules call for PCB material to be incinerated rather than landfilled. In California, the Department of Education and DTSC recommend removing pre-1979 PCB ballasts from schools as soon as practicable ([EPA Region 9](https://19january2017snapshot.epa.gov/www3/region9/pcbs/ballast.html)). Businesses should review the [EPA's guidance on disposing of fluorescent light ballasts](https://www.epa.gov/pcbs/disposal-fluorescent-light-ballasts-flb) before storing or moving them.",
            "The household hazardous waste sites in Ontario and Rancho Cucamonga don't list ballasts and don't take business waste. Our Ontario center accepts both PCB and non-PCB ballasts from homeowners and businesses on any weekday.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Ballast Recycling in Ontario",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Inland Empire drop-off",
              body: "A Francis Street center off the 60, open weekdays from 6:00 AM with no appointment",
            },
            {
              icon: "cpu",
              title: "PCB and non-PCB",
              body: "Both accepted, along with HID, leaking units, and non-PCB capacitors",
            },
            {
              icon: "layers",
              title: "Relamping support",
              body: "Ballasts and every common lamp type from the same project",
            },
            {
              icon: "truck",
              title: "Flexible service",
              body: "Drop-off, commercial pickup, and non-PCB mail-in kits",
            },
            {
              icon: "pin",
              title: "Responsible processing",
              body: "PCB and DEHP capacitors incinerated at an EPA-approved facility, with copper and steel recovered",
            },
            {
              icon: "file",
              title: "Documentation",
              body: "Ask about a Certificate of Recycling for your records",
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
      { q: "Is ballast recycling free in Ontario?", a: "Cost depends on the ballast types and quantity. Call (909) 923-7252 or request a quote before you come in." },
      { q: "Is an LED driver the same thing as a ballast?", a: "No. Drivers power LED fixtures, while ballasts run fluorescent and HID lamps. Ask whether your old drivers can come in with the job." },
      { q: "Can a school district schedule ballast removal during summer break?", a: "Contact the team with your campus addresses and timing so they can confirm pickup availability." },
      { q: "Can I sell non-PCB ballasts as scrap metal instead?", a: "Some scrap yards take them, but PCB and unlabeled ballasts need an approved recycler." },
      { q: "Can I recycle ballasts from a job outside California?", a: "Eligible non-PCB ballasts can ship back in a prepaid kit from most US states. Contact us about PCB units." },
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
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Ballast Recycling in Ontario",
    body: ["Finishing a relamp or clearing out old fluorescent fixtures? Choose the service that fits your project: bring materials to Francis Street, mail eligible non-PCB units in a kit, or send us your job details for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in Ontario", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ontario reviews are supplied", "FAQ \"Do I need to remove ballasts from the fixtures first?\" left out (answer is a placeholder in the doc)", "\"incandescent,t\" in the doc read as \"incandescent\""],
}
