'use client'

import { cn } from '@/utilities/cn'
import { X } from 'lucide-react'

export function CloseCart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center border border-black-pure bg-white-pure text-black-pure hover:bg-primary transition-colors cursor-pointer",
        className
      )}
    >
      <X size={16} />
    </div>
  )
}