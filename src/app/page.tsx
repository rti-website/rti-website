import { Canvas } from '@/components/design/Frame'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
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
 *   Our Services    6107:1552      y1679   h860   (x319, w1282)
 *   Industries      6023:12500     y2689   h887
 *   How It Works    6040:18591     y3726   h559
 *   Why Choose Us   6065:21652     y4435   h532   (x320, w1280)
 *   Locations       6024:14077     y5117   h1472
 *   Testimonials    6024:14149     y6739   h594
 *   Case Studies    6026:14726     y7483   h885
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
    <Canvas height={10391 - HOME_BELOW_CERT_SHIFT - 60}>
      <Header />
      <main>
        <Hero />
        <Certifications />
        <OurServices />
        <Industries />
        <HowItWorks />
        <WhyChooseUs />
        <Locations />
        <Testimonials />
        <CaseStudies />
        <FaqCtaFooter />
      </main>
    </Canvas>
  )
}
