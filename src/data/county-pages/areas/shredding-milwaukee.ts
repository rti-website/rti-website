import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Milwaukee Shredding Service, /shredding-wisconsin/milwaukee/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 2 Sep 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "Milwaukee , Wisconsin" reads "Milwaukee, Wisconsin".
 */
export const SHREDDING_MILWAUKEE: CountyPage = {
  url: "/shredding-wisconsin/milwaukee/",
  state: "Wisconsin",
  county: "Milwaukee",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Shredding Service in Milwaukee | Call (800) 969-5166",
    description: "Shredding service Milwaukee for paperwork, legal files, billing statements, and archived records, destroyed using secure procedures with documented results. Call (800) 969-5166.",
  },
  hero: {
    h1: "Milwaukee Shredding Service",
    crumb: "Milwaukee Shredding Service",
    lead: "Recycle Technologies offers secure paper shredding in Milwaukee that come directly to your office or home, no matter where you’re located in Milwaukee",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Paper Shredding in Milwaukee Wisconsin",
    blocks: [
      { p: "Recycle Technologies treats document destruction and shredding very seriously. Our shredding process is highly secure to protect the big, small, and confidential data of your organization." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "At Recycle Technologies, we use modern technologies and tools. Our mechanics are highly skilled. We are among the very few AAA NAID certified paper shredding firms located in Milwaukee, Wisconsin. We strictly adhere to guidelines to ensure that we are meeting or exceeding the highest standards in the industry. We aim for 100% satisfaction of our customers, and we strive to provide Top-quality services at an affordable cost within a timeframe." },
      { p: "Recycle Technologies looks forward to aiding you or your business with your business in Milwaukee, Wisconsin." },
      { p: "Contact Recycle Technologies at +1 262-798-3040 or fill out our [inquiry form](quote) for no-cost, no-obligation quotes from us now." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Milwaukee, Wisconsin", blocks: [
      { p: "Businesses are moving to digital and are moving in the direction of sustainability. The lifecycle of documents will not stop until it is completely destroyed. We strive to secure your business’s private information. We suggest that you destroy any document with sensitive or personal information regarding your company, customers, and employees. Shredding documents ensures that all information you store is secure as well as being recycled to make the environment better." },
      { p: "Shredding paper not only safeguards sensitive, personal, or private information from falling into in the wrong hands, but it’s beneficial for the planet earth. Shredding documents allows businesses to clear up their mess safely and securely." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Milwaukee Trusted Choice For shredding & Destruction Services" },
      { p: "We offer broad range of shredding services in Milwaukee, Wisconsin" },
      { h2: "Request a Free Quote for Shredding Services in Milwaukee" },
      { p: "Customers are looking for trustworthy firms that safeguard their personal data. Security is an essential aspect of the business. You can be confident in Recycle Technologies with any type of sensitive data, which includes not only medical records, legal papers, financial documents, customer data, and so on." },
      { p: "If you are looking for shredding paper within Milwaukee, Wisconsin, it is time to set your anxieties at ease." },
      { p: "Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
