import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Duluth Shredding Service, /shredding-minnesota/duluth/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:75619, phone 7084:75899 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const SHREDDING_DULUTH: CountyPage = {
  url: "/shredding-minnesota/duluth/",
  state: "Minnesota",
  county: "Duluth",
  service: "Document Shredding",
  figma: { board: "7084:75619", phone: "7084:75899" },
  seo: {
    title: 'Duluth Paper Shredding & Document Destruction',
    description: "Duluth shredding service for secure disposal of business paperwork, archived files, and sensitive documents with scheduled pickup options. Call (800) 969-5166",
  },
  hero: {
    h1: 'Paper Shredding in Duluth, MN',
    crumb: "Duluth Shredding Service",
    lead: "Recycle Technologies offers a secure Paper Shredding Service in Duluth that come directly to your office or home, no matter where you’re located in Duluth",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Paper Shredding in Duluth MN",
    blocks: [
      { p: "Document destruction and document shredding are very important to us at Recycle Technologies. To ensure that your organization’s huge, small data, and confidential information are protected, we use a highly secure shredding procedure." },
      { h: "AAA NAID Certified Paper Shredding Company" },
      { p: "At Recycle Technologies, we use high tech and equipment. We have highly skilled mechanics. Our company’s shredding services for our esteemed clients in Duluth, Minnesota are #1 in the industry. We follow meticulous standards that meet or exceed industry-leading standards. Our goal is 100% customer satisfaction, and to offer quality products at a competitive price within a defined timeline. In addition, we recycle all scrap metal materials which significantly reduces waste sent to landfills and ensures minimal damage to the environment! Call us at or to receive free, no-obligation quotes from us today." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Secure Paper Shredding Services in Duluth, Minnesota", blocks: [
      { p: "While so many companies are going digital, there are plenty that still rely on traditional methods to keep their documents safe. While Recycle technologies a paper shredding company will certainly do the job of destroying confidential documents, if it is not the right one it can be an energy hog and use up your valuable time when you could be working on more productive things. Paper shredding not only protects personal, private or sensitive data from falling into the wrong hands but also helps you recycle waste paper. Document destruction allows you to maintain a clutter-free and clean environment." },
      { h2: "Why is Paper Shredding Important?" },
      { h: "Environmentally Friendly" },
      { h: "Privacy Compliance" },
      { h: "Shredding Documents Reduces Storage Costs" },
      { h: "Protect Your Customers And Clients" },
      { h2: "Duluth Trusted Choice For shredding & Destruction Services" },
      { p: "We offer Secure Paper Shredding services All over the Duluth and nearby areas ." },
      { h2: "Request a Free Quote for Shredding Services in Duluth MN" },
      { p: "Customers seek out companies that protect their sensitive information. It’s become a widespread business standard to offer clients peace of mind about their private details and security. You can trust us at Recycle Technologies to take care of any kind of confidential data with the utmost care, including but not limited to legal documents, medical records, financial information and data relating to your customers." },
      { p: "Call us at or fill out the to receive free, no-obligation quotes from us today. We will contact you shortly after receiving your request to provide you with free no-obligation quotes. We ensure your safety and security at all times." },
    ] },
  ],
}
