'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { ShoppingBag } from 'lucide-react'

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
        'group relative flex items-center h-9 px-4 bg-white border skew-x-[-12deg] transition-all duration-300 outline-none select-none overflow-hidden',
        className
      )}
      style={{
        borderColor: DESIGN_SYSTEM.COLORS.ZINC[300]
      }}
      {...rest}
    >
      <div
        className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      />

      <div className="flex items-center gap-3 z-10 skew-x-[12deg]">
        <div className="flex items-center gap-2">
          {hasItems ? (
            <div
              className="size-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[950],
                boxShadow: `0 0 8px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`
              }}
            />
          ) : (
            <ShoppingBag className="size-3 text-zinc-400 group-hover:text-black transition-colors" />
          )}

          <span
            className="text-[10px] font-black uppercase tracking-tight italic text-zinc-950 transition-all duration-300"
            style={{
              textShadow: hasItems ? `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` : 'none'
            }}
          >
            Cart
          </span>
        </div>

        {hasItems && (
          <div
            className="flex items-center border-l pl-3 h-3"
            style={{ borderLeftColor: 'rgba(0,0,0,0.1)' }}
          >
            <span className="text-[10px] font-black tabular-nums text-zinc-950">
              {String(quantity).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </button>
  )
}