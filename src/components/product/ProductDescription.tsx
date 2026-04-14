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

  let lowestAmount = 0, highestAmount = 0, amount = 0
  if (hasVariants) {
    const prices = (product.variants?.docs || [])
      .filter((v): v is Variant => typeof v === 'object')
      .map(v => v[`priceIn${currency.code}` as keyof Variant] as number)
      .sort((a, b) => a - b)
    lowestAmount = prices[0] ?? 0
    highestAmount = prices[prices.length - 1] ?? 0
  } else {
    amount = product[priceField] as number || 0
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Product Details
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight leading-tight">
          {product.title}
        </h1>
        <div className="flex items-center gap-4">
          {hasVariants ? (
            <Price
              highestAmount={highestAmount}
              lowestAmount={lowestAmount}
              className="text-2xl font-bold text-black tracking-tight"
            />
          ) : (
            <Price
              amount={amount}
              className="text-2xl font-bold text-black tracking-tight"
            />
          )}
        </div>
      </div>

      <div className="py-6 border-y border-zinc-200">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Description</div>
        {product.description ? (
          <RichText
            className="text-zinc-700 text-sm leading-relaxed max-w-2xl"
            data={product.description}
          />
        ) : (
          <p className="text-zinc-400 text-sm italic">No description available</p>
        )}
      </div>

      <div className="space-y-8">
        <Suspense fallback={null}>
          <VariantSelector product={product} />
        </Suspense>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <StockIndicator product={product} />
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  )
}