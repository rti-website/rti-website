import { HOME_BELOW_HOW_SHIFT, HOME_MAILIN_H } from '@/lib/layout'
import { Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { content } from '@/lib/page-content'

/**
 * The homepage's mail-in band, right under Our Strategic National Network
 * (9 Oct 2026, SEO sheet "Technical Fixes 09/10/26", Other Fixes: "Add band
 * after the locations section: 'Outside our service area? Ship it to us with
 * a mail-in recycling kit.' Button: See mail-in kits, to /mail-in-recycling/").
 *
 * No Figma frame. It takes the site's light plate (#eaf4f5, as the facility
 * notices and the Items We Accept pills) in the 1282 column, one line and the
 * teal button side by side on the board, stacked and centred on the phone.
 * Copy: HOME_MAILIN_BAND in src/data/home.ts (Admin -> Pages, Homepage).
 */
export async function MailInBand() {
  const { HOME_MAILIN_BAND: B } = await content('home')
  return (
    <Section
      top={5117 + 1472 - HOME_BELOW_HOW_SHIFT}
      height={HOME_MAILIN_H}
      label="home-mail-in-band"
      className="flex items-center justify-center bg-white px-[20px] py-[24px] lg:p-0"
    >
      <div className="flex w-full flex-col items-center gap-[16px] rounded-[16px] border border-[#cfe5e7] bg-[#eaf4f5] px-[22px] py-[26px] text-center lg:w-[1282px] lg:flex-row lg:justify-between lg:gap-[32px] lg:px-[48px] lg:py-[34px] lg:text-left">
        <p className="font-sans text-[18px] font-semibold leading-[1.35] text-heading lg:text-[24px]">{B.text}</p>
        <Btn href={B.button.href} variant="colored" className="shrink-0">{B.button.label}</Btn>
      </div>
    </Section>
  )
}
