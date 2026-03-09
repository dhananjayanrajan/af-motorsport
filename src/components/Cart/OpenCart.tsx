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
        'group relative flex items-center h-8 min-w-[120px] bg-zinc-950 border border-zinc-800 transition-all duration-200 outline-none select-none overflow-hidden',
        'focus-visible:ring-1 focus-visible:ring-[#00FF41] focus-visible:border-transparent',
        'active:scale-95',
        className
      )}
      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
      {...rest}
    >
      <div className="flex w-full items-center justify-between px-5 z-10 gap-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "size-1 transition-all duration-300",
            hasItems ? "bg-[#00FF41] shadow-[0_0_8px_#00FF41]" : "bg-zinc-800 group-hover:bg-zinc-600"
          )} />
          <span className={cn(
            "text-[9px] font-black uppercase tracking-[0.3em] italic transition-colors duration-200",
            hasItems ? "text-white" : "text-zinc-500 group-hover:text-zinc-200 group-focus:text-white"
          )}>
            Cart
          </span>
        </div>

        {hasItems && (
          <div className="flex items-center gap-1.5 border-l border-zinc-900 pl-3">
            <span className="text-[10px] font-mono font-bold text-[#00FF41] tabular-nums">
              {String(quantity).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      <div className={cn(
        "absolute inset-0 bg-zinc-900 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0",
        hasItems && "translate-y-0 bg-zinc-900/50"
      )} />

      <div className="absolute inset-0 bg-white translate-x-[-101%] group-active:translate-x-0 transition-transform duration-150 opacity-10" />

      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-[1px] bg-[#00FF41] transition-transform duration-500 origin-left",
        hasItems ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 group-focus:scale-x-100 group-focus:opacity-100"
      )} />
    </button>
  )
}