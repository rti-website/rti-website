import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Recycling Solutions for All! in Minneapolis, /minnesota-recycling/minneapolis/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:80751, phone 7084:81055 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const MINNEAPOLIS: CountyPage = {
  url: "/minnesota-recycling/minneapolis/",
  state: "Minnesota",
  county: "Minneapolis",
  figma: { board: "7084:80751", phone: "7084:81055" },
  seo: {
    title: "Recycling Services in Minneapolis | (800) 969-5166",
    description: "Recycling services in Minneapolis supporting electronics, batteries, lighting waste, paper output, secure handling, and processing. Call (800) 969-5166",
  },
  hero: {
    h1: "Recycling Solutions for All! in Minneapolis",
    crumb: "Recycling Solutions for All! in Minneapolis",
    lead: "Let’s revolutionize the way you dispose of your electronic waste with Recycle Technologies.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Recycling Services in Minneapolis",
    blocks: [
      { p: "At Recycle Technologies, we’re helping community reach its sustainability goals with a revolutionary solution in recycling. Recycle Technologies is one of the leading recycling companies in Minnesota, specializing in Electronics, Light Bulbs, Batteries, TVs or Ballasts recycling. Since 1993, we have been providing our professional recycling knowledge services to businesses and local governments. We have been successfully lowering the volume of waste going into the garbage dumps, lowering our carbon footprint and improving the overall sustainability of the environment. All of our services are carried out against our commitment to high-quality standards and a transparent pricing structure. We offer recycling services in all major cities in Minnesota – including Minneapolis, St. Paul, Duluth and more." },
      { h: "Minneapolis Recycling Dropoff Location" },
      { p: "Drop off your recycling material at our facility for affordable and safe recycling services. Your convenience is important to us which is why we offer pickup services all across Green Bay Wisconsin for all kinds of recycling solutions. You can schedule a pickup by calling us at or by filling out [a form](pickup) ." },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Sustainable", text: "Protecting the future by choosing to recycle all of our waste – nothing goes to landfill." },
      { title: "Forward Thinking", text: "Coming up with new ideas and innovations to make the recyclable process easier." },
      { title: "Reliable & Flexible", text: "A flexible and adaptable collection for your waste, that can be customized to meet your very individual requirements." },
      { title: "Certified", text: "We will provide you with Certificate of Destruction and ensures that your recycled material stay out of landfills." },
    ] },
    { kind: 'text', heading: "Make A Difference, Start Recycling Today", blocks: [
      { p: "We are experts in providing recycling services. Our service conserves resources, saves you time and money, and is friendly for the environment too! We’d love to give you a quote and could make sure you are getting the best value possible. Call us at (800) 969-5166 or fill out [this form](quote) so we can talk further" },
    ] },
  ],
}
