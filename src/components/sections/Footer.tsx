import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@/components/design/Frame'
import { href } from '@/lib/urls'
import { FOOTER_BAR_Y, FOOTER_H } from '@/lib/layout'
import { NewsletterForm } from '@/components/client/NewsletterForm'
import { socialLinks } from '@/lib/social'
import { FACILITIES as CONTACT_FACILITIES } from '@/data/contact'

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
type Group = { heading: string; headingHref?: string; links: LinkItem[] }

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
    // The heading itself opens /resources/ since 21 Sep 2026, when Resources
    // came out of the header bar — this is now the page's link.
    headingHref: href('/resources/'),
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
 * The two real facilities, read from the contact page's data — Asim, 22 Sep
 * 2026: "see the 2nd ss add this in footer, we add same, add this one".
 *
 * WHAT WAS HERE BEFORE was Figma's placeholder, and it was wrong in every
 * field that matters: it listed "Minnesota Facility" TWICE, and both carried
 * an address that does not exist (1523 99th Ln NE, "Minnesot." 55274 — the
 * real one is 1525, Minnesota, 55449) over a phone number nobody answers
 * (+1-786-558-1234; Minnesota's is +1-763-559-5130). A wrong address and a
 * wrong phone number on the footer of every page is a customer who cannot
 * reach you, so this is a correction, not a design change. Wisconsin was
 * missing entirely.
 *
 * Imported rather than retyped: FACILITIES in src/data/contact.ts is what the
 * contact page renders, so the footer cannot drift from it. When a facility
 * moves, that file is the one place to change.
 */
const FACILITIES = CONTACT_FACILITIES.cards

/* Brand glyphs and hrefs both come from src/lib/social.ts, which reads the
   admin's `social_links` table and falls back to RTI's real accounts. This
   was a hardcoded array with href: '#' on every row until 22 Sep 2026 —
   which is why saving a Facebook URL in the admin appeared to do nothing. */

/**
 * `top` is the footer's y offset inside whatever it is placed in. The homepage
 * nests it in the FAQ/CTA/footer section at 1192; /services/ drops it straight
 * onto the canvas at 3830.86.
 */
export async function Footer({ top = 1192 }: { top?: number } = {}) {
  const SOCIAL = await socialLinks()

  return (
    /*
     * Mobile 6620:2370 — px20 / pt48 / pb32 / gap28 on #fcfcfc, everything in
     * one column. The wrappers below are `lg:contents`, so at lg they vanish
     * from the box tree entirely and every Box still resolves its absolute
     * coordinates against this one — the board is byte-for-byte unchanged.
     */
    <Box x={0} y={top} w={1920} h={FOOTER_H} className="flex flex-col gap-[28px] bg-[#fcfcfc] px-[20px] pb-[32px] pt-[48px] lg:block lg:p-0">
      {/* ------------------------------------------- left rail / 6620:2371 */}
      <div className="flex flex-col gap-[16px] lg:contents">
        <Box x={319} y={78} w={230} h={55}>
          {/* Sized on the link rather than the Box: below lg the Box has no
              height, and `size-full` against an auto-height parent collapses. */}
          <Link href="/" aria-label="Recycle Technologies — home" className="block h-[55px] w-[230px] lg:size-full">
            <Image src="/images/logo.png" alt="Recycle Technologies" width={230} height={55} className="size-full object-contain" />
          </Link>
        </Box>

        <Box x={319} y={152} w={342}>
          <p className="font-roboto text-[15px] leading-[22px] text-muted lg:leading-[27px]">
            Recycle Technologies has been providing services to the community since 1993.
            We are a Midwest-based recycling and shredding company.
          </p>
        </Box>

        <Box x={319} y={272} w={342}>
          <NewsletterForm />
        </Box>
      </div>

      {/* 6621:2426 — the phone rules the bands off horizontally where the board
          rules the columns off vertically. Decorative, so mobile-only. */}
      <div className="h-px w-full bg-line lg:hidden" />

      {/* ----------------------------------- link columns / 6620:5100 */}
      <div className="flex flex-col gap-[28px] lg:contents">
        {/* 6593:6051 — the phone sets the link groups two-up. */}
        <div className="grid grid-cols-2 items-start gap-[28px] lg:contents">
          <Box x={715} y={70} w={178} className="min-w-0"><LinkColumn groups={COL_1} /></Box>
          <Box x={893} y={70} h={380} w={1} className="hidden bg-line lg:block" />
          <Box x={918} y={70} w={168} className="min-w-0"><LinkColumn groups={COL_2} /></Box>
        </div>
        <Box x={1086} y={70} h={380} w={1} className="hidden bg-line lg:block" />

        {/* 6620:5167 / 6620:5179 */}
        {/* 250 wide, not the frame's 200. "dispatch@recycletechnologies.com"
            measures ~215px at 13px Roboto, plus a 14px icon and an 8px gap —
            237 in a 200 box, so the address ran under the divider at 1311 and
            was clipped mid-word. Asim, 22 Sep 2026. The divider and the
            Connect column below move right by the same 75 to keep their
            spacing; the group now ends at 1676, still 114px inside the
            visible frame (--canvas-inset trims to 1790). */}
        <Box x={1111} y={70} w={250} className="flex flex-col gap-[28px] lg:gap-[26px]">
          {FACILITIES.map((f, i) => (
            <div key={i}>
              <h3 className="mb-[14px] font-sans text-[16px] font-medium leading-[20px] tracking-[0.48px] text-black lg:mb-[12px] lg:text-[15px] lg:font-semibold lg:tracking-normal lg:text-ink">{f.name}</h3>
              {/* gap 0 + py6 per row on the phone keeps the frame's 12px rhythm
                  while giving each tappable row a 33px box instead of 21. */}
              <address className="flex flex-col gap-0 font-roboto text-[14px] not-italic leading-[19px] text-muted lg:gap-[10px] lg:text-[13px]">
                <span className="flex items-start gap-[10px] py-[6px] lg:gap-[8px] lg:py-0">
                  <Image src="/images/icons/foot-pin.png" alt="" width={13} height={17} className="mt-[2px] h-[17px] w-[13px] shrink-0" />
                  {f.address}
                </span>
                <a href={`tel:${f.phone.replace(/[^+\d]/g, '')}`} className="flex items-start gap-[10px] py-[6px] hover:text-brand lg:gap-[8px] lg:py-0">
                  <Image src="/images/icons/foot-phone.png" alt="" width={13} height={18} className="mt-[1px] h-[18px] w-[13px] shrink-0" />
                  {f.phone}
                </a>
                {/* `break-all` used to be here and split the address across two
                    lines mid-word ("recycletechnologie / s.com") — Asim, 22 Sep
                    2026. It measures ~215px at 14px Roboto against 350px of
                    usable width on a 390 phone, so it fits on one line without
                    help; `whitespace-nowrap` makes that a guarantee rather than
                    a coincidence, and `min-w-px` lets the flex row shrink around
                    it instead of forcing the column wider. */}
                <a href={`mailto:${f.email}`} className="flex min-w-px items-start gap-[10px] whitespace-nowrap py-[6px] hover:text-brand lg:gap-[8px] lg:py-0">
                  <Image src="/images/icons/foot-email.png" alt="" width={14} height={11} className="mt-[4px] h-[11px] w-[14px] shrink-0" />
                  {f.email}
                </a>
              </address>
            </div>
          ))}
        </Box>
        <Box x={1386} y={70} h={380} w={1} className="hidden bg-line lg:block" />

        {/* ------------------------------ connect + chat card / 6620:5191 */}
        <Box x={1411} y={70} w={265} className="flex flex-col items-center gap-[16px] lg:block">
          <h3 className="font-sans text-[16px] font-medium leading-[20px] tracking-[0.48px] text-black lg:mb-[14px] lg:text-[15px] lg:font-semibold lg:tracking-normal lg:text-ink">Connect with Us</h3>
          <ul className="flex items-center gap-[20px] lg:gap-[18px]">
            {SOCIAL.map((s) => (
              <li key={s.platform}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid size-[44px] place-items-center text-brand transition-opacity hover:opacity-70 lg:block lg:size-auto">
                  <svg viewBox="0 0 22 22" className="size-[25px] fill-current lg:size-[22px]" aria-hidden="true"><path d={s.path} /></svg>
                </a>
              </li>
            ))}
          </ul>

          {/* Chat card — Figma 6107:3082, #eaf4f5, h203, r10; 6620:5197 on the
              phone, where it is #f5f5f5, r12, centred, and the two buttons sit
              side by side instead of stacked. */}
          <div className="w-full rounded-[12px] bg-[#f5f5f5] p-[20px] text-center lg:mt-[22px] lg:rounded-[10px] lg:bg-[#eaf4f5] lg:text-left">
            <span className="mx-auto grid size-[37px] place-items-center rounded-full bg-brand lg:mx-0">
              <Image src="/images/icons/chat-icon.png" alt="" width={18} height={18} className="size-[18px]" />
            </span>
            <p className="mt-[12px] font-sans text-[14px] font-medium leading-[20px] text-ink">
              Hi! How can we help?
            </p>
            <div className="mt-[12px] flex gap-[10px] lg:flex-col lg:gap-[8px]">
              <Link href={href('/contact-us/')} className="flex h-[44px] flex-1 items-center justify-center rounded-[8px] border border-brand bg-white px-[8px] text-center font-roboto text-[12px] font-medium text-brand lg:h-[30px] lg:flex-none lg:border-0 lg:px-0">
                I have a question
              </Link>
              <Link href={href('/faqs/')} className="flex h-[44px] flex-1 items-center justify-center rounded-[8px] border border-brand bg-brand px-[8px] text-center font-roboto text-[12px] font-medium text-white lg:h-[30px] lg:flex-none lg:border-0 lg:px-0">
                Tell me more
              </Link>
            </div>
          </div>
        </Box>
      </div>

      {/* 6621:2427 */}
      <div className="h-px w-full bg-line lg:hidden" />

      {/* ------------------------------ bottom bars / 6620:5209
          The phone frame carries no grey band and no teal strip: the bar is
          two centred lines straight on the footer's own #fcfcfc. */}
      <Box x={0} y={FOOTER_BAR_Y} w={1920} h={74} className="flex flex-col items-center gap-[12px] lg:block lg:bg-[#f8f8f8]">
        <Box x={321} y={0} h={74} className="flex items-center">
          <a href="#top" className="py-[6px] font-roboto text-[14px] leading-[14px] text-muted hover:text-brand lg:py-0">
            Back to Top &uarr;
          </a>
        </Box>
        <Box x={1321} y={0} h={74} w={280} className="flex items-center justify-center text-center lg:justify-end lg:text-left">
          <p className="font-roboto text-[14px] leading-[14px] text-ink lg:text-muted">
            Copyright@2026. All rights are reserved.
          </p>
        </Box>
      </Box>
      <Box x={0} y={FOOTER_BAR_Y + 73.91} w={1920} h={27} className="hidden bg-brand lg:block" />
    </Box>
  )
}

function LinkColumn({ groups }: { groups: Group[] }) {
  return (
    /* 6620:5101 — heading 16/medium/0.48 tracking over a 14px list on the
       phone, the board's 15/semibold over 13.5 at lg. The chevron is a board
       detail; the phone frame draws the links bare. */
    <div className="flex flex-col gap-[28px] lg:gap-[24px]">
      {groups.map((g) => (
        <nav key={g.heading} aria-label={g.heading}>
          <h3 className="mb-[12px] font-sans text-[16px] font-medium leading-[20px] tracking-[0.48px] text-black lg:text-[15px] lg:font-semibold lg:tracking-normal lg:text-ink">
            {g.headingHref ? <Link href={g.headingHref} className="hover:text-brand">{g.heading}</Link> : g.heading}
          </h3>
          {/* gap 0 + py5 on the phone reproduces the frame's 10px pitch while
              turning a 20px link into a 30px tap box. */}
          <ul className="flex flex-col gap-0 lg:gap-[9px]">
            {g.links.map((l) => (
              <li key={l.l} className="flex items-center gap-[7px]">
                <span className="hidden font-roboto text-[11px] leading-none text-brand lg:block">&rsaquo;</span>
                {l.external ? (
                  <a href={l.h} target="_blank" rel="noopener noreferrer" className="block py-[5px] font-roboto text-[14px] leading-[20px] text-muted hover:text-brand lg:py-0 lg:text-[13.5px]">{l.l}</a>
                ) : (
                  <Link href={l.h} className="block py-[5px] font-roboto text-[14px] leading-[20px] text-muted hover:text-brand lg:py-0 lg:text-[13.5px]">{l.l}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  )
}
