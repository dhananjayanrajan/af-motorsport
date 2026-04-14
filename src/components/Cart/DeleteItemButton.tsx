'use client'

import type { CartItem } from '@/components/Cart'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
      className="group flex h-6 w-6 items-center justify-center bg-white border transition-all active:scale-90"
      style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
      type="button"
    >
      <X className="h-3 w-3 text-zinc-300 transition-colors group-hover:text-black" strokeWidth={3} />
    </button>
  )
}