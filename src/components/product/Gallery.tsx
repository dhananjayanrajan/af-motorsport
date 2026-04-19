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
    <div className="flex flex-col gap-8">
      <div className="relative w-full aspect-square bg-white border-4 border-black overflow-hidden group">
        <Media
          resource={activeItem.image}
          className="w-full h-full p-12 transition-all duration-500 group-hover:scale-105"
          imgClassName="w-full h-full object-contain"
        />

        <div className="absolute top-4 right-4 flex gap-1">
          <div className="size-2 bg-primary" />
          <div className="size-2 bg-secondary" />
          <div className="size-2 bg-accent" />
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
                  className={`relative aspect-square cursor-pointer border-2 transition-colors p-3 ${isActive
                      ? 'border-black bg-zinc-100'
                      : 'border-zinc-200 bg-white hover:border-black'
                    }`}
                >
                  <Media
                    resource={item.image}
                    className="w-full h-full object-contain"
                  />
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
                  )}
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-between items-center pt-4 border-t-2 border-zinc-100">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300">
          Viewing: 0{current + 1} / 0{gallery.length}
        </span>
        <div className="flex gap-1">
          {gallery.map((_, i) => (
            <div
              key={i}
              className={`h-1 transition-all ${i === current ? 'w-8 bg-black' : 'w-2 bg-zinc-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}