"use client"
import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Quote } from 'lucide-react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import HoneycombBackground from '../Backgrounds/HoneycombBackground'

export interface QuoteItem {
  id: string
  text: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

interface QuoteSectionProps {
  id: string
  title: string
  subtitle: string
  quotes: QuoteItem[]
  variant?: 'carousel' | 'grid' | 'masonry'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const QuoteSection: React.FC<QuoteSectionProps> = ({
  id,
  title,
  subtitle,
  quotes,
  variant = 'carousel',
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <HoneycombBackground opacity={0.3} />
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  if (variant === 'grid') {
    return (
      <section className="relative w-full bg-background py-16 md:py-24">
        {background}
        <div className="relative z-10 container mx-auto px-4">
          <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(quotes.length)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {quotes.map((quote) => (
              <div key={quote.id} className="p-6 bg-card border border-border rounded-xl hover:shadow-xl transition-all duration-500 group">
                <Quote className="w-8 h-8 text-primary/40 mb-4 group-hover:text-primary transition-colors" />
                <p className="text-lg font-medium italic text-foreground">"{quote.text}"</p>
                <div className="mt-6 flex items-center gap-4">
                  {quote.avatar && <img src={quote.avatar} alt={quote.author} className="w-10 h-10 rounded-full" />}
                  <div>
                    <p className="font-bold text-foreground">{quote.author}</p>
                    <p className="text-sm text-muted-foreground">{quote.role}{quote.company ? `, ${quote.company}` : ''}</p>
                  </div>
                </div>
              </div>
            ))}
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
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(quotes.length)} />
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {quotes.map((quote, idx) => (
              <div key={quote.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-2">
                <div className="p-8 bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group h-full">
                  <Quote className="w-10 h-10 text-primary/30 mb-6 group-hover:text-primary transition-colors" />
                  <p className="text-xl md:text-2xl font-medium italic text-foreground leading-relaxed">"{quote.text}"</p>
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg text-foreground">{quote.author}</p>
                      <p className="text-sm text-muted-foreground">{quote.role}</p>
                    </div>
                    {quote.rating && (
                      <div className="flex gap-1">
                        {Array.from({ length: quote.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, idx) => (
            <button key={idx} onClick={() => emblaApi?.scrollTo(idx)} className={`h-2 rounded-full transition-all ${selectedIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`} />
          ))}
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default QuoteSection
