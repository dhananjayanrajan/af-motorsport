'use client'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import { StockIndicator } from '@/components/product/StockIndicator'
import { RichText } from '@/components/RichText'
import type { Product, Variant } from '@/payload-types'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { Cpu } from 'lucide-react'
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
    <div className="flex flex-col gap-12">
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 bg-primary text-black text-[10px] font-black uppercase italic tracking-widest">
          Equipment_Entry_v1
        </div>
        <h1 className="text-6xl xl:text-8xl font-black italic text-black uppercase tracking-tighter leading-[0.8] transition-all">
          {product.title}
        </h1>
        <div className="flex items-center gap-4">
          <div className="h-6 w-[2px] bg-primary" />
          {hasVariants ? (
            <Price highestAmount={highestAmount} lowestAmount={lowestAmount} className="text-4xl font-black text-black italic tracking-tighter" />
          ) : (
            <Price amount={amount} className="text-4xl font-black text-black italic tracking-tighter" />
          )}
        </div>
      </div>

      <div className="bg-zinc-950 p-8 border-l-4 border-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 text-white">
          <Cpu size={80} />
        </div>
        <div className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-4">Functional_Spec</div>
        {product.description ? (
          <RichText
            className="text-zinc-400 text-[11px] font-bold uppercase leading-relaxed max-w-prose relative z-10"
            data={product.description}
          />
        ) : (
          <p className="text-zinc-600 text-[11px] font-bold uppercase italic">No_Data_Description_Available</p>
        )}
      </div>

      <div className="space-y-10">
        <Suspense fallback={null}>
          <VariantSelector product={product} />
        </Suspense>

        <div className="pt-10 border-t border-zinc-100 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <StockIndicator product={product} />
            <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Type: Motorsport_Grade</span>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  )
}