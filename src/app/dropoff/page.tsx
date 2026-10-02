import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { DropoffFinder, type FinderSite } from '@/components/client/DropoffFinder'
import { FOOTER_H } from '@/lib/layout'
import { FACILITY_POINTS } from '@/lib/geo'
import { zipPoint } from '@/lib/zips'
import { pageMetadata } from '@/lib/page-meta'
import { breadcrumbNode, graph } from '@/lib/schema'
import { content } from '@/lib/page-content'
import { SEO, type DropoffLocation } from '@/data/dropoff'

/**
 * Drop-off Locations — /dropoff/, built 2 Oct 2026.
 *
 * Figma BVtf2AOuUOcYbiMIlcKmbC "Drop Off Locations — Desktop" 7206:3200 and
 * the phone frame 7210:6498; copy in src/data/dropoff.ts (Admin -> Pages ->
 * Drop-off Locations). /dropoff/ is the old WordPress URL: a KEEP row in
 * data/url-map.csv that 301'd to /all-locations/ from launch until now.
 *
 * A FLOW PAGE (FlowCanvas), like the county pages: the ten location cards
 * are as tall as their copy, and a card's hours or a note can change in the
 * admin, so nothing here is pinned to a measured height.
 *
 * Sections, in the frame's order: hero 7206:3202, finder 7206:3216, location
 * cards 7206:3245, Chicago 7206:3302, What You Can Drop Off 7206:3522, Fees
 * 7209:3316, What Happens When You Arrive 7206:3804, Recycling for Businesses
 * 7209:3323, No Location Near You? 7206:3544, FAQ 7206:3753, the three-button
 * CTA 7206:3790, then the shared footer.
 */
export const generateMetadata = () => pageMetadata({
  url: '/dropoff/',
  title: SEO.title,
  description: SEO.description,
})

const W = 'w-full lg:mx-auto lg:w-[1282px]'
const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
const directions = (q: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`
const tel = (p: string) => `tel:+1${p.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`

/** "Blaine, Minnesota" -> "Blaine, MN" from the address's state code. */
function shortName(l: DropoffLocation): string {
  const st = /,\s*([A-Z]{2})\s+\d{5}/.exec(l.address)?.[1]
  return `${l.name.split(',')[0]}${st ? `, ${st}` : ''}`
}

/** Where each location is, for the finder's distances and map pins. */
function pointOf(l: DropoffLocation, i: number) {
  // The two RTI facilities have measured points; the rest use their ZIP's centre.
  if (i === 0 && l.zip === '55449') return FACILITY_POINTS['minnesota-recycling']
  if (i === 1 && l.zip === '53151') return FACILITY_POINTS['wisconsin-recycling']
  return zipPoint(l.zip)
}

export default async function DropoffPage() {
  const C = await content('dropoff')
  const sites: FinderSite[] = C.LOCATIONS.flatMap((l, i) => {
    const pt = pointOf(l, i)
    if (!pt) return []
    return [{
      name: l.name, address: l.address, phone: l.phone, hours: l.hours,
      acceptsLabel: l.acceptsLabel, accepts: l.accepts,
      view: l.url ?? maps(l.address), directions: directions(l.address),
      primary: l.kind === 'r2', short: shortName(l), lat: pt.lat, lng: pt.lng,
    }]
  })
  const schema = graph(breadcrumbNode([{ name: 'Home', url: '/' }, { name: C.HERO.h1, url: '/dropoff/' }]))

  return (
    <FlowCanvas>
      <Header />
      <main>
        {/* Hero — 7206:3202. Same photograph as /all-locations/ (6472:3922,
            f4542) at y-372, the 90% navy fade up from the bottom and the
            solid green wash from the left. The phone frame centres the text
            and adds two full-width buttons. */}
        <section data-figma="7206:3202" className="relative overflow-hidden bg-navy lg:h-[470px]">
          <div aria-hidden="true" className="absolute inset-0 lg:inset-x-auto lg:left-1/2 lg:top-[-372px] lg:h-[1081px] lg:w-[1920px] lg:-translate-x-1/2">
            <Image src="/images/pages/hero-locations-v2.png" alt="" fill priority sizes="(width < 64rem) 100vw, 1920px" className="object-cover" />
          </div>
          <span aria-hidden="true" className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.9) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
          <span aria-hidden="true" className="absolute inset-0 max-lg:bg-[rgba(11,31,58,0.55)]"
            style={{ backgroundImage: 'linear-gradient(90deg, rgb(27,122,61) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
          <div className="relative flex flex-col items-center px-[20px] py-[48px] text-center lg:mx-auto lg:h-full lg:w-[1282px] lg:items-start lg:justify-center lg:px-0 lg:py-0 lg:text-left">
            <nav aria-label="Breadcrumb" className="mb-[12px] lg:mb-[21px] lg:pl-[3px]">
              <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
                {C.HERO.crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-[13px]">
                    {i > 0 && <span aria-hidden="true" className="text-white/50">/</span>}
                    {c.href
                      ? <Link href={c.href} className="text-white/50 hover:text-white">{c.label}</Link>
                      : <span aria-current="page" className="text-white">{c.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="font-sans text-[32px] font-semibold leading-[1.2] text-white lg:text-[70px] lg:leading-[84.7px] lg:tracking-[-2.03px]">{C.HERO.h1}</h1>
            <p className="mt-[12px] font-roboto text-[15px] leading-[1.5] text-white/85 lg:mt-[8px] lg:w-[1181px] lg:text-[18px] lg:leading-[30.031px] lg:text-white/70">
              {C.HERO.lead}
            </p>
            {/* 7210:6498 — phone only. */}
            <div className="mt-[24px] flex w-full flex-col gap-[12px] lg:hidden">
              <a href="#find" className="btn-pop inline-flex h-[48px] w-full items-center justify-center rounded-[8px] bg-brand font-roboto text-[15px] font-medium text-white">{C.HERO.findButton}</a>
              <Link href={C.HERO.pickupButton.href} className="btn-pop inline-flex h-[48px] w-full items-center justify-center rounded-[8px] border border-white font-roboto text-[15px] font-medium text-white">{C.HERO.pickupButton.label}</Link>
            </div>
          </div>
        </section>

        {/* Find a Drop-off Location — 7206:3216: py90, gap40. */}
        <section id="find" data-figma="7206:3216" className="scroll-mt-[100px] bg-white px-[20px] py-[48px] lg:px-0 lg:py-[90px]">
          <div className="flex flex-col items-center gap-[24px] lg:gap-[40px]">
            <div className="flex w-full flex-col items-center gap-[12px] text-center lg:w-[780px] lg:gap-[10px]">
              <Eyebrow>{C.FINDER.eyebrow}</Eyebrow>
              <Title>{C.FINDER.heading}</Title>
              <Lead>{C.FINDER.lead}</Lead>
            </div>
            <DropoffFinder copy={C.FINDER} sites={sites} />
          </div>
        </section>

        {/* Our Drop-off Locations — 7206:3245: py90, heading 780, gap 44, then
            627-wide cards two to a row, 28 apart. */}
        <section data-figma="7206:3245" className="bg-[#fafafa] px-[20px] py-[48px] lg:px-0 lg:py-[90px]">
          <div className="flex w-full flex-col items-center gap-[12px] text-center lg:mx-auto lg:w-[780px] lg:gap-[10px]">
            <Eyebrow>{C.LOCATIONS_SECTION.eyebrow}</Eyebrow>
            <Title>{C.LOCATIONS_SECTION.heading}</Title>
            <Lead>{C.LOCATIONS_SECTION.lead}</Lead>
          </div>
          <ul className={`${W} mt-[28px] grid grid-cols-1 gap-[20px] lg:mt-[44px] lg:grid-cols-2 lg:gap-[28px]`}>
            {C.LOCATIONS.map((l) => (
              <li key={l.name}><LocationCard l={l} view={C.LOCATIONS_SECTION.view} dir={C.LOCATIONS_SECTION.directions} /></li>
            ))}
          </ul>
        </section>

        {/* Chicago Commercial Pickup — 7206:3302: pt90 pb100, gap44. */}
        <section data-figma="7206:3302" className="bg-white px-[20px] py-[48px] lg:px-0 lg:pb-[100px] lg:pt-[90px]">
          <div className="flex flex-col items-center gap-[24px] text-center lg:gap-[44px]">
            <div className="flex w-full flex-col items-center gap-[12px] lg:w-[780px] lg:gap-[10px]">
              <Eyebrow>{C.CHICAGO.eyebrow}</Eyebrow>
              <h2 className="font-sans text-[26px] font-semibold leading-[1.2] text-black lg:text-[38px]">{C.CHICAGO.heading}</h2>
              <Lead>{C.CHICAGO.body}</Lead>
            </div>
            <Btn href={C.CHICAGO.button.href} variant="colored" className="max-lg:w-full max-lg:justify-center">{C.CHICAGO.button.label}</Btn>
          </div>
        </section>

        {/* What You Can Drop Off — 7206:3522: py100, a 700 text column and a
            502 tinted list 80 apart. The phone shows the items as pills. */}
        <section data-figma="7206:3522" className="bg-[#fcfcfc] px-[20px] py-[48px] lg:px-0 lg:py-[100px]">
          <div className="flex flex-col items-center gap-[20px] text-center lg:mx-auto lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[80px] lg:text-left">
            <div className="flex w-full flex-col items-center gap-[16px] lg:w-[700px] lg:items-start lg:gap-[20px]">
              <Eyebrow>{C.ITEMS.eyebrow}</Eyebrow>
              <h2 className="font-sans text-[26px] font-semibold leading-[1.2] text-heading lg:text-[36px]">{C.ITEMS.heading}</h2>
              <p className="font-roboto text-[15px] leading-[1.6] text-muted lg:text-[16px]">{C.ITEMS.intro}</p>
              {/* Phone: the list as pills, between the two sentences. */}
              <ul className="flex flex-wrap justify-center gap-[8px] lg:hidden">
                {C.ITEMS.list.map((it) => (
                  <li key={it} className="rounded-full border border-line bg-white px-[14px] py-[6px] font-poppins text-[13px] text-[#333]">{it}</li>
                ))}
              </ul>
              <p className="font-roboto text-[15px] leading-[1.6] text-muted lg:text-[16px]">{C.ITEMS.outro}</p>
            </div>
            <div className="flex w-[502px] flex-col gap-[20px] rounded-[12px] bg-brand-soft p-[32px] max-lg:hidden">
              <p className="font-sans text-[19px] font-medium text-heading">{C.ITEMS.listHeading}</p>
              <ul className="flex flex-col gap-[20px]">
                {C.ITEMS.list.map((it) => (
                  <li key={it} className="flex items-center gap-[12px] font-poppins text-[14.5px] text-[#333]">
                    <span aria-hidden="true" className="size-[8px] shrink-0 rounded-full bg-brand" />{it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Fees — 7209:3316: py80, gap24. */}
        <section data-figma="7209:3316" className="bg-white px-[20px] py-[48px] lg:px-0 lg:py-[80px]">
          <div className="flex flex-col items-center gap-[16px] text-center lg:gap-[24px]">
            <h2 className="font-sans text-[24px] font-semibold text-heading lg:text-[32px]">{C.FEES.heading}</h2>
            <p className="font-roboto text-[15px] leading-[24px] text-muted lg:w-[780px] lg:text-[17px] lg:leading-[28px]">{C.FEES.body}</p>
            {C.FEES.button && <Btn href={C.FEES.button.href} variant="colored" className="max-lg:w-full max-lg:justify-center">{C.FEES.button.label}</Btn>}
          </div>
        </section>

        {/* What Happens When You Arrive — 7206:3804: py70, gap40, three equal cards. */}
        <section data-figma="7206:3804" className="bg-[#fcfcfc] px-[20px] py-[48px] lg:px-0 lg:py-[70px]">
          <h2 className="text-center font-sans text-[24px] font-semibold leading-[1.3] text-heading lg:text-[32px]">{C.ARRIVE.heading}</h2>
          <ol className={`${W} mt-[24px] flex flex-col gap-[16px] lg:mt-[40px] lg:flex-row lg:gap-[24px]`}>
            {C.ARRIVE.steps.map((s) => (
              <li key={s.title} className="flex flex-1 flex-col items-center gap-[12px] rounded-[12px] border border-[#e6e6e6] bg-white px-[24px] py-[28px] text-center lg:gap-[16px] lg:px-[30px] lg:py-[32px]">
                <p className="font-sans text-[18px] font-medium leading-[1.3] text-heading lg:text-[19px]">{s.title}</p>
                <p className="font-roboto text-[14px] leading-[1.58] text-muted lg:text-[15px]">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Recycling for Businesses — 7209:3323. */}
        <section data-figma="7209:3323" className="bg-white px-[20px] py-[48px] lg:px-0 lg:py-[80px]">
          <div className="flex flex-col items-center gap-[16px] text-center lg:gap-[24px]">
            <h2 className="font-sans text-[24px] font-semibold text-heading lg:text-[32px]">{C.BUSINESS.heading}</h2>
            <p className="font-roboto text-[15px] leading-[24px] text-muted lg:w-[780px] lg:text-[17px] lg:leading-[28px]">{C.BUSINESS.body}</p>
            <Btn href={C.BUSINESS.button.href} variant="colored" className="max-lg:w-full max-lg:justify-center">{C.BUSINESS.button.label}</Btn>
          </div>
        </section>

        {/* No Location Near You? — 7206:3544: #0c4e5a under the green-foliage
            photograph (the homepage phone hero's, 13122) at 10%, mirrored,
            with the 64% green wash. */}
        <section data-figma="7206:3544" className="relative overflow-hidden bg-[#0c4e5a] px-[20px] py-[56px] lg:h-[456px] lg:px-0 lg:py-0">
          <div aria-hidden="true" className="absolute inset-0 -scale-x-100 opacity-10">
            <Image src="/images/home/hero-photo-phone.png" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <span aria-hidden="true" className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
          <div className="relative flex h-full flex-col items-center justify-center gap-[16px] text-center lg:mx-auto lg:w-[686px] lg:gap-[20px]">
            <h2 className="font-sans text-[26px] font-semibold leading-[1.18] text-white lg:text-[38px]">{C.NO_LOCATION.heading}</h2>
            <p className="font-roboto text-[15px] leading-[1.6] text-white/80 lg:text-[17px]">{C.NO_LOCATION.body}</p>
            <div className="w-full pt-[8px] lg:w-auto lg:pt-[12px]">
              <Btn href={C.NO_LOCATION.button.href} external variant="whiteFill" className="max-lg:w-full max-lg:justify-center">{C.NO_LOCATION.button.label}</Btn>
            </div>
          </div>
        </section>

        {/* FAQ — 7206:3753: #f4f9f6, py100, gap50, a 780 column of rows 15
            apart. Native <details>: no script, the first one open. */}
        <section data-figma="7206:3753" className="bg-[#f4f9f6] px-[20px] py-[48px] lg:px-0 lg:py-[100px]">
          <div className="flex flex-col items-center gap-[12px] text-center lg:gap-[10px]">
            <Eyebrow>{C.FAQ.eyebrow}</Eyebrow>
            <Title className="lg:leading-[1.3]">{C.FAQ.heading}</Title>
          </div>
          <div className="mt-[28px] flex w-full flex-col gap-[12px] lg:mx-auto lg:mt-[50px] lg:w-[780px] lg:gap-[15px]">
            {C.FAQ.items.map((f, i) => (
              <details key={f.q} open={i === 0} className="group rounded-[8px] border border-line bg-white/60 px-[16px] py-[12px] lg:bg-transparent lg:px-[20px]">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-[12px] font-sans text-[15px] leading-[1.3] text-black lg:text-[16px] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="grid size-[22px] shrink-0 place-items-center rounded-full border border-[#d6e6de] font-sans text-[15px] font-semibold leading-none text-brand">
                    <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p className="mt-[10px] font-roboto text-[14px] leading-[24px] text-muted lg:leading-[27.65px]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Schedule a Pickup, Get a Quote, or Contact Us — 7206:3790. */}
        <section data-figma="7206:3790" className="bg-gradient-to-r from-navy to-accent px-[20px] py-[48px] lg:px-0 lg:py-[80px]">
          <h2 className="text-center font-sans text-[24px] font-semibold leading-[1.3] text-white lg:text-[34px]">{C.CTA.heading}</h2>
          <div className="mt-[24px] flex flex-col gap-[12px] lg:mt-[20px] lg:flex-row lg:justify-center lg:gap-[16px]">
            {C.CTA.buttons.map((b, i) => (
              <Btn key={b.label} href={b.href} variant={i === 0 ? 'whiteFill' : 'white'}
                className={`max-lg:w-full max-lg:justify-center ${i === 0 ? '' : 'border border-white'}`}>{b.label}</Btn>
            ))}
          </div>
        </section>
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

/** One location — 7208:13896 (an RTI facility) / 7208:14064 (the others). */
function LocationCard({ l, view, dir }: { l: DropoffLocation; view: string; dir: string }) {
  const viewHref = l.url ?? maps(l.address)
  const ext = !l.url
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white">
      <div className="flex h-[76px] items-center justify-between gap-[12px] px-[16px] lg:h-[110px] lg:px-[28px]"
        style={{ backgroundImage: 'linear-gradient(172.15deg, rgb(11,31,58) 7.25%, rgb(27,122,61) 79.71%)' }}>
        <div className="flex min-w-0 items-center gap-[12px] lg:gap-[16px]">
          <span className="grid size-[36px] shrink-0 place-items-center rounded-full bg-white/15 lg:size-[48px]">
            <Image src="/images/dropoff/pin-white.svg" alt="" width={22} height={22} unoptimized className="size-[17px] lg:size-[21.6px]" />
          </span>
          <h3 className="font-sans text-[17px] font-semibold leading-[1.2] text-white lg:text-[22px]">{l.name}</h3>
        </div>
        {l.kind === 'r2'
          ? <Image src="/images/home/stat-r2.png" alt="R2v3 certified" width={45} height={46} className="h-[34px] w-[33px] shrink-0 object-contain lg:h-[46.46px] lg:w-[44.6px]" />
          : (
            <span className="grid h-[28px] w-[74px] shrink-0 place-items-center rounded-[5px] bg-white lg:h-[36px] lg:w-[96px]">
              <Image src="/images/locations/rti-card-logo.png" alt="Recycle Technologies" width={84} height={20} className="h-[15px] w-[63px] object-contain lg:h-[20px] lg:w-[84px]" />
            </span>
          )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-[20px] p-[20px] lg:p-[28px]">
        <div className="flex flex-col gap-[14px] font-poppins text-[14px] leading-[22px] text-[#4d4d4d]">
          {l.badge && <span className="self-start"><Eyebrow>{l.badge}</Eyebrow></span>}
          <Row icon="pin">{l.address}</Row>
          <Row icon="phone"><a href={tel(l.phone)} className="hover:text-brand">{l.phone}</a></Row>
          <Row icon="clock"><span className="font-medium text-heading">Hours:</span> {l.hours}</Row>
          <Row icon="check"><span className="font-medium text-heading">{l.acceptsLabel}:</span> {l.accepts}</Row>
          {l.note && (
            <p className="rounded-[8px] bg-brand-soft px-[16px] py-[12px] text-[13.5px] leading-[21px] text-heading">
              <span className="font-medium">{l.note.strong}</span> {l.note.text}
            </p>
          )}
          <p className="font-roboto text-[14px] leading-[22px] text-muted">{l.body}</p>
        </div>
        <div className="flex flex-col gap-[20px]">
          <span aria-hidden="true" className="h-px w-full bg-[#ebebeb]" />
          <div className="flex flex-col gap-[12px] lg:flex-row">
            <Btn href={viewHref} external={ext} variant="colored" className="max-lg:w-full max-lg:justify-center">{view}</Btn>
            <Btn href={directions(l.address)} external variant="bordered" className="max-lg:w-full max-lg:justify-center">{dir}</Btn>
          </div>
        </div>
      </div>
    </article>
  )
}

function Row({ icon, children }: { icon: 'pin' | 'phone' | 'clock' | 'check'; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-[12px]">
      <Image src={`/images/dropoff/${icon}.svg`} alt="" width={18} height={18} unoptimized className="mt-[2px] size-[18px] shrink-0" />
      <span className="min-w-0 flex-1">{children}</span>
    </p>
  )
}
