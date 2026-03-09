'use client'

import type { CartItem } from '@/components/Cart'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
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
      className={cn(
        "group flex h-6 w-6 items-center justify-center bg-black border border-zinc-800 transition-colors active:scale-90",
        `hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
      )}
      type="button"
    >
      <X className={cn(
        "h-3 w-3 text-zinc-500 transition-colors",
        `group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
      )} />
    </button>
  )
}