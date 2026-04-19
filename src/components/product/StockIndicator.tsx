'use client'

import { Product, Variant } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const StockIndicator: React.FC<{ product: Product }> = ({ product }) => {
  const searchParams = useSearchParams()
  const variants = product.variants?.docs || []

  const selectedVariant = useMemo(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')
      return variants.find((v) => String(typeof v === 'object' ? v.id : v) === variantId) as Variant | undefined
    }
    return undefined
  }, [product.enableVariants, searchParams, variants])

  const stock = useMemo(() => {
    if (product.enableVariants) return selectedVariant?.inventory || 0
    return product.inventory || 0
  }, [product.enableVariants, selectedVariant, product.inventory])

  if (product.enableVariants && !selectedVariant) return null

  const isLowStock = stock > 0 && stock < 10

  return (
    <div className="flex items-center gap-3 py-1.5 px-3 border border-black-pure bg-white-pure">
      <div
        className={`size-2 shrink-0 ${stock > 0
          ? isLowStock
            ? 'bg-secondary animate-pulse'
            : 'bg-primary'
          : 'bg-black-pure opacity-20'
          }`}
      />
      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">
        {stock > 0
          ? isLowStock
            ? `Limited ${stock}`
            : 'Available'
          : 'Depleted'}
      </span>
    </div>
  )
}