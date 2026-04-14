import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { X } from 'lucide-react'

export function CloseCart({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative flex h-12 w-12 items-center justify-center border-l border-b bg-white transition-colors group cursor-pointer",
      className
    )}
      style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
    >
      <X className="h-6 w-6 text-black group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
    </div>
  )
}