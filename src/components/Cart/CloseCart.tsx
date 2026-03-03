import { cn } from '@/utilities/cn'
import { X } from 'lucide-react'

export function CloseCart({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative flex h-10 w-10 items-center justify-center border border-zinc-800 bg-black text-white transition-all hover:border-red-600 group",
      className
    )}>
      <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
    </div>
  )
}