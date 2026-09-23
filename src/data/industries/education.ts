import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/education/ — copy from the "Education (K-12 & Higher Ed)" doc. */
export const CONTENT = industryPage({
  url: '/industries/education/',
  name: 'Education (K-12 & Higher Ed)',
  seo: {
    title: 'Education Recycling for Schools & Colleges | RT',
    description: 'Schools, districts, colleges, and universities can recycle retired computers and IT equipment with documented, licensed recycling services.',
  },
  h1: 'Education (K-12 & Higher Ed)',
  lead: 'Schools, districts, colleges, and universities can retire computers, classroom technology, and IT equipment through Recycle Technologies’ licensed recycling services, with a Certificate of Recycling or Destruction issued for every completed project.',
  challengesHeading: 'Recycling Challenges in K-12 & Higher Education',
  challenges: [
    'Technology refreshes rarely happen one device at a time. When a district replaces a computer lab, a college retires a batch of lab or office computers, or a campus consolidates IT closets across buildings, the result is often dozens or hundreds of computers, monitors, and networking devices that need to leave the building at once.',
    'Coordinating that volume, scheduling a pickup that works around the academic calendar, and keeping a record of what was removed and from which building or campus take real planning, especially for IT and facilities teams already stretched across day-to-day support.',
    'Retired computers and hard drives also tend to sit in storage closets long after they’re pulled from service, because nobody wants to ship sensitive equipment out without a clear record of what happens to it. A recycler that documents each step, from pickup through processing, makes it easier for a district or campus to close that loop and free up the storage space those retired devices are taking up.',
  ],
  servicesHeading: 'Recycling Services for K-12 & Higher Education',
  services: [
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Computers, monitors, and other retired electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with electronics disposal handled under a no-landfill policy, whether it’s a single classroom’s worth of equipment or a full lab refresh.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Larger technology transitions go through a four-step process: discussing the assets involved, providing an estimate and recycling plan, scheduling pickup, and processing the equipment with a Certificate of Destruction or Recycling issued when the project is complete.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Pulling a hard drive from service or formatting it doesn’t erase what’s on it. Certified hard drive destruction is available on-site or off-site, so drives can be verifiably destroyed instead of sitting in a drawer.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Laptop carts, backup power systems, and other campus equipment run on batteries, including lithium-ion types, which can be recycled rather than thrown out with general trash.' },
    { label: 'Light Bulb Recycling',   href: L.lightBulbs,  text: 'Facilities teams replacing fluorescent, LED, or other lighting across classrooms and campus buildings can recycle used bulbs instead of sending them to a landfill.' },
    { label: 'Mail-In Program',        href: L.mailIn,      text: 'Campuses or school buildings outside the Minnesota and Wisconsin service area can order a recycling kit online, pack it, and drop it off at a FedEx location using the included prepaid label, then receive a recycling certificate once it’s processed.' },
  ],
  heroImage: '/images/industries/hero-education.png',
  introImage: '/images/industries/intro-education-government.png', // Figma 6734:5897, supplied by Asim 23 Sep 2026
  faqs: [
    { q: 'Does Recycle Technologies work with schools, districts, colleges, or universities?', a: 'Our electronics recycling and IT asset disposition services are set up to handle equipment from businesses and institutions, including bulk technology refreshes.' },
    { q: 'Can a school district recycle a large batch of retired computers at once?', a: 'Yes. Our IT asset disposition process includes a planning and estimation step specifically for larger equipment lists.' },
    { q: 'Does Recycle Technologies provide proof that equipment was recycled or destroyed?', a: 'Yes, a Certificate of Recycling or Certificate of Destruction is provided once a project is complete.' },
    { q: 'What if our campus is outside Minnesota or Wisconsin?', a: 'Our mail-in program lets you order a recycling kit, pack your equipment, and ship it with a prepaid label from anywhere in the country.' },
    { q: 'Is pickup available for schools and campuses?', a: 'Pickup is available exclusively for commercial clients in our service area; campuses elsewhere can use the mail-in program instead.' },
  ],
  ctaHeading: 'Ready to Clear Out Retired Technology from Your School or Campus?',
  ctaBody: ['Get a quote for your next equipment refresh, or call MN: (800) 969-5166 / WI: (800) 205-3040 to talk through a pickup or bulk project directly.'],
})
