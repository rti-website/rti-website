import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/retail-corporate-offices/ — copy from the "Retail & Corporate Offices" doc. */
export const CONTENT = industryPage({
  url: '/industries/retail-corporate-offices/',
  name: 'Retail & Corporate Offices',
  seo: {
    title: 'Retail Electronics Recycling | Recycle Technologies',
    description: 'Retailers and corporate offices can recycle retired computers, IT equipment, batteries, and lighting through Recycle Technologies’ licensed services.',
  },
  h1: 'Retail & Corporate Offices',
  lead: 'Retailers and corporate offices can recycle retired computers, IT equipment, batteries, and lighting through Recycle Technologies’ licensed recycling services, with a Certificate of Recycling or Destruction issued for every completed project.',
  challengesHeading: 'Recycling Challenges for Retail & Corporate Offices',
  challenges: [
    'Retired computers, monitors, and other office electronics tend to build up quietly at stores and corporate offices, especially when a technology refresh, office move, or store closure happens across more than one location at a time.',
    'Without a single provider to call, IT and facilities teams end up coordinating separate pickups and losing track of what’s been recycled and what’s still sitting in a storage room or back office.',
    'That equipment often holds information worth protecting, from network settings to data stored on retired hard drives, so businesses typically want a documented process rather than just dropping old devices off somewhere.',
    'Retail and corporate teams also need recycling scheduled around store hours or office operations, so it doesn’t interrupt the business while equipment is picked up and processed.',
  ],
  servicesHeading: 'Recycling Services for Retail & Corporate Offices',
  services: [
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Retired computers, monitors, and other electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with disposal handled under a no-landfill policy.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Larger equipment transitions, like a multi-location office refresh, go through a four-step process: discussing the assets involved, providing an estimate and recycling plan, scheduling pickup, and processing the equipment with a Certificate of Destruction or Recycling issued when the project wraps up.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Formatting or deleting data from a drive doesn’t remove it completely. Certified hard drive destruction is available on-site or off-site for computers retired from a store or corporate office.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Office and store equipment often runs on batteries, and our battery recycling service accepts lithium-ion, EV, mercury, nickel-cadmium, and zinc battery types.' },
    { label: 'TV Recycling',           href: L.tv,          text: 'Retail displays and office spaces sometimes retire older television units, including CRT models that contain hazardous materials like lead and cadmium, which our TV recycling service safely dismantles.' },
    { label: 'Light Bulb Recycling',   href: L.lightBulbs,  text: 'Stores and offices replacing fluorescent, LED, halogen, or incandescent lighting during renovations or maintenance can recycle the retired bulbs rather than sending them to a landfill.' },
  ],
  heroImage: '/images/industries/hero-retail.png',
  faqs: [
    { q: 'Does Recycle Technologies accept retired computers and IT equipment from retail stores and corporate offices?', a: 'Yes, our electronics recycling and IT asset disposition services cover retired computers, monitors, and other office electronics.' },
    { q: 'Can a retail or corporate office recycle old televisions along with its electronics?', a: 'Yes, our TV recycling service accepts retired television units, including older CRT models.' },
    { q: 'Does Recycle Technologies provide documentation showing what happened to our equipment?', a: 'Yes, a Certificate of Recycling or Destruction is issued once your equipment has been recycled or destroyed.' },
    { q: 'Which Recycle Technologies facilities are R2v3 certified?', a: 'Our Blaine, Minnesota, facilities hold active R2v3 certification, while the New Berlin, Wisconsin, facility is pursuing certification and is currently pending.' },
    { q: 'Is there a recycling option for a retail or corporate location outside Minnesota or Wisconsin?', a: 'Yes, our mail-in program lets businesses anywhere in the country ship electronics, batteries, or bulbs for recycling using a prepaid kit.' },
  ],
  ctaHeading: 'Ready to Recycle Your Business Electronics?',
  ctaBody: ['Get a quote for your next pickup, or call MN: (800) 969-5166 / WI: (800) 205-3040 to discuss retired electronics, IT equipment, batteries, or lighting from your store or office.'],
  todo: ['The doc strikes through a page-specific compliance paragraph, so the standard R2v3 line is used here as on the other industry pages.'],
})
