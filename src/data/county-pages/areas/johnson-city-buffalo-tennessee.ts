import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Johnson City (Buffalo), Tennessee, /johnson-city-buffalo-tennessee/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:69820, phone 7084:70147 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const JOHNSON_CITY_BUFFALO_TENNESSEE: CountyPage = {
  url: "/johnson-city-buffalo-tennessee/",
  state: "Tennessee",
  county: "Johnson City",
  service: "Light Bulb Recycling",
  figma: { board: "7084:69820", phone: "7084:70147" },
  seo: {
    title: "Recycling Services in Johnson City Buffalo | Call (800) 969-5166",
    description: "Recycling services Johnson City Buffalo supporting intake of electronic equipment, lighting waste, battery varieties, paper materials, and approved items. Call (800) 969-5166",
  },
  hero: {
    h1: "Johnson City (Buffalo), Tennessee",
    crumb: "Johnson City (Buffalo), Tennessee",
    lead: "Recycling services Johnson City Buffalo supporting intake of electronic equipment, lighting waste, battery varieties, paper materials, and approved items. Call (800) 969-5166",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Electronics Recycling Services in Johnson City (Buffalo), Tennessee",
    blocks: [
      { p: "Do you have old electronics piling up and don't know what to do with them? Recycle Technologies offers top-notch electronics recycling services right here in Johnson City (Buffalo), Tennessee. We handle everything from outdated computers and laptops to TVs, mobile phones, and large office equipment, ensuring each item is treated with the utmost care. Our advanced process dismantles these devices to recover precious materials like rare earth metals, significantly reducing the environmental impact of discarded electronics. Recognizing the severe risks of improper e-waste disposal, we're dedicated to driving responsible change in Tennessee. Our services are perfect for businesses and individuals looking to responsibly declutter their spaces while complying with environmental regulations and promoting sustainable practices. Join us in making a positive impact in our community." },
      { h: "Battery Recycling Services in Johnson City (Buffalo), Tennessee" },
      { p: "Ever wondered about the fate of your discarded batteries? In Johnson City (Buffalo), Tennessee, our Battery Recycling Services ensure the safe disposal of all battery types. From everyday household batteries to large industrial units, our comprehensive program meticulously processes and recycles each component." },
      { p: "Tossing batteries into landfills poses a significant environmental hazard, regardless of their source— home or office. Our expert team ensures that hazardous materials are kept from contaminating the environment while recovering valuable resources for reuse. Choosing Recycle Technologies means reducing landfill waste and supporting sustainable resource management. Help us make a substantial environmental impact and lead the charge for a greener future in Tennessee and beyond." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local minority-owned recycling company offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Johnson City (Buffalo), Tennessee", blocks: [
      { p: "Is your home or office cluttered with dead light bulbs? In Johnson City (Buffalo), Tennessee, Recycle Technologies offers a hassle-free solution for bulb disposal. We understand the challenges of disposing of them properly, but you don’t have to worry—we’re here to assist you. Our service provides safe and eco-friendly fluorescent bulb recycling across Tennessee. Whether you’re in Johnson City or elsewhere in the state, we ensure that old bulbs receive a responsible and eco-friendly end. Opting for our Bulb Recycling service means convenience for you and a better environment by keeping toxic materials out of landfills. Let's work together to build a brighter, greener future for everyone!" },
      { h2: "Our Environmental Responsibility" },
      { p: "Why choose Recycle Technologies? Alongside our subsidiaries, Lighting Resources and EZ on the Earth, we are leaders in advanced recycling practices. Utilizing cutting-edge technology, we maximize material recovery, dramatically reducing landfill waste and environmental harm. Our steadfast commitment to sustainability transforms e-waste and other materials into reusable resources, fostering a circular economy." },
      { p: "Our innovative processes reclaim valuable materials while minimizing ecological damage. As devoted environmental advocates, we continually advance in waste management, offering comprehensive services for both businesses and consumers. By partnering with us, you support a cleaner, healthier, and more sustainable future. For more information, dial 423-328-7012, and our Buffalo City branch manager Greg Bryant will help you." },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx." },
    ] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Greg Bryant" },
      { kind: 'phone', text: "423-534-8717", tel: "+14235348717", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
