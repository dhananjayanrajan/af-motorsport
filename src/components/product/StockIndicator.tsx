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
      return variants.find(
        (v) => String(typeof v === 'object' ? v.id : v) === variantId
      ) as Variant | undefined
    }
    return undefined
  }, [product.enableVariants, searchParams, variants])

  const stock = useMemo(() => {
    if (product.enableVariants) return selectedVariant?.inventory || 0
    return product.inventory || 0
  }, [product.enableVariants, selectedVariant, product.inventory])

  if (product.enableVariants && !selectedVariant) return null

  return (
    <div className="flex items-center gap-3">
      <div
        className="size-2.5"
        style={{
          backgroundColor: stock > 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '#dc2626',
          boxShadow: stock > 0 ? `0 0 8px ${DESIGN_SYSTEM.COLORS.PRIMARY}` : 'none',
        }}
      />
      <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
        {stock > 0
          ? stock < 10
            ? `Limited_Supply: ${stock}_Units`
            : 'System_Ready'
          : 'Stock_Depleted'}
      </span>
    </div>
  )
}