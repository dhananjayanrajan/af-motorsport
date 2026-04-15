'use client'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import { StockIndicator } from '@/components/product/StockIndicator'
import { RichText } from '@/components/RichText'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div className="flex flex-col gap-12 text-left">
      <div className="pb-10 border-b border-black/10">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[11px] font-black uppercase italic"
            style={{
              color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
              letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT
            }}
          >
            UNIT PRICING
          </span>
          <StockIndicator product={product} />
        </div>

        <div className="flex items-baseline">
          {hasVariants ? (
            <Price
              highestAmount={highestAmount}
              lowestAmount={lowestAmount}
              className="text-5xl font-black italic tracking-tighter"
              style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            />
          ) : (
            <Price
              amount={amount}
              className="text-5xl font-black italic tracking-tighter"
              style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <span
          className="text-[11px] font-black uppercase italic"
          style={{
            color: DESIGN_SYSTEM.COLORS.BLACK.PURE,
            letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT
          }}
        >
          DESCRIPTION
        </span>
        {product.description && (
          <RichText
            className="text-[15px] leading-relaxed font-bold uppercase"
            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            data={product.description}
          />
        )}
      </div>

      <div className="pt-6 space-y-12">
        <Suspense fallback={null}>
          <VariantSelector product={product} />
        </Suspense>

        <div className="w-full">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  )
}