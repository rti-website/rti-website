import Link from 'next/link'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { Picker } from '@/components/client/Picker'

export type Crumb = { label: string; href: string | null }

/**
 * Service detail hero — Figma 6142:2050. 1920x470 on #0b1f3a.
 *
 * Same art as /services/ — see InteriorHeroArt — but the content is one
 * auto-layout column at x319 y113, gap 20: breadcrumb, H1, lead, then the
 * location picker and Get Started button side by side with a 12px gap.
 *
 * Written generic because every other service page uses this same frame, and
 * /industries/ uses it too with the button row omitted.
 */
export function ServiceHero({
  crumbs, h1, lead, pickerPlaceholder, pickerOptions, cta, label, image,
}: {
  crumbs: Crumb[]
  h1: string
  lead: string
  /** This page's own hero photograph; the shared one when omitted. */
  image?: string
  /**
   * The picker and button are optional: the service detail frames carry them,
   * the Industries frame (6246:1012) does not. Omit both and the hero is just
   * breadcrumb, headline and lead.
   */
  pickerPlaceholder?: string
  pickerOptions?: string[]
  cta?: { label: string; href: string; external?: boolean }
  label?: string
}) {
  return (
    <Section top={140} height={470} label={label} className="bg-navy">
      <InteriorHeroArt src={image} />

      {/* Content column — 6199:4945 at x319 y113, w946, gap 20. */}
      <Box x={319} y={113} w={946} className="flex flex-col items-start gap-[20px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-[13px]">
                {i > 0 && <span aria-hidden="true" className="text-white/50">/</span>}
                {c.href
                  ? <Link href={c.href} className="text-white/50 hover:text-white">{c.label}</Link>
                  : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="font-sans text-[60px] font-semibold leading-[70px] tracking-[-1.5px] text-white">
          {h1}
        </h1>

        <p className="font-roboto text-[18px] leading-[27px] text-white/70">{lead}</p>

        {(cta || pickerOptions) && (
          <div className="flex items-start gap-[12px]">
            {pickerOptions && (
              <div className="h-[50px] w-[393px]">
                <Picker
                  id="service-location"
                  placeholder={pickerPlaceholder ?? 'Select Your Location'}
                  srLabel="Select your location"
                  options={pickerOptions}
                />
              </div>
            )}
            {cta && (
              <Btn href={cta.href} variant="colored" external={cta.external}>{cta.label}</Btn>
            )}
          </div>
        )}
      </Box>
    </Section>
  )
}
