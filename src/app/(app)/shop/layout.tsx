import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { Search } from '@/components/Search'
import { sorting } from '@/lib/constants'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="w-full bg-zinc-100 min-h-screen">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-96 flex-none border-b-4 lg:border-b-0 lg:border-r-4 border-black p-8 md:p-12 bg-white lg:min-h-screen relative z-20">
            <div className="lg:sticky lg:top-12 flex flex-col gap-16">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="size-6 bg-primary border-2 border-black" />
                  <span className="text-sm font-bold uppercase tracking-tight text-black">Search Catalog</span>
                </div>
                <Search className="bg-white border-2 border-black text-black focus:bg-zinc-50 transition-all rounded-none placeholder:text-zinc-400 h-14 px-6 w-full shadow-none font-bold uppercase" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <span className="text-sm font-bold text-black uppercase tracking-tight">
                      Collections
                    </span>
                    <div className="size-3 bg-secondary" />
                  </div>
                  <Categories />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <span className="text-sm font-bold text-black uppercase tracking-tight">
                      Filters
                    </span>
                    <div className="size-3 bg-accent" />
                  </div>
                  <FilterList list={sorting} title="Sort" />
                </div>
              </div>

              <div className="mt-auto pt-12 hidden lg:block border-t-2 border-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-black uppercase tracking-widest">Active</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="size-2 bg-black" />
                    <div className="size-2 bg-black opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-8 md:p-12 lg:p-16 bg-zinc-100 relative z-10">
            <div className="mb-12 flex items-center gap-3">
              <div className="h-10 w-4 bg-primary" />
              <div className="h-10 w-4 bg-accent" />
              <div className="h-10 w-4 bg-secondary" />
            </div>
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  )
}