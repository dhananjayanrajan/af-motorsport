'use client'

import type { Product, Variant } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
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
        toast.success('Cart updated')
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
        "group flex w-full h-16 border border-black-pure transition-colors duration-200",
        (disabled || isLoading) ? "bg-white-100 opacity-50 cursor-not-allowed" : "bg-white-pure hover:bg-primary"
      )}
    >
      <div className="flex-1 flex items-center px-6">
        <span className="text-sm font-mono font-black uppercase tracking-widest text-black-pure">
          {disabled ? 'Unavailable' : 'Add to Cart'}
        </span>
      </div>
      <div className="w-16 border-l border-black-pure flex items-center justify-center bg-black-pure text-white-pure group-hover:bg-secondary transition-colors">
        <div className="size-2 bg-current" />
      </div>
    </button>
  )
}