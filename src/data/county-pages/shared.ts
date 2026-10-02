import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { KIT_STORE } from '@/lib/nav'

/**
 * What every county frame draws the same (Figma BVtf2AOuUOcYbiMIlcKmbC,
 * 29 Sep 2026). See ./types.ts.
 */

const ICONS = '/images/icons/county'

/** Section - Service Options: three cards (7016:9135 on the Anoka board). */
export const COUNTY_SERVICES = [
  {
    icon: `${ICONS}/pickup.svg`,
    title: 'Business Pick-Up Service',
    text: 'Exclusive pick-up recycling services for businesses',
    links: [{ label: 'Schedule a Pickup', href: PICKUP_HREF, external: false }],
  },
  {
    icon: `${ICONS}/drop-off.svg`,
    title: 'Residential Drop-Off',
    text: 'Conveniently drop off your electronics at the nearest location',
    links: [{ label: 'Find Your Nearest Drop-Off Location', href: href('/all-locations/'), external: false }],
  },
  {
    icon: `${ICONS}/mail-in.svg`,
    title: 'Mail-In Recycling Program',
    text: 'Can’t drop off? No worries! Purchase our recycling kits online and mail in your electronics.',
    links: [
      { label: 'Mail In Your Electronics', href: href('/mail-in-recycling/'), external: false },
      // The kit store with UTM tags, not the EZ homepage (management, CTA
      // wording sheet, 2 Oct 2026).
      { label: 'Buy Recycling Kits', href: KIT_STORE, external: true },
    ],
  },
]

/** Section - CTA Banner (7016:9109). */
export const COUNTY_CTA = {
  // Only three CTAs on the site: Schedule a Pickup, Get a Quote, Contact Us
  // (management, CTA wording sheet, 2 Oct 2026). Was "Get A Free Estimate
  // Today" / "Get Started and Request your Quote Today".
  heading: 'Ready to Recycle? Get a Quote Today',
  body: 'Tell us what you have and we’ll take it from there.',
  button: { label: 'Get a Quote', href: QUOTE_HREF },
}

/** Icons of the four "Pioneers" cards (Scott 7027:21191, Benton 7038:28622), in card order. */
export const COUNTY_FEATURE_ICONS = [`${ICONS}/clock.svg`, `${ICONS}/shield.svg`, `${ICONS}/recycle.svg`, `${ICONS}/award.svg`]

export const COUNTY_LINE_ICONS = { hours: `${ICONS}/hours.svg`, phone: `${ICONS}/phone.svg` }

/**
 * Section - Items We Accept, the Anoka frame's four groups (7017:3283 …).
 * Every frame draws the same list; the copies differ only in slips, which
 * are made good here: "Led Lamps" -> "LED Lamps", "Ballasts (Non- PCB)" ->
 * "Ballasts (Non-PCB)", the "Batterie" pill (a stray duplicate of
 * "Batteries") dropped, "Vessels" + "and Washers" joined into one pill, and
 * "Lawn mover" (on most frames) -> "Lawn Mowers" as Anoka has it.
 */
export const COUNTY_ITEMS: { title: string; items: string[] }[] = [
  {
    title: 'Light Bulb Fixtures',
    items: ['Fluorescent 4 and under', 'Fluorescent 5 & Over', 'U-Shape and Circular', 'High-Intensity Discharge', 'Broken Fluorescent Lamps', 'Incandescent Lamps',
      'Projector Lamps', 'LED Lamps', 'Ballasts (PCB)', 'Ballasts (Non-PCB)', 'Christmas Lights', 'Super High-pressure Lamps',
      'Neon lamps', 'Halogen and Quartz', 'UV Lamps'],
  },
  {
    title: 'Appliances',
    items: ['AC units', 'Answering Machines', 'Compressors', 'Dehumidifiers', 'Dishwashers', 'Dryers',
      'Freezers', 'Furnace', 'Generators', 'Humidifiers', 'Lawn Mowers', 'Microwaves',
      'Ovens', 'Refrigerators', 'Rototillers', 'Telephones', 'Snow Blowers', 'Stoves',
      'Vacuum Cleaners', 'Washing Machines'],
  },
  {
    title: 'Electronics',
    items: ['Zip Drives', 'VHS Tapes', 'CDs & Floppy Discs', 'TVs', 'Speakers', 'Security Systems',
      'Scanner', 'Radios', 'Printers', 'Peripherals', 'PDA', 'HVAC Systems',
      'Laptops', 'Game Consoles', 'Electronic Games', 'Fax machine', 'CRT monitors', 'Copiers',
      'Computers', 'Batteries', 'Calculators', 'Cameras', 'Capacitors', 'CD Players',
      'Cell Phone', 'Cell Phones', 'Circuit Boards'],
  },
  {
    title: 'Miscellaneous',
    items: ['Organ', 'Metal Desks', 'Metal Cabinets', 'Mercury Thermostats', 'Mercury Devices', 'Box Spring Bed Frame',
      'Mattresses', 'Latex Paints', 'Barometers', 'Bicycles', 'Blood Pressure Cuffs', 'Car Tires',
      'Drinking Fountains', 'Fire Extinguishers', 'Floor Cleaners', 'Garage Openers', 'Gas Flow regulators', 'Power Tools',
      'Pressure Controls', 'Vessels and Washers', 'Propane Tanks', 'Rims', 'Scales', 'Scrap Metal',
      'Stove Hoods', 'Tilt Switches', 'Tanning Beds', 'Tires', 'Trash Compactors', 'Treadmills',
      'Vending Machines', 'Water Softeners', 'Weed Whackers', 'Wheel Balancers'],
  },
]
