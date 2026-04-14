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
    <div className="flex flex-col gap-6">
      <div className="relative w-full aspect-square bg-zinc-100 overflow-hidden">
        <Media
          resource={activeItem.image}
          className="w-full h-full p-6 md:p-10 transition-transform duration-700"
          imgClassName="w-full h-full object-contain"
        />
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent className="-ml-3">
          {gallery.map((item, i) => {
            const isActive = i === current
            return (
              <CarouselItem className="basis-1/4 sm:basis-1/5 pl-3" key={i} onClick={() => setCurrent(i)}>
                <div
                  className={`relative aspect-square cursor-pointer border-2 transition-all duration-200 p-1 ${isActive ? 'border-zinc-900 bg-white' : 'border-transparent bg-zinc-100'
                    }`}
                >
                  <Media resource={item.image} className="w-full h-full object-contain" />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}