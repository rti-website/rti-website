import type { ServicePageContent } from '@/data/service-page'
import { href } from '@/lib/urls'

/** /light-bulbs/ — copy from the "Light Bulb Recycling" doc, geometry from 6142:2048. */
export const CONTENT: ServicePageContent = {
  url: '/light-bulbs/',
  liveSeo: {
    title: 'Commercial Light Bulb Recycling | CFL, LED | (800) 969-5166',
    description: 'Commercial light bulb recycling for businesses, facilities, and organizations. Recycle fluorescent, CFL, LED & other lamps. Call (800) 969-5166.',
  },
  proposedSeo: {
    title: 'Light Bulb Recycling Services | Recycle Technologies',
    description: 'Recycle fluorescent, CFL, and other light bulbs with Recycle Technologies. Midwest facilities, nationwide mail-in program, R2v3-certified processing.',
  },
  hero: {
    crumb: 'Light Bulb Recycling',
    // Live H1 is "LIGHT BULB RECYCLING" — see the gate 2 note in the build docs.
    h1: 'Light Bulb Recycling Services',
    lead: 'Recycle Technologies has recycled fluorescent lamps and other light bulbs since 1993, processing everything at its own Minnesota and Wisconsin facilities rather than sending materials through a broker.',
    cta: { label: 'Get a Quote', href: href('/quote/') },
    image: '/images/services/hero-light-bulbs.png',
  },
  intro: {
    heading: 'What’s Light Bulb Recycling?',
    body: [
      'Light bulb recycling is the process of collecting used or spent bulbs and routing them through a facility equipped to separate and recover their components, rather than placing them in general trash. Fluorescent-type lamps in particular contain small amounts of mercury, which is why many organizations look for a recycler that can document how bulbs are handled from pickup through final processing.',
      'At Recycle Technologies, bulbs are broken down so their materials can be separated and directed to the appropriate next step. Mercury-contaminated phosphor powder and filters are shipped to a distillation company.',
      'Glass is put toward further use in industrial products, and aluminum end caps are collected and sent to an aluminum salvage partner. The company handles this work directly at its own Midwest facilities rather than outsourcing it to a third party.',
      'For businesses, facilities, and property managers, working with a recycler that manages the full process in-house makes it easier to account for where bulbs end up and to keep records tied to a documented recycling program rather than an unverified disposal method.',
    ],
    more: { label: 'Read More', href: '#how-we-recycle' },
    image: '/images/services/detail-intro.png',
  },
  accept: {
    heading: 'What We Accept',
    items: [
      { label: 'Fluorescent Bulbs', text: 'Tubes, plastic-coated and shielded tubes, compact fluorescent lamps (CFLs), green-tipped bulbs, circular lamps, and U-bend or U-shaped lamps.' },
      { label: 'Other Accepted Lighting', text: 'Ultraviolet (UV) lamps, neon, argon, and other cold cathode lamps, high-intensity discharge (HID) lamps including metal halide and high-pressure sodium, flood lamps, incandescent bulbs, and halogen bulbs.' },
    ],
    outro: 'Not sure whether a specific lamp type qualifies? Contact Recycle Technologies directly to confirm before scheduling a pickup or mail-in shipment.',
  },
  process: {
    heading: 'How Do We Recycle Light Bulbs?',
    intro: 'Recycling a bulb involves more than dropping it in a bin. Here’s what happens once a bulb leaves your facility and enters Recycle Technologies’ process, from collection through material recovery.',
    steps: [
      { label: 'Step 1: Collection', text: 'Businesses can schedule a pickup, which is available exclusively to commercial customers, or use Recycle Technologies’ nationwide Universal Waste Mail-In Program to ship bulbs from anywhere in the country.' },
      { label: 'Step 2: Packaging and Storage', text: 'Because the Department of Transportation regulates how bulbs are packaged for shipping, Recycle Technologies recommends its own fiber bins or the original boxes replacement bulbs arrived in. The company can also deliver packing materials to customers ahead of a scheduled pickup.' },
      { label: 'Step 3: Processing', text: 'Collected bulbs are processed directly at Recycle Technologies’ Minnesota and Wisconsin facilities. The company handles this step itself instead of routing materials through an outside broker.' },
      { label: 'Step 4: Separation', text: 'During processing, mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated from one another so each material can be directed to the right next step.' },
      { label: 'Step 5: Recovery', text: 'Phosphor powder and filters are shipped to a distillation company. Glass is put toward further use in industrial products, and aluminum caps are sent to an aluminum salvage partner.' },
    ],
    image: '/images/services/detail-process.png',
  },
  faqs: [
    { q: 'What types of light bulbs does Recycle Technologies recycle?', a: 'Fluorescent tubes and CFLs, along with UV, neon, argon, HID, halogen, and incandescent lamps.' },
    { q: 'Can my business schedule a pickup for light bulb recycling?', a: 'Yes, but pickup service is available exclusively to commercial customers, not residential ones.' },
    { q: 'What if I don’t have a Recycle Technologies location near me?', a: 'The nationwide Universal Waste Mail-In Program lets you ship bulbs from anywhere in the country.' },
    { q: 'Do the bulbs get sent to a landfill?', a: 'No. Recycle Technologies processes collected bulbs directly at its own Minnesota and Wisconsin facilities rather than outsourcing or landfilling them.' },
    { q: 'Will I receive documentation that my bulbs were recycled?', a: 'Customers using the mail-in program can access a certificate online after their kit is processed.' },
  ],
  cta: {
    heading: 'Ready to Recycle Your Light Bulbs?',
    body: [
      'Whether you need a commercial pickup or want to ship bulbs through the mail-in program, Recycle Technologies can get your used or spent lighting into a documented recycling process. Get a quote or schedule a pickup to get started.',
      'Related service: Ballast Recycling, for the PCB- and DEHP-containing capacitors often found alongside fluorescent fixtures.',
    ],
    primary:   { label: 'Get a Quote',       href: href('/quote/') },
    secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
  },
}
