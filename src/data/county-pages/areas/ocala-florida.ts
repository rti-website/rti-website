import { PICKUP_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Ocala, Florida, /ocala-florida/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:68694, phone 7084:69020 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const OCALA_FLORIDA: CountyPage = {
  url: "/ocala-florida/",
  state: "Florida",
  county: "Ocala",
  service: "Light Bulb Recycling",
  figma: { board: "7084:68694", phone: "7084:69020" },
  seo: {
    title: "Recycling in Ocala, Florida | Call (800) 969-5166",
    description: "Recycling services Ocala coordinating receipt of electronics, lamp debris, mixed battery groups, paper volumes, and approved items for proper routing. Call (800) 969-5166",
  },
  hero: {
    h1: 'Recycle Technologies Ocala, FL',
    crumb: "Ocala",
    /* Home / Locations / Florida / Ocala (14 Oct 2026, the state hub brief). */
    parent: { label: "Florida", href: href('/florida-recycling/') },
    lead: "Florida Bulb Processing Facility, 1007 SW 16th Lane, Ocala, FL 34471",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  // 20 Oct 2026, the facility content doc (Aaqib): address, phone, hours, Getting Here, what it accepts, drop-off, FAQ and county.
  quickInfo: [
    { glyph: 'pin',   label: "Address", value: "1007 SW 16th Lane, Ocala, FL 34471", href: "https://www.google.com/maps/dir/?api=1&destination=1007+SW+16th+Lane%2C+Ocala%2C+FL+34471" },
    { glyph: 'phone', label: "Phone", value: "(813) 534-5735", href: "tel:+18135345735" },
    { glyph: 'clock', label: "Hours", value: "Mon to Fri, 8am to 4pm" },
  ],
  directions: {
    heading: "Getting Here",
    intro: "Enter via the main lot on SW 16th Lane. Staff will direct you to the drop-off area upon arrival.",
    introShort: "Enter via the main lot on SW 16th Lane. Staff will direct you to the drop-off area upon arrival.",
    rows: [
      { label: "Nearest Highway", value: "US-27 / US-301 / US-441" },
      { label: "Parking", value: "Beside the 17th Street bridge, next to Fakhoury Chiropractic" },
      { label: "Drop-off Entrance", value: "Beside the 17th Street bridge, next to Fakhoury Chiropractic" },
    ],
    primary: "Get Directions",
    secondary: "Call This Location",
    name: "Florida Bulb Processing Facility",
    address: "1007 SW 16th Lane, Ocala, FL 34471",
    tel: "+18135345735",
    mapsHref: "https://www.google.com/maps/dir/?api=1&destination=1007+SW+16th+Lane%2C+Ocala%2C+FL+34471",
  },
  about: {
    heading: "Electronics Recycling Services in Ocala, Florida",
    blocks: [
      { p: "Recycle Technologies offers reliable electronics recycling services in Ocala, Florida, focusing on the eco-friendly disposal of e-waste. We meticulously handle a wide range of electronic items, from outdated computers and laptops to TVs, mobile phones, and large office equipment. Our process involves dismantling these devices to recover valuable materials like rare earth metals, significantly reducing the environmental impact of discarded electronics. We understand the long-term dangers of improper e-waste disposal, so we're dedicated to promoting responsible change in Florida. Our services are perfect for businesses and individuals aiming to responsibly declutter their spaces while adhering to environmental regulations and supporting sustainable practices." },
      { h: "Battery Recycling Services in Ocala, Florida" },
      { p: "Our Battery Recycling Services in Ocala, Florida are crucial for the safe disposal of all battery types in the area. From everyday household batteries to large industrial units, our comprehensive program ensures each component is meticulously processed and recycled. Carelessly discarding batteries into landfills poses a significant environmental threat, whether they come from homes or offices. Our dedicated team of experts prevents hazardous materials from contaminating the environment while recovering valuable resources for reuse. By choosing Recycle Technologies, you actively reduce landfill waste and support sustainable resource management. Join us in making a substantial environmental impact and leading the charge for a greener future for Florida and beyond." },
    ],
  },
  sections: [
    // 20 Oct 2026, the facility content doc.
    { kind: 'text', heading: "What This Location Accepts", blocks: [{ p: "All lamps, batteries, ballasts, PCB ballasts, electronics, scrap metal, mercury devices, elemental mercury" }] },
    { kind: 'text', heading: "Dropping Off at This Location", blocks: [{ p: "Beside the 17th Street bridge, next to Fakhoury Chiropractic" }] },
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local minority-owned recycling company offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Ocala, Florida", blocks: [
      { p: "Are you looking to finally clear out that drawer full of dead light bulbs in Ocala, Florida? We understand the struggle! Figuring out how to dispose of them properly can be a hassle, but fret no more! Recycle Technologies is here to be your Ocala bulb disposal hero. We're your one-stop shop for safe and eco-friendly fluorescent bulb recycling in Florida. Whether you're right here in Ocala or anywhere else in the Sunshine State, we can help you give those old bulbs a responsible and eco-friendly end. Choosing our Bulb Recycling service in Florida is a double win: it's convenient for you and good for the planet by keeping harmful materials out of landfills. Let's build a brighter, greener future for all of us!" },
      { h2: "Our Environmental Responsibility" },
      { p: "Recycle Technologies and its subsidiaries, Lighting Resources and EZ on the Earth, lead in advanced recycling practices. Utilizing modern technology, we maximize material recovery, significantly reducing landfill waste and environmental harm. Committed to sustainable practices, we transform e-waste and other materials into reusable resources, promoting a circular economy." },
      { p: "Our processes not only reclaim valuable materials but also minimize ecological damage. As environmental advocates, we continually innovate in waste management, offering comprehensive services that cater to both businesses and consumers. Choosing us means supporting a cleaner, healthier, and sustainable future. For more information, contact Buff Fritz, our Florida branch manager, at 352-509-3001." },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx." },
    ] },
    // 20 Oct 2026, the facility content doc.
    { kind: 'faq', heading: "Questions About This Location", items: [
      { q: "Is there a fee for dropping off at this location?", a: "Fees depend on the material and the quantity. Call (813) 534-5735 with a description of what you plan to bring, and we will confirm any charges before you make the trip." },
      { q: "Do I need an appointment to drop off at the Ocala facility?", a: "Drop-off requirements vary by material and quantity. Call (813) 534-5735 before you visit to confirm what you are bringing is accepted and whether a time needs to be arranged. Large or commercial loads in particular go faster when the loading area is expecting you." },
      { q: "Can businesses schedule a bulk pickup from this facility?", a: "Yes. Business pickups are available within roughly a 100-mile radius of the facility. Pickup arrangements depend on the materials, quantity, location, and service required. Request a quote to get started." },
    ] },
    { kind: 'text', heading: "Counties We Serve", blocks: [{ list: [{ title: "Marion County", text: "" }] }] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Nick Nastav" },
      { kind: 'phone', text: "352-299-1307", tel: "+13522991307", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
