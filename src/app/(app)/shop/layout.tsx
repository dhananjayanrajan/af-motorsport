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
          <aside
            className="w-full lg:w-80 flex-none border-b lg:border-b-0 lg:border-r border-zinc-900 p-6 lg:min-h-screen"
            style={{ clipPath: DESIGN_SYSTEM.SHAPES.RECT_CLIP }}
          >
            <div className="sticky top-24 flex flex-col gap-10">
              {/* Quick Search */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-black uppercase tracking-[0.3em]"
                  style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                  Quick_Search
                </span>
                <Search className="bg-zinc-950 border-zinc-800 text-white transition-all focus:border-primary"
                />
              </div>

              {/* Catalog Index & Sort */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">
                    Catalog_Index
                  </span>
                  <Categories />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">
                    System_Sort
                  </span>
                  <FilterList list={sorting} title="Sort by" />
                </div>
              </div>

              {/* System Status */}
              <div className="mt-auto pt-8 border-t border-zinc-900 hidden lg:block">
                <div className="flex items-center gap-2">
                  <div
                    className="size-2 animate-pulse"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                  />
                  <span className="text-xs font-mono text-zinc-600 uppercase">
                    Store_Server_Online
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-6 md:p-10 lg:p-12 bg-black">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}