import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { Search } from '@/components/Search'
import { DESIGN_SYSTEM, sorting } from '@/lib/constants'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="w-full bg-black min-h-screen border-t border-zinc-900">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-80 flex-none border-b lg:border-b-0 lg:border-r border-zinc-900 p-8 lg:min-h-screen">
            <div className="sticky top-24 flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>Quick_Search</span>
                <Search className={`bg-zinc-950 border-zinc-800 rounded-none text-white transition-colors focus:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Catalog_Index</span>
                  <Categories />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">System_Sort</span>
                  <FilterList list={sorting} title="Sort by" />
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-zinc-900 hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className={`size-1.5 animate-pulse bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">Store_Server_Online</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-8 md:p-12 lg:p-16 bg-black">
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  )
}