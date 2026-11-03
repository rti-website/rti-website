import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Greenwood, IN — /indiana/greenwood/electronic-recycling/
 * Management sheet "all plan rti 1", Indiana tab; copy from the content
 * team's Google Doc "Greenwood Electronics Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const GREENWOOD_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/indiana/greenwood/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Greenwood, IN | Recycle Technologies",
    description: "Electronics recycling in Greenwood, IN: drop off computers, TVs, CRTs and office equipment off US-31 and I-65, or book business pickup.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Greenwood, IN", "Johnson County, IN", "Indiana"] },
  hero: {
    crumb: "Electronics Recycling in Greenwood, IN",
    h1: "Electronics Recycling in Greenwood, IN",
    body: ["Electronics recycling for Greenwood, Johnson County and the south side of Indianapolis, with drop-off on Park 800 Drive, business pickup across Central Indiana, and mail-in kits for a few devices."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies recycles electronics at our [Greenwood](${href('/indiana/greenwood/')}) center, 498 Park 800 Drive, close to US-31 and I-65. We accept desktop and laptop computers, servers, monitors and TVs (tube-style CRTs too), printers, copiers, scanners, fax machines, cell phones, cables, chargers, keyboards and similar everyday electronics. Drop-off is open to everyone on weekdays from 7:00 AM until 2:00 PM, and scheduling a time ahead is preferred. Businesses can arrange pickup within about 100 miles, which covers Indianapolis, Columbus and Bloomington. Each device is processed so its metals, plastics, and circuit boards can be recovered, and a certificate is issued when the job is done.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Greenwood Electronics Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Greenwood Recycling Center](${href('/indiana/greenwood/')}) (Johnson County)`,
          rows: [
            {
              label: "Address",
              value: "[498 Park 800 Drive, Greenwood, IN 46143](https://www.google.com/maps/dir/?api=1&destination=498+Park+800+Drive%2C+Greenwood%2C+IN+46143)",
            },
            { label: "Phone", value: "(317) 888-3889" },
            { label: "Hours", value: "Monday to Friday, 7:00 AM to 2:00 PM" },
            { label: "Toll-free", value: "(866) 375-7340" },
            {
              label: "Getting here",
              value: "Pull into the Park 800 Drive parking lot from US-31 or I-65, and a team member will show you where to unload.",
            },
          ],
        },
        {
          kind: "options",
          heading: "At the Greenwood Center",
          items: [
            {
              icon: "pin",
              title: "Residential and business drop-off",
              body: "Open to everyone. Scheduling an appointment is preferred.",
            },
            { icon: "truck", title: "Business pickup", body: "Roughly 100 miles around Greenwood" },
            { icon: "mail", title: "Mail-in", body: "Prepaid e-waste kits for small loads" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Take in Greenwood",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether it's a home office upgrade or a full floor of retired workstations, the Greenwood center accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "laptop", title: "Desktops, laptops and servers" },
            { icon: "tv", title: "Monitors and televisions" },
            { icon: "tube", title: "CRT tube TVs and CRT monitors" },
            { icon: "printer", title: "Printers, copiers, scanners and fax machines" },
            { icon: "smartphone", title: "Cell phones and other handheld devices" },
            { icon: "plug", title: "Keyboards, mice, remotes, cables, chargers and network switches" },
            { icon: "cpu", title: "Microwaves and other small electronics" },
            { icon: "printer", title: "Large office equipment" },
          ],
        },
        {
          kind: "note",
          body: [
            `Odd or oversized e-scrap is reviewed on a case-by-case basis, so tell us what you have when you schedule. The complete list is on our [electronics recycling page](${href('/electronic-recycle/')}).`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Electronics Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Prepare your devices",
              body: "Save any files you need, log out of accounts, and bundle each cord with its device.",
            },
            {
              title: "Choose a service",
              body: "Arrange a drop-off, request a business pickup, or order a mail-in kit for a small load.",
            },
            {
              title: "Hand over your electronics",
              body: "Bring your items to Park 800 Drive, prepare them for the scheduled business pickup, or ship an eligible mail-in kit.",
            },
            {
              title: "Processing and recovery",
              body: "Equipment is sorted and processed so reusable materials, including metals, plastics, and circuit boards, can be recovered.",
            },
            { title: "Keep your records", body: "A recycling certificate is issued when the job is complete." },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Electronics Recycling Options in Greenwood",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "If you're looking for electronics recycling near you in Greenwood, Center Grove, Whiteland or Southport, our Park 800 Drive center is a short drive off US-31 and I-65.",
            "Residential customers and businesses can bring accepted electronics to the center on weekdays from 7:00 AM to 2:00 PM. Calling ahead to schedule a time is preferred, especially for a pallet or a truckload.",
            `The center also handles related materials, including [batteries](${href('/battery-recycling/')}), [light bulbs](${href('/light-bulbs/')}), ballasts, light fixtures, and mercury devices. Contact the team ahead of time to confirm acceptance requirements for your specific items.`,
            `See all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Offices, schools, clinics, manufacturers, warehouses and IT teams can schedule pickup within about 100 miles of Greenwood. That includes Indianapolis, Franklin, Shelbyville, Columbus, Plainfield, Martinsville, Bloomington and Muncie.",
            `Pickup is for business customers. In your quote request, list the equipment types, an estimated count or pallet total, and the site address. Also flag any drives that need [hard drive destruction](${href('/hard-drive-destruction-services/')}).`,
          ],
          buttons: {
            primary: { label: "Request an Electronics Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            "If it's just a couple of phones, a laptop, or a bag of chargers, order a prepaid [e-waste recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), pack it, and drop it at FedEx.",
            `Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before ordering. TVs, copiers and other large items should go to the Greenwood center or be arranged for pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Disposal Rules in Indiana",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Since January 1, 2011, Indiana households, public and charter schools, and small businesses haven't been allowed to throw away TVs, computer monitors, computers, printers, and other covered electronics. Larger businesses have their own rules: IDEM requires CRTs thrown out by those businesses to travel on a hazardous waste manifest to a licensed hazardous waste landfill, while e-waste sent for recycling is exempt from those rules when it's managed properly.",
            "Nearby public options are limited, mostly to residents:",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "landmark",
              title: "Johnson County",
              body: "The county electronics drop-off at 900 Arvin Road in Franklin serves Johnson County residents only, doesn't take business drop-offs, and charges a fee for TVs and monitors.",
            },
            {
              icon: "landmark",
              title: "Johnson County events",
              body: "Free collection days are for county residents and don't accept TVs or monitors.",
            },
            {
              icon: "landmark",
              title: "Indianapolis",
              body: "ToxDrop sites and Tox-Away Days are aimed at Marion County residents.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Sources: [IDEM: Electronic Waste](https://www.in.gov/idem/recycle/electronic-waste/), [IDEM: Indiana Regulations Affecting E-Waste](https://www.in.gov/idem/recycle/electronic-waste/indiana-regulations-affecting-electronic-waste-e-waste), [Johnson County Electronics Recycling (Earth911)](https://search.earth911.com/location/Q1RQNVJaXl9HUg/), [Daily Journal](https://dailyjournal.net/?p=1814099), [Marion County Wellness & Environmental Coalition](https://mcwec.org/2023/09/combined-tox-away-day-this-saturday-free/).",
            "Our Greenwood center takes the business loads, CRTs, and out-of-county drop-offs those programs can't, from anyone who stops in.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Electronics Recycling in Greenwood",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              body: "A south-side Indianapolis location on Park 800 Drive, close to US-31 and I-65",
            },
            { icon: "layers", body: "Drop-off open to everyone on weekdays, with scheduled visits preferred" },
            { icon: "tv", body: "CRT TVs and monitors accepted, along with flat screens" },
            { icon: "tv", body: "Monitors stripped of lead and circuit boards sent for metal recovery" },
            { icon: "truck", body: "Business pickup within about 100 miles, from Indianapolis to Bloomington" },
            {
              icon: "thermometer",
              body: "Batteries, bulbs, ballasts and mercury devices taken on the same trip",
            },
            {
              icon: "clock",
              body: "A minority-owned recycler with a zero-landfill commitment, in business since 1993",
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
      { q: "Is electronics recycling free in Greenwood?", a: "Pricing varies with what you bring and how much of it. Call (317) 888-3889 or request a quote before you come in." },
      { q: "Can I drop off without an appointment?", a: "Drop-off is available during weekday hours, though scheduling ahead is preferred so the loading area is ready for you." },
      { q: "Do you collect from businesses in Carmel and Fishers?", a: "Yes. Both are well within our roughly 100-mile pickup area. Confirm your address when you book." },
      { q: "Can my company recover value from retired IT equipment?", a: "Ask about our IT asset disposition service, which is designed to get value back from retired hardware." },
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
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Greenwood",
    body: ["Schedule a drop-off at our Park 800 Drive center, order a mail-in kit for a few devices, or request a quote for business pickup anywhere in Central Indiana.", "Greenwood: (317) 888-3889 | Toll-free: (866) 375-7340"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Greenwood", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Greenwood reviews are supplied", "Business pickup: the doc has one quote button, a Schedule a Pickup button added beside it as on the other pages"],
}
