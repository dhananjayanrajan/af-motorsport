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
      className="group flex h-6 w-6 items-center justify-center bg-white border skew-x-[-12deg] transition-all duration-200 active:scale-90 overflow-hidden"
      style={{
        borderColor: DESIGN_SYSTEM.COLORS.ZINC[200]
      }}
      type="button"
    >
      <div
        className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200 ease-out"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      />

      <div className="relative z-10 skew-x-[12deg] flex items-center justify-center">
        <X
          className="h-3 w-3 text-zinc-400 transition-colors group-hover:text-black"
          strokeWidth={4}
        />
      </div>
    </button>
  )
}