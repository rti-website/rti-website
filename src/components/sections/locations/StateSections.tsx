import Image from 'next/image'
import Link from 'next/link'
import { Box, Section } from '@/components/design/Frame'
import { Btn, Eyebrow } from '@/components/ui/Bits'
import type { Crumb } from '@/components/sections/service/ServiceHero'
import type { Facility } from '@/data/facilities'
import { localFacilityPage } from '@/data/local-pages'
import { content } from '@/lib/page-content'
import { href } from '@/lib/urls'

/**
 * The state pages' redesign — Figma "Location Details - Minnesota New"
 * 7329:6088 (phone 7329:6801) and "Location Details - Wisconsin New"
 * 7329:5698 (phone 7329:6503), BVtf2AOuUOcYbiMIlcKmbC, 13 Oct 2026.
 *
 * Asim: "keep this section [Our <state> Recycling Center, LocationCenterBar]
 * same as the old one in both the pages ... and update the other". So the
 * center bar is untouched, the quick info bar and the FAQ are the existing
 * components (the frames draw them the same way), and these are the bands the
 * frames add or redraw: the hero, the services tiles, the county cards, the
 * pickup CTA and the mail-in band. Copy lives in `f.hub` (src/data/facilities.ts),
 * so Admin -> Pages edits it.
 *
 * Board sizes are the frames': hero 579, services 610 (Wisconsin 629, its lead
 * wraps), counties 803 (Wisconsin 671), CTA 442, mail-in 230. On the phone
 * every band is an ordinary block in flow.
 */

/* ------------------------------------------------------------------ hero -- */

/** The hero photos, with where each frame puts them. */
const PHOTOS: Record<Facility['slug'], { src: string; flip: boolean; phone?: { y: number; w: number; h: number } }> = {
  // 7329:6093 / phone 7329:6816: the photo covers the band on both.
  'minnesota-recycling': { src: '/images/pages/hero-minnesota-v3.jpg', flip: false },
  // 7329:5703 is mirrored on the board (rotate-180 + -scale-y-100); the phone
  // (7329:6522) draws it unmirrored at 815x459, 103 above the band.
  'wisconsin-recycling': { src: '/images/pages/hero-wisconsin-v3.jpg', flip: true, phone: { y: -103, w: 815, h: 459 } },
}

/**
 * 7329:6090 / 7329:5700 — 1920x579 on #0b1f3a. The photo under a navy wash
 * (96% at the left to clear at the right) and a green one (60% to clear at
 * 65%); the column at x319 y121: crumbs, the H1 at 56/68, the lead at 20/30,
 * then the two buttons.
 *
 * Phone (7329:6815): 310 tall, the photo under a 64% navy veil and a bottom
 * scrim, the text centred at 32/1.2 and 15/1.5, no crumbs. The frame draws no
 * buttons; they are kept on the phone, full width, as on every other hero of
 * the site (the center bar under it has its own).
 */
export function StateHero({ f, crumbs, top, height }: { f: Facility; crumbs: Crumb[]; top: number; height: number }) {
  const p = PHOTOS[f.slug]
  const b = f.hero.buttons
  return (
    <Section top={top} height={height} label={f.slug === 'wisconsin-recycling' ? '7329:5700' : '7329:6090'}
      className="flex flex-col items-center bg-navy px-[20px] pb-[24px] pt-[72px] max-lg:min-h-[310px] lg:block lg:p-0">
      <Box x={0} y={0} w={1920} h={height} fill className="pointer-events-none overflow-hidden">
        <div
          className={`absolute inset-0 ${p.phone ? 'max-lg:inset-auto max-lg:left-0 max-lg:top-[var(--ph-y)] max-lg:h-[var(--ph-h)] max-lg:w-[var(--ph-w)]' : ''}`}
          style={p.phone ? { '--ph-y': `${p.phone.y}px`, '--ph-w': `${p.phone.w}px`, '--ph-h': `${p.phone.h}px` } as React.CSSProperties : undefined}
        >
          <Image src={p.src} alt="" fill priority sizes="(min-width: 1024px) 1920px, 815px" className={`object-cover ${p.flip ? 'lg:-scale-x-100' : ''}`} />
        </div>
        {/* Board washes (7329:6094, 7329:6095). */}
        <div className="absolute inset-0 max-lg:hidden" style={{ backgroundImage: 'linear-gradient(90deg, rgba(11,31,58,0.961) 0%, rgba(11,31,58,0.8) 38%, rgba(11,31,58,0.4) 62%, rgba(11,31,58,0) 100%)' }} />
        <div className="absolute inset-0 max-lg:hidden" style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.6) 0%, rgba(27,122,61,0.27) 35%, rgba(0,0,0,0) 65%)' }} />
        {/* Phone veil and bottom scrim (7329:6817, 7329:6818). */}
        <div className="absolute inset-0 bg-[rgba(11,31,58,0.64)] lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[220px] bg-[linear-gradient(180deg,rgba(11,31,58,0)_0%,rgba(11,31,58,0.8)_55%,rgba(11,31,58,0.9)_100%)] lg:hidden" />
      </Box>

      <Box x={319} y={121} w={1000} className="relative flex flex-col items-center gap-[12px] text-center lg:items-start lg:gap-0 lg:text-left">
        <nav aria-label="Breadcrumb" className="max-lg:hidden lg:pl-[3px]">
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
        <h1 className="w-full font-sans text-[32px] font-semibold leading-[1.2] text-white lg:mt-[24px] lg:w-[900px] lg:text-[56px] lg:leading-[68px] lg:tracking-[-2.03px]">
          {f.hero.h1}
        </h1>
        <p className="w-full font-roboto text-[15px] leading-[1.5] text-white/90 lg:mt-[16px] lg:w-[900px] lg:text-[20px] lg:font-medium lg:leading-[30.031px] lg:text-white">
          <span className="lg:hidden">{f.hero.leadShort}</span>
          <span className="max-lg:hidden">{f.hero.lead}</span>
        </p>
        {b && (
          <div className="mt-[12px] flex w-full flex-col gap-[12px] lg:mt-[34px] lg:w-auto lg:flex-row lg:gap-[14px]">
            <Btn href={b.primary.href} variant="whiteFill" className="justify-center border border-white backdrop-blur-[4px] max-lg:w-full">{b.primary.label}</Btn>
            <Btn href={b.secondary.href} variant="white" className="justify-center border border-white backdrop-blur-[4px] max-lg:w-full">{b.secondary.label}</Btn>
          </div>
        )}
      </Box>
    </Section>
  )
}

/* -------------------------------------------------------------- services -- */

/**
 * 7329:6144 / 7329:5755 — "Recycling and shredding services in <state>".
 * White, py90, gap 44: the 780 heading block (eyebrow, 36px title, 16px grey
 * lead) over four tiles a row, 304 wide and 20 apart, each #eaf4f5 r12 px20
 * py24 with a 44px teal r12 icon box and a 14.5px label. Every tile links the
 * state's own service page (/minnesota-recycling/battery-recycling/ ...).
 *
 * Phone (7329:6856): py44 px20, gap 24, the title at 24/1.25 and the lead at
 * 14/1.55, two tiles a row 12 apart (px16 py20, a 40px box, 13px label).
 */
export async function StateMaterials({ f, top, height }: { f: Facility; top: number; height: number }) {
  const { DETAIL_COPY } = await content('facilities')
  const m = f.hub.materials
  const site = f.slug.replace(/-recycling$/, '')
  return (
    <Section top={top} height={height} label={f.slug === 'wisconsin-recycling' ? '7329:5755' : '7329:6144'}
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[780px] lg:gap-[10px]">
        <Eyebrow>{DETAIL_COPY.materials.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[1.25] text-black lg:text-[36px] lg:leading-normal">{m.heading}</h2>
        <p className="font-roboto text-[14px] leading-[1.55] text-[#7d7d7d] lg:text-[16px] lg:leading-normal lg:text-[#7e7e7e]">{m.lead}</p>
      </div>
      <ul className="grid w-full grid-cols-2 gap-[12px] lg:w-[1276px] lg:grid-cols-4 lg:gap-[20px]">
        {m.tiles.map((t) => {
          const page = localFacilityPage(site, t.service)
          const tile = 'flex h-full w-full flex-col items-center gap-[10px] rounded-[12px] bg-[#eaf4f5] px-[16px] py-[20px] text-center lg:gap-[12px] lg:px-[20px] lg:py-[24px]'
          const inner = (
            <>
              <span className="grid size-[40px] place-items-center rounded-[12px] bg-brand lg:size-[44px]">
                <Image src={t.icon} alt="" width={20} height={20} unoptimized className="size-[18px] lg:size-[20px]" />
              </span>
              <span className="font-sans text-[13px] font-medium leading-[1.3] text-heading lg:text-[14.5px]">{t.label}</span>
            </>
          )
          return (
            <li key={t.service} className="flex">
              {page
                ? <Link href={href(page.url)} className={`${tile} transition-colors hover:bg-[#dcefef]`}>{inner}</Link>
                : <span className={tile}>{inner}</span>}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* -------------------------------------------------------------- counties -- */

/**
 * 7329:6198 / 7329:5809 — "Counties We Serve". The heading block as above
 * (lead 674 wide), then three 412 cards a row, 20 apart: white, 1px #e0e7ea,
 * r12, p24, the county at 17/1.3 #0b1f3a and its pages as chips 8 apart
 * (#eaf4f5, pill, px12 py6, 13px #05838b). Cards in a row share its height.
 * No Load More: every card shows.
 *
 * Phone (7329:6912): one card a row, 24 apart, p20, the county at 16px.
 */
export async function StateCounties({ f, top, height }: { f: Facility; top: number; height: number }) {
  const { DETAIL_COPY } = await content('facilities')
  const c = f.hub.counties
  return (
    <Section top={top} height={height} label={f.slug === 'wisconsin-recycling' ? '7329:5809' : '7329:6198'}
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <div id="counties-we-serve" className="flex w-full scroll-mt-[140px] flex-col items-center gap-[24px] text-center lg:w-[780px] lg:gap-[10px]">
        <Eyebrow>{DETAIL_COPY.counties.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[1.25] text-black lg:text-[36px] lg:leading-normal">{DETAIL_COPY.counties.heading}</h2>
        <p className="font-roboto text-[14px] leading-[1.55] text-[#7e7e7e] lg:w-[674px] lg:text-[16px] lg:leading-normal">{c.lead}</p>
      </div>
      <ul className="grid w-full grid-cols-1 gap-[24px] lg:w-[1276px] lg:grid-cols-3 lg:gap-[20px]">
        {c.groups.map((g) => (
          <li key={g.heading} className="flex flex-col gap-[14px] rounded-[12px] border border-[#e0e7ea] bg-white p-[20px] lg:p-[24px]">
            <h3 className="font-sans text-[16px] font-semibold leading-[1.3] text-navy lg:text-[17px]">{g.heading}</h3>
            <ul className="flex flex-wrap gap-[8px]">
              {g.chips.map((ch) => (
                <li key={ch.href}>
                  <Link href={ch.href} className="inline-flex rounded-full bg-[#eaf4f5] px-[12px] py-[6px] font-sans text-[13px] font-medium leading-[1.3] text-brand transition-colors hover:bg-brand hover:text-white">
                    {ch.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------- CTA -- */

/**
 * 7329:6279 / 7329:5864 — 442 tall on a 159.7deg navy to green gradient: a
 * 686 column, 20 apart: the heading at 36/1.2, the body at 16/1.6 (80% white),
 * then Schedule a Pickup (white, teal text) and Get a Quote (outlined) 16
 * apart. Mid-page, so not the closing band (ClosingCta), which ends pages.
 *
 * Phone (7329:6995): py56 px20, 18 apart, 24/1.25 and 14/1.55, the buttons
 * full width and 46 tall, 10 apart.
 */
export function StateCta({ f, top, height }: { f: Facility; top: number; height: number }) {
  const c = f.hub.cta
  return (
    <Section top={top} height={height} label={f.slug === 'wisconsin-recycling' ? '7329:5864' : '7329:6279'}
      className="flex flex-col items-center justify-center gap-[18px] bg-[linear-gradient(119.6deg,#0b1f3a_7.25%,#1b7a3d_79.71%)] px-[20px] py-[56px] lg:gap-[20px] lg:bg-[linear-gradient(159.73deg,#0b1f3a_7.25%,#1b7a3d_79.71%)] lg:p-0">
      <h2 className="w-full text-center font-sans text-[24px] font-semibold leading-[1.25] text-white lg:w-[686px] lg:text-[36px] lg:leading-[1.2]">{c.heading}</h2>
      <p className="w-full text-center font-roboto text-[14px] leading-[1.55] text-white/80 lg:w-[686px] lg:text-[16px] lg:leading-[1.6]">{c.body}</p>
      <div className="flex w-full flex-col gap-[10px] pt-[8px] lg:w-auto lg:flex-row lg:gap-[16px] lg:pt-[10px]">
        <Btn href={c.primary.href} variant="whiteFill" className="justify-center max-lg:h-[46px] max-lg:w-full">{c.primary.label}</Btn>
        <Btn href={c.secondary.href} variant="white" className="justify-center border border-white max-lg:h-[46px] max-lg:w-full">{c.secondary.label}</Btn>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- mail-in -- */

/**
 * 7329:6286 / 7329:5871 — 230 tall on #eaf4f5, px322 py64: an 820 column
 * (the heading at 32/1.2 #0b1f3a, 12 to the body at 16/1.6 in 72% navy) and
 * the teal button on the right.
 *
 * Phone (7329:7001): py44 px20, 14 apart, 24/1.25 and 14/1.55, the button full
 * width and 46 tall.
 */
export function StateMailIn({ f, top, height }: { f: Facility; top: number; height: number }) {
  const m = f.hub.mailIn
  return (
    <Section top={top} height={height} label={f.slug === 'wisconsin-recycling' ? '7329:5871' : '7329:6286'}
      className="flex flex-col items-start gap-[14px] bg-[#eaf4f5] px-[20px] py-[44px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-[322px] lg:py-[64px]">
      <div className="flex w-full flex-col gap-[14px] lg:w-[820px] lg:gap-[12px]">
        <h2 className="font-sans text-[24px] font-semibold leading-[1.25] text-navy lg:text-[32px] lg:leading-[1.2]">{m.heading}</h2>
        <p className="font-roboto text-[14px] leading-[1.55] text-[rgba(11,31,58,0.72)] lg:text-[16px] lg:leading-[1.6]">{m.body}</p>
      </div>
      <div className="w-full pt-[6px] lg:w-auto lg:pt-[10px]">
        <Btn href={m.button.href} className="justify-center max-lg:h-[46px] max-lg:w-full">{m.button.label}</Btn>
      </div>
    </Section>
  )
}
