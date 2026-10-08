import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Lewisburg, Tennessee, /lewisburg-tennessee/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333, laid out like Johnson City (Buffalo), TN: the
 * old page had no hero heading, so the H1 and lead follow that page (H1
 * "Recycle Technologies Lewisburg, TN", lead = the meta description). The old
 * WordPress page's copy word for word (15 Sep 2026 backup), except: "Our
 * Environmental Responsibility" was on it twice in two wordings; the first
 * is kept. The contact card is its Business Pick-Up Service contact.
 */
export const LEWISBURG_TENNESSEE: CountyPage = {
  url: "/lewisburg-tennessee/",
  state: "Tennessee",
  county: "Lewisburg",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Recycling Services in Lewisburg | Call (800) 969-5166',
    description: "Recycling services Lewisburg directing intake of electronic equipment, lamp remnants, diverse battery groups, paper stock, and approved discards. Call (800) 969-5166",
  },
  hero: {
    h1: 'Recycle Technologies Lewisburg, TN',
    crumb: "Lewisburg, Tennessee",
    lead: "Recycling services Lewisburg directing intake of electronic equipment, lamp remnants, diverse battery groups, paper stock, and approved discards. Call (800) 969-5166",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Electronics Recycling Services in Lewisburg, Tennessee",
    blocks: [
      { p: "Recycle Technologies is proud to offer premier electronics recycling services in Lewisburg, Tennessee. We manage a wide array of electronic items, from old computers and laptops to televisions, mobile phones, and large office equipment, treating each piece with meticulous attention." },
      { p: "Our cutting-edge process involves breaking down these devices to recover valuable components like rare earth metals, thus greatly reducing the environmental footprint of electronic waste. Acknowledging the serious risks posed by improper e-waste disposal, we are committed to encouraging responsible practices throughout Tennessee. Our services cater to both businesses and individuals looking to responsibly clear out their spaces while complying with environmental guidelines and fostering sustainable habits. Join us in making a significant positive impact on our community." },
      { h: "Battery Recycling Services in Lewisburg, Tennessee" },
      { p: "In Lewisburg, Tennessee, Recycle Technologies provides essential battery recycling services that ensure the safe disposal of all battery types. From common household batteries to substantial industrial ones, our thorough program guarantees that each component is carefully processed and recycled." },
      { p: "Our expert team works diligently to prevent hazardous substances from polluting the environment while recovering valuable materials for reuse. By opting for Recycle Technologies, you contribute to reducing landfill waste and promoting sustainable resource management. Help us make a lasting environmental difference and lead the way toward a greener future for Tennessee and beyond." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local minority-owned recycling company offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Lewisburg, Tennessee", blocks: [
      { p: "If you have a drawer full of dead light bulbs in Lewisburg, Tennessee, Recycle Technologies has a hassle-free solution for you. Disposing of these bulbs properly can be tricky, but we’re here to make it easy." },
      { p: "Our service offers safe and eco-friendly recycling for fluorescent bulbs across Tennessee. Whether you’re in Lewisburg or elsewhere in the state, we ensure that old bulbs are disposed of in a responsible and environmentally friendly manner. Choosing our Bulb Recycling service means convenience for you and a better environment, as we keep harmful materials out of landfills. Together, we can create a brighter and greener future for everyone!" },
      { h2: "Our Environmental Responsibility" },
      { p: "What distinguishes Recycle Technologies? Alongside our subsidiaries, Lighting Resources and EZ on the Earth, we are at the forefront of advanced recycling techniques. Using the latest technology, we maximize the recovery of materials, significantly cutting down on landfill waste and environmental damage. Our firm commitment to sustainability converts e-waste and other materials into reusable resources, supporting a circular economy." },
      { p: "Our innovative methods not only reclaim valuable materials but also minimize ecological harm. As dedicated stewards of the environment, we continuously push forward in waste management, offering comprehensive services to both businesses and consumers. Partnering with us means you’re supporting a cleaner, healthier, and more sustainable future. For more details, visit our website. Let’s make a difference together!" },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx. [Buy Recycling Kits](mailin)" },
    ] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Keith Holt" },
      { kind: 'phone', text: "931-334-1265", tel: "+19313341265", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
