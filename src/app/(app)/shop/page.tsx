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
    <div className="max-w-[1400px] mx-auto space-y-12">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-zinc-200 pb-12 relative">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-2 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Store Inventory</span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black italic text-black uppercase tracking-tighter leading-[0.8]">
            Product <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Catalog</span>
          </h1>
        </div>

        {searchValue && (
          <div className="bg-zinc-900 p-8 border-l-4 border-primary relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 text-white">
              <Package size={40} />
            </div>
            <span className="text-3xl font-black italic text-white uppercase tracking-tighter">
              &quot;{searchValue}&quot;
            </span>
          </div>
        )}
      </div>

      <div className="relative">
        {products.docs.length > 0 ? (
          <Grid className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.docs.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center border border-zinc-200 bg-white">
            <Package size={48} className="text-zinc-100 mb-6" />
            <h3 className="text-[10px] font-black text-black uppercase tracking-[0.3em]">No Results Found</h3>
          </div>
        )}
      </div>
    </div>
  )
}