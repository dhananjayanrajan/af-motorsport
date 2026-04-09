'use client'
import { GridTileImage } from '@/components/Grid/tile'
import { Media } from '@/components/Media'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div className="flex flex-col gap-6">
      <div
        className="relative w-full aspect-square bg-zinc-950 border border-zinc-900 group overflow-hidden"
        style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
      >
        <Media
          resource={activeItem.image}
          className="w-full h-full"
          imgClassName="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent className="-ml-2">
          {gallery.map((item, i) => {
            if (!item.image || typeof item.image !== 'object') return null
            const isActive = i === current
            return (
              <CarouselItem
                className="basis-1/4 pl-2"
                key={`${item.image.id}-${i}`}
                onClick={() => setCurrent(i)}
              >
                <div
                  className={`relative aspect-[2/1] cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary p-[1px]' : 'bg-zinc-800 p-[1px] opacity-40 hover:opacity-100'
                    }`}
                  style={{
                    clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP,
                    backgroundColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined,
                  }}
                >
                  <div
                    className="w-full h-full bg-black overflow-hidden"
                    style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
                  >
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