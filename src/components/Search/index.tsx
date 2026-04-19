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
    <form className={cn('relative w-full', className)} onSubmit={onSubmit}>
      <input
        autoComplete="off"
        className="w-full pl-4 pr-10 h-12 text-xs font-mono font-black uppercase tracking-widest transition-colors duration-200 outline-none bg-white-50 border border-black-pure text-black-pure placeholder:text-black-pure/20 focus:bg-white-pure"
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Keyword Entry"
        type="text"
      />

      <div className="absolute right-0 top-0 flex h-full items-center px-4">
        <button type="submit" className="group">
          <SearchIcon
            size={14}
            className="text-black-pure group-hover:text-secondary transition-colors"
          />
        </button>
      </div>

      <div className="mt-2 flex gap-1.5 opacity-20">
        <div className="size-1 bg-black-pure" />
        <div className="size-1 bg-black-pure" />
      </div>
    </form>
  )
}