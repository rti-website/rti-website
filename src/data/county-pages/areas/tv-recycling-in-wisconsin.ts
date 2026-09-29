import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * TV Recycling In Wisconsin, /tv-recycling-in-wisconsin/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:70946, phone 7084:71229 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const TV_RECYCLING_IN_WISCONSIN: CountyPage = {
  url: "/tv-recycling-in-wisconsin/",
  state: "Wisconsin",
  county: "Wisconsin",
  areaServed: "Wisconsin",
  service: "TV Recycling",
  figma: { board: "7084:70946", phone: "7084:71229" },
  seo: {
    title: "TV Recycling in Wisconsin | Call (800) 969-5166",
    description: "TV recycling Wisconsin for smart televisions, LCD panels, plasma screens, CRT units, and display equipment, accepted through verified intake and processing steps. Call (800) 969-5166.",
  },
  hero: {
    h1: "TV Recycling In Wisconsin",
    crumb: "TV Recycling In Wisconsin",
    lead: "Are you one of these people looking to get rid of your old televisions? Then you must consider the option of recycling it.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Recycling Televisions in Wisconsin",
    blocks: [
      { p: "In the good old days, televisions were considered luxurious commodities, and only a few people here and there owned a television. But as time went on, the number of televisions increased and has become an essential asset of every house. Thousands of televisions are purchased every day all over the United States. This implies that a thousand older televisions are thrown out or gotten rid of in one or another. As per an estimate, more than 35 million television sets were shipped to the United States in the year 2012. almost everyone was sold out by the end of 2013!" },
      { p: "Even though the State of Wisconsin has banned the throwing of televisions in junk or garbage, old television sets often end up in the trash bins. These devices are picked up by garbage collectors, crushed, and then dumped into different landfills. While in the landfills, these television sets not only take up lots of space, but they also harm the nearby land." },
      { p: "Here are some toxic materials that are found inside most of the television sets." },
      { p: "1. Older television sets with cathode ray tubes (CRTs) impose a great to living things in the vicinity. This is because these tubes are filled with heavy metals such as lead and cadmium. Once these heavy metals are out in the environment, they can cause health implications for the whole environment." },
      { p: "2. The newer versions of televisions are filled with mercury tubes. Mercury is a very harmful metal and can cause some damage to all the living things that come in contact with it." },
      { p: "When television sets are left out into the open area of landfills, there is a chance that rain will fall upon them. The rainwater will mix with the heavy metals, seep into the land, and raise havoc for every living creature in the vicinity." },
      { h: "Mail in Program" },
      { p: "We offer a nationwide Universal Waste Mail-In Program, making it easy to recycle your light bulbs with us from anywhere in the country." },
      { p: "1. Purchase your Mail-In Boxes by calling +1 763-559-5130 or going to Mail-in Program." },
      { p: "2. Fill boxes with spent bulbs" },
      { p: "3. Ship back to us with FedEx and the prepaid shipping label we included in your Mail-In box!" },
    ],
  },
  sections: [
    { kind: 'text', heading: "Process of Recycling a Television", blocks: [
      { p: "Once you take your old television to a nearby recycling facility, they more or less follow the same procedure to recycle it." },
      { p: "1. Piece-by-piece, experts take out all the parts and separate them from one another. Each component is kept in separate piles." },
      { p: "2. Television parts that are made out of wood, copper, and plastic are separately dismantled, brought down to their basic level, and then sold off in their respective markets." },
      { p: "3. The circuit boards of the televisions are made of precious metals in most cases, so that is why they are sent to specialists for further extraction and examination." },
      { p: "4. Cathode ray tubes and mercury tubes are recycled carefully and disposed of in the safest way possible." },
      { p: "Always remember, when in doubt about recycling an electronic gadget, it is best to consult a recycling specialist to keep things on the safe side!" },
      { h2: "Wisconsin Television Recycling Services" },
      { p: "There are many outlets in the Wisconsin state where your television can be dropped off. One such organization is Recycling Technologies. With their extensive experience in electronics recycling, they are one of the best options to consider when it comes to recycling televisions. They have a much-defined set of standards that comply with all the rules and regulations of the state. Recycle Technologies provides a safe, secure, and desirable disposal of your television sets. Their efficient team can guide you through the best way of disposing of your television. By visiting the online portal, you can find the best solution for your electronic waste in a few clicks." },
      { h2: "Find the Right Recycling Service for Your Project" },
      { p: "Begin your search for the right Shredding Service by calling us at +1 262-798-3040, filling out [the form](quote) or contact us directly with the live chat. We will immediately connect you with trusted provide in your area and send you free quote on local service. Be sure to check out what our customers saying about Recycle technologies service. we have help over 1 million customers connecting with shredding providers nationwide." },
    ] },
  ],
}
