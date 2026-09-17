'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SERVICE_CARDS, SERVICE_TABS } from '@/data/home'
import { ServiceTile } from '@/components/ui/ServiceTile'

/** Tabs + card grid — Figma 6107:1552. Tab strip 1004px, cards full 1282px. */
export function ServiceTabs() {
  // SERVICE_TABS is derived from a non-empty literal, but noUncheckedIndexedAccess
  // does not know that — fall back rather than assert.
  const [active, setActive] = useState<string>(SERVICE_TABS[0]?.id ?? 'recycling')
  const cards = SERVICE_CARDS[active] ?? []

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center">
        <div role="tablist" aria-label="Service categories" className="flex w-[1004px] items-start justify-center gap-[2px]">
          {SERVICE_TABS.map((tab) => {
            const on = tab.id === active
            return (
              <button
                key={tab.id} role="tab" type="button" id={`tab-${tab.id}`}
                aria-selected={on} aria-controls={`panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className="flex flex-1 cursor-pointer flex-col"
              >
                <span className={`flex h-[60px] items-center justify-center gap-[8.008px] rounded-t-[10px] border-l border-r border-t px-[20.021px] ${on ? 'border-[#bbb] bg-brand' : 'border-[rgba(151,151,151,0.28)] bg-white'}`}>
                  <Image src={tab.icon} alt="" width={tab.w} height={tab.h} style={{ width: tab.w, height: tab.h }} className="object-contain" />
                  <span className={`whitespace-nowrap font-roboto text-[21.01px] capitalize leading-[16.517px] tracking-[0.8909px] ${on ? 'font-medium text-white' : 'font-normal text-muted'}`}>
                    {tab.label}
                  </span>
                </span>
                <span className={`h-[3px] w-full ${on ? 'bg-brand' : 'bg-transparent'}`} />
              </button>
            )
          })}
        </div>
        <div className="h-px w-full bg-[#dcdcdc]" />
      </div>

      {/* min-height keeps the section a constant height across tabs, so the
          buttons below do not jump when the card count changes. */}
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="min-h-[454px] pt-[48px]"
      >
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-stretch gap-[16px]">
            {cards.slice(0, 3).map((c) => <ServiceTile key={c.l1} card={c} className="flex-1" />)}
          </div>
          {cards.length > 3 && (
            <div className="flex items-stretch justify-center gap-[16px]">
              {cards.slice(3).map((c) => <ServiceTile key={c.l1} card={c} className="w-[416.667px]" />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
