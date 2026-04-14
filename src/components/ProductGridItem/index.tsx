'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Media as MediaType, Product } from '@/payload-types'
import Link from 'next/link'

export const ProductGridItem: React.FC<{ product: Partial<Product> }> = ({ product }) => {
  const image = (product.gallery?.[0]?.image as MediaType) ?? undefined

  return (
    <Link className="group relative block w-full" href={`/products/${product.slug}`}>
      <div className="relative aspect-square overflow-hidden bg-zinc-100 border-none transition-all duration-300">
        {image && (
          <Media
            resource={image}
            className="h-full w-full p-4 md:p-6 lg:p-8 transition-transform duration-700 group-hover:scale-105"
            imgClassName="h-full w-full object-contain"
          />
        )}

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
          <Price
            amount={product.priceInUSD || 0}
            className="text-sm font-bold text-black bg-white px-3 py-1"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold uppercase tracking-wide text-black leading-tight">
            {product.title}
          </h4>
        </div>

        <div className="h-[1px] w-full bg-zinc-200" />
      </div>
    </Link>
  )
}