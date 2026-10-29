import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Des Moines Shredding Service, /shredding-minnesota/des-moines/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 16 Apr 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "Des Moines,Lowa" reads "Des Moines, Iowa".
 *   "Des Moines Lowa" reads "Des Moines Iowa".
 *   "Duluth Trusted Choice" reads "Des Moines Trusted Choice".
 */
export const SHREDDING_DES_MOINES: CountyPage = {
  url: "/shredding-minnesota/des-moines/",
  state: "Iowa",
  county: "Des Moines",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Shredding Service in Des Moines | Call (800) 969-5166",
    description: "Shredding service Des Moines for paper files, records, folders, and confidential documents, destroyed through controlled procedures with documented completion. Call (800) 969-5166.",
  },
  hero: {
    h1: "Des Moines Shredding Service",
    crumb: "Des Moines Shredding Service",
    lead: "Recycle Technologies offers a secure Paper Shredding Service in Des Moines that come directly to your office or home, no matter where you’re located in Des Moines",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Paper Shredding in Des Moines, Iowa",
    blocks: [
      { p: "Recycle Technologies is providing shredding services to Des Moines Metro Area, Waterloo, Fort Dodge, Ames, Cedar Rapids, Oskaloosa, Ottumwa and everywhere in between. We are providing safe, affordable paper shredding services to residents and businesses in Des Moines, Iowa." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "Our skilled team at Recycle Technologies are committed to protecting you, your valuable and confidential information. We are AAA NAID certified paper shredding companies in Des Moines Businesses in Des Moines should schedule monthly ongoing paper shredding services to cut down on the risk of fraud and data breaches. Usually a monthly schedule for cleaning out extra documents and setting up paper shredding services will greatly decrease the risk. We look forward to assisting you or your business in Des Moines. Call us at +1 763-559-5130 or fill out the inquiry form to receive free, no obligation [quotes from us today](quote)." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Des Moines Iowa", blocks: [
      { p: "For shredding services in Des Moines, Iowa we follow all rules and regulations while completing your job effectively and efficiently. Once your job is finished, we will provide you a certificate of destruction that proves you have followed the proper channels of record destruction and contributed to creating a sustainable environment." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Des Moines Trusted Choice For shredding & Destruction Services" },
      { p: "We offer Secure Paper Shredding services All over the Des Moines and nearby areas." },
      { h2: "Request a Free Quote for Shredding Services in Des Moines" },
      { p: "Recycle Technologies have got you covered whether you need to purge a whole storage room full of confidential documents or need on-call shredding service. We offer secure document shredding services in Des Moines. Give us a call at +1 763-559-5130 or [fill out the form](quote). We will give you competitive pricing options and ensure you are getting the best price in Des Moines for your shredding project." },
    ] },
  ],
}
