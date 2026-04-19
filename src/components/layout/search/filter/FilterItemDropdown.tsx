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
          "flex w-full items-center justify-between border-4 px-6 h-16 transition-all duration-300",
          openSelect
            ? "border-black bg-primary text-black"
            : "border-black bg-white text-black hover:bg-zinc-50"
        )}
        onClick={() => setOpenSelect(!openSelect)}
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 leading-none mb-1">
            Filter Selection
          </span>
          <span className="text-sm font-bold uppercase tracking-tighter leading-none">
            {active}
          </span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className={cn("w-4 h-1 bg-black transition-transform duration-300", openSelect && "translate-y-1 rotate-45")} />
          <div className={cn("w-4 h-1 bg-black transition-transform duration-300", openSelect && "-translate-y-1 -rotate-45")} />
        </div>
      </button>

      {openSelect && (
        <div
          className="absolute z-50 w-full bg-white border-x-4 border-b-4 border-black mt-0 animate-in fade-in slide-in-from-top-2 duration-300"
          onClick={() => setOpenSelect(false)}
        >
          <ul className="flex flex-col divide-y-4 divide-black">
            {list.map((item: ListItem, i) => (
              <FilterItem item={item} key={i} />
            ))}
          </ul>
        </div>
      )}

      {/* Structural accent line */}
      <div className="absolute -left-1 top-0 h-full w-1 bg-black" />
    </div>
  )
}