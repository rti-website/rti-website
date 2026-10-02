'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * The play button and "Watch Video" label on the homepage How It Works card
 * (Figma 7184:3375 "Component 163" + 7184:3255), and the pop-up that plays the
 * RTI explainer — Asim, 2 Oct 2026: "add this video in this place".
 *
 * WHY CLIENT: it has to open and close a player. Nothing else on the card
 * moves, so the card itself stays a server component (HowItWorks) and only
 * this button and its dialog ship JavaScript.
 *
 * THE VIDEO IS NOT LOADED UNTIL SOMEONE ASKS FOR IT. The <video> exists only
 * while the dialog is open, so the homepage pays nothing for a 6 MB file most
 * visitors never play: no preload, no poster request, no LCP cost.
 *
 * Same dialog pattern as SuccessDialog — native <dialog> + showModal() for the
 * focus trap, Escape and the inert page, and a portal to <body> so the board's
 * CSS zoom does not scale the player.
 */
export function VideoPlay({
  src, title, label, iconClass = '', labelClass = '',
}: {
  /** The file, e.g. /videos/rti-explainer.mp4 (public/videos). */
  src: string
  /** Read out for the dialog and the video. */
  title: string
  /** The words under the button, "Watch Video". */
  label: string
  iconClass?: string
  labelClass?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group flex flex-col items-center"
      >
        {/* 136x136 with the 116 circle inset 10, as the component draws it. */}
        <span className={`grid place-items-center transition-transform duration-200 group-hover:scale-105 ${iconClass}`}>
          <Image src="/images/icons/play-116.svg" alt="" width={116} height={116} className="size-full" unoptimized />
        </span>
        <span className={labelClass}>{label}</span>
      </button>
      {open && <Player src={src} title={title} onClose={() => setOpen(false)} />}
    </>
  )
}

function Player({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
  }, [])
  return createPortal(
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="m-auto w-[calc(100%-24px)] max-w-[1100px] overflow-visible border-0 bg-transparent p-0 backdrop:bg-[#0c2230]/80"
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-[44px] right-0 grid size-[36px] place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          <svg viewBox="0 0 16 16" className="size-[16px]" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <video
          src={src}
          title={title}
          controls
          autoPlay
          playsInline
          className="block aspect-video w-full rounded-[12px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        />
      </div>
    </dialog>,
    document.body,
  )
}
