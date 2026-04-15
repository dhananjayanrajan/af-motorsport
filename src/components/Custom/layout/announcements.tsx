'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Announcement as AnnouncementType } from '@/payload-types'
import AutoScroll from 'embla-carousel-auto-scroll'
import { AlertCircle, Bell, ChevronRight, Info, PartyPopper } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'

const typeStyles = {
  info: {
    icon: Info,
    color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
    glow: `0 0 30px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`,
  },
  warning: {
    icon: AlertCircle,
    color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
    glow: `0 0 30px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`,
  },
  urgent: {
    icon: Bell,
    color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
    glow: `0 0 30px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`,
  },
  celebration: {
    icon: PartyPopper,
    color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
    glow: `0 0 30px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`,
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
    <section className="relative z-30 w-full border-y overflow-hidden py-0" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600], borderColor: DESIGN_SYSTEM.COLORS.ZINC[800] }}>
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
                      className="absolute inset-0 z-0 border-x transition-all -skew-x-12"
                      style={{
                        backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[700],
                        borderColor: DESIGN_SYSTEM.COLORS.ZINC[700],
                        transitionDuration: DESIGN_SYSTEM.ANIMATION.DURATION_SLOW,
                        boxShadow: style.glow
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full w-[3px] opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                      />
                    </div>

                    <div className="relative z-20 h-full flex flex-col justify-between p-10 skew-x-0">
                      <div className="flex justify-between items-start">
                        <div
                          className="p-1.5 border border-current/20 backdrop-blur-md"
                          style={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                            color: style.color
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-[10px] font-mono tracking-[0.2em] transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                          LOG_{String(idx).padStart(3, '0')}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="h-[1px] w-5" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] transition-colors group-hover:text-white" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            {item.type}
                          </span>
                        </div>

                        <h4
                          className="text-xl font-black italic uppercase tracking-tighter leading-none transition-colors group-hover:text-primary-500"
                          style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}
                        >
                          {item.title}
                        </h4>

                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                          <div className="overflow-hidden">
                            <p className="text-[11px] uppercase leading-relaxed font-bold tracking-tight pt-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                              {item.message}
                            </p>
                            {item.link?.enable && (
                              <div className="flex items-center gap-1 mt-4 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: style.color }}>
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