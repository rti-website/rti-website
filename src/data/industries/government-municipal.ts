import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/government-municipal/ — copy from the "Government & Municipal" doc. */
export const CONTENT = industryPage({
  url: '/industries/government-municipal/',
  name: 'Government & Municipal',
  seo: {
    title: 'Government Electronics Recycling | Recycle Technologies',
    description: 'City, county, and municipal offices can recycle retired computers and IT equipment with documented, licensed recycling services.',
  },
  h1: 'Government & Municipal',
  lead: 'City, county, and municipal offices can retire computers, IT equipment, and other electronics through Recycle Technologies’ licensed recycling services, with a Certificate of Recycling or Destruction issued for every completed project.',
  challengesHeading: 'Recycling Challenges for Government & Municipal Organizations',
  challenges: [
    'Government offices rarely retire equipment on a simple schedule. A city department might replace desktops during a budget cycle, a county office might consolidate IT closets across several buildings, or a municipal facility might accumulate old monitors and networking gear over years of incremental upgrades.',
    'Getting that equipment out the door means coordinating pickup timing, tracking which department or building it came from, and making sure someone can account for what happened to it afterward, on top of the day-to-day workload already carried by facilities and IT staff.',
    'Paper records and retired computers also tend to pile up in storage rooms because no one wants to send equipment or files out without a clear record of what was destroyed and when. A recycler that documents each step, from pickup through processing, makes it easier for an office to actually clear that backlog instead of letting it grow year over year.',
  ],
  servicesHeading: 'Recycling Services for Government & Municipal Organizations',
  services: [
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Computers, monitors, and other retired electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with electronics disposal handled under a no-landfill policy.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Larger equipment transitions go through a four-step process: discussing the assets involved, providing an estimate and recycling plan, scheduling pickup, and processing the equipment with a Certificate of Destruction or Recycling issued when the project wraps up.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Formatting or deleting data from a drive doesn’t remove it completely. Certified hard drive destruction is available on-site or off-site for equipment that’s been pulled from service.' },
    { label: 'Paper Shredding',        href: L.paper,       text: 'Secure shredding is available for confidential documents and records that need to be retired alongside electronics and IT equipment.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Office equipment and backup power systems often rely on batteries, including lithium-ion types, which can be recycled rather than discarded with general waste.' },
    { label: 'Mail-In Program',        href: L.mailIn,      text: 'Offices or facilities outside the Minnesota and Wisconsin service area can order a recycling kit online, pack it, and drop it off at a FedEx location using the included prepaid label, then get a certificate of recycling once it’s processed.' },
  ],
  // placeholder art — Aqeel drew six industry heroes on 16 Sep 2026 and no
  // Government one, so this borrows Education's. Swap it when the real photo
  // lands; the card art on /industries/ borrows too (see src/data/industries.ts).
  heroImage: '/images/industries/hero-education.png',
  faqs: [
    { q: 'Does Recycle Technologies work with government and municipal organizations?', a: 'Our electronics recycling, IT asset disposition, and shredding services are set up to handle equipment from businesses and institutions, including offices with larger equipment lists.' },
    { q: 'Does Recycle Technologies provide proof that equipment was recycled or destroyed?', a: 'Yes, a Certificate of Recycling or Certificate of Destruction is provided once a project is complete.' },
    { q: 'What if our office or facility is outside Minnesota or Wisconsin?', a: 'Our mail-in program lets you order a recycling kit, pack your equipment, and ship it with a prepaid label from anywhere in the country.' },
    { q: 'Is pickup available for government and municipal offices?', a: 'Pickup is available exclusively for commercial clients in our service area; offices elsewhere can use the mail-in program instead.' },
  ],
  ctaHeading: 'Ready to Clear Out Retired Electronics from Your Office or Facility?',
  ctaBody: ['Get a quote for your next equipment refresh, or call MN: (800) 969-5166 / WI: (800) 205-3040 to talk through a pickup or larger project directly.'],
  todo: [
    'The doc gives four FAQs where the other industry pages have five — an empty bold line sits where a fifth question was drafted. Musaveer to supply it or confirm four is intended.',
    'No Government hero photograph exists yet. The page borrows Education’s; Aqeel to supply one.',
  ],
})
