import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Computer Recycling in Minneapolis Minnesota, /minnesota-recycling/computer-recycle-minneapolis/
 * Brought back 28 Oct 2026 (redirect sheet "RTI Currently redirect pages",
 * action Restore: rebuild at the same URL, the keeper for Minneapolis
 * electronics and computer recycling; it had 301'd to /minnesota-recycling/minneapolis/).
 * Built on the county template like Computer Recycling in Madison (Figma
 * BVtf2AOuUOcYbiMIlcKmbC board 7084:80230, phone 7084:80535).
 * The old WordPress page's copy word for word, from the Wayback Machine
 * capture of 15 Jun 2026 (the page is not in the 15 Sep 2026 backup), except
 * where it named the wrong city: "Des Moines, Minnesota" and "Des Moines
 * Wisconsin" read "Minneapolis, Minnesota", and "and Des Moines" after
 * Minneapolis is left out (no Iowa facility; the Des Moines pages 301 away).
 */
export const COMPUTER_RECYCLE_MINNEAPOLIS: CountyPage = {
  url: "/minnesota-recycling/computer-recycle-minneapolis/",
  state: "Minnesota",
  county: "Minneapolis",
  service: "Computer Recycling",
  figma: { board: "7084:80230", phone: "7084:80535" },
  seo: {
    title: 'Computer Recycling Minneapolis MN Call (800) 969-5166',
    description: "Computer recycling Minneapolis Minnesota for desktops, laptops, servers, and peripherals, with controlled intake, data removal, and material processing. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Computer Recycling in Minneapolis Minnesota',
    crumb: "Computer Recycling in Minneapolis Minnesota",
    lead: "Bringing you innovative computer recycling solutions all across Minneapolis Minnesota.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Secure Services for Computer Recycling in Minneapolis",
    blocks: [
      { p: "Managing your company’s tech resources like computers, printers, and laptops is not difficult anymore, but what is difficult is when you need to discard the old machines and get new ones. That’s where we jump in. Recycle Technologies is your local partner, offering reliable computer recycling services in Minneapolis, Minnesota. Whether you need to get rid of a single computer or you have them in bulk, we have you covered. With our commitment to a safer environment, we pick up your worn-out computers and promise to discard them using computer recycling methods that leave no residual in landfills." },
      { p: "Call us now at +1 763-559-5130 and [schedule a pickup](pickup)." },
      { h: "Our Goal for Computer Recycling in Minneapolis, Minnesota" },
      { p: "Since 1993, our team of recycling specialists has been recycling end-of-life tech resources including laptops, computers, printers, etc in compliance with legal and environmental policies. We aim to provide waste-free and greener computer recycling services for small businesses as well as huge corporations working in Minneapolis. After picking up the recycling material from your location, the team at Recycle Technologies handles the rest and lets you be a part of making the planet waste-free with our certified computer recycling solutions." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Protection of Data", text: "Protection of the valuable data on your devices is one of our priorities and we make sure all of your data is erased using a proper protocol before we put them into the computer recycling process." },
      { title: "A Fair Return", text: "We take pride in offering the most affordable computer recycling solutions in Minneapolis, Minnesota. The team at Recycle Technologies reviews the value of your items and gives you a fair return at the end." },
      { title: "Certified Partner", text: "When it comes to the best computer recycling in Minneapolis, Minnesota, Recycle Technologies stands among the top names with its certified and licensed computer recycling processes." },
      { title: "Electronic Waste Management", text: "The computer recycling techniques used by our professionals are designed to lower the electronic waste entering the landfills and make the environment more sustainable and healthy to live in." },
    ] },
    { kind: 'text', heading: "Looking for Dependable Computer Recycling Services in Minneapolis?", blocks: [
      { p: "If you are in search of the right company to trust with the appropriate recycling of your tech assets, look no further. We at Recycle Technologies offer computer recycling services in Minneapolis, Minnesota you can rely on. No matter where you are in Minneapolis or whatever the size or quantity of your recycling material, just give us a call at +1 763-559-5130 and we will handle everything." },
    ] },
  ],
}
