import { PICKUP_HREF, QUOTE_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Recycling Kits in Ohio, /recycling-kits-in-ohio/, and in Florida,
 * /recycling-kits-in-florida/. Built 8 Oct 2026 on the county template, Figma
 * BVtf2AOuUOcYbiMIlcKmbC board 7052:28731, phone 7052:34333. The two old
 * WordPress pages are the same copy with the state swapped (15 Sep 2026
 * backup), word for word, except:
 *   - both said the kits support "the Minnesota community", and Florida's
 *     also said "individuals in Arizona" and "Minnesota residents": each
 *     names its own state;
 *   - the kit cards were six, with names that did not match their links
 *     (four said "4ft Fluorescent Lamp MEDIUM Recycling Box"); they are the
 *     four kits the links go to, named as EZ on the Earth names them, under
 *     "Our Most Popular Recycling Kits" (the old page's note to itself, "((
 *     like Our Most Popular Products ))", dropped).
 * No contact card: the old pages had none.
 */

const UTM = 'utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits'
const kit = (handle: string) => `https://ezontheearth.com/products/${handle}?${UTM}`

const KITS = [
  { title: '4ft Straight Lamp Recycling Box (Holds up to 15 T12 or 34 T8 Lamps)', href: kit('4ft-lamp-recycling-kit-small') },
  { title: '2ft U-Bend & Circular Lamp Recycling Box (Holds up to 20 T12 or 29 T8 U-Bend Lamps)', href: kit('2ft-u-bend-hid-and-miscellaneous-lamp-recycling-kit-standard') },
  { title: '8ft Lamp Recycling Kit, Jumbo 10 Pack Bundle', href: kit('8ft-lamp-recycling-kit-jumbo-10-pack-bundle') },
  { title: 'Primary Lithium Battery Recycling Kit (0.5 Gallon)', href: kit('primary-lithium-battery-recycling-kit-0-5-gallon') },
]

function kitsPage(state: 'Ohio' | 'Florida', slug: string, seo: CountyPage['seo']): CountyPage {
  return {
    url: `/${slug}/`,
    state,
    county: state,
    areaServed: state,
    service: 'Mail-In Recycling Kits',
    figma: { board: "7052:28731", phone: "7052:34333" },
    seo,
    hero: {
      h1: `Recycling Kits in ${state}`,
      crumb: `Recycling Kits in ${state}`,
      lead: "Recycle Technologies welcomes drop-offs at our designated locations from anyone willing to transport their recyclables.",
      button: { label: "Schedule a Pickup", href: PICKUP_HREF },
      secondary: { label: "Get a Quote", href: QUOTE_HREF },
    },
    about: {
      heading: `Bulk Recycling Kits for ${state}`,
      blocks: [
        { p: `At Recycle Technologies, we prioritize simplicity in recycling. Our bulk recycling kits cater to both businesses and individuals in ${state}, streamlining e-waste management. With a strong dedication to sustainability, our services are tailored to support the ${state} community's environmental goals.` },
        { h2: `Recycling Kits in ${state}` },
        { p: "We are dedicated to delivering top-tier, enterprise-focused solutions for businesses seeking bulk disposal options. Our services cover a wide range of items, including fluorescent lamps, bulbs, CFLs, batteries, etc., designed to handle a wide range of recyclables." },
        { p: `Our [mail-in recycling program](mailin) for ${state} residents is designed to provide a convenient and eco-friendly solution for managing e-waste. Here’s how it works:` },
        { list: [
          { title: "1. Order a Kit", text: "Select the appropriate recycling kit online based on your needs." },
          { title: "2. Fill the Kit", text: "Place your e-waste into the provided containers, following the clear instructions for safe and compliant packaging." },
          { title: "3. Mail It Back", text: "Use the prepaid shipping label to send the filled kit back to Recycle Technologies." },
        ] },
        { p: "This program ensures that e-waste is managed responsibly without the need for physical transportation, making recycling accessible and easy for everyone." },
      ],
    },
    sections: [
      { kind: 'products', heading: "Our Most Popular Recycling Kits", items: KITS },
      { kind: 'text', heading: `Fluorescent Lamp Recycling Kits in ${state}`, blocks: [
        { p: `Fluorescent lamps contain hazardous components that require careful handling and disposal. Our fluorescent lamp recycling kits are designed to ensure safe and compliant disposal, helping you manage these items responsibly. By using our kits in ${state}, you can rest assured that the hazardous components are properly managed, preventing environmental contamination.` },
        { h2: `Battery Recycling Kits in ${state}` },
        { p: `Batteries, whether alkaline, lithium, or lead-acid, pose significant environmental hazards if disposed of improperly. Our battery recycling kits for ${state} are tailored to handle all types of batteries, ensuring they are recycled in an environmentally friendly manner. This not only prevents pollution but also recovers valuable materials that can be reused` },
        { h2: `Electronics Recycling Kits in ${state}` },
        { p: `Small electronic devices such as phones, tablets, and other gadgets can be challenging to recycle due to their components. Our electronics recycling kits simplify this process, making it easy for you to dispose of these items responsibly. By using our kits in ${state}, you contribute to the circular economy by ensuring that valuable materials are recovered and reused.` },
        { h2: `Universal Waste Recycling Kits in ${state}` },
        { p: `For businesses with diverse recycling needs in ${state}, our universal waste recycling kits are the perfect solution. These kits cover a broad range of e-waste items, including bulbs, batteries, and small electronics like EXIT signs and fire alarms. They provide a comprehensive solution for managing various types of waste, making it easier for businesses to meet their recycling goals.` },
      ] },
      { kind: 'text', heading: "Ways Recycle Technologies Helps", blocks: [
        { p: "At Recycle Technologies, our recycling kits simplify e-waste disposal for households and businesses, ensuring responsible and eco-friendly recycling." },
      ] },
      { kind: 'features', cards: [
        { title: "Convenience and Ease", text: "Order a kit online, fill it with e-waste, and ship it back with a prepaid label. This hassle-free solution saves you trips to recycling centers, making e-waste management easy and convenient." },
        { title: "Compliance and Safety", text: "Each kit includes clear instructions for safe packaging and labeling, ensuring compliance with environmental regulations and minimizing contamination risks. You can trust that your e-waste is handled safely and responsibly." },
        { title: "Environmentally Friendly", text: "Using our recycling kits reduces the environmental impact of e-waste by recovering valuable materials and preventing harmful substances from entering landfills. This supports environmental protection and the circular economy." },
        { title: "Support and Guidance", text: "Our team is available to assist with any questions, providing support to help you recycle efficiently and responsibly. Whether you're a business or an individual, we are here to help you achieve your recycling goals." },
      ] },
      { kind: 'text', heading: "Certifications: Ensuring Top-Tier Service", blocks: [
        { p: "At Recycle Technologies, our commitment to excellence is backed by our certifications. We hold certifications that demonstrate our adherence to the highest standards in the recycling industry. These certifications ensure that our processes are environmentally responsible, safe, and compliant with all relevant regulations. When you choose Recycle Technologies, you are choosing a partner that is certified and recognized for its dedication to sustainability and quality service." },
        { p: "Visit [Recycle Technologies](/) to learn more and order your recycling kit today. By partnering with us, you can contribute to a greener planet and ensure that your e-waste is managed responsibly." },
      ] },
    ],
  }
}

export const RECYCLING_KITS_OHIO = kitsPage('Ohio', 'recycling-kits-in-ohio', {
  title: 'Recycling Kits in Ohio | Call (800) 969-5166',
  description: "Recycling kits Ohio for control boards, handheld scanners, lithium polymer cells, T12 lamps, and power assemblies, supplied with containers and packing steps. Call (800) 969-5166.",
})

export const RECYCLING_KITS_FLORIDA = kitsPage('Florida', 'recycling-kits-in-florida', {
  title: 'Recycling Kits in Florida | Call (800) 969-5166',
  description: "Recycling kits Florida for desktops, network hubs, rechargeable packs, tube lamps, and power modules, supplied with containers and handling steps. Call (800) 969-5166.",
})
