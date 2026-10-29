import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Madison Shredding Service, /shredding-wisconsin/madison/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const SHREDDING_MADISON: CountyPage = {
  url: "/shredding-wisconsin/madison/",
  state: "Wisconsin",
  county: "Madison",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Shredding Service in Madison | Call (800) 969-5166",
    description: "Shredding service Madison for paper records and media, with on-site or scheduled destruction and documented disposal. Call (800) 969-5166.",
  },
  hero: {
    h1: "Madison Shredding Service",
    crumb: "Madison Shredding Service",
    lead: "Recycle Technologies offers secure paper shredding in Madison that come directly to your office or home, no matter where you’re located in Madison",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Paper Shredding Madison Wisconsin",
    blocks: [
      { p: "We at Recycle Technologies take document destruction and document shredding very seriously. We follow a highly secure shredding process to ensure that we protect your organization’s big, small data and confidential information." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "At Recycle Technologies, we use state of the art technology and equipment. We have highly skilled mechanics. We are one of the few AAA NAID certified paper shredding companies in Madison, Wisconsin. We follow meticulous standards to make sure that we meet or exceed industry-leading standards. We strive for 100% customer satisfaction, and we aim to deliver quality services at a competitive price within a defined timeline. Recycle Technologies looks forward to assisting you or your company in Madison, Wisconsin. Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Madison, Wisconsin", blocks: [
      { p: "Companies are now going digital and heading in a sustainable direction. The lifecycle of a document doesn’t end until it is properly destroyed. We aim to protect your private business information. We recommend shredding any document containing sensitive or private information about your customers, company and employees. Shredding documents is the best way to be sure that your information is untraceable and being recycled for a better environment." },
      { p: "Paper shredding not only protects personal, private or sensitive data from falling into the wrong hands, but it is also good for our planet earth. Document destruction allows your business to clean up safely and securely." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Madison Trusted Choice For shredding & Destruction Services" },
      { p: "We offer broad range of shredding services in Madison, Wisconsin nearby areas" },
      { h2: "Request a Free Quote for Shredding Services in Madison" },
      { p: "Customers look for reputable companies that protect their sensitive information. Today security is an important part of the business. You can trust Recycle Technologies with any type of confidential data, including but not limited to legal documents, medical documents, financial records, customer data, and more. When it comes to paper shredding in Madison, Wisconsin, it is time to put your worries at ease." },
      { p: "Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
