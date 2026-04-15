'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Product, Variant } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { ShoppingCart } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { toast } from 'sonner'

type Props = {
  product: Product
}

export function AddToCart({ product }: Props) {
  const { addItem, cart, isLoading } = useCart()
  const searchParams = useSearchParams()
  const variants = product.variants?.docs || []

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')
      const validVariant = variants.find((variant) => {
        if (typeof variant === 'object') return String(variant.id) === variantId
        return String(variant) === variantId
      })
      if (validVariant && typeof validVariant === 'object') return validVariant
    }
    return undefined
  }, [product.enableVariants, searchParams, variants])

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      addItem({
        product: product.id,
        variant: selectedVariant?.id ?? undefined,
      }).then(() => {
        toast.success('Item added to cart')
      })
    },
    [addItem, product, selectedVariant],
  )

  const disabled = useMemo<boolean>(() => {
    const existingItem = cart?.items?.find((item) => {
      const productID = typeof item.product === 'object' ? item.product?.id : item.product
      const variantID = item.variant ? (typeof item.variant === 'object' ? item.variant?.id : item.variant) : undefined
      if (productID === product.id) {
        if (product.enableVariants) return variantID === selectedVariant?.id
        return true
      }
      return false
    })

    if (existingItem) {
      const existingQuantity = existingItem.quantity || 0
      if (product.enableVariants) return existingQuantity >= (selectedVariant?.inventory || 0)
      return existingQuantity >= (product.inventory || 0)
    }

    if (product.enableVariants) {
      if (!selectedVariant || selectedVariant.inventory === 0) return true
    } else {
      if (product.inventory === 0) return true
    }
    return false
  }, [selectedVariant, cart?.items, product])

  return (
    <button
      disabled={disabled || isLoading}
      onClick={addToCart}
      type="submit"
      className={cn(
        "relative group h-14 w-full md:w-72 overflow-hidden transition-all duration-300 skew-x-[-12deg] border border-transparent",
        (disabled || isLoading) ? "opacity-50 grayscale cursor-not-allowed" : "cursor-pointer active:scale-[0.97]"
      )}
    >
      <div
        className="absolute inset-0 transition-all duration-500 group-hover:brightness-110"
        style={{
          backgroundColor: (disabled || isLoading) ? DESIGN_SYSTEM.COLORS.ZINC[200] : DESIGN_SYSTEM.COLORS.PRIMARY[500]
        }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 25px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` }}
      />

      <div className="relative z-10 flex items-center justify-center gap-4 text-black skew-x-[12deg]">
        <ShoppingCart className="size-4" strokeWidth={2.5} />
        <span
          className="text-xs font-black uppercase tracking-tight italic"
          style={{
            textShadow: !(disabled || isLoading) ? `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` : 'none'
          }}
        >
          {disabled ? 'Out of Stock' : 'Add to Cart'}
        </span>
      </div>
    </button>
  )
}