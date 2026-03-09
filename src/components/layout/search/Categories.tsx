import { DESIGN_SYSTEM } from '@/lib/constants'
import configPromise from '@payload-config'
import clsx from 'clsx'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { CategoryItem } from './Categories.client'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
  })

  return (
    <div>
      <h3 className={clsx("text-xs mb-2", `text-zinc-500`)}>Category</h3>

      <ul>
        {categories.docs.map((category) => {
          return (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/20 shadow-[0_0_10px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`
const items = 'bg-zinc-800'

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}