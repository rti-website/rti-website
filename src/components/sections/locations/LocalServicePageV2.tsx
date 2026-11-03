import Link from 'next/link'
import { LineIcon } from '@/components/ui/LineIcon'
import { HeroBtn, Faq, Cta, Band as OldBand } from '@/components/sections/locations/LocalServicePage'
import { href } from '@/lib/urls'
import type { DocBlock, LineIconItem, LocalBand, LocalPage, Link as L } from '@/data/local-pages/types'

/**
 * THE 4 NOV 2026 LOCATION SERVICE DESIGN — "RTI Location Service Page New
 * Design", Figma BVtf2AOuUOcYbiMIlcKmbC 7566:9207 (board) and 7577:10185
 * (phone), drawn for Battery Recycling in Blaine and used by every page built
 * from the content team's docs (`design: 2`): Blaine, Phoenix, Lewisburg,
 * Ocala, Greenwood and Ontario.
 *
 * Board numbers at `lg:`, the phone's below it.
 *
 *   section   px319 py70 gap40, heading 32/1.3 semibold #132119 centred
 *             (phone px20 py44 gap24, 22)
 *   hero      pt64 pb84 gap28, H1 60/1.2, text 18/1.4 white/88, left
 *             (phone pt40 pb48 gap24, 30 and 16, buttons full width)
 *   summary   mint box, 1px #d6e6de, r24, px96 py48, 19/1.7 #2d3a33
 *   cards     white, r16, shadow 0 6 24 rgba(18,33,26,.06); icon in a
 *             #eaf4f5 square r14; title 19 medium; text 15/1.58 #7e7e7e
 *   options   left rule 4 teal, r12; pickup on a navy-to-green card r20
 *   why       navy-to-green band, translucent cards, mint icons in a ring
 *   FAQ, Related, CTA as the 30 Sep pages (pill "FAQs" over "Frequently
 *   Asked Questions").
 */
export function LocalServicePageV2Body({ page }: { page: LocalPage }) {
  return (
    <>
      <Hero page={page} />
      {page.summary?.length ? <Summary body={page.summary} /> : null}
      {page.bands.map((b) => <Band key={b.figma} band={b} />)}
      <Faq faq={page.faq} id={page.url} />
      {page.after.map((b) => <OldBand key={b.figma} band={b} />)}
      <Cta cta={page.cta} />
    </>
  )
}

/* ------------------------------------------------------------- rich text -- */

/**
 * `[label](/path/)` links, `**bold**`, and (new here) phone numbers and the
 * dispatch email become tel: and mailto: links, the way the frame draws
 * 763-559-5130 in teal, bold and underlined.
 */
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(\(?\b\d{3}\)?[ -]\d{3}-\d{4}\b)|([\w.+-]+@[\w-]+\.[\w.]+\w)/g

export function Rich({ text, light = false, soft = false }: { text: string; light?: boolean; soft?: boolean }) {
  const out: React.ReactNode[] = []
  let last = 0
  const cls = light
    ? 'font-bold text-white underline underline-offset-2 hover:text-[#7fe0d0]'
    : 'font-bold text-brand underline underline-offset-2 hover:text-[#132119]'
  // `soft`: a page link that reads as the text it sits in (the centre's name
  // and address, drawn plain on the frame); phone numbers stay teal.
  const linkCls = soft ? 'underline-offset-2 hover:text-brand hover:underline' : cls
  for (const m of text.matchAll(INLINE)) {
    if (m.index! > last) out.push(text.slice(last, m.index))
    const k = m.index
    if (m[3] !== undefined) out.push(<strong key={k} className={light ? 'font-bold text-white' : 'font-bold text-[#132119]'}>{m[3]}</strong>)
    else if (m[4] !== undefined) out.push(<a key={k} href={`tel:+1${m[4].replace(/\D/g, '')}`} className={`${cls} whitespace-nowrap`}>{m[4]}</a>)
    else if (m[5] !== undefined) out.push(<a key={k} href={`mailto:${m[5]}`} className={cls}>{m[5]}</a>)
    else if (m[2]!.startsWith('/')) out.push(<Link key={k} href={m[2]!} className={linkCls}>{m[1]}</Link>)
    else if (/^(tel|mailto):/.test(m[2]!)) out.push(<a key={k} href={m[2]} className={cls}>{m[1]}</a>)
    else out.push(<a key={k} href={m[2]} target="_blank" rel="noopener noreferrer" className={linkCls}>{m[1]}</a>)
    last = m.index! + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

/* -------------------------------------------------------------------- hero -- */

const HERO_BG = [
  'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
  'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
  'linear-gradient(90deg, #0b1f3a 0%, #0b1f3a 100%)',
].join(', ')

function Hero({ page }: { page: LocalPage }) {
  const h = page.hero
  return (
    <section className="px-[20px] pb-[48px] pt-[40px] lg:px-0 lg:pb-[84px] lg:pt-[64px]" style={{ backgroundImage: HERO_BG }}>
      <div className="mx-auto flex w-full flex-col gap-[24px] lg:w-[1282px] lg:gap-[28px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-[6px] font-roboto text-[13px] font-bold leading-[19px] text-white/80">
            <li><Link href={href('/')} className="hover:text-white hover:underline">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{h.crumb}</li>
          </ol>
        </nav>
        <div className="flex w-full flex-col gap-[20px] lg:w-[1120px]">
          <h1 className="font-sans text-[30px] font-semibold leading-[1.2] text-white lg:text-[60px]">{h.h1}</h1>
          <div className="flex flex-col gap-[12px] font-roboto text-[16px] leading-[1.4] text-white/[0.88] lg:text-[18px]">
            {h.body.map((t) => <p key={t}><Rich text={t} light /></p>)}
          </div>
          <div className="mt-[4px] flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:gap-[16px]">
            <HeroBtn link={h.primary} filled />
            <HeroBtn link={h.secondary} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Summary({ body }: { body: string[] }) {
  return (
    <section className="bg-white px-[20px] pt-[44px] lg:px-0 lg:pb-[8px] lg:pt-[72px]">
      <div className="mx-auto flex w-full flex-col gap-[14px] rounded-[20px] border border-[#d6e6de] bg-[#f4f9f6] px-[20px] py-[24px] font-sans text-[16px] leading-[1.7] text-[#2d3a33] lg:w-[1282px] lg:rounded-[24px] lg:px-[96px] lg:py-[48px] lg:text-center lg:text-[19px]">
        {body.map((t) => <p key={t}><Rich text={t} /></p>)}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- bands -- */

function Band({ band }: { band: LocalBand }) {
  const first = band.blocks[0]
  // A split draws its own heading in the left column.
  const split = band.blocks.length === 1 && first && 'kind' in first && first.kind === 'split'
  const bg = band.dark ? 'bg-gradient-to-r from-[#0b1f3a] to-[#0f4a3a]' : band.mint ? 'bg-[#f4f9f6]' : band.grey ? 'bg-[#fcfcfc]' : 'bg-white'
  return (
    <section data-figma={band.figma} className={`px-[20px] py-[44px] lg:px-0 ${band.dark ? 'lg:py-[90px]' : 'lg:py-[70px]'} ${bg}`}>
      <div className="mx-auto flex w-full flex-col items-center gap-[24px] lg:w-[1282px] lg:gap-[40px]">
        {band.heading && !split && (
          <h2 className={`text-center font-sans text-[22px] font-semibold leading-[1.3] lg:text-[32px] ${band.dark ? 'text-white' : 'text-[#132119]'}`}>{band.heading}</h2>
        )}
        <div className="flex w-full flex-col gap-[20px] lg:gap-[28px]">
          {band.blocks.map((b, i) => <Block key={i} block={b as DocBlock | { kind: 'text'; body: string[] } | { kind: 'h3'; text: string }} dark={!!band.dark} />)}
        </div>
      </div>
    </section>
  )
}

const ICON_BOX = 'grid shrink-0 place-items-center bg-[#eaf4f5] text-brand'
const TITLE = 'font-sans font-medium leading-[1.3] text-[#132119]'
const GREY = 'font-roboto text-[15px] leading-[1.58] text-[#7e7e7e]'
const BODY = 'font-roboto text-[15px] leading-[1.65] text-[#474747] lg:text-[16px]'
const SHADOW = 'shadow-[0_6px_24px_0_rgba(18,33,26,0.06)]'

function Block({ block: b, dark }: { block: DocBlock | { kind: 'text'; body: string[] } | { kind: 'h3'; text: string }; dark: boolean }) {
  switch (b.kind) {
    case 'text':
      return (
        <div className={`flex w-full flex-col gap-[14px] text-center ${dark ? 'font-roboto text-[15px] leading-[1.65] text-white/80 lg:text-[16px]' : BODY}`}>
          {b.body.map((t) => <p key={t}><Rich text={t} light={dark} /></p>)}
        </div>
      )
    case 'h3':
      return <h3 className={`text-center font-sans text-[18px] font-semibold leading-[1.3] lg:text-[22px] ${dark ? 'text-white' : 'text-[#132119]'}`}>{b.text}</h3>
    case 'center':
      return <Center block={b} />
    case 'options':
      return (
        <div className="flex w-full flex-col gap-[20px] lg:gap-[32px]">
          {b.heading && <h3 className="text-center font-sans text-[18px] font-semibold leading-[1.3] text-[#132119] lg:text-[22px]">{b.heading}</h3>}
          <ul className={`flex w-full flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white lg:flex-row ${SHADOW}`}>
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-[16px] border-b border-[#e6e6e6] px-[18px] py-[20px] last:border-b-0 lg:min-w-px lg:flex-1 lg:flex-col lg:items-center lg:gap-[14px] lg:border-b-0 lg:border-r lg:px-[28px] lg:py-[36px] lg:text-center lg:last:border-r-0">
                <span className={`${ICON_BOX} size-[48px] rounded-[14px] lg:size-[56px]`}><LineIcon name={it.icon} /></span>
                <div className="flex min-w-px flex-1 flex-col gap-[4px] lg:gap-[14px]">
                  {it.title && <p className={`${TITLE} text-[17px] lg:text-[19px]`}><Rich text={it.title} /></p>}
                  {it.body && <p className={GREY}><Rich text={it.body} /></p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'grid':
      return (
        <ul className="flex w-full flex-col gap-[12px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[24px]">
          {b.items.map((it, i) => (
            <li key={i} className={`flex gap-[16px] rounded-[16px] bg-white px-[18px] py-[20px] lg:w-[calc((100%-48px)/3)] lg:flex-col lg:items-center lg:px-[30px] lg:py-[32px] lg:text-center ${SHADOW}`}>
              <span className={`${ICON_BOX} size-[48px] rounded-[14px] lg:size-[60px]`}><LineIcon name={it.icon} /></span>
              <div className={`flex min-w-px flex-1 flex-col gap-[4px] lg:gap-[16px] ${it.body ? '' : 'justify-center'}`}>
                {it.title && <p className={`${TITLE} text-[17px] lg:text-[19px]`}><Rich text={it.title} /></p>}
                {it.body && <p className={GREY}><Rich text={it.body} /></p>}
              </div>
            </li>
          ))}
        </ul>
      )
    case 'note':
      return (
        <div className="flex w-full flex-col gap-[10px] rounded-[12px] border border-[#d6e6de] bg-white px-[20px] py-[16px] font-roboto text-[15px] leading-[1.65] text-[#132119] lg:px-[24px] lg:py-[18px] lg:text-[16px]">
          {b.body.map((t) => <p key={t}><Rich text={t} /></p>)}
        </div>
      )
    case 'split':
      return <Split block={b} />
    case 'timeline':
      return <Timeline steps={b.steps} />
    case 'option':
      return <Option block={b} />
    case 'places':
      return (
        <ul className="flex w-full flex-wrap justify-center gap-[10px] lg:gap-[12px]">
          {b.links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="btn-pop flex items-center gap-[8px] rounded-full border border-[#e6e6e6] bg-white px-[14px] py-[8px] font-sans text-[14px] font-medium leading-[22px] text-[#132119] hover:border-brand hover:text-brand lg:px-[18px] lg:py-[10px] lg:text-[15px]">
                <span className={`${ICON_BOX} size-[24px] rounded-full`}><LineIcon name="pin" className="size-[13px]" /></span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )
    case 'list':
      return (
        <ul className="grid w-full grid-cols-1 rounded-[20px] border border-[#e6e6e6] bg-white px-[20px] lg:grid-cols-2 lg:gap-x-[56px] lg:px-[40px] lg:py-[8px]">
          {b.items.map((it, i) => (
            <li key={i} className={`flex gap-[18px] border-[#e6e6e6] py-[20px] lg:py-[28px] ${i < b.items.length - 1 ? 'border-b' : ''} ${i === b.items.length - 2 && b.items.length % 2 === 0 ? 'lg:border-b-0' : ''}`}>
              <span className={`${ICON_BOX} size-[44px] rounded-[12px] lg:size-[48px]`}><LineIcon name={it.icon} className="size-[20px]" /></span>
              <div className="flex min-w-px flex-1 flex-col gap-[4px]">
                {it.title && <p className={`${TITLE} text-[17px] lg:text-[18px]`}>{it.title}</p>}
                {it.body && <p className={it.title ? GREY : `${TITLE} text-[16px] font-normal lg:text-[17px]`}><Rich text={it.body} /></p>}
              </div>
            </li>
          ))}
        </ul>
      )
    case 'checks':
      return <Checks items={b.items} panel />
    case 'callout':
      return (
        <div className="flex w-full flex-col gap-[14px] rounded-[12px] border-l-4 border-brand bg-[#f4f9f6] px-[20px] py-[24px] font-roboto text-[16px] leading-[1.65] text-[#132119] lg:px-[36px] lg:py-[32px] lg:text-[17px]">
          {b.body.map((t) => <p key={t}><Rich text={t} /></p>)}
        </div>
      )
    case 'topics':
      return (
        <div className={`grid w-full grid-cols-1 gap-[16px] lg:gap-[24px] ${b.items.length === 3 ? 'lg:grid-cols-3' : b.items.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {b.items.map((it) => (
            <div key={it.title} className={`flex flex-col gap-[12px] rounded-[12px] border-l-4 px-[20px] py-[24px] lg:px-[32px] lg:py-[28px] ${dark ? 'border-[#5fd0c0] bg-white/[0.05]' : `border-brand bg-white ${SHADOW}`}`}>
              <h3 className={`font-sans text-[18px] font-semibold leading-[1.3] lg:text-[20px] ${dark ? 'text-white' : 'text-[#132119]'}`}>{it.title}</h3>
              {it.body.map((t) => <p key={t} className={dark ? 'font-roboto text-[15px] leading-[1.65] text-white/75 lg:text-[16px]' : BODY}><Rich text={t} light={dark} /></p>)}
            </div>
          ))}
        </div>
      )
    case 'why':
      return <Why items={b.items} />
    default:
      return null
  }
}

/* ------------------------------------------------------------------ center -- */

const ROW_ICON: [RegExp, string][] = [
  [/address|location|where/i, 'pin'], [/phone|call|cell|toll/i, 'phone'], [/hour|open|time/i, 'clock'],
  [/email|mail/i, 'mail'], [/arriv|getting|finding|landmark|direction|park|dock/i, 'box'], [/pickup/i, 'truck'],
]
const rowIcon = (label: string) => ROW_ICON.find(([re]) => re.test(label))?.[1] ?? 'info'

function Center({ block: b }: { block: Extract<DocBlock, { kind: 'center' }> }) {
  const top = b.rows.slice(0, 3)
  const rest = b.rows.slice(3)
  const Row = ({ r }: { r: { label: string; value: string } }) => (
    <div className="flex min-w-px flex-1 gap-[14px] py-[12px] lg:py-[20px]">
      <span className={`${ICON_BOX} size-[44px] rounded-full`}><LineIcon name={rowIcon(r.label)} /></span>
      <div className="flex min-w-px flex-1 flex-col gap-[2px] [word-break:break-word]">
        <p className="font-sans text-[12.5px] font-bold leading-[1.3] text-brand">{r.label}</p>
        <p className="font-roboto text-[15px] leading-[25px] text-[#132119] lg:text-[16px]"><Rich text={r.value} soft /></p>
      </div>
    </div>
  )
  return (
    <div className="flex w-full flex-col gap-[8px] rounded-[16px] border border-[#e6e6e6] bg-white px-[20px] py-[24px] lg:rounded-[28px] lg:px-[36px] lg:py-[34px]">
      {b.eyebrow && <p className="font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.04em] text-brand">{b.eyebrow}</p>}
      {b.title && <p className="font-sans text-[19px] font-semibold leading-[1.25] text-[#132119] lg:text-[26px]"><Rich text={b.title} soft /></p>}
      <div className="flex w-full flex-col gap-[4px] lg:flex-row lg:gap-[24px]">
        {top.map((r) => <Row key={r.label} r={r} />)}
        {top.length < 3 && <div aria-hidden="true" className="hidden lg:block lg:flex-[var(--rest)]" style={{ '--rest': 3 - top.length } as React.CSSProperties} />}
      </div>
      {rest.map((r) => (
        <div key={r.label} className="border-t border-[#e6e6e6] lg:pt-[4px]"><Row r={r} /></div>
      ))}
      {b.note?.length ? (
        <div className="flex flex-col gap-[10px] border-t border-[#e6e6e6] pt-[16px] font-roboto text-[15px] leading-[1.65] text-[#474747] lg:pt-[20px] lg:text-[16px]">
          {b.note.map((t) => <p key={t}><Rich text={t} /></p>)}
        </div>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------- split -- */

const ALERT = /swollen|leak|crack|broken|damaged|never|do not|don't/i

function Checks({ items, panel = false, dark = false }: { items: string[]; panel?: boolean; dark?: boolean }) {
  return (
    <ul className={panel ? 'flex w-full flex-col rounded-[20px] border border-[#d6e6de] bg-[#f4f9f6] px-[20px] py-[8px] lg:px-[36px] lg:py-[20px]' : 'flex w-full flex-col'}>
      {items.map((t, i) => {
        const alert = panel && i === items.length - 1 && items.length > 2 && ALERT.test(t)
        return (
          <li key={t} className={`flex items-start gap-[14px] py-[16px] ${i < items.length - 1 ? `border-b ${dark ? 'border-white/10' : 'border-[#d6e6de]'}` : ''}`}>
            <span className={`grid size-[32px] shrink-0 place-items-center rounded-full ${alert ? 'bg-[#fdecd3] text-[#b45309]' : 'bg-brand text-white'}`}>
              <LineIcon name={alert ? 'alert' : 'check'} className="size-[14px]" strokeWidth={alert ? 2 : 2.4} />
            </span>
            <p className={`min-w-px flex-1 pt-[3px] font-roboto text-[15px] leading-[1.65] lg:text-[16px] ${dark ? 'text-white/80' : 'text-[#474747]'}`}><Rich text={t} light={dark} /></p>
          </li>
        )
      })}
    </ul>
  )
}

function Split({ block: b }: { block: Extract<DocBlock, { kind: 'split' }> }) {
  const [intro, ...more] = b.body ?? []
  return (
    <div className="flex w-full flex-col gap-[28px] lg:flex-row lg:items-center lg:gap-[64px]">
      <div className="flex w-full flex-col gap-[16px] lg:w-[540px] lg:shrink-0 lg:gap-[18px]">
        <span aria-hidden="true" className="h-[4px] w-[56px] rounded-[2px] bg-brand" />
        <h2 className="font-sans text-[22px] font-semibold leading-[1.3] text-[#132119] lg:text-[32px]">{b.heading}</h2>
        {intro && <p className="font-roboto text-[16px] leading-[1.65] text-[#474747] lg:text-[18px]"><Rich text={intro} /></p>}
        {more.map((t) => <p key={t} className={BODY}><Rich text={t} /></p>)}
      </div>
      <div className="w-full lg:min-w-px lg:flex-1">
        {b.checks?.length ? <Checks items={b.checks} panel /> : (
          <div className="flex flex-col gap-[14px] rounded-[20px] border border-[#d6e6de] bg-[#f4f9f6] px-[20px] py-[24px] font-roboto text-[15px] leading-[1.7] text-[#2d3a33] lg:p-[36px] lg:text-[16px]">
            {(b.panel ?? []).map((t) => <p key={t}><Rich text={t} /></p>)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- timeline -- */

function Timeline({ steps }: { steps: { title?: string; body: string }[] }) {
  const n = steps.length
  return (
    <ol className="relative flex w-full flex-col gap-[12px] lg:flex-row lg:gap-[24px]"
      style={{ '--half': `calc((100% - ${24 * (n - 1)}px) / ${n} / 2)` } as React.CSSProperties}>
      <span aria-hidden="true" className="absolute bottom-[28px] left-[27px] top-[28px] w-[2px] bg-[#bfdbd1] lg:bottom-auto lg:left-[var(--half)] lg:right-[var(--half)] lg:top-[27px] lg:h-[2px] lg:w-auto lg:bg-[#d6e6de]" />
      {steps.map((s, i) => (
        <li key={i} className="relative flex gap-[18px] lg:min-w-px lg:flex-1 lg:flex-col lg:items-center lg:gap-[12px] lg:px-[12px] lg:pb-[32px] lg:text-center">
          <span className="grid size-[56px] shrink-0 place-items-center rounded-full border-[8px] border-white bg-brand font-sans text-[17px] font-semibold leading-none text-white shadow-[0_6px_14px_0_rgba(5,130,140,0.25)] lg:text-[20px]">{i + 1}</span>
          <div className="flex min-w-px flex-1 flex-col gap-[6px] pt-[6px] lg:gap-[12px] lg:pt-[6px]">
            {s.title && <p className={`${TITLE} text-[16px] lg:text-[18px]`}>{s.title}</p>}
            <p className={GREY}><Rich text={s.body} /></p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ------------------------------------------------------------------ option -- */

function Option({ block: b }: { block: Extract<DocBlock, { kind: 'option' }> }) {
  const d = !!b.dark
  const text = d ? 'font-roboto text-[15px] leading-[1.65] text-white/[0.82] lg:text-[16px]' : BODY
  return (
    <div className={d
      ? 'flex w-full flex-col gap-[16px] rounded-[20px] bg-gradient-to-r from-[#0b1f3a] to-[#0f4a3a] p-[24px] lg:p-[48px]'
      : `flex w-full flex-col gap-[16px] rounded-[12px] border-l-4 border-brand bg-white px-[20px] py-[24px] lg:px-[40px] lg:py-[32px] ${SHADOW}`}>
      <div className="flex items-center gap-[14px]">
        <span className={`grid size-[44px] shrink-0 place-items-center rounded-[12px] ${d ? 'bg-white/[0.12] text-white' : 'bg-[#eaf4f5] text-brand'}`}><LineIcon name={b.icon} /></span>
        <h3 className={`font-sans text-[19px] font-semibold leading-[1.3] lg:text-[22px] ${d ? 'text-white' : 'text-[#132119]'}`}>{b.title}</h3>
      </div>
      {b.body.map((t) => <p key={t} className={text}><Rich text={t} light={d} /></p>)}
      {b.list?.length ? (
        <>
          {b.listIntro && <p className={`font-sans text-[16px] font-medium leading-[1.65] lg:text-[17px] ${d ? 'text-white' : 'text-[#132119]'}`}><Rich text={b.listIntro} light={d} /></p>}
          <ul className={`grid w-full grid-cols-1 gap-[14px] lg:grid-cols-2 lg:gap-x-[32px] lg:gap-y-[16px] ${d ? 'rounded-[14px] border border-white/[0.14] bg-white/[0.06] p-[18px] lg:p-[24px]' : 'rounded-[14px] border border-[#d6e6de] bg-[#f4f9f6] p-[18px] lg:p-[24px]'}`}>
            {b.list.map((t) => (
              <li key={t} className="flex items-start gap-[14px]">
                <span className="mt-[1px] grid size-[26px] shrink-0 place-items-center rounded-full bg-brand text-white"><LineIcon name="check" className="size-[14px]" strokeWidth={2.4} /></span>
                <p className={`min-w-px flex-1 font-roboto text-[15px] leading-[1.65] lg:text-[16px] ${d ? 'text-white/[0.82]' : 'text-[#474747]'}`}><Rich text={t} light={d} /></p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {b.after?.map((t) => <p key={t} className={text}><Rich text={t} light={d} /></p>)}
      {b.buttons && (
        <div className="mt-[4px] flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:gap-[16px]">
          <OptBtn link={b.buttons.primary} cls={d ? 'bg-white text-brand' : 'bg-brand text-white'} />
          <OptBtn link={b.buttons.secondary} cls={d ? 'border border-white text-white' : 'border border-brand text-brand'} />
        </div>
      )}
    </div>
  )
}

function OptBtn({ link, cls }: { link: L; cls: string }) {
  return (
    <Link href={link.href} className={`btn-pop flex items-center justify-center rounded-[8px] px-[28px] py-[14.5px] font-sans text-[15px] font-medium leading-[normal] ${cls}`}>
      {link.label}
    </Link>
  )
}

/* --------------------------------------------------------------------- why -- */

function Why({ items }: { items: LineIconItem[] }) {
  const n = items.length
  const long = items.reduce((s, it) => s + (it.body?.length ?? 0), 0) / Math.max(n, 1) > 170
  const cols = long ? 2 : n <= 3 ? n : n === 4 || n === 7 || n === 8 ? 4 : 3
  return (
    <ul className="flex w-full flex-col gap-[12px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[24px]"
      style={{ '--why-w': `calc((100% - ${24 * (cols - 1)}px) / ${cols})` } as React.CSSProperties}>
      {items.map((it, i) => (
        <li key={i} className={`flex gap-[16px] rounded-[16px] border border-white/[0.12] bg-white/[0.05] px-[18px] py-[20px] lg:w-[var(--why-w)] lg:flex-col lg:items-center lg:gap-[16px] lg:px-[24px] lg:py-[32px] ${long ? 'lg:text-left' : 'lg:text-center'}`}>
          <span className="grid size-[44px] shrink-0 place-items-center rounded-full border border-[rgba(95,208,192,0.5)] bg-[rgba(47,179,160,0.18)] text-[#7fe0d0] lg:size-[48px]"><LineIcon name={it.icon} /></span>
          <div className={`flex min-w-px flex-1 flex-col gap-[4px] lg:w-full lg:gap-[12px] ${it.body && it.title ? '' : 'justify-center'}`}>
            {it.title && <p className="font-sans text-[16px] font-medium leading-[1.3] text-white lg:text-[18px]"><Rich text={it.title} light /></p>}
            {it.body && <p className={it.title ? 'font-roboto text-[15px] leading-[1.58] text-white/70' : 'font-roboto text-[15px] leading-[1.58] text-white/90 lg:text-[16px]'}><Rich text={it.body} light /></p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
