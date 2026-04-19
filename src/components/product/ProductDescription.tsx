'use client'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import { StockIndicator } from '@/components/product/StockIndicator'
import { RichText } from '@/components/RichText'
import type { Product, Variant } from '@/payload-types'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { Suspense } from 'react'
import { VariantSelector } from './VariantSelector'

export function ProductDescription({ product }: { product: Product }) {
  const { currency } = useCurrency()
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)

  let lowestAmount = 0,
    highestAmount = 0,
    amount = 0
  if (hasVariants) {
    const prices = (product.variants?.docs || [])
      .filter((v): v is Variant => typeof v === 'object')
      .map((v) => v[`priceIn${currency.code}` as keyof Variant] as number)
      .sort((a, b) => a - b)
    lowestAmount = prices[0] ?? 0
    highestAmount = prices[prices.length - 1] ?? 0
  } else {
    amount = (product[priceField] as number) || 0
  }

  return (
    <div className="flex flex-col gap-10 bg-white-pure">
      <div className="pb-8 border-b border-black-pure">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-primary" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-black-pure">
              Market Value
            </span>
          </div>
          <StockIndicator product={product} />
        </div>

        <div className="flex items-baseline">
          {hasVariants ? (
            <Price
              highestAmount={highestAmount}
              lowestAmount={lowestAmount}
              className="text-5xl font-mono font-black uppercase tracking-tighter text-black-pure"
            />
          ) : (
            <Price
              amount={amount}
              className="text-5xl font-mono font-black uppercase tracking-tighter text-black-pure"
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure opacity-30">
            Specifications
          </span>
        </div>
        {product.description && (
          <RichText
            className="text-sm font-mono font-black uppercase leading-relaxed text-black-pure"
            data={product.description}
          />
        )}
      </div>

      <div className="pt-8 space-y-10 border-t border-black-pure">
        <Suspense fallback={<div className="h-20 w-full bg-white-100 animate-pulse" />}>
          <VariantSelector product={product} />
        </Suspense>

        <div className="w-full">
          <AddToCart product={product} />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black-pure/10">
          <div className="flex gap-2">
            <div className="size-2 bg-black-pure" />
            <div className="size-2 bg-secondary" />
            <div className="size-2 bg-primary" />
          </div>
          <span className="text-[9px] font-mono font-black uppercase tracking-widest text-black-pure opacity-30">
            System Checkout Active
          </span>
        </div>
      </div>
    </div>
  )
}