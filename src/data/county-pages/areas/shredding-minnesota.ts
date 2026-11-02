import { PICKUP_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Document Shredding Minnesota, /shredding-minnesota/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7073:7429, phone 7073:8254 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const SHREDDING_MINNESOTA: CountyPage = {
  url: "/shredding-minnesota/",
  state: "Minnesota",
  county: "Minnesota",
  areaServed: "Minnesota",
  service: "Document Shredding",
  figma: { board: "7073:7429", phone: "7073:8254" },
  seo: {
    title: 'Paper Shredding in Minnesota | Recycle Technologies',
    description: "Document shredding in Minnesota for records and confidential documents. Call (800) 969-5166 for document shredding today.",
  },
  hero: {
    h1: 'Paper Shredding Services in Minnesota',
    crumb: "Document Shredding Minnesota",
    lead: "We offer fast, reliable and cost effective shredding services in Minnesota",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Document Shredding Minnesota",
    blocks: [
      { p: "Recycle Technologies helps hundreds of businesses in a 100-mile area in Minnesota to keep their private information secure with shredding services, media destruction, and document destruction." },
      { p: "We offer highly secure residential and business shredding services in Minnesota so that you can shred and destroy your confidential and sensitive information with the same care that large organizations benefit from." },
      { p: "At Recycle Technologies, our document destruction services are based on providing world-class security, safe environmental practices, and exceptional customer service in the document shredding and electronic media destruction industry. When you need residential shredding services or commercial shredding services in the Minnesota area, Recycle Technologies is always here to help you." },
      { h: "Secure & Affordable Shredding Services in Minnesota" },
      { p: "We are delighted to assist our valued customers with their shredding needs. Having a cost-effective and hassle-free experience is our guarantee." },
      { h: "Shredding Service Options" },
      { p: "Below is a list of the Minnesota shredding services we provide. Select a service based on your volume and frequency. You may also request a bespoke solution based on your requirements. You may also call +1 763-559-5130 or fill out [the form](quote) if you would like to speak with our experts" },
    ],
  },
  sections: [
    { kind: 'text', heading: "Why Choose Recycle Technologies?", blocks: [] },
    { kind: 'features', cards: [
      { title: "Booking is Quick and Easy", text: "Our local sales team will be ready to assist you all the time. We are flexible in scheduling and offer you a custom quotation." },
      { title: "No shredding job is too big or too . small", text: "We can offer you a one-off purge shredding service or can set up a regular shredding service. We can destroy a large volume of documents and even a single box of documents in your cabinet." },
      { title: "Fast & Efficient Customer Service", text: "We can provide you with our services as soon as you book or in the next available slot. We will ensure quality service all the time." },
      { title: "NAID AAA and Privacy Certified", text: "We are certified and keep you compliant with all data protection regulations." },
      { title: "100% Local", text: "We are a local business based in Minnesota and Wisconsin. We cover a 100-Mile radius from both our facilities." },
    ] },
    { kind: 'text', heading: "Minnesota Shredding Locations", blocks: [
      { p: "We cover 100-mile radius and all major cities from our facility in Minnesota and Wisconsin. You can avail our services in the following major cities. Can not find your city? Call us at (800)969-5166 to speak to our sales expert." },
      { list: [
        { title: "Duluth Shredding Service", text: "Take the burden off your shoulders by getting reliable battery recycling services in Duluth from your trusted local partner.", href: href("/shredding-minnesota/duluth/") },
        { title: "ST.Paul Shredding", text: "Take the burden off your shoulders by getting reliable battery recycling services in ST Paul from your trusted local partner.", href: href("/shredding-minnesota/st-paul/") },
        { title: "Des Monies Shredding", text: "Take the burden off your shoulders by getting reliable battery recycling services in Des Monies from your trusted local partner." },
        { title: "Minneapolis Shredding", text: "Take the burden off your shoulders by getting reliable battery recycling services in Minneapolis from your trusted local partner." },
        { title: "Rochester Shredding", text: "Take the burden off your shoulders by getting reliable battery recycling services in Rochester from your trusted local partner." },
      ] },
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
