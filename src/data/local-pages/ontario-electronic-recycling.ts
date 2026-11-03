import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Ontario, CA — /california/ontario/electronic-recycling/
 * Management sheet "all plan rti 1", California tab; copy from the content
 * team's Google Doc "Ontario CA Electronics Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const ONTARIO_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/california/ontario/electronic-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Electronics Recycling in Ontario, CA | Recycle Technologies",
    description: "Electronics recycling in Ontario, CA: weekday drop-off off the 60 Freeway with no appointment, business pickup across the Inland Empire, and mail-in kits.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Ontario, CA", "San Bernardino County, CA", "California"] },
  hero: {
    crumb: "Electronics Recycling in Ontario, CA",
    h1: "Electronics Recycling in Ontario, CA",
    body: ["Electronics recycling for Ontario businesses and residents, with weekday drop-off, commercial pickup options, and prepaid mail-in kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies provides full-service electronics recycling at our [Ontario center](${href('/california/ontario/')}), 805 East Francis Street, just off the 60 Freeway. We take computers, laptops, servers, monitors, phones, printers, copiers and office equipment, plus TVs of every kind, from old CRT sets to LCD, LED and plasma screens. Businesses and residents can drop off on weekdays without an appointment, and companies can contact us about pickup or order a mail-in kit for a few devices. Lamps, batteries, and ballasts from the same cleanout can come along too.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Ontario Electronics Recycling Center",
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
              value: "From the 60, head to Francis Street and use the driveway between Campus Avenue and Bon View Avenue. Staff will direct you to the unloading area.",
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
              title: "Business pickup",
              body: "Contact the team to confirm availability for your site",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid e-waste kits for small quantities" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Take in Ontario",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Home office upgrades, warehouse IT refreshes, and building cleanouts all end with a pile of old equipment. The Ontario center handles:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "laptop",
              title: "Computers and IT equipment",
              body: "Desktop computers and laptops; servers and networking equipment",
            },
            {
              icon: "tv",
              title: "Displays",
              body: "Computer monitors; CRT televisions, including older sets that contain lead; LCD, LED and plasma TVs",
            },
            {
              icon: "printer",
              title: "Office equipment",
              body: "Printers, copiers, scanners and fax machines; larger office equipment",
            },
            { icon: "cpu", title: "Personal electronics", body: "Cell phones and other mobile devices" },
            {
              icon: "cpu",
              title: "Accessories and small electronics",
              body: "Keyboards, mice, remotes, cables, chargers and switches; microwaves and other small electronics",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Before You Drop Off a Device",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Before You Drop Off a Device",
          body: [
            `See our main [electronics recycling page](${href('/electronic-recycle/')}) for more on accepted items.`,
          ],
          panel: [
            `Back up anything you want to keep, sign out of accounts, and remove personal SIM or memory cards you plan to reuse. If a device holds sensitive business data, ask about our [hard drive destruction](${href('/hard-drive-destruction-services/')}) service before it goes into the recycling stream.`,
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "How Electronics Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Gather and prepare",
              body: "Collect the devices, keep power cords with their equipment, and clear personal data where you can.",
            },
            {
              title: "Pick a service",
              body: "Drive in on a weekday, request commercial pickup, or order a mail-in kit for a few small items.",
            },
            {
              title: "Hand it over",
              body: "Unload at Francis Street, have equipment staged for a scheduled pickup, or ship your kit.",
            },
            {
              title: "Breakdown and recovery",
              body: "Devices are sorted and dismantled. Plastic and wire are shredded, monitors go through lead decontamination, and circuit boards are separated so their metals can be reused.",
            },
            { title: "Documentation", body: "Ask about a recycling certificate for your records." },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Recycling Options in Ontario",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Looking for e-waste recycling near you in Ontario, Upland, Montclair or Chino? Our Francis Street center sits just south of Ontario International Airport, a quick hop off the 60. Doors open at 6:00 AM Monday through Friday, and you don't need an appointment, so it's an easy stop before work. Call ahead for a truckload or anything unusual so staff can be ready.",
            `The same visit can cover [batteries](${href('/battery-recycling/')}), [fluorescent lamps](${href('/light-bulbs/')}), [ballasts](${href('/ballasts/')}), aerosol cans, and mercury devices. Any mercury material collected in Ontario is sent to our Greenwood, IN retort facility.`,
            `View all [Recycle Technologies drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Offices, warehouses, distribution centers, schools, clinics, retailers, and property managers can contact us about electronics pickup. We serve businesses from Rancho Cucamonga, Fontana and Pomona to Riverside, Corona, Los Angeles and Anaheim, depending on the job.",
          ],
          listIntro: "When requesting a quote, include:",
          list: [
            "**Site address:** street, city and ZIP code",
            "**Equipment list:** device types, such as computers, servers, TVs or copiers",
            "**Quantity:** an estimated count, weight or number of pallets",
            `**Data needs:** whether any drives require [hard drive destruction](${href('/hard-drive-destruction-services/')})`,
            "**Project type:** a one-time cleanout, a scheduled program, or several locations",
            "**Timing and access:** your preferred pickup window, dock or elevator access, and any loading limits",
          ],
          buttons: {
            primary: { label: "Request an Electronics Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
          after: ["With those details, our team can confirm pickup and talk through scheduling and pricing."],
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a couple of phones, a laptop, or a bag of chargers, a prepaid [e-waste recycling kit](https://ezontheearth.com/collections/electronic-waste?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) can save you a trip. Review our [mail-in recycling program](${href('/mail-in-recycling/')}) and follow the packing instructions before you ship. TVs, copiers and other large items should come to Francis Street or go out on a pickup.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "E-Waste Disposal Guidance in California",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "California treats unwanted electronics, CRTs included, as universal waste, and the state's Department of Toxic Substances Control says e-waste can't go out with household trash. The rule covers homes and businesses alike ([DTSC](https://dtsc.ca.gov/electronic-hazardous-waste/)).",
            "Local household hazardous waste sites in Ontario and Rancho Cucamonga accept some electronics, but they keep weekend-only hours and serve residents, not businesses. Check your city's program before you go, or bring your electronics to our Ontario center any weekday.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Electronics Recycling in Ontario",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              title: "Inland Empire location",
              body: "A full-service center on Francis Street, minutes from the 60 and Ontario International Airport",
            },
            {
              icon: "calendar",
              title: "Early weekday hours",
              body: "Open from 6:00 AM, with no appointment needed",
            },
            { icon: "layers", title: "Every TV type", body: "CRT, LCD, LED and plasma sets, plus monitors" },
            {
              icon: "layers",
              title: "One stop for mixed loads",
              body: "Electronics, batteries, lamps, ballasts and mercury devices on the same trip",
            },
            {
              icon: "truck",
              title: "Business support",
              body: "Pickup for offices, warehouses and multi-site programs across the region",
            },
            {
              icon: "recycle",
              title: "Material recovery",
              body: "Lead removed from monitors and circuit boards sent for metal recovery",
            },
            {
              icon: "clock",
              title: "Since 1993",
              body: "A minority-owned recycler with a zero-landfill commitment",
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
      { q: "Is electronics recycling free in Ontario?", a: "Charges depend on the items and quantity. Call (909) 923-7252 or request a quote before you come in." },
      { q: "Do I pay California's e-waste fee when I recycle?", a: "No. That fee is collected when certain devices are bought in California, not when they're recycled (CalRecycle)." },
      { q: "Is the Ontario center open on weekends?", a: "No. Drop-off runs Monday to Friday, 6:00 AM to 2:30 PM." },
      { q: "Can a company in Orange County or the San Gabriel Valley book pickup?", a: "Often, yes. Send the site address through our quote form so the team can confirm." },
      { q: "Can my company get value back from retired IT equipment?", a: "Ask about our IT asset disposition service, which focuses on recovering value from retired hardware." },
      { q: "What about electronics with built-in batteries?", a: "Bring them in, and tell staff about any swollen or damaged batteries when you arrive." },
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
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "All Drop-Off Locations", href: href('/dropoff/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Ontario",
    body: ["Clearing out an office, a warehouse or a garage? Stop by Francis Street any weekday, order a mail-in kit for a few devices, or send us your address and equipment list for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Ontario", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ontario reviews are supplied", "The doc's URL line (/electronics-recycling-ontario-ca/) not used: the sheet's URL is", "The doc's five \"We Take\" sub-lists drawn as five cards (category, then its items)"],
}
