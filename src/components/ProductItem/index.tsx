'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Media as MediaType, Product, Variant } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Product
  style?: 'compact' | 'default'
  variant?: Variant
  quantity?: number
  currencyCode?: string
}

export const ProductItem: React.FC<Props> = ({
  product,
  style = 'default',
  quantity,
  variant,
  currencyCode,
}) => {
  const { title } = product

  const metaImage =
    product.meta?.image && typeof product.meta?.image !== 'string'
      ? (product.meta.image as MediaType)
      : undefined

  const firstGalleryImage =
    product.gallery?.[0]?.image && typeof product.gallery?.[0]?.image !== 'string'
      ? (product.gallery[0].image as MediaType)
      : undefined

  let image: MediaType | undefined = (firstGalleryImage || metaImage) ?? undefined

  const isVariant = Boolean(variant) && typeof variant === 'object'

  if (isVariant) {
    const imageVariant = product.gallery?.find((item) => {
      if (!item.variantOption) return false
      const variantOptionID =
        typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption

      const hasMatch = (variant as any)?.options?.some((option: any) => {
        const optionID = typeof option === 'object' ? option.id : option
        return String(optionID) === String(variantOptionID)
      })

      return hasMatch
    })

    if (imageVariant && typeof imageVariant.image !== 'string') {
      image = (imageVariant.image as MediaType) ?? undefined
    }
  }

  const itemPrice = variant?.priceInUSD || product.priceInUSD
  const itemURL = `/products/${product.slug}${variant ? `?variant=${variant.id}` : ''}`
  const thumbClip = 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'

  return (
    <div className="group relative flex items-center gap-4 py-3 border-b border-zinc-100 last:border-0 bg-white px-3 -mx-3">
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-200 group-hover:bg-black transition-colors" />

      <div
        className="flex-none h-14 w-14 bg-zinc-50 border border-zinc-100 transition-all duration-300 group-hover:border-black overflow-hidden relative"
        style={{ clipPath: thumbClip }}
      >
        {image && (
          <Media
            fill
            imgClassName="object-contain grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105 p-1"
            resource={image}
          />
        )}
      </div>

      <div className="flex grow justify-between items-center min-w-0">
        <div className="flex flex-col gap-0.5 min-w-0">
          <Link
            href={itemURL}
            className="text-[10px] font-black uppercase italic tracking-tighter text-black group-hover:bg-black group-hover:text-white px-1 -ml-1 w-fit transition-all leading-tight truncate"
          >
            {title}
          </Link>

          {variant && (
            <div className="flex items-center gap-2">
              <p className="text-[8px] font-bold uppercase tracking-tight text-zinc-400 bg-zinc-50 px-1 border border-zinc-100">
                {(variant as any).options
                  ?.map((option: any) => (typeof option === 'object' ? option.label : null))
                  .filter(Boolean)
                  .join(' // ')}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] font-black text-zinc-300 uppercase">QTY</span>
            <span className="text-[10px] font-black text-black tabular-nums">{quantity}</span>
          </div>
        </div>

        {itemPrice && quantity && (
          <div className="text-right flex flex-col items-end shrink-0">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-300">SUBTOTAL</span>
            <Price
              className="text-sm font-black italic text-black tabular-nums tracking-tighter"
              amount={itemPrice * quantity}
              currencyCode={currencyCode}
            />
          </div>
        )}
      </div>
    </div>
  )
}