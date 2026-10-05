import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * East Bethel Recycling, /minnesota-recycling/east-bethel/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7084:79268, phone 7084:79779 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const EAST_BETHEL: CountyPage = {
  url: "/minnesota-recycling/east-bethel/",
  state: "Minnesota",
  county: "East Bethel",
  figma: { board: "7084:79268", phone: "7084:79779" },
  seo: {
    title: 'East Bethel, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling East Bethel for consoles, modems, power cords, ink units, and small electronics, received through verified intake and processing steps. Call (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in East Bethel, MN',
    crumb: "East Bethel Recycling",
    lead: "Recycle technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "East Bethel Center Recycling",
    blocks: [
      { p: "East Bethel is one of several cities where we provide recycling services to. East Bethel is a city in Anoka County. East Bethel is famous for Coon Lake Park and Forest Trail. Residents of East Bethel can rely on our Blaine Recycling Center for their recycling needs. Please check below which items we accept in our recycling center. You can choose to drop off your items at our facility, or you can always use our mail in program." },
      { p: "Proper Disposal of waste is not only great for the environment but a sensible thing to do. Companies and Businesses can rely on us to recycle their waste. You can avail of our immaculate service using a request a pickup form. Our team will pick up your waste and recycle it responsibly." },
      { p: "Recycle Technologies Inc is a name you can count upon. We have been providing recycling services since 1993. Our state-of-the-art facilities can help recycle & reduce carbon emissions. We are an EPA Certified Recycler in the Midwest. We are AAA NAID Data destructor. This suggests that we can destroy data from devices securely. Recycling done right , recycling done simply. Here is a list of places we provide recycling service to:" },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
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
