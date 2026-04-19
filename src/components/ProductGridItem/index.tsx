'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Media as MediaType, Product } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const ProductGridItem: React.FC<{ product: Product; index?: number }> = ({
  product,
  index = 0,
}) => {
  const image = (product.gallery?.[0]?.image as MediaType) ?? undefined
  const stockCount = product.inventory ?? 0
  const hasVariants = product.enableVariants && (product.variants?.totalDocs || 0) > 0

  const colors = [
    'bg-[#E31B23]',
    'bg-[#003DA5]',
    'bg-[#FFD100]',
    'bg-[#1A1A1A]',
    'bg-[#E31B23]',
    'bg-[#003DA5]',
  ]
  const color = colors[index % colors.length]
  const isDark = color === 'bg-[#1A1A1A]'
  const textColor = isDark ? 'text-white' : 'text-black'
  const accentColor = isDark ? 'bg-white' : 'bg-black'

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-black',
        color
      )}
    >
      <div className="relative h-full flex flex-col">
        <div className="absolute top-0 left-0 w-12 h-12 bg-black/10 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 group-hover:bg-white/20 transition-colors" />

        <div className="flex-1 flex flex-col p-6 md:p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="w-8 h-8 border-2 border-current/30 rounded-none flex items-center justify-center">
              <div className="w-3 h-3 bg-current/50 rounded-none" />
            </div>
            <div className={cn('w-8 h-8 flex items-center justify-center text-xs font-bold', accentColor, textColor === 'text-white' ? 'bg-white text-black' : 'bg-black text-white')}>
              {stockCount > 0 ? stockCount : '0'}
            </div>
          </div>

          {image && (
            <div className="w-full h-48 relative mb-8">
              <div className="absolute -top-3 -left-3 w-12 h-12 border-2 border-current/20" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-2 border-current/20" />
              <Media
                resource={image}
                className="w-full h-full"
                imgClassName="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          )}

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className={cn('w-6 h-0.5', accentColor)} />
              <span className={cn('text-[10px] font-mono tracking-wider', textColor)}>
                #{String(product.id).slice(-4)}
              </span>
            </div>

            <h3 className={cn('text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight mb-4', textColor)}>
              {product.title}
            </h3>

            <div className="flex items-center justify-between pt-4">
              <Price
                amount={product.priceInUSD || 0}
                className={cn('text-xl font-mono font-bold', textColor)}
              />
              <div className="flex items-center gap-2">
                <div className={cn('w-8 h-8 flex items-center justify-center border-2', textColor, 'border-current')}>
                  <ArrowUpRight size={14} className={textColor} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cn('h-1 w-full', accentColor)} />
      </div>
    </Link>
  )
}