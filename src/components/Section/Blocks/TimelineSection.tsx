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

interface TimelineSectionProps {
  id: string
  title: string
  subtitle: string
  events: TimelineEvent[]
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
  events,
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

  const getStatusStyles = (status?: string) => {
    switch (status) {
      case 'active': return 'border-primary bg-primary text-primary-foreground shadow-lg scale-110'
      case 'completed': return 'border-green-500 bg-green-500 text-white'
      default: return 'border-muted-foreground bg-card text-muted-foreground'
    }
  }

  if (orientation === 'vertical') {
    return (
      <section className="relative w-full bg-background py-16 md:py-24">
        {background}
        <div className="relative z-10 container mx-auto px-4">
          <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(events.length)} />
          <div className="mt-12 relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-12">
              {events.map((event, idx) => (
                <div key={event.id} className="relative pl-12 md:pl-16 group">
                  <div className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-card transition-all duration-300 ${getStatusStyles(event.status)} group-hover:scale-125`}>
                    {event.icon || <span className="text-xs font-bold">{idx + 1}</span>}
                  </div>
                  <div className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-sm font-mono font-semibold text-primary uppercase">{event.date}</span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground mt-2">{event.title}</h3>
                    {event.description && <p className="text-muted-foreground mt-2">{event.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
          <SectionFooter variant={footerVariant} />
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24 overflow-hidden">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(events.length)} />
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {events.map((event, idx) => (
              <div key={event.id} className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-2 group">
                <div className="relative p-6 bg-card border border-border rounded-lg hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className={`absolute -top-3 left-6 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-card ${getStatusStyles(event.status)}`}>
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-mono font-semibold text-primary uppercase">{event.date}</span>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-foreground mt-2">{event.title}</h3>
                    {event.description && <p className="text-muted-foreground text-sm mt-2">{event.description}</p>}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 group-hover:w-full w-0 rounded-b-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default TimelineSection
