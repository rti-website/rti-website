import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { Accordion, type FaqItem } from '@/components/client/Accordion'

/**
 * FAQ band — Figma 6146:2417. 1920x676.93 on #f4f9f6.
 *   heading group  6146:2418  x570 y100  w780, column gap 10
 *   accordion      6146:2424  x570 y296.5 w780, rows 44.086 with 15px gaps
 *
 * MOBILE — Figma 6656:5055 in file BVtf2AOuUOcYbiMIlcKmbC: px20 / py40, a
 * 16px column, heading and lead centred, then the list. The rows themselves
 * need nothing here — Accordion already draws its phone shape and its own 4px
 * mobile gap, so `gap` stays the board's 15.
 */
export function ServiceFaq({
  top, height = 676.93, label, eyebrow, heading, lead, items, listTop = 296.5,
}: {
  top: number
  height?: number
  /**
   * Where the accordion starts. 296.5 on the service frames; the Contact Us
   * frame (6370:6930) sets a shorter heading block and starts its list at 276.
   */
  listTop?: number
  label?: string
  eyebrow: string
  heading: string
  lead: string
  items: FaqItem[]
}) {
  return (
    <Section
      top={top} height={height} label={label}
      className="flex flex-col gap-[16px] bg-[#f4f9f6] px-[20px] py-[40px] lg:block lg:p-0"
    >
      <CenterBox y={100} w={780} className="flex flex-col items-center gap-[16px] lg:gap-[10px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title className="text-center">{heading}</Title>
        <Lead className="text-center">{lead}</Lead>
      </CenterBox>

      <Box x={570} y={listTop} w={780} className="self-stretch">
        <Accordion items={items} gap={15} />
      </Box>
    </Section>
  )
}
