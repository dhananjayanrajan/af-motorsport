'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col border border-zinc-800 bg-black p-8 md:p-12 relative overflow-hidden" style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
      <div className={cn("absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br", `from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />

      <div className="flex items-center gap-3 mb-4">
        <div className={cn("size-2 animate-pulse", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">System_Failure</h2>
      </div>

      <p className="my-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed">
        There was an issue with the storefront protocol. This could be a temporary synchronization error. Please re-initialize the action.
      </p>

      <button
        className={cn(
          "relative group mt-8 flex w-full items-center justify-center h-14 transition-all active:scale-95 overflow-hidden",
          "bg-white text-black"
        )}
        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
        onClick={() => reset()}
        type="button"
      >
        <div className={cn("absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
        <span className={cn("relative z-10 text-[11px] font-black uppercase italic group-hover:text-white transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
          Re-Initialize_System
        </span>
      </button>
    </div>
  )
}