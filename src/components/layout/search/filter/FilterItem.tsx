'use client'

import type { SortFilterItem as SortFilterItemType } from '@/lib/constants'

import { createUrl } from '@/utilities/createUrl'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import type { ListItem, PathFilterItem as PathFilterItemType } from '.'

function PathFilterItem({ item }: { item: PathFilterItemType }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === item.path
  const newParams = new URLSearchParams(searchParams.toString())
  const DynamicTag = active ? 'p' : Link

  newParams.delete('q')

  return (
    <li className="flex" key={item.title}>
      <DynamicTag
        className={clsx(
          'w-full text-[11px] font-black uppercase italic tracking-widest py-2 px-3 transition-all duration-200 flex items-center gap-3',
          {
            'text-black bg-zinc-100 border-l-4 border-black': active,
            'text-zinc-400 hover:text-black hover:bg-zinc-50 border-l-4 border-transparent': !active,
          },
        )}
        href={createUrl(item.path, newParams)}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

function SortFilterItem({ item }: { item: SortFilterItemType }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('sort') === item.slug
  const q = searchParams.get('q')
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  )
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="flex" key={item.title}>
      <DynamicTag
        className={clsx(
          'w-full text-[11px] font-black uppercase italic tracking-widest py-2 px-3 transition-all duration-200 flex items-center gap-3',
          {
            'text-black bg-zinc-100 border-l-4 border-black': active,
            'text-zinc-400 hover:text-black hover:bg-zinc-50 border-l-4 border-transparent': !active,
          },
        )}
        href={href}
        prefetch={!active ? false : undefined}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />
}