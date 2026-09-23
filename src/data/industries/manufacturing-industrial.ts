import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/manufacturing-industrial/ — copy from the "Manufacturing & Industrial" doc. */
export const CONTENT = industryPage({
  url: '/industries/manufacturing-industrial/',
  name: 'Manufacturing & Industrial',
  seo: {
    title: 'Manufacturing & Industrial Recycling | Recycle Technologies',
    description: 'Manufacturers and industrial facilities can recycle retired computers, IT equipment, batteries, and lighting through Recycle Technologies’ licensed services.',
  },
  h1: 'Manufacturing & Industrial',
  lead: 'Manufacturing and industrial organizations can recycle retired computers, IT equipment, batteries, and lighting through Recycle Technologies’ licensed recycling services, with a Certificate of Recycling or Destruction issued for every completed project.',
  challengesHeading: 'Recycling Challenges in Manufacturing & Industrial Operations',
  challenges: [
    'Retired computers, monitors, and networking equipment tend to accumulate at plants, warehouses, and production facilities faster than anyone plans for. A technology refresh on the production floor, an office move, or a shift in operations at one of several locations can leave equipment sitting in storage with no clear next step, especially when there’s no single point of contact handling disposal across sites.',
    'That equipment often holds information worth protecting, from network configurations to operational and employee data stored on retired hard drives. Plant and facilities teams typically need that equipment picked up, processed, and documented without pulling attention away from ongoing production, and with a record showing what happened to each device after it left the building.',
  ],
  servicesHeading: 'Recycling Services for Manufacturing & Industrial',
  services: [
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Retired computers, monitors, and other electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with disposal handled under a no-landfill policy.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Larger equipment transitions, like a multi-facility technology refresh, go through a four-step process: discussing the assets involved, providing an estimate and recycling plan, scheduling pickup, and processing the equipment with a Certificate of Destruction or Recycling issued when the project wraps up.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Formatting or deleting data from a drive doesn’t remove it completely. Certified hard drive destruction is available on-site or off-site for computers retired from a plant, warehouse, or facility office.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Production equipment, backup systems, and facility electronics rely on batteries, and our battery recycling service accepts lithium-ion, EV, mercury, nickel-cadmium, and zinc battery types.' },
    { label: 'Light Bulb Recycling',   href: L.lightBulbs,  text: 'Facilities replacing fluorescent, LED, halogen, or incandescent lighting during upgrades or maintenance can recycle the retired bulbs rather than sending them to a landfill.' },
    { label: 'Ballast Recycling',      href: L.ballasts,    text: 'Old ballasts removed from light fixtures are processed to safely separate PCB- and DEHP-containing capacitors, which are routed to an EPA-approved incineration facility through a certified waste transporter.' },
    { label: 'Mail-In Program',        href: L.mailIn,      text: 'Facilities outside the Minnesota and Wisconsin service area can order a recycling kit online for electronics, batteries, or bulbs, pack it, and ship it with a prepaid label, then get a certificate of recycling once it’s processed.' },
  ],
  heroImage: '/images/industries/hero-manufacturing.png',
  introImage: '/images/industries/intro-manufacturing.png', // Figma 6734:5892, supplied by Asim 23 Sep 2026
  faqs: [
    { q: 'Does Recycle Technologies accept retired computers and IT equipment from manufacturing facilities?', a: 'Yes, our electronics recycling and IT asset disposition services cover retired computers, monitors, and networking equipment.' },
    { q: 'Can manufacturing and industrial facilities recycle batteries and lighting equipment along with their electronics?', a: 'Yes, our battery recycling service accepts lithium-ion, EV, mercury, nickel-cadmium, and zinc batteries, and our light bulb recycling service covers fluorescent, LED, and other bulb types.' },
    { q: 'Does Recycle Technologies provide documentation showing what happened to our equipment?', a: 'Yes, a Certificate of Recycling or Destruction is issued once your equipment has been recycled or destroyed.' },
    { q: 'Which Recycle Technologies facilities are R2v3 certified?', a: 'Our Blaine, Minnesota, facilities hold active R2v3 certification, while the New Berlin, Wisconsin, facility is pursuing certification and is currently pending.' },
    { q: 'Is there a recycling option for a manufacturing or industrial facility outside Minnesota or Wisconsin?', a: 'Yes, our mail-in program lets facilities anywhere in the country ship electronics, batteries, or bulbs for recycling using a prepaid kit.' },
  ],
  ctaHeading: 'Ready to Recycle Your Manufacturing or Industrial Equipment?',
  ctaBody: ['Get a quote for your next pickup, or call MN: (800) 969-5166 / WI: (800) 205-3040 to discuss retired electronics, IT equipment, batteries, or lighting from your facility.'],
  todo: [
    'The doc’s services heading is plain text rather than a heading, and its case studies section reads "[PalceHOLDEEr]". Neither affects the build; worth tidying in the doc.',
  ],
})
