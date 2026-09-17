import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/financial-services-banking/ — copy from the "Financial Services & Banking" doc. */
export const CONTENT = industryPage({
  url: '/industries/financial-services-banking/',
  name: 'Financial Services & Banking',
  seo: {
    title: 'Financial Services Recycling | Recycle Technologies',
    description: 'Banks and financial services organizations can recycle retired computers, IT equipment, and records with documented, licensed recycling services.',
  },
  h1: 'Financial Services & Banking',
  lead: 'Recycle Technologies helps financial services and banking organizations retire computers, IT equipment, and paper records through licensed recycling and shredding services, with documentation provided for completed projects.',
  challengesHeading: 'Recycling Challenges in Financial Services & Banking',
  challenges: [
    'Banks and financial services organizations regularly retire computers, monitors, and networking equipment as branches upgrade systems or consolidate locations. Tracking equipment across multiple branches or offices, scheduling pickups, and making sure retired devices don’t accumulate in storage rooms can add extra coordination for IT and operations teams already managing daily branch activity.',
    'Retired computers, hard drives, and paper records can also hold sensitive account and customer information. Financial institutions are typically subject to federal recordkeeping and data-security expectations, including those under the Gramm-Leach-Bliley Act (GLBA), which makes documented destruction with a clear record of what happened to each device or document especially important.',
    'Coordinating that process alongside routine electronics and battery waste is another task for teams already balancing procurement, compliance, and facilities responsibilities.',
  ],
  servicesHeading: 'Recycling Services for Financial Services & Banking',
  services: [
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Retired computers, monitors, and other electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with electronics disposal handled under a no-landfill policy.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Businesses use our ITAD service to retire end-of-life computers and IT equipment, with a Certificate of Destruction or Recycling provided for each project.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Formatting or deleting data from a drive doesn’t remove it completely. Certified hard drive destruction is available on-site or off-site for decommissioned equipment.' },
    { label: 'Paper Shredding',        href: L.paper,       text: 'Secure shredding is available for confidential documents and records that need to be retired alongside electronics and IT equipment.' },
    { label: 'Off-Site Shredding',     href: L.offSite,     text: 'For larger volumes, off-site shredding handles electronic gadgets and materials in accordance with applicable regulations.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Office equipment and backup systems often rely on batteries, including lithium-ion types, which can be recycled rather than discarded with general waste.' },
  ],
  heroImage: '/images/industries/hero-banking.png',
  faqs: [
    { q: 'Does Recycle Technologies work with financial services and banking organizations?', a: 'Yes. Our electronics recycling, IT asset disposition, and shredding services are available to businesses retiring computers, IT equipment, and paper records.' },
    { q: 'Can financial institutions recycle retired computers and IT equipment?', a: 'Yes, our electronics recycling and IT asset disposition services accept computers, monitors, and related IT equipment.' },
    { q: 'Does Recycle Technologies provide documentation for recycled or destroyed equipment?', a: 'Yes, a Certificate of Recycling or Certificate of Destruction is provided for completed projects.' },
    { q: 'Is pickup available for financial services offices?', a: 'Pickup is available exclusively for commercial clients. Offices outside the pickup area can use the mail-in program instead.' },
    { q: 'Where does Recycle Technologies provide service?', a: 'Recycle Technologies operates licensed facilities in Minnesota and Wisconsin, with a mail-in program available nationwide.' },
  ],
  ctaHeading: 'Ready to Recycle Your Financial Organization’s Equipment?',
  ctaBody: ['Request a quote to start retiring computers, IT equipment, and paper records from your branch or office.'],
})
