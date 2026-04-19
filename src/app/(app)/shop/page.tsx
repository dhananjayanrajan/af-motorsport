import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
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
    <div className="w-full space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-primary border-2 border-black" />
            <span className="text-sm font-bold text-black uppercase tracking-tight">Products</span>
          </div>
          <h1 className="text-4xl font-bold text-black uppercase tracking-tighter leading-none">
            Store Catalog
          </h1>
        </div>

        {searchValue && (
          <div className="flex items-center gap-4 py-4 px-6 bg-accent border-2 border-black">
            <Package size={20} className="text-black" strokeWidth={3} />
            <span className="text-sm font-bold text-black uppercase tracking-tight">
              Search: {searchValue}
            </span>
          </div>
        )}
      </div>

      <div className="relative">
        {products.docs.length > 0 ? (
          <Grid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.docs.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center border-4 border-black bg-white">
            <Package size={48} className="text-zinc-200 mb-6" strokeWidth={2} />
            <h3 className="text-base font-bold text-black uppercase tracking-widest">
              No products found
            </h3>
          </div>
        )}
      </div>

      <div className="pt-12 border-t-2 border-zinc-200 flex justify-between items-center">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Count: {products.docs.length} Items
        </p>
        <div className="flex gap-2">
          <div className="size-3 bg-primary" />
          <div className="size-3 bg-secondary" />
          <div className="size-3 bg-accent" />
        </div>
      </div>
    </div>
  )
}