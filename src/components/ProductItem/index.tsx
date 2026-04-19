'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Media as MediaType, Product, Variant } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Product
  variant?: Variant
  quantity?: number
  currencyCode?: string
}

export const ProductItem: React.FC<Props> = ({
  product,
  quantity,
  variant,
  currencyCode,
}) => {
  const { title } = product

  const metaImage = product.meta?.image && typeof product.meta?.image !== 'string'
    ? (product.meta.image as MediaType)
    : undefined

  const firstGalleryImage = product.gallery?.[0]?.image && typeof product.gallery?.[0]?.image !== 'string'
    ? (product.gallery[0].image as MediaType)
    : undefined

  let image: MediaType | undefined = (firstGalleryImage || metaImage) ?? undefined

  const isVariant = Boolean(variant) && typeof variant === 'object'

  if (isVariant) {
    const imageVariant = product.gallery?.find((item) => {
      if (!item.variantOption) return false
      const variantOptionID = typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption
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
    <Link
      href={itemURL}
      className="group block w-full border-t border-black/10 first:border-t-0 bg-white hover:bg-[#FFD100] transition-colors duration-200"
    >
      <div className="flex items-center gap-4 px-4 py-4 md:px-6">
        <div className="flex-none w-16 h-16 relative bg-[#F5F5F5]">
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black/20" />
          {image && (
            <Media
              fill
              imgClassName="object-contain p-1 grayscale group-hover:grayscale-0 transition-all duration-300"
              resource={image}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-0.5 bg-black/40" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-black/50">
                  NR.{String(product.id).slice(-4)}
                </span>
              </div>
              <h4 className="text-base md:text-lg font-bold uppercase tracking-tight text-black group-hover:text-black">
                {title}
              </h4>
              {variant && (
                <p className="text-[9px] font-mono uppercase text-black/40 group-hover:text-black/60 mt-1">
                  {(variant as any).options
                    ?.map((option: any) => (typeof option === 'object' ? option.label : null))
                    .filter(Boolean)
                    .join(' / ')}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[8px] font-mono uppercase tracking-wider text-black/40 block">
                  QTY
                </span>
                <span className="text-sm font-bold font-mono text-black">
                  {quantity}
                </span>
              </div>

              {itemPrice && quantity && (
                <div className="text-right">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-black/40 block">
                    TOTAL
                  </span>
                  <Price
                    amount={itemPrice * quantity}
                    currencyCode={currencyCode}
                    className="text-sm font-bold font-mono text-black"
                  />
                </div>
              )}

              <div className="w-7 h-7 flex items-center justify-center border-2 border-black bg-transparent group-hover:bg-black transition-colors">
                <ArrowUpRight size={12} className="text-black group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}