'use client'

import { Media } from '@/components/Media'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React, { useEffect, useState } from 'react'

export const Gallery: React.FC<{ gallery: any[] }> = ({ gallery }) => {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const activeItem = gallery[current]

  if (!activeItem || !activeItem.image) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full aspect-square bg-white-50 border border-black-pure overflow-hidden">
        <Media
          resource={activeItem.image}
          className="w-full h-full p-8 transition-transform duration-700 ease-out"
          imgClassName="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
        />

        <div className="absolute top-0 right-0 flex border-l border-b border-black-pure">
          <div className="size-10 flex items-center justify-center bg-primary text-black-pure font-mono font-black text-xs">
            {String(current + 1).padStart(2, '0')}
          </div>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: false
        }}
      >
        <CarouselContent className="-ml-4">
          {gallery.map((item, i) => {
            const isActive = i === current
            return (
              <CarouselItem
                className="basis-1/4 pl-4"
                key={i}
                onClick={() => {
                  setCurrent(i)
                  api?.scrollTo(i)
                }}
              >
                <div
                  className={`relative aspect-square cursor-pointer border transition-all duration-200 p-2 ${isActive
                    ? 'border-black-pure bg-white-pure'
                    : 'border-black-pure/10 bg-white-50 hover:border-black-pure'
                    }`}
                >
                  <Media
                    resource={item.image}
                    className="w-full h-full object-contain"
                  />
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-primary pointer-events-none" />
                  )}
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-between items-center pt-4 border-t border-black-pure/10">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure opacity-40">
          Sequence Phase
        </span>
        <div className="flex gap-1.5">
          {gallery.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-300 ${i === current ? 'w-8 bg-secondary' : 'w-1.5 bg-black-pure/10'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}