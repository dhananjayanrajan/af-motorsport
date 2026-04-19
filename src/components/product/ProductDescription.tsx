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
    <div className="flex flex-col gap-12 text-left bg-white">
      <div className="pb-10 border-b-4 border-black">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="size-3 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-black">
              Unit Pricing
            </span>
          </div>
          <StockIndicator product={product} />
        </div>

        <div className="flex items-baseline">
          {hasVariants ? (
            <Price
              highestAmount={highestAmount}
              lowestAmount={lowestAmount}
              className="text-6xl font-bold uppercase tracking-tighter text-black leading-none"
            />
          ) : (
            <Price
              amount={amount}
              className="text-6xl font-bold uppercase tracking-tighter text-black leading-none"
            />
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-1 bg-black" />
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Description
          </span>
        </div>
        {product.description && (
          <RichText
            className="text-sm font-bold uppercase leading-normal text-black"
            data={product.description}
          />
        )}
      </div>

      <div className="pt-8 space-y-12 border-t-2 border-black">
        <Suspense fallback={<div className="h-20 w-full bg-zinc-100 animate-pulse" />}>
          <VariantSelector product={product} />
        </Suspense>

        <div className="w-full">
          <AddToCart product={product} />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-1">
            <div className="size-2 bg-black" />
            <div className="size-2 bg-black opacity-40" />
            <div className="size-2 bg-black opacity-10" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300">
            Secure checkout protocol
          </span>
        </div>
      </div>
    </div>
  )
}