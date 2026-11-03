import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Ocala, FL — /florida/ocala/ballast-recycling/
 * Management sheet "all plan rti 1", Florida tab; copy from the content
 * team's Google Doc "Ocala Ballast Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const OCALA_BALLAST_RECYCLING: LocalPage = {
  url: href('/florida/ocala/ballast-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Ballast Recycling in Ocala, FL | Recycle Technologies",
    description: "Recycle PCB and non-PCB ballasts in Ocala, FL. Book partner-location drop-off, arrange commercial pickup, or order a mail-in kit for non-PCB ballasts.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Ocala, FL", "Marion County, FL", "Florida"] },
  hero: {
    crumb: "Ballast Recycling in Ocala, FL",
    h1: "Ballast Recycling in Ocala, FL",
    body: ["Lighting ballast recycling for Ocala and North Central Florida, including PCB units. Drop off at our partner center on SW 16th Lane by appointment, arrange business pickup, or mail in non-PCB ballasts."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies handles old lighting ballasts through a partner recycling center in [Ocala](${href('/florida/ocala/')}), located at 1007 SW 16th Lane. The center accepts PCB and non-PCB ballasts, including magnetic, electronic, and HID types, as well as leaking units that are bagged and flagged when you book. Drop-offs are available Monday to Friday, 6:00 AM to 2:30 PM, by appointment. Businesses can arrange pickup within about 100 miles, while smaller quantities of non-PCB ballasts can be sent back in a prepaid kit. Recycling includes capacitor removal and metal recovery, with a Certificate of Recycling provided when the work is complete.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Ocala Partner Location Details",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ocala Recycling Center](${href('/florida/ocala/')}), a Recycle Technologies partner location`,
          rows: [
            {
              label: "Address",
              value: "[1007 SW 16th Lane, Ocala, FL 34471](https://www.google.com/maps/dir/?api=1&destination=1007+SW+16th+Lane%2C+Ocala%2C+FL+34471)",
            },
            { label: "Phone", value: "813-534-5735" },
            { label: "Hours", value: "Mon to Fri, 6:00 AM to 2:30 PM" },
            { label: "Call ahead", value: "An appointment is needed for every drop-off." },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            { icon: "pin", title: "Drop-off", body: "Open to businesses and residents" },
            {
              icon: "truck",
              title: "Commercial pickup",
              body: "For companies with bulk or recurring ballast loads, within about 100 miles",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid buckets for non-PCB ballasts only" },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts Accepted in Ocala",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "The Ocala partner center accepts several types of lighting ballasts, including units that some mail-back programs and recycling services do not handle.",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "cpu", title: "PCB ballasts pulled from older fluorescent fixtures" },
            { icon: "cpu", title: "Non-PCB ballasts" },
            { icon: "cpu", title: "Magnetic ballasts" },
            { icon: "cpu", title: "Electronic ballasts" },
            { icon: "cpu", title: "HID ballasts from metal halide and high-pressure sodium lights" },
            {
              icon: "cpu",
              title: "Leaking or tar-stained ballasts, sealed in a bag and mentioned when you book",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Is It a PCB Ballast?",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Is It a PCB Ballast?",
          body: [`See our main [ballast recycling](${href('/ballasts/')}) page for more on each type.`],
          panel: [
            "Check the label first. Fluorescent ballasts built through 1979 may hold PCBs in a small internal capacitor, and non-PCB models from the late 1970s on were supposed to carry a \"No PCBs\" marking. No label, or one you can't read? Handle it as a PCB ballast, and never open the case to check ([EPA](https://www.epa.gov/sites/default/files/2020-07/documents/pcb-flb-factsheet-final-july-2020.pdf)).",
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
              title: "Pick your route",
              body: "Book a drop-off at SW 16th Lane, request commercial pickup, or order a non-PCB mail-in kit.",
            },
            {
              title: "Separate PCB from non-PCB",
              body: "Use the label check above and pack the two groups in different containers.",
            },
            {
              title: "Bag anything leaking",
              body: "Seal a ballast with oily residue in heavy plastic, keep it apart from the rest, and say so when you call.",
            },
            {
              title: "Teardown and capacitor removal",
              body: "Each ballast is dismantled, and PCB or DEHP capacitors travel with a certified hazardous waste hauler to an EPA-approved incinerator.",
            },
            {
              title: "Recovery and records",
              body: "Copper and steel are reclaimed, plastics are reprocessed, and your Certificate of Recycling follows.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Recycling Options in Ocala, FL",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Need ballast recycling near you in Ocala or the surrounding Marion County area? Call (352) 509-3019 to set a time, then bring your ballasts to 1007 SW 16th Lane, by the 17th Street bridge just off the US-27, US-301, and US-441 corridor. Drop-offs are available on weekdays by appointment. Keep PCB and non-PCB ballasts in separate containers, and mention any leaking ones when you book.",
            `The center also accepts every type of [fluorescent lamp](${href('/light-bulbs/')}), so the tubes and ballasts from one retrofit can arrive in the same load. Other sites are listed on our [drop-off locations](${href('/dropoff/')}) page.`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Commercial Pickup",
          dark: true,
          body: [
            "Electrical contractors, facility managers, school districts, hospitals, hotels and retailers can schedule ballast pickup within about 100 miles of Ocala, from Belleview and Citra to Inverness, Leesburg and Gainesville.",
            "Pickup is a business service. In your quote request, give an approximate ballast count or weight, note whether any are PCB or leaking, and add the job site address.",
          ],
          buttons: {
            primary: { label: "Request a Ballast Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            `For a handful of non-PCB ballasts from a branch office or a single repair job, order a prepaid [non-PCB ballast kit](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Fill the bucket, seal it, and ship it back using the prepaid label. PCB and leaking ballasts can't go by mail, so book a drop-off or pickup for those. Read how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before ordering.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Ballast Disposal Rules in Florida",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Before choosing a disposal method, businesses should identify whether their old ballasts contain PCBs. Those units may be subject to specific handling and disposal requirements.",
            "The EPA calls in-service PCB ballasts a hazard that has outlived its designed life span, and it recommends getting them out of buildings as soon as possible. A ruptured or leaking unit can be expensive to clean up, and leaking PCB capacitors must be managed as PCB waste.",
            "For Florida businesses and building owners:",
          ],
        },
        {
          kind: "checks",
          items: [
            "Florida DEP says PCB waste above 50 ppm can't be disposed of at municipal solid waste facilities, which rules out the dumpster and the landfill.",
            "Once PCB ballasts come out of service, EPA rules give you nine months to get them to an approved disposal facility.",
            "County household hazardous waste programs in Florida generally turn away business waste, and few list ballasts at all.",
          ],
        },
        {
          kind: "note",
          body: [
            "Sources: [EPA](https://www.epa.gov/pcbs/disposal-fluorescent-light-ballasts-flb), [EPA fact sheet](https://www.epa.gov/sites/default/files/2020-07/documents/pcb-flb-factsheet-final-july-2020.pdf), [Florida DEP](https://floridadep.gov/waste/permitting-compliance-assistance/content/mercury-permitting-and-registration), [Marion County](https://www.marionfl.org/agencies-departments/departments-facilities-offices/solid-waste/materials-accepted-at-recycling-centers).",
            "Marion County's recycling centers don't list ballasts, and businesses that don't pay the county's solid waste assessment can't use them. The Ocala partner center accepts PCB and non-PCB ballasts from anyone who books ahead.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Recycle Technologies for Ballast Recycling",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              title: "Options for different ballast types",
              body: "Arrange recycling for PCB, non-PCB, magnetic, electronic, and HID ballasts through one partner location",
            },
            {
              icon: "cpu",
              title: "Support for difficult loads",
              body: "Leaking and HID ballasts can be discussed when booking",
            },
            {
              icon: "truck",
              title: "Convenient service routes",
              body: "Choose weekday drop-off by appointment, commercial pickup within about 100 miles of Ocala, or mail-in kits for non-PCB ballasts",
            },
            {
              icon: "bulb",
              title: "Lighting project support",
              body: "Recycle fluorescent lamps and ballasts from the same retrofit",
            },
            {
              icon: "file",
              title: "Recycling documentation",
              body: "Receive a Certificate of Recycling when the job is complete",
            },
            {
              icon: "clock",
              title: "Established experience",
              body: "Work with a recycler operating since 1993",
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
      { q: "Is ballast recycling free in Ocala?", a: "Cost depends on the number of ballasts and whether any contain PCBs. Call 813-534-5735 or request a quote before your visit." },
      { q: "Can I sell old ballasts to a scrap yard instead?", a: "Not PCB ones. PCB ballasts have to go to an approved facility, not a metal scrap pile." },
      { q: "Do you serve job sites in Dunnellon and The Villages?", a: "Yes. Both fall inside the pickup area around Ocala. Confirm the address when you book." },
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
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Ballast Recycling in Ocala, FL",
    body: ["Book a drop-off at the Ocala partner center, mail in a bucket of non-PCB ballasts, or request a quote for commercial pickup on your next relamp or retrofit.", "Call 813-534-5735"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in Ocala", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ocala reviews are supplied", "FAQ \"Do I need to remove ballasts from the fixtures first?\" left out (answer is a placeholder in the doc)", "Phone: the doc gives 813-534-5735, and (352) 509-3019 in the drop-off paragraph (both kept as written", "confirm which is right)"],
}
