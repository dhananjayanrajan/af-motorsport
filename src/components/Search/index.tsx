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
      <input
        autoComplete="off"
        className={cn(
          "w-full rounded-lg border px-4 py-2 text-sm transition-all duration-300 outline-none",
          "bg-white text-black placeholder:text-neutral-500",
          "dark:bg-black dark:text-white dark:placeholder:text-neutral-400",
          `dark:border-neutral-800 dark:focus:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] dark:focus:shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`
        )}
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Search for products..."
        type="text"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <SearchIcon className={cn(
          "h-4 transition-colors duration-300",
          `group-focus-within:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}] group-focus-within:drop-shadow-[0_0_5px_${DESIGN_SYSTEM.COLORS.PRIMARY}]`
        )} />
      </div>
    </form>
  )
}