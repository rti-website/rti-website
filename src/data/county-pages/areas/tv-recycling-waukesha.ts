import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * TV Recycling in Waukesha, /wisconsin-recycling/tv-recycling-waukesha/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7065:6051, phone 7065:6805 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const TV_RECYCLING_WAUKESHA: CountyPage = {
  url: "/wisconsin-recycling/tv-recycling-waukesha/",
  state: "Wisconsin",
  county: "Waukesha",
  service: "TV Recycling",
  figma: { board: "7065:6051", phone: "7065:6805" },
  seo: {
    title: "TV Recycling in Waukesha | Call (800) 969-5166",
    description: "TV recycling Waukesha for flat-panel sets, smart displays, projection units, gaming screens, and television hardware, received through controlled intake procedures. Call (800) 969-5166.",
  },
  hero: {
    h1: "TV Recycling in Waukesha",
    crumb: "TV Recycling in Waukesha",
    lead: "Make retiring your old TVs easier by collaborating with your trusted TV recycling partner in Waukesha Wisconsin.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "Customized TV Recycling Solutions for You",
    blocks: [
      { p: "Tired of watching your favorites on that old TV of yours? Perhaps it’s time for you to say goodbye to it and get a new one. But before you do it, let us help you recycle your old TVs so that you don’t feel guilty about contaminating the earth." },
      { p: "Recycle Technologies is one of the reputable TV recycling companies in Waukesha and provides Recycling Services all over Wisconsin. Understanding the risks of carelessly retiring your electronic assets like TVs and LED screens helps us adopt sustainable, harmless, and responsible TV recycling methods. Our TV recycling services in Waukesha involve everything from pickup to recycling certification at the end." },
      { h: "Get Convenient TV Recycling in Des Moines" },
      { p: "The team at Recycle Technologies works under strict ethical and legal guidelines that ensure that no harmful elements from electronic devices like TVs are released into landfills. With years of experience, advanced recycling techniques, and environmental protection standards, we offer services tailored to your individual or business needs. We have completed several TV recycling projects for our valuable clients all over Waukesha. Our TV recycling services are convenient, trustworthy, and affordable, which you can get by filling out [the form](quote) or calling us at +1 262-798-3040" },
    ],
  },
  servicesHeading: "Recycling Services",
  sections: [
    { kind: 'features', cards: [
      { title: "Nature Friendly", text: "The TV recycling solutions used by Recycle Technologies are carefully reviewed by our expert team so that we can play our part in preserving the natural environment as well as removing your electronic waste." },
      { title: "Legal Compliance", text: "The TV recycling solutions used by Recycle Technologies are carefully reviewed by our expert team so that we can play our part in preserving the natural environment as well as removing your electronic waste." },
      { title: "Certification", text: "After the successful recycling process of your electronic devices, we provide our clients with a recycling certificate that they can use for legal or commercial purposes." },
      { title: "Personalized Services", text: "We serve our clients with TV recycling services for TV screens of every brand, size, and technology. Our services are personalized to your projects, no matter how small or large they are." },
    ] },
    { kind: 'text', heading: "Reliable Waukesha TV Recycling Services", blocks: [
      { p: "Looking for Reliable Waukesha TV Recycling Services? Not sure what to do with your old TVs? Recycle Technologies is glad to help you recycle your end-of-life electronic devices using harmless recycling solutions. Whether you have one TV you want to get rid of or a whole bunch of them, you can always count on us." },
      { p: "All you have to do is fill out [the form](quote) to get a free quote or directly call us at +1 262-798-3040 and our experts will guide you about the whole process." },
    ] },
  ],
}
