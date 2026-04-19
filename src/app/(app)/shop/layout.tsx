import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { Search } from '@/components/Search'
import { sorting } from '@/lib/constants'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="w-full bg-white-50 min-h-screen">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-80 flex-none border-b lg:border-b-0 lg:border-r border-black-pure p-6 md:p-10 bg-white-pure lg:min-h-screen relative z-20">
            <div className="lg:sticky lg:top-10 flex flex-col gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-2 bg-primary" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">Search</span>
                </div>
                <Search />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-black-pure pb-2">
                    <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">
                      Collections
                    </span>
                    <div className="size-1.5 bg-secondary" />
                  </div>
                  <Categories />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-black-pure pb-2">
                    <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">
                      Sorting
                    </span>
                    <div className="size-1.5 bg-primary" />
                  </div>
                  <FilterList list={sorting} title="Sort" />
                </div>
              </div>

              <div className="mt-auto pt-8 hidden lg:block border-t border-black-pure opacity-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-mono font-black text-black-pure opacity-40 uppercase tracking-widest">System Active</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="size-2 bg-black-pure" />
                    <div className="size-2 bg-black-pure opacity-10" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-6 md:p-10 lg:p-12 relative z-10">
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  )
}