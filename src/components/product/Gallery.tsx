'use client'
import { GridTileImage } from '@/components/Grid/tile'
import { Media } from '@/components/Media'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Product } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import { DefaultDocumentIDType } from 'payload'
import React, { useEffect } from 'react'

type Props = {
  gallery: NonNullable<Product['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams()
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()
  const diamondClip = 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)'

  useEffect(() => {
    const values = Array.from(searchParams.values())
    if (values && api && gallery.length > 0) {
      const index = gallery.findIndex((item) => {
        if (!item.variantOption) return false
        let variantID: DefaultDocumentIDType
        if (typeof item.variantOption === 'object' && item.variantOption !== null) {
          variantID = item.variantOption.id
        } else {
          variantID = item.variantOption as DefaultDocumentIDType
        }
        return Boolean(values.find((value) => value === String(variantID)))
      })
      if (index !== -1) {
        setCurrent(index)
        api.scrollTo(index, true)
      }
    }
  }, [searchParams, api, gallery])

  if (!gallery || gallery.length === 0) return null

  const activeItem = gallery[current]
  if (!activeItem || !activeItem.image) return null

  return (
    <div className="flex flex-col gap-8">
      <div
        className="relative w-full aspect-square bg-zinc-950 border border-zinc-900 group overflow-hidden"
        style={{ clipPath: diamondClip }}
      >
        <Media
          resource={activeItem.image}
          className="w-full h-full"
          imgClassName="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent className="-ml-4">
          {gallery.map((item, i) => {
            if (!item.image || typeof item.image !== 'object') return null
            const isActive = i === current
            return (
              <CarouselItem
                className="basis-1/4 pl-4"
                key={`${item.image.id}-${i}`}
                onClick={() => setCurrent(i)}
              >
                <div
                  className={`relative aspect-[2/1] cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#00FF41] p-[1px]' : 'bg-zinc-800 p-[1px] opacity-40 hover:opacity-100'}`}
                  style={{ clipPath: diamondClip }}
                >
                  <div className="w-full h-full bg-black overflow-hidden" style={{ clipPath: diamondClip }}>
                    <GridTileImage active={isActive} media={item.image} />
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}