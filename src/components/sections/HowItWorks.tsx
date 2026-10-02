import Image from 'next/image'
import { HOME_BELOW_SERVICES_SHIFT, HOME_HOW_H } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { VideoPlay } from '@/components/client/VideoPlay'
import { content } from '@/lib/page-content'
import { QUOTE_HREF } from '@/lib/urls'

/**
 * How It Works — Figma 6040:18591 in BVtf2AOuUOcYbiMIlcKmbC (desktop,
 * 1920x938), redrawn 2 Oct 2026. Asim: "we have to add this video in this
 * place ... see all home page we have to update it like this".
 *
 * THE FOUR STEPS ARE GONE. The section is now the heading block (7182:8239),
 * a 1070x602 video card (7184:3248) and the Get a Quote button (6062:21431),
 * 60 apart. It grew from 559 to 938, so everything under it moves down by
 * HOME_HOW_GROWTH (src/lib/layout.ts). STEPS stays in src/data/home.ts for
 * now but nothing draws it.
 *
 * THE CARD (7184:3248): #fafcfb, r40, clipped. Five soft #d0e9ed glows (the
 * frame's blurred ellipses, exported with their blur) sit behind a centred
 * column: the RTI logo 402x96 at y60, the tagline (IBM Plex Sans SemiBold 23
 * #132119) at 176, the play button (136, a 116 circle inset 10) at 234.95,
 * "Watch Video" (Medium 23 #05838b) at 365, and three 115x115 badge tiles
 * (white, 2.53 #ccc border, r12.65) at 422: R2v3, RIOS, NAID AAA. The column
 * is a flex stack whose gaps reproduce those y values exactly, so it can
 * reflow on a phone instead of being a second set of coordinates.
 *
 * The logo is public/images/logo.png (the same Figma image, 155aa). The badge
 * files are the certification strip's (same Figma images: 4aed2, 5cc60,
 * d1fc7), with the crops the frame applies to them here.
 *
 * MOBILE: no phone frame for this yet (6607:2322 still draws the four
 * steps). Built as the same card scaled to the column: px20 / py48, gap 28,
 * card r24 with a smaller logo, type, button and tiles.
 */
const GLOWS: { src: string; x: number; y: number; s: number }[] = [
  /* Each is the ellipse's box plus the blur margin the export adds:
     inset -50.53% (285 -> 573), -29.33% (491 -> 779), -32.98% (285 -> 473). */
  { src: 'glow-285.svg', x: -287, y: -170, s: 573 },      // Ellipse 54
  { src: 'glow-491.svg', x: 644, y: 254, s: 779 },        // Ellipse 57
  { src: 'glow-491.svg', x: -209, y: 329, s: 779 },       // Ellipse 58
  { src: 'glow-491.svg', x: 408, y: -548, s: 779 },       // Ellipse 59
  { src: 'glow-285-soft.svg', x: 797, y: 363, s: 473 },   // Ellipse 55
]
const CARD_W = 1070
const CARD_H = 602
const pct = (v: number, of: number) => `${(v / of) * 100}%`

/** The three badge tiles — 7184:3258 / 3260 / 3262: each mark at its drawn
 *  size inside the 115.098 tile, centred (the frame offsets them by under
 *  3px, which reads as centred). */
const TILE = 115.098
const BADGES = [
  { src: '/images/certs/1.png', alt: 'R2v3 certified', w: 71.866, h: 74.861 },
  { src: '/images/certs/2.png', alt: 'RIOS certified', w: 85.526, h: 40.145 },
  { src: '/images/certs/5.png', alt: 'NAID AAA certified', w: 78.051, h: 81.33 },
]

export async function HowItWorks() {
  const { HOME_HOW_IT_WORKS: C } = await content('home')
  return (
    <Section
      top={3726 - HOME_BELOW_SERVICES_SHIFT}
      height={HOME_HOW_H}
      label="6040:18591"
      className="flex flex-col items-center gap-[28px] bg-white px-[20px] py-[48px] lg:block lg:p-0"
    >
      <CenterBox y={0} w={400} offset={-0.47} className="flex justify-center"><Eyebrow>{C.eyebrow}</Eyebrow></CenterBox>
      <CenterBox y={52} w={500}><Title className="text-center">{C.title}</Title></CenterBox>
      <CenterBox y={126} w={594}>
        <Lead className="text-center">{C.lead}</Lead>
      </CenterBox>

      {/* 7184:3248 — the video card. */}
      <Box x={425} y={228} w={CARD_W} h={CARD_H} className="self-stretch">
        <div className="relative isolate flex size-full flex-col items-center overflow-hidden rounded-[24px] bg-[#fafcfb] px-[16px] pb-[32px] pt-[32px] lg:rounded-[40px] lg:px-0 lg:pb-0 lg:pt-[60px]">
          {GLOWS.map((g, i) => (
            <Image
              key={i}
              src={`/images/home/how-video/${g.src}`}
              alt=""
              width={g.s}
              height={g.s}
              unoptimized
              aria-hidden="true"
              className="pointer-events-none absolute -z-10 max-w-none"
              style={{ left: pct(g.x, CARD_W), top: pct(g.y, CARD_H), width: pct(g.s, CARD_W), height: 'auto' }}
            />
          ))}

          {/* 7184:3253 — 402x96. */}
          <Image src="/images/logo.png" alt="Recycle Technologies" width={2000} height={474}
            className="h-auto w-[220px] lg:h-[96px] lg:w-[402px]" />

          {/* 7184:3254 — top 176, 20 under the logo. */}
          <p className="mt-[14px] text-balance text-center font-sans text-[15px] font-semibold leading-[21px] text-[#132119] lg:mt-[20px] lg:flex lg:h-[45px] lg:w-[770px] lg:items-center lg:justify-center lg:text-[23px] lg:leading-[27.7px]">
            {C.tagline}
          </p>

          {/* 7184:3375 + 7184:3255 — the button at 234.95 (14 under the
              tagline), the label at 365 (6 into the button's 136 box). */}
          <div className="mt-[12px] lg:mt-[14px]">
            <VideoPlay
              src={C.video}
              title={C.videoTitle}
              label={C.watch}
              iconClass="size-[76px] lg:size-[116px] lg:m-[10px]"
              labelClass="mt-[6px] font-sans text-[17px] font-medium leading-[22px] text-brand lg:-mt-[6px] lg:flex lg:h-[33px] lg:items-center lg:text-[23px] lg:leading-[27.7px]"
            />
          </div>

          {/* 7184:3257 — 422, 24 under the label. */}
          <ul className="mt-[18px] flex gap-[8px] lg:mt-[24px] lg:gap-[8.85px]">
            {BADGES.map((b) => (
              <li key={b.src} className="grid size-[72px] shrink-0 place-items-center rounded-[8px] border-[1.6px] border-[#ccc] bg-white lg:size-[115.098px] lg:rounded-[12.648px] lg:border-[2.53px]">
                <span className="relative" style={{ width: pct(b.w, TILE), height: pct(b.h, TILE) }}>
                  <Image src={b.src} alt={b.alt} fill sizes="86px" className="object-contain" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Box>

      {/* 6062:21431 — 60 under the card. */}
      <CenterBox y={890} w={700} className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
        <Btn href={QUOTE_HREF} variant="colored" className="w-full justify-center lg:w-auto">{C.button}</Btn>
      </CenterBox>
    </Section>
  )
}
