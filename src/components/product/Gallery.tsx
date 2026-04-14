'use client'
import { Media } from '@/components/Media'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'

export const Gallery: React.FC<{ gallery: any[] }> = ({ gallery }) => {
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  const activeItem = gallery[current]
  const slabClip = 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'

  if (!activeItem || !activeItem.image) return null

  return (
    <div className="flex flex-col gap-10">
      <div
        className="relative w-full aspect-square bg-white border border-zinc-100 overflow-hidden group"
        style={{ clipPath: slabClip }}
      >
        <Media
          resource={activeItem.image}
          className="w-full h-full p-12 transition-all duration-1000 grayscale group-hover:grayscale-0"
          imgClassName="w-full h-full object-contain scale-110 group-hover:scale-100"
        />
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent className="-ml-4">
          {gallery.map((item, i) => {
            const isActive = i === current
            return (
              <CarouselItem className="basis-1/4 pl-4" key={i} onClick={() => setCurrent(i)}>
                <div
                  className={`relative aspect-square cursor-pointer border transition-all duration-300 p-2 ${isActive ? 'bg-zinc-900 border-zinc-900' : 'bg-white border-zinc-100 opacity-40 hover:opacity-100'
                    }`}
                >
                  <Media resource={item.image} className="w-full h-full object-contain grayscale" />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}