'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Media as MediaType, Product } from '@/payload-types'
import Link from 'next/link'

export const ProductGridItem: React.FC<{ product: Partial<Product> }> = ({ product }) => {
  const image = (product.gallery?.[0]?.image as MediaType) ?? undefined
  const slabClip = 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'

  return (
    <Link className="group relative block w-full" href={`/products/${product.slug}`}>
      <div className="relative aspect-[1/1] overflow-hidden bg-white border border-zinc-200 transition-all duration-300 group-hover:border-primary group-hover:shadow-[10px_10px_0px_rgba(0,255,65,0.05)]">
        <div className="absolute top-4 left-4 z-10">
          <div className="px-2 py-0.5 bg-zinc-900 text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Asset_01
          </div>
        </div>

        {image && (
          <Media
            resource={image}
            className="h-full w-full p-8 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
            imgClassName="h-full w-full object-contain"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center z-20">
          <span className="text-[9px] font-black text-primary uppercase italic tracking-widest">Load_Sequence</span>
          <Price amount={product.priceInUSD || 0} className="text-sm font-black text-white italic" />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h4 className="text-[13px] font-black uppercase italic tracking-tighter text-black leading-none group-hover:text-primary transition-colors">
            {product.title}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-full bg-zinc-100 overflow-hidden">
            <div className="h-full w-0 group-hover:w-full transition-all duration-1000 bg-primary" />
          </div>
          <span className="text-[9px] font-bold text-zinc-300 tabular-nums">/08</span>
        </div>
      </div>
    </Link>
  )
}