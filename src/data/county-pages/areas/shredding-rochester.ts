import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Rochester Shredding Service, /shredding-minnesota/rochester/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333, laid out like St. Paul Shredding. The old
 * WordPress page's copy word for word (15 Sep 2026 backup), except three
 * headings and a line that named Minneapolis on this Rochester page (copied
 * from the Minneapolis page), which name Rochester. Its link to the
 * Minneapolis shredding page is plain text (that page 301s).
 */
export const SHREDDING_ROCHESTER: CountyPage = {
  url: "/shredding-minnesota/rochester/",
  state: "Minnesota",
  county: "Rochester",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Shredding Service Rochester | Call (800) 969-5166',
    description: "Shredding service Rochester for files, folders, binders, and archived paperwork, destroyed through scheduled processing with documented completion. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Rochester Shredding Service',
    crumb: "Rochester Shredding Service",
    lead: "Recycle Technologies offers a secure Paper Shredding Service in Rochester that come directly to your office or home, no matter where you’re located in Rochester",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Paper Shredding in Rochester Minnesota",
    blocks: [
      { p: "We take document destruction and shredding very seriously at Recycle Technologies. We use a highly secure shredding procedure to ensure that your company’s big, small, and confidential data is protected." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "When it comes to paper shredding services and technology, we at Recycle Technologies want to deliver quality results with enthusiastic dedication. Our service is shaped by detailing and precision. We work hard to keep things clean so you don’t have to worry about destroying your office or home with pesky paper scraps! We follow industry standards too because we’re very focused on meeting expectations – and exceeding them when possible." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Rochester, Minnesota", blocks: [
      { p: "As companies become more digital, they are moving toward a more sustainable model. The lifecycle of a document ends when it is properly destroyed. We are committed to protecting your private data. You should shred any document that contains sensitive or private information about your company, customers, or employees. By shredding documents, you can ensure your information is untraceable and being recycled for a better environment." },
      { p: "Paper shredding not only protects personal, private or sensitive data from falling into the wrong hands, but it is also good for our planet earth. Document destruction allows your business to clean up safely and securely." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Rochester Trusted Choice For shredding & Destruction Services" },
      { p: "We offer Secure Paper Shredding services All over Rochester and nearby areas." },
      { h2: "Request a Free Quote for Shredding Services in Rochester" },
      { p: "Customers seek out trusted companies that safeguard their personal data. Today, security is a critical component of any organization. You can entrust any type of confidential data to Recycle Technologies, including but not limited to legal documents, medical records, financial records, customer information, and more. It’s time to relax about paper shredding in Rochester, Minnesota." },
      { p: "Call us at +1 763-559-5130 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
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
