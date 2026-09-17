/**
 * The teal bullet card that sits beside a prose column — "Quick Facts" on
 * /about-us.../ (Figma 6372:854) and "Where We Operate" on /all-locations/
 * (6377:7090). Identical frames: 502 wide, 12px radius, 32px padding, 20px
 * gap, a 19px title and 8px teal dots against Poppins 14.5.
 */
export function FactsCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex w-[502px] shrink-0 flex-col items-start gap-[20px] rounded-[12px] bg-brand-soft p-[32px]">
      <p className="font-sans text-[19px] font-medium leading-[1.3] text-heading">{title}</p>
      <ul className="flex flex-col gap-[20px]">
        {items.map((f) => (
          <li key={f} className="flex items-center gap-[12px]">
            <span className="size-[8px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
            <span className="w-[400px] font-poppins text-[14.5px] leading-[22px] text-[#333]">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
