import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Shredding Services in Green Bay, /shredding-wisconsin/green-bay/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7073:10267, phone 7073:10990 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const SHREDDING_GREEN_BAY: CountyPage = {
  url: "/shredding-wisconsin/green-bay/",
  state: "Wisconsin",
  county: "Green Bay",
  service: "Document Shredding",
  figma: { board: "7073:10267", phone: "7073:10990" },
  seo: {
    title: 'Paper Shredding in Green Bay, WI | Recycle Technologies',
    description: "Secure shredding services in Green Bay & its surroundings at Recycle Technologies. AAA NAID-certified paper shredding ensures ultimate data protection in Green Bay.",
  },
  hero: {
    h1: 'Paper Shredding Services in Green Bay, WI',
    crumb: "Shredding Services in Green Bay",
    lead: "Provides shredding services in Green Bay, WI businesses. At reasonable prices.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Shredding Services Green Bay Wisconsin",
    blocks: [
      { p: "Document destruction and document shredding are important to us at Recycle Technologies. Shredding is a highly secure process that ensures the protection of your organization’s big, small, and confidential information." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "A top-rated paper shredding company, Recycle Technologies uses state-of-the art technology and equipment. Highly skilled mechanics help oversee all their processes, which are geared towards ensuring that the company proudly upholds its AAA NAID certification. The staff is dedicated to providing customers with the best services possible, including quality pricing and timely completion of each task in a way that will prove beneficial to you moving forward. Call us at +1 262-798-3040 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Green Bay Wisconsin", blocks: [
      { p: "Companies are now going digital and moving in the direction of sustainability. A document’s lifecycle does not terminate until it is destroyed appropriately. We strive to keep your confidential business data safe. Any document that contains sensitive or confidential information about your customers, company, or workers should be shredded. Document shredding is the best approach to ensure that your information is untraceable and recycled in a sustainable manner." },
      { p: "Paper shredding is healthy for our planet Earth as well as protecting personal, private, or sensitive data from getting into the wrong hands. Your company can clean up in a safe and secure manner by shredding documents." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Green Bay Trusted Choice For shredding & Destruction Services" },
      { p: "We offer broad range of shredding services in Green Bay, Wisconsin nearby areas" },
      { h2: "Get Free Quotes on Paper Shredding Services throughout Wisconsin" },
      { p: "Customers seek out reliable businesses that protect their personal data. Nowadays, security is a critical component of any company’s operations." },
      { p: "You can entrust any type of confidential information to Recycle Technologies, including legal documents, medical records, financial records, customer information, and more." },
      { p: "It’s time to let go of your concerns about paper shredding & Battery Recycling in Green Bay WI." },
      { p: "Call us at +1 262-798-3040 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
