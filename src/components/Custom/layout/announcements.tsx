'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Announcement as AnnouncementType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import AutoScroll from 'embla-carousel-auto-scroll'
import { AlertCircle, Bell, ChevronRight, Info, PartyPopper } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'

const typeStyles = {
  info: {
    icon: Info,
    color: 'text-blue-500',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    border: 'border-blue-500/50',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-amber-500',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]',
    border: 'border-amber-500/50',
  },
  urgent: {
    icon: Bell,
    color: 'text-red-600',
    glow: 'shadow-[0_0_30px_rgba(220,38,38,0.3)]',
    border: 'border-red-600/50',
  },
  celebration: {
    icon: PartyPopper,
    color: 'text-purple-500',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    border: 'border-purple-500/50',
  },
}

interface AnnouncementsSectionProps {
  data: AnnouncementType
}

export const AnnouncementsSection = ({ data }: AnnouncementsSectionProps) => {
  const plugin = React.useRef(
    AutoScroll({
      speed: 2,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true
    })
  )

  if (!data?.items || data.items.length === 0) return null

  const activeItems = data.items.filter((item) => {
    if (!item.visible) return false
    const now = new Date()
    if (item.schedule?.from && new Date(item.schedule.from) > now) return false
    if (item.schedule?.until && new Date(item.schedule.until) < now) return false
    return true
  })

  if (activeItems.length === 0) return null

  const displayItems = activeItems.length < 10
    ? [...activeItems, ...activeItems, ...activeItems, ...activeItems]
    : activeItems

  return (
    <section className="relative z-30 w-full bg-black border-y border-zinc-900 overflow-hidden py-0 mt-12">
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-[-60px]">
            {displayItems.map((item, idx) => {
              const style = typeStyles[item.type as keyof typeof typeStyles] || typeStyles.info
              const Icon = style.icon

              return (
                <CarouselItem key={`${item.id}-${idx}`} className="pl-0 basis-full md:basis-1/3 lg:basis-1/5 xl:basis-1/6">
                  <motion.div
                    whileHover={{ scale: 1.05, zIndex: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative h-80 cursor-pointer overflow-visible"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 z-0 bg-zinc-950 border-x border-zinc-900 transition-all duration-500 -skew-x-12",
                        "group-hover:bg-zinc-900 group-hover:border-white/20 group-hover:z-10",
                        style.glow
                      )}
                    >
                      <div className={cn(
                        "absolute left-0 top-0 h-full w-[3px] opacity-0 group-hover:opacity-100 transition-opacity z-20",
                        style.color.replace('text', 'bg')
                      )} />
                    </div>

                    <div className="relative z-20 h-full flex flex-col justify-between p-10 skew-x-0">
                      <div className="flex justify-between items-start">
                        <div className={cn("p-1.5 border border-current/20 bg-black/80 backdrop-blur-md", style.color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
                          LOG_{String(idx).padStart(3, '0')}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("h-[1px] w-5", style.color.replace('text', 'bg'))} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">
                            {item.type}
                          </span>
                        </div>

                        <h4 className="text-xl font-black italic uppercase tracking-tighter text-white leading-none group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h4>

                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                          <div className="overflow-hidden">
                            <p className="text-[11px] text-zinc-400 uppercase leading-relaxed font-bold tracking-tight pt-3">
                              {item.message}
                            </p>
                            {item.link?.enable && (
                              <div className={cn("flex items-center gap-1 mt-4 text-[10px] font-black uppercase tracking-[0.2em]", style.color)}>
                                {item.link.label || 'Access Terminal'} <ChevronRight className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {item.link?.enable && item.link.url && (
                      <Link
                        href={item.link.url}
                        className="absolute inset-0 z-[60]"
                        aria-label={item.link.label || item.title || 'Execute'}
                      />
                    )}
                  </motion.div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}