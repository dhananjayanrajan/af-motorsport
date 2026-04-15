'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/shop', newParams))
  }

  return (
    <form className={cn('relative w-full group', className)} onSubmit={onSubmit}>
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] z-10 transition-all duration-300 opacity-0 group-focus-within:opacity-100"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      />

      <input
        autoComplete="off"
        className={cn(
          "w-full px-6 py-2.5 text-[11px] font-black uppercase italic tracking-tight transition-all duration-300 outline-none",
          "bg-zinc-50 border border-zinc-300 text-black",
          "placeholder:text-zinc-400 placeholder:not-italic placeholder:font-bold",
          "focus:bg-white focus:border-zinc-400"
        )}
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Search products..."
        type="text"
      />

      <div className="absolute right-0 top-0 flex h-full items-center px-4">
        <SearchIcon
          className="h-3.5 w-3.5 text-zinc-400 transition-colors duration-300 group-focus-within:text-black"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 25px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`,
        }}
      />
    </form>
  )
}