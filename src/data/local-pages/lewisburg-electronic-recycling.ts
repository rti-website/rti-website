import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Electronics Recycling in Tennessee — /tennessee/lewisburg/electronic-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Lewisburg tab).
 * Copy: the content team's Google Doc "Tennessee Electronics Recycling Page", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const LEWISBURG_ELECTRONIC_RECYCLING: LocalPage = {
  url: href('/tennessee/lewisburg/electronic-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Electronics Recycling in Tennessee | Recycle Technologies",
    description: "Recycle computers, TVs, servers, and office electronics at our Johnson City and Lewisburg, TN sites, or book business pickup. Mail-in kits too.",
  },
  schema: { service: "Electronics Recycling", areaServed: ["Lewisburg, TN", "Johnson City, TN", "Tennessee"] },
  hero: {
    crumb: "Electronics Recycling in Tennessee",
    h1: "Electronics Recycling in Tennessee",
    body: [
      "Electronics recycling for Tennessee businesses, with drop-off sites in Johnson City and Lewisburg, scheduled business pickup, and mail-in kits for smaller loads.",
      "Recycle Technologies recycles computers, laptops, servers, monitors, TVs, printers, copiers, phones and other electronics at two Tennessee sites: 2212 Buffalo Road in Johnson City, serving East Tennessee, and 1580 Old Columbia Road in Lewisburg, serving Middle Tennessee. Businesses can drop off during weekday hours or book pickup within roughly 100 miles of our Johnson City facility. Offices without a site nearby can send small electronics back in a prepaid mail-in kit. Every load is sorted, dismantled and separated so metals, plastics, and circuit boards return to manufacturing instead of a landfill. A Certificate of Recycling documents the job.",
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Tennessee Drop-Off Locations",
      grey: false,
      blocks: [
        { kind: "h3", text: "Lewisburg (Middle Tennessee)" },
        { kind: "text", body: [`[Lewisburg Recycling Center](${href('/tennessee/lewisburg/')})`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1580 Old Columbia Road, Lewisburg, TN 37091](https://www.google.com/maps/dir/?api=1&destination=1580+Old+Columbia+Road%2C+Lewisburg%2C+TN+37091)" },
            { label: "Phone", value: "615-214-4768" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 4:00 PM" },
        ] },
        { kind: "h3", text: "Johnson City (East Tennessee)" },
        { kind: "text", body: [`[Johnson City Recycling Center](${href('/johnson-city-buffalo-tennessee/')})`] },
        { kind: "info", rows: [
            { label: "Address", value: "2212 Buffalo Road, Suite 210, Johnson City, TN 37604" },
            { label: "Phone", value: "423-328-7012" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 3:00 PM" },
            { label: "Getting there", value: "Off I-26. Staff direct drop-off traffic on arrival." },
        ] },
        { kind: "h3", text: "Both Sites" },
        { kind: "info", rows: [
            { label: "Commercial pickup", value: "For businesses with bulk or recurring electronics." },
            { label: "Mail-in", value: "A prepaid electronic scrap kit for small quantities, shipped anywhere." },
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Electronics We Accept in Tennessee",
      grey: true,
      blocks: [
        { kind: "text", body: ["Office refreshes, school upgrades and facility cleanouts usually produce a mix. We take all of it in one load:"] },
        { kind: "bullets", rows: [
            ["Desktop computers, laptops and servers", "Monitors, including older CRT monitors"],
            [`[TVs](${href('/tv-recycling/')}) of every type`, "Printers, copiers, scanners and fax machines"],
            ["Cell phones and other mobile devices", "Keyboards, mice, cables, chargers, switches and remotes"],
            ["Microwaves and other small electronics"],
        ] },
        { kind: "text", body: ["Other e-scrap is reviewed case by case. Call your nearest site and describe what you have."] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Electronics Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Pick a route", body: ["Drop off in Johnson City or Lewisburg, schedule a business pickup, or order a mail-in kit."] },
              { n: 2, title: "Tell us what's coming", body: ["List the equipment types and a rough pallet count when you request a quote."] },
              { n: 3, title: "We sort by type", body: ["Computers, monitors, televisions, and office equipment are separated on arrival."] },
            ],
            [
              { n: 4, title: "Devices come apart", body: ["Plastics and wiring are separated, monitors are decontaminated for lead, and circuit boards are pulled for metal recovery."] },
              { n: 5, title: "Get your paperwork", body: ["Plastic and wire go to molders and smelters, and you receive a Certificate of Recycling for your records."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Electronics Recycling Options in Tennessee",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: [`Looking for electronics recycling near you in East or Middle Tennessee? Bring equipment to Johnson City or Lewisburg during weekday hours. Call the site before a large load so the dock is ready. The Johnson City site also takes [fluorescent lamps](${href('/light-bulbs/')}), [batteries](${href('/battery-recycling/')}), [ballasts](${href('/ballasts/')}), mercury devices and aerosols, so a full facility cleanout can leave in one trip.`] },
        { kind: "h3", text: "Commercial Pickup" },
        { kind: "text", body: ["Offices, schools, healthcare practices, manufacturers and property managers can schedule pickup within roughly 100 miles of our Johnson City or Lewisburg facility, covering nearby areas across East and Middle Tennessee. Pickup is a business service. When you request a quote, list the equipment, an estimated pallet count, and your address. We'll confirm scheduling and pricing for your location."] },
        { kind: "buttons", primary: { label: "Request a Pickup Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: [`For a satellite office or a few stray devices, order a prepaid [electronic scrap recycling kit](https://ezontheearth.com/collections/all?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits). Pack laptops, phones, tablets, and other small electronics, then ship the kit back with the included return label. You'll get a certificate of recycling after processing. Check our [mail-in recycling program](${href('/mail-in-recycling/')}) first, since some items carry shipping restrictions.`] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Electronics Disposal in Tennessee Cities",
      grey: false,
      blocks: [
        { kind: "text", body: ["Public e-waste programs across Tennessee are built for households, not businesses:"] },
        { kind: "bullets", rows: [
            ["**Nashville:** Metro code keeps electronic waste out of trash containers. The city's three convenience centers take residential electronics from Davidson County residents only and turn away electronics from any business. (Metro Nashville)", "**Johnson City:** The city keeps one e-waste receptacle at its Solid Waste Services site on New Street. (City of Johnson City)"],
            ["**Lewisburg and Marshall County:** County convenience centers don't accept commercial or hazardous waste. (Marshall County)"],
        ] },
        { kind: "text", body: [`That leaves businesses, schools and institutions to find their own recycler. Our two Tennessee sites, business pickup and mail-in kits fill that gap. See all our [drop-off locations](${href('/dropoff/')}).`] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Electronics Recycling in Tennessee",
      grey: true,
      blocks: [
        { kind: "bullets", rows: [
            ["Two Tennessee drop-off sites, one in East Tennessee and one in Middle Tennessee", "Computers, servers, TVs and office equipment accepted in mixed loads"],
            ["Lamps, batteries and ballasts accepted alongside electronics in Johnson City", "Business pickup within roughly 100 miles of Johnson City"],
            ["Prepaid mail-in kits for branch offices anywhere in the state", "A Certificate of Recycling for every completed job"],
            ["A minority-owned recycler serving businesses since 1993"],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "Is electronics recycling free in Tennessee?", a: "Charges depend on the material and quantity. Call your nearest site or request a quote for pricing before you bring anything in." },
      { q: "Does recycling a computer erase the data on it?", a: "No. Wipe or remove drives first, or ask about our hard drive destruction service when you book." },
      { q: "Are the Tennessee sites open on Saturdays?", a: "No. Both Johnson City and Lewisburg take drop-offs Monday through Friday only." },
      { q: "Do you pick up in Kingsport and Bristol?", a: "Both fall within the roughly 100-mile pickup area around our Johnson City facility. Confirm your address when you request a quote." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Hard Drive Destruction", href: href('/hard-drive-destruction-services/') },
            { label: "TV Recycling", href: href('/tv-recycling/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Electronics Recycling in Tennessee",
    body: ["Drop off in Johnson City or Lewisburg, order a mail-in kit for a small batch, or request a quote for business pickup.", "Johnson City 423-328-7012 | Lewisburg 615-214-4768"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Electronics Pickup in Tennessee", href: PICKUP_HREF },
  },
  todo: ["Lewisburg \"Drop-off access\" row left out (the doc says [CONFIRM: open to all businesses and residents, or account holders only])", "The doc is Tennessee-wide (both sites)", "it sits at the Lewisburg URL as the sheet asks"],
}
