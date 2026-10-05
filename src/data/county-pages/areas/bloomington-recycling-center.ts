import { PICKUP_HREF } from '@/lib/urls'
import type { CountyPage } from '../types'

/**
 * Bloomington Recycling Center, /minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/
 * Figma BVtf2AOuUOcYbiMIlcKmbC: board 7069:6751, phone 7069:7892 (29 Sep 2026).
 * The frame's copy word for word; "this form" and the like link to the quote
 * form (the pickup form in a sentence about pickups). The SEO title and
 * description are the old WordPress page's (15 Sep 2026 backup).
 */
export const BLOOMINGTON_RECYCLING_CENTER: CountyPage = {
  url: "/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/",
  state: "Minnesota",
  county: "Bloomington",
  figma: { board: "7069:6751", phone: "7069:7892" },
  seo: {
    title: 'Bloomington, MN Recycling: Electronics, Batteries & Bulbs',
    description: "Recycling center in Bloomington supporting intake of electronic assets, battery units, lighting materials, paper flow, and material processing. (800) 969-5166.",
  },
  hero: {
    h1: 'Electronics Recycling in Bloomington, MN',
    crumb: "Bloomington Recycling Center",
    lead: "Recycle Technologies is the one-stop solution to your recycling needs.",
    button: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  about: {
    heading: "About Bloomington Center Recycling",
    blocks: [
      { p: "Properly disposing of electronic waste is a responsibility everyone should bear in mind. E-waste can be hazardous if improperly discarded and can become a threat for natural resources, wildlife and public health. Here at Recycle Technologies we are mindful of the destruction that improperly discarded electronic waste can cause and strive to develop and provide practical and affordable e-waste recycling services in Bloomington, USA. We collect, sort and recycle all forms of commercial and residential e-waste and also provide you with a certificate of recycling upon completion of the process." },
      { p: "We are a registered and compliant service provider with state-of-the-art recycling facilities in Bloomington and offer customized services for the removal of electronic waste. We have conveniently located drop-off locations and also provide the ease of pick-up services for our business clients." },
      { p: "All our recycling centers are AAA and NAID certified, including our electronic recycling plant in Bloomington. We also take pride in being certified by the EPA for delivering environmentally conscious e-waste recycling services in Bloomington." },
      { h: "E-Waste We Accept" },
      { p: "We accept a wide variety of old electronics at our recycling center in Bloomington. Whether your electronics are in working condition or have reached the end of their life cycle, we provide reliable recycling services for all kinds of electronic waste for businesses and residential customers." },
      { h: "Light Bulb Fixtures" },
      { p: "Fluorescent 4 and under, Fluorescent 5 & Over, U-Shape and Circular, High-Intensity Discharge, Broken Fluorescent Lamps, Incandescent Lamps, Projector Lamps, Led Lamps, Ballasts (PCB), Ballasts (Non- PCB), Christmas Lights, Super High-pressure Lamps, Neon lamps, Halogen and Quartz, UV Lamps" },
      { h: "Home Appliances" },
      { p: "AC units, Answering Machines,Compressors, Dehumidifiers, Dishwashers, Dryers, Freezers, Furnace, Generators,Humidifiers, Lawn mower, Microwaves, Ovens, Refrigerators, Rototillers, Telephones, Snow Blowers, Stoves, Vacuum Cleaners, Washing Machines" },
      { h: "Electronics" },
      { p: "Zip Drives, VHS Tapes, CDs & Floppy , Discs, TVs, Speakers, Security Systems, Scanner, Radios, Printers, Peripherals, PDA, HVAC Systems , Laptops, Game Consoles, Electronic Games, Fax machine, CRT monitors, Copiers, Computers, Batteries, Calculators, Cameras, Capacitors, CD Players, Cell Phone, Batterie, Cell Phones, Circuit Boards" },
      { h: "Miscellaneous" },
      { p: "Metal Desks, Metal Cabinets, Mercury Thermostats, Mercury Devices, Box Spring Bed Frame, Mattresses , Latex Paints, Barometers, Bicycles, Blood Pressure Cuffs, Car Tires, Drinking Fountains, Fire Extinguishers, Floor Cleaners, Garage Openers, Gas Flow regulators, Power Tools, Pressure Controls, Vessels, and Washers, Propane Tanks, Rims, Scales, Scrap Metal, Stove Hoods, Tilt Switches, Tanning Beds, Tires, Trash Compactors, Treadmills, Vending Machines, Water Softeners, Weed Whackers, Wheel Balancers" },
      { h: "Simplified E-Waste Recycling Services For Businesses" },
      { p: "We believe that electronic waste recycling services should be accessible to everyone regardless of their location. Recycle Technologies has therefore built a wide network of compliant e-waste recycling services throughout the USA. Checkout all the locates you can avail our services at:" },
      { p: "For us, recycling is a passion. Since 1993 we have been leading the fight to curb carbon emissions, so the future for our children remains greener. That is why we recycle items, so we can reclaim the spent resources. This helps us to rely less on virgin resources and use the ones we have reclaimed. Recycle Technologies guarantees that no waste will ever enter a state-controlled landfill. For any queries or suggestions, feel free to contact us at +1-763-559-5130." },
    ],
  },
  sections: [
    { kind: 'items', heading: "Items We Accept" },
    { kind: 'sights', heading: "Bloomington Top Sights", items: [
      "Mall of America®",
      "SEA LIFE at Mall of America",
      "Fort Snelling State Park",
      "Minnesota Valley National Wildlife Refuge—Bloomington Education and Visitor Center",
      "Como Park",
      "Lebanon Hills Regional Park",
    ] },
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
