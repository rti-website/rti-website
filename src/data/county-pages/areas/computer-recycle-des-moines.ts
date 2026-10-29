import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Environmental-Friendly Computer Recycling in Des Moines Minnesota, /computer-recycle-des-moines/
 * Brought back 29 Oct 2026 (management: the old URLs on the sheet "RTI
 * Currently redirect pages" are pages again, with no redirect). Built on the
 * county template like the 28 Oct batch (Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333). The old WordPress page's copy word for word,
 * from the Wayback Machine capture of 15 Jun 2026 (the page is not in the
 * 15 Sep 2026 backup).
 * Corrections:
 *   "where you are in Minneapolis" reads "where you are in Des Moines".
 */
export const COMPUTER_RECYCLE_DES_MOINES: CountyPage = {
  url: "/computer-recycle-des-moines/",
  state: "Iowa",
  county: "Des Moines",
  service: "Computer Recycling",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: "Computer Recycling Des Moines Minnesota | Call (800) 969-5166",
    description: "Computer recycling Des Moines Minnesota for laptops, desktop towers, servers, memory units, and accessories, accepted through structured receiving and processing steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Environmental-Friendly Computer Recycling in Des Moines Minnesota",
    crumb: "Environmental-Friendly Computer Recycling in Des Moines Minnesota",
    lead: "Recycle Technologies – Bringing you innovative computer recycling solutions all across Des Moines Minnesota.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Secure Services for Computer Recycling in Des Moines",
    blocks: [
      { p: "Managing your company’s tech resources like computers, printers, and laptops is not difficult anymore, but what is difficult is when you need to discard the old machines and get new ones. That’s where we jump in. Recycle Technologies is your local partner, offering reliable computer recycling services in Des Moines, Minnesota. Whether you need to get rid of a single computer or you have them in bulk, we have you covered. With our commitment to a safer environment, we pick up your worn-out computers and promise to discard them using computer recycling methods that leave no residual in landfills. Call us now at +1 763-559-5130 and schedule a pickup." },
      { h: "Our Goal for Computer Recycling in Des Moines, Minnesota" },
      { p: "Since 1993, our team of recycling specialists has been recycling end-of-life tech resources including laptops, computers, printers, etc in compliance with legal and environmental policies. We aim to provide waste-free and greener computer recycling services for small businesses as well as huge corporations working in Des Moines. After picking up the recycling material from your location, the team at Recycle Technologies handles the rest and lets you be a part of making the planet waste-free with our certified computer recycling solutions." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Protection of Data", text: "Protection of the valuable data on your devices is one of our priorities and we make sure all of your data is erased using a proper protocol before we put them into the computer recycling process." },
      { title: "A Fair Return", text: "We take pride in offering the most affordable computer recycling solutions in Des Moines, Minnesota. The team at Recycle Technologies reviews the value of your items and gives you a fair return at the end." },
      { title: "Certified Partner", text: "When it comes to the best computer recycling in Des Moines Wisconsin, Recycle Technologies stands among the top names with its certified and licensed computer recycling processes." },
      { title: "Electronic Waste Management", text: "The computer recycling techniques used by our professionals are designed to lower the electronic waste entering the landfills and make the environment more sustainable and healthy to live in." },
    ] },
    { kind: 'text', heading: "Looking for Dependable Computer Recycling Services in Des Moines?", blocks: [
      { p: "If you are in search of the right company to trust with the appropriate recycling of your tech assets, look no further. We at Recycle Technologies offer computer recycling services in Des Moines, Minnesota you can rely on. No matter where you are in Des Moines or whatever the size or quantity of your recycling material, just give us a call at +1 763-559-5130 and we will handle everything." },
    ] },
  ],
}
