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
      title: (category as any).title || 'UNTITLED',
    }
  })

  return (
    <nav className="mb-20">
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-l-4 border-black">
        <Item title="All Products" href="/shop" />
        <Suspense fallback={null}>
          {categories.map((category) => (
            <Item {...category} key={category.href} />
          ))}
        </Suspense>
      </ul>
    </nav>
  )
}

export function CategoryTabs() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-l-4 border-black mb-20">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 border-y-4 border-r-4 border-black bg-zinc-50 animate-pulse" />
          ))}
        </div>
      }
    >
      <List />
    </Suspense>
  )
}