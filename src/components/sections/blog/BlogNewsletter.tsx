import { Section } from '@/components/design/Frame'
import { BlogNewsletterForm } from '@/components/client/BlogNewsletterForm'
import { NEWSLETTER } from '@/data/blog'

/**
 * Newsletter — Figma 6384:1226. py 80, gap 28, on the teal tint.
 *
 * MOBILE — 6638:8315. !! THE BAND INVERTS. The board draws dark type on the
 * teal TINT (#eaf4f5); the phone frame draws it on SOLID teal (#05838b) with
 * white type throughout. That is the designer's call, not a reflow artefact, so
 * it is built as drawn and flagged: below lg this band is the only solid-teal
 * block on the page. py48 / px20, a 20px stack, everything centred and full
 * width.
 *
 * !! `BarForm` WRITES ITS 560px WIDTH AS AN INLINE STYLE, so it overflows a 390
 * frame at every viewport. BarForm belongs to /all-locations/ as well and is not
 * this section's to edit, so it is neutralised from here: `w-full!` is the only
 * thing that beats an inline width, and the rest of the rules restack the bar
 * into the frame's two rows — a 48px field over a full-width Subscribe button.
 * Delete all six once BarForm takes a responsive width of its own.
 */
export function BlogNewsletter({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6384:1226"
      className="flex flex-col items-center gap-[20px] bg-brand px-[20px] py-[48px] max-lg:[&_form]:h-auto max-lg:[&_form]:flex-wrap max-lg:[&_form]:gap-y-[12px] max-lg:[&_form]:rounded-[12px] max-lg:[&_form]:p-[12px] max-lg:[&_form]:w-full! max-lg:[&_form>button]:w-full max-lg:[&_form>button]:justify-center lg:gap-[28px] lg:bg-brand-soft lg:px-0 lg:py-[80px]">
      <div className="flex w-full flex-col items-center gap-[20px] text-center lg:w-[700px] lg:gap-[10px]">
        <h2 className="font-sans text-[26px] font-semibold leading-[1.3] text-white lg:text-[32px] lg:text-heading">{NEWSLETTER.heading}</h2>
        <p className="font-roboto text-[15.5px] leading-[1.175] text-white/80 lg:text-muted">{NEWSLETTER.lead}</p>
      </div>
      <BlogNewsletterForm />
      {/* whitespace-nowrap only at lg: this sentence is 77 characters and would
          push a 390 viewport out on its own. */}
      <p className="text-center font-roboto text-[12.5px] leading-[1.175] text-white/70 lg:whitespace-nowrap lg:text-[#999]">
        {NEWSLETTER.disclaimer}
      </p>
    </Section>
  )
}
