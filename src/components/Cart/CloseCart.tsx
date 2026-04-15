'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { X } from 'lucide-react'

export function CloseCart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border bg-white transition-all duration-300 group cursor-pointer skew-x-[-12deg] overflow-hidden",
        className
      )}
      style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
    >
      <div
        className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      />

      <div className="relative z-10 skew-x-[12deg] flex items-center justify-center">
        <X
          className="h-4 w-4 text-black group-hover:rotate-90 transition-all duration-300"
          strokeWidth={3}
        />
      </div>
    </div>
  )
}