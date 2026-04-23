"use client"
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useState } from 'react'
import BlueprintsBackground from '../Backgrounds/BlueprintsBackground'
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
  background = <BlueprintsBackground opacity={0.25} />
}) => {
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
      default: return { color: 'text-black-pure/20', label: labels.deploymentStatus.upcoming, bar: 'bg-black-pure/10' }
    }
  }

  const VerticalEvent = ({ event, idx }: { event: TimelineEvent; idx: number }) => {
    const meta = getStatusMeta(event.status)
    return (
      <div className="relative pl-16 md:pl-24 group">
        <div className="absolute left-0 top-0 h-full flex flex-col items-center shrink-0">
          <div className={`w-10 h-10 border border-black-pure flex items-center justify-center transition-colors duration-300 ${event.status === 'active' ? 'bg-primary-500 border-primary-500' : 'bg-white-pure'}`}>
            {event.icon || <span className="text-xs font-mono font-black">{String(idx + 1).padStart(2, '0')}</span>}
          </div>
          <div className="w-px flex-grow bg-black-pure/10" />
        </div>

        <div className="pb-16">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-4 mb-2">
              <span className={`text-[10px] font-mono font-black uppercase tracking-[0.3em] ${meta.color}`}>
                {meta.label}
              </span>
              <div className={`h-px w-12 ${meta.bar}`} />
            </div>
            <span className="text-sm font-mono font-black text-black-pure/30 uppercase tracking-widest">{event.date}</span>
          </div>

          <div className="p-8 md:p-12 border border-black-pure bg-white-pure hover:bg-slate-50 transition-colors duration-300 relative">
            <h3 className="text-2xl md:text-4xl font-mono font-black uppercase tracking-tighter text-black-pure mb-4 italic leading-none">
              {event.title}
            </h3>
            {event.description && (
              <p className="text-[11px] font-mono font-black text-black-pure/60 uppercase leading-relaxed max-w-xl">
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
          <div className="flex flex-col">
            {events.map((event, idx) => (
              <VerticalEvent key={event.id} event={event} idx={idx} />
            ))}
          </div>
        </div>
        {ctaLabel && ctaPath && (
          <div className="p-16 flex justify-center bg-white-pure">
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

      <div className="mt-0 border-b border-black-pure">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {events.map((event, idx) => {
              const meta = getStatusMeta(event.status)
              return (
                <div key={event.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 border-r border-black-pure group">
                  <div className="relative p-12 h-full flex flex-col bg-white-pure transition-colors duration-300 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-12">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-black text-black-pure/20 uppercase tracking-[0.4em] mb-1">
                          {labels.eventIndexLabel}_0{idx + 1}
                        </span>
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${meta.color}`}>
                          {meta.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-black text-black-pure uppercase tabular-nums">
                        {event.date}
                      </span>
                    </div>

                    <h3 className="text-3xl font-mono font-black uppercase tracking-tighter text-black-pure leading-none mb-6 italic">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-[11px] font-mono font-black text-black-pure/50 uppercase leading-relaxed mb-12 flex-grow">
                        {event.description}
                      </p>
                    )}

                    <div className="w-full h-px bg-black-pure/10 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 h-full transition-all duration-700 group-hover:w-full w-0 ${meta.bar}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="h-16 flex items-center bg-slate-50 px-8">
          <div className="w-full bg-black-pure/5 h-1 relative overflow-hidden flex gap-1">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`h-full flex-grow transition-all duration-300 ${(i / 50) * 100 < progress ? 'bg-primary-500' : 'bg-transparent'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-16 flex justify-center bg-white-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}
      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default TimelineSection