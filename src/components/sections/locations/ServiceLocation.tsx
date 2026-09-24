import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero, type Crumb } from '@/components/sections/service/ServiceHero'
import { ClosingCtaBand, CTA_H } from '@/components/sections/ClosingCta'
import { Accordion } from '@/components/client/Accordion'
import { Eyebrow, Lead } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { mapEmbed } from '@/data/facilities'
import { NETWORK_PHONE, SERVICES, SERVICE_SLUGS, type ServiceSlug } from '@/data/service-locations'
import { FOOTER_H } from '@/lib/layout'
import { absolute, href, quoteHref } from '@/lib/urls'
import { US_STATES } from '@/lib/us-address'
import { breadcrumbNode, faqNode, graph } from '@/lib/schema'
import {
  hubH1, isPartnerHub, nearbyPages, pageH1, pageUrl, quoteLink,
  type Locations, type Page, type Site,
} from '@/lib/service-locations'

/**
 * The location based service pages (SEO brief, 24 Sep 2026) and the partner
 * site hubs. No Figma frame exists for these, so they are built from the
 * site's own parts: the interior hero, the eyebrow + heading + lead block,
 * the facility card look from /all-locations/, the accept band's tick, the
 * FAQ accordion and the closing band.
 *
 * FLOW, NOT A FIXED CANVAS. Every page's content is as long as the SEO
 * manager makes it, so these use FlowCanvas like the blog posts do; the hero,
 * the closing band and the footer keep their fixed heights inside boxes of
 * their own (the same trick as ArticleTemplate's footer).
 *
 * The page template follows the brief's outline: H1, intro, location block,
 * what we accept (and not), how it works (packaging, certificate), local
 * rules, reviews, FAQs, related links, CTA. Sections with nothing in them
 * are left out rather than shown empty.
 */

const STATE_NAME = new Map(US_STATES)
const stateName = (code: string) => STATE_NAME.get(code) ?? code
const tel = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`

/* ---------------------------------------------------------------- shared -- */

function Shell({ children, draft, schema }: { children: React.ReactNode; draft: boolean; schema: string }) {
  return (
    <FlowCanvas>
      <Header />
      <main>
        {draft && (
          <p role="note" className="bg-[#fff4d6] px-[20px] py-[10px] text-center font-roboto text-[13px] leading-[1.5] text-[#6b4e00] lg:text-[14px]">
            <strong>Draft.</strong> This page is not published: it is hidden from Google, not in the sitemap and not linked from the site.
          </p>
        )}
        {children}
      </main>
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </FlowCanvas>
  )
}

function Hero(props: React.ComponentProps<typeof ServiceHero>) {
  return (
    <div className="relative lg:h-[470px]">
      <ServiceHero {...props} top={0} />
    </div>
  )
}

function Band({ children, tone = 'white', id }: { children: React.ReactNode; tone?: 'white' | 'grey' | 'mint'; id?: string }) {
  const bg = tone === 'grey' ? 'bg-[#fcfcfc]' : tone === 'mint' ? 'bg-[#f4f9f6]' : 'bg-white'
  return (
    <section id={id} className={`${bg} px-[20px] py-[48px] lg:px-0 lg:py-[90px]`}>
      <div className="mx-auto flex w-full flex-col gap-[28px] lg:w-[1282px] lg:gap-[40px]">{children}</div>
    </section>
  )
}

function Heading({ eyebrow, title, lead, align = 'center' }: { eyebrow: string; title: string; lead?: string; align?: 'center' | 'left' }) {
  const left = align === 'left'
  return (
    <div className={`flex w-full flex-col items-center gap-[12px] text-center lg:gap-[10px] ${left ? 'lg:items-start lg:text-left' : 'lg:mx-auto lg:w-[820px]'}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[38px] lg:leading-[1.25]">{title}</h2>
      {lead && <Lead>{lead}</Lead>}
    </div>
  )
}

function Paras({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => (
        <p key={p.slice(0, 40)} className={`font-roboto text-[15px] leading-[1.6] text-muted lg:text-[16.5px] lg:leading-[1.65] ${className}`}>{p}</p>
      ))}
    </>
  )
}

const PICKUP_TEXT = {
  yes: 'Available for businesses in the area',
  no: 'Not from this site; use drop-off or mail-in',
  ask: 'Call to ask about pickup from this site',
} as const

/** Address, phone, hours, drop-off / pickup / mail-in, map. */
function LocationCard({ site, phone }: { site: Site; phone: string }) {
  const d = site.data
  const rows = [
    { glyph: 'pin' as const, text: d.address },
    { glyph: 'phone' as const, text: phone, href: tel(phone) },
    { glyph: 'clock' as const, text: d.hours },
  ].filter((r) => r.text)
  const ways = [
    { label: 'Drop-off', value: d.dropoff ? 'Accepted at this site' : 'Not at this site', on: d.dropoff },
    { label: 'Pickup', value: PICKUP_TEXT[d.pickup], on: d.pickup === 'yes' },
    { label: 'Mail-in', value: d.mailin ? 'Kits ship anywhere in the US' : 'Not offered', on: d.mailin, link: d.mailin ? href('/mail-in-recycling/') : undefined },
  ]
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white lg:w-[520px] lg:shrink-0">
      <div className="flex items-center gap-[12px] px-[20px] py-[16px] lg:px-[28px] lg:py-[22px]"
        style={{ backgroundImage: 'linear-gradient(163.945deg, #0b1f3a 7.25%, #1b7a3d 79.71%)' }}>
        <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-white/15 lg:size-[48px]">
          <svg viewBox="0 0 16 16" className="size-[18px] fill-white lg:size-[21.6px]" aria-hidden="true"><path d={GLYPHS.pin} /></svg>
        </span>
        <p className="font-sans text-[18px] font-semibold text-white lg:text-[21px]">{d.name === d.city ? d.city : `${d.city}, ${d.state}`}</p>
      </div>
      <div className="flex flex-col gap-[14px] p-[20px] lg:gap-[16px] lg:p-[28px]">
        {rows.map((r) => {
          const inner = (
            <>
              <svg viewBox="0 0 16 16" className="size-[16px] shrink-0 fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS[r.glyph]} /></svg>
              <span className="min-w-px font-poppins text-[13.5px] leading-[1.45] text-[#4d4d4d] lg:text-[14px]">{r.text}</span>
            </>
          )
          return r.href
            ? <a key={r.glyph} href={r.href} className="flex items-center gap-[10px] hover:[&>span]:text-brand lg:gap-[12px]">{inner}</a>
            : <div key={r.glyph} className="flex items-center gap-[10px] lg:gap-[12px]">{inner}</div>
        })}
        <span className="h-px w-full bg-[#ebebeb]" aria-hidden="true" />
        <dl className="grid grid-cols-[max-content_1fr] gap-x-[14px] gap-y-[8px] font-roboto text-[14px] leading-[1.45]">
          {ways.map((w) => (
            <div key={w.label} className="contents">
              <dt className="font-medium text-heading">{w.label}</dt>
              <dd className={w.on ? 'text-[#1b7a3d]' : 'text-muted'}>
                {w.link ? <Link href={w.link} className="underline underline-offset-2 hover:text-brand">{w.value}</Link> : w.value}
              </dd>
            </div>
          ))}
        </dl>
        {d.logistics && <p className="font-roboto text-[14px] leading-[1.55] text-muted">{d.logistics}</p>}
      </div>
      {d.address && (
        <iframe title={`Map of ${d.address}`} src={mapEmbed(d.address, 14)} loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" className="block h-[220px] w-full border-0 border-t border-[#ebebeb]" />
      )}
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-[8px]">
      {items.map((a) => (
        <li key={a} className="flex h-[30px] items-center rounded-full border border-[#e0e0e0] bg-white px-[14px] font-roboto text-[13px] text-[#4d4d4d]">{a}</li>
      ))}
    </ul>
  )
}

function cta(site: Site, svc: ServiceSlug | null, heading: string, phone: string) {
  const q = svc ? quoteLink(site, svc) : { service: '', location: `${site.data.city}, ${site.data.state}` }
  return (
    <div className="relative lg:h-[var(--cta-h)]" style={{ '--cta-h': `${CTA_H}px` } as React.CSSProperties}>
      <ClosingCtaBand content={{
        heading,
        body: [
          `Get a quote for ${svc ? SERVICES[svc].noun : 'your recycling'} in ${site.data.name}, or call ${phone}.`,
          site.data.mailin ? 'Not near the site? The Mail-In Program ships a kit to your door.' : '',
        ].filter(Boolean),
        primary: { label: 'Get a Quote', href: quoteHref(q) },
        secondary: site.data.mailin
          ? { label: 'Order a Mail-In Kit', href: href('/mail-in-recycling/') }
          : { label: `Call ${phone}`, href: tel(phone) },
      }} />
    </div>
  )
}

/* ------------------------------------------------------ service page -- */

export function ServiceLocationPage({ all, site, page }: { all: Locations; site: Site; page: Page }) {
  const s = SERVICES[page.service]
  const d = page.data
  const url = pageUrl(site, page.service)
  const phone = d.trackingPhone || site.data.phone || NETWORK_PHONE
  const h1 = pageH1(site, page)
  const hubName = isPartnerHub(site) ? site.data.name : hubH1(site).replace(/^Recycling in /, '')
  const crumbs: Crumb[] = [
    { label: 'Home', href: href('/') },
    { label: 'Locations', href: href('/all-locations/') },
    { label: hubName, href: site.published ? href(site.hubPath) : null },
    { label: s.name, href: null },
  ]
  const others = SERVICE_SLUGS
    .filter((x) => x !== page.service)
    .map((x) => all.pages.find((p) => p.site === site.slug && p.service === x))
    .filter((p): p is Page => Boolean(p?.published))
  const nearby = nearbyPages(all, site, page.service)
  const lead = [
    site.data.dropoff && site.data.address ? `Drop-off at ${site.data.address}.` : '',
    site.data.pickup === 'yes' ? 'Business pickup available.' : '',
    site.data.mailin ? 'Mail-in kits ship nationwide.' : '',
  ].filter(Boolean).join(' ')

  const schemaNodes: Record<string, unknown>[] = [
    breadcrumbNode([
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/all-locations/' },
      { name: hubName, url: site.hubPath },
      { name: s.name, url },
    ]),
    serviceLocationNode(site, page, url),
  ]
  if (d.faqs.length) schemaNodes.push(faqNode(d.faqs))

  return (
    <Shell draft={!page.published} schema={graph(...schemaNodes)}>
      <Hero
        crumbs={crumbs} h1={h1} lead={lead}
        cta={{ label: 'Get a Quote', href: quoteHref(quoteLink(site, page.service)) }}
        secondaryCta={{ label: `Call ${phone}`, href: tel(phone) }}
      />

      {/* Intro + location block */}
      <Band>
        <div className="flex w-full flex-col gap-[28px] lg:flex-row lg:items-start lg:justify-between lg:gap-[80px]">
          <div className="flex w-full flex-col items-center gap-[16px] text-center lg:items-start lg:text-left">
            <Eyebrow>{`${s.name} · ${site.data.city}, ${site.data.state}`}</Eyebrow>
            <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[36px] lg:leading-[1.25]">
              {`Recycle ${s.noun} in ${site.data.name}`}
            </h2>
            {d.intro
              ? <Paras text={d.intro} />
              : <p className="font-roboto text-[15px] leading-[1.6] text-muted">{`Intro for ${h1} not written yet.`}</p>}
            {d.audiences.length > 0 && (
              <div className="flex flex-col items-center gap-[10px] pt-[6px] lg:items-start">
                <p className="font-sans text-[15px] font-semibold text-heading">Who this is for</p>
                <Chips items={d.audiences} />
              </div>
            )}
          </div>
          <LocationCard site={site} phone={phone} />
        </div>
      </Band>

      {/* What we accept */}
      {d.accepted.length > 0 && (
        <Band tone="grey" id="accepted">
          <Heading eyebrow="What We Accept" title={`${capital(s.noun)} accepted in ${site.data.city}`}
            lead="Accepted at this site. Not sure about an item? Call before you come." />
          <ul className="grid w-full grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]">
            {d.accepted.map((a) => (
              <li key={a.label + a.text} className="flex items-start gap-[14px] rounded-[14px] border border-[#e6e6e6] bg-white p-[18px] lg:p-[22px]">
                <Image src="/images/icons/accept-tick.png" alt="" width={60} height={55} className="h-[27.6px] w-[30px] shrink-0" />
                <span className="flex flex-col gap-[4px]">
                  <span className="font-sans text-[17px] font-semibold text-heading">{a.label}</span>
                  {a.text && <span className="font-roboto text-[14.5px] leading-[1.5] text-muted">{a.text}</span>}
                </span>
              </li>
            ))}
          </ul>
          {d.notAccepted.length > 0 && (
            <div className="w-full rounded-[14px] border border-[#f1d9d9] bg-[#fff8f8] p-[18px] lg:p-[24px]">
              <p className="mb-[10px] font-sans text-[16px] font-semibold text-heading">Not accepted at this site</p>
              <ul className="list-disc pl-[20px] font-roboto text-[14.5px] leading-[1.6] text-muted">
                {d.notAccepted.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          )}
        </Band>
      )}

      {/* How it works */}
      {(d.steps.length > 0 || d.packaging.length > 0 || d.certificate) && (
        <Band id="how-it-works">
          <Heading eyebrow="How It Works" title={`How ${s.name.toLowerCase()} works here`} />
          {d.steps.length > 0 && (
            <ol className="grid w-full grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-4 lg:gap-[20px]">
              {d.steps.map((st, i) => (
                <li key={st.label + i} className="flex flex-col gap-[10px] rounded-[14px] bg-[#f4f9f6] p-[20px] lg:p-[24px]">
                  <span className="grid size-[36px] place-items-center rounded-full bg-brand font-sans text-[16px] font-semibold text-white">{i + 1}</span>
                  <span className="font-sans text-[17px] font-semibold text-heading">{st.label}</span>
                  <span className="font-roboto text-[14.5px] leading-[1.55] text-muted">{st.text}</span>
                </li>
              ))}
            </ol>
          )}
          {(d.packaging.length > 0 || d.certificate) && (
            <div className="grid w-full grid-cols-1 gap-[14px] lg:grid-cols-2 lg:gap-[20px]">
              {d.packaging.length > 0 && (
                <div className="rounded-[14px] border border-[#e6e6e6] p-[20px] lg:p-[24px]">
                  <p className="mb-[10px] font-sans text-[17px] font-semibold text-heading">Packing safely</p>
                  <ul className="list-disc pl-[20px] font-roboto text-[14.5px] leading-[1.6] text-muted">
                    {d.packaging.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              )}
              {d.certificate && (
                <div className="rounded-[14px] border border-[#e6e6e6] p-[20px] lg:p-[24px]">
                  <p className="mb-[10px] font-sans text-[17px] font-semibold text-heading">Certificate of recycling</p>
                  <p className="font-roboto text-[14.5px] leading-[1.6] text-muted">{d.certificate}</p>
                </div>
              )}
            </div>
          )}
        </Band>
      )}

      {/* Local rules — only once written; verified is on the checklist */}
      {d.compliance && (
        <Band tone="mint" id="local-rules">
          <Heading eyebrow="Local Rules" title={`${s.name} rules in ${stateName(site.data.state)}`} />
          <div className="mx-auto flex w-full flex-col gap-[14px] lg:w-[900px]">
            <Paras text={d.compliance} />
            {(d.complianceVerifiedBy || d.complianceSource) && (
              <p className="font-roboto text-[13px] leading-[1.5] text-muted">
                {d.complianceVerifiedBy && <>Reviewed by {d.complianceVerifiedBy}{d.complianceVerifiedAt && `, ${fmtDate(d.complianceVerifiedAt)}`}. </>}
                {d.complianceSource && /^https?:\/\//.test(d.complianceSource)
                  ? <a href={d.complianceSource} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">Source</a>
                  : d.complianceSource}
              </p>
            )}
          </div>
        </Band>
      )}

      {/* Reviews — real ones only; the section is absent until there are some */}
      {d.reviews.length > 0 && (
        <Band tone="grey" id="reviews">
          <Heading eyebrow="Reviews" title={`What customers near ${site.data.city} say`} />
          <ul className="grid w-full grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]">
            {d.reviews.map((r) => (
              <li key={r.quote.slice(0, 40)} className="flex flex-col gap-[12px] rounded-[14px] border border-[#e6e6e6] bg-white p-[20px] lg:p-[24px]">
                <p className="font-roboto text-[15px] leading-[1.6] text-[#4d4d4d]">&ldquo;{r.quote}&rdquo;</p>
                {(r.author || r.place) && <p className="font-sans text-[14px] font-semibold text-heading">{[r.author, r.place].filter(Boolean).join(', ')}</p>}
              </li>
            ))}
          </ul>
        </Band>
      )}

      {/* FAQs */}
      {d.faqs.length > 0 && (
        <Band tone="mint" id="faqs">
          <Heading eyebrow="FAQs" title={`${s.name} in ${site.data.name}: questions`} />
          <div className="mx-auto w-full lg:w-[780px]">
            <Accordion items={d.faqs} gap={15} idPrefix="loc-faq" />
          </div>
        </Band>
      )}

      {/* Related links */}
      <Band id="related">
        <Heading eyebrow="Related" title="More recycling options" />
        <div className="grid w-full grid-cols-1 gap-[14px] lg:grid-cols-3 lg:gap-[20px]">
          <LinkList title={`More at ${site.data.name === site.data.city ? site.data.city : site.data.name}`} links={[
            ...(site.published ? [{ label: isPartnerHub(site) ? `All recycling in ${site.data.name}` : `${site.data.name} facility`, href: site.hubPath }] : []),
            ...others.map((p) => ({ label: SERVICES[p.service].name, href: pageUrl(site, p.service) })),
          ]} />
          <LinkList title={`${s.name} nearby`} links={nearby.map((n) => ({
            label: `${n.site.data.name}${n.miles !== null ? ` (${n.miles} mi)` : ''}`, href: pageUrl(n.site, page.service),
          }))} empty="Other locations for this service are listed on the locations page." />
          <LinkList title="Other ways to recycle" links={[
            { label: `${s.name} overview`, href: s.hub },
            { label: 'Mail-In Recycling Program', href: '/mail-in-recycling/' },
            { label: 'All locations', href: '/all-locations/' },
          ]} />
        </div>
      </Band>

      {cta(site, page.service, `Ready to recycle ${s.noun} in ${site.data.city}?`, phone)}
    </Shell>
  )
}

function LinkList({ title, links, empty }: { title: string; links: { label: string; href: string }[]; empty?: string }) {
  return (
    <div className="flex flex-col gap-[12px] rounded-[14px] border border-[#e6e6e6] p-[20px] lg:p-[24px]">
      <p className="font-sans text-[17px] font-semibold text-heading">{title}</p>
      {links.length > 0 ? (
        <ul className="flex flex-col gap-[8px]">
          {links.map((l) => (
            <li key={l.href}><Link href={href(l.href)} className="font-roboto text-[15px] text-brand underline-offset-2 hover:underline">{l.label}</Link></li>
          ))}
        </ul>
      ) : (
        <p className="font-roboto text-[14px] leading-[1.5] text-muted">
          {empty ?? 'Nothing here yet.'} <Link href={href('/all-locations/')} className="text-brand underline underline-offset-2">See all locations</Link>
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------ partner hub page -- */

export function SiteHubPage({ all, site }: { all: Locations; site: Site }) {
  const d = site.data
  const phone = d.phone || NETWORK_PHONE
  const pages = SERVICE_SLUGS.map((svc) => all.pages.find((p) => p.site === site.slug && p.service === svc)).filter((p): p is Page => Boolean(p?.offered))
  const crumbs: Crumb[] = [
    { label: 'Home', href: href('/') },
    { label: 'Locations', href: href('/all-locations/') },
    { label: d.name, href: null },
  ]
  const lead = [
    d.dropoff && d.address ? `Drop-off at ${d.address}.` : '',
    d.mailin ? 'Mail-in kits ship nationwide.' : '',
  ].filter(Boolean).join(' ')
  const schema = graph(
    breadcrumbNode([{ name: 'Home', url: '/' }, { name: 'Locations', url: '/all-locations/' }, { name: d.name, url: site.hubPath }]),
    placeNode(site),
  )

  return (
    <Shell draft={!site.published} schema={schema}>
      <Hero crumbs={crumbs} h1={hubH1(site)} lead={lead}
        cta={{ label: 'Get a Quote', href: quoteHref({ location: `${d.city}, ${d.state}` }) }}
        secondaryCta={{ label: `Call ${phone}`, href: tel(phone) }} />

      <Band>
        <div className="flex w-full flex-col gap-[28px] lg:flex-row lg:items-start lg:justify-between lg:gap-[80px]">
          <div className="flex w-full flex-col items-center gap-[16px] text-center lg:items-start lg:text-left">
            <Eyebrow>Drop-Off Location</Eyebrow>
            <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[36px] lg:leading-[1.25]">{`Recycling in ${d.name}`}</h2>
            {d.intro ? <Paras text={d.intro} /> : <p className="font-roboto text-[15px] text-muted">Intro for this site not written yet.</p>}
            {d.nearby.length > 0 && (
              <div className="flex flex-col items-center gap-[10px] pt-[6px] lg:items-start">
                <p className="font-sans text-[15px] font-semibold text-heading">Also serving</p>
                <Chips items={d.nearby} />
              </div>
            )}
          </div>
          <LocationCard site={site} phone={phone} />
        </div>
      </Band>

      <Band tone="grey" id="services">
        <Heading eyebrow="Services At This Site" title={`What you can recycle in ${d.city}`} />
        <ul className="grid w-full grid-cols-1 gap-[14px] lg:grid-cols-3 lg:gap-[20px]">
          {pages.map((p) => {
            const svc = SERVICES[p.service]
            const body = (
              <>
                <span className="font-sans text-[19px] font-semibold text-heading">{svc.name}</span>
                <span className="font-roboto text-[14.5px] leading-[1.55] text-muted">
                  {p.data.accepted.slice(0, 3).map((a) => a.label).join(', ')}{p.data.accepted.length > 3 ? ' and more.' : '.'}
                </span>
                {p.published && <span className="font-roboto text-[14.5px] font-medium text-brand">See details &rarr;</span>}
              </>
            )
            return (
              <li key={p.service}>
                {p.published
                  ? <Link href={href(pageUrl(site, p.service))} className="flex h-full flex-col gap-[10px] rounded-[14px] border border-[#e6e6e6] bg-white p-[22px] transition-shadow hover:shadow-[0_10px_28px_rgba(13,39,80,0.12)]">{body}</Link>
                  : <div className="flex h-full flex-col gap-[10px] rounded-[14px] border border-[#e6e6e6] bg-white p-[22px]">{body}</div>}
              </li>
            )
          })}
        </ul>
      </Band>

      {cta(site, null, `Recycling in ${d.city}? Get a quote`, phone)}
    </Shell>
  )
}

/* ---------------------------------------------------------------- schema -- */

function postal(site: Site) {
  const m = site.data.address.match(/^(.*?),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})/)
  return {
    '@type': 'PostalAddress',
    ...(m ? { streetAddress: m[1], addressLocality: m[2], addressRegion: m[3], postalCode: m[4] } : { streetAddress: site.data.address }),
    addressCountry: 'US',
  }
}

/**
 * The service at this place. For our own facilities (Minnesota, Wisconsin)
 * the provider is the facility's LocalBusiness from the root layout's graph;
 * for a partner drop-off site it is Recycle Technologies, available AT a
 * Place — a partner site is not our business, and LocalBusiness markup
 * claiming it would be exactly the kind of claim the brief warns against.
 */
function serviceLocationNode(site: Site, page: Page, url: string): Record<string, unknown> {
  const facilityId = site.slug === 'minnesota' ? '#blaine-99th' : site.slug === 'wisconsin' ? '#new-berlin' : null
  return {
    '@type': 'Service',
    '@id': `${absolute(url)}#service`,
    name: pageH1(site, page),
    serviceType: SERVICES[page.service].name,
    provider: { '@id': `${absolute('/')}${facilityId ?? '#organization'}` },
    areaServed: [
      { '@type': 'City', name: site.data.city, containedInPlace: { '@type': 'State', name: stateName(site.data.state) } },
      ...site.data.nearby.map((n) => ({ '@type': 'City', name: n })),
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: page.data.trackingPhone || site.data.phone,
      serviceLocation: { '@type': 'Place', name: `${site.data.city}, ${site.data.state} drop-off`, address: postal(site) },
    },
    url: absolute(url),
  }
}

function placeNode(site: Site): Record<string, unknown> {
  return {
    '@type': 'Place',
    '@id': `${absolute(site.hubPath)}#place`,
    name: `Recycling drop-off, ${site.data.name}`,
    address: postal(site),
    ...(site.data.phone ? { telephone: site.data.phone } : {}),
  }
}

function capital(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
function fmtDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}
