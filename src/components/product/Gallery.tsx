'use client'
import { Media } from '@/components/Media'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'

export const Gallery: React.FC<{ gallery: any[] }> = ({ gallery }) => {
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  const activeItem = gallery[current]

  if (!activeItem || !activeItem.image) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-white border border-zinc-200 overflow-hidden">
        <Media
          resource={activeItem.image}
          className="w-full h-full p-8 transition-transform duration-700"
          imgClassName="w-full h-full object-contain"
        />
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent className="-ml-2">
          {gallery.map((item, i) => {
            const isActive = i === current
            return (
              <CarouselItem className="basis-1/4 sm:basis-1/5 pl-2" key={i} onClick={() => setCurrent(i)}>
                <div
                  className={`relative aspect-square cursor-pointer border-2 transition-all duration-200 p-2 ${isActive ? 'border-black bg-white' : 'border-zinc-100 bg-zinc-50'
                    }`}
                >
                  <Media resource={item.image} className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}