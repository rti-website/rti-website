import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Accordion } from '@/components/client/Accordion'
import { Btn } from '@/components/ui/Bits'
import { FOOTER_H } from '@/lib/layout'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import {
  ACCEPT, BUSINESSES, CTA, FAQS, HERO, INTRO, NOTICE, PHONES, RELATED, SEO, SERVICE_INFO, STEPS, URL, WHY,
} from '@/data/chicago'

/**
 * "Recycling in Chicago, Illinois" — Figma 6873:14196 (board, 1920) and
 * 6896:15317 (phone, 390). Built 25 Sep 2026. Copy lives in src/data/chicago.ts.
 *
 * FLOW, LIKE THE LOCATION SERVICE PAGES. Every section is an auto-layout
 * column in the frame, so the page is laid out in normal flow on FlowCanvas
 * (the 1920 board, scaled) rather than pinned to measured y offsets: a copy
 * change cannot open a gap or an overlap. The header, hero and footer keep
 * their fixed heights in boxes of their own, as in ServiceLocation.
 *
 * Every number below is the frame's. Where the phone frame differs from the
 * board it is written mobile first with the board's value at `lg:`. The
 * phone frame gives several cards a fixed height that clips their text
 * (What We Accept, How It Works); those cards grow with their text here.
 */
export function ChicagoPage() {
  const schema = graph(
    breadcrumbNode(HERO.crumbs.map((c) => ({ name: c.label, url: c.href ?? URL }))),
    serviceNode({ name: 'Electronics Recycling in Chicago', url: URL, description: SEO.description, areaServed: ['Chicago, IL'] }),
    faqNode(FAQS),
  )
  return (
    <FlowCanvas>
      <Header />
      <main>
        <Hero />
        <Notice />
        <Intro />
        <ServiceInfo />
        <Accept />
        <Businesses />
        <Steps />
        <Why />
        <Faq />
        <Related />
        <Cta />
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

/* ------------------------------------------------------------ shared bits -- */

/** The frame's pill eyebrow: h34 px20 11/0.7 on the board, h30 px16 10.5/0.6 on the phone. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-[30px] items-center justify-center rounded-full bg-accent-soft px-[16px] font-roboto text-[10.5px] font-bold uppercase leading-none tracking-[0.6px] text-accent lg:h-[34px] lg:px-[20px] lg:text-[11px] lg:tracking-[0.7px]">
      {children}
    </span>
  )
}

/** Section heading: 22 on the phone (1.28), 34 on the board. */
function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`w-full text-center font-sans text-[22px] font-semibold leading-[1.28] text-black lg:w-[780px] lg:text-[34px] lg:leading-normal ${className}`}>
      {children}
    </h2>
  )
}

/** A 44 (board) / 40 (phone) teal tile holding a 20 / 18 white glyph. */
function IconTile({ src, round = false, phoneSrc }: { src: string; round?: boolean; phoneSrc?: string }) {
  return (
    <span className={`grid size-[40px] shrink-0 place-items-center bg-brand lg:size-[44px] ${round ? 'rounded-full' : 'rounded-[10px] lg:rounded-[12px]'}`}>
      {phoneSrc ? (
        <>
          <Image src={phoneSrc} alt="" width={18} height={18} unoptimized className="size-[18px] lg:hidden" />
          <Image src={src} alt="" width={20} height={20} unoptimized className="size-[20px] max-lg:hidden" />
        </>
      ) : (
        <Image src={src} alt="" width={20} height={20} unoptimized className="size-[18px] lg:size-[20px]" />
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ hero -- */

/**
 * Hero — 6873:14198 (470) / 6896:15331 (276). The photo is drawn 1920x1081
 * at y-372 on the board and 730x411 centred on the phone, under a 20% grey
 * veil; a navy wash rises from the bottom and a green one comes in from the
 * left. The breadcrumb is board only; the phone centres the H1.
 */
function Hero() {
  return (
    <section data-figma="6873:14198" className="relative h-[276px] overflow-hidden bg-navy lg:h-[470px]">
      <div className="absolute left-1/2 top-1/2 h-[411px] w-[730px] -translate-x-1/2 -translate-y-1/2 lg:top-[-372px] lg:h-[1081px] lg:w-[1920px] lg:translate-y-0" aria-hidden="true">
        <Image src={HERO.image} alt="" fill priority sizes="(width < 64rem) 730px, 1920px" className="object-cover" />
        <span className="absolute inset-0 bg-[rgba(98,98,98,0.2)]" />
      </div>
      {/* Washes — 6873:14202 / 14203 on the board; on the phone the same two
          sit in a 1127 wide box that starts off to the left (6896:15334/15337). */}
      <span aria-hidden="true" className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />
      <span aria-hidden="true" className="absolute inset-y-0 left-[-62px] w-[1127px] lg:left-0 lg:w-full"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* Text — 6873:14204: a 700 wide block centred on the band at x319,
          crumbs on top and the H1 38 below them. */}
      {/* Bottom padding puts the text where the frames do: the board's block
          is 192 tall and centred (top 139) though its text is 123, and the
          phone's two line H1 sits at y75 of 276 rather than centred. */}
      <div className="relative flex h-full flex-col items-center justify-center px-[20px] pb-[48px] lg:mx-auto lg:w-[1282px] lg:items-start lg:px-0 lg:pb-[69px]">
        <nav aria-label="Breadcrumb" className="max-lg:hidden lg:mb-[21px] lg:pl-[3px]">
          <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
            {HERO.crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-[13px]">
                {i > 0 && <span aria-hidden="true" className={i === 1 ? 'text-white/50' : 'text-white'}>/</span>}
                {/* The frame sets "Locations / Recycling in Chicago, Illinois"
                    as one white run after a grey Home; Locations is a link. */}
                {c.href
                  ? <Link href={c.href} className={i === 0 ? 'text-white/50 hover:text-white' : 'text-white hover:underline'}>{c.label}</Link>
                  : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="w-full max-w-[350px] text-center font-sans text-[32px] font-semibold leading-[1.2] text-white lg:w-[936px] lg:max-w-none lg:text-left lg:text-[70px] lg:leading-[84.7px] lg:tracking-[-2.03px]">
          {HERO.h1}
        </h1>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- notice -- */

/** Service Area Notice — 6879:2744 / 6897:2768. */
function Notice() {
  return (
    <section data-figma="6879:2744" className="bg-white px-[20px] pb-[20px] pt-[32px] lg:px-0 lg:pt-[44px]">
      <div role="note" className="mx-auto flex w-full flex-col gap-[10px] rounded-[12px] bg-[#fef3c7] p-[18px] text-center font-roboto text-[13.5px] leading-[1.55] text-[#59470d] lg:w-[1282px] lg:px-[28px] lg:py-[22px] lg:text-left lg:text-[14.5px]">
        {/* The board wraps the first paragraph at 1100 and the second at 1167.
            At 1100 the site's Roboto runs the first to a third line of one
            word, so it takes the box's full width and keeps the frame's two. */}
        <p>{NOTICE[0]}</p>
        <p className="lg:w-[1167px]">{NOTICE[1]}</p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- intro -- */

/** Intro — 6879:2745 / 6897:2769: copy column 700 + 80 + the 502 aside. */
function Intro() {
  return (
    <section data-figma="6879:2745" className="bg-white px-[20px] py-[40px] lg:px-0 lg:pb-[90px] lg:pt-[60px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[80px]">
        <div className="flex w-full flex-col items-center gap-[20px] text-center lg:w-[700px] lg:shrink-0 lg:items-start lg:gap-[18px] lg:text-left">
          <Pill>{INTRO.eyebrow}</Pill>
          <h2 className="font-sans text-[24px] font-semibold leading-[1.28] text-heading lg:text-[34px] lg:leading-[1.22]">{INTRO.heading}</h2>
          {INTRO.body.map((p) => (
            <p key={p} className="font-roboto text-[14.5px] leading-[1.6] text-muted lg:text-[16px] lg:leading-[1.65]">{p}</p>
          ))}
        </div>
        <aside className="flex w-full flex-col gap-[16px] rounded-[12px] bg-brand-soft p-[24px] text-center lg:w-[502px] lg:shrink-0 lg:gap-[20px] lg:p-[32px] lg:text-left">
          <h3 className="font-sans text-[17px] font-medium leading-normal text-heading lg:text-[19px]">{INTRO.aside.heading}</h3>
          {INTRO.aside.body.map((p) => (
            <p key={p} className="font-roboto text-[13.5px] leading-[1.55] text-[#333] lg:w-[400px] lg:font-poppins lg:text-[14.5px] lg:leading-[1.5]">{p}</p>
          ))}
        </aside>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- service info -- */

/** Location and Service Information — 6879:2746 / 6897:2770. Label beside
 *  value on the board (label 200 wide), label over value on the phone. */
function ServiceInfo() {
  const rows = [
    { label: 'Location', value: SERVICE_INFO.location },
    {
      label: 'Phone',
      value: (
        <>
          {PHONES.map((p, i) => (
            <span key={p.tel}>
              {i > 0 && <span aria-hidden="true">{'  |  '}</span>}
              <a href={p.tel} className="hover:text-brand">{p.label}</a>
            </span>
          ))}
        </>
      ),
    },
    { label: 'Service Area', value: SERVICE_INFO.area },
  ]
  return (
    <section data-figma="6879:2746" className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[30px]">
        <h2 className="w-full text-center font-sans text-[20px] font-semibold leading-[1.28] text-heading lg:text-[28px] lg:leading-normal">{SERVICE_INFO.heading}</h2>
        <dl className="flex w-full flex-col gap-[16px] rounded-[14px] border border-[#e6e6e6] bg-white p-[24px] lg:w-[900px] lg:gap-[14px] lg:rounded-[16px] lg:px-[40px] lg:py-[32px]">
          {rows.map((r, i) => (
            <div key={r.label}
              className={`flex flex-col gap-[3px] lg:h-[40px] lg:flex-row lg:items-center lg:gap-[20px] lg:py-[12px] ${i < rows.length - 1 ? 'border-b border-[#ededed] pb-[14px] lg:pb-[12px]' : ''}`}>
              <dt className="font-sans text-[13px] font-medium leading-normal text-heading lg:w-[200px] lg:shrink-0 lg:text-[14.5px]">{r.label}</dt>
              <dd className="whitespace-pre-wrap font-roboto text-[13.5px] leading-normal text-muted lg:min-w-px lg:flex-1 lg:text-[14.5px]">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- accept -- */

/** What We Accept — 6879:2747 / 6897:2771. Board: 3 x 302 cards to a row,
 *  then the batteries banner and the note at 942. Phone: one row per item,
 *  the tile on the left, batteries a seventh card. */
function Accept() {
  const all = [...ACCEPT.items, ACCEPT.batteries]
  return (
    <section data-figma="6879:2747" className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[946px] lg:gap-[44px]">
        <div className="flex w-full flex-col items-center gap-[20px] text-center lg:w-[780px] lg:gap-[10px]">
          <Pill>{ACCEPT.eyebrow}</Pill>
          <H2>{ACCEPT.heading}</H2>
          <p className="font-roboto text-[13.5px] leading-normal text-muted lg:text-[16px]">{ACCEPT.lead}</p>
        </div>

        <div className="flex w-full flex-col items-start gap-[20px]">
          <ul className="grid w-full grid-cols-1 gap-[20px] lg:grid-cols-[repeat(3,302px)]">
            {all.map((it, i) => (
              <li key={it.title}
                className={`flex gap-[14px] rounded-[12px] bg-brand-soft px-[20px] py-[18px] lg:flex-col lg:gap-[12px] lg:px-[22px] lg:py-[26px] ${i === all.length - 1 ? 'lg:hidden' : ''}`}>
                <IconTile src={it.icon} />
                <span className="flex min-w-px flex-col gap-[4px] lg:gap-[12px]">
                  <span className="font-sans text-[14.5px] font-medium leading-normal text-heading lg:text-[16px]">{it.title}</span>
                  <span className="font-roboto text-[12.5px] leading-[1.45] text-muted lg:text-[13.5px] lg:leading-[1.5]">{it.text}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Batteries Banner — 6880:2794, board only (the phone draws it as
              the seventh card above). */}
          <div className="flex h-[90px] w-[942px] items-center gap-[18px] rounded-[12px] bg-brand-soft px-[26px] max-lg:hidden">
            <IconTile src={ACCEPT.batteries.icon} />
            <span className="flex flex-col gap-[3px]">
              <span className="font-sans text-[16px] font-medium leading-normal text-heading">{ACCEPT.batteries.title}</span>
              <span className="font-roboto text-[13.5px] leading-normal text-muted">{ACCEPT.batteries.text}</span>
            </span>
          </div>

          <p className="w-full rounded-[10px] border border-[#e6e6e6] bg-white px-[18px] py-[16px] font-roboto text-[12.5px] leading-[1.5] text-muted lg:w-[942px] lg:px-[20px] lg:text-[13.5px] lg:leading-normal">
            {ACCEPT.note}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ businesses -- */

/** For Chicago Businesses — 6879:2748 / 6897:2772: one 617 card. */
function Businesses() {
  return (
    <section data-figma="6879:2748" className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[24px] lg:gap-[44px]">
        <H2>{BUSINESSES.heading}</H2>
        <div className="flex w-full flex-col gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[26px] lg:w-[617px] lg:gap-[16px] lg:p-[36px]">
          <p className="font-roboto text-[10.5px] font-bold uppercase leading-normal tracking-[0.6px] text-brand lg:text-[11px]">{BUSINESSES.eyebrow}</p>
          <h3 className="font-sans text-[17px] font-medium leading-[1.3] text-heading lg:text-[22px] lg:leading-normal">{BUSINESSES.title}</h3>
          <p className="font-roboto text-[13.5px] leading-[1.55] text-muted lg:text-[14.5px] lg:leading-[1.6]">{BUSINESSES.intro}</p>
          <ul className="flex flex-col gap-[10px]">
            {BUSINESSES.points.map((p) => (
              <li key={p} className="flex items-start gap-[10px]">
                <span aria-hidden="true" className="size-[6px] shrink-0 rounded-full bg-brand" />
                <span className="font-roboto text-[13.5px] leading-[1.5] text-muted lg:w-[500px] lg:text-[14.5px] lg:leading-[1.55]">{p}</span>
              </li>
            ))}
          </ul>
          <p className="font-roboto text-[13.5px] leading-[1.55] text-muted lg:text-[14.5px] lg:leading-[1.6]">{BUSINESSES.outro[0]}</p>
          <p className="font-roboto text-[13.5px] leading-[1.55] text-muted lg:text-[14.5px] lg:leading-normal">{BUSINESSES.outro[1]}</p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- steps -- */

/** How Electronics Recycling Works — 6879:2749 / 6897:2773. Board: four
 *  280 cards, an 18px arrow 16 after each of the first three, 20 between
 *  groups (1282 in all). Phone: stacked rows, the number disc on the left. */
function Steps() {
  return (
    <section data-figma="6879:2749" className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[44px]">
        <H2>{STEPS.heading}</H2>
        <ol className="flex w-full flex-col gap-[20px] lg:w-[1282px] lg:flex-row lg:items-stretch">
          {STEPS.items.map((s, i) => (
            <li key={s.title} className="flex lg:items-center lg:gap-[16px]">
              <div className="flex w-full gap-[16px] rounded-[12px] border border-[#e6e6e6] bg-white p-[20px] lg:h-full lg:w-[280px] lg:flex-col lg:gap-[12px] lg:px-[24px] lg:py-[26px]">
                <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[14px] font-medium text-white">{i + 1}</span>
                <span className="flex min-w-px flex-col gap-[6px] lg:gap-[12px]">
                  <span className="font-sans text-[15px] font-medium leading-normal text-heading lg:text-[16px]">{s.title}</span>
                  <span className="font-roboto text-[12.5px] leading-[1.5] text-muted lg:text-[13px]">{s.text}</span>
                </span>
              </div>
              {i < STEPS.items.length - 1 && (
                <Image src="/images/locations/chicago/step-arrow.svg" alt="" width={18} height={18} unoptimized className="size-[18px] shrink-0 max-lg:hidden" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- why -- */

/** Why Recycle Technologies — 6879:2750 / 6897:2774. Board: pairs of 627
 *  cards (90 tall), the fifth full width, every row 44 apart, then the
 *  Illinois note. Phone: one column, 20 apart, on #fcfcfc. */
function Why() {
  return (
    <section data-figma="6879:2750" className="bg-[#fcfcfc] px-[20px] py-[40px] lg:bg-white lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:gap-[44px]">
        <h2 className="w-full text-center font-sans text-[20px] font-semibold leading-[1.3] text-black lg:text-[34px] lg:leading-normal">{WHY.heading}</h2>
        <ul className="grid w-full grid-cols-1 gap-[20px] lg:w-[1278px] lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-[44px]">
          {WHY.items.map((w, i) => (
            <li key={w.text}
              className={`flex items-center gap-[16px] rounded-[12px] bg-brand-soft px-[20px] py-[18px] lg:h-[90px] lg:gap-[18px] lg:px-[24px] lg:py-[22px] ${i === WHY.items.length - 1 ? 'lg:col-span-2' : ''}`}>
              <IconTile src={w.icon} phoneSrc={w.phoneIcon} round />
              <p className={`min-w-px font-roboto text-[13px] leading-[1.5] text-heading lg:font-sans lg:text-[15px] lg:font-medium lg:leading-[1.35] ${i === WHY.items.length - 1 ? 'lg:w-[774px]' : 'lg:flex-1'}`}>{w.text}</p>
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center gap-[16px] rounded-[12px] border border-[#e6e6e6] bg-white px-[20px] py-[18px] lg:w-[1282px] lg:px-[28px] lg:py-[22px]">
          <Image src={WHY.law.icon} alt="" width={22} height={22} unoptimized className="size-[22px] shrink-0 max-lg:hidden" />
          <p className="min-w-px flex-1 font-roboto text-[12.5px] leading-[1.55] text-muted lg:text-[14.5px]">{WHY.law.text}</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- faq -- */

/** FAQ — 6879:2751 / 6897:2775: the site's ringed FAQ rows (6107:512) at 900. */
function Faq() {
  return (
    <section data-figma="6879:2751" className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[900px] lg:gap-[40px]">
        <div className="flex w-full flex-col items-center gap-[20px] lg:w-[780px] lg:gap-[10px]">
          <Pill>FAQs</Pill>
          <H2>Frequently Asked Questions</H2>
        </div>
        <Accordion items={FAQS} gap={15} variant="ring" idPrefix="faq-chicago" />
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- related -- */

/** Related Recycling Services — 6883:5521 / 6897:2776: pill links, 44 tall
 *  on the board (four, then two), 40 and centred two to a row on the phone
 *  (12.5px, px12, 8 apart, so two fit in the 350 column). */
function Related() {
  return (
    <section data-figma="6883:5521" className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[30px]">
        <h2 className="text-center font-sans text-[20px] font-semibold leading-normal text-heading lg:text-[28px]">{RELATED.heading}</h2>
        <ul className="flex w-full flex-wrap justify-center gap-[8px] lg:w-[807px] lg:justify-start lg:gap-[14px]">
          {RELATED.links.map((l) => (
            <li key={l.label}>
              <Link href={l.href}
                className="btn-pop flex h-[40px] items-center gap-[5px] rounded-full border border-[#e6e6e6] bg-white px-[12px] font-sans text-[12.5px] font-medium text-brand hover:border-brand lg:h-[44px] lg:gap-[8px] lg:px-[20px] lg:text-[14px]">
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

/** Get Started — 6879:2752 / 6896:15629: the navy to green band; heading and
 *  body one line each on the board; the two buttons go full width and stack
 *  on the phone. */
function Cta() {
  return (
    <section data-figma="6879:2752" className="px-[20px] pb-[56px] pt-[56px] lg:px-0 lg:py-[90px]"
      style={{ backgroundImage: 'linear-gradient(157.74deg, #0b1f3a 7.25%, #1b7a3d 79.71%)' }}>
      {/* Heading and body each on ONE line on the board — Asim, 25 Sep 2026
          ("adjust both in one line"). The frame wraps both at 686. */}
      <div className="mx-auto flex w-full flex-col items-center gap-[18px] text-center lg:w-auto lg:gap-[20px]">
        <h2 className="font-sans text-[27px] font-semibold leading-[1.22] text-white lg:whitespace-nowrap lg:text-[36px]">{CTA.heading}</h2>
        <p className="font-roboto text-[14.5px] leading-[1.5] text-white/80 lg:whitespace-nowrap lg:text-[16px] lg:leading-[1.6]">{CTA.body}</p>
        <div className="flex w-full flex-col gap-[18px] lg:w-auto lg:flex-row lg:gap-[16px] lg:pt-[10px]">
          <Btn href={CTA.primary.href} variant="coloredWhite" className="justify-center max-lg:w-full">{CTA.primary.label}</Btn>
          <Btn href={CTA.secondary.href} variant="white" className="justify-center border border-white max-lg:w-full lg:w-[200px]">{CTA.secondary.label}</Btn>
        </div>
        <a href={CTA.phone.tel} className="font-roboto text-[14px] leading-normal text-white/85 hover:text-white">{CTA.phone.label}</a>
        <p className="font-roboto text-[13.5px] leading-normal text-white/70">{CTA.note}</p>
      </div>
    </section>
  )
}
