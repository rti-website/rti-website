import Image from 'next/image'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { STEPS } from '@/data/home'
import { href } from '@/lib/urls'

/** How It Works — Figma 6040:18591. Steps at x319 / 666 / 1013 / 1360, y218.81. */
const X: readonly number[] = [319, 666, 1013, 1360]

export function HowItWorks() {
  return (
    <Section top={3726 - HOME_BELOW_CERT_SHIFT} height={559} label="6040:18591" className="bg-white">
      <CenterBox y={0} w={400} offset={-0.47} className="flex justify-center"><Eyebrow>Simple &amp; Secure</Eyebrow></CenterBox>
      <CenterBox y={52} w={500}><Title className="text-center">How It Works</Title></CenterBox>
      <CenterBox y={126} w={594}>
        <Lead className="text-center">
          Responsible recycling made simple — from ordering your kit to receiving your
          recycling documentation.
        </Lead>
      </CenterBox>

      {/* connectors — 6044:18843/18845/18846 at y274, x569 / 916 / 1263 */}
      {[569, 916, 1263].map((x) => (
        <Box key={x} x={x} y={270} w={88} h={8}>
          <Image src="/images/icons/step-arrow.png" alt="" width={88} height={8} className="size-full object-contain" />
        </Box>
      ))}

      {STEPS.map((s, i) => (
        <Box key={s.n} x={X[i] ?? 319} y={218.81} w={240} className="flex flex-col items-center gap-[30px]">
          <div className="relative h-[95.72px] w-[94px]">
            <div className="absolute left-[4.59px] top-[6.3px] grid size-[89.415px] place-items-center rounded-[5.732px] border border-dashed border-black">
              <Image src={s.glyph} alt="" width={53} height={53} className="size-[52.732px]" />
            </div>
            <div className="absolute left-0 top-0 size-[25.793px]">
              <Image src="/images/icons/step-badge.svg" alt="" fill className="object-contain" />
              <span className="absolute inset-0 grid place-items-center font-condensed text-[18.043px] font-semibold leading-[1.25] text-white">
                {s.n}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[12px] text-center">
            <h3 className="font-sans text-[20px] font-semibold leading-[1.25] text-ink">{s.t}</h3>
            <p className="w-[240px] font-roboto text-[16px] leading-[20px] text-muted">{s.b}</p>
          </div>
        </Box>
      ))}

      <CenterBox y={511} w={700} offset={13.78} className="flex items-center justify-center gap-[12px]">
        <Btn href={href('/it-asset-disposition/')} variant="colored">Learn Complete Process</Btn>
        <Btn href={href('/quote/')} variant="coloredWhite">Get a Free Quote</Btn>
      </CenterBox>
    </Section>
  )
}
