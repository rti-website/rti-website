import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * TV Recycling in Minnesota, /tv-recycling-in-minnesota/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:71425, phone 7084:71702 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const TV_RECYCLING_IN_MINNESOTA: CountyPage = {
  url: "/tv-recycling-in-minnesota/",
  state: "Minnesota",
  county: "Minnesota",
  areaServed: "Minnesota",
  service: "TV Recycling",
  figma: { board: "7084:71425", phone: "7084:71702" },
  seo: {
    title: "TV Recycling in Minnesota | Call (800) 969-5166",
    description: "TV recycling in Minnesota homes and facilities trust for disposal of flat screens, broken units, outdated models, and large televisions. Call (800) 969-5166",
  },
  hero: {
    h1: "TV Recycling in Minnesota",
    crumb: "TV Recycling in Minnesota",
    lead: "Are you one of these people looking to get rid of your old televisions? Then you must consider the option of recycling it.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Recycling Televisions in Minnesota",
    blocks: [
      { p: "Televisions are a must have in households all around the world. They are affordable and a solid means of entertainment. Since the invention of television in the middle of the 20th century, their technology has being revolutionized and updated constantly. From the deep back of a tube style CRT to a completely flat plasma television, their technology has indeed come a long way. Not only are the upgraded televisions full of exquisite features, they are reasonably priced as well. Because of this people update their televisions more often. Televisions which were once purchased and kept for 8-9 years or more are upgraded and replaced every four to five years!" },
      { h: "Getting Rid of Old Televisions" },
      { p: "But what happens to the old televisions? The owner of the television is responsible for properly disposing of their old or outdated televisions. Some people may leave them outside on the sidewalk in the hopes that someone else might pick it up. However, in many states this is illegal. If left on the sidewalk your garbage hauler may pick it up for you, but charge you a fee to do so. The best option is to find a reputable recycler in your city or state and recycle it. Are you one of these people looking to get rid of your old televisions? Then you must consider the option of recycling it. Recycle Technologies is an online business which accepts all kinds of televisions you are looking to get rid of." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Money in Recycling Electronic Gadgets", blocks: [
      { p: "Despite the moral satisfaction a person feels after recycling different things, getting paid for it brings a different kind of happiness. Electronic gadgets are a big source of money when it comes to recycling them." },
      { h2: "Electronics Recycling Events" },
      { h: "Everyday is Earth Day" },
      { p: "If you are an individual or organization looking for ideas or need help in conducting events on the importance of recycling, then you can take our assistance. At Recycle Technologies, we are devoted to arrange your recycling awareness event in the most unique, interactive, and effective way possible. Call or email today for more information on how to schedule your event!" },
      { p: "Always remember, when in doubt about recycling an electronic gadget, it is best to consult a recycling specialist to keep things on the safe side!" },
      { h2: "Minnesota Television Recycling Services" },
      { p: "Residents of Minnesota are largely aware of the importance of recycling their electronics, particularly, their old televisions. The Minnesota Pollution Control Agency has several outlets which accept all kinds of televisions and other electronic waste for the purpose of recycling. They raise awareness about televisions occupying extra space in landfills and having a harmful impact on the environment. Complying by all the rules and regulations, the sole aim of this agency is to collect as many televisions as possible and have them recycled. This not only prevents landfill growth but it also reduces the amount of toxic chemicals in the environment." },
      { p: "For the people of Minnesota, Recycle Technologies should be the number one choice when it comes to recycling their televisions. Following an extremely transparent procedure, we guarantee that your television sets are disposed of in the most efficient and safe way. We also offer pickup services for businesses." },
      { p: "At Recycle Technologies, we sort the television sets into different categories. For example, sorting to either recycle or reuse. This means that if it is in working condition and people are able to reuse it, then it can be donated for continued use. Otherwise, if the television set is not in working conditions, or if it is an outdated CRT type television, it is sorted for recycling. Contact us today, get your televisions recycled, and join us in making the world a greener, better, and safer place to live in." },
      { h2: "Find the Right Recycling Service for Your Project" },
      { p: "Begin your search for the right Shredding Service by calling us at (800)969-5166, filling out [the form](quote) or contact us directly with the live chat. We will immediately connect you with trusted provide in your area and send you free quote on local service." },
      { p: "Be sure to check out what our customers saying about Recycle technologies service. we have help over 1 million customers connecting with shredding providers nationwide." },
    ] },
  ],
}
