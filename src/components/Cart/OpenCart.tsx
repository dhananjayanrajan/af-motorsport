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
        'group flex items-center h-full bg-white-pure transition-colors overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className={cn(
        "h-full aspect-square flex items-center justify-center transition-colors border-r border-black-pure",
        hasItems ? "group-hover:bg-primary text-black-pure" : "bg-white-pure text-black-pure"
      )}>
        <span className="text-[10px] font-mono font-black uppercase">
          {hasItems ? String(quantity).padStart(2, '0') : '00'}
        </span>
      </div>
      <div className="px-5 group-hover:bg-primary transition-colors h-full flex items-center">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">
          Cart
        </span>
      </div>
    </button>
  )
}