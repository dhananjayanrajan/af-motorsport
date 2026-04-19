'use client'

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
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-10 bg-primary opacity-0 group-focus-within:opacity-100 transition-opacity" />

      <input
        autoComplete="off"
        className={cn(
          'w-full pl-8 pr-12 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 outline-none',
          'bg-white border-2 border-black text-black',
          'placeholder:text-zinc-300 placeholder:font-bold',
          'focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1',
        )}
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Search Catalog..."
        type="text"
      />

      <div className="absolute right-0 top-0 flex h-full items-center px-5">
        <button type="submit" className="group/btn">
          <SearchIcon
            className="h-5 w-5 text-black transition-transform group-hover/btn:scale-110"
            strokeWidth={3}
          />
        </button>
      </div>

      <div className="absolute -bottom-6 left-0 flex gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity">
        <div className="size-1.5 bg-primary" />
        <div className="size-1.5 bg-black" />
        <div className="size-1.5 bg-zinc-200" />
      </div>
    </form>
  )
}