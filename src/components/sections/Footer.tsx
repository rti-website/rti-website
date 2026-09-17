import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { href } from '@/lib/urls'
import { FOOTER_BAR_Y, FOOTER_H } from '@/lib/layout'
import { NewsletterForm } from '@/components/client/NewsletterForm'

/**
 * Footer — Figma 6044:19944, 1920x681 on #fcfcfc, built at FOOTER_H.
 *
 * Figma parks the bottom bar at y580, 84px below the last column content.
 * Asim asked for that band closed on 16 Sep 2026, so the bar position and the
 * footer height both come from src/lib/layout.ts now.
 *
 * Column groups and their order:
 *   col 1 (x715)  Learn More · News & Blogs · Services
 *   col 2 (x893)  Resources · Terms & Conditions
 *   col 3 (x1086) Minnesota Facility (twice — see note below)
 *   col 4 (x1310) Connect with Us + the chat card
 * Divider rules sit between the columns (Figma lines 64/65/66).
 *
 * The design draws Resources last in column 1 and Services first in column 2.
 * Asim asked for those two blocks to trade places, 15 Sep 2026 — heading and
 * link moved together, nothing else about the columns changed.
 */

type LinkItem = { l: string; h: string; external?: boolean }
type Group = { heading: string; links: LinkItem[] }

const COL_1: Group[] = [
  {
    heading: 'Learn More',
    links: [
      { l: 'Home',            h: href('/') },
      { l: 'About',           h: href('/about-us-commercial-recycling-solutions/') },
      { l: 'Mail In Program', h: 'https://ezontheearth.com/', external: true },
      { l: 'All Locations',   h: href('/all-locations/') },
    ],
  },
  {
    heading: 'News & Blogs',
    links: [
      { l: 'Blogs', h: href('/blog/') },
      { l: 'News',  h: href('/category/news/') },
    ],
  },
  {
    heading: 'Services',
    links: [{ l: 'View all Services', h: href('/services/') }],
  },
]

const COL_2: Group[] = [
  {
    heading: 'Resources',
    links: [
      { l: 'Contact US',     h: href('/contact-us/') },
      { l: 'Certifications', h: href('/certifications/') },
      { l: 'Why Choose Us',  h: href('/why-choose-us/') },
      { l: 'Sustainability', h: href('/sustainability/') },
      { l: 'Compliance Center', h: href('/compliance-center/') },
      { l: 'Case Studies',      h: href('/case-studies/') },
      // Asim, 16 Sep 2026: Downloads goes under this heading. Figma 6382:7043.
      { l: 'Downloads',         h: href('/downloads/') },
      // Asim, same day, same place. Figma 6382:5883.
      { l: 'ITAD & Recycling Guides', h: href('/itad-recycling-guides/') },
      // Asim, 17 Sep 2026, when the FAQ page was built.
      { l: 'FAQs', h: href('/faqs/') },
    ],
  },
  {
    heading: 'Terms & Conditions',
    links: [
      { l: 'Privacy Policy',    h: href('/privacy-policy/') },
      { l: 'Terms of Services', h: href('/terms-of-services/') },
      { l: 'Cookies Policy',    h: href('/cookies-and-personal-information/') },
      { l: 'Other Information', h: href('/faqs/') },
    ],
  },
]

/**
 * NOTE(content): the Figma footer lists "Minnesota Facility" twice with
 * identical details. The second is almost certainly meant to be the Wisconsin
 * facility (New Berlin, WI). Reproduced as drawn — confirm with Aqeel.
 */
const FACILITIES = [
  { heading: 'Minnesota Facility', address: '1523 99th Ln NE, Blaine, Minnesot. 55274', phone: '+1-786-558-1234', email: 'dispatch@recycletechnologies.com' },
  { heading: 'Minnesota Facility', address: '1523 99th Ln NE, Blaine, Minnesot. 55274', phone: '+1-786-558-1234', email: 'dispatch@recycletechnologies.com' },
]

/* Brand glyphs. The design uses Font Awesome codepoints (f39e / f099 / f167)
   rather than vector layers, so there is nothing to export — these are the
   standard marks drawn inline at the same 16-20px box. */
const SOCIAL = [
  { label: 'Facebook', href: '#', path: 'M14 8.5h-2V7c0-.6.2-1 1-1h1V3.6C13.6 3.5 13 3.5 12.3 3.5c-2 0-3.3 1.2-3.3 3.4v1.6H7V11h2v7h3v-7h2l.4-2.5Z' },
  { label: 'Twitter',  href: '#', path: 'M18.2 6.3c-.5.2-1 .4-1.6.5.6-.4 1-.9 1.2-1.6-.5.3-1.1.6-1.8.7a2.8 2.8 0 0 0-4.8 2.6A8 8 0 0 1 5.4 5.5a2.8 2.8 0 0 0 .9 3.8c-.5 0-.9-.1-1.3-.4 0 1.4 1 2.5 2.3 2.8-.4.1-.8.1-1.2 0a2.8 2.8 0 0 0 2.6 2 5.6 5.6 0 0 1-4.1 1.1 7.9 7.9 0 0 0 12.2-7.1c.6-.4 1.1-.9 1.4-1.4Z' },
  { label: 'YouTube',  href: '#', path: 'M19 8.2a2 2 0 0 0-1.4-1.4C16.4 6.5 11 6.5 11 6.5s-5.4 0-6.6.3A2 2 0 0 0 3 8.2 21 21 0 0 0 2.7 12 21 21 0 0 0 3 15.8a2 2 0 0 0 1.4 1.4c1.2.3 6.6.3 6.6.3s5.4 0 6.6-.3a2 2 0 0 0 1.4-1.4c.2-1.3.3-2.5.3-3.8 0-1.3-.1-2.5-.3-3.8ZM9.3 14.4V9.6l4.5 2.4-4.5 2.4Z' },
]

/**
 * `top` is the footer's y offset inside whatever it is placed in. The homepage
 * nests it in the FAQ/CTA/footer section at 1192; /services/ drops it straight
 * onto the canvas at 3830.86.
 */
export function Footer({ top = 1192 }: { top?: number } = {}) {
  return (
    <Box x={0} y={top} w={1920} h={FOOTER_H} className="bg-[#fcfcfc]">
      {/* ---------------------------------------------------------- left rail */}
      <Box x={319} y={78} w={230} h={55}>
        <Link href="/" aria-label="Recycle Technologies — home" className="block size-full">
          <Image src="/images/logo.png" alt="Recycle Technologies" width={230} height={55} className="size-full object-contain" />
        </Link>
      </Box>

      <Box x={319} y={152} w={342}>
        <p className="font-roboto text-[15px] leading-[27px] text-muted">
          Recycle Technologies has been providing services to the community since 1993.
          We are a Midwest-based recycling and shredding company.
        </p>
      </Box>

      <Box x={319} y={272} w={342}>
        <NewsletterForm />
      </Box>

      {/* ------------------------------------------------------- link columns */}
      <Box x={715} y={70} w={178}><LinkColumn groups={COL_1} /></Box>
      <Box x={893} y={70} h={380} w={1} className="bg-line" />
      <Box x={918} y={70} w={168}><LinkColumn groups={COL_2} /></Box>
      <Box x={1086} y={70} h={380} w={1} className="bg-line" />

      <Box x={1111} y={70} w={200} className="flex flex-col gap-[26px]">
        {FACILITIES.map((f, i) => (
          <div key={i}>
            <h3 className="mb-[12px] font-sans text-[15px] font-semibold leading-[20px] text-ink">{f.heading}</h3>
            <address className="flex flex-col gap-[10px] font-roboto text-[13px] not-italic leading-[19px] text-muted">
              <span className="flex items-start gap-[8px]">
                <Image src="/images/icons/foot-pin.png" alt="" width={13} height={17} className="mt-[2px] h-[17px] w-[13px] shrink-0" />
                {f.address}
              </span>
              <a href={`tel:${f.phone.replace(/[^+\d]/g, '')}`} className="flex items-start gap-[8px] hover:text-brand">
                <Image src="/images/icons/foot-phone.png" alt="" width={13} height={18} className="mt-[1px] h-[18px] w-[13px] shrink-0" />
                {f.phone}
              </a>
              <a href={`mailto:${f.email}`} className="flex items-start gap-[8px] break-all hover:text-brand">
                <Image src="/images/icons/foot-email.png" alt="" width={14} height={11} className="mt-[4px] h-[11px] w-[14px] shrink-0" />
                {f.email}
              </a>
            </address>
          </div>
        ))}
      </Box>
      <Box x={1311} y={70} h={380} w={1} className="bg-line" />

      {/* ------------------------------------------------- connect + chat card */}
      <Box x={1336} y={70} w={265}>
        <h3 className="mb-[14px] font-sans text-[15px] font-semibold leading-[20px] text-ink">Connect with Us</h3>
        <ul className="flex items-center gap-[18px]">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label} className="block text-brand transition-opacity hover:opacity-70">
                <svg viewBox="0 0 22 22" className="size-[22px] fill-current" aria-hidden="true"><path d={s.path} /></svg>
              </a>
            </li>
          ))}
        </ul>

        {/* Chat card — Figma 6107:3082, #eaf4f5, h203, r10 */}
        <div className="mt-[22px] w-full rounded-[10px] bg-[#eaf4f5] p-[20px]">
          <span className="grid size-[37px] place-items-center rounded-full bg-brand">
            <Image src="/images/icons/chat-icon.png" alt="" width={18} height={18} className="size-[18px]" />
          </span>
          <p className="mt-[12px] font-sans text-[14px] font-medium leading-[20px] text-ink">
            Hi! How can we help?
          </p>
          <div className="mt-[12px] flex flex-col gap-[8px]">
            <Link href={href('/contact-us/')} className="flex h-[30px] items-center justify-center rounded-[8px] bg-white font-roboto text-[12px] font-medium text-brand">
              I have a question
            </Link>
            <Link href={href('/faqs/')} className="flex h-[30px] items-center justify-center rounded-[8px] bg-brand font-roboto text-[12px] font-medium text-white">
              Tell me more
            </Link>
          </div>
        </div>
      </Box>

      {/* -------------------------------------------------------- bottom bars */}
      <Box x={0} y={FOOTER_BAR_Y} w={1920} h={74} className="bg-[#f8f8f8]">
        <Box x={321} y={0} h={74} className="flex items-center">
          <a href="#top" className="font-roboto text-[14px] leading-[14px] text-muted hover:text-brand">
            Back to Top &uarr;
          </a>
        </Box>
        <Box x={1321} y={0} h={74} w={280} className="flex items-center justify-end">
          <p className="font-roboto text-[14px] leading-[14px] text-muted">
            Copyright@2026. All rights are reserved.
          </p>
        </Box>
      </Box>
      <Box x={0} y={FOOTER_BAR_Y + 73.91} w={1920} h={27} className="bg-brand" />
    </Box>
  )
}

function LinkColumn({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col gap-[24px]">
      {groups.map((g) => (
        <nav key={g.heading} aria-label={g.heading}>
          <h3 className="mb-[12px] font-sans text-[15px] font-semibold leading-[20px] text-ink">{g.heading}</h3>
          <ul className="flex flex-col gap-[9px]">
            {g.links.map((l) => (
              <li key={l.l} className="flex items-center gap-[7px]">
                <span className="font-roboto text-[11px] leading-none text-brand">&rsaquo;</span>
                {l.external ? (
                  <a href={l.h} target="_blank" rel="noopener noreferrer" className="font-roboto text-[13.5px] leading-[20px] text-muted hover:text-brand">{l.l}</a>
                ) : (
                  <Link href={l.h} className="font-roboto text-[13.5px] leading-[20px] text-muted hover:text-brand">{l.l}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  )
}
