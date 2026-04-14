'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
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
        'group relative flex items-center h-10 px-6 bg-white border transition-all duration-200 outline-none select-none overflow-hidden',
        className
      )}
      style={{
        borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED,
        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
      }}
      {...rest}
    >
      <div className="flex items-center gap-4 z-10">
        <div className="flex items-center gap-2">
          <div
            className={cn("size-1.5 rounded-full transition-all duration-300", hasItems ? "animate-pulse" : "opacity-20")}
            style={{ backgroundColor: hasItems ? DESIGN_SYSTEM.COLORS.PRIMARY : 'black' }}
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] italic text-black">
            Cart
          </span>
        </div>

        {hasItems && (
          <span className="text-[10px] font-black tabular-nums border-l pl-4" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
            {String(quantity).padStart(2, '0')}
          </span>
        )}
      </div>

      <div className="absolute inset-0 bg-zinc-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </button>
  )
}