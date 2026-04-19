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
    <div className="flex items-center gap-4 py-2 px-4 border-2 border-black bg-white">
      <div
        className={`size-3 shrink-0 border-2 border-black ${stock > 0
            ? isLowStock
              ? 'bg-accent'
              : 'bg-primary'
            : 'bg-error'
          }`}
      />
      <span className="text-xs font-bold uppercase tracking-widest text-black">
        {stock > 0
          ? isLowStock
            ? `Limited: ${stock} Units`
            : 'Status: Available'
          : 'Status: Depleted'}
      </span>
    </div>
  )
}