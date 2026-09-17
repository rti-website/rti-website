import Image from 'next/image'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import Link from 'next/link'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { CASE_STUDIES } from '@/data/home'
import { href } from '@/lib/urls'

/**
 * Client's Stories — Figma 6026:14726 on the homepage, 6146:2403 on the
 * service detail pages. Byte-identical frames, so one component with a `top`.
 * Three 413x540 cards at y224.
 *
 * TODO(content): all three carry the same placeholder headline and the
 * "Technology" tag in the design. Real case studies are still to be written —
 * the content tracker has a Case Studies doc but no per-story copy.
 */
export function CaseStudies({ top = 7483 - HOME_BELOW_CERT_SHIFT, label = '6026:14726' }: {
  top?: number
  label?: string
} = {}) {
  return (
    <Section top={top} height={885} label={label} className="bg-white">
      <CenterBox y={0} w={400} offset={0.18} className="flex justify-center"><Eyebrow>Case Studies</Eyebrow></CenterBox>
      <CenterBox y={52} w={645}><Title className="text-center">Client&rsquo;s Stories</Title></CenterBox>
      <CenterBox y={126} w={614}>
        <Lead className="text-center">
          Real results from real partnerships. See how organizations simplify ITAD,
          strengthen data security, and recover value from retired hardware.
        </Lead>
      </CenterBox>

      {CASE_STUDIES.map((c, i) => (
        <Box key={i} x={c.x} y={224} w={413} h={540}
          className="overflow-hidden rounded-[20px] bg-slate">
          <Image src={c.img} alt="" fill sizes="413px" className="object-cover" />
          <div
            className="absolute bottom-0 left-0 w-[413px]"
            style={{
              height: c.tall ? 540 : 430,
              backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 35%, rgba(10,15,12,0.88) 100%)',
            }}
          />
          <span className="absolute bottom-[169.98px] left-[25px] rounded-[4.031px] border-[1.008px] border-white bg-white px-[9px] py-[5px] font-sans text-[12.195px] capitalize leading-[15.521px] tracking-[0.9676px] text-black">
            Technology
          </span>
          <h3 className="absolute left-[25px] top-[379px] w-[360px] font-sans text-[18.746px] leading-[26.205px] text-white">
            SaaS Company Completes Data Center<br />
            Migration with Zero Downtime and Full<br />
            Asset Transparency
          </h3>
          <Link href={href('/blog/')} className="absolute bottom-[100px] left-[25px] flex items-center gap-[10px] font-sans text-[12px] leading-[19.351px] tracking-[0.126px] text-white">
            Read Story
            <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14px] w-[18px]" />
          </Link>
        </Box>
      ))}

      <CenterBox y={837} w={700} offset={-0.22} className="flex items-center justify-center gap-[12px]">
        <Btn href={href('/blog/')} variant="colored">View All Stories</Btn>
        <Btn href={href('/quote/')} variant="coloredWhite">Get a Free Estimate</Btn>
      </CenterBox>
    </Section>
  )
}
