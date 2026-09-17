'use client'

import { useState } from 'react'

/** Carousel pager — Figma node 6044:19147. Visual only until the real reviews land. */
export function TestimonialPager({ count }: { count: number }) {
  const [index, setIndex] = useState(0)
  const go = (d: number) => setIndex((i) => (i + d + count) % count)

  return (
    <div className="flex items-center gap-[11px]">
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous testimonials"
        className="grid size-[44px] place-items-center rounded-full border-2 border-[#d6e6de] bg-white text-[18px] text-[#2e6b4f]"
      >
        &larr;
      </button>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index}
          className={
            i === index
              ? 'size-[12.15px] rounded-full border border-[#d6e6de] bg-[#2e6b4f]'
              : 'size-[9px] rounded-full border border-[#d6e6de] bg-[#d6e6de]'
          }
        />
      ))}
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next testimonials"
        className="grid size-[44px] place-items-center rounded-full border-2 border-[#d6e6de] bg-white text-[18px] text-[#2e6b4f]"
      >
        &rarr;
      </button>
    </div>
  )
}
