import Image from 'next/image'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { href } from '@/lib/urls'

/**
 * Why Choose Recycle Technologies — Figma 6065:21652. 1280x532 at x320, r40.
 *
 * TODO(content): the design repeats "92% / Diversion Rate" in all four stat
 * cards. Three are placeholders — replace before launch.
 */
const STATS = [
  { x: 0,      y: 0,     v: '92%', l: 'Diversion Rate' },
  { x: 288.94, y: 0,     v: '92%', l: 'Diversion Rate' },
  { x: 0,      y: 177.4, v: '92%', l: 'Diversion Rate' },
  { x: 288.94, y: 177.4, v: '92%', l: 'Diversion Rate' },
]

export function WhyChooseUs() {
  return (
    <Section top={4435 - HOME_BELOW_CERT_SHIFT} left={320} width={1280} height={532} label="6065:21652" className="rounded-[40px]">
      <Box x={0} y={0} w={1280} h={532}>
        <Image src="/images/home/why-bg.png" alt="" fill sizes="1280px" className="object-cover" />
      </Box>
      <Box x={0} y={0} w={1280} h={532} className="bg-[rgba(8,46,83,0.75)]" />
      <Box x={0} y={0} w={1280} h={532}
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 100%)' }} />

      <Box x={56} y={37} w={501}>
        <h2 className="font-sans text-[40px] font-semibold leading-[44.7px] text-white">
          Why Choose<br />Recycle Technologies?
        </h2>
      </Box>

      <Box x={56} y={146} w={571}>
        <p className="font-roboto text-[17.018px] leading-[27.654px] text-white/80">
          With over 30 years of experience, Recycle Technologies provides responsible
          electronics recycling, IT asset recycling, and document shredding across the
          Midwest. We are the region&rsquo;s only minority-owned document destruction and
          recycling company, backed by R2v3-certified facilities in Minnesota, Wisconsin,
          and Chicago.
        </p>
        <p className="pt-[27.654px] font-roboto text-[17.018px] leading-[27.654px] text-white/80">
          Our convenient local and nationwide mail-in recycling options make electronics
          recycling near you simple, secure, and environmentally responsible.
        </p>
      </Box>

      <Box x={56} y={423}>
        <Btn href={href('/quote/')} variant="whiteFill" className="w-[210px] justify-center">Get a Free Estimate</Btn>
      </Box>
      <Box x={272} y={424}>
        <Btn href={href('/about-us-commercial-recycling-solutions/')} variant="white">Read More About Us</Btn>
      </Box>

      {/* Stat grid — 6065:21680 at x667, vertically centred, 563x343.9 */}
      <Box x={667} y={94} w={563} h={343.908}>
        {STATS.map((s, i) => (
          <div
            key={i}
            className="absolute flex h-[166.51px] w-[274.064px] flex-col items-center justify-center gap-[4px] rounded-[12.747px] border-[1.062px] border-white/40 bg-white/10"
            style={{ left: s.x, top: s.y }}
          >
            <Image src="/images/icons/stat-icon.svg" alt="" width={30} height={26} />
            <p className="font-sans text-[23.37px] font-bold leading-[35.055px] tracking-[-0.4674px] text-white">{s.v}</p>
            <p className="font-roboto text-[11.685px] leading-[14.606px] text-white">{s.l}</p>
          </div>
        ))}
      </Box>
    </Section>
  )
}
