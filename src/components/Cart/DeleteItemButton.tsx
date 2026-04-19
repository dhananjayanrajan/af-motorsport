'use client'

import type { CartItem } from '@/components/Cart'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { isLoading, removeItem } = useCart()

  return (
    <button
      disabled={!item.id || isLoading}
      onClick={(e) => { e.preventDefault(); if (item.id) removeItem(item.id) }}
      className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 hover:text-error transition-colors underline underline-offset-4"
      type="button"
    >
      Remove
    </button>
  )
}