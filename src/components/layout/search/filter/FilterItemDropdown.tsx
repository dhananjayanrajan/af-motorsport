'use client'

import { cn } from '@/utilities/cn'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { ListItem } from '.'
import { FilterItem } from './FilterItem'

export function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState('')
  const [openSelect, setOpenSelect] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        setActive(listItem.title)
      }
    })
  }, [pathname, list, searchParams])

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between border border-black-pure px-6 h-20 transition-colors duration-200",
          openSelect
            ? "bg-black-pure text-white-pure"
            : "bg-white-pure text-black-pure hover:bg-white-50"
        )}
        onClick={() => setOpenSelect(!openSelect)}
      >
        <div className="flex flex-col items-start text-left">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-40 leading-none mb-2">
            Catalog Filter
          </span>
          <span className="text-base font-mono font-black uppercase tracking-tight leading-none">
            {active || 'Select Option'}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 items-center shrink-0">
          <div className={cn("w-6 h-1 bg-current transition-transform duration-300", openSelect && "translate-y-2.5 rotate-45")} />
          <div className={cn("w-6 h-1 bg-current transition-opacity duration-300", openSelect && "opacity-0")} />
          <div className={cn("w-6 h-1 bg-current transition-transform duration-300", openSelect && "-translate-y-2.5 -rotate-45")} />
        </div>
      </button>

      {openSelect && (
        <div
          className="absolute z-50 w-full bg-white-pure border-x border-b border-black-pure mt-[-1px] shadow-2xl overflow-hidden"
          onClick={() => setOpenSelect(false)}
        >
          <ul className="flex flex-col">
            {list.map((item: ListItem, i) => (
              <FilterItem item={item} key={i} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}