import type { ServicePageContent } from '@/data/service-page'
import { QUOTE_HREF, PICKUP_HREF, href } from '@/lib/urls'

/**
 * The kit tip, step strip and closing band shared by the six service pages in
 * the "RTI Recycling Kits Links to EZonEarth" sheet (Asim, 6 Oct 2026): Light
 * Bulbs, Battery, Electronic, Ballasts, Airbag and Television.
 *
 * Hero: Schedule a Pickup (white) + Get a Quote, then the short tip from the
 * wireframe, "Not near us? Order a battery recycling kit". Under the hero, the
 * three step cards. Closing band: "Ready to Recycle Your …?", one line with a
 * Contact us link, the two buttons, then the sheet's full tip copy.
 */

const UTM = 'utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits'

/** The sheet's EZ on the Earth collections, with the same utm tags as KIT_STORE. */
export const KIT_COLLECTIONS = {
  bulbs:       `https://ezontheearth.com/collections/bulb-recycle-kits?${UTM}`,
  batteries:   `https://ezontheearth.com/collections/battery-recycle-kit?${UTM}`,
  electronics: `https://ezontheearth.com/collections/electronic-waste?${UTM}`,
  ballasts:    `https://ezontheearth.com/collections/non-pcb-ballast?${UTM}`,
  airbags:     `https://ezontheearth.com/collections/airbag-recycle-kit?${UTM}`,
} as const

export const SERVICE_STEPS: NonNullable<ServicePageContent['heroSteps']> = [
  { glyph: 'package', label: 'Step 1', text: 'Request a pickup or quote' },
  { glyph: 'package', label: 'Step 2', text: 'We collect, or you drop off' },
  { glyph: 'shield',  label: 'Step 3', text: 'Certified recycling and certificate' },
]

type KitPage = {
  /** "light bulbs", "batteries", "TVs" — as the sheet words it. */
  few: string
  /** "a bulb recycling kit", "an electronics recycling kit". */
  kit: string
  /** The closing heading's noun: "Light Bulbs", "Televisions". */
  noun: string
  href: string
}

/**
 * kitTip, heroSteps and cta for one page. Spread into its CONTENT after the
 * page's own fields.
 */
export function kitService(p: KitPage): Pick<ServicePageContent, 'kitTip' | 'heroSteps' | 'cta'> {
  const link = `Order ${p.kit}`
  return {
    // The wireframe's short hero line.
    kitTip: { lead: 'Not near us?', link, href: p.href },
    heroSteps: SERVICE_STEPS,
    cta: {
      heading: `Ready to Recycle Your ${p.noun}?`,
      body: ['Schedule a business pickup or get a quote. Questions?'],
      contact: { label: 'Contact us.', href: href('/contact-us/') },
      // The sheet's copy, word for word.
      tip: {
        lead: `Not near any of our locations, or have a few ${p.few} only?`,
        link,
        href: p.href,
        after: 'and mail them in.',
      },
      primary:   { label: 'Schedule a Pickup', href: PICKUP_HREF },
      secondary: { label: 'Get a Quote',       href: QUOTE_HREF },
    },
  }
}
