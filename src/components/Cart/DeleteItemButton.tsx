'use client'

import type { CartItem } from '@/components/Cart'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { isLoading, removeItem } = useCart()

  return (
    <button
      disabled={!item.id || isLoading}
      onClick={(e) => { e.preventDefault(); if (item.id) removeItem(item.id) }}
      className="text-[10px] font-mono font-black uppercase text-black-pure opacity-30 hover:opacity-100 hover:text-secondary transition-all"
      type="button"
    >
      Remove
    </button>
  )
}