'use client'

import { CartItem } from '@/components/Cart'
import { cn } from '@/utilities/cn'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { Minus, Plus } from 'lucide-react'

export function EditItemQuantityButton({ type, item }: { item: CartItem; type: 'minus' | 'plus' }) {
  const { decrementItem, incrementItem, isLoading } = useCart()

  return (
    <button
      disabled={isLoading}
      className={cn(
        "size-8 flex items-center justify-center transition-colors",
        isLoading ? "bg-zinc-50 text-zinc-200" : "text-black hover:bg-zinc-100"
      )}
      onClick={(e) => {
        e.preventDefault()
        if (item.id) type === 'plus' ? incrementItem(item.id) : decrementItem(item.id)
      }}
      type="button"
    >
      {type === 'plus' ? <Plus size={12} strokeWidth={3} /> : <Minus size={12} strokeWidth={3} />}
    </button>
  )
}