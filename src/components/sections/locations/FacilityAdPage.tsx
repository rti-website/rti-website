import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Faq } from '@/components/sections/locations/LocalServicePage'
import { LineIcon } from '@/components/ui/LineIcon'
import { FOOTER_H } from '@/lib/layout'
import { outboundRel } from '@/lib/urls'
import { faqNode, graph, serviceNode } from '@/lib/schema'
import type { FacilityAdPage as Page, Link as L } from '@/data/local-pages/types'

/**
 * A facility's own Google Ads page — /south-carolina/williamston/ (12 Nov
 * 2026). Management asked for the Williamston page to look better than, and a
 * little different from, the facility template the other centres share
 * (CountyPage), so it has its own design, built for one job: getting a quote.
 *
 *   hero          the warehouse photo under a navy-to-green ramp; the pill,
 *                 H1 and facility line on the left, one Get a Quote button and
 *                 the phone; on the right a white card with the facility's
 *                 address (directions), phone, email, hours and what it takes
 *   highlights    four icon chips on mint, overlapping the hero's foot
 *   accepts       four cards, one per material, each opening its service page
 *   stories       the doc's service paragraphs beside photos, sides alternating
 *   ways          pickup (dark card) and mail-in (white card)
 *   why           navy band, four glass cards
 *   responsibility text beside a photo with the Mail in Program card on it
 *   faq           the location pages' FAQ band
 *   serve         county chips and the pickup contact card
 *   cta           navy to green, Get a Quote and the phone
 *
 * Get a Quote only — no Schedule a Pickup anywhere, the header included
 * (management, 12 Nov 2026: "these are ads landing pages"). No breadcrumb.
 * The 1282 column at lg, 20px gutters below it, like every flow page.
 */
export function FacilityAdPage({ page }: { page: Page }) {
  const schema = graph(
    serviceNode({ name: page.schema.service, url: page.url, description: page.seo.description, areaServed: page.schema.areaServed }),
    faqNode(page.faq.items),
  )
  return (
    <FlowCanvas>
      <Header quoteOnly />
      <main>
        <Hero hero={page.hero} />
        <Highlights items={page.highlights} />
        <Accepts accepts={page.accepts} />
        <Stories stories={page.stories} />
        <Ways ways={page.ways} />
        <Why why={page.why} />
        <Responsibility r={page.responsibility} />
        <Faq faq={page.faq} id={page.url} />
        <Serve serve={page.serve} />
        <Cta cta={page.cta} />
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

/* ------------------------------------------------------------------ parts -- */

const COL = 'mx-auto w-full lg:w-[1282px]'
const H2 = 'font-sans text-[26px] font-semibold leading-[1.2] text-heading lg:text-[40px]'
const P = 'font-roboto text-[15px] leading-[1.65] text-[#5f6b66] lg:text-[17px] lg:leading-[1.7]'

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-[16px] py-[8px] font-roboto text-[11px] font-bold uppercase leading-none tracking-[0.9px] ${dark ? 'bg-white/10 text-[#8fd9b0]' : 'bg-accent-soft text-accent'}`}>
      {children}
    </span>
  )
}

function ButtonLink({ link, tone = 'teal', className = '' }: { link: L; tone?: 'teal' | 'white' | 'ghost' | 'outline'; className?: string }) {
  const tones = {
    teal: 'bg-brand text-white',
    white: 'bg-white text-brand',
    ghost: 'border border-white/70 text-white hover:bg-white/10',
    outline: 'border border-brand text-brand',
  }
  const cls = `btn-pop inline-flex items-center justify-center gap-[10px] rounded-[10px] px-[26px] py-[14px] font-sans text-[15px] font-semibold leading-none ${tones[tone]} ${className}`
  const inner = <>{link.label}<LineIcon name={link.href.startsWith('tel:') ? 'phone' : 'arrowRight'} className="size-[17px]" /></>
  if (link.external) return <a href={link.href} target="_blank" rel={outboundRel(link.href)} className={cls}>{inner}</a>
  if (link.href.startsWith('tel:') || link.href.startsWith('mailto:')) return <a href={link.href} className={cls}>{inner}</a>
  return <Link href={link.href} className={cls}>{inner}</Link>
}

/* ------------------------------------------------------------------- hero -- */

function Hero({ hero: h }: { hero: Page['hero'] }) {
  const f = h.facility
  const rows: { icon: string; label: string; value: string; href?: string; extra?: L }[] = [
    { icon: 'pin', label: 'Address', value: f.address, extra: { label: 'Get directions', href: f.mapsHref, external: true } },
    { icon: 'phone', label: 'Phone', value: f.phone.label, href: f.phone.href },
    { icon: 'mail', label: 'Email', value: f.email, href: `mailto:${f.email}` },
    { icon: 'clock', label: 'Hours', value: f.hours },
  ]
  return (
    <section className="relative isolate overflow-hidden bg-navy px-[20px] pb-[72px] pt-[44px] lg:px-0 lg:pb-[132px] lg:pt-[96px]">
      <Image src={h.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,31,58,0.88)_0%,rgba(11,31,58,0.94)_100%)] lg:bg-[linear-gradient(100deg,rgba(14,69,56,0.97)_0%,rgba(11,31,58,0.93)_48%,rgba(11,31,58,0.55)_100%)]" />
      {/* A soft green glow behind the text, to set this page apart from the flat ramps elsewhere. */}
      <div aria-hidden="true" className="absolute -left-[160px] -top-[200px] -z-10 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(27,122,61,0.45)_0%,rgba(27,122,61,0)_70%)]" />

      <div className={`${COL} flex flex-col items-center gap-[32px] lg:flex-row lg:items-center lg:gap-[72px]`}>
        <div className="flex w-full flex-col items-center gap-[18px] text-center lg:min-w-px lg:flex-1 lg:items-start lg:gap-[22px] lg:text-left">
          <span className="inline-flex items-center gap-[8px] rounded-full border border-white/25 bg-white/10 px-[16px] py-[8px] font-roboto text-[12px] font-bold uppercase leading-none tracking-[0.9px] text-white backdrop-blur-[6px]">
            <LineIcon name="pin" className="size-[14px] text-[#8fd9b0]" />
            {h.eyebrow}
          </span>
          <h1 className="font-sans text-[34px] font-semibold leading-[1.12] text-white lg:text-[58px] lg:leading-[1.08] lg:tracking-[-1px]">{h.h1}</h1>
          <p className="max-w-[620px] font-roboto text-[16px] leading-[1.6] text-white/90 lg:text-[19px]">{h.lead}</p>
          <div className="flex w-full flex-col items-stretch gap-[14px] pt-[6px] lg:w-auto lg:flex-row lg:items-center lg:gap-[26px]">
            <ButtonLink link={h.button} tone="white" className="lg:px-[34px] lg:py-[17px] lg:text-[16px]" />
            <a href={f.phone.href} className="inline-flex items-center justify-center gap-[12px] font-sans text-[16px] font-semibold text-white hover:underline">
              <span className="grid size-[42px] place-items-center rounded-full border border-white/30 bg-white/10">
                <LineIcon name="phone" className="size-[18px] text-[#8fd9b0]" />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="font-roboto text-[12px] font-normal uppercase tracking-[0.8px] text-white/70">Call the facility</span>
                {f.phone.label}
              </span>
            </a>
          </div>
        </div>

        {/* The facility card. */}
        <div className="w-full max-w-[460px] shrink-0 overflow-hidden rounded-[20px] bg-white shadow-[0_24px_60px_rgba(5,20,40,0.35)] lg:w-[460px]">
          <div className="flex items-center gap-[14px] bg-[linear-gradient(120deg,#05838b_0%,#1b7a3d_100%)] px-[24px] py-[20px] lg:px-[28px]">
            <span className="grid size-[44px] shrink-0 place-items-center rounded-[12px] bg-white/15">
              <LineIcon name="building" className="size-[22px] text-white" />
            </span>
            <div className="flex min-w-px flex-col text-left">
              <span className="font-roboto text-[11px] font-bold uppercase tracking-[0.9px] text-white/75">Visit or contact</span>
              <span className="font-sans text-[20px] font-semibold leading-tight text-white">{f.name}</span>
            </div>
          </div>
          <ul className="flex flex-col px-[24px] py-[8px] text-left lg:px-[28px]">
            {rows.map((r) => (
              <li key={r.label} className="flex items-start gap-[14px] border-b border-[#edf1ef] py-[14px] last:border-b-0">
                <span className="mt-[2px] grid size-[36px] shrink-0 place-items-center rounded-[10px] bg-[#eaf4f5] text-brand">
                  <LineIcon name={r.icon} className="size-[18px]" />
                </span>
                <span className="flex min-w-px flex-col gap-[2px]">
                  <span className="font-roboto text-[11.5px] uppercase tracking-[0.6px] text-muted">{r.label}</span>
                  {r.href
                    ? <a href={r.href} className="break-words font-sans text-[15.5px] font-medium leading-snug text-heading hover:text-brand">{r.value}</a>
                    : <span className="font-sans text-[15.5px] font-medium leading-snug text-heading">{r.value}</span>}
                  {r.extra && (
                    <a href={r.extra.href} target="_blank" rel={outboundRel(r.extra.href)} className="mt-[2px] inline-flex items-center gap-[6px] font-sans text-[13.5px] font-semibold text-brand hover:underline">
                      {r.extra.label}<LineIcon name="arrowRight" className="size-[14px]" />
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-[8px] border-t border-[#edf1ef] bg-[#f6faf8] px-[24px] py-[16px] lg:px-[28px]">
            {f.accepts.map((a) => (
              <span key={a} className="inline-flex items-center gap-[6px] rounded-full bg-white px-[12px] py-[6px] font-sans text-[13px] font-medium text-heading shadow-[0_1px_0_#e3ebe7]">
                <LineIcon name="check" className="size-[13px] text-accent" strokeWidth={3} />{a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- highlights -- */

function Highlights({ items }: { items: Page['highlights'] }) {
  return (
    <section aria-label="Highlights" className="relative z-[1] -mt-[40px] px-[20px] lg:-mt-[56px] lg:px-0">
      <ul className={`${COL} grid grid-cols-2 gap-[10px] rounded-[18px] bg-white p-[10px] shadow-[0_18px_44px_rgba(11,31,58,0.12)] lg:grid-cols-4 lg:gap-0 lg:p-[8px]`}>
        {items.map((it) => (
          <li key={it.text} className="flex flex-col items-center gap-[10px] rounded-[12px] bg-[#f4f9f6] px-[10px] py-[16px] text-center lg:flex-row lg:gap-[14px] lg:bg-transparent lg:px-[26px] lg:py-[22px] lg:text-left lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-[#e3ebe7] lg:[&:not(:last-child)]:rounded-none">
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-brand text-white lg:size-[46px]">
              <LineIcon name={it.icon} className="size-[19px] lg:size-[21px]" />
            </span>
            <span className="font-sans text-[14px] font-semibold leading-snug text-heading lg:text-[16.5px]">{it.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------------------------------------------------------- accepts -- */

function Accepts({ accepts: a }: { accepts: Page['accepts'] }) {
  return (
    <section className="bg-white px-[20px] py-[56px] lg:px-0 lg:py-[96px]">
      <div className={`${COL} flex flex-col items-center gap-[14px] lg:gap-[18px]`}>
        <Pill>{a.eyebrow}</Pill>
        <h2 className={`${H2} text-center`}>{a.heading}</h2>
        <p className={`${P} max-w-[760px] text-center`}>{a.lead}</p>
        <ul className="mt-[18px] grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2 lg:mt-[30px] lg:grid-cols-4 lg:gap-[22px]">
          {a.cards.map((c) => (
            <li key={c.title}>
              <Link href={c.link.href} className="group flex h-full flex-col gap-[14px] rounded-[18px] border border-[#e3ebe7] bg-white p-[24px] transition duration-200 hover:-translate-y-[4px] hover:border-brand/40 hover:shadow-[0_18px_40px_rgba(5,131,139,0.14)] lg:p-[28px]">
                <span className="grid size-[54px] place-items-center rounded-[14px] bg-[linear-gradient(135deg,#eaf4f5_0%,#e8f5ec_100%)] text-brand transition group-hover:bg-brand group-hover:text-white">
                  <LineIcon name={c.icon} className="size-[26px]" />
                </span>
                <h3 className="font-sans text-[18px] font-semibold leading-snug text-heading lg:text-[19px]">{c.title}</h3>
                <p className="flex-1 font-roboto text-[14.5px] leading-[1.6] text-[#5f6b66]">{c.text}</p>
                <span className="inline-flex items-center gap-[8px] font-sans text-[14.5px] font-semibold text-brand">
                  {c.link.label}
                  <LineIcon name="arrowRight" className="size-[16px] transition group-hover:translate-x-[4px]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- stories -- */

function Stories({ stories }: { stories: Page['stories'] }) {
  return (
    <section className="bg-[#f6faf8] px-[20px] py-[56px] lg:px-0 lg:py-[100px]">
      <div className={`${COL} flex flex-col gap-[56px] lg:gap-[96px]`}>
        {stories.map((s, i) => (
          <article key={s.heading} className={`flex flex-col items-center gap-[24px] lg:gap-[72px] ${i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="relative w-full lg:w-[560px] lg:shrink-0">
              {/* A tinted block behind the photo, offset to the outer side. */}
              <span aria-hidden="true" className={`absolute hidden h-full w-full rounded-[24px] bg-[linear-gradient(135deg,#d7eeee_0%,#dcefe2_100%)] lg:block lg:top-[22px] ${i % 2 ? 'lg:right-[-22px]' : 'lg:left-[-22px]'}`} />
              <div className="relative h-[230px] w-full overflow-hidden rounded-[20px] lg:h-[420px]">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="flex w-full min-w-px flex-col items-start gap-[14px] lg:flex-1 lg:gap-[18px]">
              <Pill>{s.eyebrow}</Pill>
              <h2 className="font-sans text-[23px] font-semibold leading-[1.25] text-heading lg:text-[34px]">{s.heading}</h2>
              {s.body.map((t) => <p key={t} className={P}>{t}</p>)}
              {s.link && (
                <Link href={s.link.href} className="mt-[4px] inline-flex items-center gap-[8px] font-sans text-[15.5px] font-semibold text-brand hover:underline">
                  {s.link.label}<LineIcon name="arrowRight" className="size-[17px]" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- ways -- */

function Ways({ ways }: { ways: Page['ways'] }) {
  return (
    <section className="bg-white px-[20px] py-[56px] lg:px-0 lg:py-[96px]">
      <div className={`${COL} flex flex-col items-center gap-[24px] lg:gap-[36px]`}>
        <Pill>{ways.eyebrow}</Pill>
        <div className="grid w-full grid-cols-1 gap-[16px] lg:grid-cols-2 lg:gap-[28px]">
          {ways.cards.map((c, i) => {
            const dark = i === 0
            return (
              <div key={c.title} className={`relative flex flex-col gap-[16px] overflow-hidden rounded-[22px] p-[28px] lg:gap-[18px] lg:p-[44px] ${dark ? 'bg-[linear-gradient(135deg,#0b1f3a_0%,#0e4538_100%)] text-white' : 'border border-[#e3ebe7] bg-[#f6faf8]'}`}>
                {dark && <span aria-hidden="true" className="absolute -right-[80px] -top-[80px] size-[260px] rounded-full bg-[radial-gradient(circle,rgba(143,217,176,0.25)_0%,rgba(143,217,176,0)_70%)]" />}
                <span className={`grid size-[56px] place-items-center rounded-[16px] ${dark ? 'bg-white/10 text-[#8fd9b0]' : 'bg-white text-brand shadow-[0_1px_0_#e3ebe7]'}`}>
                  <LineIcon name={c.icon} className="size-[27px]" />
                </span>
                <h3 className={`font-sans text-[22px] font-semibold leading-tight lg:text-[28px] ${dark ? 'text-white' : 'text-heading'}`}>{c.title}</h3>
                <p className={`font-roboto text-[15px] leading-[1.6] lg:text-[17px] ${dark ? 'text-white/80' : 'text-[#5f6b66]'}`}>{c.text}</p>
                <div className="mt-auto flex flex-col gap-[12px] pt-[6px] sm:flex-row sm:flex-wrap">
                  {c.links.map((l, k) => <ButtonLink key={l.label} link={l} tone={dark ? 'white' : k === 0 ? 'teal' : 'outline'} />)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- why -- */

function Why({ why }: { why: Page['why'] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy px-[20px] py-[60px] lg:px-0 lg:py-[100px]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_100%_0%,rgba(5,131,139,0.35)_0%,rgba(11,31,58,0)_60%),radial-gradient(60%_100%_at_0%_100%,rgba(27,122,61,0.35)_0%,rgba(11,31,58,0)_60%)]" />
      <div className={`${COL} flex flex-col items-center gap-[14px] lg:gap-[18px]`}>
        <Pill dark>{why.eyebrow}</Pill>
        <h2 className={`${H2} text-center !text-white`}>{why.heading}</h2>
        <ul className="mt-[18px] grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2 lg:mt-[34px] lg:grid-cols-4 lg:gap-[22px]">
          {why.cards.map((c, i) => (
            <li key={c.title} className="flex flex-col gap-[14px] rounded-[18px] border border-white/10 bg-white/[0.06] p-[24px] backdrop-blur-[4px] lg:p-[28px]">
              <div className="flex items-center justify-between">
                <span className="grid size-[50px] place-items-center rounded-[14px] bg-[#8fd9b0]/15 text-[#8fd9b0]">
                  <LineIcon name={c.icon} className="size-[24px]" />
                </span>
                <span aria-hidden="true" className="font-sans text-[30px] font-semibold leading-none text-white/15">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-sans text-[18px] font-semibold leading-snug text-white lg:text-[19px]">{c.title}</h3>
              <p className="font-roboto text-[14.5px] leading-[1.6] text-white/75">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- responsibility -- */

function Responsibility({ r }: { r: Page['responsibility'] }) {
  return (
    <section className="bg-white px-[20px] py-[56px] lg:px-0 lg:py-[100px]">
      <div className={`${COL} flex flex-col gap-[32px] lg:flex-row lg:items-center lg:gap-[72px]`}>
        <div className="flex min-w-px flex-col gap-[16px] lg:flex-1 lg:gap-[20px]">
          <Pill>Sustainability</Pill>
          <h2 className={H2}>{r.heading}</h2>
          {r.body.map((t) => <p key={t} className={P}>{t}</p>)}
        </div>
        <div className="relative w-full lg:w-[540px] lg:shrink-0">
          <div className="relative h-[240px] w-full overflow-hidden rounded-[22px] lg:h-[440px]">
            <Image src={r.image} alt="" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
          {/* The Mail in Program card, laid over the photo's foot at lg. */}
          <div className="relative -mt-[48px] mx-[14px] flex flex-col gap-[12px] rounded-[18px] bg-[linear-gradient(135deg,#1b7a3d_0%,#05838b_100%)] p-[24px] text-white shadow-[0_20px_44px_rgba(5,60,60,0.3)] lg:absolute lg:-bottom-[40px] lg:-left-[56px] lg:mx-0 lg:mt-0 lg:w-[400px] lg:p-[28px]">
            <div className="flex items-center gap-[12px]">
              <span className="grid size-[42px] place-items-center rounded-[12px] bg-white/15"><LineIcon name="box" className="size-[21px]" /></span>
              <h3 className="font-sans text-[20px] font-semibold leading-tight">{r.mailIn.heading}</h3>
            </div>
            <p className="font-roboto text-[14.5px] leading-[1.6] text-white/90">{r.mailIn.text}</p>
            <div className="flex flex-col gap-[8px] pt-[2px] sm:flex-row sm:flex-wrap sm:gap-x-[20px]">
              {r.mailIn.links.map((l) => {
                const inner = <>{l.label}<LineIcon name="arrowRight" className="size-[15px]" /></>
                const cls = 'inline-flex items-center gap-[7px] font-sans text-[14.5px] font-semibold text-white underline-offset-4 hover:underline'
                return l.external
                  ? <a key={l.label} href={l.href} target="_blank" rel={outboundRel(l.href)} className={cls}>{inner}</a>
                  : <Link key={l.label} href={l.href} className={cls}>{inner}</Link>
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ serve -- */

function Serve({ serve: s }: { serve: Page['serve'] }) {
  const c = s.contact
  const rows: { icon: string; value: string; href?: string }[] = [
    { icon: 'phone', value: c.phone.label, href: c.phone.href },
    { icon: 'mail', value: c.email, href: `mailto:${c.email}` },
    { icon: 'clock', value: c.hours },
  ]
  return (
    <section className="bg-white px-[20px] py-[56px] lg:px-0 lg:py-[96px]">
      <div className={`${COL} grid grid-cols-1 gap-[20px] lg:grid-cols-2 lg:gap-[28px]`}>
        <div className="flex flex-col gap-[18px] rounded-[22px] border border-[#e3ebe7] bg-[#f6faf8] p-[28px] lg:gap-[22px] lg:p-[44px]">
          <Pill>Service area</Pill>
          <h2 className="font-sans text-[24px] font-semibold leading-tight text-heading lg:text-[32px]">{s.heading}</h2>
          <ul className="flex flex-col gap-[10px]">
            {s.counties.map((n) => (
              <li key={n} className="flex items-center gap-[14px] rounded-[14px] bg-white px-[18px] py-[16px] shadow-[0_1px_0_#e3ebe7]">
                <span className="grid size-[36px] place-items-center rounded-full bg-[#eaf4f5] text-brand"><LineIcon name="pin" className="size-[18px]" /></span>
                <span className="font-sans text-[16px] font-medium text-heading lg:text-[17px]">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-[18px] rounded-[22px] bg-[linear-gradient(150deg,#05838b_0%,#0b1f3a_100%)] p-[28px] text-white lg:gap-[22px] lg:p-[44px]">
          <Pill dark>Contact</Pill>
          <h2 className="font-sans text-[24px] font-semibold leading-tight lg:text-[32px]">{c.heading}</h2>
          <p className="font-roboto text-[15px] leading-[1.6] text-white/85 lg:text-[17px]">{c.text}</p>
          <ul className="flex flex-col gap-[10px]">
            {rows.map((r) => (
              <li key={r.value} className="flex items-center gap-[14px] rounded-[14px] bg-white/[0.08] px-[18px] py-[14px]">
                <span className="grid size-[36px] shrink-0 place-items-center rounded-full bg-white/15 text-[#8fd9b0]"><LineIcon name={r.icon} className="size-[18px]" /></span>
                {r.href
                  ? <a href={r.href} className="min-w-px break-words font-sans text-[15.5px] font-medium hover:underline lg:text-[17px]">{r.value}</a>
                  : <span className="font-sans text-[15.5px] font-medium lg:text-[17px]">{r.value}</span>}
              </li>
            ))}
          </ul>
          <ButtonLink link={c.button} tone="white" className="mt-auto self-stretch sm:self-start" />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- cta -- */

function Cta({ cta: c }: { cta: Page['cta'] }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#0b1f3a_0%,#0e4538_55%,#1b7a3d_100%)] px-[20px] py-[60px] lg:px-0 lg:py-[90px]">
      <span aria-hidden="true" className="absolute -right-[120px] -top-[160px] -z-10 size-[460px] rounded-full border-[60px] border-white/[0.04]" />
      <span aria-hidden="true" className="absolute -bottom-[180px] -left-[100px] -z-10 size-[420px] rounded-full border-[50px] border-white/[0.04]" />
      <div className={`${COL} flex flex-col items-center gap-[18px] text-center text-white lg:gap-[22px]`}>
        <h2 className="font-sans text-[26px] font-semibold leading-tight lg:text-[42px]">{c.heading}</h2>
        <p className="font-roboto text-[15.5px] leading-[1.6] text-white/85 lg:text-[18px]">{c.body}</p>
        <div className="flex w-full flex-col items-stretch gap-[12px] pt-[8px] lg:w-auto lg:flex-row lg:gap-[16px]">
          <ButtonLink link={c.primary} tone="white" className="lg:px-[34px] lg:py-[17px] lg:text-[16px]" />
          {c.secondary && <ButtonLink link={c.secondary} tone="ghost" className="lg:px-[34px] lg:py-[17px] lg:text-[16px]" />}
        </div>
      </div>
    </section>
  )
}
