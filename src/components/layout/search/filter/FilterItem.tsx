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
    <li className="w-full" key={item.title}>
      <DynamicTag
        className={cn(
          'group relative flex items-center justify-between w-full h-14 px-6 border-b-4 border-black transition-colors duration-300',
          active ? 'bg-secondary text-black' : 'bg-white text-black hover:bg-zinc-100'
        )}
        href={createUrl(item.path, newParams)}
      >
        <span className="text-xs font-bold uppercase tracking-widest">
          {item.title}
        </span>

        <div className="flex items-center gap-4">
          <div className={cn(
            "size-2 rounded-full border-2 border-black transition-all",
            active ? "bg-black scale-125" : "bg-transparent group-hover:scale-110"
          )} />
          <div className={cn(
            "w-8 h-[2px] bg-black transition-transform origin-right",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
          )} />
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
    <li className="w-full" key={item.title}>
      <DynamicTag
        className={cn(
          'group relative flex items-center justify-between w-full h-14 px-6 border-b-4 border-black transition-colors duration-300',
          active ? 'bg-accent text-black' : 'bg-white text-black hover:bg-zinc-100'
        )}
        href={href}
        prefetch={!active ? false : undefined}
      >
        <span className="text-xs font-bold uppercase tracking-widest">
          {item.title}
        </span>

        <div className={cn(
          "size-4 border-2 border-black flex items-center justify-center transition-all",
          active ? "bg-black rotate-45" : "bg-transparent group-hover:rotate-90"
        )}>
          {active && <div className="size-1 bg-white" />}
        </div>
      </DynamicTag>
    </li>
  )
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />
}