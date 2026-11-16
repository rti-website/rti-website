import { QUOTE_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Williamston, South Carolina — /south-carolina/williamston/
 * The content team's Google Doc "Recycle Technologies Williamston, SC"
 * (1lV0qG_BQ8SfbdpOIWiq5-7I6yYaTNddZBafguG_0GGY), 16 Nov 2026. Aaqib: "these
 * are not ad pages, it's my services pages for new location as we previous
 * done for other SEO pages location" — so the facility page, in the facility
 * page design (as /kennesaw-georgia/), replaces the Google Ads page that sat
 * at this URL (11 to 16 Nov), and is indexed and in the locations sitemap.
 *
 * In the doc's order: hero (lead, Get a Quote, Call), the address / phone /
 * hours bar, Visit the Williamston Recycling Center (map row: Get Directions,
 * Call This Location), About (three sub-headings), Service Options (the four
 * service pages), Ready to Recycle? (the shared CTA banner, same heading),
 * Items We Accept, Serving Williamston and Upstate South Carolina, the FAQ,
 * and Recycle with Recycle Technologies (the contact card).
 *
 * The doc gives no SEO title or description; the ones below are written from
 * its H1 and first paragraph (flagged to Aaqib, 16 Nov 2026).
 */
const ADDRESS = '109 Twenty Nine Ct, Williamston, SC 29697'
const MAPS = 'https://www.google.com/maps/dir/?api=1&destination=109+Twenty+Nine+Ct%2C+Williamston%2C+SC+29697'
const sub = (slug: string) => href(`/south-carolina/williamston/${slug}/`)

export const WILLIAMSTON_SOUTH_CAROLINA: CountyPage = {
  url: "/south-carolina/williamston/",
  state: "South Carolina",
  county: "Williamston",
  service: "Recycling Services",
  figma: { board: "7084:69256", phone: "7084:69583" },
  seo: {
    title: "Recycle Technologies Williamston, SC | Recycling Center",
    description: "Recycle electronics, light bulbs, batteries, and ballasts at our Williamston, SC location, with scheduled business pickups across Upstate South Carolina.",
  },
  hero: {
    h1: "Recycle Technologies Williamston, SC",
    crumb: "Williamston",
    /* Home / Locations / South Carolina / Williamston (the hub doc's breadcrumb). */
    parent: { label: "South Carolina", href: href('/south-carolina/') },
    lead: "Recycle electronics, light bulbs, batteries, and ballasts at our Williamston location. We support businesses across Upstate South Carolina with reliable recycling services and scheduled pickups.",
    button: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Call +1 (864) 774-8310", href: "tel:+18647748310" },
  },
  quickInfo: [
    { glyph: 'pin',   label: "Address", value: ADDRESS, href: MAPS },
    { glyph: 'phone', label: "Phone", value: "+1 (864) 774-8310", href: "tel:+18647748310" },
    { glyph: 'clock', label: "Hours", value: "9:00 AM–4:00 PM" },
    { glyph: 'badge', label: "Email", value: "support@lightingresourcesinc.com", href: "mailto:support@lightingresourcesinc.com" },
  ],
  directions: {
    heading: "Visit the Williamston Recycling Center",
    intro: "Our Williamston location provides access to electronics, light bulb, battery, and ballast recycling services. Call before visiting so our team can confirm drop-off arrangements and accepted materials.",
    introShort: "Our Williamston location provides access to electronics, light bulb, battery, and ballast recycling services. Call before visiting so our team can confirm drop-off arrangements and accepted materials.",
    rows: [],
    primary: "Get Directions",
    secondary: "Call This Location",
    name: "Williamston Recycling Center",
    address: ADDRESS,
    tel: "+18647748310",
    mapsHref: MAPS,
  },
  about: {
    heading: "About Williamston Recycling Center",
    blocks: [
      { h: "Responsible Recycling in Upstate South Carolina" },
      { p: "Recycle Technologies provides recycling services for businesses in Williamston and surrounding Upstate South Carolina communities. Our Williamston location supports four core recycling services, helping businesses manage unwanted electronics, used lighting, batteries, and ballasts." },
      { h: "A Legacy of Responsible Recycling" },
      { p: "Recycle Technologies has provided recycling services since 1993. We work with businesses to arrange appropriate collection and recycling options for their materials, with a Certificate of Recycling available for completed services." },
      { h: "Convenient Access to Recycling Services" },
      { p: "Located at 109 Twenty Nine Ct, our Williamston team is available from 9:00 AM to 4:00 PM. Contact us to discuss the materials you need to recycle, arrange a business pickup, or confirm details before visiting." },
      { h2: "Service Options" },
      { list: [
        { title: "Electronics Recycling", text: `Recycle computers, laptops, monitors, printers, and other electronic equipment through our electronics recycling service. [Learn More About Electronics Recycling](${sub('electronic-recycling')})` },
        { title: "Light Bulb Recycling", text: `Recycle fluorescent tubes, CFLs, LED bulbs, HID lamps, and other accepted lighting materials. [Learn More About Light Bulb Recycling](${sub('light-bulb-recycling')})` },
        { title: "Battery Recycling", text: `We accept several battery types, including lithium-ion, alkaline, lead-acid, NiCd, button cell, and power tool batteries. [Learn More About Battery Recycling](${sub('battery-recycling')})` },
        { title: "Ballast Recycling", text: `Arrange recycling for PCB, non-PCB, electronic, and magnetic lighting ballasts from commercial lighting projects. [Learn More About Ballast Recycling](${sub('ballast-recycling')})` },
      ] },
    ],
  },
  /* The doc's Service Options are the four service pages (in About above),
     not the shared drop-off / pickup / mail-in cards. */
  noServices: true,
  sections: [
    { kind: 'text', heading: "Items We Accept", blocks: [
      { list: [
        { title: "Electronics", text: "Computers and laptops · Monitors and screens · Printers and office electronics · Other accepted electronic equipment" },
        { title: "Light Bulbs and Lamps", text: "Fluorescent tubes · CFL bulbs · LED lamps and tubes · HID lamps · UV and specialty lamps · Other accepted bulb types" },
        { title: "Batteries", text: "Lithium-ion batteries · Alkaline batteries · Lead-acid batteries · Nickel-cadmium (NiCd) batteries · Button cell batteries · Power tool batteries" },
        { title: "Lighting Ballasts", text: "PCB ballasts · Non-PCB ballasts · Electronic ballasts · Magnetic ballasts" },
      ] },
      { p: "Contact our team before bringing large quantities or unusual materials so we can confirm acceptance and handling requirements." },
    ] },
    { kind: 'text', heading: "Serving Williamston and Upstate South Carolina", blocks: [
      { p: "Our Williamston location supports businesses in Williamston, Greenville, Anderson, Spartanburg, and nearby Upstate South Carolina communities." },
      { p: "Businesses can contact us to discuss recycling requirements and arrange scheduled pickups for electronics, light bulbs, batteries, and ballasts." },
    ] },
    { kind: 'faq', heading: "Frequently Asked Questions", items: [
      { q: "Where is the Recycle Technologies Williamston location?", a: "We are located at 109 Twenty Nine Ct, Williamston, SC 29697. You can reach our team at +1 (864) 774-8310." },
      { q: "What are the operating hours?", a: "Our listed hours are 9:00 AM to 4:00 PM. Please call before visiting to confirm availability." },
      { q: "What materials can I recycle at the Williamston location?", a: "We offer electronics, light bulbs, batteries, and ballast recycling. Contact us to confirm whether we accept your specific materials." },
      { q: "Can businesses schedule a recycling pickup?", a: "Yes. Businesses across Upstate South Carolina can contact our team to arrange scheduled pickups for accepted materials." },
      { q: "Do you provide a Certificate of Recycling?", a: "Yes. A Certificate of Recycling is available for completed recycling services." },
      { q: "Do I need an appointment before visiting?", a: "Please call +1 (864) 774-8310 before visiting to confirm drop-off arrangements and any requirements for your materials." },
    ] },
  ],
  company: {
    name: "Recycle with Recycle Technologies",
    text: "From electronics and lighting to batteries and ballasts, our Williamston team helps businesses across Upstate South Carolina manage unwanted materials through responsible recycling services. Contact us today to request a quote or discuss your recycling needs.",
    lines: [
      { kind: 'phone', text: "+1 (864) 774-8310", tel: "+18647748310" },
      { kind: 'email', text: "support@lightingresourcesinc.com" },
      { kind: 'hours', text: "9:00 AM–4:00 PM" },
    ],
  },
}
