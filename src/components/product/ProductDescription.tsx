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
  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)

  if (hasVariants) {
    const priceFieldVar = `priceIn${currency.code}` as keyof Variant
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === 'object')
      .sort((a, b) => {
        if (
          typeof a === 'object' &&
          typeof b === 'object' &&
          priceFieldVar in a &&
          priceFieldVar in b &&
          typeof a[priceFieldVar] === 'number' &&
          typeof b[priceFieldVar] === 'number'
        ) {
          return (a[priceFieldVar] as number) - (b[priceFieldVar] as number)
        }
        return 0
      }) as Variant[]

    const lowestVariant = variantsOrderedByPrice[0][priceFieldVar]
    const highestVariant = variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceFieldVar]
    if (
      variantsOrderedByPrice &&
      typeof lowestVariant === 'number' &&
      typeof highestVariant === 'number'
    ) {
      lowestAmount = lowestVariant
      highestAmount = highestVariant
    }
  } else if (product[priceField] && typeof product[priceField] === 'number') {
    amount = product[priceField] as number
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-[#00FF41] uppercase tracking-[0.4em]">Asset_Identity</span>
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
          {product.title}
        </h1>
        <div className="mt-2">
          {hasVariants ? (
            <Price highestAmount={highestAmount} lowestAmount={lowestAmount} className="text-3xl font-black text-white italic" />
          ) : (
            <Price amount={amount} className="text-3xl font-black text-white italic" />
          )}
        </div>
      </div>

      {product.description ? (
        <div className="border-l-2 border-zinc-800 pl-6 py-2">
          <RichText className="prose prose-invert max-w-none text-zinc-400 text-sm uppercase leading-tight font-medium" data={product.description} enableGutter={false} />
        </div>
      ) : null}

      {hasVariants && (
        <div className="flex flex-col gap-6 pt-6 border-t border-zinc-900">
          <Suspense fallback={null}>
            <VariantSelector product={product} />
          </Suspense>
        </div>
      )}

      <div className="flex flex-col gap-6 pt-8 border-t border-zinc-900">
        <div className="flex items-center justify-between">
          <Suspense fallback={null}>
            <StockIndicator product={product} />
          </Suspense>
          <span className="text-[9px] font-mono text-zinc-600 uppercase">Status: Verified</span>
        </div>

        <Suspense fallback={null}>
          <AddToCart product={product} />
        </Suspense>
      </div>
    </div>
  )
}