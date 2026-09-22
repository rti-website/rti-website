import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { FlowCanvas } from '@/components/design/Frame'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'

/**
 * The 404 page.
 *
 * Returns a real HTTP 404. A 200 page that says "not found" is a soft 404 and
 * Google treats it as a quality problem — that part was already right.
 *
 * !! IT USED TO BE AN UNSTYLED <h1> AND TWO <a> TAGS. On a site with ~600
 * migrating URLs this is the page a crawler and a person both land on whenever
 * a redirect is missed, and it had no header, no footer, no styling and no way
 * back into the site except two raw links. Rebuilt in the end-to-end QA,
 * 17 Sep 2026, with the same chrome as every other page.
 *
 * The two <a href> tags were also flagged by the new lint run
 * (next/no-html-link-for-pages): a bare <a> to an internal route throws away
 * the prefetched client navigation and reloads the whole document.
 *
 * FlowCanvas rather than Canvas: there is no Figma frame for this page and no
 * designer-decided height, so it sits in normal flow like /faqs/ and the post
 * template. The Footer still needs its own relative box of exactly FOOTER_H.
 */

const LINKS = [
  { label: 'Services',      to: '/services/',   blurb: 'Recycling, shredding and data destruction.' },
  { label: 'Industries',    to: '/industries/', blurb: 'What we do for healthcare, finance, education and more.' },
  { label: 'Locations',     to: '/all-locations/', blurb: 'Facilities and service areas across the Midwest.' },
  { label: 'Resources',     to: '/resources/',  blurb: 'Guides, downloads and recycling how-tos.' },
  { label: 'Blog',          to: '/blog/',       blurb: 'Every article we have published.' },
  { label: 'Contact us',    to: '/contact-us/', blurb: 'Talk to someone about a pickup or a quote.' },
]

export default function NotFound() {
  return (
    <FlowCanvas>
      <Header />
      <main>
        <div className="relative overflow-hidden bg-navy py-[48px] lg:h-[380px] lg:py-0">
          <InteriorHeroArt />
          <div className="relative flex h-full flex-col justify-center px-[20px] lg:px-[319px]">
            <span className="font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px] text-white/50">
              Error 404
            </span>
            <h1 className="mt-[18px] font-sans text-[32px] font-semibold leading-[40px] text-white lg:text-[60px] lg:leading-[74.7px]">
              We could not find that page
            </h1>
            <p className="mt-[14px] w-full font-roboto text-[16px] leading-[24px] text-white/70 lg:w-[620px] lg:text-[20px] lg:leading-[30.031px]">
              The address may have changed, or the page may have been retired. Everything below is
              still where it should be.
            </p>
          </div>
        </div>

        <section className="bg-white px-[20px] py-[48px] lg:px-0 lg:py-[90px]">
          <div className="mx-auto grid w-full grid-cols-1 gap-[16px] lg:w-[1280px] lg:grid-cols-3 lg:gap-[24px]">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                href={href(l.to)}
                className="post-card flex flex-col rounded-[12px] border border-[#e5e5e5] bg-white p-[24px] hover:shadow-[0_10px_28px_rgba(13,39,80,0.18)] lg:p-[29px]"
              >
                <span className="post-card__title font-sans text-[20px] font-medium leading-[1.3] text-[#132119] transition-colors">
                  {l.label}
                </span>
                <span className="post-card__date mt-[10px] font-roboto text-[15px] leading-[1.5] text-muted transition-colors">
                  {l.blurb}
                </span>
                <span className="post-card__read mt-auto pt-[18px] font-roboto text-[13px] font-medium text-brand transition-colors">
                  Go &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* lg-only: the footer is 681 design px on the board and about 1486 on a
          phone, so a fixed box would end long before the footer does. */}
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
    </FlowCanvas>
  )
}
