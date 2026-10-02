import Image from 'next/image'

/**
 * A hero band made of photographs side by side instead of one — the Why Choose
 * Us hero redrawn 2 Oct 2026 (Figma BVtf2AOuUOcYbiMIlcKmbC 7195:3472, in frame
 * 6374:4567). Asim: "we have to change the hero image in why choose us and
 * also adjust it in mobile version".
 *
 * THE FRAME: a #0b1f3a band, three 640x470 photos edge to edge (Drop-off
 * 7195:3478, Mail-in 7195:3479, Pickup 7195:3480, each object-cover), then a
 * solid-to-clear green wash left to right (7195:3481, rgb(27,122,61) to clear
 * at 50%) and a navy fade up from the bottom (7195:3482: a 470 box hung 160
 * below the band — clear, 0.8 at 55%, solid #0b1f3a). The frame also draws a
 * navy "Top Overlay" per photo, but UNDER each photo, so it never shows; it
 * is left out rather than drawn over the pictures.
 *
 * THE PHONE: no phone frame for this yet (6687:3526 still draws the single
 * photo). The same three panels share the 390-wide band, each a third, with
 * the same two washes, so it reads as the same hero rather than a crop of one
 * of the photos. Everything is in percentages of the band, so one set of
 * rules serves both widths.
 */
export function HeroPanels({ images }: { images: { src: string; alt?: string }[] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#0b1f3a]">
      <div className="absolute inset-0 flex">
        {images.map((im) => (
          <div key={im.src} className="relative h-full min-w-0 flex-1">
            <Image src={im.src} alt="" fill priority sizes="(width < 64rem) 34vw, 640px" className="object-cover" />
          </div>
        ))}
      </div>
      {/* Phone only: a 45% navy veil, because at a third of 390 each photo is
          mostly its busiest middle and the centred white lead sits right on
          it. The board's lead sits on the green wash and needs none. */}
      <div className="absolute inset-0 bg-[rgba(11,31,58,0.45)] lg:hidden" />
      {/* 7195:3481 — the green wash. */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, rgb(27,122,61) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 100%)' }} />
      {/* 7195:3482 — 470 tall, bottom -160: top at 160/470 of the band, and it
          runs 100% of the band's height past that. */}
      <div
        className="absolute inset-x-0"
        style={{
          top: `${(160 / 470) * 100}%`,
          height: '100%',
          backgroundImage: 'linear-gradient(180deg, rgba(11,31,58,0) 0%, rgba(11,31,58,0.8) 55%, #0b1f3a 100%)',
        }}
      />
    </div>
  )
}
