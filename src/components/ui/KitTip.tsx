import Link from 'next/link'

/**
 * The mail-in kit tip under a service page's hero buttons and in its closing
 * band — "Not near any of our locations, or have a few batteries only? Order a
 * battery recycling kit and mail them in." (6 Oct 2026, the "RTI Recycling Kits
 * Links to EZonEarth" sheet). The link opens that material's kit collection on
 * ezontheearth.com in a new tab. Always on a dark band, so white text.
 */
export type KitTipCopy = {
  /** The question before the link. */
  lead: string
  /** The linked words. */
  link: string
  /** The EZ on the Earth collection, with its utm tags. */
  href: string
  /** Words after the link ("and mail them in."). */
  after?: string
}

export function KitTip({ tip, className = '' }: { tip: KitTipCopy; className?: string }) {
  return (
    <p className={`flex items-start gap-[8px] font-roboto text-[14px] leading-[1.5] text-white/85 lg:text-[15px] ${className}`}>
      {/* A small parcel, the wireframe's box icon. */}
      <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-[2px] size-[16px] shrink-0 fill-none stroke-current lg:size-[17px]" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M10 2.5 17 6v8l-7 3.5L3 14V6l7-3.5Z" />
        <path d="M3 6l7 3.5L17 6M10 9.5v8M6.5 4.25l7 3.5" />
      </svg>
      <span>
        {tip.lead}{' '}
        {/* A link on this site (/mail-in-recycling/) opens in the same tab. */}
        {tip.href.startsWith('/')
          ? <Link href={tip.href} className="font-medium text-white underline underline-offset-2 hover:text-white/80">{tip.link}</Link>
          : <a href={tip.href} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline underline-offset-2 hover:text-white/80">{tip.link}</a>}
        {tip.after ? <>{' '}{tip.after}</> : null}
      </span>
    </p>
  )
}
