import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@/components/design/Frame'
import { href } from '@/lib/urls'
import { FOOTER_BAR_Y, FOOTER_H } from '@/lib/layout'
import { NewsletterForm } from '@/components/client/NewsletterForm'
import { socialLinks } from '@/lib/social'
import { FACILITIES as CONTACT_FACILITIES } from '@/data/contact'
import { FOOTER_CERTS, type FooterCert } from '@/data/certifications'

/**
 * Footer — Figma 6778:3897 (board, 1920x755) and 6620:2370 (phone), on #fcfcfc.
 *
 * ===========================================================================
 * THE CERTIFICATION LOGOS, 23 Sep 2026
 * ===========================================================================
 * Asim: "we add logo in it". The designer's new footer frame puts a 3x3 grid
 * of the certification marks under the chat card, and narrows the columns to
 * make room: the block now starts at x653 and runs 952 wide — 137 · 183 ·
 * the rest · 188, 16px either side of each rule. The phone frame (6778:9672)
 * draws eight of the marks 4x2 after the chat card, which is where "place the
 * logos after Connect with Us" puts them. The R2v3 mark links to SERI's
 * directory entry, the same URL as on the Certifications & Standards strip.
 * The same day Asim cut the nine marks to three — R2v3, RIOS and NAID AAA —
 * so the grid is now one row. See FOOTER_CERTS in src/data/certifications.ts.
 *
 * The frame restyles the board's column type to its own: 16px IBM Plex
 * Medium headings over 14px Poppins links on a 31px pitch, and the chat card
 * centred. That is followed at lg. The phone is unchanged apart from the logo
 * grid — Asim: "footer is same design but just place the logos".
 *
 * WHAT IS OURS, NOT THE FRAME'S — each one a decision Asim already made:
 *   - the facilities are the real two (see FACILITIES below), where the frame
 *     still repeats "Minnesota Facility";
 *   - "Compliance Center", where the frame says "Computer Center" (a typo for
 *     the same link — /compliance-center/);
 *   - the extra links added since the frame was drawn: IT Asset Disposition
 *     under Services, FAQs, Downloads and the guides under Resources;
 *   - the social icons are the admin's (src/lib/social.ts), not the frame's
 *     Facebook / Twitter / YouTube;
 *   - "I have a question" is teal on white; the frame sets it white on white.
 *
 * The first column is at least the frame's 137 but may grow: "IT Asset
 * Disposition" is wider than anything the frame put in it. The facilities
 * column is the flexible one and gives the room back.
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
    links: [
      { l: 'View all Services', h: href('/services/') },
      // Asim, 23 Sep 2026, when /it-asset-disposition/ was built: "add ITAD
      // here in services". Its one link from the site chrome — ITAD is not in
      // the header menu (see the note in src/lib/nav.ts).
      { l: 'IT Asset Disposition', h: href('/it-asset-disposition/') },
    ],
  },
]

const COL_2: Group[] = [
  {
    heading: 'Resources',
    // The heading itself opens /resources/ since 21 Sep 2026, when Resources
    // came out of the header bar — this is now the page's link.
    headingHref: href('/resources/'),
    links: [
      { l: 'Contact Us',     h: href('/contact-us/') },
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
     * from the box tree and every Box still resolves its absolute coordinates
     * against this one.
     */
    <Box as="footer" x={0} y={top} w={1920} h={FOOTER_H} className="flex flex-col gap-[28px] bg-[#fcfcfc] px-[20px] pb-[32px] pt-[48px] lg:block lg:p-0">
      {/* ------------------------------------------- left rail / 6620:2371 */}
      <div className="flex flex-col gap-[16px] lg:contents">
        {/* 6778:4067 */}
        <Box x={319} y={90} w={230} h={55}>
          {/* Sized on the link rather than the Box: below lg the Box has no
              height, and `size-full` against an auto-height parent collapses. */}
          <Link href="/" aria-label="Recycle Technologies — home" className="block h-[55px] w-[230px] lg:size-full">
            <Image src="/images/logo.png" alt="Recycle Technologies" width={230} height={55} className="size-full object-contain" />
          </Link>
        </Box>

        {/* 6778:3898 — 17/27.65 in a 296 column, four lines. */}
        <Box x={319} y={170} w={296}>
          <p className="font-roboto text-[15px] leading-[22px] text-muted lg:text-[17.018px] lg:leading-[27.654px]">
            Recycle Technologies has been providing services to the community since 1993.
            We are a Midwest-based recycling and shredding company.
          </p>
        </Box>

        {/* 6778:3900..3906 — input at y317, consent at 384, button at 446. */}
        <Box x={318} y={317} w={296}>
          <NewsletterForm />
        </Box>
      </div>

      {/* 6621:2426 — the phone rules the bands off horizontally where the board
          rules the columns off vertically. Decorative, so mobile-only. */}
      <div className="h-px w-full bg-line lg:hidden" />

      {/* ----------------------------------- link columns / 6778:3919
          One flex row at lg: the columns sit 16 either side of a 1px rule that
          stretches to the tallest of them (the Connect column, 531). */}
      <Box x={653} y={90} w={952} className="flex flex-col gap-[28px] lg:flex-row lg:items-stretch lg:gap-[16px]">
        {/* 6593:6051 — the phone sets the link groups two-up. */}
        <div className="grid grid-cols-2 items-start gap-[28px] lg:contents">
          <div className="min-w-0 lg:min-w-[137px] lg:shrink-0"><LinkColumn groups={COL_1} /></div>
          <Rule />
          <div className="min-w-0 lg:w-[183px] lg:shrink-0"><LinkColumn groups={COL_2} /></div>
        </div>
        <Rule />

        {/* 6778:3991 / 6620:5167 + 6620:5179 */}
        <div className="flex flex-col gap-[28px] lg:min-w-px lg:flex-1 lg:gap-[30px]">
          {FACILITIES.map((f, i) => (
            <div key={i}>
              <h3 className={`${HEADING} mb-[14px] lg:mb-0`}>{f.name}</h3>
              {/* gap 0 + py6 per row on the phone keeps the frame's 12px rhythm
                  while giving each tappable row a 33px box instead of 21. The
                  board's rows are 25 tall on a 16px gap. */}
              <address className="flex flex-col gap-0 font-roboto text-[14px] not-italic leading-[19px] text-muted lg:gap-[16px] lg:font-poppins lg:leading-[21px]">
                <span className="flex items-start gap-[10px] py-[6px] lg:items-center lg:py-[2px]">
                  <Icon src="/images/icons/foot-pin.png" w={15} h={20} />
                  {f.address}
                </span>
                <a href={`tel:${f.phone.replace(/[^+\d]/g, '')}`} className="flex items-start gap-[10px] py-[6px] hover:text-brand lg:items-center lg:py-[2px]">
                  <Icon src="/images/icons/foot-phone.png" w={15} h={21} />
                  {f.phone}
                </a>
                {/* `whitespace-nowrap` keeps the address on one line — it split
                    mid-word ("recycletechnologie / s.com") under `break-all`,
                    Asim, 22 Sep 2026 — and `min-w-px` lets the row shrink
                    around it instead of forcing the column wider. */}
                <a href={`mailto:${f.email}`} className="flex min-w-px items-start gap-[10px] whitespace-nowrap py-[6px] hover:text-brand lg:items-center lg:py-[2px]">
                  <Icon src="/images/icons/foot-email.png" w={20} h={20} />
                  {f.email}
                </a>
              </address>
            </div>
          ))}
        </div>
        <Rule />

        {/* ------------------------------ connect, chat card, logos / 6778:4025
            188 wide on the board: heading block, card at +110, logo row at +343. */}
        <div className="flex flex-col items-center gap-[16px] lg:w-[188px] lg:shrink-0 lg:items-stretch lg:gap-[30px]">
          <div className="flex flex-col items-center gap-[16px] lg:items-start lg:gap-0">
            <h3 className={HEADING}>Connect with Us</h3>
            {/* 6778:4030 — 25px glyphs, 30 apart, in a 45px row. */}
            <ul className="flex items-center gap-[20px] lg:h-[45px] lg:gap-[30px]">
              {SOCIAL.map((s) => (
                <li key={s.platform}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid size-[44px] place-items-center text-brand transition-opacity hover:opacity-70 lg:block lg:size-auto">
                    <svg viewBox="0 0 22 22" className="size-[25px] fill-current" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat card — 6778:4036 on the board: 188x203, #eaf4f5, r10, its
              contents centred on a 10px gap and the two 30px buttons full
              width. 6620:5197 on the phone, where it is #f5f5f5, r12 and the
              buttons sit side by side. */}
          <div className="w-full rounded-[12px] bg-[#f5f5f5] p-[20px] text-center lg:flex lg:h-[203px] lg:flex-col lg:items-center lg:justify-center lg:gap-[10px] lg:rounded-[10px] lg:bg-brand-soft lg:px-[25px] lg:py-[13px]">
            <span className="mx-auto grid size-[37px] place-items-center rounded-full bg-brand lg:mx-0">
              <Image src="/images/icons/chat-icon.png" alt="" width={18} height={18} className="size-[18px]" />
            </span>
            <p className="mt-[12px] font-sans text-[14px] font-medium leading-[20px] text-ink lg:mt-0 lg:font-poppins lg:text-[12px] lg:font-normal lg:leading-[18px] lg:text-[#13220f]">
              Hi! How can we help?
            </p>
            <div className="mt-[12px] flex gap-[10px] lg:mt-0 lg:w-full lg:flex-col lg:gap-[10px]">
              <Link href={href('/contact-us/')} className="btn-pop flex h-[44px] flex-1 items-center justify-center rounded-[8px] border border-brand bg-white px-[8px] text-center font-roboto text-[12px] font-medium text-brand lg:h-[30px] lg:w-full lg:flex-none lg:px-0">
                I have a question
              </Link>
              <Link href={href('/faqs/')} className="btn-pop flex h-[44px] flex-1 items-center justify-center rounded-[8px] border border-brand bg-brand px-[8px] text-center font-roboto text-[12px] font-medium text-white lg:h-[30px] lg:w-full lg:flex-none lg:px-0">
                Tell me more
              </Link>
            </div>
          </div>

          <CertGrid />
        </div>
      </Box>

      {/* 6621:2427 */}
      <div className="h-px w-full bg-line lg:hidden" />

      {/* ------------------------------ bottom bars / 6778:3911
          The phone frame carries no grey band and no teal strip: the bar is
          two centred lines straight on the footer's own #fcfcfc. */}
      <Box x={0} y={FOOTER_BAR_Y} w={1920} h={74} className="flex flex-col items-center gap-[12px] lg:block lg:border-t lg:border-[#e5e5e5] lg:bg-[#f8f8f8]">
        <Box x={321} y={0} h={74} className="flex items-center">
          <a href="#top" className="py-[6px] font-roboto text-[14px] leading-[14px] text-muted hover:text-brand lg:py-0 lg:font-poppins">
            Back to Top &uarr;
          </a>
        </Box>
        <Box x={1321} y={0} h={74} w={280} className="flex items-center justify-center text-center lg:justify-end lg:text-left">
          <p className="font-roboto text-[14px] leading-[14px] text-ink lg:font-poppins lg:text-[#13220f]">
            Copyright@2026. All rights are reserved.
          </p>
        </Box>
      </Box>
      <Box x={0} y={FOOTER_BAR_Y + 73.91} w={1920} h={27} className="hidden bg-brand lg:block" />
    </Box>
  )
}

/** Column heading — 16px IBM Plex Medium, 0.48 tracking, in the board's 35px heading block (6778:3922). */
const HEADING = 'font-sans text-[16px] font-medium leading-[20px] tracking-[0.48px] text-black lg:h-[35px] lg:leading-[1.3]'

/** The 1px rule between board columns (Figma lines 55-57). Decorative, so board-only. */
function Rule() {
  return <div aria-hidden="true" className="hidden w-px shrink-0 self-stretch bg-line lg:block" />
}

/**
 * The facility icons are square artwork with their own padding, drawn in the
 * frame's non-square boxes (15x20, 15x21, 20x20) as a centred crop — which is
 * `object-cover`. They used to be stretched to 13x17 and 14x11.
 */
function Icon({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <Image src={src} alt="" width={w} height={h} className="mt-[1px] shrink-0 object-cover lg:mt-0"
      style={{ width: w, height: h }} />
  )
}

function LinkColumn({ groups }: { groups: Group[] }) {
  return (
    /* 6620:5101 on the phone: 16px headings over bare 14px Roboto links.
       6778:3920 on the board: groups 30 apart, each a 35px heading block over
       14px Poppins rows (py2, gap 6 — a 31px pitch) led by a chevron. */
    <div className="flex flex-col gap-[28px] lg:gap-[30px]">
      {groups.map((g) => (
        <nav key={g.heading} aria-label={g.heading}>
          <h3 className={`${HEADING} mb-[12px] lg:mb-0`}>
            {g.headingHref ? <Link href={g.headingHref} className="hover:text-brand">{g.heading}</Link> : g.heading}
          </h3>
          {/* gap 0 + py5 on the phone reproduces the frame's 10px pitch while
              turning a 20px link into a 30px tap box. */}
          <ul className="flex flex-col gap-0 lg:gap-[6px]">
            {g.links.map((l) => (
              <li key={l.l} className="flex items-center gap-[10px]">
                <span aria-hidden="true" className="hidden font-roboto text-[12px] leading-none text-muted lg:block">&rsaquo;</span>
                {l.external ? (
                  <a href={l.h} target="_blank" rel="noopener noreferrer" className={LINK}>{l.l}</a>
                ) : (
                  <Link href={l.h} className={LINK}>{l.l}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  )
}

const LINK = 'block py-[5px] font-roboto text-[14px] leading-[20px] text-muted hover:text-brand lg:whitespace-nowrap lg:py-[2px] lg:font-poppins lg:leading-[21px]'

/**
 * The certification marks — one row of three since 23 Sep 2026 (see
 * FOOTER_CERTS). Thirds of the board's 188px column, 64 tall, at the frame's
 * 80% opacity; thirds of the phone's whole column, 97 tall. The two rules
 * between the marks are grid items
 * with a left border, so they land on the track edges at any width.
 */
function CertGrid() {
  return (
    <div className="grid w-full grid-cols-3 grid-rows-[97px] lg:w-[188px] lg:grid-rows-[64px] lg:opacity-80">
      <span aria-hidden="true" className="col-start-2 row-start-1 border-l border-line" />
      <span aria-hidden="true" className="col-start-3 row-start-1 border-l border-line" />
      {FOOTER_CERTS.map((c, i) => <Cert key={c.name} c={c} col={i + 1} />)}
    </div>
  )
}

function Cert({ c, col }: { c: FooterCert; col: number }) {
  const vars = {
    '--pw': `${c.phone.w}px`, '--ph': `${c.phone.h}px`,
    '--gw': `${c.board.w}px`, '--gh': `${c.board.h}px`,
    gridColumn: col, gridRow: 1,
  } as React.CSSProperties
  const cell = 'grid place-items-center'
  const fit = c.fit === 'contain' ? 'object-contain' : c.fit === 'cover' ? 'object-cover' : 'object-fill'

  const art = (
    <span className="relative block h-[var(--ph)] w-[var(--pw)] shrink-0 overflow-hidden lg:h-[var(--gh)] lg:w-[var(--gw)]">
      {c.crop ? (
        <span className="absolute block" style={{ left: `${c.crop.left}%`, top: `${c.crop.top}%`, width: `${c.crop.w}%`, height: `${c.crop.h}%` }}>
          <Image src={c.src} alt={c.href ? '' : c.name} fill unoptimized sizes="72px" className="object-fill" />
        </span>
      ) : (
        <Image src={c.src} alt={c.href ? '' : c.name} fill unoptimized sizes="72px" className={fit} />
      )}
    </span>
  )

  /* The R2v3 mark is the whole cell as a link, so the tap target is the
     cell (117x97 on a 390 phone), not the 42px mark. */
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer"
      aria-label={`${c.name} — see Recycle Technologies in the R2 certified facility directory (opens in a new tab)`}
      className={`${cell} transition-opacity hover:opacity-70`} style={vars}>
      {art}
    </a>
  ) : (
    <span className={cell} style={vars}>{art}</span>
  )
}
