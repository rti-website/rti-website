import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Environmental-Friendly Computer Recycling in Madison Wisconsin, /wisconsin-recycling/computer-recycling-madison/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:80230, phone 7084:80535 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const COMPUTER_RECYCLING_MADISON: CountyPage = {
  url: "/wisconsin-recycling/computer-recycling-madison/",
  state: "Wisconsin",
  county: "Madison",
  service: "Computer Recycling",
  figma: { board: "7084:80230", phone: "7084:80535" },
  seo: {
    title: "Eco-Friendly Computer Recycling Madison WI | (800) 969-5166",
    description: "Eco-friendly computer recycling Madison Wisconsin for laptops, all-in-ones, thin clients, storage arrays, and peripherals, received and processed under approved handling steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "Environmental-Friendly Computer Recycling in Madison Wisconsin",
    crumb: "Environmental-Friendly Computer Recycling in Madison Wisconsin",
    lead: "Recycle Technologies – Bringing you innovative computer recycling solutions all across Madison, Wisconsin.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Secure Services for Computer Recycling in Madison",
    blocks: [
      { p: "Managing your company’s tech resources like computers, printers, and laptops is not difficult anymore, but what is difficult is when you need to discard the old machines and get new ones. That’s where we jump in. Recycle Technologies is your local partner, offering reliable computer recycling services in Madison, Wisconsin. Whether you need to get rid of a single computer or you have them in bulk, we have you covered. With our commitment to a safer environment, we pick up your worn-out computers and promise to discard them using computer recycling methods that leave no residual in landfills." },
      { p: "Call us now at +1 262-798-3040 and schedule a pickup." },
      { h: "Our Goal for Computer Recycling in Madison Wisconsin" },
      { p: "Since 1993, our team of recycling specialists has been recycling end-of-life tech resources including laptops, computers, printers, etc in compliance with legal and environmental policies. We aim to provide waste-free and greener computer recycling services for small businesses as well as huge corporations working in Madison. After picking up the recycling material from your location, the team at Recycle Technologies handles the rest and lets you be a part of making the planet waste-free with our certified computer recycling solutions." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Protection of Data", text: "Protection of the valuable data on your devices is one of our priorities and we make sure all of your data is erased using a proper protocol before we put them into the computer recycling process." },
      { title: "Pick up Services", text: "We take pride in offering the most affordable computer recycling solutions in Madison Wisconsin. The team at Recycle Technologies reviews the value of your items and gives you a fair return at the end." },
      { title: "Certified Partner", text: "When it comes to the best computer recycling in Madison Wisconsin, Recycle Technologies stands among the top names with its certified and licensed computer recycling processes." },
      { title: "Electronic Waste Management", text: "The computer recycling techniques used by our professionals are designed to lower the electronic waste entering the landfills and make the environment more sustainable and healthy to live in." },
    ] },
    { kind: 'text', heading: "Looking for Dependable Computer Recycling Services in Madison?", blocks: [
      { p: "If you are in search of the right company to trust with the appropriate recycling of your tech assets, look no further. We at Recycle Technologies offer computer recycling services in Madison Wisconsin you can rely on. No matter where you are in Madison or whatever the size or quantity of your recycling material, just give us a call at +1 262-798-3040 and we will handle everything." },
    ] },
  ],
}
