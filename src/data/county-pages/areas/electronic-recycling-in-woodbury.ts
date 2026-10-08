import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Electronic Recycling in Woodbury, /minnesota-recycling/electronic-recycling-in-woodbury/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333. The old WordPress page's copy word for word
 * (15 Sep 2026 backup), except: its Top Sights heading read "Appleton Top
 * Sights" over Woodbury's sights, so it says Woodbury. The "Lessening your
 * carbon footprint" blog link is plain text (that post is not on this site).
 */
export const ELECTRONIC_RECYCLING_IN_WOODBURY: CountyPage = {
  url: "/minnesota-recycling/electronic-recycling-in-woodbury/",
  state: "Minnesota",
  county: "Woodbury",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Electronic Recycling Woodbury | Call (800) 969-5166',
    description: "Electronic recycling Woodbury for computers, servers, tablets, cabling, and components, received through documented intake and approved processing methods. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronic Recycling in Woodbury',
    crumb: "Electronic Recycling in Woodbury",
    lead: "Providing reliable and certified electronics recycling services at individual and business levels.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Electronic Recycling in Woodbury",
    blocks: [
      { p: "Recycle Technologies is your easy and convenient solution for recycling from anywhere. We provide expedited service regarding electronic recycling in Woodbury. At Recycle Technologies, our goal is to make recycling as accessible as possible regardless of your location. We are pleased to inform our clients that we offer a [mail-in program](mailin)." },
      { p: "Ship direct to us from anywhere with peace of mind. Whether you are local or statewide, we are here to help you do your part in saving the planet. We are a certified Recycler and have more than three decades of recycling. You can reach out to our Electronic Waste Experts who can easily help you with all your recycling needs by calling our number, or you can reach them by email." },
      { h: "Why Choose Recycle Technologies?" },
      { p: "If you wish to ship a high volume of electronic components, please call us, so we can provide you with solutions on how can you feasibly manage them. Recycle Technologies provides Electronic Recycling in Woodbury with accessibility in mind. For residents and companies, we offer three ways in which you can recycle with us. You can visit our nearest facility with the electronic goods that you want to recycle. Make sure to inform us that you are coming." },
      { p: "You can use a mail-in option. For that you need to fill out a form detailing what, and when you want to recycle. This way we can provide you prepaid shipping tags, so you can recycle responsibly. Lastly, for companies and businesses, Recycle Technologies also does pickups. For any feedback, suggestions, and queries you can easily talk to our electronic waste representatives. We are available 24/7." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Our Vision", blocks: [
      { p: "At Recycle Technologies we are happy to recycle your end-of-life electronics at each of our convenient locations, or you can use our mail-in facility to ship the electronic goods to us. You are in control. Recycle Technologies are certified AAA NAID recyclers in the whole Midwest. Companies and businesses can rest assured that we provide secure handling and destruction of the devices that contain data. We love to make things more convenient for our customers." },
      { p: "We are pleased to offer pick-up services for customers in Woodbury. Contact our customer support team to get details on how to avail of this service. Our rep will reach out and discuss how your recycling matters. Lessening your carbon footprint and greenhouse gases is the best way to repay the environment." },
    ] },
    { kind: 'features', cards: [
      { title: "Pioneers of Electronic Recycling", text: "We have been recycling electronics since 1993. For more than three decades we provide safe and secure services." },
      { title: "Dependable", text: "We are available 24/7, 5 days a week. We have two facilities in New Berlin and Blaine. Our specialists dispose of electronic goods in an efficient manner." },
      { title: "Recycling Options", text: "You can Visit our facilities if you are near, opt for our mail-in program, or request a pickup for a charge. Please contact our Customer Support Team for guidance on the above-mentioned solutions." },
      { title: "Fully Certified", text: "We are AAA NAID Recycler and are fully registered in both Wisconsin and Minnesota States. We provide recycling service in a coverage area of 100 miles." },
    ] },
    { kind: 'sights', heading: "Woodbury Top Sights", items: [
      "Afton Alps",
      "Afton State Park",
      "Battle Creek Regional Park",
      "Lake Phalen",
      "Battle Creek Dog Park",
      "Carver Lake Park",
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 763-559-5130", tel: "+17635595130" },
    ],
  },
}
