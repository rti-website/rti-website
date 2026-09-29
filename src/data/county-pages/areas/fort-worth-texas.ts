import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Fort Worth, Texas, /fort-worth-texas/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:78708, phone 7084:79033 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const FORT_WORTH_TEXAS: CountyPage = {
  url: "/fort-worth-texas/",
  state: "Texas",
  county: "Fort Worth",
  service: "Light Bulb Recycling",
  figma: { board: "7084:78708", phone: "7084:79033" },
  seo: {
    title: "Recycling Services in Texas | Call (800) 969-5166",
    description: "Recycling services Texas coordinating collection of electronic hardware, spent lighting, varied battery formats, paper volumes, and approved discards statewide. Call (800) 969-5166",
  },
  hero: {
    h1: "Fort Worth, Texas",
    crumb: "Fort Worth, Texas",
    lead: "Recycling services Texas coordinating collection of electronic hardware, spent lighting, varied battery formats, paper volumes, and approved discards statewide. Call (800) 969-5166",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Electronics Recycling Services in Fort Worth, Texas",
    blocks: [
      { p: "At Recycle Technologies, we are thrilled to offer top-tier electronics recycling services in Fort Worth, Texas. We understand how overwhelming it can be to deal with outdated electronics piling up, from old computers and laptops to televisions, mobile phones, and large office equipment. Each piece is treated with the utmost care and precision. Our innovative process breaks down these devices to recover precious materials like rare earth metals, significantly reducing the environmental footprint of electronic waste. We are deeply aware of the grave risks posed by improper e-waste disposal, and that's why we are dedicated to promoting responsible recycling practices in Texas. Our services are designed to help both businesses and individuals declutter their spaces responsibly while adhering to environmental regulations and fostering sustainable habits. Let's work together to create a cleaner, greener community." },
      { h: "Battery Recycling Services in Fort Worth, Texas" },
      { p: "In Fort Worth, Texas, Recycle Technologies is your go-to provider for comprehensive battery recycling services. From everyday household batteries to large industrial units, we ensure each component is meticulously processed and recycled, safeguarding our environment from harmful pollutants. Our passionate team works tirelessly to prevent hazardous substances from seeping into our soil and waterways, while also recovering valuable materials that can be reused. By choosing Recycle Technologies, you're taking a powerful step towards reducing landfill waste and supporting sustainable resource management. Join us in our mission to make a lasting environmental impact and lead Fort Worth towards a greener, brighter future." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local minority-owned recycling company offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Fort Worth, Texas", blocks: [
      { p: "Got a drawer full of dead light bulbs and not sure what to do with them? In Fort Worth, Texas, Recycle Technologies is here to save the day with our hassle-free bulb recycling service. We know that disposing of these bulbs correctly can be confusing and frustrating, but don't worry —we've got you covered. Our service provides a safe and eco-friendly way to recycle fluorescent bulbs throughout Texas. Whether you’re in Fort Worth or another part of the state, we make sure that old bulbs are handled responsibly and sustainably. Choosing our Bulb Recycling service means you’re making a convenient and environmentally conscious choice, keeping harmful materials out of landfills. Together, we can illuminate a path towards a greener, brighter tomorrow." },
      { h2: "Our Environmental Responsibility" },
      { p: "What sets Recycle Technologies apart is our unwavering commitment to sustainability. Together with our subsidiaries, Lighting Resources and EZ on the Earth, we lead the way in advanced recycling practices. Utilizing cutting-edge technology, we maximize the recovery of valuable materials, dramatically reducing landfill waste and environmental harm. We are passionate about turning e-waste and other discarded materials into reusable resources, championing a circular economy. Our innovative methods reclaim precious materials while minimizing ecological damage. As devoted guardians of the environment, we continuously strive to improve our waste management techniques, providing comprehensive services to both businesses and consumers. By partnering with us, you’re supporting a cleaner, healthier, and more sustainable world. For more information, reach out to Anne Rayl, our Texas branch manager, at 817-921-1440. Let’s join forces to make a significant difference!" },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx." },
    ] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Anne Ray" },
      { kind: 'phone', text: "817-751-6294", tel: "+18177516294", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
