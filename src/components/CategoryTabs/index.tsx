import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Suspense } from 'react'
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
      title: (category as any).title || 'Untitled',
    }
  })

  return (
    <nav className="mb-12">
      <ul className="flex flex-wrap border-t border-l border-black-pure">
        <Item title="All" href="/shop" />
        {categories.map((category) => (
          <Item {...category} key={category.href} />
        ))}
      </ul>
    </nav>
  )
}

export function CategoryTabs() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-wrap border-t border-l border-black-pure opacity-20 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 border-r border-b border-black-pure animate-pulse" />
          ))}
        </div>
      }
    >
      <List />
    </Suspense>
  )
}