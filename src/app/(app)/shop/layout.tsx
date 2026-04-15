import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { Search } from '@/components/Search'
import { DESIGN_SYSTEM, sorting } from '@/lib/constants'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="w-full bg-zinc-100 min-h-screen">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-80 flex-none border-b lg:border-b-0 lg:border-r border-zinc-300 p-4 md:p-8 lg:p-10 bg-white lg:min-h-screen relative z-20">
            <div className="lg:sticky lg:top-10 flex flex-col gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-[3px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                  <span className="text-xs font-bold uppercase tracking-widest text-black">Search</span>
                </div>
                <Search className="bg-zinc-100 border-none text-black focus:ring-0 transition-all rounded-none placeholder:text-zinc-500 h-10 px-4 w-full shadow-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block border-b border-zinc-200 pb-2">
                    Categories
                  </span>
                  <Categories />
                </div>
                <div className="space-y-4">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block border-b border-zinc-200 pb-2">
                    Sort
                  </span>
                  <FilterList list={sorting} title="Sort" />
                </div>
              </div>

              <div className="mt-12 pt-8 hidden lg:block border-t border-zinc-100">
                <div className="flex items-center gap-3 relative">
                  <div className="size-2 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest relative z-10">Active</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-8 lg:p-14 bg-zinc-100 relative z-10">
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  )
}