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
    <div className="relative p-8 md:p-12 bg-white-pure border border-black-pure group h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-black-pure/5 group-hover:bg-primary-500 transition-colors" />

      <div className="flex justify-between items-start mb-8">
        <span className="text-[10px] font-mono font-black text-black-pure/20 uppercase tracking-[0.3em]">
          {labels.commStatus}_0{idx + 1}
        </span>
        <Quote className="w-6 h-6 text-primary-500 opacity-20 group-hover:opacity-100 transition-opacity" />
      </div>

      <p className="text-xl md:text-2xl font-mono font-black text-black-pure uppercase leading-[1.1] tracking-tighter italic mb-12 flex-grow">
        "{quote.text}"
      </p>

      <div className="mt-auto border-t border-black-pure/10 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {quote.avatar && (
            <div className="w-12 h-12 border border-black-pure bg-slate-100 overflow-hidden shrink-0">
              <img src={quote.avatar} alt={quote.author} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            </div>
          )}
          <div>
            <p className="font-mono font-black text-sm text-black-pure uppercase tracking-tight leading-none mb-1">
              {quote.author}
            </p>
            <p className="text-[10px] font-mono font-black text-black-pure/40 uppercase tracking-widest leading-none">
              {quote.role}{quote.company ? ` // ${quote.company}` : ''}
            </p>
          </div>
        </div>

        {quote.rating && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[8px] font-mono font-black text-black-pure/20 uppercase mb-1">{labels.ratingLabel}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-3 h-1 ${i < (quote.rating || 0) ? 'bg-primary-500' : 'bg-black-pure/10'}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-black-pure/10 group-hover:border-primary-500 transition-colors" />
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

      <div className="w-full border-b border-black-pure">
        {variant === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {quotes.map((quote, idx) => (
              <div key={quote.id} className="border-r border-b border-black-pure last:border-r-0 lg:[&:nth-child(3n)]:border-r-0">
                <QuoteCard quote={quote} idx={idx} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex">
                {quotes.map((quote, idx) => (
                  <div key={quote.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 border-r border-black-pure last:border-r-0">
                    <QuoteCard quote={quote} idx={idx} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center h-16 border-t border-black-pure bg-slate-50 px-8 gap-4">
              <div className="flex gap-2">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => emblaApi?.scrollTo(idx)}
                    className={`h-1.5 transition-all duration-300 ${selectedIndex === idx ? 'w-12 bg-primary-500' : 'w-4 bg-black-pure/10 hover:bg-black-pure/30'}`}
                  />
                ))}
              </div>
              <div className="flex-grow h-px bg-black-pure/5 mx-4" />
              <span className="text-[10px] font-mono font-black text-black-pure/20 uppercase tabular-nums">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-16 flex justify-center bg-white-pure">
          <Link
            href={ctaPath}
            className="flex items-center gap-12 px-16 py-6 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-150 border border-black-pure"
          >
            <span className="text-xs font-mono font-black uppercase tracking-[0.4em]">
              {ctaLabel}
            </span>
            <div className="w-12 h-px bg-white-pure/20 group-hover:bg-black-pure group-hover:w-16 transition-all duration-300" />
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default QuoteSection