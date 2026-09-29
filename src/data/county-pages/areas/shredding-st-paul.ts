import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * St. Paul Shredding Service, /shredding-minnesota/st-paul/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7073:8942, phone 7073:9662 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const SHREDDING_ST_PAUL: CountyPage = {
  url: "/shredding-minnesota/st-paul/",
  state: "Minnesota",
  county: "St. Paul",
  service: "Document Shredding",
  figma: { board: "7073:8942", phone: "7073:9662" },
  seo: {
    title: "Shredding Service in St. Paul | (800) 969-5166",
    description: "Shredding service in St. Paul for secure disposal of paper files, records, and printed materials from offices and organizations. Call (800) 969-5166",
  },
  hero: {
    h1: "St. Paul Shredding Service",
    crumb: "St. Paul Shredding Service",
    lead: "Recycle Technologies offers a secure Paper Shredding Service in St. Paul that come directly to your office or home, no matter where you’re located in St. Paul",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Paper Shredding in St. Paul MN",
    blocks: [
      { p: "Document destruction and shredding are very important to us at Recycle Technologies. We use a highly secure shredding procedure to protect your company’s huge, small, and confidential data." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "Recycle Technologies, we use state of the art technology and equipment. Our mechanics are highly trained. We are one of the few AAA NAID certified paper shredding companies in St. Paul WI. We follow meticulous standards which we implement to guarantee that you get quality services at a competitive price within a defined timeline. Call us at +1 763-559-5130 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in St Paul, Minnesota", blocks: [
      { p: "Companies are now embracing digital transformation and moving in a more sustainable way. A document’s lifecycle does not terminate until it is properly destroyed. We focus on keeping your confidential business information safe. Any paper containing critical or confidential information about your clients, company, or workers should be shredded. Document shredding is the most effective approach to ensure that your information is untraceable and recycled for the benefit of the environment. Paper shredding is not only healthy for our planet earth, but it also safeguards personal, private, or sensitive data from falling into the wrong hands. Document destruction enables your company to clean up in a safe and secure manner." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "St. Paul Trusted Choice For shredding & Destruction Services" },
      { p: "We offer Secure Paper Shredding services All over the St Paul and nearby areas." },
      { h2: "Request a Free Quote for Shredding Services in St. Paul" },
      { p: "Customers seek out trusted businesses that secure their private information. Security is a critical component of today’s business. You can entrust any type of confidential data to Recycle Technologies, including but not limited to legal documents, medical documents, financial records, customer information, and more. It’s time to put your anxieties about paper shredding in St Paul Minnesota to rest." },
      { p: "Call us at +1 763-559-5130 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
