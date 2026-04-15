'use client'

import { cn } from '@/utilities/cn'
import { ChevronDownIcon } from 'lucide-react'
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
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between border-2 px-5 h-12 text-[11px] font-black uppercase italic tracking-widest transition-all duration-200",
          openSelect
            ? "border-black bg-black text-white"
            : "border-zinc-200 bg-white text-black hover:border-zinc-400"
        )}
        onClick={() => {
          setOpenSelect(!openSelect)
        }}
      >
        <span>{active}</span>
        <ChevronDownIcon className={cn("h-4 w-4 transition-transform duration-300", openSelect && "rotate-180")} />
      </button>

      {openSelect && (
        <div
          className="absolute z-50 w-full bg-white border-2 border-t-0 border-black shadow-2xl mt-0 animate-in fade-in slide-in-from-top-1 duration-200"
          onClick={() => {
            setOpenSelect(false)
          }}
        >
          <ul className="py-2">
            {list.map((item: ListItem, i) => (
              <FilterItem item={item} key={i} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}