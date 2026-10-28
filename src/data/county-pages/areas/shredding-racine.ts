import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Racine Paper Shredding Services, /shredding-wisconsin/racine/
 * Brought back 28 Oct 2026 (redirect sheet "RTI Currently redirect pages",
 * action Restore: rebuild at the same URL; it had 301'd to
 * /paper-shredding-services/). Built on the county template like the 8 Oct
 * batch (Figma BVtf2AOuUOcYbiMIlcKmbC board 7052:28731, phone 7052:34333).
 * The old WordPress page's copy word for word, from the Wayback Machine
 * capture of 15 Jun 2026 (the page is not in the 15 Sep 2026 backup); only
 * "Racine,Wisconsin" gets its space. Its "recycling" link is plain text.
 */
export const SHREDDING_RACINE: CountyPage = {
  url: "/shredding-wisconsin/racine/",
  state: "Wisconsin",
  county: "Racine",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Paper Shredding Services in Racine | Call (800) 969-5166',
    description: "Paper shredding services Racine for statements, contracts, medical files, and archived paperwork, destroyed through controlled processes with documented completion. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Racine Paper Shredding Services',
    crumb: "Racine Paper Shredding Services",
    lead: "We offer document shredding in Racine, Wisconsin, as well as nearby areas. Contact us if you need fast and secure Racine shredding services.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Document Shredding in Racine Wisconsin",
    blocks: [
      { p: "We here at Recycle Technologies take your confidential and sensitive data very seriously. We run a 6-step shredding process and audit our processes every year to ensure that you have full trust in us should you choose our document destruction services!" },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "At Recycle Technologies, we use high tech and equipment. We have highly skilled mechanics. Our company’s shredding services for our esteemed clients in Racine, Wisconsin are #1 in the industry. We follow meticulous standards that meet or exceed industry-leading standards. Our goal is 100% customer satisfaction, and to offer quality products at a competitive price within a defined timeline. In addition, we recycle all scrap metal materials which significantly reduces waste sent to landfills and ensures minimal damage to the environment! Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Racine, Wisconsin", blocks: [
      { p: "Companies are now going digital and heading in more sustainable directions. The lifecycle of a document doesn’t end until it’s been properly destroyed. We aim to protect your private business information." },
      { p: "If you’re ever confronted with sensitive or private information about your customers, company, or employees, we recommend shredding the documents that contain such confidential data. Shredding is the best way to ensure that your information remains untraceable and out of circulation because it’s being recycled for a better environment. Recycle Technologies looks forward to assisting you or your company in Racine, Wisconsin!" },
      { p: "Paper shredding protects confidential, personal and sensitive data, plus it can be good for our world as a whole! You see, paper shredding is a form of recycling because it reduces the amount of paper in circulation, which means fewer trees need to be harvested to make new paper." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Racine Trusted Choice For shredding & Destruction Services" },
      { p: "We offer broad range of shredding services in Racine, Wisconsin nearby areas" },
      { h2: "Request a Free Quote for Shredding Services in Racine" },
      { p: "Customers will always look for secure companies that are trustworthy, and they can trust that all information they provide is protected. Today, it is important to protect sensitive information in any way possible so our experts at Recycle Technologies take security seriously and all of our staff are trained, qualified professionals who know how to handle confidential material more safely than you would imagine. Having trusted employees handling the shredding process shows your customers that you put your company’s reputation above anyone else’s. When it comes to paper shredding in Racine Wisconsin, there’s only one name you have to know!" },
      { p: "Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
