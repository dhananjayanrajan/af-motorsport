import configPromise from '@payload-config'
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
    <div className="relative">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-8 bg-primary" />
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-black">
          Classification
        </h3>
        <div className="grow h-[2px] bg-black" />
      </div>

      <ul className="grid grid-cols-1 gap-0 border-t-2 border-black">
        {categories.docs.map((category) => {
          return (
            <li key={category.id} className="border-b-2 border-black">
              <CategoryItem category={category} />
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex gap-1">
        <div className="size-2 bg-black" />
        <div className="size-2 bg-zinc-200" />
        <div className="size-2 bg-zinc-200" />
      </div>
    </div>
  )
}

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-4">
          <div className="h-8 bg-black w-1/2 animate-pulse" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-zinc-100 w-full animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}