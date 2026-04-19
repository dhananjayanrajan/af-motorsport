'use client'

import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  href: string
  title: string
}

export function Item({ href, title }: Props) {
  const pathname = usePathname()
  const active = pathname === href
  const DynamicTag = active ? 'div' : Link

  return (
    <li className="flex-none">
      <DynamicTag
        href={href}
        className={cn(
          'flex items-center px-6 h-10 border-r border-b border-black-pure transition-colors duration-200',
          active
            ? 'bg-secondary text-white-pure'
            : 'bg-white-pure text-black-pure hover:bg-primary cursor-pointer'
        )}
      >
        <span className="text-[10px] font-mono font-black uppercase tracking-widest leading-none">
          {title}
        </span>
        {active && (
          <div className="ml-3 size-1.5 bg-white-pure rounded-full" />
        )}
      </DynamicTag>
    </li>
  )
}