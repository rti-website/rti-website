import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { CertificationsBand } from '@/components/sections/services/CertificationsBand'
import { Faq } from '@/components/sections/locations/LocalServicePage'
import { CaseStudyRail, type RailStory } from '@/components/client/CaseStudyRail'
import { IndustryCard } from '@/components/ui/IndustryCard'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { FOOTER_H } from '@/lib/layout'
import { caseStudyHref, href, path } from '@/lib/urls'
import { content } from '@/lib/page-content'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import type { IndustryKey, LandingCard, LandingPage, Link as L } from '@/data/local-pages/types'

/**
 * The Google Ads landing pages, redesign of 27 Oct 2026 — Figma
 * BVtf2AOuUOcYbiMIlcKmbC, page "New Pages", one board and one phone frame
 * per page (ids in each data file). Copy in src/data/landing-pages/; the
 * shape is LandingPage in src/data/local-pages/types.ts.
 *
 * FLOW, on FlowCanvas like the location pages: each frame section is an
 * auto-layout column, px319 on the 1920 board (a 1282 column) and px20 on the
 * phone. Numbers are the board's at `lg:` and the phone frame's below it.
 *
 *   hero        photo under a teal-to-navy ramp; py84, text and a 560 x 420
 *               photo 70 apart; H1 46/1.12, body 18/1.6; Get a Quote (white)
 *               and Schedule a Pickup (outline). 28 Oct 2026: the photo took
 *               the place of the Request a Quote card, and Get a Quote opens
 *               the "Who is this for?" picker (QuotePicker) like every other
 *               Get a Quote on the site. (Phone py36 px20, centred, H1 30,
 *               body 15, the buttons stacked, a navy 86% wash, the photo
 *               350 x 230 under.)
 *   highlights  #f4f9f6, py30, four columns split by #d7e4dc rules, a 28px
 *               teal tick and 17px semibold (phone 2 x 2, 14px)
 *   about       py70, heading 32 and 16px text beside a 560 x 420 photo
 *               (phone py40, centred, 21 / 14, the photo 350 x 230 under)
 *   cards       white, 1px #e6e6e6, r12, px30 py32, gap16; title 19 medium,
 *               text 15 #7e7e7e; 629 wide two a row (411 three a row for the
 *               steps), an odd last row centred; rows 24 apart (phone 14).
 *               The options cards are one row, equal widths (28 Oct 2026).
 *   why         py84, heading 34/1.25, four #eaf4f5 cards with a 40px tick
 *   industries  #f8faf9, the shared Industries We Serve band and cards
 *   areas       the home page's map with its pins, lines and three cards
 *   cta         navy to green, py80, heading 34, buttons, the email line
 *
 * The certifications band is the shared section, as on the service pages;
 * the FAQ is the location pages' Faq. Case Studies is this page's own
 * (7444:9120, 28 Oct 2026): see LandingCaseStudies below.
 */
const CERT_H = 360

export function LandingServicePage({ page }: { page: LandingPage }) {
  const schema = graph(
    breadcrumbNode([{ name: 'Home', url: href('/') }, { name: page.hero.crumb, url: page.url }]),
    serviceNode({ name: page.schema.service, url: page.url, description: page.seo.description, areaServed: page.schema.areaServed }),
    ...(page.faq ? [faqNode(page.faq.items)] : []),
  )
  return (
    <FlowCanvas>
      <Header />
      <main>
        <Hero page={page} />
        <Highlights items={page.highlights} />
        <About about={page.about} />

        <Band heading={page.options.heading}>
          <OneRow cards={page.options.cards} />
          {page.options.buttons.length > 0 && (
            <div className="flex w-full flex-col gap-[16px] lg:w-auto lg:flex-row lg:justify-center">
              {page.options.buttons.map((b, i) => <Btn key={b.label} link={b} filled={i === 0} />)}
            </div>
          )}
        </Band>

        <Why why={page.why} />

        <Band heading={page.items.heading} mint>
          <CardRows cards={page.items.cards} />
          {page.items.note && <p className="text-center font-sans text-[14px] leading-[1.5] text-[#474747] lg:text-[16px]">{page.items.note}</p>}
        </Band>

        <Band heading={page.steps.heading}>
          {page.steps.intro && <p className="text-center font-sans text-[14px] leading-[1.4] text-[#474747] lg:text-[16px]">{page.steps.intro}</p>}
          <CardRows cards={page.steps.cards} numbered />
        </Band>

        <Industries industries={page.industries} />
        <Areas lead={page.areas.lead} />

        <div className="relative lg:h-[var(--cert-h)]" style={{ '--cert-h': `${CERT_H}px` } as React.CSSProperties}>
          <CertificationsBand top={0} height={CERT_H} label="landing-certifications" body={page.certBody} />
        </div>
        <LandingCaseStudies />

        {page.faq && <Faq faq={page.faq} id={page.url} />}
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

const HERO_RAMP = 'linear-gradient(90deg, rgba(14,69,56,0.96) 0%, rgba(11,31,58,0.9) 55%, rgba(11,31,58,0.6) 100%)'

function Hero({ page }: { page: LandingPage }) {
  const h = page.hero
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1f3a] px-[20px] py-[36px] lg:px-0 lg:py-[84px]">
      <Image src={h.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(11,31,58,0.86)] lg:bg-transparent lg:[background-image:var(--ramp)]" style={{ '--ramp': HERO_RAMP } as React.CSSProperties} />
      <div className="mx-auto flex w-full flex-col items-center gap-[28px] lg:w-[1282px] lg:flex-row lg:gap-[70px]">
        <div className="flex w-full flex-col items-center gap-[14px] text-center lg:min-w-px lg:flex-1 lg:items-start lg:gap-[20px] lg:text-left">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-x-[8px] font-sans text-[13px] font-bold leading-[1.5] text-white/85">
              <li><Link href={href('/')} className="hover:text-white hover:underline">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{h.crumb}</li>
            </ol>
          </nav>
          <h1 className="font-sans text-[30px] font-semibold leading-[1.12] text-white lg:text-[46px]">{h.h1}</h1>
          <p className="font-sans text-[15px] leading-[1.6] text-white/[0.92] lg:text-[18px]">{h.body}</p>
          {/* Phone: stacked, the white button as wide as the outline one. */}
          <div className="flex flex-col items-stretch gap-[20px] lg:flex-row lg:items-center">
            <Link href={h.button.href} className="btn-pop flex items-center justify-center gap-[10px] rounded-[8px] bg-white px-[26px] py-[14px] font-sans text-[15px] font-semibold leading-[normal] text-brand">
              {h.button.label}
              <Image src="/images/landing/arrow-right-teal.svg" alt="" width={16} height={16} className="size-[16px]" />
            </Link>
            <Link href={h.secondary.href} className="btn-pop flex items-center justify-center gap-[10px] rounded-[8px] border border-white px-[28px] py-[14.5px] font-sans text-[15px] font-medium leading-[normal] text-white">
              {h.secondary.label}
              <Image src="/images/landing/arrow-white-13.svg" alt="" width={15} height={12} className="h-[11.75px] w-[14.75px]" />
            </Link>
          </div>
        </div>
        <div className="relative h-[230px] w-full max-w-[350px] shrink-0 overflow-hidden rounded-[12px] bg-[#eaf4f5] lg:h-[420px] lg:w-[560px] lg:max-w-none">
          <Image src={h.photo} alt="" fill priority sizes="(min-width: 1024px) 560px, 350px" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- highlights -- */

function Highlights({ items }: { items: string[] }) {
  return (
    <section aria-label="Highlights" className="bg-[#f4f9f6] px-[20px] py-[24px] lg:px-0 lg:py-[30px]">
      <ul className="mx-auto grid w-full grid-cols-2 gap-[12px] lg:flex lg:w-[1282px] lg:gap-0">
        {items.map((t) => (
          <li key={t} className="flex flex-col items-center justify-center gap-[8px] p-[6px] text-center lg:flex-1 lg:flex-row lg:gap-[12px] lg:border-r lg:border-[#d7e4dc] lg:px-[16px] lg:last:border-r-0">
            <span className="grid size-[28px] shrink-0 place-items-center rounded-full bg-brand">
              <Image src="/images/landing/check-white.svg" alt="" width={15} height={15} className="size-[15px]" />
            </span>
            <span className="font-sans text-[14px] font-semibold leading-[normal] text-[#132119] lg:whitespace-nowrap lg:text-[17px]">{t}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------- about -- */

function About({ about }: { about: LandingPage['about'] }) {
  return (
    <section className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:flex-row lg:gap-[64px]">
        <div className="flex w-full flex-col items-center gap-[14px] text-center lg:min-w-px lg:flex-1 lg:items-start lg:gap-[18px] lg:text-left">
          <h2 className="font-sans text-[21px] font-semibold leading-[normal] text-[#132119] lg:text-[32px]">{about.heading}</h2>
          {about.body.map((t) => <p key={t} className="font-sans text-[14px] leading-[normal] text-[#474747] lg:text-[16px]">{t}</p>)}
        </div>
        <div className="relative h-[230px] w-full max-w-[350px] shrink-0 overflow-hidden rounded-[12px] bg-[#eaf4f5] lg:h-[420px] lg:w-[560px] lg:max-w-none">
          <Image src={about.image} alt="" fill sizes="(min-width: 1024px) 560px, 350px" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- bands -- */

/** A centred band: py70 gap40 under a 32px heading (phone py40 gap20, 21px). */
function Band({ heading, mint = false, children }: { heading: string; mint?: boolean; children: React.ReactNode }) {
  return (
    <section className={`px-[20px] py-[40px] lg:px-0 lg:py-[70px] ${mint ? 'bg-[#f4f9f6]' : 'bg-white'}`}>
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:gap-[40px]">
        <h2 className="text-center font-sans text-[21px] font-semibold leading-[normal] text-[#132119] lg:text-[32px]">{heading}</h2>
        <div className="flex w-full flex-col items-center gap-[20px] lg:gap-[28px]">{children}</div>
      </div>
    </section>
  )
}

/**
 * Cards in the frame's rows: two a row at 629 (three at 411.33 for the
 * numbered steps), every row centred so an odd last card sits in the middle.
 * One column on the phone.
 */
function CardRows({ cards, numbered = false }: { cards: LandingCard[]; numbered?: boolean }) {
  const per = numbered ? 3 : 2
  const rows: LandingCard[][] = []
  for (let i = 0; i < cards.length; i += per) rows.push(cards.slice(i, i + per))
  let n = 0
  return (
    <div className="flex w-full flex-col gap-[14px] lg:gap-[24px]">
      {rows.map((row, r) => (
        <div key={r} className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[24px]">
          {row.map((c) => {
            n += 1
            return (
              <div key={c.title} className={`flex w-full flex-col items-center gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[26px] text-center lg:gap-[16px] lg:px-[30px] lg:py-[32px] ${numbered ? 'lg:w-[411.333px]' : 'lg:w-[629px]'} lg:shrink-0`}>
                {numbered && (
                  <span aria-hidden="true" className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[20px] font-medium leading-none text-white">{n}</span>
                )}
                <h3 className="w-full font-sans text-[18px] font-medium leading-[normal] text-[#132119] lg:text-[19px]">
                  {numbered && <span className="sr-only">Step {n}: </span>}{c.title}
                </h3>
                <p className="w-full whitespace-pre-line font-sans text-[14px] leading-[normal] text-[#7e7e7e] lg:text-[15px]">{c.body}</p>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/** The options cards (28 Oct 2026): one row, equal widths, 24 apart; one
 *  column on the phone. */
function OneRow({ cards }: { cards: LandingCard[] }) {
  /* A lone card (Chicago universal waste, 7514:8937) is 629 wide, centred. */
  const one = cards.length === 1
  return (
    <div className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[24px]">
      {cards.map((c) => (
        <div key={c.title} className={`flex w-full flex-col items-center gap-[14px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[26px] text-center lg:gap-[16px] lg:px-[30px] lg:py-[32px] ${one ? 'lg:w-[629px] lg:shrink-0' : 'lg:min-w-px lg:flex-1'}`}>
          <h3 className="w-full font-sans text-[18px] font-medium leading-[normal] text-[#132119] lg:text-[19px]">{c.title}</h3>
          <p className="w-full whitespace-pre-line font-sans text-[14px] leading-[normal] text-[#7e7e7e] lg:text-[15px]">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

function Btn({ link, filled = false }: { link: L; filled?: boolean }) {
  const cls = `btn-pop flex w-full items-center justify-center gap-[10px] rounded-[8px] px-[26px] py-[14px] font-sans text-[15px] font-semibold leading-[1.3] lg:w-auto ${filled ? 'bg-brand text-white' : 'border border-brand text-brand'}`
  const inner = (
    <>
      {link.label}
      <Image src={filled ? '/images/landing/arrow-right-white.svg' : '/images/landing/arrow-right-teal.svg'} alt="" width={16} height={16} className="size-[16px]" />
    </>
  )
  return link.external
    ? <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={link.href} className={cls}>{inner}</Link>
}

/* --------------------------------------------------------------------- why -- */

function Why({ why }: { why: LandingPage['why'] }) {
  return (
    <section className="bg-white px-[20px] py-[44px] lg:px-0 lg:py-[84px]">
      <div className="mx-auto flex w-full flex-col gap-[22px] lg:w-[1282px] lg:gap-[34px]">
        <h2 className="text-center font-sans text-[24px] font-semibold leading-[1.25] text-[#132119] lg:text-[34px]">{why.heading}</h2>
        <ul className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-stretch lg:gap-[24px]">
          {why.cards.map((c) => (
            <li key={c.title} className="flex flex-col items-center gap-[12px] rounded-[12px] bg-[#eaf4f5] px-[22px] py-[24px] text-center lg:min-w-px lg:flex-1 lg:px-[26px] lg:py-[28px]">
              <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-brand">
                <Image src="/images/landing/check-white-20.svg" alt="" width={20} height={20} className="size-[20px]" />
              </span>
              <h3 className="font-sans text-[18px] font-medium leading-[1.25] text-[#132119]">{c.title}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-[#474747]">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- industries -- */

/**
 * The frames' industry cards, with the shared IndustryCard (hover reveal).
 * Each links to the closest page the site has; the hover line is that page's
 * own summary, as on the home page.
 */
const INDUSTRY: Record<IndustryKey, { img: string; href: string; b: string }> = {
  manufacturing: { img: '/images/landing/ind-manufacturing.png', href: href('/industries/manufacturing-industrial/'), b: 'Electronics recycling, battery disposal, and material recovery solutions for facilities managing equipment and production waste.' },
  healthcare: { img: '/images/landing/ind-healthcare.png', href: href('/industries/healthcare/'), b: 'Secure electronics recycling and data destruction for devices and materials containing sensitive information.' },
  automotive: { img: '/images/landing/ind-automotive.png', href: href('/industries/automotive-fleet/'), b: 'Airbag recycling, electronics disposal, and battery collection for auto shops, dealerships, and fleet operations.' },
  retail: { img: '/images/landing/ind-retail.png', href: href('/industries/retail-corporate-offices/'), b: 'Responsible electronics recycling and secure shredding to help stores and offices manage outdated equipment and sensitive materials.' },
  education: { img: '/images/landing/ind-education.png', href: href('/industries/education/'), b: 'Reliable electronics recycling, data destruction, and shredding services for schools, districts, and universities.' },
  government: { img: '/images/landing/ind-government.png', href: href('/industries/government-municipal/'), b: 'Electronics recycling, data destruction, and secure shredding for government offices and municipal departments.' },
  financial: { img: '/images/landing/ind-financial.png', href: href('/industries/financial-services-banking/'), b: 'Secure hard drive destruction and document shredding to protect sensitive financial and customer information.' },
  offices: { img: '/images/landing/ind-offices.png', href: href('/industries/retail-corporate-offices/'), b: 'Recycling for the batteries, lighting, and electronics that build up in offices and facilities, with a certificate of recycling.' },
  'it-operations': { img: '/images/landing/ind-it-operations.png', href: href('/it-asset-disposition/'), b: 'IT asset disposition, data destruction, and recycling for retired computers, servers, and network equipment.' },
  warehouses: { img: '/images/landing/ind-warehouses.png', href: href('/industries/manufacturing-industrial/'), b: 'Scheduled pickup for batteries, lighting, and equipment that accumulate in warehouses and distribution sites.' },
}

function Industries({ industries }: { industries: LandingPage['industries'] }) {
  return (
    <section className="bg-[#f8faf9] px-[20px] py-[48px] lg:px-0 lg:pb-[80px] lg:pt-[80px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:gap-0">
        <Eyebrow>Who we serve</Eyebrow>
        <Title className="text-center lg:mt-[19px]">Industries We Serve</Title>
        <Lead className="text-center lg:mt-[19px] lg:w-[857px]">{industries.lead}</Lead>
        <div className="grid w-full grid-cols-2 gap-[12px] lg:mt-[58px] lg:flex lg:flex-wrap lg:justify-center lg:gap-x-[14px] lg:gap-y-[12px]">
          {industries.cards.map((c) => {
            const ind = INDUSTRY[c.key]
            return <IndustryCard key={c.title} ind={{ t: c.title, img: ind.img, href: ind.href, b: ind.b }} reveal small={c.title.length > 16} twoLine={c.title.length > 30} />
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- areas -- */

/**
 * Areas We Serve — the home page's map (public/images/home/map.png, the same
 * 707 x 804 export), pins and facility cards, 1210 tall on the board with the
 * map at y361. Below lg it is taken apart as on the home page: the map as a
 * plain picture, the three cards as a list, no pins or connector lines.
 */
const AREA_CARDS = [
  { x: 370, y: 430.84, t: 'Minnesota', l1: 'Licensed recycling facilities', l2: 'Blaine, MN' },
  { x: 1246, y: 621.84, t: 'Wisconsin', l1: 'Licensed recycling facility', l2: 'New Berlin, WI' },
  { x: 499, y: 850.84, t: 'Chicago', l1: 'Expanded service coverage', l2: 'Business recycling & e-waste' },
]
const AREA_LINES = [
  { x: 509, y: 689, w: 305, h: 1 }, { x: 509, y: 563, w: 1, h: 126 },
  { x: 946, y: 696.84, w: 300, h: 1 },
  { x: 716, y: 763, w: 177, h: 1 }, { x: 716, y: 763, w: 1, h: 88 },
]
const AREA_PINS = [{ x: 897, y: 604 }, { x: 1006, y: 645 }, { x: 918, y: 684 }, { x: 890, y: 743.84 }]

function Areas({ lead }: { lead: string }) {
  const abs = (x: number, y: number, w?: number, h?: number) => ({ left: x, top: y, width: w, height: h })
  return (
    <section className="bg-white px-[20px] py-[48px] lg:p-0">
      <div className="relative mx-auto flex w-full flex-col items-center gap-[24px] lg:h-[1210px] lg:w-[1920px] lg:gap-0">
        <div className="lg:absolute lg:left-1/2 lg:top-[60px] lg:-translate-x-1/2"><Eyebrow>Where we serve</Eyebrow></div>
        <Title className="text-center lg:absolute lg:left-1/2 lg:top-[125px] lg:-translate-x-1/2 lg:whitespace-nowrap">Areas We Serve</Title>
        <Lead className="text-center lg:absolute lg:left-1/2 lg:top-[190px] lg:w-[819px] lg:-translate-x-1/2">{lead}</Lead>
        <div className="relative w-full overflow-hidden rounded-[16px] lg:absolute lg:left-1/2 lg:top-[361px] lg:h-[804px] lg:w-[707px] lg:-translate-x-1/2 lg:rounded-none">
          <Image src="/images/home/map.png" alt="Recycle Technologies service coverage across the United States" width={707} height={804} className="h-auto w-full lg:size-full" />
        </div>
        {/* The frame's connectors: 1px black dashes, 4 on and 4 off, at 60%. */}
        {AREA_LINES.map((l, i) => (
          <span key={i} aria-hidden="true" className="absolute hidden lg:block"
            style={{ ...abs(l.x, l.y, l.w, l.h), backgroundImage: `repeating-linear-gradient(${l.w > l.h ? 90 : 180}deg, rgba(0,0,0,0.6) 0 4px, transparent 4px 8px)` }} />
        ))}
        {AREA_PINS.map((p, i) => (
          <Image key={i} src="/images/icons/map-pin.svg" alt="" width={25} height={25} className="absolute hidden size-[25px] lg:block" style={abs(p.x, p.y)} />
        ))}
        <span aria-hidden="true" className="absolute hidden size-[25px] lg:block" style={abs(816, 676)}>
          <Image src="/images/icons/map-dot-outer.svg" alt="" width={25} height={25} className="size-full" />
          <Image src="/images/icons/map-dot-inner.svg" alt="" width={11} height={11} className="absolute left-[7px] top-[7px] size-[10.714px]" />
        </span>
        <ul className="flex w-full flex-col gap-[16px] lg:contents">
          {AREA_CARDS.map((c) => (
            <li key={c.t} className="flex items-center gap-[16px] rounded-[8px] bg-white p-[20px] shadow-[0px_4px_12px_0px_rgba(13,39,80,0.12)] lg:absolute lg:block lg:h-[125px] lg:w-[278px] lg:p-0 lg:shadow-[0px_0px_20px_0px_#ebebeb,0px_0px_20px_0px_rgba(13,39,80,0.1)] lg:[left:var(--x)] lg:[top:var(--y)]"
              style={{ '--x': `${c.x}px`, '--y': `${c.y}px` } as React.CSSProperties}>
              <Image src="/images/icons/pin-card.png" alt="" width={22} height={34} className="h-[34px] w-[22px] shrink-0 object-contain lg:absolute lg:left-[18px] lg:top-[24px]" />
              <div className="flex min-w-0 flex-1 flex-col gap-[6px] lg:contents">
                <p className="font-sans text-[17px] font-semibold leading-[1.25] text-brand lg:absolute lg:left-[55px] lg:top-[24px] lg:w-[160px] lg:text-[18px]">{c.t}</p>
                <p className="font-roboto text-[14px] leading-[20px] text-muted lg:absolute lg:left-[55px] lg:top-[58px] lg:w-[209px] lg:leading-[22px]">{c.l1}<br />{c.l2}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ case studies -- */

/**
 * Case Studies — Figma 7444:9120 (board, 1064 tall) and 7444:9199 (phone),
 * 28 Oct 2026. White, py84 gap44 (phone py44 gap24): the badge, the 40px
 * title, the lead and View All Case Studies, then the carousel
 * (CaseStudyRail) and its two arrows.
 *
 * The frame repeats one placeholder story three times; these are the three
 * real ones from src/data/case-studies.ts (title, link to its card on
 * /case-studies/, its PDF) with the home page's photos for them, in the
 * frame's order: the aerial (Midwest business) left, the server room
 * (hospital system) in the middle, the workshop (auto repair) right.
 */
const STORY_PHOTOS: { id: string; img: string }[] = [
  { id: 'midwest-business', img: '/images/home/case-midwest-business.png' },
  { id: 'hospital-system',  img: '/images/home/case-healthcare.png' },
  { id: 'auto-repair-shop', img: '/images/home/case-auto-repair.png' },
]

async function LandingCaseStudies() {
  const { CASE_STUDY_CARDS } = await content('case-studies')
  const stories: RailStory[] = STORY_PHOTOS.flatMap(({ id, img }) => {
    const c = CASE_STUDY_CARDS.find((x) => x.id === id)
    return c ? [{ id, img, title: c.title, href: caseStudyHref(id), pdf: c.pdf }] : []
  })
  return (
    <section className="flex flex-col items-center gap-[24px] overflow-hidden bg-white py-[44px] lg:gap-[44px] lg:py-[84px]">
      <div className="flex w-[350px] max-w-[calc(100%-40px)] flex-col items-center gap-[10px] text-center lg:w-[1282px] lg:max-w-none lg:gap-[14px]">
        <span className="rounded-full bg-[#e8f5ec] px-[20px] py-[9px] font-sans text-[11px] font-bold uppercase leading-none text-[#1b7a3d]">Clients Stories</span>
        <h2 className="font-sans text-[26px] font-semibold leading-[1.2] text-[#132119] lg:text-[40px]">Case Studies</h2>
        <p className="font-sans text-[14.5px] leading-[1.6] text-[#7e7e7e] lg:text-[17px]">Real results from real partnerships. See how organizations simplify ITAD, strengthen data security, and recover value from retired hardware.</p>
        <Link href={path('/case-studies/')} className="btn-pop flex min-w-[208px] items-center whitespace-nowrap justify-center gap-[10px] rounded-[8px] bg-brand px-[26px] py-[14px] font-sans text-[15px] font-semibold leading-[1.3] text-white">
          View All Case Studies
          <Image src="/images/landing/arrow-right-white.svg" alt="" width={16} height={16} className="size-[16px]" />
        </Link>
      </div>
      <CaseStudyRail stories={stories} start={1} />
    </section>
  )
}

/* --------------------------------------------------------------------- cta -- */

function Cta({ cta: c }: { cta: LandingPage['cta'] }) {
  const btn = (filled: boolean) => `btn-pop flex w-full items-center justify-center gap-[10px] rounded-[8px] px-[28px] py-[14.5px] font-sans text-[16px] font-medium leading-[normal] lg:w-auto lg:text-[15px] ${filled ? 'bg-white text-brand' : 'border border-white text-white'}`
  const arrow = (filled: boolean) => <Image src={filled ? '/images/icons/arrow-teal.svg' : '/images/icons/arrow-white.svg'} alt="" width={13} height={10} className="h-[10px] w-[13px]" />
  return (
    <section className="bg-gradient-to-r from-[#0b1f3a] to-[#1b7a3d] px-[20px] py-[56px] lg:px-0 lg:py-[80px]">
      <div className="mx-auto flex w-full flex-col items-center gap-[20px] text-center text-white lg:w-[1282px]">
        <h2 className="font-sans text-[23px] font-semibold leading-[normal] lg:text-[34px]">{c.heading}</h2>
        <div className="flex w-full flex-col items-center gap-[20px] lg:gap-[28px]">
          {c.body && <p className="font-sans text-[14.5px] leading-[normal] lg:w-[800px] lg:text-[17px]">{c.body}</p>}
          <div className="flex w-full flex-col items-center gap-[12px] lg:w-auto lg:flex-row lg:gap-[16px]">
            <Link href={c.primary.href} className={btn(true)}>{c.primary.label}{arrow(true)}</Link>
            {c.secondary && (c.secondary.href.startsWith('tel:')
              ? <a href={c.secondary.href} className={btn(false)}>{c.secondary.label}{arrow(false)}</a>
              : <Link href={c.secondary.href} className={btn(false)}>{c.secondary.label}{arrow(false)}</Link>)}
          </div>
          {c.email && <a href={`mailto:${c.email}`} className="font-sans text-[15px] font-medium leading-[normal] hover:underline lg:text-[18px]">{c.email}</a>}
        </div>
      </div>
    </section>
  )
}
