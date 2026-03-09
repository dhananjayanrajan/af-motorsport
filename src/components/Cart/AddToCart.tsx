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
        toast.success('Item added to cart.')
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
        "relative group h-14 w-full md:w-64 overflow-hidden transition-all duration-300",
        disabled || isLoading ? "opacity-50 grayscale cursor-not-allowed" : "cursor-pointer"
      )}
      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
    >
      <div className={cn("absolute inset-0 transition-transform duration-500 group-hover:scale-105 group-active:scale-95", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
      <div className="relative z-10 flex items-center justify-center gap-3 text-white">
        <ShoppingCart className="h-4 w-4 fill-current" />
        <span className="text-xs font-black uppercase tracking-[0.4em] italic">
          {disabled ? 'Out of Stock' : 'Add To Cart'}
        </span>
      </div>
    </button>
  )
}