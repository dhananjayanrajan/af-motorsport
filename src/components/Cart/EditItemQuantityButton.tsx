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
        "size-10 flex items-center justify-center transition-colors bg-white-pure",
        isLoading ? "text-black-pure/10" : "text-black-pure hover:bg-primary"
      )}
      onClick={(e) => {
        e.preventDefault()
        if (item.id) type === 'plus' ? incrementItem(item.id) : decrementItem(item.id)
      }}
      type="button"
    >
      {type === 'plus' ? <Plus size={12} /> : <Minus size={12} />}
    </button>
  )
}