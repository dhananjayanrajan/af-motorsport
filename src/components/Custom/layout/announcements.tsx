'use client'

import { Announcement as AnnouncementType } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight, Radio } from 'lucide-react'
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

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ])

  if (activeItems.length === 0) return null

  return (
    <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
      <div className="h-14 bg-white-100 flex items-center px-8 border-b-2 border-black-pure justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Radio className="size-4 text-primary-500 animate-pulse" />
            <span className="text-black-pure font-mono text-xs font-black tracking-widest uppercase">
              LATEST UPDATES
            </span>
          </div>
        </div>
        <span className="text-xs font-mono font-black text-black-pure uppercase">
          COUNT: {activeItems.length}
        </span>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">
          {activeItems.map((item, index) => {
            const isUrgent = item.type === 'urgent'
            const accentColor = isUrgent ? 'bg-tertiary-500' : 'bg-primary-500'

            return (
              <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0">
                <div className="relative h-[400px] flex flex-col border-r-2 border-black-pure bg-white-pure group transition-all duration-300 hover:bg-white-50">
                  <div className="h-16 flex items-center px-8 border-b-2 border-black-pure group-hover:bg-black-pure transition-colors duration-300">
                    <div className="size-8 bg-black-pure flex items-center justify-center group-hover:bg-white-pure transition-colors">
                      <span className="text-white-pure font-mono text-xs font-black group-hover:text-black-pure">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4">
                      <span className={`text-xs font-mono font-black uppercase tracking-widest ${isUrgent ? 'text-tertiary-500' : 'text-black-pure/40'} group-hover:text-white-pure`}>
                        {item.type || 'NEWS'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-4">
                      <h4 className="text-2xl font-black uppercase tracking-tighter text-black-pure leading-tight group-hover:translate-x-1 transition-transform">
                        {item.title}
                      </h4>
                      <p className="text-xs font-sans font-bold uppercase leading-normal text-black-pure/60 line-clamp-4">
                        {item.message}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 border-2 border-black-pure">
                        <div className={`h-8 flex items-center justify-center border-r-2 border-black-pure ${accentColor}`}>
                          <span className="text-[10px] font-mono font-black text-black-pure">TYPE</span>
                        </div>
                        <div className="h-8 flex items-center justify-center bg-white-pure">
                          <span className="text-[10px] font-mono font-black text-black-pure uppercase">
                            {isUrgent ? 'PRIORITY' : 'STANDARD'}
                          </span>
                        </div>
                      </div>

                      {item.link?.enable && item.link.url && (
                        <Link
                          href={item.link.url}
                          className="w-full h-12 bg-black-pure flex items-center justify-between px-6 group/btn hover:bg-primary-500 transition-all focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          <span className="text-white-pure font-mono text-xs font-black tracking-widest group-hover/btn:text-black-pure">
                            VIEW
                          </span>
                          <ChevronRight className="size-4 text-primary-500 group-hover/btn:text-black-pure" />
                        </Link>
                      )}
                    </div>
                    <div className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${accentColor}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}