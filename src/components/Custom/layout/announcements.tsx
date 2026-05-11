'use client'

import { Announcement as AnnouncementType } from '@/payload-types'
import { ArrowRight, Radio } from 'lucide-react'
import Link from 'next/link'

interface AnnouncementsSectionProps {
  data: AnnouncementType
}

export const AnnouncementsSection = ({ data }: AnnouncementsSectionProps) => {
  const items = data?.items || []
  const activeItems = items.filter((item) => {
    if (!item.active) return false
    const now = new Date().getTime()
    if (item.from && new Date(item.from).getTime() > now) return false
    if (item.until && new Date(item.until).getTime() < now) return false
    return true
  })

  if (activeItems.length === 0) return null

  const marqueeContent = [...activeItems, ...activeItems, ...activeItems, ...activeItems]

  return (
    <section className="relative w-full bg-white-pure border-y-2 border-black-pure overflow-hidden group/ticker">
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-white-pure z-30 border-r-2 border-black-pure flex items-center justify-center">
        <Radio className="size-4 text-primary-500 animate-pulse" />
      </div>

      <div className="flex whitespace-nowrap py-0 select-none">
        <div className="flex animate-marquee group-hover/ticker:[animation-play-state:paused]">
          {marqueeContent.map((item, index) => {
            const isUrgent = item.type === 'urgent'
            const hasLink = !!(item.link?.enable && item.link?.url)
            const accentBg = isUrgent ? 'hover:bg-tertiary-500 focus:bg-tertiary-500' : 'hover:bg-primary-500 focus:bg-primary-500'
            const baseClass = `flex items-center group/item px-10 md:px-16 border-r-2 border-black-pure last:border-r-0 h-16 md:h-20 transition-all duration-300 ease-in-out outline-none ${hasLink ? `${accentBg} cursor-pointer` : 'cursor-default'}`

            const content = (
              <div className="flex items-center gap-6">
                <span className="text-xs font-black tabular-nums text-black-pure transition-colors group-hover/item:text-black-pure">
                  {(index % activeItems.length + 1).toString().padStart(2, '0')}
                </span>

                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm md:text-lg font-black uppercase tracking-tighter text-black-pure transition-colors group-hover/item:text-black-pure">
                      {item.title}
                    </h4>
                    {isUrgent && (
                      <span className="bg-black-pure text-tertiary-500 text-[9px] font-black px-2 py-0.5 leading-none transition-colors group-hover/item:bg-white-pure group-hover/item:text-black-pure">
                        {item.type}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] md:text-xs font-bold uppercase text-black-pure transition-colors group-hover/item:text-black-pure">
                    {item.message}
                  </p>
                </div>

                {hasLink && (
                  <ArrowRight className="size-5 text-black-pure transition-transform duration-300 group-hover/item:translate-x-2" />
                )}
              </div>
            )

            if (hasLink) {
              return (
                <Link
                  key={`${item.id}-${index}`}
                  href={item.link?.url as string}
                  className={baseClass}
                >
                  {content}
                </Link>
              )
            }

            return (
              <div key={`${item.id}-${index}`} className={baseClass}>
                {content}
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-white-pure z-30 border-l-2 border-black-pure flex items-center justify-center pointer-events-none">
        <span className="text-xs font-black text-black-pure tabular-nums">
          {activeItems.length}
        </span>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  )
}