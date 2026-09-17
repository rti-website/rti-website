import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/automotive-fleet/ — copy from the "Automotive & Fleet" doc. */
export const CONTENT = industryPage({
  url: '/industries/automotive-fleet/',
  name: 'Automotive & Fleet',
  seo: {
    title: 'Automotive & Fleet Recycling | Recycle Technologies',
    description: 'Auto shops, dealerships, and fleet operations can recycle airbags, retired computers, and IT equipment with documented, licensed services.',
  },
  h1: 'Automotive & Fleet',
  lead: 'Auto shops, dealerships, and fleet operations can recycle retired computers, IT equipment, and airbags through Recycle Technologies’ licensed recycling services, with a Certificate of Recycling or Destruction issued for every completed project.',
  challengesHeading: 'Recycling Challenges in Automotive & Fleet Operations',
  challenges: [
    'Auto shops and dealerships often end up with a mixed waste stream that’s harder to sort than a typical office: retired shop computers and diagnostic terminals sit alongside deployed and undeployed airbags pulled during repairs, and airbags aren’t something you can just toss in a bin because of the explosive components inside them. Finding a single provider that can pick up both categories, rather than juggling separate vendors, saves a step in an already busy shop.',
    'Fleet operations face a different version of the same problem across multiple lots or terminals: retired dispatch and office computers, networking equipment, and backup batteries accumulate as vehicles and systems get upgraded. Retired computers and hard drives can hold account and operational data, so fleet and shop managers typically want documented destruction and a clear record of what happened to each device before it leaves the property.',
  ],
  servicesHeading: 'Recycling Services for Automotive & Fleet',
  services: [
    { label: 'Airbag Recycling',       href: L.airbag,      text: 'Certified disposal is available for both deployed and undeployed airbags, handled at a licensed airbag waste collection facility in accordance with DOT and EPA standards. This service is built specifically for auto shops, mechanic shops, auto dismantlers, and fleet managers.' },
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Retired shop and office computers, monitors, and other electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with electronics disposal handled under a no-landfill policy.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Larger equipment transitions, like a multi-location fleet refresh, go through a four-step process: discussing the assets involved, providing an estimate and recycling plan, scheduling pickup, and processing the equipment with a Certificate of Destruction or Recycling issued when the project wraps up.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Formatting or deleting data from a drive doesn’t remove it completely. Certified hard drive destruction is available on-site or off-site for computers pulled from service at a shop, dealership, or fleet office.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Shop equipment and office backup systems rely on batteries, and our battery recycling service accepts lithium-ion and EV battery types along with other common battery chemistries.' },
    { label: 'Mail-In Program',        href: L.mailIn,      text: 'Shops, dealerships, or fleet locations outside the Minnesota and Wisconsin service area can order a recycling kit online, including a dedicated airbag recycling kit, pack it, and ship it with a prepaid label, then get a certificate of recycling once it’s processed.' },
  ],
  heroImage: '/images/industries/hero-automotive.png',
  faqs: [
    { q: 'Does Recycle Technologies pick up both airbags and retired shop electronics on the same visit?', a: 'Airbag recycling and electronics recycling are offered as separate services with their own pickup and drop-off options; contact us to coordinate both for a single visit.' },
    { q: 'Can auto dismantlers recycle both deployed and undeployed airbags?', a: 'Yes, our airbag recycling service accepts both deployed and undeployed units through a licensed airbag waste collection facility.' },
    { q: 'Does Recycle Technologies recycle EV or lithium-ion batteries from shop equipment?', a: 'Yes, our battery recycling service accepts lithium-ion and EV battery types along with other common battery chemistries.' },
    { q: 'Is there a mail-in option for shops or fleet locations outside Minnesota and Wisconsin?', a: 'Yes, our mail-in program includes a dedicated airbag recycling kit as well as kits for electronics, batteries, and other materials, shippable from anywhere in the country.' },
    { q: 'Does Recycle Technologies handle complete vehicle recycling, tires, or engines?', a: 'No, our services are focused on airbags, electronics, IT equipment, and batteries; we do not process complete vehicles, tires, engines, or fluids.' },
  ],
  ctaHeading: 'Ready to Clear Out Airbags and Retired Electronics from Your Shop or Fleet?',
  ctaBody: ['Get a quote for your next pickup, or call MN: (800) 969-5166 / WI: (800) 205-3040 to coordinate airbag and electronics recycling together.'],
})
