import configPromise from '@payload-config'
import clsx from 'clsx'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

import { Item } from './Item'

async function List() {
  const payload = await getPayload({ config: configPromise })

  const categoriesData = await payload.find({
    collection: 'categories',
    sort: 'title',
    overrideAccess: true,
    select: {
      title: true,
      slug: true,
    },
  })

  const categories = categoriesData.docs.map((category) => {
    return {
      href: `/shop/${category.slug}`,
      title: (category as any).title || 'UNTITLED_NODE',
    }
  })

  return (
    <React.Fragment>
      <nav className="border-b border-zinc-900 pb-6 mb-8">
        <ul className="flex flex-wrap gap-4">
          <Item title="All_Stock" href="/shop" />
          <Suspense fallback={null}>
            {categories.map((category) => {
              return <Item {...category} key={category.href} />
            })}
          </Suspense>
        </ul>
      </nav>
    </React.Fragment>
  )
}

const skeleton = 'mb-3 h-3 animate-pulse bg-zinc-900 border-l-2 border-[#00FF41]/20'

export function CategoryTabs() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, 'w-1/4')} />
          <div className={clsx(skeleton, 'w-1/3 shadow-[0_0_10px_rgba(0,255,65,0.05)]')} />
          <div className={clsx(skeleton, 'w-1/2')} />
          <div className={clsx(skeleton, 'w-1/4')} />
        </div>
      }
    >
      <List />
    </Suspense>
  )
}