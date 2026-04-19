'use client'

import type { SortFilterItem as SortFilterItemType } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ListItem, PathFilterItem as PathFilterItemType } from '.'

function PathFilterItem({ item }: { item: PathFilterItemType }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === item.path
  const newParams = new URLSearchParams(searchParams.toString())
  const DynamicTag = active ? 'div' : Link

  newParams.delete('q')

  return (
    <li className="w-full">
      <DynamicTag
        className={cn(
          'group flex items-center justify-between w-full min-h-16 py-4 px-6 border-b border-black-pure transition-colors duration-150',
          active
            ? 'bg-black-pure text-white-pure'
            : 'bg-white-pure text-black-pure hover:bg-primary'
        )}
        href={createUrl(item.path, newParams)}
      >
        <div className="flex items-center gap-5">
          <div className={cn(
            "size-2.5 transition-all duration-300 shrink-0",
            active ? "bg-secondary rotate-45" : "bg-black-pure opacity-10 group-hover:opacity-100"
          )} />
          <span className="text-sm md:text-base font-mono font-black uppercase tracking-tight">
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className={cn(
            "size-8 border border-current flex items-center justify-center transition-transform",
            active ? "rotate-90" : "opacity-20 group-hover:opacity-100"
          )}>
            <div className="size-1.5 bg-current" />
          </div>
        </div>
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
  const DynamicTag = active ? 'div' : Link

  return (
    <li className="w-full">
      <DynamicTag
        className={cn(
          'group flex items-center justify-between w-full min-h-16 py-4 px-6 border-b border-black-pure transition-colors duration-150',
          active
            ? 'bg-black-pure text-white-pure'
            : 'bg-white-pure text-black-pure hover:bg-primary'
        )}
        href={href}
        prefetch={!active ? false : undefined}
      >
        <div className="flex items-center gap-5">
          <div className={cn(
            "size-2.5 transition-all duration-300 shrink-0",
            active ? "bg-primary rotate-45" : "bg-black-pure opacity-10 group-hover:opacity-100"
          )} />
          <span className="text-sm md:text-sm font-mono font-bold uppercase tracking-tight">
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className={cn(
            "size-8 border border-current flex items-center justify-center transition-transform",
            active ? "rotate-90" : "opacity-20 group-hover:opacity-100"
          )}>
            <div className="size-1.5 bg-current" />
          </div>
        </div>
      </DynamicTag>
    </li>
  )
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />
}