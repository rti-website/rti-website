import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Waukesha Shredding Service, /shredding-wisconsin/waukesha/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:81791, phone 7084:82072 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const SHREDDING_WAUKESHA: CountyPage = {
  url: "/shredding-wisconsin/waukesha/",
  state: "Wisconsin",
  county: "Waukesha",
  service: "Document Shredding",
  figma: { board: "7084:81791", phone: "7084:82072" },
  seo: {
    title: 'Waukesha Paper Shredding & Document Destruction',
    description: "Shredding service Waukesha for documents, invoices, manuals, and confidential papers, destroyed through controlled procedures with recorded completion. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Paper Shredding in Waukesha, WI',
    crumb: "Waukesha Shredding Service",
    lead: "Recycle Technologies safe and cost-effective Service of Paper Shredding Waukesha, lets you safely dispose of your confidential information securely and efficiently.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Paper Shredding Waukesha in Wisconsin",
    blocks: [
      { p: "Our document Shredding experts at Recycle Technologies take the protection of data very seriously. We ensure that all information is destroyed and eradicated in a secure manner to protect your organization against leaks and other potential vulnerabilities." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "A top-rated paper shredding company, Recycle Technologies uses state-of-the art technology and equipment. Highly skilled mechanics help oversee all their processes, which are geared towards ensuring that the company proudly upholds its AAA NAID certification. The staff is dedicated to providing customers with the best services possible, including quality pricing and timely completion of each task in a way that will prove beneficial to you moving forward. Call us at +1 262-798-3040 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Waukesha Wisconsin", blocks: [
      { p: "Companies are making the switch to the digital format. Shredding old documents is part of this process. However, it’s important not just to make a document disappear digitally – it also must be shredded before being made into new paper. It’s vital that your clients’ private information doesn’t fall into the wrong hands; after all, you won’t believe how easy it is for paper containing important company or employee data to simply end up in the trash!" },
      { p: "You don’t want your company to be at risk of a breach because someone threw information into the recycling bin without first shredding it by hand. Whenever you need a professional and reliable team to assist you in getting rid of sensitive information, Recycle Technologies can handle the task as well as come pick up and dispose of your documents. Call us today +1 262-798-3040 and we’ll schedule an appointment for when it’s convenient for you." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Waukesha Trusted Choice For shredding & Destruction Services" },
      { p: "We offer broad range of shredding services in Waukesha, Wisconsin and nearby areas" },
      { h2: "Request a Free Quote for Shredding Services in Waukesha" },
      { p: "Customers will always look for secure companies that are trustworthy, and they can trust that all information they provide is protected. Today, it is important to protect sensitive information in any way possible so our experts at Recycle Technologies take security seriously and all of our staff are trained, qualified professionals who know how to handle confidential material more safely than you would imagine. Having trusted employees handling the shredding process shows your customers that you put your company’s reputation above anyone else’s. When it comes to paper shredding in Waukesha Wisconsin, there’s only one name you have to know!" },
      { p: "Call us at +1 262-798-3040 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
