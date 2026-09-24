import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { Eyebrow, Lead } from '@/components/ui/Bits'
import { href } from '@/lib/urls'

/**
 * "<Service> Near You" — the service hub linking out to every PUBLISHED
 * location page of that service (SEO brief, 24 Sep 2026: "Service hubs link
 * out to every location"). Sits between the case studies and the FAQ on
 * /light-bulbs/, /electronic-recycle/ and /battery-recycling/.
 *
 * Not drawn at all while no location page of the service is published, so
 * the three pages are exactly as they were until the first one goes live.
 * The height grows by a row per six places; see placesBandHeight().
 */
export type Place = { name: string; href: string }

const PER_ROW = 6
export function placesBandHeight(n: number): number {
  if (n === 0) return 0
  const rows = Math.ceil(n / PER_ROW)
  // 0 top (the white gap above is the page's own), heading block 141 as
  // measured with measure-sections.mjs (24 Sep 2026, two rows: 435), gap 32,
  // rows of 48 twelve apart, the "all locations" line 24 + 20, 110 bottom,
  // and 4 of slack for a browser that sets the heading a hair taller.
  return 141 + 32 + rows * 48 + (rows - 1) * 12 + 44 + 110 + 4
}

export function ServiceLocationsBand({ top, height, title, places }: { top: number; height: number; title: string; places: Place[] }) {
  if (places.length === 0) return null
  return (
    <Section top={top} height={height} label="locations-near-you"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[32px] lg:px-0 lg:pb-[110px] lg:pt-0">
      <div className="flex w-full flex-col items-center gap-[12px] text-center lg:w-[820px] lg:gap-[10px]">
        <Eyebrow>Near You</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[40px] lg:leading-[48px]">{title}</h2>
        <Lead>Address, hours, what each site accepts and how to get a quote.</Lead>
      </div>
      <ul className="flex w-full flex-wrap justify-center gap-[10px] lg:w-[1282px] lg:gap-[12px]">
        {places.map((p) => (
          <li key={p.href}>
            <Link href={href(p.href)}
              className="btn-pop flex h-[44px] items-center gap-[8px] rounded-full border border-brand bg-white px-[18px] font-roboto text-[15px] font-medium text-brand hover:bg-[#eaf4f5] lg:h-[48px] lg:px-[22px] lg:text-[16px]">
              {p.name} <span aria-hidden="true">&rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href('/all-locations/')} className="font-roboto text-[15px] text-brand underline underline-offset-2">See all locations and the Mail-In Program</Link>
    </Section>
  )
}
