'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
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
      <div
        className={cn(
          "flex w-full items-center justify-between rounded border px-4 py-2 text-sm transition-all duration-300 cursor-pointer",
          `border-zinc-800 bg-black text-white`,
          openSelect && `border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`
        )}
        onClick={() => {
          setOpenSelect(!openSelect)
        }}
      >
        <div className={cn(openSelect && `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>{active}</div>
        <ChevronDownIcon className={cn("h-4 transition-transform duration-300", openSelect && "rotate-180")} />
      </div>
      {openSelect && (
        <div
          className={cn(
            "absolute z-40 w-full rounded-b-md p-4 shadow-md mt-1 border-x border-b transition-all duration-300",
            `bg-black border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/30 shadow-[0_10px_20px_rgba(0,0,0,0.5)]`
          )}
          onClick={() => {
            setOpenSelect(false)
          }}
        >
          {list.map((item: ListItem, i) => (
            <FilterItem item={item} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}