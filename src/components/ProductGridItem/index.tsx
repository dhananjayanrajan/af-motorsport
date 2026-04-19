'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Media as MediaType, Product } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const ProductGridItem: React.FC<{ product: Product; index?: number }> = ({
  product,
  index = 0,
}) => {
  const image = (product.gallery?.[0]?.image as MediaType) ?? undefined

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-full h-full border border-black-pure bg-white-pure hover:bg-white-100 transition-colors duration-200 relative overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="h-12 border-b border-black-pure flex items-center justify-between px-5 bg-secondary group-hover:bg-primary transition-colors duration-300">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-black-pure">
            ITEM {index + 1}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black text-black-pure opacity-40 uppercase">{product._status}</span>
            <div className="size-2 bg-black-pure rounded-full animate-pulse" />
          </div>
        </div>

        <div className="relative flex-1 p-10 flex items-center justify-center overflow-hidden bg-white-50">
          {image && (
            <div className="relative z-10 w-full h-full transition-all duration-500 ease-out group-hover:scale-105">
              <Media
                resource={image}
                className="w-full h-full"
                imgClassName="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          )}
        </div>

        <div className="p-6 bg-white-pure border-t border-black-pure">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h3 className="text-base lg:text-lg font-mono font-black uppercase leading-tight tracking-tight text-black-pure">
              {product.title}
            </h3>
            <div className="size-10 border border-black-pure flex items-center justify-center aspect-square bg-white-pure group-hover:bg-black-pure group-hover:text-white-pure transition-all duration-300">
              <ArrowUpRight className="size-5" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black-pure/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-black text-black-pure opacity-60 uppercase tracking-widest mb-1">PRICE</span>
              <Price
                amount={product.priceInUSD || 0}
                className="text-lg font-mono font-black text-black-pure"
              />
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono font-black text-black-pure opacity-60 uppercase tracking-widest mb-1">AVAILABILITY</span>
              <span className="text-sm font-mono font-black text-black-pure">{product.inventory ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}