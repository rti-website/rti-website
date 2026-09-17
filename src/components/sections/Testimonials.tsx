import Image from 'next/image'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Title } from '@/components/ui/Bits'
import { TESTIMONIAL } from '@/data/home'
import { TestimonialPager } from '@/components/client/TestimonialPager'

/** Client's Testimonials — Figma 6024:14149. Three 431.4x292.6 cards at y211. */
const X = [319, 750.4, 1181.79]

export function Testimonials() {
  return (
    <Section top={6739 - HOME_BELOW_CERT_SHIFT} height={594} label="6024:14149" className="bg-white">
      <CenterBox y={0} w={400} className="flex justify-center"><Eyebrow>Testimonials</Eyebrow></CenterBox>
      <CenterBox y={52} w={600}><Title className="text-center">Client&rsquo;s Testimonials</Title></CenterBox>

      {X.map((x, i) => (
        <Box key={i} x={x} y={211} w={419.21} h={292.6}
          className="rounded-[15.005px] border-[0.938px] border-[#d6e6de] bg-card">
          <div className="absolute left-[37.51px] top-[31.89px] flex gap-[4.13px]">
            {Array.from({ length: 5 }).map((_, s) => (
              <Image key={s} src="/images/icons/star.svg" alt="" width={22} height={22} className="size-[22.018px]" />
            ))}
          </div>
          <p className="absolute left-[37.51px] top-[74.09px] w-[354.5px] font-roboto text-[15.005px] font-light leading-[18.756px] text-[#4a5e57]">
            {TESTIMONIAL.quote}
          </p>
          <div className="absolute left-[37.51px] top-[158.49px] w-[354.5px] border-t-[0.938px] border-[#d6e6de]">
            <span className="absolute left-0 top-[26px] grid size-[39.388px] place-items-center rounded-full bg-brand font-sans text-[15.005px] font-bold text-white">
              {TESTIMONIAL.name.charAt(0)}
            </span>
            <p className="absolute left-[50.64px] top-[24px] font-sans text-[14.067px] font-semibold leading-[25.321px] text-[#1a2420]">
              {TESTIMONIAL.name}
            </p>
            <p className="absolute left-[50.64px] top-[47px] font-sans text-[11.254px] leading-[20.257px] text-[#8ea89f]">
              {TESTIMONIAL.meta}
            </p>
            <span className="absolute left-[50.64px] top-[72px] flex items-center gap-[7px]">
              <Image src="/images/icons/google.svg" alt="" width={11} height={11} className="size-[11.254px]" />
              <span className="font-sans text-[10.316px] font-semibold uppercase leading-[18.569px] tracking-[0.8253px] text-[#8ea89f]">
                {TESTIMONIAL.source}
              </span>
            </span>
          </div>
        </Box>
      ))}

      <Box x={848} y={550}><TestimonialPager count={6} /></Box>
    </Section>
  )
}
