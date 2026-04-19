'use client'

import { cn } from '@/utilities/cn'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  const hasItems = typeof quantity === 'number' && quantity > 0

  return (
    <button
      className={cn(
        'group flex items-center h-12 bg-white border-2 border-black transition-all overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className={cn(
        "h-full px-4 flex items-center justify-center transition-colors",
        hasItems ? "bg-black text-white" : "bg-white text-black"
      )}>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          {hasItems ? String(quantity).padStart(2, '0') : '00'}
        </span>
      </div>
      <div className="px-5 py-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
          Cart
        </span>
      </div>
    </button>
  )
}