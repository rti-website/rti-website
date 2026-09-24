import Link from 'next/link'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { InteriorHeroArt, type HeroFill, type HeroWashes } from '@/components/ui/InteriorHeroArt'
import { Picker } from '@/components/client/Picker'

export type Crumb = { label: string; href: string | null }

/**
 * Service detail hero — Figma 6142:2050. 1920x470 on #0b1f3a.
 *
 * Same art as /services/ — see InteriorHeroArt — but the content is one
 * auto-layout column at x319 y113, gap 20: breadcrumb, H1, lead, then the
 * location picker and Get a Quote button side by side with a 12px gap.
 *
 * Written generic because every other service page uses this same frame, and
 * /industries/ uses it too with the button row omitted.
 *
 * MOBILE — Figma 6638:10136 in file BVtf2AOuUOcYbiMIlcKmbC (frame 6638:8236).
 * 390x360 on the same navy: one centred column, px20, H1 28/1.18 and lead
 * 15/1.5 both centred, then the picker over the button — full width, 12 apart,
 * not side by side. As on /services/, the frame carries NO breadcrumb, so it
 * is hidden rather than removed and the crumb links stay in the DOM.
 */
export function ServiceHero({
  crumbs, h1, lead, pickerPlaceholder, pickerOptions, cta, secondaryCta, label, image, imageFill, washes, top = 140,
}: {
  crumbs: Crumb[]
  /**
   * Plain text. A `\n` marks a forced line break — Asim, 23 Sep 2026, on
   * /sustainability/: "move the environmental to 2nd line of heading". Each
   * break renders as a space then <br />, so the heading's text (what a
   * crawler and a screen reader get) still reads as one sentence with a
   * space in it. No other page uses it.
   */
  h1: string
  /**
   * A string, or two spans for a lead the phone frame shortens — the location
   * pages hand in `<><span className="lg:hidden">…</span><span className="max-lg:hidden">…</span></>`
   * so both wordings ship from one DOM. Everything else passes a string.
   */
  lead: React.ReactNode
  /* A `\n` in a string lead is a desktop line break, as in `h1` but switched
     off below lg: Why Choose Us breaks after "operating history," because
     Asim asked for exactly that split, which balancing alone does not pick. */
  /** This page's own hero photograph; the shared one when omitted. */
  image?: string
  /** Draw `image` as a raw Figma image fill — see HeroFill in InteriorHeroArt. */
  imageFill?: HeroFill
  /** The washes' position, when the frame moves them — see HeroWashes. */
  washes?: HeroWashes
  /**
   * The picker and button are optional: the service detail frames carry them,
   * the Industries frame (6246:1012) does not. Omit both and the hero is just
   * breadcrumb, headline and lead.
   */
  pickerPlaceholder?: string
  pickerOptions?: string[]
  cta?: { label: string; href: string; external?: boolean }
  /** A second, outlined button after `cta` (state landing pages, 24 Sep 2026). */
  secondaryCta?: { label: string; href: string; external?: boolean }
  label?: string
  /**
   * 140 under the header on a fixed canvas page. The location pages
   * (24 Sep 2026) lay out in flow and put the hero in its own 470 tall box,
   * so they pass 0.
   */
  top?: number
}) {
  return (
    <Section
      top={top} height={470} label={label}
      className="flex flex-col justify-center bg-navy px-[20px] py-[48px] max-lg:min-h-[360px] lg:block lg:p-0"
    >
      {/*
        See the same wrapper in ServicesHero: InteriorHeroArt still builds its
        photo and washes from plain `Box`es with no `fill`, which collapse to
        zero height below lg and take the picture with them. Forced on from
        here — `!` because `.design-box { position: relative }` is unlayered in
        globals.css and outranks any utility, `lg:contents` so the board still
        resolves each Box against the Section. Delete once that file takes
        `fill`; it is a no-op then.
      */}
      <div className="max-lg:absolute max-lg:inset-0 max-lg:[&_.design-box]:absolute! max-lg:[&_.design-box]:inset-0! lg:contents">
        <InteriorHeroArt src={image} fill={imageFill} washes={washes} />
      </div>

      {/* Content column — 6199:4945 at x319 y113, w946, gap 20; 6638:10147..
          on the phone, where the column is centred and the crumbs are gone. */}
      <Box x={319} y={113} w={946} className="flex flex-col items-start gap-[20px] max-lg:items-center">
        <nav aria-label="Breadcrumb" className="max-lg:hidden">
          <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-[13px]">
                {i > 0 && <span aria-hidden="true" className="text-white/50">/</span>}
                {c.href
                  ? <Link href={c.href} className="text-white/50 hover:text-white">{c.label}</Link>
                  : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="w-full text-center font-sans text-[28px] font-semibold leading-[1.18] text-white lg:w-auto lg:text-left lg:text-[60px] lg:leading-[70px] lg:tracking-[-1.5px]">
          {h1.includes('\n')
            ? h1.split('\n').map((line, i, all) => (
              <span key={i}>{line}{i < all.length - 1 && <>{' '}<br /></>}</span>
            ))
            : h1}
        </h1>

        {/* `text-balance` — Asim, 24 Sep 2026: the lead as two lines of about
            equal length under the H1 on every page ("keep till history in one
            line, after that move it to 2nd line so both the lines look equal"),
            rather than a full first line and a short second one. The browser
            evens the lines out itself, so no page needs a hand-placed break.
            A lead of more than about 200 characters needs three lines at the
            column's 946, so it gets 1100 (to x1419) and fits in two; nothing
            that long can collapse to one line at that width. The two longest
            (Hard Drive Destruction, the Wisconsin electronics ad page) still
            need three, balanced. */}
        <p className={`w-full text-center font-roboto text-[15px] leading-[1.5] text-white/70 lg:text-left lg:text-[18px] lg:leading-[27px] lg:text-balance ${typeof lead === 'string' && lead.length > 200 ? 'lg:w-[1100px] lg:max-w-none' : 'lg:w-auto'}`}>
          {typeof lead === 'string' && lead.includes('\n')
            ? lead.split('\n').map((line, i, all) => (
              <span key={i}>{line}{i < all.length - 1 && <>{' '}<br className="max-lg:hidden" /></>}</span>
            ))
            : lead}
        </p>

        {(cta || pickerOptions) && (
          <div className="flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:items-start">
            {pickerOptions && (
              <div className="h-[50px] w-full lg:w-[393px]">
                <Picker
                  id="service-location"
                  placeholder={pickerPlaceholder ?? 'Select Your Location'}
                  srLabel="Select your location"
                  options={pickerOptions}
                />
              </div>
            )}
            {cta && (
              <Btn
                href={cta.href}
                variant="colored"
                external={cta.external}
                className="max-lg:w-full max-lg:justify-center"
              >
                {cta.label}
              </Btn>
            )}
            {secondaryCta && (
              /* Outlined white on the navy hero, beside the teal primary. */
              <Btn
                href={secondaryCta.href}
                variant="white"
                external={secondaryCta.external}
                className="border border-white/60 max-lg:w-full max-lg:justify-center"
              >
                {secondaryCta.label}
              </Btn>
            )}
          </div>
        )}
      </Box>
    </Section>
  )
}
