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

  return (
    <div className="group relative flex items-center gap-6 py-4 border-b border-zinc-200 last:border-0 bg-white w-full">
      <div className="flex-none h-16 w-16 bg-zinc-100 border-none overflow-hidden relative">
        {image && (
          <Media
            fill
            imgClassName="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
            resource={image}
          />
        )}
      </div>

      <div className="flex grow justify-between items-center min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          <Link
            href={itemURL}
            className="text-sm font-bold uppercase tracking-wide text-black hover:text-zinc-600 transition-colors truncate"
          >
            {title}
          </Link>

          {variant && (
            <div className="flex items-center">
              <p className="text-xs font-medium text-zinc-500">
                {(variant as any).options
                  ?.map((option: any) => (typeof option === 'object' ? option.label : null))
                  .filter(Boolean)
                  .join(' / ')}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Qty</span>
            <span className="text-xs font-bold text-black tabular-nums">{quantity}</span>
          </div>
        </div>

        {itemPrice && quantity && (
          <div className="text-right flex flex-col items-end shrink-0 ml-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Subtotal</span>
            <Price
              className="text-base font-bold text-black tabular-nums"
              amount={itemPrice * quantity}
              currencyCode={currencyCode}
            />
          </div>
        )}
      </div>
    </div>
  )
}