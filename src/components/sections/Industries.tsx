import { Box, CenterBox, Section } from '@/components/design/Frame'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { INDUSTRIES } from '@/data/home'
import { IndustryCard } from '@/components/ui/IndustryCard'

/**
 * Industries We Serve — Figma 6023:12500. 1920x887 on #f8faf9.
 * Cards 310x226, two rows of four, gap 14, grid starts x319.33 y312.78.
 *
 * Cards are NOT linked: none of these pages exist on the live site yet, and
 * linking to URLs that 404 wastes crawl budget and fails the link-integrity
 * gate. Add hrefs once the industry pages are built.
 */
export function Industries() {
  return (
    <Section top={2689 - HOME_BELOW_SERVICES_SHIFT} height={887} label="6023:12500" className="bg-mist">
      <CenterBox y={80} w={400} className="flex justify-center"><Eyebrow>Who We Serve</Eyebrow></CenterBox>
      <CenterBox y={125} w={600}><Title className="text-center">Industries We Serve</Title></CenterBox>
      <CenterBox y={199} w={857}>
        <Lead className="text-center">
          From corporate facilities to schools and healthcare networks, we provide reliable
          recycling, secure shredding, ITAD, and data destruction solutions for organizations
          with different waste and equipment needs.
        </Lead>
      </CenterBox>

      <Box x={319.33} y={312.78} w={1282} className="flex flex-col gap-[12px]">
        {[INDUSTRIES.slice(0, 4), INDUSTRIES.slice(4)].map((row, r) => (
          <div key={r} className="flex items-center gap-[14px]">
            {row.map((ind) => (
              <IndustryCard key={ind.t} ind={ind} />
            ))}
          </div>
        ))}
      </Box>
    </Section>
  )
}
