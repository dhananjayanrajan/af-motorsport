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
    })
    if (existingItem) {
      const existingQuantity = existingItem.quantity
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
        "relative group h-14 w-full md:w-72 overflow-hidden transition-all duration-300",
        disabled || isLoading ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"
      )}
      style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
      />
      <div className="relative z-10 flex items-center justify-center gap-4 text-white">
        <ShoppingCart className="size-4" strokeWidth={2.5} />
        <span className="text-xs font-black uppercase tracking-[0.2em] italic">
          {disabled ? 'Out of Stock' : 'Add to Cart'}
        </span>
      </div>
    </button>
  )
}