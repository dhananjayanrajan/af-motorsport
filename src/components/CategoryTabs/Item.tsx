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
    <li className="relative">
      <DynamicTag
        href={href}
        className={cn(
          'flex flex-col justify-between h-32 p-6 border-y-4 border-r-4 border-black transition-all duration-300',
          active
            ? 'bg-primary text-black'
            : 'bg-white text-black hover:bg-zinc-100 group'
        )}
      >
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
            {active ? 'Selected' : 'Catalog'}
          </span>
          <div className={cn(
            "size-4 border-4 border-black transition-transform duration-500",
            active ? "bg-black rotate-45" : "bg-transparent group-hover:rotate-90"
          )} />
        </div>

        <span className="text-sm font-bold uppercase tracking-tighter leading-none break-words">
          {title}
        </span>
      </DynamicTag>

      {active && (
        <div className="absolute -top-1 left-0 w-full h-1 bg-white/30" />
      )}
    </li>
  )
}