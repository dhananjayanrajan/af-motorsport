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
        toast.success('REGISTRY UPDATED')
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
        "group flex w-full h-24 bg-primary border-t-2 border-black-pure transition-all duration-300",
        (disabled || isLoading) ? "opacity-50 grayscale cursor-not-allowed" : "hover:bg-black-pure active:scale-[0.99]"
      )}
    >
      <div className="flex-1 flex flex-col items-start justify-center px-8 text-left">
        <span className={cn(
          "text-[10px] font-mono font-black tracking-[0.3em] uppercase mb-1",
          "text-black-pure group-hover:text-primary"
        )}>
          {disabled ? 'INVENTORY_NULL' : 'ACTION_REQUIRED'}
        </span>
        <h4 className={cn(
          "text-xl font-black uppercase tracking-tighter",
          "text-black-pure group-hover:text-white-pure"
        )}>
          {disabled ? 'OUT OF STOCK' : 'ADD TO REGISTRY'}
        </h4>
      </div>
      <div className="w-24 border-l-2 border-black-pure flex items-center justify-center">
        <div className={cn(
          "size-4 border-2 border-black-pure transition-all duration-500",
          "group-hover:bg-primary group-hover:rotate-90 group-hover:border-white-pure"
        )} />
      </div>
    </button>
  )
}