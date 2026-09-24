import type { Cta, ServicePageContent } from '@/data/service-page'
import { CONTENT as LIGHT_BULBS } from '@/data/light-bulbs'
import { CONTENT as ELECTRONICS } from '@/data/electronics-recycling'
import { CONTENT as BATTERIES } from '@/data/battery-recycling'
import { href, quoteHref } from '@/lib/urls'

/**
 * State landing pages for ads — Asim, 24 Sep 2026: "we have to build subpages
 * only in URL, this is for ads purpose only". Six pages, copy exactly as he
 * sent it, on the same ServiceDetailPage as the service they belong to:
 *
 *   /light-bulbs/Minnesota/          /light-bulbs/Wisconsin/
 *   /electronic-recycle/Minnesota/   /electronic-recycle/Wisconsin/
 *   /battery-recycling/Minnesota/    /battery-recycling/Wisconsin/
 *
 * NOT IN THE MENUS, NOT IN THE SITEMAP, NOINDEX (Asim's choice): they are
 * reached from ads and direct links only, and so do not compete in search with
 * the main service pages that already rank. The capital letter in the URL is
 * the address the ads use; paths are case-sensitive, so /minnesota/ is a 404.
 *
 * Photos are the main service page's own. Both buttons open the contact form
 * with the service and the state already filled in (quoteHref), since the
 * page already knows both; /request-a-pickup/ itself is a redirect to that
 * same form.
 *
 * The doc's "[Certification Logo Placeholder]" is the certifications band
 * with its logos, and "[Case studies and customer testimonials to be added]"
 * is the shared case studies band every service page carries.
 */

export type StateName = 'Minnesota' | 'Wisconsin'
export type StatePage = { content: ServicePageContent; seo: { title: string; description: string } }

const buttons = (service: string, state: StateName): { quote: Cta; pickup: Cta } => ({
  quote: { label: 'Get a Quote', href: quoteHref({ service, location: state }) },
  pickup: { label: 'Schedule a Pickup', href: quoteHref({ service, location: state }) },
})

const trail = (service: string, serviceUrl: string, state: StateName) => [
  { label: 'Home', href: href('/') },
  { label: 'Our Services', href: href('/services/') },
  { label: service, href: href(serviceUrl) },
  { label: state, href: null },
]

// ---------------------------------------------------------------- light bulbs --

function lightBulbs(state: StateName, intro: string[], recoveryGlass: string): StatePage {
  const b = buttons('Light Bulb Recycling', state)
  return {
    seo: {
      title: `Light Bulb Recycling in ${state} | Recycle Technologies`,
      description: `Commercial light bulb recycling in ${state} from Recycle Technologies. Fluorescent, CFL, and HID bulbs processed at our own facility. Get a quote today.`,
    },
    content: {
      url: `/light-bulbs/${state}/`,
      liveSeo: { title: '', description: '' },
      proposedSeo: { title: '', description: '' },
      hero: {
        crumb: state,
        trail: trail('Light Bulb Recycling', '/light-bulbs/', state),
        h1: `Light Bulb Recycling in ${state}`,
        lead: `Recycle Technologies provides commercial light bulb recycling in ${state}, processed at our own ${state} facility. Since 1993, we’ve helped businesses recycle fluorescent tubes, CFLs, HID lamps, and more without sending materials through a broker.`,
        cta: b.quote,
        secondaryCta: b.pickup,
        image: LIGHT_BULBS.hero.image,
      },
      intro: {
        heading: `What’s Light Bulb Recycling in ${state}?`,
        body: intro,
        image: LIGHT_BULBS.intro.image,
      },
      accept: {
        heading: `What Light Bulbs Can You Recycle in ${state}?`,
        intro: 'Recycle Technologies accepts a broad range of light bulbs and lamps. If you’re unsure whether a specific lamp qualifies, contact us before scheduling a pickup or mail-in shipment.',
        items: [
          { label: 'Fluorescent Bulbs', text: 'Fluorescent tubes, plastic-coated and shielded tubes, compact fluorescent lamps (CFLs), green-tipped bulbs, circular lamps, and U-bend or U-shaped lamps.' },
          { label: 'Other Accepted Lighting', text: state === 'Minnesota'
            ? 'Ultraviolet (UV) lamps, neon lamps, argon lamps, other cold-cathode lamps, high-intensity discharge (HID) lamps, metal-halide lamps, high-pressure sodium lamps, flood lamps, incandescent bulbs, and halogen bulbs.'
            : 'Ultraviolet (UV) lamps, neon lamps, argon lamps, other cold cathode lamps, high-intensity discharge (HID) lamps, metal halide lamps, high-pressure sodium lamps, flood lamps, incandescent bulbs, and halogen bulbs.' },
        ],
      },
      process: {
        heading: `How Do We Recycle Light Bulbs in ${state}?`,
        intro: 'Recycling a bulb involves more than placing it in a bin. Once bulbs leave your facility and enter Recycle Technologies’ process, they move through collection, packaging, processing, separation, and recovery.',
        steps: [
          { label: 'Collection.', text: `Commercial customers in ${state} can schedule a pickup for their spent bulbs. Recycle Technologies also offers a nationwide Universal Waste Mail-In Program for customers who want to ship eligible bulbs from anywhere in the country.` },
          { label: 'Packaging and Storage.', text: 'The Department of Transportation regulates how bulbs are packaged for shipping. Recycle Technologies recommends using its fiber bins or the original boxes replacement bulbs arrived in. Packing materials can also be delivered ahead of a scheduled pickup.' },
          { label: 'Processing.', text: state === 'Minnesota'
            ? 'Collected bulbs are processed directly at Recycle Technologies’ facilities in Minnesota and Wisconsin. For Minnesota customers, bulbs are processed at our Minnesota facility rather than being sent through an outside broker.'
            : 'Collected bulbs are processed directly at Recycle Technologies’ Minnesota and Wisconsin facilities. For Wisconsin customers, bulbs are processed at our Wisconsin facility rather than being sent through an outside broker.' },
          { label: 'Separation.', text: 'During processing, mercury-contaminated phosphor powder and filters, glass, and aluminum end caps are separated so each material can be directed to the appropriate next step.' },
          { label: 'Recovery.', text: `Mercury-contaminated phosphor powder and filters are shipped to a distillation company. ${recoveryGlass}` },
        ],
        image: LIGHT_BULBS.process!.image,
      },
      certifications: { body: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.' },
      faqs: [
        { q: `What types of light bulbs can I recycle in ${state}?`, a: 'We accept fluorescent tubes, CFLs, HID lamps, incandescent and halogen bulbs, and several other lamp types. Contact us about specific bulbs.' },
        { q: `Does Recycle Technologies offer commercial light bulb pickup in ${state}?`, a: `Yes. Commercial customers in ${state} can schedule a pickup for their spent light bulbs.` },
        { q: 'Can I recycle fluorescent tubes and CFLs?', a: 'Yes. Both fluorescent tubes and compact fluorescent lamps (CFLs) are accepted.' },
        { q: 'What happens to recycled light bulbs?', a: 'Phosphor powder and filters are sent to a distillation company, glass is put toward industrial products, and aluminum end caps go to an aluminum salvage partner.' },
        { q: 'Can I use the mail-in program if I cannot schedule a pickup?', a: 'Yes. The Universal Waste Mail-In Program is available nationwide as an alternative to commercial pickup.' },
      ],
      cta: {
        heading: `Ready to Recycle Your Light Bulbs in ${state}?`,
        headingWidth: 686,
        body: [`${state} businesses can request a quote or schedule a commercial pickup for their spent light bulbs, which are processed at our own ${state} facility.`],
        primary: b.quote,
        secondary: b.pickup,
      },
    },
  }
}

const LIGHT_BULBS_MN = lightBulbs('Minnesota', [
  'Light bulb recycling is the process of collecting used or spent bulbs and routing them through a facility equipped to separate and recover their components rather than placing them in general trash.',
  'Fluorescent-type lamps contain small amounts of mercury, which is why many organizations use recycling services that can document how bulbs are handled from pickup through processing.',
  'Recycle Technologies has recycled fluorescent lamps and other light bulbs since 1993. Collected bulbs are processed at our own Minnesota facility, where materials are separated and routed through the appropriate recovery process.',
  'Mercury-contaminated phosphor powder and filters are shipped to a distillation company; glass is used for further industrial applications; and aluminum end caps are sent to an aluminum salvage partner.',
  'Because we manage processing directly rather than sending materials through a broker, Minnesota businesses have a documented path for their spent lighting from pickup to processing.',
], 'Glass is used for further industrial applications, while aluminum end caps are sent to an aluminum salvage partner.')

const LIGHT_BULBS_WI = lightBulbs('Wisconsin', [
  'Light bulb recycling is the process of collecting used or spent bulbs and routing them through a facility equipped to separate and recover their components rather than placing them in general trash. Fluorescent-type lamps contain small amounts of mercury, which is why many organizations use recycling services that can document how bulbs are handled from pickup through processing.',
  'Recycle Technologies has recycled fluorescent lamps and other light bulbs since 1993. Collected bulbs are processed at our own Wisconsin facility, where materials are separated and routed through the appropriate recovery process. Mercury-contaminated phosphor powder and filters are shipped to a distillation company, glass is put toward further use in industrial products, and aluminum end caps are sent to an aluminum salvage partner.',
  'Because we manage processing directly rather than sending materials through a broker, Wisconsin businesses have a documented path for their spent lighting from pickup to processing.',
], 'Glass is put toward further use in industrial products, while aluminum end caps are sent to an aluminum salvage partner.')

// ---------------------------------------------------------------- electronics --

function electronics(state: StateName, city: string, v: {
  what: string; plastic: string; separation: string; faqAfter: string
}): StatePage {
  const b = buttons('Electronics Recycling', state)
  const abbr = state === 'Minnesota' ? 'MN' : 'WI'
  return {
    seo: {
      title: `Electronics Recycling in ${state} | Recycle Technologies`,
      description: `Electronics recycling in ${state} from Recycle Technologies. Business pickup, drop-off, and mail-in options at our ${city}, ${abbr} facility. Get a quote today.`,
    },
    content: {
      url: `/electronic-recycle/${state}/`,
      liveSeo: { title: '', description: '' },
      proposedSeo: { title: '', description: '' },
      hero: {
        crumb: state,
        trail: trail('Electronic Recycling', '/electronic-recycle/', state),
        h1: `Electronics Recycling in ${state}`,
        lead: `Recycle Technologies provides electronics recycling in ${state} through our licensed facility in ${city}. Since 1993, we’ve helped businesses and individuals recycle computers, monitors, phones, and other electronic equipment. Businesses can schedule a pickup, while individuals can drop off equipment or use our mail-in program.`,
        cta: b.quote,
        secondaryCta: b.pickup,
        image: ELECTRONICS.hero.image,
      },
      intro: {
        heading: `What’s Electronics Recycling in ${state}?`,
        body: [
          v.what,
          `Recycle Technologies has provided electronics recycling services since 1993. At our licensed ${city}, ${state} facility, electronics are dismantled and processed into recoverable materials including plastic, wire, circuit boards, metals, and glass.`,
          v.plastic,
          `Our ${city} facility holds active R2v3 certification. Businesses can also use our pickup service to move retired office electronics and IT equipment into a documented recycling process.`,
        ],
        image: ELECTRONICS.intro.image,
      },
      accept: {
        heading: `What Electronics Can You Recycle in ${state}?`,
        intro: 'Recycle Technologies accepts a broad range of electronic and computer-related equipment. If you’re unsure whether an item qualifies, contact us before scheduling.',
        items: [
          { label: 'General Electronics', text: 'Cables, switches, chargers, keyboards, mice, remotes, microwaves, televisions, and other everyday electronic items.' },
          { label: 'Computers & IT Equipment', text: 'Desktop computers, laptops, and servers.' },
          { label: 'Monitors & Displays', text: 'Computer monitors and CRT monitors.' },
          { label: 'Office & Imaging Equipment', text: 'Fax machines, printers, scanners, and copiers.' },
          { label: 'Phones', text: 'Cell phones and related mobile devices.' },
        ],
        outro: 'Have something not listed here? Contact Recycle Technologies to confirm whether we can accept it.',
      },
      process: {
        heading: `How Do We Recycle Electronics in ${state}?`,
        intro: 'Electronics can enter the recycling process through a business pickup, a drop-off at a Recycle Technologies location, or the mail-in program. Equipment then goes through a series of steps before leaving the facility as recovered material.',
        steps: [
          { label: 'Collection.', text: 'Businesses can schedule a pickup. Individuals can drop equipment at a nearby location or order a mail-in recycling kit for eligible items shipped from anywhere in the country.' },
          { label: 'Sorting and Storage.', text: 'Incoming electronics are grouped by type before processing begins.' },
          { label: 'Dismantling.', text: 'Devices are broken down so individual components and materials can be separated.' },
          { label: 'Separation.', text: v.separation },
          { label: 'Recovery.', text: 'Shredded plastic and wire are sent to molders and smelters, while metals and minerals recovered from circuit boards are collected for reuse.' },
        ],
        outro: 'Because equipment types vary, not every device follows exactly the same processing path.',
        image: ELECTRONICS.process!.image,
      },
      certifications: { body: `Recycle Technologies follows recognized industry certification standards for responsible electronics recycling, including R2v3. Our ${city}, ${state} facility holds active R2v3 certification.` },
      faqs: [
        { q: `What electronics can I recycle in ${state}?`, a: 'We accept computers, laptops, servers, monitors, printers, copiers, phones, and a range of general electronics. Contact us if you’re unsure about a specific item.' },
        { q: 'Does Recycle Technologies offer electronics pickup for businesses?', a: `Yes. Business pickup is available for ${state} companies looking to recycle office electronics and IT equipment.` },
        { q: 'Can individuals recycle electronics at Recycle Technologies?', a: 'Yes. Individuals can drop off equipment at a nearby location or use our nationwide mail-in program.' },
        { q: 'What happens to electronics after they are recycled?', a: v.faqAfter },
        { q: `Is the ${city} facility R2v3 certified?`, a: `Yes. Our ${city}, ${state} facility holds active R2v3 certification.` },
      ],
      cta: {
        heading: `Ready to Recycle Electronics in ${state}?`,
        headingWidth: 686,
        body: [`Businesses can request a quote or schedule a pickup, while individuals can use drop-off or our mail-in program to recycle electronics through our ${city}, ${state} facility.`],
        primary: b.quote,
        secondary: b.pickup,
      },
    },
  }
}

const ELECTRONICS_MN = electronics('Minnesota', 'Blaine', {
  what: 'Electronics recycling is the process of collecting used or unwanted electronic devices and breaking them down so that their materials can be reused rather than thrown away.',
  plastic: 'Plastic and wiring are shredded and sent to molders and smelters. Monitors undergo a lead-decontamination step before being recycled, while circuit boards are separated so that the metals and minerals inside them can be collected for reuse.',
  separation: 'Plastic and wiring are separated for shredding; monitors go through a lead-decontamination step; and circuit boards are separated from the rest of the equipment.',
  faqAfter: 'Equipment is dismantled and separated into materials such as plastic, wire, circuit boards, metals, and glass, which are then sent for recycling or recovery.',
})

const ELECTRONICS_WI = electronics('Wisconsin', 'New Berlin', {
  what: 'Electronics recycling is the process of collecting used or unwanted electronic devices and breaking them down so their materials can be reused instead of thrown away.',
  plastic: 'Plastic and wiring are shredded and sent to molders and smelters. Monitors go through a lead decontamination step before being recycled, while circuit boards are separated so the metals and minerals inside them can be collected for reuse.',
  separation: 'Plastic and wiring are separated for shredding, monitors go through a lead decontamination step, and circuit boards are separated from the rest of the equipment.',
  faqAfter: 'Equipment is dismantled and separated into materials like plastic, wire, circuit boards, metals, and glass, which are sent for recycling or recovery.',
})

// ------------------------------------------------------------------ batteries --

function batteries(state: StateName): StatePage {
  const b = buttons('Battery Recycling', state)
  return {
    seo: {
      title: `Battery Recycling in ${state} | Recycle Technologies`,
      description: `Battery recycling in ${state} from Recycle Technologies. Commercial pickup within 100 miles of our facility, plus drop-off and mail-in options. Get a quote.`,
    },
    content: {
      url: `/battery-recycling/${state}/`,
      liveSeo: { title: '', description: '' },
      proposedSeo: { title: '', description: '' },
      hero: {
        crumb: state,
        trail: trail('Battery Recycling', '/battery-recycling/', state),
        h1: `Battery Recycling in ${state}`,
        lead: `Recycle Technologies provides battery recycling in ${state}, with commercial pickup available within a 100-mile radius of our ${state} facility. Since 1993, we’ve helped businesses recycle alkaline, lithium-ion, lead-acid, and other battery types.`,
        cta: b.quote,
        secondaryCta: b.pickup,
        image: BATTERIES.hero.image,
      },
      intro: {
        heading: `What’s Battery Recycling in ${state}?`,
        body: [
          `Battery recycling in ${state} is the process of collecting used or spent batteries and handling them properly instead of throwing them away with regular trash. Different battery chemistries require different handling, and batteries can start fires or leak chemicals if they are stored or handled incorrectly.`,
          `Recycle Technologies has handled battery recycling from its Minnesota and Wisconsin facilities since 1993. Once batteries arrive at our ${state} facility, trained staff sort and separate them by type. After a pickup or drop-off is processed, customers receive a certificate of recycling and safe disposal documenting that their batteries were handled properly.`,
        ],
        image: BATTERIES.intro.image,
      },
      accept: {
        heading: `What Batteries Can You Recycle in ${state}?`,
        intro: 'Recycle Technologies accepts a broad range of battery types. If you’re unsure whether your batteries qualify, contact us before scheduling.',
        items: [
          { label: 'Alkaline & Zinc Batteries', text: 'Standard alkaline batteries and zinc batteries.' },
          { label: 'Lithium-Ion & Lead-Acid Batteries', text: 'Rechargeable lithium-ion battery packs and sealed lead-acid batteries.' },
          { label: 'Nickel-Cadmium & Button Cell Batteries', text: 'NiCd batteries and button-cell batteries.' },
          { label: 'EV, Power Tool & Backup Batteries', text: 'Electric vehicle batteries, Tesla batteries, power tool battery packs, and battery backup units.' },
        ],
        outro: 'Other battery types, including mercury oxide batteries, may be handled on a case-by-case basis. Contact Recycle Technologies if your battery type isn’t listed.',
      },
      process: {
        heading: `How Do We Recycle Batteries in ${state}?`,
        intro: 'Batteries can enter the recycling process through a business pickup, a drop-off at a Recycle Technologies location, or the mail-in program. Because different battery chemistries have different handling requirements, sorting is central to the process.',
        steps: [
          { label: 'Collection.', text: `Businesses can schedule a commercial pickup within a 100-mile radius of our ${state} facility. Individuals can use a nearby drop-off location or order a mail-in kit.` },
          { label: 'Sorting and Storage.', text: 'Once batteries arrive, trained staff sort and separate them by type. Battery terminals should be covered before shipping or storage to reduce the risk of fire. Batteries sent through the mail-in program should already be separated by type.' },
          { label: 'Documentation.', text: 'Once a pickup or drop-off is processed, Recycle Technologies issues a certificate of recycling and safe disposal.' },
        ],
        extra: [
          {
            heading: `Battery Recycling Pickup in ${state}`,
            body: [`Recycle Technologies offers commercial battery recycling pickup within a 100-mile radius of its ${state} facility. Businesses within that range can request a pickup to have spent batteries collected directly.`],
            cta: b.pickup,
          },
          {
            heading: 'Mail-In & Drop-Off Battery Recycling',
            items: [
              { label: 'Drop-Off:', text: 'Individuals can bring their batteries to a nearby Recycle Technologies location.' },
              { label: 'Mail-In:', text: 'Individuals can order a mail-in recycling kit for eligible battery types. Batteries sent through the mail-in program should be separated by type before shipping, since not every battery type can be mailed the same way.' },
            ],
          },
        ],
        image: BATTERIES.process!.image,
      },
      certifications: { body: 'Recycle Technologies follows recognized industry certification standards for responsible recycling, including R2v3.' },
      faqs: [
        { q: `What types of batteries can I recycle in ${state}?`, a: 'We accept alkaline, lithium-ion, lead-acid, nickel-cadmium, button-cell, EV, power tool, and backup batteries. Contact us about other battery types.' },
        { q: `Does Recycle Technologies offer battery pickup in ${state}?`, a: `Yes. Commercial pickup is available within a 100-mile radius of our ${state} facility.` },
        { q: `How far does the ${state} battery recycling pickup service extend?`, a: `Pickup is available to businesses within 100 miles of our ${state} facility.` },
        { q: 'Do batteries need to be sorted before recycling?', a: 'Our trained staff sort batteries by type when they arrive, though batteries sent by mail should already be separated by type.' },
        { q: 'Can batteries be recycled through the mail-in program?', a: 'Yes, for eligible battery types. Batteries must be separated by type before mailing.' },
      ],
      cta: {
        heading: `Ready to Recycle Your Batteries in ${state}?`,
        headingWidth: 686,
        body: [`Businesses within 100 miles of our ${state} facility can request a quote or schedule a pickup to start recycling their spent batteries.`],
        primary: b.quote,
        secondary: b.pickup,
      },
    },
  }
}

export const STATE_PAGES = {
  'light-bulbs': { Minnesota: LIGHT_BULBS_MN, Wisconsin: LIGHT_BULBS_WI },
  'electronic-recycle': { Minnesota: ELECTRONICS_MN, Wisconsin: ELECTRONICS_WI },
  'battery-recycling': { Minnesota: batteries('Minnesota'), Wisconsin: batteries('Wisconsin') },
} as const
