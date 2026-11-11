import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Faq } from '@/components/sections/locations/LocalServicePage'
import { ContactForm } from '@/components/client/ContactForm'
import { LineIcon } from '@/components/ui/LineIcon'
import { FOOTER_H } from '@/lib/layout'
import { content } from '@/lib/page-content'
import { dropoffSites } from '@/lib/dropoff-sites'
import { MAIL_IN } from '@/lib/nav'
import { outboundRel } from '@/lib/urls'
import { faqNode, graph, serviceNode } from '@/lib/schema'
import type { FacilityAdPage as Page, Link as L } from '@/data/local-pages/types'

/**
 * A facility's own Google Ads page — /south-carolina/williamston/.
 *
 * Copy: management's doc of 12 Nov 2026 ("Commercial Recycling in
 * Williamston, SC"). Design: the page's own (12 Nov 2026: "make the design
 * more good and a little different from the other pages"), built for one job,
 * a quote request, so the site's quote form sits on the page itself and every
 * Get a Quote (the header's too) scrolls to it (#quote-form).
 *
 *   hero        warehouse photo under a navy-to-green ramp: pill, H1, subhead,
 *               Get a Quote + Call, and the facility line (address, hours)
 *   trust       five certifications and facts in a white bar on the hero's foot
 *   quote       the form in a white card on the right; on the left the
 *               heading, intro, three "what happens next" points (the doc's
 *               own steps 1, 2 and 5) and the facility's phone, address, hours.
 *               On a phone the form comes straight after the heading.
 *   recycle     four material cards opening the four service pages, and
 *               Get a Quote for Mixed Loads
 *   why         navy band, five glass cards
 *   docs        text and the two certificates beside a drawn certificate
 *   steps       How Pickup Works, five numbered steps on a line
 *   who         seven audience chips
 *   area        four county cards and the mail-in kits line
 *   mid         the mid-page CTA strip
 *   faq         the location pages' FAQ band
 *   cta         closing band with the facility's name and address
 *
 * Get a Quote only, no Schedule a Pickup (management, 12 Nov 2026), no
 * breadcrumb. The 1282 column at lg, 20px gutters below it.
 */
export async function FacilityAdPage({ page, quoteAnchor }: { page: Page; quoteAnchor: string }) {
  const { FORM, SERVICE_INTEREST, HERO_LOCATIONS, NO_PICKUP } = await content('contact')
  const form = { ...FORM, submit: page.quote.button }
  const help = { copy: NO_PICKUP, sites: dropoffSites(), mailInHref: MAIL_IN.href }
  const schema = graph(
    serviceNode({ name: page.schema.service, url: page.url, description: page.seo.description, areaServed: page.schema.areaServed }),
    faqNode(page.faq.items),
  )
  return (
    <FlowCanvas>
      <Header quoteOnly quoteHref={`#${quoteAnchor}`} />
      <main>
        <Hero hero={page.hero} />
        <Trust items={page.trust} />
        <section className="relative bg-[#f6faf8] px-[20px] pb-[56px] pt-[56px] lg:px-0 lg:pb-[100px] lg:pt-[110px]">
          {/* The scroll target of every Get a Quote. The phone header is sticky (92 tall). */}
          <span id={quoteAnchor} className="absolute -top-[92px] lg:top-[40px]" aria-hidden="true" />
          {/* Phone: heading, the form, then the steps and contact card. Board:
              heading over steps and contact on the left, the form on the right. */}
          <div className={`${COL} flex flex-col gap-[24px] lg:grid lg:grid-cols-[minmax(0,1fr)_680px] lg:grid-rows-[auto_1fr] lg:gap-x-[64px] lg:gap-y-[28px]`}>
            <QuoteHead q={page.quote} />
            <div className="w-full rounded-[22px] border border-[#e3ebe7] bg-white p-[22px] shadow-[0_24px_60px_rgba(11,31,58,0.10)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:p-[40px]">
              <ContactForm form={form} serviceInterest={SERVICE_INTEREST} heroLocations={HERO_LOCATIONS} variant="quote" help={help} />
              <p className="mt-[16px] flex items-center gap-[8px] font-roboto text-[13.5px] leading-[1.5] text-muted">
                <LineIcon name="lock" className="size-[15px] shrink-0 text-brand" />{page.quote.note}
              </p>
            </div>
            <QuoteSide q={page.quote} steps={page.steps.items} />
          </div>
        </section>
        <Recycle r={page.recycle} />
        <Why why={page.why} />
        <Docs docs={page.docs} />
        <Steps steps={page.steps} />
        <Who who={page.who} />
        <Area area={page.area} />
        <Mid mid={page.mid} />
        <Faq faq={page.faq} id={page.url} />
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
const MINT = 'text-[#8fd9b0]'

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-[16px] py-[8px] font-roboto text-[11px] font-bold uppercase leading-none tracking-[0.9px] ${dark ? `bg-white/10 ${MINT}` : 'bg-accent-soft text-accent'}`}>
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
  const cls = `btn-pop inline-flex items-center justify-center gap-[10px] rounded-[10px] px-[26px] py-[15px] font-sans text-[15px] font-semibold leading-none ${tones[tone]} ${className}`
  const tel = link.href.startsWith('tel:')
  const inner = <>{tel && <LineIcon name="phone" className="size-[16px]" />}{link.label}{!tel && <LineIcon name="arrowRight" className="size-[17px]" />}</>
  if (link.external) return <a href={link.href} target="_blank" rel={outboundRel(link.href)} className={cls}>{inner}</a>
  if (tel || link.href.startsWith('#')) return <a href={link.href} className={cls}>{inner}</a>
  return <Link href={link.href} className={cls}>{inner}</Link>
}

/* ------------------------------------------------------------------- hero -- */

function Hero({ hero: h }: { hero: Page['hero'] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy px-[20px] pb-[84px] pt-[48px] lg:px-0 lg:pb-[150px] lg:pt-[104px]">
      <Image src={h.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,31,58,0.88)_0%,rgba(11,31,58,0.95)_100%)] lg:bg-[linear-gradient(100deg,rgba(14,69,56,0.97)_0%,rgba(11,31,58,0.92)_52%,rgba(11,31,58,0.5)_100%)]" />
      <div aria-hidden="true" className="absolute -left-[160px] -top-[220px] -z-10 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(27,122,61,0.45)_0%,rgba(27,122,61,0)_70%)]" />

      <div className={`${COL} flex flex-col items-center gap-[18px] text-center lg:items-start lg:gap-[24px] lg:text-left`}>
        <span className="inline-flex items-center gap-[8px] rounded-full border border-white/25 bg-white/10 px-[16px] py-[8px] font-roboto text-[12px] font-bold uppercase leading-none tracking-[0.9px] text-white backdrop-blur-[6px]">
          <LineIcon name="pin" className={`size-[14px] ${MINT}`} />{h.eyebrow}
        </span>
        <h1 className="max-w-[900px] font-sans text-[34px] font-semibold leading-[1.1] text-white lg:text-[64px] lg:leading-[1.05] lg:tracking-[-1.2px]">{h.h1}</h1>
        <p className="max-w-[760px] font-roboto text-[16px] leading-[1.6] text-white/90 lg:text-[20px]">{h.subhead}</p>
        <div className="flex w-full flex-col items-stretch gap-[12px] pt-[6px] lg:w-auto lg:flex-row lg:items-center lg:gap-[16px]">
          <ButtonLink link={h.primary} tone="white" className="lg:px-[34px] lg:py-[18px] lg:text-[16px]" />
          <ButtonLink link={h.phone} tone="ghost" className="lg:px-[30px] lg:py-[18px] lg:text-[16px]" />
        </div>
        <div className="flex flex-col items-center gap-[8px] pt-[6px] font-roboto text-[14.5px] text-white/85 lg:flex-row lg:gap-[26px] lg:text-[15.5px]">
          <span className="inline-flex items-center gap-[8px]"><LineIcon name="pin" className={`size-[17px] ${MINT}`} />{h.address}</span>
          <span className="inline-flex items-center gap-[8px]"><LineIcon name="clock" className={`size-[17px] ${MINT}`} />{h.hours}</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ trust -- */

function Trust({ items }: { items: Page['trust'] }) {
  return (
    <section aria-label="Certifications and facts" className="relative z-[1] -mt-[44px] px-[20px] lg:-mt-[62px] lg:px-0">
      <ul className={`${COL} grid grid-cols-2 gap-[8px] rounded-[18px] bg-white p-[10px] shadow-[0_18px_44px_rgba(11,31,58,0.14)] lg:grid-cols-5 lg:gap-0 lg:p-[8px]`}>
        {items.map((it, i) => (
          <li key={it.text} className={`flex flex-col items-center gap-[10px] rounded-[12px] bg-[#f4f9f6] px-[10px] py-[16px] text-center lg:flex-row lg:gap-[14px] lg:rounded-none lg:bg-transparent lg:px-[22px] lg:py-[24px] lg:text-left ${i < items.length - 1 ? 'lg:border-r lg:border-[#e3ebe7]' : ''} ${i === items.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-brand text-white lg:size-[44px]">
              <LineIcon name={it.icon} className="size-[19px] lg:size-[20px]" />
            </span>
            <span className="font-sans text-[14px] font-semibold leading-snug text-heading lg:text-[15.5px]">{it.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ quote -- */

function QuoteHead({ q }: { q: Page['quote'] }) {
  return (
    <div className="flex w-full flex-col items-center gap-[14px] text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:gap-[20px] lg:pt-[8px] lg:text-left">
      <Pill>Free quote</Pill>
      <h2 className={H2}>{q.heading}</h2>
      <p className={P}>{q.intro}</p>
    </div>
  )
}

function QuoteSide({ q, steps }: { q: Page['quote']; steps: Page['steps']['items'] }) {
  /* What happens after sending: the doc's own How Pickup Works steps 1, 2
     and 5, by their titles. */
  const next = [steps[0], steps[1], steps[4]].filter((s): s is NonNullable<typeof s> => !!s)
  const rows = [
    { icon: 'phone', value: q.contact.phone.label.replace(/^Call /, ''), href: q.contact.phone.href },
    { icon: 'pin', value: q.contact.address },
    { icon: 'clock', value: q.contact.hours },
  ]
  return (
    <div className="flex w-full flex-col gap-[16px] lg:col-start-1 lg:row-start-2 lg:gap-[22px] lg:self-start">
      <ol className="flex w-full flex-col gap-[12px]">
        {next.map((s, i) => (
          <li key={s.title} className="flex items-center gap-[14px]">
            <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[14px] font-semibold text-white">{i + 1}</span>
            <span className="font-sans text-[16px] font-medium text-heading lg:text-[17px]">{s.title}</span>
          </li>
        ))}
      </ol>
      <ul className="flex w-full flex-col gap-[2px] rounded-[18px] bg-[linear-gradient(150deg,#05838b_0%,#0b1f3a_100%)] p-[10px] text-white">
        {rows.map((r) => (
          <li key={r.value} className="flex items-center gap-[14px] rounded-[12px] px-[14px] py-[12px]">
            <span className={`grid size-[36px] shrink-0 place-items-center rounded-full bg-white/15 ${MINT}`}><LineIcon name={r.icon} className="size-[17px]" /></span>
            {r.href
              ? <a href={r.href} className="font-sans text-[16px] font-semibold hover:underline">{r.value}</a>
              : <span className="font-sans text-[15.5px] font-medium">{r.value}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------------------------------------------- recycle -- */

function Recycle({ r }: { r: Page['recycle'] }) {
  return (
    <section className="bg-white px-[20px] py-[56px] lg:px-0 lg:py-[100px]">
      <div className={`${COL} flex flex-col items-center gap-[14px] lg:gap-[18px]`}>
        <Pill>What we recycle</Pill>
        <h2 className={`${H2} text-center`}>{r.heading}</h2>
        <p className={`${P} max-w-[760px] text-center`}>{r.intro}</p>
        <ul className="mt-[18px] grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2 lg:mt-[30px] lg:grid-cols-4 lg:gap-[22px]">
          {r.cards.map((c) => (
            <li key={c.title}>
              <Link href={c.link.href} className="group flex h-full flex-col gap-[14px] rounded-[18px] border border-[#e3ebe7] bg-white p-[24px] transition duration-200 hover:-translate-y-[4px] hover:border-brand/40 hover:shadow-[0_18px_40px_rgba(5,131,139,0.14)] lg:p-[28px]">
                <span className="grid size-[54px] place-items-center rounded-[14px] bg-[linear-gradient(135deg,#eaf4f5_0%,#e8f5ec_100%)] text-brand transition group-hover:bg-brand group-hover:text-white">
                  <LineIcon name={c.icon} className="size-[26px]" />
                </span>
                <h3 className="font-sans text-[19px] font-semibold leading-snug text-heading">{c.title}</h3>
                <p className="flex-1 font-roboto text-[14.5px] leading-[1.6] text-[#5f6b66]">{c.text}</p>
                <span className="inline-flex items-center gap-[8px] font-sans text-[14.5px] font-semibold text-brand">
                  {c.link.label}
                  <LineIcon name="arrowRight" className="size-[16px] shrink-0 transition group-hover:translate-x-[4px]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink link={r.button} className="mt-[22px] w-full sm:w-auto lg:mt-[30px]" />
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
        <Pill dark>Why us</Pill>
        <h2 className={`${H2} text-center !text-white`}>{why.heading}</h2>
        <ul className="mt-[18px] grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2 lg:mt-[34px] lg:grid-cols-5 lg:gap-[18px]">
          {why.cards.map((c, i) => (
            <li key={c.title} className="flex flex-col gap-[14px] rounded-[18px] border border-white/10 bg-white/[0.06] p-[24px] lg:p-[24px]">
              <div className="flex items-center justify-between">
                <span className={`grid size-[48px] place-items-center rounded-[14px] bg-[#8fd9b0]/15 ${MINT}`}>
                  <LineIcon name={c.icon} className="size-[23px]" />
                </span>
                <span aria-hidden="true" className="font-sans text-[28px] font-semibold leading-none text-white/15">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-sans text-[18px] font-semibold leading-snug text-white">{c.title}</h3>
              <p className="font-roboto text-[14.5px] leading-[1.6] text-white/75">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- docs -- */

function Docs({ docs: d }: { docs: Page['docs'] }) {
  return (
    <section className="bg-white px-[20px] py-[56px] lg:px-0 lg:py-[100px]">
      <div className={`${COL} flex flex-col gap-[36px] lg:flex-row lg:items-center lg:gap-[80px]`}>
        <div className="flex min-w-px flex-col gap-[16px] lg:flex-1 lg:gap-[20px]">
          <Pill>Paperwork</Pill>
          <h2 className={H2}>{d.heading}</h2>
          {d.body.map((t) => <p key={t} className={P}>{t}</p>)}
          <ul className="mt-[4px] flex flex-col gap-[12px]">
            {d.certs.map((c) => (
              <li key={c.title} className="flex gap-[14px] rounded-[16px] border border-[#e3ebe7] bg-[#f6faf8] p-[18px] lg:p-[20px]">
                <span className="grid size-[42px] shrink-0 place-items-center rounded-[12px] bg-white text-brand shadow-[0_1px_0_#e3ebe7]"><LineIcon name="file" className="size-[21px]" /></span>
                <span className="flex flex-col gap-[4px]">
                  <span className="font-sans text-[17px] font-semibold text-heading">{c.title}</span>
                  <span className="font-roboto text-[14.5px] leading-[1.6] text-[#5f6b66]">{c.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className={`${P} font-medium !text-heading`}>{d.outro}</p>
        </div>
        {/* A drawn certificate: decoration only, no real document. */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:w-[460px] lg:max-w-none lg:shrink-0">
          <div className="absolute inset-0 translate-x-[18px] translate-y-[18px] rotate-[3deg] rounded-[20px] bg-[linear-gradient(135deg,#d7eeee_0%,#dcefe2_100%)]" />
          <div className="relative flex flex-col gap-[18px] rounded-[20px] border border-[#e3ebe7] bg-white p-[30px] shadow-[0_24px_60px_rgba(11,31,58,0.12)] lg:p-[40px]">
            <div className="flex items-center justify-between">
              <span className="font-roboto text-[11px] font-bold uppercase tracking-[1.2px] text-accent">Recycle Technologies</span>
              <span className="grid size-[54px] place-items-center rounded-full border-[3px] border-[#e8f5ec] bg-brand text-white"><LineIcon name="award" className="size-[24px]" /></span>
            </div>
            <span className="font-sans text-[24px] font-semibold leading-tight text-heading">{d.certs[0]?.title}</span>
            {[100, 86, 92, 64].map((w, i) => <span key={i} className="h-[9px] rounded-full bg-[#edf1ef]" style={{ width: `${w}%` }} />)}
            <div className="mt-[8px] flex items-end justify-between border-t border-dashed border-[#d7e4dc] pt-[18px]">
              <span className="flex flex-col gap-[8px]"><span className="h-[8px] w-[120px] rounded-full bg-[#edf1ef]" /><span className="h-[8px] w-[80px] rounded-full bg-[#edf1ef]" /></span>
              <span className="inline-flex items-center gap-[6px] rounded-full bg-accent-soft px-[12px] py-[6px] font-sans text-[12.5px] font-semibold text-accent"><LineIcon name="check" className="size-[13px]" strokeWidth={3} />Completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ steps -- */

function Steps({ steps }: { steps: Page['steps'] }) {
  return (
    <section className="bg-[#f6faf8] px-[20px] py-[56px] lg:px-0 lg:py-[100px]">
      <div className={`${COL} flex flex-col items-center gap-[14px] lg:gap-[18px]`}>
        <Pill>Step by step</Pill>
        <h2 className={`${H2} text-center`}>{steps.heading}</h2>
        <ol className="relative mt-[18px] grid w-full grid-cols-1 gap-[14px] lg:mt-[40px] lg:grid-cols-5 lg:gap-[18px]">
          {/* The line the numbers sit on, at lg. */}
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[27px] hidden h-[2px] bg-[linear-gradient(90deg,#05838b_0%,#1b7a3d_100%)] opacity-30 lg:block" />
          {steps.items.map((s, i) => (
            <li key={s.title} className="relative flex gap-[16px] rounded-[18px] bg-white p-[20px] shadow-[0_1px_0_#e3ebe7] lg:flex-col lg:items-center lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none">
              <span className="grid size-[54px] shrink-0 place-items-center rounded-full border-[4px] border-[#f6faf8] bg-brand font-sans text-[20px] font-semibold text-white shadow-[0_8px_20px_rgba(5,131,139,0.3)]">{i + 1}</span>
              <span className="flex flex-col gap-[6px] lg:gap-[10px] lg:rounded-[18px] lg:bg-white lg:p-[22px] lg:shadow-[0_1px_0_#e3ebe7]">
                <span className="font-sans text-[17px] font-semibold text-heading lg:text-[18px]">{s.title}</span>
                <span className="font-roboto text-[14.5px] leading-[1.6] text-[#5f6b66]">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- who -- */

function Who({ who }: { who: Page['who'] }) {
  return (
    <section className="bg-white px-[20px] pb-[28px] pt-[56px] lg:px-0 lg:pb-[50px] lg:pt-[100px]">
      <div className={`${COL} flex flex-col items-center gap-[14px] lg:gap-[18px]`}>
        <Pill>Who we serve</Pill>
        <h2 className={`${H2} text-center`}>{who.heading}</h2>
        <ul className="mt-[14px] flex flex-wrap justify-center gap-[10px] lg:mt-[26px] lg:gap-[14px]">
          {who.items.map((it) => (
            <li key={it.text} className="inline-flex items-center gap-[10px] rounded-full border border-[#e3ebe7] bg-[#f6faf8] py-[8px] pl-[8px] pr-[18px] lg:py-[10px] lg:pl-[10px] lg:pr-[22px]">
              <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-white text-brand shadow-[0_1px_0_#e3ebe7] lg:size-[38px]"><LineIcon name={it.icon} className="size-[17px]" /></span>
              <span className="font-sans text-[14.5px] font-medium text-heading lg:text-[16px]">{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- area -- */

function Area({ area: a }: { area: Page['area'] }) {
  const o = a.outro
  return (
    <section className="bg-white px-[20px] pb-[56px] pt-[28px] lg:px-0 lg:pb-[100px] lg:pt-[50px]">
      <div className={`${COL} flex flex-col items-center gap-[14px] rounded-[26px] bg-[linear-gradient(160deg,#f4f9f6_0%,#eaf4f5_100%)] px-[20px] py-[40px] lg:gap-[18px] lg:px-[60px] lg:py-[64px]`}>
        <Pill>Service area</Pill>
        <h2 className={`${H2} text-center`}>{a.heading}</h2>
        <p className={`${P} max-w-[760px] text-center`}>{a.intro}</p>
        <ul className="mt-[14px] grid w-full grid-cols-1 gap-[12px] sm:grid-cols-2 lg:mt-[26px] lg:grid-cols-4 lg:gap-[18px]">
          {a.counties.map((c) => (
            <li key={c.name} className="flex flex-col gap-[10px] rounded-[18px] bg-white p-[22px] shadow-[0_1px_0_#e3ebe7] lg:p-[24px]">
              <span className="flex items-center gap-[10px]">
                <span className="grid size-[36px] shrink-0 place-items-center rounded-full bg-[#eaf4f5] text-brand"><LineIcon name="pin" className="size-[18px]" /></span>
                <span className="font-sans text-[17px] font-semibold leading-tight text-heading">{c.name}</span>
              </span>
              <span className="font-roboto text-[14.5px] leading-[1.6] text-[#5f6b66]">{c.towns}</span>
            </li>
          ))}
        </ul>
        <p className={`${P} mt-[8px] text-center`}>
          {o.before}
          <a href={o.link.href} target="_blank" rel={outboundRel(o.link.href)} className="font-semibold text-brand underline underline-offset-2 hover:text-heading">{o.link.label}</a>
          {o.after}
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- mid -- */

function Mid({ mid }: { mid: Page['mid'] }) {
  return (
    <section className="bg-white px-[20px] pb-[56px] lg:px-0 lg:pb-[90px]">
      <div className={`${COL} relative flex flex-col items-center gap-[18px] overflow-hidden rounded-[24px] bg-[linear-gradient(110deg,#05838b_0%,#1b7a3d_100%)] px-[24px] py-[34px] text-center lg:flex-row lg:justify-between lg:px-[56px] lg:py-[40px] lg:text-left`}>
        <span aria-hidden="true" className="absolute -right-[60px] -top-[90px] size-[260px] rounded-full border-[40px] border-white/[0.07]" />
        <h2 className="relative font-sans text-[22px] font-semibold leading-tight text-white lg:text-[30px]">{mid.heading}</h2>
        <div className="relative flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:gap-[14px]">
          <ButtonLink link={mid.primary} tone="white" />
          <ButtonLink link={mid.secondary} tone="ghost" />
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
        <p className="max-w-[720px] font-roboto text-[15.5px] leading-[1.6] text-white/85 lg:text-[18px]">{c.body}</p>
        <div className="flex w-full flex-col items-stretch gap-[12px] pt-[8px] lg:w-auto lg:flex-row lg:gap-[16px]">
          <ButtonLink link={c.primary} tone="white" className="lg:px-[34px] lg:py-[18px] lg:text-[16px]" />
          <ButtonLink link={c.secondary} tone="ghost" className="lg:px-[34px] lg:py-[18px] lg:text-[16px]" />
        </div>
        <div className="mt-[10px] flex flex-col items-center gap-[4px] border-t border-white/15 pt-[22px] font-roboto text-[14.5px] text-white/80 lg:text-[15.5px]">
          <span className="font-sans text-[16px] font-semibold text-white">{c.name}</span>
          <span className="inline-flex items-center gap-[8px]"><LineIcon name="pin" className={`size-[16px] ${MINT}`} />{c.address}</span>
        </div>
      </div>
    </section>
  )
}
