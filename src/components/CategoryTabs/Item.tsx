'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  href: string
  title: string
}

export function Item({ href, title }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === href
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="flex items-center">
      <DynamicTag
        className={clsx(
          'relative flex items-center h-9 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 italic',
          {
            'bg-white text-black translate-y-[-2px] shadow-[0_5px_15px_rgba(255,255,255,0.1)]': active,
            'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-900 hover:text-[#00FF41]': !active,
          },
        )}
        style={{
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
        }}
        href={href}
        prefetch={!active ? false : undefined}
      >
        {active && (
          <span className="absolute left-2 w-1 h-3 bg-[#00FF41] shadow-[0_0_8px_#00FF41]" />
        )}
        <span className="relative z-10">{title.replace(' ', '_')}</span>
      </DynamicTag>
    </li>
  )
}