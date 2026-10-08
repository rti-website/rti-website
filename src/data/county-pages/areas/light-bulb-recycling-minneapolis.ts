import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Light Bulb Recycling Minneapolis, /light-bulb-recycling-minneapolis/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333 (Asim asked for it; the 6 Oct SEO redirect plan
 * had 301'd it to /minnesota-recycling/bulb-recycle-minneapolis/). The old
 * WordPress page's copy word for word (15 Sep 2026 backup), except:
 * "Flourescent" in two headings; a sentence that stopped at "hand them over
 * to an", finished as "an authorised recycler"; "trusted provide" is
 * "trusted providers".
 */
export const LIGHT_BULB_RECYCLING_MINNEAPOLIS: CountyPage = {
  url: "/light-bulb-recycling-minneapolis/",
  state: "Minnesota",
  county: "Minneapolis",
  service: "Light Bulb Recycling",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Light Bulb Recycling in Minneapolis | Call (800) 969-5166',
    description: "Light bulb recycling in Minneapolis for CFLs, tube lights, specialty lamps, and spent bulbs from homes and facilities. Call (800) 969-5166 today.",
  },
  hero: {
    h1: 'Light Bulb Recycling In Minneapolis',
    crumb: "Light Bulb Recycling Minneapolis",
    lead: "We eliminate the liability of your bulbs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Light Bulb Recycling in Minneapolis",
    blocks: [
      { p: "There is no life without light. To conveniently and safely remove darkness even during the night, the invention of light bulbs took place. With time, manufacturers started to use mercury in their bulbs. Mercury gives out a lot of light while using little energy. As these fluorescent lamps became more popular (due to less energy consumption) the use of chemicals in the bulbs increased." },
      { p: "There is no doubt that small amounts of mercury in a single bulb have little to no effect on the surroundings. But if these bulbs break or for some reason the contents of the bulbs leak, then it can cause significant damage to the environment. The State of Minnesota recognizes the implications of the harmful impact of fluorescent lamps on the environment. Keeping this in mind, awareness campaigns are conducted regularly throughout the year. There are many outlets, both government based and in the private sector throughout the state that accept old fluorescent lamps and recycle them." },
      { p: "It is vital to remember that recycling fluorescent lamps is mandatory. Any individual who fails to do so may face legal implications in Minnesota." },
      { h2: "Mail in Program" },
      { p: "We offer a nationwide Universal Waste Mail-In Program, making it easy to recycle your light bulbs with us from anywhere in the country." },
      { p: "1. Purchase your Mail-In Boxes by calling +1 763-559-5130 or going to [Mail-In Program](mailin)." },
      { p: "2. Fill boxes with spent bulbs" },
      { p: "3. Ship back to us with FedEx and the prepaid shipping label we included in your Mail-In box!" },
    ],
  },
  sections: [
    { kind: 'text', heading: "Recycling Process of Fluorescent Lamps", blocks: [
      { p: "The recycling process of fluorescent lamps generally involves the same steps for every organization performing the task. They are summarized as follows:" },
      { list: [
        { title: "1. The fluorescent bulbs are collected and contained within a box.", text: "" },
        { title: "2. Machines extract all the mercury from the bulbs.", text: "" },
        { title: "3. Metals such as aluminum are extracted and crush into a fine form.", text: "" },
        { title: "4. Glass is separated, crushed, and then further down-cycled for future usage.", text: "" },
        { title: "5. Each separated material is sent to organizations that accept them for further processing", text: "" },
      ] },
      { p: "Always remember, when in doubt about recycling an electronic gadget, it is best to consult a recycling specialist to keep things on the safe side!" },
      { h2: "What to do when Recycling Fluorescent Lamps?" },
      { p: "If one of your fluorescent lamps stops working, it is best to wrap it up in a sheet of paper or cloth and put it in a labeled box. Collect all the bulbs in that box with time. When you have collected more than 20 lamps or bulbs for recycling purposes, it is best to reach out to a local organization to find out how to dispose of them." },
      { p: "If for some reason you are unable to keep them intact and the bulb breaks, carefully collect all the pieces, wrap it up, put a distinct label on it and then deliver it to the nearest recycling outlet." },
    ] },
    { kind: 'text', heading: "Minnesota Light Bulb Recycling Services", blocks: [
      { p: "At [Recycle technologies](/) we accept all kinds of fluorescent lamps. It is vital to remember that we are one of the few organizations that recycle fluorescent bulbs and tubes onsite. We do not outsource the recycling work to any third party." },
      { p: "Fluorescent tubes are the most difficult to handle during disposal. Due to this reason, Recycle Technologies encourages citizens all around Minnesota to hire their services to recycle the tubes. Our recycling experts have vast experience in handling the process of fluorescent tube recycling. We follow an ethical, standardized, and regulated approach to our recycling techniques." },
      { p: "For further queries, contact or email us!" },
      { p: "Do not forget: batteries thrown on the pavements or in the regular garbage are not recycled in any scenario. It is vital to hand them over to an authorised recycler." },
      { p: "We accept all kinds of batteries, including those found in cars, laptops, mobile phones, and laptops." },
      { h2: "Find the Right Recycling Service for Your Project" },
      { p: "Begin your search for the right Recycling Service by calling us at (800)969-5166, [filling out the form](quote) or contact us directly with the live chat. We will immediately connect you with trusted providers in your area and send you free quote on local service." },
      { p: "Be sure to check out what our customers saying about Recycle technologies service. we have help over 1 million customers connecting with shredding providers nationwide." },
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
