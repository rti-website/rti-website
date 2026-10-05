import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Kennesaw, Georgia, /kennesaw-georgia/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:69256, phone 7084:69583 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const KENNESAW_GEORGIA: CountyPage = {
  url: "/kennesaw-georgia/",
  state: "Georgia",
  county: "Kennesaw",
  service: "Light Bulb Recycling",
  figma: { board: "7084:69256", phone: "7084:69583" },
  seo: {
    title: 'Kennesaw, GA Recycling Center: Lamps, Batteries & E-Waste',
    description: "Recycling services Kennesaw coordinating acceptance of electronics, lamp remnants, battery assortments, paper loads, and approved materials for processing. Call (800) 969-5166",
  },
  hero: {
    h1: 'Recycle Technologies Kennesaw, GA (Atlanta Area)',
    crumb: "Kennesaw, Georgia",
    lead: "Recycling services Kennesaw coordinating acceptance of electronics, lamp remnants, battery assortments, paper loads, and approved materials for processing. Call (800) 969-5166",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Electronics Recycling Services in Kennesaw, Georgia",
    blocks: [
      { p: "Imagine a world where your old electronics don't end up polluting the environment—Recycle Technologies makes this a reality in Kennesaw, Georgia. We expertly manage a broad spectrum of electronic items, from ancient computers and laptops to TVs, mobile phones, and sizable office gear, ensuring each piece is handled with the utmost care." },
      { p: "Our innovative process involves dismantling these devices to recover precious materials like rare earth metals, effectively curbing the environmental impact of discarded electronics. Recognizing the severe risks of improper e-waste disposal, we are fervently committed to fostering responsible change in Georgia. Our services are tailored for businesses and individuals who wish to responsibly declutter their spaces while supporting green practices and adhering to environmental regulations." },
      { h: "Battery Recycling Services in Kennesaw, Georgia" },
      { p: "In Kennesaw, Georgia, our Battery Recycling Services are vital for the safe disposal of all battery types in the community. Whether it's common household batteries or large industrial units, our thorough program ensures every component is meticulously processed and recycled. Tossing batteries into landfills poses a significant environmental hazard, regardless of their origin— home or office. Our skilled team of professionals ensures that hazardous materials are kept from contaminating the environment while recovering valuable resources for reuse. By choosing Recycle Technologies, you actively participate in reducing landfill waste and championing sustainable resource management. Join us in making a significant environmental impact and paving the way for a greener future for Georgia and beyond" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Trusted and Local", text: "Recycle Technologies is a local minority-owned recycling company offering recycling solutions in Minnesota since 1993." },
      { title: "Dependable Customer Service", text: "We value our clients and their devotion for a better planet and ensure quality recycling services within time." },
      { title: "Custom Recycling Services", text: "Get one item or hundreds of them, we can recycle everything based on your personalized requirements." },
      { title: "Quick Booking and Pickup", text: "You can get a free quote by filling out the form, and our team will be at your doorstep in no time for a pickup." },
    ] },
    { kind: 'text', heading: "Bulb Recycling Services in Kennesaw, Georgia", blocks: [
      { p: "Ready to clear out that drawer full of dead light bulbs in Kennesaw, Georgia? We understand the challenge! Disposing of them properly can be a headache, but don't worry—Recycle Technologies is here to be your local bulb disposal hero. We offer a comprehensive solution for safe and eco-friendly fluorescent bulb recycling in Georgia. Whether you're in Kennesaw or anywhere else in the Peach State, we help you give those old bulbs a responsible and environmentally friendly end. Opting for our Bulb Recycling service in Georgia means convenience for you and a healthier planet by keeping toxic materials out of landfills. Let's work together to create a brighter, greener future for everyone!" },
      { h2: "Our Environmental Responsibility" },
      { p: "Recycle Technologies, alongside its subsidiaries Lighting Resources and EZ on the Earth, stands at the forefront of advanced recycling practices. Leveraging cutting-edge technology, we maximize material recovery, dramatically reducing landfill waste and environmental harm. Our unwavering commitment to sustainable practices transforms e-waste and other materials into reusable resources, promoting a circular economy." },
      { p: "Our innovative processes not only reclaim valuable materials but also minimize ecological damage. As staunch environmental advocates, we continuously advance in waste management, offering comprehensive services to both businesses and consumers. Partnering with us means supporting a cleaner, healthier, and sustainable future. For more information, reach out to Richard Hall, our Kennesaw branch manager, at 770-426-5000." },
      { h: "Mail in Program" },
      { p: "Access our recycling services through our complete recycling kits which you can just order from the comfort of your home and drop off at the nearest FedEx." },
    ] },
  ],
  company: {
    name: "Business Pick-Up Service",
    text: "For business pickup services contact the person below.",
    lines: [
      { kind: 'person', text: "Richard Hall" },
      { kind: 'phone', text: "770-262-8264", tel: "+17702628264", icon: 'hours' },
      { kind: 'email', text: "dispatch@recycletechnologies.com" },
    ],
  },
}
