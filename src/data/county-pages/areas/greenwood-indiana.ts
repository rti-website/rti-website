import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Greenwood, Indiana, /greenwood-indiana/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:67597, phone 7084:67924 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const GREENWOOD_INDIANA: CountyPage = {
  url: "/greenwood-indiana/",
  state: "Indiana",
  county: "Greenwood",
  service: "Light Bulb Recycling",
  figma: { board: "7084:67597", phone: "7084:67924" },
  seo: {
    title: "Recycling Services in Greenwood | Call (800) 969-5166",
    description: "Recycling services Greenwood organizing drop-off and pickup for electronics, lighting debris, battery groups, paper materials, and approved waste streams. Call (800) 969-5166",
  },
  hero: {
    h1: "Greenwood, Indiana",
    crumb: "Greenwood, Indiana",
    lead: "Recycling services Greenwood organizing drop-off and pickup for electronics, lighting debris, battery groups, paper materials, and approved waste streams. Call (800) 969-5166",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Electronics Recycling Services in Greenwood, Indiana",
    blocks: [
      { p: "Are you tired of seeing old electronics cluttering up your space? Recycle Technologies brings eco-friendly electronics recycling services to Greenwood, Indiana. We take care of everything from outdated computers and laptops to TVs, mobile phones, and large office equipment, ensuring each item is handled with precision and care." },
      { p: "Our sophisticated process dismantles these devices to recover valuable materials like rare earth metals, significantly mitigating the environmental impact of discarded electronics. Understanding the long-term dangers of improper e-waste disposal, we're passionate about driving responsible change in Indiana. Our services cater to businesses and individuals who wish to declutter their spaces responsibly while adhering to environmental regulations and supporting sustainable practices. Partner with us to make a positive difference in our community." },
      { h: "Battery Recycling Services in Greenwood, Indiana" },
      { p: "Have you ever wondered what happens to the batteries you throw away? In Greenwood, Indiana, our Battery Recycling Services ensure safe disposal of all types of batteries. From everyday household batteries to substantial industrial units, our comprehensive program guarantees every component is meticulously processed and recycled. Discarding batteries in landfills is a major environmental hazard, whether they come from homes or offices. Our team of experts ensures that hazardous materials are prevented from contaminating the environment, while also recovering valuable resources for reuse. By choosing Recycle Technologies, you not only reduce landfill waste but also support sustainable resource management. Join us in our mission to make a substantial environmental impact and lead the charge for a greener future in Indiana and beyond." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local minority-owned recycling company offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Greenwood, Indiana", blocks: [
      { p: "Is your drawer overflowing with dead light bulbs? In Greenwood, Indiana, Recycle Technologies offers a hassle-free solution for bulb disposal. We understand the confusion around disposing of them properly, but you don’t have to worry anymore—we’re here to help. Our service provides safe and eco-friendly fluorescent bulb recycling throughout Indiana. Whether you’re in Greenwood or anywhere else in the state, we ensure that old bulbs meet a responsible and eco-friendly end. Choosing our Bulb Recycling service means convenience for you and a positive step for the environment by keeping harmful materials out of landfills. Let's work together to create a brighter, greener future for everyone!" },
      { h2: "Our Environmental Responsibility" },
      { p: "What makes Recycle Technologies stand out? Alongside our subsidiaries, Lighting Resources and EZ on the Earth, we lead in advanced recycling practices. Using state-of-the-art technology, we maximize material recovery, drastically reducing landfill waste and environmental harm. Our unwavering commitment to sustainability turns e-waste and other materials into reusable resources, fostering a circular economy." },
      { p: "Our cutting-edge processes not only reclaim valuable materials but also minimize ecological damage. As dedicated environmental advocates, we continuously innovate in waste management, providing comprehensive services for businesses and consumers alike. By partnering with us, you support a cleaner, healthier, and more sustainable future. For more information, reach out to our Indiana branch manager, at 317-888-3889. Let's make a difference together!" },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx." },
    ] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Matt Terrell" },
      { kind: 'phone', text: "(317) 888-3889", tel: "+13178883889", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
