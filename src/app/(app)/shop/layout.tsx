import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { Search } from '@/components/Search'
import { DESIGN_SYSTEM, sorting } from '@/lib/constants'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="w-full bg-zinc-50 min-h-screen">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-72 flex-none border-r border-zinc-200 p-6 lg:min-h-screen bg-white relative z-20">
            <div className="sticky top-24 flex flex-col gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Search_Catalog</span>
                </div>
                <Search className="bg-zinc-100 border-transparent text-black focus:ring-1 focus:ring-primary transition-all rounded-none placeholder:text-zinc-400" />
              </div>

              <div className="flex flex-col gap-10">
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] block border-b border-zinc-100 pb-2">
                    Catalog_Index
                  </span>
                  <Categories />
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] block border-b border-zinc-100 pb-2">
                    Sort_Parameters
                  </span>
                  <FilterList list={sorting} title="Sort" />
                </div>
              </div>

              <div className="mt-auto pt-8 hidden lg:block">
                <div className="p-4 bg-zinc-900 flex items-center gap-3 group overflow-hidden relative border border-zinc-800">
                  <div className="absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="size-1.5 animate-pulse rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest relative z-10">Terminal_Ready</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-6 md:p-10 bg-zinc-50 relative z-10">
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  )
}