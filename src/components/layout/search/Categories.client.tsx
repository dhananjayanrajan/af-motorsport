'use client'

import type { Category } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

type Props = {
  category: Category
}

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('category') === String(category.id)
  }, [category.id, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', String(category.id))
    }

    router.push(pathname + '?' + params.toString())
  }, [category.id, isActive, pathname, router, searchParams])

  return (
    <button
      onClick={setQuery}
      className={cn(
        "group w-full flex items-center justify-between min-h-16 py-4 px-6 border-b border-black-pure transition-colors duration-150 text-left",
        isActive
          ? "bg-black-pure text-white-pure"
          : "bg-white-pure text-black-pure hover:bg-primary"
      )}
    >
      <div className="flex items-center gap-5">
        <div className={cn(
          "size-2.5 transition-all duration-300 shrink-0",
          isActive ? "bg-secondary scale-110 rotate-45" : "bg-black-pure opacity-10 group-hover:opacity-100"
        )} />
        <span className="text-sm md:text-sm font-mono font-bold uppercase tracking-tight">
          {category.name}
        </span>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        {isActive && (
          <span className="hidden sm:inline text-xs font-mono font-black uppercase text-secondary">
            Selected
          </span>
        )}
        <div className={cn(
          "size-8 border border-current flex items-center justify-center transition-transform",
          isActive ? "rotate-90" : "opacity-20 group-hover:opacity-100"
        )}>
          <div className={cn(
            "size-1.5 bg-current",
            isActive && "animate-pulse"
          )} />
        </div>
      </div>
    </button>
  )
}