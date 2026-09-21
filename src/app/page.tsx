import { Canvas } from '@/components/design/Frame'
import { HOME_BELOW_CERT_SHIFT, HOME_CASES_GROWTH, HOME_SERVICES_DELTA_VAR, HOME_SERVICES_GROWTH, HOME_TESTIMONIALS_GROWTH } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Certifications } from '@/components/sections/Certifications'
import { OurServices } from '@/components/sections/OurServices'
import { Industries } from '@/components/sections/Industries'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Locations } from '@/components/sections/Locations'
import { Testimonials } from '@/components/sections/Testimonials'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { FaqCtaFooter } from '@/components/sections/FaqCtaFooter'

/**
 * Homepage — a 1:1 build of Figma frame 6023:3801 (1920 x 10391).
 *
 * Section offsets, all taken from the Figma canvas:
 *   Header          6107:2737      y0      h140
 *   Hero            6023:13152     y140    h940
 *   Certifications  6044:19732     y1080   h449
 *   Our Services    6532:2049      y1679   h1133  (x319, w1282) — was 6107:1552, 860; below moves +273
 *   Industries      6023:12500     y2689   h887
 *   How It Works    6040:18591     y3726   h559
 *   Why Choose Us   6065:21652     y4435   h532   (x320, w1280)
 *   Locations       6024:14077     y5117   h1472
 *   Testimonials    6024:14149     y6739   h826   — four cards + stats (file L79…); was 594; below moves +232 more
 *   Case Studies    6557:12903     y7483   h934   — was 6026:14726, 885; below moves +49 more
 *   FAQ/CTA/Footer  6044:20133     y8518   h1873
 *
 * Title and meta description are VERBATIM from the live homepage, captured
 * 15 Sep 2026. Per the migration plan they are not rewritten at launch.
 *
 * !! H1 CONFLICT !! The live H1 is "PAVE THE WAY For A CLEANER FUTURE"; the
 * redesign's is "Recycle Responsibly. Protect the Planet. Build a Cleaner
 * Tomorrow." The migration plan requires H1s ported verbatim and the staging
 * crawl diffs them, so this will surface as a blocking difference at gate 2.
 */
export const metadata = buildMetadata({
  url: '/',
  title: 'E-Waste, Electronics & Industrial Recycling Services',
  description:
    'Full-service recycling facility for businesses handling e-waste, electronics, metals, bulbs, batteries, data destruction and logistics. Call (800) 969-5166.',
})

export default function HomePage() {
  return (
    <Canvas height={10391 + HOME_SERVICES_GROWTH + HOME_TESTIMONIALS_GROWTH + HOME_CASES_GROWTH - HOME_BELOW_CERT_SHIFT - 60} grow={HOME_SERVICES_DELTA_VAR}>
      <Header />
      <main>
        <Hero />
        <Certifications />
        <OurServices />
        {/* Everything under Our Services rides one positioned wrapper whose
            top is the open tab's height difference (see OurServices), so a
            one-row tab pulls the rest of the page up instead of leaving a
            gap. The sections keep their own pinned tops inside it. */}
        <div
          className="absolute inset-x-0 transition-[top] duration-300 ease-out"
          style={{ top: `var(${HOME_SERVICES_DELTA_VAR}, 0px)` }}
        >
          <Industries />
          <HowItWorks />
          <WhyChooseUs />
          <Locations />
          <Testimonials />
          <CaseStudies />
          <FaqCtaFooter />
        </div>
      </main>
    </Canvas>
  )
}
