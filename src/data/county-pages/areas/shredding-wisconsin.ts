import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Paper Shredding Service Wisconsin, /shredding-wisconsin/
 * Built 8 Oct 2026 on the county template, Figma BVtf2AOuUOcYbiMIlcKmbC board
 * 7052:28731, phone 7052:34333, laid out like Document Shredding Minnesota.
 * The old WordPress page's copy word for word (15 Sep 2026 backup), except:
 * "Minnesota Shredding Locations" over the Wisconsin cities reads Wisconsin,
 * and each city's line said "battery recycling services", which reads
 * "shredding services". Its links to Milwaukee, Racine and Madison shredding
 * pages are plain text (those 301 to /paper-shredding-services/); Green Bay
 * and Waukesha link to their pages here.
 */
export const SHREDDING_WISCONSIN: CountyPage = {
  url: "/shredding-wisconsin/",
  state: "Wisconsin",
  county: "Wisconsin",
  areaServed: "Wisconsin",
  service: "Document Shredding",
  figma: { board: "7052:28731", phone: "7052:34333" },
  seo: {
    title: 'Paper Shredding Service in Wisconsin | Call (800) 969-5166',
    description: "Paper shredding service Wisconsin businesses rely on for secure disposal of sensitive documents, archived files, and records. Call (800) 969-5166",
  },
  hero: {
    h1: 'Paper Shredding Service Wisconsin',
    crumb: "Shredding Wisconsin",
    lead: "We offer fast, reliable and cost effective shredding services in Wisconsin",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
    secondary: { label: "Get a Quote", href: QUOTE_HREF },
  },
  about: {
    heading: "Wisconsin Shredding Service",
    blocks: [
      { p: "Are you looking for a one-off purge shredding service or want to set up a regular shredding service to remove your confidential data in Wisconsin?" },
      { p: "Look no further than Recycle Technologies. We collect from a good 100-mile radius servicing Wisconsin and surrounding areas. We have a state-of-the-art shredding facility in Wisconsin, and we are AAA NAID certified. Recycle Technologies offers secure document shredding and confidential waste disposal services." },
      { h: "Secure & Affordable Shredding Services in Wisconsin" },
      { p: "We take pride in helping our valued customers with their shredding requirements. We guarantee to offer you an affordable price and peace of mind." },
      { h: "Shredding Service Options" },
      { p: "Below is the list of our shredding services in Wisconsin. Consider your volume and frequency when selecting a service. We can also offer you bespoke solutions according to your needs. Need to speak to our expert, call us at (800) 305-3040 or fill out [the form](quote)." },
    ],
  },
  sections: [
    { kind: 'text', heading: "Why Choose Recycle Technologies?", blocks: [
      { p: "Our local sales team will be ready to assist you all the time. We are flexible in scheduling and offer you a custom quotation." },
      { list: [
        { title: "We are local to you.", text: "" },
        { title: "Our facilities in Wisconsin are security vetted, and our staff is fully trained and friendly!", text: "" },
        { title: "We are only a few shredding companies in the Midwest to be AAA NAID certified member as a plant-based operation endorsed for paper/printed media, micro media, and computer hard drive destruction.", text: "" },
        { title: "We provide both shredding and recycling services at affordable costs.", text: "" },
      ] },
    ] },
    { kind: 'text', heading: "Wisconsin Shredding Locations", blocks: [
      { p: "We cover 100-mile radius and all major cities from our facility in Minnesota and Wisconsin. You can avail our services in the following major cities. Can not find your city? Call us at (800)969-5166 to speak to our sales expert." },
      { list: [
        { title: "Madison Shredding", text: "Take the burden off your shoulders by getting reliable shredding services in Madison from your trusted local partner." },
        { title: "Milwaukee Shredding", text: "Take the burden off your shoulders by getting reliable shredding services in Milwaukee from your trusted local partner." },
        { title: "Greenbay Shredding", text: "Take the burden off your shoulders by getting reliable shredding services in Greenbay from your trusted local partner.", href: href("/shredding-wisconsin/green-bay/") },
        { title: "Racine Shredding", text: "Take the burden off your shoulders by getting reliable shredding services in Racine from your trusted local partner." },
        { title: "Appleton Shredding", text: "Take the burden off your shoulders by getting reliable shredding services in Appleton from your trusted local partner." },
        { title: "Waukesha Shredding", text: "Take the burden off your shoulders by getting reliable shredding services in Waukesha from your trusted local partner.", href: href("/shredding-wisconsin/waukesha/") },
      ] },
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
