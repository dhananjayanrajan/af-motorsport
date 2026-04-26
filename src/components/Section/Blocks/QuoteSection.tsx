// QuoteSection.tsx
"use client"
import useEmblaCarousel from 'embla-carousel-react'
import { Quote } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface QuoteItem {
  id: string
  text: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

interface QuoteLabels {
  commStatus: string
  ratingLabel: string
}

interface QuoteSectionProps {
  id: string
  title: string
  subtitle: string
  quotes: QuoteItem[]
  labels: QuoteLabels
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
  quotes = [],
  labels = {
    commStatus: '',
    ratingLabel: ''
  },
  variant = 'carousel',
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
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

  const QuoteCard = ({ quote, idx }: { quote: QuoteItem; idx: number }) => (
    <div className="relative p-8 md:p-10 bg-white-pure border border-black-pure group h-full flex flex-col transition-all duration-300 hover:bg-neutral-50 hover:translate-x-1 hover:translate-y-1">
      <div className="flex justify-between items-start mb-10">
        <div className="bg-black-pure px-2 py-0.5 border border-black-pure transition-all duration-300 group-hover:bg-primary-500">
          <span className="text-base font-bold text-white-pure transition-colors duration-300 group-hover:text-black-pure">
            {labels.commStatus} {String(idx + 1).padStart(2, '0')}
          </span>
        </div>
        <Quote className="w-5 h-5 text-black-pure transition-all duration-300 group-hover:text-primary-500 group-hover:scale-110" />
      </div>

      <p className="text-2xl font-bold text-black-pure mb-12 flex-grow leading-tight">
        "{quote.text}"
      </p>

      <div className="mt-auto pt-8 border-t border-black-pure flex items-center justify-between">
        <div className="flex items-center gap-4">
          {quote.avatar && (
            <div className="w-10 h-10 border border-black-pure bg-neutral-200 shrink-0 overflow-hidden transition-all duration-300 group-hover:border-primary-500">
              <img src={quote.avatar} alt={quote.author} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          )}
          <div>
            <p className="text-base font-bold text-black-pure mb-1 transition-colors duration-300 group-hover:text-primary-500">
              {quote.author}
            </p>
            <p className="text-base text-black-pure/60">
              {quote.role}{quote.company ? ` / ${quote.company}` : ''}
            </p>
          </div>
        </div>

        {quote.rating && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-base text-black-pure/60 mb-1">{labels.ratingLabel}</span>
            <div className="flex gap-px">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 border border-black-pure transition-all duration-300 ${i < (quote.rating || 0) ? 'bg-primary-500' : 'bg-white-pure group-hover:bg-primary-500/30'}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-500 border border-black-pure transition-all duration-300 opacity-0 group-hover:opacity-100" />
    </div>
  )

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(quotes.length).padStart(2, '0')}
      />

      <div className="w-full border-b border-black-pure bg-white-pure">
        {variant === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-px">
            {quotes.map((quote, idx) => (
              <div key={quote.id}>
                <QuoteCard quote={quote} idx={idx} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden cursor-grab active:cursor-grabbing bg-white-pure" ref={emblaRef}>
              <div className="flex gap-px">
                {quotes.map((quote, idx) => (
                  <div key={quote.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                    <QuoteCard quote={quote} idx={idx} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center border-t border-black-pure bg-white-pure px-8 gap-4" style={{ height: '56px' }}>
              <div className="flex gap-1.5">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => emblaApi?.scrollTo(idx)}
                    className={`h-0.5 border border-black-pure transition-all duration-300 ${selectedIndex === idx ? 'w-10 bg-primary-500' : 'w-2 bg-neutral-200 hover:bg-black-pure'}`}
                  />
                ))}
              </div>
              <div className="flex-grow" />
              <span className="text-base font-bold text-black-pure">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
      </div>

      {ctaLabel && ctaPath && (
        <div className="py-16 flex justify-center bg-white-pure">
          <Link
            href={ctaPath}
            className="flex items-center gap-6 px-10 py-4 bg-white-pure border border-black-pure text-black-pure transition-all duration-300 hover:translate-x-1.5 hover:translate-y-1.5 hover:bg-primary-500 active:bg-black-pure active:text-primary-500"
          >
            <span className="text-base font-bold">
              {ctaLabel}
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-black-pure transition-all duration-300 group-hover:bg-white-pure" />
              ))}
            </div>
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default QuoteSection