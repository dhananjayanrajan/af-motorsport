import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import configPromise from '@payload-config'
import { Package } from 'lucide-react'
import { getPayload } from 'payload'

export default async function ShopPage(props: {
  searchParams: Promise<{ q?: string; sort?: string; category?: string }>
}) {
  const searchParams = await props.searchParams
  const searchValue = searchParams.q
  const sort = searchParams.sort
  const category = searchParams.category

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
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black-pure pb-10 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-secondary" />
            <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">Repository</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-black uppercase tracking-tighter leading-none text-black-pure">
            Catalog
          </h1>
        </div>

        {searchValue && (
          <div className="flex items-center gap-3 py-2 px-4 bg-primary border border-black-pure">
            <Package size={14} className="text-black-pure" />
            <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">
              Query: {searchValue}
            </span>
          </div>
        )}
      </div>

      <div className="relative">
        {products.docs.length > 0 ? (
          <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.docs.map((product, index) => (
              <ProductGridItem key={product.id} product={product} index={index} />
            ))}
          </Grid>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center border border-black-pure bg-white-pure">
            <Package size={32} className="text-black-pure opacity-10 mb-4" />
            <h3 className="text-xs font-mono font-black text-black-pure uppercase tracking-widest">
              Null result
            </h3>
          </div>
        )}
      </div>

      <div className="mt-10 pt-6 border-t border-black-pure opacity-10 flex justify-between items-center">
        <p className="text-[9px] font-mono font-black text-black-pure opacity-30 uppercase tracking-widest">
          Entries: {products.docs.length}
        </p>
        <div className="flex gap-1.5">
          <div className="size-1.5 bg-black-pure" />
          <div className="size-1.5 bg-black-pure" />
        </div>
      </div>
    </div>
  )
}