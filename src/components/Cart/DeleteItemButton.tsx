'use client'

import type { CartItem } from '@/components/Cart'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { X } from 'lucide-react'
import React from 'react'

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { isLoading, removeItem } = useCart()
  const itemId = item.id

  return (
    <button
      aria-label="Remove item"
      disabled={!itemId || isLoading}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (itemId) removeItem(itemId)
      }}
      className="group flex h-6 w-6 items-center justify-center bg-black border border-zinc-800 transition-colors hover:border-red-600 active:scale-90"
      type="button"
    >
      <X className="h-3 w-3 text-zinc-500 group-hover:text-red-600 transition-colors" />
    </button>
  )
}