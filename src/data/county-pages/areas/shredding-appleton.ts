import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Appleton Shredding Services, /shredding-wisconsin/appleton/
 * Brought back 28 Oct 2026 (redirect sheet "RTI Currently redirect pages",
 * action Restore: rebuild at the same URL; it had 301'd to
 * /paper-shredding-services/). Built on the county template like the 8 Oct
 * batch (Figma BVtf2AOuUOcYbiMIlcKmbC board 7052:28731, phone 7052:34333).
 * The old WordPress page's copy word for word, from the Wayback Machine
 * capture of 2 Sep 2026 (the page is not in the 15 Sep 2026 backup); only
 * "Appleton,Wisconsin" gets its space and "information.!" loses its stray dot.
 */
export const SHREDDING_APPLETON: CountyPage = {
  url: "/shredding-wisconsin/appleton/",
  state: "Wisconsin",
  county: "Appleton",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Shredding Services in Appleton | Call (800) 969-5166',
    description: "Shredding services Appleton for paperwork, contracts, invoices, and sensitive files, destroyed using controlled methods with recorded completion. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Appleton Shredding Services',
    crumb: "Appleton Shredding Services",
    lead: "We offer Shredding Services Appleton, Wisconsin, as well as nearby areas.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Shredding Services Appleton in Wisconsin",
    blocks: [
      { p: "We at Recycle Technologies take document destruction and document shredding very seriously. We follow a highly secure recycling process to ensure that we protect your organization’s big, small data and confidential information!" },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "At Recycle Technologies, we use top of the range technology and gear. Our mechanics are highly trained, our standards of excellence are immaculate – we only employ the very best AAA NAID certified paper shredders in Appleton, Wisconsin. Operating under time pressure? We can accommodate you: we have a 24/7 emergency service ready to get you back on track with 100% customer satisfaction guaranteed! Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Appleton, Wisconsin", blocks: [
      { p: "Companies are moving towards going digital, which is great for the environment. The lifecycle of a document doesn’t end when you decide to take it down; it goes on until said document is properly destroyed. We aim to do our part in protecting your private information and ensuring that your business documents aren’t traceable after shredding them. Things like customer and employee information shouldn’t be spread around unnecessarily, so make sure to recycle personal information by regularly shredding any document containing such data. We look forward to helping protect you or your company in Appleton, Wisconsin!" },
      { p: "Paper shredding not only protects personal, private or sensitive data from falling into the wrong hands, but you are also helping your company’s carbon footprint. Document destruction helps your business stay lean, clean and mean by removing unnecessary materials from its offices’ trash cans." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Appleton Trusted Choice For shredding & Destruction Services" },
      { p: "We offer broad range of shredding services in Appleton, Wisconsin and nearby areas." },
      { h2: "Request a Free Quote for Shredding Services in Appleton" },
      { p: "Customers have trust in companies which guarantee the safety of their sensitive data. Nowadays, security is as much an obligation on a business’s list as profits, and we’re here to help ensure that your confidentiality records are handled with care—so you may rest easy knowing that your Appleton paper shredding environment is by no means vulnerable to threat! If you want to know more about the many advantages we offer, including our affordable prices and proximity to the greater Madison vicinity (as well as how we can assist whether it be financial records or confidential client information), then don’t hesitate to get in touch today." },
      { p: "Call us at +1 262-798-3040 or fill out the [inquiry form](quote) to receive free, no-obligation quotes from us today." },
    ] },
  ],
}
