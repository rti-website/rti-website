import { Section } from '@/components/design/Frame'
import { BlogNewsletterForm } from '@/components/client/BlogNewsletterForm'
import { NEWSLETTER } from '@/data/blog'

/** Newsletter — Figma 6384:1226. py 80, gap 28, on the teal tint. */
export function BlogNewsletter({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6384:1226"
      className="flex flex-col items-center gap-[28px] bg-brand-soft py-[80px]">
      <div className="flex w-[700px] flex-col items-center gap-[10px] text-center">
        <h2 className="font-sans text-[32px] font-semibold leading-[1.3] text-heading">{NEWSLETTER.heading}</h2>
        <p className="font-roboto text-[15.5px] leading-[1.175] text-muted">{NEWSLETTER.lead}</p>
      </div>
      <BlogNewsletterForm />
      <p className="whitespace-nowrap text-center font-roboto text-[12.5px] leading-[1.175] text-[#999]">
        {NEWSLETTER.disclaimer}
      </p>
    </Section>
  )
}
