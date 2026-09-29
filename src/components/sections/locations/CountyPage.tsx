import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Btn } from '@/components/ui/Bits'
import { FOOTER_H } from '@/lib/layout'
import { QUOTE_HREF, href } from '@/lib/urls'
import { breadcrumbNode, graph, serviceNode } from '@/lib/schema'
import type { AboutBlock, CountyPage as Page } from '@/data/county-pages/types'
import { COUNTY_CTA, COUNTY_FEATURE_ICONS, COUNTY_ITEMS, COUNTY_LINE_ICONS, COUNTY_SERVICES } from '@/data/county-pages/shared'

/**
 * A county recycling page — the eleven of 29 Sep 2026 (Figma
 * BVtf2AOuUOcYbiMIlcKmbC; copy in src/data/county-pages/, see types.ts).
 * Built from the Anoka frames, board 7015:13572 and phone 7015:13994; the
 * other ten are the same template with their own copy and photo.
 *
 * FLOW, like CityServicePage: every section is an auto-layout column in the
 * frame, so it is laid out in normal flow on FlowCanvas. Numbers are the
 * phone frame's, with the board's at `lg:`. Row breaks the board draws
 * (six pills a row, three sights a row) are kept as rows there; the phone
 * frame draws two pills a row and one sight a row, and so does this.
 *
 * The frames export both buttons with their label the colour of their fill
 * (teal on teal, white on white), which is the button component losing its
 * colour in export; they are drawn as the Figma preview shows them, white on
 * teal and teal on white.
 */
export function CountyPage({ page }: { page: Page }) {
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/all-locations/' },
    { name: page.hero.crumb, url: page.url },
  ]
  const schema = graph(
    breadcrumbNode(trail),
    serviceNode({ name: 'Electronics Recycling', url: page.url, description: page.seo.description, areaServed: [`${page.county}, ${page.state}`] }),
  )
  return (
    <FlowCanvas>
      <Header />
      <main>
        <Hero page={page} />
        <About page={page} />
        <Services />
        <Cta />
        {page.items && <Items heading={page.items.heading} />}
        {page.features && <Features cards={page.features} />}
        {page.sights && <Sights sights={page.sights} />}
        <Company page={page} />
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

/** Split a list into rows of n, for the rows the frames draw. */
function rows<T>(list: T[], n: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < list.length; i += n) out.push(list.slice(i, i + n))
  return out
}

/**
 * Old copy with its links: "[this form](quote)" -> the quote form,
 * "[Click here](mailin)" -> /mail-in-recycling/. See types.ts.
 */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\((?:quote|mailin)\))/)
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\((quote|mailin)\)$/.exec(part)
        if (!m) return part
        return <Link key={i} href={m[2] === 'mailin' ? href('/mail-in-recycling/') : QUOTE_HREF} className="text-brand underline-offset-2 hover:underline">{m[1]}</Link>
      })}
    </>
  )
}

/* ------------------------------------------------------------------ hero -- */

/**
 * Hero — 470 on the board (7015:13574), 276 on the phone (7015:14008). The
 * photo is 1920x1081 at the frame's y (-372; -389 on Washington, WI) under
 * a navy wash rising from the bottom and a green one from the left. On the
 * phone the visible photo layer is 878x494 at (-223, -108), under a 505 wide
 * green wash from x-6 and, on most frames, a dark tint; there is no navy and
 * no breadcrumb.
 */
function Hero({ page }: { page: Page }) {
  const h = page.hero
  return (
    <section data-figma={page.figma.board} className="relative h-[276px] overflow-hidden bg-navy lg:h-[470px]">
      <div aria-hidden="true" className="absolute left-[-223px] top-[-108px] h-[494px] w-[878px] lg:left-1/2 lg:top-[var(--img-t)] lg:h-[1081px] lg:w-[1920px] lg:-translate-x-1/2"
        style={{ '--img-t': `${h.imageTop}px` } as React.CSSProperties}>
        <Image src={h.image} alt="" fill priority sizes="(width < 64rem) 878px, 1920px" className="object-cover" />
        {h.phoneOverlay && <span className="absolute inset-0 lg:hidden" style={{ background: h.phoneOverlay }} />}
        {h.overlay && <span className="absolute inset-0 max-lg:hidden" style={{ background: h.overlay }} />}
      </div>
      <span aria-hidden="true" className="absolute inset-0 max-lg:hidden"
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
      <span aria-hidden="true" className="absolute inset-y-0 left-[-6px] w-[505px] lg:left-0 lg:w-full"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* Text — crumbs at y131, H1 at 158, lead at 250, button at 294 on the
          board: one block centred on the band. */}
      <div className="relative flex h-full flex-col items-center justify-center px-[40px] text-center lg:mx-auto lg:w-[1282px] lg:items-start lg:px-0 lg:text-left">
        <nav aria-label="Breadcrumb" className="max-lg:hidden lg:mb-[10px] lg:pl-[3px]">
          <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
            {trailOf(page).map((c, i) => (
              <li key={c.label} className="flex items-center gap-[13px]">
                {i > 0 && <span aria-hidden="true" className={i === 1 ? 'text-white/50' : 'text-white'}>/</span>}
                {c.href
                  ? <Link href={c.href} className={i === 0 ? 'text-white/50 hover:text-white' : 'text-white hover:underline'}>{c.label}</Link>
                  : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="w-full max-w-[310px] font-sans text-[28px] font-semibold leading-[1.2] text-white lg:max-w-[1156px] lg:text-[60px] lg:leading-[84.7px] lg:tracking-[-2.03px]">
          {h.h1}
        </h1>
        <p className="mt-[8px] w-full max-w-[310px] font-roboto text-[13.5px] leading-[1.4] text-white/90 lg:mt-[7px] lg:min-h-[32px] lg:max-w-[777px] lg:text-[17px] lg:leading-[normal]">
          {h.lead}
        </p>
        {/* Phone 7015:14008: a 40px button, 14px, no arrow. */}
        <Link href={h.button.href}
          className="btn-pop mt-[16px] inline-flex h-[40px] items-center justify-center gap-[8px] rounded-[8px] bg-brand px-[18px] font-roboto text-[14px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white backdrop-blur-[4px] lg:hidden">
          {h.button.label}
        </Link>
        <div className="max-lg:hidden lg:mt-[12px]">
          <Btn href={h.button.href} variant="colored" className="backdrop-blur-[4px]">{h.button.label}</Btn>
        </div>
      </div>
    </section>
  )
}

/** Home / Locations / <page>, as the board's breadcrumb reads. */
function trailOf(page: Page) {
  return [
    { label: 'Home', href: href('/') },
    { label: 'Locations', href: href('/all-locations/') },
    { label: page.hero.crumb, href: null },
  ]
}

/* ----------------------------------------------------------------- about -- */

const P = 'font-roboto text-[14px] leading-[1.6] text-[#474747] max-lg:text-justify lg:text-[16px] lg:leading-[1.65]'

/**
 * Section - About (7016:9107): the heading, the paragraphs and, on most
 * frames, a bordered list. Anoka's list is its own 8px-inset card, 40 under
 * the text; the others sit in the text column, 18 under the paragraph before.
 */
function About({ page }: { page: Page }) {
  return (
    <section className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full max-w-[350px] flex-col gap-[20px] lg:max-w-none lg:w-[1282px] lg:gap-[18px]">
        <h2 className="font-sans text-[21px] font-semibold leading-[1.3] text-[#132119] max-lg:text-justify lg:text-[32px] lg:leading-[normal]">{page.about.heading}</h2>
        {page.about.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>
    </section>
  )
}

function Block({ block }: { block: AboutBlock }) {
  if ('p' in block) return <p className={P}><Rich text={block.p} /></p>
  if ('h' in block) return <h3 className="font-sans text-[18px] font-semibold leading-[1.3] text-[#132119] lg:mt-[4px] lg:text-[22px] lg:leading-[normal]">{block.h}</h3>
  return (
    <div className={`overflow-hidden rounded-[14px] border border-[#e6e6e6] bg-white lg:rounded-[16px] ${block.padded ? 'lg:mt-[22px] lg:p-[8px]' : ''}`}>
      {block.list.map((it, i) => (
        <div key={it.title} className={`flex flex-col gap-[6px] p-[20px] lg:gap-[8px] lg:px-[32px] lg:py-[24px] ${i < block.list.length - 1 ? 'border-b border-[#ededed]' : ''}`}>
          <h3 className="font-sans text-[15.5px] font-medium leading-[normal] text-[#132119] lg:text-[18px]">{it.title}</h3>
          <p className="font-roboto text-[13.5px] leading-[1.55] text-[#474747] max-lg:text-justify lg:text-[15.5px] lg:leading-[1.6]"><Rich text={it.text} /></p>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------- services -- */

/** Section - Service Options (7016:9108): three cards, stacked on the phone. */
function Services() {
  return (
    <section className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full max-w-[350px] flex-col gap-[16px] lg:max-w-none lg:w-[1272px] lg:flex-row lg:gap-[24px]">
        {COUNTY_SERVICES.map((s) => (
          <div key={s.title} className="flex flex-col gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[26px] lg:min-h-[285px] lg:w-[408px] lg:gap-[16px] lg:px-[30px] lg:py-[32px]">
            <span className="grid size-[44px] place-items-center rounded-full bg-brand lg:size-[48px]">
              <Image src={s.icon} alt="" width={22} height={22} className="size-[20px] lg:size-[22px]" />
            </span>
            <h2 className="font-sans text-[17px] font-medium leading-[normal] text-[#132119] lg:text-[19px]">{s.title}</h2>
            <p className="font-roboto text-[13.5px] leading-[1.55] text-[#7e7e7e] lg:flex-1 lg:text-[15px] lg:leading-[1.58]">{s.text}</p>
            <div className="flex flex-wrap gap-x-[16px] gap-y-[14px] lg:gap-[16px]">
              {s.links.map((l) => {
                const inner = (
                  <>
                    {l.label}
                    <Image src="/images/icons/arrow-teal.svg" alt="" width={14} height={11} className="h-[10px] w-[13px] lg:h-[11px] lg:w-[14px]" />
                  </>
                )
                const cls = 'inline-flex items-center gap-[6px] font-roboto text-[13.5px] font-medium leading-[normal] text-brand hover:underline lg:text-[14.5px]'
                return l.external
                  ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  : <Link key={l.label} href={l.href} className={cls}>{inner}</Link>
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- cta -- */

/** Section - CTA Banner (7016:9109): 165.39deg on the board, 135.74deg on the phone. */
function Cta() {
  return (
    <section className="bg-[linear-gradient(135.74deg,#0b1f3a_7.2464%,#1b7a3d_79.71%)] px-[20px] py-[56px] lg:bg-[linear-gradient(165.39deg,#0b1f3a_7.2464%,#1b7a3d_79.71%)] lg:px-0 lg:py-[80px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[16px] text-center lg:w-[900px] lg:gap-[20px]">
        <h2 className="font-sans text-[23px] font-semibold leading-[normal] text-white lg:text-[34px]">{COUNTY_CTA.heading}</h2>
        <p className="font-roboto text-[14.5px] leading-[normal] text-white/85 lg:text-[17px]">{COUNTY_CTA.body}</p>
        <Btn href={COUNTY_CTA.button.href} variant="coloredWhite" className="justify-center backdrop-blur-[4px] max-lg:h-[46px] max-lg:w-[200px]">{COUNTY_CTA.button.label}</Btn>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- items -- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex h-[32px] items-center whitespace-nowrap rounded-full bg-[#eaf4f5] px-[14px] font-sans text-[12.5px] font-medium leading-none text-[#132119] lg:h-[36px] lg:px-[16px] lg:text-[13.5px]">
      {children}
    </li>
  )
}

/** Section - Items We Accept (7016:9110): four groups; six pills a row on the board, two on the phone. */
function Items({ heading }: { heading: string }) {
  return (
    <section className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] lg:w-[1282px] lg:gap-[40px]">
        <h2 className="text-center font-sans text-[22px] font-semibold leading-[normal] text-[#132119] lg:text-[32px]">{heading}</h2>
        {COUNTY_ITEMS.map((g) => (
          <div key={g.title} className="flex w-full flex-col items-center gap-[12px] lg:gap-[16px]">
            <h3 className="text-center font-sans text-[16px] font-medium leading-[normal] text-brand lg:text-[19px]">{g.title}</h3>
            <div className="flex flex-col items-center gap-[8px] lg:hidden">
              {rows(g.items, 2).map((r) => <ul key={r.join()} className="flex justify-center gap-[8px]">{r.map((x) => <Pill key={x}>{x}</Pill>)}</ul>)}
            </div>
            <div className="flex flex-col items-center gap-[10px] max-lg:hidden">
              {rows(g.items, 6).map((r) => <ul key={r.join()} className="flex justify-center gap-[10px]">{r.map((x) => <Pill key={x}>{x}</Pill>)}</ul>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- features -- */

/** Section - Pioneers Feature Block (Scott 7027:21191, Benton 7038:28622): four cards, two a row on the board. */
function Features({ cards }: { cards: { title: string; text: string }[] }) {
  return (
    <section className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto grid w-full max-w-[350px] grid-cols-1 gap-[16px] lg:max-w-none lg:w-[1264px] lg:grid-cols-2 lg:items-start lg:gap-x-[24px] lg:gap-y-[40px]">
        {cards.map((c, i) => (
          <div key={c.title} className="flex flex-col gap-[12px] rounded-[12px] border border-[#e6e6e6] bg-white p-[22px] lg:gap-[14px] lg:p-[32px]">
            <span className="grid size-[44px] place-items-center rounded-full bg-brand lg:size-[48px]">
              <Image src={COUNTY_FEATURE_ICONS[i] ?? COUNTY_FEATURE_ICONS[0]!} alt="" width={22} height={22} className="size-[20px] lg:size-[22px]" />
            </span>
            <h2 className="font-sans text-[17px] font-medium leading-[normal] text-[#132119] lg:text-[20px]">{c.title}</h2>
            <p className="font-roboto text-[13.5px] leading-[1.55] text-[#7e7e7e] lg:text-[15px] lg:leading-[1.6]">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- sights -- */

/** Section - Top Sights (7016:9111): three a row on the board, one a row on the phone. */
function Sights({ sights }: { sights: { heading: string; items: string[] } }) {
  const tile = (x: string) => (
    <li key={x} className="flex h-[54px] w-full items-center gap-[12px] rounded-[10px] bg-[#eaf4f5] px-[20px] lg:h-[60px] lg:w-auto lg:px-[22px]">
      <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-brand lg:size-[8px]" />
      <span className="font-sans text-[14px] font-medium leading-[normal] text-[#132119] lg:whitespace-nowrap lg:text-[15px]">{x}</span>
    </li>
  )
  return (
    <section className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full max-w-[350px] flex-col items-center gap-[20px] lg:max-w-none lg:w-[1282px] lg:gap-[30px]">
        <h2 className="text-center font-sans text-[21px] font-semibold leading-[normal] text-[#132119] lg:w-[1000px] lg:text-[32px]">{sights.heading}</h2>
        <ul className="flex w-full flex-col gap-[12px] lg:hidden">{sights.items.map(tile)}</ul>
        <div className="flex flex-col items-center gap-[16px] max-lg:hidden">
          {rows(sights.items, 3).map((r) => <ul key={r.join()} className="flex justify-center gap-[16px]">{r.map(tile)}</ul>)}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- company -- */

/** Section - Company Info (7016:9112): one card, text left and hours right on the board. */
function Company({ page }: { page: Page }) {
  const c = page.company
  return (
    <section className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full max-w-[350px] flex-col gap-[20px] rounded-[14px] border border-[#e6e6e6] bg-white px-[26px] py-[30px] lg:max-w-none lg:w-[1059px] lg:flex-row lg:items-center lg:gap-[60px] lg:rounded-[16px] lg:px-[48px] lg:py-[40px]">
        <div className="flex flex-col gap-[20px] lg:w-[500px] lg:gap-[10px]">
          <h2 className="font-sans text-[20px] font-semibold leading-[normal] text-[#132119] lg:text-[26px]">{c.name}</h2>
          <p className="font-roboto text-[14px] leading-[1.58] text-[#7e7e7e] lg:text-[15.5px] lg:leading-[1.6]">{c.text}</p>
        </div>
        <span aria-hidden="true" className="h-px w-full bg-[#e6e6e6] lg:h-[120px] lg:w-px" />
        <ul className="flex flex-col gap-[12px] lg:w-[340px] lg:gap-[10px]">
          {c.lines.map((l) => (
            <li key={l.text} className="flex items-center gap-[10px] font-roboto text-[14px] leading-[normal] text-[#132119] lg:text-[15px]">
              <Image src={COUNTY_LINE_ICONS[l.kind]} alt="" width={18} height={18} className="size-[17px] shrink-0 lg:size-[18px]" />
              {l.kind === 'phone' ? <a href={`tel:${l.tel}`} className="hover:text-brand">{l.text}</a> : l.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
