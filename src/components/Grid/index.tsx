import { cn } from '@/utilities/cn'
import React from 'react'

export function Grid(props: React.ComponentProps<'div'>) {
  const { children, className } = props
  return (
    <div {...props} className={cn('grid grid-flow-row gap-8', className)}>
      {children}
    </div>
  )
}