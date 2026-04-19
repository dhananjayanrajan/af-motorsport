'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Announcement as AnnouncementType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import AutoScroll from 'embla-carousel-auto-scroll'
import Link from 'next/link'
import * as React from 'react'

interface AnnouncementsSectionProps {
  data: AnnouncementType
}

export const AnnouncementsSection = ({ data }: AnnouncementsSectionProps) => {
  const plugin = React.useRef(
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true
    })
  )

  const items = data?.items || []

  const activeItems = items.filter((item) => {
    if (!item.active) return false
    const now = new Date().getTime()
    if (item.from && new Date(item.from).getTime() > now) return false
    if (item.until && new Date(item.until).getTime() < now) return false
    return true
  })

  if (activeItems.length === 0) return null

  const displayItems = activeItems.length < 10
    ? [...activeItems, ...activeItems, ...activeItems, ...activeItems]
    : activeItems

  return (
    <section className="relative w-full border-y-2 border-black-pure bg-white-50 overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {displayItems.map((item, idx) => {
            const isUrgent = item.type === 'urgent' || item.type === 'warning'

            return (
              <CarouselItem
                key={`${item.id}-${idx}`}
                className="pl-0 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="group relative h-[400px] border-r-2 border-black-pure flex flex-col transition-all duration-300 overflow-hidden">

                  <div className={cn(
                    "h-16 flex items-center justify-between px-8 border-b-2 border-black-pure z-10 transition-colors duration-300",
                    isUrgent ? "bg-tertiary-500" : "bg-white-200 group-hover:bg-primary"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "size-4 border-2 border-black-pure transition-all duration-500",
                        isUrgent ? "bg-white-pure animate-pulse" : "bg-black-pure group-hover:bg-white-pure group-hover:rotate-90"
                      )} />
                      <span className={cn(
                        "text-[10px] font-mono font-black tracking-[0.4em] uppercase",
                        isUrgent ? "text-white-pure" : "text-black-pure"
                      )}>
                        {item.type}
                      </span>
                    </div>
                    <span className={cn(
                      "text-[10px] font-mono font-black opacity-30",
                      isUrgent ? "text-white-pure" : "text-black-pure"
                    )}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 p-8 flex flex-col justify-between relative z-10 bg-white-50 group-hover:bg-white-100 transition-colors duration-300">
                    <div className="space-y-4">
                      <h4 className="text-xl font-black uppercase tracking-tighter text-black-pure leading-none">
                        {item.title}
                      </h4>
                      <div className="w-12 h-1 bg-black-pure group-hover:w-full transition-all duration-500" />
                      <p className="text-[11px] font-bold uppercase tracking-tight text-black-pure leading-tight max-w-[90%]">
                        {item.message}
                      </p>
                    </div>

                    <div className="mt-6">
                      {item.link?.enable && item.link.url ? (
                        <Link
                          href={item.link.url}
                          className="group/link flex items-center justify-between w-full h-14 bg-black-pure px-6 transition-all duration-300 hover:bg-secondary"
                        >
                          <span className="text-[10px] font-mono font-black tracking-[0.3em] text-white-pure uppercase">
                            {item.link.label || 'VIEW DETAILS'}
                          </span>
                          <div className="size-2 bg-white-pure group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <div className="flex gap-1.5">
                          <div className="size-4 bg-primary" />
                          <div className="size-4 bg-secondary" />
                          <div className="size-4 bg-tertiary-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={cn(
                    "absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none",
                    isUrgent ? "bg-tertiary-500/10" : "bg-primary/10"
                  )} />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}