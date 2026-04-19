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
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="size-6 bg-primary" />
          <h3 className="text-sm font-mono font-black uppercase tracking-widest text-black-pure">
            Classification
          </h3>
        </div>
        <div className="hidden sm:flex gap-1.5">
          <div className="size-2 bg-black-pure" />
          <div className="size-2 bg-black-pure opacity-20" />
        </div>
      </div>

      <div className="border-t border-black-pure">
        {categories.docs.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between opacity-20">
        <div className="h-px grow bg-black-pure" />
        <div className="pl-6 flex gap-2">
          <div className="size-1.5 bg-black-pure" />
          <div className="size-1.5 bg-black-pure" />
        </div>
      </div>
    </div>
  )
}

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-10">
          <div className="flex items-center gap-4">
            <div className="size-6 bg-white-200 animate-pulse" />
            <div className="h-4 w-32 bg-white-200 animate-pulse" />
          </div>
          <div className="flex flex-col border-t border-black-pure">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 border-b border-black-pure bg-white-50 animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}