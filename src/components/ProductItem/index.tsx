'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { DESIGN_SYSTEM } from '@/lib/constants'
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

  return (
    <div className="group relative flex items-center gap-8 py-8 border-b border-zinc-100 last:border-0 bg-white w-full">
      <div
        className="flex-none h-24 w-24 bg-zinc-50 border border-zinc-100 relative group-hover:border-black transition-colors"
        style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
      >
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-10 transition-opacity"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        />
        {image && (
          <Media
            fill
            imgClassName="object-contain transition-all duration-500 group-hover:scale-110 p-4 grayscale group-hover:grayscale-0"
            resource={image}
          />
        )}
      </div>

      <div className="flex grow justify-between items-center min-w-0">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300 italic block">
              Item_Manifest
            </span>
            <Link
              href={itemURL}
              className="text-[14px] font-black uppercase italic tracking-tighter text-black hover:underline underline-offset-4 decoration-2 transition-all truncate block"
            >
              {title}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {variant && (
              <p className="text-[9px] font-black text-zinc-400 uppercase italic tracking-widest border-l-2 border-zinc-100 pl-3">
                {(variant as any).options
                  ?.map((option: any) => (typeof option === 'object' ? option.label : null))
                  .filter(Boolean)
                  .join(' // ')}
              </p>
            )}

            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-100">
              <span className="text-[8px] font-black text-zinc-400 uppercase italic">Units</span>
              <span className="text-[10px] font-black text-black italic tabular-nums">{quantity}</span>
            </div>
          </div>
        </div>

        {itemPrice && quantity && (
          <div className="text-right flex flex-col items-end shrink-0 ml-6">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 italic mb-2">
              Valuation_Total
            </span>
            <div className="relative">
              <Price
                className="text-[18px] font-black text-black italic tabular-nums leading-none"
                amount={itemPrice * quantity}
                currencyCode={currencyCode}
              />
              <div
                className="absolute -bottom-1 right-0 h-[2px] w-full origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}