import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Accordion } from '@/components/client/Accordion'
import { Btn } from '@/components/ui/Bits'
import { FOOTER_H } from '@/lib/layout'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import type { CityPage, SectionKey } from '@/data/city-pages/types'

/**
 * One service in one city — the eight pages of 27 Sep 2026 (Figma file
 * BVtf2AOuUOcYbiMIlcKmbC; copy in src/data/city-pages/). Two families of
 * frame, service area (Chicago) and facility (Blaine, New Berlin), share
 * this one component: a page fills in the sections it has and they are
 * drawn in the order the frames use, alternating white and #fcfcfc bands
 * as the boards do.
 *
 * FLOW, LIKE THE CHICAGO PAGE (ChicagoPage.tsx): every section is an
 * auto-layout column in the frame, so the page is laid out in normal flow
 * on FlowCanvas rather than pinned to measured y offsets. Every number is
 * the board's; where the phone frame differs it is written mobile first
 * with the board's value at `lg:`. Some phone frames give cards a fixed
 * height that clips their text; the cards grow with their text here.
 *
 * REVISED FRAMES, 27 SEP 2026: phone hero button (36px, no arrow) and
 * shorter phone labels, #474747 opening text, per-page grey bands
 * (`bands`), the compact service table, Local widths and paragraph breaks,
 * phone steps with the disc beside the text, phone CTA sizes.
 */
export function CityServicePage({ page }: {
  /** The page's copy from `await content(cityDocKey(...))`, so Admin -> Pages edits reach it. */
  page: CityPage
}) {
  const schema = graph(
    breadcrumbNode(page.hero.crumbs.map((c) => ({ name: c.label, url: c.href ?? page.url }))),
    serviceNode({ name: page.schema.service, url: page.url, description: page.seo.description, areaServed: page.schema.areaServed }),
    faqNode(page.faqs),
  )

  /* The sections this page has, in frame order. Backgrounds alternate from
     white, unless the page lists its grey bands (`bands`): the revised
     frames of 27 Sep 2026 no longer strictly alternate. */
  const sections = ([
    ['opening', <Opening key="opening" page={page} />],
    ['intro', page.intro && <Intro key="intro" page={page} />],
    ['info', <ServiceInfo key="info" page={page} />],
    ['accept', <Accept key="accept" page={page} />],
    ['biz', page.businesses && <Businesses key="biz" page={page} />],
    ['res', page.residents && <Residents key="res" page={page} />],
    ['steps', <Steps key="steps" page={page} />],
    ['whycards', page.whyCards && <WhyCards key="whycards" page={page} />],
    ['options', page.options && <Options key="options" page={page} />],
    ['local', <Local key="local" page={page} />],
    ['whybox', page.whyBox && <WhyBox key="whybox" page={page} />],
    ['faq', <Faq key="faq" page={page} />],
    ['related', <Related key="related" page={page} />],
  ] as [SectionKey, React.ReactNode][]).filter(([, s]) => Boolean(s))
  const grey = (k: SectionKey, i: number) => (page.bands ? page.bands.includes(k) : i % 2 === 1)

  return (
    <FlowCanvas>
      <Header />
      <main>
        <Hero page={page} />
        {sections.map(([k, s], i) => (
          <div key={k} className={grey(k, i) ? 'bg-[#fcfcfc]' : 'bg-white'}>{s}</div>
        ))}
        <Cta page={page} />
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

type P = { page: CityPage }

/* ------------------------------------------------------------ shared bits -- */

/** The frame's pill eyebrow (FAQS): h34 px20 11/0.7 on the board, h30 px16 on the phone. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-[30px] items-center justify-center rounded-full bg-accent-soft px-[16px] font-roboto text-[10.5px] font-bold uppercase leading-none tracking-[0.6px] text-accent lg:h-[34px] lg:px-[20px] lg:text-[11px] lg:tracking-[0.7px]">
      {children}
    </span>
  )
}

/** The 34px section heading (22 on the phone). */
function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`w-full text-center font-sans text-[22px] font-semibold leading-[1.28] text-black lg:text-[34px] lg:leading-normal ${className}`}>
      {children}
    </h2>
  )
}

/** The 28px section heading (20 on the phone) — Service Information, Local, Residents, Related. */
function H2Small({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="w-full text-center font-sans text-[20px] font-semibold leading-[1.28] text-heading lg:text-[28px] lg:leading-normal">{children}</h2>
  )
}

/** A square 44 (board) / 40 (phone) teal tile with a 20 / 18 white glyph. */
function Tile({ src }: { src: string }) {
  return (
    <span className="grid size-[40px] shrink-0 place-items-center rounded-[10px] bg-brand lg:size-[44px] lg:rounded-[12px]">
      <Image src={src} alt="" width={20} height={20} unoptimized className="size-[18px] lg:size-[20px]" />
    </span>
  )
}

/** A round 48 (board) / 44 (phone) teal disc with a 22 / 20 white glyph. */
function Disc({ src }: { src: string }) {
  return (
    <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand lg:size-[48px]">
      <Image src={src} alt="" width={22} height={22} unoptimized className="size-[20px] lg:size-[22px]" />
    </span>
  )
}

/** Body copy: 16/1.6 on the board, 14.5 on the phone. */
const BODY = 'font-roboto text-[14.5px] leading-[1.6] text-muted lg:text-[16px]'

/** The teal bullet rows of the Businesses card and the Why box: a 7px dot, 16px text. */
function Bullets({ points }: { points: string[] }) {
  return (
    <ul className="flex flex-col gap-[10px]">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-[12px]">
          <span aria-hidden="true" className="mt-[8px] size-[7px] shrink-0 rounded-full bg-brand" />
          <span className="min-w-px font-roboto text-[14.5px] leading-[1.55] text-muted lg:text-[16px] lg:leading-[24px]">{p}</span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ hero -- */

/**
 * Hero — 470 on the board, 276 on the phone. The photo is drawn 1920x1081 at
 * y-372 under a 20% grey veil; a navy wash rises from the bottom and a green
 * one comes in from the left. The board draws the crumbs, a 60px H1 and a
 * teal button under it (Schedule a … Pickup); the phone centres the H1 and
 * drops both.
 */
function Hero({ page }: P) {
  const { hero } = page
  return (
    <section data-figma={page.figma.board} className="relative h-[276px] overflow-hidden bg-navy lg:h-[470px]">
      <div className="absolute left-1/2 top-1/2 h-[411px] w-[730px] -translate-x-1/2 -translate-y-1/2 lg:top-[-372px] lg:h-[1081px] lg:w-[1920px] lg:translate-y-0" aria-hidden="true">
        <Image src={hero.image} alt="" fill priority sizes="(width < 64rem) 730px, 1920px" className="object-cover" />
        <span className="absolute inset-0 bg-[rgba(98,98,98,0.2)]" />
      </div>
      <span aria-hidden="true" className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />
      <span aria-hidden="true" className="absolute inset-y-0 left-[-62px] w-[1127px] lg:left-0 lg:w-full"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* Text block — 839 wide at x319, centred on the band: crumbs, the H1
          38 below them, the button 21 under the H1's line. */}
      <div className="relative flex h-full flex-col items-center justify-center px-[20px] lg:mx-auto lg:w-[1282px] lg:items-start lg:px-0">
        <nav aria-label="Breadcrumb" className="max-lg:hidden lg:mb-[21px] lg:pl-[3px]">
          <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
            {hero.crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-[13px]">
                {i > 0 && <span aria-hidden="true" className={i === 1 ? 'text-white/50' : 'text-white'}>/</span>}
                {c.href
                  ? <Link href={c.href} className={i === 0 ? 'text-white/50 hover:text-white' : 'text-white hover:underline'}>{c.label}</Link>
                  : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {/* 28/1.2 on the phone since the revised frames (27 Sep 2026). */}
        <h1 className="w-full max-w-[350px] text-center font-sans text-[28px] font-semibold leading-[1.2] text-white lg:w-auto lg:max-w-none lg:whitespace-nowrap lg:text-left lg:text-[60px] lg:leading-[84.7px] lg:tracking-[-2.03px]">
          {hero.h1}
        </h1>
        {hero.button && (
          <>
            {/* Phone (6955:* in the revised frames): a 36px teal button,
                14px Roboto Medium, no arrow, often a shorter label. */}
            <Link href={hero.button.href}
              className="btn-pop mt-[18px] inline-flex h-[36px] max-w-[350px] items-center justify-center rounded-[8px] bg-brand px-[18px] font-roboto text-[14px] font-medium leading-none text-white lg:hidden">
              <span className="truncate">{hero.button.phoneLabel ?? hero.button.label}</span>
            </Link>
            <div className="max-lg:hidden lg:mt-[21px]">
              <Btn href={hero.button.href} variant="colored" className="backdrop-blur-[4px]">{hero.button.label}</Btn>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- opening -- */

/**
 * Section - Opening: one to three paragraphs at 1282, 60 under the hero.
 * Revised frames (27 Sep 2026): every paragraph #474747 at 16/1.65, 20 of
 * bottom padding; on the phone left aligned and justified, 14.5/1.6, 32/16.
 */
function Opening({ page }: P) {
  return (
    <section className="px-[20px] pb-[16px] pt-[32px] lg:px-0 lg:pb-[20px] lg:pt-[60px]">
      <div className="mx-auto flex w-full flex-col gap-[14px] text-justify lg:w-[1282px] lg:gap-[16px] lg:text-left">
        {page.opening.map((p) => (
          <p key={p} className="font-roboto text-[14.5px] leading-[1.6] text-[#474747] lg:text-[16px] lg:leading-[1.65]">{p}</p>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- intro -- */

/** Section - Services Intro (Chicago): 34px h2, two paragraphs, then the tinted 1282 aside. */
function Intro({ page }: P) {
  const intro = page.intro!
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:pb-[60px] lg:pt-[40px]">
      <div className="mx-auto flex w-full flex-col gap-[24px] lg:w-[1282px] lg:gap-[40px]">
        {/* Revised frames (27 Sep 2026): 32px heading, #474747 body at 1.65;
            on the phone a 22px heading and justified text, left aligned. */}
        <div className="flex flex-col gap-[14px] text-left lg:gap-[16px]">
          <h2 className="font-sans text-[22px] font-semibold leading-[1.28] text-heading lg:text-[32px] lg:leading-[1.22]">{intro.heading}</h2>
          {intro.body.map((p) => <p key={p} className="text-justify font-roboto text-[14.5px] leading-[1.6] text-[#474747] lg:text-left lg:text-[16px] lg:leading-[1.65]">{p}</p>)}
        </div>
        <aside className="flex w-full flex-col gap-[12px] rounded-[14px] bg-brand-soft px-[22px] py-[24px] text-left lg:gap-[14px] lg:px-[36px] lg:py-[32px]">
          <h3 className="font-sans text-[16px] font-medium leading-normal text-heading lg:text-[22px]">{intro.aside.heading}</h3>
          {intro.aside.body.map((p) => (
            <p key={p} className="font-roboto text-[13.5px] leading-[1.55] text-[#474747] lg:text-[15.5px] lg:leading-[1.6]">{p}</p>
          ))}
        </aside>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- service info -- */

/**
 * Section - Service Info: a 28px heading and a 1000 wide bordered table,
 * label (220) beside value on the board, label over value on the phone.
 */
function ServiceInfo({ page }: P) {
  const { serviceInfo } = page
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[60px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[30px]">
        <H2Small>{serviceInfo.heading}</H2Small>
        {/* `compact` (revised frames, 27 Sep 2026): a 260 label column and
            rows at least 40 tall, centred, 14 apart, card padding 32/40. */}
        <dl className={`flex w-full flex-col gap-[14px] rounded-[14px] border border-[#e6e6e6] bg-white p-[24px] lg:w-[1000px] lg:rounded-[16px] ${serviceInfo.compact ? 'lg:gap-[14px] lg:px-[40px] lg:py-[32px]' : 'lg:gap-0 lg:px-[41px] lg:py-[20px]'}`}>
          {serviceInfo.rows.map((r, i) => (
            <div key={r.label}
              className={`flex flex-col gap-[3px] lg:flex-row lg:gap-[20px] ${serviceInfo.compact ? 'lg:min-h-[40px] lg:items-center' : 'lg:items-start lg:py-[14px]'} ${i < serviceInfo.rows.length - 1 ? 'border-b border-[#ededed] pb-[14px]' : ''}`}>
              <dt className={`font-sans text-[13px] font-medium leading-normal text-heading lg:shrink-0 lg:text-[14.5px] ${serviceInfo.compact ? 'lg:w-[260px]' : 'lg:w-[220px]'}`}>{r.label}</dt>
              <dd className="font-roboto text-[13.5px] leading-[1.55] text-muted lg:min-w-px lg:flex-1 lg:text-[14.5px]">
                {typeof r.value === 'string' ? r.value : r.value.map((p, j) => (
                  <span key={p.tel}>
                    {j > 0 && <span aria-hidden="true">{'  |  '}</span>}
                    <a href={p.tel} className="hover:text-brand">{p.label}</a>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- accept -- */

/**
 * Section - What We Accept. Three drawings: tinted cards with a tile icon
 * (2 x 620 for the battery pages, 2 x 408 plus a full width Phones card for
 * electronics); titled pill groups (Chicago light bulbs); centred teal lines
 * (the facility light bulb pages). The note sits at 1000 under all three.
 */
function Accept({ page }: P) {
  const { accept } = page
  const narrow = accept.items?.some((i) => i.wide)   // the electronics grid: 840 wide
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[24px] lg:w-[1282px] lg:gap-[40px]">
        <div className="flex w-full flex-col items-center gap-[10px] text-center">
          <H2>{accept.heading}</H2>
          <p className="font-roboto text-[13.5px] leading-normal text-muted lg:text-[15px]">{accept.lead}</p>
        </div>

        {accept.layout === 'cards' && (
          <ul className={`grid w-full grid-cols-1 gap-[16px] lg:gap-[24px] ${narrow ? 'lg:w-[840px] lg:grid-cols-2' : 'lg:w-[1264px] lg:grid-cols-2'}`}>
            {accept.items!.map((it) => (
              <li key={it.title}
                className={`flex flex-col gap-[12px] rounded-[12px] bg-brand-soft p-[22px] lg:gap-[14px] ${narrow ? 'lg:p-[26px]' : 'lg:p-[28px]'} ${it.wide ? 'lg:col-span-2 lg:flex-row lg:items-center lg:gap-[20px]' : ''}`}>
                <Tile src={it.icon} />
                <span className={`flex min-w-px flex-col ${it.wide ? 'gap-[6px]' : 'gap-[10px] lg:gap-[14px]'}`}>
                  <span className={`font-sans font-medium leading-normal text-heading ${narrow ? 'text-[16px] lg:text-[17px]' : 'text-[16px] lg:text-[18px]'}`}>{it.title}</span>
                  {it.text && <span className={`font-roboto leading-[1.55] text-muted ${narrow ? 'text-[13.5px] lg:text-[14px]' : 'text-[13.5px] lg:text-[14.5px]'}`}>{it.text}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}

        {accept.layout === 'pills' && (
          <div className="flex w-full flex-col items-center gap-[32px] lg:gap-[40px]">
            {accept.groups!.map((g) => (
              <div key={g.title} className="flex w-full flex-col items-center gap-[14px] lg:gap-[16px]">
                <h3 className="font-sans text-[17px] font-medium leading-normal text-brand lg:text-[18px]">{g.title}</h3>
                {/* One pill per line, centred, on the phone (revised frame 6920:8992). */}
                <ul className="flex w-full flex-col items-center gap-[10px] lg:w-[860px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[12px]">
                  {g.items.map((it) => (
                    <li key={it} className="flex h-[36px] items-center rounded-full bg-brand-soft px-[14px] font-sans text-[13px] font-medium leading-normal text-heading lg:h-[40px] lg:px-[18px] lg:text-[14px]">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {accept.layout === 'list' && (
          <ul className="flex w-full flex-col items-center gap-[12px] text-center lg:gap-[16px]">
            {accept.list!.map((it) => (
              <li key={it} className="font-sans text-[15.5px] font-medium leading-normal text-brand lg:text-[18px]">{it}</li>
            ))}
          </ul>
        )}

        <p className="w-full text-center font-roboto text-[13px] leading-[1.6] text-muted lg:w-[1000px] lg:text-[14.5px]">{accept.note}</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ businesses -- */

/** Section - Businesses (Chicago): the 1282 bordered card, padding 45/41. */
function Businesses({ page }: P) {
  const b = page.businesses!
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white p-[24px] lg:w-[1282px] lg:gap-[16px] lg:px-[45px] lg:py-[41px]">
        <h2 className="font-sans text-[20px] font-semibold leading-[1.3] text-heading lg:text-[28px] lg:leading-normal">{b.heading}</h2>
        <p className={BODY}>{b.intro}</p>
        {b.subLead && <p className="font-sans text-[14px] font-medium leading-normal text-heading lg:text-[15px]">{b.subLead}</p>}
        <Bullets points={b.points} />
        {b.outro.map((p) => <p key={p} className={BODY}>{p}</p>)}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- residents -- */

/** Section - Residents (Chicago): a 28px heading, a centred paragraph, an optional link. */
function Residents({ page }: P) {
  const r = page.residents!
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[60px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[16px] text-center lg:w-[1152px]">
        <H2Small>{r.heading}</H2Small>
        {r.body.map((p) => <p key={p} className={`${BODY} lg:w-[900px]`}>{p}</p>)}
        {r.link && <Link href={r.link.href} className="font-sans text-[14px] font-medium text-brand hover:underline lg:text-[15px]">{r.link.label}</Link>}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- steps -- */

/**
 * Section - How It Works. Three to five bordered cards in a row, an 18px
 * arrow 16 after each of the first n-1 when the frame draws arrows, a
 * footnote under the row. Five cards with arrows run to 1536 on the board,
 * as the electronics frames do; every other count fits in 1282. Stacked on
 * the phone with the arrow turned down.
 */
function Steps({ page }: P) {
  const s = page.steps
  const n = s.items.length
  const wide = s.arrows && n === 5
  const small = n === 5
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[40px]">
        <H2>{s.heading}</H2>
        <ol className={`flex w-full flex-col lg:flex-row lg:items-stretch ${s.arrows ? 'gap-[14px] lg:gap-[16px]' : 'gap-[16px] lg:gap-[20px]'} ${wide ? 'lg:w-[1536px]' : 'lg:w-[1282px]'}`}>
          {s.items.map((it, i) => (
            <li key={it.title} className={`flex flex-col items-center lg:flex-1 lg:flex-row ${s.arrows ? 'lg:gap-[16px]' : ''}`}>
              {/* Phone (revised frames, 27 Sep 2026): the number disc sits left
                  of the title and text, and there are no arrows. */}
              <div className={`flex w-full flex-row items-start gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white p-[20px] lg:h-full lg:flex-1 lg:flex-col lg:items-stretch lg:gap-[12px] ${small ? 'lg:px-[23px] lg:py-[25px]' : 'lg:px-[25px] lg:py-[27px]'}`}>
                <span className="grid size-[32px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[14px] font-medium text-white lg:size-[34px]">{i + 1}</span>
                <span className="flex min-w-px flex-1 flex-col gap-[8px] lg:gap-[12px]">
                  <span className={`font-sans font-medium leading-normal text-heading ${small ? 'text-[15px] lg:text-[16px]' : 'text-[15px] lg:text-[17px]'}`}>{it.title}</span>
                  {(Array.isArray(it.text) ? it.text : [it.text]).map((t) => (
                    <span key={t} className={`font-roboto leading-[1.6] text-muted ${small ? 'text-[13px] lg:text-[13.5px]' : 'text-[13px] lg:text-[14.5px]'}`}>{t}</span>
                  ))}
                </span>
              </div>
              {s.arrows && i < n - 1 && (
                <Image src="/images/locations/chicago/step-arrow.svg" alt="" width={18} height={18} unoptimized className="size-[18px] shrink-0 max-lg:hidden" />
              )}
            </li>
          ))}
        </ol>
        {s.footnote && <p className="w-full text-center font-roboto text-[13px] leading-normal text-muted lg:w-[1000px] lg:text-[13.5px]">{s.footnote}</p>}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- why cards -- */

/** Section - Why Recycle Technologies (Chicago): 2 x 2 bordered cards, 620 wide, a round icon disc. */
function WhyCards({ page }: P) {
  const w = page.whyCards!
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1264px] lg:gap-[40px]">
        <H2>{w.heading}</H2>
        <ul className="grid w-full grid-cols-1 gap-[16px] lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[40px]">
          {w.items.map((it) => (
            <li key={it.title} className="flex flex-col gap-[12px] rounded-[12px] border border-[#e6e6e6] bg-white p-[24px] lg:gap-[14px] lg:p-[30px]">
              <Disc src={it.icon} />
              <span className="font-sans text-[17px] font-medium leading-normal text-heading lg:text-[19px]">{it.title}</span>
              <span className="font-roboto text-[14px] leading-[1.6] text-muted lg:text-[15px]">{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- options -- */

/**
 * Section - Recycling Options (facility pages): three 408 cards in a row, or
 * (the light bulb frames) two 620 cards with the third centred underneath.
 */
function Options({ page }: P) {
  const o = page.options!
  const two = o.layout === 'two-one'
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1272px] lg:gap-[40px]">
        <H2>{o.heading}</H2>
        <ul className={`flex w-full flex-col gap-[16px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[24px] ${two ? 'lg:gap-y-[40px]' : ''}`}>
          {o.items.map((it) => (
            <li key={it.title}
              className={`flex flex-col gap-[12px] rounded-[12px] border border-[#e6e6e6] bg-white p-[24px] lg:gap-[14px] ${two ? 'lg:w-[620px] lg:p-[30px]' : 'lg:w-[408px] lg:px-[28px] lg:py-[30px]'}`}>
              <Disc src={it.icon} />
              <span className={`font-sans font-medium leading-normal text-heading ${two ? 'text-[17px] lg:text-[19px]' : 'text-[16px] lg:text-[18px]'}`}>{it.title}</span>
              <span className={`font-roboto text-muted ${two ? 'text-[14px] leading-[1.6] lg:text-[15px]' : 'text-[13.5px] leading-[1.58] lg:text-[14.5px]'}`}>{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- local -- */

/** Section - Local Law / Local Recycling Information: a 28px heading over centred copy. */
function Local({ page }: P) {
  const l = page.local
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[60px]">
      {/* Revised frames (27 Sep 2026): 16/1.65 text in the frame's own width
          (1000 on the electronics pages, 900 on the light bulb pages), and
          a paragraph break drawn as a blank line on the board. */}
      <div className="mx-auto flex w-full flex-col items-center gap-[14px] text-center lg:w-[1078px] lg:gap-[16px]">
        <H2Small>{l.heading}</H2Small>
        <div className="flex w-full flex-col gap-[8px] lg:w-[var(--local-w)] lg:gap-[26px]" style={{ '--local-w': `${l.width ?? 1078}px` } as React.CSSProperties}>
          {l.body.map((p) => <p key={p} className="font-roboto text-[14px] leading-[1.6] text-muted lg:text-[16px] lg:leading-[1.65]">{p}</p>)}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- why box -- */

/** Section - Why Recycle Technologies (facility pages): one bordered 1282 card with a bullet list. */
function WhyBox({ page }: P) {
  const w = page.whyBox!
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white p-[24px] lg:w-[1282px] lg:gap-[16px] lg:px-[45px] lg:py-[41px]">
        <h2 className="font-sans text-[20px] font-semibold leading-[1.3] text-heading lg:text-[28px] lg:leading-normal">{w.heading}</h2>
        {w.intro && <p className={BODY}>{w.intro}</p>}
        <Bullets points={w.points} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- faq -- */

/** Section - FAQ: the site's ringed FAQ rows (6107:512) at 900. */
function Faq({ page }: P) {
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[900px] lg:gap-[40px]">
        <div className="flex w-full flex-col items-center gap-[16px] lg:gap-[10px]">
          <Pill>{page.faqHead.eyebrow}</Pill>
          <H2>{page.faqHead.heading}</H2>
        </div>
        <Accordion items={page.faqs} gap={15} variant="ring" idPrefix={`faq-${page.url.replace(/\W+/g, '-')}`} />
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- related -- */

/** Section - Related Recycling Services: centred pill links, 44 tall on the board, 40 on the phone. */
function Related({ page }: P) {
  const r = page.related
  return (
    <section className="px-[20px] py-[40px] lg:px-0 lg:py-[60px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[24px]">
        <H2Small>{r.heading}</H2Small>
        {/* Phone: the electronics frames stack the chips one per row
            (`phoneStack`); the light bulb frames leave some out (`phoneSkip`). */}
        <ul className={`flex w-full justify-center gap-[8px] lg:w-[1346px] lg:flex-row lg:flex-wrap lg:gap-[14px] ${r.phoneStack ? 'max-lg:flex-col max-lg:items-center max-lg:gap-[10px]' : 'flex-wrap'}`}>
          {r.links.map((l) => (
            <li key={l.label} className={r.phoneSkip?.includes(l.label) ? 'max-lg:hidden' : ''}>
              <Link href={l.href}
                className="btn-pop flex h-[40px] items-center gap-[5px] rounded-full border border-[#e6e6e6] bg-white px-[12px] font-sans text-[12.5px] font-medium text-brand hover:border-brand lg:h-[44px] lg:gap-[8px] lg:px-[21px] lg:text-[14px]">
                {l.label}
                <Image src="/images/locations/chicago/chip-arrow.svg" alt="" width={14} height={14} unoptimized className="size-[13px] lg:size-[14px]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- cta -- */

/**
 * Section - CTA: the navy to green band. A 34px heading wrapping at 720
 * (598 on the battery frames), the body at 16/1.6, a white "Schedule …"
 * button and a bordered "Call: …" button, an optional footnote.
 */
function Cta({ page }: P) {
  const c = page.cta
  return (
    /* Revised phone frames (27 Sep 2026): a 122.48deg gradient, a 24/1.25
       heading, 14/1.58 body, the two buttons 46 tall, 10 apart, with the
       phone's own shorter labels. */
    <section className="bg-[linear-gradient(122.48deg,#0b1f3a_7.25%,#1b7a3d_79.71%)] px-[20px] py-[56px] lg:bg-[linear-gradient(162.13deg,#0b1f3a_7.25%,#1b7a3d_79.71%)] lg:px-0 lg:py-[90px]"
      style={{ '--cta-h': `${c.headingWidth ?? 720}px`, '--cta-b': `${c.bodyWidth ?? 1068}px` } as React.CSSProperties}>
      <div className="mx-auto flex w-full flex-col items-center gap-[18px] text-center lg:w-[1216px] lg:gap-[20px]">
        <h2 className="font-sans text-[24px] font-semibold leading-[1.25] text-white lg:w-[var(--cta-h)] lg:text-[34px] lg:leading-[1.22]">{c.heading}</h2>
        {c.body.map((p) => (
          <p key={p} className="font-roboto text-[14px] leading-[1.58] text-white/85 lg:w-[var(--cta-b)] lg:text-[16px] lg:leading-[1.6]">{p}</p>
        ))}
        <div className="flex w-full flex-col gap-[10px] lg:w-auto lg:flex-row lg:gap-[16px] lg:pt-[10px]">
          <Btn href={c.primary.href} variant="coloredWhite" wrap className="justify-center backdrop-blur-[4px] max-lg:min-h-[46px] max-lg:w-full max-lg:px-[16px] max-lg:text-[14px]">
            <span className="lg:hidden">{c.primary.phoneLabel ?? c.primary.label}</span>
            <span className="max-lg:hidden">{c.primary.label}</span>
          </Btn>
          <a href={c.phone.tel}
            className="btn-pop inline-flex h-[46px] items-center justify-center gap-[8.008px] rounded-[8px] border border-white px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white backdrop-blur-[4px] max-lg:w-full lg:h-[48.05px]">
            <span className="whitespace-nowrap lg:hidden">{c.phone.phoneLabel ?? c.phone.label}</span>
            <span className="whitespace-nowrap max-lg:hidden">{c.phone.label}</span>
            <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
          </a>
        </div>
        {c.footnote && <p className="font-roboto text-[13px] leading-normal text-white/70 lg:w-[720px] lg:text-[13.5px]">{c.footnote}</p>}
      </div>
    </section>
  )
}
