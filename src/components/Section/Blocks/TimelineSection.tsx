// TimelineSection.tsx
"use client"
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description?: string
  status?: 'completed' | 'active' | 'upcoming'
  icon?: React.ReactNode
  image?: string
  slug?: string
  code?: string
  format?: string
}

interface TimelineLabels {
  statusPrefix: string
  eventIndexLabel: string
  deploymentStatus: {
    completed: string
    active: string
    upcoming: string
  }
}

interface TimelineSectionProps {
  id: string
  title: string
  subtitle: string
  events: TimelineEvent[]
  labels: TimelineLabels
  orientation?: 'horizontal' | 'vertical'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  id,
  title,
  subtitle,
  events = [],
  labels = {
    statusPrefix: '',
    eventIndexLabel: '',
    deploymentStatus: { completed: '', active: '', upcoming: '' }
  },
  orientation = 'horizontal',
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', loop: false })

  useEffect(() => {
    if (!emblaApi) return
    const onScroll = () => setProgress(emblaApi.scrollProgress() * 100)
    emblaApi.on('scroll', onScroll)
    onScroll()
    return () => { emblaApi.off('scroll', onScroll) }
  }, [emblaApi])

  const getStatusMeta = (status?: string) => {
    switch (status) {
      case 'active': return { color: 'text-primary-500', label: labels.deploymentStatus.active, bar: 'bg-primary-500' }
      case 'completed': return { color: 'text-black-pure', label: labels.deploymentStatus.completed, bar: 'bg-black-pure' }
      default: return { color: 'text-black-pure/30', label: labels.deploymentStatus.upcoming, bar: 'bg-black-pure/10' }
    }
  }

  const VerticalEvent = ({ event, idx }: { event: TimelineEvent; idx: number }) => {
    const meta = getStatusMeta(event.status)
    return (
      <div className="relative pl-20 group">
        <div className="absolute left-0 top-0 h-full flex flex-col items-center shrink-0">
          <div className={`w-10 h-10 border border-black-pure flex items-center justify-center transition-all duration-300 ${event.status === 'active' ? 'bg-primary-500 border-primary-500' : 'bg-white-pure group-hover:bg-primary-500'}`}>
            {event.icon || <span className="text-base font-bold transition-colors duration-300 group-hover:text-white-pure">{String(idx + 1).padStart(2, '0')}</span>}
          </div>
          <div className="w-px flex-grow bg-black-pure/10 transition-all duration-300 group-hover:bg-primary-500" />
        </div>

        <div className="pb-16">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-4 mb-2">
              <span className={`text-base font-bold transition-all duration-300 ${meta.color}`}>
                {meta.label}
              </span>
              <div className={`h-px w-12 transition-all duration-300 ${meta.bar}`} />
            </div>
            <span className="text-base text-black-pure/60">{event.date}</span>
          </div>

          <div className="p-8 md:p-12 border border-black-pure bg-white-pure transition-all duration-300 hover:bg-neutral-50 hover:translate-x-1 relative">
            <h3 className="text-2xl font-bold text-black-pure mb-4 transition-colors duration-300 hover:text-primary-500">
              {event.title}
            </h3>
            {event.description && (
              <p className="text-base text-black-pure/60">
                {event.description}
              </p>
            )}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black-pure/20" />
          </div>
        </div>
      </div>
    )
  }

  if (orientation === 'vertical') {
    return (
      <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
        {background}
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(events.length).padStart(2, '0')} />
        <div className="relative z-10 w-full p-8 md:p-24 border-b border-black-pure">
          <div className="flex flex-col max-w-4xl mx-auto">
            {events.map((event, idx) => (
              <VerticalEvent key={event.id} event={event} idx={idx} />
            ))}
          </div>
        </div>
        {ctaLabel && ctaPath && (
          <div className="py-16 flex justify-center bg-white-pure">
            <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
          </div>
        )}
        <SectionFooter variant={footerVariant} />
      </section>
    )
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}
      <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(events.length).padStart(2, '0')} />

      <div className="relative w-full border-b border-black-pure">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {events.map((event, idx) => {
              const meta = getStatusMeta(event.status)
              const isHovered = hoveredEvent === event.id

              return (
                <div
                  key={event.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 border-r border-black-pure group"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <Link href={event.slug ? `/competition/championships/${event.slug}` : '#'} className="block h-full">
                    <div className="relative p-8 md:p-12 h-full flex flex-col bg-white-pure transition-all duration-500 hover:bg-black-pure">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex flex-col">
                          <span className="text-base text-black-pure/30 mb-1 transition-colors duration-500 group-hover:text-white-pure/30">
                            {labels.eventIndexLabel}_0{idx + 1}
                          </span>
                          <span className={`text-base font-bold transition-all duration-500 ${meta.color} group-hover:text-primary-500`}>
                            {meta.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {event.code && (
                            <div className="px-2 py-1 bg-black-pure text-white-pure transition-all duration-500 group-hover:bg-white-pure group-hover:text-black-pure">
                              <span className="text-base font-bold">{event.code}</span>
                            </div>
                          )}
                          <span className="text-base font-bold text-black-pure transition-all duration-500 group-hover:text-white-pure">
                            {event.date}
                          </span>
                        </div>
                      </div>

                      {event.image && (
                        <div className="relative aspect-video w-full overflow-hidden border border-black-pure mb-6 transition-all duration-500 group-hover:border-primary-500">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black-pure/0 transition-colors duration-500 group-hover:bg-black-pure/20" />
                        </div>
                      )}

                      <h3 className={`text-2xl font-bold mb-4 transition-all duration-500 ${isHovered ? 'text-primary-500' : 'text-black-pure group-hover:text-white-pure'}`}>
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="text-base text-black-pure/60 mb-8 flex-grow transition-colors duration-500 group-hover:text-white-pure/60">
                          {event.description}
                        </p>
                      )}

                      {event.format && (
                        <div className="mb-6">
                          <span className="text-base text-black-pure/40 transition-colors duration-500 group-hover:text-white-pure/40">
                            {event.format}
                          </span>
                        </div>
                      )}

                      <div className="w-full h-px bg-black-pure/10 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 h-full transition-all duration-700 ${isHovered ? 'w-full' : 'w-0 group-hover:w-full'} ${meta.bar}`} />
                      </div>

                      <div className="absolute bottom-6 right-6 w-8 h-8 border-2 border-black-pure flex items-center justify-center transition-all duration-500 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:scale-110">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-black-pure transition-all duration-500 group-hover:text-black-pure group-hover:rotate-45">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center bg-neutral-50 px-8 border-t border-black-pure" style={{ height: '64px' }}>
          <div className="w-full bg-black-pure/5 h-1 relative overflow-hidden flex gap-1">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`h-full flex-grow transition-all duration-300 ${(i / 50) * 100 < progress ? 'bg-primary-500' : 'bg-transparent'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="py-16 flex justify-center bg-white-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}
      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default TimelineSection