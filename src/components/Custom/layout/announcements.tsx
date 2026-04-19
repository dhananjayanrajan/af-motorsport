'use client'

import { Announcement as AnnouncementType } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
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

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  if (activeItems.length === 0) return null

  return (
    <section className="relative w-full bg-white-50 flex flex-col overflow-hidden border-b-2 border-black-pure">
      <div className="h-16 bg-white-200 flex items-center px-4 md:px-8 border-b-2 border-black-pure justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-black-pure font-mono text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
            ANNOUNCEMENTS
          </span>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-primary animate-pulse" />
            <span className="text-[10px] font-mono font-black text-black-pure opacity-40 uppercase">
              LIVE
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black text-black-pure uppercase">
          COUNT: {String(activeItems.length).padStart(2, '0')}
        </span>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">
          {activeItems.map((item, index) => {
            const isUrgent = item.type === 'urgent'
            const isWarning = item.type === 'warning'
            const statusColor = isUrgent ? 'bg-tertiary-500' : isWarning ? 'bg-secondary' : 'bg-primary'

            return (
              <div
                key={item.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0"
              >
                <div className="relative h-[450px] md:h-[500px] flex flex-col border-r-2 border-black-pure bg-white-100 group transition-all duration-300">
                  <div className="h-20 flex items-center px-6 md:px-8 border-b-2 border-black-pure bg-white-50 group-hover:bg-white-200 transition-colors duration-300">
                    <div className="w-10 h-10 bg-black-pure flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <span className="text-white-pure font-mono text-sm font-black group-hover:text-black-pure transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${isUrgent ? 'text-tertiary-500' : 'text-black-pure/40'}`}>
                        {item.type || 'INFO'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 md:p-10 flex flex-col justify-between relative">
                    <div className="relative z-10">
                      <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black-pure leading-[0.9] mb-4 md:mb-6">
                        {item.title}
                      </h4>
                      <p className="text-sm font-mono font-black uppercase leading-tight text-black-pure/60 line-clamp-4">
                        {item.message}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                      <div className="grid grid-cols-2 border-2 border-black-pure">
                        <div className={`h-10 flex items-center justify-center border-r-2 border-black-pure ${statusColor}`}>
                          <span className="text-[10px] font-mono font-black text-black-pure uppercase">
                            STATUS
                          </span>
                        </div>
                        <div className="h-10 flex items-center justify-center bg-white-pure">
                          <span className="text-[10px] font-mono font-black text-black-pure uppercase">
                            {item.from ? new Date(item.from).toLocaleDateString() : 'ACTIVE'}
                          </span>
                        </div>
                      </div>

                      {item.link?.enable && item.link.url ? (
                        <Link
                          href={item.link.url}
                          className="w-full h-14 bg-black-pure flex items-center justify-between px-6 group/btn hover:bg-primary transition-all duration-300"
                        >
                          <span className="text-white-pure font-mono text-xs font-black tracking-widest group-hover/btn:text-black-pure transition-colors">
                            {item.link.label || 'VIEW'}
                          </span>
                          <div className="w-2 h-6 bg-primary group-hover/btn:bg-black-pure transition-colors" />
                        </Link>
                      ) : (
                        <div className="h-14 border-2 border-black-pure border-dashed flex items-center justify-center opacity-20">
                          <span className="text-[10px] font-mono font-black uppercase">NO LINK</span>
                        </div>
                      )}
                    </div>

                    <div className={`absolute bottom-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${statusColor}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-10 bg-black-pure flex items-center px-4 md:px-8 justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="size-1 bg-primary" />
            <div className="size-1 bg-primary/40" />
            <div className="size-1 bg-primary/20" />
          </div>
          <span className="text-[8px] md:text-[9px] font-mono font-black text-white-pure/40 tracking-[0.3em] uppercase truncate">
            SYSTEM FEED
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono font-black text-primary uppercase hidden sm:inline">READY</span>
          <div className="w-8 md:w-12 h-0.5 bg-white-pure/10">
            <div className="h-full bg-primary w-2/3" />
          </div>
        </div>
      </div>
    </section>
  )
}