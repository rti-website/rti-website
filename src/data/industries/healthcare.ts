import { industryPage, SERVICE_LINKS as L } from '@/data/industry-page'

/** /industries/healthcare/ — copy from the "Healthcare Recycling" doc. */
export const CONTENT = industryPage({
  url: '/industries/healthcare/',
  name: 'Healthcare',
  seo: {
    title: 'Healthcare Recycling Services | Recycle Technologies',
    description: 'Healthcare organizations can recycle retired computers, IT equipment, and electronics with documented, licensed recycling services.',
  },
  h1: 'Healthcare Recycling',
  lead: 'Recycle Technologies helps healthcare organizations retire computers, IT equipment, and other electronics through licensed recycling and destruction services, with documentation provided for completed projects.',
  challengesHeading: 'Recycling Challenges in Healthcare',
  challenges: [
    'Hospitals, clinics, and healthcare facilities regularly retire computers, monitors, networking equipment, and other electronics as systems are upgraded or replaced. Coordinating pickup across multiple departments or buildings, tracking what has been removed, and ensuring retired equipment doesn’t sit in storage or end up in the general trash can add extra work for facilities and IT teams already managing day-to-day operations.',
    'Retired computers and hard drives can also hold sensitive information, and healthcare organizations are typically subject to HIPAA data security requirements that make documented destruction and a clear record of what happened to each device especially important. Fitting that process in alongside routine electronics, battery, and lighting waste adds one more thing for teams already balancing procurement, facilities, and operational priorities.',
  ],
  servicesHeading: 'Recycling Services for Healthcare',
  services: [
    { label: 'Electronics Recycling',  href: L.electronics, text: 'Retired computers, monitors, and other electronic equipment are dismantled into base materials, including plastic, wire, circuit boards, metal, and glass, with electronics disposal handled under a no-landfill policy.' },
    { label: 'IT Asset Disposition',   href: L.itad,        text: 'Our ITAD service supports businesses, hospitals, and institutes in retiring end-of-life computers and IT equipment, with a Certificate of Destruction or Recycling provided for each project.' },
    { label: 'Hard Drive Destruction', href: L.hardDrive,   text: 'Formatting or deleting data from a drive doesn’t remove it completely. Certified hard drive destruction is available on-site or off-site for decommissioned equipment.' },
    { label: 'Paper Shredding',        href: L.paper,       text: 'Secure shredding is available for confidential documents that need to be retired alongside electronics and IT equipment.' },
    { label: 'Battery Recycling',      href: L.battery,     text: 'Equipment and backup systems often rely on batteries, including lithium-ion types, which can be recycled rather than discarded with general waste.' },
    { label: 'Light Bulb Recycling',   href: L.lightBulbs,  text: 'Facilities replacing fluorescent, LED, or other bulbs can recycle used lighting instead of sending it to a landfill.' },
  ],
  heroImage: '/images/industries/hero-healthcare.png',
  faqs: [
    { q: 'Does Recycle Technologies work with healthcare organizations?', a: 'Yes. Our IT asset disposition service supports businesses, hospitals, and institutes in retiring computers and IT equipment.' },
    { q: 'Can healthcare facilities recycle retired computers and IT equipment?', a: 'Yes, our electronics recycling and IT asset disposition services accept computers, monitors, and related IT equipment.' },
    { q: 'Does Recycle Technologies provide documentation for recycled or destroyed equipment?', a: 'Yes, a Certificate of Recycling or Certificate of Destruction is provided for completed projects.' },
    { q: 'Is pickup available for healthcare facilities?', a: 'Pickup is available exclusively for commercial clients. Facilities outside the pickup area can use the mail-in program instead.' },
    { q: 'Where does Recycle Technologies provide service?', a: 'Recycle Technologies operates licensed facilities in Minnesota and Wisconsin, with a mail-in program available nationwide.' },
  ],
  ctaHeading: 'Ready to Recycle Your Healthcare Organization’s Equipment?',
  ctaBody: ['Request a quote to start retiring computers, IT equipment, and other recyclable materials from your facility.'],
})
