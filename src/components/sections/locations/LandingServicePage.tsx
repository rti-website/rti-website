import Image from 'next/image'
import Link from 'next/link'
import { FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { CaseStudies, CASE_STUDIES_H } from '@/components/sections/CaseStudies'
import { CertificationsBand } from '@/components/sections/services/CertificationsBand'
import { Band, Cta, Faq, HeroBtn } from '@/components/sections/locations/LocalServicePage'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import type { LandingPage, Photo } from '@/data/local-pages/types'

/**
 * The Google Ads landing pages of 30 Sep 2026 (Figma BVtf2AOuUOcYbiMIlcKmbC;
 * copy in src/data/landing-pages/). The location pages' kit (LocalServicePage)
 * with a split hero beside a photo, a stats strip, a text-and-photo "What's …"
 * section, the shared certifications band and Client's Stories.
 *
 *   hero      px319 py80, text and a 560 x 420 photo 64 apart; H1 48 (phone:
 *             stacked and centred, H1 28, the photo 350 x 230 under the text)
 *   stats     #f4f9f6, py36, four columns: 26px teal value over 14px grey
 *             (phone py28, two a row, 20px values)
 *   about     py70, the heading and text beside the photo (phone: heading,
 *             text, photo, centred)
 *
 * The two shared bands are pinned-canvas sections (a `top` and a height), so
 * each sits in a box of its own height here, as the footer does.
 */
const CERT_H = 360

export function LandingServicePage({ page }: { page: LandingPage }) {
  const schema = graph(
    breadcrumbNode([{ name: 'Home', url: href('/') }, { name: page.hero.crumb, url: page.url }]),
    serviceNode({ name: page.schema.service, url: page.url, description: page.seo.description, areaServed: page.schema.areaServed }),
    faqNode(page.faq.items),
  )
  const h = page.hero
  return (
    <FlowCanvas>
      <Header />
      <main>
        <section className="px-[20px] py-[40px] lg:px-0 lg:py-[80px]" style={{ backgroundImage: HERO_BG }}>
          <div className="mx-auto flex w-full flex-col items-center gap-[16px] lg:w-[1282px] lg:flex-row lg:gap-[64px]">
            <div className="flex w-full flex-col items-center gap-[12px] text-center lg:min-w-px lg:flex-1 lg:items-start lg:gap-[18px] lg:text-left">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center justify-center gap-x-[8px] font-sans text-[11px] font-bold leading-[normal] text-white lg:text-[13px]">
                  <li><Link href={href('/')} className="hover:underline">Home</Link></li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page">{h.crumb}</li>
                </ol>
              </nav>
              <h1 className="font-sans text-[28px] font-semibold leading-[normal] text-white lg:text-[48px]">{h.h1}</h1>
              {h.body.map((t) => <p key={t} className="font-sans text-[14px] leading-[normal] text-white lg:text-[17px]">{t}</p>)}
              <div className="flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:gap-[16px]">
                <HeroBtn link={h.primary} filled />
                <HeroBtn link={h.secondary} />
              </div>
            </div>
            <PhotoBox photo={h.image} priority />
          </div>
        </section>

        <section className="bg-[#f4f9f6] px-[20px] py-[28px] lg:px-0 lg:py-[36px]">
          <dl className="mx-auto grid w-full grid-cols-2 gap-x-[24px] gap-y-[20px] text-center lg:w-[1282px] lg:grid-cols-4 lg:gap-[24px]">
            {page.stats.map((s) => (
              <div key={s.value} className="flex flex-col-reverse items-center gap-[4px]">
                <dt className="font-sans text-[14px] leading-[normal] text-[#7e7e7e]">{s.label}</dt>
                <dd className="font-sans text-[20px] font-semibold leading-[normal] text-brand lg:text-[26px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section data-figma={page.about.figma} className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
          <div className="mx-auto flex w-full flex-col items-center gap-[20px] lg:w-[1282px] lg:flex-row lg:gap-[64px]">
            <div className="flex w-full flex-col items-center gap-[14px] text-center lg:min-w-px lg:flex-1 lg:items-start lg:gap-[18px] lg:text-left">
              <h2 className="font-sans text-[21px] font-semibold leading-[normal] text-[#132119] lg:text-[32px]">{page.about.heading}</h2>
              {page.about.body.map((t) => <p key={t} className="font-sans text-[14px] leading-[normal] text-[#474747] lg:text-[16px]">{t}</p>)}
            </div>
            <PhotoBox photo={page.about.image} />
          </div>
        </section>

        {page.bands.map((b) => <Band key={b.figma} band={b} />)}

        <div className="relative lg:h-[var(--cert-h)]" style={{ '--cert-h': `${CERT_H}px` } as React.CSSProperties}>
          <CertificationsBand top={0} height={CERT_H} label="landing-certifications" body={page.certBody} />
        </div>
        <div className="relative lg:h-[var(--cs-h)]" style={{ '--cs-h': `${CASE_STUDIES_H}px` } as React.CSSProperties}>
          <CaseStudies top={0} label="landing-case-studies" />
        </div>

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

const HERO_BG = [
  'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
  'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
  'linear-gradient(90deg, #0b1f3a 0%, #0b1f3a 100%)',
].join(', ')

/**
 * The frame's image box: 560 x 420 on the board, 350 x 230 on the phone,
 * r12 on #eaf4f5. The photo layer is placed as the board draws it (some are
 * a 16:9 shot larger than the box, anchored top left), scaled to the phone's
 * box by width.
 */
function PhotoBox({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
  const pct = (v: number, of: number) => `${(v / of) * 100}%`
  return (
    <div className="relative h-[230px] w-full max-w-[350px] shrink-0 overflow-hidden rounded-[12px] bg-[#eaf4f5] lg:h-[420px] lg:w-[560px] lg:max-w-none">
      <div className="absolute" style={{ left: pct(photo.left, 560), top: pct(photo.top, 420), width: pct(photo.w, 560), height: pct(photo.h, 420) }}>
        <Image src={photo.src} alt="" fill priority={priority} sizes="(min-width: 1024px) 970px, 610px" className="object-cover" />
      </div>
    </div>
  )
}
