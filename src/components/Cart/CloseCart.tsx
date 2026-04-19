'use client'

import { cn } from '@/utilities/cn'
import { X } from 'lucide-react'

export function CloseCart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center border-4 border-black bg-white text-black hover:bg-error hover:text-white transition-colors cursor-pointer",
        className
      )}
    >
      <X className="h-6 w-6" strokeWidth={4} />
    </div>
  )
}