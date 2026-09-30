import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Accordion } from '@/components/client/Accordion'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import { ICON_SRC, type LocalBand, type LocalBlock, type LocalCard, type LocalPage, type Link as L } from '@/data/local-pages/types'

/**
 * One service in one place — the location service pages of 30 Sep 2026
 * (Figma BVtf2AOuUOcYbiMIlcKmbC; copy in src/data/local-pages/). Every frame
 * is the same kit of parts, so the page is its data drawn in order: hero,
 * bands, FAQ, the bands after it, CTA.
 *
 * FLOW, like the city pages before it: each frame section is an auto-layout
 * column (px319 py70 gap40 on the board, px20 py40 gap20 on the phone), so
 * the page runs in normal flow on FlowCanvas. Numbers are the board's at
 * `lg:` and the phone frame's below it.
 *
 *   heading   32/1.3 semibold #132119 (phone 21)
 *   text      16/1.65 #474747, centred, 14 apart (phone 14/1.6)
 *   card      white, 1px #e6e6e6, r12, px30 py32, gap16; title 19 medium,
 *             text 15/1.58 #7e7e7e; an icon is a 48 teal disc (phone
 *             px24 py26 gap14, 18 and 14)
 *   rows      24 apart both ways; a row shorter than the section's widest
 *             keeps that row's card width and sits centred (the 3 + 2 Why
 *             grids); every row stacks on the phone, 14 apart
 *   table     r16 p8, rows px20 py14, the label 15 bold teal in 220, the
 *             value 16/25 (phone r14 p16, label over value)
 *   FAQ       #f4f9f6, py100 gap50, pill, 40px heading, 780 wide ring rows
 *   CTA       navy to green, py80, 34px heading, 800 wide body, two buttons
 */
export function LocalServicePage({ page }: { page: LocalPage }) {
  const schema = graph(
    breadcrumbNode([{ name: 'Home', url: href('/') }, { name: page.hero.crumb, url: page.url }]),
    serviceNode({ name: page.schema.service, url: page.url, description: page.seo.description, areaServed: page.schema.areaServed }),
    faqNode(page.faq.items),
  )
  return (
    <FlowCanvas>
      <Header />
      <main>
        <Hero page={page} />
        {page.bands.map((b) => <Band key={b.figma} band={b} />)}
        <Faq faq={page.faq} id={page.url} />
        {page.after.map((b) => <Band key={b.figma} band={b} />)}
        <Cta cta={page.cta} />
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

/* -------------------------------------------------------------------- hero -- */

const HERO_BG = [
  'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
  'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
  'linear-gradient(90deg, #0b1f3a 0%, #0b1f3a 100%)',
].join(', ')

/** Hero — board: min 470, px319 py70, 18 apart, left; phone: min 276, px20 py40, 12 apart, centred. */
function Hero({ page }: { page: LocalPage }) {
  const h = page.hero
  return (
    <section className="flex min-h-[276px] flex-col items-center justify-center px-[20px] py-[40px] text-center lg:min-h-[470px] lg:px-0 lg:py-[70px] lg:text-left" style={{ backgroundImage: HERO_BG }}>
      <div className="flex w-full flex-col items-center gap-[12px] lg:w-[1282px] lg:items-start lg:gap-[18px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-x-[8px] font-roboto text-[11px] font-bold leading-[19px] text-white/80 lg:text-[13px]">
            <li><Link href={href('/')} className="hover:text-white hover:underline">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{h.crumb}</li>
          </ol>
        </nav>
        <h1 className="font-sans text-[28px] font-semibold leading-[1.2] text-white lg:text-[60px]">{h.h1}</h1>
        <div className="flex w-full flex-col gap-[12px] font-roboto text-[13.5px] leading-[1.4] text-white/90 lg:text-[17px]">
          {h.body.map((t) => <p key={t}>{t}</p>)}
        </div>
        <div className="flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:gap-[16px]">
          <HeroBtn link={h.primary} filled />
          <HeroBtn link={h.secondary} />
        </div>
      </div>
    </section>
  )
}

export function HeroBtn({ link, filled = false }: { link: L; filled?: boolean }) {
  return (
    <Link href={link.href}
      className={`btn-pop flex items-center justify-center rounded-[8px] px-[28px] py-[14.5px] font-sans text-[16px] font-medium leading-[normal] text-white lg:text-[15px] ${filled ? 'bg-brand' : 'border border-white'}`}>
      {link.label}
    </Link>
  )
}

/* ------------------------------------------------------------------- bands -- */

export function Band({ band }: { band: LocalBand }) {
  const banner = band.blocks.length === 1 && band.blocks[0]!.kind === 'banner'
  return (
    <section data-figma={band.figma} className={`px-[20px] py-[40px] lg:px-0 ${banner ? 'lg:py-[60px]' : 'lg:py-[70px]'} ${band.mint ? 'bg-[#f4f9f6]' : band.grey ? 'bg-[#fcfcfc]' : 'bg-white'}`}>
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:gap-[40px]">
        {band.heading && <h2 className="text-center font-sans text-[21px] font-semibold leading-[1.3] text-[#132119] lg:text-[32px]">{band.heading}</h2>}
        <div className="flex w-full flex-col gap-[20px] lg:gap-[28px]">
          {band.blocks.map((b, i) => <Block key={i} block={b} />)}
        </div>
      </div>
    </section>
  )
}

function Block({ block: b }: { block: LocalBlock }) {
  switch (b.kind) {
    case 'text':
      return (
        <div className={`flex w-full flex-col gap-[14px] font-roboto text-[14px] leading-[1.6] text-[#474747] lg:text-[16px] lg:leading-[1.65] ${b.align === 'left' ? 'text-left' : 'text-center'}`}>
          {b.body.map((t) => <p key={t}>{t}</p>)}
        </div>
      )
    case 'h3':
      return <h3 className="text-center font-sans text-[19px] font-medium leading-[1.3] text-[#132119] lg:text-[24px] lg:leading-[31px]">{b.text}</h3>
    case 'card':
      return <Card card={b} />
    case 'cards': {
      const cols = Math.max(...b.rows.map((r) => r.length))
      return (
        <div className="flex w-full flex-col gap-[14px] lg:gap-[24px]">
          {b.rows.map((row, i) => (
            <div key={i} className="flex w-full flex-col gap-[14px] lg:flex-row lg:justify-center lg:gap-[24px]">
              {row.map((c, j) => (
                <Card key={j} card={c}
                  className={row.length < cols ? 'lg:w-[var(--card-w)] lg:flex-none' : 'lg:min-w-px lg:flex-1'}
                  style={{ '--card-w': `${(1282 - 24 * (cols - 1)) / cols}px` } as React.CSSProperties} />
              ))}
            </div>
          ))}
        </div>
      )
    }
    case 'info':
      return (
        <dl className="w-full overflow-hidden rounded-[14px] border border-[#e6e6e6] bg-white p-[16px] lg:rounded-[16px] lg:p-[8px]">
          {b.rows.map((r, i) => (
            <div key={r.label} className={`flex flex-col gap-[4px] py-[14px] lg:flex-row lg:gap-[24px] lg:px-[20px] ${i ? 'border-t border-[#cfe3e3]' : ''}`}>
              <dt className="font-roboto text-[15px] font-bold leading-[23px] text-brand lg:w-[220px] lg:shrink-0">{r.label}</dt>
              <dd className="min-w-px font-roboto text-[15px] leading-[23px] text-[#132119] lg:flex-1 lg:text-[16px] lg:leading-[25px]">{r.value}</dd>
            </div>
          ))}
        </dl>
      )
    case 'bullets':
      return (
        <ul className="flex w-full flex-col gap-[14px] lg:gap-[24px]">
          {b.rows.map((row, i) => (
            <li key={i} className="flex w-full flex-col gap-[14px] lg:flex-row lg:gap-[24px]">
              {row.map((t) => (
                <p key={t} className="flex gap-[12px] rounded-[12px] border border-[#e6e6e6] bg-white p-[18px] text-left font-roboto text-[15px] leading-[23px] text-[#132119] lg:min-w-px lg:flex-1 lg:text-[16px] lg:leading-[25px]">
                  <span aria-hidden="true" className="mt-[7px] size-[10px] shrink-0 rounded-full bg-[#1b7a3d]" />
                  {t}
                </p>
              ))}
            </li>
          ))}
        </ul>
      )
    case 'chips':
      return (
        <ul className="flex w-full flex-wrap justify-center gap-[10px]">
          {b.links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="btn-pop block rounded-full bg-[#eaf4f5] px-[16px] py-[9px] font-sans text-[13.5px] font-medium leading-[22px] text-[#132119] hover:bg-brand hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )
    case 'buttons':
      return (
        <div className="flex w-full flex-col items-center justify-center gap-[12px] lg:flex-row lg:gap-[16px]">
          <Link href={b.primary.href} className="btn-pop flex w-full items-center justify-center rounded-[8px] bg-brand px-[28px] py-[14.5px] font-sans text-[16px] font-medium leading-[normal] text-white lg:w-auto lg:text-[15px]">{b.primary.label}</Link>
          <Link href={b.secondary.href} className="btn-pop flex w-full items-center justify-center rounded-[8px] border border-brand px-[28px] py-[14.5px] font-sans text-[16px] font-medium leading-[normal] text-brand lg:w-auto lg:text-[15px]">{b.secondary.label}</Link>
        </div>
      )
    case 'banner':
      return (
        <div className="flex w-full flex-col items-center gap-[20px] rounded-[12px] border border-[#d6e6de] bg-[#eaf4f5] px-[24px] py-[28px] text-center lg:flex-row lg:gap-[48px] lg:px-[48px] lg:py-[40px] lg:text-left">
          <div className="flex w-full flex-col gap-[10px] lg:min-w-px lg:flex-1">
            <h2 className="font-sans text-[21px] font-semibold leading-[normal] text-[#132119] lg:text-[26px]">{b.heading}</h2>
            {b.body.map((t) => <p key={t} className="font-sans text-[14px] leading-[normal] text-[#474747] lg:text-[16px]">{t}</p>)}
          </div>
          <Link href={b.link.href} className="btn-pop flex w-full shrink-0 items-center justify-center rounded-[8px] bg-brand px-[28px] py-[14.5px] font-sans text-[16px] font-medium leading-[normal] text-white lg:w-auto lg:text-[15px]">{b.link.label}</Link>
        </div>
      )
    case 'button':
      return (
        <div className="flex w-full justify-center">
          <a href={b.link.href} {...(b.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="btn-pop flex h-[48px] w-full items-center justify-center rounded-[8px] border border-brand bg-white px-[28px] font-roboto text-[15px] font-medium leading-[25px] text-brand lg:w-auto">
            {b.link.label}
          </a>
        </div>
      )
  }
}

function Card({ card, className = '', style }: { card: LocalCard; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={style} className={`flex w-full flex-col items-center gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[26px] text-center lg:gap-[16px] lg:px-[30px] lg:py-[32px] ${className}`}>
      {card.icon && (
        <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand">
          <Image src={ICON_SRC(card.icon)} alt="" width={22} height={22} unoptimized className="size-[22px]" />
        </span>
      )}
      {card.n !== undefined && (
        <span aria-hidden="true" className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[20px] font-medium leading-none text-white">{card.n}</span>
      )}
      {card.title && <h3 className="w-full font-sans text-[18px] font-medium leading-[1.3] text-[#132119] lg:text-[19px]">{card.title}</h3>}
      {card.body.map((t) => <p key={t} className="w-full font-roboto text-[14px] leading-[1.58] text-[#7e7e7e] lg:text-[15px]">{t}</p>)}
    </div>
  )
}

/* --------------------------------------------------------------------- faq -- */

export function Faq({ faq, id }: { faq: LocalPage['faq']; id: string }) {
  return (
    <section className="bg-[#f4f9f6] px-[20px] py-[56px] lg:px-0 lg:py-[100px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] lg:w-[780px] lg:gap-[50px]">
        <div className="flex flex-col items-center gap-[10px]">
          <span className="rounded-[17px] bg-[#e8f5ec] px-[20px] py-[9px] font-roboto text-[11px] font-bold leading-[normal] text-[#1b7a3d]">{faq.eyebrow}</span>
          <h2 className="text-center font-sans text-[26px] font-semibold leading-[1.3] text-black lg:text-[40px]">{faq.heading}</h2>
        </div>
        <Accordion items={faq.items} gap={15} variant="ring" idPrefix={`faq-${id.replace(/\W+/g, '-')}`} />
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------- cta -- */

export function Cta({ cta: c }: { cta: LocalPage['cta'] }) {
  return (
    <section className="bg-gradient-to-r from-[#0b1f3a] to-[#1b7a3d] px-[20px] py-[56px] lg:px-0 lg:py-[80px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] text-center text-white lg:w-[1282px]">
        <h2 className="font-sans text-[23px] font-semibold leading-[1.3] lg:text-[34px]">{c.heading}</h2>
        <div className="flex w-full flex-col items-center gap-[20px] lg:gap-[28px]">
          <div className="flex w-full flex-col gap-[14px] font-roboto text-[14.5px] leading-[1.4] lg:w-[800px] lg:text-[17px]">
            {c.body.map((t) => <p key={t}>{t}</p>)}
          </div>
          {c.line && <p className="font-sans text-[18px] font-medium leading-[26px]">{c.line}</p>}
          <div className="flex w-full flex-col items-center gap-[12px] lg:w-auto lg:flex-row lg:gap-[16px]">
            <CtaBtn link={c.primary} filled />
            <CtaBtn link={c.secondary} />
          </div>
          {c.footnote && <p className="font-roboto text-[13px] leading-[normal] text-white/90">{c.footnote}</p>}
        </div>
      </div>
    </section>
  )
}

function CtaBtn({ link, filled = false }: { link: L; filled?: boolean }) {
  const cls = `btn-pop flex h-[48px] w-full items-center justify-center gap-[10px] rounded-[8px] px-[20px] font-roboto text-[16px] font-medium leading-[normal] lg:w-auto lg:px-[28px] lg:text-[15px] ${filled ? 'bg-white text-brand' : 'border border-white text-white'}`
  const inner = (
    <>
      {link.label}
      <Image src={filled ? '/images/icons/arrow-teal.svg' : '/images/icons/arrow-white.svg'} alt="" width={15} height={12} className="h-[12px] w-[15px]" />
    </>
  )
  return link.href.startsWith('tel:') ? <a href={link.href} className={cls}>{inner}</a> : <Link href={link.href} className={cls}>{inner}</Link>
}
