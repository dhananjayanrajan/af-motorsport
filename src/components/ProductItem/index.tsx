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
  quantity = 1,
  variant,
  currencyCode,
}) => {
  const image = (product.gallery?.[0]?.image as MediaType) ?? undefined
  const itemPrice = variant?.priceInUSD || product.priceInUSD
  const itemURL = `/products/${product.slug}${variant ? `?variant=${variant.id}` : ''}`

  return (
    <Link
      href={itemURL}
      className="group block w-full bg-white-pure border-b border-black-pure transition-colors duration-200 hover:bg-white-100"
    >
      <div className="flex items-stretch h-24">
        <div className="w-24 bg-white-100 border-r border-black-pure flex items-center justify-center p-4 shrink-0 relative overflow-hidden group-hover:bg-white-pure transition-colors">
          {image && (
            <Media
              fill
              imgClassName="object-contain grayscale p-2 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              resource={image}
            />
          )}
        </div>

        <div className="flex-1 flex items-stretch">
          <div className="flex-1 px-8 flex flex-col justify-center gap-1">
            <span className="text-[10px] font-mono font-black text-black-pure opacity-30 uppercase tracking-widest">
              REFERENCE {String(product.id).slice(-4)}
            </span>
            <h4 className="text-base font-mono font-black uppercase tracking-tight text-black-pure group-hover:text-secondary transition-colors">
              {product.title}
            </h4>
          </div>

          <div className="flex items-stretch">
            <div className="hidden md:flex flex-col justify-center px-10 border-l border-black-pure bg-white-pure group-hover:bg-primary transition-colors duration-300">
              <span className="text-[10px] font-mono font-black text-black-pure opacity-40 uppercase mb-1">UNIT</span>
              <Price
                amount={itemPrice || 0}
                currencyCode={currencyCode}
                className="text-sm font-mono font-black text-black-pure"
              />
            </div>

            <div className="flex flex-col justify-center px-10 border-l border-black-pure text-center">
              <span className="text-[10px] font-mono font-black text-black-pure opacity-40 uppercase mb-1">QTY</span>
              <span className="text-sm font-mono font-black text-black-pure">
                {quantity}
              </span>
            </div>

            <div className="flex flex-col justify-center px-10 border-l border-black-pure min-w-[140px] bg-white-pure group-hover:bg-secondary transition-colors duration-300">
              <span className="text-[10px] font-mono font-black text-black-pure opacity-40 uppercase mb-1">TOTAL</span>
              <Price
                amount={(itemPrice || 0) * quantity}
                currencyCode={currencyCode}
                className="text-sm font-mono font-black text-black-pure group-hover:text-white-pure transition-colors"
              />
            </div>

            <div className="w-16 flex items-center justify-center border-l border-black-pure bg-white-pure group-hover:bg-black-pure group-hover:text-white-pure transition-all duration-300">
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}