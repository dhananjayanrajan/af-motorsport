'use client'

import { CartItem } from '@/components/Cart'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { Minus, Plus } from 'lucide-react'
import { useMemo } from 'react'

export function EditItemQuantityButton({ type, item }: { item: CartItem; type: 'minus' | 'plus' }) {
  const { decrementItem, incrementItem, isLoading } = useCart()

  const disabled = useMemo(() => {
    if (!item.id) return true
    const target = item.variant && typeof item.variant === 'object' ? item.variant : item.product && typeof item.product === 'object' ? item.product : null
    if (target && typeof target === 'object' && (target as any).inventory !== undefined) {
      if (type === 'plus' && item.quantity !== undefined) return item.quantity >= (target as any).inventory
    }
    return false
  }, [item, type])

  return (
    <button
      disabled={disabled || isLoading}
      aria-label={type === 'plus' ? 'Increase' : 'Reduce'}
      className={cn(
        "h-full px-2 flex items-center justify-center text-zinc-500 transition-colors",
        disabled || isLoading ? "opacity-20" : `hover:text-white hover:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/20`
      )}
      onClick={(e) => {
        e.preventDefault()
        if (item.id) type === 'plus' ? incrementItem(item.id) : decrementItem(item.id)
      }}
      type="button"
    >
      {type === 'plus' ? <Plus className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
    </button>
  )
}