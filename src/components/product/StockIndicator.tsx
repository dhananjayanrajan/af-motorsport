'use client'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Product, Variant } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const StockIndicator: React.FC<{ product: Product }> = ({ product }) => {
  const searchParams = useSearchParams()
  const variants = product.variants?.docs || []

  const selectedVariant = useMemo(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')
      return variants.find(v => String(typeof v === 'object' ? v.id : v) === variantId) as Variant | undefined
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
    <div className="flex items-center gap-3">
      <div
        className="size-2 shrink-0"
        style={{
          backgroundColor: stock > 0 ? (isLowStock ? '#f59e0b' : DESIGN_SYSTEM.COLORS.PRIMARY[500]) : '#ef4444'
        }}
      />
      <span className="text-[11px] font-black uppercase italic tracking-widest text-black">
        {stock > 0
          ? isLowStock
            ? `Limited Inventory: ${stock} Units`
            : 'Inventory Status: Available'
          : 'Inventory Status: Out of Stock'}
      </span>
    </div>
  )
}