import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * TV Recycling in Green Bay, /wisconsin-recycling/tv-recycling-green-bay/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333. The old WordPress page's copy word for word
 * (15 Sep 2026 backup), laid out like TV Recycling in Waukesha. The hero lead
 * stopped mid-sentence ("…with your trusted"); it ends as Waukesha's does.
 */
export const TV_RECYCLING_GREEN_BAY: CountyPage = {
  url: "/wisconsin-recycling/tv-recycling-green-bay/",
  state: "Wisconsin",
  county: "Green Bay",
  service: "TV Recycling",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'TV Recycling in Green Bay WI | Call (800) 969-5166',
    description: "TV recycling Green Bay Wisconsin for LED panels, smart televisions, plasma units, CRT sets, and display screens, accepted through verified intake procedures. Call (800) 969-5166.",
  },
  hero: {
    h1: 'TV Recycling in Green Bay Wisconsin',
    crumb: "TV Recycling in Green Bay",
    lead: "Make retiring your old TVs easier by collaborating with your trusted TV recycling partner in Green Bay Wisconsin.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Customized TV Recycling Solutions for You",
    blocks: [
      { p: "Tired of watching your favorites on that old TV of yours? Perhaps it’s time for you to say goodbye to it and get a new one. But before you do it, let us help you recycle your old TVs so that you don’t feel guilty about contaminating the earth." },
      { p: "Recycle Technologies is one of the reputable TV recycling companies in Green Bay and provides Recycling Services all over Wisconsin. Understanding the risks of carelessly retiring your electronic assets like TVs and LED screens helps us adopt sustainable, harmless, and responsible TV recycling methods. Our [TV recycling services](/tv-recycling/) in Green Bay involve everything from pickup to recycling certification at the end." },
      { h: "Get Convenient TV Recycling in Green Bay Wisconsin" },
      { p: "The team at Recycle Technologies works under strict ethical and legal guidelines that ensure that no harmful elements from electronic devices like TVs are released into landfills. With years of experience, advanced recycling techniques, and environmental protection standards, we offer services tailored to your individual or business needs. We have completed several TV recycling projects for our valuable clients all over Green Bay. Our TV recycling services are convenient, trustworthy, and affordable, which you can get by [filling out the form](quote) or calling us at +1 262-798-3040" },
    ],
  },
  sections: [
    { kind: 'features', cards: [
      { title: "Nature Friendly", text: "The TV recycling solutions used by Recycle Technologies are carefully reviewed by our expert team so that we can play our part in preserving the natural environment as well as removing your electronic waste." },
      { title: "Legal Compliance", text: "The TV recycling solutions used by Recycle Technologies are carefully reviewed by our expert team so that we can play our part in preserving the natural environment as well as removing your electronic waste." },
      { title: "Certification", text: "After the successful recycling process of your electronic devices, we provide our clients with a recycling certificate that they can use for legal or commercial purposes." },
      { title: "Personalized Services", text: "We serve our clients with TV recycling services for TV screens of every brand, size, and technology. Our services are personalized to your projects, no matter how small or large they are." },
    ] },
    { kind: 'text', heading: "Looking for Reliable Green Bay TV Recycling Services?", blocks: [
      { p: "Not sure what to do with your old TVs? Recycle Technologies is glad to help you recycle your end-of-life electronic devices using harmless recycling solutions. Whether you have one TV you want to get rid of or a whole bunch of them, you can always count on us." },
      { p: "All you have to do is [fill out the form](quote) to get a free quote or directly call us at +1 262-798-3040 and our experts will guide you about the whole process." },
    ] },
  ],
  company: {
    name: "Recycle Technologies",
    text: "Providing reliable and certified electronics recycling services at individual and business levels.",
    lines: [
      { kind: 'hours', text: "Monday – Friday: 7:30 am – 4:00 pm" },
      { kind: 'hours', text: "Saturday – Sunday: Closed" },
      { kind: 'phone', text: "+1 262-798-3040", tel: "+12627983040" },
    ],
  },
}
