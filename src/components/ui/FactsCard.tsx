/**
 * The teal bullet card that sits beside a prose column — "Quick Facts" on
 * /about-us.../ (Figma 6372:854) and "Where We Operate" on /all-locations/
 * (6377:7090). Identical frames: 502 wide, 12px radius, 32px padding, 20px
 * gap, a 19px title and 8px teal dots against Poppins 14.5.
 */
export function FactsCard({ title, items }: { title: string; items: string[] }) {
  return (
    /* 502 and 400 were unconditional until 22 Sep 2026 and overflowed a phone
       by 112px. Both are lg-only now; below lg the card fills its column and
       the fact wraps inside it. */
    <div className="flex w-full flex-col items-start gap-[20px] rounded-[12px] bg-brand-soft p-[24px] lg:w-[502px] lg:shrink-0 lg:p-[32px]">
      <p className="font-sans text-[19px] font-medium leading-[1.3] text-heading">{title}</p>
      <ul className="flex w-full flex-col gap-[20px]">
        {items.map((f) => (
          <li key={f} className="flex items-center gap-[12px]">
            <span className="size-[8px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
            <span className="min-w-px flex-1 font-poppins text-[14.5px] leading-[22px] text-[#333] lg:w-[400px] lg:flex-none">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
