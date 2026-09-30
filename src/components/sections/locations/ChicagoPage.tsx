import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Accordion } from '@/components/client/Accordion'
import { Btn } from '@/components/ui/Bits'
import { FOOTER_H } from '@/lib/layout'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import { SEO, URL } from '@/data/chicago'
import { content } from '@/lib/page-content'

/**
 * "Electronics Recycling in Chicago, Illinois" — Figma 6873:14196 (board, 1920) and
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
export async function ChicagoPage() {
  /* Copy from Admin -> Pages ('chicago'); each section below reads its own
     part the same way (one read per request). SEO and URL stay static. */
  const { HERO, FAQS } = await content('chicago')
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
        <Residents />
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
async function Hero() {
  const { HERO } = await content('chicago')
  return (
    <section data-figma="6873:14198" className="relative h-[276px] overflow-hidden bg-navy lg:h-[470px]">
      {/* 28 Sep 2026: the new electronics photo has no grey veil, and on the
          phone its layer (6896:15673) sits at -204,-67 inside the navy
          container, so the navy wash is under it there, not over it. */}
      <div className="absolute left-[-204px] top-[-67px] h-[411px] w-[730px] lg:left-1/2 lg:top-[-372px] lg:h-[1081px] lg:w-[1920px] lg:-translate-x-1/2" aria-hidden="true">
        <Image src={HERO.image} alt="" fill priority sizes="(width < 64rem) 730px, 1920px" className="object-cover" />
      </div>
      {/* Washes — 6873:14202 / 14203 on the board; on the phone the same two
          sit in a 1127 wide box that starts off to the left (6896:15334/15337). */}
      <span aria-hidden="true" className="absolute inset-0 max-lg:hidden"
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />
      <span aria-hidden="true" className="absolute inset-y-0 left-[-62px] w-[1127px] lg:left-0 lg:w-full"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* Text — 6873:14204: a 700 wide block centred on the band at x319,
          crumbs on top and the H1 38 below them. */}
      {/* The board's block (crumbs, H1, button) is 192 tall and centred on
          the band (top 139), so no offset is needed now the button is in. */}
      <div className="relative flex h-full flex-col items-center justify-center px-[20px] lg:mx-auto lg:w-[1282px] lg:items-start lg:px-0">
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
        {/* 60 on the board since the 27 Sep revision (was 70 at 936 wide),
            on one line like the city pages; 28/1.2 on the phone (6896:15338). */}
        <h1 className="w-full max-w-[350px] text-center font-sans text-[28px] font-semibold leading-[1.2] text-white lg:w-auto lg:max-w-none lg:whitespace-nowrap lg:text-left lg:text-[60px] lg:leading-[84.7px] lg:tracking-[-2.03px]">
          {HERO.h1}
        </h1>
        {/* Board 6927:10446 — 21 under the H1's line, the site's button.
            Phone 6955:11443 — 25 under the H1, 36 tall, 14px, no arrow, its
            own label. The frame draws its text teal on the teal fill; white. */}
        <div className="mt-[25px] flex max-w-[350px] justify-center lg:mt-[21px] lg:max-w-none">
          <Link href={HERO.button.href}
            className="btn-pop inline-flex h-[36px] items-center justify-center rounded-[8px] bg-brand px-[18px] font-roboto text-[14px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white backdrop-blur-[4px] lg:hidden">
            {HERO.button.label}
          </Link>
          <Btn href={HERO.button.href} variant="colored" className="backdrop-blur-[4px] max-lg:hidden">{HERO.button.label}</Btn>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- notice -- */

/** Service Area Notice — 6879:2744 / 6897:2768. Three paragraphs with a
 *  blank line between them (the gap is one line: 13.5 / 14.5 x 1.55), text
 *  1100 wide on the board, justified on the phone. */
async function Notice() {
  const { NOTICE } = await content('chicago')
  return (
    <section data-figma="6879:2744" className="bg-white px-[20px] pb-[20px] pt-[32px] lg:px-0 lg:pt-[44px]">
      <div role="note" className="mx-auto w-full rounded-[12px] bg-[#fef3c7] p-[18px] lg:w-[1282px] lg:px-[28px] lg:py-[22px]">
        <div className="flex w-full max-w-[303px] flex-col gap-[20.925px] text-justify font-roboto text-[13.5px] leading-[1.55] text-[#59470d] lg:w-[1100px] lg:max-w-none lg:gap-[22.475px] lg:text-left lg:text-[14.5px]">
          {NOTICE.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- intro -- */

/** Intro — 6879:2745 / 6897:2769: copy column 700 + 80 + the 502 aside.
 *  The phone justifies everything and drops the pill. The aside's three
 *  paragraphs sit a blank line apart (13.5 / 14.5 x line height); on the
 *  board the frame also ends the text on a blank line, hence the deeper
 *  bottom padding (32 + 21.75). */
async function Intro() {
  const { INTRO } = await content('chicago')
  return (
    <section data-figma="6879:2745" className="bg-white px-[20px] py-[40px] lg:px-0 lg:pb-[90px] lg:pt-[60px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[80px]">
        <div className="flex w-full flex-col gap-[20px] text-justify lg:w-[700px] lg:shrink-0 lg:items-start lg:gap-[18px] lg:text-left">
          <span className="max-lg:hidden"><Pill>{INTRO.eyebrow}</Pill></span>
          <h2 className="text-left font-sans text-[24px] font-semibold leading-[1.28] text-heading lg:text-[34px] lg:leading-[1.22]">{INTRO.heading}</h2>
          {INTRO.body.map((p) => (
            <p key={p} className="font-roboto text-[14.5px] leading-[1.6] text-muted lg:text-[16px] lg:leading-[1.65]">{p}</p>
          ))}
        </div>
        <aside className="flex w-full flex-col gap-[16px] rounded-[12px] bg-brand-soft p-[24px] text-justify lg:w-[502px] lg:shrink-0 lg:gap-[20px] lg:px-[32px] lg:pb-[53.75px] lg:pt-[32px] lg:text-left">
          <h3 className="self-center text-center font-sans text-[17px] font-medium leading-normal text-heading max-lg:w-[232px] lg:self-start lg:text-[19px]">{INTRO.aside.heading}</h3>
          <div className="flex flex-col gap-[20.925px] lg:w-[400px] lg:gap-[21.75px]">
            {INTRO.aside.body.map((p) => (
              <p key={p} className="font-roboto text-[13.5px] leading-[1.55] text-[#333] lg:font-poppins lg:text-[14.5px] lg:leading-[1.5]">{p}</p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- service info -- */

/** Location and Service Information — 6879:2746 / 6897:2770. Label beside
 *  value on the board (label 200 wide, so "Residents and small quantities"
 *  takes two lines inside the 40 row, as drawn), label over value on the
 *  phone. Six rows since 27 Sep. */
async function ServiceInfo() {
  const { PHONES, SERVICE_INFO } = await content('chicago')
  const rows = [
    { label: SERVICE_INFO.labels.location, value: SERVICE_INFO.location },
    {
      label: SERVICE_INFO.labels.phone,
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
    { label: SERVICE_INFO.labels.area, value: SERVICE_INFO.area },
    { label: SERVICE_INFO.labels.businesses, value: SERVICE_INFO.businesses },
    { label: SERVICE_INFO.labels.residents, value: SERVICE_INFO.residents },
    { label: SERVICE_INFO.labels.facility, value: SERVICE_INFO.facility },
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

/** What We Accept — 6879:2747 / 6897:2771. Board: eight 302 cards, three to
 *  a row and the last two centred (3 + 3 + 2, 20 apart, each row as tall as
 *  its tallest card), then the note, 942 wide and centred. Phone: one row
 *  per item, the tile on the left. */
async function Accept() {
  const { ACCEPT } = await content('chicago')
  return (
    <section data-figma="6879:2747" className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[946px] lg:gap-[44px]">
        <div className="flex w-full flex-col items-center gap-[20px] text-center lg:w-[780px] lg:gap-[10px]">
          <Pill>{ACCEPT.eyebrow}</Pill>
          <H2>{ACCEPT.heading}</H2>
          <p className="font-roboto text-[13.5px] leading-normal text-muted lg:text-[16px]">{ACCEPT.lead}</p>
        </div>

        <div className="flex w-full flex-col items-center gap-[20px]">
          <ul className="flex w-full flex-col gap-[20px] lg:flex-row lg:flex-wrap lg:justify-center">
            {ACCEPT.items.map((it) => (
              <li key={it.title}
                className="flex gap-[14px] rounded-[12px] bg-brand-soft px-[20px] py-[18px] lg:w-[302px] lg:flex-col lg:gap-[12px] lg:px-[22px] lg:py-[26px]">
                <IconTile src={it.icon} />
                <span className="flex min-w-px flex-col gap-[4px] lg:gap-[12px]">
                  <span className="font-sans text-[14.5px] font-medium leading-normal text-heading lg:text-[16px]">{it.title}</span>
                  <span className="font-roboto text-[12.5px] leading-[1.45] text-muted lg:text-[13.5px] lg:leading-[1.5]">{it.text}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* 6883:5504 — centred text on the board (60 tall), left on the phone. */}
          <p className="w-full rounded-[10px] border border-[#e6e6e6] bg-white px-[18px] py-[16px] font-roboto text-[12.5px] leading-[1.5] text-muted lg:min-h-[60px] lg:w-[942px] lg:px-[20px] lg:text-center lg:text-[13.5px] lg:leading-normal">
            {ACCEPT.note}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ businesses -- */

/** For Chicago Businesses — 6879:2748 / 6897:2772: one card, 780 on the
 *  board since 27 Sep (title, "This includes:" and the list 545 wide, the
 *  paragraphs the full 706), the intro and "This includes:" as two lines,
 *  seven points with the dot centred on each. */
async function Businesses() {
  const { BUSINESSES } = await content('chicago')
  return (
    <section data-figma="6879:2748" className="bg-[#fcfcfc] px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[24px] lg:gap-[44px]">
        <H2>{BUSINESSES.heading}</H2>
        <div className="flex w-full flex-col gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[26px] lg:w-[780px] lg:gap-[16px] lg:p-[36px]">
          <p className="font-roboto text-[10.5px] font-bold uppercase leading-normal tracking-[0.6px] text-brand lg:text-[11px]">{BUSINESSES.eyebrow}</p>
          <h3 className="font-sans text-[17px] font-medium leading-[1.3] text-heading lg:w-[545px] lg:text-[22px] lg:leading-normal">{BUSINESSES.title}</h3>
          <p className="font-roboto text-[13.5px] leading-[1.55] text-muted lg:text-[14.5px] lg:leading-[1.6]">{BUSINESSES.intro}</p>
          <p className="font-roboto text-[13.5px] leading-[1.55] text-muted lg:w-[545px] lg:text-[14.5px] lg:leading-[1.6]">{BUSINESSES.includes}</p>
          <ul className="flex flex-col gap-[10px] lg:w-[545px]">
            {BUSINESSES.points.map((p) => (
              <li key={p} className="flex items-center gap-[10px]">
                <span aria-hidden="true" className="size-[6px] shrink-0 rounded-full bg-brand" />
                <span className="min-w-px flex-1 font-roboto text-[13.5px] leading-[1.5] text-muted lg:w-[500px] lg:flex-none lg:text-[14.5px] lg:leading-[1.55]">{p}</span>
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

/* ------------------------------------------------------------- residents -- */

/** Electronics Recycling for Chicago Residents — 6925:6405 / 6925:6409, new
 *  27 Sep 2026. A centred heading over one paragraph with an underlined
 *  link to the mail-in kits (new tab). */
async function Residents() {
  const { RESIDENTS } = await content('chicago')
  const b = RESIDENTS.body
  return (
    <section data-figma="6925:6405" className="bg-[#fcfcfc] px-[20px] py-[60px] lg:px-0">
      <div className="mx-auto flex w-full flex-col items-center gap-[16px] text-center">
        <h2 className="w-full max-w-[324px] font-sans text-[22px] font-semibold leading-normal text-black lg:w-[1000px] lg:max-w-none lg:text-[28px] lg:text-heading">{RESIDENTS.heading}</h2>
        <p className="w-full font-roboto text-[13.5px] leading-[1.55] text-muted lg:w-[1152px] lg:text-[16px] lg:leading-[1.65]">
          {b.before}
          <a href={b.href} target="_blank" rel="noopener" className="underline hover:text-brand">{b.linkText}</a>
          {b.after}
        </p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- steps -- */

/** How Electronics Recycling Works — 6879:2749 / 6897:2773. Board: five
 *  280 cards, an 18px arrow between each pair, everything 20 apart (1632 in
 *  all), the cards as tall as the tallest. Phone: stacked rows, the number
 *  disc on the left, no arrows. */
async function Steps() {
  const { STEPS } = await content('chicago')
  return (
    <section data-figma="6879:2749" className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:gap-[44px]">
        <H2>{STEPS.heading}</H2>
        <ol className="flex w-full flex-col gap-[20px] lg:w-[1632px] lg:flex-row lg:items-stretch">
          {STEPS.items.map((s, i) => (
            <li key={s.title} className="flex lg:items-center lg:gap-[20px]">
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

/** Why Recycle Technologies — 6879:2750 / 6897:2774. Board: six cards, two
 *  627 to a row, three rows 44 apart, each card as tall as its own text
 *  (the rows align to the top), a title over a line of text; then the
 *  white "Local Chicago Recycling Information" box, the scales glyph beside
 *  a 24px heading and two lines. Phone: one column, 20 apart, on #fcfcfc;
 *  the box drops the glyph. */
async function Why() {
  const { WHY } = await content('chicago')
  return (
    <section data-figma="6879:2750" className="bg-[#fcfcfc] px-[20px] py-[40px] lg:bg-white lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:gap-[44px]">
        <h2 className="w-full text-center font-sans text-[20px] font-semibold leading-[1.3] text-black lg:text-[34px] lg:leading-normal">{WHY.heading}</h2>
        <ul className="grid w-full grid-cols-1 gap-[20px] lg:w-[1278px] lg:grid-cols-2 lg:items-start lg:gap-x-[24px] lg:gap-y-[44px]">
          {WHY.items.map((w) => (
            <li key={w.title}
              className="flex items-center gap-[16px] rounded-[12px] bg-brand-soft px-[20px] py-[18px] lg:gap-[18px] lg:px-[24px] lg:py-[22px]">
              <IconTile src={w.icon} phoneSrc={w.phoneIcon} round />
              <span className="flex min-w-px flex-col gap-[6px] max-lg:w-[250px] lg:flex-1 lg:gap-[8px]">
                <span className="font-sans text-[15px] font-medium leading-normal text-heading lg:text-[16px]">{w.title}</span>
                <span className="font-roboto text-[12.5px] leading-[1.5] text-muted lg:text-[13px]">{w.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center gap-[16px] rounded-[12px] border border-[#e6e6e6] bg-white px-[20px] py-[18px] lg:w-[1282px] lg:px-[28px] lg:py-[22px]">
          <Image src={WHY.law.icon} alt="" width={22} height={22} unoptimized className="size-[22px] shrink-0 max-lg:hidden" />
          <div className="flex min-w-px flex-1 flex-col gap-[10px] lg:gap-[16px]">
            <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-black lg:text-[24px] lg:leading-normal">{WHY.law.heading}</h3>
            <div className="font-roboto text-[12.5px] leading-[1.55] text-muted lg:text-[14.5px]">
              {WHY.law.text.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- faq -- */

/** FAQ — 6879:2751 / 6897:2775: the site's ringed FAQ rows (6107:512) at 900. */
async function Faq() {
  const { FAQS, FAQ_HEAD } = await content('chicago')
  return (
    <section data-figma="6879:2751" className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[90px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[900px] lg:gap-[40px]">
        <div className="flex w-full flex-col items-center gap-[20px] lg:w-[780px] lg:gap-[10px]">
          <Pill>{FAQ_HEAD.eyebrow}</Pill>
          <H2>{FAQ_HEAD.heading}</H2>
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
async function Related() {
  const { RELATED } = await content('chicago')
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

/** Get Started — 6879:2752 / 6896:15629: the navy to green band. Revised
 *  27 Sep 2026: the heading wraps at 580 (two lines on the board), two
 *  paragraphs at 686, a white "Schedule …" button (a shorter label on the
 *  phone) and a bordered "Call: …" button, both with the arrow; on the phone
 *  the two are 350 x 46, stacked 10 apart. */
async function Cta() {
  const { CTA } = await content('chicago')
  return (
    <section data-figma="6879:2752" className="px-[20px] py-[56px] lg:px-0 lg:py-[90px]"
      style={{ backgroundImage: 'linear-gradient(157.74deg, #0b1f3a 7.25%, #1b7a3d 79.71%)' }}>
      <div className="mx-auto flex w-full flex-col items-center gap-[18px] text-center lg:w-[686px] lg:gap-[20px]">
        <h2 className="w-full font-sans text-[26px] font-semibold leading-[1.25] text-white lg:w-[580px] lg:text-[36px] lg:leading-[1.22]">{CTA.heading}</h2>
        {CTA.body.map((p) => (
          <p key={p} className="w-full font-roboto text-[14.5px] leading-[1.55] text-white/80 lg:text-[16px] lg:leading-[1.6]">{p}</p>
        ))}
        <div className="flex w-full flex-col gap-[10px] pt-[6px] lg:w-auto lg:flex-row lg:gap-[16px] lg:pt-[10px]">
          <Btn href={CTA.primary.href} variant="coloredWhite" className="justify-center backdrop-blur-[4px] max-lg:h-[46px] max-lg:w-full max-lg:px-[16px]">
            <span className="lg:hidden">{CTA.primary.label}</span>
            <span className="max-lg:hidden">{CTA.primary.label}</span>
          </Btn>
          {/* A plain anchor, as on the city pages: Btn is for page links. */}
          <a href={CTA.phone.tel}
            className="btn-pop inline-flex h-[46px] items-center justify-center gap-[8.008px] rounded-[8px] border border-white px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white backdrop-blur-[4px] max-lg:w-full lg:h-[48.05px]">
            <span className="whitespace-nowrap">{CTA.phone.label}</span>
            <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
          </a>
        </div>
        <p className="w-full font-roboto text-[13.5px] leading-normal text-white/70">{CTA.note}</p>
      </div>
    </section>
  )
}
