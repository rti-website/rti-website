import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Minneapolis Shredding Service, /shredding-minnesota/minneapolis/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 6 Mar 2026 (the page is not in the
 * 15 Sep 2026 backup).
 */
export const SHREDDING_MINNEAPOLIS: CountyPage = {
  url: "/shredding-minnesota/minneapolis/",
  state: "Minnesota",
  county: "Minneapolis",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Shredding Service in Minneapolis | Call (800) 969-5166",
    description: "Shredding service in Minneapolis for confidential paperwork, office records, and outdated files with reliable destruction processes. Call (800) 969-5166",
  },
  hero: {
    h1: "Minneapolis Shredding Service",
    crumb: "Minneapolis Shredding Service",
    lead: "Recycle Technologies offers a secure Paper Shredding Service in Minneapolis that come directly to your office or home, no matter where you’re located in Minneapolis",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Paper Shredding in Minneapolis Minnesota",
    blocks: [
      { p: "When Recycle Technologies shred old documents, we make sure to follow a procedure that is highly secure and deliberate. We process materials in such a way so as not to compromise the integrity of your data or information whether it be confidential or pertaining to a comparatively minor job." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "Recycle Technologies makes use of the latest technologies and equipment. We have highly skilled mechanics that can tackle any challenge – there’s nothing they can’t do! In addition to being the AAA NAID-certified paper shredding company in Minneapolis, we’re also one of the most reputed paper shredding companies in Minneapolis. Our standards are high, and we challenge ourselves to work hard and deliver quality services at a competitive price with exceptional customer support. Call us at +1 763-559-5130 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Minneapolis, Minnesota", blocks: [
      { p: "To counteract this, Recycle Technologies recommends that you shred any sensitive or private information from documents that employees send out to customers and their colleagues via email or mail so that your employees can rest well knowing their private corporate information is no longer traceable to their own person. By doing so, you’ll be collecting trash for the sake of the environment at the same time! Paper shredding not only protects personal, private or sensitive data from falling into the wrong hands but also helps you recycle waste paper. Document destruction allows you to maintain a clutter-free and clean environment." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Minneapolis Trusted Choice For shredding & Destruction Services" },
      { p: "We offer Secure Paper Shredding services All over the Minneapolis and nearby areas." },
      { h2: "Request a Free Quote for Shredding Services in Minneapolis" },
      { p: "Customers are looking for companies that they can trust with their highly sensitive and confidential information. While keeping customer’s privacy in mind is important, there are shocking statistics that relate to information security nowadays. It is surprising how many companies don’t have a [shredding schedule](quote) in place. It is even common for businesses to hold onto old records such as paper documents, hardcopies of digital files, CDs, DVDs, etc. that contain sensitive personal information that shouldn’t be disposed of carelessly or even worse; kept somewhere vulnerable! Call us at +1 763 305-3040 or fill out the inquiry form to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
