import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import configPromise from '@payload-config'
import { Package } from 'lucide-react'
import { getPayload } from 'payload'

export default async function ShopPage({ searchParams }: { searchParams: Promise<any> }) {
  const { q: searchValue, sort, category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 100,
    ...(sort ? { sort } : { sort: 'title' }),
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(searchValue ? [{ or: [{ title: { like: searchValue } }, { description: { like: searchValue } }] }] : []),
        ...(category ? [{ categories: { contains: category } }] : []),
      ],
    },
  })

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-300 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Inventory</span>
          </div>
          <h1 className="text-2xl font-bold text-black uppercase tracking-tight">
            Catalog
          </h1>
        </div>

        {searchValue && (
          <div className="flex items-center gap-4 py-2 px-4 bg-zinc-200 border-l-2 border-zinc-900">
            <Package size={16} className="text-zinc-600" />
            <span className="text-sm font-bold text-black uppercase tracking-wide">
              Results for: {searchValue}
            </span>
          </div>
        )}
      </div>

      <div className="relative">
        {products.docs.length > 0 ? (
          <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.docs.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center border border-zinc-200 bg-white">
            <Package size={32} className="text-zinc-300 mb-4" />
            <h3 className="text-xs font-bold text-black uppercase tracking-widest">Empty</h3>
          </div>
        )}
      </div>
    </div>
  )
}