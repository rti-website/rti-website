import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { Accordion, type FaqItem } from '@/components/client/Accordion'

/**
 * FAQ band — Figma 6146:2417. 1920x676.93 on #f4f9f6.
 *   heading group  6146:2418  x570 y100  w780, column gap 10
 *   accordion      6146:2424  x570 y296.5 w780, rows 44.086 with 15px gaps
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
    <Section top={top} height={height} label={label} className="bg-[#f4f9f6]">
      <CenterBox y={100} w={780} className="flex flex-col items-center gap-[10px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title className="text-center">{heading}</Title>
        <Lead className="text-center">{lead}</Lead>
      </CenterBox>

      <Box x={570} y={listTop} w={780}>
        <Accordion items={items} gap={15} />
      </Box>
    </Section>
  )
}
